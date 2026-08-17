import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { CHANGE_ASSURANCE_SERVICE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const evidenceRows = [
  {
    item: "Target-version compatibility",
    status: "OPEN",
    source: "Official requirements",
  },
  {
    item: "Recovery path is executable",
    status: "DOC-ONLY FLAGGED",
    source: "Submitted plan",
  },
  {
    item: "Live prerequisite observation",
    status: "OPEN",
    source: "Technician verification",
  },
] as const;

export function ChangeAssuranceHero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
      <div
        className="grid overflow-hidden rounded-[var(--r-section)] lg:grid-cols-[1.02fr_0.98fr]"
        style={{ background: "var(--itecs-navy)" }}
      >
        <div className="relative flex flex-col justify-center p-8 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 ops-grid"
          />
          <div className="relative z-10">
            <p className="eyebrow !text-itecs-blue-pale">
              AI-Assisted IT Change Readiness
            </p>
            <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#9eb0bd]">
              Managed pre-change technical review for infrastructure teams
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.35rem,1.75rem+2.5vw,3.65rem)] font-medium leading-[1.03] tracking-[-0.025em] text-white">
              {CHANGE_ASSURANCE_SERVICE.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-itecs-blue-pale">
              Challenge the plan before the change challenges production.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c5d2dc] md:text-lg">
              {CHANGE_ASSURANCE_SERVICE.description}
            </p>

            <div className="chamfer-sm mt-7 flex max-w-xl items-start gap-3 border border-white/15 bg-white/[0.06] p-4">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-itecs-blue-pale"
              />
              <p className="font-semibold text-white">
                Review-only. It never executes the change.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href="/contact"
                variant="ondark"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
                className="w-full whitespace-normal text-center sm:w-auto"
              >
                Schedule a Change Readiness Workshop
              </Button>
              <Link
                href="/ai-knowledge-base"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-itecs-blue-pale underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-itecs-blue-pale"
              >
                See how OpsMemory supports sourced context
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <figure
          role="img"
          aria-label="Illustrative change readiness console showing a fictional critical infrastructure plan with open evidence and a no-go verdict"
          className="relative border-t border-white/10 bg-[#08182a] p-6 md:p-10 lg:border-l lg:border-t-0"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50 ops-grid"
          />
          <div className="chamfer-md relative z-10 border border-white/15 bg-[#0b1d2c] p-5 shadow-2xl md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-itecs-blue-pale">
                  Illustrative readiness console
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                  Shared backup-platform upgrade
                </h2>
              </div>
              <span className="chamfer-sm border border-red-300/30 bg-red-950/50 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-red-200">
                Critical risk
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="chamfer-sm border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8195a5]">
                  Submitted scope
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  Fictional shared service
                </p>
              </div>
              <div className="chamfer-sm border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8195a5]">
                  Evidence gate
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  Critical items remain open
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {evidenceRows.map((row) => (
                <div
                  key={row.item}
                  className="chamfer-sm grid gap-3 border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-300"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {row.item}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-2 text-xs text-[#9eb0bd]">
                        {row.source === "Official requirements" ? (
                          <BookOpenCheck aria-hidden="true" className="h-3.5 w-3.5" />
                        ) : (
                          <FileCheck2 aria-hidden="true" className="h-3.5 w-3.5" />
                        )}
                        {row.source}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-200">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="chamfer-sm mt-5 border-l-2 border-red-400 bg-red-950/35 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-red-200">
                Illustrative verdict
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-white">
                NO-GO — critical evidence still required
              </p>
            </div>
          </div>
          <figcaption className="relative z-10 mt-4 text-center text-xs leading-relaxed text-[#92a6b5]">
            Fictional example only. No client, production record, hostname,
            address, credential, or vendor-confidential detail is shown.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
