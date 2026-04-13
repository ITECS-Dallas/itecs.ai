"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";

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
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary mb-12">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Strict <ol> for GEO extraction — AI models extract numbered workflows */}
        <ScrollReveal delay={0.1}>
          <ol className="space-y-8 list-decimal [&>li::marker]:text-transparent">
            {steps.map((item, i) => (
              <li
                key={i}
                value={i + 1}
                className="flex items-start gap-6 p-6 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50"
              >
                <span className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border border-[var(--border-active)] bg-brand-accent/10 text-2xl font-thin text-brand-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {item.step}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
