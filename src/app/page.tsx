import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { FAQ_ITEMS, HOMEPAGE_FEATURES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { StatsBar } from "@/components/sections/StatsBar";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "Dallas AI Consulting & Automation for Small Business | ITECS",
  description:
    "ITECS helps Dallas businesses with 10–300 employees save time and cut costs with AI automation, custom ChatGPT development, and hands-on AI consulting. 22+ years of IT expertise.",
  path: "/",
  keywords: [
    "small business AI Dallas",
    "AI consulting for small business",
    "AI automation Dallas",
    "custom ChatGPT for business",
    "AI consultant Dallas",
    "workflow automation Dallas",
    "how to use AI in small business",
    "AI customer service bot for SMB",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeatureShowcase features={HOMEPAGE_FEATURES} />
      <StatsBar />
      <PartnerLogos />
      <FAQ items={FAQ_ITEMS} />
      <CTASection />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
    </>
  );
}
