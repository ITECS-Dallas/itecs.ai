import { existsSync, readFileSync } from "node:fs";
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

function assertFile(relativePath) {
  assert(existsSync(join(root, relativePath)), `Missing required file: ${relativePath}`);
}

for (const file of [
  "src/components/sections/TrustBar.tsx",
  "src/components/sections/SecurityGovernanceBand.tsx",
  "src/components/sections/MethodologySteps.tsx",
  "src/components/sections/OutcomesProof.tsx",
  "src/components/sections/ConversionBand.tsx",
  "src/components/layout/Footer.tsx",
]) {
  assertFile(file);
}

const home = read("src/app/page.tsx");
const mip = read("src/app/managed-intelligence-provider/page.tsx");
const assessment = read("src/app/assessment/page.tsx");
const contact = read("src/app/contact/page.tsx");
const services = read("src/app/services/page.tsx");
const ctaSection = read("src/components/sections/CTASection.tsx");
const layout = read("src/app/layout.tsx");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const analytics = read("src/lib/analytics.ts");
const consent = read("src/components/analytics/AnalyticsConsent.tsx");
const assessmentRoute = read("src/app/api/assessment/route.ts");
const assessmentForm = read("src/components/forms/AIReadinessAssessmentForm.tsx");
const contactForm = read("src/components/forms/ContactForm.tsx");

for (const [label, source, expected] of [
  ["Home", home, ["TrustBar", "MethodologySteps", "OutcomesProof", "SecurityGovernanceBand", "ConversionBand"]],
  ["MIP", mip, ["MethodologySteps", "SecurityGovernanceBand", "OutcomesProof", "ConversionBand"]],
  ["Assessment", assessment, ["TrustBar", "SecurityGovernanceBand", "AIReadinessAssessmentForm"]],
  ["Contact", contact, ["TrustBar", "ContactForm"]],
  ["Services", services, ["TrustBar", "SecurityGuarantee", "CTASection"]],
]) {
  for (const value of expected) {
    assert(source.includes(value), `${label} page must compose the shared ${value} section.`);
  }
}

assert(
  ctaSection.includes("return <ConversionBand />"),
  "Legacy CTASection must delegate to the shared ConversionBand.",
);
assert(
  layout.includes("<Footer />") && layout.includes('id="main-content"'),
  "Root layout must render the shared Footer and main landmark.",
);
assert(
  sitemap.includes("/managed-intelligence-provider") &&
    sitemap.includes("/assessment") &&
    sitemap.includes("/services/ai-champion-program") &&
    !sitemap.includes("/p/"),
  "Sitemap must include launch-critical public routes and exclude hidden proposals.",
);
assert(
  robots.includes('disallow: ["/api/", "/p/"]') &&
    robots.includes("https://itecs.ai/sitemap.xml"),
  "Robots must block API/proposal surfaces and advertise the sitemap.",
);
assert(
  analytics.includes("ANALYTICS_EVENTS") &&
    analytics.includes("cta_click") &&
    analytics.includes("form_start") &&
    analytics.includes("form_complete") &&
    analytics.includes("scroll_depth") &&
    consent.includes("googletagmanager.com/gtag/js") &&
    !layout.includes("gtag/js?id="),
  "Analytics events must be consent-gated and defined for launch QA.",
);
assert(
  assessmentRoute.includes("sendContactEmail") &&
    assessmentRoute.includes("validateTurnstileToken") &&
    assessmentRoute.includes("status: 429") &&
    assessmentForm.includes('fetch("/api/assessment"') &&
    assessmentForm.includes("ANALYTICS_EVENTS.formComplete") &&
    contactForm.includes('fetch("/api/contact"') &&
    contactForm.includes("ANALYTICS_EVENTS.formComplete"),
  "Assessment/contact form paths must be wired with validation, email routing, rate limiting, and completion analytics.",
);

console.log("Epic 9 cross-page and launch QA contract validation passed");
