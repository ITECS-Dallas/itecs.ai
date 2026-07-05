import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, CheckCircle2, Quote } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { generatePageMetadata } from "@/lib/metadata";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { SITE_CONFIG, TRUST_CASE_STUDIES } from "@/lib/constants";

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

// Same inline markdown treatment the Insights articles use: **bold** and
// [label](href). Content is first-party data from constants.ts, not user input.
function formatInline(content: string) {
  return content
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong class='text-ink font-medium'>$1</strong>",
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      "<a href='$2' class='text-brand-accent hover:text-brand-accent-bright transition-colors underline underline-offset-4'>$1</a>",
    );
}

function toIsoDate(sourceDate: string) {
  return new Date(`${sourceDate} UTC`).toISOString().slice(0, 10);
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
      "managed IT services Dallas",
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: caseStudy.client, href: caseStudy.detailHref },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            as="h1"
            eyebrow={caseStudy.label}
            title={`${caseStudy.client}: ${caseStudy.outcome}`}
            description={caseStudy.summary}
          />

          <p
            className="mt-8 text-lg leading-relaxed text-ink-body"
            dangerouslySetInnerHTML={{
              __html: formatInline(caseStudy.heroSummary),
            }}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {caseStudy.metrics.map((metric) => (
              <div
                key={metric.label}
                className="chamfer-md border border-[var(--card-line)] bg-card p-5"
              >
                <p className="font-display text-3xl font-semibold tracking-[-0.01em] text-itecs-blue">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {caseStudy.stakesHeading}
            </h2>
            {caseStudy.stakes.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-5 leading-relaxed text-ink-body"
                dangerouslySetInnerHTML={{ __html: formatInline(paragraph) }}
              />
            ))}
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {caseStudy.approachHeading}
            </h2>

            <figure
              role="img"
              aria-label={`Workflow diagram of the ${caseStudy.client} engagement: ${caseStudy.approach
                .map((stage, index) => `stage ${index + 1}, ${stage.step}`)
                .join("; ")}.`}
              className="chamfer-md mt-8 border border-[var(--card-line)] bg-canvas-sunken p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                {caseStudy.approach.map((stage, index) => (
                  <div key={stage.step} className="flex items-center gap-2">
                    <span className="chamfer-sm inline-flex items-center gap-2 border border-[var(--card-line)] bg-card px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-ink">
                      <span aria-hidden="true" className="text-itecs-blue-bright">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {stage.step}
                    </span>
                    {index < caseStudy.approach.length - 1 ? (
                      <ChevronRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-itecs-blue-bright"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
              <figcaption className="mt-4 text-xs text-text-tertiary">
                The {caseStudy.approach.length}-stage delivery sequence ITECS
                ran for {caseStudy.client}.
              </figcaption>
            </figure>

            <ol className="mt-8 grid list-decimal gap-5 pl-5 marker:font-display marker:font-semibold marker:text-itecs-blue-bright">
              {caseStudy.approach.map((stage, index) => (
                <li key={stage.step} value={index + 1} className="pl-2">
                  <h3 className="text-lg font-semibold text-ink">
                    {stage.step}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-body">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {caseStudy.securityHeading}
            </h2>
            {caseStudy.security.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="mt-5 leading-relaxed text-ink-body"
                dangerouslySetInnerHTML={{ __html: formatInline(paragraph) }}
              />
            ))}
          </section>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {caseStudy.resultsHeading}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {caseStudy.resultsGroups.map((group) => (
                <div
                  key={group.title}
                  className="chamfer-md border border-[var(--card-line)] bg-card p-6"
                >
                  <h3 className="text-lg font-semibold text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-4 grid gap-3">
                    {group.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-5 w-5 shrink-0 text-success"
                        />
                        <span className="text-sm leading-relaxed text-ink-body">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {"quote" in caseStudy && caseStudy.quote ? (
            <blockquote className="chamfer-md mt-14 border border-[var(--card-line)] bg-canvas-sunken p-8">
              <Quote
                aria-hidden="true"
                className="h-6 w-6 text-itecs-blue-bright"
              />
              <p className="mt-4 text-lg leading-relaxed text-ink">
                “{caseStudy.quote.text}”
              </p>
              <footer className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                — {caseStudy.quote.attribution}
              </footer>
            </blockquote>
          ) : null}

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Where This Discipline Goes Next
            </h2>
            <p
              className="mt-5 leading-relaxed text-ink-body"
              dangerouslySetInnerHTML={{
                __html: formatInline(caseStudy.aiBridge),
              }}
            />
          </section>
        </div>

        <FAQ
          items={caseStudy.detailFaq}
          heading={`${caseStudy.client} Case Study FAQ`}
        />

        <CTASection />

        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="chamfer-md mt-4 border border-[var(--card-line)] bg-canvas-sunken p-6">
            <p className="font-mono text-xs font-semibold uppercase text-text-tertiary">
              Source: {caseStudy.sourceDate}
            </p>
            <a
              href={caseStudy.sourceHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors duration-[var(--dur-base)] hover:text-itecs-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              {caseStudy.sourceLabel}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>

      <JsonLd
        data={generateArticleSchema({
          headline: `${caseStudy.client} Case Study — ${caseStudy.outcome}`,
          description: caseStudy.summary,
          url: `${SITE_CONFIG.url}${caseStudy.detailHref}`,
          datePublished: toIsoDate(caseStudy.sourceDate),
          dateModified: "2026-07-05",
          keywords: [
            `${caseStudy.client} case study`,
            caseStudy.industry,
            "managed IT services Dallas",
          ],
          citations: [caseStudy.sourceHref],
        })}
      />
      <JsonLd data={generateFAQSchema(caseStudy.detailFaq)} />
      <JsonLd
        data={generateBreadcrumbSchema(
          breadcrumbItems.map((item) => ({
            name: item.label,
            url: `${SITE_CONFIG.url}${item.href}`,
          })),
        )}
      />
    </>
  );
}
