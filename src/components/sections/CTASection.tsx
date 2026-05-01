"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { SITE_CONFIG } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-surface overflow-hidden">
      {/* Background effects */}
      <GradientOrb
        color="cyan"
        size="lg"
        position={{ top: "10%", left: "20%" }}
      />
      <GradientOrb
        color="purple"
        size="md"
        position={{ bottom: "10%", right: "15%" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8 text-center">
        <CircuitTrace variant="section-divider" className="mb-12" />

        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-text-primary">
            Ready to See What AI
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Can Do for Your Business?
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
            Get a free AI assessment from a Dallas team with 24 years of IT
            experience. We&apos;ll show you exactly where AI can save your
            business time and money — no jargon, no pressure.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Schedule Your Free Assessment
            </Button>
            <Button href={`tel:${SITE_CONFIG.phone}`} variant="ghost" size="lg">
              Call {SITE_CONFIG.phone}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
