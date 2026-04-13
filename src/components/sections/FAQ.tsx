"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--border-subtle)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.question.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="text-text-primary font-light text-lg pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-text-dim" />
        </motion.span>
      </button>
      {/* Answer always in DOM for crawlers/SEO — animated via height, never unmounted */}
      <motion.div
        id={`faq-answer-${item.question.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
        role="region"
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-text-secondary leading-relaxed">
          {item.answer}
        </p>
      </motion.div>
    </div>
  );
}

export function FAQ({
  items,
  heading = "Frequently Asked Questions",
}: {
  items: readonly FAQItem[];
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="FAQ" title={heading} />
        </ScrollReveal>

        <div className="mt-12">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQAccordion
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
