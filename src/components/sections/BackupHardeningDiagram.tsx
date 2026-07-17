"use client";

import { motion } from "framer-motion";
import { Split, Lock, ShieldAlert, RotateCcw } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Split,
    name: "Separate",
    detail:
      "Put backups outside the blast radius — different account, credentials, and ideally a different provider.",
  },
  {
    icon: Lock,
    name: "Immutable",
    detail:
      "Use WORM, immutable backups an agent cannot alter or delete, with point-in-time recovery.",
  },
  {
    icon: ShieldAlert,
    name: "Gate",
    detail:
      "Require human approval on destructive actions. Give agents least-privilege, scoped identities.",
  },
  {
    icon: RotateCcw,
    name: "Test",
    detail:
      "Rehearse recovery from an agent-caused deletion — on a schedule, not after the incident.",
  },
];

export function BackupHardeningDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to hardening backups against AI agents. Phase one, Separate: put backups outside the blast radius, in a different account with different credentials and ideally a different provider. Phase two, Immutable: use write-once-read-many immutable backups an agent cannot alter or delete, with point-in-time recovery. Phase three, Gate: require human approval on destructive actions and give agents least-privilege, scoped identities. Phase four, Test: rehearse recovery from an agent-caused deletion on a schedule, not after the incident."
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
          Separate, make immutable, gate, then test — so a single agent can never
          become a single point of failure. ITECS builds this with your team.
        </figcaption>
      </figure>
    </section>
  );
}
