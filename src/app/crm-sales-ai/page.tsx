import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import {
  getAIPricingOffering,
  MANAGED_AI_AGENT_OPERATIONS,
  SERVICES,
} from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { CRMCircuit } from "@/components/effects/circuits/CRMCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SalesPipelineDiagram } from "@/components/sections/SalesPipelineDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "crm-sales-ai")!;
const agentDiscovery = getAIPricingOffering(
  "Agent Discovery & Technical Specification",
);
const integratedAgent = getAIPricingOffering(
  "Integrated / Line-of-Business Agent",
);
const agentOperationsOne = MANAGED_AI_AGENT_OPERATIONS.prices[0];

export const metadata = generatePageMetadata({
  title: "AI CRM & Sales Automation for Growing Teams",
  description:
    "Integrate governed AI into HubSpot or Salesforce for lead scoring support, outreach drafts, and approved data-entry workflows.",
  path: service.href,
  keywords: service.keywords,
});

export default function CRMSalesAIPage() {
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
      <ServiceHero service={service} circuit={<CRMCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. Operating pain point — validate the sales admin drain */}
      <PainPoint
        stat="68%"
        statLabel="modeled non-selling time to baseline during discovery"
        heading="Your Reps Spend More Time on Data Entry Than Selling"
        paragraphs={[
          "Your sales team opens HubSpot 40 times a day to log calls, update deal stages, and copy-paste prospect info between tabs. They research leads manually on LinkedIn, draft outreach from scratch, and guess which prospects to prioritize. The CRM was supposed to help them sell — instead it became their biggest time sink.",
          "For a sales team, the cost depends on actual activity volume, time per task, compensation, and existing automation. Discovery measures that baseline before ITECS recommends a workflow or forecasts a return.",
        ]}
        scenario={{
          business: "A 30-person HVAC company in Dallas",
          problem:
            "could have field representatives manually entering estimates, notes, and lead sources after each visit, reducing the time available for follow-up.",
          result:
            "A governed workflow could draft activity logs and scoring recommendations for review. Administrative time, data quality, and conversion impact would be measured against the pre-launch baseline.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="AI CRM & Sales Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Sales Pipeline Diagram — multimedia visual */}
      <SalesPipelineDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Integrates with Your CRM Stack"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your CRM contains your most sensitive business data — customer contacts, deal values, revenue forecasts, and communication history. ITECS AI is backed by ITECS, a Dallas-based cybersecurity MSP operating since 2002."
        points={[
          "Documented data flow — hosting, connectors, subprocessors, and any data movement are verified for the chosen CRM and AI architecture",
          "Contractual data terms — model training and retention depend on the selected vendor, plan, and configuration and are reviewed before launch",
          "Role-based access controls mirror your existing CRM permissions. AI actions respect the same visibility rules your reps follow",
          "Control mapping — deployment controls are mapped to client requirements without representing ITECS as SOC 2 Type II certified",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before connecting AI to your CRM",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Salesforce Trust & Compliance Documentation",
          href: "https://trust.salesforce.com/",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does AI CRM Integration Cost?"
        description="The business case depends on current activity volume, CRM quality, licenses, integrations, review steps, and production operations. Here is the workflow comparison ITECS validates during discovery."
        comparison={[
          {
            label: "Lead research time",
            traditional: "Measured during discovery",
            ai: "Automated within the approved data sources",
          },
          {
            label: "CRM data entry",
            traditional: "Measured during discovery",
            ai: "Auto-logged after validation",
          },
          {
            label: "Lead scoring",
            traditional: "Gut feel / manual",
            ai: "Scoring logic approved and monitored",
          },
          {
            label: "Outreach personalization",
            traditional: "Generic templates",
            ai: "AI-drafted from CRM data",
          },
          {
            label: "Pipeline accuracy",
            traditional: "Stale, incomplete",
            ai: "Refresh cadence defined in scope",
          },
          {
            label: "Time to first contact",
            traditional: "Current baseline measured",
            ai: "Target set after baseline measurement",
          },
        ]}
        roiStatement="ITECS measures current administrative time, response time, data quality, and conversion performance before setting any payback or outcome target."
        pricingNotes={[
          `${agentDiscovery.name}: ${agentDiscovery.price}, credited toward the build when the client proceeds`,
          `${integratedAgent.name}: ${integratedAgent.price} when the workflow needs production CRM integrations and reviewer controls`,
          `${agentOperationsOne.agents}: ${agentOperationsOne.price} after launch; multi-agent footprints follow the published ladder`,
          "Production operation is quoted separately and never absorbed into the build fee",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI CRM & Sales FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
