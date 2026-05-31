import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertIncludes(source, expected, label) {
  for (const value of expected) {
    if (!source.includes(value)) {
      throw new Error(`${label} missing: ${value}`);
    }
  }
}

const header = read("src/components/layout/Header.tsx");
const conversionBand = read("src/components/sections/ConversionBand.tsx");
const ctaSection = read("src/components/sections/CTASection.tsx");
const hero = read("src/components/sections/Hero.tsx");
const constants = read("src/lib/constants.ts");

assertIncludes(
  `${header}\n${conversionBand}\n${hero}\n${constants}`,
  [
    'href="/assessment"',
    "Book AI Assessment",
    "Book an AI Readiness Assessment",
    "AI Readiness Assessment",
    "Talk to an architect",
    "30 minutes",
    "no obligation",
    "DFW-based team",
  ],
  "Persistent conversion paths",
);

if (!ctaSection.includes("ConversionBand")) {
  throw new Error("Legacy CTASection should delegate to the shared ConversionBand.");
}

if (header.includes('Button href="/contact"')) {
  throw new Error("Header assessment CTAs should point to /assessment, not /contact.");
}

console.log("Epic 6 conversion path validation passed");
