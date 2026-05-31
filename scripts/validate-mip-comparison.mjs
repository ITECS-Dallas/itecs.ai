import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const page = read("src/app/managed-intelligence-provider/page.tsx");
const constants = read("src/lib/constants.ts");
const structural = read("src/components/ui/Structural.tsx");
const componentPath = "src/components/sections/MIPComparison.tsx";

let component = "";
try {
  component = read(componentPath);
} catch {
  throw new Error(`${componentPath} does not exist`);
}

const combined = `${page}\n${constants}\n${component}\n${structural}`;

for (const value of [
  "MIPComparison",
  "MSP vs. MIP",
  "Traditional MSP",
  "Managed Intelligence Provider",
  "AI agent operations",
  "Model governance",
  "Reporting / vCIO",
  "✓",
  "—",
  "var(--success)",
  "var(--text-disabled)",
  "overflow-x-auto",
  "sticky top-0",
  "sticky left-0",
  "min-w-[720px]",
]) {
  if (!combined.includes(value)) {
    throw new Error(`MIP comparison contract missing: ${value}`);
  }
}

console.log("MIP comparison validation passed");
