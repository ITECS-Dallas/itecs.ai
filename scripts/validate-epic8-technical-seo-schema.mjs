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

const layout = read("src/app/layout.tsx");
const metadata = read("src/lib/metadata.ts");
const seo = read("src/lib/seo.ts");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const mipPage = read("src/app/managed-intelligence-provider/page.tsx");
const insightLayout = read("src/components/insights/InsightArticleLayout.tsx");
const consultingPage = read("src/app/consulting/page.tsx");
const breadcrumbs = read("src/components/seo/Breadcrumbs.tsx");

assert(
  layout.includes("metadataBase: new URL(SITE_CONFIG.url)") &&
    layout.includes("title: {") &&
    layout.includes("openGraph") &&
    layout.includes("twitter") &&
    metadata.includes("alternates") &&
    metadata.includes("canonical") &&
    metadata.includes("openGraph") &&
    metadata.includes("twitter"),
  "Global and page metadata must include title templates, canonical URLs, OpenGraph, and Twitter metadata.",
);

assert(
    layout.includes("generateOrganizationSchema()") &&
    layout.includes("generateLocalBusinessSchema()") &&
    seo.includes("generateOrganizationSchema") &&
    seo.includes("generateLocalBusinessSchema") &&
    seo.includes("telephone: SITE_CONFIG.phoneE164"),
  "Root layout must inject Organization and LocalBusiness JSON-LD with phone and DFW location facts.",
);

assert(
  sitemap.includes("/managed-intelligence-provider") &&
    sitemap.includes("/assessment") &&
    sitemap.includes("/services/ai-champion-program"),
  "Sitemap must include rebuilt conversion, MIP, and AI Champion routes.",
);

assert(
  robots.includes('disallow: ["/api/", "/p/"]') &&
    robots.includes("https://itecs.ai/sitemap.xml"),
  "Robots must allow public routes, block API/proposal surfaces, and advertise the sitemap.",
);

assert(
  mipPage.includes("generateManagedIntelligenceProviderServiceSchema") &&
    mipPage.includes("<JsonLd data={generateManagedIntelligenceProviderServiceSchema()} />") &&
    mipPage.includes("generateFAQSchema") &&
    mipPage.includes("<Breadcrumbs"),
  "MIP page must emit Service, FAQPage, and Breadcrumb structured data.",
);

assert(
  consultingPage.includes("generateServiceSchema") &&
    consultingPage.includes("generateFAQSchema") &&
    consultingPage.includes("generateHowToSchema"),
  "Service pages must emit Service, FAQPage, and HowTo structured data.",
);

assert(
  insightLayout.includes("generateArticleSchema") &&
    insightLayout.includes("generateFAQSchema") &&
    insightLayout.includes("<Breadcrumbs"),
  "Insight pages must emit Article, FAQPage, and Breadcrumb structured data.",
);

assert(
  breadcrumbs.includes("generateBreadcrumbSchema"),
  "Breadcrumb component must emit BreadcrumbList schema.",
);

for (const forbidden of [
  "Small Business AI Consulting",
  "small to medium businesses (SMBs)",
  "Small Business AI Services",
]) {
  assert(!seo.includes(forbidden), `SEO schema must retire legacy SMB framing: ${forbidden}`);
}

console.log("Epic 8 technical SEO and schema validation passed");
