import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://itecs.ai";
const titleTemplateSuffix = " | ITECS AI";

const aiSeoOgImage = "/images/og/ai-optimized-seo.png";
const pageFiles = [
  "src/app/ai-optimized-seo/page.tsx",
  "src/app/ai-optimized-seo/foundation/page.tsx",
  "src/app/ai-optimized-seo/momentum/page.tsx",
  "src/app/ai-optimized-seo/velocity/page.tsx",
];

const failures = [];
const diagnostics = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function readStringProp(block, prop) {
  const propIndex = block.indexOf(`${prop}:`);
  if (propIndex === -1) return "";

  const quoteIndex = block.indexOf('"', propIndex);
  if (quoteIndex === -1) return "";

  let value = "";
  let escaped = false;

  for (let index = quoteIndex + 1; index < block.length; index += 1) {
    const char = block[index];

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

function extractTierBlock(tiersBlock, slug) {
  const slugMarker = `slug: "${slug}",`;
  const start = tiersBlock.indexOf(slugMarker);
  if (start === -1) return "";

  const nextTier = tiersBlock.indexOf("\n  {\n    slug:", start + slugMarker.length);
  const arrayEnd = tiersBlock.indexOf("\n  },\n];", start);
  const end = nextTier === -1 ? arrayEnd : nextTier;

  return tiersBlock.slice(start, end);
}

function extractFunctionBlock(source, name) {
  const exportStart = source.indexOf(`export function ${name}`);
  const localStart = source.indexOf(`function ${name}`);
  const start = exportStart === -1 ? localStart : exportStart;
  if (start === -1) return "";

  const nextExport = source.indexOf("\nexport function ", start + 1);
  const nextLocal = source.indexOf("\nfunction ", start + 1);
  const candidates = [nextExport, nextLocal].filter((index) => index !== -1);
  const next = candidates.length > 0 ? Math.min(...candidates) : -1;
  return source.slice(start, next === -1 ? source.length : next);
}

const constants = read("src/lib/constants.ts");
const metadata = read("src/lib/metadata.ts");
const seo = read("src/lib/seo.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const header = read("src/components/layout/Header.tsx");
const headerMenus = read("src/components/layout/HeaderMenus.tsx");
const servicesGrid = read("src/components/sections/ServicesGrid.tsx");
const serviceJourney = read("src/components/sections/ServiceJourneyDiagram.tsx");

for (const file of pageFiles) {
  assert(exists(file), `Missing AI-SEO page file: ${file}`);
}

for (const file of pageFiles.filter(exists)) {
  const source = read(file);
  assert(source.includes("generatePageMetadata"), `${file} must use generatePageMetadata.`);
  assert(source.includes(`ogImage: "${aiSeoOgImage}"`), `${file} must use the AI-SEO OpenGraph image.`);
  assert(source.includes("generateBreadcrumbSchema"), `${file} must emit BreadcrumbList schema.`);
  assert(source.includes("<JsonLd"), `${file} must render JSON-LD through the shared component.`);
}

assert(exists(`public${aiSeoOgImage}`), `Missing OpenGraph image: public${aiSeoOgImage}`);

const overviewPage = read("src/app/ai-optimized-seo/page.tsx");
assert(
  overviewPage.includes("generateAISEOServiceSchema") &&
    overviewPage.includes("generateAggregateOfferSchema"),
  "AI-SEO hub must emit Service and AggregateOffer schema.",
);

for (const file of pageFiles.slice(1)) {
  const source = read(file);
  assert(source.includes("generateAISEOTierServiceSchema"), `${file} must emit tier Service schema.`);
  assert(source.includes("generateOfferSchema"), `${file} must emit Offer schema.`);
}

assert(sitemap.includes("AI_SEO_OVERVIEW"), "Sitemap must include AI_SEO_OVERVIEW.");
assert(sitemap.includes("AI_SEO_TIERS"), "Sitemap must include AI_SEO_TIERS.");
assert(!sitemap.includes('url: `${base}/p/'), "Sitemap must not expose proposal routes.");
assert(
  robots.includes('const DISALLOWED_PATHS = ["/api/", "/p/"]') &&
    robots.includes('userAgent: "*"') &&
    robots.includes("disallow: DISALLOWED_PATHS") &&
    robots.includes("...AI_CRAWLERS.map") &&
    robots.includes(`${siteUrl}/sitemap.xml`),
  "Robots must allow public routes, keep API/proposal exclusions on wildcard and named AI agents, and advertise the canonical sitemap.",
);
assert(
  metadata.includes("alternates") && metadata.includes("canonical") && metadata.includes("SITE_CONFIG.url"),
  "Shared metadata must emit canonicals from the canonical site configuration.",
);

const overviewStart = constants.indexOf("export const AI_SEO_OVERVIEW");
const overviewEnd = constants.indexOf("export interface AISEOInternalTier");
const overviewBlock = constants.slice(overviewStart, overviewEnd);
const tiersStart = constants.indexOf("export const AI_SEO_TIERS");
const tiersEnd = constants.indexOf("// Comparison rows for SEO Velocity");
const tiersBlock = constants.slice(tiersStart, tiersEnd);

const metadataTargets = [
  { name: "AI-SEO overview", block: overviewBlock },
  { name: "Foundation", block: extractTierBlock(tiersBlock, "foundation") },
  { name: "Momentum", block: extractTierBlock(tiersBlock, "momentum") },
  { name: "Velocity", block: extractTierBlock(tiersBlock, "velocity") },
];

for (const target of metadataTargets) {
  const title = readStringProp(target.block, "title");
  const description = readStringProp(target.block, "description");

  assert(title, `${target.name} must define a metadata title.`);
  assert(description, `${target.name} must define a metadata description.`);

  if (title && `${title}${titleTemplateSuffix}`.length > 60) {
    diagnostics.push(
      `${target.name} rendered title is ${`${title}${titleTemplateSuffix}`.length} characters; review possible truncation and intent fit.`,
    );
  }
  if (description && description.length > 160) {
    diagnostics.push(
      `${target.name} description is ${description.length} characters; review possible truncation and clarity.`,
    );
  }
}

const aiSeoServiceSchema = extractFunctionBlock(seo, "generateAISEOServiceSchema");
const aiSeoTierServiceSchema = extractFunctionBlock(seo, "generateAISEOTierServiceSchema");
const offerEntity = extractFunctionBlock(seo, "generateOfferEntity");
const offerSchema = extractFunctionBlock(seo, "generateOfferSchema");
const aggregateOfferSchema = extractFunctionBlock(seo, "generateAggregateOfferSchema");

assert(
  aiSeoServiceSchema.includes("hasOfferCatalog") && aiSeoServiceSchema.includes("offers"),
  "AI-SEO hub Service schema must connect the service to its visible offers.",
);
assert(
  aiSeoTierServiceSchema.includes("offers"),
  "AI-SEO tier Service schema must connect each tier to its visible Offer.",
);
assert(
  offerEntity.includes("itemOffered") ||
    offerSchema.includes("itemOffered") ||
    aggregateOfferSchema.includes("itemOffered"),
  "AI-SEO Offer schema must identify the service being offered.",
);
assert(
  seo.includes("#service") && seo.includes("#offer"),
  "AI-SEO schema helpers must keep stable Service and Offer identifiers.",
);

assert(
  header.includes('import("./HeaderMenus")') && headerMenus.includes('href: "/ai-optimized-seo"'),
  "Rendered navigation must expose the AI-SEO hub through the current header menu implementation.",
);
assert(
  servicesGrid.includes("SERVICES.map") && servicesGrid.includes("AI_SEO_OVERVIEW"),
  "The expanded services grid must derive service routes from current service data and include the AI-SEO owner.",
);
assert(
  serviceJourney.includes('name: "AI-Optimized SEO"') &&
    serviceJourney.includes('href: "/ai-optimized-seo"'),
  "The service journey must link to the AI-SEO owner route.",
);

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

if (diagnostics.length > 0) {
  console.warn("SEO quality diagnostics (not validity failures):");
  for (const diagnostic of diagnostics) console.warn(`- ${diagnostic}`);
}

console.log("SEO audit passed for durable AI-Optimized SEO contracts.");
