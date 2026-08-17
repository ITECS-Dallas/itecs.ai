import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const megaMenuSource = () => read("src/components/layout/HeaderMenus.tsx");

describe("full-screen mega menu", () => {
  it("loads categorized, route-aware panels from the header shell", () => {
    const header = read("src/components/layout/Header.tsx");
    const menu = megaMenuSource();

    assert.match(header, /\.\/HeaderMenus/);
    assert.match(header, /SolutionsMegaMenu/);
    assert.match(header, /IndustriesMenu/);
    assert.match(menu, /solutionsMegaColumns/);
    assert.match(menu, /industryColumns/);
    assert.match(menu, /routeMatches/);
    assert.match(menu, /aria-current=\{active \? "page" : undefined\}/);
    assert.match(menu, /column\.items\.map/);
  });

  it("defines descriptive items for every public menu column", () => {
    const menu = megaMenuSource();

    for (const category of [
      "Managed Intelligence",
      "AI Consulting & Strategy",
      "AI Solutions",
      "Manufacturing",
      "Financial Services",
    ]) {
      assert.match(menu, new RegExp(`title: "${category}"`));
    }

    assert.match(menu, /description:/);
    assert.match(menu, /items:/);
    assert.match(menu, /icon:/);
  });

  it("wires public service, product, industry, resource, and company pages into the mega menu", () => {
    const menu = megaMenuSource();
    const expectedRoutes = [
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
      "/manufacturing",
      "/manufacturing/ppv-agent",
      "/manufacturing/demand-forecasting-sop-ai",
      "/manufacturing/quality-traceability-ai",
      "/financial-services",
      "/financial-services/field-examination-analyzer",
      "/financial-services/cash-flow-model-builder",
      "/financial-services/portfolio-monitoring-covenant-ai",
      "/financial-services/ar-collections-receivables-ai",
      "/insights",
      "/about",
      "/contact",
    ];

    for (const route of expectedRoutes) {
      assert.match(menu, new RegExp(`href: "${route}"`), `${route} should be in the mega menu`);
    }
  });
});
