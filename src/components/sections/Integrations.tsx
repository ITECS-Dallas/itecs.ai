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
          <h2 className="text-2xl font-semibold text-ink mb-6">
            {heading}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <li
                key={tool}
                className="chamfer-sm px-4 py-2 border border-[var(--card-line)] bg-card text-sm text-ink-body hover:border-itecs-blue hover:text-itecs-blue transition-colors"
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
