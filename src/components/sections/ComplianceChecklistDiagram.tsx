"use client";

import { motion } from "framer-motion";
import { ClipboardList, Tags, FileText, ShieldCheck, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Inventory",
    detail:
      "List every place you use generative AI — chatbots, marketing content, images, video, and deepfakes.",
  },
  {
    icon: Tags,
    title: "Decide",
    detail:
      "Map each use to its Article 50 obligation: disclose, mark, label, or notify.",
  },
  {
    icon: FileText,
    title: "Document",
    detail:
      "Record each labeling decision and the technical marking method you rely on.",
  },
  {
    icon: ShieldCheck,
    title: "Govern",
    detail:
      "Assign ownership, review AI outputs, and keep it current as tools and rules change.",
  },
];

export function ComplianceChecklistDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="EU AI Act Article 50 compliance checklist in four steps. Step one, Inventory: list every place the business uses generative AI, including chatbots, marketing content, images, video, and deepfakes. Step two, Decide: map each use to its Article 50 obligation to disclose, mark, label, or notify. Step three, Document: record each labeling decision and the technical marking method used. Step four, Govern: assign ownership, review AI outputs, and keep the program current as tools and rules change."
      >
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <motion.li
                  className="flex h-full items-start gap-4 chamfer-md border border-[var(--card-line)] bg-card p-5"
                  whileHover={{
                    borderColor: "var(--itecs-blue)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-brand-subtle text-itecs-blue">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-itecs-blue text-white">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-itecs-blue">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {step.detail}
                    </p>
                  </div>
                </motion.li>
              </ScrollReveal>
            );
          })}
        </ol>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          A four-step path to Article 50 readiness — inventory, decide, document,
          and govern. ITECS runs this with your team.
        </figcaption>
      </figure>
    </section>
  );
}
