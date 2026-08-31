import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { PainPoint } from "@/components/sections/PainPoint";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { AIPricingPreview } from "@/components/sections/AIPricingPreview";
import { ServiceJourneyDiagram } from "@/components/sections/ServiceJourneyDiagram";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBar } from "@/components/sections/StatsBar";
import { TrustBar } from "@/components/sections/TrustBar";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Services for Dallas Growth-Stage and Mid-Market Teams",
  description:
    "10 managed AI services for Dallas businesses with 10–300 employees: consulting, automation, custom AI agents, AI DevOps, training, CRM, AI SEO, and more.",
  path: "/services",
  keywords: [
    "mid-market AI services Dallas",
    "AI automation Dallas",
    "custom AI agents Dallas",
    "AI consulting Dallas",
    "AI training Dallas",
    "AI services for growing organizations",
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
    question: "Do I need to buy all 10 services at once?",
    answer:
      "No. ITECS scopes the smallest useful starting point and expands only after the workflow, controls, ownership, and measured result support the next phase.",
  },
  {
    question:
      "Is my business data safe when using ITECS AI services?",
    answer:
      "Data handling depends on the selected platform, plan, architecture, connectors, and client requirements. ITECS documents data flows, contractual vendor terms, identity controls, retention, and human approval before production use. SOC 2 Type II applies only to Promus managed cloud hosting, not to the MSP or AI practice as a whole.",
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
      "Timing depends on source readiness, integrations, permissions, testing, and review requirements. ITECS confirms the schedule after discovery and measures results against an agreed pre-launch baseline.",
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

      {/* 4. Pricing pathways — reduce cost uncertainty before the service grid */}
      <AIPricingPreview />

      {/* 5. Operating pain point — AI choice paralysis */}
      <PainPoint
        stat="73%"
        statLabel="modeled share of leaders who need a clear AI operating model"
        heading="You Know AI Could Save Time. You Just Don't Know Which Tool to Pick."
        paragraphs={[
          "Your inbox is full of pitches — ChatGPT wrappers, automation platforms, AI-powered CRMs, voice bots. Each one claims to save your team hours. But none of them explain which problem to solve first, how to connect it to your existing tools, or who maintains it when something breaks at 2 AM.",
          "Without a clear starting point, a team can buy tools it never fully deploys while ownership, data readiness, and maintenance remain unresolved. A defensible plan ties each purchase to a workflow, owner, control set, and baseline.",
        ]}
        scenario={{
          business: "A 45-person property management company in Plano",
          problem:
            "could evaluate several disconnected tools without a way to assess data readiness, integration complexity, ownership, or ongoing maintenance across the existing property-management and telephony stack.",
          result:
            "A readiness engagement could rank tenant communication and lease processing, document integration and review requirements, and baseline response time before any agent or voice workflow is approved.",
        }}
      />

      {/* 6. Three-phase AI journey diagram */}
      <ServiceJourneyDiagram />

      {/* 7. Full services grid */}
      <ServicesGrid showSisterSiteCard />

      {/* 8. Company stats */}
      <StatsBar />

      {/* 9. Enterprise-grade security */}
      <SecurityGuarantee
        description="ITECS selects deployment architecture, vendor plans, access, retention, and review controls for the client's data and risk requirements. ITECS AI is backed by ITECS, a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Data-boundary review — tenancy, subprocessors, connectors, and storage locations are documented before production",
          "Encryption and retention — controls are verified for each selected platform and integration rather than assumed sitewide",
          "Credential isolation — API keys, access tokens, and service accounts live in encrypted vaults, never hardcoded",
          "Compliance readiness — regulated work is custom-scoped to applicable obligations and eligible vendor contracts",
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

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={SERVICES_FAQ} heading="AI Services FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schema — FAQPage with verbatim parity */}
      <JsonLd data={generateFAQSchema(SERVICES_FAQ)} />
    </>
  );
}
