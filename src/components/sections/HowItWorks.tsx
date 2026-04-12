"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Step {
  step: string;
  description: string;
}

export function HowItWorks({
  steps,
  heading = "How It Works",
}: {
  steps: readonly Step[];
  heading?: string;
}) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Our Process" title={heading} />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center p-6">
                {/* Step number */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full border border-[var(--border-active)] bg-brand-accent/10 mb-6">
                  <span className="text-3xl font-thin text-brand-accent">
                    {i + 1}
                  </span>
                </div>

                {/* Connector line (between steps, hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-[var(--border-active)] to-transparent" />
                )}

                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {item.step}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
