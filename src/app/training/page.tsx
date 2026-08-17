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
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GuidedBuildEngagement } from "@/components/sections/GuidedBuildEngagement";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "training")!;

export const metadata = generatePageMetadata({
  title: "AI Training for Employees in Dallas",
  description:
    "Hands-on AI training and guided agent builds for Dallas teams using ChatGPT, Claude, Gemini, and Copilot, built around real work and safe adoption.",
  path: service.href,
  keywords: service.keywords,
});

export default function TrainingPage() {
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

      {/* 1. Hero — H1 + Zero-Click Answer Block */}
      <ServiceHero service={service} />

      <AIAdoptionUnderstanding />

      {/* 2. Solution */}
      <ServiceFeatures
        features={service.features}
        title="AI Training That Leaves Working Systems Behind"
      />

      {/* 3. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 4. Guided Build deliverables, runtime, formats, and service brief */}
      <GuidedBuildEngagement />

      {/* 5. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Tools We Train Your Team On"
      />

      {/* 6. Security and governance */}
      <SecurityGuarantee
        title="Governed Training on Real Business Work"
        description="Guided Builds use the files, permissions, and business work your team controls. ITECS brings 24+ years of managed IT and cybersecurity experience to the workspace, workflow boundaries, and human review process."
        points={[
          "Business workspace review — we check each tool's plan, admin controls, and data-handling terms before sensitive work is approved",
          "Written workflow boundaries — every build states what the agent should do, which files it may use, and where it must stop",
          "Scoped project access — reference files are organized around the workflow instead of exposing an entire drive by default",
          "Human review and live testing — your team watches the agent run against real work and approves the result before the workflow is reused",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before training your team",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Microsoft Copilot for Microsoft 365 Data Privacy",
          href: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
        }}
      />

      {/* 7. Company proof */}
      <ServiceStats stats={service.stats} />

      {/* 8. FAQ — LAST content section before CTA */}
      <FAQ items={service.faq} heading="AI Training FAQ" />

      {/* 9. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
