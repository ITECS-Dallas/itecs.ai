"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Shield,
  Zap,
  Clock,
  Tag,
} from "lucide-react";
import { INSIGHTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import type { LucideIcon } from "lucide-react";

const TOPIC_META: Record<
  string,
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  consulting: {
    icon: Lightbulb,
    color: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
  },
  "custom-ai-agents": {
    icon: Shield,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple/10",
  },
  automation: {
    icon: Zap,
    color: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
  },
  "ai-devops": {
    icon: Zap,
    color: "text-brand-purple",
    bgColor: "bg-brand-purple/10",
  },
};

export function InsightCards() {
  const orderedInsights = [...INSIGHTS].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
  const featured = orderedInsights[0];
  const rest = orderedInsights.slice(1);
  const featuredMeta = TOPIC_META[featured.hubSlug] ?? TOPIC_META.consulting;
  const FeaturedIcon = featuredMeta.icon;

  return (
    <section className="relative py-24 md:py-32 bg-bg-surface">
      <GradientOrb
        color="mixed"
        size="sm"
        position={{ top: "30%", right: "10%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Latest Guides"
            title="Read. Learn. Implement."
            description="Each guide solves a specific problem Dallas business owners face with AI. Pick the one that matches your situation."
          />
        </ScrollReveal>

        {/* Featured article — large card */}
        <ScrollReveal delay={0.1}>
          <Link
            href={featured.href}
            className="group mt-16 block rounded-xl border border-[var(--border-subtle)] bg-bg-void p-8 md:p-10 transition-all duration-300 hover:border-[var(--border-active)] hover:shadow-[0_0_40px_var(--glow-cyan)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Text — 3/5 */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.05em] uppercase px-3 py-1 rounded-full border border-[var(--border-subtle)] ${featuredMeta.color}`}
                  >
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {featured.hubLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-text-dim">
                    <Clock className="h-3 w-3" aria-hidden="true" />5 min read
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-light tracking-[-0.02em] text-text-primary group-hover:text-brand-accent transition-colors">
                  {featured.title}
                </h2>

                <p className="mt-4 text-text-secondary leading-relaxed max-w-xl">
                  {featured.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:gap-3 transition-all">
                  Read the full guide
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Visual — 2/5 */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`w-32 h-32 rounded-2xl ${featuredMeta.bgColor} flex items-center justify-center`}
                >
                  <FeaturedIcon
                    className={`h-16 w-16 ${featuredMeta.color} opacity-80`}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Remaining articles — 2-column grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((insight, i) => {
            const meta = TOPIC_META[insight.hubSlug] ?? TOPIC_META.consulting;
            const Icon = meta.icon;

            return (
              <ScrollReveal key={insight.slug} delay={0.15 + i * 0.1}>
                <Link
                  href={insight.href}
                  className="group block h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void p-6 md:p-8 transition-all duration-300 hover:border-[var(--border-active)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--glow-cyan)]"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-lg ${meta.bgColor} flex items-center justify-center`}
                    >
                      <Icon
                        className={`h-6 w-6 ${meta.color}`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium tracking-[0.05em] uppercase ${meta.color}`}
                        >
                          <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                          {insight.hubLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-text-dim">
                          <Clock className="h-2.5 w-2.5" aria-hidden="true" />5
                          min
                        </span>
                      </div>

                      <h2 className="text-lg font-medium text-text-primary group-hover:text-brand-accent transition-colors">
                        {insight.title}
                      </h2>

                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {insight.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-accent group-hover:gap-2.5 transition-all">
                        Read guide
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
