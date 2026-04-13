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
import { CallFlowDiagram } from "@/components/sections/CallFlowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "ai-receptionist")!;

export const metadata = generatePageMetadata({
  title: "AI Receptionist for Small Business",
  description:
    "Deploy AI voice agents that answer calls 24/7, book appointments, and save $3,000+/month. Backed by 22 years of IT security expertise.",
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
      <ServiceHero service={service} />

      {/* 2. SMB Pain Point — validate the bleeding neck */}
      <PainPoint
        stat="$3,000+"
        statLabel="lost per month on missed calls for a typical 20-person office"
        heading="Your Front Desk Can't Answer Every Call — and It's Costing You"
        paragraphs={[
          "Your receptionist handles walk-ins, transfers, and paperwork at the same time. When two calls come in at once, one goes to voicemail. That caller hangs up and calls your competitor. For businesses with 10-50 employees, this happens 5-15 times per week.",
          "After-hours calls are worse. A potential $5,000 project calls at 6:15 PM and hears a generic voicemail greeting. They move on. You never know they called.",
        ]}
        scenario={{
          business: "A 12-person dental clinic in Plano",
          problem:
            "was losing 8-10 appointment requests per week to missed calls during lunch breaks and after 5 PM. Their front desk staff juggled check-ins, insurance verification, and phone calls simultaneously.",
          result:
            "After deploying an AI voice agent, the clinic captured 40+ additional appointments per month — adding $12,000 in monthly revenue with zero new hires.",
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
        description="Every call recording, transcript, and caller data stays inside your private environment. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002."
        points={[
          "Private AI environments — your voice agent runs in isolated infrastructure, not shared multi-tenant servers",
          "Zero data training — OpenAI, ElevenLabs, and Twilio never use your call data to train their models",
          "Encrypted call recordings and transcripts stored in your own cloud tenant with role-based access controls",
          "HIPAA-eligible deployment available for medical, legal, and financial practices handling sensitive caller data",
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
        description="SMBs deserve transparent pricing. Here's how an AI receptionist compares to traditional alternatives for a business handling 200-500 calls per month."
        comparison={[
          {
            label: "Monthly cost",
            traditional: "$2,500–$4,000/mo",
            ai: "$300–$800/mo",
          },
          {
            label: "Availability",
            traditional: "Business hours only",
            ai: "24/7/365",
          },
          {
            label: "Simultaneous calls",
            traditional: "1 at a time",
            ai: "Unlimited",
          },
          {
            label: "Setup time",
            traditional: "2–4 weeks hiring",
            ai: "5–10 business days",
          },
          {
            label: "Calendar booking",
            traditional: "Manual, error-prone",
            ai: "Automated, real-time",
          },
          {
            label: "Sick days / turnover",
            traditional: "Yes",
            ai: "Never",
          },
        ]}
        roiStatement="Most businesses recover setup costs within 60 days — then save $2,000–$3,500 every month after."
        pricingNotes={[
          "Flat-fee deployment: $3,000–$6,000 depending on call complexity and integrations",
          "Monthly managed service includes monitoring, transcript review, and weekly optimization",
          "No per-minute charges — flat monthly rate regardless of call volume",
          "30-day pilot available: test with real calls before full commitment",
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
