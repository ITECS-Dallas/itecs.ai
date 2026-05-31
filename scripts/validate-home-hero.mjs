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

const hero = read("src/components/sections/Hero.tsx");
const servicesGrid = read("src/components/sections/ServicesGrid.tsx");

assertIncludes(
  hero,
  [
    "DALLAS MANAGED INTELLIGENCE",
    "SINCE 2002",
    "Managed Intelligence",
    "Secure AI Operations",
    "Book an AI Readiness Assessment",
    'href="/contact"',
    "Explore Managed AI",
    'href="#managed-ai"',
    "STATS",
  ],
  "Homepage hero contract",
);

assertIncludes(
  servicesGrid,
  ['id="managed-ai"'],
  "Homepage managed-AI anchor",
);

if (/\b(?:1,000\+|98%|Fortune 500)\b/.test(hero)) {
  throw new Error("Unapproved hero proof metric found");
}

console.log("Homepage hero validation passed");
