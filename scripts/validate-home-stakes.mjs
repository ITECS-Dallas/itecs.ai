import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync(
  join(process.cwd(), "src/components/sections/AIAdoptionUnderstanding.tsx"),
  "utf8",
);

for (const value of [
  "AI adoption fails without governance, security, and operations.",
  "Governance",
  "Security",
  "ROI",
  "Integration",
]) {
  if (!source.includes(value)) {
    throw new Error(`Homepage stakes section missing: ${value}`);
  }
}

if (source.includes("ScrollReveal")) {
  throw new Error("Homepage stakes section must render on load");
}

console.log("Homepage stakes validation passed");
