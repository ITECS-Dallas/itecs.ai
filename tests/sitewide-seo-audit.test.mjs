import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { inventoryForUrl, parseSitemap } from "../scripts/sitewide-seo-audit.mjs";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

test("sitemap parser preserves canonical URLs and maintained dates", () => {
  const xml = `<?xml version="1.0"?><urlset>
    <url><loc>https://itecs.ai/</loc></url>
    <url><loc>https://itecs.ai/insights/example?a=1&amp;b=2</loc><lastmod>2026-08-15</lastmod></url>
  </urlset>`;
  assert.deepEqual(parseSitemap(xml), [
    { url: "https://itecs.ai/", lastModified: null },
    {
      url: "https://itecs.ai/insights/example?a=1&b=2",
      lastModified: "2026-08-15",
    },
  ]);
});

test("page inventory assigns canonical owners and buyer-journey classes", () => {
  const article = inventoryForUrl("https://itecs.ai/insights/example");
  const industry = inventoryForUrl("https://itecs.ai/manufacturing/ppv-agent");
  const contact = inventoryForUrl("https://itecs.ai/contact");

  assert.equal(article.pageClass, "insights-article");
  assert.match(article.canonicalOwner, /src\/app\/insights\/example\/page\.tsx/);
  assert.equal(industry.nearestCompetingRoute, "/manufacturing");
  assert.equal(contact.primaryConversion, "contact form submission");
});

test("sitemap dates are stable, source-backed, and exclude private routes", () => {
  const sitemap = read("src/app/sitemap.ts");
  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
  assert.match(sitemap, /new Date\(i\.modifiedDate \?\? i\.publishedDate\)/);
  assert.doesNotMatch(sitemap, /`\$\{base\}\/p\//);
  assert.doesNotMatch(sitemap, /`\$\{base\}\/api\//);
});

test("every Insights record has one route with shared date, metadata, and citation contracts", () => {
  const constants = read("src/lib/constants.ts");
  const start = constants.indexOf("export const INSIGHTS: InsightItem[]");
  const end = constants.indexOf("export const INSIGHTS_FAQ", start);
  const insightBlock = constants.slice(start, end);
  const slugs = [...insightBlock.matchAll(/\n\s{4}slug: "([^"]+)",/g)].map(
    (match) => match[1],
  );
  const routeRoot = join(root, "src/app/insights");
  const routes = readdirSync(routeRoot)
    .filter((entry) => statSync(join(routeRoot, entry)).isDirectory())
    .filter((entry) => statSync(join(routeRoot, entry, "page.tsx"), { throwIfNoEntry: false }))
    .sort();

  assert.equal(slugs.length, 45);
  assert.deepEqual([...slugs].sort(), routes);

  for (const slug of slugs) {
    const page = read(`src/app/insights/${slug}/page.tsx`);
    assert.ok(page.includes(`"${slug}"`), `${slug} must bind its INSIGHTS record`);
    assert.match(page, /generatePageMetadata\(/, `${slug} must use shared metadata`);
    assert.match(page, /const sources: ArticleSource\[\] = \[/, `${slug} must declare sources`);
    assert.match(page, /publishedDate=\{insight\.publishedDate\}/, `${slug} must preserve publication date`);
    assert.match(page, /modifiedDate=\{insight\.modifiedDate\}/, `${slug} must pass maintained modification date`);
  }
});

test("known stale citations are replaced with current direct sources", () => {
  const publicSource = [
    read("src/app/automation/page.tsx"),
    read("src/app/insights/how-to-use-ai-small-business/page.tsx"),
    read("src/app/insights/chatgpt-ads-prepare-ai-search-marketing/page.tsx"),
    read("src/app/insights/claude-cowork-for-small-business/page.tsx"),
    read("src/app/insights/ai-kill-switch-plan-emergency-stops/page.tsx"),
    read("src/app/insights/ai-enabled-app-inventory-govern-software/page.tsx"),
    read("src/lib/constants.ts"),
  ].join("\n");

  for (const stale of [
    "power-automate/security-privacy-compliance",
    "openai.com/chatgpt/business/",
    "anthropic.com/claude/business",
    "theaipn.org/ai-kill-switch/",
    "answer/16297775) ",
    "globenewswire.com/news-release/2026/07/20/3329638",
  ]) {
    assert.ok(!publicSource.includes(stale), `stale citation remains: ${stale}`);
  }
});

test("AI-SEO copy rejects formulaic files, schema, FAQ, ranking, and citation promises", () => {
  const constants = read("src/lib/constants.ts");
  const start = constants.indexOf("export const AI_SEO_OVERVIEW");
  const end = constants.indexOf("// Comparison rows for SEO Velocity", start);
  const source = `${constants.slice(start, end)}\n${read("src/app/consulting/page.tsx")}`;

  for (const forbidden of [
    /llms\.txt and llms-full\.txt generation for AI ingestion/i,
    /files for AI training and runtime ingestion/i,
    /answer engines require/i,
    /so AI platforms can interpret and cite/i,
    /rankings that prove our playbook/i,
    /most clients see meaningful ranking improvements/i,
    /do-follow backlink/i,
    /AI assistants cite you as the answer/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }

  assert.match(source, /not a Google Search requirement/i);
  assert.match(source, /cannot guarantee an Overview, mention, ranking, recommendation, or citation/i);
  assert.match(source, /Useful visible FAQs when buyers need them, not as a rich-result requirement/i);
  assert.match(source, /sponsorship disclosure when required/i);
});

test("service proof is labeled as modeled planning evidence and the public count is consistent", () => {
  const painPoint = read("src/components/sections/PainPoint.tsx");
  const pricing = read("src/components/sections/PricingROI.tsx");
  const stats = read("src/components/sections/ServiceStats.tsx");
  const services = read("src/app/services/page.tsx");

  assert.match(painPoint, /not presented as a reported client result/);
  assert.match(painPoint, /not a\s+reported client result or performance guarantee/);
  assert.match(pricing, /not a reported client result or guarantee/);
  assert.match(stats, /not reported client results or performance guarantees/);
  assert.match(services, /all 10 services/);
  assert.doesNotMatch(services, /all 9 services/);
});

test("shared schema owners use stable IDs and images use the built-in optimizer", () => {
  const seo = read("src/lib/seo.ts");
  const nextConfig = read("next.config.ts");

  assert.match(seo, /`\$\{SITE_CONFIG\.url\}\/\#organization`/);
  assert.match(seo, /`\$\{SITE_CONFIG\.url\}\$\{service\.href\}#service`/);
  assert.match(seo, /`\$\{url\}#article`/);
  assert.match(seo, /`\$\{SITE_CONFIG\.url\}\/\#editorial-team`/);
  assert.doesNotMatch(nextConfig, /unoptimized:\s*true/);
});
