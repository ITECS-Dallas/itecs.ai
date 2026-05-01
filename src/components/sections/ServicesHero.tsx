"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const stats = [
  { value: "9", label: "AI Services" },
  { value: "24+", label: "Years IT Experience" },
  { value: "10–300", label: "Employee Sweet Spot" },
];

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden">
      <GridBackground opacity={0.03} />
      <GradientOrb
        color="cyan"
        size="lg"
        position={{ top: "5%", right: "5%" }}
      />
      <GradientOrb
        color="purple"
        size="md"
        position={{ bottom: "10%", left: "10%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            AI Services
          </p>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-4xl">
            AI Services for Dallas Businesses with 10–300 Employees
          </h1>

          {/* GEO zero-click answer block */}
          <p className="mt-6 text-lg md:text-xl text-text-primary font-medium max-w-2xl leading-relaxed">
            <strong>
              ITECS delivers 9 managed AI services — from consulting and
              workflow automation to custom AI agents, employee training,
              AI DevOps, and AI-powered CRM — built for Dallas businesses that need
              practical results without enterprise budgets or vendor lock-in.
            </strong>
          </p>

          <p className="mt-4 text-base text-text-secondary font-light max-w-2xl leading-relaxed">
            Every service is backed by ITECS — a Dallas-based IT operations firm
            with 24 years of experience managing infrastructure, security, and
            compliance for small and mid-sized businesses. We build AI that fits
            your team, your tools, and your budget.
          </p>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50"
            >
              <span className="text-2xl font-extralight tracking-tight text-brand-accent">
                {s.value}
              </span>
              <span className="text-sm text-text-secondary">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
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
