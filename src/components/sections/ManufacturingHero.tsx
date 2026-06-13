"use client";

import { ArrowRight, Factory, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";

interface ManufacturingHeroProps {
  eyebrow: string;
  h1: string;
  heroSummary: string;
  longDescription: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  stats: readonly { value: string; label: string }[];
}

export function ManufacturingHero({
  eyebrow,
  h1,
  heroSummary,
  longDescription,
  primaryCta,
  primaryCtaHref,
  secondaryCta,
  secondaryCtaHref,
  stats,
}: ManufacturingHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <GridBackground opacity={0.035} />
      <GradientOrb color="cyan" size="lg" position={{ top: "8%", right: "12%" }} />
      <GradientOrb color="brand" size="sm" position={{ bottom: "12%", left: "6%" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.05em] text-brand-accent">
              <span className="inline-block h-px w-8 bg-brand-accent" />
              {eyebrow}
            </p>
            <h1 className="text-4xl font-extralight leading-[1.08] tracking-[-0.03em] md:text-6xl">
              {h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-text-primary md:text-xl">
              <strong>{heroSummary}</strong>
            </p>
            <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-text-secondary">
              {longDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={primaryCtaHref}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {primaryCta}
              </Button>
              <Button href={secondaryCtaHref} variant="secondary" size="lg">
                {secondaryCta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 shadow-2xl shadow-violet-950/20 backdrop-blur">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                    <Factory className="h-5 w-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Manufacturing signal map
                    </p>
                    <p className="text-xs uppercase tracking-[0.05em] text-text-dim">
                      Finance + operations + IT
                    </p>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 text-brand-accent" />
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <p className="font-mono text-2xl font-thin text-brand-accent">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
