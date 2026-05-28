import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

describe("manufacturing vertical pages", () => {
  it("defines the manufacturing hub and PPV spoke routes", () => {
    assert.equal(existsSync(join(root, "src/app/manufacturing/page.tsx")), true);
    assert.equal(
      existsSync(join(root, "src/app/manufacturing/ppv-agent/page.tsx")),
      true
    );
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
    assert.match(constants, /href: "\/manufacturing"/);
    assert.match(constants, /href: "\/manufacturing\/ppv-agent"/);
  });

  it("links manufacturing pages from global navigation and footer", () => {
    const header = read("src/components/layout/Header.tsx");
    const footer = read("src/components/layout/Footer.tsx");

    assert.match(header, /Industries/);
    assert.match(header, /Manufacturing AI/);
    assert.match(header, /\/manufacturing\/ppv-agent/);
    assert.match(footer, /Industries/);
    assert.match(footer, /Manufacturing AI/);
    assert.match(footer, /\/manufacturing\/ppv-agent/);
    assert.match(footer, /ITECS MSP/);
    assert.doesNotMatch(footer, /ITECS Main Site/);
  });
});
