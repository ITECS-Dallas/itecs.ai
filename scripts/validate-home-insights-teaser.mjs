import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const component = readFileSync(
  join(root, "src/components/sections/InsightsTeaser.tsx"),
  "utf8",
);

for (const value of [
  "InsightsTeaser",
  "INSIGHTS",
  "latestInsights",
  "hubLabel",
  "publishedDate",
  "readTime",
]) {
  if (!`${page}\n${component}`.includes(value)) {
    throw new Error(`Homepage insights teaser missing: ${value}`);
  }
}

if (!component.includes(".slice(0, 3)")) {
  throw new Error("Homepage insights teaser must render exactly three latest articles");
}

if (!component.includes("return null")) {
  throw new Error("InsightsTeaser must render nothing when insight data is absent");
}

console.log("Homepage insights teaser validation passed");
