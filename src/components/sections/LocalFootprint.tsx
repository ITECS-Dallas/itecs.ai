"use client";

import { MapPin } from "lucide-react";
import { DFW_SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function LocalFootprint() {
  return (
    <section className="py-16 md:py-20 border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-brand-accent" aria-hidden="true" />
              <p className="text-sm font-medium tracking-wide uppercase text-brand-accent">
                Serving the DFW Metroplex
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-text-primary">
              AI Consulting Across Dallas–Fort Worth
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl">
              Our office is in {SITE_CONFIG.address.city}, and we work with businesses across the DFW metro. On-site consultations, remote deployments, and hybrid engagements available.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {DFW_SERVICE_AREAS.map((city) => (
                <span
                  key={city}
                  className="px-4 py-2 text-sm rounded-full border border-[var(--border-subtle)] text-text-secondary hover:border-brand-accent/40 hover:text-text-primary transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
