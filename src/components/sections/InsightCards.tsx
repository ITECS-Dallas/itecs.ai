import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Tag,
} from "lucide-react";
import { INSIGHTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const TOPIC_META: Record<
  string,
  { color: string }
> = {
  consulting: {
    color: "text-itecs-blue-bright",
  },
  "custom-ai-agents": {
    color: "text-itecs-blue",
  },
  automation: {
    color: "text-itecs-blue-bright",
  },
  "ai-devops": {
    color: "text-itecs-blue",
  },
};

export function InsightCards() {
  const orderedInsights = [...INSIGHTS].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
  const featured = orderedInsights[0];
  const rest = orderedInsights.slice(1);
  const featuredMeta = TOPIC_META[featured.hubSlug] ?? TOPIC_META.consulting;

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Latest Guides"
            title="Read. Learn. Implement."
            description="Each guide solves a specific problem Dallas business owners face with AI. Pick the one that matches your situation."
          />
        </ScrollReveal>

        {/* Featured article — large card */}
        <ScrollReveal delay={0.1}>
          <Link
            href={featured.href}
            className="group chamfer-lg mt-16 block border border-[var(--card-line)] bg-card p-8 md:p-10 transition-[transform,border-color] duration-300 hover:border-itecs-steel hover:-translate-y-0.5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="overflow-hidden chamfer-md lg:col-span-2">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1280px) 448px, (min-width: 1024px) 40vw, calc(100vw - 112px)"
                  className="aspect-video w-full object-cover"
                />
              </div>
              {/* Text — 3/5 */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`chamfer-sm inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.05em] uppercase px-3 py-1 border border-[var(--card-line)] bg-canvas-sunken ${featuredMeta.color}`}
                  >
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {featured.hubLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                    <Clock className="h-3 w-3" aria-hidden="true" />5 min read
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink group-hover:text-itecs-blue transition-colors">
                  {featured.title}
                </h2>

                <p className="mt-4 text-text-secondary leading-relaxed max-w-xl">
                  {featured.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:gap-3 transition-all">
                  Read the full guide
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

            </div>
          </Link>
        </ScrollReveal>

        {/* Remaining articles — 2-column grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((insight, i) => {
            const meta = TOPIC_META[insight.hubSlug] ?? TOPIC_META.consulting;

            return (
              <ScrollReveal key={insight.slug} delay={0.15 + i * 0.1}>
                <Link
                  href={insight.href}
                  className="group chamfer-md block h-full border border-[var(--card-line)] bg-card p-6 md:p-8 transition-[transform,border-color] duration-300 hover:border-itecs-steel hover:-translate-y-0.5"
                >
                  <div className="mb-6 overflow-hidden chamfer-sm">
                    <Image
                      src={insight.image.src}
                      alt={insight.image.alt}
                      width={1600}
                      height={900}
                      sizes="(min-width: 1280px) 530px, (min-width: 768px) calc(50vw - 108px), calc(100vw - 96px)"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium tracking-[0.05em] uppercase ${meta.color}`}
                      >
                        <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                        {insight.hubLabel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                        <Clock className="h-2.5 w-2.5" aria-hidden="true" />5
                        min
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-ink group-hover:text-itecs-blue transition-colors">
                      {insight.title}
                    </h2>

                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {insight.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-accent group-hover:gap-2.5 transition-all">
                      Read guide
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
