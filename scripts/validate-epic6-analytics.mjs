import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertFile(relativePath) {
  if (!existsSync(join(root, relativePath))) {
    throw new Error(`Missing required analytics file: ${relativePath}`);
  }
}

function assertIncludes(source, expected, label) {
  for (const value of expected) {
    if (!source.includes(value)) {
      throw new Error(`${label} missing: ${value}`);
    }
  }
}

assertFile("src/components/analytics/AnalyticsConsent.tsx");
assertFile("src/lib/analytics.ts");

const layout = read("src/app/layout.tsx");
const analytics = read("src/lib/analytics.ts");
const consent = read("src/components/analytics/AnalyticsConsent.tsx");
const button = read("src/components/ui/Button.tsx");
const assessmentForm = read("src/components/forms/AIReadinessAssessmentForm.tsx");
const contactForm = read("src/components/forms/ContactForm.tsx");

assertIncludes(
  `${analytics}\n${consent}`,
  [
    "ANALYTICS_EVENTS",
    "cta_click",
    "form_start",
    "form_complete",
    "scroll_depth",
    "hasAnalyticsConsent",
    "trackConversionEvent",
    "localStorage",
    "ITECS_ANALYTICS_CONSENT",
    "G-J49FJ2JM1N",
  ],
  "Analytics definitions and consent",
);

assertIncludes(layout, ["AnalyticsConsent"], "Root layout");
assertIncludes(button, ["trackConversionEvent", "ANALYTICS_EVENTS.ctaClick"], "CTA click tracking");
assertIncludes(
  assessmentForm,
  ["ANALYTICS_EVENTS.formStart", "ANALYTICS_EVENTS.formComplete"],
  "Assessment form tracking",
);
assertIncludes(
  contactForm,
  ["ANALYTICS_EVENTS.formStart", "ANALYTICS_EVENTS.formComplete", "trackConversionEvent"],
  "Contact form tracking",
);

if (layout.includes("gtag/js?id=G-J49FJ2JM1N")) {
  throw new Error("Root layout must not load Google Analytics before consent.");
}

for (const forbidden of ["workEmail", "email", "name", "company", "topAIGoal"]) {
  const eventPayloadPattern = new RegExp(`event_(?:label|value)|${forbidden}.*gtag`, "i");
  if (eventPayloadPattern.test(`${analytics}\n${consent}`)) {
    throw new Error(`Analytics must not leak PII or assessment details: ${forbidden}`);
  }
}

console.log("Epic 6 analytics validation passed");
