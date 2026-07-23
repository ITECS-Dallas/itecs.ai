"use client";

import { motion } from "framer-motion";
import { Crosshair, FlaskConical, Rocket, Activity } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Crosshair,
    name: "Scope",
    detail:
      "Define one job per agent, its knowledge, its access, and its escalation rules.",
  },
  {
    icon: FlaskConical,
    name: "Test",
    detail:
      "Run simulations and automated graders against realistic conversations before any customer sees it.",
  },
  {
    icon: Rocket,
    name: "Pilot",
    detail:
      "Launch to a limited audience with human review on high-risk actions. Watch closely.",
  },
  {
    icon: Activity,
    name: "Monitor",
    detail:
      "Monitor live sessions, sample quality, and approve every update before it ships.",
  },
];

export function AgentLaunchReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to launching a customer-facing AI agent safely. Phase one, Scope: define one job per agent, its knowledge, its access, and its escalation rules. Phase two, Test: run simulations and automated graders against realistic conversations before any customer sees it. Phase three, Pilot: launch to a limited audience with human review on high-risk actions and watch closely. Phase four, Monitor: monitor live sessions, sample quality, and approve every update before it ships."
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
          Scope, test, pilot, then monitor — so a customer-facing agent proves
          itself before customer trust is on the line. ITECS runs it with your
          team.
        </figcaption>
      </figure>
    </section>
  );
}
