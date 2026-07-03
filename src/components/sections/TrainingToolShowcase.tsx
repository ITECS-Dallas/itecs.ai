"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface TrainingToolShowcaseProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  bullets: string[];
  image: { src: string; alt: string; caption?: string };
  /** When true, image sits on the left on desktop. Default: image on right. */
  imageLeft?: boolean;
}

export function TrainingToolShowcase({
  eyebrow,
  heading,
  paragraphs,
  bullets,
  image,
  imageLeft = false,
}: TrainingToolShowcaseProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className={imageLeft ? "lg:order-2" : ""}>
            <ScrollReveal>
              <p className="eyebrow mb-4">{eyebrow}</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                {heading}
              </h2>
            </ScrollReveal>

            {paragraphs.map((p, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.05}>
                <p className="mt-5 text-ink-body leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}

            <ul className="mt-8 space-y-3">
              {bullets.map((b, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.06}>
                  <li className="flex items-start gap-3">
                    <span className="hex flex items-center justify-center shrink-0 w-6 h-6 bg-brand-subtle text-itecs-blue mt-0.5">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-ink-body leading-relaxed">{b}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* Image column */}
          <div className={imageLeft ? "lg:order-1" : ""}>
            <ScrollReveal delay={0.15}>
              <motion.figure
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[var(--r-section)] border border-[var(--card-line)] bg-card shadow-e2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={675}
                    sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)"
                    className="w-full h-auto"
                  />
                </div>
                {image.caption && (
                  <figcaption className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {image.caption}
                  </figcaption>
                )}
              </motion.figure>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
