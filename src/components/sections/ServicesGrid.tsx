"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SERVICES,
  HOMEPAGE_SERVICE_BLURBS,
  SITE_CONFIG,
  AI_SEO_OVERVIEW,
} from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ArrowRight, Search, Server } from "lucide-react";

// Organic stagger delays (non-uniform for anti-template feel)
const staggers = [0, 0.08, 0.18, 0.12, 0.22, 0.1, 0.2, 0.14, 0.24];
const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

// Index blurbs by slug for O(1) lookup
const blurbsBySlug = Object.fromEntries(
  HOMEPAGE_SERVICE_BLURBS.map((b) => [b.slug, b])
);

export function ServicesGrid({ showSisterSiteCard = false }: { showSisterSiteCard?: boolean } = {}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="What We Do"
            title="10 AI Services That Move From Strategy to Operations"
            description="Consulting, training, security, DevOps, automation, custom AI systems, and AI-optimized SEO for businesses that need useful AI without losing control of data or uptime."
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

          {/* AI-Optimized SEO — 10th service, distinct pricing-tier offering */}
          <ScrollReveal delay={0.26}>
            <Card href={AI_SEO_OVERVIEW.href} className="h-full flex flex-col">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10">
                <Search className="h-6 w-6 text-brand-accent" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                AI-Optimized SEO
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                Generative Engine Optimization — get cited by ChatGPT, Google AI
                Overviews, Claude, and Perplexity, not just blue links.{" "}
                <span className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2">
                  Three pricing tiers
                </span>{" "}
                from one-time Foundation work to premium Velocity retainer.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm text-brand-accent group-hover:gap-2 transition-all">
                Explore AI-SEO tiers
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          </ScrollReveal>

          {/* Sister-site referral — visually distinct from AI services */}
          {showSisterSiteCard && (
          <ScrollReveal delay={0.28}>
            <a
              href={SITE_CONFIG.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit itecsonline.com for managed IT services, cybersecurity, and managed cloud"
              className="group relative block h-full rounded-xl border border-dashed border-brand/40 bg-brand/[0.04] p-6 transition-all duration-300 hover:border-brand/70 hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--brand-subtle)] flex flex-col"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand/10">
                <Server className="h-6 w-6 text-brand" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-brand mb-2">
                Sister Site
              </p>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Looking for Managed IT, Cybersecurity, or Cloud?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">
                ITECS AI focuses on AI consulting and automation. For day-to-day IT
                support, Microsoft 365, cybersecurity monitoring, Azure, and managed
                cloud, visit our main site.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm text-brand group-hover:gap-2 transition-all">
                Visit itecsonline.com
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
