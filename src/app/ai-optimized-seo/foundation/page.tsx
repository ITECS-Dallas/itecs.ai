import { generatePageMetadata } from "@/lib/metadata";
import {
  generateAISEOTierServiceSchema,
  generateOfferSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { AI_SEO_TIERS, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { SEOTierLayout } from "@/components/sections/SEOTierLayout";

const tier = AI_SEO_TIERS.find((t) => t.slug === "foundation")!;

export const metadata = generatePageMetadata({
  title: tier.title,
  description: tier.description,
  path: tier.href,
  keywords: tier.keywords,
  ogImage: "/images/og/ai-optimized-seo.png",
});

export default function FoundationPage() {
  return (
    <>
      <SEOTierLayout tier={tier} />

      <JsonLd data={generateAISEOTierServiceSchema(tier)} />
      <JsonLd data={generateOfferSchema(tier)} />
      <JsonLd data={generateFAQSchema(tier.faq)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: `${SITE_CONFIG.url}/` },
          {
            name: "AI-Optimized SEO",
            url: `${SITE_CONFIG.url}/ai-optimized-seo`,
          },
          { name: tier.shortName, url: `${SITE_CONFIG.url}${tier.href}` },
        ])}
      />
    </>
  );
}
