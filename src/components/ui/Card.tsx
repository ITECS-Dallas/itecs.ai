import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";

type CardAccent = "brand" | "cyan" | "success" | "amber";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  href?: string;
  ariaLabel?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
  ctaLabel?: string;
  className?: string;
}

interface StatCardProps {
  value?: string | number | null;
  unit?: string;
  label?: string | null;
  source?: string;
  accent?: Extract<CardAccent, "brand" | "cyan">;
  className?: string;
}

interface CaseStudyCardProps {
  outcome?: string | null;
  summary?: string | null;
  clientName?: string | null;
  anonymized?: boolean;
  industry?: string;
  href?: string;
  logo?: ReactNode;
  media?: ReactNode;
  ctaLabel?: string;
  className?: string;
}

interface InsightCardProps {
  category: string;
  title: string;
  href: string;
  date: string;
  readTime: string;
  summary?: string;
  media?: ReactNode;
  className?: string;
}

interface TestimonialCardProps {
  quote?: string | null;
  attribution?: {
    name?: string | null;
    title?: string;
    company?: string | null;
    logo?: ReactNode;
  } | null;
  sourceDate?: string;
  className?: string;
}

interface TierCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaHref: string;
  ctaLabel?: string;
  recommended?: boolean;
  className?: string;
}

const interactiveCardClasses =
  "group group/card chamfer-md relative overflow-hidden border border-[var(--card-line)] bg-card p-7 transition-[transform,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:opacity-0 before:transition-opacity before:duration-[var(--dur-base)] before:ease-[var(--ease-out)] before:bg-itecs-blue hover:-translate-y-0.5 hover:border-itecs-steel hover:before:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const staticCardClasses =
  "chamfer-md relative overflow-hidden border border-[var(--card-line)] bg-card p-7";

const accentTextClasses: Record<CardAccent, string> = {
  brand: "text-brand",
  cyan: "text-brand-accent",
  success: "text-success",
  amber: "text-amber",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DataMotif({ label }: { label: string }) {
  return (
    <div
      aria-label={label}
      className="relative flex aspect-video items-end overflow-hidden rounded-md border border-[var(--border-subtle)] bg-bg-sunken p-4"
      role="img"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div className="relative flex h-full w-full items-end gap-2">
        {[42, 58, 38, 74, 63, 86, 70].map((height, index) => (
          <span
            key={index}
            className="w-full rounded-sm bg-brand/70"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CardCta({ children }: { children: ReactNode }) {
  return (
    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-hover">
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/card:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0"
      />
    </span>
  );
}

export function Card({
  children,
  className,
  hover = true,
  href,
  ariaLabel,
}: CardProps) {
  const classes = joinClasses(
    hover ? interactiveCardClasses : staticCardClasses,
    className,
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={joinClasses("block", classes)}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

export function ServiceCard({
  title,
  description,
  href,
  icon,
  ctaLabel = "Learn more",
  className,
}: ServiceCardProps) {
  return (
    <Card
      href={href}
      ariaLabel={href ? `${ctaLabel}: ${title}` : undefined}
      className={joinClasses("flex h-full flex-col", className)}
    >
      {icon ? (
        <div className="chamfer-sm mb-5 inline-flex h-11 w-11 items-center justify-center bg-brand-subtle text-itecs-blue">
          {icon}
        </div>
      ) : null}
      <h3 className="text-[length:var(--fs-h3)] font-semibold leading-tight text-text-primary">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      {href ? <CardCta>{ctaLabel}</CardCta> : null}
    </Card>
  );
}

export function StatCard({
  value,
  unit,
  label,
  source,
  accent = "cyan",
  className,
}: StatCardProps) {
  if (value === null || value === undefined || value === "" || !label) {
    return null;
  }

  return (
    <Card hover={false} className={joinClasses("h-full", className)}>
      <div className="font-display text-[length:var(--fs-metric)] font-semibold leading-none tracking-[-0.01em] text-itecs-blue">
        {value}
        {unit ? (
          <span className={joinClasses("ml-1 align-baseline text-[0.45em]", accentTextClasses[accent])}>
            {unit}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-tertiary">{label}</p>
      {source ? (
        <p className="mt-4 border-t border-[var(--border-subtle)] pt-3 text-xs leading-relaxed text-text-tertiary">
          Source: {source}
        </p>
      ) : null}
    </Card>
  );
}

export function CaseStudyCard({
  outcome,
  summary,
  clientName,
  anonymized = false,
  industry,
  href,
  logo,
  media,
  ctaLabel = "Read case study",
  className,
}: CaseStudyCardProps) {
  const hasApprovedIdentity = Boolean(clientName) || anonymized;

  if (!hasApprovedIdentity || !outcome || !summary) {
    return null;
  }

  return (
    <Card
      href={href}
      ariaLabel={href ? `${ctaLabel}: ${outcome}` : undefined}
      className={joinClasses("flex h-full flex-col p-0", className)}
    >
      <div className="overflow-hidden rounded-t-lg">
        {media ?? <DataMotif label="Abstract operational data motif" />}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex min-h-9 items-center rounded-md border border-[var(--border-default)] bg-bg-elevated px-3 text-xs font-semibold text-text-secondary">
            {logo ?? clientName ?? "Anonymized client"}
          </span>
          {industry ? (
            <span className="chamfer-sm border border-[var(--card-line)] bg-canvas-sunken px-3 py-1 font-mono text-xs uppercase text-text-tertiary">
              {industry}
            </span>
          ) : null}
          {anonymized ? (
            <span className="chamfer-sm border border-[var(--card-line)] bg-canvas-sunken px-3 py-1 font-mono text-xs uppercase text-text-tertiary">
              Anonymized
            </span>
          ) : null}
        </div>
        <h3 className="text-[length:var(--fs-h4)] font-semibold leading-tight text-text-primary">
          {outcome}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
          {summary}
        </p>
        {href ? <CardCta>{ctaLabel}</CardCta> : null}
      </div>
    </Card>
  );
}

export function InsightCard({
  category,
  title,
  href,
  date,
  readTime,
  summary,
  media,
  className,
}: InsightCardProps) {
  return (
    <Card
      href={href}
      ariaLabel={`Read insight: ${title}`}
      className={joinClasses("flex h-full flex-col p-0", className)}
    >
      <div className="overflow-hidden rounded-t-lg">
        <div className="transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100">
          {media ?? <DataMotif label="Abstract insight data motif" />}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="chamfer-sm border border-[var(--card-line)] bg-canvas-sunken px-3 py-1 font-mono text-xs uppercase text-brand-accent">
            {category}
          </span>
          <span className="text-xs text-text-tertiary">
            {date} / {readTime}
          </span>
        </div>
        <h3 className="mt-5 text-[length:var(--fs-h4)] font-semibold leading-tight text-text-primary">
          {title}
        </h3>
        {summary ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
            {summary}
          </p>
        ) : (
          <span className="flex-1" aria-hidden="true" />
        )}
        <CardCta>Read insight</CardCta>
      </div>
    </Card>
  );
}

export function TestimonialCard({
  quote,
  attribution,
  sourceDate,
  className,
}: TestimonialCardProps) {
  if (!quote || !attribution?.name || !attribution.company) {
    return null;
  }

  return (
    <Card hover={false} className={joinClasses("h-full", className)}>
      <blockquote className="text-[length:var(--fs-h4)] font-medium leading-snug text-text-primary">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-7 flex items-center gap-4 border-t border-[var(--border-subtle)] pt-5">
        {attribution.logo ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-elevated text-text-secondary">
            {attribution.logo}
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold text-text-primary">{attribution.name}</p>
          <p className="text-sm text-text-tertiary">
            {[attribution.title, attribution.company].filter(Boolean).join(", ")}
          </p>
          {sourceDate ? (
            <p className="mt-1 text-xs text-text-tertiary">Source date: {sourceDate}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function TierCard({
  name,
  price,
  description,
  features,
  ctaHref,
  ctaLabel = "Start assessment",
  recommended = false,
  className,
}: TierCardProps) {
  const card = (
    <Card
      hover
      className={joinClasses(
        "flex h-full flex-col",
        recommended && "border-transparent",
        className,
      )}
    >
      {recommended ? (
        <span className="chamfer-sm absolute right-5 top-5 bg-itecs-blue px-3 py-1 font-mono text-xs font-semibold uppercase text-white">
          Recommended
        </span>
      ) : null}
      <p className="font-mono text-xs uppercase text-brand-accent">{name}</p>
      <div className="mt-5 text-[length:var(--fs-h2)] font-semibold text-text-primary">
        {price}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-text-secondary">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className="mt-7 inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-[background-color,color,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-brand-hover hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {ctaLabel}
      </Link>
    </Card>
  );

  if (!recommended) {
    return card;
  }

  return (
    <div className="chamfer-md h-full bg-itecs-blue p-px">
      {card}
    </div>
  );
}
