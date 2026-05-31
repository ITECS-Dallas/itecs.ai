import {
  ClipboardCheck,
  GitBranch,
  Rocket,
  SlidersHorizontal,
} from "lucide-react";
import { AIOperationsConsole } from "@/components/ui/AIOperationsConsole";
import { SectionHeading } from "@/components/ui/SectionHeading";

const methodologySteps = [
  {
    title: "Assess",
    description:
      "Map workflows, shadow AI usage, data readiness, risk, and the operating case before recommending tools.",
    icon: ClipboardCheck,
  },
  {
    title: "Architect",
    description:
      "Design the approved workflow, governance model, data boundaries, integrations, and human review path.",
    icon: GitBranch,
  },
  {
    title: "Deploy",
    description:
      "Build or configure the system, train users, validate quality, and move only stable workflows into production.",
    icon: Rocket,
  },
  {
    title: "Manage & Optimize",
    description:
      "Monitor usage, cost, reliability, model changes, prompt drift, and executive outcomes after launch.",
    icon: SlidersHorizontal,
  },
] as const;

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
