import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const spokeRoutes = [
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

describe("manufacturing vertical pages", () => {
  it("defines the manufacturing hub and PPV spoke routes", () => {
    assert.equal(existsSync(join(root, "src/app/manufacturing/page.tsx")), true);
    assert.equal(
      existsSync(join(root, "src/app/manufacturing/ppv-agent/page.tsx")),
      true
    );
    for (const route of spokeRoutes) {
      assert.equal(
        existsSync(join(root, `src/app${route}/page.tsx`)),
        true,
        `${route} route should exist`
      );
    }
  });

  it("keeps the approved public positioning in source", () => {
    const hub = read("src/app/manufacturing/page.tsx");
    const ppv = read("src/app/manufacturing/ppv-agent/page.tsx");
    const constants = read("src/lib/constants.ts");

    assert.match(hub, /MANUFACTURING_VERTICAL/);
    assert.match(hub, /\/manufacturing\/ppv-agent/);
    assert.match(constants, /Manufacturing AI Readiness Assessment/);
    assert.match(constants, /Dallas/);
    assert.match(
      constants,
      /PPV Agent: Purchase Price Variance and Commodity Cost Intelligence/
    );
    assert.match(ppv, /PPV_AGENT_USE_CASE/);
    assert.match(constants, /read-heavy/);
    assert.match(constants, /does not autonomously/);
  });

  it("keeps the hub chart broad and the PPV chart use-case specific", () => {
    const hub = read("src/app/manufacturing/page.tsx");
    const ppv = read("src/app/manufacturing/ppv-agent/page.tsx");
    const constants = read("src/lib/constants.ts");

    assert.match(hub, /ManufacturingMetricsChart/);
    assert.match(ppv, /PPVExposureWaterfall/);
    assert.doesNotMatch(ppv, /ManufacturingMetricsChart/);
    assert.match(constants, /Projected PPV exposure/);
    assert.match(constants, /Recoverable pass-through/);
    assert.match(constants, /Inventory cash at risk/);
    assert.match(constants, /PPV_EXPOSURE_WATERFALL/);
    assert.match(constants, /A Waterfall View of What Finance Can Act On Next/);
  });

  it("publishes both manufacturing pages in the sitemap source", () => {
    const sitemap = read("src/app/sitemap.ts");
    const constants = read("src/lib/constants.ts");

    assert.match(sitemap, /MANUFACTURING_VERTICAL/);
    assert.match(sitemap, /PPV_AGENT_USE_CASE/);
    assert.match(sitemap, /MANUFACTURING_SPOKE_PAGES/);
    assert.match(constants, /href: "\/manufacturing"/);
    assert.match(constants, /href: "\/manufacturing\/ppv-agent"/);
    for (const route of spokeRoutes) {
      assert.match(constants, new RegExp(`href: "${route}"`));
    }
  });

  it("links manufacturing pages from full-screen navigation and grouped footer", () => {
    const header = read("src/components/layout/Header.tsx");
    const navData = read("src/components/layout/navData.ts");
    const footer = read("src/components/layout/Footer.tsx");

    assert.match(navData, /MANUFACTURING_HUB_NAV_ITEM/);
    assert.match(navData, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(navData, /PPV_AGENT_USE_CASE/);
    assert.match(navData, /MANUFACTURING_VERTICAL/);
    assert.match(navData, /MANUFACTURING_VERTICAL\.useCases/);
    assert.match(navData, /manufacturingUseCaseOrder/);
    assert.match(navData, /manufacturingUseCaseOrder\.map/);
    assert.match(navData, /resolveManufacturingUseCase/);
    assert.match(navData, /manufacturingNavCopy/);
    assert.doesNotMatch(navData, /label:\s*useCase\.title/);
    assert.doesNotMatch(navData, /desc:\s*useCase\.description/);
    assert.doesNotMatch(navData, /MANUFACTURING_SPOKE_PAGES/);
    assert.match(navData, /href:\s*MANUFACTURING_VERTICAL\.href/);

    assert.match(navData, /href:\s*PPV_AGENT_USE_CASE\.href/);

    const fullScreenMenu = read("src/components/layout/FullscreenNavMenu.tsx");

    assert.match(header, /FullscreenNavMenu/);
    assert.match(header, /aria-label/);
    assert.match(header, /Open site menu/);
    assert.match(header, /Close site menu/);
    assert.match(header, /href="\/contact"/);
    assert.doesNotMatch(header, /SolutionsDropdown/);
    assert.doesNotMatch(header, /IndustriesDropdown/);
    assert.doesNotMatch(header, /const navItems = \[/);

    assert.match(fullScreenMenu, /Manufacturing AI Hub/);
    assert.match(fullScreenMenu, /Dallas team/);
    assert.match(fullScreenMenu, /National manufacturing reach/);
    assert.match(fullScreenMenu, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(fullScreenMenu, /SERVICE_NAV_ITEMS/);

    assert.match(footer, /Manufacturing use cases/);
    assert.match(footer, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(footer, /ITECS MSP/);
    assert.doesNotMatch(footer, /ITECS Main Site/);
  });

  it("defines unique manufacturing spoke concepts and chart modes", () => {
    const constants = read("src/lib/constants.ts");

    assert.match(constants, /Demand Forecasting and S&OP Intelligence/);
    assert.match(constants, /Predictive Maintenance and Downtime Forecasting/);
    assert.match(constants, /Inventory and Working Capital Optimization/);
    assert.match(constants, /Quality, Traceability, and Recall Risk Intelligence/);
    assert.match(constants, /Customer and SKU Profitability Intelligence/);
    assert.match(constants, /Production Scheduling, Yield, and Labor Planning/);
    assert.match(constants, /Contract Intelligence and Pass-Through Recovery/);
    assert.match(constants, /Energy, Freight, and Scope 3 Reporting Intelligence/);
    assert.match(constants, /Vendor Payment and Finance Anomaly Detection/);
    assert.match(constants, /mode: "timeline"/);
    assert.match(constants, /mode: "matrix"/);
    assert.match(constants, /mode: "waterfall"/);
  });
});
