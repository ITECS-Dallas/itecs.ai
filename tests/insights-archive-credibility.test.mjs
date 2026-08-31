import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");

function record(slug) {
  const start = constants.indexOf(`    slug: "${slug}",`);
  assert.notEqual(start, -1, `missing Insights record: ${slug}`);
  const next = constants.indexOf("\n  {\n    slug:", start + 1);
  return constants.slice(start, next === -1 ? constants.length : next);
}

const maintained = [
  "openai-codex-vs-claude-code",
  "secure-ai-agents-1password-secrets",
  "claude-plan-comparison",
  "self-hosted-ai-agents-seafile",
  "claude-fable-5-release",
  "openclaw-security-crisis",
  "claude-cowork-for-small-business",
  "ceo-guide-ai-roi",
  "agentic-ai-workflows-enterprise-operations",
  "how-to-use-ai-small-business",
  "secure-business-data-chatgpt",
  "automate-lead-follow-up",
  "mcp-is-the-new-api",
];

test("materially corrected archive articles preserve publication dates and expose maintenance dates", () => {
  for (const slug of maintained) {
    const source = record(slug);
    assert.match(source, /publishedDate: "2026-/, `${slug} must retain its original publication date`);
    assert.match(source, /modifiedDate: "2026-08-31"/, `${slug} must expose the correction date`);
  }
});

test("corrected archive rejects unsupported outcomes, absolutes, and obsolete plan claims", () => {
  const source = maintained.map(record).join("\n");
  for (const forbidden of [
    /requires (?:a )?minimum of five seats/i,
    /with a five-seat minimum/i,
    /data never leaves your (?:environment|infrastructure)/i,
    /full compliance with HIPAA/i,
    /BAA included/i,
    /we (?:worked with|advised|recently helped)/i,
    /Dallas clients who implement/i,
    /most well-scoped (?:AI )?workflows should clear payback/i,
    /MCP is not optional/i,
    /by the end of 2026, almost every business application/i,
    /Recipients cannot tell the difference/i,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});

test("volatile comparison routes cite current primary documentation", () => {
  const claude = readFileSync(
    join(root, "src/app/insights/claude-plan-comparison/page.tsx"),
    "utf8",
  );
  const secure = readFileSync(
    join(root, "src/app/insights/secure-business-data-chatgpt/page.tsx"),
    "utf8",
  );
  const coding = readFileSync(
    join(root, "src/app/insights/openai-codex-vs-claude-code/page.tsx"),
    "utf8",
  );

  assert.match(claude, /9266767-what-is-the-team-plan/);
  assert.match(claude, /8114513-business-associate-agreements/);
  assert.match(secure, /openai\.com\/business-data/);
  assert.match(secure, /azure\/foundry\/responsible-ai\/openai\/data-privacy/);
  assert.match(coding, /developers\.openai\.com\/codex/);
  assert.match(coding, /docs\.anthropic\.com\/en\/docs\/claude-code\/overview/);
});
