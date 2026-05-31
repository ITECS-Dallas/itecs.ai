import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const page = read("src/app/managed-intelligence-provider/page.tsx");
const constants = read("src/lib/constants.ts");
const component = read("src/components/sections/MethodologySteps.tsx");
const combined = `${page}\n${constants}\n${component}`;

for (const value of [
  "MethodologySteps",
  "Assess",
  "Architect",
  "Deploy",
  "Manage & Optimize",
  "KPI",
  "SLA",
  "Readiness score",
  "Production release checklist",
  "30-day operating review",
  "Monthly optimization review",
]) {
  if (!combined.includes(value)) {
    throw new Error(`MIP methodology contract missing: ${value}`);
  }
}

if (page.includes("HowItWorks")) {
  throw new Error("MIP page should use shared MethodologySteps instead of legacy HowItWorks");
}

console.log("MIP methodology validation passed");
