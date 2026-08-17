import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
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
  "Global and page metadata must preserve title templates, canonicals, OpenGraph, and Twitter metadata.",
);

assert(
  layout.includes("generateOrganizationSchema()") &&
    layout.includes("generateLocalBusinessSchema()") &&
    seo.includes("generateOrganizationSchema") &&
    seo.includes("generateLocalBusinessSchema") &&
    seo.includes("telephone: SITE_CONFIG.phoneE164") &&
    seo.includes('`${SITE_CONFIG.url}/#localbusiness`'),
  "Root schema must preserve Organization/LocalBusiness output, current contact data, and the stable LocalBusiness ID.",
);

assert(
  sitemap.includes("/managed-intelligence-provider") &&
    sitemap.includes("/assessment") &&
    sitemap.includes("/services/ai-champion-program") &&
    !sitemap.includes('url: `${base}/p/'),
  "Sitemap must cover current public conversion routes and exclude proposal routes.",
);

assert(
  robots.includes('const DISALLOWED_PATHS = ["/api/", "/p/"]') &&
    robots.includes('userAgent: "*"') &&
    robots.includes("disallow: DISALLOWED_PATHS") &&
    robots.includes("...AI_CRAWLERS.map") &&
    robots.includes("https://itecs.ai/sitemap.xml"),
  "Robots must allow public routes, keep API/proposal exclusions on wildcard and named AI agents, and advertise the canonical sitemap.",
);

assert(
  mipPage.includes("generateManagedIntelligenceProviderServiceSchema") &&
    mipPage.includes("<JsonLd data={generateManagedIntelligenceProviderServiceSchema()} />") &&
    mipPage.includes("<Breadcrumbs"),
  "MIP pages must preserve accurate Service and Breadcrumb semantics.",
);

assert(
  consultingPage.includes("generateServiceSchema") && consultingPage.includes("<Breadcrumbs"),
  "Service pages must preserve Service and Breadcrumb semantics.",
);

assert(
  insightLayout.includes("generateArticleSchema") &&
    insightLayout.includes("datePublished") &&
    insightLayout.includes("citations") &&
    insightLayout.includes("<Breadcrumbs"),
  "Insight pages must preserve Article dates, citations, and Breadcrumb semantics.",
);

assert(
  seo.includes('"@id": `${url}#article`') && breadcrumbs.includes("generateBreadcrumbSchema"),
  "Article and breadcrumb helpers must preserve stable identity and BreadcrumbList output.",
);

console.log("Epic 8 durable technical SEO and schema validation passed");
