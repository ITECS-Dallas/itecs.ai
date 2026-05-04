"use client";

import Image from "next/image";
import { ArrowRight, Cloud, Headset, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const servicePaths = [
  {
    title: "Managed IT Services",
    description: "Help desk, onsite support, Microsoft 365, device management, and business IT operations.",
    icon: Headset,
  },
  {
    title: "Cybersecurity",
    description: "Security monitoring, risk reduction, compliance support, and incident readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Managed Cloud",
    description: "Azure, cloud hosting, backup, migration, and infrastructure management.",
    icon: Cloud,
  },
] as const;

export function ManagedITReferral() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <ScrollReveal direction="left">
          <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-3">
            ITECS Online
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-text-primary">
            Looking for Managed IT Services, Cybersecurity, or Managed Cloud?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            ITECS.ai focuses on AI consulting, training, automation, security,
            and DevOps. If your priority is day-to-day IT support, managed
            cybersecurity, cloud infrastructure, Microsoft 365, backup, or help
            desk coverage, visit the main ITECS website for the right service
            information and contact path.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {servicePaths.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-lg border border-[var(--border-subtle)] bg-bg-surface/70 p-4"
                >
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-medium text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <a
            href="https://itecsonline.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the main ITECS website for managed IT services, cybersecurity, and managed cloud solutions"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-accent px-5 py-3 text-sm font-medium text-bg-void transition-colors hover:bg-brand-accent-bright"
          >
            Visit itecsonline.com
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.1}>
          <a
            href="https://itecsonline.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the main ITECS website"
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-surface shadow-[0_0_40px_rgba(6,182,212,0.08)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/sections/itecsonline-homepage-top.png"
                  alt="Top of the ITECS main website for Dallas managed IT services and cybersecurity"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void/30 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-bg-void/80 px-3 py-1 text-xs font-medium text-text-primary backdrop-blur">
                  itecsonline.com
                </div>
              </div>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
