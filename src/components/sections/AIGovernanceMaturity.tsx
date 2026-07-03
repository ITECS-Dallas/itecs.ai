"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface Stage {
  name: string;
  detail: string;
  /** filled danger dots out of 4 — higher = more risk */
  risk: number;
  /** filled brand dots out of 4 — higher = more ROI */
  roi: number;
}

const stages: Stage[] = [
  {
    name: "Shadow AI",
    detail: "Staff adopt tools on their own. Leadership has no visibility.",
    risk: 4,
    roi: 0,
  },
  {
    name: "Aware",
    detail: "You know AI is in use, but there's no policy or training yet.",
    risk: 3,
    roi: 1,
  },
  {
    name: "Governed",
    detail: "Policy, approved tools, and guardrails are in place.",
    risk: 2,
    roi: 3,
  },
  {
    name: "Optimized",
    detail: "Trained staff, measured ROI, AI as a competitive edge.",
    risk: 1,
    roi: 4,
  },
];

function Meter({
  level,
  tone,
  label,
}: {
  level: number;
  tone: "risk" | "roi";
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-9 shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-sm ${
              i < level
                ? tone === "risk"
                  ? "bg-danger"
                  : "bg-itecs-blue-bright"
                : "bg-[var(--card-line)]"
            }`}
          />
        ))}
      </span>
    </div>
  );
}

export function AIGovernanceMaturity() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="AI governance maturity ladder with four stages. Stage one, Shadow AI: staff adopt tools alone with no visibility — risk is highest and ROI is unmanaged. Stage two, Aware: AI use is known but there is no policy or training — risk stays high, ROI is low. Stage three, Governed: policy, approved tools, and guardrails are in place — risk drops and ROI grows. Stage four, Optimized: trained staff and measured ROI make AI a competitive edge — risk is managed and ROI is maximized. ITECS moves a business from Shadow AI to Optimized."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <ScrollReveal key={stage.name} delay={i * 0.1}>
              <motion.div
                className="relative flex h-full flex-col chamfer-md border border-[var(--card-line)] bg-card p-5"
                whileHover={{
                  borderColor: "var(--itecs-steel)",
                  transition: { duration: 0.2 },
                }}
              >
                {/* growing accent — wider as maturity increases */}
                <span
                  className="absolute left-0 top-0 h-0.5 bg-itecs-blue-bright"
                  style={{ width: `${25 + i * 25}%` }}
                  aria-hidden="true"
                />
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-xs text-itecs-blue">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {stage.name}
                  </h3>
                </div>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {stage.detail}
                </p>
                <div className="space-y-2 border-t border-[var(--card-line)] pt-3">
                  <Meter level={stage.risk} tone="risk" label="Risk" />
                  <Meter level={stage.roi} tone="roi" label="ROI" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          The AI governance maturity ladder. ITECS moves your business from
          Shadow AI to Optimized — risk falling and ROI rising at every step.
        </figcaption>
      </figure>
    </section>
  );
}
