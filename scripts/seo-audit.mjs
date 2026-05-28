import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

const manufacturingRoutes = [
  "/manufacturing",
  "/manufacturing/ppv-agent",
  "/manufacturing/demand-forecasting-sop-ai",
  "/manufacturing/predictive-maintenance-ai",
  "/manufacturing/inventory-working-capital-ai",
  "/manufacturing/quality-traceability-ai",
  "/manufacturing/customer-sku-profitability-ai",
  "/manufacturing/production-scheduling-yield-ai",
  "/manufacturing/contract-pass-through-intelligence",
  "/manufacturing/energy-freight-scope-3-ai",
  "/manufacturing/vendor-payment-anomaly-ai",
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function pageFileFor(route) {
  return route === "/manufacturing"
    ? "src/app/manufacturing/page.tsx"
    : `src/app${route}/page.tsx`;
}

function extractStringNear(source, marker, prop) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";
  const propIndex = source.indexOf(`${prop}:`, markerIndex);
  if (propIndex === -1) return "";
  const quoteIndex = source.indexOf('"', propIndex);
  if (quoteIndex === -1) return "";

  let value = "";
  let escaped = false;
  for (let index = quoteIndex + 1; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) {
      value += char;
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === '"') return value;
    value += char;
  }
  return "";
}

const constants = read("src/lib/constants.ts");
const sitemap = read("src/app/sitemap.ts");
const header = read("src/components/layout/Header.tsx");
const footer = read("src/components/layout/Footer.tsx");
const spokeRenderer = read("src/components/sections/ManufacturingSpokePage.tsx");
const hubPage = read("src/app/manufacturing/page.tsx");
const ppvPage = read("src/app/manufacturing/ppv-agent/page.tsx");

for (const route of manufacturingRoutes) {
  const file = pageFileFor(route);
  assert(exists(file), `Missing manufacturing route file: ${file}`);
}

assert(hubPage.includes("generatePageMetadata"), "Manufacturing hub must generate metadata.");
assert(ppvPage.includes("generatePageMetadata"), "PPV page must generate metadata.");
assert(hubPage.includes("generateFAQSchema"), "Manufacturing hub must emit FAQPage schema.");
assert(ppvPage.includes("generateFAQSchema"), "PPV page must emit FAQPage schema.");
assert(hubPage.includes("generateNationalServiceSchema"), "Manufacturing hub must emit national Service schema.");
assert(ppvPage.includes("generateNationalServiceSchema"), "PPV page must emit national Service schema.");

assert(
  spokeRenderer.includes("generateFAQSchema") &&
    spokeRenderer.includes("generateNationalServiceSchema") &&
    spokeRenderer.includes("<JsonLd"),
  "Manufacturing spoke renderer must emit FAQ and Service JSON-LD."
);

assert(sitemap.includes("MANUFACTURING_VERTICAL"), "Sitemap must include the manufacturing hub constant.");
assert(sitemap.includes("PPV_AGENT_USE_CASE"), "Sitemap must include the PPV page constant.");
assert(sitemap.includes("MANUFACTURING_SPOKE_PAGES"), "Sitemap must include manufacturing spoke pages.");

assert(header.includes("Industries"), "Header must expose Industries navigation.");
assert(footer.includes("Industries"), "Footer must expose Industries links.");
assert(footer.includes("ITECS MSP"), "Footer MSP link label must remain ITECS MSP.");
assert(!footer.includes("ITECS Main Site"), "Footer must not use old ITECS Main Site label.");

for (const route of manufacturingRoutes.slice(1)) {
  assert(constants.includes(`href: "${route}"`), `Constants must define ${route}.`);
  assert(header.includes(route) || route === "/manufacturing/ppv-agent", `Header must link ${route}.`);
}

for (const route of manufacturingRoutes.slice(2)) {
  const file = pageFileFor(route);
  const source = read(file);
  assert(source.includes("generatePageMetadata"), `${file} must generate metadata.`);
  assert(source.includes("ManufacturingSpokePage"), `${file} must render the shared spoke page.`);
  assert(source.includes(route), `${file} must bind to its route content.`);
  const title = extractStringNear(constants, `href: "${route}"`, "title");
  const description = extractStringNear(constants, `href: "${route}"`, "description");
  assert(title, `${route} must define a title.`);
  assert(description, `${route} must define a description.`);
  assert(`${title} | ITECS AI`.length <= 90, `${route} title is too long for practical SERP display.`);
  assert(description.length <= 180, `${route} description is too long: ${description.length} chars.`);
}

for (const required of [
  "mode: \"timeline\"",
  "mode: \"matrix\"",
  "mode: \"waterfall\"",
  "The system does not autonomously",
  "No autonomous",
]) {
  assert(constants.includes(required), `Missing expected manufacturing SEO/governance phrase: ${required}`);
}

assert(
  hubPage.includes("Dallas credibility, national manufacturing reach"),
  "Manufacturing hub must use Dallas as provenance, not a local-only market label."
);

assert(!constants.includes("Pegasus"), "Public manufacturing content must not name Pegasus.");

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO audit passed for manufacturing pages.");
