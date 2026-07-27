"use client";

import { motion } from "framer-motion";
import { FileText, Wrench, Repeat, UserCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: FileText,
    name: "Define",
    detail:
      "Write what loss of control means, and map which agents can move money or data.",
  },
  {
    icon: Wrench,
    name: "Build",
    detail:
      "Add throttle and suspension controls, and preserve logs off the agent for investigation.",
  },
  {
    icon: Repeat,
    name: "Drill",
    detail:
      "Run scheduled shutdown drills so the switch is proven, not assumed.",
  },
  {
    icon: UserCheck,
    name: "Own",
    detail:
      "Assign named incident owners with the authority and access to stop an agent fast.",
  },
];

export function IncidentReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to agent emergency-stop readiness. Phase one, Define: write what loss of control means and map which agents can move money or data. Phase two, Build: add throttle and suspension controls and preserve logs off the agent for investigation. Phase three, Drill: run scheduled shutdown drills so the switch is proven, not assumed. Phase four, Own: assign named incident owners with the authority and access to stop an agent fast."
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
          Define, build, drill, then own — so a misbehaving agent gets stopped in
          seconds, not meetings. ITECS builds and runs it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
