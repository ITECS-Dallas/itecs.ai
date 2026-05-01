"use client";

import Link from "next/link";
import { Lightbulb, Shield, Zap, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { CircuitTrace } from "@/components/effects/CircuitTrace";

const TOPICS = [
  {
    icon: Lightbulb,
    title: "AI Strategy",
    description:
      "Learn how to evaluate AI tools, identify quick wins, and build a roadmap that fits your budget and team size.",
    hubLabel: "Explore AI Consulting",
    hubHref: "/consulting",
    color: "text-brand-accent" as const,
    bgColor: "bg-brand-accent/10" as const,
  },
  {
    icon: Shield,
    title: "Secure AI Agents",
    description:
      "Protect sensitive business data from public AI tools. Build private AI workflows, agent guardrails, and DLP policies.",
    hubLabel: "Explore Custom AI Agents",
    hubHref: "/custom-ai-agents",
    color: "text-brand-purple" as const,
    bgColor: "bg-brand-purple/10" as const,
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Automate lead follow-up, CRM updates, reporting, and repetitive workflows with Zapier, Make.com, and HubSpot AI.",
    hubLabel: "Explore AI Automation",
    hubHref: "/automation",
    color: "text-brand-accent" as const,
    bgColor: "bg-brand-accent/10" as const,
  },
] as const;

export function InsightsTopics() {
  return (
    <>
      <CircuitTrace variant="section-divider" />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Browse by Topic"
              title="What Do You Need Help With?"
              description="Each guide connects to a dedicated ITECS service. Read the guide, then talk to our team when you're ready to implement."
            />
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOPICS.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 0.1}>
                <div className="relative rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-8 h-full flex flex-col transition-all duration-300 hover:border-[var(--border-active)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--glow-cyan)]">
                  <div
                    className={`mb-5 inline-flex items-center justify-center w-12 h-12 rounded-lg ${topic.bgColor}`}
                  >
                    <topic.icon
                      className={`h-6 w-6 ${topic.color}`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-xl font-medium text-text-primary mb-3">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {topic.description}
                  </p>

                  <Link
                    href={topic.hubHref}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:gap-2.5 transition-all"
                  >
                    {topic.hubLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
