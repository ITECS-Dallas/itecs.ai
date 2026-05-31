import {
  ArrowRight,
  ClipboardList,
  DollarSign,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const riskPoints = [
  {
    title: "Governance",
    risk: "Teams adopt tools faster than leadership can set policies.",
    strength:
      "ITECS defines approved use cases, data rules, human review paths, and operating ownership before AI spreads.",
    icon: ClipboardList,
  },
  {
    title: "Security",
    risk: "Sensitive data moves into public prompts, unmanaged plugins, and disconnected workspaces.",
    strength:
      "ITECS brings managed-IT discipline to access, identity, data handling, and vendor selection.",
    icon: ShieldCheck,
  },
  {
    title: "ROI",
    risk: "AI experiments consume subscriptions and meetings without a measurable operating case.",
    strength:
      "ITECS starts with workflows, cost of delay, and measurable outcomes before recommending build work.",
    icon: DollarSign,
  },
  {
    title: "Integration",
    risk: "Useful pilots stall when they have to connect with Microsoft 365, CRM, service, or finance systems.",
    strength:
      "ITECS designs automation around the systems, permissions, approvals, and support model already in place.",
    icon: Workflow,
  },
] as const;

export function AIAdoptionUnderstanding() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface/45 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
              The Stakes
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-text-primary md:text-5xl">
              AI adoption fails without governance, security, and operations.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              Most organizations do not need another disconnected AI experiment.
              They need a managed operating model that tells people what is
              approved, where data can go, which workflows deserve investment,
              and who owns reliability after launch.
            </p>
            <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-bg-sunken p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]">
              <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
                ITECS Position
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Managed Intelligence applies ITECS&apos;s 24-year managed IT and
                cybersecurity operating model to AI systems, prompts, agents,
                connectors, and employee adoption.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {riskPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="rounded-lg border border-[var(--border-default)] bg-bg-surface p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-subtle text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-tertiary">
                    {point.risk}
                  </p>
                  <div className="mt-5 flex gap-3 border-t border-[var(--border-subtle)] pt-4">
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent"
                    />
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {point.strength}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
