import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const componentPath = "src/components/sections/ThirdPartyValidation.tsx";
if (!existsSync(join(root, componentPath))) {
  throw new Error(`${componentPath} does not exist`);
}

const constants = read("src/lib/constants.ts");
const component = read(componentPath);
const homepage = read("src/app/page.tsx");
const combined = `${constants}\n${component}\n${homepage}`;

for (const value of [
  "THIRD_PARTY_VALIDATION",
  "ThirdPartyValidation",
  "4.9/5",
  "54+ local reviews",
  "11 B2B reviews",
  "PRNewswire",
  "Top MSP 2024",
  "BusinessRate Best of 2026",
  "sourceHref",
  "target=\"_blank\"",
]) {
  if (!combined.includes(value)) {
    throw new Error(`Third-party validation contract missing: ${value}`);
  }
}

if (!homepage.includes("<ThirdPartyValidation />")) {
  throw new Error("Homepage must surface third-party validation");
}

for (const forbidden of ["Clutch", "analyst mention"]) {
  if (combined.includes(forbidden)) {
    throw new Error(`Unverified third-party validation remains: ${forbidden}`);
  }
}

console.log("Epic 5 third-party validation passed");
