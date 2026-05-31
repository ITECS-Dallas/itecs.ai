import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const constants = read("src/lib/constants.ts");
const mipPage = read("src/app/managed-intelligence-provider/page.tsx");
const llms = read("public/llms.txt");
const llmsFull = read("public/llms-full.txt");
const aiPolicy = read("public/ai.txt");

assert(
  constants.includes("A Managed Intelligence Provider is") &&
    constants.includes("model governance") &&
    constants.includes("executive reporting"),
  "MIP content must include a clear extractable definition with entity-rich operating details.",
);

const faqBlockStart = constants.indexOf("export const MIP_ENTERPRISE_FAQ");
const faqBlockEnd = constants.indexOf("] as const;", faqBlockStart);
const faqBlock = constants.slice(faqBlockStart, faqBlockEnd);

assert(
  (faqBlock.match(/question: "/g) ?? []).length >= 6 &&
    faqBlock.includes("data security") &&
    faqBlock.includes("model choice") &&
    faqBlock.includes("IP ownership") &&
    faqBlock.includes("getting started"),
  "MIP FAQ must expose enterprise Q&A blocks for AI answer extraction.",
);

assert(
  mipPage.includes("Managed Intelligence Provider FAQ") &&
    mipPage.includes("generateFAQSchema(MIP_ENTERPRISE_FAQ)"),
  "MIP page must render Q&A blocks and FAQPage schema from the same source.",
);

for (const [label, source] of [
  ["llms.txt", llms],
  ["llms-full.txt", llmsFull],
  ["ai.txt", aiPolicy],
]) {
  assert(
    source.includes("https://itecs.ai/managed-intelligence-provider"),
    `${label} must include the MIP canonical URL.`,
  );
  assert(
    !source.includes("99.9% uptime"),
    `${label} must not ship the unapproved disputed uptime proof point.`,
  );
}

assert(
  llmsFull.includes("A Managed Intelligence Provider is") &&
    llms.includes("Managed Intelligence Provider") &&
    aiPolicy.includes("Managed Intelligence Provider"),
  "AI-facing policy files must include the extractable MIP definition and entity name.",
);

console.log("Epic 8 GEO and answer-engine validation passed");
