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
    <section className="border-y border-[var(--card-line)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="eyebrow">The Stakes</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
              AI adoption fails without governance, security, and operations.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-body md:text-lg">
              Most organizations do not need another disconnected AI experiment.
              They need a managed operating model that tells people what is
              approved, where data can go, which workflows deserve investment,
              and who owns reliability after launch.
            </p>
            <div className="chamfer-md mt-8 border-l-2 border-itecs-blue bg-canvas-sunken p-5">
              <p className="eyebrow">ITECS Position</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-body">
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
                  className="chamfer-md border border-[var(--card-line)] bg-card p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-ink-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="hex flex h-10 w-10 items-center justify-center bg-brand-subtle text-itecs-blue">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {point.risk}
                  </p>
                  <div className="mt-5 flex gap-3 border-t border-[var(--card-line)] pt-4">
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-bright"
                    />
                    <p className="text-sm leading-relaxed text-ink-body">
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
