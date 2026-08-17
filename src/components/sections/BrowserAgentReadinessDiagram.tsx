"use client";

import { motion } from "framer-motion";
import { Fingerprint, ShieldHalf, ScrollText, UserCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Fingerprint,
    name: "Bind",
    detail:
      "Tie every browser agent to corporate identity and context-aware access.",
  },
  {
    icon: ShieldHalf,
    name: "Contain",
    detail:
      "Enforce DLP, scope agents to relevant sites, and vet extensions.",
  },
  {
    icon: ScrollText,
    name: "Log",
    detail:
      "Record every agent action so you can see and audit what it did.",
  },
  {
    icon: UserCheck,
    name: "Approve",
    detail:
      "Require human sign-off for high-stakes steps, and red-team injection first.",
  },
];

export function BrowserAgentReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to browser-agent readiness. Phase one, Bind: tie every browser agent to corporate identity and context-aware access. Phase two, Contain: enforce DLP, scope agents to relevant sites, and vet extensions. Phase three, Log: record every agent action so you can see and audit what it did. Phase four, Approve: require human sign-off for high-stakes steps, and red-team indirect prompt injection first."
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
          Bind, contain, log, then approve — so a browser agent works with your
          employees&apos; access, not against it. ITECS builds and runs it with
          your team.
        </figcaption>
      </figure>
    </section>
  );
}
