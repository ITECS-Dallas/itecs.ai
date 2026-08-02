import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { SERVICES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import {
  OpsMemoryBoundaries,
  OpsMemoryOverview,
} from "@/components/sections/OpsMemoryOverview";
import { OpsMemoryRetrievalFlow } from "@/components/sections/OpsMemoryRetrievalFlow";
import { OpsMemoryDesktopExperience } from "@/components/sections/OpsMemoryDesktopExperience";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "ai-knowledge-base")!;

export const metadata = generatePageMetadata({
  title: "AI Knowledge Base & SOP Automation | ITECS OpsMemory",
  description:
    "ITECS OpsMemory turns approved company knowledge into cited answers and visual SOPs, with structured retrieval, managed permissions, review, and support.",
  path: service.href,
  keywords: service.keywords,
});

export default function AIKnowledgeBasePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: service.shortTitle, href: service.href },
          ]}
        />
      </div>

      <ServiceHero service={service} />

      <OpsMemoryOverview />

      <OpsMemoryRetrievalFlow />

      <OpsMemoryDesktopExperience />

      <ServiceFeatures
        features={service.features}
        title="What OpsMemory Helps Your Team Do"
      />

      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      <OpsMemoryBoundaries />

      <FAQ items={service.faq} heading="ITECS OpsMemory FAQ" />

      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
