"use client";

import { motion } from "framer-motion";
import { GridBackground } from "@/components/effects/GridBackground";
import { HeroGlyph } from "@/components/ui/HeroGlyph";

export function AboutHero() {
  return (
    <section className="relative pt-8 pb-24 md:pb-32 overflow-hidden">
      <GridBackground opacity={0.03} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="eyebrow mb-6">About ITECS</p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.025em] leading-[1.05] text-ink">
                24 Years Serving Dallas Businesses.
                <br />
                <span className="text-itecs-blue">Now Bringing Them AI.</span>
              </h1>
            </motion.div>

            {/* GEO answer-first summary block */}
            <motion.p
              className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <strong className="text-text-primary font-normal">
                ITECS is a Dallas-based IT services company founded in 2002 that
                now delivers practical AI consulting, automation, and custom AI agent
                development for growth-stage and mid-market organizations.
              </strong>{" "}
              With 24+ years of managed IT operations, 500+ endpoints under
              management, and a 92% client retention rate, ITECS AI builds on a
              security-first infrastructure foundation that most AI startups
              cannot match.
            </motion.p>

            {/* Directional links */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#timeline"
                className="inline-flex min-h-11 items-center text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                See our 24-year journey &darr;
              </a>
              <a
                href="/services"
                className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Explore AI services for your business &rarr;
              </a>
            </motion.div>
          </div>

          {/* Decorative intelligence mark — fills the right column on desktop */}
          <motion.div
            className="hidden justify-center lg:flex"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroGlyph size={420} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
