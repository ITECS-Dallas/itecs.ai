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
import { AIDevOpsCircuit } from "@/components/effects/circuits/AIDevOpsCircuit";
import { AIAdoptionUnderstanding } from "@/components/sections/AIAdoptionUnderstanding";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AIDevOpsWorkflowDiagram } from "@/components/sections/AIDevOpsWorkflowDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = SERVICES.find((s) => s.slug === "ai-devops")!;

export const metadata = generatePageMetadata({
  title: "AI DevOps & MLOps Services in Dallas",
  description:
    "Move AI prototypes into production with CI/CD, prompt versioning, RAG monitoring, rollback, cost controls, and managed AI operations from ITECS.",
  path: service.href,
  keywords: service.keywords,
});

export default function AIDevOpsPage() {
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

      <ServiceHero service={service} circuit={<AIDevOpsCircuit />} />

      <AIAdoptionUnderstanding />

      <PainPoint
        stat="24/7"
        statLabel="AI systems need monitoring after launch, not just a one-time build"
        heading="AI Demos Fail When Nobody Owns Production"
        paragraphs={[
          "The prototype worked in a meeting. Then the API key rotated, the vector index went stale, a prompt change broke customer answers, and no one knew which version was live. This is where AI projects usually turn into internal shelfware.",
          "Production AI needs the same operating discipline as infrastructure: separate environments, release gates, observability, cost controls, security review, incident response, and a team responsible for the system after launch.",
        ]}
        scenario={{
          business: "A 70-person professional services firm in Dallas",
          problem:
            "had a useful internal RAG assistant built by a freelancer, but every document refresh was manual, prompts were edited directly in production, and leadership had no visibility into answer quality or OpenAI spend. The system became too risky to expand beyond one department.",
          result:
            "ITECS moved the assistant into a managed AI DevOps pipeline with GitHub Actions, staging validation, secret rotation, retrieval monitoring, budget alerts, and documented rollback. The firm expanded the assistant to finance, HR, and operations without increasing support burden.",
        }}
      />

      <ServiceFeatures
        features={service.features}
        title="AI DevOps Capabilities"
      />

      <HowItWorks
        steps={service.howItWorks}
        heading={service.howItWorksHeading}
      />

      <AIDevOpsWorkflowDiagram />

      <Integrations
        tools={service.integrations}
        heading="AI Platforms and DevOps Tools We Operate"
      />

      <SecurityGuarantee
        description="AI DevOps touches code, data, secrets, models, prompts, and production workflows. ITECS manages that operating layer with the same cybersecurity discipline we apply to business infrastructure."
        points={[
          "Secrets management — API keys, tokens, and database credentials move into encrypted vaults with scoped access and rotation controls",
          "Environment separation — development, staging, and production changes are isolated so experiments do not break live AI systems",
          "Audit-ready releases — prompt, model, retrieval, and code changes are versioned with deploy history and approval records",
          "Monitoring and rollback — latency, errors, retrieval quality, spend, and security signals trigger response paths before users lose trust",
        ]}
        internalLink={{
          text: "Run an AI data readiness audit before expanding production AI",
          href: "/data-audit",
        }}
        externalLink={{
          text: "OWASP Top 10 for Large Language Model Applications",
          href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
        }}
      />

      <PricingROI
        heading="How Much Does AI DevOps Cost?"
        description="The cost depends on how many AI systems, environments, integrations, and data sources need to be stabilized. Advisory, monitoring review, and release support can use retainer time; build and integration work is quoted once the scope is clear."
        traditionalLabel="Unmanaged AI Prototype"
        aiLabel="ITECS Managed AI DevOps"
        comparison={[
          {
            label: "Release process",
            traditional: "Manual edits, unclear live version",
            ai: "Versioned CI/CD with approvals",
          },
          {
            label: "Security",
            traditional: "Keys in env files or vendor accounts",
            ai: "Vaulted secrets and scoped access",
          },
          {
            label: "Quality control",
            traditional: "Users report bad answers",
            ai: "Retrieval and regression checks",
          },
          {
            label: "Monitoring",
            traditional: "No unified view",
            ai: "Latency, cost, errors, and drift watched",
          },
          {
            label: "Recovery",
            traditional: "Rebuild from memory",
            ai: "Documented rollback paths",
          },
          {
            label: "Ownership",
            traditional: "Split across vendor, IT, and ops",
            ai: "One accountable AI operations team",
          },
        ]}
        roiStatement="The fastest way to improve AI ROI is to stop rebuilding fragile demos. Managed AI DevOps keeps useful systems stable, measurable, and ready to expand."
        pricingNotes={[
          "Production stabilization is quoted as a scoped project after reviewing the codebase, data, integrations, and environments",
          "Prepaid retainer hours can cover monitoring reviews, maintenance, release support, testing, cost reviews, and advisory work",
          "Retainer hours have no minimum monthly usage and no expiration date",
          "Can be bundled with Custom AI Agents, AI Knowledge Base, and workflow automation deployments when a build is needed",
          "Works with existing internal developers, MSPs, or prior vendors without requiring a full rebuild",
        ]}
      />

      <ServiceStats stats={service.stats} />

      <FAQ items={service.faq} heading="AI DevOps FAQ" />

      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
