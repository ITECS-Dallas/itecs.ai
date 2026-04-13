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
import { ChatGPTWorkflowDiagram } from "@/components/sections/ChatGPTWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "custom-chatgpt")!;

export const metadata = generatePageMetadata({
  title: "Custom ChatGPT for Business | Private AI Chatbot Development",
  description:
    "Build a private ChatGPT trained on your business data. Deploy on website, Slack, or Teams in 2–4 weeks. 85% query resolution, 40% fewer support tickets.",
  path: service.href,
  keywords: service.keywords,
});

export default function CustomChatGPTPage() {
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

      {/* 2. SMB Pain Point — validate the DIY ChatGPT trap */}
      <PainPoint
        stat="73%"
        statLabel="of businesses experiment with ChatGPT but never deploy it for customers"
        heading="Your Team Uses ChatGPT Daily — But Customers Never See It"
        paragraphs={[
          "Your employees paste customer questions into ChatGPT, manually copy answers back, and hope nothing confidential leaks. The marketing team built a chatbot with a no-code tool that hallucinated your pricing and went live for 3 hours. IT blocked public ChatGPT after someone uploaded a client contract. Now everyone uses personal accounts on their phones instead.",
          "The problem is not ChatGPT itself. The problem is deploying it without data boundaries, without connecting it to your actual business data, and without guardrails that prevent hallucinations. Every week without a proper implementation, your team wastes hours on manual lookups that a trained chatbot answers in seconds.",
        ]}
        scenario={{
          business: "A 55-person property management company in Dallas",
          problem:
            "had front desk staff manually answering 120+ tenant questions per day — lease terms, maintenance status, payment deadlines — by searching through 4 different systems. They tried a generic chatbot builder that pulled from their website FAQ. Within the first week, it gave a tenant the wrong move-out date and misquoted a pet deposit fee, triggering a complaint escalation.",
          result:
            "ITECS built a private ChatGPT connected to their Yardi property management system via API. The chatbot now resolves 87% of tenant inquiries without human intervention, and escalates the rest with full conversation context. Front desk staff reclaimed 4 hours per day.",
        }}
      />

      {/* 3. Solution & Tool Integrations */}
      <ServiceFeatures
        features={service.features}
        title="Custom ChatGPT Capabilities"
      />

      {/* 4. How It Works — strict numbered workflow */}
      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      {/* 5. ChatGPT Workflow Diagram — multimedia visual */}
      <ChatGPTWorkflowDiagram />

      {/* 6. Tool integrations */}
      <Integrations
        tools={service.integrations}
        heading="Platforms We Build On and Connect To"
      />

      {/* 7. Enterprise-Grade Security */}
      <SecurityGuarantee
        description="Your chatbot handles customer data, internal policies, and proprietary business information. ITECS AI is backed by ITECS — a Dallas-based cybersecurity MSP operating since 2002 with 22 years of enterprise security experience."
        points={[
          "Private AI instances — we deploy on Azure OpenAI or on-premise models so your data never touches public ChatGPT servers or trains third-party models",
          "Data boundaries — the chatbot only answers from your approved knowledge base. Strict confidence scoring prevents hallucinations and off-topic responses",
          "Encrypted end-to-end — all data in transit and at rest uses AES-256 encryption. Conversation logs are retained only as long as you need them",
          "HIPAA and SOC 2 options — for healthcare, legal, and financial services, we deploy compliant infrastructure that meets your regulatory requirements",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before deploying a customer-facing chatbot",
          href: "/data-audit",
        }}
        externalLink={{
          text: "OpenAI Enterprise Privacy & Data Handling",
          href: "https://openai.com/enterprise-privacy/",
        }}
      />

      {/* 8. Pricing Transparency & ROI */}
      <PricingROI
        heading="How Much Does a Custom ChatGPT Cost?"
        description="Most businesses try free chatbot builders first, then realize they need a real solution. Here is how ITECS compares for a company handling 50–500 customer inquiries per day."
        traditionalLabel="DIY / No-Code Builder"
        aiLabel="ITECS Custom ChatGPT"
        comparison={[
          {
            label: "Data sources connected",
            traditional: "Website FAQ only",
            ai: "CRM, helpdesk, knowledge base, APIs",
          },
          {
            label: "Hallucination control",
            traditional: "None — answers anything",
            ai: "Confidence scoring + data boundaries",
          },
          {
            label: "Deployment channels",
            traditional: "Website widget",
            ai: "Website, Slack, Teams, SMS",
          },
          {
            label: "Human escalation",
            traditional: "Generic fallback message",
            ai: "Full conversation context to agent",
          },
          {
            label: "Setup time",
            traditional: "1 day (then months fixing it)",
            ai: "2–4 weeks to production",
          },
          {
            label: "Ongoing accuracy",
            traditional: "Degrades without updates",
            ai: "Monitored + tuned monthly",
          },
        ]}
        roiStatement="Average client ROI: 40% reduction in support tickets within 60 days. Most businesses recover setup costs in the first quarter through reduced support labor alone."
        pricingNotes={[
          "Initial build: $5,000–$15,000 depending on data sources, channels, and compliance requirements",
          "Monthly hosting and management from $300/month — includes monitoring, tuning, and conversation analytics",
          "Multi-channel deployment (Slack + Teams + website + SMS) included at no additional per-channel fee",
          "HIPAA/SOC 2 compliant infrastructure available — quoted based on regulatory scope",
        ]}
      />

      {/* 9. Stats */}
      <ServiceStats stats={service.stats} />

      {/* 10. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={service.faq} heading="Custom ChatGPT FAQ" />

      {/* 11. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
