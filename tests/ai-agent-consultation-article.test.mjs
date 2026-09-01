import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const constants = read("src/lib/constants.ts");
const slug = "how-to-make-ai-agents-talk";
const start = constants.indexOf(`    slug: "${slug}",`);
const next = constants.indexOf("\n  {\n    slug:", start + 1);
const article = constants.slice(start, next);
const route = read(`src/app/insights/${slug}/page.tsx`);
const flow = read("src/components/sections/AgentConsultationFlow.tsx");

test("article owns the two-agent consultation search intent", () => {
  assert.notEqual(start, -1, "Insights record must exist");
  assert.match(article, /title: "How to Make Two AI Agents Talk to Each Other"/);
  assert.match(article, /href: "\/insights\/how-to-make-ai-agents-talk"/);
  assert.match(article, /how to make two AI agents talk to each other/i);
  assert.match(article, /AI agent to AI agent communication/i);
  assert.match(article, /multi-agent collaboration workflow/i);
});

test("article contains the complete bounded consultation workflow", () => {
  for (const requirement of [
    /Agent A drafts before it consults/i,
    /sends a focused consultation packet/i,
    /waits for a complete response/i,
    /asks follow-up questions/i,
    /reconciles disagreement against evidence/i,
    /records what changed/i,
    /finalizes, then invokes formal review/i,
  ]) {
    assert.match(article, requirement);
  }

  for (const implementationDetail of [
    /conversation ID/i,
    /unique message ID/i,
    /sender, recipient, role/i,
    /selected context/i,
    /timeouts and turn limits/i,
    /provenance/i,
    /retention policy/i,
  ]) {
    assert.match(article, implementationDetail);
  }
});

test("consultation remains distinct from formal review and proof", () => {
  assert.match(article, /Consultative Chat Is Not a Formal Completed-Work Review/);
  assert.match(article, /A formal review starts with a completed, versioned artifact/i);
  assert.match(article, /Two model opinions are still two opinions, not independent proof/i);
  assert.doesNotMatch(article, /guarantees? (?:accuracy|correctness|a better answer)/i);
  assert.doesNotMatch(article, /(?:native|built-in) Codex.{0,50}Fable (?:integration|connection)/i);
  assert.match(article, /not a claim that the two products natively discover each other/i);
});

test("route uses shared metadata, schema layout, primary sources, and rich flow", () => {
  assert.match(route, /generatePageMetadata\(/);
  assert.match(route, /title: "How to Make Two AI Agents Talk to Each Other"/);
  assert.match(route, /const sources: ArticleSource\[\] = \[/);
  assert.match(route, /developers\.openai\.com\/codex\/sdk/);
  assert.match(route, /openai\.github\.io\/openai-agents-js\/guides\/multi-agent/);
  assert.match(route, /a2a-protocol\.org\/latest\/specification/);
  assert.match(route, /anthropic\.com\/news\/claude-fable-5-mythos-5/);
  assert.match(route, /publishedDate=\{insight\.publishedDate\}/);
  assert.match(route, /modifiedDate=\{insight\.modifiedDate\}/);
  assert.match(route, /AGENT_CONSULTATION_FLOW: <AgentConsultationFlow \/>/);
  assert.match(flow, /role="img"/);
  assert.match(flow, /<figcaption/);
});

test("FAQ answers high-intent implementation questions visibly and in schema data", () => {
  for (const question of [
    "How do I make two AI agents talk to each other?",
    "What is AI agent-to-agent communication?",
    "Can Codex consult another AI agent such as Fable 5?",
    "Does using two AI agents make an answer more accurate?",
    "What is the difference between agent consultation and agent review?",
    "How do I stop AI agents from talking in an infinite loop?",
    "Do I need A2A or MCP to connect two AI agents?",
  ]) {
    assert.ok(article.includes(`question: "${question}"`), `missing FAQ: ${question}`);
  }
});
