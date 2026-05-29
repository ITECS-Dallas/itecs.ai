import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

function megaMenuSource() {
  const constants = read("src/lib/constants.ts");
  const start = constants.indexOf("export const MEGA_MENU_CATEGORIES");
  const end = constants.indexOf("// ---------------------------------------------------------------------------\n// Public AI Pricing");
  assert.ok(start > -1, "MEGA_MENU_CATEGORIES should exist");
  assert.ok(end > start, "mega menu source block should be bounded");
  return constants.slice(start, end);
}

describe("full-screen mega menu", () => {
  it("uses category-aware panels instead of static or blank service columns", () => {
    const header = read("src/components/layout/Header.tsx");

    assert.match(header, /activeCategory/);
    assert.match(header, /onMouseEnter=\{\(\) => setActiveCat\(i\)\}/);
    assert.match(header, /Explore/);
    assert.match(header, /activeCategory\.name/);
    assert.match(header, /activeCategory\.cards\.map/);
    assert.doesNotMatch(header, /MEGA_MENU_FEATURED/);
    assert.doesNotMatch(header, /MEGA_MENU_QUICK_LINKS/);
    assert.doesNotMatch(header, /MEGA_MENU_STATS/);
    assert.doesNotMatch(header, /All services/i);
  });

  it("defines cards and proof context for every root category", () => {
    const menu = megaMenuSource();

    for (const category of [
      "AI Services",
      "AI Products",
      "Industries",
      "Resources",
      "Company",
    ]) {
      assert.match(menu, new RegExp(`name: "${category}"`));
    }

    assert.match(menu, /summary:/);
    assert.match(menu, /proofPoints:/);
    assert.match(menu, /cards:/);
    assert.match(menu, /primaryCta:/);
  });

  it("wires public service, product, industry, resource, and company pages into the mega menu", () => {
    const menu = megaMenuSource();
    const expectedRoutes = [
      "/services",
      "/consulting",
      "/custom-ai-agents",
      "/automation",
      "/ai-devops",
      "/training",
      "/services/ai-champion-program",
      "/data-audit",
      "/ai-receptionist",
      "/crm-sales-ai",
      "/ai-knowledge-base",
      "/ai-optimized-seo",
      "/ai-optimized-seo/foundation",
      "/ai-optimized-seo/momentum",
      "/ai-optimized-seo/velocity",
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
      "/insights",
      "/insights/ceo-guide-ai-roi",
      "/insights/secure-business-data-chatgpt",
      "/insights/agentic-ai-workflows-enterprise-operations",
      "/insights/automate-lead-follow-up",
      "/insights/claude-cowork-for-small-business",
      "/insights/how-to-use-ai-small-business",
      "/insights/mcp-is-the-new-api",
      "/insights/openclaw-security-crisis",
      "/insights/enterprise-agentic-skills-repo",
      "/about",
      "/pricing",
      "/managed-intelligence-provider",
      "/contact",
    ];

    for (const route of expectedRoutes) {
      assert.match(menu, new RegExp(`href: "${route}"`), `${route} should be in the mega menu`);
    }
  });
});
