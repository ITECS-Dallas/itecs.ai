import {
  ClipboardCheck,
  GitBranch,
  Rocket,
  SlidersHorizontal,
} from "lucide-react";
import { MIP_METHODOLOGY_STEPS } from "@/lib/constants";
import { AIOperationsConsole } from "@/components/ui/AIOperationsConsole";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stepIcons = [ClipboardCheck, GitBranch, Rocket, SlidersHorizontal] as const;

const methodologySteps = MIP_METHODOLOGY_STEPS.map((step, index) => ({
  ...step,
  icon: stepIcons[index] ?? ClipboardCheck,
}));

export function MethodologySteps() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface/45 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="How Managed Intelligence Works"
          title="A governed operating model from assessment to optimization."
          description="ITECS treats AI as an operating layer, not a one-time tool rollout. Each step has an owner, control points, and a path into managed support."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="grid gap-4">
            {methodologySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="grid gap-4 rounded-lg border border-[var(--border-default)] bg-bg-surface p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)] sm:grid-cols-[auto_1fr]"
                >
                  <div className="flex items-start gap-3 sm:block">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-subtle text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="mt-3 block font-mono text-xs font-semibold uppercase text-text-tertiary sm:text-center">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                    <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-md border border-[var(--border-subtle)] bg-bg-base px-3 py-2">
                        <dt className="font-mono text-[0.68rem] font-semibold uppercase text-accent-cyan">
                          KPI
                        </dt>
                        <dd className="mt-1 text-xs leading-relaxed text-text-secondary">
                          {step.kpi}
                        </dd>
                      </div>
                      <div className="rounded-md border border-[var(--border-subtle)] bg-bg-base px-3 py-2">
                        <dt className="font-mono text-[0.68rem] font-semibold uppercase text-brand">
                          SLA
                        </dt>
                        <dd className="mt-1 text-xs leading-relaxed text-text-secondary">
                          {step.sla}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>

          <AIOperationsConsole className="lg:pl-4" />
        </div>
      </div>
    </section>
  );
}
