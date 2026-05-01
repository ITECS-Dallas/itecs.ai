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
import { TrainingCircuit } from "@/components/effects/circuits/TrainingCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrainingWorkflowDiagram } from "@/components/sections/TrainingWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "training")!;

export const metadata = generatePageMetadata({
  title: "AI Training for Employees in Dallas",
  description:
    "Hands-on AI training for your Dallas team — ChatGPT, Claude, Gemini, Microsoft Copilot, and automation tools. Build safe usage habits with ITECS.",
  path: service.href,
  keywords: service.keywords,
});

export default function TrainingPage() {
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
      <ServiceHero service={service} circuit={<TrainingCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. SMB Pain Point — validate the unsupervised AI chaos */}
      <PainPoint
        stat="72%"
        statLabel="of employees already use AI at work — most without any guidance or guardrails"
        heading="Your Team Uses AI Every Day. Nobody Taught Them How."
        paragraphs={[
          "Your sales reps paste customer data into ChatGPT. Your office manager asks Copilot to summarize financials without checking the output. Your support team copies internal knowledge base articles into free AI tools with no data policy in place. AI adoption happened whether you planned for it or not — the question is whether it is helping or creating liability.",
          "Every week without formal training, your employees build bad AI habits that compound. They share sensitive data with public models, trust hallucinated outputs, and miss the use cases that would actually save them hours. Meanwhile, your competitors train their teams and pull ahead.",
        ]}
        scenario={{
          business: "A 55-person insurance agency in Irving",
          problem:
            "discovered that 18 employees had been pasting policyholder PII into free-tier ChatGPT for six months to draft correspondence. No AI usage policy existed. The compliance team flagged it during an internal audit — one month before their E&O carrier renewal. Leadership had no visibility into which tools staff used or what data left the building.",
          result:
            "ITECS delivered a two-day AI training program covering ChatGPT, Claude, Gemini, Microsoft Copilot, and data safety protocols. We established an AI usage policy, moved sensitive workflows into approved enterprise AI workspaces, and trained all 55 employees on safe prompting. The agency passed their E&O review and now saves 22 hours per week on correspondence drafting.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="AI Training Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Training Workflow Diagram — multimedia visual */}
      <TrainingWorkflowDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Tools We Train Your Team On"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your employee data, training materials, and internal workflows stay protected throughout the engagement. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 24 years of enterprise security experience."
        points={[
          "Private AI environments — we configure ChatGPT, Claude, Gemini, Microsoft Copilot, and Azure OpenAI options so employee prompts never train public models",
          "AI usage policies — every training program includes a written policy defining what data employees can and cannot share with AI tools, tailored to your industry",
          "Role-based access controls — we segment AI tool permissions by department so finance teams, HR, and customer support each access only the data they need",
          "Compliance-aligned training — programs account for HIPAA, SOC 2, PCI-DSS, and industry-specific requirements from day one, with documented proof of completion",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before training your team",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Microsoft Copilot for Microsoft 365 Data Privacy",
          href: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does AI Employee Training Cost?"
        description="Most businesses try self-guided YouTube tutorials, then wonder why adoption stalls. Here is how ITECS training compares for a team of 10–50 employees."
        traditionalLabel="Self-Guided / YouTube"
        aiLabel="ITECS Training"
        comparison={[
          {
            label: "Time to team proficiency",
            traditional: "3–6 months of trial and error",
            ai: "1–2 weeks with structured workshops",
          },
          {
            label: "Data safety coverage",
            traditional: "None — employees guess",
            ai: "Written AI policy + safe prompting drills",
          },
          {
            label: "Content relevance",
            traditional: "Generic demos, outdated tutorials",
            ai: "Role-specific scenarios using your data",
          },
          {
            label: "Retention rate",
            traditional: "Low — no reinforcement",
            ai: "Retainer-supported office hours + refreshers",
          },
          {
            label: "Tool coverage",
            traditional: "One tool at a time, surface-level",
            ai: "ChatGPT, Claude, Gemini, Copilot, and automation tools",
          },
          {
            label: "Compliance documentation",
            traditional: "None",
            ai: "Training certificates + AI usage policy",
          },
        ]}
        roiStatement="Average client ROI: 4 hours saved per employee per week within 30 days. A 20-person team recovers the full training cost in the first month through productivity gains alone."
        pricingNotes={[
          "Half-day workshop (up to 20 employees): $2,000 — covers one core tool (ChatGPT or Copilot) plus safe AI usage fundamentals",
          "Full-day deep dive: $4,000–$6,000 — multi-tool training with role-specific breakout sessions and hands-on exercises",
          "Multi-session program: $6,000–$10,000 — comprehensive curriculum across all AI tools your team uses, spread over 2–4 weeks",
          "Prepaid retainer hours can cover office hours, new-tool onboarding, refresher workshops, and safe-use policy updates with no monthly minimum or expiration",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="AI Training FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
