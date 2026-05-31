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

const trustBar = read("src/components/sections/TrustBar.tsx");
const constants = read("src/lib/constants.ts");
const homePage = read("src/app/page.tsx");

assert(trustBar.includes("CLIENT_LOGOS"), "TrustBar must render client logos");
assert(trustBar.includes("PARTNER_LOGOS"), "TrustBar must render partner logos");
assert(
  trustBar.includes("CertificationStrip"),
  "TrustBar must render certification strip",
);
assert(
  !trustBar.includes("ScrollReveal"),
  "TrustBar must not gate proof behind ScrollReveal",
);
assert(
  constants.includes("CERTIFICATION_BADGES"),
  "Certification badges must live in shared constants",
);
assert(
  !homePage.includes("<PartnerLogos"),
  "Homepage must not duplicate partner logos outside TrustBar",
);

console.log("Trust bar validation passed");
