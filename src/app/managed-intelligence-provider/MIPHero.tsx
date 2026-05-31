"use client";

import { motion } from "framer-motion";
import { GridBackground } from "@/components/effects/GridBackground";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MIP_PAGE_HERO } from "@/lib/constants";

export function MIPHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 md:pb-32">
      <GridBackground opacity={0.025} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_48%_at_72%_22%,var(--brand-subtle)_0%,transparent_72%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.48fr)] lg:items-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 flex items-center gap-3 font-mono text-[length:var(--fs-eyebrow)] font-semibold uppercase tracking-normal text-brand-accent">
              <span className="inline-block h-px w-8 bg-brand-accent" />
              {MIP_PAGE_HERO.eyebrow}
            </p>
            <h1 className="max-w-5xl text-[length:var(--fs-display-xl)] font-semibold leading-[var(--lh-display)] tracking-normal text-text-primary">
              {MIP_PAGE_HERO.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-semibold leading-relaxed text-text-primary md:text-xl">
              {MIP_PAGE_HERO.subhead}
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              {MIP_PAGE_HERO.supporting}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={MIP_PAGE_HERO.primaryCta.href}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {MIP_PAGE_HERO.primaryCta.label}
              </Button>
              <Button
                href={MIP_PAGE_HERO.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {MIP_PAGE_HERO.secondaryCta.label}
              </Button>
            </div>
          </motion.div>

          <aside
            aria-label="Managed Intelligence operating layer"
            className="rounded-lg border border-[var(--border-default)] bg-bg-surface/80 p-5 shadow-e2 [box-shadow:var(--elev-2-inset),var(--elev-2)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-accent-cyan">
                  MIP operating layer
                </p>
                <h2 className="mt-2 text-lg font-semibold text-text-primary">
                  Infrastructure to intelligence.
                </h2>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-brand">
                <Layers3 aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {MIP_PAGE_HERO.operatingLayer.map((layer) => (
                <div
                  key={layer.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-bg-base p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        {layer.label}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        {layer.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {MIP_PAGE_HERO.proof.map((proof) => (
                <div
                  key={proof.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-bg-sunken p-4"
                >
                  <p className="font-mono text-2xl font-semibold text-brand">
                    {proof.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-text-tertiary">
                    {proof.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
