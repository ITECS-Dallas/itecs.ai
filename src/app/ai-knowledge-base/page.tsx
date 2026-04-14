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
import { KnowledgeBaseCircuit } from "@/components/effects/circuits/KnowledgeBaseCircuit";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { KnowledgeBaseRAGDiagram } from "@/components/sections/KnowledgeBaseRAGDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "ai-knowledge-base")!;

export const metadata = generatePageMetadata({
  title: "Internal AI Knowledge Bases & SOP Automation for Dallas Businesses",
  description:
    "Turn scattered company files into a private AI search engine. Employees get cited answers in 5 seconds. 50% faster onboarding. Setup in 4–6 weeks.",
  path: service.href,
  keywords: service.keywords,
});

export default function AIKnowledgeBasePage() {
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
      <ServiceHero service={service} circuit={<KnowledgeBaseCircuit />} />

      {/* 2. SMB Pain Point — validate the scattered knowledge problem */}
      <PainPoint
        stat="19.8%"
        statLabel="of the average work week spent searching for internal information"
        heading="Your Company Knowledge Is Trapped in a Thousand Different Places"
        paragraphs={[
          "Your team's institutional knowledge lives in SharePoint folders nobody can navigate, Google Drives with 6 levels of nesting, Notion pages that went stale 8 months ago, and the heads of 3 people who have been here since 2015. New hires spend their first month interrupting everyone with questions that are documented somewhere — if only they could find it.",
          "Every unanswered question costs time twice: once for the employee searching, once for the colleague who stops real work to answer. When those senior employees leave, the knowledge walks out the door. The longer you wait, the wider the gap between what your company knows and what your team can access.",
        ]}
        scenario={{
          business: "A 120-person professional services firm in Dallas",
          problem:
            "spent an average of 45 minutes per new hire per day during their first month helping them locate SOPs, client procedures, and internal policies across SharePoint, Google Drive, and a legacy wiki. Senior staff fielded 40+ knowledge questions per day — most of which were already documented but buried 4 folders deep. The managing partner estimated 6 hours per week of billable time lost to internal information retrieval.",
          result:
            "ITECS built a private AI knowledge base connecting their SharePoint, Google Drive, and Confluence. New hires reached full productivity in 1 week instead of 4. The system handles 600+ employee queries per week with cited answers. The firm recovered 25+ hours of billable time per week across the team.",
        }}
      />

      {/* 3. Solution Capabilities */}
      <ServiceFeatures
        features={service.features}
        title="AI Knowledge Base Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. RAG Pipeline Diagram — multimedia visual */}
      <KnowledgeBaseRAGDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Connect to Your Knowledge Base"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your knowledge base contains SOPs, client data, HR policies, and proprietary processes. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 22 years of enterprise security experience."
        points={[
          "Private deployment — your knowledge base runs on your infrastructure or private cloud, never on public servers. Your data never trains third-party models.",
          "Role-based access control mirrors your existing permissions. Employees only see knowledge their department and clearance level authorizes.",
          "AES-256 encryption at rest and in transit. All queries and answers logged for compliance audits with configurable retention policies.",
          "Compliance-ready for HIPAA, SOC 2, FINRA, and CMMC. We build deployment architectures that satisfy your regulatory requirements from day one.",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before deploying an internal knowledge base",
          href: "/data-audit",
        }}
        externalLink={{
          text: "OpenAI Enterprise Privacy & Data Handling",
          href: "https://openai.com/enterprise-privacy/",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does an Internal AI Knowledge Base Cost?"
        description="Most businesses either build internally and spend 4–6 months, or buy a SaaS tool that can't connect all their sources. Here is how ITECS compares for a 50–500 person company."
        traditionalLabel="DIY / Internal Build"
        aiLabel="ITECS Managed Knowledge Base"
        comparison={[
          {
            label: "Time to production",
            traditional: "4–6 months",
            ai: "4–6 weeks",
          },
          {
            label: "Connected data sources",
            traditional: "1–2 platforms",
            ai: "SharePoint, Drive, Notion, Confluence, file servers",
          },
          {
            label: "Hallucination control",
            traditional: "None — answers anything",
            ai: "Confidence scoring + data boundaries",
          },
          {
            label: "Access control",
            traditional: "Manual per-user setup",
            ai: "SSO + role-based auto-provisioning",
          },
          {
            label: "Document updates",
            traditional: "Manual re-indexing",
            ai: "Auto-sync within minutes",
          },
          {
            label: "Setup cost",
            traditional: "$15,000–$50,000+",
            ai: "$8,000–$20,000 flat fee",
          },
        ]}
        roiStatement="Average client ROI: 50% faster onboarding, 70% fewer repeated questions, 25+ hours recovered per week. Most businesses recoup the full setup cost within 3 months."
        pricingNotes={[
          "Setup: $8,000–$20,000 depending on data sources, document volume, and compliance scope",
          "Monthly hosting and management from $500/month — includes auto-indexing, performance monitoring, and quarterly accuracy reviews",
          "Multi-source connectivity included — no per-platform fees for SharePoint + Google Drive + Notion + Confluence",
          "HIPAA/SOC 2/FINRA/CMMC compliance options available — quoted based on your regulatory requirements",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="Internal AI Knowledge Base FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
