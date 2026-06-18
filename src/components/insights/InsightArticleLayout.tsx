import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { SITE_CONFIG, type InsightItem } from "@/lib/constants";
import { generateArticleSchema, generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GridBackground } from "@/components/effects/GridBackground";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { ArticleShareBar } from "./ArticleShareBar";

export interface ArticleSource {
  label: string;
  href: string;
  description: string;
}

interface InsightArticleLayoutProps {
  insight: InsightItem;
  breadcrumbLabel: string;
  faqHeading: string;
  sources: ArticleSource[];
  ctaText: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroCaption?: string;
  publishedDate: string;
  modifiedDate?: string;
  readTime?: string;
  // Optional rich block (e.g. a comparison table) injected into the article
  // body wherever the content array contains the "[[COMPARISON_TABLE]]" marker.
  tableNode?: ReactNode;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

function formatInlineContent(content: string) {
  return content
    .replace(
      /\*\*(.*?)\*\*/g,
      "<strong class='text-text-primary font-medium'>$1</strong>"
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      "<a href='$2' class='text-brand-accent hover:text-brand-accent-bright transition-colors underline underline-offset-4'>$1</a>"
    );
}

function isStandaloneHeading(paragraph: string) {
  if (!paragraph.startsWith("**") || !paragraph.endsWith("**")) return false;
  if (paragraph.includes("[") || paragraph.includes("](")) return false;

  const text = paragraph.slice(2, -2);
  return text.length <= 80 && !text.endsWith(".");
}

function sourceLink(source: ArticleSource) {
  const isInternal = source.href.startsWith("/");
  const className =
    "inline-flex min-h-11 items-center gap-1 text-sm text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

  if (isInternal) {
    return (
      <Link href={source.href} className={className}>
        {source.label}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {source.label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export function InsightArticleLayout({
  insight,
  breadcrumbLabel,
  faqHeading,
  sources,
  ctaText,
  heroImage,
  heroImageAlt,
  heroCaption,
  publishedDate,
  modifiedDate,
  readTime = "5 min read",
  tableNode,
}: InsightArticleLayoutProps) {
  const canonicalUrl = `${SITE_CONFIG.url}${insight.href}`;
  const imageUrl = heroImage
    ? heroImage.startsWith("http")
      ? heroImage
      : `${SITE_CONFIG.url}${heroImage}`
    : undefined;

  const articleSchema = generateArticleSchema({
    headline: insight.h1,
    description: insight.description,
    url: canonicalUrl,
    image: imageUrl,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    keywords: insight.keywords,
    citations: sources.map((source) =>
      source.href.startsWith("/") ? `${SITE_CONFIG.url}${source.href}` : source.href
    ),
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: breadcrumbLabel, href: insight.href },
          ]}
        />
      </div>

      <section className="relative overflow-hidden pb-14 pt-8">
        <GridBackground opacity={0.03} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.12em] text-text-dim">
              <span className="chamfer-sm inline-flex items-center gap-2 border border-[var(--card-line)] bg-card px-3 py-1 text-brand-accent">
                {insight.hubLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(publishedDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {readTime}
              </span>
            </div>

            <h1 className="font-display text-3xl font-medium leading-[1.06] tracking-[-0.025em] text-ink md:text-5xl">
              {insight.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              {insight.description}
            </p>
          </div>

          {heroImage && (
            <figure
              role="img"
              aria-label={heroImageAlt ?? insight.h1}
              className="mt-10"
            >
              <div className="overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-void">
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? insight.h1}
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                  className="aspect-video w-full object-cover"
                />
              </div>
              {heroCaption && (
                <figcaption className="mt-3 text-sm leading-relaxed text-text-dim">
                  {heroCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </section>

      <article className="pb-24">
        <div className="mx-auto max-w-3xl space-y-8 px-6 md:px-8">
          <div className="space-y-6">
            {insight.content.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 0.03}>
                {paragraph === "[[COMPARISON_TABLE]]" && tableNode ? (
                  tableNode
                ) : isStandaloneHeading(paragraph) ? (
                  <h2 className="pt-4 text-2xl font-semibold leading-tight text-ink">
                    {paragraph.slice(2, -2)}
                  </h2>
                ) : (
                  <p
                    className="leading-relaxed text-text-secondary"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineContent(paragraph),
                    }}
                  />
                )}
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="chamfer-md border-l-2 border-itecs-blue bg-brand-subtle p-6">
              <p className="font-medium leading-relaxed text-ink">
                {ctaText}{" "}
                <Link
                  href={insight.hubHref}
                  className="inline-flex min-h-11 items-center text-brand-accent underline underline-offset-4 transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
                >
                  Learn about our {insight.hubLabel} service
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center text-brand-accent underline underline-offset-4 transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
                >
                  schedule a free AI assessment
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <section
              aria-labelledby="author-heading"
              className="border-t border-[var(--border-subtle)] pt-8"
            >
              <div className="flex items-start gap-4">
                <div className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-brand-subtle">
                  <UserRound className="h-5 w-5 text-itecs-blue" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="author-heading"
                    className="text-sm font-medium uppercase tracking-[0.12em] text-text-dim"
                  >
                    About The Author
                  </h2>
                  <p className="mt-2 font-medium text-text-primary">
                    The ITECS Team
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    ITECS helps Dallas business leaders adopt practical AI with
                    the security, documentation, training, and operational
                    discipline expected from an established managed technology
                    partner.
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <ArticleShareBar title={insight.title} url={canonicalUrl} />
          </ScrollReveal>

          <ScrollReveal>
            <section
              aria-labelledby="sources-heading"
              className="border-t border-[var(--border-subtle)] pt-8"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                  aria-hidden="true"
                />
                <div>
                  <h2
                    id="sources-heading"
                    className="text-sm font-medium uppercase tracking-[0.12em] text-text-dim"
                  >
                    Sources And Trust Signals
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    This article is based on ITECS implementation experience and
                    the public resources below.
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                {sources.map((source) => (
                  <div
                    key={source.href}
                    className="grid gap-2 py-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6"
                  >
                    <div>{sourceLink(source)}</div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {source.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </article>

      <FAQ items={insight.faq} heading={faqHeading} />
      <CTASection />

      <JsonLd data={articleSchema} />
      <JsonLd data={generateFAQSchema(insight.faq)} />
    </>
  );
}
