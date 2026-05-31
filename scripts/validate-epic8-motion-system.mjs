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
const button = read("src/components/ui/Button.tsx");
const card = read("src/components/ui/Card.tsx");
const logoWall = read("src/components/ui/LogoWall.tsx");
const aiConsole = read("src/components/ui/AIOperationsConsole.tsx");
const structural = read("src/components/ui/Structural.tsx");

assert(
  globals.includes("--dur-fast: 120ms") &&
    globals.includes("--dur-base: 200ms") &&
    globals.includes("--dur-slow: 320ms") &&
    globals.includes("--dur-slower: 560ms") &&
    globals.includes("--ease-out: cubic-bezier(0.16, 1, 0.3, 1)") &&
    globals.includes("--ease-inout: cubic-bezier(0.65, 0, 0.35, 1)"),
  "Global tokens must expose the Epic 8 motion durations and easing curves.",
);

assert(
  !scrollReveal.includes('"use client"') &&
    scrollReveal.includes('data-motion="scroll-reveal"') &&
    scrollReveal.includes("distance = 16") &&
    scrollReveal.includes("Math.min(Math.max(distance, 12), 16)") &&
    scrollReveal.includes("data-motion-once") &&
    scrollReveal.includes("data-motion-amount") &&
    scrollReveal.includes("delay") &&
    !/opacity:\s*0(?:[,}])/.test(scrollReveal),
  "ScrollReveal must stay visible on load, server-rendered, one-shot/stagger-capable via data markers, and bounded to 12-16px.",
);

assert(
  !parallax.includes('"use client"') &&
    parallax.includes('data-motion="parallax"') &&
    parallax.includes("data-parallax-speed") &&
    !parallax.includes("framer-motion"),
  "ParallaxWrapper must expose a motion marker without adding client-side parallax work.",
);

assert(
  globals.includes(".animate-orb-float") &&
    globals.includes(".animate-pulse-node") &&
    globals.includes(".animate-grid-pulse") &&
    globals.includes(".animate-bounce-subtle") &&
    globals.includes(".animate-circuit-flow"),
  "Global CSS must keep the sanctioned ambient, pulse, and circuit animations centralized.",
);

assert(
  /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation:\s*none !important/.test(
    globals,
  ) &&
    globals.includes('[data-motion="parallax"]') &&
    globals.includes('[data-motion="scroll-reveal"]') &&
    globals.includes("transform: none !important"),
  "Reduced-motion CSS must disable animation, parallax, reveal transforms, and shimmer/lift transforms.",
);

assert(
  button.includes("motion-reduce:hover:translate-y-0") &&
    card.includes("motion-reduce:hover:translate-y-0") &&
    logoWall.includes("motion-reduce:group-hover:scale-100"),
  "Interactive lifts and media zooms must be neutralized under prefers-reduced-motion.",
);

for (const [label, source] of [
  ["AI operations console", aiConsole],
  ["Structural live indicator", structural],
]) {
  assert(
    source.includes("animate-ping") &&
      source.includes("motion-reduce:hidden") &&
      source.includes("bg-accent-cyan") &&
      !source.includes("animate-ping rounded-pill bg-brand-accent"),
    `${label} live pulse must use the sanctioned cyan live dot and hide under reduced motion.`,
  );
}

console.log("Epic 8 motion system validation passed");
