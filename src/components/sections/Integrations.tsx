"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Integrations({
  tools,
  heading = "Tools & Integrations",
}: {
  tools: readonly string[];
  heading?: string;
}) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <h2 className="text-2xl font-light text-text-primary mb-6">
            {heading}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <li
                key={tool}
                className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-bg-surface/50 text-sm text-text-secondary hover:border-[var(--border-active)] hover:text-brand-accent transition-colors"
              >
                {tool}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
