"use client";

import { motion } from "framer-motion";
import { Target, EyeOff, Scale, Activity } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Target,
    name: "Define",
    detail:
      "Write the task and the metric that means success for your workflow.",
  },
  {
    icon: EyeOff,
    name: "Blind-test",
    detail:
      "Score each model on held-out domain data it has never seen.",
  },
  {
    icon: Scale,
    name: "Compare",
    detail:
      "Rank models on common metrics, with uncertainty, not vendor claims.",
  },
  {
    icon: Activity,
    name: "Monitor",
    detail:
      "Keep evaluating after production, because data and models drift.",
  },
];

export function EvaluationReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to AI model evaluation readiness. Phase one, Define: write the task and the metric that means success for your workflow. Phase two, Blind-test: score each model on held-out domain data it has never seen. Phase three, Compare: rank models on common metrics, with uncertainty, not vendor claims. Phase four, Monitor: keep evaluating after production, because data and models drift."
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
          Define, blind-test, compare, then monitor — so the model you deploy is
          proven on your data, not a leaderboard. ITECS builds and runs it with
          your team.
        </figcaption>
      </figure>
    </section>
  );
}
