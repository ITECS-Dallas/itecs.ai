import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/SecurityGovernanceBand.tsx"),
  "utf8",
);

for (const value of [
  "SecurityGovernanceBand",
  "SECURITY_GOVERNANCE_BAND",
  "SOC 2 Type II",
  "HIPAA / BAA",
  "CMMC",
  "Data residency",
  "Human-in-the-loop",
  "NIST AI RMF",
  "CERTIFICATION_BADGES",
]) {
  if (!`${page}\n${constants}\n${component}`.includes(value)) {
    throw new Error(`Security governance band missing: ${value}`);
  }
}

if (!component.includes("return null")) {
  throw new Error("SecurityGovernanceBand must render nothing without real credential data");
}

if (!component.includes("frameworks.map") || !component.includes("controls.map")) {
  throw new Error("SecurityGovernanceBand must render frameworks and controls from data");
}

console.log("Security governance band validation passed");
