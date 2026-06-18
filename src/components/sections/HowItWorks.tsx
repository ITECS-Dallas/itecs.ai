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
    <section className="py-24 md:py-32 bg-canvas-sunken">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold tracking-[-0.02em] text-ink mb-12">
            {heading}
          </h2>
        </ScrollReveal>

        {/* Strict <ol> for GEO extraction — AI models extract numbered workflows */}
        <ScrollReveal delay={0.1}>
          <ol className="space-y-6 list-decimal [&>li::marker]:text-transparent">
            {steps.map((item, i) => (
              <li
                key={i}
                value={i + 1}
                className="chamfer-md flex items-start gap-6 p-6 border border-[var(--card-line)] bg-card"
              >
                <span className="hex flex items-center justify-center shrink-0 w-12 h-12 bg-itecs-blue font-mono text-lg font-medium text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink mb-2">
                    {item.step}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
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
