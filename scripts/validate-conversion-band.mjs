import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/ConversionBand.tsx"),
  "utf8",
);

for (const value of [
  "ConversionBand",
  "AI Readiness Assessment",
  "Talk to an architect",
  "30 minutes",
  "no obligation",
  "DFW-based team",
  "href=\"/contact\"",
]) {
  if (!`${page}\n${component}`.includes(value)) {
    throw new Error(`Conversion band missing: ${value}`);
  }
}

if (page.includes("CTASection")) {
  throw new Error("Homepage should use ConversionBand instead of legacy CTASection");
}

console.log("Conversion band validation passed");
