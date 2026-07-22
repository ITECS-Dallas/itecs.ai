import {
  AI_ASSESSMENT_INTAKE,
  AI_HOURLY_RATES,
  AI_LOYALTY_DISCOUNTS,
  AI_PRICING_CATEGORIES,
  AI_RATE_MULTIPLIERS,
  AI_SEO_TIERS,
  AI_SERVICE_PAGE_ESTIMATES,
  DATA_AUDIT_PRICING,
  FIELD_EXAM_ANALYZER_USE_CASE,
  MANAGED_AI_AGENT_OPERATIONS,
  MANAGED_AI_TIERS,
  PPV_AGENT_USE_CASE,
  SERVICES,
} from "@/lib/constants";
import type { IntelligenceChatMessage } from "./contract";

export type IntelligencePrecisionIntent =
  | "pilot_custom_comparison"
  | "pilot_tier_comparison"
  | "managed_operations_comparison"
  | "combined_hourly_rate"
  | "seo_tier_comparison"
  | "service_estimate_comparison"
  | "data_audit_readiness_comparison"
  | "ppv_solution_blueprint"
  | "field_exam_solution_blueprint"
  | "budget_path_comparison"
  | "knowledge_base_fit"
  | "poc_small_pilot_comparison"
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

const SMALL_PILOT = offering("AI Pilot Implementation - Small");
const PRODUCTION_PILOT = offering("AI Pilot Implementation - Production");
const AGENT_DISCOVERY = offering("Agent Discovery & Technical Specification");
const PROTOTYPE = offering("Proof of Concept / Prototype");
const SINGLE_WORKFLOW_AGENT = offering("Single-Workflow Production Agent");
const INTEGRATED_AGENT = offering("Integrated / Financial Workpaper Agent");
const MULTI_AGENT_SYSTEM = offering(
  "Multi-Agent System / AI-Augmented Process Redesign",
);
const READINESS_ASSESSMENT = offering("AI Readiness Assessment");
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
const PROTOTYPE_NO_SLA = requiredValue(
  PROTOTYPE.included.find((item) => /without production SLA/i.test(item)),
  "Prototype production SLA boundary",
);
const PROFESSIONAL_DATA_AUDIT = requiredValue(
  DATA_AUDIT_PRICING.find((tier) => tier.tier === "Professional"),
  "Professional Data Audit",
);
const SMALL_PILOT_SCOPE = requiredValue(SMALL_PILOT.scope, "Small pilot scope");
const PRODUCTION_PILOT_SCOPE = requiredValue(
  PRODUCTION_PILOT.scope,
  "Production pilot scope",
);
const PROTOTYPE_SCOPE = requiredValue(PROTOTYPE.scope, "Prototype scope");
const READINESS_ASSESSMENT_DURATION = requiredValue(
  READINESS_ASSESSMENT.duration,
  "AI Readiness Assessment duration",
);
const MANAGED_STANDARD = requiredValue(
  MANAGED_AI_TIERS.find((tier) => tier.tier === "Managed AI Standard"),
  "Managed AI Standard",
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
  AI_LOYALTY_DISCOUNTS.find((item) => item.plan === "MSP Elite"),
  "MSP Elite loyalty discount",
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

const PILOT_CUSTOM_REQUESTS = [
  /^(?:please )?compare (?:the )?(?:itecs )?(?:ai )?pilots?(?: (?:and|with|to|versus|vs|or))? (?:a |the )?custom (?:ai )?(?:agents?|assistant|build)(?: pricing| prices| costs?)?$/,
  /^(?:itecs )?(?:ai )?pilots? (?:versus|vs|or) (?:a |the )?custom (?:ai )?(?:agents?|assistant|build)(?: pricing| prices| costs?)$/,
  /^what costs? less (?:a |an )?(?:itecs )?(?:ai )?pilot or (?:a |an )?custom (?:ai )?(?:agent|assistant|build)$/,
  /^give me (?:all|every) published (?:itecs )?(?:ai )?pilot(?: and| plus| versus| vs) custom (?:ai )?(?:agent|build) prices?$/,
  /^how does (?:that|it) compare (?:with|to) (?:a |an |the )?custom (?:ai )?(?:agent|assistant|build)(?: pricing| prices| costs?)?$/,
];

const PILOT_TIER_REQUESTS = [
  /^(?:please )?compare (?:the )?small (?:and|with|to|versus|vs) (?:the )?production (?:ai )?pilot(?: implementation)?(?: options?)?(?: pricing| prices| costs?)?$/,
  /^(?:please )?compare (?:the )?production (?:ai )?pilot(?: implementation)? (?:and|with|to|versus|vs) (?:the )?small(?: pilot)?(?: option)?(?: pricing| prices| costs?)?$/,
  /^how much is that one and what changes if (?:we )?start smaller$/,
];

const MANAGED_OPERATIONS_REQUESTS = [
  /^compare (?:the )?managed ai standard (?:and|with|to|versus|vs) (?:the )?(?:managed ai )?agent operations(?: pricing| prices| costs?)?$/,
  /^compare managed (?:ai|intelligence) (?:and|with|to|versus|vs) (?:managed ai )?agent operations(?: pricing| prices| costs?)?$/,
  /^does that operate (?:our|a|the) production agent(?: too| as well)?$/,
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

const POC_SMALL_PILOT_REQUEST = normalizedIntent(
  "Is the $8k-$18k proof of concept basically the same thing as the $12,500 Small pilot?",
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

const SMALL_PILOT_AMOUNT = requiredValue(
  publishedCurrencyAmounts(SMALL_PILOT.price, "Small pilot amount")[0],
  "Small pilot amount",
);
const PRODUCTION_PILOT_AMOUNT = requiredValue(
  publishedCurrencyAmounts(PRODUCTION_PILOT.price, "Production pilot amount")[0],
  "Production pilot amount",
);
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

function pilotCustomComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "pilot_custom_comparison",
    answer: `Pilots and custom agents are different purchasing paths: pilots roll out a chosen AI platform to a defined user group, while custom work specifies or builds a workflow-specific agent.

- Pilot implementation: Small is ${SMALL_PILOT.price} for ${SMALL_PILOT_SCOPE}; Production is ${PRODUCTION_PILOT.price} for ${PRODUCTION_PILOT_SCOPE}.
- Definition and feasibility: ${AGENT_DISCOVERY.name} is ${AGENT_DISCOVERY.price} and is credited toward the build if you proceed. A ${PROTOTYPE.name} is ${PROTOTYPE.price} for ${PROTOTYPE_SCOPE.toLowerCase()}.
- Production custom builds: ${SINGLE_WORKFLOW_AGENT.price} for a single-workflow agent; ${INTEGRATED_AGENT.price} for an integrated or financial-workpaper agent; and ${MULTI_AGENT_SYSTEM.price} for a multi-agent system or major process redesign.

Choose the pilot path when the priority is controlled team adoption of an AI platform. Choose the custom path when the priority is a purpose-built workflow, integrations, validation, or reviewer controls. These are published planning prices and ranges—not firm quotes—and final scope is confirmed before work begins.`,
  };
}

function pilotTierComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "pilot_tier_comparison",
    answer: `The Small and Production pilots differ mainly in user count, use-case breadth, training, documentation, and optimization period.

- Small: ${SMALL_PILOT.price} planning price for ${SMALL_PILOT_SCOPE}. Included: ${SMALL_PILOT.included.join("; ")}.
- Production: ${PRODUCTION_PILOT.price} planning price for ${PRODUCTION_PILOT_SCOPE}. Included: ${PRODUCTION_PILOT.included.join("; ")}.

Small is the focused starting point for one primary workflow and a limited group. Production is the department-scale option for multiple use cases and role-based enablement. Final scope is confirmed before work begins.`,
  };
}

function managedOperationsComparison(query: string): IntelligencePrecisionAnswer {
  const adoptionPricing = /\bmanaged ai standard\b/i.test(query)
    ? `${MANAGED_STANDARD.tier}: ${MANAGED_STANDARD.price}; ${MANAGED_STANDARD.users}; ${MANAGED_STANDARD.includedHours}. Included: ${MANAGED_STANDARD.features.join("; ")}.`
    : MANAGED_AI_TIERS.map(
        (tier) =>
          `${tier.tier}: ${tier.price}; ${tier.users}; ${tier.includedHours}`,
      ).join("; ");

  return {
    intent: "managed_operations_comparison",
    answer: `Managed AI adoption retainers and Managed AI Agent Operations cover different operating needs.

- Adoption and advisory: ${adoptionPricing}
- Production agents: ${MANAGED_AI_AGENT_OPERATIONS.tier} is ${MANAGED_AI_AGENT_OPERATIONS.price}, priced ${MANAGED_AI_AGENT_OPERATIONS.users.toLowerCase()}. It includes ${MANAGED_AI_AGENT_OPERATIONS.features.join("; ")}.

The adoption retainers support people, enablement, and workflow refinement. Agent Operations is the separate ongoing service for production agents after launch. Published monthly amounts are planning prices or ranges; final scope is confirmed before work begins.`,
  };
}

function combinedHourlyRate(): IntelligencePrecisionAnswer {
  return {
    intent: "combined_hourly_rate",
    answer: `${TIER_TWO.tier} work is published at ${TIER_TWO.rate}. ${AFTER_HOURS.condition} work carries a ${AFTER_HOURS.multiplier} multiplier, and ${MSP_ELITE.plan} clients receive ${MSP_ELITE.hourlyDiscount} off eligible Tier 1 and Tier 2 hourly work.

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
    answer: `Neither option has one universally higher published cost because the ranges overlap and the ongoing structures differ.

- AI Receptionist: published service-page setup estimate of ${AI_SERVICE_PAGE_ESTIMATES.receptionist.setup}, with monthly service of ${AI_SERVICE_PAGE_ESTIMATES.receptionist.ongoing}.
- AI CRM & Sales: published service-page setup estimate of ${AI_SERVICE_PAGE_ESTIMATES.crmSalesAi.setup}, with ongoing optimization and support starting at ${AI_SERVICE_PAGE_ESTIMATES.crmSalesAi.ongoing}.

The CRM setup range starts higher and extends higher, but the setup estimates overlap. For ongoing service, the CRM starting amount falls within the receptionist range, so the actual comparison depends on call complexity, integrations, CRM platform, team size, and confirmed support scope. These are current planning estimates from the individual service pages, not firm quotes.`,
  };
}

function dataAuditReadinessComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "data_audit_readiness_comparison",
    answer: `The Professional Data Audit and AI Readiness Assessment answer different questions.

- Professional Data Audit: ${PROFESSIONAL_DATA_AUDIT.price} for ${PROFESSIONAL_DATA_AUDIT.users}. It is a ${PROFESSIONAL_DATA_AUDIT.description.toLowerCase()} and includes ${PROFESSIONAL_DATA_AUDIT.features.join("; ")}.
- AI Readiness Assessment: ${READINESS_ASSESSMENT.price} with a typical duration of ${READINESS_ASSESSMENT_DURATION}. It includes ${READINESS_ASSESSMENT.included.join("; ")}.

Choose the Data Audit when the immediate need is security, permissions, sensitive-data exposure, compliance gaps, and a technical remediation view. Choose the Readiness Assessment when leadership needs prioritized AI use cases, platform direction, and a 12-month adoption roadmap. Both are published planning prices, and final scope is confirmed before work begins.`,
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

  const productionUserFit = users >= 10 && users <= 25;
  const productionBudgetFit = budget >= PRODUCTION_PILOT_AMOUNT;
  const smallBudgetFit = budget >= SMALL_PILOT_AMOUNT;
  const prototypeBudgetFit = budget >= PROTOTYPE_MINIMUM;
  const agentBudgetPosition =
    budget < SINGLE_AGENT_MINIMUM
      ? "below the published starting point"
      : budget < SINGLE_AGENT_MAXIMUM
        ? "overlaps only the lower part of the published range"
        : "covers the published planning range, subject to confirmed scope";

  return {
    intent: "budget_path_comparison",
    answer: `For ${users} employees and a ${formatCurrency(budget)} planning budget, the published paths do not represent the same outcome.

- Broad platform rollout: ${PRODUCTION_PILOT.name} is ${PRODUCTION_PILOT.price} for ${PRODUCTION_PILOT_SCOPE}. It ${productionUserFit ? "matches your stated team-size band" : "does not match your stated team size exactly"} and is ${productionBudgetFit ? "within" : "above"} your stated budget. ${SMALL_PILOT.name} is ${SMALL_PILOT.price} for ${SMALL_PILOT_SCOPE}; it ${smallBudgetFit ? "fits the budget" : "is above the budget"}, but covers only a focused 3–5-person group.
- Purpose-built workflow: ${SINGLE_WORKFLOW_AGENT.name} is ${SINGLE_WORKFLOW_AGENT.price}. Your budget ${agentBudgetPosition}; final scope could exceed it. ${PROTOTYPE.name} is ${PROTOTYPE.price} for ${PROTOTYPE_SCOPE.toLowerCase()} and ${prototypeBudgetFit && budget <= PROTOTYPE_MAXIMUM ? "fits within its published range" : prototypeBudgetFit ? "is within your budget" : "starts above your budget"}, but it is a feasibility step rather than a production deployment.

Choose the pilot path when the priority is governed adoption of an AI platform. Choose the custom path when one clearly defined, high-value workflow is the priority. Published amounts are planning prices and ranges—not firm quotes—and ITECS confirms scope before work begins.`,
  };
}

function knowledgeBaseFit(): IntelligencePrecisionAnswer {
  const matchingIntegrations = ["Microsoft SharePoint", "Notion", "Confluence"].map(
    (name) => requiredValue(
      KNOWLEDGE_BASE_SERVICE.integrations.find((integration) => integration === name),
      `AI Knowledge Base integration: ${name}`,
    ),
  );

  return {
    intent: "knowledge_base_fit",
    answer: `The closest published ITECS option is the ${KNOWLEDGE_BASE_SERVICE.shortTitle}. It is designed to turn scattered company files into a private, natural-language knowledge experience.

- Systems: the published integrations include ${matchingIntegrations.join(", ")}.
- Department controls: ${KNOWLEDGE_BASE_PERMISSION_FEATURE}.
- Answer quality: ${KNOWLEDGE_BASE_CITATION_FEATURE}.

That maps directly to your stated platforms and permission requirement. Final fit, source ownership, access boundaries, and implementation scope are confirmed in a scoping conversation; do not place private SOPs or credentials into this public chat.`,
  };
}

function pocSmallPilotComparison(): IntelligencePrecisionAnswer {
  return {
    intent: "poc_small_pilot_comparison",
    answer: `No. The two offerings can each focus on one workflow, but they serve different stages.

- ${PROTOTYPE.name}: ${PROTOTYPE.price} for ${PROTOTYPE_SCOPE.toLowerCase()}. It is a bounded technical-feasibility build with ${PROTOTYPE_NO_SLA.toLowerCase()} and a documented path to production.
- ${SMALL_PILOT.name}: ${SMALL_PILOT.price} for ${SMALL_PILOT_SCOPE}. It deploys a chosen AI platform with tenant and workspace setup, a prompt library, training, and a 30-day optimization window.

Choose the proof of concept when technical feasibility for a custom workflow still needs to be demonstrated. Choose the Small pilot when the platform and use case are selected and a focused team is ready for controlled adoption. Published amounts are planning prices and ranges, and final scope is confirmed before work begins.`,
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
  const hasPilot = /\bpilots?\b/i.test(query);
  const hasCustom =
    /\b(custom (?:ai )?(?:agents?|assistant|build)|custom-agent|proof of concept|prototype|production agent)\b/i.test(
      query,
    );

  if (
    hasPilot &&
    hasCustom &&
    matchesAny(currentIntent, PILOT_CUSTOM_REQUESTS)
  ) {
    return pilotCustomComparison();
  }

  if (
    hasPilot &&
    matchesAny(currentIntent, PILOT_TIER_REQUESTS) &&
    (/\b(small|start smaller)\b/i.test(query) ||
      /\bproduction ai pilot\b/i.test(query))
  ) {
    return pilotTierComparison();
  }

  if (
    /\b(managed ai|managed intelligence)\b/i.test(query) &&
    /\b(agent operations|operate (?:our|a|the) production agent|production-agent operations)\b/i.test(
      query,
    ) &&
    matchesAny(currentIntent, MANAGED_OPERATIONS_REQUESTS)
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

  if (currentIntent === POC_SMALL_PILOT_REQUEST) {
    return pocSmallPilotComparison();
  }

  if (matchesAny(currentIntent, ASSESSMENT_REQUESTS)) {
    return assessmentClarification();
  }

  return null;
}
