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

const page = read("src/app/managed-intelligence-provider/page.tsx");
const hero = read("src/app/managed-intelligence-provider/MIPHero.tsx");
const evolution = read("src/components/sections/MIPEvolutionDiagram.tsx");
const constants = read("src/lib/constants.ts");
const combined = `${page}\n${hero}\n${evolution}\n${constants}`;

assertIncludes(
  combined,
  [
    "DALLAS'S FIRST MANAGED INTELLIGENCE PROVIDER",
    "The MSP, Evolved into a Managed Intelligence Provider",
    "Book an AI Readiness Assessment",
    "Explore Managed AI",
    "24+",
    "92%",
    "200+",
  ],
  "MIP hero contract",
);

assertIncludes(
  combined,
  [
    "2002",
    "Managed IT",
    "Managed Security",
    "Managed Intelligence",
    "var(--heritage-amber)",
  ],
  "MIP evolution contract",
);

if (combined.includes("Dallas Managed Intelligence Provider")) {
  throw new Error("MIP hero still uses the legacy local-service H1 framing");
}

for (const unapproved of [
  "42 hours per week",
  "65%",
  "87%",
  "35% reduction",
]) {
  if (combined.includes(unapproved)) {
    throw new Error(`Unapproved MIP proof claim remains: ${unapproved}`);
  }
}

console.log("MIP hero and evolution validation passed");
