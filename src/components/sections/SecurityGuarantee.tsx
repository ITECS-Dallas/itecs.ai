"use client";

import { Shield, Lock, ServerCrash, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import Link from "next/link";

interface SecurityGuaranteeProps {
  /** Bullet points describing security measures */
  points: string[];
  /** Internal link for intent-driven anchor */
  internalLink: {
    text: string;
    href: string;
  };
  /** External authority link for trust signal */
  externalLink: {
    text: string;
    href: string;
  };
  /** Optional paragraph of context */
  description?: string;
}

const icons = [Shield, Lock, ServerCrash, Eye];

export function SecurityGuarantee({
  points,
  internalLink,
  externalLink,
  description,
}: SecurityGuaranteeProps) {
  return (
    <section className="relative py-24 md:py-32 bg-bg-surface overflow-hidden">
      <CircuitTrace variant="background" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Security"
            title="Enterprise-Grade Security for SMB Data"
          />
        </ScrollReveal>

        {description && (
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl mx-auto text-center">
              {description}
            </p>
          </ScrollReveal>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50"
                  whileHover={{
                    borderColor: "var(--border-active)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20">
                    <Icon className="h-5 w-5 text-brand-accent" />
                  </div>
                  <span className="text-text-secondary leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Links — internal (intent-driven) + external (authority) */}
        <ScrollReveal delay={0.35}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <Link
              href={internalLink.href}
              className="text-brand-accent hover:text-brand-accent-bright transition-colors"
            >
              {internalLink.text} &rarr;
            </Link>
            <span className="hidden sm:block text-text-dim">|</span>
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {externalLink.text} &nearr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
