import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <SectionHeading eyebrow="FAQ" title={heading} />

        <div className="mt-12 rounded-lg border border-[var(--border-default)] bg-bg-surface">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-[var(--border-subtle)] open:bg-bg-elevated/40 [&:not(:first-child)]:border-t"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-text-primary transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-inset [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
