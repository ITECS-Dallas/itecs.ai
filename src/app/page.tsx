import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { FAQ_ITEMS, HOMEPAGE_FEATURES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { EvolutionBand } from "@/components/sections/EvolutionBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { ThirdPartyValidation } from "@/components/sections/ThirdPartyValidation";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { AIPricingPreview } from "@/components/sections/AIPricingPreview";
import { AIPracticeAreas } from "@/components/sections/AIPracticeAreas";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Heritage } from "@/components/sections/Heritage";
import { MethodologySteps } from "@/components/sections/MethodologySteps";
import { OutcomesProof } from "@/components/sections/OutcomesProof";
import { SecurityGovernanceBand } from "@/components/sections/SecurityGovernanceBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { ManagedITReferral } from "@/components/sections/ManagedITReferral";
import { StatsBar } from "@/components/sections/StatsBar";
import { LocalFootprint } from "@/components/sections/LocalFootprint";
import { FAQ } from "@/components/sections/FAQ";
import { ConversionBand } from "@/components/sections/ConversionBand";

export const metadata = generatePageMetadata({
  title: "Managed Intelligence & Secure AI Operations in Dallas | ITECS",
  description:
    "ITECS helps Dallas mid-market and enterprise teams with 10-300 employees deploy secure AI consulting, training, automation, DevOps, and custom AI agents backed by 24 years of IT operations expertise.",
  path: "/",
  keywords: [
    "managed intelligence provider",
    "Dallas AI consultants",
    "enterprise AI operations",
    "mid-market AI consulting",
    "AI IT services Dallas",
    "AI readiness assessment",
    "AI automation Dallas",
    "custom AI agents for business",
    "AI consultant Dallas TX",
    "secure AI operations",
    "managed AI services Dallas",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <EvolutionBand />
      <TrustBar />
      <ThirdPartyValidation />
      <AIAdoptionUnderstanding />
      <AIPricingPreview />
      <AIPracticeAreas />
      <ServicesGrid />
      <Heritage />
      <MethodologySteps />
      <OutcomesProof />
      <SecurityGovernanceBand />
      <Testimonials />
      <InsightsTeaser />
      <FeatureShowcase features={HOMEPAGE_FEATURES} />
      <ManagedITReferral />
      <StatsBar />
      <LocalFootprint />
      <FAQ items={FAQ_ITEMS} />
      <ConversionBand />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
    </>
  );
}
