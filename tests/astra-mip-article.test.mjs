import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const constants = readFileSync("src/lib/constants.ts", "utf8");
const slug = "gpt-6-astra-managed-intelligence-providers";
const start = constants.indexOf(`    slug: "${slug}",`);
const end = constants.indexOf("\n  {\n    slug:", start + 1);
const article = constants.slice(start, end);
const route = readFileSync(`src/app/insights/${slug}/page.tsx`, "utf8");

test("Astra article has one canonical record with dated, model-specific intent", () => {
  assert.notEqual(start, -1);
  assert.equal(constants.split(`slug: "${slug}"`).length - 1, 1);
  assert.match(article, /publishedDate: "2026-09-05"/);
  assert.match(article, /GPT-6 Astra: A Managed Intelligence Provider Playbook/);
  assert.ok(article.includes(`href: "/insights/${slug}"`));
  assert.match(article, /hubHref: "\/custom-ai-agents"/);
  assert.doesNotMatch(article, /Astara|guaranteed savings|guarantees accuracy/i);
});

test("Astra adoption guidance retains access, evidence, and governance limits", () => {
  for (const requirement of [
    /does not grant API access/,
    /not a claim of measured Astra results/,
    /not a promise of zero storage/,
    /illustrative—not a claim/,
    /application-side authorization/,
    /human approval/,
    /Do not automatically retry the blocked activity/,
    /divided by accepted tasks/,
    /manual fallback/,
  ]) assert.match(article, requirement);
});

test("illustrative workflow uses semantic ordered steps and shared article contracts", () => {
  assert.match(constants, /export const ASTRA_ORDER_EXCEPTION_STEPS = \[/);
  assert.match(article, /\[\[ASTRA_ORDER_EXCEPTION\]\]/);
  assert.match(route, /ASTRA_ORDER_EXCEPTION_STEPS\.map/);
  assert.match(route, /<ol /);
  assert.match(route, /value=\{index \+ 1\}/);
  assert.match(route, /generatePageMetadata\(/);
  assert.match(route, /title: insight.title/);
  assert.match(route, /<InsightArticleLayout/);
  assert.match(route, /publishedDate=\{insight.publishedDate\}/);
});

test("material Astra sources are visible and FAQs use the common source of truth", () => {
  for (const sourcePath of [
    "docs/whats-new",
    "enterprise/workspace-model-availability",
    "models/gpt-6-astra",
    "guides/latest-model",
    "guides/async-tool-calling",
    "guides/steering",
    "guides/safety-checks/misalignment-monitoring",
    "guides/your-data",
    "guides/agent-evals",
    "docs/pricing",
  ]) assert.ok(route.includes(sourcePath), `missing source: ${sourcePath}`);
  assert.equal((article.match(/question:/g) ?? []).length, 4);
  assert.match(route, /sources=\{sources\}/);
  assert.doesNotMatch(route, /dangerouslySetInnerHTML|application\/ld\+json/);
});
