import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { PainPoint } from "@/components/sections/PainPoint";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { ServiceJourneyDiagram } from "@/components/sections/ServiceJourneyDiagram";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import { TrustBar } from "@/components/sections/TrustBar";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Services for Dallas Small Businesses",
  description:
    "9 managed AI services for Dallas businesses with 10–300 employees: consulting, automation, custom AI agents, AI DevOps, training, security, CRM, and more. 24+ years IT experience.",
  path: "/services",
  keywords: [
    "small business AI services Dallas",
    "AI automation Dallas",
    "custom AI agents Dallas",
    "AI consulting Dallas",
    "AI training Dallas",
    "AI services for small business",
    "managed AI services Dallas",
  ],
});

const SERVICES_FAQ = [
  {
    question: "How do I know which AI service my business needs first?",
    answer:
      "Start with an AI consulting assessment. We audit your team's workflows, identify the biggest time drains, and recommend the service that delivers the fastest ROI — typically automation, training, or a custom AI agent when the workflow needs one.",
  },
  {
    question: "Do I need to buy all 9 services at once?",
    answer:
      "No. Most clients start with one or two services and expand as they see results. Our three-phase framework (Assess, Build, Scale) lets you adopt AI incrementally without disrupting daily operations.",
  },
  {
    question:
      "Is my business data safe when using ITECS AI services?",
    answer:
      "Yes. Every ITECS AI deployment runs in a private environment — your data never trains public models. We use AES-256 encryption, credential isolation, and comply with HIPAA, SOC 2, and PCI-DSS standards, backed by 24 years of cybersecurity operations.",
  },
  {
    question:
      "What size business do ITECS AI services work best for?",
    answer:
      "We specialize in businesses with 10–300 employees — large enough to have repetitive workflows worth automating, small enough that enterprise AI vendors are out of budget. Our pricing and support are built for this range.",
  },
  {
    question: "How long does it take to see results from AI services?",
    answer:
      "Most clients see measurable time savings within 2–4 weeks of deployment. Automation and AI receptionist services deliver the fastest ROI — often within the first billing cycle.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />
      </div>

      {/* 1. Hero — H1 + Zero-Click Answer Block */}
      <ServicesHero />

      {/* 2. Client trust bar */}
      <TrustBar />

      {/* 3. Buyer education — reduce complexity, security, and cost concerns */}
      <AIAdoptionUnderstanding />

      {/* 4. SMB Pain Point — AI choice paralysis */}
      <PainPoint
        stat="73%"
        statLabel="of small businesses say AI could help — but don't know where to start"
        heading="You Know AI Could Save Time. You Just Don't Know Which Tool to Pick."
        paragraphs={[
          "Your inbox is full of pitches — ChatGPT wrappers, automation platforms, AI-powered CRMs, voice bots. Each one claims to save your team hours. But none of them explain which problem to solve first, how to connect it to your existing tools, or who maintains it when something breaks at 2 AM.",
          "Without a clear starting point, most businesses either do nothing or buy a tool they never fully deploy. Meanwhile, competitors with fewer employees are responding to leads faster, processing invoices automatically, and training their teams on AI you haven't evaluated yet.",
        ]}
        scenario={{
          business: "A 45-person property management company in Plano",
          problem:
            "evaluated 6 different AI tools over 4 months — a chatbot for tenant inquiries, an automation platform for lease renewals, and an AI receptionist for after-hours calls. They demoed all of them but deployed none, because no one on staff could assess data readiness, integration complexity, or ongoing maintenance requirements. Each vendor promised ROI but none explained how their tool connected to the company's existing Yardi and RingCentral stack.",
          result:
            "ITECS ran a 2-week AI readiness audit, identified tenant communication and lease processing as the highest-ROI automation targets, and deployed a custom AI agent integrated with Yardi plus an AI receptionist handling after-hours calls. The team now saves 32 hours per week and responds to tenant requests within 3 minutes instead of 4 hours.",
        }}
      />

      {/* 5. Three-phase AI journey diagram */}
      <ServiceJourneyDiagram />

      {/* 6. Full services grid */}
      <ServicesGrid />

      {/* 7. Company stats */}
      <StatsBar />

      {/* 8. Enterprise-grade security */}
      <SecurityGuarantee
        description="Every AI service ITECS deploys runs in a private, encrypted environment. Your business data never trains public models and never leaves your control. ITECS AI is backed by ITECS — a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Private AI environments — your data stays in isolated, tenant-specific deployments with no cross-client data sharing",
          "AES-256 encryption at rest and in transit across all AI services, API connections, and workflow pipelines",
          "Credential isolation — API keys, access tokens, and service accounts live in encrypted vaults, never hardcoded",
          "HIPAA, SOC 2, and PCI-DSS compliance support for healthcare, legal, and financial services clients",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before deploying any AI service",
          href: "/data-audit",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
        }}
      />

      {/* 9. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={SERVICES_FAQ} heading="AI Services FAQ" />

      {/* 10. Final CTA */}
      <CTASection />

      {/* JSON-LD Schema — FAQPage with verbatim parity */}
      <JsonLd data={generateFAQSchema(SERVICES_FAQ)} />
    </>
  );
}
