import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { MIP_ENTERPRISE_FAQ } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MIPHero } from "./MIPHero";
import { MIPEvolutionDiagram } from "@/components/sections/MIPEvolutionDiagram";
import { MIPDefinitionCapabilities } from "@/components/sections/MIPDefinitionCapabilities";
import { MIPComparison } from "@/components/sections/MIPComparison";
import { MethodologySteps } from "@/components/sections/MethodologySteps";
import { SecurityGovernanceBand } from "@/components/sections/SecurityGovernanceBand";
import { OutcomesProof } from "@/components/sections/OutcomesProof";
import { FAQ } from "@/components/sections/FAQ";
import { ConversionBand } from "@/components/sections/ConversionBand";

export const metadata = generatePageMetadata({
  title: "Managed Intelligence Provider — Enterprise AI Operations",
  description:
    "ITECS is Dallas's Managed Intelligence Provider (MIP), operating AI agents, automations, governance, and reporting for organizations with 10–300 employees.",
  path: "/managed-intelligence-provider",
  keywords: [
    "managed intelligence provider",
    "managed AI services Dallas",
    "AI managed service provider Dallas",
    "managed intelligence provider Dallas",
    "MIP Dallas",
    "AI MSP Dallas",
    "enterprise AI operations",
  ],
});

export default function ManagedIntelligenceProviderPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: "Managed Intelligence Provider",
              href: "/managed-intelligence-provider",
            },
          ]}
        />
      </div>

      {/* 1. Hero — MIP positioning and approved proof bar */}
      <MIPHero />

      {/* 2. MSP → MSSP → MIP evolution */}
      <MIPEvolutionDiagram />

      {/* 3. What Managed Intelligence means */}
      <MIPDefinitionCapabilities />

      {/* 4. MSP vs. MIP comparison */}
      <MIPComparison />

      {/* 5. Methodology */}
      <MethodologySteps />

      {/* 6. Security & governance */}
      <SecurityGovernanceBand />

      {/* 7. Proof / outcomes */}
      <OutcomesProof />

      {/* 8. FAQ */}
      <FAQ
        items={MIP_ENTERPRISE_FAQ}
        heading="Managed Intelligence Provider FAQ"
      />

      {/* 9. Final CTA */}
      <ConversionBand />

      {/* JSON-LD Schema — FAQPage with verbatim parity */}
      <JsonLd data={generateFAQSchema(MIP_ENTERPRISE_FAQ)} />
    </>
  );
}
