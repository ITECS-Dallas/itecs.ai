import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MIPHero } from "./MIPHero";
import { MIPEvolutionDiagram } from "@/components/sections/MIPEvolutionDiagram";
import { MIPDefinitionCapabilities } from "@/components/sections/MIPDefinitionCapabilities";
import { MIPComparison } from "@/components/sections/MIPComparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { StatsBar } from "@/components/sections/StatsBar";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "Managed Intelligence Provider — Enterprise AI Operations",
  description:
    "ITECS is Dallas's Managed Intelligence Provider (MIP), operating AI agents, automations, governance, and reporting for organizations with 10–300 employees.",
  path: "/managed-intelligence-provider",
  keywords: [
    "managed intelligence provider",
    "managed AI services Dallas",
    "AI managed service provider Dallas",
    "managed intelligence provider Dallas",
    "MIP Dallas",
    "AI MSP Dallas",
    "enterprise AI operations",
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
      "We build and deploy AI agents, automations, and integrations on the platforms your team already uses. No rip-and-replace. Custom AI agents connect to your internal data, workflow automations link your CRM to your invoicing, and AI voice agents answer your phones 24/7.",
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
      "An MSP keeps your systems running. A MIP makes your business smarter. MSPs handle helpdesk tickets, server patches, and backups. A MIP adds AI workflow automation, custom AI agents, AI-powered CRM, and employee AI training — all managed as a service with one provider and one bill.",
  },
  {
    question: "Do I need to replace my current MSP to work with ITECS?",
    answer: (
      <>
        No. If you have an MSP you trust for infrastructure, we can layer AI
        services on top. However, ITECS also provides full{" "}
        <a
          href="https://itecsonline.com/it-services/managed-it-services-in-dallas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
        >
          managed IT services
        </a>{" "}
        and{" "}
        <a
          href="https://itecsonline.com/cybersecurity"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
        >
          cybersecurity
        </a>{" "}
        through itecsonline.com — so you can consolidate IT, security, and AI
        into one provider if you prefer.
      </>
    ),
    schemaAnswer:
      "No. If you have an MSP you trust for infrastructure, we can layer AI services on top. However, ITECS also provides full managed IT services and cybersecurity through itecsonline.com — so you can consolidate IT, security, and AI into one provider if you prefer.",
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
      "ITECS separates advisory work from scoped implementation. Consulting, optimization, training, and planning can run hourly or through a prepaid retainer block with no minimum monthly usage and no expiration date. Custom AI agents, automations, and secure platform integrations are quoted as flat projects after scope, data access, and security requirements are clear.",
  },
  {
    question:
      "Does a Managed Intelligence Provider include AI search visibility (GEO)?",
    answer: (
      <>
        Yes. AI-Optimized SEO (Generative Engine Optimization) is one of the
        marketing-layer services a MIP brings under one roof. ITECS runs it as
        a tiered engagement —{" "}
        <Link
          href="/ai-optimized-seo/foundation"
          className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
        >
          Foundation
        </Link>{" "}
        for the one-time technical setup, then{" "}
        <Link
          href="/ai-optimized-seo/momentum"
          className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
        >
          Momentum
        </Link>{" "}
        or{" "}
        <Link
          href="/ai-optimized-seo/velocity"
          className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
        >
          Velocity
        </Link>{" "}
        for ongoing content velocity and AI visibility tracking across
        ChatGPT, Claude, and Google AI Overviews.
      </>
    ),
    schemaAnswer:
      "Yes. AI-Optimized SEO (Generative Engine Optimization) is one of the marketing-layer services a MIP brings under one roof. ITECS runs it as a tiered engagement — Foundation for the one-time technical setup, then Momentum or Velocity for ongoing content velocity and AI visibility tracking across ChatGPT, Claude, and Google AI Overviews.",
  },
];

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

      {/* 1. Hero — MIP positioning and approved proof bar */}
      <MIPHero />

      {/* 2. MSP → MSSP → MIP evolution */}
      <MIPEvolutionDiagram />

      {/* 3. What Managed Intelligence means */}
      <MIPDefinitionCapabilities />

      {/* 4. MSP vs. MIP comparison */}
      <MIPComparison />

      {/* 5. How It Works — semantic ol/li numbered workflow */}
      <HowItWorks
        steps={MIP_HOW_IT_WORKS}
        heading="How Managed Intelligence Works at ITECS"
      />

      {/* 6. Company stats */}
      <StatsBar />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="A managed intelligence provider handles your most sensitive business data — customer records, financial documents, internal SOPs. ITECS treats AI security with the same rigor we apply to network security, backed by 24 years of cybersecurity operations as a Dallas MSSP."
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

      {/* 8. FAQ */}
      <FAQ items={MIP_FAQ} heading="Managed Intelligence Provider FAQ" />

      {/* 9. Final CTA */}
      <CTASection />

      {/* JSON-LD Schema — FAQPage with verbatim parity */}
      <JsonLd data={generateFAQSchema(MIP_FAQ)} />
    </>
  );
}
