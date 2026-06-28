import Link from "next/link";
import { ArrowRight, Check, Database, FileText } from "lucide-react";
import { generateFAQSchema, generateNationalServiceSchema } from "@/lib/seo";
import {
  FINANCIAL_SERVICES_SPOKE_PAGES,
  FINANCIAL_SERVICES_VERTICAL,
  type VerticalSpokePageContent,
} from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ManufacturingHero } from "@/components/sections/ManufacturingHero";
import { ManufacturingSpokeMetricsChart } from "@/components/sections/ManufacturingSpokeMetricsChart";
import { PPVAgentWorkflowDiagram } from "@/components/sections/PPVAgentWorkflowDiagram";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

function getRelatedPages(page: VerticalSpokePageContent) {
  return page.relatedHrefs
    .map((href) =>
      FINANCIAL_SERVICES_SPOKE_PAGES.find((candidate) => candidate.href === href)
    )
    .filter((candidate): candidate is VerticalSpokePageContent =>
      Boolean(candidate)
    );
}

export function FinancialServicesSpokePage({
  page,
}: {
  page: VerticalSpokePageContent;
}) {
  const relatedPages = getRelatedPages(page);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            {
              label: "Financial Services",
              href: FINANCIAL_SERVICES_VERTICAL.href,
            },
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
        iconName="Landmark"
        signalLabel="Financial services signal map"
        signalSublabel="Credit + advisory + IT"
      />

      <section className="bg-bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow={page.pain.eyebrow}
            title={page.pain.title}
            description={page.pain.description}
          />
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6 md:p-8">
            <p className="text-lg font-medium leading-relaxed text-text-primary">
              {page.pain.proof}
            </p>
          </div>
        </div>
      </section>

      <ManufacturingSpokeMetricsChart chart={page.chart} />

      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title={`What ${page.shortTitle} Intelligence Does`}
            description="Each capability is designed to produce evidence for the people who already own the credit, advisory, or finance decision."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {page.capabilities.map((capability) => (
              <div
                key={capability.title}
                className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6"
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

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Scenario"
            title={page.scenario.title}
            description={page.scenario.description}
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6">
              <FileText className="mb-5 h-6 w-6 text-brand-accent" />
              <h3 className="text-xl font-light text-text-primary">
                Starting point
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {page.scenario.startingPoint}
              </p>
            </div>
            <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <Database className="mb-5 h-6 w-6 text-brand-accent" />
              <h3 className="text-xl font-light text-text-primary">
                Scoped outcome
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {page.scenario.scopedOutcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Data inputs"
            title="What the System Needs to Read"
            description="Discovery confirms authoritative systems, data quality, access, and governance before any production workflow is proposed."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {page.dataInputs.map((input) => (
              <div
                key={input.label}
                className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-5"
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

      <PPVAgentWorkflowDiagram
        steps={page.workflow}
        title="Read-Heavy, Write-Controlled Financial-Services Intelligence"
        description="The system connects approved data, explains risk, prepares recommendations, and routes sensitive actions for human approval."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Controls"
            title="Read Broadly, Recommend Carefully, Keep Humans in Control"
            description="Financial-services AI becomes trustworthy when it preserves assumptions, source data, approvals, and confidentiality boundaries."
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

      <HowItWorks steps={page.roadmap} heading="How the Engagement Starts" />

      <PricingROI
        heading="The Business Case Is Senior Capacity, Not AI Novelty"
        description="Public pricing is intentionally not published for this use case because scope depends on data availability, systems, process maturity, confidentiality requirements, and the first proof point selected during discovery."
        traditionalLabel="Traditional Workflow"
        aiLabel="ITECS Financial Services AI"
        comparison={page.comparison}
        roiStatement={page.roiStatement}
        pricingNotes={page.pricingNotes}
      />

      <SecurityGuarantee
        title="Security for Financial Services AI Workflows"
        description={page.security.description}
        points={page.security.points}
        internalLink={{
          text: "Return to the financial services AI hub",
          href: FINANCIAL_SERVICES_VERTICAL.href,
        }}
        externalLink={
          page.security.externalLink ?? {
            text: "NIST AI Risk Management Framework",
            href: "https://www.nist.gov/itl/ai-risk-management-framework",
          }
        }
      />

      {relatedPages.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <SectionHeading
              eyebrow="Related financial services use cases"
              title="Adjacent Signals Worth Connecting"
              description="The strongest financial-services AI programs connect one use case to the next instead of trapping insight in a single report."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPages.map((related) => (
                <Link
                  key={related.href}
                  href={related.href}
                  className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-5 transition-colors hover:border-[var(--border-active)]"
                >
                  <h3 className="text-lg font-light text-text-primary">
                    {related.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {related.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent">
                    Explore use case <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-bg-surface">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
            Ready to test this use case against your own data?
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Start with a focused workshop that reviews systems, data readiness,
            confidentiality requirements, and the first measurable proof point.
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

      <FAQ items={page.faq} heading={`${page.shortTitle} FAQ`} />

      <CTASection />

      <JsonLd data={generateFAQSchema(page.faq)} />
      <JsonLd data={generateNationalServiceSchema(page)} />
    </>
  );
}
