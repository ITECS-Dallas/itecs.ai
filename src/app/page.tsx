import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { FAQ_ITEMS, HOMEPAGE_FEATURES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { AIPracticeAreas } from "@/components/sections/AIPracticeAreas";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Heritage } from "@/components/sections/Heritage";
import { StatsBar } from "@/components/sections/StatsBar";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { LocalFootprint } from "@/components/sections/LocalFootprint";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "Small Business AI Consulting & Automation in Dallas | ITECS",
  description:
    "ITECS helps Dallas SMBs with 10–300 employees deploy secure AI consulting, training, automation, DevOps, and custom AI agents backed by 24 years of IT operations expertise.",
  path: "/",
  keywords: [
    "small business AI consulting",
    "Dallas AI consultants",
    "SMB AI automation",
    "AI IT services",
    "AI consulting for small business",
    "AI automation Dallas",
    "custom AI agents for business",
    "AI consultant Dallas TX",
    "how to automate small business with AI",
    "secure AI companies for SMBs",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AIAdoptionUnderstanding />
      <AIPracticeAreas />
      <ServicesGrid />
      <FeatureShowcase features={HOMEPAGE_FEATURES} />
      <Heritage />
      <StatsBar />
      <PartnerLogos />
      <LocalFootprint />
      <FAQ items={FAQ_ITEMS} />
      <CTASection />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
    </>
  );
}
