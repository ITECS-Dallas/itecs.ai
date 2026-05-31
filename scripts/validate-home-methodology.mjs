import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/MethodologySteps.tsx"),
  "utf8",
);
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");

for (const value of [
  "MethodologySteps",
  "Assess",
  "Architect",
  "Deploy",
  "Manage & Optimize",
  "AIOperationsConsole",
]) {
  if (!`${page}\n${component}\n${constants}`.includes(value)) {
    throw new Error(`Homepage methodology missing: ${value}`);
  }
}

if (!component.includes("methodologySteps.map")) {
  throw new Error("Homepage methodology must render numbered steps from data");
}

console.log("Homepage methodology validation passed");
