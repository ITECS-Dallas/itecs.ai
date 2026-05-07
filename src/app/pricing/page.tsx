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
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import {
  AI_HOURLY_RATES,
  AI_LOYALTY_DISCOUNTS,
  AI_PRICING_CATEGORIES,
  AI_RATE_MULTIPLIERS,
  MANAGED_AI_TIERS,
  SITE_CONFIG,
} from "@/lib/constants";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Consulting Pricing for SMBs",
  description:
    "Transparent AI consulting pricing for SMBs: readiness assessments, executive briefings, pilots, custom AI agents, managed AI retainers, and hourly rates.",
  path: "/pricing",
  keywords: [
    "AI consulting pricing",
    "AI readiness assessment cost",
    "managed AI services pricing",
    "custom AI agent pricing",
    "AI pilot implementation cost",
    "Dallas AI consulting rates",
  ],
});

const pricingFAQ = [
  {
    question: "What is the best first step if we are new to AI?",
    answer:
      "Most organizations should start with the AI Readiness Assessment. In 1-2 weeks, ITECS documents where AI fits, which platforms match your environment, what risks need guardrails, and what the 12-month adoption roadmap should look like.",
  },
  {
    question: "Are these prices fixed or estimates?",
    answer:
      "Productized services are listed as flat-fee starting points with defined deliverables. Custom agents, connectors, and process redesign work are scoped before build with a final scope and not-to-exceed amount.",
  },
  {
    question: "Do you only support one AI platform?",
    answer:
      "No. ITECS is vendor-neutral. We work across Claude, ChatGPT, Gemini, Microsoft Copilot, GitHub Copilot, Azure OpenAI, and other commercial AI platforms, then recommend what fits your business.",
  },
  {
    question: "What happens after a pilot?",
    answer:
      "After a pilot, clients can scale to more teams, request a custom build, or move into managed AI services for ongoing optimization, training, prompt-library maintenance, and quarterly reviews.",
  },
  {
    question: "Do existing ITECS managed IT clients receive AI discounts?",
    answer:
      "Yes. MSP Pro clients receive 10% off eligible Tier 1 and Tier 2 hourly work and productized offerings. MSP Elite clients receive 15%. Tier 3 strategist rates are not discounted.",
  },
] as const;

function priceSchemaFor(name: string, price: string) {
  const range = price.match(/\$([\d,]+)-\$([\d,]+)/);
  const single = price.match(/\$([\d,]+)/);

  if (range) {
    return {
      "@type": "AggregateOffer",
      name,
      lowPrice: range[1].replace(/,/g, ""),
      highPrice: range[2].replace(/,/g, ""),
      priceCurrency: "USD",
    };
  }

  if (single) {
    return {
      "@type": "Offer",
      name,
      price: single[1].replace(/,/g, ""),
      priceCurrency: "USD",
    };
  }

  return {
    "@type": "Offer",
    name,
    priceSpecification: price,
  };
}

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
              name: offering.name,
              description: offering.description,
              provider: {
                "@type": "Organization",
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
        name: tier.tier,
        description: `Managed AI services for ${tier.users.toLowerCase()}.`,
      },
    })),
  ],
};

const pricingModes = [
  {
    icon: FileText,
    title: "Productized engagements",
    description:
      "Flat-fee services for discovery, policy, pilots, and executive enablement when leadership needs clear scope and predictable cost.",
  },
  {
    icon: Layers3,
    title: "Scoped custom builds",
    description:
      "Custom AI agents, connectors, and process redesign projects are quoted after requirements, data, integrations, and risk controls are understood.",
  },
  {
    icon: Zap,
    title: "Managed AI retainers",
    description:
      "Monthly support for teams that want ongoing optimization, office hours, prompt-library maintenance, and quarterly business reviews.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Pricing", href: "/pricing" },
          ]}
        />
      </div>

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Public AI Pricing
            </p>
            <h1 className="text-4xl font-light tracking-[-0.03em] text-text-primary md:text-6xl">
              Practical AI pricing for SMB leaders who need clarity before
              committing.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
              ITECS helps SMB and mid-market organizations adopt AI with
              predictable pricing, productized engagement options, and the right
              platform fit. We work across Claude, ChatGPT, Gemini, Microsoft
              Copilot, GitHub Copilot, and other major AI platforms without
              locking you into one vendor.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-7 py-4 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#productized"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] px-7 py-4 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                Compare Packages
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                value: "$6,500",
                label: "Recommended starting point",
                detail: "AI Readiness Assessment",
              },
              {
                value: "$12,500",
                label: "Focused pilot",
                detail: "Small team AI implementation",
              },
              {
                value: "$1,950/mo",
                label: "Managed AI services",
                detail: "Ongoing optimization and support",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/60 p-6"
              >
                <div className="text-3xl font-extralight text-brand-accent-bright">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-text-dim">
                  {stat.label}
                </div>
                <p className="mt-3 text-sm text-text-secondary">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-bg-void py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
                How Our Pricing Works
              </p>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Most clients start flat-fee, then scale only when the business
                case is clear.
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

      <section id="productized" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Productized AI Services
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Clear packages for each stage of adoption.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Start with discovery and strategy, build a controlled production
              foundation, then specialize when a custom workflow is justified.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {AI_PRICING_CATEGORIES.map((category) => (
              <div key={category.title}>
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
                        <div className="mt-4">
                          <span className="text-3xl font-extralight text-text-primary">
                            {offering.price}
                          </span>
                        </div>
                        {offering.duration || offering.scope ? (
                          <div className="mt-3 flex items-center gap-2 text-sm text-text-dim">
                            <Clock className="h-4 w-4 text-brand-accent" />
                            {offering.duration || offering.scope}
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
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="managed-ai" className="border-y border-[var(--border-subtle)] bg-bg-void py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Sustain
            </p>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              Managed AI services for ongoing improvement.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">
              Managed AI mirrors ITECS&apos; managed IT model: predictable monthly
              support, practical optimization, and a team that keeps improving
              the way AI fits into daily work.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {MANAGED_AI_TIERS.map((tier) => (
              <article
                key={tier.tier}
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-brand-purple bg-brand-purple/5"
                    : "border-[var(--border-subtle)] bg-bg-surface/50"
                }`}
              >
                {tier.highlighted ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-purple px-3 py-1 text-xs font-medium text-text-primary">
                    Popular for teams
                  </div>
                ) : null}
                <h3 className="text-xl font-medium text-text-primary">{tier.tier}</h3>
                <p className="mt-2 text-sm text-text-dim">{tier.users}</p>
                <div className="mt-6">
                  <span className="text-4xl font-extralight text-text-primary">
                    {tier.price}
                  </span>
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

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-text-dim">
            Hours beyond the included amount are billed at the applicable hourly
            rate below, with loyalty discounts for eligible ITECS managed IT
            clients.
          </p>
        </div>
      </section>

      <section id="hourly" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
                Hourly Rates
              </p>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                For work that falls outside the productized packages.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-text-secondary">
                Hourly work is billed by the type of expertise required. The
                goal is to match the right skill level to the work rather than
                over-scoping simple delivery tasks.
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
                  <div className="text-left md:text-right">
                    <div className="text-2xl font-extralight text-text-primary">
                      {rate.rate}
                    </div>
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
              className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Users className="h-5 w-5 text-brand-accent-bright" />
                <h3 className="font-medium text-text-primary">
                  Loyalty discount for managed IT clients
                </h3>
              </div>
              <div className="space-y-3">
                {AI_LOYALTY_DISCOUNTS.map((discount) => (
                  <div
                    key={discount.plan}
                    className="rounded-xl border border-brand-accent/15 bg-bg-void/35 p-4"
                  >
                    <div className="font-medium text-text-primary">
                      {discount.plan}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {discount.hourlyDiscount} off eligible Tier 1 and Tier 2
                      hourly work, plus {discount.productizedDiscount} off
                      productized offerings. Tier 3 strategist rates are not
                      discounted.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-bg-void py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <Sparkles className="mx-auto mb-5 h-8 w-8 text-brand-accent-bright" />
          <h2 className="text-3xl font-light text-text-primary md:text-4xl">
            The fastest starting point is the AI Readiness Assessment.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            In 1-2 weeks, your leadership team receives a clear picture of
            where AI fits, which platform stack makes sense, and what the
            next 12 months should look like.
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
            Pricing effective May 2026. ITECS reserves the right to scope custom
            engagements to fit unique requirements. All productized offerings
            include the deliverables listed on this page; out-of-scope work is
            billed at the applicable hourly rate.
          </p>
        </div>
      </section>

      <FAQSection />
      <CTASection />

      <JsonLd data={generateFAQSchema(pricingFAQ)} />
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
            Common pricing questions from SMB leaders.
          </h2>
        </div>
        <div className="divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45">
          {pricingFAQ.map((item) => (
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
