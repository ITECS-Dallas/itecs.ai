import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assertFile(relativePath) {
  if (!existsSync(join(root, relativePath))) {
    throw new Error(`Missing required assessment file: ${relativePath}`);
  }
}

function assertIncludes(source, expected, label) {
  for (const value of expected) {
    if (!source.includes(value)) {
      throw new Error(`${label} missing: ${value}`);
    }
  }
}

assertFile("src/app/assessment/page.tsx");
assertFile("src/app/api/assessment/route.ts");
assertFile("src/components/forms/AIReadinessAssessmentForm.tsx");

const page = read("src/app/assessment/page.tsx");
const route = read("src/app/api/assessment/route.ts");
const form = read("src/components/forms/AIReadinessAssessmentForm.tsx");
const sitemap = read("src/app/sitemap.ts");

assertIncludes(
  page,
  [
    "AIReadinessAssessmentForm",
    "AI Readiness Assessment",
    "No tool demo",
    "10-300",
    "generatePageMetadata",
    'path: "/assessment"',
  ],
  "Assessment page",
);

assertIncludes(
  form,
  [
    "currentStep",
    "Step 1 of 3",
    "Step 2 of 3",
    "Step 3 of 3",
    "aria-live",
    'name="website"',
    "workEmail",
    "employeeRange",
    "topAIGoal",
    "TurnstileWidget",
    'fetch("/api/assessment"',
    "ANALYTICS_EVENTS.formStart",
    "ANALYTICS_EVENTS.formComplete",
    "Schedule the follow-up",
  ],
  "Assessment form",
);

assertIncludes(
  route,
  [
    "sendContactEmail",
    "validateTurnstileToken",
    "RATE_LIMIT_WINDOW_MS",
    "MAX_SUBMISSIONS_PER_WINDOW",
    "workEmail",
    "employeeRange",
    "topAIGoal",
    "AI Readiness Assessment",
    "Top AI Goal",
    "Assessment request received.",
    "website",
  ],
  "Assessment API route",
);

if (!/status:\s*429/.test(route)) {
  throw new Error("Assessment API route must return 429 for rate-limited submissions.");
}

if (!/isValidEmail/.test(route) || !/status:\s*400/.test(route)) {
  throw new Error("Assessment API route must validate required fields and email format.");
}

assertIncludes(sitemap, ["/assessment"], "Sitemap");

console.log("Epic 6 assessment validation passed");
