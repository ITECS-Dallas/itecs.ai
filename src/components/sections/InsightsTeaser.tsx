import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Tag } from "lucide-react";
import { INSIGHTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

function formatDate(publishedDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${publishedDate}T00:00:00Z`));
}

function readTime(content: readonly string[]) {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function InsightsTeaser() {
  const latestInsights = [...INSIGHTS]
    .sort(
      (a, b) =>
        new Date(`${b.publishedDate}T00:00:00Z`).getTime() -
        new Date(`${a.publishedDate}T00:00:00Z`).getTime(),
    )
    .slice(0, 3);

  if (latestInsights.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Insights"
            title="Recent field notes for governed AI adoption."
            description="Three current guides for executives evaluating secure agents, governance, ROI, and the operating layer around AI."
          />
          <Link
            href="/insights"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-brand-hover transition-colors duration-[var(--dur-base)] hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            View all insights
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {latestInsights.map((insight) => {
            const articleReadTime = readTime(insight.content);

            return (
              <article
                key={insight.slug}
                className="flex h-full flex-col rounded-lg border border-[var(--border-default)] bg-bg-base p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)] transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--border-strong)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-brand-subtle px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-hover">
                    <Tag aria-hidden="true" className="h-3 w-3" />
                    {insight.hubLabel}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-tight text-text-primary">
                  <Link
                    href={insight.href}
                    className="transition-colors duration-[var(--dur-base)] hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    {insight.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {insight.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-5 text-xs text-text-tertiary">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(insight.publishedDate)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                    {articleReadTime}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
