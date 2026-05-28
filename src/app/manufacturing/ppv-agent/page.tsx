import { ArrowRight, Check, Database, FileText } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema, generateNationalServiceSchema } from "@/lib/seo";
import { PPV_AGENT_USE_CASE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ManufacturingHero } from "@/components/sections/ManufacturingHero";
import { PPVAgentWorkflowDiagram } from "@/components/sections/PPVAgentWorkflowDiagram";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const page = PPV_AGENT_USE_CASE;

export const metadata = generatePageMetadata({
  title: "PPV Agent for Manufacturing Finance",
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function PPVAgentPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Manufacturing", href: "/manufacturing" },
            { label: page.shortTitle, href: page.href },
          ]}
        />
      </div>

      <ManufacturingHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        heroSummary={page.heroSummary}
        longDescription={page.longDescription}
        primaryCta={page.primaryCta}
        primaryCtaHref={page.primaryCtaHref}
        secondaryCta={page.secondaryCta}
        secondaryCtaHref={page.secondaryCtaHref}
        stats={page.stats}
      />

      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="CFO pain"
            title="Month-End PPV Arrives Too Late to Protect Margin"
            description="The problem is not that finance lacks reports. The problem is that variance explanation, contract recovery, and forward exposure often arrive after the buying, pricing, and production decisions have already moved."
          />
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6 md:p-8">
            <p className="text-lg font-medium leading-relaxed text-text-primary">
              {page.title}
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              A PPV agent gives finance and procurement a daily operating view:
              what changed, why it changed, where the exposure sits, and what
              needs approval next. It is designed for traceability, not
              autonomous financial action.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="What the PPV Agent Does"
            description="The agent connects historical explanation with forward-looking exposure, then packages actions for review."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {page.capabilities.map((capability) => (
              <div
                key={capability.title}
                className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6"
              >
                <h3 className="text-xl font-light text-text-primary">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {capability.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {capability.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Scenario"
            title={page.scenario.title}
            description="This scenario is anonymized and is not presented as a named public case study."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
              <FileText className="mb-5 h-6 w-6 text-brand-accent" />
              <h3 className="text-xl font-light text-text-primary">
                Starting point
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {page.scenario.problem}
              </p>
            </div>
            <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <Database className="mb-5 h-6 w-6 text-brand-accent" />
              <h3 className="text-xl font-light text-text-primary">
                Scoped outcome
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {page.scenario.outcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Data inputs"
            title="What the Agent Needs to Read"
            description="Discovery confirms which systems are authoritative. The page describes likely inputs, not a promise that every client has clean integration-ready data on day one."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {page.dataInputs.map((input) => (
              <div
                key={input.label}
                className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-5"
              >
                <h3 className="text-lg font-medium text-text-primary">
                  {input.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {input.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PPVAgentWorkflowDiagram steps={page.workflow} />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Controls"
            title="The Agent Is Read-Heavy and Write-Controlled"
            description="The PPV agent can analyze, draft, flag, model, and recommend. It does not autonomously execute financial or procurement actions."
          />
          <div className="mt-10 rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6 md:p-8">
            <ul className="space-y-4">
              {page.governance.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HowItWorks
        steps={page.roadmap}
        heading="How a PPV Agent Engagement Starts"
      />

      <PricingROI
        heading="The Business Case Is Margin Protection, Not AI Novelty"
        description="Public pricing is intentionally not published for this use case because scope depends on ERP access, data quality, reporting maturity, contract complexity, and governance requirements. The discovery workshop defines the economics before a build is proposed."
        traditionalLabel="Traditional PPV Reporting"
        aiLabel="ITECS PPV Agent"
        comparison={page.comparison}
        roiStatement="The agent does not need to predict markets perfectly. It needs to make variance visible earlier, recover contract-protected margin faster, and give finance better evidence for action."
        pricingNotes={[
          "Discovery validates the PPV method, data availability, and approval model before a pilot is quoted",
          "Historical PPV reproduction is the first proof point because it can be reconciled against finance's own close package",
          "Forward exposure and recommendations are added only after the retrospective math is trusted",
        ]}
      />

      <SecurityGuarantee
        description="PPV workflows can touch ERP transactions, vendor terms, customer contracts, cost standards, and close commentary. ITECS keeps those signals controlled with scoped access, human approval, and audit-ready recommendation history."
        points={[
          "Read-only discovery patterns where possible before any production integration is approved",
          "No autonomous POs, hedges, journal entries, standard-cost updates, or vendor master changes",
          "Versioned assumptions and source references for finance, procurement, and audit review",
          "Credential isolation and encrypted secrets for ERP, BI, document, and market-data access",
        ]}
        internalLink={{
          text: "Return to the manufacturing AI hub",
          href: "/manufacturing",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/itl/ai-risk-management-framework",
        }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
            Ready to test PPV on your own data?
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Start with a focused workshop that reviews your PPV method,
            BatchMaster/SAP and Power BI environment, data availability, and
            approval requirements.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={page.primaryCtaHref}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {page.primaryCta}
            </Button>
          </div>
        </div>
      </section>

      <FAQ items={page.faq} heading="PPV Agent FAQ" />

      <CTASection />

      <JsonLd data={generateFAQSchema(page.faq)} />
      <JsonLd data={generateNationalServiceSchema(page)} />
    </>
  );
}
