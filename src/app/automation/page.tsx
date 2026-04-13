import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
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

const service = SERVICES.find((s) => s.slug === "automation")!;

export const metadata = generatePageMetadata({
  title: "AI Workflow Automation for Small Business | ITECS AI Dallas",
  description:
    "Automate lead follow-ups, data entry, and scheduling for your Dallas business. 40% cost reduction, 99.9% uptime. Managed by a 22-year MSP. From $2,500.",
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
      <ServiceHero service={service} />

      {/* 2. SMB Pain Point — validate the manual workflow drain */}
      <PainPoint
        stat="60%"
        statLabel="of small business employee time goes to repetitive tasks AI handles in seconds"
        heading="Your Team Spends Half the Day on Work a Machine Should Handle"
        paragraphs={[
          "Your office manager copies lead info from web forms into the CRM by hand. Your dispatcher assigns service calls from a spreadsheet and texts confirmations one at a time. Your bookkeeper re-enters invoice data from emails into QuickBooks every afternoon. These tasks run your business — but they drain the people doing them.",
          "Every manual handoff is a place where leads slip through, data gets mistyped, and follow-ups get forgotten. Your competitors automate these workflows and respond to leads in minutes. Your team responds in hours — or not at all. The gap widens every month you wait.",
        ]}
        scenario={{
          business: "A 30-person HVAC company in Richardson",
          problem:
            "had dispatchers manually assigning 40+ service calls per day from a shared spreadsheet. Technicians received assignments via group text. Lead follow-ups took 24–48 hours because the office manager toggled between the CRM, email, and a paper calendar. They lost an estimated 15% of inbound leads to slow response times.",
          result:
            "ITECS automated their dispatch-to-invoice pipeline: web form capture → CRM entry → technician assignment → customer confirmation → post-service invoice. The team now responds to leads within 5 minutes and saves 28 hours per week on manual data entry.",
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

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Automate and Connect"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your workflow data, customer records, and internal processes stay protected at every step. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 22 years of enterprise security experience."
        points={[
          "Tool-agnostic architecture — we build on Zapier, Make.com, Power Automate, or custom APIs based on your needs, not vendor margins",
          "Encrypted data pipelines — all workflow data in transit and at rest uses AES-256 encryption with no data stored on third-party servers beyond what your connected tools require",
          "Credential isolation — API keys and access tokens live in encrypted vaults, never hardcoded or shared between client environments",
          "Compliance-ready automations — workflows respect HIPAA, SOC 2, and PCI-DSS requirements for healthcare, legal, and financial services",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before automating sensitive workflows",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Microsoft Power Automate Security & Compliance",
          href: "https://learn.microsoft.com/en-us/power-automate/security-privacy-compliance",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does AI Workflow Automation Cost?"
        description="Most businesses try DIY automation with free-tier tools, then hire a freelancer when it breaks. Here is how ITECS compares for a team running 5–20 automated workflows."
        traditionalLabel="DIY / Freelancer"
        aiLabel="ITECS Managed Automation"
        comparison={[
          {
            label: "Workflows automated",
            traditional: "2–3 basic triggers",
            ai: "10–20+ multi-step pipelines",
          },
          {
            label: "Error handling",
            traditional: "Manual checking, breaks silently",
            ai: "24/7 monitoring with auto-recovery",
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
            traditional: "3–6 months of tinkering",
            ai: "2–4 weeks to production",
          },
          {
            label: "Scalability",
            traditional: "Rebuilds when volume grows",
            ai: "Architecture scales with your business",
          },
        ]}
        roiStatement="Average client ROI: 40% reduction in operational costs within 60 days. Most businesses recover setup costs in the first month through time savings alone."
        pricingNotes={[
          "Setup: $2,500–$10,000 depending on workflow count, complexity, and integrations required",
          "Monthly management from $500/month — includes 24/7 monitoring, error recovery, and optimization",
          "No per-workflow fees — automate as many processes as your plan covers",
          "Add new automations anytime without disrupting existing pipelines",
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
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          {
            name: service.shortTitle,
            url: `${SITE_CONFIG.url}${service.href}`,
          },
        ])}
      />
    </>
  );
}
