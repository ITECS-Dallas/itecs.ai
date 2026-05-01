"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.10),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(16,185,129,0.08),transparent_28%)]" />
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
              AI Consulting, Training, Security &amp; DevOps
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={fadeUp()}
              className="text-5xl md:text-7xl font-extralight tracking-normal leading-[1.05]"
            >
              Secure AI
              <br />
              <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
                Strategy, Training
              </span>
              <br />
              &amp; DevOps
            </motion.h1>

            {/* Zero-click block */}
            <motion.p
              variants={fadeUp(0.1)}
              className="mt-6 text-lg md:text-xl text-text-secondary font-light max-w-xl leading-relaxed"
            >
              <strong className="text-text-primary font-normal">ITECS helps Dallas businesses turn AI ideas into secure, managed systems</strong>{" "}
              with consulting, employee training, data protection, workflow automation, and production AI DevOps backed by 24 years of IT operations expertise.
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

          {/* Image-backed operations visual — 2/5 width on desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative h-[320px] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-surface shadow-2xl shadow-black/40 md:h-[420px] lg:h-[540px]">
              <Image
                src="/images/services/technology-desks.webp"
                alt="ITECS AI operations workstation with monitored deployment pipelines"
                fill
                priority
                className="object-cover object-center opacity-80"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/45 to-transparent" />
              <CircuitTrace variant="hero" className="absolute inset-0 opacity-45" />

              <div className="absolute inset-x-6 bottom-6 rounded-lg border border-white/10 bg-bg-void/80 p-5 backdrop-blur-xl">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-300">
                  Managed AI Operations
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    ["Assess", "roadmap"],
                    ["Protect", "data"],
                    ["Operate", "AI stack"],
                  ].map(([label, value]) => (
                    <div key={label} className="border-l border-brand-accent/40 pl-3">
                      <p className="text-sm text-text-primary">{label}</p>
                      <p className="mt-0.5 text-xs text-text-dim">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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
