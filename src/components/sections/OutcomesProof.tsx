import { ArrowUpRight, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { HOMEPAGE_OUTCOMES_PROOF } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const dataMotifs = [
  "[background:linear-gradient(135deg,var(--brand-subtle),var(--accent-cyan-subtle),transparent)]",
  "[background:linear-gradient(135deg,var(--accent-cyan-subtle),var(--brand-subtle),transparent)]",
  "[background:linear-gradient(135deg,var(--surface-2),var(--brand-subtle),var(--accent-cyan-subtle))]",
] as const;

export function OutcomesProof() {
  const metrics = [...HOMEPAGE_OUTCOMES_PROOF.metrics];
  const cases = [...HOMEPAGE_OUTCOMES_PROOF.cases];

  if (metrics.length === 0 || cases.length === 0) {
    return null;
  }

  return (
    <section id="case-studies" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={HOMEPAGE_OUTCOMES_PROOF.eyebrow}
          title={HOMEPAGE_OUTCOMES_PROOF.title}
          description={HOMEPAGE_OUTCOMES_PROOF.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-[var(--border-default)] bg-bg-surface p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
            >
              <p className="font-mono text-4xl font-semibold leading-none text-brand md:text-5xl">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-text-primary">
                {metric.label}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text-tertiary">
                Source: {metric.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {cases.map((caseStudy, index) => (
            <article
              key={caseStudy.client}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--border-default)] bg-bg-surface shadow-e2 [box-shadow:var(--elev-2-inset),var(--elev-2)] transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--border-strong)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div
                className={`relative aspect-[16/9] overflow-hidden ${dataMotifs[index % dataMotifs.length]}`}
              >
                <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3">
                  <span className="rounded-md border border-[var(--border-default)] bg-bg-sunken/80 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-secondary backdrop-blur">
                    {caseStudy.label}
                  </span>
                  <Building2
                    aria-hidden="true"
                    className="h-5 w-5 text-text-secondary"
                  />
                </div>
                <div className="absolute inset-x-6 bottom-6 grid gap-2">
                  <div className="h-2 w-3/4 rounded-full bg-[var(--brand)]/60" />
                  <div className="h-2 w-1/2 rounded-full bg-[var(--accent-cyan)]/60" />
                  <div className="h-2 w-2/3 rounded-full bg-[var(--text-tertiary)]/30" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-[var(--border-subtle)] bg-bg-sunken px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-tertiary">
                    {caseStudy.industry}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-text-primary">
                  {caseStudy.client}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-accent-cyan">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
                  {caseStudy.outcome}
                </p>
                <dl className="mt-4 grid flex-1 gap-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                      Challenge
                    </dt>
                    <dd className="mt-1 text-text-secondary">
                      {caseStudy.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                      Solution
                    </dt>
                    <dd className="mt-1 text-text-secondary">
                      {caseStudy.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                      Measured outcome
                    </dt>
                    <dd className="mt-1 text-text-secondary">
                      {caseStudy.measuredOutcome}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={caseStudy.detailHref}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors duration-[var(--dur-base)] hover:text-itecs-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  aria-label={`Read case study detail: ${caseStudy.client}`}
                >
                  Read case study
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
