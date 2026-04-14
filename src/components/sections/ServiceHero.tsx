"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import type { ServiceItem } from "@/lib/constants";
import type { ReactNode } from "react";

interface ServiceHeroProps {
  service: ServiceItem;
  circuit?: ReactNode;
}

export function ServiceHero({ service, circuit }: ServiceHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <GridBackground opacity={0.03} />
      <GradientOrb color="cyan" size="md" position={{ top: "10%", right: "10%" }} />
      <GradientOrb color="purple" size="sm" position={{ bottom: "20%", left: "5%" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text — 3/5 on desktop, full on mobile */}
          <motion.div
            className={circuit ? "lg:col-span-3" : "lg:col-span-5 max-w-3xl"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4 flex items-center gap-2">
              <span className="inline-block w-8 h-px bg-brand-accent" />
              {service.shortTitle}
            </p>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1]">
              {service.h1}
            </h1>

            {/* Above-the-fold ROI summary — bold, GEO-extractable */}
            <p className="mt-6 text-lg md:text-xl text-text-primary font-medium max-w-2xl leading-relaxed">
              <strong>{service.heroSummary}</strong>
            </p>

            <p className="mt-4 text-base text-text-secondary font-light max-w-2xl leading-relaxed">
              {service.longDescription}
            </p>
          </motion.div>

          {/* Circuit trace — 2/5 on desktop, hidden on mobile */}
          {circuit && (
            <div className="hidden lg:block lg:col-span-2">
              {circuit}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
