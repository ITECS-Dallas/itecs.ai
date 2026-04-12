"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { CursorGlow } from "@/components/effects/CursorGlow";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
});

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <GridBackground opacity={0.04} />
        <GradientOrb
          color="cyan"
          size="lg"
          position={{ top: "15%", right: "5%" }}
        />
        <GradientOrb
          color="purple"
          size="md"
          position={{ bottom: "25%", left: "3%" }}
        />
        <GradientOrb
          color="mixed"
          size="sm"
          position={{ top: "60%", right: "30%" }}
        />
        <CursorGlow />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text — 3/5 width on desktop */}
          <motion.div
            className="lg:col-span-3"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeLeft}
              className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-6 flex items-center gap-2"
            >
              <span className="inline-block w-8 h-px bg-brand-accent" />
              Practical AI for Dallas Businesses
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={fadeUp()}
              className="text-5xl md:text-7xl font-extralight tracking-[-0.03em] leading-[1.1]"
            >
              Save Time. Cut Costs.
              <br />
              <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
                Automate with AI.
              </span>
            </motion.h1>

            {/* ROI metric */}
            <motion.p
              variants={fadeUp(0.1)}
              className="mt-6 text-lg md:text-xl text-text-secondary font-light max-w-xl leading-relaxed"
            >
              We help Dallas businesses with 10–300 employees automate repetitive
              work, build custom ChatGPTs, and deploy AI tools that pay for
              themselves — backed by 22 years of IT operations expertise.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.2)}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Schedule Consultation
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* Circuit trace — 2/5 width on desktop */}
          <div className="hidden lg:block lg:col-span-2">
            <CircuitTrace variant="hero" className="h-[500px]" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-text-dim animate-bounce-subtle" />
      </motion.div>
    </section>
  );
}
