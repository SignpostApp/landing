#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSET_DIR = path.join(ROOT, "public", "asl-alphabet");
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const WIDTH = 2200;
const HEIGHT = 1700;
const COLUMNS = 7;
const ROWS = 4;
const MARGIN = 90;
const HEADER = 230;
const FOOTER = 150;
const GAP = 28;
const INK = "#0f172a";
const MUTED = "#64748b";
const ACCENT = "#2563eb";
const CARD = "#f8fafc";
const FONT = "Geist, Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MOVING = new Set(["J", "Z"]);

function loadGlyph(letter) {
  const file = path.join(ASSET_DIR, `${letter.toLowerCase()}.svg`);
  const svg = readFileSync(file, "utf8");
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`${file} has no viewBox`);
  const open = svg.indexOf(">", svg.indexOf("<svg")) + 1;
  const close = svg.lastIndexOf("</svg>");
  let inner = svg.slice(open, close);
  inner = inner
    .replace(/<metadata[\s\S]*?<\/metadata>/g, "")
    .replace(/<sodipodi:namedview[\s\S]*?(\/>|<\/sodipodi:namedview>)/g, "")
    .replace(/<defs[\s\S]*?<\/defs>/g, "")
    .replace(/<defs[^>]*\/>/g, "")
    .replace(/\s(?:inkscape|sodipodi):[a-zA-Z-]+="[^"]*"/g, "")
    .replace(/fill:#000000/g, `fill:${INK}`)
    .replace(/fill="#000000"/g, `fill="${INK}"`)
    .replace(/id="([^"]*)"/g, `id="${letter.toLowerCase()}-$1"`);
  return { viewBox, inner };
}

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildChart() {
  const gridTop = HEADER;
  const gridHeight = HEIGHT - HEADER - FOOTER;
  const gridWidth = WIDTH - MARGIN * 2;
  const cellWidth = (gridWidth - GAP * (COLUMNS - 1)) / COLUMNS;
  const cellHeight = (gridHeight - GAP * (ROWS - 1)) / ROWS;
  const labelBand = 78;
  const glyphPadding = 26;
  const glyphWidth = cellWidth - glyphPadding * 2;
  const glyphHeight = cellHeight - labelBand - glyphPadding * 2;

  const cells = LETTERS.map((letter, index) => {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    const x = MARGIN + column * (cellWidth + GAP);
    const y = gridTop + row * (cellHeight + GAP);
    const { viewBox, inner } = loadGlyph(letter);
    const moving = MOVING.has(letter);
    return `
    <g>
      <rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" rx="26" fill="${CARD}" />
      <svg x="${x + glyphPadding}" y="${y + glyphPadding}" width="${glyphWidth}" height="${glyphHeight}" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">${inner}</svg>
      <text x="${x + 30}" y="${y + cellHeight - 28}" font-family="${FONT}" font-size="58" font-weight="600" fill="${INK}" letter-spacing="-0.03em">${letter}</text>
      ${
        moving
          ? `<text x="${x + cellWidth - 30}" y="${y + cellHeight - 32}" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="600" fill="${ACCENT}" letter-spacing="0.08em">MOVES</text>`
          : ""
      }
    </g>`;
  }).join("\n");

  const noteX = MARGIN + (COLUMNS - 2) * (cellWidth + GAP);
  const noteY = gridTop + (ROWS - 1) * (cellHeight + GAP);
  const noteWidth = cellWidth * 2 + GAP;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">The ASL alphabet: all 26 fingerspelling handshapes</title>
  <desc id="chart-desc">A reference chart of the American Sign Language manual alphabet from A to Z, with J and Z marked as the two letters that move. Published by Signpost at signpostasl.com/asl-alphabet.</desc>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff" />
  <text x="${MARGIN}" y="${MARGIN + 56}" font-family="${FONT}" font-size="72" font-weight="600" fill="${INK}" letter-spacing="-0.035em">The ASL Alphabet</text>
  <text x="${MARGIN}" y="${MARGIN + 110}" font-family="${FONT}" font-size="30" fill="${MUTED}">All 26 fingerspelling handshapes. Dominant hand, palm facing the person you are talking to. J and Z are the only letters that move.</text>
  <text x="${WIDTH - MARGIN}" y="${MARGIN + 56}" text-anchor="end" font-family="${FONT}" font-size="34" font-weight="600" fill="${ACCENT}" letter-spacing="-0.02em">signpostasl.com/asl-alphabet</text>
  ${cells}
  <g>
    <rect x="${noteX}" y="${noteY}" width="${noteWidth}" height="${cellHeight}" rx="26" fill="#eff6ff" />
    <text x="${noteX + 34}" y="${noteY + 64}" font-family="${FONT}" font-size="34" font-weight="600" fill="${INK}" letter-spacing="-0.02em">Practice with feedback</text>
    <text x="${noteX + 34}" y="${noteY + 112}" font-family="${FONT}" font-size="26" fill="${MUTED}">Signpost watches your hand through your webcam</text>
    <text x="${noteX + 34}" y="${noteY + 150}" font-family="${FONT}" font-size="26" fill="${MUTED}">and tells you whether each letter is right, in under</text>
    <text x="${noteX + 34}" y="${noteY + 188}" font-family="${FONT}" font-size="26" fill="${MUTED}">100 milliseconds. Free, in the browser, no account.</text>
    <text x="${noteX + 34}" y="${noteY + cellHeight - 36}" font-family="${FONT}" font-size="28" font-weight="600" fill="${ACCENT}">demo.signpostasl.com</text>
  </g>
  <text x="${MARGIN}" y="${HEIGHT - 66}" font-family="${FONT}" font-size="22" fill="${MUTED}">${escapeXml(
    "Keep your hand still at shoulder height and let only the fingers change between letters. Clarity comes before speed.",
  )}</text>
  <text x="${MARGIN}" y="${HEIGHT - 34}" font-family="${FONT}" font-size="20" fill="#94a3b8">${escapeXml(
    "Handshape illustrations are in the public domain (wpclipart.com, via Wikimedia Commons). Chart by Signpost, Matrix Studios Software.",
  )}</text>
</svg>
`;
}

function renderWithChrome(svgPath) {
  if (!existsSync(CHROME)) {
    console.warn(`Chrome not found at ${CHROME}; skipping PNG and PDF export. Set CHROME_PATH to enable it.`);
    return;
  }
  const tmp = mkdtempSync(path.join(os.tmpdir(), "asl-chart-"));
  const html = path.join(tmp, "chart.html");
  writeFileSync(
    html,
    `<!doctype html><html><head><meta charset="utf-8"><style>
      @page { size: ${WIDTH}px ${HEIGHT}px; margin: 0; }
      html, body { margin: 0; padding: 0; background: #fff; }
      img { display: block; width: ${WIDTH}px; height: ${HEIGHT}px; }
    </style></head><body><img src="file://${svgPath}" alt=""></body></html>`,
  );
  const common = ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1"];
  execFileSync(CHROME, [
    ...common,
    `--window-size=${WIDTH},${HEIGHT}`,
    `--screenshot=${path.join(ASSET_DIR, "asl-alphabet-chart.png")}`,
    `file://${html}`,
  ]);
  execFileSync(CHROME, [
    ...common,
    "--no-pdf-header-footer",
    `--print-to-pdf=${path.join(ASSET_DIR, "asl-alphabet-chart.pdf")}`,
    `file://${html}`,
  ]);
  rmSync(tmp, { recursive: true, force: true });
}

const svgPath = path.join(ASSET_DIR, "asl-alphabet-chart.svg");
writeFileSync(svgPath, buildChart());
console.log(`Wrote ${path.relative(ROOT, svgPath)}`);
renderWithChrome(svgPath);
console.log("Done.");
