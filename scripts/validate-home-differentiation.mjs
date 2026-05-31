import { readFileSync } from "node:fs";
import { join } from "node:path";

const files = [
  "src/components/sections/Heritage.tsx",
  "src/lib/constants.ts",
]
  .map((file) => readFileSync(join(process.cwd(), file), "utf8"))
  .join("\n");

for (const value of [
  "MSP to Managed Intelligence Provider",
  "Dedicated operating teams",
  "Security-first",
  "AI on a managed-IT foundation",
  "Heritage badge",
  "value: \"24+\"",
  "value: \"92%\"",
  "value: \"200+\"",
]) {
  if (!files.includes(value)) {
    throw new Error(`Homepage differentiation missing: ${value}`);
  }
}

if (files.includes("ScrollReveal")) {
  throw new Error("Homepage differentiation must render on load");
}

console.log("Homepage differentiation validation passed");
