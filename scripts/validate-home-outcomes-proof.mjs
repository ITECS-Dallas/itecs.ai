import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/OutcomesProof.tsx"),
  "utf8",
);

for (const value of [
  "OutcomesProof",
  "HOMEPAGE_OUTCOMES_PROOF",
  "Pegasus Foods",
  "OpenText",
  "PepsiCo",
  "Public case study",
  "sourceHref",
]) {
  if (!`${page}\n${constants}\n${component}`.includes(value)) {
    throw new Error(`Homepage outcomes proof missing: ${value}`);
  }
}

if (!component.includes("return null")) {
  throw new Error("OutcomesProof must render nothing when sourced proof is absent");
}

if (!component.includes("cases.map") || !component.includes("metrics.map")) {
  throw new Error("OutcomesProof must render sourced metrics and case cards from data");
}

console.log("Homepage outcomes proof validation passed");
