"use client";

import { BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOGlossaryTerm } from "@/lib/constants";

interface Props {
  title: string;
  intro: string;
  terms: AISEOGlossaryTerm[];
}

export function AISEOGlossary({ title, intro, terms }: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Glossary" title={title} description={intro} />
        </ScrollReveal>

        <dl className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term, i) => (
            <ScrollReveal key={term.term} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-6 transition-colors hover:border-brand-accent/40">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg bg-brand-accent/10">
                    <BookOpen
                      className="h-4 w-4 text-brand-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <dt className="text-base font-medium text-text-primary">
                      {term.term}
                    </dt>
                    <dd className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {term.definition}
                    </dd>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
