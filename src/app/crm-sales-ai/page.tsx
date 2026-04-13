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

export const metadata = generatePageMetadata({
  title: "AI CRM & Sales Automation for Small Business",
  description:
    "Integrate AI into HubSpot or Salesforce to automate lead scoring, outreach, and data entry — saving reps 15+ hours/week. 22 years IT expertise.",
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
      <ServiceHero service={service} />

      {/* 2. SMB Pain Point — validate the bleeding neck */}
      <PainPoint
        stat="68%"
        statLabel="of a sales rep's week is spent on non-selling activities"
        heading="Your Reps Spend More Time on Data Entry Than Selling"
        paragraphs={[
          "Your sales team opens HubSpot 40 times a day to log calls, update deal stages, and copy-paste prospect info between tabs. They research leads manually on LinkedIn, draft outreach from scratch, and guess which prospects to prioritize. The CRM was supposed to help them sell — instead it became their biggest time sink.",
          "For a 10-person sales team, that adds up to 150+ hours per week lost to admin work. At a blended cost of $50/hour, you're burning $7,500 a week on tasks AI handles in seconds.",
        ]}
        scenario={{
          business: "A 30-person HVAC company in Dallas",
          problem:
            "had 8 field sales reps manually entering job estimates, follow-up notes, and lead sources into Salesforce after every site visit. Reps averaged 45 minutes of CRM admin per day — time they weren't spending on callbacks or closing.",
          result:
            "After integrating AI for automatic activity logging and lead scoring, the team recovered 6 hours per rep per week. Close rates increased 22% in the first quarter with zero new hires.",
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
          "Private AI environments — your CRM data never leaves your tenant. We deploy AI within your existing HubSpot or Salesforce security perimeter",
          "Zero data training — OpenAI and third-party AI providers never train on your CRM records, emails, or pipeline data",
          "Role-based access controls mirror your existing CRM permissions. AI actions respect the same visibility rules your reps follow",
          "SOC 2 Type II alignment — we follow the same security controls used by the CRM platforms themselves",
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
        description="AI CRM integration pays back fast. Here's how it compares to the status quo for a team of 5-15 sales reps."
        comparison={[
          {
            label: "Lead research time",
            traditional: "30-45 min per lead",
            ai: "Instant, automated",
          },
          {
            label: "CRM data entry",
            traditional: "45+ min/day per rep",
            ai: "Auto-logged",
          },
          {
            label: "Lead scoring",
            traditional: "Gut feel / manual",
            ai: "AI-scored by close likelihood",
          },
          {
            label: "Outreach personalization",
            traditional: "Generic templates",
            ai: "AI-drafted from CRM data",
          },
          {
            label: "Pipeline accuracy",
            traditional: "Stale, incomplete",
            ai: "Real-time, auto-enriched",
          },
          {
            label: "Time to first contact",
            traditional: "Hours to days",
            ai: "Minutes",
          },
        ]}
        roiStatement="Most teams recover the full setup cost within 60 days through higher close rates and recovered selling time."
        pricingNotes={[
          "Flat-fee setup: $5,000–$15,000 depending on CRM platform, integrations, and team size",
          "Monthly optimization and support from $500/month — includes model tuning and reporting",
          "No per-seat AI licensing fees — flat monthly rate regardless of team size",
          "Pilot program available: test AI on one pipeline segment before rolling out company-wide",
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
