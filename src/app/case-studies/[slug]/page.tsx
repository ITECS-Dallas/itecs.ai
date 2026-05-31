import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { generatePageMetadata } from "@/lib/metadata";
import { TRUST_CASE_STUDIES } from "@/lib/constants";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudy(slug: string) {
  return TRUST_CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

export function generateStaticParams() {
  return TRUST_CASE_STUDIES.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  return generatePageMetadata({
    title: `${caseStudy.client} Case Study — ${caseStudy.outcome}`,
    description: caseStudy.summary,
    path: caseStudy.detailHref,
    keywords: [
      `${caseStudy.client} case study`,
      "ITECS case study",
      caseStudy.industry,
      caseStudy.outcome,
    ],
  });
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Case Studies", href: "/#case-studies" },
            { label: caseStudy.client, href: caseStudy.detailHref },
          ]}
        />
      </div>

      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            as="h1"
            eyebrow={caseStudy.label}
            title={`${caseStudy.client}: ${caseStudy.outcome}`}
            description={caseStudy.summary}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-[var(--border-default)] bg-bg-surface p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
              >
                <p className="font-mono text-3xl font-semibold text-brand">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5">
            {[
              ["Challenge", caseStudy.challenge],
              ["Solution", caseStudy.solution],
              ["Measured outcome", caseStudy.measuredOutcome],
            ].map(([label, body]) => (
              <section
                key={label}
                className="rounded-lg border border-[var(--border-default)] bg-bg-surface p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-success"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">
                      {label}
                    </h2>
                    <p className="mt-3 leading-relaxed text-text-secondary">
                      {body}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-[var(--border-default)] bg-bg-sunken p-6">
            <p className="font-mono text-xs font-semibold uppercase text-text-tertiary">
              Source: {caseStudy.sourceDate}
            </p>
            <a
              href={caseStudy.sourceHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors duration-[var(--dur-base)] hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              {caseStudy.sourceLabel}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
