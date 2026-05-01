"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES, HOMEPAGE_SERVICE_BLURBS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ArrowRight } from "lucide-react";

// Organic stagger delays (non-uniform for anti-template feel)
const staggers = [0, 0.08, 0.18, 0.12, 0.22, 0.1, 0.2, 0.14, 0.24];
const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

// Index blurbs by slug for O(1) lookup
const blurbsBySlug = Object.fromEntries(
  HOMEPAGE_SERVICE_BLURBS.map((b) => [b.slug, b])
);

export function ServicesGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Do"
            title="9 AI Services That Move From Strategy to Operations"
            description="Consulting, training, security, DevOps, automation, and custom AI systems for businesses that need useful AI without losing control of data or uptime."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const IconComponent = iconMap[service.icon] ?? LucideIcons.Cpu;
            const blurb = blurbsBySlug[service.slug];

            return (
              <ScrollReveal key={service.slug} delay={staggers[i] ?? 0}>
                <Card href={service.href} className="h-full flex flex-col">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10">
                    <IconComponent className="h-6 w-6 text-brand-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {service.shortTitle}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {blurb ? (
                      <>
                        {blurb.blurb}
                        <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2">
                          {blurb.anchorText}
                        </span>
                        {blurb.afterAnchor}
                      </>
                    ) : (
                      <>{service.longDescription.slice(0, 150)}...</>
                    )}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-brand-accent group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
