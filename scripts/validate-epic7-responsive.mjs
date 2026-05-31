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

const button = read("src/components/ui/Button.tsx");
const footer = read("src/components/layout/Footer.tsx");
const contact = read("src/app/contact/page.tsx");
const layout = read("src/app/layout.tsx");
const certificationStrip = read("src/components/ui/CertificationStrip.tsx");
const comparisonTable = read("src/components/ui/Structural.tsx");

assert(
  /sm:\s*"h-11 px-4 text-sm"/.test(button),
  "Small text buttons must be at least 44px high.",
);
assert(
  /sm:\s*"h-11 w-11 p-0"/.test(button),
  "Small icon buttons must be at least 44px square.",
);
assert(
  /md:\s*"h-11 w-11 p-0"/.test(button),
  "Medium icon buttons must be at least 44px square.",
);
assert(
  !footer.includes("min-h-8"),
  "Footer interactive links must use 44px minimum tap targets.",
);
assert(
  !contact.includes("w-9 h-9") && !contact.includes("h-9 w-9"),
  "Contact social links must use 44px minimum tap targets.",
);
assert(
  layout.includes('href="#main-content"') && layout.includes('id="main-content"'),
  "Layout must expose a skip-to-content link and main landmark target.",
);
assert(
  certificationStrip.includes("min-h-12"),
  "Certification badge links must keep 44px+ tap targets.",
);
for (const value of ["overflow-x-auto", "sticky top-0", "sticky left-0", "min-w-[720px]"]) {
  assert(
    comparisonTable.includes(value),
    `Comparison table responsive contract missing: ${value}`,
  );
}

console.log("Epic 7 responsive contract validation passed");
