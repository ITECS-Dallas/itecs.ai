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
import { ReceptionistCircuit } from "@/components/effects/circuits/ReceptionistCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CallFlowDiagram } from "@/components/sections/CallFlowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "ai-receptionist")!;
const agentDiscovery = getAIPricingOffering(
  "Agent Discovery & Technical Specification",
);
const singleWorkflowAgent = getAIPricingOffering(
  "Single-Workflow Production Agent",
);
const agentOperationsOne = MANAGED_AI_AGENT_OPERATIONS.prices[0];

export const metadata = generatePageMetadata({
  title: "AI Receptionist for Growing Teams",
  description:
    "Deploy governed AI voice agents that answer calls, book appointments, and route exceptions through an approved call flow.",
  path: service.href,
  keywords: service.keywords,
});

export default function AIReceptionistPage() {
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
      <ServiceHero service={service} circuit={<ReceptionistCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. Operating pain point — validate the missed-call risk */}
      <PainPoint
        stat="24/7"
        statLabel="modeled coverage window, subject to telephony and support scope"
        heading="Your Front Desk Can't Answer Every Call — and It's Costing You"
        paragraphs={[
          "Your receptionist handles walk-ins, transfers, and paperwork at the same time. When two calls come in at once, one goes to voicemail. That caller hangs up and calls your competitor. For businesses with 10-50 employees, this happens 5-15 times per week.",
          "After-hours calls are worse. A potential $5,000 project calls at 6:15 PM and hears a generic voicemail greeting. They move on. You never know they called.",
        ]}
        scenario={{
          business: "A 12-person dental clinic in Plano",
          problem:
            "could miss appointment requests during lunch and after hours while front-desk staff balance check-ins, insurance work, and calls.",
          result:
            "A voice agent could answer approved questions, offer available appointment slots, and route clinical or sensitive exceptions to staff. Booking and revenue impact would be measured after launch.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="AI Receptionist Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Call Flow Diagram — multimedia visual */}
      <CallFlowDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Connects to Your Existing Tools"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Call recordings, transcripts, and caller data follow the storage, access, disclosure, and retention controls selected for the telephony and AI vendors. ITECS AI is backed by ITECS, a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Architecture review — tenancy and isolation depend on the selected voice, telephony, model, and hosting configuration",
          "Contract review — vendor data use and training terms are verified for the selected business or enterprise plans",
          "Recording controls — storage, encryption, role access, consent, and retention are documented before launch",
          "Regulated workflows — HIPAA or other regulated use is custom-scoped only on eligible platforms and contracts",
        ]}
        internalLink={{
          text: "Start with an AI data readiness audit to assess your security posture",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Twilio Data Security & Privacy Practices",
          href: "https://www.twilio.com/en-us/security",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does an AI Receptionist Cost?"
        description="The business case depends on current call volume, coverage, telephony, integrations, review requirements, and production operations. ITECS validates each comparison during discovery."
        comparison={[
          {
            label: "Monthly cost",
            traditional: "Salary, coverage, and answering-service costs vary",
            ai: "Scoped Agent Operations after launch",
          },
          {
            label: "Availability",
            traditional: "Business hours only",
            ai: "Configured coverage window",
          },
          {
            label: "Simultaneous calls",
            traditional: "1 at a time",
            ai: "Capacity confirmed during scoping",
          },
          {
            label: "Setup time",
            traditional: "Current hiring or vendor timeline",
            ai: "Confirmed after discovery and testing",
          },
          {
            label: "Calendar booking",
            traditional: "Manual, error-prone",
            ai: "Automated after calendar testing",
          },
          {
            label: "Sick days / turnover",
            traditional: "Yes",
            ai: "Not dependent on one scheduled employee",
          },
        ]}
        roiStatement="ITECS compares current call-handling costs and missed-call volume with the proposed platform, usage, and operations costs before setting a savings target."
        pricingNotes={[
          `${agentDiscovery.name}: ${agentDiscovery.price}, credited toward the build when the client proceeds`,
          `${singleWorkflowAgent.name}: ${singleWorkflowAgent.price} after discovery confirms the production scope`,
          `${agentOperationsOne.agents}: ${agentOperationsOne.price} for monitoring, evaluations, drift checks, data refresh, exception triage, and tuning`,
          "Production operation after launch is never absorbed into the build fee",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Receptionist FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
