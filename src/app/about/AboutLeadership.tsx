"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { SITE_CONFIG } from "@/lib/constants";

interface TeamMember {
  readonly name: string;
  readonly title: string;
  readonly image: string;
  readonly bio: string;
  readonly quote: string;
}

export function AboutLeadership({
  members,
}: {
  members: readonly TeamMember[];
}) {
  return (
    <section className="relative py-24 md:py-32 bg-bg-surface overflow-hidden">
      <GradientOrb
        color="cyan"
        size="sm"
        position={{ top: "10%", left: "5%" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Leadership" title="The People Behind ITECS" />
        </ScrollReveal>

        <div className="mt-16 max-w-4xl mx-auto">
          {members.map((member) => (
            <ScrollReveal key={member.name}>
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-start">
                {/* Photo with border glow */}
                <motion.div
                  className="relative mx-auto md:mx-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-purple/20 blur-sm" />
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title} at ITECS`}
                    width={240}
                    height={240}
                    className="relative rounded-2xl object-cover w-48 h-48 md:w-full md:h-auto border border-[var(--border-subtle)]"
                  />
                </motion.div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-[-0.02em] text-text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-brand-accent font-medium text-sm tracking-[0.02em]">
                    {member.title}
                  </p>

                  <p className="mt-6 text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Pull quote */}
                  <blockquote className="mt-6 pl-4 border-l-2 border-brand-accent/40">
                    <p className="text-text-primary/80 italic font-light leading-relaxed">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Social link */}
                  <div className="mt-6">
                    <a
                      href={SITE_CONFIG.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-brand-accent transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
