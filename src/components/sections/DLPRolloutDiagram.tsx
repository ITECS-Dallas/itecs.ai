"use client";

import { motion } from "framer-motion";
import { Target, Plug, Eye, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Target,
    name: "Scope",
    detail:
      "Choose which AI surfaces need inspection and which data must never pass.",
  },
  {
    icon: Plug,
    name: "Connect",
    detail:
      "Wire your DLP or AI security server to the pre-inference hook.",
  },
  {
    icon: Eye,
    name: "Shadow",
    detail:
      "Run in shadow mode to watch verdicts on live traffic without blocking.",
  },
  {
    icon: ShieldCheck,
    name: "Enforce",
    detail:
      "Turn on allow-or-deny, log denials, and expand by rollout percentage.",
  },
];

export function DLPRolloutDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to rolling out AI prompt DLP. Phase one, Scope: choose which AI surfaces need inspection and which data must never pass. Phase two, Connect: wire your DLP or AI security server to the pre-inference hook. Phase three, Shadow: run in shadow mode to watch verdicts on live traffic without blocking. Phase four, Enforce: turn on allow-or-deny, log denials, and expand by rollout percentage."
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
          Scope, connect, shadow, then enforce — so a prompt gate protects data
          without blocking your team blind. ITECS builds and runs it with your
          team.
        </figcaption>
      </figure>
    </section>
  );
}
