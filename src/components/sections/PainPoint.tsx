"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface PainPointProps {
  /** Large stat headline — e.g. "$3,000+" */
  stat: string;
  /** What the stat measures — e.g. "lost per month on missed calls" */
  statLabel: string;
  /** H2 heading — address the bleeding neck */
  heading: string;
  /** 1-2 short paragraphs validating the frustration */
  paragraphs: string[];
  /** Optional specific business scenario for information gain */
  scenario?: {
    business: string;
    problem: string;
    result: string;
  };
}

export function PainPoint({
  stat,
  statLabel,
  heading,
  paragraphs,
  scenario,
}: PainPointProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-canvas-sunken">
      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8">
        {/* Dramatic stat callout */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="block font-display text-6xl md:text-8xl font-semibold tracking-[-0.02em] text-itecs-blue">
                {stat}
              </span>
              <span className="block mt-2 text-lg text-ink-body">
                {statLabel}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Pain point heading and copy */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink mb-8">
            {heading}
          </h2>
        </ScrollReveal>

        {paragraphs.map((p, i) => (
          <ScrollReveal key={i} delay={0.15 + i * 0.05}>
            <p className="text-ink-body leading-relaxed mb-4 max-w-3xl">
              {p}
            </p>
          </ScrollReveal>
        ))}

        {/* Specific business scenario — information gain */}
        {scenario && (
          <ScrollReveal delay={0.25}>
            <div className="chamfer-md mt-8 p-6 border-l-2 border-itecs-blue bg-card">
              <p className="eyebrow mb-3">Real-World Example</p>
              <p className="text-ink-body leading-relaxed">
                <strong className="text-ink">{scenario.business}:</strong>{" "}
                {scenario.problem}
              </p>
              <p className="mt-3 text-ink-body leading-relaxed">
                <strong className="text-itecs-blue">Result:</strong>{" "}
                {scenario.result}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
