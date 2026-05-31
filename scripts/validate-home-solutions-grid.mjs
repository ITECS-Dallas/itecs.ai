import { readFileSync } from "node:fs";
import { join } from "node:path";

const source = readFileSync(
  join(process.cwd(), "src/components/sections/ServicesGrid.tsx"),
  "utf8",
);

for (const value of [
  "homepageSolutions",
  'href: "/managed-intelligence-provider"',
  'href: "/consulting"',
  'href: "/custom-ai-agents"',
  'href: "/automation"',
  'href: "/training"',
  'href: "/ai-devops"',
  "md:grid-cols-2 lg:grid-cols-3",
]) {
  if (!source.includes(value)) {
    throw new Error(`Homepage solutions grid missing: ${value}`);
  }
}

if (source.includes("ScrollReveal")) {
  throw new Error("Homepage solutions grid must render on load");
}

console.log("Homepage solutions grid validation passed");
