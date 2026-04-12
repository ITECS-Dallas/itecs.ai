"use client";

import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServiceFeatures({
  features,
  title = "What We Deliver",
}: {
  features: string[];
  title?: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Capabilities" title={title} />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-[var(--border-subtle)] bg-bg-surface/50">
                <Check className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
                <span className="text-text-secondary">{feature}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
