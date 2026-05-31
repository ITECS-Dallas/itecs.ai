import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const globals = read("src/app/globals.css");
const header = read("src/components/layout/Header.tsx");

assert(
  /@supports\s+not\s+\(\(\s*-webkit-backdrop-filter:\s*blur\(1px\)\s*\)\s+or\s+\(\s*backdrop-filter:\s*blur\(1px\)\s*\)\)/.test(
    globals,
  ),
  "Global CSS must define a solid-color fallback for browsers without backdrop-filter.",
);
assert(
  globals.includes('[class*="backdrop-blur"]'),
  "Backdrop fallback must cover Tailwind backdrop-blur utilities.",
);
assert(
  header.includes("backdrop-blur-md"),
  "Header must retain the sanctioned blur enhancement for capable browsers.",
);

console.log("Epic 7 cross-browser fallback validation passed");
