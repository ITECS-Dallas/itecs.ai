import Link from "next/link";
import { ArrowRight, Factory, Landmark } from "lucide-react";
import {
  FIELD_EXAM_ANALYZER_USE_CASE,
  PPV_AGENT_USE_CASE,
} from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ---------------------------------------------------------------------------
   FEATURED AGENT BUILDS — concrete proof of what an enterprise hosted agent
   looks like. Surfaces the two flagship vertical builds (PPV Agent for
   manufacturing finance, Field Exam Analyzer for asset-based lending) with
   their real scope and human-in-the-loop framing, plus paths into the
   industry vertical hubs.
   --------------------------------------------------------------------------- */

const FEATURED = [
  {
    useCase: PPV_AGENT_USE_CASE,
    vertical: "Manufacturing",
    verticalHref: "/manufacturing",
    icon: Factory,
    blurb:
      "Continuously answers whether plants are paying what they expected, why purchase price variance moved, and what commodity exposure is coming — with human approval before any financial action.",
  },
  {
    useCase: FIELD_EXAM_ANALYZER_USE_CASE,
    vertical: "Financial Services",
    verticalHref: "/financial-services",
    icon: Landmark,
    blurb:
      "Ingests borrower agings, inventory, GL, and bank statements and produces the standard working-capital exam — roll-forward, dilution, ineligibles, and a first-draft report the examiner reviews and signs.",
  },
] as const;

export function FeaturedAgentBuilds() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Flagship Agent Builds"
          title="What an enterprise agent actually looks like."
          description="Not slideware. These are fully specified agent systems ITECS engineers for operating teams — connected to real ERP, finance, and document data, with a human review portal in front of every consequential action."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {FEATURED.map(({ useCase, vertical, verticalHref, icon: Icon, blurb }) => (
            <article
              key={useCase.href}
              className="chamfer-md flex h-full flex-col border border-[var(--card-line)] bg-card p-7 md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={verticalHref}
                  className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue transition-colors hover:text-itecs-blue-bright"
                >
                  {vertical}
                </Link>
                <span className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">
                {useCase.shortTitle}
              </h3>
              <p className="mt-2 text-sm font-medium text-ink-muted">
                {useCase.eyebrow}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-body md:text-base">
                {blurb}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--card-line)] pt-5">
                {useCase.stats.map((stat) => (
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

              <Link
                href={useCase.href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright"
              >
                See the full {useCase.shortTitle} build
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          ))}
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
