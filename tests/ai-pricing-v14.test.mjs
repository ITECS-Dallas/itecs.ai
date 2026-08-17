import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const constants = read("src/lib/constants.ts");
const pricingPage = read("src/app/pricing/page.tsx");

describe("AI Services Program v1.4 pricing contract", () => {
  it("keeps every authoritative SKU and exact published amount in one catalog", () => {
    const requiredOfferings = [
      ["AI Readiness Assessment", "$6,500"],
      ["Executive AI Literacy Briefing", "$4,500 / session"],
      ["Team AI Workshop", "$2,900 / session"],
      ["Power-User Coaching (1:1)", "$650 / session or $2,400 / 4-pack"],
      ["Internal AI Champion Program", "$8,500–$12,000"],
      ["Guided Build Session", "$650"],
      ["Guided Build Sprint (4 sessions)", "$2,400"],
      ["Guided Build Intensive (8 sessions)", "$4,400"],
      ["Local Agent Sprint", "$4,500–$9,500"],
      ["Departmental Local Agent", "$9,500–$18,000"],
      ["Data Readiness Sprint", "$3,500–$8,500"],
      ["AI Platform Deployment Readiness", "$8,500–$15,000"],
      ["AI Governance Baseline Bundle", "$14,500 (vs. $16,500 à la carte)"],
      ["Agent Discovery & Technical Specification", "$4,500–$7,500"],
      ["Proof of Concept / Prototype", "$8,000–$18,000"],
      ["Single-Workflow Production Agent", "$18,000–$35,000"],
      ["Integrated / Line-of-Business Agent", "$35,000–$75,000"],
      [
        "Multi-Agent System / AI-Augmented Process Redesign",
        "$55,000–$120,000",
      ],
    ];

    for (const [name, price] of requiredOfferings) {
      const nameIndex = constants.indexOf(`name: "${name}"`);
      assert.ok(nameIndex >= 0, `${name} must exist in the authoritative catalog`);
      assert.ok(
        constants.indexOf(`price: "${price}"`, nameIndex) > nameIndex,
        `${name} must publish ${price}`,
      );
    }

    for (const [tier, price] of [
      ["MIS Core", "$1,950/mo"],
      ["MIS Growth", "$2,650/mo"],
      ["MIS Scale", "$3,500/mo"],
    ]) {
      assert.match(
        constants,
        new RegExp(
          `tier: "${tier}"[\\s\\S]*?price: "${price.replaceAll("$", "\\$")}"`,
        ),
      );
    }

    assert.match(constants, /agents: "2 production agents", price: "\$4,500\/mo"/);
    assert.match(constants, /name: "AI Retainer"[\s\S]*?price: "\$3,375"/);
    assert.match(constants, /AI_PRICING_EFFECTIVE_DATE = "July 8, 2026"/);
  });

  it("keeps renderers and JSON-LD free of duplicated price literals", () => {
    for (const relativePath of [
      "src/app/pricing/page.tsx",
      "src/components/sections/AIPricingPreview.tsx",
      "src/components/sections/PricingTable.tsx",
      "src/app/services/ai-champion-program/page.tsx",
    ]) {
      assert.doesNotMatch(
        read(relativePath),
        /\$[0-9]/,
        `${relativePath} must derive AI prices from the authoritative catalog`,
      );
    }

    assert.match(pricingPage, /schemaPrice: offering\.schemaPrice/);
    assert.match(pricingPage, /AI_PRICING_FAQ/);
    assert.match(pricingPage, /generateFAQSchema\(AI_PRICING_FAQ\)/);
    assert.match(
      pricingPage,
      /"@id": `\$\{SITE_CONFIG\.url\}\/pricing#offer-\$\{schemaId\}`/,
    );
    assert.match(
      pricingPage,
      /"@id": `\$\{SITE_CONFIG\.url\}\/pricing#service-\$\{schemaId\}`/,
    );
    assert.match(
      pricingPage,
      /"@id": `\$\{SITE_CONFIG\.url\}\/#organization`/,
    );
  });

  it("rejects removed SKUs, stale names, stale prices, and stale retainer terms", () => {
    const publicPricingSurfaces = [
      "src/app/pricing/page.tsx",
      "src/components/sections/AIPricingPreview.tsx",
      "src/components/sections/PricingTable.tsx",
      "src/lib/intelligence/knowledge.ts",
      "src/lib/intelligence/precision.ts",
      "src/lib/intelligence/provider.ts",
      "docs/intelligence-os.md",
      "public/ai.txt",
      "public/llms.txt",
    ]
      .map(read)
      .join("\n");

    assert.doesNotMatch(
      constants,
      /AI Pilot Implementation - (?:Small|Production)|Managed AI (?:Starter|Standard|Plus)|Integrated \/ Financial Workpaper Agent|\$3,500\/session|\$12,500|\$21,500/,
    );
    assert.doesNotMatch(
      publicPricingSurfaces,
      /Managed AI (?:Starter|Standard|Plus)|Integrated \/ Financial Workpaper Agent|\$3,500\/session|\$12,500|\$21,500|no expiration|does not expire/i,
    );
  });
});
