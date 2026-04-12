"use client";

import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/constants";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function TrustBar() {
  return (
    <section className="py-12 border-y border-[var(--border-subtle)]">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="text-center text-sm tracking-[0.05em] uppercase text-text-dim mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="transition-all duration-500 brightness-0 invert opacity-50 hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
