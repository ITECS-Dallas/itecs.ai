import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const constants = readFileSync(join(root, "src/lib/constants.ts"), "utf8");
const pricingPreview = readFileSync(
  join(root, "src/components/sections/AIPricingPreview.tsx"),
  "utf8",
);

const faqBlock = constants.match(
  /export const FAQ_ITEMS = \[[\s\S]*?\] as const;/,
)?.[0];
const siteConfigBlock = constants.match(
  /export const SITE_CONFIG = \{[\s\S]*?\n\} as const;/,
)?.[0];

if (!faqBlock || !siteConfigBlock) {
  throw new Error("Could not locate homepage metadata copy blocks");
}

const homepageCopy = [page, faqBlock, siteConfigBlock, pricingPreview].join("\n");

for (const banned of [/small business/i, /\bSMB\b/i]) {
  if (banned.test(homepageCopy)) {
    throw new Error(`Homepage altitude copy still contains ${banned}`);
  }
}

for (const required of [
  "Managed Intelligence",
  "10-300",
  "enterprise",
  "mid-market",
]) {
  if (!homepageCopy.includes(required)) {
    throw new Error(`Homepage altitude copy missing: ${required}`);
  }
}

console.log("Homepage altitude validation passed");
