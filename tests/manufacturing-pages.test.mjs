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

  it("includes an executive manufacturing metrics chart", () => {
    const hub = read("src/app/manufacturing/page.tsx");
    const ppv = read("src/app/manufacturing/ppv-agent/page.tsx");
    const constants = read("src/lib/constants.ts");

    assert.match(hub, /ManufacturingMetricsChart/);
    assert.match(ppv, /ManufacturingMetricsChart/);
    assert.match(constants, /Projected PPV exposure/);
    assert.match(constants, /Recoverable pass-through/);
    assert.match(constants, /Inventory cash at risk/);
  });

  it("publishes both manufacturing pages in the sitemap source", () => {
    const sitemap = read("src/app/sitemap.ts");
    const constants = read("src/lib/constants.ts");

    assert.match(sitemap, /MANUFACTURING_VERTICAL/);
    assert.match(sitemap, /PPV_AGENT_USE_CASE/);
    assert.match(constants, /href: "\/manufacturing"/);
    assert.match(constants, /href: "\/manufacturing\/ppv-agent"/);
  });
});
