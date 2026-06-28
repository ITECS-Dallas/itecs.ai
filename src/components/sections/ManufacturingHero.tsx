"use client";

import { Factory, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Hex } from "@/components/ui/Motifs";

// Icon is resolved by name so server components can select it without passing
// a function component across the server/client boundary.
const heroIconMap: Record<string, LucideIcon> = {
  Factory,
  Landmark,
};

interface ManufacturingHeroProps {
  eyebrow: string;
  h1: string;
  heroSummary: string;
  longDescription: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  stats: readonly { value: string; label: string }[];
  iconName?: string;
  signalLabel?: string;
  signalSublabel?: string;
}

export function ManufacturingHero({
  eyebrow,
  h1,
  heroSummary,
  longDescription,
  primaryCta,
  primaryCtaHref,
  secondaryCta,
  secondaryCtaHref,
  stats,
  iconName = "Factory",
  signalLabel = "Manufacturing signal map",
  signalSublabel = "Finance + operations + IT",
}: ManufacturingHeroProps) {
  const Icon = heroIconMap[iconName] ?? Factory;
  return (
    <section className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-8 md:pt-32 md:pb-16">
      <div
        className="relative overflow-hidden rounded-[var(--r-section)] ops-grid"
        style={{ background: "var(--itecs-navy)" }}
      >
        {/* bright crease sliver */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] lg:block"
          style={{
            background: "var(--itecs-blue-bright)",
            clipPath: "polygon(2% 0, 4% 0, 0 100%, 0% 100%)",
            opacity: 0.5,
          }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-10 p-8 md:p-14 lg:grid-cols-5 lg:items-center">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow className="mb-5 !text-itecs-blue-pale">{eyebrow}</Eyebrow>
            <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white md:text-6xl">
              {h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-itecs-blue-pale md:text-xl">
              {heroSummary}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#aebfcb]">
              {longDescription}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={primaryCtaHref} size="lg">
                {primaryCta}
              </Button>
              <Button href={secondaryCtaHref} variant="ghost" size="lg">
                {secondaryCta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div
              className="chamfer-md border p-5"
              style={{ background: "var(--itecs-navy-2)", borderColor: "rgba(255,255,255,0.10)" }}
            >
              <div
                className="mb-6 flex items-center justify-between border-b pb-4"
                style={{ borderColor: "rgba(255,255,255,0.10)" }}
              >
                <div className="flex items-center gap-3">
                  <Hex className="h-10 w-10 bg-itecs-blue text-white">
                    <Icon className="h-5 w-5" />
                  </Hex>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {signalLabel}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-[0.05em] text-[#8497a6]">
                      {signalSublabel}
                    </p>
                  </div>
                </div>
                <ShieldCheck className="h-5 w-5 text-itecs-blue-pale" />
              </div>

              <div className="divide-y divide-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-display text-2xl font-semibold text-itecs-blue-pale">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-[#aebfcb]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
