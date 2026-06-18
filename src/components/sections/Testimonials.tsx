import { ArrowUpRight, Quote } from "lucide-react";
import { HOMEPAGE_TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const testimonials = HOMEPAGE_TESTIMONIALS.testimonials.filter(
    (testimonial) => testimonial.name && testimonial.company,
  );

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={HOMEPAGE_TESTIMONIALS.eyebrow}
          title={HOMEPAGE_TESTIMONIALS.title}
          description={HOMEPAGE_TESTIMONIALS.description}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={`${testimonial.company}-${testimonial.sourceLabel}`}
              className="chamfer-md flex h-full flex-col border border-[var(--card-line)] bg-card p-6"
            >
              <Quote aria-hidden="true" className="h-7 w-7 text-brand" />

              <blockquote className="mt-6 flex-1">
                <p className="text-lg font-semibold leading-relaxed text-text-primary">
                  <q>{testimonial.quote}</q>
                </p>
              </blockquote>

              <figcaption className="mt-7 border-t border-[var(--border-subtle)] pt-5">
                {"name" in testimonial && testimonial.name ? (
                  <p className="font-semibold text-text-primary">
                    {testimonial.name}
                  </p>
                ) : null}
                <p className="mt-1 text-sm text-text-secondary">
                  {testimonial.title}, {testimonial.company}
                </p>
                <a
                  href={testimonial.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-hover transition-colors duration-[var(--dur-base)] hover:text-itecs-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  aria-label={`Open ${testimonial.sourceLabel} on itecsonline.com`}
                >
                  {testimonial.sourceLabel}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
