import { readdirSync, readFileSync, statSync } from "node:fs";
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

function listFiles(relativeDir) {
  const absoluteDir = join(root, relativeDir);
  const entries = readdirSync(absoluteDir);
  const files = [];

  for (const entry of entries) {
    const relativePath = `${relativeDir}/${entry}`;
    const absolutePath = join(root, relativePath);
    const stat = statSync(absolutePath);

    if (stat.isDirectory()) {
      files.push(...listFiles(relativePath));
      continue;
    }

    if (/\.(tsx?|jsx?)$/.test(entry)) {
      files.push(relativePath);
    }
  }

  return files;
}

const layout = read("src/app/layout.tsx");
const analyticsConsent = read("src/components/analytics/AnalyticsConsent.tsx");
const contactPage = read("src/app/contact/page.tsx");
const insightArticle = read("src/components/insights/InsightArticleLayout.tsx");
const aiChampion = read("src/app/services/ai-champion-program/page.tsx");
const allPublicUiFiles = [
  ...listFiles("src/app"),
  ...listFiles("src/components"),
].filter(
  (file) =>
    !file.startsWith("src/app/api/") &&
    !file.startsWith("src/app/p/") &&
    !file.startsWith("src/components/proposals/"),
);

assert(
  layout.includes('import { Geist, Geist_Mono } from "next/font/google"') &&
    (layout.match(/subsets:\s*\["latin"\]/g) ?? []).length >= 2,
  "Fonts must be loaded through Next font with explicit latin subsets so they are self-hosted/subset at build time.",
);

assert(
  !layout.includes("googletagmanager.com") &&
    analyticsConsent.includes("consent === \"granted\"") &&
    analyticsConsent.includes("strategy=\"afterInteractive\""),
  "Third-party analytics must stay consent-gated and must not render-block in the root layout.",
);

for (const file of allPublicUiFiles) {
  const source = read(file);

  if (source.includes("<img")) {
    throw new Error(`${file} uses a raw <img>; public UI images must use next/image.`);
  }
}

assert(
  insightArticle.includes("priority") && insightArticle.includes("sizes="),
  "Insight article hero images must be prioritized and sized for responsive image selection.",
);

assert(
  aiChampion.includes("priority") &&
    aiChampion.includes('sizes="(min-width: 1024px) 50vw, 92vw"'),
  "The AI Champion hero image must be preloaded and sized for the split hero layout.",
);

assert(
  contactPage.includes("loading=\"lazy\"") &&
    contactPage.includes("SITE_CONFIG.googleMapsEmbedUrl"),
  "The below-fold Google Maps iframe must remain lazy-loaded.",
);

console.log("Epic 8 Core Web Vitals performance contract validation passed");
