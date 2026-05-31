import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertIncludes(source, expected, label) {
  for (const value of expected) {
    if (!source.includes(value)) {
      throw new Error(`${label} missing: ${value}`);
    }
  }
}

const contactPage = read("src/app/contact/page.tsx");

assertIncludes(
  contactPage,
  [
    "ContactForm",
    "TrustBar",
    "response-time",
    "DFW",
    "SITE_CONFIG.googleMapsEmbedUrl",
    "SITE_CONFIG.phone",
    "SITE_CONFIG.address",
    "AI Readiness Assessment",
  ],
  "Contact page upgrade",
);

console.log("Epic 6 contact page validation passed");
