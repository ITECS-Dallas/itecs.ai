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
import { AIAgentsCircuit } from "@/components/effects/circuits/AIAgentsCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CustomAIAgentsWorkflowDiagram } from "@/components/sections/CustomAIAgentsWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "custom-ai-agents")!;

export const metadata = generatePageMetadata({
  title: "Custom AI Agents for Business in Dallas",
  description:
    "Build secure custom AI agents, Claude and Codex workflows, RAG systems, CLI automations, and human-in-the-loop agents connected to business systems.",
  path: service.href,
  keywords: service.keywords,
});

export default function CustomAIAgentsPage() {
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
      <ServiceHero service={service} circuit={<AIAgentsCircuit />} />

      <AIAdoptionUnderstanding />

      {/* 2. SMB Pain Point — validate the DIY agent trap */}
      <PainPoint
        stat="73%"
        statLabel="of AI experiments never become reliable, governed business workflows"
        heading="Your Team Has AI Ideas. The Hard Part Is Making Them Work Safely."
        paragraphs={[
          "Your employees are already asking ChatGPT, Claude, Gemini, Copilot, and coding assistants to draft answers, summarize documents, write scripts, and speed up daily work. The gap appears when those useful experiments need approved data, repeatable prompts, project folders, tool access, audit trails, and a human approval path before anything touches a customer or production system.",
          "ITECS builds that missing operating layer. We create custom AI agents and guided workflows that can retrieve the right context, call approved tools, connect to external systems, request human approval, and log what happened. Sometimes that means a Claude project folder or Codex workflow. Sometimes it means a full agentic RAG system with integrations, guardrails, and AI DevOps.",
        ]}
        scenario={{
          business: "A 55-person property management company in Dallas",
          problem:
            "had front desk staff manually answering 120+ tenant questions per day — lease terms, maintenance status, payment deadlines — by searching through 4 different systems. They had useful prompt experiments in ChatGPT and Claude, but no governed way to connect those workflows to Yardi, approved SOPs, or a staff review process.",
          result:
            "ITECS built a secure AI agent connected to their approved knowledge base and Yardi data through controlled APIs. The agent now resolves 87% of tenant inquiries, escalates sensitive cases with full context, and keeps staff in the loop when policy or account-specific decisions require approval.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="Custom AI Agent Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. Custom AI agent workflow diagram — multimedia visual */}
      <CustomAIAgentsWorkflowDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Build On and Connect To"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Custom AI agents can touch customer data, internal policies, source code, credentials, and proprietary business systems. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 24 years of enterprise security experience."
        points={[
          "Vendor-neutral architecture — we build with the right mix of ChatGPT, Claude, Gemini, Copilot, Codex, APIs, open-source models, and business platforms for your use case",
          "Human-in-the-loop controls — sensitive actions can require approval before an agent sends a message, updates a record, triggers a workflow, or touches production",
          "Data boundaries — agents retrieve from approved folders, systems, and knowledge bases with scoped access, confidence thresholds, and audit logging",
          "Encrypted end-to-end — prompts, retrieval data, tool calls, logs, and credentials are protected with access controls and secure retention policies",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before connecting agents to business systems",
          href: "/data-audit",
        }}
        externalLink={{
          text: "OWASP Top 10 for Large Language Model Applications",
          href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does a Custom AI Agent Cost?"
        description="Most businesses start with useful one-off prompts, then need a governed system that can access data, call tools, and involve people at the right moments. Here is how ITECS compares for a company turning AI experiments into production workflows."
        traditionalLabel="DIY Prompt or No-Code Agent"
        aiLabel="ITECS Custom AI Agent"
        comparison={[
          {
            label: "Workflow design",
            traditional: "Prompt saved in one person's account",
            ai: "Documented process, roles, approvals, and success criteria",
          },
          {
            label: "Tool access",
            traditional: "Manual copy and paste",
            ai: "Scoped API, CLI, folder, and app integrations",
          },
          {
            label: "RAG and context",
            traditional: "Generic model memory",
            ai: "Approved knowledge, citations, and retrieval controls",
          },
          {
            label: "Human escalation",
            traditional: "Generic fallback message",
            ai: "Approval queues and full context for staff",
          },
          {
            label: "Agent actions",
            traditional: "Drafts text only",
            ai: "Can perform approved tasks and update systems",
          },
          {
            label: "Ongoing operation",
            traditional: "Degrades without updates",
            ai: "Monitored, tested, versioned, and tuned",
          },
        ]}
        roiStatement="The right custom agent should remove handoffs, reduce errors, and give staff leverage without removing human judgment from sensitive business decisions."
        pricingNotes={[
          "Agent builds are quoted as scoped projects after workflow, data, security, and integration requirements are clear",
          "Prepaid retainer hours can cover discovery, project-folder setup, prompt systems, testing, staff training, and tuning",
          "Claude projects, Codex workflows, CLI automations, RAG agents, and external-system integrations are all in scope",
          "HIPAA/SOC 2 compliant infrastructure is available when the agent handles regulated data",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="Custom AI Agents FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
