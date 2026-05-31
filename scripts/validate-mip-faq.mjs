import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const page = read("src/app/managed-intelligence-provider/page.tsx");
const constants = read("src/lib/constants.ts");
const faq = read("src/components/sections/FAQ.tsx");
const structural = read("src/components/ui/Structural.tsx");
const combined = `${page}\n${constants}\n${faq}\n${structural}`;

for (const value of [
  "MIP_ENTERPRISE_FAQ",
  "data security",
  "model choice",
  "integration",
  "pricing model",
  "IP ownership",
  "getting started",
  "generateFAQSchema(MIP_ENTERPRISE_FAQ)",
  "Accordion",
  "aria-expanded",
  "onKeyDown",
]) {
  if (!combined.includes(value)) {
    throw new Error(`MIP FAQ contract missing: ${value}`);
  }
}

const faqBlock = constants.match(/export const MIP_ENTERPRISE_FAQ = \[(.*?)\] as const;/s)?.[1] ?? "";
const questionCount = [...faqBlock.matchAll(/question:/g)].length;
if (questionCount < 6) {
  throw new Error(`MIP FAQ must include at least 6 questions, found ${questionCount}`);
}

if (page.includes("const MIP_FAQ")) {
  throw new Error("MIP FAQ content should live in constants.ts, not the page");
}

console.log("MIP FAQ validation passed");
