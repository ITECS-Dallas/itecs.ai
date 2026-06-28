import { ArrowRight, Check, Database, FileText } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema, generateNationalServiceSchema } from "@/lib/seo";
import { FIELD_EXAM_ANALYZER_USE_CASE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ManufacturingHero } from "@/components/sections/ManufacturingHero";
import { PPVExposureWaterfall } from "@/components/sections/PPVExposureWaterfall";
import { PPVAgentWorkflowDiagram } from "@/components/sections/PPVAgentWorkflowDiagram";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const page = FIELD_EXAM_ANALYZER_USE_CASE;

export const metadata = generatePageMetadata({
  title: "Field Examination Analyzer for Asset-Based Lending",
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function FieldExamAnalyzerPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Financial Services", href: "/financial-services" },
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
        signalLabel="Field exam signal map"
        signalSublabel="Collateral + credit + IT"
      />

      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="The problem"
            title="Senior Judgment Is Buried Under Exam Data Prep"
            description="The problem is not that examiners lack data. It is that days of normalizing borrower agings, inventory, GL, and bank statements crowd out the analysis lenders actually pay for."
          />
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6 md:p-8">
            <p className="text-lg font-medium leading-relaxed text-text-primary">
              {page.title}
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              The analyzer normalizes borrower data and runs the standard
              working-capital exam—roll-forward, dilution, turnover, ineligibles,
              and net availability—so the examiner moves straight to findings.
              It is designed for traceability and human approval, not autonomous
              reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="What the Field Examination Analyzer Does"
            description="The analyzer connects collateral analysis with forward availability, then packages the exam for review."
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

      <PPVExposureWaterfall
        waterfall={page.exposureWaterfall}
        bridgeEyebrow="Illustrative collateral roll-forward"
        bridgeTitle="From gross pledged collateral to net availability"
      />

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
            title="What the Analyzer Needs to Read"
            description="Discovery confirms which systems are authoritative. The page describes likely inputs, not a promise that every firm has clean integration-ready data on day one."
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

      <PPVAgentWorkflowDiagram
        steps={page.workflow}
        title="Read-Heavy, Write-Controlled Field Exam Intelligence"
        description="The analyzer connects approved borrower data, runs the working-capital exam, drafts the report, and routes it for examiner review before anything is issued."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Controls"
            title="The Analyzer Is Read-Heavy and Write-Controlled"
            description="The field examination analyzer can analyze, draft, flag, and recommend. It does not finalize valuations, alter collateral records, or issue reports without examiner review."
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
        heading="How a Field Exam Analyzer Engagement Starts"
      />

      <PricingROI
        heading="The Business Case Is Senior Capacity, Not AI Novelty"
        description="Public pricing is intentionally not published for this use case because scope depends on data access, exam methodology, report formats, confidentiality requirements, and governance. The discovery workshop defines the economics before a build is proposed."
        traditionalLabel="Traditional Field Exam"
        aiLabel="ITECS Field Exam Analyzer"
        comparison={page.comparison}
        roiStatement="The analyzer does not replace the examiner's judgment. It removes the data assembly so exams turn around faster, run more consistently, and free senior capacity for findings—while the same clean output shortens the downstream cash flow model."
        pricingNotes={[
          "Discovery validates exam methodology, eligibility definitions, data availability, and the approval model before a pilot is quoted",
          "Historical exam reproduction is the first proof point because it can be reconciled against issued reports and workpapers",
          "Availability modeling and recommendations are added only after the retrospective exam is trusted",
        ]}
      />

      <SecurityGuarantee
        title="Security for Financial Services AI Workflows"
        description="Field exams touch borrower agings, inventory, GL, bank statements, and lender collateral data. ITECS keeps those signals controlled with scoped access, human approval, and audit-ready recommendation history."
        points={[
          "Business and enterprise tiers that contractually isolate firm data and never train on it",
          "No finalized valuations, collateral-record changes, or issued reports without examiner approval",
          "Versioned assumptions and source references for examiner, lender, and audit review",
          "Credential isolation and encrypted secrets for borrower data, document, and reporting access",
        ]}
        internalLink={{
          text: "Return to the financial services AI hub",
          href: "/financial-services",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/itl/ai-risk-management-framework",
        }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
            Ready to test the analyzer on your own exams?
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Start with a focused workshop that reviews your exam methodology,
            eligibility definitions, report formats, data availability, and
            approval requirements.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href={page.primaryCtaHref}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full whitespace-normal text-center sm:w-auto"
            >
              {page.primaryCta}
            </Button>
          </div>
        </div>
      </section>

      <FAQ items={page.faq} heading="Field Examination Analyzer FAQ" />

      <CTASection />

      <JsonLd data={generateFAQSchema(page.faq)} />
      <JsonLd data={generateNationalServiceSchema(page)} />
    </>
  );
}
