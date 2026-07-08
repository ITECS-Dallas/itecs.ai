import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { FAQ_ITEMS } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AgentTaxonomy } from "@/components/sections/AgentTaxonomy";
import { AdoptionJourney } from "@/components/sections/AdoptionJourney";
import { FeaturedAgentBuilds } from "@/components/sections/FeaturedAgentBuilds";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { SecurityGovernanceBand } from "@/components/sections/SecurityGovernanceBand";
import { AIPricingPreview } from "@/components/sections/AIPricingPreview";
import { OutcomesProof } from "@/components/sections/OutcomesProof";
import { Testimonials } from "@/components/sections/Testimonials";
import { ThirdPartyValidation } from "@/components/sections/ThirdPartyValidation";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Heritage } from "@/components/sections/Heritage";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { ManagedITReferral } from "@/components/sections/ManagedITReferral";
import { LocalFootprint } from "@/components/sections/LocalFootprint";
import { FAQ } from "@/components/sections/FAQ";
import { ConversionBand } from "@/components/sections/ConversionBand";

export const metadata = generatePageMetadata({
  title: "Managed Intelligence & Secure AI Operations in Dallas | ITECS",
  description:
    "ITECS helps organizations of 50-300 employees govern Copilot, Claude, and ChatGPT, train teams, and build AI agents — from personal desktop agents to enterprise hosted agents with human-in-the-loop review. 24 years of IT operations behind it.",
  path: "/",
  keywords: [
    "managed intelligence provider",
    "Dallas AI consultants",
    "enterprise AI agents",
    "custom AI agents for business",
    "AI governance for mid-market",
    "mid-market AI consulting",
    "AI adoption roadmap",
    "Claude Cowork rollout",
    "Copilot governance",
    "AI readiness assessment",
    "secure AI operations",
    "managed AI services Dallas",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* 1. The buyer's moment */}
      <Hero />
      <TrustBar />
      {/* 2. The two-agent taxonomy — the core positioning */}
      <AgentTaxonomy />
      {/* 3. Self-locate on the adoption curve */}
      <AdoptionJourney />
      {/* 4. Concrete proof: flagship enterprise agent builds + verticals */}
      <FeaturedAgentBuilds />
      {/* 5. Governance & security, consolidated */}
      <AIAdoptionUnderstanding />
      <SecurityGovernanceBand />
      {/* 6. Pricing transparency */}
      <AIPricingPreview />
      {/* 7. Proof cluster */}
      <OutcomesProof />
      <Testimonials />
      <ThirdPartyValidation />
      {/* 8. Full service catalog */}
      <ServicesGrid />
      {/* 9. Heritage — supporting story, below the fold */}
      <Heritage />
      <InsightsTeaser />
      <ManagedITReferral />
      <LocalFootprint />
      <FAQ items={FAQ_ITEMS} />
      <ConversionBand />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
    </>
  );
}
