import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/Testimonials.tsx"),
  "utf8",
);

for (const value of [
  "Testimonials",
  "HOMEPAGE_TESTIMONIALS",
  "Pegasus Foods",
  "Bob Evans Farms",
  "Miller Brewing Company",
  "sourceHref",
]) {
  if (!`${page}\n${constants}\n${component}`.includes(value)) {
    throw new Error(`Homepage testimonials missing: ${value}`);
  }
}

if (!component.includes("return null")) {
  throw new Error("Testimonials must render nothing when sourced quotes are absent");
}

if (!component.includes("testimonials.map")) {
  throw new Error("Testimonials must render sourced quotes from data");
}

console.log("Homepage testimonials validation passed");
