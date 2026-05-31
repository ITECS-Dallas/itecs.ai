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

function assertNoPattern(source, pattern, label) {
  const match = source.match(pattern);
  if (match) {
    throw new Error(`${label} still contains retired framing: ${match[0]}`);
  }
}

const constants = read("src/lib/constants.ts");
const constantsCore = [
  constants.slice(0, constants.indexOf("export const INSIGHTS")),
  constants.slice(constants.indexOf("export const INSIGHTS_FAQ")),
].join("\n");

const altitudeFiles = [
  "src/app/about/page.tsx",
  "src/app/ai-receptionist/page.tsx",
  "src/app/automation/page.tsx",
  "src/app/consulting/page.tsx",
  "src/app/crm-sales-ai/page.tsx",
  "src/app/data-audit/page.tsx",
  "src/app/insights/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/services/page.tsx",
  "src/app/services/ai-champion-program/page.tsx",
  "src/components/sections/PainPoint.tsx",
  "src/components/sections/SecurityGuarantee.tsx",
  "src/components/sections/ServicesHero.tsx",
]
  .map((file) => `${file}\n${read(file)}`)
  .join("\n\n");

const retiredPositioning = /\b(?:small business(?:es)?|SMB(?:s)?)\b/i;
assertNoPattern(constantsCore, retiredPositioning, "Core constants");
assertNoPattern(altitudeFiles, retiredPositioning, "Primary public pages/components");

assert(
  constants.includes("value: 24") &&
    constants.includes("value: 92") &&
    constants.includes("value: 200") &&
    constants.includes("Years of IT Operations") &&
    constants.includes("Client Retention Rate") &&
    constants.includes("Client Engagements"),
  "Approved live proof stats must remain available from constants.",
);

for (const sourceFile of [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/ai.txt",
]) {
  const source = read(sourceFile);
  assert(
    !source.includes("95% retention") &&
      !source.includes("75 clients") &&
      !source.includes("99.9% uptime"),
    `${sourceFile} must not ship the old disputed proof-stat set.`,
  );
}

for (const expected of [
  "Phoenix Capital",
  "First Choice Containers",
  "BURNCO",
  "Ad Pages",
  "Sterling Family Partners",
  "Microsoft",
  "Microsoft Azure",
  "Microsoft Copilot",
  "Claude",
  "OpenAI",
  "Sophos",
]) {
  assert(constants.includes(expected), `Approved proof asset must remain: ${expected}`);
}

const darkThemeSources = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/pricing/page.tsx",
  "src/app/managed-intelligence-provider/page.tsx",
  "src/components/sections/AIDevOpsWorkflowDiagram.tsx",
  "src/components/sections/AIPracticeAreas.tsx",
]
  .map(read)
  .join("\n");

assertNoPattern(
  darkThemeSources,
  /\bbg-(?:slate-50|gray-50|zinc-50|neutral-50)\b|\bbg-white(?=[\s"'])|\btext-black\b/,
  "Primary dark-theme surfaces",
);

console.log("Epic 9 content and launch copy validation passed");
