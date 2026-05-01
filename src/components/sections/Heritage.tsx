"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <ScrollReveal direction="left">
            <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-surface">
              <Image
                src="/images/team/team-office.webp"
                alt="ITECS team at the Plano office supporting Dallas businesses"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void/80 via-bg-void/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-brand-accent">
                  Plano HQ, Dallas-Fort Worth support
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
                  The AI division is backed by the same local engineers,
                  security process, and infrastructure discipline that power
                  ITECS managed IT.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal direction="right">
              <div className="relative rounded-lg border border-[var(--border-subtle)] bg-bg-surface p-8">
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

            <div className="grid grid-cols-2 gap-4">
              {HOMEPAGE_HERITAGE.stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.08}>
                  <motion.div
                    className="rounded-lg border border-[var(--border-subtle)] bg-bg-surface p-5 text-center"
                    whileHover={{ borderColor: "var(--border-active)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-2xl md:text-3xl font-light text-brand-accent tracking-normal">
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
      </div>
    </section>
  );
}
