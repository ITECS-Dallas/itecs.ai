"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ParallaxWrapper } from "@/components/effects/ParallaxWrapper";

interface Feature {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  bullets: readonly string[];
}

export function FeatureShowcase({ features }: { features: readonly Feature[] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8 space-y-24 md:space-y-32">
        {features.map((feature, i) => {
          const reversed = i % 2 === 1;

          return (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Image */}
              <ScrollReveal
                direction={reversed ? "right" : "left"}
                className={reversed ? "lg:order-2" : ""}
              >
                <ParallaxWrapper speed={0.15}>
                  <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={640}
                      height={420}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-void/60 to-transparent" />
                  </div>
                </ParallaxWrapper>
              </ScrollReveal>

              {/* Text */}
              <ScrollReveal
                direction={reversed ? "left" : "right"}
                delay={0.1}
                className={reversed ? "lg:order-1" : ""}
              >
                <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-3">
                  {feature.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary">
                  {feature.title}
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
