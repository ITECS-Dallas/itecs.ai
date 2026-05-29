"use client";

import Link from "next/link";
import {
  Activity,
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  FileSearch,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ManufacturingUseCase } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  FileSearch,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Truck,
  UsersRound,
};

export function ManufacturingUseCases({
  useCases,
}: {
  useCases: readonly ManufacturingUseCase[];
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Manufacturing use cases"
            title="Where AI Creates Measurable Value"
            description="Start with the operating questions where better signals change a finance, operations, quality, or supply-chain decision."
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((useCase, index) => {
            const Icon = iconMap[useCase.icon] ?? Activity;
            const content = (
              <motion.div
                className="flex h-full flex-col rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6"
                whileHover={{
                  y: -2,
                  borderColor: "var(--border-active)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                  <Icon className="h-5 w-5 text-brand-accent" />
                </div>
                <h3 className="text-xl font-light leading-snug text-text-primary">
                  {useCase.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                  {useCase.description}
                </p>
                <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 text-sm font-medium text-text-primary">
                  {useCase.outcome}
                </p>
                {useCase.ctaLabel && (
                  <span className="mt-4 text-sm text-brand-accent">
                    {useCase.ctaLabel} &rarr;
                  </span>
                )}
              </motion.div>
            );

            return (
              <ScrollReveal key={useCase.title} delay={index * 0.06}>
                {useCase.href ? (
                  <Link href={useCase.href} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
