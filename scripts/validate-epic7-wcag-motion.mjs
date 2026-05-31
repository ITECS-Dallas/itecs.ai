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

const globals = read("src/app/globals.css");
const scrollReveal = read("src/components/effects/ScrollReveal.tsx");
const parallax = read("src/components/effects/ParallaxWrapper.tsx");
const gradientOrb = read("src/components/effects/GradientOrb.tsx");
const button = read("src/components/ui/Button.tsx");
const header = read("src/components/layout/Header.tsx");
const formControls = read("src/components/ui/FormControls.tsx");

assert(
  globals.includes("@media (prefers-reduced-motion: reduce)"),
  "Global CSS must honor prefers-reduced-motion.",
);
assert(
  scrollReveal.includes("useReducedMotion") &&
    scrollReveal.includes("initial={reducedMotion ? false : initialTransform}") &&
    !/opacity:\s*0(?:[,}])/.test(scrollReveal),
  "ScrollReveal must not hide content before it enters the viewport and must honor reduced motion.",
);
assert(
  parallax.includes("useReducedMotion") && parallax.includes("reducedMotion ? 0"),
  "ParallaxWrapper must disable transforms for reduced-motion users.",
);
assert(
  gradientOrb.includes('aria-hidden="true"'),
  "Decorative gradient orbs must be hidden from assistive technology.",
);
for (const [label, source] of [
  ["Button", button],
  ["Header", header],
  ["FormControls", formControls],
]) {
  assert(
    source.includes("focus-visible:ring-2") ||
      source.includes("focus:ring-2") ||
      source.includes(":focus-visible"),
    `${label} must include visible keyboard focus styling.`,
  );
}
assert(
  formControls.includes("aria-describedby") &&
    formControls.includes("aria-invalid") &&
    formControls.includes("role=\"alert\""),
  "Forms must connect labels, descriptions, invalid state, and errors accessibly.",
);

console.log("Epic 7 WCAG and motion contract validation passed");
