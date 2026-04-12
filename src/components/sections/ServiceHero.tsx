"use client";

import { motion } from "framer-motion";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import type { ServiceItem } from "@/lib/constants";

export function ServiceHero({ service }: { service: ServiceItem }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <GridBackground opacity={0.03} />
      <GradientOrb color="cyan" size="md" position={{ top: "10%", right: "10%" }} />
      <GradientOrb color="purple" size="sm" position={{ bottom: "20%", left: "5%" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-brand-accent" />
            {service.shortTitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-3xl">
            {service.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
            {service.longDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
