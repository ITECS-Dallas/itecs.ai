"use client";

import { motion } from "framer-motion";
import { GridBackground } from "@/components/effects/GridBackground";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { INSIGHTS } from "@/lib/constants";

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
          <motion.p variants={fadeLeft} className="eyebrow mb-6">
            Practical AI Guides
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp()}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl text-ink"
          >
            AI Insights for{" "}
            <span className="text-itecs-blue">Dallas Businesses</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp(0.1)}
            className="mt-6 text-lg md:text-xl text-ink-body max-w-2xl leading-relaxed"
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
              <span className="block font-display text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-itecs-blue">
                24+
              </span>
              <span className="text-sm text-ink-muted">Years IT Experience</span>
            </div>
            <div className="w-px bg-[var(--card-line)] hidden md:block" />
            <div>
              <span className="block font-display text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-ink">
                {INSIGHTS.length}
              </span>
              <span className="text-sm text-ink-muted">In-Depth Guides</span>
            </div>
            <div className="w-px bg-[var(--card-line)] hidden md:block" />
            <div>
              <span className="block font-display text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-ink">
                5 min
              </span>
              <span className="text-sm text-ink-muted">Average Read Time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
