"use client";

import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Structural";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface FAQItem {
  question: string;
  answer: ReactNode;
  // Plain-text mirror used for FAQPage schema when `answer` is JSX. Required
  // whenever `answer` is not a plain string, so structured data stays parseable.
  schemaAnswer?: string;
}

export function FAQ({
  items,
  heading = "Frequently Asked Questions",
}: {
  items: readonly FAQItem[];
  heading?: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="FAQ" title={heading} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Accordion
            className="mt-12"
            defaultOpenId={null}
            items={items.map((item, index) => ({
              id: `faq-${index}`,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
