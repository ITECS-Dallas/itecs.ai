"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function InsightsHero() {
  return (
    <section className="relative pt-24 pb-16 md:pb-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <GridBackground opacity={0.04} />
        <GradientOrb
          color="cyan"
          size="lg"
          position={{ top: "10%", right: "5%" }}
        />
        <GradientOrb
          color="purple"
          size="md"
          position={{ bottom: "15%", left: "3%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
          ]}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeLeft}
            className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-6 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Practical AI Guides
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp()}
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-4xl"
          >
            AI Insights for{" "}
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Dallas Businesses
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp(0.1)}
            className="mt-6 text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed"
          >
            Actionable guides on using AI to save time, cut costs, and grow your
            business. Written by IT operations veterans for business owners with
            10–300 employees — no jargon, no hype.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp(0.2)}
            className="mt-10 flex flex-wrap gap-8 md:gap-12"
          >
            <div>
              <span className="block text-3xl md:text-4xl font-extralight tracking-tight text-brand-accent">
                24+
              </span>
              <span className="text-sm text-text-dim">Years IT Experience</span>
            </div>
            <div className="w-px bg-[var(--border-subtle)] hidden md:block" />
            <div>
              <span className="block text-3xl md:text-4xl font-extralight tracking-tight text-text-primary">
                3
              </span>
              <span className="text-sm text-text-dim">In-Depth Guides</span>
            </div>
            <div className="w-px bg-[var(--border-subtle)] hidden md:block" />
            <div>
              <span className="block text-3xl md:text-4xl font-extralight tracking-tight text-text-primary">
                5 min
              </span>
              <span className="text-sm text-text-dim">Average Read Time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
