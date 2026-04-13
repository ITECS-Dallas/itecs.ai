"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export function MIPHero() {
  return (
    <section className="relative pt-8 pb-24 md:pb-32 overflow-hidden">
      <GridBackground opacity={0.03} />
      <GradientOrb
        color="cyan"
        size="lg"
        position={{ top: "5%", right: "5%" }}
      />
      <GradientOrb
        color="purple"
        size="md"
        position={{ bottom: "15%", left: "10%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            Managed Intelligence Provider
          </p>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-4xl">
            Dallas Managed Intelligence Provider — Managed AI Services for SMBs
          </h1>

          {/* GEO zero-click answer block */}
          <p className="mt-6 text-lg md:text-xl text-text-primary font-medium max-w-2xl leading-relaxed">
            <strong>
              A Managed Intelligence Provider (MIP) deploys and manages AI
              automation, custom AI agents, and data intelligence for your
              business — the same way an MSP manages your IT infrastructure.
              ITECS is Dallas&apos;s MIP for businesses with 10–300 employees,
              backed by 22 years of managed IT and cybersecurity operations.
            </strong>
          </p>

          <p className="mt-4 text-base text-text-secondary font-light max-w-2xl leading-relaxed">
            Your MSP keeps your servers running. Your MSSP keeps your data safe.
            A MIP makes your business smarter — with AI that automates
            workflows, answers phones, qualifies leads, and trains your team. One
            provider. One bill. One partner who manages your entire technology
            stack from infrastructure to intelligence.
          </p>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Button
            href="/contact"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get Your Free AI Assessment
          </Button>
          <Button href={`tel:${SITE_CONFIG.phone}`} variant="ghost" size="lg">
            Call {SITE_CONFIG.phone}
          </Button>
        </motion.div>

        {/* Circuit trace accent */}
        <div className="mt-12">
          <CircuitTrace variant="section-divider" />
        </div>
      </div>
    </section>
  );
}
