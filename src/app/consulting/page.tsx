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
import { ConsultingWorkflowDiagram } from "@/components/sections/ConsultingWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "consulting")!;

export const metadata = generatePageMetadata({
  title: "AI Consulting for Small Business in Dallas | ITECS AI",
  description:
    "Practical AI adoption plans for Dallas businesses with 10–300 employees. Save 20+ hours/week with vendor-neutral guidance from a 22-year MSP. From $3,000.",
  path: service.href,
  keywords: service.keywords,
});

export default function ConsultingPage() {
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

      {/* 2. SMB Pain Point — validate the analysis paralysis */}
      <PainPoint
        stat="40+"
        statLabel="hours per month SMBs waste researching AI tools they never implement"
        heading="Your Team Knows AI Could Help — But Nobody Knows Where to Start"
        paragraphs={[
          "Your managers subscribe to ChatGPT Plus, watch YouTube tutorials, and test free AI tools for a week before moving on. Three departments champion three different platforms. After months of evaluation, no AI runs in production. The problem is not the technology — it is the lack of a practical plan that maps AI to your specific workflows.",
          "Every month without a clear AI strategy, your competitors automate another manual process. But the wrong implementation wastes budget, frustrates employees, and erodes trust in AI across your organization. You need a guide, not another tool demo.",
        ]}
        scenario={{
          business: "A 40-person accounting firm in Plano",
          problem:
            "spent 6 months evaluating AI tools for tax document processing. Three partners each championed different platforms — Microsoft Copilot, a custom ChatGPT solution, and a niche accounting AI product. After $12,000 in trial subscriptions and 200+ hours of internal meetings, zero AI ran in production.",
          result:
            "ITECS completed a two-week AI Insight Sprint, identified document processing as the highest-ROI automation target, and integrated Microsoft Copilot with their SharePoint-based workflow within 30 days. The firm now saves 25 hours per week on document review.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="AI Consulting Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Consulting Workflow Diagram — multimedia visual */}
      <ConsultingWorkflowDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Evaluate and Integrate"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your workflow data, financial records, and internal processes stay protected throughout the engagement. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 22 years of enterprise security experience."
        points={[
          "Vendor-neutral recommendations — we evaluate Microsoft Copilot, OpenAI, Google Vertex AI, and open-source options based on your needs, not vendor margins",
          "NDA-protected engagements — every AI Insight Sprint and implementation project operates under a signed NDA before we access any internal data",
          "Zero data retention — workflow documentation and audit findings are encrypted in transit and at rest, then deleted within 30 days of project completion",
          "Compliance-aware guidance — our recommendations account for HIPAA, SOC 2, PCI-DSS, and industry-specific regulatory requirements from day one",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before adopting new AI tools",
          href: "/data-audit",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does AI Consulting Actually Cost?"
        description="Most businesses try DIY first, then hire a generalist. Here is how ITECS compares for a team of 10–50 employees."
        traditionalLabel="DIY / In-House"
        aiLabel="ITECS Consulting"
        comparison={[
          {
            label: "Time to first AI in production",
            traditional: "6–12 months",
            ai: "2–4 weeks",
          },
          {
            label: "Upfront cost",
            traditional: "$10,000–$30,000 in wasted trials",
            ai: "$3,000–$8,000 flat fee",
          },
          {
            label: "Tool evaluation",
            traditional: "YouTube, free trials, guesswork",
            ai: "Structured vendor-neutral assessment",
          },
          {
            label: "Implementation support",
            traditional: "None — figure it out internally",
            ai: "Hands-on setup + staff training",
          },
          {
            label: "Security review",
            traditional: "Skipped or afterthought",
            ai: "Built into every recommendation",
          },
          {
            label: "Ongoing optimization",
            traditional: "Stalls after initial setup",
            ai: "Monthly tuning and KPI tracking",
          },
        ]}
        roiStatement="Average client ROI: 3.2x within 90 days. Most teams recover the full engagement cost through time savings in the first month."
        pricingNotes={[
          "AI Insight Sprint: $3,000–$8,000 — two-week discovery, assessment, and prioritized roadmap",
          "Full implementation: scoped and quoted after the Sprint, typically $8,000–$25,000 depending on integrations",
          "Monthly optimization retainer from $500/month — includes KPI tracking, model tuning, and quarterly reviews",
          "No per-seat fees, no platform commissions — you own everything we build",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Consulting FAQ" />

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
