"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AI_DATA_READINESS_RULE,
  getAIPricingOffering,
} from "@/lib/constants";

const dataReadinessSprint = getAIPricingOffering("Data Readiness Sprint");

export function PricingTable() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Transparent Pricing"
            title={dataReadinessSprint.name}
            description="Prepare one department or use case for a reliable build before engineering begins."
          />
        </ScrollReveal>

        <div className="mx-auto mt-16 max-w-3xl">
          <ScrollReveal>
            <motion.div
              className="chamfer-md flex h-full flex-col border border-itecs-blue bg-brand-subtle p-8 transition-colors"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-ink">
                  {dataReadinessSprint.name}
                </h3>
                <p className="mt-1 text-sm text-ink-body">
                  {dataReadinessSprint.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-semibold tracking-[-0.01em] text-itecs-blue">
                  {dataReadinessSprint.price}
                </span>
                <p className="mt-2 text-xs text-ink-faint">
                  {dataReadinessSprint.scope}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {dataReadinessSprint.included.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-ink-body"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-bright" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="mb-8 text-sm leading-relaxed text-ink-body">
                {AI_DATA_READINESS_RULE}
              </p>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-[10px] bg-itecs-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-active)]"
              >
                Get Started
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
