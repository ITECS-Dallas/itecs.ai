"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";

interface PainPointProps {
  /** Large stat headline — e.g. "$3,000+" */
  stat: string;
  /** What the stat measures — e.g. "lost per month on missed calls" */
  statLabel: string;
  /** H2 heading — address the bleeding neck */
  heading: string;
  /** 1-2 short paragraphs validating the frustration */
  paragraphs: string[];
  /** Optional specific SMB scenario for information gain */
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
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb
        color="purple"
        size="md"
        position={{ top: "20%", right: "5%" }}
      />

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
              <span className="block text-6xl md:text-8xl font-extralight tracking-tight bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
                {stat}
              </span>
              <span className="block mt-2 text-lg text-text-secondary font-light">
                {statLabel}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Pain point heading and copy */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary mb-8">
            {heading}
          </h2>
        </ScrollReveal>

        {paragraphs.map((p, i) => (
          <ScrollReveal key={i} delay={0.15 + i * 0.05}>
            <p className="text-text-secondary leading-relaxed mb-4 max-w-3xl">
              {p}
            </p>
          </ScrollReveal>
        ))}

        {/* Specific SMB scenario — information gain */}
        {scenario && (
          <ScrollReveal delay={0.25}>
            <div className="mt-8 p-6 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50">
              <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-3">
                Real-World Example
              </p>
              <p className="text-text-secondary leading-relaxed">
                <strong className="text-text-primary">{scenario.business}:</strong>{" "}
                {scenario.problem}
              </p>
              <p className="mt-3 text-text-secondary leading-relaxed">
                <strong className="text-brand-accent">Result:</strong>{" "}
                {scenario.result}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
