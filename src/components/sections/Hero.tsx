"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { AIOperationsConsole } from "@/components/ui/AIOperationsConsole";
import { GridBackground } from "@/components/effects/GridBackground";
import { CursorGlow } from "@/components/effects/CursorGlow";

const fadeUp = (delay = 0) => ({
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
});

const fadeLeft = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28 md:py-32">
      {/* Background layers */}
      <div className="absolute inset-0">
        <GridBackground opacity={0.04} />
        <div className="absolute inset-0 bg-[image:var(--glow-hero)]" />
        <CursorGlow />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          {/* Text - 3/5 width on desktop */}
          <motion.div
            className="lg:col-span-3"
            initial={false}
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeLeft}
              className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-6 flex items-center gap-2"
            >
              <span className="inline-block w-8 h-px bg-brand-accent" />
              DALLAS MANAGED INTELLIGENCE · SINCE 2002
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={fadeUp()}
              className="text-[length:var(--fs-display-xl)] font-semibold tracking-normal leading-[1.04]"
            >
              Managed Intelligence for
              <br />
              <span className="bg-gradient-to-r from-brand to-cyan bg-clip-text text-transparent">
                Secure AI Operations
              </span>
            </motion.h1>

            {/* Zero-click block */}
            <motion.p
              variants={fadeUp(0.1)}
              className="mt-6 text-[length:var(--fs-body-l)] text-text-secondary font-normal max-w-xl leading-relaxed"
            >
              <strong className="text-text-primary font-medium">
                ITECS helps 10-300 employee organizations turn AI adoption into
                governed, monitored operating systems.
              </strong>{" "}
              We combine strategy, training, automation, security, and AI
              DevOps on top of 24 years of managed IT operations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.2)}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Book an AI Readiness Assessment
              </Button>
              <Button href="#managed-ai" variant="secondary" size="lg">
                Explore Managed AI
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp(0.25)}
              aria-label="Approved ITECS proof points"
              className="mt-8 grid max-w-2xl grid-cols-3 gap-2 rounded-lg border border-[var(--border-default)] bg-bg-surface/70 p-2 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-bg-elevated px-3 py-3 text-center"
                >
                  <p className="font-mono text-lg font-semibold leading-none text-brand md:text-2xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-medium uppercase leading-tight text-text-tertiary md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Operations console visual - 2/5 width on desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AIOperationsConsole />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-text-dim animate-bounce-subtle" />
      </motion.div>
    </section>
  );
}
