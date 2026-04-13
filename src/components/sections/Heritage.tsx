"use client";

import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";
import { HOMEPAGE_HERITAGE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Heritage() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={HOMEPAGE_HERITAGE.eyebrow}
            title={HOMEPAGE_HERITAGE.title}
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Description — 3/5 width */}
          <ScrollReveal className="lg:col-span-3">
            <div className="relative rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-accent/10">
                  <Shield className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium tracking-wide uppercase text-brand-accent">
                  Cybersecurity Heritage
                </p>
              </div>
              <p className="text-text-secondary leading-relaxed">
                {HOMEPAGE_HERITAGE.description}
              </p>
              <a
                href={HOMEPAGE_HERITAGE.parentLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:text-brand-accent/80 transition-colors"
              >
                {HOMEPAGE_HERITAGE.parentLink.text}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          {/* Stats grid — 2/5 width */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {HOMEPAGE_HERITAGE.stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <motion.div
                  className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5 text-center"
                  whileHover={{ borderColor: "var(--border-active)" }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-2xl md:text-3xl font-light text-brand-accent tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-text-dim uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
