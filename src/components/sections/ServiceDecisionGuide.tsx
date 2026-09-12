import Link from "next/link";
import { SERVICE_DECISION_GUIDES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServiceDecisionGuide({
  service,
}: {
  service: keyof typeof SERVICE_DECISION_GUIDES;
}) {
  const guide = SERVICE_DECISION_GUIDES[service];

  return (
    <section id={guide.id} data-dfw-decision className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={guide.eyebrow}
          title={guide.title}
          description={guide.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {guide.options.map((option) => (
            <article
              key={option.href}
              className="chamfer-md flex min-w-0 flex-col border border-[var(--card-line)] bg-card p-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink">
                {option.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-ink-body">
                {option.description}
              </p>
              <Link
                href={option.href}
                className="mt-5 inline-flex min-h-11 items-center py-3 font-medium text-itecs-blue underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-itecs-blue"
              >
                {option.linkLabel}
              </Link>
            </article>
          ))}
        </div>
        <div className="chamfer-md mt-6 border-l-2 border-itecs-blue bg-canvas-sunken p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">
            {guide.preparationTitle}
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-body">
            {guide.preparation}
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center py-3 font-medium text-itecs-blue underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-itecs-blue"
          >
            {guide.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
