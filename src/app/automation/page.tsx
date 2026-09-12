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
import { AutomationCircuit } from "@/components/effects/circuits/AutomationCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AutomationWorkflowDiagram } from "@/components/sections/AutomationWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceDecisionGuide } from "@/components/sections/ServiceDecisionGuide";

const service = SERVICES.find((s) => s.slug === "automation")!;
const guidedBuildSprint = getAIPricingOffering(
  "Guided Build Sprint (4 sessions)",
);
const guidedBuildIntensive = getAIPricingOffering(
  "Guided Build Intensive (8 sessions)",
);
const localAgentSprint = getAIPricingOffering("Local Agent Sprint");
const agentOperationsOne = MANAGED_AI_AGENT_OPERATIONS.prices[0];

export const metadata = generatePageMetadata({
  title: "AI Automation Services in Dallas — Business Workflow Automation",
  description: `AI automation services for Dallas businesses — co-build a bounded workflow from ${guidedBuildSprint.price} or have ITECS deliver a local agent with governed handoff.`,
  path: service.href,
  keywords: service.keywords,
});

export default function AutomationPage() {
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
      <ServiceHero service={service} circuit={<AutomationCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. Operating pain point — validate the manual workflow drain */}
      <PainPoint
        stat="60%"
        statLabel="modeled share of time available for repetitive-work reduction"
        heading="Your Team Spends Half the Day on Work a Machine Should Handle"
        paragraphs={[
          "Your office manager copies lead info from web forms into the CRM by hand. Your dispatcher assigns service calls from a spreadsheet and texts confirmations one at a time. Your bookkeeper re-enters invoice data from emails into QuickBooks every afternoon. These tasks run your business — but they drain the people doing them.",
          "Every manual handoff is a place where leads slip through, data gets mistyped, and follow-ups get forgotten. Your competitors automate these workflows and respond to leads in minutes. Your team responds in hours — or not at all. The gap widens every month you wait.",
        ]}
        scenario={{
          business: "A 30-person HVAC company in Richardson",
          problem:
            "could rely on a shared spreadsheet, group texts, a CRM, email, and a paper calendar for dispatch and lead follow-up, creating duplicate entry and avoidable delay.",
          result:
            "A scoped dispatch-to-invoice workflow could connect form capture, CRM entry, assignment, confirmation, and invoicing. Response-time and labor targets would be baselined and tested before production rollout.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="AI Automation Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Automation Workflow Diagram — multimedia visual */}
      <AutomationWorkflowDiagram />

      <ServiceDecisionGuide service="automation" />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Automate and Connect"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="ITECS documents the data flow, access, retention, review, and recovery controls required for the selected workflow and platforms. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 24 years of enterprise security experience."
        points={[
          "Tool-agnostic architecture — we build on Zapier, Make.com, Power Automate, or custom APIs based on your needs, not vendor margins",
          "Data-flow controls — encryption, storage locations, subprocessors, and retention are documented for the selected automation and connected tools",
          "Credential isolation — API keys and access tokens live in encrypted vaults, never hardcoded or shared between client environments",
          "Compliance-aware design — regulated workflows are scoped to applicable client obligations and vendor eligibility",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before automating sensitive workflows",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Microsoft Power Automate Security & Compliance",
          href: "https://learn.microsoft.com/en-us/power-platform/admin/wp-compliance-data-privacy",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does AI Workflow Automation Cost?"
        description="DIY automation can become difficult to own as connectors, exceptions, and workflow volume grow. Here is the design comparison ITECS validates for a managed automation scope."
        traditionalLabel="DIY / Freelancer"
        aiLabel="ITECS Managed Automation"
        comparison={[
          {
            label: "Workflows automated",
            traditional: "Scope varies by owner and tool",
            ai: "Scope confirmed during discovery",
          },
          {
            label: "Error handling",
            traditional: "Manual checking, breaks silently",
            ai: "Scoped monitoring, alerts, and recovery runbooks",
          },
          {
            label: "Tool integration depth",
            traditional: "Surface-level connectors",
            ai: "Custom API logic + AI decisioning",
          },
          {
            label: "Maintenance",
            traditional: "You fix it when it breaks",
            ai: "Proactive optimization + monthly reports",
          },
          {
            label: "Time to ROI",
            traditional: "No defined baseline or schedule",
            ai: "Schedule confirmed after discovery",
          },
          {
            label: "Scalability",
            traditional: "Rebuilds when volume grows",
            ai: "Capacity and change paths designed for the approved scope",
          },
        ]}
        roiStatement="ITECS establishes the current labor, error, throughput, and response-time baseline, then reports the observed outcome against the targets approved for the workflow."
        pricingNotes={[
          `${guidedBuildSprint.name}: ${guidedBuildSprint.price} for one bounded employee-led agent or workflow`,
          `${guidedBuildIntensive.name}: ${guidedBuildIntensive.price} for a complex multi-step co-build`,
          `${localAgentSprint.name}: ${localAgentSprint.price} for an ITECS-delivered local agent`,
          `Production operation is separate from the build; ${agentOperationsOne.agents} starts at ${agentOperationsOne.price}`,
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Automation FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
