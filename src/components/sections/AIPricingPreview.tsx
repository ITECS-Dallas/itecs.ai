import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  RefreshCw,
  Rocket,
  Workflow,
} from "lucide-react";
import {
  getAIPricingOffering,
  MANAGED_AI_TIERS,
} from "@/lib/constants";
const readiness = getAIPricingOffering("AI Readiness Assessment");
const guidedBuild = getAIPricingOffering("Guided Build Session");
const discovery = getAIPricingOffering(
  "Agent Discovery & Technical Specification",
);
const misCore = MANAGED_AI_TIERS[0];

const pathways = [
  {
    icon: Brain,
    label: "Start Here",
    title: "Discovery, strategy, and training",
    price: readiness.price,
    description:
      "Assess readiness, train the right people, and establish the governance and roadmap required to move with confidence.",
  },
  {
    icon: Rocket,
    label: "Build",
    title: "Guided and local agents",
    price: guidedBuild.price,
    description:
      "Co-build in an employee's workspace or have ITECS deliver a local agent with documentation and handoff.",
  },
  {
    icon: Workflow,
    label: "Specialize",
    title: "Phased production builds",
    price: discovery.price,
    description:
      "Start with credited discovery, then engineer production agents, integrations, or AI-augmented software where the workflow justifies it.",
  },
  {
    icon: RefreshCw,
    label: "Sustain",
    title: "Managed Intelligence Services",
    price: `From ${misCore.price}`,
    description:
      "Ongoing optimization, office hours, prompt-library maintenance, governance, and Agent Operations as adoption expands.",
  },
] as const;

export function AIPricingPreview() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-void py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.05em] text-brand-accent">
              Pricing Clarity
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              AI pricing without the mystery.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              Most mid-market teams do not need an open-ended AI experiment.
              ITECS publishes flat-fee starting points, scoped build ranges,
              and managed AI retainers so enterprise leadership can plan before
              committing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                View AI Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                Talk Through Options
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;

              return (
                <div
                  key={pathway.label}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/55 p-5 transition-colors hover:border-brand-accent/35"
                >
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-brand-accent-bright">
                          {pathway.label}
                        </p>
                        <h3 className="mt-1 text-base font-medium text-text-primary">
                          {pathway.title}
                        </h3>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-3 py-1 text-xs font-medium text-brand-accent-bright">
                      {pathway.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {pathway.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-5 text-sm leading-relaxed text-text-secondary md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-bright" />
            <span>
              Existing ITECS managed IT clients receive loyalty discounts on
              specific eligible AI hourly work and one-time packages. The
              published matrix defines each benefit.
            </span>
          </div>
          <Link
            href="/pricing#loyalty"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            See discounts
          </Link>
        </div>
      </div>
    </section>
  );
}
