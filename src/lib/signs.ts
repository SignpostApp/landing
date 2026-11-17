import generated from "@/data/signs.generated.json";
import { CATEGORIES, SIGN_CONTENT, type SignCategory } from "@/data/sign-content";
import { DEMO_URL } from "@/app/_components/navData";
import type { SignVideo } from "@/lib/youtube";

export { youTubeEmbedUrl, youTubeThumbnail, youTubeWatchUrl, type SignVideo } from "@/lib/youtube";

export type SignKind = "gesture" | "letter" | "number";

interface GeneratedEntry {
  slug: string;
  label: string;
  term: string;
  kind: SignKind;
  trained: boolean;
  appCategory: string | null;
  appContent: { summary: string; steps: string[]; tips: string[]; aka: string[] } | null;
  video: SignVideo | null;
}

export interface Sign {
  slug: string;
  term: string;
  label: string;
  kind: SignKind;
  category: SignCategory;
  summary: string;
  steps: string[];
  tips: string[];
  aka: string[];
  video: SignVideo | null;
  image: { src: string; alt: string } | null;
  trained: boolean;
  authored: boolean;
}

export interface CategoryWithSigns {
  category: SignCategory;
  signs: Sign[];
}

const CATEGORY_BY_NAME = new Map(CATEGORIES.map((category) => [category.name, category]));
const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((category) => [category.slug, category]));
const CATEGORY_RANK = new Map(CATEGORIES.map((category, index) => [category.name, index]));

function resolveCategory(name: string | null): SignCategory {
  const category = (name && CATEGORY_BY_NAME.get(name)) || CATEGORY_BY_SLUG.get("everyday-signs");
  if (!category) throw new Error("Sign categories are missing the Everyday Signs fallback");
  return category;
}

function buildSign(entry: GeneratedEntry): Sign {
  const authored = SIGN_CONTENT[entry.slug];
  const content = entry.appContent ?? authored ?? null;
  const categoryName = authored?.category ?? entry.appCategory;
  return {
    slug: entry.slug,
    term: entry.term,
    label: entry.label,
    kind: entry.kind,
    category: resolveCategory(categoryName),
    summary: content?.summary ?? `${entry.term} is a sign in the Signpost ASL dictionary.`,
    steps: content?.steps ?? [],
    tips: content?.tips ?? [],
    aka: content?.aka ?? [],
    video: entry.video,
    image:
      entry.kind === "letter"
        ? {
            src: `/asl-alphabet/${entry.label.toLowerCase()}.svg`,
            alt: `Hand forming the letter ${entry.label} in the ASL manual alphabet`,
          }
        : null,
    trained: entry.trained,
    authored: content !== null,
  };
}

function compareSigns(a: Sign, b: Sign): number {
  const rank = (CATEGORY_RANK.get(a.category.name) ?? 99) - (CATEGORY_RANK.get(b.category.name) ?? 99);
  if (rank !== 0) return rank;
  if (a.kind === "number" && b.kind === "number") return Number(a.label) - Number(b.label);
  if (a.kind === "letter" && b.kind === "letter") return a.label.localeCompare(b.label);
  return a.term.localeCompare(b.term);
}

const ALL_SIGNS: Sign[] = (generated as { entries: GeneratedEntry[] }).entries
  .map(buildSign)
  .sort(compareSigns);

const SIGN_BY_SLUG = new Map(ALL_SIGNS.map((sign) => [sign.slug, sign]));

export function getAllSigns(): Sign[] {
  return ALL_SIGNS;
}

export function getIndexableSigns(): Sign[] {
  return ALL_SIGNS.filter((sign) => sign.authored);
}

export function getSignBySlug(slug: string): Sign | null {
  return SIGN_BY_SLUG.get(slug.trim().toLowerCase()) ?? null;
}

export function getCategoriesWithSigns(): CategoryWithSigns[] {
  return CATEGORIES.map((category) => ({
    category,
    signs: ALL_SIGNS.filter((sign) => sign.category.slug === category.slug),
  })).filter((group) => group.signs.length > 0);
}

export function getCategoryBySlug(slug: string): CategoryWithSigns | null {
  const category = CATEGORY_BY_SLUG.get(slug.trim().toLowerCase());
  if (!category) return null;
  const signs = ALL_SIGNS.filter((sign) => sign.category.slug === category.slug);
  return signs.length > 0 ? { category, signs } : null;
}

export function getRelatedSigns(sign: Sign, limit = 8): Sign[] {
  const sameCategory = ALL_SIGNS.filter(
    (candidate) => candidate.slug !== sign.slug && candidate.category.slug === sign.category.slug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const filler = ALL_SIGNS.filter(
    (candidate) =>
      candidate.slug !== sign.slug &&
      candidate.category.slug !== sign.category.slug &&
      candidate.kind === "gesture",
  );
  return [...sameCategory, ...filler].slice(0, limit);
}

export function signPath(sign: Pick<Sign, "slug">): string {
  return `/sign/${sign.slug}`;
}

export function categoryPath(category: Pick<SignCategory, "slug">): string {
  return category.slug === "alphabet" ? "/asl-alphabet" : `/signs/${category.slug}`;
}

export function demoSignUrl(sign: Pick<Sign, "slug">): string {
  return `${DEMO_URL}/dictionary/${sign.slug}`;
}

export function signTitle(sign: Sign): string {
  if (sign.kind === "letter") return `How to Sign the Letter ${sign.label} in ASL`;
  if (sign.kind === "number") return `How to Sign the Number ${sign.label} in ASL`;
  return `How to Sign "${sign.term}" in ASL`;
}

export function signHeading(sign: Sign): string {
  if (sign.kind === "letter") return `How to sign the letter ${sign.label} in ASL`;
  if (sign.kind === "number") return `How to sign the number ${sign.label} in ASL`;
  return `How to sign "${sign.term}" in ASL`;
}

export function signDisplayName(sign: Sign): string {
  return sign.kind === "gesture" ? sign.term : sign.label;
}

export function signDescription(sign: Sign): string {
  const suffix = !sign.video
    ? sign.trained
      ? " Practice it with real-time webcam feedback."
      : " Follow the step-by-step guide."
    : sign.trained
      ? " Watch the clip, then practice it with real-time webcam feedback."
      : " Watch the clip and follow the step-by-step guide.";
  const base = sign.summary.replace(/\s+/g, " ").trim();
  const room = 158 - suffix.length;
  if (base.length <= room) return `${base}${suffix}`;
  const cut = base.slice(0, room);
  const lastSpace = cut.lastIndexOf(" ");
  const head = (lastSpace > room * 0.5 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, "");
  return `${head}.${suffix}`;
}
