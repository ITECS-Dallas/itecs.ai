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

const constants = read("src/lib/constants.ts");
const proofFiles = [
  "src/lib/constants.ts",
  "src/components/sections/TrustBar.tsx",
  "src/components/sections/PartnerLogos.tsx",
  "src/components/sections/StatsBar.tsx",
]
  .map(read)
  .join("\n");

assertIncludes(
  constants,
  [
    "Phoenix Capital",
    "First Choice Containers",
    "BURNCO",
    "Ad Pages",
    "Sterling Family Partners",
  ],
  "Approved client logo",
);

assertIncludes(
  constants,
  [
    "Microsoft",
    "Microsoft Azure",
    "Microsoft Copilot",
    "Claude",
    "OpenAI",
    "Sophos",
  ],
  "Approved partner logo",
);

assertIncludes(
  constants,
  [
    "Years of IT Operations",
    "Client Retention Rate",
    "Client Engagements",
    "value: 24",
    "value: 92",
    "value: 200",
  ],
  "Approved proof stat",
);

const placeholderPattern =
  /\b(?:Acme|Globex|Initech|Umbrella|Lorem ipsum|Placeholder|CEO,\s*Company)\b/i;

if (placeholderPattern.test(proofFiles)) {
  throw new Error("Placeholder proof copy found in proof system files");
}

console.log("Proof system validation passed");
