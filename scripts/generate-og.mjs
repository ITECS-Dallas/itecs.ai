// One-off generator for the default Open Graph / Twitter social card.
// Produces a branded 1200x630 PNG (social platforms don't render SVG previews).
// Run: node scripts/generate-og.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, "..", "public");
const out = join(pub, "images", "og", "itecs-og.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A1622"/>
  <!-- faint ops grid -->
  <g stroke="#5BA8D8" stroke-opacity="0.06" stroke-width="1">
    ${Array.from({ length: 18 }, (_, i) => `<line x1="${i * 70}" y1="0" x2="${i * 70}" y2="630"/>`).join("")}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 70}" x2="1200" y2="${i * 70}"/>`).join("")}
  </g>
  <!-- faceted brand blade bleeding off the right -->
  <path d="M 760 0 L 1200 0 L 1200 630 L 600 630 Z" fill="#004775"/>
  <path d="M 760 0 L 880 0 L 600 630 L 480 630 Z" fill="#06314c"/>
  <!-- bright accent shard -->
  <path d="M 700 250 L 770 230 L 770 320 L 700 340 Z" fill="#3288B6" fill-opacity="0.9"/>
  <!-- AI core hex (intelligence mark) -->
  <g transform="translate(980,315)">
    <polygon points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75" fill="rgba(91,168,216,0.05)" stroke="#5BA8D8" stroke-width="2.5"/>
    <polygon points="0,-78 68,-39 68,39 0,78 -68,39 -68,-39" fill="none" stroke="#2f6f9e" stroke-width="1.6"/>
    <line x1="0" y1="0" x2="0" y2="-150" stroke="#5BA8D8" stroke-width="1.6" stroke-opacity="0.6"/>
    <line x1="0" y1="0" x2="130" y2="75" stroke="#5BA8D8" stroke-width="1.6" stroke-opacity="0.6"/>
    <line x1="0" y1="0" x2="-130" y2="75" stroke="#5BA8D8" stroke-width="1.6" stroke-opacity="0.6"/>
    <circle cx="0" cy="-150" r="6" fill="#5BA8D8"/>
    <circle cx="130" cy="75" r="6" fill="#5BA8D8"/>
    <circle cx="-130" cy="75" r="6" fill="#5BA8D8"/>
    <circle cx="0" cy="0" r="9" fill="#ffffff"/>
  </g>
  <!-- eyebrow -->
  <text x="80" y="150" font-family="Liberation Mono, DejaVu Sans Mono, monospace" font-size="22" letter-spacing="5" fill="#3288B6">BUSINESS STRATEGIST TECHNOLOGISTS</text>
  <!-- headline -->
  <text x="76" y="270" font-family="Liberation Sans, DejaVu Sans, sans-serif" font-weight="700" font-size="72" fill="#ffffff">Your IT, secured.</text>
  <text x="76" y="352" font-family="Liberation Sans, DejaVu Sans, sans-serif" font-weight="700" font-size="72" fill="#ffffff">Your business,</text>
  <text x="76" y="434" font-family="Liberation Sans, DejaVu Sans, sans-serif" font-weight="700" font-size="72" fill="#7fb4d8">made intelligent.</text>
  <!-- footer wordmark + url -->
  <text x="80" y="556" font-family="Liberation Sans, DejaVu Sans, sans-serif" font-weight="700" font-size="30" letter-spacing="2" fill="#ffffff">ITECS</text>
  <text x="200" y="556" font-family="Liberation Mono, DejaVu Sans Mono, monospace" font-size="22" letter-spacing="2" fill="#7fb4d8">itecs.ai · Dallas Managed Intelligence</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("wrote", out);

// ---- apple-touch-icon: white ITECS shield on a navy square (180x180) ----
const shield = readFileSync(join(pub, "images", "logos", "itecs-icon-darkblue.svg"), "utf8")
  .replace(/#326089/gi, "#ffffff");
const shieldPng = await sharp(Buffer.from(shield)).resize({ height: 118 }).png().toBuffer();
const touchIcon = join(pub, "apple-touch-icon.png");
await sharp({
  create: { width: 180, height: 180, channels: 4, background: "#0A1622" },
})
  .composite([{ input: shieldPng, gravity: "center" }])
  .png()
  .toFile(touchIcon);
console.log("wrote", touchIcon);
