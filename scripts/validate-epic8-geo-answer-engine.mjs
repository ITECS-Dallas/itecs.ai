import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const constants = read("src/lib/constants.ts");
const mipPage = read("src/app/managed-intelligence-provider/page.tsx");
const definitionComponent = read("src/components/sections/MIPDefinitionCapabilities.tsx");

assert(
  constants.includes("export const MIP_DEFINITION_CAPABILITIES") &&
    constants.includes("model governance") &&
    constants.includes("executive reporting"),
  "MIP source data must preserve a visible, decision-useful operating definition.",
);

assert(
  definitionComponent.includes("MIP_DEFINITION_CAPABILITIES.definition") &&
    definitionComponent.includes("MIP_DEFINITION_CAPABILITIES.capabilities"),
  "The MIP definition and capabilities must render from their current source of truth.",
);

assert(
  mipPage.includes("generatePageMetadata") &&
    mipPage.includes("generateManagedIntelligenceProviderServiceSchema") &&
    mipPage.includes("<Breadcrumbs") &&
    mipPage.includes("<MIPDefinitionCapabilities"),
  "The MIP page must preserve metadata, Service semantics, breadcrumbs, and the visible definition.",
);

for (const relativePath of ["public/llms.txt", "public/llms-full.txt", "public/ai.txt"]) {
  if (!existsSync(join(root, relativePath))) continue;
  const source = read(relativePath);
  assert(
    !source.includes("99.9% uptime"),
    `${relativePath} must not contain the disputed uptime proof point.`,
  );
}

console.log("Epic 8 AI visibility content-safety validation passed");
