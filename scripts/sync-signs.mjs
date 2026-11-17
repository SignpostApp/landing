#!/usr/bin/env bun
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APP_DIR = path.resolve(
  process.env.SIGNPOST_APP_DIR ?? path.join(ROOT, "..", "signpost"),
);
const OUT_FILE = path.join(ROOT, "src", "data", "signs.generated.json");
const DEMO_SITEMAP = "https://demo.signpostasl.com/sitemap.xml";
const OFFLINE = process.argv.includes("--offline");
const UA = "SignpostASL-landing/1.0 (https://signpostasl.com; signpostcv@gmail.com)";

if (!existsSync(APP_DIR)) {
  console.error(`Cannot find the Signpost app checkout at ${APP_DIR}.`);
  console.error("Clone github.com/SignpostApp/signpost next to this repo or set SIGNPOST_APP_DIR.");
  process.exit(1);
}

const appImport = (rel) => import(path.join(APP_DIR, rel));

const [signContent, signVideos, signVideo, dictionarySearch, vocabulary] = await Promise.all([
  appImport("src/data/sign-content.ts"),
  appImport("src/data/sign-videos.ts"),
  appImport("src/lib/sign-video.ts"),
  appImport("src/lib/dictionary-search.ts"),
  appImport("src/lib/vocabulary.ts"),
]);

const {
  GESTURE_CONTENT,
  GESTURE_CATEGORY,
  GESTURE_DISPLAY_OVERRIDES,
  letterContent,
  numberContent,
} = signContent;
const { SIGN_VIDEOS } = signVideos;
const { parseYouTubeRef } = signVideo;
const { slugifyTerm } = dictionarySearch;
const { normalizeModelLabel, prettyGestureLabel } = vocabulary;

const previous = existsSync(OUT_FILE)
  ? JSON.parse(readFileSync(OUT_FILE, "utf8"))
  : { entries: [] };
const previousBySlug = new Map(previous.entries.map((entry) => [entry.slug, entry]));
const previousVideoMeta = new Map(
  previous.entries
    .filter((entry) => entry.video?.title)
    .map((entry) => [entry.video.id, entry.video]),
);

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function loadTrainedFlags() {
  if (OFFLINE) {
    const flags = new Map();
    for (const entry of previous.entries) flags.set(entry.slug, entry.trained);
    return flags;
  }
  const xml = await fetchText(DEMO_SITEMAP);
  const flags = new Map();
  const re = /<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<priority>([^<]+)<\/priority>[\s\S]*?<\/url>/g;
  let match;
  while ((match = re.exec(xml))) {
    const slug = match[1].split("/dictionary/")[1];
    if (!slug) continue;
    flags.set(slug, Number(match[2]) >= 0.6);
  }
  if (flags.size === 0) throw new Error("Demo sitemap returned no dictionary entries");
  return flags;
}

async function fetchVideoMeta(video) {
  const cached = previousVideoMeta.get(video.id);
  if (cached) {
    return { ...video, title: cached.title, author: cached.author, authorUrl: cached.authorUrl, uploadDate: cached.uploadDate };
  }
  if (OFFLINE) return video;
  const meta = { ...video };
  try {
    const oembed = JSON.parse(
      await fetchText(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${video.id}`)}&format=json`,
      ),
    );
    meta.title = oembed.title;
    meta.author = oembed.author_name;
    meta.authorUrl = oembed.author_url;
  } catch (error) {
    console.warn(`  oEmbed failed for ${video.id}: ${error.message}`);
  }
  try {
    const html = await fetchText(`https://www.youtube.com/watch?v=${video.id}`);
    const uploaded = html.match(/itemprop="uploadDate" content="([^"]+)"/)?.[1]
      ?? html.match(/"uploadDate":"([^"]+)"/)?.[1];
    if (uploaded) meta.uploadDate = uploaded;
  } catch (error) {
    console.warn(`  watch page failed for ${video.id}: ${error.message}`);
  }
  return meta;
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const trainedFlags = await loadTrainedFlags();
const trained = (slug) => trainedFlags.get(slug) ?? previousBySlug.get(slug)?.trained ?? false;

const entries = [];
const warnings = [];

for (const [slug, raw] of Object.entries(SIGN_VIDEOS)) {
  if (/^(letter|number)-/.test(slug)) continue;
  const video = parseYouTubeRef(raw);
  if (!video) {
    warnings.push(`no usable video for "${slug}", skipped`);
    continue;
  }
  const label = normalizeModelLabel(slug.replace(/-/g, " "));
  const term = GESTURE_DISPLAY_OVERRIDES[label] ?? prettyGestureLabel(label);
  if (slugifyTerm(term) !== slug) {
    warnings.push(`slug "${slug}" does not round-trip through label "${label}" (${slugifyTerm(term)})`);
  }
  const authored = GESTURE_CONTENT[label] ?? null;
  entries.push({
    slug,
    label,
    term,
    kind: "gesture",
    trained: trained(slug),
    appCategory: GESTURE_CATEGORY[label] ?? null,
    appContent: authored
      ? { summary: authored.summary, steps: authored.steps, tips: authored.tips, aka: authored.aka ?? [] }
      : null,
    video,
  });
}

for (const letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
  const slug = `letter-${letter.toLowerCase()}`;
  const content = letterContent(letter);
  entries.push({
    slug,
    label: letter,
    term: `Letter ${letter}`,
    kind: "letter",
    trained: trained(slug),
    appCategory: "Alphabet",
    appContent: { summary: content.summary, steps: content.steps, tips: content.tips, aka: [] },
    video: parseYouTubeRef(SIGN_VIDEOS[slug]),
  });
}

for (const digit of "0123456789") {
  const slug = `number-${digit}`;
  const content = numberContent(digit);
  entries.push({
    slug,
    label: digit,
    term: `Number ${digit}`,
    kind: "number",
    trained: trained(slug),
    appCategory: "Numbers",
    appContent: { summary: content.summary, steps: content.steps, tips: content.tips, aka: [] },
    video: parseYouTubeRef(SIGN_VIDEOS[slug]),
  });
}

const withVideo = entries.filter((entry) => entry.video);
console.log(`Found ${entries.length} signs (${withVideo.length} with video). Fetching YouTube metadata...`);
let done = 0;
await mapWithConcurrency(withVideo, 4, async (entry) => {
  entry.video = await fetchVideoMeta(entry.video);
  done += 1;
  if (done % 25 === 0) console.log(`  ${done}/${withVideo.length}`);
});

for (const warning of warnings) console.warn(`warning: ${warning}`);

mkdirSync(path.dirname(OUT_FILE), { recursive: true });
writeFileSync(
  OUT_FILE,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: "github.com/SignpostApp/signpost src/data/sign-content.ts and src/data/sign-videos.ts",
      entries,
    },
    null,
    2,
  ) + "\n",
);

const missingMeta = withVideo.filter((entry) => !entry.video.uploadDate).length;
console.log(`Wrote ${entries.length} entries to ${path.relative(ROOT, OUT_FILE)} (${missingMeta} videos without an upload date).`);
