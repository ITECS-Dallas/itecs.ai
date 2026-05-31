import { ArrowUpRight, Award, Newspaper, Star } from "lucide-react";
import { THIRD_PARTY_VALIDATION } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const itemIcons = [Star, Star, Newspaper, Award, Award] as const;

export function ThirdPartyValidation() {
  const items = [...THIRD_PARTY_VALIDATION.items];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-[var(--border-subtle)] bg-bg-base py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={THIRD_PARTY_VALIDATION.eyebrow}
          title={THIRD_PARTY_VALIDATION.title}
          description={THIRD_PARTY_VALIDATION.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item, index) => {
            const Icon = itemIcons[index] ?? Award;

            return (
              <a
                key={`${item.label}-${item.title}`}
                href={item.sourceHref}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-[var(--border-default)] bg-bg-surface p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)] transition-[border-color,background-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                aria-label={`${item.title}: ${item.sourceLabel}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-brand">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-text-tertiary transition-colors duration-[var(--dur-base)] group-hover:text-accent-cyan"
                  />
                </div>
                <p className="mt-5 font-mono text-2xl font-semibold text-text-primary">
                  {item.label}
                </p>
                <h3 className="mt-2 text-base font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.detail}
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-hover">
                  {item.sourceLabel}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
