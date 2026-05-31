import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const page = read("src/app/managed-intelligence-provider/page.tsx");
const constants = read("src/lib/constants.ts");
const componentPath = "src/components/sections/MIPDefinitionCapabilities.tsx";

let component = "";
try {
  component = read(componentPath);
} catch {
  throw new Error(`${componentPath} does not exist`);
}

const combined = `${page}\n${constants}\n${component}`;

for (const value of [
  "MIPDefinitionCapabilities",
  "What Managed Intelligence means",
  "managed-AI workforce",
  "Agent operations",
  "Monitoring",
  "Optimization",
  "Governance",
  "Security",
  "Reporting / vCIO",
  "AIOperationsConsole",
]) {
  if (!combined.includes(value)) {
    throw new Error(`MIP definition/capability section missing: ${value}`);
  }
}

if (page.includes("ServiceJourneyDiagram")) {
  throw new Error("MIP page should use the spec capability grid instead of the legacy service journey diagram");
}

console.log("MIP definition and capabilities validation passed");
