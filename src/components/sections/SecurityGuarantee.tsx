"use client";

import { Shield, Lock, ServerCrash, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import Link from "next/link";

interface SecurityGuaranteeProps {
  /** Section title, overrideable for industry-specific pages */
  title?: string;
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
  /** Optional paragraph of context — string or JSX (for inline links) */
  description?: ReactNode;
}

const icons = [Shield, Lock, ServerCrash, Eye];

export function SecurityGuarantee({
  title = "Enterprise-Grade Security for Business Data",
  points,
  internalLink,
  externalLink,
  description,
}: SecurityGuaranteeProps) {
  return (
    <section className="relative py-24 md:py-32 bg-canvas-sunken overflow-hidden">
      <CircuitTrace variant="background" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Security"
            title={title}
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
                  className="chamfer-md flex items-start gap-4 p-5 border border-[var(--card-line)] bg-card"
                  whileHover={{
                    borderColor: "var(--itecs-steel)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="hex flex items-center justify-center shrink-0 w-10 h-10 bg-brand-subtle text-itecs-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-ink-body leading-relaxed">
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
              className="inline-flex min-h-11 items-center text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
            >
              {internalLink.text} &rarr;
            </Link>
            <span className="hidden sm:block text-text-dim">|</span>
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
            >
              {externalLink.text} &nearr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
