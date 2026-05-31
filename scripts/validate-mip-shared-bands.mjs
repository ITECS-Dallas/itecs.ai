import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const page = read("src/app/managed-intelligence-provider/page.tsx");
const layout = read("src/app/layout.tsx");

for (const value of [
  "SecurityGovernanceBand",
  "OutcomesProof",
  "ConversionBand",
]) {
  if (!page.includes(value)) {
    throw new Error(`MIP page missing shared band: ${value}`);
  }
}

if (!layout.includes("<Footer />")) {
  throw new Error("Root layout must provide the shared Footer");
}

for (const legacy of ["StatsBar", "SecurityGuarantee", "CTASection"]) {
  if (page.includes(legacy)) {
    throw new Error(`MIP page still uses legacy duplicated band: ${legacy}`);
  }
}

console.log("MIP shared bands validation passed");
