import {
  AI_ASSURANCES,
  AI_ASSESSMENT_INTAKE,
  AI_HOURLY_RATES,
  AI_LOYALTY_DISCOUNTS,
  AI_LOYALTY_TERMS,
  AI_PREPAID_OPTIONS,
  AI_PRICING_CATEGORIES,
  AI_PRICING_FAQ,
  AI_RATE_MULTIPLIERS,
  AI_SESSION_BANK_TERMS,
  AI_SEO_OVERVIEW,
  AI_SEO_TIERS,
  CHANGE_ASSURANCE_SERVICE,
  FIELD_EXAM_ANALYZER_USE_CASE,
  FINANCIAL_SERVICES_SPOKE_PAGES,
  FINANCIAL_SERVICES_VERTICAL,
  getAIPricingOffering,
  HOMEPAGE_OUTCOMES_PROOF,
  MANAGED_AI_AGENT_OPERATIONS,
  MANAGED_AI_TERMS,
  MANAGED_AI_TIERS,
  MANUFACTURING_SPOKE_PAGES,
  MANUFACTURING_VERTICAL,
  MIP_DEFINITION_CAPABILITIES,
  MIP_ENTERPRISE_FAQ,
  MIP_METHODOLOGY_STEPS,
  PPV_AGENT_USE_CASE,
  SECURITY_GOVERNANCE_BAND,
  SERVICES,
  SITE_CONFIG,
  TRAINING_SERVICES,
} from "@/lib/constants";
import type { IntelligenceChatMessage, IntelligenceResource } from "./contract";

interface KnowledgeDocument {
  id: string;
  title: string;
  href: string;
  tags: string[];
  body: string;
  resource: IntelligenceResource | null;
}

export interface KnowledgeSelection {
  context: string;
  documentIds: string[];
  resources: IntelligenceResource[];
  suggestions: string[];
}

const STOP_WORDS = new Set([
  "a",
  "about",
  "and",
  "are",
  "can",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "the",
  "this",
  "to",
  "we",
  "what",
  "which",
  "with",
  "you",
]);

const SEARCH_EXPANSIONS: Array<[RegExp, string]> = [
  [/\b(cost|costs|price|prices|pricing|budget|quote|estimate|investment|rate|rates)\b/i, "pricing fee package retainer hourly"],
  [/\b(phone|call|calls|reception|receptionist|after.hours|booking)\b/i, "voice agent AI receptionist missed calls appointment routing"],
  [/\b(sales|pipeline|lead|leads|crm|hubspot|salesforce)\b/i, "CRM sales AI lead follow-up scoring outreach"],
  [/\b(files|documents|markdown|headings?|images?|diagrams?|media|sop|runbooks?|knowledge|opsmemory|sharepoint|notion|confluence|onboarding)\b/i, "ITECS OpsMemory managed knowledge document operations structured Markdown index coverage headings body content relative media links cited answers source priority permissions human review freshness"],
  [/\b(change readiness|change risk|change plan|pre.change|no.go|rollback|blast radius|maintenance window|cab)\b/i, "ITECS Change Assurance AI-assisted IT change readiness infrastructure change review risk tier prerequisites current official vendor guidance technician-reported live verification auditable readiness verdict review-only never executes"],
  [/\b(factory|plant|manufacturer|manufacturing|inventory|quality|ppv|procurement)\b/i, "manufacturing finance operations AI margin working capital"],
  [/\b(lender|lending|borrower|collateral|covenant|field exam|restructuring)\b/i, "financial services AI lender advisory workpaper agent"],
  [/\b(search|seo|rank|ranking|google|visibility|answer engine)\b/i, "AI optimized SEO GEO search visibility Foundation Momentum Velocity"],
  [/\b(safe|safety|security|secure|risk|governance|compliance|shadow ai)\b/i, "AI governance security policy data audit human review"],
  [/\b(train|training|adoption|learn|workshop|champion|enablement)\b/i, "AI training rollout champion program Claude Copilot ChatGPT"],
  [/\b(build|agent|agents|automate|automation|workflow|integration)\b/i, "custom AI agents production automation workflow integration human review"],
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function compact(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value?.trim())).join("\n");
}

const UNVERIFIED_OUTCOME_PATTERNS = [
  /\d+(?:\.\d+)?\s*%/i,
  /\b(?:most|average|avg\.?)\s+(?:clients?|businesses?|customers?|result)/i,
  /\b(?:break even|pay(?:s|ing)? for itself|recover the full cost|roi is immediate)\b/i,
  /\b(?:guarantee(?:d|s)?|never|no hallucinations?|no data leaves|cannot tell|can't tell)\b/i,
  /\bcompliant\b/i,
  /\baudit-ready\b/i,
  /\bevery\b/i,
  /\beverything\b/i,
  /\bno\b/i,
  /\balways (?:available|on|answers?)\b/i,
  /\bwithout (?:sending|exposing|moving)[^.!?]{0,60}\b(?:data|records?)\b/i,
  /\bwithout human intervention\b/i,
  /\bbefore you notice\b/i,
  /\b(?:exactly|within|in)\s+\d+\s*(?:seconds?|minutes?|hours?|days?|weeks?|months?)\b/i,
  /\b\d+\+?\s+hours?\s+(?:back|saved|recovered)\b/i,
  /\b\d+(?:\.\d+)?x\s+(?:faster|more|the workload)\b/i,
];

function hasUnverifiedOutcome(value: string) {
  return UNVERIFIED_OUTCOME_PATTERNS.some((pattern) => pattern.test(value));
}

function safeMarketingText(value: string) {
  return value
    .split(/(?<=[.!?])\s+|[\r\n]+/)
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence &&
        !/^(?:yes|no|correct|absolutely)[.!]?$/i.test(sentence) &&
        !sentence.includes("$") &&
        !hasUnverifiedOutcome(sentence),
    )
    .join(" ");
}

function safeFaq(faq: readonly { question: string; answer: string }[]) {
  return faq
    .filter(
      (item) =>
        !/(price|pricing|cost|how much|free assessment|\$)/i.test(
          `${item.question} ${item.answer}`,
        ),
    )
    .map((item) => ({
      question: safeMarketingText(item.question),
      answer: safeMarketingText(item.answer),
    }))
    .filter((item) => Boolean(item.question) && Boolean(item.answer))
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n");
}

function resource(
  value: Omit<IntelligenceResource, "price" | "meta"> & {
    price?: string | null;
    meta?: string | null;
  },
): IntelligenceResource {
  return {
    ...value,
    price: value.price ?? null,
    meta: value.meta ?? null,
  };
}

function serviceDocuments(): KnowledgeDocument[] {
  return [...SERVICES, ...TRAINING_SERVICES, CHANGE_ASSURANCE_SERVICE].map((service) => ({
    id: `service:${service.slug}`,
    title: service.shortTitle,
    href: service.href,
    tags: [service.slug, service.title, ...service.keywords, ...service.integrations],
    body: compact([
      safeMarketingText(service.description),
      safeMarketingText(service.heroSummary),
      safeMarketingText(service.longDescription),
      `Capabilities: ${service.features
        .map(safeMarketingText)
        .filter(Boolean)
        .join("; ")}`,
      `Delivery: ${service.howItWorks
        .map(
          (step) =>
            `${safeMarketingText(step.step)}: ${safeMarketingText(step.description)}`,
        )
        .filter((step) => step !== ": ")
        .join("; ")}`,
      `Integrations and platforms: ${service.integrations.join(", ")}`,
      safeFaq(service.faq),
    ]),
    resource: resource({
      id: `service:${service.slug}`,
      kind: "service",
      eyebrow: "ITECS AI Service",
      title: service.shortTitle,
      summary:
        safeMarketingText(service.description) ||
        `Explore the published capabilities and delivery approach for ${service.shortTitle}.`,
      href: service.href,
    }),
  }));
}

const SERVICE_PAGE_PRICING_SLUGS = new Set([
  "automation",
  "training",
  "ai-receptionist",
  "crm-sales-ai",
  "ai-knowledge-base",
]);

function displayPrices(value: string) {
  const serviceEstimate = value.split(/compared to/i)[0];
  const matches = serviceEstimate.match(
    /\$[\d,]+(?:\s*[–-]\s*\$?[\d,]+)?(?:\s*(?:per\s+agent|per\s+session)|\/(?:month|mo|hr|hour|session))?/gi,
  );

  return matches?.slice(0, 3).join(" · ") ?? "Published service-page estimate";
}

function publishedPricingText(value: string) {
  return value
    .split(/(?<=[.!?])\s+|[\r\n]+/)
    .map((sentence) => sentence.split(/\s+(?:—\s+)?compared to\b/i)[0].trim())
    .filter(
      (sentence) =>
        sentence.includes("$") && !hasUnverifiedOutcome(sentence),
    )
    .join(" ");
}

function servicePagePricingDocuments(): KnowledgeDocument[] {
  return [...SERVICES, ...TRAINING_SERVICES]
    .filter((service) => SERVICE_PAGE_PRICING_SLUGS.has(service.slug))
    .flatMap((service) => {
      const pricingFaq = service.faq
        .filter((item) =>
          /(price|pricing|cost|how much|\$)/i.test(`${item.question} ${item.answer}`),
        )
        .map((item) => ({
          question: item.question,
          answer: publishedPricingText(item.answer),
        }))
        .filter((item) => Boolean(item.answer));

      if (!pricingFaq.length) return [];

      const publishedCopy = pricingFaq
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n");
      const id = `pricing:service-page-${service.slug}`;

      return [
        {
          id,
          title: `${service.shortTitle} published service-page estimate`,
          href: service.href,
          tags: [
            "pricing",
            "cost",
            "service-page estimate",
            service.shortTitle,
            service.slug,
          ],
          body: compact([
            "This estimate is published on the current service page but is not repeated in the main /pricing index. Present it as a planning estimate, not a firm quote.",
            publishedCopy,
            "Final pricing depends on confirmed scope, integrations, volume, security requirements, and ongoing support needs.",
          ]),
          resource: resource({
            id,
            kind: "pricing",
            eyebrow: "Published Service Estimate",
            title: service.shortTitle,
            summary: pricingFaq[0].answer,
            href: service.href,
            price: displayPrices(publishedCopy),
            meta: "Final scope confirmed before work begins",
          }),
        } satisfies KnowledgeDocument,
      ];
    });
}

function pricingDocuments(): KnowledgeDocument[] {
  const categoryOverviews = AI_PRICING_CATEGORIES.map((category) => ({
    id: `pricing:category-${slugify(category.title)}`,
    title: `${category.title} pricing overview`,
    href: "/pricing",
    tags: [
      "pricing",
      "cost",
      "comparison",
      category.eyebrow,
      category.title,
      ...category.offerings.map((offering) => offering.name),
    ],
    body: compact([
      `Approved public ${category.title} pricing:`,
      ...category.offerings.map((offering) =>
        compact([
          `${offering.name}: ${offering.price}.`,
          offering.duration ? `Typical duration: ${offering.duration}.` : null,
          offering.scope ? `Published scope: ${offering.scope}.` : null,
          safeMarketingText(offering.description),
          `Included: ${offering.included.join("; ")}`,
          offering.bestFor ? `Best for: ${offering.bestFor}` : null,
        ]),
      ),
      "These are published planning prices, starting points, or ranges—not fixed or firm quotes. Custom scope is confirmed before work begins.",
    ]),
    resource: resource({
      id: `pricing:category-${slugify(category.title)}`,
      kind: "pricing",
      eyebrow: category.eyebrow,
      title: `${category.title} options`,
      summary: safeMarketingText(category.description),
      href: "/pricing",
      meta: `${category.offerings.length} published offerings`,
    }),
  })) satisfies KnowledgeDocument[];

  const productized = AI_PRICING_CATEGORIES.flatMap((category) =>
    category.offerings.map((offering) => {
      const id = `pricing:${slugify(offering.name)}`;
      const href = offering.href ?? "/pricing";

      return {
        id,
        title: offering.name,
        href,
        tags: [
          "pricing",
          "cost",
          "investment",
          category.title,
          offering.name,
          offering.bestFor ?? "",
        ],
        body: compact([
          `Approved public price: ${offering.price}.`,
          offering.duration ? `Typical duration: ${offering.duration}.` : null,
          offering.scope ? `Published scope: ${offering.scope}.` : null,
          safeMarketingText(offering.description),
          `Included: ${offering.included.join("; ")}`,
          offering.bestFor ? `Best for: ${offering.bestFor}` : null,
          "Custom scope is confirmed before work begins. Do not turn a starting point or range into a firm quote.",
        ]),
        resource: resource({
          id,
          kind: "pricing",
          eyebrow: category.title,
          title: offering.name,
          summary: safeMarketingText(offering.description),
          href,
          price: offering.price,
          meta: offering.duration ?? offering.scope ?? null,
        }),
      } satisfies KnowledgeDocument;
    }),
  );

  const managed = MANAGED_AI_TIERS.map((tier) => {
    const id = `pricing:${slugify(tier.tier)}`;

    return {
      id,
      title: tier.tier,
      href: "/pricing#managed-intelligence",
      tags: ["managed AI", "retainer", "monthly", tier.users, tier.tier],
      body: `${tier.price}; ${tier.users} users; ${tier.includedHours}. Included: ${tier.features.join("; ")}. This Managed Intelligence Services adoption tier is distinct from production Agent Operations. Included hours do not roll over.`,
      resource: resource({
        id,
        kind: "pricing",
        eyebrow: "Managed Intelligence Services",
        title: tier.tier,
        summary: tier.features.join(" · "),
        href: "/pricing#managed-intelligence",
        price: tier.price,
        meta: `${tier.users} · ${tier.includedHours}`,
      }),
    } satisfies KnowledgeDocument;
  });

  const agentOperations = MANAGED_AI_AGENT_OPERATIONS.prices.map((option) => {
    const id = `pricing:${slugify(`${MANAGED_AI_AGENT_OPERATIONS.tier}-${option.agents}`)}`;

    return {
      id,
      title: `${MANAGED_AI_AGENT_OPERATIONS.tier} — ${option.agents}`,
      href: "/pricing#managed-intelligence",
      tags: [
        "managed intelligence",
        "agent operations",
        "monitoring",
        "monthly",
        option.agents,
      ],
      body: compact([
        `${option.agents}: ${option.price}.`,
        MANAGED_AI_AGENT_OPERATIONS.description,
        `Included: ${MANAGED_AI_AGENT_OPERATIONS.features.join("; ")}.`,
        ...MANAGED_AI_TERMS,
      ]),
      resource: resource({
        id,
        kind: "pricing",
        eyebrow: "Production Operations",
        title: `${MANAGED_AI_AGENT_OPERATIONS.tier} — ${option.agents}`,
        summary: MANAGED_AI_AGENT_OPERATIONS.description,
        href: "/pricing#managed-intelligence",
        price: option.price,
        meta: "Separate from the production build fee",
      }),
    } satisfies KnowledgeDocument;
  });

  const managedOverview: KnowledgeDocument = {
    id: "pricing:managed-ai-overview",
    title: "Managed Intelligence Services and production Agent Operations",
    href: "/pricing#managed-intelligence",
    tags: [
      "managed AI",
      "adoption",
      "advisory",
      "retainer",
      "agent operations",
      "production agent",
      ...MANAGED_AI_TIERS.map((tier) => tier.tier),
    ],
    body: compact([
      "ITECS operates as a Managed Intelligence Provider. Managed Intelligence Services adoption tiers are distinct from production Agent Operations.",
      ...MANAGED_AI_TIERS.map(
        (tier) =>
          `${tier.tier}: ${tier.price}; ${tier.users}; ${tier.includedHours}. Included: ${tier.features.join("; ")}.`,
      ),
      ...MANAGED_AI_AGENT_OPERATIONS.prices.map(
        (option) => `${option.agents}: ${option.price}.`,
      ),
      `Agent Operations includes ${MANAGED_AI_AGENT_OPERATIONS.features.join("; ")}.`,
      ...MANAGED_AI_TERMS,
      "Published monthly amounts are planning prices. Final scope is confirmed before work begins.",
    ]),
    resource: null,
  };

  const hourly: KnowledgeDocument = {
    id: "pricing:hourly-rates",
    title: "AI hourly rates and service conditions",
    href: "/pricing#hourly",
    tags: ["hourly", "rate", "implementer", "specialist", "strategist", "after hours"],
    body: compact([
      ...AI_HOURLY_RATES.map(
        (tier) => `${tier.tier} (${tier.role}): ${tier.rate}. Typical work: ${tier.typicalWork}.`,
      ),
      `Rate conditions: ${AI_RATE_MULTIPLIERS.map(
        (item) => `${item.condition}: ${item.multiplier}`,
      ).join("; ")}.`,
      `Existing-client loyalty: ${AI_LOYALTY_DISCOUNTS.map(
        (item) =>
          `${item.benefit} — MSP Select: ${item.select}; MSP Pro: ${item.pro}; MSP Elite: ${item.elite}`,
      ).join("; ")}.`,
      ...AI_LOYALTY_TERMS,
      "The public pricing does not specify whether loyalty discounts and rate multipliers combine or the order in which they would be applied. Do not calculate a combined effective rate; quote each published component and recommend confirmation for the billed rate.",
    ]),
    resource: resource({
      id: "pricing:hourly-rates",
      kind: "pricing",
      eyebrow: "Published Hourly Rates",
      title: "AI delivery and strategy rates",
      summary: AI_HOURLY_RATES.map((tier) => `${tier.role}: ${tier.rate}`).join(" · "),
      href: "/pricing#hourly",
      price: `${AI_HOURLY_RATES[0].rate}–${AI_HOURLY_RATES[AI_HOURLY_RATES.length - 1].rate}`,
      meta: "Conditions and eligible loyalty discounts apply",
    }),
  };

  const prepaid = AI_PREPAID_OPTIONS.map((option) => {
    const id = `pricing:${slugify(option.name)}`;

    return {
      id,
      title: option.name,
      href: "/pricing#prepaid",
      tags: ["pricing", "prepaid", "retainer", "session bank", option.name],
      body: compact([
        `${option.name}: ${option.price} for ${option.unit}.`,
        ...option.terms,
        option.bestFor,
        ...(option.name.includes("Session Bank") ? AI_SESSION_BANK_TERMS : []),
      ]),
      resource: resource({
        id,
        kind: "pricing",
        eyebrow: "Prepaid Option",
        title: option.name,
        summary: option.bestFor,
        href: "/pricing#prepaid",
        price: option.price,
        meta: option.unit,
      }),
    } satisfies KnowledgeDocument;
  });

  const assurances: KnowledgeDocument = {
    id: "pricing:assurances-and-boundaries",
    title: "AI delivery assurances and boundaries",
    href: "/pricing",
    tags: [
      "warranty",
      "acceptance",
      "human review",
      "data handling",
      "regulated",
      "CUI",
      "HIPAA",
    ],
    body: compact([
      ...AI_ASSURANCES.map(
        (assurance) => `${assurance.title}: ${assurance.description}`,
      ),
      ...AI_PRICING_FAQ.map((item) => `Q: ${item.question} A: ${item.answer}`),
    ]),
    resource: null,
  };

  return [
    ...categoryOverviews,
    managedOverview,
    ...productized,
    ...managed,
    ...agentOperations,
    ...prepaid,
    hourly,
    assurances,
  ];
}

function seoDocuments(): KnowledgeDocument[] {
  const overview: KnowledgeDocument = {
    id: "service:ai-optimized-seo",
    title: "AI-Optimized SEO",
    href: AI_SEO_OVERVIEW.href,
    tags: ["AI SEO", "GEO", "Google", "answer engines", ...AI_SEO_OVERVIEW.keywords],
    body: compact([
      safeMarketingText(AI_SEO_OVERVIEW.heroSubline),
      safeMarketingText(AI_SEO_OVERVIEW.definitionBody),
      `Method: ${AI_SEO_OVERVIEW.methodology
        .map(
          (step) =>
            `${safeMarketingText(step.title)}: ${safeMarketingText(step.description)}`,
        )
        .join("; ")}`,
      safeFaq(AI_SEO_OVERVIEW.faq),
    ]),
    resource: resource({
      id: "service:ai-optimized-seo",
      kind: "service",
      eyebrow: "ITECS AI Service",
      title: "AI-Optimized SEO",
      summary: safeMarketingText(AI_SEO_OVERVIEW.description),
      href: AI_SEO_OVERVIEW.href,
    }),
  };

  const tiers = AI_SEO_TIERS.map((tier) => {
    const id = `pricing:seo-${tier.slug}`;
    const planningTimeline = tier.projectTimeline
      ? safeMarketingText(tier.projectTimeline)
      : "";

    return {
      id,
      title: tier.name,
      href: tier.href,
      tags: ["AI SEO", "GEO", "pricing", tier.name, ...tier.keywords],
      body: compact([
        `Approved public price: ${tier.priceLabel}. Price model: ${tier.priceModel}.`,
        tier.minimumTerm ? `Minimum term: ${tier.minimumTerm}.` : null,
        planningTimeline ? `Published planning timeline: ${planningTimeline}.` : null,
        safeMarketingText(tier.overview),
        tier.internalTiers?.length
          ? `Published project levels: ${tier.internalTiers
              .map((item) => `${item.name} ${item.price}, ${item.pages}, for ${item.target}`)
              .join("; ")}.`
          : null,
        tier.addOns?.length
          ? `Add-ons: ${tier.addOns
              .map(
                (item) =>
                  `${item.name} ${item.price}: ${safeMarketingText(item.description)}`,
              )
              .join("; ")}.`
          : null,
        `Highlights: ${tier.cardHighlights
          .map(safeMarketingText)
          .filter(Boolean)
          .join("; ")}`,
        safeFaq(tier.faq),
      ]),
      resource: resource({
        id,
        kind: "pricing",
        eyebrow: tier.eyebrow,
        title: tier.name,
        summary: safeMarketingText(tier.cardTagline),
        href: tier.href,
        price: tier.priceLabel,
        meta: tier.minimumTerm ?? tier.projectTimeline ?? null,
      }),
    } satisfies KnowledgeDocument;
  });

  return [overview, ...tiers];
}

function industryDocuments(): KnowledgeDocument[] {
  const verticals = [MANUFACTURING_VERTICAL, FINANCIAL_SERVICES_VERTICAL].map(
    (vertical) => ({
      id: `industry:${slugify(vertical.shortTitle)}`,
      title: vertical.shortTitle,
      href: vertical.href,
      tags: [vertical.shortTitle, ...vertical.keywords],
      body: compact([
        "The following items are published ITECS industry solution scenarios, not measured client results.",
        safeMarketingText(vertical.heroSummary),
        safeMarketingText(vertical.longDescription),
        `Use cases: ${vertical.useCases
          .map(
            (item) =>
              `${safeMarketingText(item.title)}: ${safeMarketingText(item.description)}. Intended workflow outcome: ${safeMarketingText(item.outcome)}`,
          )
          .join("; ")}`,
        `Governance: ${vertical.governance
          .map(
            (group) =>
              `${safeMarketingText(group.title)}: ${safeMarketingText(group.description)}; ${group.points
                .map(safeMarketingText)
                .filter(Boolean)
                .join("; ")}`,
          )
          .join("; ")}`,
        safeFaq(vertical.faq),
      ]),
      resource: resource({
        id: `industry:${slugify(vertical.shortTitle)}`,
        kind: "industry",
        eyebrow: "Industry Solution",
        title: vertical.shortTitle,
        summary: `${safeMarketingText(vertical.description)} Illustrative industry solution.`,
        href: vertical.href,
      }),
    }),
  );

  const flagship = [PPV_AGENT_USE_CASE, FIELD_EXAM_ANALYZER_USE_CASE].map((item) => ({
    id: `industry:${slugify(item.shortTitle)}`,
    title: item.shortTitle,
    href: item.href,
    tags: [item.shortTitle, ...item.keywords],
    body: compact([
      "This is a published ITECS solution scenario, not a live customer deployment or measured result.",
      safeMarketingText(item.heroSummary),
      safeMarketingText(item.longDescription),
      `Capabilities: ${item.capabilities
        .map(
          (group) =>
            `${safeMarketingText(group.title)}: ${safeMarketingText(group.description)}; ${group.points
              .map(safeMarketingText)
              .filter(Boolean)
              .join("; ")}`,
        )
        .join("; ")}`,
      `Data inputs: ${item.dataInputs
        .map(
          (input) =>
            `${safeMarketingText(input.label)}: ${safeMarketingText(input.description)}`,
        )
        .join("; ")}`,
      `Governance: ${item.governance
        .map(safeMarketingText)
        .filter(Boolean)
        .join("; ")}`,
      safeFaq(item.faq),
    ]),
    resource: resource({
      id: `industry:${slugify(item.shortTitle)}`,
      kind: "industry",
      eyebrow: "Featured AI Use Case",
      title: item.shortTitle,
      summary: `${safeMarketingText(item.description)} Illustrative solution scenario.`,
      href: item.href,
    }),
  }));

  const spokes = [...MANUFACTURING_SPOKE_PAGES, ...FINANCIAL_SERVICES_SPOKE_PAGES].map(
    (item) => ({
      id: `industry:${item.slug}`,
      title: item.shortTitle,
      href: item.href,
      tags: [item.shortTitle, ...item.keywords],
      body: compact([
        "This is a published ITECS solution scenario, not a live customer deployment or measured result.",
        safeMarketingText(item.heroSummary),
        safeMarketingText(item.longDescription),
        `Capabilities: ${item.capabilities
          .map(
            (group) =>
              `${safeMarketingText(group.title)}: ${safeMarketingText(group.description)}; ${group.points
                .map(safeMarketingText)
                .filter(Boolean)
                .join("; ")}`,
          )
          .join("; ")}`,
        `Data inputs: ${item.dataInputs
          .map(
            (input) =>
              `${safeMarketingText(input.label)}: ${safeMarketingText(input.description)}`,
          )
          .join("; ")}`,
        `Governance: ${item.governance
          .map(safeMarketingText)
          .filter(Boolean)
          .join("; ")}`,
        safeFaq(item.faq),
      ]),
      resource: resource({
        id: `industry:${item.slug}`,
        kind: "industry",
        eyebrow: "Industry AI Use Case",
        title: item.shortTitle,
        summary: `${safeMarketingText(item.description)} Illustrative solution scenario.`,
        href: item.href,
      }),
    }),
  );

  return [...verticals, ...flagship, ...spokes];
}

const COMPANY_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "company:overview",
    title: "ITECS AI company overview",
    href: "/about",
    tags: ["ITECS", "Dallas", "company", "about", "Managed Intelligence Provider", "MIP"],
    body: compact([
      `${SITE_CONFIG.name} is the AI consulting, automation, training, and Managed Intelligence practice of ${SITE_CONFIG.legalName}.`,
      SITE_CONFIG.description,
      `ITECS was founded in ${SITE_CONFIG.foundingYear} and is based in ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state}.`,
      `Approved operating proof on the public site: ${HOMEPAGE_OUTCOMES_PROOF.metrics
        .map((metric) => `${metric.value} ${metric.label}`)
        .join("; ")}.`,
      `Contact: ${SITE_CONFIG.phone}; ${SITE_CONFIG.email}; ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.zip}.`,
      "ITECS is vendor-neutral and evaluates major commercial AI platforms against the client's environment, use case, security requirements, and budget.",
    ]),
    resource: resource({
      id: "company:overview",
      kind: "guide",
      eyebrow: "About ITECS",
      title: "24+ years of operating discipline behind AI",
      summary:
        "Dallas-based ITECS connects AI strategy and engineering to managed IT, cybersecurity, governance, and long-term operations.",
      href: "/about",
      meta: "Founded 2002 · Dallas, Texas",
    }),
  },
  {
    id: "service:managed-intelligence",
    title: "Managed Intelligence Provider",
    href: "/managed-intelligence-provider",
    tags: ["MIP", "Managed Intelligence", "managed AI", "monitoring", "governance", "operations"],
    body: compact([
      MIP_DEFINITION_CAPABILITIES.definition,
      MIP_DEFINITION_CAPABILITIES.workforce,
      `Capabilities: ${MIP_DEFINITION_CAPABILITIES.capabilities
        .map((item) => `${item.title}: ${item.description}`)
        .join("; ")}`,
      `Method: ${MIP_METHODOLOGY_STEPS
        .map((step) => `${step.title}: ${step.description}`)
        .join("; ")}`,
      safeFaq(MIP_ENTERPRISE_FAQ),
    ]),
    resource: resource({
      id: "service:managed-intelligence",
      kind: "service",
      eyebrow: "Managed AI Operations",
      title: "Managed Intelligence Provider",
      summary: MIP_DEFINITION_CAPABILITIES.definition,
      href: "/managed-intelligence-provider",
    }),
  },
  {
    id: "guide:security-governance",
    title: "ITECS AI security and governance approach",
    href: "/consulting",
    tags: ["security", "governance", "responsible AI", "human in the loop", "NIST", "SOC 2", "CMMC", "HIPAA"],
    body: compact([
      SECURITY_GOVERNANCE_BAND.description,
      `Frameworks: ${SECURITY_GOVERNANCE_BAND.frameworks
        .map((item) => `${item.name}: ${item.detail}`)
        .join("; ")}`,
      `Controls: ${SECURITY_GOVERNANCE_BAND.controls
        .map((item) => `${item.title}: ${item.detail}`)
        .join("; ")}`,
    ]),
    resource: resource({
      id: "guide:security-governance",
      kind: "guide",
      eyebrow: "Governed AI",
      title: "Security, compliance, and human review",
      summary: SECURITY_GOVERNANCE_BAND.description,
      href: "/consulting",
    }),
  },
  {
    id: "guide:assessment-intake",
    title: "Free intake form versus paid AI Readiness Assessment",
    href: AI_ASSESSMENT_INTAKE.href,
    tags: ["assessment", "free", "intake", "readiness", "starting point", "consultation"],
    body: `${AI_ASSESSMENT_INTAKE.costLabel}: ${AI_ASSESSMENT_INTAKE.purpose} It ${
      AI_ASSESSMENT_INTAKE.formalAssessmentDelivered ? "does" : "does not"
    } itself deliver the formal assessment. The separate, formal AI Readiness Assessment in the public pricing catalog is a paid ${getAIPricingOffering("AI Readiness Assessment").price}, 1–2 week engagement with a current-state audit, prioritized use-case map, platform recommendation, 12-month roadmap, executive deliverable, and leadership workshop. Clearly distinguish these two when answering.`,
    resource: resource({
      id: "guide:assessment-intake",
      kind: "guide",
      eyebrow: "No-Cost First Step",
      title: "Request an AI readiness conversation",
      summary:
        "Share your top AI goal and company size so ITECS can route the right follow-up. The formal assessment is a separate paid engagement.",
      href: AI_ASSESSMENT_INTAKE.href,
      meta: "Initial intake · no sensitive data",
    }),
  },
];

const CATALOG_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "catalog:services",
    title: "ITECS AI service catalog",
    href: "/services",
    tags: ["services", "offerings", "solutions", "what do you do", "catalog"],
    body: [...SERVICES, ...TRAINING_SERVICES, CHANGE_ASSURANCE_SERVICE]
      .map(
        (item) =>
          `${item.shortTitle}: ${safeMarketingText(item.description)} (${item.href})`,
      )
      .concat(
        `AI-Optimized SEO: ${safeMarketingText(AI_SEO_OVERVIEW.description)} (${AI_SEO_OVERVIEW.href})`,
        `${MANUFACTURING_VERTICAL.shortTitle}: ${safeMarketingText(MANUFACTURING_VERTICAL.description)}; illustrative industry solution (${MANUFACTURING_VERTICAL.href})`,
        `${FINANCIAL_SERVICES_VERTICAL.shortTitle}: ${safeMarketingText(FINANCIAL_SERVICES_VERTICAL.description)}; illustrative industry solution (${FINANCIAL_SERVICES_VERTICAL.href})`,
      )
      .join("\n"),
    resource: resource({
      id: "catalog:services",
      kind: "guide",
      eyebrow: "Explore",
      title: "ITECS AI services",
      summary:
        "Strategy, secure adoption, custom agents, automation, training, managed operations, AI products, and industry-specific workflows.",
      href: "/services",
    }),
  },
  {
    id: "catalog:pricing",
    title: "ITECS AI approved public pricing index",
    href: "/pricing",
    tags: ["pricing", "prices", "cost", "investment", "all pricing", "packages"],
    body: compact([
      ...AI_PRICING_CATEGORIES.flatMap((category) =>
        category.offerings.map(
          (offering) => `${category.title} — ${offering.name}: ${offering.price}`,
        ),
      ),
      ...MANAGED_AI_TIERS.map((tier) => `${tier.tier}: ${tier.price}`),
      ...MANAGED_AI_AGENT_OPERATIONS.prices.map(
        (option) =>
          `${MANAGED_AI_AGENT_OPERATIONS.tier} — ${option.agents}: ${option.price}`,
      ),
      ...AI_PREPAID_OPTIONS.map(
        (option) => `${option.name}: ${option.price} for ${option.unit}`,
      ),
      ...AI_HOURLY_RATES.map((tier) => `${tier.tier}: ${tier.rate}`),
      ...AI_SEO_TIERS.map((tier) => `${tier.name}: ${tier.priceLabel}`),
      "These are approved public starting points and ranges, not a firm custom quote. Current constants.ts pricing wins over older markdown price sheets and older service-page copy.",
    ]),
    resource: resource({
      id: "catalog:pricing",
      kind: "pricing",
      eyebrow: "Transparent Pricing",
      title: "Public AI pricing",
      summary:
        "Compare discovery, guided and local builds, custom production work, Managed Intelligence Services, Agent Operations, prepaid options, hourly rates, and AI SEO.",
      href: "/pricing",
      meta: "Published starting points and scoped ranges",
    }),
  },
];

const KNOWLEDGE_DOCUMENTS = [
  ...COMPANY_DOCUMENTS,
  ...CATALOG_DOCUMENTS,
  ...serviceDocuments(),
  ...servicePagePricingDocuments(),
  ...pricingDocuments(),
  ...seoDocuments(),
  ...industryDocuments(),
];

const INDEXED_KNOWLEDGE_DOCUMENTS = KNOWLEDGE_DOCUMENTS.map((document) => ({
  document,
  normalizedTitle: document.title.toLowerCase(),
  normalizedTags: document.tags.join(" ").toLowerCase(),
  normalizedBody: document.body.toLowerCase(),
}));

const KNOWLEDGE_BY_ID = new Map(
  KNOWLEDGE_DOCUMENTS.map((document) => [document.id, document]),
);

const MAX_RANKED_DOCUMENTS = 8;
const MAX_PINNED_DOCUMENTS = 6;

function pinnedKnowledgeDocumentIds(query: string, pagePath: string) {
  const ids: string[] = [];
  const pin = (...candidates: string[]) => {
    for (const id of candidates) {
      if (!ids.includes(id) && KNOWLEDGE_BY_ID.has(id)) ids.push(id);
    }
  };
  const pricingIntent =
    /\b(cost|costs|price|prices|pricing|budget|quote|estimate|investment|rate|rates|fee|fees|cheaper|expensive)\b|\$/i.test(
      query,
    );

  if (/\b(assessment|readiness intake|intake form)\b/i.test(query)) {
    pin("guide:assessment-intake", "pricing:ai-readiness-assessment");
  }

  if (/\b(ai pilot implementation|small pilot|production pilot)\b/i.test(query)) {
    pin(
      "pricing:category-guided-local-agent-builds",
      "pricing:guided-build-sprint-4-sessions",
      "pricing:guided-build-intensive-8-sessions",
      "pricing:local-agent-sprint",
      "pricing:departmental-local-agent",
      "pricing:category-custom-build",
    );
  }

  if (/\bguided build\b/i.test(query)) {
    pin(
      "pricing:category-guided-local-agent-builds",
      "pricing:guided-build-session",
      "pricing:guided-build-sprint-4-sessions",
      "pricing:guided-build-intensive-8-sessions",
    );
  }

  if (/\bexecutive (?:ai )?(?:literacy )?briefing\b/i.test(query)) {
    pin("pricing:executive-ai-literacy-briefing");
  }

  if (
    /\b(custom (?:ai )?(?:agent|assistant|build)|agent discovery|technical specification|proof of concept|prototype|single-workflow|workpaper agent|multi-agent|process redesign)\b/i.test(
      query,
    )
  ) {
    pin("pricing:category-custom-build");
  }

  if (/\b(proof of concept|prototype|poc)\b/i.test(query)) {
    pin("pricing:proof-of-concept-prototype");
  }

  if (/\b(agent discovery|technical specification)\b/i.test(query)) {
    pin("pricing:agent-discovery-technical-specification");
  }

  if (/\b(single-workflow|single workflow production agent)\b/i.test(query)) {
    pin("pricing:single-workflow-production-agent");
  }

  if (/\b(integrated|line.of.business|workpaper agent)\b/i.test(query)) {
    pin("pricing:integrated-line-of-business-agent");
  }

  if (/\b(multi-agent|process redesign)\b/i.test(query)) {
    pin("pricing:multi-agent-system-ai-augmented-process-redesign");
  }

  if (
    /\b(managed ai|managed intelligence|agent operations|production-agent operations|operate (?:our|a|the) production agent|adoption retainer|advisory retainer)\b/i.test(
      query,
    )
  ) {
    pin("pricing:managed-ai-overview");
  }

  if (/\bmis growth\b/i.test(query)) {
    pin("pricing:mis-growth");
  }

  if (/\b(agent operations|operate (?:our|a|the) production agent)\b/i.test(query)) {
    pin(
      "pricing:agent-operations-1-production-agent",
      "pricing:agent-operations-2-production-agents",
      "pricing:agent-operations-3-production-agents",
      "pricing:agent-operations-4-agents-aggressive-data-refresh-cadence-or-tight-review-slas",
    );
  }

  if (/\b(tier [123]|hourly|after.hours|msp elite|msp complete|multiplier)\b/i.test(query)) {
    pin("pricing:hourly-rates");
  }

  if (/\bdata readiness\b/i.test(query)) {
    pin("pricing:data-readiness-sprint");
  }

  if (/\b(ai retainer|session bank|prepaid)\b/i.test(query)) {
    pin(
      "pricing:ai-retainer",
      "pricing:guided-build-session-bank-10",
      "pricing:guided-build-session-bank-20",
    );
  }

  if (/\b(ai receptionist|receptionist|missed calls?)\b/i.test(query)) {
    pin("pricing:service-page-ai-receptionist");
  }

  if (/\b(crm|sales ai|lead follow-up)\b/i.test(query)) {
    pin("pricing:service-page-crm-sales-ai");
  }

  if (/\bseo\b/i.test(query) && /\b(foundation|momentum|velocity)\b/i.test(query)) {
    pin("pricing:seo-foundation", "pricing:seo-momentum", "pricing:seo-velocity");
  }

  if (pricingIntent) {
    const currentPageEstimate = KNOWLEDGE_DOCUMENTS.find(
      (document) =>
        document.id.startsWith("pricing:service-page-") &&
        document.href === pagePath,
    );
    if (currentPageEstimate) pin(currentPageEstimate.id);
    pin("catalog:pricing");
  }

  return ids.slice(0, MAX_PINNED_DOCUMENTS);
}

export function buildIntelligenceRetrievalQuery(
  history: IntelligenceChatMessage[],
  message: string,
) {
  const needsEarlierContext =
    /\b(that|those|these|it|its|this one|that one|the former|the latter|same one|start smaller|too|as well)\b/i.test(
      message,
    );

  return [
    ...(needsEarlierContext
      ? history.slice(-4).map((item) => item.content)
      : []),
    message,
  ].join("\n");
}

export function auditIntelligenceKnowledgeDocuments() {
  return KNOWLEDGE_DOCUMENTS.map((document) => ({
    id: document.id,
    body: document.body,
    resourceSummary: document.resource?.summary ?? "",
  }));
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9$]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandedQuery(value: string) {
  const additions = SEARCH_EXPANSIONS.filter(([pattern]) => pattern.test(value)).map(
    ([, expansion]) => expansion,
  );
  return `${value} ${additions.join(" ")}`;
}

function scoreDocument(
  indexed: (typeof INDEXED_KNOWLEDGE_DOCUMENTS)[number],
  query: string,
  queryTokens: string[],
  pagePath: string,
) {
  const { document, normalizedTitle: title, normalizedTags: tags, normalizedBody: body } = indexed;
  const normalizedQuery = query.toLowerCase().trim();
  let score = 0;

  if (normalizedQuery.length > 3 && title.includes(normalizedQuery)) score += 28;
  if (normalizedQuery.length > 5 && body.includes(normalizedQuery)) score += 12;
  if (document.href === pagePath) score += 24;
  if (pagePath !== "/" && document.href.startsWith(pagePath)) score += 10;

  for (const token of queryTokens) {
    if (title.includes(token)) score += 9;
    if (tags.includes(token)) score += 6;
    if (body.includes(token)) score += 2;
  }

  if (/\b(price|pricing|cost|budget|quote|rate|investment)\b/i.test(query)) {
    if (document.id.startsWith("pricing:") || document.id === "catalog:pricing") {
      score += 14;
    }
  }

  return score;
}

function suggestionsFor(documents: KnowledgeDocument[]) {
  const ids = documents.map((document) => document.id).join(" ");

  if (ids.includes("pricing:")) {
    return [
      "What is the most practical first engagement?",
      "Compare MIS and Agent Operations",
      "What affects a custom agent estimate?",
    ];
  }

  if (ids.includes("industry:")) {
    return [
      "Which use case should we prioritize first?",
      "What data would ITECS need?",
      "Show me the relevant pricing path",
    ];
  }

  if (ids.includes("security") || ids.includes("managed-intelligence")) {
    return [
      "How does human review work?",
      "What is included in Managed Intelligence?",
      "How should we start safely?",
    ];
  }

  return [
    "Which ITECS service fits our workflow?",
    "Show me the public pricing options",
    "How does ITECS take AI into production?",
  ];
}

export function retrieveItecsKnowledge(
  query: string,
  pagePath: string,
  currentMessage = query,
): KnowledgeSelection {
  const expanded = expandedQuery(query);
  const queryTokens = [...new Set(tokenize(expanded))];
  const ranked = INDEXED_KNOWLEDGE_DOCUMENTS.map((indexed) => ({
    document: indexed.document,
    score: scoreDocument(indexed, query, queryTokens, pagePath),
  })).sort((left, right) => right.score - left.score);
  const pinnedDocumentIds = [
    ...pinnedKnowledgeDocumentIds(currentMessage, pagePath),
    ...pinnedKnowledgeDocumentIds(query, pagePath),
  ]
    .filter((id, index, ids) => ids.indexOf(id) === index)
    .slice(0, MAX_PINNED_DOCUMENTS);
  const pinned = pinnedDocumentIds
    .map((id) => KNOWLEDGE_BY_ID.get(id))
    .filter((document): document is KnowledgeDocument => Boolean(document));
  const pinnedIds = new Set(pinned.map((document) => document.id));
  let selected = [
    ...pinned,
    ...ranked
      .filter((item) => item.score > 0 && !pinnedIds.has(item.document.id))
      .map((item) => item.document),
  ].slice(0, MAX_RANKED_DOCUMENTS);

  if (!selected.length) {
    selected = KNOWLEDGE_DOCUMENTS.filter((document) =>
      ["company:overview", "catalog:services", "catalog:pricing"].includes(document.id),
    );
  }

  if (!selected.some((document) => document.id === "company:overview")) {
    const company = KNOWLEDGE_DOCUMENTS.find(
      (document) => document.id === "company:overview",
    );
    if (company) selected.push(company);
  }

  const resources = selected
    .map((document) => document.resource)
    .filter((item): item is IntelligenceResource => Boolean(item))
    .filter(
      (item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index,
    )
    .slice(0, 4);

  const context = selected
    .map(
      (document) =>
        `<source id="${document.id}" title="${document.title}" href="${document.href}">\n${document.body.slice(0, 4_500)}\n</source>`,
    )
    .join("\n\n");

  return {
    context,
    documentIds: selected.map((document) => document.id),
    resources,
    suggestions: suggestionsFor(selected),
  };
}
