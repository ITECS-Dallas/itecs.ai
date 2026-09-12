import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const constants = read("src/lib/constants.ts");
const guides = constants.slice(
  constants.indexOf("export const SERVICE_DECISION_GUIDES"),
  constants.indexOf("export const NAV_LINKS"),
);

test("2002 describes the parent organization, not the AI division", () => {
  const seo = read("src/lib/seo.ts");
  const organization = seo.slice(
    seo.indexOf("export function generateOrganizationSchema"),
    seo.indexOf("export function generateLocalBusinessSchema"),
  );
  assert.doesNotMatch(organization.split("parentOrganization:")[0], /foundingDate/);
  const parent = organization.split("parentOrganization: {")[1].split("    },")[0];
  assert.match(parent, /legalName: SITE_CONFIG\.legalName/);
  assert.match(parent, /foundingDate: String\(SITE_CONFIG\.foundingYear\)/);
  assert.match(organization, /"@id": `\$\{SITE_CONFIG\.url\}\/#organization`/);
});

test("decision links resolve to existing service owners without creating city variants", () => {
  const hrefs = [...guides.matchAll(/href: "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(hrefs, [
    "/copilot-training", "/chatgpt-codex-training", "/claude-cowork-training",
    "/consulting", "/custom-ai-agents", "/managed-intelligence-provider",
  ]);
  for (const href of hrefs) {
    assert.ok(existsSync(new URL(`../src/app${href}/page.tsx`, import.meta.url)), href);
  }
});

test("both hubs add one server-rendered guide and preserve existing metadata helpers", () => {
  for (const service of ["training", "automation"]) {
    const page = read(`src/app/${service}/page.tsx`);
    assert.equal(page.split(`<ServiceDecisionGuide service="${service}" />`).length - 1, 1);
    assert.match(page, /generatePageMetadata/);
  }
  const component = read("src/components/sections/ServiceDecisionGuide.tsx");
  assert.doesNotMatch(component, /use client|framer-motion|useEffect|dangerouslySetInnerHTML/);
  assert.match(component, /<SectionHeading/);
  assert.match(component, /<h3/);
  assert.match(component, /min-h-11/);
  assert.match(component, /focus-visible:outline/);
  assert.match(component, /href="\/contact"/);
});

test("scoping guidance distinguishes general ChatGPT from engineering and protects intake", () => {
  assert.match(guides, /Everyday ChatGPT training does not require a coding project/);
  assert.match(guides, /sanitized example/);
  assert.match(guides, /not credentials, client records, or production exports/);
  assert.match(guides, /building a workflow and operating it are separate scopes/);
  assert.doesNotMatch(guides, /guarantee|\$\d|\d+%|office in (Plano|Fort Worth)/i);
});
