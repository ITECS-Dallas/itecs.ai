import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const constants = read("src/lib/constants.ts");
const strip = read("src/components/ui/CertificationStrip.tsx");
const combined = `${constants}\n${strip}`;

for (const value of [
  "CERTIFICATION_BADGES",
  "Microsoft Solutions Partner",
  "Infrastructure and Digital & App Innovation",
  "SOC 2 Type II",
  "ISO 27001",
  "CMMC",
  "sourceHref",
  "sourceLabel",
  "title={badge.detail}",
  "href={badge.sourceHref}",
  "target=\"_blank\"",
]) {
  if (!combined.includes(value)) {
    throw new Error(`Certification proof contract missing: ${value}`);
  }
}

const requiredBadges = [
  "Microsoft Solutions Partner",
  "SOC 2 Type II",
  "ISO 27001",
  "CMMC",
  "Sophos Gold Partner",
  "Veeam",
  "Fortinet",
  "CompTIA",
];

for (const label of requiredBadges) {
  if (!constants.includes(`label: "${label}"`)) {
    throw new Error(`Certification badge missing label: ${label}`);
  }
}

console.log("Epic 5 certification validation passed");
