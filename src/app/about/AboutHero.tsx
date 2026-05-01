"use client";

import { motion } from "framer-motion";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";

export function AboutHero() {
  return (
    <section className="relative pt-8 pb-24 md:pb-32 overflow-hidden">
      <GridBackground opacity={0.03} />
      <GradientOrb
        color="cyan"
        size="lg"
        position={{ top: "10%", right: "5%" }}
      />
      <GradientOrb
        color="purple"
        size="sm"
        position={{ bottom: "20%", left: "10%" }}
      />

      {/* Circuit trace decorative element */}
      <div className="absolute top-12 right-0 w-48 md:w-72 h-[500px] opacity-20">
        <CircuitTrace variant="hero" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[-0.03em] leading-[1.08] max-w-4xl">
            24 Years Serving Dallas Businesses.
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Now Bringing Them AI.
            </span>
          </h1>
        </motion.div>

        {/* GEO answer-first summary block */}
        <motion.p
          className="mt-8 text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <strong className="text-text-primary font-normal">
            ITECS is a Dallas-based IT services company founded in 2002 that
            now delivers practical AI consulting, automation, and custom AI agent
            development for small and mid-sized businesses.
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
            className="text-brand-accent hover:text-brand-accent-bright transition-colors"
          >
            See our 24-year journey &darr;
          </a>
          <a
            href="/services"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Explore AI services for your business &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
