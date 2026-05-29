import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://itecs.ai";
const titleSuffix = " | ITECS AI";

const aiSeoRoutes = [
  "/ai-optimized-seo",
  "/ai-optimized-seo/foundation",
  "/ai-optimized-seo/momentum",
  "/ai-optimized-seo/velocity",
];
const aiSeoOgImage = "/images/og/ai-optimized-seo.png";

const pageFiles = [
  "src/app/ai-optimized-seo/page.tsx",
  "src/app/ai-optimized-seo/foundation/page.tsx",
  "src/app/ai-optimized-seo/momentum/page.tsx",
  "src/app/ai-optimized-seo/velocity/page.tsx",
];

const failures = [];

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
const seo = read("src/lib/seo.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const header = read("src/components/layout/Header.tsx");
const servicesPage = read("src/app/services/page.tsx");
const servicesHero = read("src/components/sections/ServicesHero.tsx");
const servicesGrid = read("src/components/sections/ServicesGrid.tsx");
const serviceJourney = read("src/components/sections/ServiceJourneyDiagram.tsx");
const mipPage = read("src/app/managed-intelligence-provider/page.tsx");
const llms = read("public/llms.txt");
const aiPolicy = read("public/ai.txt");
const llmsFull = exists("public/llms-full.txt") ? read("public/llms-full.txt") : "";

for (const file of pageFiles) {
  assert(exists(file), `Missing AI-SEO page file: ${file}`);
}

for (const file of pageFiles) {
  const source = read(file);
  assert(source.includes("generatePageMetadata"), `${file} must use generatePageMetadata.`);
  assert(source.includes(`ogImage: "${aiSeoOgImage}"`), `${file} must use the AI-SEO OpenGraph image.`);
  assert(source.includes("generateFAQSchema"), `${file} must emit FAQPage schema.`);
  assert(source.includes("generateBreadcrumbSchema"), `${file} must emit BreadcrumbList schema.`);
  assert(source.includes("<JsonLd"), `${file} must render JSON-LD.`);
}

assert(exists(`public${aiSeoOgImage}`), `Missing OpenGraph image: public${aiSeoOgImage}`);

assert(
  read("src/app/ai-optimized-seo/page.tsx").includes("generateAISEOServiceSchema") &&
    read("src/app/ai-optimized-seo/page.tsx").includes("generateAggregateOfferSchema"),
  "AI-SEO hub must emit Service and AggregateOffer schema."
);

for (const file of pageFiles.slice(1)) {
  const source = read(file);
  assert(source.includes("generateAISEOTierServiceSchema"), `${file} must emit tier Service schema.`);
  assert(source.includes("generateOfferSchema"), `${file} must emit Offer schema.`);
}

assert(sitemap.includes("AI_SEO_OVERVIEW"), "Sitemap must include AI_SEO_OVERVIEW.");
assert(sitemap.includes("AI_SEO_TIERS"), "Sitemap must include AI_SEO_TIERS.");
assert(!robots.includes('disallow: ["/api/", "/p/", "/ai-optimized-seo"'), "Robots must not block AI-SEO routes.");

for (const route of aiSeoRoutes) {
  const absoluteRoute = `${siteUrl}${route}`;
  assert(sitemap.includes("AI_SEO_TIERS") || sitemap.includes(route), `Sitemap must cover ${route}.`);
  assert(llms.includes(absoluteRoute), `public/llms.txt must include ${absoluteRoute}.`);
  assert(aiPolicy.includes(absoluteRoute), `public/ai.txt must include ${absoluteRoute}.`);
  assert(llmsFull.includes(absoluteRoute), `public/llms-full.txt must include ${absoluteRoute}.`);
}

assert(!llms.includes("URL: https://itecs.ai/insights\nGenerative Engine Optimization"), "AI-SEO llms.txt entry must not point at /insights.");
assert(exists("public/llms-full.txt"), "public/llms-full.txt must exist.");

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
  const keywordsStart = target.block.indexOf("keywords:");
  const keywordsEnd = target.block.indexOf("]", keywordsStart);
  const keywordsBlock = target.block.slice(keywordsStart, keywordsEnd);
  const faqMatches = target.block.match(/question: "/g) ?? [];

  assert(title, `${target.name} must define a metadata title.`);
  assert(description, `${target.name} must define a metadata description.`);
  assert(
    `${title}${titleSuffix}`.length <= 60,
    `${target.name} title is too long after template suffix: ${`${title}${titleSuffix}`.length} chars.`
  );
  assert(
    description.length <= 160,
    `${target.name} description is too long: ${description.length} chars.`
  );
  assert(keywordsBlock.includes("SEO"), `${target.name} keywords should include SEO intent.`);
  assert(keywordsBlock.includes("Dallas"), `${target.name} keywords should include Dallas/local intent.`);
  assert(faqMatches.length >= 5, `${target.name} should expose at least 5 FAQ items.`);
}

const aiSeoServiceSchema = extractFunctionBlock(seo, "generateAISEOServiceSchema");
const aiSeoTierServiceSchema = extractFunctionBlock(seo, "generateAISEOTierServiceSchema");
const offerEntity = extractFunctionBlock(seo, "generateOfferEntity");
const offerSchema = extractFunctionBlock(seo, "generateOfferSchema");
const aggregateOfferSchema = extractFunctionBlock(seo, "generateAggregateOfferSchema");

assert(
  aiSeoServiceSchema.includes("hasOfferCatalog") && aiSeoServiceSchema.includes("offers"),
  "AI-SEO hub Service schema should connect the service to its offer catalog."
);
assert(
  aiSeoTierServiceSchema.includes("offers"),
  "AI-SEO tier Service schema should connect each tier to its Offer."
);
assert(
  offerEntity.includes("itemOffered") ||
    offerSchema.includes("itemOffered") ||
    aggregateOfferSchema.includes("itemOffered"),
  "AI-SEO Offer schema should identify the service being offered."
);
assert(
  seo.includes("#service") && seo.includes("#offer"),
  "AI-SEO schema helpers should define stable @id values for Service and Offer nodes."
);

assert(header.includes("MEGA_MENU_CATEGORIES"), "Header should use centralized mega-menu categories.");
assert(constants.includes('href: "/ai-optimized-seo"'), "Mega-menu categories should link the AI-SEO hub.");
assert(servicesGrid.includes("10 AI Services"), "Services grid should reflect 10 AI services.");

for (const [fileName, source] of [
  ["src/app/services/page.tsx", servicesPage],
  ["src/components/sections/ServicesHero.tsx", servicesHero],
  ["src/components/sections/ServiceJourneyDiagram.tsx", serviceJourney],
  ["src/app/managed-intelligence-provider/page.tsx", mipPage],
]) {
  assert(!source.includes("9 managed AI services"), `${fileName} still says 9 managed AI services.`);
}

assert(
  serviceJourney.includes("AI-Optimized SEO") && serviceJourney.includes("/ai-optimized-seo"),
  "Service journey should include the AI-Optimized SEO service link."
);

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO audit passed for AI-Optimized SEO service pages.");
