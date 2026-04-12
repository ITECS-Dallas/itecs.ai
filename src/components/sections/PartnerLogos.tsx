"use client";

import Image from "next/image";
import { PARTNER_LOGOS } from "@/lib/constants";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PartnerLogos() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Technology Partners"
            title="Backed by Leading Platforms"
          />
        </ScrollReveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {PARTNER_LOGOS.map((logo, i) => (
            <ScrollReveal key={logo.name} delay={i * 0.08}>
              <div className="transition-all duration-500 brightness-0 invert opacity-50 hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={`${logo.name} partner logo`}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
