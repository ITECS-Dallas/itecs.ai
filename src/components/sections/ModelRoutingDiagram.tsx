"use client";

import { motion } from "framer-motion";
import { ListFilter, GitBranch, ShieldHalf, UserCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: ListFilter,
    name: "Classify",
    detail:
      "Sort the task: triage a codebase, confirm a bug, or generate a fix.",
  },
  {
    icon: GitBranch,
    name: "Match",
    detail:
      "Route to the right model class: small and local, frontier, or agentic.",
  },
  {
    icon: ShieldHalf,
    name: "Sandbox",
    detail:
      "Isolate any model that runs exploit code or can touch production.",
  },
  {
    icon: UserCheck,
    name: "Review",
    detail:
      "Put a human on every patch before it ships, and log what ran.",
  },
];

export function ModelRoutingDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to routing security AI work across models. Phase one, Classify: sort the task into triaging a codebase, confirming a bug, or generating a fix. Phase two, Match: route to the right model class, whether small and local, frontier, or agentic. Phase three, Sandbox: isolate any model that runs exploit code or can touch production. Phase four, Review: put a human on every patch before it ships and log what ran."
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
          Classify the task, match the model, sandbox what runs exploits, then
          review every fix — so the right model does each job safely. ITECS runs
          it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
