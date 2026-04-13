import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MIPHero } from "./MIPHero";
import { PainPoint } from "@/components/sections/PainPoint";
import { MIPEvolutionDiagram } from "@/components/sections/MIPEvolutionDiagram";
import { ServiceJourneyDiagram } from "@/components/sections/ServiceJourneyDiagram";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { StatsBar } from "@/components/sections/StatsBar";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "Dallas Managed Intelligence Provider — Managed AI Services",
  description:
    "ITECS is Dallas's Managed Intelligence Provider (MIP). We deploy AI automation, custom ChatGPT agents, and managed AI services for businesses with 10–300 employees. 22+ years IT expertise.",
  path: "/managed-intelligence-provider",
  keywords: [
    "managed intelligence provider",
    "managed AI services Dallas",
    "AI managed service provider Dallas",
    "managed intelligence provider Dallas",
    "MIP Dallas",
    "AI MSP Dallas",
    "managed AI solutions small business",
  ],
});

const MIP_HOW_IT_WORKS = [
  {
    step: "AI readiness audit and workflow analysis",
    description:
      "We map your team's daily operations, identify repetitive tasks costing the most time, and score your data readiness across systems like Microsoft 365, HubSpot, QuickBooks, and your CRM. You get a plain-English report showing exactly where AI delivers the fastest ROI.",
  },
  {
    step: "Deploy AI solutions on your existing tools",
    description:
      "We build and deploy AI agents, automations, and integrations on the platforms your team already uses. No rip-and-replace. Custom ChatGPT agents connect to your internal data, workflow automations link your CRM to your invoicing, and AI voice agents answer your phones 24/7.",
  },
  {
    step: "Manage, monitor, and optimize continuously",
    description:
      "ITECS manages every AI deployment like we manage IT infrastructure — with 24/7 monitoring, error recovery, and monthly performance reports. When a workflow breaks at 2 AM, we fix it before your team notices. When OpenAI releases a new model, we evaluate and upgrade.",
  },
  {
    step: "Scale AI adoption across your organization",
    description:
      "We train your employees to use AI tools safely and effectively, then expand automation into new departments. Most clients start with one service and add 2–3 more within the first year as ROI compounds.",
  },
] as const;

const MIP_FAQ = [
  {
    question: "What is a managed intelligence provider?",
    answer:
      "A managed intelligence provider (MIP) is the evolution of the traditional MSP. While an MSP manages your IT infrastructure and an MSSP adds cybersecurity, a MIP deploys AI automation, custom AI agents, and data intelligence on top of that foundation. ITECS manages AI the same way we manage servers — with 24/7 monitoring, maintenance, and optimization.",
  },
  {
    question: "How is a MIP different from an MSP?",
    answer:
      "An MSP keeps your systems running. A MIP makes your business smarter. MSPs handle helpdesk tickets, server patches, and backups. A MIP adds AI workflow automation, custom ChatGPT agents, AI-powered CRM, and employee AI training — all managed as a service with one provider and one bill.",
  },
  {
    question: "Do I need to replace my current MSP to work with ITECS?",
    answer:
      "No. If you have an MSP you trust for infrastructure, we can layer AI services on top. However, ITECS also provides full MSP and cybersecurity services through itecsonline.com — so you can consolidate IT, security, and AI into one provider if you prefer.",
  },
  {
    question:
      "What size business benefits most from a managed intelligence provider?",
    answer:
      "Businesses with 10–300 employees see the biggest ROI. You have enough repetitive workflows to automate meaningfully, but not the budget for in-house AI engineers. A MIP gives you enterprise AI capabilities at SMB pricing.",
  },
  {
    question: "How much do managed AI services cost?",
    answer:
      "Most engagements start at $2,500–$5,000 for initial setup and deployment, with monthly management from $500. Pricing depends on the number of AI services, workflow complexity, and integrations required. The average client recovers setup costs within 60 days through time savings.",
  },
] as const;

export default function ManagedIntelligenceProviderPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: "Managed Intelligence Provider",
              href: "/managed-intelligence-provider",
            },
          ]}
        />
      </div>

      {/* 1. Hero — H1 + Zero-Click Answer Block */}
      <MIPHero />

      {/* 2. SMB Pain Point — your MSP keeps lights on, who makes you smarter? */}
      <PainPoint
        stat="87%"
        statLabel="of SMBs pay for IT support that never touches AI, automation, or data intelligence"
        heading="Your MSP Keeps the Servers Running. Who's Making Your Business Smarter?"
        paragraphs={[
          "Your managed service provider monitors your network, patches your servers, and resets passwords when employees lock themselves out. That's table stakes. Meanwhile, your competitors automate lead follow-ups in under 60 seconds, deploy AI agents that answer customer calls 24/7, and use internal knowledge bases that surface answers from 10,000 documents in 3 seconds.",
          "The gap between 'keeping IT running' and 'making IT work for you' is where businesses lose 20–30 hours per week. You're paying for managed services that manage infrastructure — not intelligence. That's the problem a Managed Intelligence Provider solves.",
        ]}
        scenario={{
          business: "A 60-person accounting firm in Richardson",
          problem:
            "paid $4,500/month for a traditional MSP that handled server monitoring, email migrations, and helpdesk tickets. Their team still manually processed 200+ client tax documents per week, copied data between Drake Software and QuickBooks by hand, and lost 3–5 hours daily to client phone calls their front desk couldn't handle during tax season. Their MSP had no AI capabilities and no plan to add them.",
          result:
            "ITECS deployed three AI services in parallel: a custom ChatGPT agent trained on their internal tax prep SOPs, workflow automation connecting Drake to QuickBooks for data sync, and an AI receptionist handling overflow calls. The firm saved 42 hours per week during peak season and reduced document processing time by 65%.",
        }}
      />

      {/* 3. MSP → MSSP → MIP Evolution Diagram */}
      <MIPEvolutionDiagram />

      {/* 4. AI Services under the MIP umbrella */}
      <ServiceJourneyDiagram />

      {/* 5. How It Works — semantic ol/li numbered workflow */}
      <HowItWorks
        steps={MIP_HOW_IT_WORKS}
        heading="How Managed Intelligence Works at ITECS"
      />

      {/* 6. Company stats */}
      <StatsBar />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="A managed intelligence provider handles your most sensitive business data — customer records, financial documents, internal SOPs. ITECS treats AI security with the same rigor we apply to network security, backed by 22 years of cybersecurity operations as a Dallas MSSP."
        points={[
          "Private AI environments — every AI agent and automation runs in tenant-isolated deployments with no cross-client data sharing",
          "Zero third-party training — your business data never trains OpenAI, Anthropic, or any public AI model",
          "AES-256 encryption at rest and in transit across all AI pipelines, API connections, and data stores",
          "HIPAA, SOC 2, and PCI-DSS compliance support for regulated industries including healthcare, legal, and financial services",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before deploying managed AI services",
          href: "/data-audit",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
        }}
      />

      {/* 8. Pricing — MIP vs. MSP + separate AI vendor */}
      <PricingROI
        heading="How Much Does a Managed Intelligence Provider Cost?"
        description="Most businesses hire a traditional MSP for IT, then pay a separate AI consultant or SaaS vendor for automation. Here's how a single MIP compares."
        traditionalLabel="MSP + Separate AI Vendor"
        aiLabel="ITECS MIP (One Provider)"
        comparison={[
          {
            label: "IT infrastructure",
            traditional: "Managed by MSP",
            ai: "Managed by ITECS",
          },
          {
            label: "Cybersecurity",
            traditional: "Add-on or separate MSSP",
            ai: "Built-in MSSP capabilities",
          },
          {
            label: "AI automation",
            traditional: "DIY or freelance integrator",
            ai: "8 managed AI services included",
          },
          {
            label: "AI agent deployment",
            traditional: "Not offered by most MSPs",
            ai: "Custom ChatGPT, voice agents, CRM AI",
          },
          {
            label: "Ongoing AI maintenance",
            traditional: "You maintain it (or it breaks)",
            ai: "24/7 monitoring + auto-recovery",
          },
          {
            label: "Vendor coordination",
            traditional: "3–4 vendors, 3–4 bills",
            ai: "One provider, one bill",
          },
        ]}
        roiStatement="Average MIP client ROI: 35% reduction in operational costs within 90 days. Most businesses eliminate 1–2 separate vendor contracts in the first month."
        pricingNotes={[
          "AI setup: $2,500–$10,000 depending on services deployed and integration complexity",
          "Monthly MIP management from $500/month — includes AI monitoring, optimization, and support",
          "Bundle with ITECS MSP/MSSP services for consolidated IT + security + AI management",
          "No per-agent or per-automation fees — scale AI across your organization without per-unit pricing",
        ]}
      />

      {/* 9. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={MIP_FAQ} heading="Managed Intelligence Provider FAQ" />

      {/* 10. Final CTA */}
      <CTASection />

      {/* JSON-LD Schema — FAQPage with verbatim parity */}
      <JsonLd data={generateFAQSchema(MIP_FAQ)} />
    </>
  );
}
