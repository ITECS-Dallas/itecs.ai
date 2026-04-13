"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Building2, Target } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientOrb } from "@/components/effects/GradientOrb";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Shield,
  Eye,
  Building2,
  Target,
};

interface ValueItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export function AboutValues({ values }: { values: readonly ValueItem[] }) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb
        color="purple"
        size="md"
        position={{ top: "30%", right: "0%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Principles That Shape Every Engagement"
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => {
            const Icon = iconMap[value.icon] ?? Shield;
            return (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  className="group relative p-8 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 h-full"
                  whileHover={{
                    borderColor: "var(--border-active)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6,182,212,0.06), transparent 40%)",
                  }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10 border border-brand-accent/20 mb-6">
                      <Icon
                        className="h-6 w-6 text-brand-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-light tracking-[-0.01em] text-text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Authority link — security posture */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 text-center text-sm">
            <span className="text-text-dim">
              Our security practices align with the{" "}
              <a
                href="https://www.nist.gov/cyberframework"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-[var(--border-subtle)]"
              >
                NIST Cybersecurity Framework
              </a>
              .
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
