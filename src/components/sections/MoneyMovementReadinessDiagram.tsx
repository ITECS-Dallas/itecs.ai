"use client";

import { motion } from "framer-motion";
import { Crosshair, KeyRound, Split, FileSearch } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Crosshair,
    name: "Scope",
    detail:
      "Set per-agent limits on payee, amount, and payment type before it can move money.",
  },
  {
    icon: KeyRound,
    name: "Authorize",
    detail:
      "Verify agent identity and intent, and force human approval above your thresholds.",
  },
  {
    icon: Split,
    name: "Separate",
    detail:
      "Split initiate, approve, and reconcile so no single agent completes a payment alone.",
  },
  {
    icon: FileSearch,
    name: "Audit",
    detail:
      "Preserve immutable trails and red-team the agent against prompt-injection fraud.",
  },
];

export function MoneyMovementReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to payment-agent money-movement readiness. Phase one, Scope: set per-agent limits on payee, amount, and payment type before it can move money. Phase two, Authorize: verify agent identity and intent, and force human approval above your thresholds. Phase three, Separate: split initiate, approve, and reconcile so no single agent completes a payment alone. Phase four, Audit: preserve immutable trails and red-team the agent against prompt-injection fraud."
      >
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.name} delay={i * 0.1}>
                <motion.li
                  className="relative flex h-full flex-col chamfer-md border border-[var(--card-line)] bg-card p-5"
                  whileHover={{
                    borderColor: "var(--itecs-blue)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <span
                    className="absolute left-0 top-0 h-0.5 bg-itecs-blue-bright"
                    style={{ width: `${25 + i * 25}%` }}
                    aria-hidden="true"
                  />
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-brand-subtle text-itecs-blue">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-itecs-blue">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {step.detail}
                  </p>
                </motion.li>
              </ScrollReveal>
            );
          })}
        </ol>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          Scope, authorize, separate, then audit — so an agent moves only the
          money you approved, and every payment is traceable. ITECS builds and
          runs it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
