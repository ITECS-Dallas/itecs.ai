import {
  AI_ASSESSMENT_INTAKE,
  AI_HOURLY_RATES,
  AI_LOYALTY_DISCOUNTS,
  AI_PRICING_CATEGORIES,
  AI_RATE_MULTIPLIERS,
  AI_SEO_TIERS,
  FIELD_EXAM_ANALYZER_USE_CASE,
  MANAGED_AI_AGENT_OPERATIONS,
  MANAGED_AI_TIERS,
  PPV_AGENT_USE_CASE,
  SERVICES,
} from "@/lib/constants";
import type { IntelligenceChatMessage } from "./contract";

export type IntelligencePrecisionIntent =
  | "pilot_replacement"
  | "guided_build_pricing"
  | "executive_briefing_pricing"
  | "internal_pricing_refusal"
  | "managed_operations_comparison"
  | "combined_hourly_rate"
  | "seo_tier_comparison"
  | "service_estimate_comparison"
  | "data_audit_readiness_comparison"
  | "ppv_solution_blueprint"
  | "field_exam_solution_blueprint"
  | "budget_path_comparison"
  | "knowledge_base_fit"
  | "assessment_clarification";

export interface IntelligencePrecisionAnswer {
  intent: IntelligencePrecisionIntent;
  answer: string;
}

function requiredValue<T>(value: T | null | undefined, label: string): T {
  if (value === null || value === undefined || value === "") {
    throw new Error(`Missing required public pricing value: ${label}`);
  }
  return value;
}

function offering(name: string) {
  return requiredValue(
    AI_PRICING_CATEGORIES.flatMap((category) => category.offerings).find(
      (item) => item.name === name,
    ),
    name,
  );
}

const GUIDED_BUILD_SESSION = offering("Guided Build Session");
const GUIDED_BUILD_SPRINT = offering("Guided Build Sprint (4 sessions)");
const GUIDED_BUILD_INTENSIVE = offering("Guided Build Intensive (8 sessions)");
const LOCAL_AGENT_SPRINT = offering("Local Agent Sprint");
const DEPARTMENTAL_LOCAL_AGENT = offering("Departmental Local Agent");
const AGENT_DISCOVERY = offering("Agent Discovery & Technical Specification");
const PROTOTYPE = offering("Proof of Concept / Prototype");
const SINGLE_WORKFLOW_AGENT = offering("Single-Workflow Production Agent");
const INTEGRATED_AGENT = offering("Integrated / Line-of-Business Agent");
const MULTI_AGENT_SYSTEM = offering(
  "Multi-Agent System / AI-Augmented Process Redesign",
);
const READINESS_ASSESSMENT = offering("AI Readiness Assessment");
const EXECUTIVE_BRIEFING = offering("Executive AI Literacy Briefing");
const DATA_READINESS_SPRINT = offering("Data Readiness Sprint");
const KNOWLEDGE_BASE_SERVICE = requiredValue(
  SERVICES.find((service) => service.slug === "ai-knowledge-base"),
  "AI Knowledge Base service",
);
const KNOWLEDGE_BASE_CITATION_FEATURE = requiredValue(
  KNOWLEDGE_BASE_SERVICE.features.find((feature) => /cited answers/i.test(feature)),
  "AI Knowledge Base citation feature",
);
const KNOWLEDGE_BASE_PERMISSION_FEATURE = requiredValue(
  KNOWLEDGE_BASE_SERVICE.features.find((feature) => /role-based access/i.test(feature)),
  "AI Knowledge Base permission feature",
);
const KNOWLEDGE_BASE_RETRIEVAL_FEATURE = requiredValue(
  KNOWLEDGE_BASE_SERVICE.features.find((feature) => /structured Markdown retrieval/i.test(feature)),
  "AI Knowledge Base retrieval feature",
);
const PROTOTYPE_SCOPE = requiredValue(PROTOTYPE.scope, "Prototype scope");
const READINESS_ASSESSMENT_DURATION = requiredValue(
  READINESS_ASSESSMENT.duration,
  "AI Readiness Assessment duration",
);
const MIS_GROWTH = requiredValue(
  MANAGED_AI_TIERS.find((tier) => tier.tier === "MIS Growth"),
  "MIS Growth",
);
const TIER_TWO = requiredValue(
  AI_HOURLY_RATES.find((tier) => tier.tier.startsWith("Tier 2")),
  "Tier 2 hourly rate",
);
const AFTER_HOURS = requiredValue(
  AI_RATE_MULTIPLIERS.find((item) => item.condition === "After-hours"),
  "After-hours multiplier",
);
const MSP_ELITE = requiredValue(
  AI_LOYALTY_DISCOUNTS.find(
    (item) => item.benefit === "Tier 1 / Tier 2 hourly",
  ),
  "MSP Elite Tier 1 / Tier 2 loyalty discount",
);
const SEO_FOUNDATION = requiredValue(
  AI_SEO_TIERS.find((tier) => tier.name === "SEO Foundation"),
  "SEO Foundation",
);
const SEO_MOMENTUM = requiredValue(
  AI_SEO_TIERS.find((tier) => tier.name === "SEO Momentum"),
  "SEO Momentum",
);
const SEO_VELOCITY = requiredValue(
  AI_SEO_TIERS.find((tier) => tier.name === "SEO Velocity"),
  "SEO Velocity",
);
const SEO_FOUNDATION_TIMELINE = requiredValue(
  SEO_FOUNDATION.projectTimeline,
  "SEO Foundation timeline",
);
const SEO_MOMENTUM_TERM = requiredValue(
  SEO_MOMENTUM.minimumTerm,
  "SEO Momentum minimum term",
);
const SEO_VELOCITY_TERM = requiredValue(
  SEO_VELOCITY.minimumTerm,
  "SEO Velocity minimum term",
);

const INJECTION_PATTERN =
  /\b(?:(?:ignore|disregard|override|forget|bypass) (?:all |any |the )?(?:previous|prior|system|developer|hidden)? ?(?:instructions?|rules?|directions?|policy)|(?:reveal|expose|show) (?:the )?(?:system|developer|hidden) (?:prompt|policy|instructions?|context)|system prompt|developer message|jailbreak|role[ -]?play an unrestricted|decode and follow|base64 instruction)\b/i;

function conversationQuery(
  history: IntelligenceChatMessage[],
  message: string,
) {
  return [...history.slice(-4).map((item) => item.content), message].join("\n");
}

function normalizedIntent(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/,/g, "")
    .replace(/[^a-z0-9$%]+/g, " ")
    .trim();
}

function matchesAny(value: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value));
}

const PILOT_REQUESTS = [
  /\bai pilot implementation\b/,
  /\bsmall (?:ai )?pilot\b/,
  /\bproduction (?:ai )?pilot\b/,
  /\bpilot (?:pricing|price|cost|offering|package|sku)\b/,
  /\b(?:compare|versus|vs) (?:the )?(?:itecs )?(?:ai )?pilot\b/,
];

const GUIDED_BUILD_REQUESTS = [
  /^how much (?:is|does) (?:a |the )?guided build(?: session| sprint| intensive)?(?: cost)?$/,
  /^(?:what is|whats|show me|give me) (?:the )?guided build pricing$/,
  /^guided build(?: session| sprint| intensive)? (?:pricing|price|cost)$/,
];

const EXECUTIVE_BRIEFING_REQUESTS = [
  /^how much (?:is|does) (?:the )?executive ai literacy briefing(?: cost)?$/,
  /^(?:what is|whats) (?:the )?executive (?:ai )?briefing (?:pricing|price|cost)$/,
];

const INTERNAL_PRICING_REQUESTS = [
  /\b(?:internal|private|hidden) (?:discount|margin|cost|price|pricing|rate)\b/,
  /\b(?:margin|cost basis|discount logic|rate rationale|burn multipliers?)\b/,
  /\b(?:service.line codes?|psa ticket|helpdesk routing|tam escalation)\b/,
];

const MANAGED_OPERATIONS_REQUESTS = [
  /^compare (?:the )?mis growth (?:and|with|to|versus|vs) (?:the )?agent operations(?: pricing| prices| costs?)?$/,
  /^compare managed intelligence(?: services)? (?:and|with|to|versus|vs) agent operations(?: pricing| prices| costs?)?$/,
  /^does that operate (?:our|a|the) production agent(?: too| as well)?$/,
  /^(?:how much|what does) agent operations (?:cost )?for 2 (?:production )?agents$/,
  /^agent operations (?:pricing|price|cost) for 2 (?:production )?agents$/,
];

const COMBINED_RATE_REQUESTS = [
  /^what would tier 2 (?:work )?cost after hours for an msp elite client$/,
  /^what is the (?:effective |combined )?tier 2 rate after hours for an msp elite client$/,
];

const SEO_TIER_REQUESTS = [
  /^compare (?:the )?seo foundation momentum and velocity (?:pricing|prices|costs)(?: and (?:commitments|terms))?$/,
  /^compare (?:the )?foundation momentum and velocity seo (?:pricing|prices|costs)(?: and (?:commitments|terms))?$/,
];

const SERVICE_ESTIMATE_REQUESTS = [
  /^which costs? more (?:an? )?ai receptionist or (?:an? )?(?:ai )?crm sales ai including ongoing service$/,
  /^compare (?:an? )?ai receptionist (?:and|with|to|versus|vs) (?:an? )?(?:ai )?crm sales ai (?:setup and ongoing )?(?:pricing|prices|costs?)$/,
];

const DATA_AUDIT_READINESS_REQUESTS = [
  /^compare (?:the )?professional data audit (?:and|with|to|versus|vs) (?:the )?ai readiness assessment(?: pricing| prices| costs?)?$/,
  /^compare (?:the )?data readiness sprint (?:and|with|to|versus|vs) (?:the )?ai readiness assessment(?: pricing| prices| costs?)?$/,
];

const PPV_SOLUTION_BLUEPRINT_REQUEST = normalizedIntent(
  "We run BatchMaster/SAP and Power BI and need 12-24 months of PPV reconstructed, forward commodity exposure, and pass-through recovery. What would ITECS build, what data is needed, and what could it act on?",
);

const FIELD_EXAM_SOLUTION_BLUEPRINT_REQUEST = normalizedIntent(
  "We're an asset-based lender. Can ITECS automate field exams from AR/AP agings, inventory, GL, bank statements, and prior workpapers and issue the report automatically?",
);

const BUDGET_PATH_REQUEST =
  /^we have \$([0-9]+(?:\.[0-9]+)?)(k)? and ([0-9]+) (?:employees|users|people|staff) should we (?:fund|choose) an? ai platform rollout or build an? custom (?:assistant|agent)$/;

const KNOWLEDGE_BASE_FIT_REQUEST = normalizedIntent(
  "Our 40-person company has SOPs in SharePoint, Notion, and Confluence with department permissions. What ITECS option fits?",
);

function publishedCurrencyAmounts(value: string, label: string) {
  const values = [...value.matchAll(/\$([\d,]+)/g)].map((match) =>
    Number(match[1].replaceAll(",", "")),
  );

  if (!values.length || values.some((amount) => !Number.isFinite(amount))) {
    throw new Error(`Missing required public pricing value: ${label}`);
  }

  return values;
}

const PROTOTYPE_AMOUNTS = publishedCurrencyAmounts(
  PROTOTYPE.price,
  "Prototype range",
);
const PROTOTYPE_MINIMUM = requiredValue(
  PROTOTYPE_AMOUNTS[0],
  "Prototype minimum",
);
const PROTOTYPE_MAXIMUM = requiredValue(
  PROTOTYPE_AMOUNTS[1],
  "Prototype maximum",
);
const SINGLE_AGENT_AMOUNTS = publishedCurrencyAmounts(
  SINGLE_WORKFLOW_AGENT.price,
  "Single-workflow agent range",
);
const SINGLE_AGENT_MINIMUM = requiredValue(
  SINGLE_AGENT_AMOUNTS[0],
  "Single-workflow agent minimum",
);
const SINGLE_AGENT_MAXIMUM = requiredValue(
  SINGLE_AGENT_AMOUNTS[1],
  "Single-workflow agent maximum",
);
const LOCAL_AGENT_AMOUNTS = publishedCurrencyAmounts(
  LOCAL_AGENT_SPRINT.price,
  "Local Agent Sprint range",
);
const LOCAL_AGENT_MINIMUM = requiredValue(
  LOCAL_AGENT_AMOUNTS[0],
  "Local Agent Sprint minimum",
);

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const ASSESSMENT_REQUESTS = [
  /^is (?:the )?itecs (?:ai )?assessment (?:really )?(?:free|no cost)$/,
  /^what(?:s| is) the difference between (?:the )?(?:free|no cost) (?:assessment )?intake and (?:the )?paid (?:ai )?readiness assessment$/,
];

function pilotReplacement(): IntelligencePrecisionAnswer {
  return {
    intent: "pilot_replacement",
    answer: `AI Pilot Implementation is no longer an available ITECS offering. The current path depends on where the agent will run and how much engineering it needs.

- Co-build in an employee's workspace: ${GUIDED_BUILD_SPRINT.name} is ${GUIDED_BUILD_SPRINT.price}; ${GUIDED_BUILD_INTENSIVE.name} is ${GUIDED_BUILD_INTENSIVE.price}.
- Have ITECS deliver a workspace agent: ${LOCAL_AGENT_SPRINT.name} is ${LOCAL_AGENT_SPRINT.price}; ${DEPARTMENTAL_LOCAL_AGENT.name} is ${DEPARTMENTAL_LOCAL_AGENT.price}.
- Engineer a production agent: start with ${AGENT_DISCOVERY.name} at ${AGENT_DISCOVERY.price}, credited toward the build, then use the published custom-build ladder.

The Guided & Local Agent Builds section at /pricing#guided-local-builds is the replacement destination. Final scope is confirmed before work begins.`,
  };
}

function guidedBuildPricing(): IntelligencePrecisionAnswer {
  return {
    intent: "guided_build_pricing",
    answer: `ITECS publishes three co-build options:

- ${GUIDED_BUILD_SESSION.name}: ${GUIDED_BUILD_SESSION.price} for a 90-minute working session with preparation and session notes.
- ${GUIDED_BUILD_SPRINT.name}: ${GUIDED_BUILD_SPRINT.price} for one bounded agent or workflow, typically over 2–3 weeks.
- ${GUIDED_BUILD_INTENSIVE.name}: ${GUIDED_BUILD_INTENSIVE.price} for a complex multi-step agent with testing and refinement cycles.

Sessions expire 90 days from purchase, are scheduled at least 5 business days out, and a cancellation under 24 hours or no-show forfeits the session. Out-of-session build work bills at the applicable hourly tier.`,
  };
}

function executiveBriefingPricing(): IntelligencePrecisionAnswer {
  return {
    intent: "executive_briefing_pricing",
    answer: `${EXECUTIVE_BRIEFING.name} is ${EXECUTIVE_BRIEFING.price}. It is a private half-day session for a board, leadership team, or department heads, tailored to the organization's industry.`,
  };
}

function internalPricingRefusal(): IntelligencePrecisionAnswer {
  return {
    intent: "internal_pricing_refusal",
    answer:
      "I can share the published ITECS pricing, eligibility matrix, and engagement terms, but I cannot provide internal margin, cost-basis, rate-rationale, discount-design, service-code, or retainer burn-schedule details. ITECS can confirm which published option applies in a consultation.",
  };
}

function managedOperationsComparison(query: string): IntelligencePrecisionAnswer {
  const adoptionPricing = /\bmis growth\b/i.test(query)
    ? `${MIS_GROWTH.tier}: ${MIS_GROWTH.price}; ${MIS_GROWTH.users} users; ${MIS_GROWTH.includedHours}. Included: ${MIS_GROWTH.features.join("; ")}.`
    : MANAGED_AI_TIERS.map(
        (tier) =>
          `${tier.tier}: ${tier.price}; ${tier.users} users; ${tier.includedHours}`,
      ).join("; ");
  const operationsPricing = MANAGED_AI_AGENT_OPERATIONS.prices
    .map((option) => `${option.agents}: ${option.price}`)
    .join("; ");

  return {
    intent: "managed_operations_comparison",
    answer: `Managed Intelligence Services and Agent Operations cover different operating needs.

- Adoption and advisory: ${adoptionPricing}
- Production agents: ${operationsPricing}. Agent Operations includes ${MANAGED_AI_AGENT_OPERATIONS.features.join("; ")}.

MIS supports people, enablement, and workflow refinement. Agent Operations is the separate ongoing service for production agents after launch. Clients holding an MIS tier receive 10% off the Agent Operations line. Final scope is confirmed before work begins.`,
  };
}

function combinedHourlyRate(): IntelligencePrecisionAnswer {
  return {
    intent: "combined_hourly_rate",
    answer: `${TIER_TWO.tier} work is published at ${TIER_TWO.rate}. ${AFTER_HOURS.condition} work carries a ${AFTER_HOURS.multiplier} multiplier, and MSP Elite clients receive ${MSP_ELITE.elite} off eligible Tier 1 and Tier 2 hourly work.

The public pricing does not specify whether the loyalty discount and after-hours multiplier combine or the order in which they would be applied, so I should not calculate an effective billed rate. ITECS can confirm the applicable rate for the specific schedule and scope before work begins.`,
  };
}

function seoTierComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "seo_tier_comparison",
    answer: `ITECS publishes one foundation engagement and two ongoing AI-optimized SEO retainers.

- ${SEO_FOUNDATION.name}: ${SEO_FOUNDATION.priceLabel} one-time, with a published planning timeline of ${SEO_FOUNDATION_TIMELINE.toLowerCase()}.
- ${SEO_MOMENTUM.name}: ${SEO_MOMENTUM.priceLabel}, ${SEO_MOMENTUM_TERM.toLowerCase()}.
- ${SEO_VELOCITY.name}: ${SEO_VELOCITY.priceLabel}, with a ${SEO_VELOCITY_TERM.toLowerCase()} minimum.

Foundation establishes the technical and content architecture. Momentum is the month-to-month operating tier; Velocity is the higher-velocity tier with expanded content and competitive work. These are published planning prices, and final scope is confirmed before work begins.`,
  };
}

function serviceEstimateComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "service_estimate_comparison",
    answer: `ITECS no longer publishes separate setup estimates for AI Receptionist and AI CRM & Sales. Both use the current governed build path.

- Discovery: ${AGENT_DISCOVERY.name} is ${AGENT_DISCOVERY.price} and credits toward the build.
- Production build: ${SINGLE_WORKFLOW_AGENT.name} is ${SINGLE_WORKFLOW_AGENT.price}; ${INTEGRATED_AGENT.name} is ${INTEGRATED_AGENT.price} when multi-source integrations and reviewer controls are required.
- After launch: Agent Operations follows the discrete production-agent ladder and is separate from the build fee.

The applicable phase depends on workflow complexity, integrations, review controls, and production requirements. Final scope is confirmed before work begins.`,
  };
}

function dataAuditReadinessComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "data_audit_readiness_comparison",
    answer: `The Data Readiness Sprint and AI Readiness Assessment answer different questions.

- Data Readiness Sprint: ${DATA_READINESS_SPRINT.price} for one department or use case. It includes ${DATA_READINESS_SPRINT.included.join("; ")}.
- AI Readiness Assessment: ${READINESS_ASSESSMENT.price} with a typical duration of ${READINESS_ASSESSMENT_DURATION}. It includes ${READINESS_ASSESSMENT.included.join("; ")}.

Choose Data Readiness when a build's source documents, permissions, structure, metadata, or ingestion preparation need work. Choose the Readiness Assessment when leadership needs prioritized use cases, platform direction, risk context, and a 12-month adoption roadmap. Every build proposal includes a data-readiness line item or written confirmation that sources were verified build-ready during discovery.`,
  };
}

function ppvSolutionBlueprint(): IntelligencePrecisionAnswer {
  const dataInputs = PPV_AGENT_USE_CASE.dataInputs
    .map((input) => `${input.label}: ${input.description}`)
    .join("; ");

  return {
    intent: "ppv_solution_blueprint",
    answer: `ITECS would scope the ${PPV_AGENT_USE_CASE.title} for this published BatchMaster/SAP and Power BI discovery pattern.

- Build: reconstruct 12-24 months of PPV and reconcile it to finance's close package; decompose movement across price, timing, vendor, plant, freight, FX, mix, SKU, and customer-program drivers; add one-, three-, and six-month forward exposure; and flag pass-through or escalator candidates for review.
- Data categories: ${dataInputs}.
- Action boundary: ${PPV_AGENT_USE_CASE.governance[0]} ${PPV_AGENT_USE_CASE.governance[1]} Sensitive financial and procurement actions remain under human approval, with source data, assumptions, model context, confidence, and the reviewer decision preserved.

The practical next step is the published PPV Agent Discovery Workshop to confirm the BatchMaster/SAP access path, Power BI model quality, current PPV methodology, and approval matrix before any implementation scope is set.`,
  };
}

function fieldExamSolutionBlueprint(): IntelligencePrecisionAnswer {
  const dataInputs = FIELD_EXAM_ANALYZER_USE_CASE.dataInputs
    .map((input) => `${input.label}: ${input.description}`)
    .join("; ");

  return {
    intent: "field_exam_solution_blueprint",
    answer: `Yes—ITECS publishes the ${FIELD_EXAM_ANALYZER_USE_CASE.title} for this workflow, but it does not issue the report automatically without examiner review.

- Analysis and output: collateral roll-forward, turnover, dilution, ineligibles, past-due and cross-age testing, concentration analysis, borrowing-base validation, net availability, structured workpapers, and a first-draft executive report.
- Data categories: ${dataInputs}.
- Human control: ${FIELD_EXAM_ANALYZER_USE_CASE.governance[0]} ${FIELD_EXAM_ANALYZER_USE_CASE.governance[1]} The examiner reviews, adjusts, and signs before anything is issued, and every output preserves source data, assumptions, eligibility logic, and the reviewer's decision.

The practical next step is the published Field Exam Analyzer Workshop to confirm the exam methodology, eligibility definitions, report format, data-source boundaries, and approval matrix before implementation is scoped.`,
  };
}

function budgetPathComparison(
  currentIntent: string,
): IntelligencePrecisionAnswer | null {
  const match = currentIntent.match(BUDGET_PATH_REQUEST);
  if (!match) return null;

  const budget = Number(match[1]) * (match[2] ? 1_000 : 1);
  const users = Number(match[3]);
  if (!Number.isFinite(budget) || budget <= 0 || !Number.isInteger(users) || users <= 0) {
    return null;
  }

  const prototypeBudgetFit = budget >= PROTOTYPE_MINIMUM;
  const localBudgetFit = budget >= LOCAL_AGENT_MINIMUM;
  const agentBudgetPosition =
    budget < SINGLE_AGENT_MINIMUM
      ? "below the published starting point"
      : budget < SINGLE_AGENT_MAXIMUM
        ? "overlaps only the lower part of the published range"
        : "covers the published planning range, subject to confirmed scope";

  return {
    intent: "budget_path_comparison",
    answer: `For ${users} employees and a ${formatCurrency(budget)} planning budget, the current published paths serve different outcomes.

- Employee-led workspace build: ${GUIDED_BUILD_SPRINT.name} is ${GUIDED_BUILD_SPRINT.price}; ${GUIDED_BUILD_INTENSIVE.name} is ${GUIDED_BUILD_INTENSIVE.price}. Both are within the stated budget and focus on a bounded co-build.
- ITECS-delivered workspace agent: ${LOCAL_AGENT_SPRINT.name} is ${LOCAL_AGENT_SPRINT.price} and ${localBudgetFit ? "starts within" : "starts above"} the stated budget.
- Engineered production workflow: ${SINGLE_WORKFLOW_AGENT.name} is ${SINGLE_WORKFLOW_AGENT.price}. Your budget ${agentBudgetPosition}. ${PROTOTYPE.name} is ${PROTOTYPE.price} for ${PROTOTYPE_SCOPE.toLowerCase()} and ${prototypeBudgetFit && budget <= PROTOTYPE_MAXIMUM ? "fits within its published range" : prototypeBudgetFit ? "is within your budget" : "starts above your budget"}, but it is a feasibility step rather than a production deployment.

Team size alone does not select the engagement. The workflow, deployment environment, integrations, and operating requirements do. Published amounts are planning prices and ranges—not firm quotes—and ITECS confirms scope before work begins.`,
  };
}

function knowledgeBaseFit(): IntelligencePrecisionAnswer {
  return {
    intent: "knowledge_base_fit",
    answer: `The closest published ITECS option is ${KNOWLEDGE_BASE_SERVICE.shortTitle}, a managed knowledge and document operations agent.

- Source priority: approved organization and client-specific documentation is consulted first, reusable internal standards next, and current authoritative guidance when local material is missing or stale.
- Retrieval: ${KNOWLEDGE_BASE_RETRIEVAL_FEATURE}.
- Permissions: ${KNOWLEDGE_BASE_PERMISSION_FEATURE}.
- Answer quality: ${KNOWLEDGE_BASE_CITATION_FEATURE}. Missing, stale, or conflicting facts are identified instead of silently invented.

The repositories you named are inputs to scoping, not a blanket connector promise. Final connector fit, source ownership, access boundaries, review roles, and implementation scope are confirmed before work begins; do not place private SOPs or credentials into this public chat.`,
  };
}

function assessmentClarification(): IntelligencePrecisionAnswer {
  return {
    intent: "assessment_clarification",
    answer: `The ITECS ${AI_ASSESSMENT_INTAKE.href} page is a ${AI_ASSESSMENT_INTAKE.costLabel.toLowerCase()}. ${AI_ASSESSMENT_INTAKE.purpose} It does not deliver the formal assessment.

The separate formal ${READINESS_ASSESSMENT.name} is a paid ${READINESS_ASSESSMENT.price} engagement with a typical duration of ${READINESS_ASSESSMENT_DURATION}. It includes ${READINESS_ASSESSMENT.included.join("; ")}.

Use the intake form when you want a no-cost first conversation. The paid assessment is the structured strategy engagement and is scoped before work begins.`,
  };
}

export function buildIntelligencePrecisionAnswer(args: {
  history: IntelligenceChatMessage[];
  message: string;
}): IntelligencePrecisionAnswer | null {
  const query = conversationQuery(args.history, args.message);
  if (INJECTION_PATTERN.test(query)) return null;
  const currentIntent = normalizedIntent(args.message);
  const hasPilot = /\bpilots?\b/i.test(args.message);

  if (matchesAny(currentIntent, INTERNAL_PRICING_REQUESTS)) {
    return internalPricingRefusal();
  }

  if (
    matchesAny(currentIntent, PILOT_REQUESTS) ||
    (hasPilot &&
      /\b(price|pricing|cost|offering|package|sku|custom|small|production)\b/i.test(
        query,
      ))
  ) {
    return pilotReplacement();
  }

  if (matchesAny(currentIntent, GUIDED_BUILD_REQUESTS)) {
    return guidedBuildPricing();
  }

  if (matchesAny(currentIntent, EXECUTIVE_BRIEFING_REQUESTS)) {
    return executiveBriefingPricing();
  }

  if (
    matchesAny(currentIntent, MANAGED_OPERATIONS_REQUESTS) ||
    (/\bmis\b/i.test(args.message) &&
      /\b(price|pricing|cost|tier)\b/i.test(args.message)) ||
    (/\bagent operations\b/i.test(args.message) &&
      /\b(price|pricing|cost|agents?)\b/i.test(args.message))
  ) {
    return managedOperationsComparison(query);
  }

  if (
    /\btier 2\b/i.test(query) &&
    /\bafter.hours\b/i.test(query) &&
    /\bmsp elite\b/i.test(query) &&
    matchesAny(currentIntent, COMBINED_RATE_REQUESTS)
  ) {
    return combinedHourlyRate();
  }

  if (
    /\bseo\b/i.test(query) &&
    matchesAny(currentIntent, SEO_TIER_REQUESTS) &&
    ["foundation", "momentum", "velocity"].every((tier) =>
      query.toLowerCase().includes(tier),
    )
  ) {
    return seoTierComparison();
  }

  if (matchesAny(currentIntent, SERVICE_ESTIMATE_REQUESTS)) {
    return serviceEstimateComparison();
  }

  if (matchesAny(currentIntent, DATA_AUDIT_READINESS_REQUESTS)) {
    return dataAuditReadinessComparison();
  }

  if (currentIntent === PPV_SOLUTION_BLUEPRINT_REQUEST) {
    return ppvSolutionBlueprint();
  }

  if (currentIntent === FIELD_EXAM_SOLUTION_BLUEPRINT_REQUEST) {
    return fieldExamSolutionBlueprint();
  }

  const budgetAnswer = budgetPathComparison(currentIntent);
  if (budgetAnswer) return budgetAnswer;

  if (currentIntent === KNOWLEDGE_BASE_FIT_REQUEST) {
    return knowledgeBaseFit();
  }

  if (
    matchesAny(currentIntent, ASSESSMENT_REQUESTS) ||
    (/\bai readiness assessment\b/i.test(query) &&
      /\b(price|pricing|cost|how much)\b/i.test(query))
  ) {
    return assessmentClarification();
  }

  return null;
}
