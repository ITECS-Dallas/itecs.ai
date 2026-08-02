import Link from "next/link";
import { ArrowRight, BookOpen, Factory, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FIELD_EXAM_ANALYZER_USE_CASE,
  PPV_AGENT_USE_CASE,
} from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ---------------------------------------------------------------------------
   FEATURED AGENT BUILDS — concrete proof of what an enterprise hosted agent
   looks like. Surfaces the PPV Agent, Field Exam Analyzer, and OpsMemory with
   accurate scope and human-in-the-loop framing, plus paths into the relevant
   service and industry pages.
   --------------------------------------------------------------------------- */

interface FeaturedAgent {
  title: string;
  eyebrow: string;
  href: string;
  category: string;
  categoryHref?: string;
  cta: string;
  icon: LucideIcon;
  blurb: string;
  stats?: readonly { value: string; label: string }[];
}

const FEATURED: FeaturedAgent[] = [
  {
    title: PPV_AGENT_USE_CASE.shortTitle,
    eyebrow: PPV_AGENT_USE_CASE.eyebrow,
    href: PPV_AGENT_USE_CASE.href,
    category: "Manufacturing",
    categoryHref: "/manufacturing",
    cta: `See the full ${PPV_AGENT_USE_CASE.shortTitle} build`,
    icon: Factory,
    blurb:
      "Continuously answers whether plants are paying what they expected, why purchase price variance moved, and what commodity exposure is coming — with human approval before any financial action.",
    stats: PPV_AGENT_USE_CASE.stats,
  },
  {
    title: FIELD_EXAM_ANALYZER_USE_CASE.shortTitle,
    eyebrow: FIELD_EXAM_ANALYZER_USE_CASE.eyebrow,
    href: FIELD_EXAM_ANALYZER_USE_CASE.href,
    category: "Financial Services",
    categoryHref: "/financial-services",
    cta: `See the full ${FIELD_EXAM_ANALYZER_USE_CASE.shortTitle} build`,
    icon: Landmark,
    blurb:
      "Ingests borrower agings, inventory, GL, and bank statements and produces the standard working-capital exam — roll-forward, dilution, ineligibles, and a first-draft report the examiner reviews and signs.",
    stats: FIELD_EXAM_ANALYZER_USE_CASE.stats,
  },
  {
    title: "ITECS OpsMemory",
    eyebrow: "Managed Knowledge & Document Operations Agent",
    href: "/ai-knowledge-base",
    category: "Knowledge & IT Operations",
    cta: "Explore OpsMemory",
    icon: BookOpen,
    blurb:
      "Turns approved company knowledge, client documentation, and authoritative vendor guidance into cited answers and maintained SOPs and runbooks, with human review for consequential changes.",
  },
];

export function FeaturedAgentBuilds() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Flagship Agent Builds"
          title="What an enterprise agent actually looks like."
          description="These are fully specified agent systems ITECS engineers for operating teams — grounded in approved operational data, with human review in front of consequential actions."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {FEATURED.map(
            ({
              title,
              eyebrow,
              href,
              category,
              categoryHref,
              cta,
              icon: Icon,
              blurb,
              stats,
            }) => (
              <article
                key={href}
                className="chamfer-md flex h-full flex-col border border-[var(--card-line)] bg-card p-7 md:p-8"
              >
              <div className="flex items-center justify-between gap-4">
                {categoryHref ? (
                  <Link
                    href={categoryHref}
                    className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue transition-colors hover:text-itecs-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2"
                  >
                    {category}
                  </Link>
                ) : (
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue">
                    {category}
                  </span>
                )}
                <span className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm font-medium text-ink-muted">
                {eyebrow}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-body md:text-base">
                {blurb}
              </p>

              {stats && (
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--card-line)] pt-5">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display text-lg font-semibold text-ink">
                        {stat.value}
                      </dd>
                      <dd className="mt-1 text-[11px] leading-snug text-ink-muted">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <Link
                href={href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2"
              >
                {cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              </article>
            ),
          )}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
          Explore the industry hubs for more agent use cases:{" "}
          <Link
            href="/manufacturing"
            className="font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright"
          >
            AI for Manufacturing
          </Link>{" "}
          and{" "}
          <Link
            href="/financial-services"
            className="font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright"
          >
            AI for Financial Services
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
