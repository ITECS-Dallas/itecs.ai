import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  ServerCog,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";
import { HOMEPAGE_HERITAGE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [ServerCog, UsersRound, ShieldCheck, Workflow] as const;

export function Heritage() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={HOMEPAGE_HERITAGE.eyebrow}
          title={HOMEPAGE_HERITAGE.title}
          description={HOMEPAGE_HERITAGE.description}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="relative min-h-[390px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-bg-surface shadow-e2 [box-shadow:var(--elev-1-inset),var(--elev-2)]">
            <Image
              src="/images/team/team-office.webp"
              alt="ITECS team at the Plano office supporting Dallas businesses"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-sunken via-bg-sunken/35 to-transparent" />
            <div className="absolute left-5 top-5 rounded-md border border-[var(--border-default)] bg-bg-sunken/85 px-4 py-3 shadow-e1 backdrop-blur-md">
              <p className="font-mono text-[0.68rem] font-semibold uppercase text-brand-accent">
                {HOMEPAGE_HERITAGE.badge.eyebrow}
              </p>
              <p className="mt-1 text-xl font-semibold text-text-primary">
                {HOMEPAGE_HERITAGE.badge.value}
              </p>
              <p className="mt-1 text-xs uppercase text-text-tertiary">
                {HOMEPAGE_HERITAGE.badge.label}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
                Plano HQ · Dallas-Fort Worth
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                The AI division is backed by the same local engineers, security
                process, and infrastructure discipline that power ITECS managed
                IT.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {HOMEPAGE_HERITAGE.differentiators.map((item, index) => {
              const Icon = icons[index] ?? BadgeCheck;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-[var(--border-default)] bg-bg-surface p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-text-tertiary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-subtle text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid gap-4 sm:grid-cols-3">
            {HOMEPAGE_HERITAGE.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-[var(--border-default)] bg-bg-elevated p-5 text-center shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
              >
                <p className="font-mono text-2xl font-semibold tracking-normal text-brand md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-normal text-text-tertiary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href={HOMEPAGE_HERITAGE.parentLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-bg-surface px-5 text-sm font-semibold text-text-primary transition-[border-color,background-color,color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-brand hover:bg-bg-elevated hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            {HOMEPAGE_HERITAGE.parentLink.text}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
