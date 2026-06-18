"use client";

import { X, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOPhilosophy } from "@/lib/constants";

interface Props {
  title: string;
  intro: string;
  philosophy: AISEOPhilosophy;
}

export function SEOPhilosophyContrast({ title, intro, philosophy }: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Philosophy" title={title} description={intro} />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Refuse column */}
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-6">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-rose-700 mb-5">
                What We Refuse
              </p>
              <ul className="space-y-4">
                {philosophy.refuse.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-md bg-rose-500/10 border border-rose-500/30 mt-0.5">
                      <X className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Do column */}
          <ScrollReveal delay={0.2}>
            <div className="h-full rounded-xl border border-brand-accent/30 bg-brand-accent/[0.04] p-6">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-itecs-blue mb-5">
                What We Do Instead
              </p>
              <ul className="space-y-4">
                {philosophy.doInstead.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-md bg-brand-accent/10 border border-brand-accent/30 mt-0.5">
                      <Check
                        className="h-3.5 w-3.5 text-brand-accent"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
