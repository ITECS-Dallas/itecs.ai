"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const stats = [
  { value: "10", label: "AI Services" },
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
        color="brand"
        size="md"
        position={{ bottom: "10%", left: "10%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">AI Services</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl text-ink">
            AI Services for Dallas Businesses with 10–300 Employees
          </h1>

          {/* GEO zero-click answer block */}
          <p className="mt-6 text-lg md:text-xl text-ink font-medium max-w-2xl leading-relaxed">
            <strong>
              ITECS delivers 10 managed AI services — from consulting and
              workflow automation to custom AI agents, employee training,
              AI DevOps, AI-powered CRM, and AI-optimized SEO — built for
              Dallas businesses that need practical results without enterprise
              budgets or vendor lock-in.
            </strong>
          </p>

          <p className="mt-4 text-base text-ink-body max-w-2xl leading-relaxed">
            Every service is backed by ITECS — a Dallas-based IT operations firm
            with 24 years of experience managing infrastructure, security, and
            compliance for growth-stage and mid-market organizations. We build AI that fits
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
              className="chamfer-sm flex items-center gap-3 px-5 py-3 border border-[var(--card-line)] bg-card"
            >
              <span className="font-display text-2xl font-semibold tracking-[-0.01em] text-itecs-blue">
                {s.value}
              </span>
              <span className="text-sm text-ink-body">{s.label}</span>
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
          <Button href={`tel:${SITE_CONFIG.phoneE164}`} variant="tertiary" size="lg">
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
