"use client";

import { Atom, Layers, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOMechanicStep } from "@/lib/constants";

const stepIcons = [Atom, Layers, Sparkles];

interface Props {
  title: string;
  intro: string;
  steps: AISEOMechanicStep[];
}

export function AISEOMethodology({ title, intro, steps }: Props) {
  return (
    <section className="relative py-24 md:py-32 bg-bg-surface overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="How It Works" title={title} description={intro} />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="relative h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-6 overflow-hidden">
                  {/* Step number watermark */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 -right-2 text-[120px] font-thin text-brand-accent/5 leading-none select-none"
                  >
                    {step.number}
                  </span>

                  <div className="relative">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10 border border-brand-accent/20">
                      <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-medium tracking-[0.08em] uppercase text-brand-accent mb-2">
                      Step {step.number}
                    </p>
                    <h3 className="text-xl font-medium text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
