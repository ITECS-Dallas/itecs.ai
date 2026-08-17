import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";
import {
  AI_ASSURANCES,
  AI_BUILD_CONTINUITY_ASSURANCE,
  AI_DATA_READINESS_RULE,
  AI_GUIDED_BUILD_TERMS,
  AI_HOURLY_RATES,
  AI_LOYALTY_DISCOUNTS,
  AI_LOYALTY_TERMS,
  AI_PREPAID_OPTIONS,
  AI_PRICING_CATEGORIES,
  AI_PRICING_EFFECTIVE_DATE,
  AI_PRICING_FAQ,
  AI_RATE_MULTIPLIERS,
  AI_SESSION_BANK_TERMS,
  getAIPricingOffering,
  MANAGED_AI_AGENT_OPERATIONS,
  MANAGED_AI_TERMS,
  MANAGED_AI_TIERS,
  SITE_CONFIG,
} from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "AI Services Pricing for Growing Organizations",
  description:
    "Transparent ITECS pricing for AI readiness, guided and local agent builds, governance, custom production agents, Managed Intelligence Services, and prepaid support.",
  path: "/pricing",
  keywords: [
    "AI consulting pricing",
    "AI readiness assessment cost",
    "guided AI agent build pricing",
    "managed intelligence services pricing",
    "custom AI agent pricing",
    "Dallas AI consulting rates",
  ],
});

const pricingModes = [
  {
    icon: FileText,
    title: "Published packages",
    description:
      "Defined starting points for readiness, training, guided builds, local agents, and governance.",
  },
  {
    icon: Layers3,
    title: "Phased custom work",
    description:
      "Discovery produces the specification and not-to-exceed before production engineering begins.",
  },
  {
    icon: Zap,
    title: "Flexible support",
    description:
      "Managed Intelligence Services, Agent Operations, prepaid options, and hourly expertise sustain the work.",
  },
] as const;

function schemaFragment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function priceSchemaFor(name: string, price: string) {
  const id = `${SITE_CONFIG.url}/pricing#offer-${schemaFragment(name)}`;
  const range = price.match(/\$([\d,]+)-\$([\d,]+)/);
  const single = price.match(/\$([\d,]+)/);

function priceSchemaFor(args: {
  name: string;
  description: string;
  displayPrice: string;
  schemaPrice?: string;
  schemaLowPrice?: string;
  schemaHighPrice?: string;
}) {
  const itemOffered = {
    "@type": "Service",
    name: args.name,
    description: args.description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  if (args.schemaLowPrice && args.schemaHighPrice) {
    return {
      "@type": "AggregateOffer",
      "@id": id,
      name,
      lowPrice: range[1].replace(/,/g, ""),
      highPrice: range[2].replace(/,/g, ""),
      priceCurrency: "USD",
      description: args.displayPrice,
      itemOffered,
    };
  }

  if (args.schemaPrice) {
    return {
      "@type": "Offer",
      "@id": id,
      name,
      price: single[1].replace(/,/g, ""),
      priceCurrency: "USD",
      description: args.displayPrice,
      itemOffered,
    };
  }

  return {
    "@type": "Offer",
    "@id": id,
    name,
    priceSpecification: price,
  };
}

const offeringSchemas = AI_PRICING_CATEGORIES.flatMap((category) =>
  category.offerings
    .map((offering) =>
      priceSchemaFor({
        name: offering.name,
        description: offering.description,
        displayPrice: offering.price,
        schemaPrice: offering.schemaPrice,
        schemaLowPrice: offering.schemaLowPrice,
        schemaHighPrice: offering.schemaHighPrice,
      }),
    )
    .filter((offering) => offering !== null),
);

const managedSchemas = MANAGED_AI_TIERS.map((tier) =>
  priceSchemaFor({
    name: tier.tier,
    description: `Managed Intelligence Services for ${tier.users.toLowerCase()} users with ${tier.includedHours.toLowerCase()}.`,
    displayPrice: tier.price,
    schemaPrice: tier.price.replace(/[^\d]/g, ""),
  }),
).filter((offering) => offering !== null);

const agentOperationsSchemas = MANAGED_AI_AGENT_OPERATIONS.prices
  .map((option) =>
    priceSchemaFor({
      name: `${MANAGED_AI_AGENT_OPERATIONS.tier} — ${option.agents}`,
      description: MANAGED_AI_AGENT_OPERATIONS.description,
      displayPrice: option.price,
      schemaPrice: "schemaPrice" in option ? option.schemaPrice : undefined,
    }),
  )
  .filter((offering) => offering !== null);

const prepaidSchemas = AI_PREPAID_OPTIONS.map((option) =>
  priceSchemaFor({
    name: option.name,
    description: `${option.unit}. ${option.bestFor}`,
    displayPrice: option.price,
    schemaPrice: option.schemaPrice,
  }),
).filter((offering) => offering !== null);

const offerCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "ITECS AI Services Pricing",
  url: `${SITE_CONFIG.url}/pricing`,
  itemListElement: [
    ...AI_PRICING_CATEGORIES.flatMap((category) =>
      category.offerings.map((offering) => ({
        "@type": "OfferCatalog",
        name: `${category.title} - ${offering.name}`,
        itemListElement: [
          {
            ...priceSchemaFor(offering.name, offering.price),
            itemOffered: {
              "@type": "Service",
              "@id": `${SITE_CONFIG.url}/pricing#service-${schemaFragment(offering.name)}`,
              name: offering.name,
              description: offering.description,
              provider: {
                "@type": "Organization",
                "@id": `${SITE_CONFIG.url}/#organization`,
                name: SITE_CONFIG.name,
                url: SITE_CONFIG.url,
              },
            },
          },
        ],
      })),
    ),
    ...MANAGED_AI_TIERS.map((tier) => ({
      "@type": "Offer",
      "@id": `${SITE_CONFIG.url}/pricing#offer-${schemaFragment(tier.tier)}`,
      name: tier.tier,
      price: tier.price.replace(/[^\d]/g, ""),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tier.price.replace(/[^\d]/g, ""),
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_CONFIG.url}/pricing#service-${schemaFragment(tier.tier)}`,
        name: tier.tier,
        description: `Managed AI services for ${tier.users.toLowerCase()}.`,
      },
    })),
    {
      ...priceSchemaFor(
        MANAGED_AI_AGENT_OPERATIONS.tier,
        MANAGED_AI_AGENT_OPERATIONS.price,
      ),
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_CONFIG.url}/pricing#service-${schemaFragment(MANAGED_AI_AGENT_OPERATIONS.tier)}`,
        name: MANAGED_AI_AGENT_OPERATIONS.tier,
        description: MANAGED_AI_AGENT_OPERATIONS.description,
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-bg-base pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(30,183,183,0.12),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Pricing", href: "/pricing" },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.12em] text-brand-accent">
                AI Services Program
              </p>
              <h1 className="max-w-4xl text-4xl font-light tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
                A practical path from the first useful agent to managed
                intelligence.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
                Start with clarity, build in the right environment, specialize
                only when the workflow demands engineering, and sustain what
                works with an accountable operating model.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickPricing.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/60 p-5"
                >
                  <div className="text-2xl font-semibold text-brand-accent-bright">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.13em] text-text-dim">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm text-text-secondary">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-bg-void py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
                How Our Pricing Works
              </p>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Match the engagement to the maturity of the work.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {pricingModes.map((mode) => {
                const Icon = mode.icon;

                return (
                  <div
                    key={mode.title}
                    className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/55 p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-medium text-text-primary">
                      {mode.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {mode.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="productized" className="scroll-mt-24 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Start Here → Build → Specialize
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Clear options for each stage of adoption.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Start with the smallest engagement that can produce evidence, then
              move into a larger build only when the workflow and business case
              justify it.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {AI_PRICING_CATEGORIES.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-24"
              >
                <div className="mb-8 max-w-3xl">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-accent-bright">
                    {category.eyebrow}
                  </p>
                  <h3 className="text-2xl font-light text-text-primary md:text-3xl">
                    {category.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">
                    {category.description}
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {category.offerings.map((offering) => (
                    <article
                      key={offering.name}
                      className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                        offering.highlighted
                          ? "border-brand-accent bg-brand-accent/5"
                          : "border-[var(--border-subtle)] bg-bg-surface/50"
                      }`}
                    >
                      {offering.highlighted ? (
                        <div className="absolute -top-3 left-6 rounded-full bg-brand-accent px-3 py-1 text-xs font-medium text-bg-void">
                          Recommended first step
                        </div>
                      ) : null}

                      <div className="mb-5">
                        <h4 className="text-lg font-medium text-text-primary">
                          {offering.name}
                        </h4>
                        <div className="mt-4 text-2xl font-semibold leading-tight text-text-primary">
                          {offering.price}
                        </div>
                        {offering.duration || offering.scope ? (
                          <div className="mt-3 flex items-start gap-2 text-sm text-text-dim">
                            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                            <span>{offering.duration || offering.scope}</span>
                          </div>
                        ) : null}
                      </div>

                      <p className="text-sm leading-relaxed text-text-secondary">
                        {offering.description}
                      </p>

                      <ul className="mt-6 flex-1 space-y-3">
                        {offering.included.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {offering.bestFor ? (
                        <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-4">
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-dim">
                            Best for
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {offering.bestFor}
                          </p>
                        </div>
                      ) : null}

                      {offering.href ? (
                        <Link
                          href={offering.href}
                          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                        >
                          Learn more
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </article>
                  ))}
                </div>

                {category.id === "guided-local-builds" ? (
                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
                      <h4 className="font-medium text-text-primary">
                        Guided session terms
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {AI_GUIDED_BUILD_TERMS.map((term) => (
                          <li
                            key={term}
                            className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                            <span>{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-6">
                      <h4 className="font-medium text-text-primary">
                        Build readiness and continuity
                      </h4>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                        {AI_DATA_READINESS_RULE}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                        {AI_BUILD_CONTINUITY_ASSURANCE}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="managed-intelligence"
        className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-bg-void py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Sustain
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Managed Intelligence Services.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              ITECS operates as a Managed Intelligence Provider: the accountable
              operating layer for AI-first, outcome-driven services. MIS keeps
              adoption, optimization, and governance moving after launch.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {MANAGED_AI_TIERS.map((tier) => (
              <article
                key={tier.tier}
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-brand bg-brand/5"
                    : "border-[var(--border-subtle)] bg-bg-surface/50"
                }`}
              >
                {tier.highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-medium text-text-primary">
                    Popular for teams
                  </div>
                ) : null}
                <h3 className="text-xl font-medium text-text-primary">
                  {tier.tier}
                </h3>
                <p className="mt-2 text-sm text-text-dim">{tier.users} users</p>
                <div className="mt-6 text-4xl font-semibold text-text-primary">
                  {tier.price}
                </div>
                <p className="mt-3 text-sm font-medium text-brand-accent-bright">
                  {tier.includedHours}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-brand-accent/20 bg-bg-surface/55 p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-accent-bright">
                Production Agent Operations
              </p>
              <h3 className="mt-3 text-2xl font-light text-text-primary">
                {MANAGED_AI_AGENT_OPERATIONS.tier}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {MANAGED_AI_AGENT_OPERATIONS.description}
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-subtle)]">
                {MANAGED_AI_AGENT_OPERATIONS.prices.map((option) => (
                  <div
                    key={option.agents}
                    className="grid gap-2 border-b border-[var(--border-subtle)] bg-bg-void/40 p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <span className="text-sm text-text-secondary">
                      {option.agents}
                    </span>
                    <span className="font-medium text-text-primary">
                      {option.price}
                    </span>
                  </div>
                ))}
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {MANAGED_AI_AGENT_OPERATIONS.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-6 md:p-8">
              <h3 className="font-medium text-text-primary">MIS terms</h3>
              <ul className="mt-5 space-y-4">
                {MANAGED_AI_TERMS.map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="prepaid" className="scroll-mt-24 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Prepaid Options
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Flexible capacity for uneven demand.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Prepaid options let multiple employees draw on a defined pool
              without turning every request into a new engagement.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {AI_PREPAID_OPTIONS.map((option) => (
              <article
                key={option.name}
                className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6"
              >
                <h3 className="text-lg font-medium text-text-primary">
                  {option.name}
                </h3>
                <div className="mt-4 text-3xl font-semibold text-text-primary">
                  {option.price}
                </div>
                <p className="mt-2 text-sm font-medium text-brand-accent-bright">
                  {option.unit}
                </p>
                <ul className="mt-6 space-y-3">
                  {option.terms.map((term) => (
                    <li
                      key={term}
                      className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-text-dim">
                  {option.bestFor}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
            <h3 className="font-medium text-text-primary">Session-bank rules</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {AI_SESSION_BANK_TERMS.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="hourly"
        className="scroll-mt-24 border-y border-[var(--border-subtle)] bg-bg-void py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
                Hourly Rates
              </p>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                The right expertise for work outside a package.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-text-secondary">
                Hourly work is billed by the expertise required. Tier 3
                strategist work is never discounted.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
              {AI_HOURLY_RATES.map((rate) => (
                <div
                  key={rate.tier}
                  className="grid gap-4 border-b border-[var(--border-subtle)] bg-bg-surface/55 p-5 last:border-b-0 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="font-medium text-text-primary">{rate.tier}</h3>
                    <p className="mt-1 text-sm text-brand-accent-bright">
                      {rate.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {rate.typicalWork}
                    </p>
                  </div>
                  <div className="text-2xl font-semibold text-text-primary md:text-right">
                    {rate.rate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-accent" />
                <h3 className="font-medium text-text-primary">Rate multipliers</h3>
              </div>
              <div className="space-y-3">
                {AI_RATE_MULTIPLIERS.map((row) => (
                  <div
                    key={row.condition}
                    className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3 text-sm last:border-b-0 last:pb-0"
                  >
                    <span className="text-text-secondary">{row.condition}</span>
                    <span className="text-right font-medium text-text-primary">
                      {row.multiplier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="loyalty"
              className="scroll-mt-24 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Users className="h-5 w-5 text-brand-accent-bright" />
                <h3 className="font-medium text-text-primary">
                  Managed-IT loyalty matrix
                </h3>
              </div>
              <div className="space-y-3 lg:hidden">
                {AI_LOYALTY_DISCOUNTS.map((row) => (
                  <div
                    key={row.benefit}
                    className="rounded-xl border border-brand-accent/15 bg-bg-void/35 p-4"
                  >
                    <p className="font-medium text-text-primary">{row.benefit}</p>
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                      <dt className="text-text-dim">Select</dt>
                      <dd className="text-text-secondary">{row.select}</dd>
                      <dt className="text-text-dim">Pro</dt>
                      <dd className="text-text-secondary">{row.pro}</dd>
                      <dt className="text-text-dim">Elite</dt>
                      <dd className="text-text-secondary">{row.elite}</dd>
                    </dl>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-accent/20 text-text-dim">
                      <th className="pb-3 pr-4 font-medium">Benefit</th>
                      <th className="pb-3 px-3 font-medium">MSP Select</th>
                      <th className="pb-3 px-3 font-medium">MSP Pro</th>
                      <th className="pb-3 pl-3 font-medium">MSP Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AI_LOYALTY_DISCOUNTS.map((row) => (
                      <tr
                        key={row.benefit}
                        className="border-b border-brand-accent/10 last:border-b-0"
                      >
                        <th className="py-3 pr-4 font-medium text-text-primary">
                          {row.benefit}
                        </th>
                        <td className="px-3 py-3 text-text-secondary">
                          {row.select}
                        </td>
                        <td className="px-3 py-3 text-text-secondary">
                          {row.pro}
                        </td>
                        <td className="py-3 pl-3 text-text-secondary">
                          {row.elite}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-6">
            <h3 className="font-medium text-text-primary">Loyalty terms</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {AI_LOYALTY_TERMS.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Assurances
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Clear boundaries for responsible delivery.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {AI_ASSURANCES.map((assurance) => (
              <article
                key={assurance.title}
                className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6"
              >
                <h3 className="font-medium text-text-primary">
                  {assurance.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {assurance.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-bg-void py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <Sparkles className="mx-auto mb-5 h-8 w-8 text-brand-accent-bright" />
          <h2 className="text-3xl font-light text-text-primary md:text-4xl">
            Choose the smallest engagement that can create useful evidence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Start with a Guided Build Session for one workflow or the AI
            Readiness Assessment for a leadership-level roadmap.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-7 py-4 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneE164}`}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] px-7 py-4 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              Call {SITE_CONFIG.phone}
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-text-dim">
            Pricing effective {AI_PRICING_EFFECTIVE_DATE}. ITECS reserves the
            right to scope custom engagements to fit unique requirements.
            Published packages include the deliverables listed on this page;
            out-of-scope work is billed at the applicable hourly rate. ITECS
            reviews AI pricing annually each January; signed engagements and
            active retainer terms are honored through their term.
          </p>
        </div>
      </section>

      <FAQSection />
      <CTASection />

      <JsonLd data={generateFAQSchema(AI_PRICING_FAQ)} />
      <JsonLd data={offerCatalogSchema} />
    </>
  );
}

function FAQSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
            Pricing FAQ
          </p>
          <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
            Common pricing questions from business leaders.
          </h2>
        </div>
        <div className="divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45">
          {AI_PRICING_FAQ.map((item) => (
            <div key={item.question} className="p-6">
              <h3 className="text-lg font-medium text-text-primary">
                {item.question}
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
