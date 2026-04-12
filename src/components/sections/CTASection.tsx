"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { CircuitTrace } from "@/components/effects/CircuitTrace";

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
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Operations with AI?
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
            Start with a free AI readiness assessment. No commitments, no vendor
            lock-in — just an honest evaluation of where AI can drive measurable
            value for your business.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Schedule Your Free Assessment
            </Button>
            <Button href="tel:(972) 408-2020" variant="ghost" size="lg">
              Call (972) 408-2020
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
