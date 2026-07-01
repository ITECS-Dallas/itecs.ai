// ---------------------------------------------------------------------------
// ITECS.AI — Single source of truth for all structured content
// ---------------------------------------------------------------------------

export { SITE_CONFIG } from "./site-config";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
  { label: "AI DevOps", href: "/ai-devops" },
  { label: "AI Receptionist", href: "/ai-receptionist" },
  { label: "CRM & Sales AI", href: "/crm-sales-ai" },
  { label: "Data Audit", href: "/data-audit" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// ---------------------------------------------------------------------------
// Mega menu (full-screen takeover) — single source of truth for the Header
// ---------------------------------------------------------------------------
// Links resolve internally on itecs.ai unless `external: true`, in which case
// they point to the parent MSP site (itecsonline.com) and open in a new tab.

export interface MegaMenuLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface MegaMenuCard {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}

export interface MegaMenuCategory {
  num: string;
  name: string;
  eyebrow: string;
  summary: string;
  primaryHref: string;
  primaryCta: string;
  proofLabel: string;
  proofPoints: string[];
  cards: MegaMenuCard[];
  links: MegaMenuLink[];
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    num: "01",
    name: "AI Services",
    eyebrow: "Strategy, build, train, operate",
    summary:
      "Practical AI services for leadership teams that need secure adoption, useful automation, and production support without turning AI into a science project.",
    primaryHref: "/services",
    primaryCta: "Explore AI services",
    proofLabel: "Where service engagements usually start",
    proofPoints: [
      "Readiness audits and business-case prioritization",
      "Custom agents with human approval and audit trails",
      "Training and operating models that keep adoption governed",
    ],
    cards: [
      {
        eyebrow: "AI Consulting",
        title: "Find the workflows where AI has a real operating case",
        description:
          "Discovery, ROI mapping, governance, platform guidance, and an adoption roadmap your leadership team can actually defend.",
        href: "/consulting",
        cta: "Start with consulting",
      },
      {
        eyebrow: "Custom AI Agents",
        title: "Build secure agents around your data and approvals",
        description:
          "RAG, project workspaces, agentic workflows, and tool-connected assistants with practical controls from day one.",
        href: "/custom-ai-agents",
        cta: "Review agent builds",
      },
    ],
    links: [
      { label: "AI Services Overview", href: "/services" },
      { label: "AI Consulting", href: "/consulting" },
      { label: "Custom AI Agents", href: "/custom-ai-agents" },
      { label: "Automation", href: "/automation" },
      { label: "AI DevOps", href: "/ai-devops" },
      { label: "AI Training", href: "/training" },
      { label: "AI Champion Program", href: "/services/ai-champion-program" },
      { label: "Data & AI Readiness Audit", href: "/data-audit" },
    ],
  },
  {
    num: "02",
    name: "AI Products",
    eyebrow: "Packaged AI systems",
    summary:
      "Focused AI products that solve visible business problems: missed calls, stale CRM data, scattered knowledge, and search visibility in AI answer engines.",
    primaryHref: "/ai-receptionist",
    primaryCta: "View AI products",
    proofLabel: "Packaged systems, implemented with operations discipline",
    proofPoints: [
      "Clear use case, defined integration scope, measurable adoption path",
      "Built for Microsoft 365, CRM, telephony, and knowledge workflows",
      "Maintained after launch instead of handed off as fragile automation",
    ],
    cards: [
      {
        eyebrow: "AI Receptionist",
        title: "Answer, qualify, and book calls after hours and during peaks",
        description:
          "A voice agent for high-intent inbound calls, appointment booking, routing, and caller context capture.",
        href: "/ai-receptionist",
        cta: "See the voice agent",
      },
      {
        eyebrow: "AI-Optimized SEO",
        title: "Prepare your site for Google AI Overviews and answer engines",
        description:
          "Technical structure, content depth, schema, and authority signals for the AI search era.",
        href: "/ai-optimized-seo",
        cta: "Explore AI SEO",
      },
    ],
    links: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "CRM & Sales AI", href: "/crm-sales-ai" },
      { label: "Knowledge Base", href: "/ai-knowledge-base" },
      { label: "AI-Optimized SEO", href: "/ai-optimized-seo" },
      { label: "AI SEO Foundation", href: "/ai-optimized-seo/foundation" },
      { label: "AI SEO Momentum", href: "/ai-optimized-seo/momentum" },
      { label: "AI SEO Velocity", href: "/ai-optimized-seo/velocity" },
    ],
  },
  {
    num: "03",
    name: "Industries",
    eyebrow: "Manufacturing AI vertical",
    summary:
      "AI services for manufacturers where the business case ties to margin, working capital, uptime, quality, traceability, and finance-grade decision support.",
    primaryHref: "/manufacturing",
    primaryCta: "Open manufacturing hub",
    proofLabel: "Built around manufacturer operating pressure",
    proofPoints: [
      "Finance, procurement, plant, and quality workflows in one operating view",
      "Read-heavy, write-controlled agents with human approval boundaries",
      "Dallas ITECS team, national manufacturing engagement model",
    ],
    cards: [
      {
        eyebrow: "Manufacturing AI Hub",
        title: "A vertical hub for CFOs, operators, and plant leaders",
        description:
          "A broader manufacturing AI program that starts with defendable use cases before expanding into adjacent workflows.",
        href: "/manufacturing",
        cta: "Visit the hub",
      },
      {
        eyebrow: "PPV Agent",
        title: "Purchase Price Variance and Commodity Cost Intelligence",
        description:
          "A finance-grade agent for PPV decomposition, forward exposure, contract pass-throughs, and commodity cost scenarios.",
        href: "/manufacturing/ppv-agent",
        cta: "Review PPV agent",
      },
    ],
    links: [
      { label: "Manufacturing AI Hub", href: "/manufacturing" },
      { label: "PPV Agent", href: "/manufacturing/ppv-agent" },
      { label: "Demand & S&OP", href: "/manufacturing/demand-forecasting-sop-ai" },
      { label: "Predictive Maintenance", href: "/manufacturing/predictive-maintenance-ai" },
      { label: "Inventory & Working Capital", href: "/manufacturing/inventory-working-capital-ai" },
      { label: "Quality & Traceability", href: "/manufacturing/quality-traceability-ai" },
      { label: "Customer/SKU Profitability", href: "/manufacturing/customer-sku-profitability-ai" },
      { label: "Production Planning", href: "/manufacturing/production-scheduling-yield-ai" },
      { label: "Contract Recovery", href: "/manufacturing/contract-pass-through-intelligence" },
      { label: "Energy & Freight", href: "/manufacturing/energy-freight-scope-3-ai" },
      { label: "Vendor Anomaly Detection", href: "/manufacturing/vendor-payment-anomaly-ai" },
    ],
  },
  {
    num: "04",
    name: "Resources",
    eyebrow: "Executive guidance and field notes",
    summary:
      "Plain-English resources for owners and executives evaluating AI adoption, risk, ROI, governance, search, security, and operational automation.",
    primaryHref: "/insights",
    primaryCta: "Read insights",
    proofLabel: "Useful when leadership needs context before budget",
    proofPoints: [
      "AI strategy and ROI guidance for non-technical executives",
      "Security and governance articles grounded in managed IT experience",
      "Operational AI playbooks connected back to service pages",
    ],
    cards: [
      {
        eyebrow: "Executive AI ROI",
        title: "What CEOs should ask before approving AI spend",
        description:
          "A practical lens for separating credible operating value from AI novelty.",
        href: "/insights/ceo-guide-ai-roi",
        cta: "Read the guide",
      },
      {
        eyebrow: "Security",
        title: "Secure business data before expanding AI usage",
        description:
          "How to keep employee AI adoption from becoming uncontrolled data exposure.",
        href: "/insights/secure-business-data-chatgpt",
        cta: "Review the risks",
      },
    ],
    links: [
      { label: "Insights", href: "/insights" },
      { label: "CEO Guide to AI ROI", href: "/insights/ceo-guide-ai-roi" },
      {
        label: "Secure Business Data in ChatGPT",
        href: "/insights/secure-business-data-chatgpt",
      },
      {
        label: "Agentic AI Workflows",
        href: "/insights/agentic-ai-workflows-enterprise-operations",
      },
      { label: "Automate Lead Follow-Up", href: "/insights/automate-lead-follow-up" },
      { label: "Claude Cowork for Growing Teams", href: "/insights/claude-cowork-for-small-business" },
      { label: "How Growing Teams Use AI", href: "/insights/how-to-use-ai-small-business" },
      { label: "MCP Is the New API", href: "/insights/mcp-is-the-new-api" },
      { label: "OpenClaw Security Crisis", href: "/insights/openclaw-security-crisis" },
      {
        label: "Enterprise Agentic Skills Repo",
        href: "/insights/enterprise-agentic-skills-repo",
      },
      {
        label: "Whitepapers & Case Studies",
        href: "https://itecsonline.com/white-papers-case-studies",
        external: true,
      },
      {
        label: "Experiencing a Breach?",
        href: "https://itecsonline.com/experiencing-a-breach",
        external: true,
      },
    ],
  },
  {
    num: "05",
    name: "Company",
    eyebrow: "ITECS AI and MSP operations",
    summary:
      "ITECS AI is backed by the Dallas ITECS managed services team, bringing AI strategy together with infrastructure, security, support, and long-term operations.",
    primaryHref: "/about",
    primaryCta: "About ITECS AI",
    proofLabel: "Why the delivery model matters",
    proofPoints: [
      "24+ years operating client technology environments",
      "AI delivery connected to security, identity, endpoint, and support reality",
      "Clear paths from assessment to implementation to managed operations",
    ],
    cards: [
      {
        eyebrow: "Managed Intelligence",
        title: "AI operations as an ongoing managed service",
        description:
          "Monitoring, governance, prompt and model upkeep, user support, and continuous improvement after launch.",
        href: "/managed-intelligence-provider",
        cta: "See managed AI",
      },
      {
        eyebrow: "ITECS MSP",
        title: "Managed IT, cybersecurity, and support from the parent team",
        description:
          "Connect AI initiatives to the infrastructure and security foundation that keeps the business running.",
        href: "https://itecsonline.com/",
        cta: "Visit ITECS MSP",
        external: true,
      },
    ],
    links: [
      { label: "About ITECS", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
      { label: "Contact", href: "/contact" },
      { label: "ITECS MSP", href: "https://itecsonline.com/", external: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// Public AI Pricing
// ---------------------------------------------------------------------------

export interface AIPricingOffering {
  name: string;
  price: string;
  duration?: string;
  scope?: string;
  href?: string;
  description: string;
  included: string[];
  bestFor?: string;
  highlighted?: boolean;
}

export interface AIPricingCategory {
  eyebrow: string;
  title: string;
  description: string;
  offerings: AIPricingOffering[];
}

export const AI_PRICING_CATEGORIES: AIPricingCategory[] = [
  {
    eyebrow: "Start Here",
    title: "Discovery and Strategy",
    description:
      "For leadership teams that want a clear, low-risk way to understand where AI fits before committing to a rollout or custom build.",
    offerings: [
      {
        name: "AI Readiness Assessment",
        price: "$6,500",
        duration: "1-2 weeks",
        description:
          "The fastest way to understand where AI fits in your organization. ITECS audits current AI usage, identifies shadow AI exposure, prioritizes high-value use cases, and recommends the right platform stack for your environment.",
        included: [
          "Current-state audit of AI usage across your organization",
          "Prioritized use-case map ranked by business impact and feasibility",
          "Platform stack recommendation across Claude, ChatGPT, Gemini, Microsoft Copilot, GitHub Copilot, and other major tools",
          "12-month AI roadmap aligned to your strategic priorities",
          "Executive-ready deliverable suitable for board or leadership review",
          "90-minute leadership workshop",
        ],
        bestFor:
          "Organizations exploring AI for the first time or wanting to validate an existing AI direction.",
        highlighted: true,
      },
      {
        name: "Executive AI Literacy Briefing",
        price: "$3,500/session",
        duration: "Half-day",
        description:
          "A private, tailored session for your board, leadership team, or department heads. We translate AI from buzzword to business reality, calibrated to your industry.",
        included: [
          "How modern AI works in plain English",
          "Where AI creates real value in your industry",
          "Governance, security, and risk overview",
          "Live Q&A with senior ITECS strategists",
        ],
        bestFor:
          "Leadership teams that want a credible AI briefing without a multi-week consulting engagement.",
      },
      {
        name: "Shadow AI Discovery and Risk Report",
        price: "$5,500",
        duration: "1 week",
        description:
          "A focused review that identifies unsanctioned AI usage, ranks the risk, and gives leadership a remediation playbook backed by ITECS cybersecurity experience.",
        included: [
          "Endpoint and Microsoft 365 or Google Workspace scan for unsanctioned AI tool usage",
          "Risk-ranked findings by user, department, and tool category",
          "Remediation playbook with prioritized actions",
          "Executive summary suitable for board reporting",
        ],
        bestFor:
          "Organizations with compliance, regulatory, or confidentiality obligations that need visibility into current AI usage.",
      },
    ],
  },
  {
    eyebrow: "Build",
    title: "Production Foundation",
    description:
      "For organizations ready to put AI into controlled use with policy, governance, platform setup, training, and pilot support.",
    offerings: [
      {
        name: "AI Acceptable Use Policy Package",
        price: "$4,500",
        scope: "Standalone policy package",
        description:
          "A complete, custom Acceptable Use Policy and AI governance framework right-sized for growing teams adopting AI across major platforms.",
        included: [
          "Custom Acceptable Use Policy tailored to your industry and risk profile",
          "AI governance framework with roles, responsibilities, and review cadence",
          "Employee handbook insert ready for adoption",
          "30-minute training deck for rollout",
        ],
        bestFor:
          "Organizations adopting AI tools that need clear rules before usage scales.",
      },
      {
        name: "AI Pilot Implementation - Small",
        price: "$12,500",
        scope: "3-5 users, 1 primary use case, 30 days",
        description:
          "A focused, low-risk pilot of your chosen AI platform. ITECS handles setup, training, and post-launch optimization so the team can prove value before expanding.",
        included: [
          "Primary AI platform tenant setup",
          "Project workspace configuration tailored to the use case",
          "5-template prompt library built around your real work",
          "1 onsite or virtual training session",
          "30-day post-launch optimization window",
        ],
        bestFor:
          "Organizations ready to pilot AI in a focused workflow with a small user group.",
      },
      {
        name: "AI Pilot Implementation - Production",
        price: "$21,500",
        scope: "10-25 users, 2-3 use cases, 60 days",
        description:
          "A production-ready AI rollout with the role-based libraries, audit-trail documentation, training, and support required for a real department deployment.",
        included: [
          "Everything in the Small pilot tier",
          "Expansion to multiple use cases",
          "Role-based prompt libraries",
          "Audit-trail documentation",
          "2 training sessions for pilot kickoff and expansion",
          "60-day post-launch optimization window",
        ],
        bestFor:
          "Organizations moving past pilot into production deployment for a full team or department.",
      },
    ],
  },
  {
    eyebrow: "Specialize",
    title: "Custom Build",
    description:
      "For teams that need phased custom agents, platform connectors, AI-enabled workflows, or internal AI capability beyond standard tool configuration.",
    offerings: [
      {
        name: "Agent Discovery & Technical Specification",
        price: "$4,500-$7,500",
        scope: "Discovery, credited toward build",
        description:
          "A focused specification engagement for a custom agent or workflow before production engineering begins. The fee is credited toward the build if the client proceeds.",
        included: [
          "Current workflow, data source, and integration review",
          "Use-case specification with success criteria",
          "Architecture, risk, and human-review model",
          "Fixed-fee build estimate for the next phase",
        ],
        bestFor:
          "Teams with a defined AI workflow that need a credible build plan before committing to engineering.",
      },
      {
        name: "Proof of Concept / Prototype",
        price: "$8,000-$18,000",
        scope: "One data source or workflow",
        description:
          "A bounded prototype that proves technical feasibility and workflow fit before a production commitment.",
        included: [
          "One primary workflow or data source",
          "Limited user group and controlled test scope",
          "Feasibility build without production SLA",
          "Documented path to production",
        ],
        bestFor:
          "Organizations that need evidence before funding a production agent.",
      },
      {
        name: "Single-Workflow Production Agent",
        price: "$18,000-$35,000 per agent",
        description:
          "A production agent for one primary workflow, deployed with documentation, human-in-the-loop review, and staff handoff.",
        included: [
          "One primary workflow deployed to production",
          "Human-in-the-loop review path",
          "Documentation and runbook",
          "Handoff to your team",
        ],
        bestFor:
          "Light or bounded assistants such as recurring research, drafting, executive briefing, or comparable workflow support.",
      },
      {
        name: "Integrated / Financial Workpaper Agent",
        price: "$35,000-$75,000 per agent",
        description:
          "A more complex production agent for multi-source ingestion, reconciliation, audit trails, validation, exception handling, and reviewer workflows.",
        included: [
          "Multi-source data ingestion and reconciliation",
          "Audit trail and validation controls",
          "Exception handling and reviewer workflow",
          "Documentation and operational handoff",
        ],
        bestFor:
          "Line-of-business and finance workflows where accuracy, review evidence, and system integration are central.",
      },
      {
        name: "Multi-Agent System / AI-Augmented Process Redesign",
        price: "$55,000-$120,000",
        description:
          "An orchestrated multi-agent system or end-to-end redesign of a major workflow with integrations, monitoring, and rollout enablement.",
        included: [
          "Senior strategy and workflow discovery",
          "Multi-agent or process redesign around measurable outcomes",
          "Custom engineering with integrations and monitoring",
          "Rollout enablement and documentation",
        ],
        bestFor:
          "Organizations ready to redesign a high-value workflow rather than automate one task at a time.",
      },
      {
        name: "Internal AI Champion Enablement Program",
        price: "$8,500-$12,000",
        duration: "4-6 weeks",
        href: "/services/ai-champion-program",
        description:
          "A structured program that trains one employee to become the organization's internal AI lead, creating capability that compounds after the engagement.",
        included: [
          "Custom curriculum tailored to your industry and use cases",
          "Weekly coaching with a senior ITECS AI strategist",
          "Project shadowing on real implementations",
          "Handoff documentation",
          "90-day post-program support window",
        ],
        bestFor:
          "Organizations that want durable in-house AI fluency instead of relying only on outside consultants.",
      },
    ],
  },
];

export const MANAGED_AI_TIERS = [
  {
    tier: "Managed AI Starter",
    users: "Up to 10 users",
    price: "$1,950/mo",
    includedHours: "4 included hours",
    highlighted: false,
    features: [
      "Monthly check-in",
      "Prompt-library maintenance",
      "Quarterly business review",
    ],
  },
  {
    tier: "Managed AI Standard",
    users: "11-25 users",
    price: "$2,650/mo",
    includedHours: "6 included hours",
    features: [
      "Bi-monthly office hours",
      "Expansion support",
      "Prompt-library maintenance",
      "Quarterly business review",
    ],
    highlighted: true,
  },
  {
    tier: "Managed AI Plus",
    users: "26-50 users",
    price: "$3,500/mo",
    includedHours: "10 included hours",
    highlighted: false,
    features: [
      "Dedicated AI advisor",
      "Custom workflow refinement",
      "Monthly office hours",
      "Quarterly business review",
    ],
  },
] as const;

export const MANAGED_AI_AGENT_OPERATIONS = {
  tier: "Managed AI - Agent Operations",
  users: "Per production-agent footprint",
  price: "$2,500-$6,500/mo",
  includedHours: "Scoped operations retainer",
  description:
    "Ongoing operations for production agents after launch, separate from adoption and advisory retainers.",
  features: [
    "Agent monitoring and evaluations",
    "Quality and drift checks",
    "Data-refresh and exception triage",
    "Production tuning based on usage and review SLA",
  ],
} as const;

export const AI_HOURLY_RATES = [
  {
    tier: "Tier 1 - AI Implementer",
    role: "Hands-on delivery",
    rate: "$245/hr",
    typicalWork: "Setup, configuration, training delivery, documentation, testing",
  },
  {
    tier: "Tier 2 - AI Specialist",
    role: "Senior engineering and authoring",
    rate: "$295/hr",
    typicalWork:
      "Custom AI agent and connector development, prompt engineering, integration work, AI policy authoring",
  },
  {
    tier: "Tier 3 - AI Strategist",
    role: "Strategic advisory and AI security/governance",
    rate: "$375/hr",
    typicalWork:
      "Executive workshops, AI roadmapping, AI security architecture, shadow AI advisory, AI compliance, fractional Head of AI",
  },
] as const;

export const AI_RATE_MULTIPLIERS = [
  { condition: "Standard business hours", multiplier: "1.0x" },
  { condition: "After-hours", multiplier: "1.5x" },
  { condition: "Emergency or same-day onsite", multiplier: "1.5x" },
  { condition: "After-hours plus emergency", multiplier: "2.0x" },
  {
    condition: "Onsite travel beyond 20-mile radius",
    multiplier: "Standard ITECS travel rates apply",
  },
] as const;

export const AI_LOYALTY_DISCOUNTS = [
  {
    plan: "MSP Pro",
    hourlyDiscount: "10%",
    productizedDiscount: "10%",
  },
  {
    plan: "MSP Elite",
    hourlyDiscount: "15%",
    productizedDiscount: "15%",
  },
] as const;

// ---------------------------------------------------------------------------
// Hub Pages (Services)
// ---------------------------------------------------------------------------

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  heroSummary: string;
  href: string;
  icon: string;
  keywords: string[];
  h1: string;
  features: string[];
  howItWorks: { step: string; description: string }[];
  howItWorksHeading: string;
  integrations: string[];
  stats: { value: number; suffix: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "consulting",
    title: "AI Consulting for Growing Organizations in Dallas",
    shortTitle: "AI Consulting",
    description:
      "We help Dallas businesses with 10–300 employees adopt AI without confusion: understand the opportunity, configure the right tools, train the team, and only build custom AI when it is justified.",
    longDescription:
      "Most growing organizations know AI could help, but need a defensible plan for where to start, what it should cost, and how to govern it. We sit down with your team, identify the workflows consuming the most time, and build a practical adoption plan. Often that starts with properly setting up tools like ChatGPT, Claude, Gemini, or Microsoft Copilot before anyone pays for a custom agent.",
    heroSummary:
      "We guide Dallas businesses through AI adoption from workflow discovery to tool setup, security guardrails, employee training, and testing. Consulting can be hourly or through a prepaid retainer, with flat project pricing reserved for scoped AI builds.",
    href: "/consulting",
    icon: "Brain",
    keywords: [
      "AI consulting for growing organizations",
      "mid-market AI Dallas",
      "how to use AI in a business",
      "AI consultant Dallas",
      "AI readiness assessment Dallas",
    ],
    h1: "AI Consulting for Growing Organizations in Dallas",
    features: [
      "Identify which manual tasks are costing you the most time and money",
      "Get a plain-English AI adoption agenda tailored to your budget",
      "Evaluate tools like ChatGPT, Claude, Gemini, Microsoft Copilot, and custom AI options",
      "Train your staff to use AI tools safely and effectively",
      "Use prepaid retainer hours for consulting, setup, training, testing, and advisory work",
      "Measure ROI with clear before-and-after KPIs",
      "Industry-specific guidance for healthcare, legal, finance, and manufacturing",
    ],
    howItWorksHeading: "How to get started with AI consulting for your business",
    howItWorks: [
      {
        step: "We audit your manual tasks and workflows",
        description:
          "We spend time with your team to find the repetitive, time-consuming workflows that are ripe for AI automation — data entry, report generation, customer follow-ups, and more.",
      },
      {
        step: "We build a practical AI adoption plan",
        description:
          "You get a prioritized AI agenda with cost expectations, timelines, and the specific tools that fit your business and budget. No 50-page decks — just actionable steps.",
      },
      {
        step: "We implement the tools and train your team",
        description:
          "We configure off-the-shelf AI applications when they are enough, integrate systems when needed, and train your staff until they are self-sufficient. Most clients are up and running within 2–4 weeks.",
      },
    ],
    integrations: [
      "Microsoft Copilot",
      "ChatGPT",
      "Claude",
      "Gemini",
      "OpenAI API",
      "Azure OpenAI",
      "Google Vertex AI",
      "CustomGPT",
      "Zapier",
      "Make.com",
    ],
    stats: [
      { value: 20, suffix: "+", label: "Hours Saved per Week" },
      { value: 3.2, suffix: "x", label: "Average Client ROI" },
      { value: 45, suffix: "%", label: "Faster Than DIY Implementation" },
    ],
    faq: [
      {
        question: "How much does AI consulting cost for a growing organization?",
        answer:
          "AI consulting can be billed hourly, but most clients prefer a prepaid retainer block of time. Retainer hours can be used at your discretion for discovery, tool configuration, training, testing, workflow design, and advisory work. There is no minimum monthly usage and no expiration date. Flat-rate fees are used only for scoped projects such as building AI agents or securely connecting them to your platforms.",
      },
      {
        question: "How do I know if my business is ready for AI?",
        answer:
          "If your team spends time on repetitive tasks like data entry, report generation, customer follow-ups, or document processing, you're ready. We start with a free assessment to identify exactly where AI will save you the most time and money.",
      },
      {
        question: "Do you sell or lock us into specific AI platforms?",
        answer:
          "No. ITECS is vendor-neutral — we evaluate Microsoft Copilot, OpenAI, Google Vertex, and open-source options against your needs. Our recommendations are driven by what fits your business, not vendor margins.",
      },
      {
        question: "How long until we see results from AI?",
        answer:
          "Most Dallas businesses see measurable time savings within 2–4 weeks of implementation. Our Insight Sprint takes just two weeks, and we can have your first AI tools running the same month.",
      },
    ],
  },
  {
    slug: "custom-ai-agents",
    title: "Custom AI Agent Development in Dallas",
    shortTitle: "Custom AI Agents",
    description:
      "We build custom AI agents for Dallas businesses — from Claude and Codex workflows to agentic RAG systems that connect securely to your tools and data.",
    longDescription:
      "Custom AI does not mean one chatbot on one model. ITECS designs secure agents, project folders, CLI workflows, and retrieval systems around the way your team actually works. We can configure Claude projects, Codex workflows, ChatGPT workspaces, agentic RAG, human approval queues, and API-connected automations that retrieve the right context, take approved actions, and keep sensitive data controlled.",
    heroSummary:
      "ITECS builds custom AI agents that connect securely to your proprietary data, tools, folders, codebases, and business systems — with human-in-the-loop controls, audit trails, and production support.",
    href: "/custom-ai-agents",
    icon: "MessageSquareCode",
    keywords: [
      "custom AI agents Dallas",
      "AI agent development for business",
      "agentic RAG development Dallas",
      "Claude project setup for business",
      "Codex workflow automation",
      "human in the loop AI agents",
      "custom chatbot development Dallas",
    ],
    h1: "Custom AI Agents for Your Dallas Business",
    features: [
      "Claude, ChatGPT, Gemini, Copilot, Codex, CLI, and open-source agent workflows",
      "Agentic RAG systems that retrieve approved context before answering or acting",
      "Secure connections to CRMs, helpdesks, file stores, databases, codebases, and APIs",
      "Human-in-the-loop approvals for sensitive messages, records, transactions, and production changes",
      "Project folders, prompt systems, tool schemas, evaluation sets, and operating documentation",
      "HIPAA and SOC 2 compliant options for regulated industries",
    ],
    howItWorksHeading: "How to build custom AI agents for your business",
    howItWorks: [
      {
        step: "Map the workflow, tools, data, and approval points",
        description:
          "We identify which tasks should be assisted, automated, or left human-owned. Then we map the folders, apps, APIs, databases, prompts, approvals, and security controls the agent needs.",
      },
      {
        step: "Build the agent with the right AI tools",
        description:
          "We use the right mix of AI applications, APIs, RAG pipelines, CLI tooling, prompt systems, tool calls, and workflow automation. That can include Claude projects, Codex workflows, ChatGPT, Gemini, Microsoft Copilot, or custom-built agent services.",
      },
      {
        step: "Test, deploy, train, and monitor",
        description:
          "We validate accuracy, permissions, guardrails, logs, costs, and escalation paths before launch. Then we train your staff and monitor the agent so it keeps improving safely.",
      },
    ],
    integrations: [
      "Claude",
      "Anthropic API",
      "ChatGPT",
      "OpenAI API",
      "Codex",
      "Gemini",
      "Microsoft Copilot",
      "Azure OpenAI",
      "GitHub",
      "Slack",
      "Microsoft Teams",
      "HubSpot",
      "Salesforce",
      "HaloPSA",
    ],
    stats: [
      { value: 40, suffix: "%", label: "Fewer Manual Handoffs" },
      { value: 85, suffix: "%", label: "Target Task Resolution Rate" },
      { value: 3, suffix: "sec", label: "Avg. Retrieval Time" },
    ],
    faq: [
      {
        question: "How much does a custom AI agent cost for a growing organization?",
        answer:
          "Custom AI agents are quoted as scoped projects after we understand the workflow, data sources, security requirements, approval points, and external systems involved. Discovery, project-folder setup, prompt systems, testing, training, and tuning can also use prepaid retainer hours with no minimum monthly usage or expiration date.",
      },
      {
        question: "Can you build workflows for Claude, Codex, ChatGPT, Gemini, and other AI tools?",
        answer:
          "Yes. ITECS is not tied to one AI vendor. We build custom workflows for AI applications, APIs, CLIs, project folders, and agent frameworks, including Claude, Codex, ChatGPT, Gemini, Microsoft Copilot, Azure OpenAI, and other business AI platforms when they fit the use case.",
      },
      {
        question: "What is an agentic RAG agent?",
        answer:
          "An agentic RAG agent retrieves approved context from your documents, databases, tickets, or systems before it answers or acts. Unlike a basic chatbot, it can use tools, follow multi-step instructions, request human approval, cite sources, and update external systems when permitted.",
      },
      {
        question: "How do I secure my business data when using AI agents?",
        answer:
          "The biggest risk is connecting AI to sensitive data without access controls, logging, or approved workflows. We solve this with private or enterprise AI environments, scoped permissions, DLP policies, credential isolation, audit logs, and employee training. Your data never trains public models.",
      },
      {
        question: "Can a custom agent perform tasks, not just answer questions?",
        answer:
          "Yes. Agents can draft messages, summarize records, create tickets, update CRM fields, prepare reports, run approved CLI workflows, trigger automations, or route work to the right person. Sensitive actions can require human approval before anything is sent, changed, or executed.",
      },
      {
        question: "Can the agent connect to our CRM, helpdesk, files, and internal systems?",
        answer:
          "Yes. We build integrations with HubSpot, Salesforce, HaloPSA, ConnectWise, Hudu, ServiceNow, Microsoft 365, Google Workspace, GitHub, databases, file stores, and custom APIs. The agent pulls only the data it is allowed to use.",
      },
    ],
  },
  {
    slug: "automation",
    title: "AI Workflow Automation for Dallas Businesses",
    shortTitle: "AI Automation",
    description:
      "We build and manage AI-powered workflow automations for Dallas businesses — from lead follow-up to data entry to customer onboarding. Set it and forget it.",
    longDescription:
      "Your team shouldn't waste hours on tasks a machine can handle. We map your repetitive workflows — lead follow-ups, invoice processing, data entry, appointment scheduling — and automate them with AI tools like Zapier, Make, Microsoft Power Automate, and custom integrations. Then we monitor everything so it keeps running smoothly.",
    heroSummary:
      "We automate your most time-consuming workflows — lead follow-ups, data entry, invoice processing, scheduling — saving Dallas businesses an average of 40% on operational costs and freeing your team to focus on growth.",
    href: "/automation",
    icon: "Activity",
    keywords: [
      "AI workflow automation for growing businesses",
      "automate lead follow up with AI",
      "AI automation Dallas",
      "workflow automation Dallas",
      "business workflow automation",
    ],
    h1: "AI Workflow Automation for Dallas Businesses",
    features: [
      "Automate lead follow-up, appointment scheduling, and customer onboarding",
      "Connect your existing tools — CRM, email, invoicing, helpdesk",
      "AI-powered data entry and document processing",
      "24/7 monitoring so automations never break silently",
      "Monthly reporting on time saved and cost reduction",
      "Scale up without hiring — handle 2x the workload with the same team",
    ],
    howItWorksHeading: "How to automate your business workflows with AI",
    howItWorks: [
      {
        step: "Map your repetitive workflows and rank by time wasted",
        description:
          "We identify the manual tasks your team does every day — lead follow-ups, data entry, scheduling, report generation — and calculate how much time and money each one costs.",
      },
      {
        step: "Build automated AI pipelines connecting your existing tools",
        description:
          "Using Zapier, Make.com, Power Automate, and custom AI, we connect your CRM, email, invoicing, and helpdesk systems into automated workflows that run without human intervention.",
      },
      {
        step: "Monitor, optimize, and scale your automations",
        description:
          "We monitor your automations 24/7, fix issues before you notice, and optimize for even more time savings. When you're ready, we add more automations without disrupting what's already working.",
      },
    ],
    integrations: [
      "Zapier",
      "Make.com",
      "Microsoft Power Automate",
      "HubSpot AI",
      "OpenAI API",
      "QuickBooks",
      "Slack",
      "Microsoft Teams",
    ],
    stats: [
      { value: 40, suffix: "%", label: "Avg. Cost Reduction" },
      { value: 99.9, suffix: "%", label: "Automation Uptime" },
      { value: 2, suffix: "x", label: "Workload Without New Hires" },
    ],
    faq: [
      {
        question: "How much does AI workflow automation cost for a growing business?",
        answer:
          "Setup costs for Dallas businesses typically range from $2,500–$10,000 depending on the number of workflows, with ongoing management starting at $500/month. Most clients break even within the first month through time savings alone.",
      },
      {
        question: "What tasks can you automate with AI?",
        answer:
          "The most common automations we build for Dallas teams: lead follow-up emails and texts, appointment scheduling and reminders, invoice processing and data entry, customer onboarding sequences, report generation, and helpdesk ticket routing. If your team does it repeatedly, we can probably automate it.",
      },
      {
        question: "Can you automate lead follow-up with AI?",
        answer:
          "Yes — this is one of our most popular automations. We build AI-powered sequences that follow up with leads via email and text within minutes of form submission, qualify them based on your criteria, and route hot leads directly to your sales team. Most clients see a 30–50% improvement in lead response time.",
      },
      {
        question: "Do I need to change my existing software to use AI automation?",
        answer:
          "No. We integrate with the tools you already use — HubSpot, QuickBooks, Outlook, Teams, Slack, your CRM, your helpdesk. The whole point is connecting your existing stack, not replacing it.",
      },
    ],
  },
  {
    slug: "ai-devops",
    title: "AI DevOps & MLOps for Dallas Businesses",
    shortTitle: "AI DevOps",
    description:
      "We turn AI prototypes into secure production systems with CI/CD, prompt and model versioning, RAG pipeline monitoring, cost controls, and managed AI operations.",
    longDescription:
      "Most AI projects stall after the demo because no one owns deployment, monitoring, rollback, data refreshes, or cost control. ITECS builds the operating layer around your AI stack: secure CI/CD pipelines, environment separation, prompt and model versioning, retrieval monitoring, observability, and incident response. Your AI systems keep improving after launch instead of becoming another fragile internal tool.",
    heroSummary:
      "ITECS operationalizes AI systems for Dallas businesses with secure CI/CD, model and prompt version control, RAG pipeline monitoring, cost controls, rollback plans, and managed production support.",
    href: "/ai-devops",
    icon: "ServerCog",
    keywords: [
      "AI DevOps Dallas",
      "MLOps for growing organizations",
      "AI deployment services",
      "RAG pipeline monitoring",
      "LLM operations",
      "AI application DevOps",
      "model monitoring Dallas",
    ],
    h1: "AI DevOps & MLOps for Production AI Systems",
    features: [
      "Production deployment pipelines for AI apps, agents, and automations",
      "Prompt, model, and retrieval configuration version control",
      "Development, staging, and production environment separation",
      "RAG pipeline observability — retrieval quality, citation coverage, and drift detection",
      "Cost monitoring for OpenAI, Azure OpenAI, vector databases, and automation platforms",
      "Rollback, incident response, and 24/7 managed operations for business-critical AI",
    ],
    howItWorksHeading: "How AI DevOps moves your AI system from demo to production",
    howItWorks: [
      {
        step: "Audit your AI prototype and deployment risks",
        description:
          "We review your AI app, chatbot, automation, or RAG system for weak points: unmanaged prompts, hardcoded API keys, missing environments, no monitoring, stale data, unclear ownership, and runaway token costs.",
      },
      {
        step: "Build the secure release and operations pipeline",
        description:
          "We set up version control, CI/CD, secrets management, staging validation, automated tests, deployment approvals, retrieval health checks, and rollback paths so changes ship predictably.",
      },
      {
        step: "Monitor performance, security, and cost after launch",
        description:
          "We track model latency, error rates, retrieval quality, usage spikes, budget thresholds, and security alerts. Monthly reviews show what changed, what improved, and where the next optimization belongs.",
      },
    ],
    integrations: [
      "GitHub Actions",
      "Azure DevOps",
      "Azure OpenAI",
      "OpenAI API",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Vercel",
      "Supabase",
      "Pinecone",
      "Datadog",
      "Microsoft 365",
    ],
    stats: [
      { value: 60, suffix: "%", label: "Faster AI Release Cycles" },
      { value: 99.9, suffix: "%", label: "Target Pipeline Uptime" },
      { value: 30, suffix: "%", label: "Lower AI Run Costs" },
    ],
    faq: [
      {
        question: "What is AI DevOps?",
        answer:
          "AI DevOps is the operating discipline that moves AI systems from prototype to production. It covers CI/CD, model and prompt versioning, data pipeline monitoring, secrets management, testing, observability, rollback plans, and cost controls for AI apps, RAG systems, agents, and automations.",
      },
      {
        question: "Do growing organizations need MLOps or AI DevOps?",
        answer:
          "If an AI system touches customers, employees, regulated data, revenue workflows, or operational decisions, yes. You do not need an enterprise platform, but you do need a repeatable way to deploy changes, monitor accuracy, secure credentials, and recover when something breaks.",
      },
      {
        question: "Can you take over an AI prototype someone else built?",
        answer:
          "Yes. We start with a code, data, and infrastructure review, then stabilize the deployment. Common first fixes include moving secrets into a vault, separating staging from production, adding logging, testing retrieval quality, and documenting rollback steps.",
      },
      {
        question: "How much does AI DevOps cost?",
        answer:
          "Production stabilization is quoted after we review the codebase, data sources, integrations, and deployment environments. Ongoing monitoring reviews, maintenance, release support, testing, cost reviews, and advisory work can use prepaid retainer hours with no minimum monthly usage and no expiration date.",
      },
      {
        question: "Which AI platforms do you support?",
        answer:
          "We support OpenAI, Azure OpenAI, Microsoft Copilot extensions, vector databases, RAG frameworks, automation platforms, and standard cloud/dev tools including GitHub Actions, Azure DevOps, Docker, Kubernetes, Terraform, Vercel, and Microsoft 365.",
      },
    ],
  },
  {
    slug: "training",
    title: "AI Training for Employees in Dallas",
    shortTitle: "AI Training",
    description:
      "Hands-on AI training for your Dallas team — teach employees to use ChatGPT, Claude, Gemini, Copilot, and automation tools safely and productively. No technical background required.",
    longDescription:
      "Your employees are already using AI — the question is whether they're using it safely and effectively. We train your team on the AI tools that matter: ChatGPT, Claude, Gemini, Microsoft Copilot, automation platforms, and custom tools. Hands-on workshops, not boring slide decks. Your staff walks away knowing exactly how to use AI to do their job faster without putting company data at risk.",
    heroSummary:
      "We train your Dallas team to use AI tools like ChatGPT, Claude, Gemini, and Microsoft Copilot safely and productively — with hands-on workshops that cut task completion time by 30% while keeping sensitive company data secure.",
    href: "/training",
    icon: "GraduationCap",
    keywords: [
      "AI training for employees",
      "AI training Dallas",
      "ChatGPT training for business",
      "Microsoft Copilot training Dallas",
      "employee AI training for growing teams",
    ],
    h1: "AI Training for Your Dallas Team",
    features: [
      "Hands-on workshops — your team practices with real work scenarios, not slides",
      "ChatGPT, Claude, Gemini, Microsoft Copilot, and automation tool training",
      "Safe AI usage policies — keep company data out of public models",
      "Role-specific training for sales, support, HR, finance, and ops",
      "Prompt engineering basics so your team gets better AI outputs",
      "Ongoing office hours and refresher sessions as tools evolve",
    ],
    howItWorksHeading: "How to get your team trained on AI",
    howItWorks: [
      {
        step: "Assess your team's current AI skills and daily workflows",
        description:
          "We survey your staff, identify which roles benefit most from AI, and map the specific tasks where AI tools will have the biggest impact on productivity.",
      },
      {
        step: "Deliver hands-on workshops customized to your business",
        description:
          "Your team practices with real work scenarios using ChatGPT, Claude, Gemini, Copilot, and automation tools. We cover prompt engineering, data safety, and role-specific use cases — not generic demos.",
      },
      {
        step: "Provide ongoing support and refresher training",
        description:
          "AI tools evolve fast. Retainer hours can be used for office hours, updated training materials, and refresher sessions so your team stays current and keeps getting value from AI.",
      },
    ],
    integrations: [
      "Microsoft Copilot",
      "ChatGPT / OpenAI",
      "Claude",
      "Gemini",
      "Microsoft 365",
      "Google Workspace",
      "Zapier",
      "Make.com",
      "Slack",
    ],
    stats: [
      { value: 30, suffix: "%", label: "Faster Task Completion" },
      { value: 95, suffix: "%", label: "Participant Satisfaction" },
      { value: 4, suffix: "hrs", label: "Avg. Weekly Time Saved per Employee" },
    ],
    faq: [
      {
        question: "How much does AI training cost for employees?",
        answer:
          "Workshops and multi-session training programs are quoted based on team size, tools, and curriculum depth. Ongoing office hours, refresher sessions, and new-tool onboarding can use prepaid retainer hours with no minimum monthly usage and no expiration date.",
      },
      {
        question: "Do my employees need a technical background for AI training?",
        answer:
          "No. Our training is designed for non-technical staff — sales reps, customer support agents, HR managers, accountants, and office admins. If they can use email, they can learn to use AI effectively.",
      },
      {
        question: "What AI tools do you train on?",
        answer:
          "We cover ChatGPT, Claude, Gemini, Microsoft Copilot (Word, Excel, Outlook, Teams), automation platforms (Zapier, Make.com, Power Automate), and any custom AI tools your business uses. Training is customized to the tools your team will actually use.",
      },
      {
        question: "How do you handle AI data safety in training?",
        answer:
          "Data safety is built into every session. We teach employees exactly what they can and can't share with AI tools, set up company-wide AI usage policies, and show them how to use private AI instances for sensitive work. This is especially critical for healthcare, legal, and financial services teams in Dallas.",
      },
    ],
  },
  {
    slug: "ai-receptionist",
    title: "AI Receptionists & Voice Agents for Growing Teams",
    shortTitle: "AI Receptionist",
    description:
      "Human-sounding AI voice agents that answer your phones 24/7, book appointments, and route calls — saving Dallas businesses $3,000+ a month over traditional answering services.",
    longDescription:
      "Your phones ring after hours, during lunch, and when your team is slammed. Every missed call is a missed opportunity. We deploy AI voice agents that sound natural, answer your business line 24/7, book appointments directly into your calendar, qualify leads, and route urgent calls to the right person. No hold music, no voicemail — just a professional AI receptionist that never takes a day off.",
    heroSummary:
      "Never miss a lead again. We deploy AI Voice Agents that answer your phones 24/7, book appointments securely, and save you $3,000+ a month on traditional answering services.",
    href: "/ai-receptionist",
    icon: "Phone",
    keywords: [
      "AI receptionist for business",
      "AI phone answering service",
      "AI voice agent Dallas",
      "virtual receptionist AI",
      "automated phone answering for business",
      "AI appointment booking",
    ],
    h1: "Human-Sounding AI Receptionists for Growing Teams",
    features: [
      "24/7 phone answering — nights, weekends, holidays, no voicemail",
      "Natural-sounding AI voices powered by ElevenLabs and Twilio",
      "Books appointments directly into your calendar via Calendar API",
      "Qualifies leads and routes urgent calls to the right team member",
      "Handles FAQs — hours, pricing, directions, service availability",
      "Bilingual support (English/Spanish) for Dallas-area businesses",
    ],
    howItWorksHeading: "How to set up an AI receptionist for your business",
    howItWorks: [
      {
        step: "Map your call flows and common caller questions",
        description:
          "We audit your incoming calls — what callers ask, which calls need a human, and which can be fully automated. We build a conversation script that sounds natural and matches your brand voice.",
      },
      {
        step: "Deploy your AI voice agent with ElevenLabs and Twilio",
        description:
          "We configure a human-sounding AI voice agent on your existing business number. The agent connects to your calendar for real-time appointment booking, your CRM for lead capture, and your team's phones for live transfers when needed.",
      },
      {
        step: "Monitor call quality and optimize continuously",
        description:
          "We review call transcripts, track booking rates and caller satisfaction, and refine the AI's responses weekly. You get a monthly report showing calls handled, appointments booked, and estimated cost savings.",
      },
    ],
    integrations: [
      "ElevenLabs",
      "Twilio",
      "Google Calendar",
      "Microsoft Outlook",
      "HubSpot",
      "Salesforce",
      "Calendly",
    ],
    stats: [
      { value: 3000, suffix: "+", label: "Monthly Savings vs. Answering Service" },
      { value: 98, suffix: "%", label: "Call Answer Rate" },
      { value: 24, suffix: "/7", label: "Always Available" },
    ],
    faq: [
      {
        question: "How much does an AI receptionist cost for a growing organization?",
        answer:
          "Setup starts at $3,000–$6,000 depending on call complexity and integrations. Monthly service runs $300–$800/month — compared to $1,500–$4,000/month for a human receptionist or traditional answering service. Most Dallas businesses save $3,000+ per month from day one.",
      },
      {
        question: "Does the AI receptionist sound robotic?",
        answer:
          "No. We use ElevenLabs voice synthesis technology to create natural-sounding, conversational AI voices. Callers frequently can't tell they're speaking to an AI. We customize the voice, tone, and speaking style to match your brand — professional, friendly, or whatever fits your business.",
      },
      {
        question: "Can the AI receptionist book appointments on my calendar?",
        answer:
          "Yes. The AI connects to Google Calendar, Microsoft Outlook, or Calendly via API and books appointments in real time based on your availability rules. It handles time zone conversions, double-booking prevention, and sends confirmation texts/emails to callers automatically.",
      },
      {
        question: "What happens when the AI can't handle a call?",
        answer:
          "The AI transfers to a live team member with full call context — who the caller is, what they asked, and why they need a human. If no one is available, it takes a detailed message and sends it via text, email, or Slack immediately. No caller ever hits a dead end.",
      },
    ],
  },
  {
    slug: "crm-sales-ai",
    title: "AI CRM Integration & Sales Automation for Dallas Businesses",
    shortTitle: "AI CRM & Sales",
    description:
      "We integrate AI into your CRM to automatically research leads, draft personalized outreach, log data, and score prospects — giving your Dallas sales team 15+ hours back every week.",
    longDescription:
      "Your sales team is spending more time updating your CRM than actually selling. We fix that. We integrate AI directly into HubSpot, Salesforce, or your existing CRM to automate lead research, draft personalized outreach emails, score leads based on real buying signals, and keep your pipeline data clean — automatically. Your reps focus on closing deals, not data entry.",
    heroSummary:
      "Turn your CRM into an autonomous assistant. We integrate AI to automatically research leads, draft personalized outreach, and log data — giving your sales team 15+ hours back every week.",
    href: "/crm-sales-ai",
    icon: "TrendingUp",
    keywords: [
      "AI CRM integration",
      "AI sales automation",
      "HubSpot AI integration Dallas",
      "Salesforce Einstein setup",
      "AI lead scoring for business",
      "CRM automation Dallas",
    ],
    h1: "AI CRM Integration & Sales Automation",
    features: [
      "AI-powered lead research — company info, decision-makers, and buying signals pulled automatically",
      "Personalized outreach drafts generated from CRM data and prospect history",
      "Automated lead scoring based on engagement, firmographics, and intent signals",
      "CRM hygiene automation — deduplication, field enrichment, and data validation",
      "Pipeline forecasting with AI-driven deal probability analysis",
      "Activity logging — calls, emails, and meetings captured without rep input",
    ],
    howItWorksHeading: "How to add AI to your CRM and sales workflow",
    howItWorks: [
      {
        step: "Audit your CRM data quality and sales workflow gaps",
        description:
          "We review your current CRM setup — data hygiene, pipeline stages, manual bottlenecks, and where your reps spend the most non-selling time. We identify the highest-ROI automation opportunities.",
      },
      {
        step: "Integrate AI for lead scoring, outreach, and data enrichment",
        description:
          "We connect HubSpot AI, Salesforce Einstein, Apollo, and custom AI tools to your CRM. Leads get auto-scored, outreach gets drafted, and prospect data gets enriched — all flowing into your existing pipeline without changing how your team works.",
      },
      {
        step: "Train your sales team and optimize the AI models",
        description:
          "We train your reps on the new AI-powered workflows, fine-tune lead scoring models based on your actual close data, and optimize outreach templates based on response rates. Monthly reporting shows time saved and pipeline impact.",
      },
    ],
    integrations: [
      "HubSpot AI",
      "Salesforce Einstein",
      "Apollo",
      "Zapier",
      "OpenAI API",
      "Microsoft Dynamics",
      "Outreach.io",
      "LinkedIn Sales Navigator",
    ],
    stats: [
      { value: 15, suffix: "+", label: "Hours Saved per Rep Weekly" },
      { value: 35, suffix: "%", label: "Increase in Lead Conversion" },
      { value: 3, suffix: "x", label: "Faster Lead Response Time" },
    ],
    faq: [
      {
        question: "How much does AI CRM integration cost for a growing organization?",
        answer:
          "Setup ranges from $5,000–$15,000 depending on your CRM platform, number of integrations, and team size. Ongoing optimization and support starts at $500/month. Most Dallas businesses see the investment pay for itself within 60 days through increased close rates and time savings.",
      },
      {
        question: "Does this work with HubSpot Free or do I need a paid plan?",
        answer:
          "We work with all HubSpot tiers, including Free. However, HubSpot Professional or Enterprise unlocks more automation triggers and AI features. We'll recommend the right tier based on your team size and workflow needs — we never push upgrades you don't need.",
      },
      {
        question: "How does AI lead scoring work?",
        answer:
          "AI analyzes your historical deals — which leads converted, what they had in common, how they engaged — and builds a scoring model that ranks new leads by likelihood to close. The model improves over time as it learns from your actual sales outcomes. No more guessing which leads to prioritize.",
      },
      {
        question: "Will this replace my sales team?",
        answer:
          "No — it makes them more effective. AI handles the manual work your reps hate (data entry, research, CRM updates) so they can spend more time actually selling. Our Dallas clients typically see reps recover 15+ hours per week that was previously spent on administrative tasks.",
      },
    ],
  },
  {
    slug: "ai-knowledge-base",
    title: "Internal AI Knowledge Bases & SOP Automation for Dallas Businesses",
    shortTitle: "AI Knowledge Base",
    description:
      "Turn scattered company files into a private AI search engine. Employees ask questions in plain English and get cited answers in 5 seconds — cutting onboarding time by 50%.",
    longDescription:
      "Your company knowledge is trapped in SharePoint folders, Google Drives, Notion pages, and people's heads. New hires take months to get up to speed. Employees ask the same questions over and over. ITECS builds private, RAG-powered AI knowledge bases that connect all your documentation into a single natural-language search interface — like having a secure AI assistant that only knows your company's SOPs, policies, and institutional knowledge, and cites the source document for every answer.",
    heroSummary:
      "ITECS builds private AI knowledge bases for Dallas businesses with 50–500 employees. We connect SharePoint, Google Drive, Notion, and Confluence into one RAG-powered search engine. Employees ask questions in plain English and get cited answers in 5 seconds. Average result: 50% faster onboarding, 70% fewer repeated questions, full setup in 4–6 weeks.",
    href: "/ai-knowledge-base",
    icon: "BookOpen",
    keywords: [
      "AI knowledge base for business",
      "internal AI search engine",
      "SOP automation AI",
      "AI onboarding tool",
      "enterprise AI knowledge management",
      "internal RAG system",
      "AI knowledge management Dallas",
      "private AI search company documents",
      "RAG knowledge base for growing teams",
    ],
    h1: "Internal AI Knowledge Bases & SOP Automation",
    features: [
      "Natural-language search across all company documents, SOPs, and wikis",
      "Connects to SharePoint, Google Drive, Notion, Confluence, and file servers via API",
      "Cited answers — every response links to the source document and paragraph",
      "Confidence scoring rejects low-certainty answers instead of hallucinating",
      "Role-based access control so departments only see authorized knowledge",
      "Auto-sync indexes new and updated documents without manual re-ingestion",
    ],
    howItWorksHeading: "How to build an AI knowledge base for your company",
    howItWorks: [
      {
        step: "Audit your documentation landscape and identify knowledge gaps",
        description:
          "We map where your company knowledge lives — SharePoint, Google Drive, Notion, Confluence, wikis, file servers, and undocumented tribal knowledge. We interview department leads to identify the 20 most frequently asked questions and the biggest onboarding bottlenecks.",
      },
      {
        step: "Ingest, chunk, and embed your documents into a private vector database",
        description:
          "We connect to your data sources via read-only API, split documents into semantic chunks, and generate vector embeddings stored in a private database on your infrastructure. No data leaves your environment. Role-based permissions mirror your existing access controls.",
      },
      {
        step: "Build the RAG pipeline with confidence scoring and citation logic",
        description:
          "We configure the retrieval-augmented generation pipeline — query parsing, semantic search, re-ranking, and answer synthesis via OpenAI API or Azure OpenAI. Every answer includes source citations. Confidence scoring rejects uncertain responses instead of hallucinating.",
      },
      {
        step: "Deploy to Slack, Teams, or intranet and train your team",
        description:
          "We launch the AI knowledge base where your team already works — Slack, Microsoft Teams, or a branded intranet portal. We run hands-on training sessions and configure auto-sync so new documents are indexed within minutes of being saved.",
      },
    ],
    integrations: [
      "Microsoft SharePoint",
      "Google Drive",
      "Notion",
      "Confluence",
      "Slack",
      "Microsoft Teams",
      "OpenAI API",
      "Azure OpenAI",
      "Pinecone",
      "Microsoft 365",
    ],
    stats: [
      { value: 50, suffix: "%", label: "Faster Employee Onboarding" },
      { value: 70, suffix: "%", label: "Fewer Repeated Questions" },
      { value: 5, suffix: "sec", label: "Avg. Answer Time" },
      { value: 600, suffix: "+", label: "Queries Handled Weekly" },
    ],
    faq: [
      {
        question: "How much does an internal AI knowledge base cost?",
        answer:
          "Setup ranges from $8,000–$20,000 depending on the number of data sources, document volume, and compliance requirements. Ongoing hosting and management starts at $500/month including auto-indexing and performance monitoring. Most Dallas businesses with 50+ employees recover the full cost within 3 months through reduced onboarding time and fewer repeated questions.",
      },
      {
        question: "Is my company data safe in an AI knowledge base?",
        answer:
          "Yes. We deploy on your infrastructure or a private cloud — your data never touches public AI services or trains third-party models. We implement AES-256 encryption at rest and in transit, role-based access control, and full audit logging. For regulated industries we build HIPAA, SOC 2, FINRA, and CMMC compliant deployments.",
      },
      {
        question: "What is the difference between an AI knowledge base and SharePoint search?",
        answer:
          "SharePoint search matches keywords. An AI knowledge base understands meaning. Ask 'What is our PTO policy for first-year employees?' and get the exact answer with a citation — instead of 50 documents that mention 'PTO'. It also searches across all your platforms simultaneously, not just SharePoint.",
      },
      {
        question: "How does RAG work for internal knowledge bases?",
        answer:
          "RAG (Retrieval-Augmented Generation) splits your documents into chunks, converts them into vector embeddings, and stores them in a searchable database. When an employee asks a question, the system retrieves the most relevant passages, then uses AI to synthesize a clear answer with citations. It only answers from your data — no hallucinations.",
      },
      {
        question: "How long does it take to deploy an AI knowledge base?",
        answer:
          "Most deployments take 4–6 weeks from kickoff to production. Week 1 covers the documentation audit and data source mapping. Weeks 2–4 handle ingestion, pipeline configuration, and accuracy testing. Weeks 5–6 cover deployment, team training, and auto-sync configuration. Companies with clean, centralized documentation can go faster.",
      },
      {
        question: "Can the AI knowledge base connect to multiple platforms at once?",
        answer:
          "Yes. A single knowledge base can pull from SharePoint, Google Drive, Notion, Confluence, file servers, and wikis simultaneously. Multi-source connectivity is included at no additional per-platform fee. Employees search one interface and get answers sourced from any connected platform.",
      },
      {
        question: "What happens when we update or add new documents?",
        answer:
          "Auto-sync monitors your connected data sources and re-indexes new or updated documents within minutes. No manual re-ingestion required. Deleted documents are automatically removed from search results. We also run quarterly reviews to tune retrieval accuracy as your knowledge base grows.",
      },
    ],
  },
  {
    slug: "data-audit",
    title: "The AI Data Readiness Audit",
    shortTitle: "AI Data Audit",
    description:
      "Is your data secure enough for AI? Get a comprehensive, flat-fee audit of your Microsoft 365 or Google Workspace environment — security risks and automation opportunities identified in 7 days.",
    longDescription:
      "Before you can use AI safely, you need to know what shape your data is in. Our AI Data Readiness Audit gives Dallas businesses a clear picture of their security posture, data organization, and automation opportunities in exactly 7 days. We assess your Microsoft 365 or Google Workspace environment, identify exposed sensitive data, and deliver a prioritized action plan — so you can adopt AI with confidence, not anxiety.",
    heroSummary:
      "Is your data secure enough for AI? Get a comprehensive, flat-fee audit of your Microsoft 365 or Google Workspace environment to identify security risks and automation opportunities in exactly 7 days.",
    href: "/data-audit",
    icon: "ShieldCheck",
    keywords: [
      "AI data readiness audit",
      "Microsoft 365 security audit",
      "Google Workspace security audit",
      "business data audit Dallas",
      "AI readiness assessment",
      "data security audit for AI",
    ],
    h1: "The AI Data Readiness Audit",
    features: [
      "Complete security assessment of your Microsoft 365 or Google Workspace",
      "Identify exposed sensitive data — PII, financial records, credentials",
      "Map automation opportunities ranked by time savings and ROI",
      "Compliance gap analysis for HIPAA, SOX, FINRA, and CMMC",
      "Detailed report with prioritized action items delivered in 7 days",
      "Flat-fee pricing — no hourly billing surprises",
    ],
    howItWorksHeading: "How the AI Data Readiness Audit works",
    howItWorks: [
      {
        step: "Connect your environment and run the automated security scan",
        description:
          "We connect read-only to your Microsoft 365 or Google Workspace using secure admin APIs. Our automated tools scan permissions, sharing settings, data exposure, and security configurations — no agents installed, no disruption to your team.",
      },
      {
        step: "Analyze findings and identify AI automation opportunities",
        description:
          "Our team reviews the scan results, identifies security risks and compliance gaps, and maps the workflows in your environment that are ripe for AI automation. We prioritize by risk severity and potential time savings.",
      },
      {
        step: "Deliver your action plan and roadmap in 7 days",
        description:
          "You receive a comprehensive report with: security risks ranked by severity, compliance gaps, AI automation opportunities ranked by ROI, and a clear implementation roadmap. We walk you through every finding in a live review session.",
      },
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Azure Active Directory",
      "Microsoft Defender",
      "Google Admin Console",
      "Microsoft Purview",
    ],
    stats: [
      { value: 7, suffix: " days", label: "Audit Turnaround Time" },
      { value: 100, suffix: "%", label: "Flat-Fee Pricing" },
      { value: 15, suffix: "+", label: "Security Checkpoints Assessed" },
    ],
    faq: [
      {
        question: "How much does the AI Data Readiness Audit cost?",
        answer:
          "We offer three flat-fee tiers: Essentials ($2,500) covers core security assessment for teams under 25 users, Professional ($5,000) adds compliance analysis and AI opportunity mapping for teams of 25–100, and Enterprise ($8,500) includes full compliance audit, executive briefing, and implementation roadmap for 100+ users. No hourly billing, no surprise invoices.",
      },
      {
        question: "What do you need access to for the audit?",
        answer:
          "Read-only admin access to your Microsoft 365 or Google Workspace environment. We use secure API connections — no agents installed on your machines, no passwords stored, no disruption to your team's work. Access is revoked immediately after the audit completes.",
      },
      {
        question: "Is my business data safe during the audit?",
        answer:
          "Yes. We use read-only API access — we can see configurations and metadata but cannot modify, copy, or download your actual files or emails. All findings are encrypted in transit and at rest, and we delete all scan data within 30 days of delivering your report.",
      },
      {
        question: "What if we're not ready for AI after the audit?",
        answer:
          "That's valuable information too. The audit gives you a clear, prioritized list of what to fix before adopting AI — and many of those fixes (permission cleanup, MFA enforcement, data organization) improve your security regardless of AI. Most businesses can address the critical items within 30–60 days.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Data Audit pricing tiers (for PricingTable component)
// ---------------------------------------------------------------------------

export const DATA_AUDIT_PRICING = [
  {
    tier: "Essentials",
    price: "$2,500",
    description: "Core security assessment for lean teams",
    users: "Up to 25 users",
    features: [
      "Microsoft 365 or Google Workspace security scan",
      "Permission and sharing audit",
      "Sensitive data exposure report",
      "Top 10 risk findings with remediation steps",
      "30-minute results walkthrough call",
    ],
    highlighted: false,
  },
  {
    tier: "Professional",
    price: "$5,000",
    description: "Full audit with compliance and AI opportunity mapping",
    users: "25–100 users",
    features: [
      "Everything in Essentials, plus:",
      "HIPAA / SOX / FINRA compliance gap analysis",
      "AI automation opportunity mapping ranked by ROI",
      "MFA and identity security review",
      "Detailed 40+ page report with executive summary",
      "60-minute live review session with your leadership team",
    ],
    highlighted: true,
  },
  {
    tier: "Enterprise",
    price: "$8,500",
    description: "Comprehensive audit for larger organizations",
    users: "100+ users",
    features: [
      "Everything in Professional, plus:",
      "CMMC / NIST compliance assessment",
      "Third-party app and OAuth permission audit",
      "Data classification and retention analysis",
      "Custom AI implementation roadmap",
      "Executive briefing presentation for stakeholders",
      "90-day follow-up check-in included",
    ],
    highlighted: false,
  },
] as const;

// ---------------------------------------------------------------------------
// Insight / Spoke Pages
// ---------------------------------------------------------------------------

export interface InsightItem {
  slug: string;
  title: string;
  description: string;
  href: string;
  publishedDate: string;
  modifiedDate?: string;
  hubSlug: string;
  hubLabel: string;
  hubHref: string;
  keywords: string[];
  h1: string;
  content: string[];
  faq: { question: string; answer: string }[];
}

// Side-by-side feature matrix for the Claude plan comparison insight article.
// Rendered by the PlanComparisonTable component. Plan facts verified against
// claude.com/pricing and the Claude Help Center (June 2026).
export interface PlanComparison {
  caption: string;
  plans: { name: string; tagline: string; highlight?: boolean }[];
  rows: { feature: string; values: string[] }[];
}

export const CLAUDE_PLAN_COMPARISON: PlanComparison = {
  caption:
    "Claude plan comparison — Free, Pro, Max, Team, and Enterprise pricing, usage, and features (June 2026)",
  plans: [
    { name: "Free", tagline: "Try Claude" },
    { name: "Pro", tagline: "Solo professionals" },
    { name: "Max", tagline: "Heavy daily use" },
    { name: "Team", tagline: "Small companies", highlight: true },
    { name: "Enterprise", tagline: "Security at scale" },
  ],
  rows: [
    {
      feature: "Price per user / month",
      values: [
        "$0",
        "$20 ($17 annual)",
        "$100 (5x) or $200 (20x)",
        "$25 Standard / $125 Premium",
        "From $20/seat + usage, or custom",
      ],
    },
    {
      feature: "Usage vs Pro",
      values: [
        "Limited daily",
        "Baseline",
        "5x or 20x more per session",
        "More than Pro; Premium highest",
        "Highest, negotiated",
      ],
    },
    {
      feature: "Models",
      values: [
        "Default model only",
        "Opus, Sonnet, Fable 5",
        "Opus, Sonnet, Fable 5 (priority)",
        "Opus, Sonnet, Fable 5",
        "All models, expanded",
      ],
    },
    {
      feature: "Claude Code",
      values: ["—", "Included", "Included, more usage", "Premium seats", "Included"],
    },
    {
      feature: "Projects",
      values: ["Limited", "Unlimited", "Unlimited", "Unlimited, shared", "Unlimited, shared"],
    },
    {
      feature: "Context window",
      values: ["200K", "200K", "200K", "200K", "Up to 500K (some models)"],
    },
    {
      feature: "Integrations",
      values: [
        "Google Workspace, Slack, MCP",
        "+ Microsoft 365 / Outlook",
        "+ Microsoft 365 / Outlook",
        "+ enterprise search",
        "+ enterprise search, custom",
      ],
    },
    {
      feature: "Central billing & admin",
      values: ["—", "—", "—", "Admin console", "RBAC console"],
    },
    {
      feature: "SSO / SCIM / audit logs",
      values: ["—", "—", "—", "SSO + admin controls", "SSO, SCIM, audit logs"],
    },
    {
      feature: "HIPAA / advanced security",
      values: ["—", "—", "—", "—", "HIPAA-ready (BAA), IP allowlisting"],
    },
    {
      feature: "Your data trains models?",
      values: [
        "Off by default (opt-in)",
        "Off by default (opt-in)",
        "Off by default (opt-in)",
        "Never, by default",
        "Never",
      ],
    },
  ],
};

export const INSIGHTS: InsightItem[] = [
  {
    slug: "claude-fable-5-id-verification-return",
    title:
      "Claude Fable 5 and ID Verification: Could Identity Checks Bring the Banned Model Back?",
    description:
      "Anthropic's most powerful model, Claude Fable 5, was suspended by a US export order. New ID verification could be the path back — here is what it means for business.",
    href: "/insights/claude-fable-5-id-verification-return",
    publishedDate: "2026-06-30",
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "claude fable 5 return",
      "claude fable 5 ban",
      "claude fable 5 suspended",
      "claude identity verification",
      "anthropic id verification",
      "claude fable 5 export control",
      "anthropic distillation attack",
      "claude mythos 5",
      "frontier ai identity governance",
      "claude fable 5 news",
    ],
    h1: "Claude Fable 5 and Identity Verification: Could ID Checks Bring Anthropic's Banned Model Back?",
    content: [
      "Anthropic launched Claude Fable 5 on June 9, 2026, as the most powerful model the public could buy. Three days later, it was gone. A US export-control order pulled Fable 5 and its sibling Mythos 5 offline for every foreign national worldwide. Now Anthropic is rolling out mandatory identity verification for consumer accounts — and analysts are asking whether verified identity is the key that reopens the door. This guide separates what is confirmed from what is speculation, and what it means for your business. ITECS helps companies deploy frontier AI safely through [secure custom AI agents and governance](/custom-ai-agents).",
      "**The US government suspended Claude Fable 5 on June 12, 2026, over foreign-access national security concerns. Separately, Anthropic disclosed a 16-million-exchange model-distillation campaign run through roughly 24,000 fake accounts. Its new identity verification — live for consumer plans on July 8, 2026 — attacks the anonymous access behind both problems. Whether it brings Fable 5 back is still speculation.**",
      "**What Happened: Fable 5 Launched, Then Vanished in Three Days**",
      "Anthropic released Fable 5 and the restricted Mythos 5 on June 9, 2026. On June 12, the US Commerce Department's Bureau of Industry and Security ordered Anthropic to suspend all access to both models by any foreign national, anywhere — including Anthropic's own foreign-national employees. The order used authority under the Export Control Reform Act.",
      "The trigger was security, not sales. An NSA red-team review found a jailbreak that could turn the models into unrestricted cyber tools. NSA Director General Joshua Rudd later testified that Mythos autonomously breached nearly all classified systems it was tested against within hours. Anthropic publicly disagreed with recalling a model used by hundreds of millions, but it complied. We covered the model's debut in our [Claude Fable 5 release analysis](/insights/claude-fable-5-release).",
      "**The Distillation Attack That Set the Stage**",
      "Around the same window, Anthropic disclosed a separate security event. Three Chinese AI labs — DeepSeek, Moonshot AI, and MiniMax — ran what Anthropic calls illicit model distillation. They generated more than 16 million exchanges with Claude through roughly 24,000 fraudulent accounts, harvesting the model's outputs to train competing systems.",
      "Distillation matters for safety, not just business. A model trained on Claude's outputs copies its capabilities but inherits none of its safety training, usage policies, or access controls. Anthropic warns that this strips out guardrails and lets dangerous capabilities spread. The campaign's weapon was simple: thousands of anonymous, fake accounts. That detail is why identity verification enters the story.",
      "**Anthropic's New Move: Mandatory Identity Verification**",
      "On July 8, 2026, Anthropic begins requiring identity verification for consumer Claude accounts — Free, Pro, and Max. Users submit a government-issued photo ID and a live selfie, and a third-party vendor, Persona, checks them. Anthropic states it does not use this identity data to train its models, and Persona holds the documents rather than Anthropic. The verification has run in limited form since April 2026.",
      "Two facts shape what this means for business. First, the requirement covers consumer plans only — **Team, Enterprise, and the developer API are exempt**. Second, the data is biometric: Anthropic collects facial geometry templates, which it acknowledges may count as biometric data in some jurisdictions. Anthropic's stated reason is plain — knowing who uses powerful AI helps prevent abuse and enforce its policies. For how the tiers differ, see our [Claude plan comparison](/insights/claude-plan-comparison).",
      "**The Thesis: Could ID Verification Reopen Fable 5?**",
      "Here the confirmed facts end and informed speculation begins. Anthropic has not announced that identity verification will restore Fable 5. But several analysts have connected the dots, and the logic is worth understanding.",
      "The export order's core concern is foreign access. If Anthropic can prove that only verified US persons reach its most powerful model, it may satisfy that concern without a full government agreement. Identity verification is the tool that makes such proof possible. Reporting in late June noted Fable 5 resurfacing in limited forms as testimony reshaped the ban. **Treat the verified-US-access path as a credible theory, not a confirmed plan — the Commerce Department has not endorsed it.**",
      "**How Identity Verification Actually Helps**",
      "Identity verification addresses both of Anthropic's recent problems through one mechanism: it removes anonymity. ITECS sees three ways that matters.",
      "**It raises the cost of fake-account farming.** The distillation campaign depended on roughly 24,000 fraudulent accounts. Government-ID verification makes mass fake-account creation far harder and more expensive.",
      "**It enables jurisdiction control.** Verified identity lets Anthropic enforce who may use which model by nationality or region — the exact requirement the export order imposes.",
      "**It supports accountability.** When every high-capability session ties to a verified person, abuse becomes traceable, which is the foundation of any usage policy with teeth.",
      "**What This Means for Your Business**",
      "For most companies, the headline is reassuring: the identity requirement does not touch the business tiers. A 50-person Dallas firm running Claude on Team or Enterprise seats, or through the API, will not be asked for employee selfies. The consumer ID check targets individual Free, Pro, and Max users.",
      "But the deeper signal matters more. Identity is becoming a gate for frontier-AI access. Consider a Dallas engineering firm that standardized on Fable 5 for its hardest design work through individual Max accounts. When the export order hit, its foreign-national engineers lost access overnight, and the team had no governance to fall back on. A firm using Enterprise seats with managed identity would have kept working under clear, auditable rules.",
      "The lesson is to treat AI access as an identity and governance problem now, before a regulator or a vendor forces the issue. That means knowing who uses which model, on which plan, for what data — and being able to prove it. ITECS builds that governance into every deployment, and pairs it with [team AI training](/training) so the controls hold up in daily use.",
      "**Security, Privacy, and the Biometric Question**",
      "Identity verification solves one risk and creates another. Handing a government ID and facial geometry to a third party concentrates sensitive biometric data, and businesses should weigh how it is stored, retained, and shared. The right framework already exists. The [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/) define how to verify identity at the assurance level a use case actually needs, without over-collecting data. ITECS applies that standard so identity controls match the real risk.",
      "For businesses, the safer path is structural. Keep frontier-AI use on Enterprise or API tiers with managed identity, scope which data each user and agent can reach, and classify sensitive information before it touches any model. ITECS runs a [data and AI readiness audit](/data-audit) to do exactly that, and applies the same discipline behind its [custom AI agents](/custom-ai-agents). The OpenClaw crisis showed how fast ungoverned AI access turns into exposure — our [breakdown of that incident](/insights/openclaw-security-crisis) is a useful companion read.",
      "**How ITECS Helps You Deploy Frontier AI Securely**",
      "The Fable 5 episode is a preview, not an exception. Frontier models will keep arriving with shifting access rules, security reviews, and identity requirements attached. Businesses that treat AI as a governed system — not a free-for-all of personal accounts — will adapt without disruption.",
      "ITECS prices this work transparently: hourly consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment and no expiration, plus a flat fee for scoped builds. We help you choose the right plan and tier, configure identity and access controls, and keep frontier AI productive and compliant as the rules change. When you want frontier AI deployed with real identity governance, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "Why was Claude Fable 5 suspended?",
        answer:
          "On June 12, 2026, the US Commerce Department ordered Anthropic to suspend access to Claude Fable 5 and Mythos 5 for all foreign nationals worldwide, citing national security under export-control authority. The trigger was an NSA red-team finding that the models could be jailbroken into unrestricted cyber tools, not a commercial or quality problem.",
      },
      {
        question: "What is Anthropic's new identity verification for Claude?",
        answer:
          "Starting July 8, 2026, Anthropic requires consumer Claude users on the Free, Pro, and Max plans to verify identity with a government-issued photo ID and a live selfie, processed by the vendor Persona. Team, Enterprise, and API customers are exempt, and Anthropic says it does not use the identity data to train its models.",
      },
      {
        question: "Will ID verification bring Claude Fable 5 back?",
        answer:
          "It might, but that is not confirmed. Anthropic has not announced that identity verification will restore Fable 5. Analysts argue that proving only verified US persons can access the model could satisfy the export order's foreign-access concern, but the Commerce Department has not endorsed that path.",
      },
      {
        question: "What was the Claude distillation attack?",
        answer:
          "Anthropic disclosed that three Chinese AI labs — DeepSeek, Moonshot AI, and MiniMax — generated more than 16 million exchanges through roughly 24,000 fraudulent accounts to copy Claude's capabilities. Distilled models reproduce capability without inheriting Claude's safety training, which Anthropic calls a national security risk.",
      },
      {
        question: "Does the Claude ID requirement affect my business?",
        answer:
          "Probably not directly. The identity verification applies only to individual Free, Pro, and Max accounts, while Team, Enterprise, and API usage is exempt. The larger takeaway is that identity is becoming a gate for frontier-AI access, so businesses should manage Claude through governed Enterprise or API tiers rather than personal accounts.",
      },
    ],
  },
  {
    slug: "claude-plan-comparison",
    title:
      "Claude Plan Comparison: Free, Pro, Max, Team, and Enterprise Side by Side",
    description:
      "Compare Claude's Free, Pro, Max, Team, and Enterprise plans side by side — pricing, usage limits, Claude Code, security, and the right plan for your business.",
    href: "/insights/claude-plan-comparison",
    publishedDate: "2026-06-17",
    hubSlug: "consulting",
    hubLabel: "AI Consulting",
    hubHref: "/consulting",
    keywords: [
      "claude plan comparison",
      "claude free vs pro vs max",
      "claude team vs enterprise",
      "claude pricing plans",
      "which claude plan",
      "claude max worth it",
      "best claude plan for business",
      "claude pro price",
      "claude enterprise features",
      "claude team plan seats",
    ],
    h1: "Claude Plan Comparison: Free vs Pro vs Max vs Team vs Enterprise",
    content: [
      "Anthropic offers five ways to pay for Claude: Free, Pro, Max, Team, and Enterprise. They range from a $0 trial to a negotiated enterprise contract, and the gap between them is not just price — it is usage limits, security controls, and who manages the account. Pick the wrong tier and you either waste money or throttle your team. This guide compares all five side by side and shows which one fits a growing business. For a tailored recommendation, ITECS offers [AI consulting and Claude plan selection](/consulting).",
      "**Claude Free is $0 for light personal use. Pro is $20 per month for individual professionals. Max is $100 or $200 per month for heavy daily users and Claude Code. Team starts at $25 per seat with central billing and single sign-on. Enterprise adds SCIM, audit logs, HIPAA readiness, and a 500K context window for organizations that need control.**",
      "**Claude's Five Plans at a Glance**",
      "Claude's lineup splits into two groups. The **individual plans** — Free, Pro, and Max — bill one person and scale by usage. The **business plans** — Team and Enterprise — bill by seat and add the admin, billing, and security controls a company needs. The table below compares every plan on the factors that actually drive the decision.",
      "Two numbers change most often: price and usage limits. The figures here reflect Anthropic's published pricing as of June 2026. Always confirm current limits in your account before you commit a budget.",
      "[[COMPARISON_TABLE]]",
      "A quick read of the table: most solo users belong on Pro, most small companies on Team, and only organizations with compliance or identity requirements need Enterprise. The sections below explain each plan and who it fits.",
      "**Free: Try Claude With No Commitment**",
      "The Free plan costs nothing and runs on the web, desktop, and mobile apps. You get chat, web search, file analysis, code execution, extended thinking, and connections to Google Workspace, Slack, and remote MCP tools. It is enough to judge whether Claude helps your work.",
      "Two limits define Free. Usage is capped at a small daily allotment that resets on a rolling window, and you cannot use Claude Code, the terminal and IDE coding agent. Treat Free as a trial, not a workhorse.",
      "**Pro: The Default for Individual Professionals**",
      "Pro costs $20 per month, or $17 per month billed annually. It lifts the usage limit well above Free and unlocks the tools most professionals want: Claude Code, Claude Cowork, Claude Design, unlimited projects, the Research feature, and a choice of models including Opus, Sonnet, and the newer Fable 5. It also adds Microsoft 365 and Outlook integration.",
      "For a single knowledge worker — a consultant, developer, analyst, or marketer — Pro is the right default. The one caveat is heavy automation. If you run long agentic sessions, Pro's limits arrive fast, which is exactly what Max solves. Our [guide to Claude Cowork for business](/insights/claude-cowork-for-small-business) shows the kind of workflows that push those limits.",
      "**Max: For Heavy Daily Users and Claude Code**",
      "Max comes in two tiers. Max 5x costs $100 per month and gives five times Pro's usage per session. Max 20x costs $200 per month and gives twenty times Pro's usage. Both add higher output limits, priority access during peak traffic, and early access to new features.",
      "Max exists for one reason: usage. Anthropic meters paid plans against a rolling five-hour window plus weekly caps, and the premium Fable 5 model burns through them quickly. A developer who lives in Claude Code, or an analyst running long document jobs, will hit Pro's ceiling daily. We break down that dynamic in our [analysis of Fable 5's usage limits](/insights/claude-fable-5-release).",
      "**Team: Shared Billing and Admin for Small Companies**",
      "Team is Claude's first real business plan. It requires a minimum of five seats and offers two seat types: Standard at $25 per month and Premium at $125 per month, each cheaper billed annually. Premium seats carry far more usage and the full Claude Code, Cowork, and Design toolset. You can mix seat types across the team.",
      "Team adds what individuals do not need: central billing, an admin console, single sign-on, enterprise search across your workspace, and a default policy that your content does not train Anthropic's models. For a 10-to-50-person company standardizing on Claude, Team is usually the answer.",
      "**Enterprise: Security, SSO, and Compliance at Scale**",
      "Enterprise is for organizations with security, identity, or compliance requirements. A self-serve option starts around $20 per seat plus usage-based costs; larger deployments use a negotiated contract. Enterprise adds role-based access control, SCIM provisioning, audit logs, IP allowlisting, spend controls, and an expanded context window up to 500K tokens on some models.",
      "The deciding features are usually compliance and identity. Enterprise offers a HIPAA-ready configuration under a Business Associate Agreement, plus the Claude Security tooling regulated businesses need. If you must provision users through SCIM or sign a BAA, Enterprise is the only tier that qualifies.",
      "**How to Choose the Right Claude Plan**",
      "Match the plan to the work, not the logo. Consider a 30-person Dallas accounting firm. Its partners want Claude for research and client memos, three analysts run heavy document review, and the firm handles regulated financial data. The right answer is not one plan — it is a mix.",
      "We would put the partners and staff on Team Standard seats for shared billing and single sign-on, give the three heavy analysts Team Premium seats for the extra usage, and evaluate Enterprise only if a client contract requires a signed BAA or SCIM provisioning. That sizing keeps cost down while covering the real workloads. ITECS builds exactly this kind of plan, paired with [team AI training](/training) so people actually adopt it.",
      "A simple rule covers most cases. One person: Pro, or Max if you live in Claude Code. A small company: Team, with Premium seats for power users. A regulated or identity-managed organization: Enterprise. When the choice is unclear, an [AI readiness and consulting engagement](/consulting) sizes it against your real usage.",
      "**Security, Data Privacy, and Compliance**",
      "Plan choice is also a security decision. On the business plans, Anthropic does not train its models on your content by default, and Enterprise adds the controls auditors expect: SSO, SCIM, audit logs, and a HIPAA-ready option. Anthropic documents its certifications and data handling in the [Anthropic Trust Center](https://trust.anthropic.com). Before any business connects Claude to sensitive systems, confirm where your data flows and who can see it.",
      "The controls that matter most are the ones you operate. Scope which tools and data each seat can reach, require approval on actions that touch customer records, and classify your data before connecting it. ITECS runs a [data and AI readiness audit](/data-audit) to do exactly that, and applies the same governance behind its [custom AI agents](/custom-ai-agents) — the discipline of a cybersecurity practice ITECS has run since 2002. For teams worried about exposure, our guide to [keeping business data safe in AI tools](/insights/secure-business-data-chatgpt) is a useful starting point.",
      "**What It Costs to Roll Out Claude With ITECS**",
      "The license is only part of the cost. The rest is setup: choosing seats, configuring single sign-on and spend caps, connecting tools safely, and training people to use Claude well. Done wrong, companies overbuy Enterprise seats nobody needs or underbuy Team seats that throttle their best people.",
      "ITECS prices this work transparently — hourly consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment and no expiration, plus a flat fee for scoped rollouts. The ROI is concrete: right-sized seats, governed usage, and a team that adopts the tool instead of fighting its limits. When you are ready to choose and deploy the right Claude plan, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "How much does each Claude plan cost?",
        answer:
          "Claude Free is $0. Pro is $20 per month, or $17 per month billed annually. Max is $100 per month for the 5x tier and $200 per month for the 20x tier. Team is $25 per month for a Standard seat and $125 for a Premium seat, with a five-seat minimum. Enterprise starts around $20 per seat plus usage, or a custom contract.",
      },
      {
        question: "What is the difference between Claude Pro and Max?",
        answer:
          "Pro and Max include the same features, but Max gives far more usage. Max 5x provides five times Pro's per-session usage for $100 per month, and Max 20x provides twenty times for $200 per month. Choose Max if you run long Claude Code sessions or heavy document jobs that exhaust Pro's limits.",
      },
      {
        question: "Which Claude plan is best for a small business?",
        answer:
          "Most small companies should use the Team plan. It requires five seats, adds central billing, single sign-on, and an admin console, and keeps your content out of model training by default. Assign Premium seats to power users who need more usage and Standard seats to everyone else.",
      },
      {
        question: "When does a business need Claude Enterprise instead of Team?",
        answer:
          "Choose Enterprise when you need SCIM user provisioning, audit logs, a HIPAA Business Associate Agreement, IP allowlisting, or a context window beyond 200K tokens. Team covers billing, SSO, and admin for most small companies, but only Enterprise adds the compliance and identity controls regulated organizations require.",
      },
      {
        question: "Does Claude train its AI on my business data?",
        answer:
          "On the Team and Enterprise plans, Anthropic does not train its models on your content by default. On the Free, Pro, and Max individual plans, training is governed by an account setting you can turn off. For sensitive data, ITECS recommends the business plans and a data readiness review before connecting Claude to internal systems.",
      },
    ],
  },
  {
    slug: "self-hosted-ai-agents-seafile",
    title:
      "Self-Hosted AI Agents: How ITECS Shares Codex and Cowork Agents Across the Team",
    description:
      "ITECS runs a self-hosted Seafile server to share Codex and Claude Cowork AI agents across the team — and keep every client's data inside our security boundary.",
    href: "/insights/self-hosted-ai-agents-seafile",
    publishedDate: "2026-06-15",
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "self-hosted ai agents",
      "share ai agents across a team",
      "seafile self-hosted file sync",
      "codex ai agents",
      "claude cowork agents",
      "docbot documentation agent",
      "keep client data in-house ai",
      "open source ai agent sharing",
      "self-hosted ai for msp",
      "ai agent file sync windows macos",
    ],
    h1: "Self-Hosted AI Agents: How ITECS Shares Codex and Cowork Agents Without Sending Client Data to the Cloud",
    content: [
      "Most teams that want everyone using the same AI agent reach for a cloud drive — Dropbox, Google Drive, OneDrive — drop the agent files in a shared folder, and sync. It works, but it ships your prompts, your configurations, and often your clients' data through a third party you do not control. ITECS took a different path. We run our own file-sync server and use it to share the same [custom AI agents](/custom-ai-agents) with every employee, without a single client file leaving our security boundary.",
      "**ITECS shares App-enabled AI agents — the kind that run natively inside Codex and Claude Cowork — by syncing them through a self-hosted Seafile server in our own datacenter. Every employee on Windows or macOS gets the same agents in their project folders automatically, and no client data ever touches a public cloud file service like Dropbox.**",
      "**The Problem With Sharing AI Agents Through a Cloud Drive**",
      "An AI agent is only useful to a company if everyone can use the same one. When one technician builds a strong documentation agent, the whole team should inherit it the next morning — not rebuild it from scratch. The obvious way to distribute it is a shared cloud folder. That convenience carries a quiet cost.",
      "Consider a 60-person managed services firm that supports dozens of clients. An engineer builds an AI agent that reads a client's network documentation and drafts the missing runbooks. To share it, the team drops the agent — and the client documentation it reads — into a Dropbox folder. Now a third-party vendor stores network diagrams, admin procedures, and onboarding notes for every client. One misconfigured share link or vendor breach exposes data the firm contractually promised to protect.",
      "That is the trade most teams never examine. The agent files are not the sensitive part — the client data they touch is. Sync that through a public cloud and you have moved your clients' information outside your control to save a few minutes of setup.",
      "**What ITECS Built: One Shared Library of AI Agents**",
      "ITECS solved this with infrastructure we own end to end. The core is [Seafile](https://www.seafile.com/en/home/), an open-source file-sync platform, running on a Linux server inside our Dallas datacenter. It does what Dropbox does — keep folders identical across many computers — except we host it, we hold the encryption keys, and the data stays on our hardware.",
      "Three pieces work together. **Seafile** handles secure file sync and version history across the workforce. **Codex and Claude Cowork** are the AI tools our employees run locally; both support App-enabled agents, meaning an agent is defined by files — instructions, skills, and scripts — that live in a project folder. **The Seafile client** on each Windows and macOS machine keeps those project folders identical for everyone. If your team is new to these tools, start with our guide to [Claude Cowork for small business](/insights/claude-cowork-for-small-business).",
      "When an engineer improves an agent on their laptop, Seafile syncs the change to our server, then out to every other endpoint. The next time a colleague opens Codex or Cowork in that project folder, they run the updated agent — no install, no copying, no manual versioning. The whole company shares one evolving library of AI agents the same way a team shares a set of documents. We covered the broader pattern in [building a shared repository of agentic skills](/insights/enterprise-agentic-skills-repo).",
      "**Meet DOCBOT: The Agent That Manages Client Documentation**",
      "The clearest example is an agent we call DOCBOT. It manages client documentation — the runbooks, standard operating procedures, onboarding and offboarding checklists, and knowledge-base articles a managed services team lives on. DOCBOT lives in a synced project folder, so every technician runs the same version.",
      "A technician asks DOCBOT to do three kinds of work. It **adds** new documentation, turning a finished project or a support ticket into a clean SOP. It **updates** existing records when a client's environment changes, so the docs match reality. And it **discovers** gaps, flagging the runbooks, onboarding steps, and knowledge-base articles a client should have but does not. Documentation stops being the task everyone skips and becomes a prompt away.",
      "In practice, a technician finishing a firewall replacement tells DOCBOT what changed. DOCBOT drafts the updated network runbook, adds the offboarding step for the old device, and checks whether the client's onboarding guide still references hardware that no longer exists. A human reviews and approves. The documentation that used to lag weeks behind the work now keeps pace with it. DOCBOT is one pattern of the [AI knowledge base](/ai-knowledge-base) work we deliver for clients, applied to our own operations.",
      "**How the Shared-Agent System Works**",
      "Setting up shared, self-hosted AI agents follows four steps. ITECS runs the same playbook for clients who want their own private version.",
      "**Step 1: Stand up a self-hosted sync server.** We install Seafile on a hardened Linux server inside the datacenter, behind the firewall, with encrypted storage and scheduled backups. Nothing depends on a third-party cloud.",
      "**Step 2: Define agents as files in project folders.** Each AI agent — its instructions, skills, and scripts — lives in a versioned project folder. Because Codex and Claude Cowork read agents from the folder, the folder is the agent.",
      "**Step 3: Sync to every endpoint.** The Seafile client on each Windows and macOS machine keeps those folders identical. New hires get the full agent library on day one by signing in.",
      "**Step 4: Govern changes like code.** Edits sync with version history, so we can see who changed an agent and roll back a bad update. Sensitive actions still require human review before they run.",
      "**Why Seafile, and Why Self-Hosted**",
      "We chose Seafile deliberately. It is **open-source**, so we can audit exactly how it handles our data instead of trusting a closed vendor black box. It is **self-hosted**, so the server, the storage, and the encryption keys are ours. And it keeps **client data inside our boundary**, which is the whole point for a firm that signs confidentiality agreements with every client.",
      "Public cloud sync tools like Dropbox, Google Drive, and OneDrive are excellent products, but they place a third party between us and our clients' data. For a managed services provider, that is a contractual and security liability we choose not to carry. Self-hosting trades a little convenience for full custody of sensitive information.",
      "**Security and Data Boundaries**",
      "Keeping data in-house is not automatically secure — it has to be operated that way. We treat the agent platform like any production system: scoped access per employee, encrypted storage, audited changes, network segmentation, and human approval gates on anything that touches client data. We align the controls to the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), the U.S. standard most enterprise auditors now use for AI accountability. Before any client's data feeds an agent, we run a [data and AI readiness audit](/data-audit) to confirm it is classified, access-controlled, and safe to use.",
      "This is the same discipline behind ITECS' [custom AI agents](/custom-ai-agents) for clients — private environments, no third-party model training on your data, and the backing of a cybersecurity practice ITECS has run since 2002. For teams adopting these tools, [structured AI training](/training) makes sure people actually use the approval gates instead of working around them.",
      "**What It Costs and the ROI of Shared Agents**",
      "The economics are straightforward. A self-hosted sync server runs on hardware most firms already own, plus the open-source Seafile software, which carries no per-seat license. The real return is operational: one engineer's best agent becomes every engineer's tool overnight, and documentation that used to be skipped gets done.",
      "ITECS builds these systems on its standard model — hourly consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment and no expiration, plus a flat fee for scoped builds like a private agent platform or a custom [workflow automation](/automation). The ROI shows up as hours returned to billable work and as risk removed, because client data never leaves your control. When you want the same setup for your team, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "What are App-enabled AI agents?",
        answer:
          "App-enabled AI agents run natively inside tools like Codex and Claude Cowork, defined by files — instructions, skills, and scripts — that live in a project folder. Because the folder defines the agent, syncing the folder shares the agent with everyone on the team.",
      },
      {
        question: "Why does ITECS use Seafile instead of Dropbox or Google Drive?",
        answer:
          "Seafile is open-source and self-hosted, so ITECS owns the server, storage, and encryption keys and keeps client data inside its own security boundary. Public cloud sync tools like Dropbox or Google Drive place a third party between the firm and its clients' sensitive data, a liability a managed services provider chooses not to carry.",
      },
      {
        question: "What is DOCBOT?",
        answer:
          "DOCBOT is an ITECS AI agent that manages client documentation. Technicians use it to add new SOPs, update runbooks when an environment changes, and discover missing onboarding, offboarding, and knowledge-base content — all from a synced project folder so everyone runs the same version.",
      },
      {
        question: "How do shared AI agents stay in sync across Windows and macOS?",
        answer:
          "The Seafile client on each Windows and macOS computer keeps the agent project folders identical. When one employee improves an agent, the change syncs to the self-hosted server and out to every other endpoint, so the whole team runs the updated agent with no manual copying.",
      },
      {
        question: "Can ITECS build a self-hosted AI agent system for my business?",
        answer:
          "Yes. ITECS sets up self-hosted file sync, defines agents as versioned project folders, and aligns the controls to the NIST AI Risk Management Framework, with a data readiness audit before any sensitive data is used. The work runs on hourly consulting or prepaid retainer hours, with a flat fee for scoped platform builds.",
      },
    ],
  },
  {
    slug: "claude-fable-5-release",
    title:
      "Claude Fable 5 Is Here: Benchmarks, Real-World Performance, and the Usage-Limit Backlash",
    description:
      "Anthropic released Claude Fable 5 on June 9, 2026 — its most powerful public model yet. Here are the benchmarks, what users report, and why the usage limits are frustrating teams.",
    href: "/insights/claude-fable-5-release",
    publishedDate: "2026-06-11",
    hubSlug: "consulting",
    hubLabel: "AI Consulting",
    hubHref: "/consulting",
    keywords: [
      "claude fable 5",
      "claude fable 5 benchmarks",
      "claude fable 5 release",
      "claude fable 5 usage limits",
      "claude fable 5 vs opus 4.8",
      "anthropic mythos 5",
      "claude fable 5 swe-bench",
      "claude fable 5 pricing",
      "claude fable 5 rate limits reddit",
      "best ai model for business 2026",
    ],
    h1: "Claude Fable 5: What Business Leaders Should Know About Anthropic's Most Powerful Public Model",
    content: [
      "On June 9, 2026, Anthropic released Claude Fable 5 — the first \"Mythos-class\" model the public can use, and the company's own description calls it \"state-of-the-art on nearly all tested benchmarks.\" Fable 5 posts record coding and knowledge-work scores, runs autonomously across millions of tokens, and reads charts, tables, and diagrams nested inside PDFs. It is genuinely the strongest model most teams can buy today. It also burns through subscription usage limits roughly twice as fast as Claude Opus 4.8, and that has turned the launch week into a mix of awe and frustration.",
      "**For Dallas business leaders, the practical question is not whether Fable 5 is impressive — it is. The question is where it belongs in your stack, what it costs to run at scale, and how to govern it so a single agent session does not drain a month of usage in an afternoon.** That is the work ITECS does in an [AI consulting and readiness engagement](/consulting): match the right model to the right task, set cost guardrails, and give your team a clear adoption plan.",
      "**What Anthropic Actually Released On June 9, 2026**",
      "Anthropic launched two models the same day. Claude Fable 5 is the public, safety-hardened version available to everyone. Claude Mythos 5 is the same underlying model with certain cybersecurity and biology safeguards removed, restricted to Anthropic-approved partners — its Project Glasswing cybersecurity allies and select biology researchers. For practical purposes, Fable 5 is the model your business will use, and Mythos 5 is the locked-down sibling that explains the unusual naming.",
      "Fable 5 is available immediately through the Claude API and on Amazon Bedrock, Google Vertex AI, and Microsoft Foundry, so it slots into the cloud platforms most businesses already run. On the consumer side, it ships inside the Pro, Max, Team, and Enterprise subscription plans. One detail matters for budgeting: Fable 5 is included in those plans at no extra cost only through June 22, 2026. After that date, Fable 5 usage draws from pay-as-you-go usage credits on top of the subscription.",
      "**The Benchmarks: Where Fable 5 Sets Records**",
      "Fable 5's headline numbers are in software engineering, and the gap over the prior generation is large. On SWE-bench Verified — the standard test of fixing real GitHub issues — Fable 5 scores 95.0 percent, against 88.6 percent for Anthropic's own Claude Opus 4.8, 82.6 percent for GPT-5.5, and 78.8 percent for Gemini 3.5 Flash. On the harder SWE-Bench Pro, Fable 5 reaches 80.3 percent, roughly eleven points ahead of the next-best frontier model.",
      "The most striking result is on Cognition's FrontierCode evaluation, which measures the hardest end of coding ability. On its Diamond split, Fable 5 scores 29.3 percent — more than double Opus 4.8's 13.4 percent and over five times GPT-5.5's 5.7 percent. The translation for a business: on the kind of complex, multi-file engineering work that used to require a senior developer, Fable 5 is meaningfully more capable than anything previously available, including last quarter's flagship.",
      "The gains are not limited to code. Fable 5 posted the highest score on Hebbia's Finance Benchmark for senior-level reasoning, broke 90 percent on one partner's core analytics benchmark — a ten-point jump over Opus 4.8 — and set new highs on legal benchmarks LAB and BigLaw Bench. Anthropic also calls it a new state-of-the-art vision model; in a public demonstration, Fable 5 completed the game Pokémon FireRed using a vision-only interface with no helper tools. Stripe reported the model \"compressed months of engineering into days\" on a migration of a 50-million-line codebase.",
      "**What Users Are Reporting In The First Week**",
      "Early reaction on developer forums splits cleanly into two camps. On the capability side, the praise is consistent: Reddit's r/ClaudeAI and Hacker News threads describe Fable 5 sustaining long, autonomous coding sessions that earlier models lost the thread on, holding context across an entire repository, and one-shotting refactors that previously took several back-and-forth prompts. For complex engineering and analysis, most testers agree the model lives up to the benchmarks.",
      "The second camp is louder, and it is about cost. Inside Claude Code, the model picker now carries a blunt warning: \"Fable 5 — Uses your limits ~2x faster than Opus.\" In practice, many users report the burn is steeper than 2x for agentic work, and the complaints are specific. One developer on a $100-per-month Max plan described burning \"just shy of $100\" of tokens in a single agentic session — a workload they had run on Opus multiple times with no issue. Another reported exhausting their entire five-hour usage window in eight minutes with extended thinking enabled. A recurring story: open a Claude Code session, step away, and return to find the window gone and usage credits charging in the background.",
      "**Why The Usage Limits Disappear So Fast**",
      "Anthropic's subscription plans do not grant a fixed daily message count. Usage is metered against a rolling five-hour window that starts from your first message in a burst, plus a separate weekly cap. The two limits run independently — hitting one does not reset the other. Fable 5 consumes both faster for three structural reasons that compound during agentic work.",
      "First, the model produces longer, more thorough outputs than Opus, so each response costs more tokens. Second, its extended-thinking mode generates internal reasoning the user never sees but still pays for. Third, agentic runs in Claude Code spawn multiple concurrent model calls — a single task can fan out into four to six subagents, each billing against the same window. Stack those together and a model advertised at \"2x\" can empty a Max-plan window in minutes. After the window is exhausted, the system keeps working by drawing on usage credits, which auto-charge the card on file unless the user has set a hard cap. That is the mechanic behind the \"$100 in one session\" reports.",
      "A 40-person Dallas software shop we advised this week shows how this bites. A developer pointed Fable 5 at a backlog of refactoring tickets in Claude Code, enabled maximum thinking, and let it run across the lunch hour. By the time anyone checked, the team's shared five-hour window was gone, two other engineers were blocked from the model, and the account had spent into usage credits. The model did excellent work — it just did it at a cost nobody had scoped, on a plan nobody had configured a ceiling on.",
      "**How To Decide Whether Fable 5 Belongs In Your Stack**",
      "Fable 5 is the right tool for some jobs and an expensive mistake for others. ITECS uses a four-step routing decision so businesses capture the capability without the runaway cost.",
      "**Step 1: Match the model to the task, not the hype.** Reserve Fable 5 for genuinely hard work — complex refactors, multi-document analysis, long-horizon agent runs. Route routine drafting, summaries, and chat to Opus 4.8 or a cheaper model. At $10 per million input tokens and $50 per million output tokens, Fable 5 costs about twice Opus 4.8, so paying for it on simple work is pure waste.",
      "**Step 2: Set hard spending caps before anyone runs an agent.** Configure usage-credit ceilings on every subscription and API key so an overnight agent run cannot charge the card without limit. This single control prevents the most common launch-week complaint.",
      "**Step 3: Govern agentic sessions like production jobs.** Long Claude Code runs with extended thinking are where budgets vanish. Scope them, run them on dedicated accounts rather than shared team windows, and require sign-off before a fan-out agent task goes unattended. This is the same discipline we cover in [moving agentic AI workflows from pilot to production](/insights/agentic-ai-workflows-enterprise-operations).",
      "**Step 4: Plan around the June 22 cliff.** Until June 22, 2026, Fable 5 is free inside the subscription plans. After that, it bills against usage credits. Model your real post-promo cost now, decide which workloads justify it, and configure approvals before the price changes — not after the first surprise invoice.",
      "**Safety, Security, And What The Safeguards Mean For You**",
      "Anthropic could release a Mythos-class model publicly only because Fable 5 ships with new classifier-based safeguards in three areas: cybersecurity, biology and chemistry, and model distillation. When a prompt trips one of these classifiers — for example, a request that looks like offensive cyber work or weaponizable biology — Fable 5 blocks the response and falls back to Claude Opus 4.8. Anthropic reports the safeguards trigger in fewer than five percent of sessions, so most business users will never notice them. Teams doing legitimate security research or scientific work should know the fallback exists, because it can quietly change which model answered.",
      "For any business, the deeper security question is not the model's guardrails but your own. A more capable model with broad tool and data access raises the stakes of a misconfiguration. The controls that matter are the ones you operate: scoped credentials per workflow, sandboxed agent runtimes, audit logs of every action, and human approval gates on anything that moves money or touches customer data. ITECS deploys AI against the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), the U.S. standard most enterprise auditors now use as the backbone for AI accountability. Anthropic's own [usage policies and model documentation](https://www.anthropic.com/legal/aup) describe the safeguard boundaries in detail. For businesses whose data is not yet ready to support this, a [data and AI readiness audit](/data-audit) comes before any high-capability model goes live, and [team AI training](/training) follows so people actually use the approval gates as designed.",
      "**Pricing And The ROI Of Using Fable 5 Deliberately**",
      "Fable 5's API pricing is $10 per million input tokens and $50 per million output tokens — about double Claude Opus 4.8, and Anthropic positions it as the premium tier. On subscriptions, it is bundled into Pro, Max, Team, and Enterprise through June 22, 2026, then shifts to usage-credit billing. The cost lever most businesses miss is not the per-token rate; it is routing. Sending every prompt to the most expensive model, with extended thinking always on, is where bills balloon.",
      "ITECS prices its advisory and setup work transparently — hourly consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment, and no expiration, plus a flat fee for scoped builds such as a [custom AI agent that routes work across models](/custom-ai-agents). The ROI of doing this deliberately is concrete: the right model on the right task, hard spending caps, and governed agent sessions typically cut a team's AI spend while increasing the work it produces. The Dallas software shop above kept Fable 5 for its hardest tickets, moved routine work to a cheaper model, capped its credits, and turned a runaway cost into a predictable line item. When you are ready to put Anthropic's newest model to work without the bill surprises, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "What is Claude Fable 5 and when was it released?",
        answer:
          "Claude Fable 5 is Anthropic's most powerful publicly available model, released June 9, 2026. It is the first \"Mythos-class\" model the public can use, available through the Claude API and on Amazon Bedrock, Google Vertex AI, and Microsoft Foundry, plus the Pro, Max, Team, and Enterprise subscription plans.",
      },
      {
        question: "How does Claude Fable 5 perform on benchmarks?",
        answer:
          "Fable 5 scores 95.0 percent on SWE-bench Verified versus 88.6 percent for Claude Opus 4.8, and 80.3 percent on SWE-Bench Pro — about eleven points ahead of the next-best frontier model. On Cognition's FrontierCode Diamond split it reaches 29.3 percent, more than double Opus 4.8. Anthropic calls it state-of-the-art on nearly all tested benchmarks.",
      },
      {
        question: "Why does Claude Fable 5 hit usage limits so fast?",
        answer:
          "Claude Code warns that Fable 5 uses your limits about twice as fast as Opus. For agentic work the burn is often steeper because the model produces longer outputs, spends tokens on hidden extended-thinking reasoning, and spawns multiple concurrent subagents. Usage is metered against a rolling five-hour window plus a weekly cap, and exhausting the window draws on auto-charging usage credits.",
      },
      {
        question: "How much does Claude Fable 5 cost?",
        answer:
          "Fable 5's API pricing is $10 per million input tokens and $50 per million output tokens — about twice Claude Opus 4.8. It is included free in the Pro, Max, Team, and Enterprise subscription plans through June 22, 2026, after which usage bills against pay-as-you-go usage credits.",
      },
      {
        question: "Should my business switch everything to Claude Fable 5?",
        answer:
          "No. Fable 5 is worth its premium for complex coding, long agent runs, and multi-document analysis, but routing routine drafting, summaries, and chat to Fable 5 wastes money. The cost-effective approach matches the model to the task, sets hard spending caps, and governs agentic sessions — which is exactly what an ITECS AI consulting engagement sets up.",
      },
      {
        question: "What is the difference between Claude Fable 5 and Claude Mythos 5?",
        answer:
          "Fable 5 and Mythos 5 share the same underlying model. Fable 5 is the public version with cybersecurity, biology, and distillation safeguards that fall back to Opus 4.8 when triggered. Mythos 5 removes certain cybersecurity and biology safeguards and is restricted to Anthropic-approved partners, including Project Glasswing cybersecurity allies and select biology researchers.",
      },
    ],
  },
  {
    slug: "openclaw-security-crisis",
    title:
      "The OpenClaw Security Crisis: What Every Business Should Learn Before Deploying an AI Agent",
    description:
      "Four chainable CVEs, 245,000 exposed instances, 1,184 malicious marketplace skills — what the OpenClaw crisis teaches every business deploying AI agents in 2026.",
    href: "/insights/openclaw-security-crisis",
    publishedDate: "2026-05-28",
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "openclaw security crisis",
      "openclaw vulnerabilities",
      "claw chain cve",
      "clawhavoc supply chain attack",
      "ai agent security 2026",
      "agentic ai risk",
      "openclaw cve-2026-44112",
      "openclaw cve-2026-25253",
      "ai agent sandbox escape",
      "ai agent governance dallas",
    ],
    h1: "The OpenClaw Security Crisis: What 245,000 Exposed AI Agents Reveal About Agentic AI Risk",
    content: [
      "OpenClaw is the open-source AI agent platform that ran away with 2026 — a viral GitHub repository that crossed 180,000 stars in January and is now at the center of the year's first major agentic-AI security crisis. Between January 27 and May 15, researchers disclosed five CVEs, identified more than 1,100 malicious marketplace skills, and counted roughly 245,000 OpenClaw instances exposed to the public internet across Shodan and ZoomEye. The lesson for every business deploying AI agents is not that OpenClaw is uniquely broken — it is that the entire category needs governance the open-source community has not yet built.",
      "**For Dallas businesses evaluating AI agents, the safer path is a [governed custom AI agent deployment](/custom-ai-agents) — sandboxed per workflow, identity-bound, audited, and run on the same operational discipline ITECS has applied to managed IT since 2002.** This article walks through what happened, why traditional defenses missed it, and the operating model that prevents your business from becoming the next case study.",
      "**The Timeline: From Viral Repository To Security Crisis In Four Months**",
      "OpenClaw's trajectory is what made the crisis newsworthy. The project went viral the first week of January 2026 and, within three weeks, exposed instances on the public internet jumped from roughly 1,000 to over 21,000. By February 8, Bitsight counted more than 30,000 distinct exposed deployments. By mid-February, roughly 42,000 instances were found exposed — 93 percent of them with no authentication at all.",
      "January 27 brought the first malicious skill upload to ClawHub, OpenClaw's official plugin marketplace. February 1, Koi Security named the coordinated campaign \"ClawHavoc.\" February 3, security researchers published CVE-2026-25253 — a one-click remote code execution flaw rated CVSS 8.8 that could compromise any OpenClaw user who clicked a malicious link. February 5, Antiy CERT's post-incident sweep identified at least 1,184 weaponized skills across the marketplace. ClawHub did not introduce verified screening of skill publishers until March 26 — eight weeks after the first malicious upload.",
      "April 23 brought patches for the next disclosure wave. May 15, Cyera Research published \"Claw Chain\" — four chainable vulnerabilities that, taken together, let an attacker move from a malicious skill installation to a persistent backdoor on the host. Today, the underlying architectural pattern is unchanged across the broader open-source agent ecosystem.",
      "**The Claw Chain: Four Vulnerabilities That Compose A Full Takeover**",
      "Cyera's disclosure is the part most leaders should read carefully, because it shows how agentic-AI compromise differs from the vulnerabilities IT teams already know how to handle.",
      "**CVE-2026-44113 (CVSS 7.7) — Filesystem read escape.** A time-of-check / time-of-use race condition in OpenClaw's OpenShell sandbox lets an attacker swap a validated file path with a symbolic link pointing outside the approved sandbox root. The agent reads files the operator believed were isolated.",
      "**CVE-2026-44115 (CVSS 8.8) — Credential disclosure.** A gap between command validation and shell execution lets environment variables expand inside unquoted heredocs at runtime. API keys, tokens, and connected-service credentials leak through what looked like a sanitized command.",
      "**CVE-2026-44118 (CVSS 7.8) — Privilege escalation.** The agent's Model Context Protocol loopback trusts a client-controlled `senderIsOwner` flag without validating the session. A local attacker promotes themselves to owner of the agent without a credential.",
      "**CVE-2026-44112 (CVSS 9.6) — Filesystem write escape.** The same TOCTOU race applied to write operations. Attackers redirect writes outside the sandbox boundary and place a backdoor anywhere on the host filesystem.",
      "Chained together, the four flaws produce a kill chain that begins with a malicious marketplace skill, reads sensitive files, steals credentials, escalates to owner, and plants a persistent backdoor. The deeper problem is that every step looks like ordinary agent behavior — read a file, run a shell command, write to disk. Traditional endpoint monitoring cannot distinguish it from legitimate work. All four vulnerabilities were patched in OpenClaw 2026.4.22.",
      "**ClawHavoc: The Supply Chain Attack That Made The Crisis Worse**",
      "While the protocol-level flaws are what made OpenClaw a CVE story, ClawHavoc is what made it a business-risk story. Koi Security's February audit of all 2,857 skills in the ClawHub marketplace found 341 malicious entries — roughly 12 percent of the entire catalog at that moment. Antiy CERT, working with a larger post-discovery sample, identified at least 1,184 malicious packages tied to 12 publisher accounts. By the time the marketplace expanded past 10,000 skills, the running malicious-skill count was over 800.",
      "The payloads were the same families business security teams already track. macOS hosts received Atomic macOS Stealer, the malware-as-a-service tool that harvests keychain passwords, browser data, cryptocurrency wallets, SSH keys, and user-directory files. Windows hosts received VMProtect-packed infostealers and keyloggers, often delivered via password-protected ZIPs to bypass scanners. Several skills opened reverse shells for interactive attacker access.",
      "Most of the malicious skills passed casual inspection. They had professional documentation. Some genuinely worked as advertised — a Solana wallet tracker really tracked Solana wallets — but their manifest content quietly instructed the agent to fetch and run external code. The root cause was structural: ClawHub allowed anyone with a GitHub account at least one week old to publish a skill until March 26. There was no signing, no review, no maintainer attestation. That is the same trust posture early npm and PyPI had — and the same lesson is being relearned now for AI agent capability registries.",
      "**Why Patches Alone Will Not Solve This**",
      "Every disclosed OpenClaw vulnerability is patched. The maintainers responded quickly, the version bumps are public, and the marketplace introduced screening in March. None of that fixes the category-level risk, and that is the point business leaders most need to absorb.",
      "Most AI agent platforms — open-source or commercial — share three architectural choices that the OpenClaw crisis exposed. First, they run with the human operator's full credentials across every connected system, which means a compromised agent inherits the operator's entire blast radius. Second, they trust plugin or skill marketplaces with no security review, because shipping fast matters more than shipping signed. Third, they ship default configurations that expose the agent to the local network or the public internet without authentication, on the assumption that a developer who installs it will harden it later. Many never do.",
      "Traditional endpoint and network monitoring also assume a human at the keyboard. When the agent reads a file, runs a shell command, and writes another file, the security stack sees three legitimate-looking actions. The Claw Chain attack succeeds precisely because each step is normal — only the sequence is malicious. Detecting that requires behavior-pattern monitoring built around how the agent is supposed to operate. Most businesses do not have it.",
      "**What This Means For Every Business Deploying AI Agents**",
      "A 95-person Dallas third-party logistics company we recently advised illustrates the practical risk. The operations director had installed a self-hosted AI agent to scrape carrier portals, post status updates to the customer CRM, and prepare a daily exceptions report. The agent ran on a shared workstation, used the operator's stored credentials for the carrier portals, and pulled a community plugin from a public registry to handle PDF rate confirmations. None of that was on the IT roadmap. None of it had been audited. None of it had been logged.",
      "The fix was not to ban the agent. It was to rebuild the same workflow on a governed footprint — a scoped service account per integration, a sandboxed agent runtime, an allowlist of approved skills, an audit log of every action the agent took, and an owner approval gate on anything that would touch a customer record or a carrier invoice. The agent kept its job. The business kept its blast radius small. The pattern is the same one we cover in our guide to [moving agentic AI workflows from pilot to production](/insights/agentic-ai-workflows-enterprise-operations) and our analysis of [why MCP requires managed governance](/insights/mcp-is-the-new-api).",
      "**The Governance Pattern That Keeps Agents Safe**",
      "Kaspersky's public assessment of OpenClaw is blunt — for enterprise use, it remains \"at best unsafe, and at worst utterly reckless\" until the architectural problems are fixed. That posture is correct, and it generalizes. Any AI agent platform a business deploys needs to clear the same six controls before it touches production data.",
      "First, identity-bound credentials per workflow, never the operator's personal logins. Second, sandboxed runtime — file access, network access, and tool access scoped per agent purpose. Third, an allowlisted skill or plugin set with signed publishers and a documented review process. Fourth, an immutable audit log capturing every read, every write, every credential use, and every tool call. Fifth, an approval gate for any action that moves money, files with a regulator, or posts to a customer-facing channel. Sixth, a quarterly governance review of what the agent did and what it touched.",
      "ITECS deploys every AI agent against the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — the standard most enterprise auditors and U.S. federal agencies now use as the policy backbone for AI accountability. The controls above map directly to its Govern, Map, Measure, and Manage functions. For businesses whose data is not yet ready to support this discipline, a [data and AI readiness audit](/data-audit) comes before any agent goes live, and team-level [AI training](/training) follows so that human reviewers actually use the approval gates the way they were designed.",
      "**Pricing And The ROI Of Doing This Right**",
      "ITECS prices AI security and consulting transparently — hourly engineering and consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment, and no expiration. Scoped builds, including a governed [custom AI agent deployment](/custom-ai-agents), carry a flat fee. The entry point for most leadership teams is a fixed-fee [AI consulting and readiness engagement](/consulting) that audits current AI usage, prioritizes use cases by payback, and produces a board-ready security and governance roadmap.",
      "The ROI of governance is asymmetric. A single avoided incident — one Atomic Stealer infection on a controller's workstation, one credential leak from a shared agent, one customer-data exposure from an unsanctioned plugin — pays for years of disciplined deployment. The 95-person logistics company above kept the productivity gains of its AI agent program and reduced its incident exposure to something the leadership team could actually defend. That is what a managed approach delivers. When you are ready to plan an agent deployment your auditor, your insurer, and your board can sign off on, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "What is OpenClaw and why is it in the security news?",
        answer:
          "OpenClaw is an open-source AI agent platform that went viral in January 2026, crossing 180,000 GitHub stars within weeks. Between January 27 and May 15, researchers disclosed five CVEs, identified more than 1,100 malicious marketplace skills, and counted roughly 245,000 OpenClaw instances exposed to the public internet across Shodan and ZoomEye.",
      },
      {
        question: "What is the Claw Chain disclosure?",
        answer:
          "Claw Chain is the name Cyera Research gave to four chainable OpenClaw vulnerabilities disclosed on May 15, 2026 — CVE-2026-44112 (CVSS 9.6 filesystem write escape), CVE-2026-44113 (CVSS 7.7 filesystem read escape), CVE-2026-44115 (CVSS 8.8 credential disclosure), and CVE-2026-44118 (CVSS 7.8 privilege escalation). Chained together, they let an attacker move from a malicious skill to a persistent backdoor on the host.",
      },
      {
        question: "What was ClawHavoc?",
        answer:
          "ClawHavoc is the coordinated supply-chain attack on ClawHub, OpenClaw's official skill marketplace. Koi Security identified 341 malicious skills in February 2026 — about 12 percent of the catalog — and Antiy CERT later raised the count to at least 1,184 packages across 12 publisher accounts, delivering Atomic macOS Stealer, Windows infostealers, and reverse shells.",
      },
      {
        question: "Are all the OpenClaw vulnerabilities patched?",
        answer:
          "Yes. CVE-2026-25253 was patched in OpenClaw 2026.1.29 and the four Claw Chain flaws were patched in OpenClaw 2026.4.22. The remaining business risk is architectural — most AI agent platforms still run with the operator's full credentials, trust unsigned marketplace plugins, and lack the behavioral monitoring needed to detect chained agent abuse.",
      },
      {
        question: "What does this mean for my business if we are not using OpenClaw?",
        answer:
          "The OpenClaw crisis is a category lesson, not a single-product warning. Any AI agent deployment — open-source or commercial — needs identity-bound credentials per workflow, a sandboxed runtime, an allowlisted skill set, an immutable audit log, owner approval gates for sensitive actions, and a quarterly governance review. Without those controls, a compromised agent inherits the operator's full blast radius.",
      },
      {
        question: "How does ITECS deploy AI agents safely for Dallas businesses?",
        answer:
          "ITECS deploys every AI agent against the NIST AI Risk Management Framework with scoped service accounts per integration, a sandboxed runtime, an allowlist of approved skills, immutable audit logs, owner approval gates, and a quarterly governance review. The same operational discipline ITECS has applied to managed IT since 2002, applied now to agentic AI.",
      },
      {
        question: "Should we wait to deploy AI agents until the open-source ecosystem matures?",
        answer:
          "No. The competitive value of AI agents is real and growing. The right response is not to delay but to deploy on a governed footprint — choose a vetted platform, scope it tightly, log every action, and require human approval on anything that moves money or touches customer data. That is the pattern that lets businesses capture the productivity gains without inheriting the OpenClaw-class risk.",
      },
    ],
  },
  {
    slug: "claude-cowork-for-small-business",
    title:
      "How to Set Up Claude Cowork for Your Business: 10 Workflows That Replace Manual Operations Work",
    description:
      "Claude for Small Business launched May 13, 2026. Enable it, connect your core apps, and replace ten manual operations tasks — safely and with owner sign-off.",
    href: "/insights/claude-cowork-for-small-business",
    publishedDate: "2026-05-26",
    hubSlug: "automation",
    hubLabel: "AI Workflow Automation",
    hubHref: "/automation",
    keywords: [
      "claude cowork for small business",
      "claude for small business setup",
      "claude cowork workflows",
      "set up claude cowork",
      "claude cowork project sandbox",
      "claude.md memory file small business",
      "claude dispatch schedule daily briefing",
      "small business ai automation 2026",
    ],
    h1: "How to Set Up Claude Cowork for Your Small Business in One Afternoon",
    content: [
      "Claude Cowork is Anthropic's collaborative workspace where Claude holds long projects, remembers context across sessions, and runs scheduled tasks. On May 13, 2026, Anthropic added a Small Business toggle inside Cowork with fifteen pre-built workflows for QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365 — the same back-office stack most ten- to fifty-person companies already pay for. Setup takes one afternoon. The savings start the same week.",
      "**The fastest way to capture that value safely is to pair the Cowork rollout with a structured automation engagement.** ITECS configures [AI workflow automation for Dallas teams](/automation) — sandboxes, memory files, scheduled briefings, and approval gates wired together so the agent works for the owner instead of around them.",
      "**Why Many Operators Stop At The Chat Window**",
      "Anthropic's 2026 Work Trend Index reports that only sixteen percent of business users have moved beyond chatting with Claude to actually orchestrating agents. Most owners type a question, copy the answer into an email, and stop. The recurring, multi-step admin work — invoice chasing, weekly reports, Monday meeting prep — still happens by hand in QuickBooks, Outlook, HubSpot, and a stack of browser tabs. The result is that the highest-paid person in the building spends the first hour of every day on data scraping.",
      "A twenty-eight person Dallas commercial cleaning company we recently helped illustrates the pattern. The owner spent forty minutes every morning pulling the prior day's revenue from QuickBooks, the cash position from PayPal, the new HubSpot deals, and three Outlook calendar checks to build a daily briefing for himself. Forty minutes by five days is more than three hours a week, every week, for the most expensive headcount in the company. That work belongs in Cowork — not in the owner's head. For operators earlier in their AI adoption, [our AI adoption guide](/insights/how-to-use-ai-small-business) is a useful prerequisite.",
      "**What Changed On May 13, 2026**",
      "Anthropic shipped Claude for Small Business as a toggle inside Cowork rather than a separate product. Switching it on exposes fifteen pre-built workflows tuned for ten- to fifty-person companies and adds curated connectors for QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365. The toggle also tightens the default safety posture — Project Sandboxes are isolated by default, file access is scoped per Project, and Dispatch scheduled tasks now route through an approval gate before they pay an invoice or post anything customer-facing.",
      "For an owner, this changes the question. The old question was \"what can I ask Claude to do for me?\" The new question is \"which of these fifteen pre-built workflows should I turn on first, and what do I need to wire up around them?\" The remainder of this guide answers that question.",
      "**How To Set Up Claude Cowork In One Afternoon**",
      "ITECS uses a six-step setup that takes an experienced operator about three hours for a typical growth-stage team. Each step has an owner and a clear stopping point so the work can pause without losing context.",
      "**Step 1: Enable Small Business mode inside Cowork.** Sign in to claude.ai as the workspace owner. Open Cowork settings, scroll to Business modes, and toggle Small Business on. The setting is per-workspace, not per-user, so the whole team inherits the same defaults the moment it flips.",
      "**Step 2: Connect the seven core apps.** Open the Integrations tab and authenticate QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365 one at a time through each vendor's OAuth flow. Connect with the account that already owns billing and admin for that tool — not a personal login. Claude inherits the permissions of the connecting user, so granting read-only or scoped roles where the app supports it is the cleanest way to limit blast radius.",
      "**Step 3: Create one Project Sandbox per business function.** Inside Cowork, create separate Projects for Finance, Sales, Marketing, and Operations. Each Project is its own sandbox — Claude can only read files, memory, and integrations attached to that Project. Do not grant Claude full disk access. The whole point of the sandbox is that a Finance prompt cannot accidentally read a Marketing draft or post to a customer-facing channel.",
      "**Step 4: Write CLAUDE.md and CONTEXT.md memory files.** In each Project, add two short markdown files. CLAUDE.md tells the agent how you work — tone of voice, approval rules, escalation contacts, the names of top customers and vendors. CONTEXT.md tells the agent what it should know — your fiscal year, billing cycles, payment terms, the QuickBooks accounts you actually use, the HubSpot pipeline stages, and the Microsoft 365 distribution lists for daily and weekly briefings. Two pages each is plenty. The files persist across sessions and replace the prompt copying most owners still do today.",
      "**Step 5: Schedule Dispatch tasks with /schedule.** Inside a Project, type `/schedule` followed by what you want and when. Three schedules cover most owners' needs: a daily morning briefing at 6:30 a.m., a weekly performance report on Friday at 4 p.m., and a Monday meeting prep deck on Sunday at 7 p.m. Dispatch handles the cron, the integration pulls, the rendering, and the email or Slack delivery without anyone signing in.",
      "**Step 6: Wire approval gates for money and customer touches.** In the Project's Guardrails panel, set the approval rule to \"Owner sign-off required\" for any action that moves money, files with a regulator, or posts to a customer-facing channel. Approval gates pause the workflow, send a notification, and resume only when the owner taps Approve. Nothing pays a vendor, sends a contract, or publishes a Canva post without an explicit yes.",
      "**The Ten Workflows That Replace Manual Operations Work**",
      "The fifteen pre-built workflows in Small Business mode cover finance, sales, marketing, contracts, and ops. The ten below produce the cleanest payback for a typical Dallas operator in the first ninety days.",
      "**1. Daily morning briefing.** Pulls yesterday's QuickBooks revenue, PayPal balance, new HubSpot deals, and today's Microsoft 365 or Google Workspace calendar into a two-paragraph summary emailed at 6:30 a.m. Replaces the forty-minute manual scrape most owners still do.",
      "**2. Weekly performance report.** Friday-afternoon roll-up of QuickBooks revenue, accounts receivable aging, HubSpot pipeline movement, and Canva-produced campaign metrics, delivered as a one-page PDF to the leadership group.",
      "**3. Monday meeting prep deck.** Sunday-evening Canva deck draft assembled from HubSpot pipeline updates, last week's revenue, and the open items pulled from Microsoft 365 task lists. The owner reviews and approves before Monday at 7 a.m.",
      "**4. Overdue invoice chase.** Reads QuickBooks accounts receivable, drafts polite reminder emails through Google Workspace or Microsoft 365, and queues a Docusign re-send for anything older than forty-five days. Every send requires owner approval.",
      "**5. New lead enrichment.** When a new HubSpot lead arrives, Claude reads the website form, pulls public company data, drafts a personalized first-touch email, and stages it for sales to approve and send.",
      "**6. Quote-to-contract pipeline.** Generates a Docusign contract from an approved HubSpot deal, populates pricing and signers, and routes the document for owner countersignature before it goes to the customer.",
      "**7. Expense and receipt triage.** Reads QuickBooks-connected card transactions and Gmail or Outlook receipts, categorizes each one against your existing chart of accounts, and posts to QuickBooks only after the owner taps Approve on the day's batch.",
      "**8. Vendor invoice intake.** Picks up incoming PDF invoices from Gmail or Outlook, matches them to PayPal or QuickBooks vendor records, and queues payment runs for owner approval. No invoice is paid without sign-off.",
      "**9. Social and newsletter draft pack.** Pulls the week's wins from HubSpot and QuickBooks, drafts three LinkedIn posts and a newsletter, and produces Canva visuals as drafts. The owner reviews everything before anything is posted.",
      "**10. Customer review and reply triage.** Watches new Google and Microsoft 365 mailbox reviews, classifies sentiment, drafts a reply for each, and routes negative reviews to the owner first. Replies are sent only after explicit approval.",
      "Workflows three through eight are exactly the territory where [agentic AI moves from pilot to production](/insights/agentic-ai-workflows-enterprise-operations) — multi-step, policy-bound, and worth real money once the approval gates are right.",
      "**The Security Rules That Keep Cowork Out Of Trouble**",
      "Claude Cowork is powerful precisely because it can read finance data, draft customer-facing copy, and trigger payments. The same capability is what makes a careless setup expensive. Three rules keep the deployment safe.",
      "**Sandbox by Project, not by user.** Each Project carries its own file scope, its own memory, and its own integration connections. Do not enable full disk access on Cowork's desktop client for an owner account. A bookkeeper's invoice agent should never be able to read the same workspace as the marketing team's social drafts.",
      "**Owner sign-off for money and customer-facing posts.** Configure Guardrails so any action that pays a vendor, files with a regulator, sends a contract, or posts publicly pauses for approval. Approval friction is the feature, not the bug — it is the difference between an agent that helps and an agent that publishes a bad invoice run on a Saturday.",
      "**Govern Claude like an employee.** ITECS deploys Cowork against the controls in the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — defined purpose per Project, identity-bound credentials, an immutable audit log of every action, a documented human approval path, and a quarterly review of what the agent did and what it touched. The same discipline ITECS has applied to managed IT for twenty-four years, applied now to an AI workspace. For owners who want to harden the data layer before automating, a [data and AI readiness audit](/data-audit) comes first.",
      "**Pricing And The ROI Of Cowork For A Growing Team**",
      "Claude for Small Business is part of Claude Cowork's standard subscription tier — pricing sits on Anthropic's plans page and tracks per user. There is no separate license fee for the Small Business toggle. ITECS prices the setup and operating layer transparently: hourly consulting or prepaid retainer hours for configuration and tuning, no minimum monthly commitment, no expiration, and a flat fee for scoped builds such as a [custom AI agent extending one of the ten workflows](/custom-ai-agents).",
      "Many growing teams recover the setup cost inside the first month. The Dallas cleaning company above reclaimed roughly three hours a week from the owner — at a fully loaded owner's hourly cost, that paid back the configuration retainer in under three weeks and now compounds across every additional workflow turned on. Owners who pair Cowork with [AI training for the rest of the team](/training) get the second multiplier — the work the owner used to do alone now runs as a managed system the whole company can lean on. When you are ready to walk through the setup with someone who has done it before, [talk to the ITECS team](/contact).",
    ],
    faq: [
      {
        question: "What is Claude Cowork Small Business mode?",
        answer:
          "Small Business mode is a toggle inside Claude Cowork that Anthropic launched on May 13, 2026. Switching it on exposes fifteen pre-built workflows tuned for ten- to fifty-person companies and curated connectors for QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365.",
      },
      {
        question: "Which apps does Claude for Small Business connect to?",
        answer:
          "The seven core integrations are QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365. Connect each one with the account that already owns billing and admin for that tool, and prefer scoped or read-only roles where the integration supports them.",
      },
      {
        question: "Why use Project Sandboxes instead of giving Claude full disk access?",
        answer:
          "Project Sandboxes scope Claude's file access, memory, and integrations to a single business function — Finance, Sales, Marketing, or Operations. Full disk access removes that boundary and lets a prompt in one area accidentally read or write data in another, which is the most common cause of expensive mistakes during early rollouts.",
      },
      {
        question: "What do CLAUDE.md and CONTEXT.md files do?",
        answer:
          "CLAUDE.md tells the agent how you work — tone of voice, approval rules, escalation contacts, top customers and vendors. CONTEXT.md tells the agent what it should know — fiscal year, billing cycles, payment terms, QuickBooks accounts, HubSpot pipeline stages, and distribution lists. Both files persist across sessions, so the agent stops asking the same questions every time.",
      },
      {
        question: "How do /schedule and approval gates work together?",
        answer:
          "Dispatch tasks created with /schedule run on a cron — daily briefings, weekly reports, Monday decks — and pull data through the connected integrations automatically. Approval gates pause any scheduled task that would move money, send a contract, or post to a customer-facing channel until the owner taps Approve, so nothing pays or posts without an explicit yes.",
      },
      {
        question: "How much time can Claude Cowork actually save a growing team?",
        answer:
          "Many Dallas operators recover three to six hours of owner time per week from the daily briefing, weekly report, and invoice chase workflows alone. At a fully loaded owner's hourly cost, the configuration retainer typically pays back inside the first month and then compounds with every additional workflow turned on.",
      },
      {
        question: "Is Claude Cowork safe for finance and customer data?",
        answer:
          "Yes, when it is set up against a recognized control framework. ITECS deploys Cowork against the NIST AI Risk Management Framework — defined purpose per Project, identity-bound credentials, immutable audit logs, a documented human approval path, and a quarterly governance review of what the agent did and what it touched.",
      },
    ],
  },
  {
    slug: "ceo-guide-ai-roi",
    title: "The CEO's Guide to AI ROI: Measure and Scale AI Impact in 2026",
    description:
      "How CEOs and CFOs measure AI ROI and scale what works in 2026 — a framework for moving from AI experiments to measurable efficiency, with metrics, governance, and payback math.",
    href: "/insights/ceo-guide-ai-roi",
    publishedDate: "2026-05-22",
    hubSlug: "consulting",
    hubLabel: "AI Consulting",
    hubHref: "/consulting",
    keywords: [
      "ceo guide to ai roi",
      "how to measure ai roi",
      "ai roi 2026",
      "scaling ai in enterprise",
      "ai roi metrics for executives",
      "ai efficiency vs ai hype",
      "cfo ai investment framework",
    ],
    h1: "The CEO's Guide to AI ROI: How to Measure and Scale AI Impact",
    content: [
      "AI ROI is the return your business earns from artificial intelligence after subtracting what it costs to build, run, and govern. In 2026, the experimental phase is over — boards and CFOs now fund AI the way they fund any capital project: against measurable payback. The CEOs winning this shift track three things relentlessly — hours recovered, revenue influenced, and risk reduced — then scale only what clears the bar.",
      "**The fastest way to turn AI spend into defensible ROI is to start with a strategy partner who measures before they build.** ITECS runs an [AI consulting and readiness process](/consulting) that baselines your current costs, ranks use cases by payback, and instruments every deployment so savings show up in numbers a CFO will accept — not anecdotes.",
      "**Why AI ROI Is Suddenly The Only Question That Matters**",
      "Two years ago, leadership funded AI to avoid falling behind. That budget line is now under review. Boards have seen the invoices for licenses, pilots, and consultants — and they want the return. The 2026 conversation has moved from \"are we doing AI?\" to \"what did AI actually save us, and can we prove it?\"",
      "The pressure is sharpest for the CFO. Most AI spend was approved as innovation, not operations, so it never got a payback model. Now finance has to defend it. CEOs who cannot produce an ROI number look like they bought hype. CEOs who can produce one earn the budget to scale. The difference is rarely the technology. It is whether anyone measured.",
      "**What AI ROI Actually Means For Your Business**",
      "AI ROI has three components, and most leadership teams track only the first. Hard savings are the easiest to defend — hours eliminated, headcount avoided, error rates cut, cycle times shortened. These convert directly to dollars and belong in every business case.",
      "Soft savings are real but need framing — faster decisions, higher employee capacity, quicker customer response, less burnout. Translate them into a metric your business already tracks: a faster quote cycle becomes win rate, faster support becomes retention. Risk reduction is the third and most overlooked component — fewer compliance violations, less shadow AI exposure, fewer manual errors in regulated work. A single avoided HIPAA or SOX incident can outweigh a year of efficiency gains.",
      "The common mistake is measuring AI by adoption — seats licensed, prompts run, tools deployed. Adoption is an input, not a return. A 120-person firm with 100 Copilot licenses and no measured workflow change has spent money, not earned it.",
      "**A Four-Stage Framework To Measure AI ROI**",
      "ITECS uses a four-stage measurement framework that produces numbers a board will accept. Each stage has an owner and an artifact.",
      "**Stage 1: Baseline before you build.** Measure the current cost of the workflow you intend to improve — hours per week, error rate, cycle time, fully loaded labor cost. Without a baseline, you can never prove savings. This is the step most teams skip, and it is why most AI ROI claims collapse under CFO scrutiny.",
      "**Stage 2: Instrument the deployment.** Build measurement into the rollout, not after it. Track time-to-complete, exception rate, human-override rate, and volume handled. Compare against the Stage 1 baseline every week. A deployment you cannot measure is a deployment you cannot defend.",
      "**Stage 3: Convert to financial language.** Translate operational metrics into the three ROI components — hard savings, soft savings, risk reduction. Express payback period, not just annual savings, because boards fund against payback. Most well-scoped workflows should clear payback inside 12 to 18 months.",
      "**Stage 4: Review and reallocate quarterly.** Treat AI like a portfolio. Every quarter, rank live deployments by realized ROI. Scale the winners, fix the marginal ones, and retire the losers without sentiment. The CEOs who scale AI successfully are disciplined about cutting what does not pay.",
      "**Where AI ROI Hides — And Where It Leaks**",
      "Return rarely shows up where the demo was most impressive. It shows up in the boring, high-volume workflows that quietly consume payroll.",
      "A 90-person Dallas professional services firm assumed its AI win would be marketing content. The real return came from automating timesheet reconciliation and invoice preparation, which recovered roughly 600 billable hours a year that staff had spent on admin. At their billing rate, that one workflow paid for the entire AI program.",
      "ROI also leaks in predictable places. Unused licenses are the most common drain — seats bought in bulk and never adopted. Shadow AI is the second — employees pasting sensitive data into consumer tools, creating risk that erases efficiency gains. \"Pilot purgatory\" is the third — impressive demos that never reach production because no one owns the operational layer, a pattern we cover in our guide to [moving agentic AI workflows from pilot to production](/insights/agentic-ai-workflows-enterprise-operations).",
      "**How To Scale What Works**",
      "Scaling AI is not buying more licenses. It is taking a workflow that proved its ROI and extending the same discipline across more of the business. Scale by workflow, not by tool. A proven invoice-triage agent extends to expense reports, then to procurement approvals, on the same governance backbone.",
      "Three conditions separate companies that scale from companies that stall. First, a measurement habit — they baseline and instrument by default. Second, a governance layer — security, logging, and clear ownership that lets them add workflows without adding risk. Third, trained people — reviewers and managers who operate AI confidently, which is why [employee AI training](/training) consistently shows up in the highest-ROI programs. Without all three, scaling multiplies cost faster than return.",
      "**Governance Is What Makes ROI Defensible**",
      "A savings number a board will trust requires governance behind it. Unmeasured, ungoverned AI produces anecdotes. Instrumented, governed AI produces auditable returns. ITECS deploys every AI program against the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — the standard most enterprise auditors and the U.S. government now use as the backbone for AI governance and accountability.",
      "In practice, that means defined ownership for every deployment, logging that captures what the AI did and what it saved, access controls that keep sensitive data out of consumer tools, and a quarterly review tying realized savings back to the original business case. This is the same operational discipline ITECS has applied to managed IT for 24 years — applied now to AI investment. For businesses whose data is not yet ready to support clean measurement, a [data audit](/data-audit) comes before any ROI claim.",
      "**Pricing And The ROI Of Getting Help**",
      "ITECS prices AI strategy and consulting transparently: hourly consulting or prepaid retainer hours with tracked usage, no minimum monthly commitment, and no expiration. Scoped builds — [custom AI agents](/custom-ai-agents), automations, integrations — carry a flat fee. The entry point for most leadership teams is a fixed-fee [AI readiness assessment](/consulting) that baselines current costs, ranks use cases by payback, and produces a board-ready roadmap.",
      "The ROI of the assessment itself is usually the cleanest in the program. It prevents the two most expensive mistakes — funding the wrong use case and skipping the baseline that lets you prove the right one. For most mid-market companies, one corrected investment decision pays for the engagement many times over. When you are ready to measure what AI is actually returning, [talk to the ITECS team](/contact) or start with a readiness assessment.",
    ],
    faq: [
      {
        question: "What is AI ROI and how is it calculated?",
        answer:
          "AI ROI is the financial return from artificial intelligence after subtracting build, run, and governance costs. It is calculated by baselining the current cost of a workflow, measuring the post-deployment improvement, and expressing the result as both annual savings and payback period across hard savings, soft savings, and risk reduction.",
      },
      {
        question: "Why are boards and CFOs demanding AI ROI in 2026?",
        answer:
          "The experimental phase is over and the invoices have arrived. AI was largely funded as innovation without a payback model, so finance is now being asked to defend it. Leaders who can prove a return earn the budget to scale, while those who cannot look like they bought hype.",
      },
      {
        question: "What AI metrics should a CEO actually track?",
        answer:
          "Track outcomes, not adoption. The metrics that matter are hours recovered, revenue influenced, error and cycle-time reduction, and risk reduced — each tied to a pre-deployment baseline. Seats licensed and prompts run are inputs, not returns, and should never stand in for ROI.",
      },
      {
        question: "What is a realistic payback period for an AI investment?",
        answer:
          "Most well-scoped AI workflows clear payback inside 12 to 18 months, and high-volume operational workflows often pay back faster. The key is baselining the workflow before deployment so the savings can be proven rather than estimated.",
      },
      {
        question: "How do you scale AI beyond a successful pilot?",
        answer:
          "Scale by workflow, not by buying more licenses. Take a workflow that proved its ROI and extend the same governance backbone to adjacent processes. Companies that scale successfully share three traits: a measurement habit, a governance layer, and trained people.",
      },
      {
        question: "Why do most AI ROI claims fail under CFO scrutiny?",
        answer:
          "Because no one measured the baseline. Without the pre-deployment cost of a workflow, savings are anecdotes rather than numbers. The fix is to baseline before building, instrument the rollout, and convert operational metrics into financial language a board already uses.",
      },
      {
        question: "How can ITECS help measure and scale AI ROI?",
        answer:
          "ITECS starts with a fixed-fee AI readiness assessment that baselines current costs, ranks use cases by payback, and produces a board-ready roadmap. Engagements run on hourly consulting or prepaid retainer hours with transparent tracking, no minimum monthly usage, and no expiration.",
      },
    ],
  },
  {
    slug: "agentic-ai-workflows-enterprise-operations",
    title: "Agentic AI Workflows: How to Implement Them in Enterprise Operations",
    description:
      "How to take agentic AI workflows from pilot to production in finance, procurement, and HR — a four-stage blueprint with governance, security, and ROI math for Dallas enterprises.",
    href: "/insights/agentic-ai-workflows-enterprise-operations",
    publishedDate: "2026-05-21",
    modifiedDate: "2026-06-27",
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "agentic ai workflows",
      "how to implement agentic ai",
      "enterprise operations ai",
      "agentic ai for business",
      "ai workflow automation enterprise",
      "pilot to production agentic ai",
      "autonomous ai agents finance procurement hr",
    ],
    h1: "How to Implement Agentic AI Workflows in Your Enterprise Operations",
    content: [
      "Agentic AI workflows are autonomous, multi-step systems that finish business work — invoicing exceptions, candidate screens, supplier risk reviews — without a human clicking through every step. Dallas enterprises are moving them from pilot to production this year because they handle the long-tail decisions chatbots cannot answer and the policy-bound exceptions that legacy automation rejects.",
      "**The fastest path from agentic pilot to durable production is to pair the build with a [Managed Intelligence Provider](/managed-intelligence-provider) that owns governance, observability, and rollout discipline.** Most pilots stall because no one owns the operational layer. ITECS has run that layer for traditional IT systems for 24 years and now applies the same discipline to enterprise agentic AI workflows.",
      "**What An Agentic AI Workflow Actually Is**",
      "An agentic workflow is software that plans, decides, and executes a multi-step business task on its own. It pulls data from your CRM, looks up a policy in your knowledge base, drafts a response, posts to an approval channel, waits for human signoff when policy requires it, and updates your system of record. A chatbot answers questions. A traditional automation runs a fixed script. An agentic workflow makes the judgment calls in between.",
      "The architecture has three layers. A planner model breaks a goal into steps. Tools connect to business systems through the [Model Context Protocol](/insights/mcp-is-the-new-api). A governance layer logs every decision and stops the agent when policy thresholds are crossed. Most enterprise builds use Claude, GPT-class models, or Azure OpenAI for the planner. Tools usually reach into HubSpot, Salesforce, NetSuite, Workday, ServiceNow, SAP Concur, DocuSign, Microsoft 365, Slack, Jira, and internal SQL databases.",
      "**The Pilot-To-Production Trap**",
      "Most enterprise agentic AI pilots stall at the same point. A small team builds an impressive demo in three weeks, leadership greenlights production, and everything stops. The integrations need credentials. The audit logs need a destination. The exceptions need a workflow. The risk team needs a control framework. The model needs version pinning. Nobody owns this gap, so the pilot dies in committee.",
      "Consider a 180-person Dallas industrial distributor we advised. The pilot was an accounts-payable agent that read supplier invoices from email, matched them to purchase orders in NetSuite, flagged exceptions for human review, and posted clean invoices. It worked beautifully on 50 historical invoices. In production, it touched real money — and that triggered six new requirements no one had budgeted: SOX-compliant audit logs, dual approval for any payment above $5,000, vendor master hygiene, ACH file generation, a rollback procedure for misposted invoices, and a quarterly review by the controller. Production took 14 weeks instead of three because the team treated agentic AI like a chatbot launch instead of like a financial system deployment.",
      "**A Four-Stage Blueprint For Pilot To Production**",
      "ITECS uses a four-stage rollout that prevents the production trap. Each stage has an owner, a gate, and a deliverable.",
      "**Stage 1: Foundation audit.** Before any agent code is written, audit the workflow you want to automate. Map every input, decision, output, and exception. Identify which systems the agent will read from and write to. Confirm credentials, rate limits, and audit log destinations. List the policies and thresholds the agent must respect. This stage produces a one-page workflow specification and a system access matrix. Most foundation audits take one to two weeks for a single workflow and feed directly into a formal [data audit](/data-audit) when underlying data hygiene is shaky.",
      "**Stage 2: Sandbox pilot.** Build the agent in a sandboxed environment with read-only access to production data and write access only to a staging copy. Run the agent against 30 to 100 historical cases. Measure decision accuracy, exception rate, hallucination rate, and average decision time. Document where the agent gets confused. Tune the planner prompt, the tool descriptions, and the policy guardrails until the metrics clear the threshold leadership set in Stage 1. Pilots usually run three to six weeks.",
      "**Stage 3: Guardrails and governance.** Wire the agent into your existing identity provider, audit log pipeline, secrets manager, and approval channels. Set policy thresholds that route any decision above a defined dollar amount, risk score, or sensitivity classification to a human reviewer. Pin the model version. Define the rollback procedure. Document the human approval path for each exception class. This stage maps directly to the NIST AI Risk Management Framework and produces the control evidence your auditors will ask for.",
      "**Stage 4: Production rollout and continuous tuning.** Launch the agent against a constrained slice of real work — one supplier, one region, one cost center — for two weeks. Compare results against parallel human handling. Expand the slice weekly. Hold a weekly review of agent decisions for the first quarter. After three months, transition to monthly governance reviews and prompt-version updates. Plan for a model upgrade every six months because frontier model capabilities shift faster than traditional software releases.",
      "**Where Agentic AI Pays Off Fastest In Enterprise Operations**",
      "Three operating functions tend to absorb agentic AI workflows first because they carry the highest ratio of repeatable judgment calls to original creative work.",
      "**Finance and accounting.** Invoice processing, expense report review, journal entry preparation, dispute reconciliation, vendor risk monitoring, and month-end close support. A $35M Dallas professional services firm cut their AP team's invoice processing time by 62% by deploying an agent that triages supplier invoices, matches them to purchase orders, and routes anything above $10,000 or any new vendor to a controller for sign-off. The agent did not replace anyone — it absorbed the high-volume, low-judgment work that previously made the team a hiring bottleneck.",
      "**Procurement and supply chain.** Supplier intake, contract clause review, RFP response triage, purchase order generation, delivery exception handling, and supplier risk scoring against public data. A regional construction firm used an agent to monitor 240 active suppliers against OFAC, FCPA, and lien filings weekly — work that previously took a part-time analyst 12 hours per week and ran two weeks behind. The same agent now flags margin erosion patterns the controller used to catch only at month-end.",
      "**Human resources and talent operations.** Candidate screening against structured rubrics, onboarding task orchestration, benefits inquiry triage, internal mobility matchmaking, and policy question answering. A 220-person regional law firm deployed an HR agent that resolves 78% of benefits and PTO questions instantly and routes the rest to a human within the same conversation. Their HR generalist now spends 15 hours per week on retention initiatives instead of repetitive Q&A. The work product also flows into an [AI knowledge base](/ai-knowledge-base) so future questions improve the answer set automatically.",
      "**Security, Governance, And Compliance Discipline**",
      "Agentic AI workflows touch real business systems with real consequences. Security cannot be an afterthought. ITECS deploys every production agent against the controls in the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — the standard the U.S. government, Microsoft, and most enterprise auditors now use as the policy backbone for AI governance.",
      "Concretely, that means every agent has a documented purpose, a defined input and output schema, an identity-bound credential model, an immutable audit log, a model version pin, a human approval path for high-impact actions, a rollback procedure, and a quarterly governance review. Sensitive data flows through Azure OpenAI on a private endpoint or through an equivalent governed runtime — never through a consumer AI tool. For regulated industries, ITECS configures DLP policies that block PHI, PII, payment data, and privileged legal content from leaving the agent's permitted scope.",
      "The right way to think about agentic AI security is the way a 24-year-old Dallas managed IT firm thinks about user account management — least privilege, full logging, regular review, and clear ownership of every credential. Agents are simply another class of identity that needs governance.",
      "**Pricing And ROI For Enterprise Agentic AI Workflows**",
      "ITECS prices agentic AI workflow builds the same way it has priced complex IT projects for two decades: scoped flat fees for discovery, prototype, and production build phases, a separate managed operations line after launch, and a separate pass-through for underlying model and infrastructure cost. Agent Discovery and Technical Specification runs $4,500 to $7,500 and is credited toward the build when the client proceeds. Proof of Concept / Prototype work runs $8,000 to $18,000, Single-Workflow Production Agents run $18,000 to $35,000 per agent, Integrated / Financial Workpaper Agents run $35,000 to $75,000 per agent, and Multi-Agent System / AI-Augmented Process Redesign engagements run $55,000 to $120,000. Production-agent operations are billed separately under Managed AI - Agent Operations at $2,500 to $6,500 per month, depending on volume, data-refresh cadence, review SLA, and complexity.",
      "ROI math is more direct than most AI initiatives. The finance workflow above eliminated roughly 1,400 hours of manual processing in its first year — at a fully loaded cost of $65,000 — against a build cost in the same range. The agent paid for itself in eleven months and now compounds: every new supplier, region, or business unit added to the workflow extends the same payback ratio. Procurement and HR workflows tend to deliver softer ROI through risk reduction (avoided lien filings, reduced regulatory exposure, faster offer-to-accept cycles) but generally clear payback inside 18 months.",
      "What governs the math is whether your business already carries the data, identity, and integration discipline to absorb an agent. Companies that do not should start with a structured [data and AI readiness audit](/data-audit) before scoping any agentic build. Companies that do can move directly to a [custom AI agent build](/custom-ai-agents), pair it with [workflow automation](/automation) for the surrounding routing work, and back it with [employee AI training](/training) so the workflow's human reviewers operate the agent confidently from day one.",
    ],
    faq: [
      {
        question: "What is an agentic AI workflow in plain English?",
        answer:
          "An agentic AI workflow is software that plans and executes a multi-step business task — like reviewing invoices or screening candidates — without a human clicking through every step. It uses a model for judgment, business-system tools for action, and a governance layer for policy and audit.",
      },
      {
        question: "How is an agentic AI workflow different from a chatbot or a Zapier automation?",
        answer:
          "Chatbots answer questions and stop. Zapier-style automations run fixed scripts and reject anything outside the rules. Agentic workflows make the judgment calls in between — handling exceptions, applying policy thresholds, and escalating to humans only when truly needed.",
      },
      {
        question: "Where do enterprise agentic AI pilots usually fail?",
        answer:
          "Most pilots stall in the move to production because nobody owns the operational layer — identity, audit logging, policy thresholds, model version pinning, rollback procedures, and quarterly governance reviews. A Managed Intelligence Provider closes that gap before production goes live.",
      },
      {
        question: "Which business functions are best suited for agentic AI in enterprise operations?",
        answer:
          "Finance and accounting, procurement and supply chain, and human resources absorb agentic workflows fastest because they carry the highest ratio of repeatable judgment calls to original creative work. Common early wins include invoice triage, supplier risk monitoring, and HR policy question answering.",
      },
      {
        question: "How long does it take to move an agentic AI workflow from pilot to production?",
        answer:
          "ITECS' four-stage blueprint — foundation audit, sandbox pilot, guardrails and governance, production rollout — typically runs eight to fourteen weeks for a first production workflow. Subsequent workflows that share the same governance backbone deploy substantially faster.",
      },
      {
        question: "How does ITECS secure agentic AI workflows for regulated industries?",
        answer:
          "Every production agent is deployed against the NIST AI Risk Management Framework with identity-bound credentials, immutable audit logs, DLP policies, private model endpoints through Azure OpenAI, model version pinning, and a documented human approval path for any high-impact action.",
      },
      {
        question: "What does an enterprise agentic AI workflow cost?",
        answer:
          "ITECS scopes agentic AI work in phases: Agent Discovery and Technical Specification is $4,500 to $7,500, Proof of Concept / Prototype work is $8,000 to $18,000, Single-Workflow Production Agents are $18,000 to $35,000 per agent, Integrated / Financial Workpaper Agents are $35,000 to $75,000 per agent, and Multi-Agent System / AI-Augmented Process Redesign engagements are $55,000 to $120,000. Production-agent operations run $2,500 to $6,500 per month under Managed AI - Agent Operations.",
      },
    ],
  },
  {
    slug: "how-to-use-ai-small-business",
    title: "How Growing Businesses Use AI (2026 Guide)",
    description:
      "A practical guide for Dallas operators on using AI to automate tasks, reduce costs, and grow without unnecessary hiring. From ChatGPT to workflow automation.",
    href: "/insights/how-to-use-ai-small-business",
    publishedDate: "2026-04-12",
    modifiedDate: "2026-05-06",
    hubSlug: "consulting",
    hubLabel: "AI Consulting for Growing Organizations",
    hubHref: "/consulting",
    keywords: [
      "how to use AI in business",
      "AI for business operators",
      "AI adoption guide 2026",
      "AI tools for small companies",
    ],
    h1: "How Growing Businesses Use AI",
    content: [
      "If you're running a Dallas business with 10–300 employees, AI is no longer optional. It's the difference between scaling efficiently and drowning in manual work that your competitors automated six months ago. The good news: you don't need a data science team or a six-figure budget to get started.",
      "**The first step is working with an experienced [AI consulting partner](/consulting) who understands operating discipline.** At ITECS, we've helped Dallas businesses identify the manual tasks that cost them the most time — and automate them with practical AI tools that pay for themselves within weeks.",
      "**Identify Your Biggest Time Drains First**",
      "Many growing businesses waste 15–25 hours per week on tasks that AI handles in seconds. Data entry, customer follow-up emails, report generation, appointment scheduling, answering the same customer questions over and over. These are not complex AI problems. They are workflow problems that tools like Microsoft Copilot, ChatGPT, Zapier, and Make.com solve today.",
      "Start by listing every task your team does more than three times per week. Rank them by hours consumed. The top three are your AI targets. A 25-person Dallas staffing agency we worked with found that their recruiters spent 12 hours per week copying candidate data between Indeed, their ATS, and a shared spreadsheet. One Zapier automation eliminated the spreadsheet entirely.",
      "**Choose the Right AI Tools for Your Size**",
      "Not every AI tool fits every business. Here is how the landscape breaks down for companies with 10–300 employees:",
      "**Microsoft Copilot** works best if your team already runs on Microsoft 365. It drafts emails, summarizes Teams meetings, generates Excel formulas, and searches SharePoint documents using natural language. At $30 per user per month, it's the fastest way to add AI to daily workflows without changing tools.",
      "**ChatGPT (Team or Enterprise)** gives your team a general-purpose AI assistant for writing, research, brainstorming, and code generation. The Team plan at $25 per user per month includes workspace features and a data privacy guarantee — conversations are not used for model training.",
      "**Zapier and Make.com** connect your existing tools into automated workflows without code. When a lead fills out your website form, Zapier can create a CRM contact, send a follow-up email, notify your sales team on Slack, and log the interaction — all within 60 seconds. Plans start at $20 per month.",
      "**Custom AI solutions** — like a [custom AI agent connected to your business data](/custom-ai-agents), an [AI receptionist that answers your phones 24/7](/ai-receptionist), or [AI-powered CRM automation](/crm-sales-ai) — require a managed AI partner like ITECS to build and maintain. Scoped builds are quoted after the workflow, data, and integration requirements are clear.",
      "**Start Small, Measure Everything, Then Scale**",
      "The businesses that succeed with AI don't try to automate everything at once. They pick one high-impact workflow, measure the before-and-after, and expand from there. A good [AI consultant](/consulting) will audit your workflows, estimate time savings per automation, and have your first solution running within 2–4 weeks.",
      "A 40-person home services company in Plano started with one automation: routing inbound web leads to their sales team via text within 60 seconds instead of waiting for the office manager to check email. That single change increased their lead conversion rate by 35%. Within three months, they added [AI-powered appointment scheduling](/automation), an [AI knowledge base for internal SOPs](/ai-knowledge-base), and [employee AI training](/training) for their technicians.",
      "**Protect Your Data from Day One**",
      "For Dallas businesses in healthcare, legal, or financial services, data safety is not optional. Public AI tools like the free version of ChatGPT should never be used for sensitive client data. Your employees are likely already pasting customer emails, financial reports, and internal documents into public AI tools — creating compliance risks you might not discover until an audit.",
      "The solution is not banning AI. It's deploying private AI environments where your data stays under your control. [ITECS builds secure custom AI agents](/custom-ai-agents) that give your team AI productivity without data leakage. For businesses handling PHI, PCI, or privileged legal documents, we configure private endpoints and DLP policies that block sensitive data from ever reaching public AI services.",
      "**Train Your Team to Use AI Safely and Effectively**",
      "Buying AI tools without training is like buying a truck fleet and handing employees the keys without a driving test. Your team needs to know what AI can and cannot do, which data is safe to share, how to write effective prompts, and when to trust (or override) AI output.",
      "ITECS runs [hands-on AI training workshops](/training) for non-technical staff — sales reps, customer support agents, HR managers, accountants, and office admins. Workshops cover prompt engineering for business tasks, data safety rules for your specific industry, and practical exercises using the AI tools you've already deployed. Most teams go from skeptical to productive within a single half-day session.",
    ],
    faq: [
      {
        question: "What's the easiest way to start using AI in a growing business?",
        answer:
          "Identify your team's top 3 most repetitive tasks, then evaluate whether existing tools like Microsoft Copilot or ChatGPT can automate them. For custom automation, a free AI assessment from ITECS identifies quick wins and estimates ROI in under an hour.",
      },
      {
        question: "How much does AI cost for a growing business?",
        answer:
          "Off-the-shelf AI tools can start with existing subscriptions or per-user plans. ITECS consulting can be hourly or handled through prepaid retainer hours with no minimum monthly usage or expiration date. Scoped custom builds such as AI agents, automations, and secure integrations are quoted after requirements are clear.",
      },
      {
        question: "Do I need technical staff to implement AI in my business?",
        answer:
          "No. Tools like Zapier, Make.com, and Microsoft Copilot require no coding. For custom solutions — AI agents, AI receptionists, CRM automation, and secure integrations — a managed AI partner like ITECS handles the technical build, deployment, and ongoing maintenance.",
      },
      {
        question: "Is AI safe to use with customer data?",
        answer:
          "It depends on the tool. Public ChatGPT may use your conversations for training. For sensitive data, you need private AI deployments where your data never leaves your infrastructure. ITECS deploys Azure OpenAI with private endpoints for healthcare, legal, and financial services businesses.",
      },
      {
        question: "How long does it take to see results from AI?",
        answer:
          "Most businesses see measurable time savings within 2–4 weeks. Simple automations like lead follow-up or data syncing deliver ROI within the first billing cycle. Custom AI agents typically need 3–4 weeks for training and deployment before going live.",
      },
    ],
  },
  {
    slug: "secure-business-data-chatgpt",
    title: "How to Secure Your Business Data from ChatGPT",
    description:
      "Your employees are using ChatGPT at work. Here's how to protect sensitive company data, set up safe AI policies, and deploy private AI alternatives for your Dallas business.",
    href: "/insights/secure-business-data-chatgpt",
    publishedDate: "2026-04-12",
    modifiedDate: "2026-05-06",
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "how to secure business data from ChatGPT",
      "ChatGPT data security for business",
      "AI data protection for business",
      "private AI workspace for business",
    ],
    h1: "How to Secure Your Business Data from ChatGPT",
    content: [
      "Your employees are almost certainly using ChatGPT at work — even if you have not approved it. A 2025 Cisco survey found that 80% of employees use unsanctioned AI tools at work. Every time someone pastes a customer email, financial report, or internal document into public ChatGPT, that data potentially becomes training data for OpenAI's models.",
      "**The safest approach is deploying a [private custom AI workflow](/custom-ai-agents) that keeps your business data completely under your control.** At ITECS, we build secure AI agents and approved workspaces for Dallas businesses that give your team the productivity benefits of tools like ChatGPT, Claude, Gemini, and Copilot without data leakage risks.",
      "**The Real Risk: What Happens to Your Data in Public ChatGPT**",
      "When your employees use the free version of ChatGPT (or any consumer AI tool), their conversations may be used to train future AI models. That means customer PII, financial projections, legal documents, trade secrets, and internal strategy discussions can end up in OpenAI's training corpus — accessible to anyone who asks the right question later.",
      "For Dallas businesses in healthcare (HIPAA), finance (SOX/PCI-DSS), or legal services, this is not just a data hygiene issue. It is a compliance violation that can trigger audits, fines, and client lawsuits. A single employee pasting patient records into ChatGPT to draft a referral letter violates HIPAA. An accountant summarizing a client's financial statements violates SOX data handling requirements.",
      "The scope of shadow AI use is larger than most business owners realize. Employees use ChatGPT to draft proposals, summarize meeting notes, write customer responses, debug spreadsheet formulas, and generate reports. Each of those activities can expose sensitive data if the tool is not configured for enterprise use.",
      "**Understanding ChatGPT's Data Tiers**",
      "Not all ChatGPT plans handle your data the same way. Here is how they compare:",
      "**ChatGPT Free and Plus** — OpenAI may use your conversations to improve its models. You can opt out in settings, but there is no contractual guarantee. No BAA available. Not suitable for any business handling sensitive data.",
      "**ChatGPT Team ($25/user/month)** — Conversations are not used for training. Workspace admin controls. No BAA. Suitable for general business use but not for regulated industries.",
      "**ChatGPT Enterprise** — SOC 2 compliant. Conversations are not used for training. SSO integration. Admin controls. BAA available for HIPAA-covered entities. Data encrypted at rest (AES-256) and in transit (TLS 1.2+). Suitable for most regulated industries.",
      "**Azure OpenAI Service** — Runs on your own Azure tenant. Your data never leaves your environment. Full compliance with HIPAA, SOC 2, PCI-DSS, FedRAMP. BAA included. DLP policies, private endpoints, and VNet integration available. This is what ITECS deploys for healthcare, legal, and financial services clients.",
      "**How to Lock Down AI Use in Your Organization**",
      "The fix is not banning AI — your employees will use it anyway, and you lose the productivity gains. The fix is channeling AI use through secure, managed channels. Here is the playbook ITECS follows for Dallas businesses:",
      "**Step 1: Audit current AI usage.** Survey your team. Ask what AI tools they use, what data they share, and what tasks they use AI for. You will find shadow AI use in every department. This audit takes one day and reveals the full scope of your exposure.",
      "**Step 2: Deploy a private AI environment.** Replace public AI usage with [approved private AI workflows](/custom-ai-agents) that run on enterprise AI applications, Azure OpenAI, private APIs, or controlled agent systems. Your employees get drafting, summarizing, researching, and coding support while your data stays governed. ITECS configures private endpoints, encryption, and access controls during deployment.",
      "**Step 3: Implement DLP (Data Loss Prevention) policies.** Configure Microsoft Purview or your existing DLP tool to detect and block sensitive data from being pasted into public AI endpoints. This catches employees who forget to use the approved tool. For Microsoft 365 environments, Purview DLP policies can be deployed within a few hours.",
      "**Step 4: Set up an AI acceptable use policy.** Write a clear, one-page policy that tells employees: which AI tools are approved, what data categories are off-limits (PII, PHI, financial data, legal documents), and what the consequences are for violations. ITECS provides templates tailored to your industry.",
      "**Step 5: Train your team.** Run a 2-hour [AI training workshop](/training) covering safe AI use, approved tools, data classification basics, and practical prompt engineering for their daily tasks. Employees who understand why the rules exist follow them. Employees who get a policy PDF without context ignore it.",
      "**Build Custom AI That Knows Your Business**",
      "The ultimate solution is not just securing ChatGPT — it is giving employees an approved AI workflow that fits the business. A [custom AI agent](/custom-ai-agents) grounded in your company's documents, SOPs, and knowledge base gives employees faster, more accurate answers than public AI tools can provide. It knows your product catalog. It knows your internal processes. It knows your client history. And it never shares that knowledge with anyone outside your organization.",
      "A 35-person Dallas law firm we work with deployed a private AI agent trained on 8,000 case files and internal legal research. Associates now find relevant precedents in 15 seconds instead of 45 minutes. The managing partner estimates the tool saves the firm 60 billable hours per month — and not a single client document has ever touched a public AI service.",
      "At ITECS, we deploy private AI environments and governed agent workflows for Dallas businesses. Your employees get an AI assistant that knows your business inside and out — and your data never leaves approved systems.",
      "For organizations that also need the operational side — DLP rule tuning in Microsoft 365, email gateway controls, and incident response when shadow-AI exposure has already happened — the [ITECS email security and DLP team](https://itecsonline.com/cybersecurity/email-security-services) at our parent site itecsonline.com pairs naturally with the private AI workflow described above.",
    ],
    faq: [
      {
        question: "Does ChatGPT store my business data?",
        answer:
          "The free and Plus versions of ChatGPT may use your conversations for model training. ChatGPT Enterprise and the API offer contractual data privacy guarantees. The safest option for sensitive data is a private deployment on Azure OpenAI, where your data stays in your own cloud environment.",
      },
      {
        question: "Can I use ChatGPT and still be HIPAA compliant?",
        answer:
          "Not the public version. HIPAA compliance requires a private AI deployment with a signed BAA, PHI redaction, audit logging, encryption at rest, and proper access controls. Azure OpenAI with private endpoints is the most common solution ITECS deploys for Dallas healthcare businesses.",
      },
      {
        question: "How do I stop employees from using public ChatGPT at work?",
        answer:
          "Deploy a private AI alternative that is easier to use than public ChatGPT, implement DLP policies in Microsoft Purview to block sensitive data from reaching public AI endpoints, and train employees on approved tools. Banning AI without providing an alternative does not work — employees use it anyway.",
      },
      {
        question: "What is the difference between ChatGPT Enterprise and Azure OpenAI?",
        answer:
          "ChatGPT Enterprise is a managed OpenAI product with workspace features and SOC 2 compliance. Azure OpenAI runs on your own Azure tenant with full network isolation, VNet integration, and support for HIPAA, PCI-DSS, and FedRAMP. Azure OpenAI gives you more control over data residency and security policies.",
      },
      {
        question: "How long does it take to deploy a private AI workspace or agent?",
        answer:
          "A basic approved AI workspace can often be configured in 1–2 weeks. A custom AI agent or RAG workflow connected to company documents, SOPs, and business systems usually adds another 1–3 weeks depending on data volume, approvals, and integrations. ITECS handles deployment, training, and ongoing management.",
      },
    ],
  },
  {
    slug: "automate-lead-follow-up",
    title: "How to Automate Lead Follow-Up with AI",
    description:
      "Stop losing leads to slow follow-up. Learn how Dallas businesses automate lead response with AI — from instant email/text replies to smart lead qualification.",
    href: "/insights/automate-lead-follow-up",
    publishedDate: "2026-04-12",
    modifiedDate: "2026-05-06",
    hubSlug: "automation",
    hubLabel: "AI Workflow Automation",
    hubHref: "/automation",
    keywords: [
      "automate lead follow up with AI",
      "AI lead follow up",
      "automated lead response",
      "lead automation for business",
    ],
    h1: "How to Automate Lead Follow-Up with AI",
    content: [
      "The average business takes over 24 hours to respond to a new lead. By that point, 78% of buyers have already gone with whoever responded first. If you are not following up within minutes, you are losing deals to competitors who are. The fix is simpler than you think — and the ROI is immediate.",
      "**[AI-powered workflow automation](/automation) can follow up with new leads within seconds of form submission — via email, text, or both.** At ITECS, we build these automated lead follow-up systems for Dallas businesses using tools like Zapier, Make.com, HubSpot AI, and custom integrations.",
      "**Why Speed to Lead Is the Highest-ROI Metric You Are Ignoring**",
      "Harvard Business Review research shows that companies contacting leads within 5 minutes are 100x more likely to connect than those waiting 30 minutes. InsideSales.com data shows that 50% of leads go to the vendor that responds first. Yet many growing teams still rely on an office manager to check email, then manually enter lead info into the CRM, then draft a follow-up — a process that takes hours on a good day.",
      "Every hour that passes between form submission and first contact cuts your conversion probability in half. A 30-person roofing company in McKinney was spending $4,000 per month on Google Ads generating 80+ leads. Their average response time was 6 hours. When ITECS automated their follow-up to respond in under 60 seconds, their conversion rate jumped from 12% to 28% — without spending a dollar more on ads.",
      "**The Anatomy of an AI-Powered Lead Follow-Up System**",
      "Here is how a complete automated lead follow-up pipeline works, step by step:",
      "**Trigger: Lead submits a form.** Your website contact form, landing page, or Google Ads form captures the lead. Zapier or Make.com detects the submission instantly.",
      "**Step 1: Instant acknowledgment (under 60 seconds).** The system sends a personalized email and SMS text message. Not a generic auto-reply — the message references the specific service the lead asked about, uses their first name, and sets expectations for next steps. Twilio handles SMS delivery. SendGrid or your existing email platform handles email.",
      "**Step 2: CRM record creation.** A new contact is created in HubSpot, Salesforce, or your existing CRM with all form data populated. Tags are applied based on lead source, service interest, and any qualifying data from the form.",
      "**Step 3: AI lead qualification.** For advanced setups, the OpenAI API scores the lead based on your criteria — company size, budget range, service match, geographic location. Hot leads get flagged immediately. Cold leads enter a nurture sequence.",
      "**Step 4: Sales team notification.** Hot leads trigger an instant Slack message, Teams notification, or text to the assigned sales rep with full lead context: name, company, what they asked about, their phone number, and the AI's qualification score. The rep can call within minutes, not hours.",
      "**Step 5: Nurture sequence activation.** Leads that are not yet ready to buy enter an automated email/text sequence. The AI sends 3–5 follow-up messages over 2 weeks, each addressing a specific pain point related to the service the lead expressed interest in. If the lead re-engages (opens an email, clicks a link, visits the pricing page), they get re-routed to a sales rep.",
      "**Step 6: CRM logging and reporting.** Every touchpoint — emails sent, texts delivered, opens, clicks, calls made — is logged in the CRM automatically. Your sales manager gets a weekly report showing lead volume, response times, conversion rates, and pipeline value. No manual data entry required.",
      "**Which Tools Power the Automation**",
      "You do not need to replace your existing tech stack. The automation layer sits on top of whatever you already use:",
      "**Zapier** is a widely used no-code automation platform. It connects 6,000+ apps with simple trigger-action workflows. Best for straightforward lead routing and CRM sync. Plans start at $20/month.",
      "**Make.com** (formerly Integromat) handles more complex workflows with branching logic, loops, and data transformations. Better for multi-step sequences that involve conditional routing or AI qualification. Plans start at $9/month.",
      "**HubSpot AI** adds native automation within your CRM. If you already use HubSpot, its built-in workflows handle lead scoring, email sequences, and task assignment without a third-party tool. Requires Marketing Hub Professional ($800/month) or higher.",
      "**OpenAI API** adds intelligence to the pipeline. The AI reads the lead's form submission, scores it against your ideal customer profile, and generates personalized follow-up copy. Costs $0.01–$0.03 per lead processed.",
      "**Twilio** sends SMS messages programmatically. At $0.0079 per text, a business following up with 200 leads per month spends under $2 on SMS delivery.",
      "**What Results to Expect**",
      "Dallas clients who implement AI lead follow-up with ITECS see consistent results: 30–50% improvement in lead response time, 20–35% increase in conversion rates, and 15–20 hours per week saved on manual follow-up tasks. The automation runs 24/7 — nights, weekends, holidays — so you never miss a lead that submits a form at 11 PM on a Saturday.",
      "A 50-person HVAC company in Richardson generated 120 leads per month from their website and Google Ads. Before automation, their two-person sales team manually followed up with each lead — averaging 8 hours of response time and losing 40% of leads to competitors who responded faster. ITECS deployed a Zapier + Twilio + HubSpot automation that now responds in under 45 seconds. Their monthly revenue from web leads increased 42% in the first 90 days.",
      "The best part: you do not need to change your existing tools. We connect Zapier or Make.com to your website forms, CRM (HubSpot, Salesforce, Pipedrive), email platform, and SMS provider. Setup takes 1–2 weeks, and the system starts processing leads the day it goes live.",
    ],
    faq: [
      {
        question: "What tools do you use to automate lead follow-up?",
        answer:
          "We use Zapier or Make.com as the automation backbone, connected to your CRM (HubSpot, Salesforce), email platform, and SMS provider (Twilio). For AI-powered lead qualification and personalized responses, we add the OpenAI API. The entire stack integrates with your existing tools.",
      },
      {
        question: "How fast can AI follow up with a new lead?",
        answer:
          "Under 60 seconds from form submission to personalized email and text message. Speed to lead is the single biggest factor in conversion rates — companies that respond within 5 minutes are 100x more likely to connect than those waiting 30 minutes.",
      },
      {
        question: "Will automated follow-up messages sound robotic?",
        answer:
          "No. The OpenAI API generates personalized messages that reference the lead's specific inquiry, use their name, and match your brand voice. Recipients cannot tell the difference between AI-generated and human-written follow-up messages.",
      },
      {
        question: "Can I customize which leads get routed to which sales rep?",
        answer:
          "Yes. We configure routing rules based on any criteria: service type, geographic location, deal size, lead score, or round-robin assignment. Hot leads can trigger instant phone notifications. Lower-priority leads enter automated nurture sequences.",
      },
      {
        question: "How much does automated lead follow-up cost to set up?",
        answer:
          "A standard lead follow-up automation with Zapier, CRM integration, email, and SMS costs $2,500–$5,000 to build. Monthly tool costs run $50–$200 depending on lead volume. Most businesses recover setup costs within the first month through improved conversion rates.",
      },
    ],
  },
  {
    slug: "enterprise-agentic-skills-repo",
    title: "ITECS Releases Public Enterprise Agentic Skills Repo",
    description:
      "ITECS released its enterprise agentic skills repo to help teams standardize safer Codex, Claude, and AI coding agent workflows.",
    href: "/insights/enterprise-agentic-skills-repo",
    publishedDate: "2026-05-06",
    modifiedDate: "2026-05-06",
    hubSlug: "ai-devops",
    hubLabel: "AI DevOps",
    hubHref: "/ai-devops",
    keywords: [
      "enterprise agentic skills",
      "AI agent skills repo",
      "coding agent workflows",
      "Codex skills",
      "Claude agent skills",
      "enterprise AI governance",
      "AI DevOps Dallas",
    ],
    h1: "ITECS Releases Public Enterprise Agentic Skills Repo",
    content: [
      "ITECS has released an enterprise agentic skills repository for teams that want AI coding agents to work with more structure, documentation, and repeatability. The repo is designed to help organizations move past one-off prompting and toward reusable operating practices for tools like Codex, Claude, and other coding agents.",
      "An agentic skill is a reusable set of instructions, guardrails, and workflow steps that tells an AI agent how to handle a specific kind of work. Instead of asking an agent to \"be careful\" or \"follow best practices,\" a skill gives it a defined process for tasks such as frontend changes, backend API work, dependency decisions, testing gates, documentation parity, and branch discipline.",
      "**Why This Matters For Business Leaders**",
      "Many companies are excited about AI-assisted development, but they are also right to worry about inconsistency, security, and cost. AI tools can move quickly, but speed without a shared workflow can create rework, missed tests, unclear documentation, and changes that are hard for teams to review.",
      "The skills repo addresses that problem by giving AI agents a more predictable way to work. It helps teams define how an agent should inspect a codebase, choose a practical implementation path, keep changes scoped, document what changed, and verify the work before anyone treats it as ready.",
      "**What The Repository Includes**",
      "The first public package is the Portable Development Workflow plugin. It includes project-neutral skills for frontend app development, backend API development, boundary testing, branch and pull request discipline, dependency reuse, documentation parity, practical delivery, repository boundaries, and testing gates.",
      "The repository also includes validation and installation scripts so teams can treat the skills catalog as a source of truth. The validation flow checks skill frontmatter, plugin metadata, export manifests, and portability rules before changes are committed.",
      "A key design choice is that the public repo is intentionally project-neutral. It does not contain client names, private paths, secrets, environment details, or company-specific implementation rules. Private business rules belong in each client's own project documentation, where they can be governed and reviewed separately.",
      "**Not Just One AI Tool**",
      "ITECS does not treat agentic workflows as a single-vendor strategy. The repo is written for Codex, Claude, and other coding agents because businesses rarely want their AI operating model locked to one interface or model provider.",
      "That same idea applies outside software development. ITECS can build structured project folders, approved workflows, prompt libraries, CLI procedures, and human-in-the-loop review steps for tools such as Claude, ChatGPT, Gemini, Microsoft Copilot, Codex, and custom agent systems. The goal is not to force every business into custom software. The goal is to make the AI tools they already use safer and more useful before recommending deeper automation.",
      "**How ITECS Uses Skills In AI DevOps**",
      "In [AI DevOps](/ai-devops), skills help turn AI-assisted work into an operating process. They define when an agent should inspect existing patterns, when it should update documentation, what tests are expected for a type of change, and how to avoid changes that widen risk without a clear business reason.",
      "For more advanced engagements, the same structure can support [custom AI agents](/custom-ai-agents) and agentic RAG workflows. A business might need an agent that searches internal knowledge, drafts a response, routes a task, updates a system, and pauses for human approval before taking action. Skills and workflow documentation help define those boundaries before implementation starts.",
      "**Governance Comes Before Automation**",
      "The lesson for business leaders is simple: adopting AI does not have to start with a large custom build. In many cases, the best first step is a documented way for employees and AI tools to work together safely. That can mean approved tool settings, reusable prompts, secure project folders, data rules, review checklists, and training that makes the workflow clear to non-technical staff.",
      "ITECS uses this same approach with clients. We start by understanding the business process, defining the agenda, choosing the right tools, implementing only what is justified, training the team, and testing the workflow before expanding it.",
      "**What To Do Next**",
      "Business owners and managers do not need to read every skill file to benefit from this release. The important takeaway is that AI work can be standardized. If your team is already experimenting with AI coding tools, AI assistants, or internal automation, the next step is to create a repeatable operating model that protects the business while preserving the productivity gains.",
      "ITECS can help translate that operating model into the right level of implementation: practical AI tool setup, employee training, secure project workflows, DevOps procedures, or full human-in-the-loop agents connected to approved business systems.",
    ],
    faq: [
      {
        question: "What is an enterprise agentic skills repo?",
        answer:
          "It is a reusable catalog of instructions, workflows, and guardrails that helps AI agents perform specific work in a more consistent and reviewable way. Instead of relying on one-off prompts, teams can give agents documented procedures for common tasks.",
      },
      {
        question: "Is the ITECS agentic skills repo only for Codex?",
        answer:
          "No. The repo is designed for Codex, Claude, and other coding agents. ITECS focuses on practical AI workflows across multiple tools and platforms, not a single vendor.",
      },
      {
        question: "Why would a business leader care about AI agent skills?",
        answer:
          "AI agent skills help reduce inconsistency, rework, missed documentation, and unclear testing expectations. For managers and owners, that means AI-assisted work can become easier to review, govern, and budget.",
      },
      {
        question: "Can ITECS adapt these skills for our company?",
        answer:
          "Yes. ITECS can adapt the public workflow model into private project documentation, approved tool procedures, prompt libraries, training materials, and human-in-the-loop workflows tailored to your business.",
      },
      {
        question: "Does this replace custom AI agents?",
        answer:
          "No. Skills are often a starting point for safer AI adoption. Some businesses only need better use of tools like Claude, ChatGPT, Gemini, Copilot, or Codex. Others need custom agents, RAG workflows, or secure integrations once the workflow is clearly defined.",
      },
      {
        question: "How does ITECS keep client information out of public skills?",
        answer:
          "The public repo is intentionally project-neutral. Client-specific rules, paths, data details, credentials, and operational procedures belong in private project documentation and are not published in the shared skills catalog.",
      },
    ],
  },
  {
    slug: "mcp-is-the-new-api",
    title:
      "MCP Is the New API: Why Anthropic's Model Context Protocol Will Reshape Business AI in 2026",
    description:
      "Anthropic donated MCP to the Linux Foundation in December 2025. Here is what the Model Context Protocol means for Dallas businesses adopting AI in 2026.",
    href: "/insights/mcp-is-the-new-api",
    publishedDate: "2026-05-19",
    modifiedDate: "2026-05-19",
    hubSlug: "managed-intelligence-provider",
    hubLabel: "Managed Intelligence Provider",
    hubHref: "/managed-intelligence-provider",
    keywords: [
      "Model Context Protocol",
      "MCP for business",
      "Anthropic MCP Linux Foundation",
      "Agentic AI Foundation",
      "MCP A2A protocol",
      "managed MCP gateway",
      "AI agent governance Dallas",
      "managed intelligence provider",
    ],
    h1: "MCP Is the New API: Why Anthropic's Model Context Protocol Will Reshape Business AI in 2026",
    content: [
      "On December 9, 2025, Anthropic donated the Model Context Protocol to the Linux Foundation's new Agentic AI Foundation. By the time the announcement crossed our desks, MCP had already passed 97 million monthly SDK downloads, more than 10,000 active public servers, and first-class support inside ChatGPT, Claude, Gemini, Microsoft Copilot, Cursor, and Visual Studio Code. In one year, a single open protocol became the standard way AI agents talk to your business systems.",
      "**The short version for business leaders: MCP is becoming the USB-C port of enterprise AI — a single, neutral standard that lets any AI assistant securely use your tools, data, and workflows.** At [ITECS](/managed-intelligence-provider), we view MCP as the foundation of the next era of managed AI services, the same way TCP/IP became the foundation of managed networking in the 1990s.",
      "**What MCP Actually Is, In Plain English**",
      "Until MCP, every AI assistant needed a custom integration to talk to every business tool. Connecting ChatGPT to your HubSpot CRM required one piece of code. Connecting it to your QuickBooks ledger required another. Connecting Claude to the same systems required a third and a fourth. Multiply that across 30 SaaS tools, three AI vendors, and a moving target of model versions, and the integration bill grew faster than the AI savings.",
      "MCP solves that by giving every AI client and every business tool the same open language. A SaaS vendor exposes an MCP server once. Any compliant AI assistant — Claude, ChatGPT, Microsoft Copilot, Gemini, or a custom agent — can use it. No bespoke integration. No vendor lock-in. No rewrites when models change.",
      "That is why it is fair to call MCP the new API. It is not just another endpoint format. It is the connective tissue of how agentic AI reads, writes, and acts inside your business.",
      "**Why Anthropic Donated It, And Why That Matters**",
      "Anthropic created MCP in November 2024. In twelve months, it became one of the fastest-growing open-source projects in AI history. By donating it to the Linux Foundation's new Agentic AI Foundation, Anthropic took the protocol off its own balance sheet and placed it under neutral, vendor-independent governance.",
      "The Agentic AI Foundation was co-founded by Anthropic, Block, and OpenAI, with founding support from Google, Microsoft, AWS, Cloudflare, and Bloomberg. Block donated its Goose agent runtime. OpenAI donated the AGENTS.md specification. UiPath has since joined as a Gold Member.",
      "For business leaders, the message is clear. The companies competing hardest in AI — including direct rivals like Anthropic and OpenAI — have agreed that the underlying protocols cannot be owned by any one of them. That removes a major risk from any 2026 AI roadmap: the fear that your AI investment will strand on a proprietary connector your vendor later removes, charges for, or quietly deprecates.",
      "**Every SaaS Will Expose An MCP Server**",
      "The fastest-moving part of the MCP story is on the supply side. Microsoft Copilot, Box, Asana, Linear, Notion, Salesforce, GitHub, HubSpot, Atlassian, Shopify, Stripe, Slack, and Google Workspace are each either shipping an MCP server, listing one in a partner catalog, or quietly building one. IBM has launched a watsonx governed agentic catalog of MCP-compliant servers. UiPath added MCP plug-in support to its Coded Agents. Anthropic's Claude directory alone now publishes more than 75 official MCP connectors.",
      "What this means in practice is simple. By the end of 2026, almost every business application your team uses will speak MCP. The question is no longer whether your stack supports the protocol. The question is whether your business has a controlled way of plugging AI agents into it.",
      "**A Specific Scenario For Dallas Businesses**",
      "Consider a 60-person Dallas insurance brokerage. The leadership team has approved Microsoft Copilot for licensed agents, a private custom AI assistant for claims research, and a third-party AI receptionist that handles overflow calls. Each tool wants access to the agency management system, the document repository, the CRM, and the underwriting database.",
      "Without MCP, that is twelve custom integrations the IT team has to build, maintain, and secure. With MCP, each business system exposes one server, and each AI tool consumes the same standard. But now a new problem appears: who controls which AI can read what? Who logs the calls? Who revokes access when an employee leaves? Who tests upgrades when a vendor pushes a breaking change to a server schema?",
      "That governance gap is where most 2026 AI projects will succeed or stall.",
      "**The Sprawl Problem MCP Creates**",
      "MCP makes connecting agents to systems trivial. It does not make managing them trivial.",
      "In every business with more than a few approved AI tools, the same questions appear within ninety days of adoption. Which servers are running on which hosts? Are they patched? Are calls audited? Is data redacted before it leaves the perimeter? Are credentials rotated? Did the vendor publish a new server schema yesterday, and did anyone notice?",
      "This is exactly the problem managed services were invented to solve. In the 1990s, businesses standardized on TCP/IP, then discovered they needed managed network providers to actually run the network. In the 2000s, businesses standardized on email and SaaS, then discovered they needed managed IT and security providers to actually govern access. In 2026, businesses are standardizing on MCP, and they will need a [Managed Intelligence Provider](/managed-intelligence-provider) to actually run the agent fabric.",
      "**Where The Managed MCP Gateway Comes In**",
      "A managed MCP gateway is the control plane that sits between your AI tools and your business systems. Industry analysts including Gartner now describe MCP and A2A as the foundational protocols of the agentic era, equivalent to the role TCP/IP played for the early commercial internet. That comparison is useful because TCP/IP did not eliminate the need for routers, firewalls, and managed networks — it required them.",
      "In a managed MCP architecture, your AI clients do not talk directly to every SaaS or internal database. They talk to a gateway that enforces policy, logs every call, applies data loss prevention, brokers credentials, and unifies observability. The gateway is the place where an MSP-style provider adds the most value: keeping connectors current, enforcing security policy, and giving leadership a single dashboard of what every AI agent has done across the business.",
      "**MCP And A2A: The Two Protocols Powering Agentic AI**",
      "MCP handles agent-to-tool communication. A2A — Agent-to-Agent, originally proposed by Google and now also under the Agentic AI Foundation — handles agent-to-agent communication. Together, they form the foundation of multi-agent business systems.",
      "In practical terms, an MCP-enabled agent can read a customer record from your CRM, summarize the case, and draft a response. An A2A-enabled set of agents can hand work between specialists — a research agent, a compliance reviewer, a billing agent, and a human approver — without custom glue code. Most Dallas businesses will adopt MCP-only workflows first, and A2A workflows second as their AI maturity grows.",
      "Gartner projects that 40% of enterprise applications will ship with built-in AI agents by the end of 2026, up from less than 5% in 2025. The protocols that make those agents portable, governed, and interoperable are MCP and A2A.",
      "**Security Implications Business Leaders Should Understand**",
      "MCP is a transport. It is not, by itself, a security model. Every MCP server runs with the credentials it is given. Every MCP client trusts the responses it receives. Without governance, MCP can enlarge your attack surface as fast as it enlarges your AI capability.",
      "This is where the security discipline of a managed AI partner becomes the difference between an AI program and an AI incident. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) provides the policy backbone. The implementation work — credential brokering, audit logging, PII redaction, server allowlisting, schema validation, and version pinning — is the day-to-day job of the MCP gateway and the team that runs it.",
      "At ITECS, MCP governance sits on top of the same security operations practice that has supported Dallas businesses since 2002. We treat AI agents the way we treat privileged users: documented, audited, scoped, and continuously reviewed.",
      "**What Business Leaders Should Do In 2026**",
      "You do not need to know how MCP works to make the right decisions about it. You need to know three things.",
      "First, MCP is not optional. The protocol is now the default way major SaaS vendors, AI platforms, and operating systems expose their data to AI agents. If your 2026 AI roadmap still assumes proprietary connectors, that roadmap is already out of date.",
      "Second, MCP without governance is shadow AI in a new uniform. Letting employees connect personal AI tools to business systems through unmanaged MCP servers carries the same compliance risk as letting them paste customer data into public ChatGPT.",
      "Third, the highest-leverage AI investment for most growing teams this year is not a custom agent. It is a managed AI operating model: which tools are approved, which MCP servers are allowed, how the gateway is configured, who reviews the logs, and how employees are trained to work alongside it.",
      "**How ITECS Approaches Managed MCP**",
      "ITECS is a [Managed Intelligence Provider](/managed-intelligence-provider) — an MSP-grade approach applied to AI. For MCP specifically, that work breaks down into four practical steps.",
      "We start with a discovery audit of every AI tool already in use across your business, including unsanctioned ones. We then design a managed MCP architecture that fits your existing stack — Microsoft 365, Google Workspace, HubSpot, Salesforce, QuickBooks, Slack, or whatever else runs your operation. We deploy a governed gateway with policy, logging, and observability. We train your team on what to use, what to avoid, and why.",
      "For more complex environments, the same discipline carries into [custom AI agents](/custom-ai-agents), [secure private AI workspaces](/custom-chatgpt), and [AI DevOps](/ai-devops) practices that turn AI work into a repeatable operating process rather than a permanent experiment. Smaller engagements look like consulting hours, structured workflow design, and employee [AI training](/training). Larger engagements look like a managed gateway, ongoing MCP server curation, and quarterly governance reviews. Both run on the same hourly or prepaid retainer model ITECS has used for traditional IT services for 24 years.",
      "**The Bottom Line**",
      "The donation of MCP to the Linux Foundation is the kind of moment that looks small in the news cycle and large in hindsight. In five years, the businesses that thrive with AI will not be the ones that bought the most models. They will be the ones that built a governed, observable, vendor-neutral protocol layer between their AI agents and their business systems — and then trusted a managed partner to run it.",
      "That is the work of the next decade of MSPs. It is also, increasingly, the work ITECS does every day.",
    ],
    faq: [
      {
        question: "What is the Model Context Protocol (MCP) in plain English?",
        answer:
          "MCP is an open standard that lets any AI assistant securely connect to your business tools and data through a common interface. Think of it as the USB-C port of enterprise AI — one protocol that replaces dozens of custom integrations.",
      },
      {
        question: "Why did Anthropic donate MCP to the Linux Foundation?",
        answer:
          "On December 9, 2025, Anthropic donated MCP to the Linux Foundation's new Agentic AI Foundation, co-founded with Block and OpenAI. The move placed the protocol under neutral, vendor-independent governance so that no single company controls the connective tissue of agentic AI.",
      },
      {
        question: "What is the difference between MCP and A2A?",
        answer:
          "MCP handles agent-to-tool communication — how an AI assistant talks to your CRM, document store, or database. A2A handles agent-to-agent communication — how multiple specialized agents hand work to each other. Most businesses will adopt MCP-based workflows first.",
      },
      {
        question: "Does my Dallas business need a managed MCP gateway?",
        answer:
          "If more than two AI tools are connected to business systems, yes. A managed MCP gateway centralizes policy, logging, credential brokering, and observability so leadership can govern AI access the same way they already govern user access.",
      },
      {
        question: "Is MCP secure enough for sensitive business data?",
        answer:
          "MCP itself is a transport, not a security model. Security comes from the gateway, identity controls, audit logging, and data loss prevention layered around it — work ITECS performs the same way we secure traditional infrastructure under the NIST AI Risk Management Framework.",
      },
      {
        question: "Will every SaaS application support MCP?",
        answer:
          "The major business platforms — Microsoft 365, Google Workspace, Salesforce, HubSpot, Box, Slack, GitHub, Atlassian, and many others — are already shipping or building MCP servers. By the end of 2026, MCP support will be the default expectation for any enterprise SaaS product.",
      },
      {
        question: "How does MCP fit alongside Microsoft Copilot or ChatGPT Enterprise?",
        answer:
          "Both Copilot and ChatGPT now act as MCP clients, which means they can use approved MCP servers to reach business data securely. A managed AI partner curates which servers each client can use and enforces the same policy across every assistant.",
      },
      {
        question: "How can ITECS help my Dallas business adopt MCP?",
        answer:
          "ITECS audits your current AI usage, designs a governed MCP architecture, deploys a managed gateway, and trains your team on safe AI workflows. Engagements run on hourly consulting or prepaid retainer hours with transparent tracking and no minimum monthly usage.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Insights listing page FAQ
// ---------------------------------------------------------------------------

export const INSIGHTS_FAQ = [
  {
    question: "Who are these AI guides written for?",
    answer:
      "Dallas business owners and managers running companies with 10–300 employees. Each guide assumes zero technical background and focuses on practical steps you can take this week.",
  },
  {
    question: "How often do you publish new AI guides?",
    answer:
      "We publish new guides monthly. Each one targets a specific AI use case that our Dallas clients ask about most — from ChatGPT security to lead automation and CRM integration.",
  },
  {
    question: "Can I implement these AI strategies without hiring a developer?",
    answer:
      "Most guides cover tools like Zapier, Make.com, Microsoft Copilot, ChatGPT, Claude, and Gemini that require no coding. For custom deployments like AI agents, private AI environments, or voice agents, ITECS handles the technical build.",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage stats
// ---------------------------------------------------------------------------

export const STATS = [
  { value: 24, suffix: "+", label: "Years of IT Operations" },
  { value: 92, suffix: "%", label: "Client Retention Rate" },
  { value: 200, suffix: "+", label: "Client Engagements" },
] as const;

// ---------------------------------------------------------------------------
// Homepage FAQ
// ---------------------------------------------------------------------------

export const FAQ_ITEMS = [
  {
    question: "How much does AI cost for a growing organization?",
    answer:
      "AI adoption does not need to start as a large fixed project. ITECS can consult hourly, but most clients prefer a prepaid retainer block of time they can use at their discretion with no minimum monthly usage and no expiration date. Every hour consumed is documented clearly. Flat project pricing is used only when the scope is defined, such as building an AI agent, automation, or secure platform integration.",
  },
  {
    question: "What makes ITECS different from other AI companies in Dallas?",
    answer:
      "We're not a startup that discovered AI last year. ITECS has been managing IT infrastructure for Dallas businesses since 2002. That means your AI tools are built by people who already understand networks, security, compliance, and the realities of running a business with 10–300 employees.",
  },
  {
    question: "How do I know if AI is right for my organization?",
    answer:
      "If your team spends time on repetitive tasks — data entry, report generation, customer follow-ups, answering the same questions, scheduling — AI can help. We offer a free initial assessment where we identify the tasks that are costing you the most time and show you exactly what AI can automate.",
  },
  {
    question: "Which AI tools do you work with?",
    answer:
      "We're vendor-neutral and work with ChatGPT, Claude, Gemini, Microsoft Copilot, Azure OpenAI, Google Vertex AI, Zapier, Make.com, Power Automate, HubSpot AI, and custom-built solutions. We start with practical tools your team can adopt safely, then recommend automation or custom agents only when they fit the workflow and budget.",
  },
  {
    question: "How do I keep my company data safe when using AI?",
    answer:
      "This is one of the most common concerns for Dallas businesses adopting AI. The short answer: don't paste sensitive data into public ChatGPT. We deploy private AI instances, set up data loss prevention policies, train your staff, and ensure compliance with HIPAA, SOX, or whatever regulations apply to your industry.",
  },
  {
    question: "Can you build custom AI agents for my business?",
    answer:
      "Yes. We build custom AI agents and governed workflows using the right tools for the job, including Claude, ChatGPT, Gemini, Copilot, Codex, RAG pipelines, APIs, and CLI workflows. Agents can answer questions, retrieve company context, update approved systems, and escalate to a human with full context when judgment is required.",
  },
  {
    question: "Do you work with businesses outside of Dallas?",
    answer:
      "Yes. While our office is in Plano and most of our clients are in the Dallas-Fort Worth area, we work with businesses across Texas and the US. Our consulting, automation, and chatbot services can be delivered remotely.",
  },
] as const;

// ---------------------------------------------------------------------------
// Client / partner logos
// ---------------------------------------------------------------------------

export const CLIENT_LOGOS = [
  { name: "Phoenix Capital", src: "/images/clients/phoenix-capital.webp", width: 129, height: 35 },
  { name: "First Choice Containers", src: "/images/clients/first-choice-containers.webp", width: 100, height: 44 },
  { name: "BURNCO", src: "/images/clients/burnco-logo.webp", width: 197, height: 32 },
  { name: "Ad Pages", src: "/images/clients/adpages.webp", width: 162, height: 28 },
  { name: "Pegasus Food Group", src: "/images/clients/pegasus-food-group.webp", width: 75, height: 40 },
] as const;

export const PARTNER_LOGOS = [
  { name: "Microsoft", src: "/images/partners/microsoft.svg", width: 153, height: 32 },
  { name: "Microsoft Azure", src: "/images/partners/azure.svg", width: 168, height: 32 },
  { name: "Microsoft Copilot", src: "/images/partners/copilot.svg", width: 103, height: 32 },
  { name: "Claude", src: "/images/partners/claude.svg", width: 129, height: 32 },
  { name: "OpenAI", src: "/images/partners/openai.svg", width: 132, height: 32 },
  { name: "Sophos", src: "/images/partners/sophos.svg", width: 101, height: 32 },
] as const;

export const CERTIFICATION_BADGES = [
  {
    label: "Microsoft Solutions Partner",
    detail:
      "Infrastructure and Digital & App Innovation workload status documented on the ITECS managed Azure page.",
    sourceHref: "https://itecsonline.com/managed-cloud/managed-azure-cloud",
    sourceLabel: "Verify Microsoft workloads",
  },
  {
    label: "Azure",
    detail: "Microsoft Azure cloud, migration, and managed infrastructure experience.",
    sourceHref: "https://itecsonline.com/managed-cloud/managed-azure-cloud",
    sourceLabel: "Verify Azure expertise",
  },
  {
    label: "SOC 2 Type II",
    detail: "Security and operational control framework listed in ITECS certification proof.",
    sourceHref:
      "https://itecsonline.com/msp-industries/it-support-cybersecurity-manufacturing",
    sourceLabel: "Verify SOC 2 listing",
  },
  {
    label: "CMMC",
    detail: "CMMC readiness and registered-provider compliance support.",
    sourceHref: "https://itecsonline.com/cmmc-compliance",
    sourceLabel: "Verify CMMC support",
  },
  {
    label: "ISO 27001",
    detail: "Information security management framework listed in ITECS certification proof.",
    sourceHref:
      "https://itecsonline.com/msp-industries/it-support-cybersecurity-manufacturing",
    sourceLabel: "Verify ISO 27001 listing",
  },
  {
    label: "Sophos Gold Partner",
    detail: "Gold-tier security platform partner status surfaced on ITECS managed IT pages.",
    sourceHref: "https://itecsonline.com/",
    sourceLabel: "Verify Sophos status",
  },
  {
    label: "Veeam",
    detail: "Backup and resilience platform used in the managed security stack.",
    sourceHref: "https://itecsonline.com/it-services/backup-disaster-recovery",
    sourceLabel: "Verify Veeam stack",
  },
  {
    label: "Fortinet",
    detail: "Network security platform partner status listed on ITECS legal IT pages.",
    sourceHref: "https://itecsonline.com/msp-industries/managed-it-services-lawfirms",
    sourceLabel: "Verify Fortinet listing",
  },
  {
    label: "CompTIA",
    detail: "IT industry certification ecosystem carried from confirmed ITECS credential list.",
  },
] as const;

// ---------------------------------------------------------------------------
// Trust case studies — public, sourced proof only
// ---------------------------------------------------------------------------

export const TRUST_CASE_STUDIES = [
  {
    slug: "pegasus-foods-zero-downtime-relocation",
    detailHref: "/case-studies/pegasus-foods-zero-downtime-relocation",
    client: "Pegasus Foods",
    industry: "Food manufacturing",
    label: "Public case study",
    sourceDate: "May 28, 2020",
    outcome: "100% uptime maintained",
    challenge:
      "Pegasus Foods needed to relocate its IT infrastructure across 1,200 miles while maintaining continuous 24/7 manufacturing operations.",
    solution:
      "ITECS used virtualization, real-time replication, failover planning, encrypted connectivity, staged testing, and 24/7 monitoring to move the environment without interrupting production.",
    measuredOutcome:
      "100% uptime maintained, zero data loss incidents, and $2.1M in prevented downtime losses documented in the public case study.",
    summary:
      "ITECS used virtualization and managed migration controls to move business-critical infrastructure across 1,200 miles without production downtime or data loss.",
    metrics: [
      { value: "100%", label: "Uptime maintained" },
      { value: "Zero", label: "Data loss incidents" },
      { value: "$2.1M", label: "Revenue loss prevented" },
    ],
    sourceHref:
      "https://itecsonline.com/white-papers-case-studies/pegasus-foods-white-paper",
    sourceLabel: "Read Pegasus Foods case study",
  },
  {
    slug: "opentext-dallas-onsite-support",
    detailHref: "/case-studies/opentext-dallas-onsite-support",
    client: "OpenText",
    industry: "Enterprise software",
    label: "Public case study",
    sourceDate: "July 3, 2024",
    outcome: "99.8% system uptime",
    challenge:
      "OpenText's Dallas branch needed consistent local IT support as growth increased the strain on distributed internal resources.",
    solution:
      "ITECS delivered a dedicated on-site support program for workstation support, provisioning, troubleshooting, and coordination with central IT.",
    measuredOutcome:
      "99.8% system uptime, 52+ weeks of uninterrupted on-site support, and a 30% reduction in IT support response time.",
    summary:
      "Dedicated on-site IT support helped the Dallas office keep operations stable while improving local response coverage for a growing enterprise team.",
    metrics: [
      { value: "99.8%", label: "System uptime" },
      { value: "52+", label: "Weeks of on-site support" },
      { value: "30%", label: "Response-time reduction" },
    ],
    sourceHref:
      "https://itecsonline.com/white-papers-case-studies/opentext-success-story",
    sourceLabel: "Read OpenText case study",
  },
  {
    slug: "pepsico-subsidiary-it-transitions",
    detailHref: "/case-studies/pepsico-subsidiary-it-transitions",
    client: "PepsiCo",
    industry: "Food and beverage",
    label: "Public case study",
    sourceDate: "March 25, 2025",
    outcome: "99.9% transition uptime",
    challenge:
      "Newly acquired PepsiCo subsidiaries needed operational continuity while preparing for eventual integration into corporate systems and governance.",
    solution:
      "ITECS provided transition IT management, compliant interim infrastructure, procurement support, risk management, and managed IT services during the acquisition-to-integration period.",
    measuredOutcome:
      "99.9% system uptime, five subsidiaries supported, 40% fewer transition-related IT disruptions, and 100% compliance with PepsiCo IT governance standards.",
    summary:
      "ITECS supported newly acquired subsidiaries with compliant infrastructure and managed IT services during enterprise transition periods.",
    metrics: [
      { value: "99.9%", label: "System uptime" },
      { value: "5", label: "Subsidiaries supported" },
      { value: "40%", label: "Disruption reduction" },
    ],
    sourceHref:
      "https://itecsonline.com/white-papers-case-studies/pepsico-success-story-itecs-manages-it-transitions",
    sourceLabel: "Read PepsiCo case study",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage outcomes proof — sourced public proof only
// ---------------------------------------------------------------------------

export const HOMEPAGE_OUTCOMES_PROOF = {
  eyebrow: "Outcomes Proof",
  title: "Operational proof from the managed-services foundation behind ITECS AI.",
  description:
    "Managed Intelligence is built on the same operating discipline ITECS applies to infrastructure, security, continuity, and support. These proof points use approved live metrics and public ITECS case studies.",
  metrics: [
    {
      value: "24+",
      label: "Years operating client technology environments",
      source: "ITECS approved live proof",
    },
    {
      value: "92%",
      label: "Client retention rate",
      source: "ITECS approved live proof",
    },
    {
      value: "200+",
      label: "Client engagements",
      source: "ITECS approved live proof",
    },
  ],
  cases: TRUST_CASE_STUDIES,
} as const;

// ---------------------------------------------------------------------------
// Shared security, governance, and responsible-AI band
// ---------------------------------------------------------------------------

export const SECURITY_GOVERNANCE_BAND = {
  eyebrow: "Security, Compliance & Responsible AI",
  title: "Governed AI with the controls enterprise buyers expect.",
  description:
    "ITECS plans AI around identity, data boundaries, human review, auditability, and the same security operations discipline used for managed IT and cybersecurity clients.",
  frameworks: [
    {
      name: "NIST AI RMF",
      detail:
        "Govern, Map, Measure, and Manage functions guide AI risk decisions and operating reviews.",
    },
    {
      name: "SOC 2 Type II",
      detail:
        "Security and operational control expectations inform monitoring, access, and change-management practices.",
    },
    {
      name: "ISO 27001",
      detail:
        "Information-security management principles shape policy, asset, vendor, and evidence handling.",
    },
    {
      name: "CMMC",
      detail:
        "Cybersecurity maturity controls support clients with defense, manufacturing, and regulated supply-chain exposure.",
    },
    {
      name: "HIPAA / BAA",
      detail:
        "Healthcare workflows are planned around protected-health-information handling and Business Associate Agreement requirements.",
    },
  ],
  controls: [
    {
      title: "Data residency planning",
      detail:
        "Data location, vendor processing paths, and tenant boundaries are documented before any production workflow is approved.",
    },
    {
      title: "Model governance",
      detail:
        "Approved models, prompt versions, retrieval sources, quality thresholds, and review cadence are owned after launch.",
    },
    {
      title: "Human-in-the-loop",
      detail:
        "Sensitive recommendations route to named human owners before financial, customer-facing, legal, or regulated actions occur.",
    },
    {
      title: "Audit and evidence trails",
      detail:
        "Agent actions, approvals, exceptions, and change history are captured so executives can defend the program.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Homepage testimonials — public, sourced excerpts only
// ---------------------------------------------------------------------------

export const HOMEPAGE_TESTIMONIALS = {
  eyebrow: "Client Voice",
  title: "Attributed client commentary from public ITECS proof.",
  description:
    "These short excerpts are sourced from public ITECS case studies and review modules. Each quote is attributed to a named person or hidden rather than filled with unnamed filler.",
  testimonials: [
    {
      quote:
        "an innovative solution to what seemed like an impossible challenge.",
      name: "Dan",
      title: "CEO",
      company: "Pegasus Foods, Inc.",
      sourceHref:
        "https://itecsonline.com/white-papers-case-studies/pegasus-foods-white-paper",
      sourceLabel: "Pegasus Foods case study",
    },
    {
      quote: "strategic IT guidance is top-notch.",
      name: "David Bryant",
      title: "Verified Google reviewer",
      company: "Dallas business review",
      sourceHref: "https://itecsonline.com/",
      sourceLabel: "Google review excerpt",
    },
    {
      quote: "a huge asset to our business.",
      name: "Jason Jones",
      title: "Verified Google reviewer",
      company: "Dallas business review",
      sourceHref: "https://itecsonline.com/hipaa-compliance",
      sourceLabel: "Google review excerpt",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Third-party validation — surfaced only when public proof exists
// ---------------------------------------------------------------------------

export const THIRD_PARTY_VALIDATION = {
  eyebrow: "Third-Party Validation",
  title: "Independent proof signals buyers can verify.",
  description:
    "These badges and review metrics are sourced from public ITECS pages or third-party coverage, so procurement teams can inspect the proof behind the signal.",
  items: [
    {
      label: "4.9/5",
      title: "Google rating",
      detail: "54+ local reviews surfaced on public ITECS managed IT pages.",
      sourceHref: "https://itecsonline.com/collection/frontpage",
      sourceLabel: "View Google review proof",
    },
    {
      label: "4.9/5",
      title: "G2 B2B reviews",
      detail: "11 B2B reviews referenced on the public ITECS managed IT site.",
      sourceHref: "https://itecsonline.com/",
      sourceLabel: "View B2B review proof",
    },
    {
      label: "PRNewswire",
      title: "Anniversary coverage",
      detail:
        "Newswire coverage documents ITECS as a Dallas-Fort Worth managed-services provider founded in 2002.",
      sourceHref:
        "https://www.prnewswire.com/news-releases/dallas-it-firm-itecs-celebrates-23-years-of-technology-excellence-in-dallas-fort-worth-302630228.html",
      sourceLabel: "Read PRNewswire coverage",
    },
    {
      label: "Top MSP 2024",
      title: "Public proof badge",
      detail: "Public ITECS proof strip includes Top MSP 2024.",
      sourceHref: "https://itecsonline.com/",
      sourceLabel: "View public proof strip",
    },
    {
      label: "BusinessRate Best of 2026",
      title: "Public proof badge",
      detail: "Public ITECS proof strip includes BusinessRate Best of 2026.",
      sourceHref: "https://itecsonline.com/",
      sourceLabel: "View public proof strip",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export const TEAM_MEMBERS = [
  {
    name: "Brian Desmot",
    title: "Founder & CEO",
    image: "/images/team/brian-desmot.webp",
    bio: "Brian founded ITECS in 2002 with a mission to deliver enterprise-grade IT to Dallas businesses without the enterprise price tag. With over two decades of hands-on operations experience, he now leads the firm's expansion into practical AI solutions for small and mid-sized businesses.",
    quote: "AI should save your team 10 hours a week — not create 10 new problems. We build tools that work on day one.",
  },
] as const;

// ---------------------------------------------------------------------------
// About — Milestones (timeline)
// ---------------------------------------------------------------------------

export const ABOUT_MILESTONES = [
  {
    year: "2002",
    title: "ITECS Founded in Dallas",
    description:
      "Brian Desmot launches ITECS to deliver enterprise-grade managed IT to small Dallas businesses — helpdesk, networking, and security at a price point that makes sense for 10–50 person teams.",
  },
  {
    year: "2008",
    title: "500+ Endpoints Under Management",
    description:
      "ITECS scales to manage infrastructure across healthcare, legal, financial services, and manufacturing sectors in Dallas-Fort Worth. 24/7 monitoring and on-site support become standard.",
  },
  {
    year: "2015",
    title: "Cloud Migration & Cybersecurity Expansion",
    description:
      "Full Microsoft 365 and Azure migration practice. Partnership with SentinelOne and Sophos for endpoint detection and response. HIPAA and SOX compliance services launch for regulated clients.",
  },
  {
    year: "2020",
    title: "Remote Workforce Enablement",
    description:
      "COVID-19 hits. ITECS transitions 40+ client organizations to secure remote operations in under 3 weeks — VPN, Teams, MFA, and zero-trust access policies deployed at scale.",
  },
  {
    year: "2023",
    title: "AI Division Launches",
    description:
      "ITECS AI is born. First engagements: custom AI agents for internal knowledge bases, workflow automation with Zapier and Make, and AI consulting for businesses exploring GPT-4.",
  },
  {
    year: "2024",
    title: "Full AI Service Portfolio",
    description:
      "AI Receptionist, CRM & Sales AI, Data Readiness Audits, and employee AI training programs go live. Clients report 20+ hours saved per week within the first month of deployment.",
  },
] as const;

// ---------------------------------------------------------------------------
// About — Core Values / Differentiators
// ---------------------------------------------------------------------------

export const ABOUT_VALUES = [
  {
    icon: "Shield",
    title: "Security-First AI",
    description:
      "Every AI tool runs in a private environment. Your data never trains public models. We enforce HIPAA, SOX, and FINRA compliance from day one — not as an afterthought.",
  },
  {
    icon: "Eye",
    title: "No Black Boxes",
    description:
      "You own every prompt, every workflow, every integration. We document what we build and train your team to operate it. If you fire us tomorrow, everything still works.",
  },
  {
    icon: "Building2",
    title: "Dallas Roots, Enterprise Grade",
    description:
      "24 years of on-the-ground IT operations in Dallas-Fort Worth. We know your compliance landscape, your vendor ecosystem, and the realities of running a 10–300 person company.",
  },
  {
    icon: "Target",
    title: "Practical Over Hype",
    description:
      "We deploy AI that saves hours this week — not prototypes that impress in a demo and collect dust. Every engagement starts with ROI math, not a pitch deck.",
  },
] as const;

// ---------------------------------------------------------------------------
// About — FAQ
// ---------------------------------------------------------------------------

export const ABOUT_FAQ = [
  {
    question: "How long has ITECS been in business?",
    answer:
      "ITECS was founded in 2002 in Dallas, Texas. We have over 24 years of managed IT operations experience serving small and mid-sized businesses across healthcare, legal, financial services, and manufacturing sectors in the Dallas-Fort Worth area.",
  },
  {
    question: "What makes ITECS different from AI startups?",
    answer:
      "Most AI companies launched in 2023. ITECS has 24 years of IT infrastructure experience — we already understand your network, security requirements, and compliance needs before we build a single AI tool. AI is our next layer, not our first product.",
  },
  {
    question: "Does ITECS still provide managed IT services?",
    answer:
      "Yes. ITECS continues to deliver full managed IT services including helpdesk, cybersecurity, cloud management, and infrastructure support through itecsonline.com. ITECS AI is the dedicated AI consulting and automation division.",
  },
  {
    question: "What industries does ITECS serve?",
    answer:
      "We serve small and mid-sized businesses across healthcare, legal, financial services, manufacturing, real estate, and professional services in the Dallas-Fort Worth metroplex. Our AI solutions are built with industry-specific compliance requirements in mind.",
  },
  {
    question: "Where is ITECS located?",
    answer:
      "ITECS is headquartered at 17304 Preston Rd. Ste 460, Dallas, TX 75252 — serving the entire Dallas-Fort Worth area including Dallas, Plano, Frisco, Richardson, and surrounding cities.",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage features (for FeatureShowcase)
// ---------------------------------------------------------------------------

export const HOMEPAGE_FEATURES = [
  {
    eyebrow: "Security-First AI",
    title: "Your Data Stays Yours",
    description:
      "We never deploy AI that puts your sensitive data at risk. Every tool we build uses private, secure AI environments — not public consumer AI accounts. Your customer records, financial data, and proprietary information stay under your control, always.",
    image: "/images/services/cybersecurity.webp",
    bullets: [
      "Private AI instances — your data never trains public models",
      "HIPAA, SOX, and FINRA compliance built in from day one",
      "Employee AI usage policies and automatic data safeguards",
      "Ongoing monitoring so nothing slips through the cracks",
    ],
  },
  {
    eyebrow: "Works With Your Existing Tools",
    title: "AI That Connects to the Software You Already Use",
    description:
      "We don't ask you to rip and replace. Our AI integrations plug into your CRM, helpdesk, invoicing, and communication tools — Zapier, HubSpot, Microsoft 365, QuickBooks, Slack, Teams, and more. AI saves you time without changing how your team works.",
    image: "/images/services/technology-desks.webp",
    bullets: [
      "Integrations with HubSpot, Salesforce, QuickBooks, and 100+ tools",
      "Microsoft Copilot, Teams, and Outlook AI setup",
      "Custom AI agents that pull approved data from your existing systems",
      "Zapier and Make.com automations connecting everything together",
    ],
  },
  {
    eyebrow: "Production AI DevOps",
    title: "AI Systems That Stay Monitored After Launch",
    description:
      "A working demo is not the finish line. We operate AI like infrastructure — with release control, prompt and model versioning, cost monitoring, rollback plans, and support paths when business-critical automations need attention.",
    image: "/images/services/helpdesk.webp",
    bullets: [
      "CI/CD pipelines for AI apps, agents, prompts, and RAG configurations",
      "Live monitoring for latency, errors, retrieval quality, and usage cost",
      "Rollback plans and incident response for customer-facing AI systems",
      "Monthly optimization reviews so AI keeps improving after launch",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage: Service blurbs with intent-driven anchor text for the authority grid
// Each blurb contains an anchor phrase + the href it should link to
// ---------------------------------------------------------------------------

export const HOMEPAGE_SERVICE_BLURBS = [
  {
    slug: "consulting",
    blurb:
      "Not sure where AI fits? We identify your biggest time-wasters and build a ",
    anchorText: "practical AI adoption plan tailored to your team",
    anchorHref: "/consulting",
    afterAnchor: ".",
  },
  {
    slug: "custom-ai-agents",
    blurb:
      "When an off-the-shelf app is not enough, we build ",
    anchorText: "custom AI agents, Claude and Codex workflows, and RAG systems",
    anchorHref: "/custom-ai-agents",
    afterAnchor: ".",
  },
  {
    slug: "automation",
    blurb:
      "Your team wastes hours on data entry and follow-ups. We ",
    anchorText: "automate repetitive workflows with Zapier, Power Automate, and custom AI",
    anchorHref: "/automation",
    afterAnchor: ".",
  },
  {
    slug: "ai-devops",
    blurb:
      "AI demos break when nobody owns production. We provide ",
    anchorText: "AI DevOps for CI/CD, monitoring, rollback, and cost control",
    anchorHref: "/ai-devops",
    afterAnchor: ".",
  },
  {
    slug: "training",
    blurb:
      "Your employees already use AI — the question is whether they use it safely. We deliver ",
    anchorText: "hands-on AI training for Microsoft Copilot, ChatGPT, and automation tools",
    anchorHref: "/training",
    afterAnchor: ".",
  },
  {
    slug: "ai-receptionist",
    blurb:
      "Every missed call is lost revenue. We deploy ",
    anchorText: "AI voice agents that answer your phones 24/7 and book appointments",
    anchorHref: "/ai-receptionist",
    afterAnchor: ".",
  },
  {
    slug: "crm-sales-ai",
    blurb:
      "Your sales team updates the CRM more than they sell. We ",
    anchorText: "integrate AI into HubSpot and Salesforce to automate lead scoring and outreach",
    anchorHref: "/crm-sales-ai",
    afterAnchor: ".",
  },
  {
    slug: "ai-knowledge-base",
    blurb:
      "Company knowledge is trapped in SharePoint and Google Drive. We build ",
    anchorText: "RAG-powered AI knowledge bases that answer employee questions instantly",
    anchorHref: "/ai-knowledge-base",
    afterAnchor: ".",
  },
  {
    slug: "data-audit",
    blurb:
      "Before you deploy AI, know where your data stands. Our ",
    anchorText: "AI data readiness audit maps security gaps and automation opportunities in 7 days",
    anchorHref: "/data-audit",
    afterAnchor: ".",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage: E-E-A-T Heritage section — ITECS founding story + parent company
// ---------------------------------------------------------------------------

export const HOMEPAGE_HERITAGE = {
  eyebrow: "Why ITECS",
  title: "MSP to Managed Intelligence Provider",
  description:
    "ITECS started as a managed IT and cybersecurity firm in Dallas in 2002. itecs.ai is the AI division of that same company: AI consulting, automation, training, and DevOps delivered on top of the operating discipline that keeps infrastructure, identity, security, and support reliable.",
  badge: {
    eyebrow: "Heritage badge",
    value: "Since 2002",
    label: "Dallas managed IT foundation",
  },
  differentiators: [
    {
      title: "MSP to Managed Intelligence Provider",
      description:
        "ITECS extends the MSP operating model from devices, networks, and security into prompts, agents, automations, governance, and executive reporting.",
    },
    {
      title: "Dedicated operating teams",
      description:
        "AI work is handled by people accountable for discovery, build, training, security, and ongoing support instead of being thrown into a generic ticket queue.",
    },
    {
      title: "Security-first",
      description:
        "Data handling, identity, approvals, vendor selection, and auditability are treated as first-order design constraints.",
    },
    {
      title: "AI on a managed-IT foundation",
      description:
        "Every workflow is designed around the Microsoft 365, CRM, endpoint, cloud, backup, and support reality the business already runs on.",
    },
  ],
  stats: [
    { value: "24+", label: "Years of IT Operations" },
    { value: "92%", label: "Client Retention Rate" },
    { value: "200+", label: "Client Engagements" },
  ],
  parentLink: {
    text: "Learn more about ITECS managed IT services",
    href: "https://itecsonline.com",
  },
} as const;

// ---------------------------------------------------------------------------
// Managed Intelligence Provider subpage
// ---------------------------------------------------------------------------

export const MIP_PAGE_HERO = {
  eyebrow: "DALLAS'S FIRST MANAGED INTELLIGENCE PROVIDER",
  title: "The MSP, Evolved into a Managed Intelligence Provider",
  subhead:
    "A Managed Intelligence Provider is a team that operates AI the way a mature MSP operates infrastructure: governed, monitored, documented, secured, and continually improved.",
  supporting:
    "ITECS extends its 24-year Dallas managed IT and cybersecurity foundation into the intelligence layer: agents, automations, model governance, data readiness, executive reporting, and the support path that keeps production AI dependable.",
  primaryCta: {
    label: "Book an AI Readiness Assessment",
    href: "/assessment",
  },
  secondaryCta: {
    label: "Explore Managed AI",
    href: "#what-managed-intelligence-means",
  },
  proof: [
    {
      value: "24+",
      label: "years operating client technology environments",
    },
    {
      value: "92%",
      label: "client retention rate",
    },
    {
      value: "200+",
      label: "client engagements",
    },
  ],
  operatingLayer: [
    {
      label: "Managed IT",
      detail: "Infrastructure, endpoint, cloud, backup, and support discipline.",
    },
    {
      label: "Managed Security",
      detail: "Identity, endpoint protection, monitoring, evidence, and risk controls.",
    },
    {
      label: "Managed Intelligence",
      detail: "Agents, automations, model governance, optimization, and reporting.",
    },
  ],
} as const;

export const MIP_EVOLUTION_TIMELINE = [
  {
    year: "2002",
    title: "ITECS founded",
    stage: "Dallas managed IT foundation",
    description:
      "ITECS begins operating business technology environments for Dallas-Fort Worth organizations.",
    tone: "heritage",
  },
  {
    year: "2000s-2010s",
    title: "Managed IT",
    stage: "MSP",
    description:
      "Infrastructure, devices, Microsoft environments, helpdesk, backup, and continuity move into an accountable managed-services model.",
    tone: "muted",
  },
  {
    year: "2015-2023",
    title: "Managed Security",
    stage: "MSSP",
    description:
      "Security operations, endpoint protection, identity controls, compliance support, and risk reporting become part of the operating layer.",
    tone: "brand",
  },
  {
    year: "2024+",
    title: "Managed Intelligence",
    stage: "MIP",
    description:
      "AI agents, workflow automation, model governance, prompt operations, and executive intelligence reporting are managed with the same discipline.",
    tone: "cyan",
  },
] as const;

export const MIP_DEFINITION_CAPABILITIES = {
  eyebrow: "Managed AI Workforce",
  title: 'What Managed Intelligence means',
  definition:
    "A Managed Intelligence Provider is the operating model for putting AI agents, automations, data workflows, model governance, monitoring, optimization, security, and executive reporting into production without handing business-critical decisions to unmanaged tools.",
  workforce:
    "The managed-AI workforce concept is practical: each AI workflow has an approved job, data boundary, owner, quality threshold, escalation path, and executive reporting loop.",
  capabilities: [
    {
      title: "Agent operations",
      description:
        "Production agents are deployed with named owners, documented prompts, approved tools, release notes, and support paths.",
    },
    {
      title: "Monitoring",
      description:
        "Usage, latency, errors, retrieval quality, cost, and exception patterns are reviewed so AI work remains visible.",
    },
    {
      title: "Optimization",
      description:
        "Prompts, models, workflows, and integrations are tuned as business priorities, vendor capabilities, and user behavior change.",
    },
    {
      title: "Governance",
      description:
        "Policies, approval thresholds, identity access, model selection, evidence trails, and review cadence are managed from the start.",
    },
    {
      title: "Security",
      description:
        "Data boundaries, tenant isolation, vendor risk, retention, human review, and regulated-workflow controls are designed into delivery.",
    },
    {
      title: "Reporting / vCIO",
      description:
        "Executives get plain-English visibility into adoption, risks, spend, workflow health, and where the next AI investment should go.",
    },
  ],
} as const;

export const MIP_COMPARISON = {
  eyebrow: "MSP vs. MIP",
  title: "What changes when managed intelligence is added to the operating model.",
  description:
    "A traditional MSP keeps the technology estate healthy. A Managed Intelligence Provider adds the governance, operations, and executive visibility required to keep AI useful after launch.",
  columns: [
    { id: "msp", label: "Traditional MSP" },
    { id: "mip", label: "Managed Intelligence Provider" },
  ],
  rows: [
    {
      label: "Infrastructure operations",
      msp: { mark: "✓", detail: "Servers, endpoints, cloud, backup, helpdesk" },
      mip: { mark: "✓", detail: "Included as the operating foundation" },
    },
    {
      label: "Security operations",
      msp: { mark: "✓", detail: "Often included or added through MSSP scope" },
      mip: { mark: "✓", detail: "Built into AI policy, identity, and controls" },
    },
    {
      label: "AI agent operations",
      msp: { mark: "—", detail: "Usually outside the support model" },
      mip: { mark: "✓", detail: "Agents are documented, monitored, and supported" },
    },
    {
      label: "Model governance",
      msp: { mark: "—", detail: "Tool choice is left to teams or vendors" },
      mip: { mark: "✓", detail: "Approved models, prompts, and review cadence" },
    },
    {
      label: "Workflow optimization",
      msp: { mark: "—", detail: "Limited to tickets or application support" },
      mip: { mark: "✓", detail: "AI workflows are tuned against business outcomes" },
    },
    {
      label: "Reporting / vCIO",
      msp: { mark: "✓", detail: "Technology roadmap and support reporting" },
      mip: { mark: "✓", detail: "AI adoption, risk, spend, and opportunity reporting" },
    },
  ],
} as const;

export const MIP_METHODOLOGY_STEPS = [
  {
    title: "Assess",
    description:
      "Map workflows, shadow AI usage, data readiness, risk, and the operating case before recommending tools.",
    kpi: "Readiness score",
    sla: "Discovery summary and prioritized use cases before implementation scope.",
  },
  {
    title: "Architect",
    description:
      "Design the approved workflow, governance model, data boundaries, integrations, and human review path.",
    kpi: "Approved operating blueprint",
    sla: "Security, integration, and owner review before build authorization.",
  },
  {
    title: "Deploy",
    description:
      "Build or configure the system, train users, validate quality, and move only stable workflows into production.",
    kpi: "Production release checklist",
    sla: "Launch validation and rollback path before production handoff.",
  },
  {
    title: "Manage & Optimize",
    description:
      "Monitor usage, cost, reliability, model changes, prompt drift, and executive outcomes after launch.",
    kpi: "30-day operating review",
    sla: "Monthly optimization review for active managed-intelligence workflows.",
  },
] as const;

export const MIP_ENTERPRISE_FAQ = [
  {
    question: "How does data security work in a Managed Intelligence Provider engagement?",
    answer:
      "ITECS starts with data classification, identity boundaries, approved systems, vendor processing paths, and human review rules before production AI is deployed. The goal is to keep sensitive data governed instead of letting teams route it through unmanaged tools.",
  },
  {
    question: "Who controls model choice?",
    answer:
      "Model choice is treated as an operating decision, not a default vendor preference. ITECS documents approved models based on data sensitivity, integration requirements, quality needs, cost profile, and the workflow owner responsible for outcomes.",
  },
  {
    question: "How does integration work with existing business systems?",
    answer:
      "ITECS designs integration around the tools already in place: Microsoft 365, CRM, ticketing, finance, document, and communication systems. Each connection is scoped around permissions, data flow, logging, rollback, and the human action that remains accountable.",
  },
  {
    question: "What pricing model should we expect?",
    answer:
      "Advisory, planning, optimization, governance, and enablement work can run hourly or through prepaid retainer hours. Build work such as agents, automations, and secure integrations is scoped separately once requirements, data access, and controls are clear.",
  },
  {
    question: "How is IP ownership handled?",
    answer:
      "IP ownership, prompt documentation, workflow design, integration notes, and operating procedures are addressed during scope so the client understands what is delivered, what is reusable, and what remains specific to the engagement.",
  },
  {
    question: "What is the getting started process?",
    answer:
      "Getting started begins with an AI Readiness Assessment that identifies workflows, risks, data boundaries, stakeholders, and success measures. From there, ITECS recommends the first governed use case instead of starting with a tool demo.",
  },
  {
    question: "Can we keep our current MSP while working with ITECS?",
    answer:
      "Yes. ITECS can operate as the managed-intelligence layer while an existing MSP continues infrastructure support, or the work can be consolidated with ITECS managed IT and security services when that is the cleaner operating model.",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage: Local Dallas footprint — DFW metro cities for local SEO
// ---------------------------------------------------------------------------

export const DFW_SERVICE_AREAS = [
  "Dallas",
  "Plano",
  "Frisco",
  "Richardson",
  "McKinney",
  "Allen",
  "Irving",
  "Arlington",
  "Fort Worth",
  "Garland",
  "Carrollton",
  "Addison",
] as const;

// ---------------------------------------------------------------------------
// AI-Optimized SEO — Parent hub + 3 pricing tiers
// Canonical home for ITECS's AI-SEO service offering. Replaces the legacy
// /ai-optimized-seo-services pages on itecsonline.com; those URLs 301 to here.
// ---------------------------------------------------------------------------

export interface AISEOMechanicStep {
  number: number;
  title: string;
  description: string;
}

export interface AISEOComparisonRow {
  aspect: string;
  traditional: string;
  aiOptimized: string;
}

export interface AISEOPhilosophy {
  refuse: string[];
  doInstead: string[];
}

export interface AISEOIncludeCategory {
  category: string;
  items: string[];
}

export interface AISEOMethodologyStep {
  number: number;
  title: string;
  description: string;
}

export interface AISEOGlossaryTerm {
  term: string;
  definition: string;
}

export interface AISEOProofStat {
  value: string;
  label: string;
}

export interface AISEOTrafficSource {
  source: string;
  sessions: string;
}

export interface AISEOOverview {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubline: string;
  heroCTA: string;
  definitionTitle: string;
  definitionBody: string;
  mechanicsTitle: string;
  mechanicsIntro: string;
  mechanicsSteps: AISEOMechanicStep[];
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonRows: AISEOComparisonRow[];
  philosophyTitle: string;
  philosophyIntro: string;
  philosophy: AISEOPhilosophy;
  includesTitle: string;
  includesIntro: string;
  includes: AISEOIncludeCategory[];
  methodologyTitle: string;
  methodologyIntro: string;
  methodology: AISEOMethodologyStep[];
  technicalTitle: string;
  technicalIntro: string;
  technicalSpecs: string[];
  proofTitle: string;
  proofIntro: string;
  proofStats: AISEOProofStat[];
  proofTrafficSources: AISEOTrafficSource[];
  proofDateRange: string;
  glossaryTitle: string;
  glossaryIntro: string;
  glossary: AISEOGlossaryTerm[];
  faq: { question: string; answer: string }[];
}

export const AI_SEO_OVERVIEW: AISEOOverview = {
  title: "AI SEO Services Dallas | GEO Visibility",
  description:
    "GEO and AI SEO for Dallas businesses. Get found in ChatGPT, Google AI Overviews, Claude, and Perplexity with Foundation, Momentum, and Velocity tiers.",
  href: "/ai-optimized-seo",
  keywords: [
    "AI optimized SEO Dallas",
    "generative engine optimization Dallas",
    "GEO Dallas",
    "AI SEO services",
    "ChatGPT SEO optimization",
    "Google AI Overviews optimization",
    "Perplexity SEO",
    "llms.txt Dallas",
    "schema markup Dallas SEO",
    "AI search visibility",
  ],
  eyebrow: "AI-Optimized SEO",
  h1: "AI-Optimized SEO Services in Dallas",
  heroSubline:
    "Dominate Dallas search results with AI-optimized SEO. We blend technical precision with generative AI strategies to capture local traffic in DFW.",
  heroCTA: "Request an AI-SEO Audit",
  definitionTitle: "What is AI SEO?",
  definitionBody:
    "Adapting your digital presence for the era of answer engines. SEO used to be a keywords game: convince Google to rank your link #1. Today, buyers ask complex questions to ChatGPT, Google Gemini, and Perplexity. These answer engines do not just list websites — they read them, summarize them, and recommend the most trusted option. AI-Optimized SEO (also called Generative Engine Optimization or GEO) is the engineering process of structuring your brand's data and content so AI models recognize you as the trusted authority in your industry.",
  mechanicsTitle: "The Mechanics of GEO",
  mechanicsIntro:
    "Three-step process that determines whether AI models recommend you or your competitor.",
  mechanicsSteps: [
    {
      number: 1,
      title: "Entity Extraction",
      description:
        "The AI reads your content not as strings of text, but as entities (People, Places, Concepts). It looks for relationships. Does \"ITECS\" have a \"Parent\" relationship with \"Dallas\"? Is \"Managed IT\" a \"Service\" offered by \"ITECS\"? We use Schema.org to hardcode these relationships so the AI doesn't have to guess.",
    },
    {
      number: 2,
      title: "Retrieval Augmented Generation (RAG)",
      description:
        "The model doesn't just memorize the internet — that triggers hallucinations. Instead, it searches its trusted Knowledge Graph to retrieve facts. If your site provides structured, citation-ready facts (via llms.txt and semantic HTML), you become a primary source for the RAG process.",
    },
    {
      number: 3,
      title: "Response Synthesis",
      description:
        "Finally, the AI combines the retrieved facts into a natural language answer. It prioritizes sources that are authoritative (proven expertise) and concise. Our \"Winner Takes All\" content strategy is designed to be the single best answer used in this synthesis.",
    },
  ],
  comparisonTitle: "Traditional SEO vs AI-Optimized SEO",
  comparisonIntro:
    "The optimization rules changed when answer engines arrived. Here is what shifts.",
  comparisonRows: [
    {
      aspect: "Core Competition",
      traditional: "You compete for a click.",
      aiOptimized: "You compete to be the answer.",
    },
    {
      aspect: "Optimization Focus",
      traditional: "Keyword-first page optimization",
      aiOptimized: "Entity clarity + structured data",
    },
    {
      aspect: "Ranking Target",
      traditional: "Rank for blue links",
      aiOptimized: "Answer-centric content written for extraction",
    },
    {
      aspect: "Trust Building",
      traditional: "Win the click, then explain trust",
      aiOptimized: "Citations and trusted signals across the web",
    },
    {
      aspect: "Authority Source",
      traditional: "Authority is implied by position",
      aiOptimized: "Authority is proven by context",
    },
  ],
  philosophyTitle: "Clean SEO Philosophy",
  philosophyIntro:
    "We refuse the tactics that look fast and break things later. We invest in the work that compounds.",
  philosophy: {
    refuse: [
      "Paid link placement, link farms, or reciprocal link schemes",
      "Short-term hacks that trigger Google penalties",
      "Keyword stuffing that hurts user experience",
      "Generic SEO packages with no AI visibility strategy",
    ],
    doInstead: [
      "Technical SEO fixes that search engines and AI models reward",
      "Semantic HTML and content architecture for topical authority",
      "Schema markup for rich results and AI understanding",
      "Performance tuning that improves Core Web Vitals",
      "Content built around real search demand, not fluff",
    ],
  },
  includesTitle: "What AI-Optimized SEO Includes",
  includesIntro:
    "Two layers of work running in parallel — the traditional SEO foundation that Google still rewards, plus the AI discovery layer that answer engines require.",
  includes: [
    {
      category: "Traditional SEO Foundation",
      items: [
        "Technical SEO audit and remediation (site speed, crawlability, mobile)",
        "Keyword research and content strategy aligned to business goals",
        "On-page optimization for titles, headers, and internal linking",
        "Local SEO targeting Dallas–Fort Worth corridors",
        "Content architecture that builds topical authority",
      ],
    },
    {
      category: "AI Discovery Layer",
      items: [
        "LLM visibility files (llms.txt + llms-full.txt) for AI ingestion",
        "Schema.org JSON-LD graphing for entity clarity",
        "Semantic page structure for AI answer extraction",
        "Entity optimization and citation readiness across platforms",
        "AI search optimization for AI Overviews, Perplexity, and Bing Chat",
      ],
    },
  ],
  methodologyTitle: "Our Process: Widest Net + Sharp Hooks",
  methodologyIntro:
    "A four-step engagement that anchors on broad Dallas demand and proves industry-specific expertise in the same content.",
  methodology: [
    {
      number: 1,
      title: "Audit & Intelligence",
      description:
        "We analyze GA4, Search Console, crawl health, and Core Web Vitals to identify technical blockers and AI visibility gaps.",
    },
    {
      number: 2,
      title: "Widest Net Targeting",
      description:
        "We anchor on high-volume Dallas SEO phrases while mapping nearby demand in Uptown, Plano Legacy West, Las Colinas Corporate Center, Downtown Dallas Legal District, and the Richardson Telecom Corridor.",
    },
    {
      number: 3,
      title: "Sharp Industry Hooks",
      description:
        "We hardcode insider terms — Schema.org, JSON-LD, AI Overviews, and LLM files — so search engines and AI models understand your expertise.",
    },
    {
      number: 4,
      title: "Measure & Iterate",
      description:
        "We track rankings, AI referral sessions, and conversion paths to keep content, entities, and citations compounding over time.",
    },
  ],
  technicalTitle: "Technical Foundation",
  technicalIntro:
    "The infrastructure layer that makes AI extraction and traditional ranking possible at the same time.",
  technicalSpecs: [
    "Schema.org + JSON-LD Graphs",
    "Core Web Vitals",
    "Canonical + Sitemap Governance",
    "OpenGraph + Social Metadata",
    "LLM Files (llms.txt)",
    "Semantic Heading Architecture",
    "GA4 + Search Console Instrumentation",
    "Citation-Ready Content",
  ],
  proofTitle: "Proof: ITECS Practices What We Sell",
  proofIntro:
    "Live analytics from itecsonline.com — the same playbook we run for our SEO clients.",
  proofStats: [
    { value: "23,238", label: "Active Users" },
    { value: "3×", label: "Growth in 4 Months" },
    { value: "550+", label: "AI Platform Sessions" },
    { value: "165", label: "Countries Reached" },
  ],
  proofTrafficSources: [
    { source: "Google", sessions: "16,000" },
    { source: "Bing", sessions: "2,500" },
    { source: "DuckDuckGo", sessions: "600" },
    { source: "ChatGPT.com", sessions: "300" },
    { source: "Claude.ai", sessions: "250" },
  ],
  proofDateRange: "Aug 1 – Dec 13, 2025",
  glossaryTitle: "AI-SEO Knowledge Base",
  glossaryIntro:
    "Plain-English definitions for the terms that come up in AI-optimized SEO conversations.",
  glossary: [
    {
      term: "Generative Engine Optimization (GEO)",
      definition:
        "The practice of optimizing content specifically for AI-powered search engines (like ChatGPT Search, Google AI Overviews, and Perplexity) rather than just traditional blue links.",
    },
    {
      term: "Large Language Model (LLM)",
      definition:
        "AI systems like GPT-4, Claude, and Gemini that are trained on vast amounts of text data to understand and generate human-like language.",
    },
    {
      term: "Retrieval Augmented Generation (RAG)",
      definition:
        "A technique where an AI model looks up specific, up-to-date information from a trusted external source (like your website) before generating an answer, reducing errors.",
    },
    {
      term: "Knowledge Graph",
      definition:
        "A structured database of facts (entities) and the relationships between them. Google and AI models use this to understand that \"ITECS\" is a \"Company\" located in \"Dallas\".",
    },
    {
      term: "Zero-Click Search",
      definition:
        "A search result that provides the answer directly on the results page (via a featured snippet or AI overview), so the user doesn't need to click a link.",
    },
    {
      term: "Neural Information Retrieval",
      definition:
        "Search technology that uses neural networks to understand the meaning behind a query (semantics), rather than just matching keywords.",
    },
  ],
  faq: [
    {
      question: "How is AI SEO different from traditional SEO?",
      answer:
        "Traditional SEO focuses on keywords and blue-link rankings. AI SEO focuses on entity clarity and context (who you are, what you do, and where you serve), plus structured data and answer-ready content so AI systems can confidently recommend you.",
    },
    {
      question: "Will AI SEO work for my specific industry (legal, manufacturing, etc.)?",
      answer:
        "Yes. Regulated industries often benefit the most because AI systems prioritize trust signals (experience, expertise, and verifiable credentials). We highlight your industry-specific proof and structure it so search engines and AI models understand it clearly.",
    },
    {
      question: "Does ITECS use AI to write the content?",
      answer:
        "We use AI for analysis (gap detection, intent mapping, and opportunity research), but strategy and publishing are led by humans. We do not ship unreviewed AI text; quality, accuracy, and usefulness come first.",
    },
    {
      question: "Will this help with Google AI Overviews and AI citations?",
      answer:
        "Yes. We structure content for AI extraction, implement Schema.org JSON-LD, and build citation-ready pages so your brand is eligible for AI Overviews and assistants such as ChatGPT, Claude, and Perplexity.",
    },
    {
      question: "Do you build backlinks or run link schemes?",
      answer:
        "No. ITECS avoids paid link placement, link farms, and other risky tactics. We focus on on-page optimization, technical SEO, and authoritative content that earns sustainable rankings.",
    },
    {
      question: "What do we receive from an AI-SEO audit?",
      answer:
        "You receive a prioritized roadmap covering technical fixes, content architecture, entity gaps, schema enhancements, and AI discovery improvements based on GA4, Search Console, and Core Web Vitals.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Most sites see early movement within 60–90 days, with compounding growth as content and technical improvements mature. Timelines vary by competition and current site health.",
    },
    {
      question: "Can you target Dallas–Fort Worth and my industry at the same time?",
      answer:
        "Yes. We use a widest-net strategy for Dallas SEO visibility while adding industry-specific hooks (tools, compliance terms, and workflows) to prove expertise and capture qualified traffic.",
    },
    {
      question: "Where do the three tiers fit (Foundation, Momentum, Velocity)?",
      answer:
        "Foundation is a one-time project that fixes technical SEO and content architecture so AI and search engines can interpret your site. Momentum is the monthly retainer that keeps the foundation healthy and adds content, AI visibility tracking, and one authority backlink per month. Velocity is the premium retainer that doubles content velocity, adds third-party link building, competitor monitoring, and quarterly CRO. Foundation is a prerequisite for Momentum and Velocity.",
    },
  ],
};

export interface AISEOInternalTier {
  name: string;
  price: string;
  pages: string;
  target: string;
}

export interface AISEOAddOn {
  name: string;
  price: string;
  description: string;
  volumeDiscount?: string;
}

export interface AISEODeliverableArea {
  area: string;
  description: string;
  items: string[];
}

export interface AISEOMonthlyServiceCategory {
  category: string;
  items: string[];
}

export interface AISEOPrerequisite {
  title: string;
  description: string;
}

export interface AISEOTier {
  slug: "foundation" | "momentum" | "velocity";
  name: string;
  shortName: string;
  href: string;
  title: string;
  description: string;
  keywords: string[];

  eyebrow: string;
  h1: string;
  heroSubline: string;
  heroCTA: string;

  overview: string;

  priceModel: "one-time" | "monthly";
  priceLabel: string;
  priceNumeric: number;
  priceCurrency: "USD";
  priceUnit: "USD" | "USD/mo";
  minimumTerm?: string;
  cancellationPolicy?: string;
  refundPolicy?: string;
  billingTerms?: string;
  paymentTerms?: string;
  postDeliverySupport?: string;
  proposalValidity?: string;
  projectTimeline?: string;

  internalTiers?: AISEOInternalTier[];
  internalTiersNote?: string;
  addOns?: AISEOAddOn[];
  deliverables?: AISEODeliverableArea[];

  prerequisites?: AISEOPrerequisite[];
  prerequisitesHeading?: string;
  monthlyServices?: AISEOMonthlyServiceCategory[];
  notIncluded?: string[];
  idealClient?: string[];
  upgradePath?: { headline: string; description: string; targetSlug: string; ctaText: string };

  whyItecs: string[];
  faq: { question: string; answer: string }[];

  // Card rendering on parent page
  cardTagline: string;
  cardPriceLabel: string;
  cardHighlights: string[];
  cardAccent: "cyan" | "brand" | "gradient";
}

export const AI_SEO_TIERS: AISEOTier[] = [
  {
    slug: "foundation",
    name: "SEO Foundation",
    shortName: "Foundation",
    href: "/ai-optimized-seo/foundation",
    title: "SEO Foundation Dallas | Technical Audits & Schema",
    description:
      "One-time technical SEO and AI discoverability project for Dallas businesses. Schema.org, llms.txt, Core Web Vitals, semantic content architecture. From $4,500.",
    keywords: [
      "SEO Foundation Dallas",
      "technical SEO Dallas",
      "schema markup Dallas",
      "llms.txt generation",
      "Core Web Vitals optimization Dallas",
      "AI visibility audit",
    ],
    eyebrow: "Tier 1 · One-Time Project",
    h1: "SEO Foundation for Dallas Businesses",
    heroSubline:
      "Build a flawless digital foundation. SEO Foundation includes deep technical audits, local schema architecture, and site speed optimization for Dallas.",
    heroCTA: "Schedule Foundation Consultation",
    overview:
      "SEO Foundation is a one-time project that fixes the technical SEO and content architecture issues that keep Dallas–Fort Worth businesses from ranking on Google and being cited by AI assistants. We focus on schema, Core Web Vitals, and llms.txt so your site is ready for both traditional and AI-driven discovery. Local focus includes Uptown, Legacy West, Las Colinas, and the Richardson Telecom Corridor so your location signals match how Dallas buyers search.",
    priceModel: "one-time",
    priceLabel: "From $4,500",
    priceNumeric: 4500,
    priceCurrency: "USD",
    priceUnit: "USD",
    projectTimeline: "8 weeks from kickoff",
    paymentTerms: "50% at acceptance, 50% at final delivery",
    postDeliverySupport: "30 days of email and phone support",
    proposalValidity: "30 days from proposal date",
    internalTiers: [
      {
        name: "Standard",
        price: "$4,500",
        pages: "Up to 25 pages",
        target: "Small practices and professional services",
      },
      {
        name: "Professional",
        price: "$7,000",
        pages: "26–50 pages",
        target: "Established firms and multi-location teams",
      },
      {
        name: "Enterprise",
        price: "Custom quote",
        pages: "51+ pages",
        target: "Complex sites, subdomains, and ecommerce",
      },
    ],
    internalTiersNote:
      "Blog articles using a CMS template count as 1 page (template optimization applies to all articles).",
    addOns: [
      {
        name: "Static Page",
        price: "$400 per page",
        description: "SEO-optimized copy, 1 media asset, metadata, internal linking",
        volumeDiscount: "5 static pages for $1,800",
      },
      {
        name: "Blog Article",
        price: "$250 per article",
        description: "800–1,200 words, 1 media asset, metadata, topic clustering",
        volumeDiscount: "10 blog articles for $2,250",
      },
    ],
    deliverables: [
      {
        area: "Discovery and Assessment",
        description:
          "Technical audits, AI visibility analysis, competitor research, and baseline tracking.",
        items: [
          "Core Web Vitals analysis, crawlability review, broken link discovery",
          "AI visibility audit for Google AI Overviews, ChatGPT, and Perplexity mentions",
          "Search Console and GA4 verification with conversion tracking setup",
          "Competitor keyword gap analysis and content opportunity mapping",
        ],
      },
      {
        area: "Technical Implementation",
        description:
          "Schema, Core Web Vitals improvements, metadata updates, and technical SEO fixes.",
        items: [
          "llms.txt and llms-full.txt generation for AI ingestion",
          "Schema.org JSON-LD implementation with service and FAQ markup",
          "Meta tag rewrites, canonical tags, sitemap/robots optimization",
          "Image optimization, lazy loading, and mobile readiness improvements",
        ],
      },
      {
        area: "On-Page Optimization",
        description:
          "Keyword mapping, semantic content structure, internal linking, and conversion tuning.",
        items: [
          "Keyword mapping for each core page and pillar page",
          "Semantic content restructuring for AI answer extraction",
          "Internal linking architecture and CTA conversion tuning",
          "Local SEO alignment for Dallas–Fort Worth corridors",
        ],
      },
      {
        area: "AI Discoverability Enhancements",
        description:
          "LLM files, entity optimization, and FAQ structuring for AI search visibility.",
        items: [
          "llms.txt and llms-full.txt files for AI training and runtime ingestion",
          "Entity optimization so AI models map your brand to the right categories",
          "FAQ structuring designed for AI answer extraction",
          "Before-and-after AI visibility comparison report",
        ],
      },
    ],
    whyItecs: [
      "Practitioner-led credibility with rankings that prove our playbook works in Dallas",
      "Technical superiority across schema, site speed, and secure implementation",
      "Clean SEO practices without paid links or risky shortcuts",
      "Unified security standards that align with MSP-grade infrastructure",
    ],
    faq: [
      {
        question: "Is SEO Foundation required before SEO Momentum or SEO Velocity?",
        answer:
          "Yes. SEO Foundation establishes the technical baseline required for managed SEO. If you already have a strong foundation, we can run a foundation audit to confirm readiness for $500.",
      },
      {
        question: "What access does ITECS need for a Foundation project?",
        answer:
          "We typically need Google Analytics, Search Console, CMS access, and hosting credentials so we can implement technical fixes, metadata updates, and structured data.",
      },
      {
        question: "Does SEO Foundation include content writing?",
        answer:
          "Content writing is optional. We provide add-on pricing for new pages and blog articles if you want ITECS to create SEO-optimized content.",
      },
      {
        question: "How long does the Foundation project take?",
        answer:
          "Most engagements complete in about 8 weeks from kickoff, depending on site size and implementation approvals.",
      },
      {
        question: "Will this improve AI visibility for ChatGPT and Google AI Overviews?",
        answer:
          "Yes. We implement llms.txt files, structured data, and semantic content architecture so AI platforms can interpret and cite your services.",
      },
    ],
    cardTagline: "One-time technical and AI-readiness project.",
    cardPriceLabel: "From $4,500 · one-time",
    cardHighlights: [
      "Technical audit + remediation",
      "Schema.org + llms.txt files",
      "Semantic + local content architecture",
      "Prerequisite for Momentum & Velocity",
    ],
    cardAccent: "cyan",
  },
  {
    slug: "momentum",
    name: "SEO Momentum",
    shortName: "Momentum",
    href: "/ai-optimized-seo/momentum",
    title: "SEO Momentum Dallas | Monthly AI SEO Retainer",
    description:
      "Monthly managed AI SEO for Dallas businesses with technical monitoring, 2 articles, AI visibility tracking, and 1 authority backlink for $1,750/mo.",
    keywords: [
      "managed SEO Dallas",
      "SEO retainer Dallas",
      "monthly SEO services Dallas",
      "AI visibility tracking",
      "SEO Momentum",
      "Dallas content marketing",
    ],
    eyebrow: "Tier 2 · Monthly Retainer",
    h1: "SEO Momentum — Managed Monthly SEO in Dallas",
    heroSubline:
      "Accelerate Dallas growth with SEO Momentum. Data-driven content creation and keyword targeting designed to capture high-intent North Texas traffic.",
    heroCTA: "Start SEO Momentum",
    overview:
      "SEO Momentum keeps your technical foundation healthy and expands visibility with fresh content, AI visibility tracking, and local SEO management. It is built for Dallas–Fort Worth teams in Uptown, Plano, Legacy West, Las Colinas, and the Richardson Telecom Corridor that want steady, compounding growth.",
    priceModel: "monthly",
    priceLabel: "$1,750/mo",
    priceNumeric: 1750,
    priceCurrency: "USD",
    priceUnit: "USD/mo",
    minimumTerm: "Month-to-month",
    cancellationPolicy: "30 days written notice",
    refundPolicy: "No refunds for partial months or completed work",
    billingTerms: "Invoiced on the 1st of each month, due upon receipt",
    prerequisitesHeading: "A solid foundation comes first.",
    prerequisites: [
      {
        title: "SEO Foundation completed",
        description:
          "Completed an ITECS SEO Foundation project within the last 12 months.",
      },
      {
        title: "Or pass a foundation audit",
        description:
          "ITECS confirms your technical SEO baseline meets standards (audit fee: $500).",
      },
    ],
    monthlyServices: [
      {
        category: "Technical SEO Monitoring",
        items: [
          "Continuous site health monitoring for crawl errors and indexing issues",
          "Core Web Vitals tracking and optimization recommendations",
          "Schema markup maintenance as content changes",
          "Security checks for SSL and mixed content warnings",
        ],
      },
      {
        category: "Ranking and Visibility Tracking",
        items: [
          "15–30 keyword position tracking with monthly trends",
          "Organic traffic monitoring via GA4 and Search Console",
          "Conversion tracking review for forms and phone clicks",
        ],
      },
      {
        category: "AI Visibility Tracking",
        items: [
          "AI platform checks for ChatGPT, Google AI search mode, and Claude",
          "Documentation of mentions, accuracy, and competitive positioning",
          "Quarterly audit cadence with recommendations to improve AI discoverability",
        ],
      },
      {
        category: "Content Creation",
        items: [
          "2 SEO-optimized blog articles per month (800–1,200 words)",
          "Keyword research for high-demand topics and competitive gaps",
          "Internal linking and optimized meta titles and descriptions",
        ],
      },
      {
        category: "ITECS Domain Authority Backlink",
        items: [
          "1 feature article or white paper published monthly on itecsonline.com",
          "Do-follow backlink to your site with permanent publication",
          "Formats include case studies, industry insights, and technical guides",
        ],
      },
      {
        category: "Local SEO Management",
        items: [
          "Google Business Profile optimization and posting",
          "Review monitoring and response recommendations",
          "Citation consistency tracking (NAP accuracy)",
        ],
      },
      {
        category: "Reporting and Strategy Partnership",
        items: [
          "Monthly performance report delivered by the 10th",
          "AI visibility summary and prioritized next-step recommendations",
          "Two strategy calls per month (30 minutes each)",
        ],
      },
    ],
    notIncluded: [
      "Digital PR and third-party link building",
      "Four or more blog articles per month",
      "Competitor monitoring and response strategy",
      "Conversion rate optimization audits",
      "Weekly strategy calls and dedicated account manager",
      "Multi-location SEO",
      "Google Ads or PPC management",
      "Website redesign or development",
    ],
    upgradePath: {
      headline: "Upgrade when you need aggressive growth.",
      description:
        "SEO Velocity adds doubled content velocity, third-party link building, competitor response, and CRO audits for teams ready to dominate.",
      targetSlug: "velocity",
      ctaText: "Explore SEO Velocity",
    },
    whyItecs: [
      "Practitioner-led credibility with Dallas rankings and AI visibility proof",
      "Technical SEO and AI search expertise rooted in MSP-grade infrastructure",
      "Clean SEO practices without paid link schemes",
      "Built-in backlink value through itecsonline.com authority",
    ],
    faq: [
      {
        question: "Do I need SEO Foundation before starting Momentum?",
        answer:
          "Yes. Momentum requires a strong technical baseline. If you have not completed Foundation, we can perform a foundation audit to confirm readiness for $500.",
      },
      {
        question: "How much content is included each month?",
        answer:
          "Momentum includes two SEO-optimized blog articles per month, each 800–1,200 words, plus topic research and internal linking.",
      },
      {
        question: "How often is AI visibility reviewed?",
        answer:
          "We run a quarterly AI visibility audit across platforms like ChatGPT, Google AI search mode, and Claude.",
      },
      {
        question: "What is the ITECS domain authority backlink?",
        answer:
          "Each month we publish a feature article or white paper about your business on itecsonline.com with a do-follow backlink to your site.",
      },
      {
        question: "Can I cancel at any time?",
        answer:
          "Momentum is month-to-month with a 30-day written notice. There are no refunds for partial months or completed work.",
      },
    ],
    cardTagline: "Monthly managed SEO with AI visibility tracking.",
    cardPriceLabel: "$1,750 / month · month-to-month",
    cardHighlights: [
      "2 articles + AI visibility audits",
      "15–30 keywords tracked monthly",
      "1 do-follow backlink from itecsonline.com",
      "Two 30-min strategy calls per month",
    ],
    cardAccent: "brand",
  },
  {
    slug: "velocity",
    name: "SEO Velocity",
    shortName: "Velocity",
    href: "/ai-optimized-seo/velocity",
    title: "SEO Velocity Dallas | Premium AI SEO",
    description:
      "Premium AI SEO for Dallas businesses: 4 articles, 2 ITECS backlinks, third-party link building, competitor monitoring, CRO, and weekly strategy.",
    keywords: [
      "premium SEO Dallas",
      "SEO Velocity",
      "competitive SEO Dallas",
      "third-party link building Dallas",
      "multi-location SEO Dallas",
      "CRO Dallas SEO",
    ],
    eyebrow: "Tier 3 · Premium Retainer",
    h1: "SEO Velocity — Premium AI SEO for Dallas Leaders",
    heroSubline:
      "Maximize your digital footprint in DFW. SEO Velocity delivers high-authority backlinks and AI-driven traffic automation for Dallas market dominance.",
    heroCTA: "Start SEO Velocity",
    overview:
      "SEO Velocity is built for Dallas–Fort Worth businesses that want to dominate organic search. We accelerate content velocity, expand backlink coverage, and run conversion audits so your growth compounds faster than competitors. Ideal for Uptown, Legacy West, Las Colinas, and Richardson Telecom Corridor teams ready to scale visibility across multiple locations.",
    priceModel: "monthly",
    priceLabel: "$3,500/mo",
    priceNumeric: 3500,
    priceCurrency: "USD",
    priceUnit: "USD/mo",
    minimumTerm: "6 months",
    cancellationPolicy: "30 days written notice after initial term",
    refundPolicy: "No refunds for partial months or completed work",
    billingTerms: "Invoiced on the 1st of each month, due upon receipt",
    projectTimeline: "Most clients see significant improvements within 90–120 days",
    prerequisitesHeading: "Velocity requires a strong starting line.",
    prerequisites: [
      {
        title: "Foundation completed",
        description: "SEO Foundation completed within the last 12 months.",
      },
      {
        title: "Or active Momentum client",
        description:
          "Upgrading from Momentum with 3+ months of service history.",
      },
      {
        title: "Or pass a foundation audit",
        description:
          "ITECS confirms your technical SEO baseline meets requirements (audit fee: $500).",
      },
    ],
    monthlyServices: [
      {
        category: "Accelerated Content Creation",
        items: [
          "4 SEO-optimized blog articles per month (800–1,200 words)",
          "Advanced keyword research for high-intent opportunities",
          "Topic cluster strategy and internal linking architecture",
        ],
      },
      {
        category: "ITECS Domain Authority Backlinks",
        items: [
          "2 feature articles or white papers published monthly on itecsonline.com",
          "Do-follow backlinks to your site with permanent publication",
          "Formats include case studies, industry insights, and technical guides",
        ],
      },
      {
        category: "Third-Party Link Building",
        items: [
          "Strategic outreach to authoritative industry publications",
          "Guest posting opportunities and digital PR placements",
          "Monthly backlink acquisition report with domain metrics",
        ],
      },
      {
        category: "Competitor Monitoring and Response",
        items: [
          "Monthly competitor ranking analysis (top 3–5 competitors)",
          "Content gap identification with response recommendations",
          "Backlink gap analysis to find new authority opportunities",
        ],
      },
      {
        category: "Quarterly CRO Audit",
        items: [
          "Landing page performance analysis and CTA effectiveness review",
          "Form optimization recommendations and user journey analysis",
          "A/B testing roadmap for high-traffic pages",
        ],
      },
      {
        category: "Multi-Location SEO",
        items: [
          "GBP optimization and posting for up to three locations",
          "Location landing page optimization and citation management",
          "Map pack monitoring and local keyword tracking",
        ],
      },
    ],
    idealClient: [
      "Businesses ready to invest aggressively in organic growth",
      "Teams in competitive Dallas markets needing proactive strategy",
      "Organizations with multiple locations or expansion plans",
      "Brands focused on conversion optimization, not just traffic",
      "Leaders that want dedicated account management and weekly alignment",
    ],
    whyItecs: [
      "Practitioner-led credibility with Dallas rankings and AI visibility proof",
      "Dual backlink engine combining ITECS authority and third-party outreach",
      "Clean SEO practices with white-hat link building only",
      "Conversion-focused reporting that connects traffic to revenue outcomes",
    ],
    faq: [
      {
        question: "Is there a minimum term for SEO Velocity?",
        answer:
          "Yes. SEO Velocity has a six-month minimum term so aggressive SEO strategies have time to deliver measurable results.",
      },
      {
        question: "What makes Velocity different from Momentum?",
        answer:
          "Velocity doubles content production, adds third-party link building, includes competitor monitoring, and provides quarterly CRO audits plus weekly strategy calls.",
      },
      {
        question: "What does third-party link building include?",
        answer:
          "We run white-hat outreach for guest posts, digital PR placements, and authoritative backlinks. We do not use paid link farms or PBNs.",
      },
      {
        question: "How many locations are supported?",
        answer:
          "SEO Velocity includes multi-location SEO for up to three locations, with additional locations available at $500 per month.",
      },
      {
        question: "How quickly can results appear?",
        answer:
          "Most clients see meaningful ranking improvements within 90–120 days, with continued gains as content velocity compounds.",
      },
    ],
    cardTagline: "Premium retainer for aggressive growth.",
    cardPriceLabel: "$3,500 / month · 6-mo minimum",
    cardHighlights: [
      "4 articles + 2 backlinks + 3rd-party PR",
      "50–75 keywords + monthly AI visibility",
      "Competitor monitoring + quarterly CRO",
      "Weekly strategy calls + dedicated AM",
    ],
    cardAccent: "gradient",
  },
];

// Comparison rows for SEO Velocity vs Momentum table (rendered on Velocity page)
export const AI_SEO_VELOCITY_VS_MOMENTUM = [
  { feature: "Monthly Investment", momentum: "$1,750", velocity: "$3,500" },
  { feature: "Minimum Term", momentum: "Month-to-month", velocity: "6 months" },
  { feature: "Blog Articles per Month", momentum: "2", velocity: "4" },
  { feature: "ITECS Backlink Articles", momentum: "1", velocity: "2" },
  { feature: "Third-Party Link Building", momentum: "—", velocity: "Included" },
  { feature: "Keyword Tracking", momentum: "15–30", velocity: "50–75" },
  { feature: "AI Visibility Tracking", momentum: "Quarterly", velocity: "Monthly" },
  { feature: "Competitor Monitoring", momentum: "—", velocity: "Top 3–5 rivals" },
  { feature: "CRO Audit", momentum: "—", velocity: "Quarterly" },
  { feature: "Multi-Location SEO", momentum: "—", velocity: "Up to 3 locations" },
  { feature: "Strategy Calls", momentum: "2× per month", velocity: "Weekly" },
] as const;

// ---------------------------------------------------------------------------
// Manufacturing Vertical
// ---------------------------------------------------------------------------

export interface ManufacturingUseCase {
  title: string;
  description: string;
  outcome: string;
  icon: string;
  href?: string;
  ctaLabel?: string;
}

export interface ManufacturingProofGroup {
  title: string;
  description: string;
  points: string[];
}

export interface ManufacturingMetricChart {
  eyebrow: string;
  title: string;
  description: string;
  kpis: {
    label: string;
    value: string;
    detail: string;
    tone: "risk" | "recoverable" | "watch" | "stable";
  }[];
  drivers: {
    label: string;
    value: string;
    width: number;
    tone: "risk" | "recoverable" | "watch";
  }[];
  notes: string[];
}

export interface PPVExposureWaterfall {
  eyebrow: string;
  title: string;
  description: string;
  stages: {
    label: string;
    value: string;
    detail: string;
    height: number;
    direction: "increase" | "decrease";
    tone: "risk" | "watch" | "recoverable" | "controlled";
  }[];
  windows: {
    label: string;
    exposure: string;
    detail: string;
    tone: "risk" | "watch" | "recoverable";
  }[];
  decisions: {
    action: string;
    owner: string;
    timing: string;
    detail: string;
  }[];
}

export interface ManufacturingPageContent {
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  h1: string;
  eyebrow: string;
  heroSummary: string;
  longDescription: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  keywords: string[];
  stats: { value: string; label: string }[];
  metricChart: ManufacturingMetricChart;
  pressureGroups: ManufacturingProofGroup[];
  useCases: ManufacturingUseCase[];
  assessment: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  governance: ManufacturingProofGroup[];
  faq: { question: string; answer: string }[];
}

export interface PPVAgentUseCaseContent {
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  h1: string;
  eyebrow: string;
  heroSummary: string;
  longDescription: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  keywords: string[];
  stats: { value: string; label: string }[];
  capabilities: ManufacturingProofGroup[];
  exposureWaterfall: PPVExposureWaterfall;
  dataInputs: { label: string; description: string }[];
  scenario: {
    title: string;
    problem: string;
    outcome: string;
  };
  workflow: { title: string; description: string }[];
  roadmap: { step: string; description: string }[];
  comparison: { label: string; traditional: string; ai: string }[];
  governance: string[];
  faq: { question: string; answer: string }[];
}

export type ManufacturingSpokeChartMode = "timeline" | "matrix" | "waterfall";

export interface ManufacturingSpokeChart {
  mode: ManufacturingSpokeChartMode;
  eyebrow: string;
  title: string;
  description: string;
  summaryMetric: {
    label: string;
    value: string;
    detail: string;
  };
  signals: {
    label: string;
    value: string;
    detail: string;
    score: number;
    tone: "risk" | "watch" | "recoverable" | "stable";
  }[];
  notes: string[];
}

export interface ManufacturingSpokePageContent {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  h1: string;
  eyebrow: string;
  heroSummary: string;
  longDescription: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  keywords: string[];
  stats: { value: string; label: string }[];
  pain: {
    eyebrow: string;
    title: string;
    description: string;
    proof: string;
  };
  chart: ManufacturingSpokeChart;
  capabilities: ManufacturingProofGroup[];
  scenario: {
    title: string;
    description: string;
    startingPoint: string;
    scopedOutcome: string;
  };
  dataInputs: { label: string; description: string }[];
  workflow: { title: string; description: string }[];
  governance: string[];
  roadmap: { step: string; description: string }[];
  comparison: { label: string; traditional: string; ai: string }[];
  roiStatement: string;
  pricingNotes: string[];
  security: {
    description: string;
    points: string[];
    externalLink?: { text: string; href: string };
  };
  relatedHrefs: string[];
  faq: { question: string; answer: string }[];
}

export const MANUFACTURING_CFO_SIGNAL_CHART: ManufacturingMetricChart = {
  eyebrow: "Example CFO signal board",
  title: "The Metrics a Manufacturing AI System Should Make Visible",
  description:
    "A finance-led manufacturing AI program should give executives a daily view of margin exposure, recoverable cost movement, cash tied up in inventory, and operational risk. These example figures are illustrative; discovery replaces them with the client's actual ERP, BI, contract, and plant data.",
  kpis: [
    {
      label: "Projected PPV exposure",
      value: "$1.84M",
      detail: "Next 90 days against current standards",
      tone: "risk",
    },
    {
      label: "Recoverable pass-through",
      value: "$510K",
      detail: "Variance tied to customer escalator language",
      tone: "recoverable",
    },
    {
      label: "Inventory cash at risk",
      value: "$3.2M",
      detail: "Aging, excess, and commodity-sensitive positions",
      tone: "watch",
    },
    {
      label: "Margin protected",
      value: "1.1 pts",
      detail: "Modeled impact of approved actions",
      tone: "stable",
    },
  ],
  drivers: [
    {
      label: "Material price",
      value: "+$1.20M",
      width: 92,
      tone: "risk",
    },
    {
      label: "Freight and energy",
      value: "+$420K",
      width: 58,
      tone: "risk",
    },
    {
      label: "FX and basis",
      value: "+$180K",
      width: 34,
      tone: "watch",
    },
    {
      label: "Supplier mix",
      value: "-$260K",
      width: 44,
      tone: "recoverable",
    },
    {
      label: "Pass-through candidate",
      value: "-$510K",
      width: 66,
      tone: "recoverable",
    },
  ],
  notes: [
    "Ties PPV to SKU, plant, customer program, and contract terms",
    "Separates true margin erosion from recoverable customer pass-throughs",
    "Routes purchase, hedge, and standard-cost recommendations for approval",
  ],
};

export const PPV_EXPOSURE_WATERFALL: PPVExposureWaterfall = {
  eyebrow: "PPV exposure model",
  title: "A Waterfall View of What Finance Can Act On Next",
  description:
    "This illustrative waterfall shows how the agent separates adverse cost movement from recoverable variance, then turns the remaining exposure into an approval queue for finance, procurement, and sales leaders.",
  stages: [
    {
      label: "Open commitments vs. standards",
      value: "$1.84M",
      detail: "Unfavorable exposure before recovery or approved actions",
      height: 92,
      direction: "increase",
      tone: "risk",
    },
    {
      label: "Freight, energy, and basis",
      value: "+$420K",
      detail: "Landed-cost movement not captured in material standards",
      height: 56,
      direction: "increase",
      tone: "watch",
    },
    {
      label: "Supplier formula drift",
      value: "+$190K",
      detail: "Vendor prices outside expected index or rebate behavior",
      height: 34,
      direction: "increase",
      tone: "risk",
    },
    {
      label: "Customer pass-through candidate",
      value: "-$510K",
      detail: "Variance with contract language that may support recovery",
      height: 68,
      direction: "decrease",
      tone: "recoverable",
    },
    {
      label: "Approved forward-buy offset",
      value: "-$310K",
      detail: "Modeled reduction from actions already routed for approval",
      height: 48,
      direction: "decrease",
      tone: "controlled",
    },
    {
      label: "Net unresolved margin risk",
      value: "$1.63M",
      detail: "Remaining exposure requiring pricing, sourcing, or standard-cost review",
      height: 80,
      direction: "increase",
      tone: "risk",
    },
  ],
  windows: [
    {
      label: "Next 30 days",
      exposure: "$440K",
      detail: "Close-period commentary and urgent recovery candidates",
      tone: "risk",
    },
    {
      label: "Next 90 days",
      exposure: "$1.63M",
      detail: "Open commitment exposure after modeled offsets",
      tone: "watch",
    },
    {
      label: "Recoverable review",
      exposure: "$510K",
      detail: "Customer contracts requiring finance and sales validation",
      tone: "recoverable",
    },
  ],
  decisions: [
    {
      action: "Validate escalator recovery",
      owner: "Finance + Sales",
      timing: "This week",
      detail:
        "Review three customer programs where commodity movement may qualify for pass-through.",
    },
    {
      action: "Review supplier formula drift",
      owner: "Procurement",
      timing: "48 hours",
      detail:
        "Compare invoice pricing against contracted index, basis, freight, and rebate terms.",
    },
    {
      action: "Approve standard-cost update draft",
      owner: "Controller",
      timing: "Before close",
      detail:
        "Use forward curves and actual receipt history to prevent stale standards in next-period reporting.",
    },
  ],
};

export const MANUFACTURING_VERTICAL: ManufacturingPageContent = {
  title: "AI Solutions for Manufacturing Finance and Operations",
  shortTitle: "Manufacturing AI",
  description:
    "Secure manufacturing AI to protect margin, improve working capital, forecast risk, and connect ERP, BI, plant, procurement, and quality data.",
  href: "/manufacturing",
  h1: "AI Solutions for Manufacturing Finance and Operations",
  eyebrow: "Manufacturing AI from the ITECS Dallas team",
  heroSummary:
    "ITECS helps manufacturers turn ERP, BI, plant, procurement, quality, and contract data into governed AI workflows that protect margin, improve working capital, and surface operational risk before the close.",
  longDescription:
    "Manufacturing leaders do not need generic AI demos. They need systems that can explain margin movement, connect finance and operations data, respect approval controls, and support decisions across plants, suppliers, customers, and production programs.",
  primaryCta: "Manufacturing AI Readiness Assessment",
  primaryCtaHref: "/contact",
  secondaryCta: "Explore the PPV Agent",
  secondaryCtaHref: "/manufacturing/ppv-agent",
  keywords: [
    "manufacturing AI solutions",
    "AI for manufacturing finance",
    "AI for manufacturing operations",
    "manufacturing AI readiness assessment",
    "AI for process manufacturing",
    "AI for discrete manufacturing",
    "manufacturing AI consulting",
  ],
  stats: [
    { value: "ERP", label: "Finance and procurement signals" },
    { value: "Plant", label: "Operations, quality, and yield context" },
    { value: "BI", label: "Power BI and executive reporting layers" },
  ],
  metricChart: MANUFACTURING_CFO_SIGNAL_CHART,
  pressureGroups: [
    {
      title: "Finance pressure",
      description:
        "Manufacturing finance teams are asked to explain margin movement while commodity costs, supplier terms, freight, mix, and customer programs move faster than month-end reporting.",
      points: [
        "Purchase price variance and commodity swings",
        "Working capital tied up in raw, WIP, and finished inventory",
        "Customer chargebacks, rebates, and pass-through leakage",
        "SKU, plant, customer, and program margin erosion",
      ],
    },
    {
      title: "Operations pressure",
      description:
        "Plant leaders manage uptime, changeovers, yield, quality holds, labor gaps, and schedule volatility with data that often lives outside the finance view.",
      points: [
        "Machine downtime, maintenance risk, and changeover losses",
        "Scrap, rework, spoilage, and quality investigations",
        "Production schedule volatility and labor constraints",
        "Warranty, field issue, and supplier quality patterns",
      ],
    },
    {
      title: "Data pressure",
      description:
        "AI only becomes useful when ERP, BI, plant, quality, contract, and supplier data can be trusted, governed, and connected to the decisions executives already own.",
      points: [
        "Discrete manufacturing parts, routings, suppliers, and warranty data",
        "Process manufacturing formulas, BOMs, lot traceability, and quality records",
        "BatchMaster/SAP, Power BI, spreadsheets, contracts, and market data",
        "Role-based access, audit logs, and human approval boundaries",
      ],
    },
  ],
  useCases: [
    {
      title: "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence",
      description:
        "Decompose historical PPV, project forward exposure, identify recoverable pass-throughs, and prepare finance-ready recommendations for approval.",
      outcome: "Margin protection and faster close commentary",
      icon: "BadgeDollarSign",
      href: "/manufacturing/ppv-agent",
      ctaLabel: "View PPV use case",
    },
    {
      title: "Predictive Maintenance and Downtime Forecasting",
      description:
        "Use machine, maintenance, and production signals to identify line risk before unplanned downtime disrupts throughput.",
      outcome: "Higher uptime and better capacity planning",
      icon: "Activity",
      href: "/manufacturing/predictive-maintenance-ai",
      ctaLabel: "View maintenance use case",
    },
    {
      title: "Demand Forecasting and S&OP Intelligence",
      description:
        "Connect customer demand, order history, macro signals, and production constraints into forecast scenarios leaders can interrogate.",
      outcome: "Better production and inventory decisions",
      icon: "LineChart",
      href: "/manufacturing/demand-forecasting-sop-ai",
      ctaLabel: "View forecasting use case",
    },
    {
      title: "Quality, Traceability, and Recall Risk Intelligence",
      description:
        "Surface unusual defect, hold, supplier, lot, warranty, or inspection patterns earlier and keep traceability evidence usable.",
      outcome: "Lower rework, chargebacks, and recall exposure",
      icon: "ScanSearch",
      href: "/manufacturing/quality-traceability-ai",
      ctaLabel: "View quality use case",
    },
    {
      title: "Inventory and Working Capital Optimization",
      description:
        "Identify excess, short, aging, and risk-weighted inventory positions across raw materials, WIP, finished goods, and critical parts.",
      outcome: "Cash released without starving production",
      icon: "Boxes",
      href: "/manufacturing/inventory-working-capital-ai",
      ctaLabel: "View inventory use case",
    },
    {
      title: "Customer and SKU Profitability Intelligence",
      description:
        "Trace margin by customer, SKU, plant, program, and service requirement so finance can see which growth is actually profitable.",
      outcome: "Cleaner pricing and customer margin decisions",
      icon: "ChartNoAxesCombined",
      href: "/manufacturing/customer-sku-profitability-ai",
      ctaLabel: "View profitability use case",
    },
    {
      title: "Production Scheduling, Yield, and Labor Planning",
      description:
        "Connect schedule, labor, yield, and line-performance data so planners can see bottlenecks before the shift starts.",
      outcome: "More predictable throughput with the same team",
      icon: "UsersRound",
      href: "/manufacturing/production-scheduling-yield-ai",
      ctaLabel: "View production use case",
    },
    {
      title: "Contract Intelligence and Pass-Through Recovery",
      description:
        "Review customer and supplier agreements for escalators, audit rights, renewal windows, and recoverable cost movement.",
      outcome: "Less margin leakage hidden in contract language",
      icon: "FileSearch",
      href: "/manufacturing/contract-pass-through-intelligence",
      ctaLabel: "View contract use case",
    },
    {
      title: "Energy, Freight, and Scope 3 Reporting Intelligence",
      description:
        "Combine utility, lane, carrier, packaging, and supplier signals into executive cost and customer reporting views.",
      outcome: "Better cost control and customer evidence",
      icon: "Truck",
      href: "/manufacturing/energy-freight-scope-3-ai",
      ctaLabel: "View cost intelligence use case",
    },
    {
      title: "Vendor Payment and Finance Anomaly Detection",
      description:
        "Find duplicate payments, vendor master drift, unusual terms, and approval exceptions before they become close or audit problems.",
      outcome: "Cleaner finance operations and fewer leakage points",
      icon: "ShieldCheck",
      href: "/manufacturing/vendor-payment-anomaly-ai",
      ctaLabel: "View anomaly use case",
    },
  ],
  assessment: {
    eyebrow: "Start here",
    title: "Manufacturing AI Readiness Assessment",
    description:
      "ITECS starts by mapping the business case, data readiness, integration path, and governance model before recommending an agent build.",
    steps: [
      {
        title: "Map executive priorities",
        description:
          "Identify the finance, operations, quality, supply chain, and IT decisions where better signals would change action.",
      },
      {
        title: "Review the data landscape",
        description:
          "Assess ERP, BI, plant, quality, procurement, contract, and spreadsheet sources for ownership, cleanliness, access, and gaps.",
      },
      {
        title: "Rank use cases by economics",
        description:
          "Prioritize use cases by measurable margin, working capital, throughput, risk reduction, and implementation feasibility.",
      },
      {
        title: "Define the governed path",
        description:
          "Document security, approval, audit, deployment, and support requirements before any production AI system is built.",
      },
    ],
  },
  governance: [
    {
      title: "Read broadly, act carefully",
      description:
        "Manufacturing AI can read across systems, but sensitive actions need explicit human approval and audit history.",
      points: [
        "No autonomous purchasing, hedging, journal entries, or master-data changes",
        "Role-based access aligned to the client's identity provider",
        "Recommendation logs that preserve assumptions, source data, and reviewer decisions",
      ],
    },
    {
      title: "Built for IT reality",
      description:
        "ITECS designs around the systems manufacturers already run, from ERP and BI to plant data and Microsoft 365.",
      points: [
        "Cloud, hybrid, and Microsoft-stack deployment patterns",
        "Integration-first discovery before custom development",
        "Ongoing managed AI operations available after launch",
      ],
    },
  ],
  faq: [
    {
      question: "What types of manufacturers can use ITECS manufacturing AI services?",
      answer:
        "ITECS works across discrete and process manufacturing. The hub examples cover parts, machines, suppliers, production schedules, formulas, BOMs, lot traceability, quality holds, commodity exposure, and customer contracts.",
    },
    {
      question: "Is this only for manufacturers in Dallas?",
      answer:
        "No. The offer is national. Dallas is used as a credibility signal because ITECS is a Dallas-based MSP with more than two decades of infrastructure, cybersecurity, and operations experience.",
    },
    {
      question: "Do we need a clean data warehouse before starting?",
      answer:
        "No. The readiness assessment determines whether existing ERP, BI, spreadsheet, contract, and plant data is enough for a pilot or whether data cleanup must happen first.",
    },
    {
      question: "Can ITECS work with our ERP and Power BI setup?",
      answer:
        "Yes. ITECS evaluates the client's ERP, BI, and reporting architecture during discovery. BatchMaster/SAP, Microsoft-stack BI, SQL-backed systems, and Power BI reporting patterns are all plausible starting points.",
    },
    {
      question: "What is the best first AI use case for a manufacturer?",
      answer:
        "The best first use case is the one with clean enough data, an executive owner, and measurable economics. For many finance-led manufacturers, PPV and commodity cost intelligence are strong first candidates.",
    },
  ],
};

export const PPV_AGENT_USE_CASE: PPVAgentUseCaseContent = {
  title: "PPV Agent: Purchase Price Variance and Commodity Cost Intelligence",
  shortTitle: "PPV Agent",
  description:
    "Governed PPV agent for purchase price variance, commodity cost intelligence, forward exposure modeling, pass-through tracking, and finance commentary.",
  href: "/manufacturing/ppv-agent",
  h1: "PPV Agent for Manufacturing Finance",
  eyebrow: "Purchase Price Variance and Commodity Cost Intelligence",
  heroSummary:
    "The PPV agent continuously answers whether manufacturing teams are paying what they expected, why variance moved, what exposure is coming next, and which actions need human approval.",
  longDescription:
    "Built for finance, procurement, and operations leaders, the PPV agent turns purchase transactions, standards, BOMs or formulas, vendor terms, customer pass-throughs, and BI reporting into traceable variance analysis and forward-looking exposure views.",
  primaryCta: "Schedule a PPV Agent Discovery Workshop",
  primaryCtaHref: "/contact",
  secondaryCta: "Start with a Manufacturing AI Readiness Assessment",
  secondaryCtaHref: "/manufacturing",
  keywords: [
    "PPV agent",
    "purchase price variance AI",
    "manufacturing PPV analysis",
    "commodity cost intelligence",
    "AI for purchase price variance",
    "manufacturing finance AI agent",
    "BatchMaster SAP Power BI PPV",
  ],
  stats: [
    { value: "Daily", label: "PPV pulse for finance and procurement" },
    { value: "1-6 mo", label: "Forward exposure views" },
    { value: "Human", label: "Approval before financial action" },
  ],
  exposureWaterfall: PPV_EXPOSURE_WATERFALL,
  capabilities: [
    {
      title: "Continuous PPV decomposition",
      description:
        "Move beyond a single unfavorable variance number and attribute movement to the drivers finance and procurement can act on.",
      points: [
        "Price, timing, vendor mix, freight, FX, basis, plant, SKU, and customer program views",
        "Month-end commentary drafts with traceable assumptions",
        "Exception lists for the contracts, vendors, and materials driving the largest movement",
      ],
    },
    {
      title: "Forward exposure modeling",
      description:
        "Turn open commitments, current standards, and forecast demand into projected PPV before the close surprises the business.",
      points: [
        "One, three, and six month exposure snapshots",
        "Scenario prompts for commodity, freight, FX, demand, and customer mix changes",
        "Standard cost recommendation drafts for review",
      ],
    },
    {
      title: "Contract and pass-through intelligence",
      description:
        "Connect adverse variance to the customer and supplier terms that determine whether margin can be recovered.",
      points: [
        "Customer escalator and pass-through clause tracking",
        "Vendor formula and rebate drift detection",
        "Approval-ready escalation summaries for finance, procurement, and sales leaders",
      ],
    },
  ],
  dataInputs: [
    {
      label: "ERP procurement transactions",
      description:
        "Purchase orders, goods receipts, invoices, vendors, plants, materials, quantities, prices, and currencies.",
    },
    {
      label: "Standard cost and BOM/formula data",
      description:
        "Material standards, revision history, finished-good BOMs, process formulas, yield factors, and packaging components.",
    },
    {
      label: "Commitments and forecasts",
      description:
        "Open contracts, purchase commitments, production schedules, demand forecasts, and inventory positions.",
    },
    {
      label: "Contracts and pass-through terms",
      description:
        "Customer pricing clauses, supplier formulas, rebate structures, renewal dates, audit rights, and escalation triggers.",
    },
    {
      label: "Market and landed-cost signals",
      description:
        "Commodity reference data, freight, energy, FX, basis, and other indices that influence landed cost.",
    },
    {
      label: "Power BI and close artifacts",
      description:
        "Existing semantic models, variance dashboards, month-end commentary, and executive reporting packages when usable.",
    },
  ],
  scenario: {
    title: "Anonymized mid-market manufacturing scenario",
    problem:
      "A manufacturer running BatchMaster/SAP and Power BI wants to reproduce 12-24 months of historical PPV, explain unfavorable movement by commodity, vendor, plant, SKU, and customer program, and understand exposure before month-end.",
    outcome:
      "ITECS scopes a governed PPV agent that connects purchase transactions, standards, BOMs or formulas, contract terms, and Power BI reporting into daily variance pulses, forward exposure models, and approval-ready recommendations.",
  },
  workflow: [
    {
      title: "Ingest",
      description:
        "Read approved ERP, BI, contract, forecast, and market data without changing operational or financial records.",
    },
    {
      title: "Decompose",
      description:
        "Attribute PPV movement across price, timing, vendor, plant, freight, FX, mix, SKU, and customer program drivers.",
    },
    {
      title: "Project",
      description:
        "Model forward exposure against standards, commitments, market assumptions, demand, and production schedules.",
    },
    {
      title: "Recommend",
      description:
        "Draft standard-cost, procurement, pass-through, hedge, or escalation recommendations with source-backed rationale.",
    },
    {
      title: "Approve",
      description:
        "Route sensitive actions to the right human owner with audit logs before any PO, hedge, journal entry, or master-data change.",
    },
  ],
  roadmap: [
    {
      step: "Discovery workshop",
      description:
        "Confirm PPV methodology, data sources, approval matrix, BatchMaster/SAP setup, Power BI reporting model, and business case.",
    },
    {
      step: "Historical PPV reproduction",
      description:
        "Rebuild 12-24 months of variance and reconcile the agent's output against finance's close package.",
    },
    {
      step: "Forward exposure model",
      description:
        "Add open commitments, demand or production forecasts, standards, and market assumptions so finance sees future risk.",
    },
    {
      step: "Recommendation workflow",
      description:
        "Add human-in-the-loop recommendations, weekly review, month-end commentary drafts, and governed approval paths.",
    },
  ],
  comparison: [
    {
      label: "Variance timing",
      traditional: "Explained after close",
      ai: "Tracked daily with forward exposure",
    },
    {
      label: "Root cause",
      traditional: "Manual spreadsheet bridges",
      ai: "Driver-level decomposition by source data",
    },
    {
      label: "Contract recovery",
      traditional: "Reviewed ad hoc",
      ai: "Pass-through and escalator candidates flagged",
    },
    {
      label: "Recommendations",
      traditional: "Finance and procurement meetings",
      ai: "Approval-ready actions with rationale",
    },
    {
      label: "Governance",
      traditional: "Email approvals and unclear assumptions",
      ai: "Versioned assumptions and audit logs",
    },
  ],
  governance: [
    "The agent is read-heavy and write-controlled: it can analyze, draft, flag, model, and recommend.",
    "It does not autonomously place POs, execute hedges, post journal entries, update standard costs, or change vendor master data.",
    "All recommendations preserve the source data, assumptions, model context, confidence level, and human reviewer decision.",
    "SOX-relevant outputs follow the same approval and evidence expectations as other close or ledger-adjacent work.",
  ],
  faq: [
    {
      question: "What is purchase price variance?",
      answer:
        "Purchase price variance, or PPV, is the difference between what a manufacturer expected to pay for materials or components and what it actually paid. It is usually measured against standard cost and can be driven by commodity movement, vendor terms, freight, FX, timing, mix, or sourcing decisions.",
    },
    {
      question: "What does a PPV agent do?",
      answer:
        "A PPV agent reads approved procurement, finance, BOM or formula, contract, forecast, and market data to decompose historical variance, project forward exposure, flag anomalies, and prepare recommendations for human approval.",
    },
    {
      question: "Can the PPV agent work with BatchMaster/SAP and Power BI?",
      answer:
        "Yes, that is a realistic discovery pattern. The first step is to confirm the BatchMaster/SAP configuration, database or API access, Power BI semantic model quality, and how finance currently calculates PPV.",
    },
    {
      question: "Does the agent execute purchases or hedges automatically?",
      answer:
        "No. The PPV agent can prepare purchase, hedge, standard-cost, pass-through, or escalation recommendations, but sensitive financial and procurement actions require human approval and existing controls.",
    },
    {
      question: "What data is needed for a PPV discovery workshop?",
      answer:
        "ITECS typically asks for PPV methodology, sample variance reports, purchase lines, receipts, invoices, standards, BOMs or formulas, vendor terms, customer pass-through clauses, open commitments, and Power BI reporting context.",
    },
    {
      question: "Can it connect PPV to customer pass-through clauses?",
      answer:
        "Yes. When customer agreements and pricing terms are available, the agent can identify which unfavorable variances may be recoverable through escalators or pass-through language and which represent true margin erosion.",
    },
  ],
};

export const MANUFACTURING_SPOKE_PAGES: ManufacturingSpokePageContent[] = [
  {
    slug: "demand-forecasting-sop-ai",
    title: "Manufacturing Demand Forecasting & S&OP AI",
    shortTitle: "Demand & S&OP",
    description:
      "Manufacturing AI for demand forecasting, S&OP scenarios, inventory exposure, service risk, and production planning decisions.",
    href: "/manufacturing/demand-forecasting-sop-ai",
    h1: "Demand Forecasting and S&OP Intelligence for Manufacturing",
    eyebrow: "Manufacturing AI for forecast confidence",
    heroSummary:
      "ITECS helps manufacturers connect order history, customer demand, inventory, production constraints, and market signals into governed S&OP intelligence leaders can question before they commit cash, capacity, or supplier volume.",
    longDescription:
      "The goal is not a prettier forecast. The goal is a planning system that shows where demand uncertainty will affect service levels, working capital, plant utilization, purchasing exposure, and customer commitments.",
    primaryCta: "Plan a Demand Forecasting Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "manufacturing demand forecasting AI",
      "S&OP AI for manufacturers",
      "AI sales and operations planning",
      "manufacturing forecast accuracy",
      "AI production planning",
    ],
    stats: [
      { value: "Daily", label: "forecast confidence changes" },
      { value: "SKU", label: "customer and program visibility" },
      { value: "S&OP", label: "scenario-ready planning views" },
    ],
    pain: {
      eyebrow: "Planning pressure",
      title: "Forecast Error Becomes Inventory, Expedite Cost, or Missed Service",
      description:
        "Manufacturers often run S&OP from static demand files, spreadsheet overrides, and disconnected production assumptions. By the time forecast error is visible, purchasing, labor, and customer commitments may already be locked.",
      proof:
        "A governed forecasting agent should explain what changed, which demand signal moved, what confidence band applies, and how the change affects inventory, production, procurement, and customer service.",
    },
    chart: {
      mode: "timeline",
      eyebrow: "Illustrative forecast signal",
      title: "Forecast Confidence by Planning Horizon",
      description:
        "A planning view should separate near-term order certainty from mid-term customer volatility and long-range capacity risk.",
      summaryMetric: {
        label: "At-risk demand",
        value: "$4.8M",
        detail: "Open revenue tied to low-confidence forecast bands",
      },
      signals: [
        {
          label: "Firm orders",
          value: "93%",
          detail: "Next 14 days supported by customer orders",
          score: 93,
          tone: "stable",
        },
        {
          label: "Promotion and program lift",
          value: "71%",
          detail: "Demand sensitive to customer mix and timing",
          score: 71,
          tone: "watch",
        },
        {
          label: "Supplier-constrained SKUs",
          value: "$1.2M",
          detail: "Forecast demand exposed to constrained inputs",
          score: 58,
          tone: "risk",
        },
        {
          label: "Recoverable inventory plan",
          value: "$740K",
          detail: "Safety stock that can be reduced with confidence",
          score: 66,
          tone: "recoverable",
        },
      ],
      notes: [
        "Shows forecast confidence by SKU, customer, plant, and horizon",
        "Connects demand changes to inventory, procurement, and capacity decisions",
        "Keeps planner overrides visible instead of burying them in spreadsheet versions",
      ],
    },
    capabilities: [
      {
        title: "Demand signal fusion",
        description:
          "Combine order history, customer programs, seasonality, promotions, macro signals, and planner overrides into one governed planning view.",
        points: [
          "Forecast confidence bands by SKU, customer, plant, and horizon",
          "Outlier detection for sudden demand shifts and abnormal order patterns",
          "Planner override tracking with rationale and version history",
        ],
      },
      {
        title: "S&OP scenario modeling",
        description:
          "Translate demand changes into operational scenarios before leaders commit capacity, labor, inventory, or supplier volume.",
        points: [
          "What-if scenarios for demand upside, shortfall, supplier delay, and capacity limits",
          "Projected impact on service levels, inventory, cash, and line utilization",
          "Executive-ready summaries for S&OP meetings",
        ],
      },
      {
        title: "Procurement and inventory alignment",
        description:
          "Connect forecast movement to purchasing exposure, safety stock, and raw material commitments.",
        points: [
          "Demand-driven raw material and component exposure views",
          "Early warnings for expedited freight and service risk",
          "Links to PPV and working capital use cases",
        ],
      },
    ],
    scenario: {
      title: "Anonymized S&OP scenario",
      description:
        "A manufacturer with customer concentration and long material lead times needs a better way to see which forecast changes will turn into cash or service problems.",
      startingPoint:
        "Demand planning runs through ERP exports, Power BI reports, and manual spreadsheet adjustments that are not consistently connected to procurement or production constraints.",
      scopedOutcome:
        "ITECS scopes a demand intelligence layer that reconciles forecast versions, flags confidence changes, and produces S&OP scenarios for finance, supply chain, and operations review.",
    },
    dataInputs: [
      {
        label: "Orders and shipment history",
        description:
          "Customer orders, shipments, cancellations, lead times, demand history, and seasonality.",
      },
      {
        label: "Forecast and planner overrides",
        description:
          "Baseline forecasts, account-level changes, promotion assumptions, and manual adjustments.",
      },
      {
        label: "Inventory and commitments",
        description:
          "Raw, WIP, finished goods, safety stock, open purchase orders, and supplier lead times.",
      },
      {
        label: "Production constraints",
        description:
          "Capacity, line rates, changeovers, labor assumptions, bottlenecks, and maintenance windows.",
      },
      {
        label: "Customer and market signals",
        description:
          "Customer programs, foodservice or retail signals, weather, regional demand, and macro indicators when relevant.",
      },
    ],
    workflow: [
      {
        title: "Ingest",
        description:
          "Read approved demand, order, inventory, procurement, and production data.",
      },
      {
        title: "Compare",
        description:
          "Detect changes between forecast versions, actual orders, and planner overrides.",
      },
      {
        title: "Model",
        description:
          "Generate confidence bands and scenario impacts for service, inventory, and capacity.",
      },
      {
        title: "Explain",
        description:
          "Draft S&OP commentary with source-backed assumptions and affected SKUs or customers.",
      },
      {
        title: "Approve",
        description:
          "Route production, procurement, and inventory recommendations to the right human owners.",
      },
    ],
    governance: [
      "The system can recommend forecast changes, but planners approve the demand plan.",
      "The system does not autonomously change customer commitments, production schedules, or purchase orders.",
      "All assumptions, overrides, and scenario inputs remain visible for executive review.",
      "Role-based access separates account, finance, supply chain, and plant-level views.",
    ],
    roadmap: [
      {
        step: "Forecast method review",
        description:
          "Document current forecast sources, planner overrides, S&OP cadence, and pain points.",
      },
      {
        step: "Historical backtest",
        description:
          "Compare model output against prior demand periods and known misses.",
      },
      {
        step: "Scenario cockpit",
        description:
          "Add planning scenarios for capacity, inventory, procurement, and service levels.",
      },
      {
        step: "S&OP workflow",
        description:
          "Embed approvals, commentary, and decision records into the planning cadence.",
      },
    ],
    comparison: [
      {
        label: "Planning cadence",
        traditional: "Monthly forecast refresh",
        ai: "Continuous signal changes with S&OP-ready summaries",
      },
      {
        label: "Forecast confidence",
        traditional: "Single number by SKU",
        ai: "Confidence bands by horizon and driver",
      },
      {
        label: "Scenario impact",
        traditional: "Manual meeting prep",
        ai: "Modeled effect on service, inventory, capacity, and cash",
      },
      {
        label: "Overrides",
        traditional: "Hidden in spreadsheet versions",
        ai: "Tracked with owner, rationale, and timing",
      },
    ],
    roiStatement:
      "The value is better commitment discipline: less excess inventory, fewer expedites, clearer service risk, and faster executive decisions when demand changes.",
    pricingNotes: [
      "Discovery starts with historical forecast accuracy and the current S&OP process",
      "The first proof point is a backtest against prior demand periods",
      "Production recommendations remain human-approved",
    ],
    security: {
      description:
        "Demand planning can expose customer, pricing, production, and inventory data. ITECS scopes access so each role sees the planning signals they are allowed to use.",
      points: [
        "Read-only discovery before production workflow integration",
        "Versioned demand assumptions and planner overrides",
        "No autonomous changes to customer commitments, production schedules, or purchase orders",
        "Audit history for forecast recommendations and approvals",
      ],
    },
    relatedHrefs: [
      "/manufacturing/ppv-agent",
      "/manufacturing/inventory-working-capital-ai",
      "/manufacturing/production-scheduling-yield-ai",
    ],
    faq: [
      {
        question: "What makes AI demand forecasting different from a normal forecast report?",
        answer:
          "The agent does not just show a forecast number. It explains signal changes, confidence bands, planner overrides, and the operational impact on service, inventory, purchasing, and capacity.",
      },
      {
        question: "Does this replace the S&OP team?",
        answer:
          "No. It supports the S&OP team with better evidence, scenario modeling, and faster commentary. Planners and executives still approve the plan.",
      },
      {
        question: "Can this work before we have a perfect data warehouse?",
        answer:
          "Yes, if the right order, shipment, forecast, inventory, and production data can be accessed and reconciled for a focused pilot.",
      },
      {
        question: "What data is needed for a demand forecasting AI pilot?",
        answer:
          "A focused pilot typically starts with order history, shipment history, current forecasts, planner overrides, inventory, supplier lead times, production constraints, and any customer or market signals already used in planning.",
      },
      {
        question: "Can this work with ERP and Power BI reporting?",
        answer:
          "Yes. ITECS reviews the ERP, Power BI semantic model, spreadsheet planning files, and source-system ownership during discovery before recommending the integration pattern.",
      },
      {
        question: "How does demand forecasting connect to PPV?",
        answer:
          "Demand changes affect purchase commitments and material exposure. Linking demand forecasting to PPV helps finance see whether forecast movement will create future unfavorable variance.",
      },
    ],
  },
  {
    slug: "predictive-maintenance-ai",
    title: "Predictive Maintenance AI for Manufacturers",
    shortTitle: "Predictive Maintenance",
    description:
      "Manufacturing AI for downtime forecasting, asset risk prioritization, work-order intelligence, and maintenance decision support.",
    href: "/manufacturing/predictive-maintenance-ai",
    h1: "Predictive Maintenance and Downtime Forecasting",
    eyebrow: "Manufacturing AI for asset reliability",
    heroSummary:
      "ITECS helps manufacturers turn machine, maintenance, production, and quality signals into downtime risk intelligence so plant leaders can prioritize work before a critical line loses capacity.",
    longDescription:
      "Predictive maintenance is not useful when it only produces sensor alerts. It becomes valuable when it connects asset risk to production schedule, labor availability, quality risk, spare parts, and the financial cost of downtime.",
    primaryCta: "Plan a Maintenance AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "predictive maintenance AI manufacturing",
      "downtime forecasting AI",
      "manufacturing asset reliability AI",
      "AI maintenance planning",
      "plant downtime intelligence",
    ],
    stats: [
      { value: "Asset", label: "health and risk scoring" },
      { value: "Line", label: "downtime impact context" },
      { value: "CMMS", label: "work-order intelligence" },
    ],
    pain: {
      eyebrow: "Reliability pressure",
      title: "Downtime Risk Is Usually Visible Somewhere Before the Line Stops",
      description:
        "Maintenance teams often see warning signs across sensor readings, work orders, operator notes, quality drift, and production performance. The challenge is connecting those signals early enough to prioritize action.",
      proof:
        "A maintenance intelligence agent should rank risk by asset, line, production impact, spare-part readiness, and confidence instead of flooding teams with disconnected alerts.",
    },
    chart: {
      mode: "matrix",
      eyebrow: "Illustrative asset risk matrix",
      title: "Downtime Risk by Asset and Production Impact",
      description:
        "A plant-ready view should show which assets deserve attention first because they combine failure probability with production consequence.",
      summaryMetric: {
        label: "Capacity at risk",
        value: "18 hrs",
        detail: "Modeled line time exposed over the next two weeks",
      },
      signals: [
        {
          label: "Mixer drive assembly",
          value: "High",
          detail: "Rising vibration and recurring work-order notes",
          score: 88,
          tone: "risk",
        },
        {
          label: "Packaging line servo",
          value: "Watch",
          detail: "Cycle-time drift during high-volume runs",
          score: 64,
          tone: "watch",
        },
        {
          label: "Chiller compressor",
          value: "Stable",
          detail: "No material deviation from operating envelope",
          score: 32,
          tone: "stable",
        },
        {
          label: "Spare parts readiness",
          value: "72%",
          detail: "Critical spares available for flagged work",
          score: 72,
          tone: "recoverable",
        },
      ],
      notes: [
        "Combines asset health with production schedule impact",
        "Prioritizes maintenance actions by consequence, not alert volume",
        "Keeps work-order recommendations routed through existing approval paths",
      ],
    },
    capabilities: [
      {
        title: "Asset risk scoring",
        description:
          "Rank equipment by failure likelihood, production consequence, quality impact, and maintenance readiness.",
        points: [
          "Machine, work-order, operator, and production-signal analysis",
          "Asset-level risk scores with confidence and supporting evidence",
          "Downtime cost context for finance and operations",
        ],
      },
      {
        title: "Work-order intelligence",
        description:
          "Help maintenance leaders decide which work orders need attention before they become line events.",
        points: [
          "Recurring issue detection across historical work orders",
          "Spare-part and labor readiness checks",
          "Drafted maintenance recommendations for supervisor review",
        ],
      },
      {
        title: "Schedule-aware maintenance",
        description:
          "Connect maintenance risk to production schedule, customer commitments, and changeover windows.",
        points: [
          "Maintenance timing options based on line utilization",
          "Risk escalation before high-volume or constrained runs",
          "Evidence for capex, reliability, and maintenance staffing decisions",
        ],
      },
    ],
    scenario: {
      title: "Anonymized downtime scenario",
      description:
        "A manufacturer has recurring micro-stops and inconsistent work-order notes on a high-volume line, but the team struggles to quantify which issue deserves attention first.",
      startingPoint:
        "Maintenance data sits in a CMMS, production losses are tracked separately, and plant leaders rely on manual tribal knowledge to prioritize work.",
      scopedOutcome:
        "ITECS scopes a downtime risk layer that ranks assets by probability, consequence, production schedule, spare readiness, and human-approved work recommendations.",
    },
    dataInputs: [
      {
        label: "Asset and equipment hierarchy",
        description:
          "Lines, machines, components, criticality, OEM data, and maintenance ownership.",
      },
      {
        label: "Work orders and failure history",
        description:
          "Corrective work, preventive work, parts used, technician notes, downtime reason codes, and recurrence.",
      },
      {
        label: "Production and quality signals",
        description:
          "Cycle time, throughput, stops, yield, scrap, quality drift, and affected products.",
      },
      {
        label: "Sensor or historian data",
        description:
          "Temperature, vibration, pressure, amperage, runtime, and other available machine readings.",
      },
      {
        label: "Schedule and spare parts",
        description:
          "Upcoming production demand, planned downtime windows, inventory of critical spares, and labor availability.",
      },
    ],
    workflow: [
      {
        title: "Collect",
        description:
          "Read approved CMMS, production, quality, sensor, and schedule data.",
      },
      {
        title: "Detect",
        description:
          "Identify abnormal asset patterns, recurring failures, and production loss signatures.",
      },
      {
        title: "Prioritize",
        description:
          "Rank issues by downtime probability, production consequence, quality risk, and readiness.",
      },
      {
        title: "Recommend",
        description:
          "Draft work-order, inspection, parts, or scheduling recommendations for supervisor review.",
      },
      {
        title: "Review",
        description:
          "Keep maintenance execution inside existing work-order and approval processes.",
      },
    ],
    governance: [
      "The system can recommend maintenance work, but supervisors approve work orders.",
      "The system does not autonomously stop lines, reschedule production, or purchase parts.",
      "Model evidence is preserved so plant leaders can see why an asset was flagged.",
      "Access can be scoped by plant, line, maintenance role, and executive reporting need.",
    ],
    roadmap: [
      {
        step: "Reliability data review",
        description:
          "Map asset hierarchy, work-order quality, downtime reasons, and available plant signals.",
      },
      {
        step: "Historical event model",
        description:
          "Backtest known failures and downtime events against available leading indicators.",
      },
      {
        step: "Risk dashboard",
        description:
          "Build asset risk views with production impact and recommended next action.",
      },
      {
        step: "CMMS workflow",
        description:
          "Route human-approved recommendations into the maintenance planning process.",
      },
    ],
    comparison: [
      {
        label: "Downtime visibility",
        traditional: "Known after production loss",
        ai: "Flagged earlier from asset and production signals",
      },
      {
        label: "Priority setting",
        traditional: "Based on urgency and tribal knowledge",
        ai: "Ranked by probability, impact, and readiness",
      },
      {
        label: "Work orders",
        traditional: "Manual notes and follow-up",
        ai: "Evidence-backed recommendations for supervisor approval",
      },
      {
        label: "Executive view",
        traditional: "Downtime history",
        ai: "Capacity risk and avoided disruption scenarios",
      },
    ],
    roiStatement:
      "The value is protecting capacity: fewer avoidable line events, better maintenance timing, more credible capex decisions, and less firefighting across production shifts.",
    pricingNotes: [
      "Discovery validates CMMS quality and available machine signals",
      "The first model should backtest against known downtime events",
      "Execution stays inside human-approved maintenance workflows",
    ],
    security: {
      description:
        "Maintenance AI can touch plant data, asset histories, production schedules, and vendor information. ITECS designs these systems with limited access and controlled write paths.",
      points: [
        "Read-first architecture for CMMS, historian, ERP, and production data",
        "No autonomous line stops, work-order execution, or parts purchases",
        "Asset and recommendation audit history for plant review",
        "Scoped access by plant, line, role, and reporting level",
      ],
    },
    relatedHrefs: [
      "/manufacturing/production-scheduling-yield-ai",
      "/manufacturing/quality-traceability-ai",
      "/manufacturing/inventory-working-capital-ai",
    ],
    faq: [
      {
        question: "Do we need sensor data to start predictive maintenance?",
        answer:
          "Sensor data helps, but many pilots can start by combining work orders, downtime reasons, production performance, quality signals, and asset criticality.",
      },
      {
        question: "Will the system create work orders automatically?",
        answer:
          "It can draft or recommend work-order actions, but maintenance supervisors approve execution according to the client's existing process.",
      },
      {
        question: "How does this differ from a CMMS dashboard?",
        answer:
          "A CMMS dashboard shows maintenance records. The agent connects those records to production impact, schedule context, recurring signals, and recommended actions.",
      },
      {
        question: "Can this help justify capex?",
        answer:
          "Yes. When the data supports it, the system can quantify recurring downtime patterns and capacity risk to strengthen repair, replacement, or automation business cases.",
      },
      {
        question: "What data is needed for a predictive maintenance AI pilot?",
        answer:
          "ITECS typically starts with asset hierarchy, work-order history, downtime reason codes, production performance, quality signals, spare-part availability, and any available sensor or historian data.",
      },
      {
        question: "Can this work with CMMS, ERP, and plant sensor data?",
        answer:
          "Yes. Discovery confirms which systems are authoritative, then the first pilot connects only the approved CMMS, ERP, production, quality, and sensor signals needed for the scoped reliability use case.",
      },
    ],
  },
  {
    slug: "inventory-working-capital-ai",
    title: "Inventory & Working Capital AI for Manufacturers",
    shortTitle: "Inventory & Working Capital",
    description:
      "Manufacturing AI for inventory rightsizing, aging stock, service risk, cash conversion, and working capital decisions.",
    href: "/manufacturing/inventory-working-capital-ai",
    h1: "Inventory and Working Capital Optimization",
    eyebrow: "Manufacturing AI for cash and service balance",
    heroSummary:
      "ITECS helps manufacturers see which raw, WIP, finished-goods, spare-parts, and constrained inventory positions are protecting service and which are quietly trapping cash.",
    longDescription:
      "Inventory AI should not blindly cut stock. It should help leaders distinguish strategic buffers from stale, excess, obsolete, supplier-sensitive, or forecast-sensitive positions while making cash conversion and service impact visible.",
    primaryCta: "Plan an Inventory AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "manufacturing inventory optimization AI",
      "working capital AI manufacturing",
      "AI inventory rightsizing",
      "manufacturing cash conversion AI",
      "excess inventory analytics",
    ],
    stats: [
      { value: "Cash", label: "inventory exposure visibility" },
      { value: "Aging", label: "raw, WIP, finished goods, and spares" },
      { value: "Service", label: "stockout and fill-rate context" },
    ],
    pain: {
      eyebrow: "Working capital pressure",
      title: "Inventory Is Either Insurance, Waste, or Cash Waiting for a Decision",
      description:
        "Manufacturers hold inventory to protect service, but disconnected demand, supplier, production, and finance views make it hard to know which positions are useful and which are margin leakage.",
      proof:
        "An inventory intelligence agent should show the reason a position exists, the risk it protects, the cash it consumes, and the human-approved action path.",
    },
    chart: {
      mode: "waterfall",
      eyebrow: "Illustrative cash exposure bridge",
      title: "Inventory Cash by Risk and Action Type",
      description:
        "A CFO-ready inventory view should separate required buffers from aging, excess, constrained, and recoverable positions.",
      summaryMetric: {
        label: "Cash reviewed",
        value: "$6.4M",
        detail: "Illustrative inventory positions requiring action review",
      },
      signals: [
        {
          label: "Service-critical buffer",
          value: "$2.1M",
          detail: "Inventory protecting constrained customers or lines",
          score: 72,
          tone: "stable",
        },
        {
          label: "Aging finished goods",
          value: "$1.3M",
          detail: "Demand confidence below current inventory position",
          score: 68,
          tone: "risk",
        },
        {
          label: "Excess raw material",
          value: "$940K",
          detail: "Open demand and BOM usage do not support coverage",
          score: 57,
          tone: "watch",
        },
        {
          label: "Transfer or consume candidate",
          value: "$610K",
          detail: "Recoverable through plant transfer, substitution, or run plan",
          score: 64,
          tone: "recoverable",
        },
      ],
      notes: [
        "Separates cash tied to service protection from avoidable excess",
        "Links inventory to forecast confidence, PPV exposure, and production plans",
        "Routes write-down, transfer, and purchasing actions for review",
      ],
    },
    capabilities: [
      {
        title: "Inventory exposure segmentation",
        description:
          "Classify inventory by business reason instead of treating all stock as either good or bad.",
        points: [
          "Raw, WIP, finished goods, spare parts, and constrained materials",
          "Aging, excess, obsolete, shortage, and service-critical positions",
          "Cash view by plant, SKU, supplier, customer, and program",
        ],
      },
      {
        title: "Forecast and service alignment",
        description:
          "Connect demand confidence to current inventory and service commitments.",
        points: [
          "Coverage windows by demand scenario",
          "Stockout risk and excess risk in the same view",
          "Recommended planner review before purchase or write-down action",
        ],
      },
      {
        title: "Working capital action queue",
        description:
          "Prepare action candidates for finance, supply chain, and plant review.",
        points: [
          "Buy, hold, consume, transfer, substitute, discount, or reserve recommendations",
          "Financial impact estimates with assumptions visible",
          "Decision records for audit and post-action review",
        ],
      },
    ],
    scenario: {
      title: "Anonymized working capital scenario",
      description:
        "A manufacturer sees inventory rising while customer service remains uneven. Finance wants cash relief, but operations does not want to starve production.",
      startingPoint:
        "ERP and Power BI show balances, inventory turns, and days inventory outstanding, but not the reason each position exists or what decision would safely reduce cash tied up in inventory.",
      scopedOutcome:
        "ITECS scopes an inventory intelligence layer that segments inventory by risk, demand support, production need, and action path.",
    },
    dataInputs: [
      {
        label: "Inventory balances",
        description:
          "Raw, WIP, finished goods, spare parts, lots, locations, aging, holds, and valuation.",
      },
      {
        label: "Demand and production plans",
        description:
          "Forecasts, orders, production schedules, BOMs, formulas, routings, and usage history.",
      },
      {
        label: "Procurement and supplier data",
        description:
          "Open POs, minimum buys, lead times, supplier constraints, price movement, and substitutes.",
      },
      {
        label: "Finance and service metrics",
        description:
          "Working capital, reserves, write-down history, fill rates, shortages, and customer priorities.",
      },
    ],
    workflow: [
      {
        title: "Profile",
        description:
          "Read inventory, demand, production, procurement, and finance data.",
      },
      {
        title: "Segment",
        description:
          "Classify positions by service protection, shortage risk, aging, excess, and recoverability.",
      },
      {
        title: "Model",
        description:
          "Estimate cash impact, service risk, and operating constraints by action path.",
      },
      {
        title: "Recommend",
        description:
          "Draft buy, hold, transfer, consume, reserve, or review recommendations.",
      },
      {
        title: "Approve",
        description:
          "Route actions to finance, supply chain, and plant owners before execution.",
      },
    ],
    governance: [
      "The system can recommend inventory actions, but it does not autonomously write down, scrap, transfer, or purchase stock.",
      "Inventory decisions preserve demand, finance, and operational assumptions.",
      "Access can be scoped by plant, role, product family, and financial sensitivity.",
      "Recommendations include confidence and source-data references.",
    ],
    roadmap: [
      {
        step: "Inventory profile review",
        description:
          "Map current inventory reporting, data quality, ownership, and decision cadence.",
      },
      {
        step: "Cash and service segmentation",
        description:
          "Classify inventory by business purpose and risk type.",
      },
      {
        step: "Action model",
        description:
          "Add recommended actions and financial impact estimates for review.",
      },
      {
        step: "Working capital workflow",
        description:
          "Embed review queues into finance and supply chain routines.",
      },
    ],
    comparison: [
      {
        label: "Inventory view",
        traditional: "Turns and balances",
        ai: "Cash, service, risk, and action context",
      },
      {
        label: "Aging stock",
        traditional: "Periodic reports",
        ai: "Action queue with demand and production rationale",
      },
      {
        label: "Shortage risk",
        traditional: "Planner escalation",
        ai: "Forecast, supplier, and line-risk signal",
      },
      {
        label: "Governance",
        traditional: "Manual approvals",
        ai: "Traceable recommendations and decisions",
      },
    ],
    roiStatement:
      "The value is disciplined cash release: reduce avoidable inventory without weakening service, production continuity, or supplier risk controls.",
    pricingNotes: [
      "Discovery validates inventory definitions and current working capital reporting",
      "The first proof point is segmentation of current inventory positions",
      "Financial actions remain human-approved",
    ],
    security: {
      description:
        "Inventory AI touches financial valuation, customer service, production, and supplier data. ITECS designs the system so sensitive financial actions remain controlled.",
      points: [
        "Read-first access to ERP, BI, inventory, production, and procurement data",
        "No autonomous purchasing, write-downs, transfers, or scrap actions",
        "Decision logs for inventory recommendations",
        "Role-based visibility for finance, supply chain, plant, and executive users",
      ],
    },
    relatedHrefs: [
      "/manufacturing/demand-forecasting-sop-ai",
      "/manufacturing/ppv-agent",
      "/manufacturing/production-scheduling-yield-ai",
    ],
    faq: [
      {
        question: "Does inventory AI just reduce stock?",
        answer:
          "No. It distinguishes inventory that protects service from inventory that is aging, excess, obsolete, or recoverable through a different action.",
      },
      {
        question: "Can this help finance and operations agree?",
        answer:
          "Yes. The page is designed around a shared view of cash, service, production, and supplier risk so teams can make tradeoffs with the same evidence.",
      },
      {
        question: "Does it change inventory records automatically?",
        answer:
          "No. It recommends actions for review. Write-downs, transfers, purchases, and scrap decisions remain under human approval.",
      },
      {
        question: "What systems are usually involved?",
        answer:
          "ERP, inventory, production planning, procurement, Power BI or reporting models, and sometimes WMS, MES, or spreadsheet planning files.",
      },
      {
        question: "What data is needed for an inventory AI pilot?",
        answer:
          "A focused pilot usually starts with inventory balances, aging, valuation, demand forecasts, open orders, production plans, BOMs or formulas, open POs, supplier lead times, and service metrics.",
      },
      {
        question: "How does this improve the cash conversion cycle?",
        answer:
          "The system identifies inventory that can be consumed, transferred, reserved, discounted, or paused without creating unacceptable stockout risk, giving finance and operations evidence for DIO and cash conversion improvement.",
      },
    ],
  },
  {
    slug: "quality-traceability-ai",
    title: "Quality, Traceability, and Recall Risk Intelligence",
    shortTitle: "Quality & Traceability",
    description:
      "Manufacturing AI for quality anomaly detection, lot traceability, hold investigation, recall readiness, and supplier quality signals.",
    href: "/manufacturing/quality-traceability-ai",
    h1: "Quality, Traceability, and Recall Risk Intelligence",
    eyebrow: "Manufacturing AI for quality risk",
    heroSummary:
      "ITECS helps manufacturers connect quality records, lot history, supplier performance, production context, and customer claims into earlier warnings and faster investigations.",
    longDescription:
      "Quality AI should reduce the time between an unusual signal and a controlled response. It needs to support investigation, traceability, and evidence, not bypass quality leadership.",
    primaryCta: "Plan a Quality AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "quality anomaly detection manufacturing AI",
      "manufacturing traceability AI",
      "AI recall risk intelligence",
      "food safety AI manufacturing",
      "supplier quality AI",
    ],
    stats: [
      { value: "Lot", label: "traceability and genealogy context" },
      { value: "QA", label: "holds, defects, claims, and investigations" },
      { value: "Risk", label: "early warning and response evidence" },
    ],
    pain: {
      eyebrow: "Quality pressure",
      title: "Quality Signals Often Scatter Before the Investigation Starts",
      description:
        "Defects, holds, supplier issues, customer claims, lot data, and production context often live in separate systems. That slows root-cause work and makes recall readiness harder to prove.",
      proof:
        "A quality intelligence agent should surface abnormal patterns, connect them to lots, suppliers, shifts, lines, and customers, and preserve evidence for human-led response.",
    },
    chart: {
      mode: "timeline",
      eyebrow: "Illustrative traceability signal",
      title: "From Quality Signal to Controlled Response",
      description:
        "A quality view should show the response path from anomaly detection through lot impact and documented action.",
      summaryMetric: {
        label: "Investigation window",
        value: "4 hrs",
        detail: "Illustrative target for first evidence package",
      },
      signals: [
        {
          label: "Defect anomaly",
          value: "Line 3",
          detail: "Complaint and inspection pattern above threshold",
          score: 82,
          tone: "risk",
        },
        {
          label: "Lot impact map",
          value: "12 lots",
          detail: "Affected lots, shifts, materials, and customers identified",
          score: 76,
          tone: "watch",
        },
        {
          label: "Supplier signal",
          value: "2 vendors",
          detail: "Recent inbound variance tied to affected materials",
          score: 61,
          tone: "watch",
        },
        {
          label: "Evidence package",
          value: "Ready",
          detail: "QA review bundle prepared for human decision",
          score: 88,
          tone: "stable",
        },
      ],
      notes: [
        "Links defects, holds, lots, suppliers, production context, and customer claims",
        "Supports quality investigations without making autonomous recall decisions",
        "Preserves evidence for leadership, customers, and compliance review",
      ],
    },
    capabilities: [
      {
        title: "Quality anomaly detection",
        description:
          "Find unusual patterns across inspections, claims, defects, holds, line events, and supplier performance.",
        points: [
          "Defect, hold, warranty, complaint, and QA record pattern detection",
          "Line, shift, lot, supplier, material, and SKU correlations",
          "Early warning lists for QA review",
        ],
      },
      {
        title: "Traceability intelligence",
        description:
          "Connect lot genealogy, production records, BOMs or formulas, materials, and customers into a response-ready view.",
        points: [
          "Lot impact maps and containment candidates",
          "Supplier and material history tied to affected production",
          "Evidence package drafts for QA leadership",
        ],
      },
      {
        title: "Recall readiness support",
        description:
          "Help teams move faster during investigations while keeping decisions human-owned.",
        points: [
          "Controlled response workflow with approvals",
          "Customer, lot, and inventory exposure views",
          "Audit history for assumptions and decisions",
        ],
      },
    ],
    scenario: {
      title: "Anonymized quality scenario",
      description:
        "A manufacturer sees a rise in customer complaints and internal holds, but root-cause work is slowed by disconnected lot, supplier, and production data.",
      startingPoint:
        "Quality records, lot traceability, production data, supplier history, and customer claims are available but not connected into one investigation view.",
      scopedOutcome:
        "ITECS scopes a quality intelligence layer that flags anomalies, maps impacted lots, and prepares a QA review package with source-backed evidence.",
    },
    dataInputs: [
      {
        label: "Quality records",
        description:
          "Inspections, holds, nonconformances, claims, defects, lab results, and corrective actions.",
      },
      {
        label: "Lot and production history",
        description:
          "Lots, batches, genealogy, shift, line, operator, BOMs, formulas, and production records.",
      },
      {
        label: "Supplier and material data",
        description:
          "Inbound quality, vendor performance, raw material lots, certificates, and substitutions.",
      },
      {
        label: "Customer and inventory exposure",
        description:
          "Shipments, customers, open orders, on-hand inventory, finished goods, and affected locations.",
      },
    ],
    workflow: [
      {
        title: "Monitor",
        description:
          "Read approved quality, production, lot, supplier, customer, and inventory signals.",
      },
      {
        title: "Detect",
        description:
          "Flag unusual patterns and correlate them to lots, lines, shifts, materials, and customers.",
      },
      {
        title: "Map",
        description:
          "Prepare impact maps for lots, inventory, shipments, suppliers, and customer exposure.",
      },
      {
        title: "Package",
        description:
          "Draft evidence summaries and likely next steps for QA leadership review.",
      },
      {
        title: "Approve",
        description:
          "Keep holds, releases, customer notifications, and recall actions under human control.",
      },
    ],
    governance: [
      "The system can flag quality risk and prepare evidence, but quality leaders approve holds, releases, notices, and recalls.",
      "The system does not autonomously quarantine inventory or contact customers.",
      "Investigation assumptions, affected lots, and evidence sources remain traceable.",
      "Access can be scoped by quality role, plant, product family, and customer sensitivity.",
    ],
    roadmap: [
      {
        step: "Quality data review",
        description:
          "Map quality systems, lot traceability, production records, and claim data.",
      },
      {
        step: "Historical investigation backtest",
        description:
          "Recreate prior holds, claims, or defects to test signal quality.",
      },
      {
        step: "Traceability view",
        description:
          "Build lot, supplier, production, inventory, and customer impact maps.",
      },
      {
        step: "Controlled response workflow",
        description:
          "Route evidence packages and recommendations through QA approvals.",
      },
    ],
    comparison: [
      {
        label: "Anomaly detection",
        traditional: "Manual trend review",
        ai: "Continuous pattern detection across quality and production data",
      },
      {
        label: "Traceability",
        traditional: "System-by-system lookup",
        ai: "Lot impact map with source evidence",
      },
      {
        label: "Response package",
        traditional: "Built during the investigation",
        ai: "Drafted for QA review as signals emerge",
      },
      {
        label: "Governance",
        traditional: "Email and spreadsheet evidence",
        ai: "Versioned assumptions and approval records",
      },
    ],
    roiStatement:
      "The value is faster controlled response: fewer surprise escalations, better containment evidence, lower chargeback risk, and stronger customer confidence.",
    pricingNotes: [
      "Discovery validates traceability and quality record completeness",
      "The first proof point should recreate known investigations",
      "QA and compliance decisions remain human-approved",
    ],
    security: {
      description:
        "Quality and traceability workflows can involve customer exposure, regulated records, supplier claims, and recall-sensitive information. ITECS keeps the AI layer governed and evidence-driven.",
      points: [
        "Read-first access to quality, lot, production, supplier, and customer data",
        "No autonomous recalls, customer notices, holds, releases, or inventory quarantines",
        "Evidence logs for lots, assumptions, recommendations, and reviewer decisions",
        "Role-based access for quality, operations, finance, and executive users",
      ],
      externalLink: {
        text: "FDA Food Traceability Rule",
        href: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-requirements-additional-traceability-records-certain-foods",
      },
    },
    relatedHrefs: [
      "/manufacturing/predictive-maintenance-ai",
      "/manufacturing/production-scheduling-yield-ai",
      "/manufacturing/inventory-working-capital-ai",
    ],
    faq: [
      {
        question: "Does this make recall decisions automatically?",
        answer:
          "No. The system can prepare traceability evidence and risk summaries, but quality and executive leaders approve holds, releases, notifications, and recall decisions.",
      },
      {
        question: "Is this only for food manufacturers?",
        answer:
          "No. Food and process manufacturers have strong traceability needs, but the same approach applies to discrete manufacturers managing defects, supplier quality, warranty patterns, and field failures.",
      },
      {
        question: "What is the first proof point?",
        answer:
          "A practical first proof point is recreating prior investigations to see whether the system can connect signals and evidence faster than the current process.",
      },
      {
        question: "Can it work with BatchMaster or SAP data?",
        answer:
          "Yes, discovery confirms how formulas, lots, quality records, and production history are stored before an integration path is proposed.",
      },
    ],
  },
  {
    slug: "customer-sku-profitability-ai",
    title: "Customer and SKU Profitability Intelligence for Manufacturers",
    shortTitle: "Customer/SKU Profitability",
    description:
      "Manufacturing AI for customer, SKU, plant, program, and contract-level profitability analysis.",
    href: "/manufacturing/customer-sku-profitability-ai",
    h1: "Customer and SKU Profitability Intelligence",
    eyebrow: "Manufacturing AI for margin truth",
    heroSummary:
      "ITECS helps manufacturing finance teams see which customers, SKUs, plants, and programs actually create margin after cost movement, service requirements, rebates, chargebacks, freight, and complexity.",
    longDescription:
      "Revenue growth can hide unprofitable complexity. Profitability intelligence connects finance, operations, customer terms, production cost, and service burden so leaders can price, negotiate, and simplify with evidence.",
    primaryCta: "Plan a Profitability AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "manufacturing customer profitability AI",
      "SKU profitability analytics manufacturing",
      "AI margin analysis manufacturing",
      "customer margin intelligence",
      "activity based costing AI manufacturing",
    ],
    stats: [
      { value: "SKU", label: "margin and complexity signals" },
      { value: "Customer", label: "service and contract economics" },
      { value: "Plant", label: "cost-to-serve context" },
    ],
    pain: {
      eyebrow: "Margin pressure",
      title: "The Largest Customer Is Not Always the Most Profitable Customer",
      description:
        "Customer concentration, custom SKUs, rebates, freight, changeovers, chargebacks, and service expectations can make reported revenue look better than realized margin.",
      proof:
        "A profitability agent should connect cost drivers to customer and SKU economics so finance and commercial leaders know where pricing, contract, or portfolio decisions need attention.",
    },
    chart: {
      mode: "waterfall",
      eyebrow: "Illustrative margin bridge",
      title: "From Gross Margin to True Customer Profitability",
      description:
        "A margin bridge should show which cost-to-serve items turn a high-volume account into a low-return program.",
      summaryMetric: {
        label: "Margin leakage reviewed",
        value: "$2.7M",
        detail: "Illustrative customer and SKU economics requiring review",
      },
      signals: [
        {
          label: "Reported gross margin",
          value: "18.4%",
          detail: "Margin before cost-to-serve and contract leakage",
          score: 84,
          tone: "stable",
        },
        {
          label: "Freight and service burden",
          value: "-3.1 pts",
          detail: "Lane, expedite, minimum order, and service requirements",
          score: 63,
          tone: "watch",
        },
        {
          label: "Changeover and complexity",
          value: "-2.4 pts",
          detail: "Small runs, custom packaging, and yield loss",
          score: 71,
          tone: "risk",
        },
        {
          label: "Recoverable pricing action",
          value: "+1.6 pts",
          detail: "Contract, surcharge, or portfolio review candidate",
          score: 62,
          tone: "recoverable",
        },
      ],
      notes: [
        "Connects financial margin to operational cost-to-serve",
        "Shows customer/SKU combinations that need pricing or portfolio review",
        "Links PPV, contracts, freight, chargebacks, yield, and changeovers",
      ],
    },
    capabilities: [
      {
        title: "Customer and SKU margin model",
        description:
          "Build a finance view that connects revenue to the real costs of serving each customer and product.",
        points: [
          "Customer, SKU, plant, program, and channel profitability",
          "Chargebacks, rebates, freight, discounts, and service-level burden",
          "Margin movement tied to PPV, yield, and labor signals",
        ],
      },
      {
        title: "Complexity cost detection",
        description:
          "Expose operational complexity that normal gross-margin reports miss.",
        points: [
          "Short runs, custom packaging, changeovers, low-volume SKUs, and rework",
          "Cost-to-serve signals by customer requirement",
          "Portfolio simplification candidates for review",
        ],
      },
      {
        title: "Pricing and contract action support",
        description:
          "Prepare evidence for pricing, surcharge, pass-through, renewal, or service-level discussions.",
        points: [
          "Recoverable margin candidates",
          "Customer negotiation summaries",
          "Scenario views for price, volume, and service changes",
        ],
      },
    ],
    scenario: {
      title: "Anonymized profitability scenario",
      description:
        "A manufacturer has a large customer program with strong revenue but inconsistent realized margin across plants and SKUs.",
      startingPoint:
        "Finance sees gross margin by SKU and customer, but freight, service requirements, changeover burden, chargebacks, and contract terms are not connected in one view.",
      scopedOutcome:
        "ITECS scopes a profitability intelligence layer that shows true margin by customer/SKU/program and creates action-ready pricing and portfolio review candidates.",
    },
    dataInputs: [
      {
        label: "Sales and margin data",
        description:
          "Revenue, price, discounts, rebates, chargebacks, credits, customer, SKU, plant, and program.",
      },
      {
        label: "Cost and production data",
        description:
          "Standards, actuals, routings, formulas, changeovers, yield, labor, scrap, and rework.",
      },
      {
        label: "Freight and service burden",
        description:
          "Lane cost, expedites, minimum orders, special handling, service levels, and returns.",
      },
      {
        label: "Customer contracts",
        description:
          "Price terms, pass-throughs, rebates, service commitments, renewal windows, and penalties.",
      },
    ],
    workflow: [
      {
        title: "Assemble",
        description:
          "Read approved finance, sales, production, freight, quality, and contract data.",
      },
      {
        title: "Allocate",
        description:
          "Connect margin to cost-to-serve and complexity drivers.",
      },
      {
        title: "Rank",
        description:
          "Identify customer/SKU/program combinations with margin risk or recovery potential.",
      },
      {
        title: "Model",
        description:
          "Run pricing, volume, service, surcharge, and portfolio scenarios.",
      },
      {
        title: "Approve",
        description:
          "Route commercial actions to finance, sales, and executive owners.",
      },
    ],
    governance: [
      "The system can recommend pricing and portfolio actions, but it does not change prices or customer terms.",
      "Sensitive customer profitability views are role-restricted.",
      "Cost allocation assumptions remain visible and versioned.",
      "Commercial recommendations preserve source evidence for leadership review.",
    ],
    roadmap: [
      {
        step: "Profitability method review",
        description:
          "Document current margin reporting, allocation logic, and commercial decision cadence.",
      },
      {
        step: "Cost-to-serve model",
        description:
          "Connect operational and commercial burden to customer/SKU economics.",
      },
      {
        step: "Action queue",
        description:
          "Identify pricing, surcharge, service, contract, and portfolio review candidates.",
      },
      {
        step: "Commercial workflow",
        description:
          "Embed finance-approved evidence into sales and executive review.",
      },
    ],
    comparison: [
      {
        label: "Margin view",
        traditional: "Gross margin by SKU or customer",
        ai: "Customer/SKU margin after cost-to-serve and complexity",
      },
      {
        label: "Complexity",
        traditional: "Known anecdotally",
        ai: "Quantified by changeover, yield, service, and freight signals",
      },
      {
        label: "Pricing action",
        traditional: "Periodic commercial review",
        ai: "Evidence-backed action candidates",
      },
      {
        label: "Governance",
        traditional: "Spreadsheet logic",
        ai: "Versioned assumptions and role-restricted views",
      },
    ],
    roiStatement:
      "The value is margin clarity: better pricing, cleaner customer negotiations, fewer hidden loss programs, and more confidence in growth decisions.",
    pricingNotes: [
      "Discovery validates current margin methodology and cost allocation logic",
      "The first proof point is a customer/SKU margin bridge",
      "Commercial and pricing actions remain human-approved",
    ],
    security: {
      description:
        "Customer profitability is sensitive. ITECS scopes access carefully so margin, pricing, and contract views are only available to approved roles.",
      points: [
        "Role-restricted profitability dashboards and agent responses",
        "No autonomous customer price, rebate, or contract changes",
        "Versioned allocation assumptions and source references",
        "Audit history for recommendations and approvals",
      ],
    },
    relatedHrefs: [
      "/manufacturing/ppv-agent",
      "/manufacturing/contract-pass-through-intelligence",
      "/manufacturing/production-scheduling-yield-ai",
    ],
    faq: [
      {
        question: "Is this activity-based costing?",
        answer:
          "It can support activity-based costing, but the first goal is practical margin visibility by customer, SKU, plant, program, and cost-to-serve driver.",
      },
      {
        question: "Does it replace finance's margin model?",
        answer:
          "No. It reconciles to finance's method and makes assumptions more visible, then extends the view with operational and commercial signals.",
      },
      {
        question: "Can sales use this?",
        answer:
          "Yes, with role-appropriate access. The system can prepare pricing and renewal evidence for sales while protecting sensitive finance views.",
      },
      {
        question: "How does this connect to PPV?",
        answer:
          "PPV explains material cost movement. Profitability intelligence shows where that movement affects customer, SKU, and contract margin.",
      },
    ],
  },
  {
    slug: "production-scheduling-yield-ai",
    title: "Production Scheduling, Yield, and Labor Planning Intelligence",
    shortTitle: "Production Planning",
    description:
      "Manufacturing AI for production scheduling, yield variance, labor planning, bottleneck visibility, and shift-readiness decisions.",
    href: "/manufacturing/production-scheduling-yield-ai",
    h1: "Production Scheduling, Yield, and Labor Planning Intelligence",
    eyebrow: "Manufacturing AI for shift readiness",
    heroSummary:
      "ITECS helps manufacturers connect demand, schedules, labor, line rates, yield, changeovers, maintenance, and quality holds into a planning view that shows where the next shift is already at risk.",
    longDescription:
      "Production planning AI should help leaders see constraints before the shift starts. The point is not autonomous scheduling. The point is better evidence for the planners and supervisors who own schedule, labor, and throughput decisions.",
    primaryCta: "Plan a Production AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "AI production scheduling manufacturing",
      "manufacturing yield planning AI",
      "labor planning AI manufacturing",
      "production bottleneck intelligence",
      "AI shift planning manufacturing",
    ],
    stats: [
      { value: "Shift", label: "readiness and bottleneck signals" },
      { value: "Yield", label: "variance and loss context" },
      { value: "Labor", label: "coverage and skill alignment" },
    ],
    pain: {
      eyebrow: "Execution pressure",
      title: "The Schedule Usually Breaks for Reasons the Planning Meeting Already Hinted At",
      description:
        "Material availability, labor coverage, changeovers, maintenance windows, yield loss, and quality holds can all invalidate a schedule. These signals often sit in separate views.",
      proof:
        "A production planning agent should show which orders, lines, shifts, and constraints need attention before the plan turns into missed throughput.",
    },
    chart: {
      mode: "matrix",
      eyebrow: "Illustrative shift-readiness matrix",
      title: "Schedule Risk by Line, Constraint, and Shift",
      description:
        "A planner-ready view should combine line readiness, labor coverage, material availability, yield risk, and quality constraints.",
      summaryMetric: {
        label: "Schedule risk",
        value: "27%",
        detail: "Illustrative planned hours requiring supervisor review",
      },
      signals: [
        {
          label: "Line 2 labor coverage",
          value: "Gap",
          detail: "Skill coverage below planned run requirement",
          score: 78,
          tone: "risk",
        },
        {
          label: "Changeover sequence",
          value: "Watch",
          detail: "Planned sequence creates avoidable downtime",
          score: 62,
          tone: "watch",
        },
        {
          label: "Yield trend",
          value: "-1.8 pts",
          detail: "Recent loss trend on related product family",
          score: 67,
          tone: "watch",
        },
        {
          label: "Material readiness",
          value: "Clear",
          detail: "Inputs available for critical run window",
          score: 85,
          tone: "stable",
        },
      ],
      notes: [
        "Connects schedule, material, labor, yield, quality, and maintenance constraints",
        "Highlights risk before the shift starts",
        "Supports planner and supervisor review without autonomous rescheduling",
      ],
    },
    capabilities: [
      {
        title: "Schedule risk intelligence",
        description:
          "Identify where the production plan is exposed before execution begins.",
        points: [
          "Line, order, SKU, shift, and customer commitment risk",
          "Material, labor, maintenance, quality, and changeover constraints",
          "Supervisor-ready exception summaries",
        ],
      },
      {
        title: "Yield and loss analysis",
        description:
          "Connect yield variance to product, line, shift, material, operator, and process context.",
        points: [
          "Yield, scrap, rework, and spoilage pattern detection",
          "Root-cause candidate lists for operations and quality review",
          "Financial impact context for finance and plant leadership",
        ],
      },
      {
        title: "Labor planning support",
        description:
          "Link labor availability and skill coverage to schedule feasibility.",
        points: [
          "Shift coverage and skill gap views",
          "Overtime and staffing scenario support",
          "Human-approved schedule and labor recommendations",
        ],
      },
    ],
    scenario: {
      title: "Anonymized shift planning scenario",
      description:
        "A manufacturer regularly enters the day with a feasible schedule on paper but loses throughput to labor gaps, changeovers, yield drift, and late quality holds.",
      startingPoint:
        "Schedule, labor, maintenance, quality, yield, and inventory views exist, but planners do not have one risk-weighted shift-readiness view.",
      scopedOutcome:
        "ITECS scopes a planning intelligence layer that flags schedule risk by line, shift, order, material, labor, and quality constraint.",
    },
    dataInputs: [
      {
        label: "Production schedule",
        description:
          "Orders, lines, routings, planned rates, changeovers, priorities, and customer commitments.",
      },
      {
        label: "Labor and skill coverage",
        description:
          "Shift rosters, skills, attendance, overtime, training, and staffing constraints.",
      },
      {
        label: "Yield and line performance",
        description:
          "Actual rates, downtime, scrap, rework, spoilage, yield variance, and loss reasons.",
      },
      {
        label: "Operational constraints",
        description:
          "Material availability, maintenance windows, quality holds, tooling, and bottlenecks.",
      },
    ],
    workflow: [
      {
        title: "Read",
        description:
          "Connect approved schedule, labor, material, maintenance, quality, and yield data.",
      },
      {
        title: "Score",
        description:
          "Rank orders, lines, and shifts by constraint and readiness risk.",
      },
      {
        title: "Explain",
        description:
          "Show why a schedule is exposed and which constraint is driving the risk.",
      },
      {
        title: "Recommend",
        description:
          "Draft schedule, labor, sequence, or escalation recommendations.",
      },
      {
        title: "Approve",
        description:
          "Keep schedule and staffing changes under planner and supervisor control.",
      },
    ],
    governance: [
      "The system can recommend schedule and labor actions, but planners approve changes.",
      "The system does not autonomously reschedule lines, reassign labor, or override supervisors.",
      "Assumptions around rates, labor, materials, and holds remain visible.",
      "Plant-level access can be separated from executive reporting views.",
    ],
    roadmap: [
      {
        step: "Planning data review",
        description:
          "Map production schedule, labor, yield, quality, maintenance, and material signals.",
      },
      {
        step: "Constraint model",
        description:
          "Identify the constraints that have historically disrupted the plan.",
      },
      {
        step: "Shift-readiness view",
        description:
          "Build risk scoring by line, order, product, and shift.",
      },
      {
        step: "Planner workflow",
        description:
          "Route recommendations through planning and supervisor review.",
      },
    ],
    comparison: [
      {
        label: "Schedule review",
        traditional: "Static plan and manual calls",
        ai: "Risk-weighted readiness view",
      },
      {
        label: "Yield loss",
        traditional: "Reviewed after production",
        ai: "Pattern signals before similar runs",
      },
      {
        label: "Labor planning",
        traditional: "Roster and supervisor judgment",
        ai: "Skill coverage tied to schedule risk",
      },
      {
        label: "Governance",
        traditional: "Manual schedule changes",
        ai: "Human-approved recommendations with rationale",
      },
    ],
    roiStatement:
      "The value is more predictable execution: fewer preventable schedule misses, better shift readiness, lower yield loss, and clearer supervisor priorities.",
    pricingNotes: [
      "Discovery validates schedule, labor, and yield data quality",
      "The first proof point is recreating known schedule misses",
      "Schedule and staffing decisions remain human-approved",
    ],
    security: {
      description:
        "Production planning AI touches labor, schedule, quality, and operational data. ITECS keeps the system advisory unless approved workflows are explicitly designed.",
      points: [
        "Read-first access to planning, labor, production, and quality data",
        "No autonomous schedule, labor, or production-order changes",
        "Planner and supervisor decision logs",
        "Scoped access by plant, shift, role, and executive reporting need",
      ],
    },
    relatedHrefs: [
      "/manufacturing/demand-forecasting-sop-ai",
      "/manufacturing/predictive-maintenance-ai",
      "/manufacturing/quality-traceability-ai",
    ],
    faq: [
      {
        question: "Will AI schedule the plant automatically?",
        answer:
          "No. The system can highlight risks and recommend changes, but planners and supervisors approve schedule and labor decisions.",
      },
      {
        question: "Can this work without an MES?",
        answer:
          "Possibly. Discovery determines whether ERP, scheduling, labor, quality, maintenance, and manual production records provide enough signal for a pilot.",
      },
      {
        question: "How does this help yield?",
        answer:
          "It connects yield variance to product, line, shift, material, labor, quality, and process context so leaders can see likely drivers earlier.",
      },
      {
        question: "Who owns the workflow?",
        answer:
          "Usually operations, planning, and plant leadership, with finance included where yield or throughput has material P&L impact.",
      },
    ],
  },
  {
    slug: "contract-pass-through-intelligence",
    title: "Contract Intelligence and Pass-Through Recovery for Manufacturers",
    shortTitle: "Contract Recovery",
    description:
      "Manufacturing AI for customer and supplier contract review, price escalators, pass-through recovery, renewal risk, and audit evidence.",
    href: "/manufacturing/contract-pass-through-intelligence",
    h1: "Contract Intelligence and Pass-Through Recovery",
    eyebrow: "Manufacturing AI for recoverable margin",
    heroSummary:
      "ITECS helps manufacturers use governed AI to find pricing clauses, escalators, rebate terms, audit rights, renewal windows, and pass-through opportunities hidden across customer and supplier agreements.",
    longDescription:
      "Contract intelligence matters because adverse cost movement is not always pure margin erosion. Some of it may be recoverable if finance, sales, procurement, and legal can find and act on the right language in time.",
    primaryCta: "Plan a Contract Intelligence Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "contract intelligence manufacturing AI",
      "pass through recovery AI manufacturing",
      "price escalator AI",
      "manufacturing contract review AI",
      "AI contract analytics procurement",
    ],
    stats: [
      { value: "Terms", label: "escalators, rebates, and audit rights" },
      { value: "Margin", label: "recoverable variance candidates" },
      { value: "Renewal", label: "deadline and obligation tracking" },
    ],
    pain: {
      eyebrow: "Commercial pressure",
      title: "Recoverable Margin Is Often Lost Because the Clause Is Found Too Late",
      description:
        "Manufacturers may have customer pass-throughs, supplier rebates, audit rights, or renewal leverage, but the language lives in contracts that finance and procurement cannot continuously monitor.",
      proof:
        "A contract intelligence agent should connect agreement language to cost movement, customer programs, vendors, and deadlines so humans can pursue recovery with evidence.",
    },
    chart: {
      mode: "timeline",
      eyebrow: "Illustrative recovery queue",
      title: "Contract Windows That Finance Can Act On",
      description:
        "A recovery view should show the clause, exposure, owner, deadline, and evidence needed for action.",
      summaryMetric: {
        label: "Recovery candidates",
        value: "$820K",
        detail: "Illustrative variance tied to contract language",
      },
      signals: [
        {
          label: "Customer escalator",
          value: "$360K",
          detail: "Commodity movement may qualify for pass-through review",
          score: 82,
          tone: "recoverable",
        },
        {
          label: "Supplier rebate",
          value: "$180K",
          detail: "Volume threshold and audit evidence require validation",
          score: 66,
          tone: "watch",
        },
        {
          label: "Renewal deadline",
          value: "45 days",
          detail: "Pricing term expires before next planning cycle",
          score: 74,
          tone: "risk",
        },
        {
          label: "Audit right",
          value: "Open",
          detail: "Vendor formula and freight assumptions need review",
          score: 58,
          tone: "watch",
        },
      ],
      notes: [
        "Connects contract language to PPV, freight, commodity, and customer margin movement",
        "Tracks owner, deadline, evidence, and approval path",
        "Supports finance, procurement, sales, and legal review",
      ],
    },
    capabilities: [
      {
        title: "Clause and obligation extraction",
        description:
          "Find the agreement language that affects pricing, margin, rights, deadlines, and obligations.",
        points: [
          "Escalators, pass-throughs, rebates, audit rights, renewal terms, and notice windows",
          "Customer and supplier contract comparison",
          "Source-linked clause summaries",
        ],
      },
      {
        title: "Recovery candidate matching",
        description:
          "Connect contract language to actual cost movement and customer or vendor exposure.",
        points: [
          "PPV, freight, commodity, FX, and service-cost movement",
          "Recoverable variance candidates by customer and program",
          "Vendor formula drift and rebate review candidates",
        ],
      },
      {
        title: "Approval-ready action packs",
        description:
          "Prepare evidence packages for finance, sales, procurement, and legal review.",
        points: [
          "Clause source, calculation assumptions, owner, and deadline",
          "Customer or vendor communication drafts for review",
          "Decision history and outcome tracking",
        ],
      },
    ],
    scenario: {
      title: "Anonymized pass-through scenario",
      description:
        "A manufacturer has adverse material movement and mixed customer contracts. Finance suspects some variance is recoverable but cannot review every clause during close.",
      startingPoint:
        "Contracts, PPV reports, customer programs, and supplier terms are available but disconnected from the variance review workflow.",
      scopedOutcome:
        "ITECS scopes a contract intelligence layer that flags recoverable exposure, links source clauses, and routes action packs for finance, sales, procurement, and legal approval.",
    },
    dataInputs: [
      {
        label: "Customer contracts",
        description:
          "Pricing terms, escalators, pass-through clauses, service commitments, notice windows, and renewal dates.",
      },
      {
        label: "Supplier contracts",
        description:
          "Pricing formulas, rebates, audit rights, freight terms, volume tiers, and renewal obligations.",
      },
      {
        label: "Cost and variance data",
        description:
          "PPV, commodity movement, freight, energy, FX, customer margin, and program economics.",
      },
      {
        label: "Commercial workflows",
        description:
          "Owners, approval paths, legal review, customer communication, and evidence requirements.",
      },
    ],
    workflow: [
      {
        title: "Ingest",
        description:
          "Read approved contract documents, ERP terms, finance data, and variance reports.",
      },
      {
        title: "Extract",
        description:
          "Identify clauses, obligations, deadlines, and calculation terms.",
      },
      {
        title: "Match",
        description:
          "Tie clause language to cost movement, customer programs, and supplier exposure.",
      },
      {
        title: "Package",
        description:
          "Draft recovery or review packs with source language and assumptions.",
      },
      {
        title: "Approve",
        description:
          "Route action to finance, sales, procurement, or legal before execution.",
      },
    ],
    governance: [
      "The system can summarize contracts and recommend actions, but legal and business owners approve interpretations and communications.",
      "The system does not autonomously change prices, terms, contracts, or customer notices.",
      "Every clause summary links back to source documents.",
      "Sensitive contract access is role-restricted.",
    ],
    roadmap: [
      {
        step: "Contract inventory",
        description:
          "Map customer and supplier agreement sources, ownership, and clause families.",
      },
      {
        step: "Clause extraction pilot",
        description:
          "Extract and validate escalators, rebates, audit rights, and renewal terms.",
      },
      {
        step: "Variance matching",
        description:
          "Connect contract language to PPV, freight, commodity, and margin signals.",
      },
      {
        step: "Recovery workflow",
        description:
          "Route evidence packs through finance, sales, procurement, and legal review.",
      },
    ],
    comparison: [
      {
        label: "Clause review",
        traditional: "Manual search during issues",
        ai: "Continuous extraction and monitoring",
      },
      {
        label: "Recovery",
        traditional: "Ad hoc and relationship-dependent",
        ai: "Evidence-backed candidate queue",
      },
      {
        label: "Deadlines",
        traditional: "Calendar and email reminders",
        ai: "Term, notice, and renewal risk linked to economics",
      },
      {
        label: "Governance",
        traditional: "Loose summaries",
        ai: "Source-linked clause and approval history",
      },
    ],
    roiStatement:
      "The value is recoverable margin and reduced contract leakage: find the clause, quantify the economics, and route action before the window closes.",
    pricingNotes: [
      "Discovery validates contract sources and document quality",
      "The first proof point is clause extraction against known agreements",
      "Legal and commercial decisions remain human-approved",
    ],
    security: {
      description:
        "Contract intelligence touches sensitive customer, supplier, pricing, and legal terms. ITECS scopes document access and preserves source-backed evidence.",
      points: [
        "Role-restricted access to contract documents and summaries",
        "No autonomous price, term, notice, or contract changes",
        "Source-linked clause output for legal and finance review",
        "Audit trail for recommendations, reviewers, and outcomes",
      ],
    },
    relatedHrefs: [
      "/manufacturing/ppv-agent",
      "/manufacturing/customer-sku-profitability-ai",
      "/manufacturing/energy-freight-scope-3-ai",
    ],
    faq: [
      {
        question: "Does contract intelligence replace legal review?",
        answer:
          "No. It finds clauses, summarizes terms, and prepares evidence. Legal and business owners approve interpretations and actions.",
      },
      {
        question: "What contracts are most useful to start with?",
        answer:
          "The highest-value starting point is usually top customer agreements and major supplier agreements with pricing formulas, pass-throughs, rebates, or renewal windows.",
      },
      {
        question: "Can it connect to PPV?",
        answer:
          "Yes. The contract page is PPV-adjacent because it helps identify which unfavorable variance may be recoverable through customer or supplier terms.",
      },
      {
        question: "Will it contact customers automatically?",
        answer:
          "No. It can draft communication for review, but customer, vendor, legal, and pricing actions remain human-approved.",
      },
    ],
  },
  {
    slug: "energy-freight-scope-3-ai",
    title: "Energy, Freight, and Scope 3 Reporting Intelligence",
    shortTitle: "Energy & Freight",
    description:
      "Manufacturing AI for energy cost, freight exposure, landed-cost movement, packaging data, and customer Scope 3 reporting support.",
    href: "/manufacturing/energy-freight-scope-3-ai",
    h1: "Energy, Freight, and Scope 3 Reporting Intelligence",
    eyebrow: "Manufacturing AI for cost and customer evidence",
    heroSummary:
      "ITECS helps manufacturers connect utility, freight, carrier, lane, packaging, supplier, production, and customer reporting data into governed cost and evidence workflows.",
    longDescription:
      "Energy and freight are not just overhead categories. They affect landed cost, quote accuracy, customer margin, production decisions, and the evidence larger customers increasingly request for carbon, packaging, and supplier reporting.",
    primaryCta: "Plan an Energy and Freight AI Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "manufacturing energy cost AI",
      "freight cost intelligence manufacturing",
      "Scope 3 reporting AI manufacturing",
      "manufacturing landed cost AI",
      "AI sustainability reporting manufacturing",
    ],
    stats: [
      { value: "Lane", label: "freight and landed-cost exposure" },
      { value: "kWh", label: "energy intensity and production context" },
      { value: "Scope 3", label: "customer evidence readiness" },
    ],
    pain: {
      eyebrow: "Cost and reporting pressure",
      title: "Energy, Freight, and Customer Evidence Are Moving Into the Same Conversation",
      description:
        "Manufacturers face volatile utility and freight costs while larger customers ask for packaging, supplier, emissions, and sustainability data. The data usually sits across invoices, TMS, ERP, spreadsheets, and supplier documents.",
      proof:
        "A cost and reporting intelligence agent should connect these signals into landed-cost exposure, operational actions, and customer-ready evidence without inventing unsupported ESG claims.",
    },
    chart: {
      mode: "waterfall",
      eyebrow: "Illustrative landed-cost bridge",
      title: "Energy and Freight Movement by Action Path",
      description:
        "A CFO-ready view should separate controllable cost actions from customer reporting and contract recovery candidates.",
      summaryMetric: {
        label: "Cost movement reviewed",
        value: "$1.1M",
        detail: "Illustrative freight, energy, and packaging movement",
      },
      signals: [
        {
          label: "Freight lane variance",
          value: "$430K",
          detail: "Carrier, lane, fuel, expedite, and mode movement",
          score: 76,
          tone: "risk",
        },
        {
          label: "Energy intensity drift",
          value: "+8%",
          detail: "Cost per production unit above recent baseline",
          score: 64,
          tone: "watch",
        },
        {
          label: "Packaging data gap",
          value: "14 SKUs",
          detail: "Customer reporting evidence incomplete",
          score: 59,
          tone: "watch",
        },
        {
          label: "Recoverable surcharge review",
          value: "$210K",
          detail: "Potential fuel or freight pass-through candidate",
          score: 62,
          tone: "recoverable",
        },
      ],
      notes: [
        "Connects freight, energy, packaging, production, and customer evidence",
        "Separates landed-cost movement from reporting gaps",
        "Supports recovery, sourcing, routing, and customer reporting review",
      ],
    },
    capabilities: [
      {
        title: "Freight and landed-cost intelligence",
        description:
          "Track cost movement by lane, carrier, mode, customer, product, and plant.",
        points: [
          "Freight variance and expedite pattern detection",
          "Landed-cost views tied to SKU, customer, and contract terms",
          "Recovery candidates for surcharge or pass-through review",
        ],
      },
      {
        title: "Energy intensity analysis",
        description:
          "Connect utility usage and rates to production volume, line performance, and schedule choices.",
        points: [
          "Cost per unit, plant, line, and product family",
          "Energy drift and abnormal usage detection",
          "Operational context for finance and facilities teams",
        ],
      },
      {
        title: "Scope 3 and customer evidence support",
        description:
          "Help collect, validate, and organize the data customers request without building a new reporting department.",
        points: [
          "Packaging, supplier, freight, energy, and product data readiness",
          "Evidence packages with source references",
          "Human-approved customer reporting workflows",
        ],
      },
    ],
    scenario: {
      title: "Anonymized cost and reporting scenario",
      description:
        "A manufacturer faces rising freight and utility costs while strategic customers request more packaging and Scope 3 data.",
      startingPoint:
        "Freight invoices, utility bills, ERP shipments, packaging data, supplier records, and customer reporting requests are handled by separate teams.",
      scopedOutcome:
        "ITECS scopes an intelligence layer that reconciles cost movement, flags recovery candidates, and organizes customer evidence with source references.",
    },
    dataInputs: [
      {
        label: "Freight and logistics data",
        description:
          "TMS, carrier invoices, lanes, modes, fuel surcharge, expedites, weights, and delivery performance.",
      },
      {
        label: "Energy and utility data",
        description:
          "Electricity, gas, water, rates, meters, production volume, and plant operating context.",
      },
      {
        label: "ERP and production data",
        description:
          "Shipments, products, customers, plants, production units, BOMs, formulas, and schedules.",
      },
      {
        label: "Customer reporting evidence",
        description:
          "Packaging specs, supplier records, emissions factors, customer templates, and source documentation.",
      },
    ],
    workflow: [
      {
        title: "Gather",
        description:
          "Read approved freight, energy, ERP, production, packaging, and supplier data.",
      },
      {
        title: "Normalize",
        description:
          "Align costs and evidence to products, plants, customers, lanes, and reporting periods.",
      },
      {
        title: "Detect",
        description:
          "Flag abnormal cost movement, reporting gaps, and recovery candidates.",
      },
      {
        title: "Package",
        description:
          "Prepare landed-cost, sourcing, surcharge, and customer evidence summaries.",
      },
      {
        title: "Approve",
        description:
          "Route pricing, sourcing, and customer reporting actions for human review.",
      },
    ],
    governance: [
      "The system can prepare evidence and recommendations, but it does not submit customer reports or change rates automatically.",
      "Customer-facing sustainability claims remain human-approved and source-backed.",
      "Freight, pricing, and sourcing actions follow existing approval paths.",
      "Evidence packages preserve source files, assumptions, and reporting periods.",
    ],
    roadmap: [
      {
        step: "Cost and evidence inventory",
        description:
          "Map freight, energy, packaging, supplier, production, and customer reporting sources.",
      },
      {
        step: "Landed-cost bridge",
        description:
          "Connect freight and energy movement to product, plant, customer, and contract views.",
      },
      {
        step: "Reporting evidence layer",
        description:
          "Organize customer-requested data and highlight gaps for review.",
      },
      {
        step: "Action workflow",
        description:
          "Route surcharge, sourcing, reporting, and operational recommendations to owners.",
      },
    ],
    comparison: [
      {
        label: "Freight view",
        traditional: "Invoice and lane reports",
        ai: "Landed-cost movement with recovery candidates",
      },
      {
        label: "Energy view",
        traditional: "Monthly utility review",
        ai: "Intensity and anomaly signals tied to production",
      },
      {
        label: "Customer reporting",
        traditional: "Manual spreadsheet collection",
        ai: "Evidence packages with source references",
      },
      {
        label: "Governance",
        traditional: "Distributed assumptions",
        ai: "Versioned data, assumptions, and approvals",
      },
    ],
    roiStatement:
      "The value is tighter landed-cost control and better customer evidence: see cost movement earlier, recover where contracts allow, and reduce reporting scramble.",
    pricingNotes: [
      "Discovery validates available freight, utility, production, and reporting data",
      "The first proof point is a landed-cost bridge or customer evidence package",
      "Customer-facing reports and claims remain human-approved",
    ],
    security: {
      description:
        "Energy, freight, and reporting intelligence touches supplier, customer, cost, and sustainability evidence. ITECS keeps outputs source-backed and approval-controlled.",
      points: [
        "Read-first access to invoices, ERP, TMS, utility, and reporting data",
        "No autonomous customer submissions, rate changes, sourcing decisions, or claims",
        "Source references for customer evidence packages",
        "Role-based access for finance, supply chain, operations, and reporting teams",
      ],
    },
    relatedHrefs: [
      "/manufacturing/contract-pass-through-intelligence",
      "/manufacturing/customer-sku-profitability-ai",
      "/manufacturing/ppv-agent",
    ],
    faq: [
      {
        question: "Does this produce ESG reports automatically?",
        answer:
          "No. It organizes and validates supporting data for human-approved customer or compliance reporting.",
      },
      {
        question: "How does this help with freight cost?",
        answer:
          "It connects freight movement to lanes, carriers, products, customers, contracts, and landed-cost impact so finance and supply chain can see action candidates.",
      },
      {
        question: "Can it help with Scope 3 requests?",
        answer:
          "It can help collect and validate evidence for customer reporting requests, but final claims and submissions remain human-approved.",
      },
      {
        question: "What is a good first pilot?",
        answer:
          "A focused pilot can start with freight lane variance, utility intensity by plant, or one strategic customer's reporting evidence request.",
      },
    ],
  },
  {
    slug: "vendor-payment-anomaly-ai",
    title: "Vendor Payment and Finance Anomaly Detection for Manufacturers",
    shortTitle: "Vendor Anomaly Detection",
    description:
      "Manufacturing AI for duplicate payments, vendor master drift, unusual invoice terms, finance exceptions, and control-ready anomaly review.",
    href: "/manufacturing/vendor-payment-anomaly-ai",
    h1: "Vendor Payment and Finance Anomaly Detection",
    eyebrow: "Manufacturing AI for finance controls",
    heroSummary:
      "ITECS helps manufacturing finance teams detect duplicate payments, vendor master drift, invoice anomalies, segregation-of-duties issues, and unusual purchasing patterns before they become close or audit problems.",
    longDescription:
      "Manufacturers process high volumes of supplier invoices, freight bills, parts purchases, and operating expenses. Small leakage points can compound quickly when finance only samples exceptions after the fact.",
    primaryCta: "Plan a Finance Anomaly Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Manufacturing AI",
    secondaryCtaHref: "/manufacturing",
    keywords: [
      "vendor payment anomaly detection AI",
      "manufacturing finance anomaly AI",
      "duplicate payment detection AI",
      "vendor master data AI",
      "accounts payable anomaly detection manufacturing",
    ],
    stats: [
      { value: "AP", label: "invoice and payment exception signals" },
      { value: "Vendor", label: "master data and term drift" },
      { value: "Controls", label: "approval and audit evidence" },
    ],
    pain: {
      eyebrow: "Control pressure",
      title: "Finance Leakage Rarely Announces Itself as a Material Error",
      description:
        "Duplicate invoices, changed bank details, unusual terms, split purchases, freight billing errors, and approval exceptions often hide inside routine transaction volume.",
      proof:
        "A finance anomaly agent should rank exceptions by evidence and business risk so AP, procurement, and controllers can review the right items before payment or close.",
    },
    chart: {
      mode: "matrix",
      eyebrow: "Illustrative anomaly risk board",
      title: "Vendor and Payment Exceptions by Evidence Strength",
      description:
        "A controller-ready view should prioritize exceptions by risk, dollar exposure, recurrence, and control relevance.",
      summaryMetric: {
        label: "Exceptions queued",
        value: "$390K",
        detail: "Illustrative vendor and payment items requiring review",
      },
      signals: [
        {
          label: "Duplicate invoice cluster",
          value: "$74K",
          detail: "Same vendor, amount, and service window pattern",
          score: 86,
          tone: "risk",
        },
        {
          label: "Vendor master change",
          value: "High",
          detail: "Bank detail update near unusual payment request",
          score: 91,
          tone: "risk",
        },
        {
          label: "Freight invoice outlier",
          value: "$42K",
          detail: "Lane and fuel surcharge outside expected range",
          score: 67,
          tone: "watch",
        },
        {
          label: "Term drift candidate",
          value: "$18K",
          detail: "Payment timing outside contracted terms",
          score: 56,
          tone: "recoverable",
        },
      ],
      notes: [
        "Connects AP, procurement, vendor master, freight, and approval signals",
        "Prioritizes exceptions for review instead of flooding finance with alerts",
        "Preserves evidence for controller and audit review",
      ],
    },
    capabilities: [
      {
        title: "Duplicate and unusual payment detection",
        description:
          "Find transaction patterns that rule-based controls and manual sampling can miss.",
        points: [
          "Duplicate invoice, vendor, amount, date, and service-period patterns",
          "Unusual payment timing, split purchases, and changed terms",
          "Freight, parts, and operating invoice outlier detection",
        ],
      },
      {
        title: "Vendor master risk monitoring",
        description:
          "Flag changes that deserve review before payment exposure increases.",
        points: [
          "Bank, address, tax, contact, and payment-term changes",
          "Vendor duplication and inactive vendor reuse",
          "Segregation-of-duties and approval-path exceptions",
        ],
      },
      {
        title: "Control-ready exception workflow",
        description:
          "Prepare prioritized review queues for AP, procurement, and controllers.",
        points: [
          "Exception summaries with source transactions",
          "Recommended reviewer, urgency, and dollar exposure",
          "Decision log for audit and close support",
        ],
      },
    ],
    scenario: {
      title: "Anonymized finance control scenario",
      description:
        "A manufacturer with high supplier and freight invoice volume wants better exception detection without slowing ordinary AP processing.",
      startingPoint:
        "ERP and AP reports catch obvious duplicates, but vendor master changes, freight outliers, term drift, and split purchases require manual review.",
      scopedOutcome:
        "ITECS scopes an anomaly detection layer that ranks exceptions by risk, evidence, exposure, and reviewer path before payment or close.",
    },
    dataInputs: [
      {
        label: "AP and payment data",
        description:
          "Invoices, payments, credits, vendors, dates, amounts, purchase orders, receipts, and terms.",
      },
      {
        label: "Vendor master data",
        description:
          "Bank details, addresses, tax IDs, contacts, payment terms, status, and change history.",
      },
      {
        label: "Procurement and freight context",
        description:
          "POs, receipts, contracts, freight bills, lanes, carriers, and sourcing ownership.",
      },
      {
        label: "Approval and control data",
        description:
          "Approvers, thresholds, segregation-of-duties rules, audit history, and exception outcomes.",
      },
    ],
    workflow: [
      {
        title: "Read",
        description:
          "Connect approved AP, ERP, vendor, procurement, freight, and approval data.",
      },
      {
        title: "Detect",
        description:
          "Find duplicate, unusual, changed, or policy-sensitive patterns.",
      },
      {
        title: "Rank",
        description:
          "Prioritize exceptions by dollar exposure, evidence strength, recurrence, and control relevance.",
      },
      {
        title: "Route",
        description:
          "Send review-ready exception packs to AP, procurement, or controller owners.",
      },
      {
        title: "Record",
        description:
          "Preserve decision outcomes for close, audit, and model tuning.",
      },
    ],
    governance: [
      "The system can flag and route exceptions, but it does not approve vendors or release payments.",
      "Vendor master and payment changes remain under existing finance controls.",
      "Exception evidence is preserved for controller and audit review.",
      "Access is role-restricted because vendor and payment data is sensitive.",
    ],
    roadmap: [
      {
        step: "Finance control review",
        description:
          "Map AP workflow, vendor master ownership, approval rules, and known leakage patterns.",
      },
      {
        step: "Historical anomaly backtest",
        description:
          "Run the model against prior invoices, vendor changes, and known exceptions.",
      },
      {
        step: "Exception queue",
        description:
          "Create ranked review queues with source evidence and reviewer routing.",
      },
      {
        step: "Control workflow",
        description:
          "Embed outcomes into AP, controller, and audit review routines.",
      },
    ],
    comparison: [
      {
        label: "Detection",
        traditional: "Rules and manual samples",
        ai: "Pattern detection across AP, vendor, procurement, and freight data",
      },
      {
        label: "Prioritization",
        traditional: "All exceptions look similar",
        ai: "Ranked by risk, evidence, and dollar exposure",
      },
      {
        label: "Vendor changes",
        traditional: "Reviewed in process",
        ai: "Monitored with payment and approval context",
      },
      {
        label: "Audit support",
        traditional: "Evidence gathered later",
        ai: "Decision record created during review",
      },
    ],
    roiStatement:
      "The value is cleaner finance operations: fewer duplicate payments, faster exception review, stronger vendor controls, and better evidence before audit questions arrive.",
    pricingNotes: [
      "Discovery validates AP, vendor master, and approval data access",
      "The first proof point is a backtest against historical transactions",
      "Payment and vendor actions remain human-approved",
    ],
    security: {
      description:
        "Finance anomaly detection touches payment, bank, vendor, approval, and audit-sensitive data. ITECS designs this as a controlled exception workflow.",
      points: [
        "Read-first access to AP, ERP, vendor master, procurement, and freight data",
        "No autonomous vendor approvals, payment releases, or master-data changes",
        "Exception and reviewer decision logs",
        "Role-based access for AP, procurement, controllers, and auditors",
      ],
    },
    relatedHrefs: [
      "/manufacturing/contract-pass-through-intelligence",
      "/manufacturing/ppv-agent",
      "/manufacturing/energy-freight-scope-3-ai",
    ],
    faq: [
      {
        question: "Does this stop payments automatically?",
        answer:
          "No. It flags and routes exceptions for review. Payment holds, releases, vendor approvals, and master-data changes remain controlled by finance.",
      },
      {
        question: "How is this manufacturing-specific?",
        answer:
          "The model can include manufacturing-specific invoice patterns such as freight, parts, MRO, raw materials, receipts, plant-level purchasing, and supplier terms.",
      },
      {
        question: "Can this help with audit readiness?",
        answer:
          "Yes. Exception evidence, reviewer decisions, and outcomes can be preserved for controller review and audit support.",
      },
      {
        question: "What is a good first pilot?",
        answer:
          "A focused first pilot can backtest duplicate invoices, vendor master changes, freight billing outliers, or unusual payment terms against historical data.",
      },
    ],
  },
];

export function getManufacturingSpokePage(
  href: string
): ManufacturingSpokePageContent {
  const page = MANUFACTURING_SPOKE_PAGES.find((item) => item.href === href);
  if (!page) {
    throw new Error(`Unknown manufacturing spoke page: ${href}`);
  }
  return page;
}

/* ----------------------------------------------------------------------------
 * Financial Services vertical
 *
 * Vertical-neutral aliases let the financial-services pages reuse the same
 * typed content model and prop-driven section components as manufacturing.
 * ------------------------------------------------------------------------- */

export type VerticalPageContent = ManufacturingPageContent;
export type VerticalSpokePageContent = ManufacturingSpokePageContent;
export type FlagshipUseCaseContent = PPVAgentUseCaseContent;

export const FINANCIAL_SERVICES_SIGNAL_CHART: ManufacturingMetricChart = {
  eyebrow: "Example portfolio signal board",
  title: "The Metrics a Financial-Services AI System Should Make Visible",
  description:
    "A financial-services AI program should give principals a daily view of collateral availability, covenant headroom, recoverable items, and where senior capacity is being spent. These example figures are illustrative; discovery replaces them with the firm's actual borrower, portfolio, and engagement data.",
  kpis: [
    {
      label: "Collateral availability at risk",
      value: "$2.4M",
      detail: "Borrowers trending toward over-advance in the next 30 days",
      tone: "risk",
    },
    {
      label: "Recoverable or correctable items",
      value: "$640K",
      detail: "Ineligibles likely to clear with documentation or follow-up",
      tone: "recoverable",
    },
    {
      label: "Covenant headroom",
      value: "0.4x",
      detail: "Tightest fixed-charge cushion across the active book",
      tone: "watch",
    },
    {
      label: "Senior capacity freed",
      value: "38%",
      detail: "Exam and model assembly time shifted to review and judgment",
      tone: "stable",
    },
  ],
  drivers: [
    {
      label: "Borrower collateral erosion",
      value: "+$1.40M",
      width: 90,
      tone: "risk",
    },
    {
      label: "Dilution and ineligibles",
      value: "+$520K",
      width: 60,
      tone: "risk",
    },
    {
      label: "Aging receivables drift",
      value: "+$240K",
      width: 38,
      tone: "watch",
    },
    {
      label: "Concentration reserve relief",
      value: "-$180K",
      width: 30,
      tone: "recoverable",
    },
    {
      label: "Recoverable ineligible recapture",
      value: "-$420K",
      width: 58,
      tone: "recoverable",
    },
  ],
  notes: [
    "Ties exposure to borrower, collateral type, and covenant terms",
    "Separates true collateral erosion from recoverable or correctable items",
    "Routes advance-rate, reserve, and reporting actions for human approval",
  ],
};

export const FIELD_EXAM_COLLATERAL_WATERFALL: PPVExposureWaterfall = {
  eyebrow: "Collateral roll-forward model",
  title: "From Borrower Collateral to Lender Availability",
  description:
    "This illustrative roll-forward shows how the analyzer moves from gross pledged collateral to net borrowing availability, separating true ineligibles from recoverable items and surfacing over-advance risk before funding.",
  stages: [
    {
      label: "Gross AR and inventory pledged",
      value: "$12.4M",
      detail: "Borrower-reported collateral before exam adjustments",
      height: 92,
      direction: "increase",
      tone: "watch",
    },
    {
      label: "Ineligibles and past-due",
      value: "-$2.1M",
      detail: "Cross-age, foreign, intercompany, and aged balances removed",
      height: 60,
      direction: "decrease",
      tone: "risk",
    },
    {
      label: "Dilution and concentration reserves",
      value: "-$1.3M",
      detail: "Credit memos, returns, and customer concentration limits",
      height: 44,
      direction: "decrease",
      tone: "risk",
    },
    {
      label: "Recoverable or correctable items",
      value: "+$640K",
      detail: "Ineligibles likely to clear with documentation or follow-up",
      height: 50,
      direction: "increase",
      tone: "recoverable",
    },
    {
      label: "Advance rate applied",
      value: "-$1.9M",
      detail: "Eligible collateral stepped down to contractual advance rates",
      height: 56,
      direction: "decrease",
      tone: "controlled",
    },
    {
      label: "Net borrowing availability",
      value: "$7.7M",
      detail: "Defensible availability after exam adjustments and reserves",
      height: 78,
      direction: "increase",
      tone: "controlled",
    },
  ],
  windows: [
    {
      label: "Current availability",
      exposure: "$7.7M",
      detail: "Net of ineligibles, reserves, and advance-rate haircuts",
      tone: "watch",
    },
    {
      label: "Over-advance risk",
      exposure: "$480K",
      detail: "Projected shortfall if aging and dilution trends continue",
      tone: "risk",
    },
    {
      label: "Recoverable review",
      exposure: "$640K",
      detail: "Ineligible items finance and the borrower may be able to clear",
      tone: "recoverable",
    },
  ],
  decisions: [
    {
      action: "Validate ineligible classifications",
      owner: "Field examiner",
      timing: "This week",
      detail:
        "Confirm cross-age, concentration, and past-due treatments against the loan agreement before the report is issued.",
    },
    {
      action: "Recompute advance rates and reserves",
      owner: "Credit / underwriting",
      timing: "48 hours",
      detail:
        "Reconcile the agent's eligible-collateral math against the borrowing base certificate and approved advance rates.",
    },
    {
      action: "Confirm availability before funding",
      owner: "Portfolio manager",
      timing: "Before next draw",
      detail:
        "Review net availability and over-advance risk so the next funding decision is backed by current collateral.",
    },
  ],
};

export const FINANCIAL_SERVICES_VERTICAL: VerticalPageContent = {
  title: "AI Solutions for Financial Services Firms",
  shortTitle: "Financial Services AI",
  description:
    "Secure financial-services AI for lenders, asset-based lenders, and advisory and restructuring firms—governed agents that turn borrower, collateral, portfolio, and engagement data into faster, defensible analysis.",
  href: "/financial-services",
  h1: "AI Solutions for Financial Services",
  eyebrow: "Financial Services AI from the ITECS Dallas team",
  heroSummary:
    "ITECS helps lenders, asset-based lenders, and advisory firms turn borrower financials, collateral data, portfolio reporting, and engagement files into governed AI workflows that free senior capacity, speed turnaround, and surface risk earlier—without sending confidential data outside a protected boundary.",
  longDescription:
    "Financial-services leaders do not need generic AI demos. They need systems that can read messy borrower files, explain collateral and covenant movement, respect approval controls, and keep every figure traceable to its source—built for confidential, audit-sensitive work where the output may be examined by lenders, courts, or in litigation support.",
  primaryCta: "Financial Services AI Readiness Assessment",
  primaryCtaHref: "/contact",
  secondaryCta: "Explore the Field Examination Analyzer",
  secondaryCtaHref: "/financial-services/field-examination-analyzer",
  keywords: [
    "financial services AI solutions",
    "AI for asset-based lending",
    "AI for lenders",
    "AI for restructuring advisory",
    "financial services AI readiness assessment",
    "AI for commercial lending",
    "financial services AI consulting",
  ],
  stats: [
    { value: "Borrower", label: "Financials, collateral, and exam data" },
    { value: "Portfolio", label: "Covenant, risk, and monitoring signals" },
    { value: "Engagement", label: "Workpapers, models, and reporting" },
  ],
  metricChart: FINANCIAL_SERVICES_SIGNAL_CHART,
  pressureGroups: [
    {
      title: "Credit and collateral pressure",
      description:
        "Lending and credit teams are asked to defend availability and risk while collateral, dilution, concentrations, and covenant headroom move faster than periodic reporting.",
      points: [
        "Over-advance and ineligible-collateral risk between exams",
        "Dilution, cross-age, and concentration effects on the borrowing base",
        "Covenant headroom eroding before the next reporting cycle",
        "Troubled credits detected late in the monitoring process",
      ],
    },
    {
      title: "Advisory throughput pressure",
      description:
        "Advisory, turnaround, and finance professionals bill senior judgment, yet much of their time is spent assembling exams, models, appraisals, and recurring reports.",
      points: [
        "Field exams and collateral roll-forwards rebuilt by hand each engagement",
        "Cash flow models reassembled when most inputs already exist",
        "13-week models and wind-down schedules maintained manually",
        "Proposals and engagement letters re-drafted from scratch",
      ],
    },
    {
      title: "Data and confidentiality pressure",
      description:
        "AI only becomes useful in financial services when distressed-borrower, lender-collateral, and bankruptcy-sensitive data can be trusted, governed, and kept inside a protected boundary.",
      points: [
        "Borrower agings, GL, inventory, and bank-statement data in mixed formats",
        "Prior workpapers, models, and appraisals scattered across engagements",
        "Confidential, audit-sensitive output that must stay traceable to source",
        "Role-based access, audit logs, and human-approval boundaries",
      ],
    },
  ],
  useCases: [
    {
      title: "Field Examination & Collateral Roll-Forward",
      description:
        "Ingest borrower agings, inventory, GL, and bank statements and produce the standard working-capital exam—roll-forward, dilution, turnover, ineligibles, and a first-draft executive report.",
      outcome: "Faster exams and freed senior capacity",
      icon: "FileSearch",
      href: "/financial-services/field-examination-analyzer",
      ctaLabel: "View field exam use case",
    },
    {
      title: "Comprehensive Cash Flow Modeling",
      description:
        "Assemble the full financial-statement forecast—balance sheet, P&L with EBITDA, working-capital roll-forward, and borrowing-base availability—from exam output and prior reports.",
      outcome: "Hours to a defensible first draft, not days",
      icon: "LineChart",
      href: "/financial-services/cash-flow-model-builder",
      ctaLabel: "View cash flow modeling use case",
    },
    {
      title: "Portfolio Monitoring & Covenant Early-Warning",
      description:
        "Continuously watch borrower reporting for negative trends, covenant-breach risk, and deteriorating collateral so periodic review becomes continuous signal.",
      outcome: "Troubled credits surfaced earlier",
      icon: "Gauge",
      href: "/financial-services/portfolio-monitoring-covenant-ai",
      ctaLabel: "View monitoring use case",
    },
    {
      title: "AR Collections & Receivables Intelligence",
      description:
        "Benchmark collection days, surface systemic credit and process issues, prioritize accounts, and maintain the weekly receivables roll-forward and reconciliation.",
      outcome: "Faster diagnosis and cleaner reconciliation",
      icon: "Coins",
      href: "/financial-services/ar-collections-receivables-ai",
      ctaLabel: "View collections use case",
    },
    {
      title: "Borrowing Base & Eligibility Validation",
      description:
        "Validate borrower-submitted borrowing base certificates against underlying detail, recompute eligible collateral and advance rates, and flag over-advances and formula errors.",
      outcome: "Over-advance risk caught on a recurring cadence",
      icon: "BadgeDollarSign",
    },
    {
      title: "13-Week Cash Flow & Restructuring Scenarios",
      description:
        "Build and maintain the 13-week model used in CRO, CFO, and bankruptcy engagements, and model restructuring options—refinance, asset sale, right-size, or wind-down.",
      outcome: "Defensible scenarios for stakeholders",
      icon: "Workflow",
    },
    {
      title: "Appraisal & Asset-Recovery (NOLV) Intelligence",
      description:
        "Structure inventory and equipment listings, research comparables, run gross-margin and recovery analysis, and accelerate NOLV, FLV, OLV, and FMV opinions.",
      outcome: "Less appraisal prep, appraiser stays central",
      icon: "PackageSearch",
    },
    {
      title: "Wind-Down & Liquidation Reporting",
      description:
        "Draft the recurring reporting wind-downs generate—DIP and cash-collateral budgets, budget-to-plan tracking, loan-to-value tracking, and bankruptcy schedules.",
      outcome: "Lower reporting effort during wind-downs",
      icon: "ScrollText",
    },
    {
      title: "Engagement Knowledge Base & Proposal Drafter",
      description:
        "A searchable, permissioned memory across past exams, models, and appraisals, plus an assistant that drafts scoped proposals and engagement letters from a short brief.",
      outcome: "Less time re-finding work, faster proposals",
      icon: "BookOpenCheck",
    },
    {
      title: "Commodity & Market Report Drafting",
      description:
        "Gather pricing, compute trailing trends, and draft recurring commodity or market reports for client distribution—turning a standing production task into a reviewed draft.",
      outcome: "Consistent reports with less monthly effort",
      icon: "TrendingUp",
    },
    {
      title: "Executive & Portfolio Briefing",
      description:
        "A governed daily or weekly digest across active engagements—borrowers trending negative, upcoming deadlines, covenant and collateral risks—with every figure traceable.",
      outcome: "Less principal time, faster decisions",
      icon: "Network",
    },
    {
      title: "Finance & Payment Anomaly Detection",
      description:
        "Surface duplicate payments, vendor master drift, unusual terms, and approval exceptions across borrower or firm finance data before they become problems.",
      outcome: "Cleaner finance operations and fewer leakage points",
      icon: "ShieldCheck",
    },
  ],
  assessment: {
    eyebrow: "Start here",
    title: "Financial Services AI Readiness Assessment",
    description:
      "ITECS starts by mapping the business case, data readiness, integration path, and governance model before recommending an agent build.",
    steps: [
      {
        title: "Map senior priorities",
        description:
          "Identify the lending, credit, advisory, and finance decisions where freeing senior judgment or faster turnaround would change outcomes.",
      },
      {
        title: "Review the data landscape",
        description:
          "Assess borrower agings, GL, inventory, bank statements, prior workpapers, models, and contracts for ownership, cleanliness, access, and gaps.",
      },
      {
        title: "Rank use cases by economics",
        description:
          "Prioritize use cases by senior hours freed, turnaround, risk reduction, and implementation feasibility—starting where data already arrives.",
      },
      {
        title: "Define the governed path",
        description:
          "Document security, approval, audit, deployment, and confidentiality requirements before any production AI system is built.",
      },
    ],
  },
  governance: [
    {
      title: "Read broadly, act carefully",
      description:
        "Financial-services AI can read across borrower and engagement data, but sensitive actions need explicit human approval and audit history.",
      points: [
        "No autonomous client communications, collateral-record changes, or finalized valuations",
        "Role-based access aligned to the firm's identity provider",
        "Recommendation logs that preserve assumptions, source data, and reviewer decisions",
      ],
    },
    {
      title: "Built for confidential financial work",
      description:
        "ITECS designs around the systems financial firms already run, on a managed-security foundation built for distressed-company and lender-collateral data.",
      points: [
        "Business and enterprise tiers that contractually isolate firm data and never train on it",
        "Audit-ready output for work that may be examined by lenders, courts, or in litigation support",
        "Delivered on ITECS's SOC 2 Type II, ISO 27001, and CMMC-aligned practice",
      ],
    },
  ],
  faq: [
    {
      question: "What types of financial-services firms can use ITECS AI services?",
      answer:
        "ITECS works with lenders, asset-based lenders, commercial finance groups, and advisory, turnaround, and restructuring firms. The hub examples cover field exams, collateral roll-forwards, cash flow models, portfolio monitoring, appraisals, AR management, and recurring reporting.",
    },
    {
      question: "Is this only for firms in Dallas?",
      answer:
        "No. The offer is national. Dallas is used as a credibility signal because ITECS is a Dallas-based MSP with more than two decades of infrastructure, cybersecurity, and managed-security experience.",
    },
    {
      question: "How do you handle confidential borrower and engagement data?",
      answer:
        "Everything is built for confidential financial work. ITECS uses business and enterprise tiers that contractually isolate the firm's data and never train on it, with role-based access, audit logs, and human approval before sensitive actions, on a SOC 2 Type II and ISO 27001 foundation.",
    },
    {
      question: "Do we need clean, integrated data before starting?",
      answer:
        "No. The readiness assessment determines whether existing borrower agings, GL, inventory, bank statements, prior workpapers, and contracts are enough for a pilot, or whether targeted cleanup should happen first.",
    },
    {
      question: "What is the best first AI use case for a financial firm?",
      answer:
        "The best first use case is the one with clean enough data, a senior owner, and measurable payback. For many asset-based lenders and advisory firms, the field examination analyzer is a strong first candidate because the data already arrives and the output feeds the cash flow model.",
    },
  ],
};

export const FIELD_EXAM_ANALYZER_USE_CASE: FlagshipUseCaseContent = {
  title: "Field Examination Analyzer & Collateral Roll-Forward",
  shortTitle: "Field Exam Analyzer",
  description:
    "Governed field examination analyzer for asset-based lending—collateral roll-forward, dilution, turnover, ineligibles, borrowing-base availability, and first-draft executive reports.",
  href: "/financial-services/field-examination-analyzer",
  h1: "Field Examination Analyzer for Asset-Based Lending",
  eyebrow: "Collateral Roll-Forward and Working-Capital Exam Intelligence",
  heroSummary:
    "The field examination analyzer ingests borrower agings, inventory, GL, and bank statements and produces the standard working-capital exam—roll-forward, dilution, turnover, ineligibles, concentrations, and a first-draft executive report—so examiners move straight to findings and judgment.",
  longDescription:
    "Built for asset-based lenders and advisory firms, the analyzer turns raw borrower data and prior workpapers into traceable collateral analysis and net borrowing availability. It drafts; the examiner reviews, adjusts, and signs—and every figure traces back to its source document.",
  primaryCta: "Schedule a Field Exam Analyzer Workshop",
  primaryCtaHref: "/contact",
  secondaryCta: "Start with a Financial Services AI Readiness Assessment",
  secondaryCtaHref: "/financial-services",
  keywords: [
    "field examination analyzer",
    "asset-based lending AI",
    "collateral roll-forward AI",
    "borrowing base AI",
    "field exam automation",
    "ABL field exam software",
    "working capital exam AI",
  ],
  stats: [
    { value: "Borrower", label: "Agings, inventory, GL, and bank data" },
    { value: "Hours", label: "To a first-draft executive report" },
    { value: "Human", label: "Review before the exam is issued" },
  ],
  exposureWaterfall: FIELD_EXAM_COLLATERAL_WATERFALL,
  capabilities: [
    {
      title: "Collateral roll-forward automation",
      description:
        "Normalize borrower data and run the standard working-capital exam so examiners start from findings instead of data prep.",
      points: [
        "AR collateral roll-forward, turnover, and dilution analysis",
        "Ineligibles, past-dues, cross-age, and concentration testing",
        "Inventory turnover and gross-margin testing with source traceability",
      ],
    },
    {
      title: "Availability and over-advance detection",
      description:
        "Step eligible collateral down to advance rates and surface over-advance risk before the next funding decision.",
      points: [
        "Eligible-collateral and advance-rate recomputation",
        "Borrowing-base certificate validation against underlying detail",
        "Over-advance and reserve-adequacy flags with supporting evidence",
      ],
    },
    {
      title: "Exam-to-report and model handoff",
      description:
        "Produce a structured workpaper set and a first-draft executive report that also feeds the comprehensive cash flow model.",
      points: [
        "First-draft executive report in the firm's format",
        "Structured workpaper set ready for reviewer adjustment",
        "Clean exam output that shortens the downstream cash flow model",
      ],
    },
  ],
  dataInputs: [
    {
      label: "AR and AP agings",
      description:
        "Detailed receivable and payable agings with customer, terms, cross-age, and past-due detail.",
    },
    {
      label: "Inventory listings",
      description:
        "Raw, WIP, and finished-goods detail with categories, valuation method, and slow-moving or obsolete flags.",
    },
    {
      label: "General ledger",
      description:
        "Trial balance and GL detail to reconcile collateral against the borrower's books.",
    },
    {
      label: "Bank statements",
      description:
        "Cash activity and collections to support dilution, turnover, and collateral-to-cash reconciliation.",
    },
    {
      label: "Prior workpapers",
      description:
        "Previous exams, eligibility definitions, and report formats that supply most of the structure for the next exam.",
    },
    {
      label: "Borrowing base certificates",
      description:
        "Borrower-submitted certificates and loan-agreement terms for eligibility, advance rates, and reserves.",
    },
  ],
  scenario: {
    title: "Anonymized asset-based lending exam scenario",
    problem:
      "An asset-based lender and its advisory partner want to standardize working-capital field exams across a portfolio, reproduce the roll-forward, dilution, and ineligible analysis consistently, and see availability risk before the next funding.",
    outcome:
      "ITECS scopes a governed field examination analyzer that connects borrower agings, inventory, GL, bank statements, and prior workpapers into a structured exam, a first-draft executive report, and net availability with over-advance flags for examiner review.",
  },
  workflow: [
    {
      title: "Ingest",
      description:
        "Read approved borrower agings, inventory, GL, bank statements, and prior workpapers without altering any records.",
    },
    {
      title: "Normalize",
      description:
        "Standardize formats, map eligibility definitions, and reconcile collateral against the general ledger and cash.",
    },
    {
      title: "Analyze",
      description:
        "Run the roll-forward, dilution, turnover, ineligible, and concentration tests with traceable assumptions.",
    },
    {
      title: "Draft",
      description:
        "Produce the structured workpaper set, net availability, and a first-draft executive report in the firm's format.",
    },
    {
      title: "Approve",
      description:
        "Route the exam to the examiner to review, adjust, and sign before anything is issued to the lender.",
    },
  ],
  roadmap: [
    {
      step: "Discovery workshop",
      description:
        "Confirm exam methodology, eligibility definitions, report format, data sources, and the approval matrix.",
    },
    {
      step: "Historical exam reproduction",
      description:
        "Rebuild recent exams and reconcile the analyzer's output against issued reports and workpapers.",
    },
    {
      step: "Availability and over-advance model",
      description:
        "Add advance-rate logic, reserves, and trend signals so examiners see availability risk before funding.",
    },
    {
      step: "Recommendation and review workflow",
      description:
        "Add human-in-the-loop review, executive-report drafting, and the handoff into the cash flow model.",
    },
  ],
  comparison: [
    {
      label: "Exam turnaround",
      traditional: "Days of manual data prep per exam",
      ai: "First-draft exam in hours, examiner reviews findings",
    },
    {
      label: "Consistency",
      traditional: "Varies by examiner and engagement",
      ai: "Standardized roll-forward, dilution, and ineligible tests",
    },
    {
      label: "Availability visibility",
      traditional: "Known at exam time only",
      ai: "Recomputed with over-advance and reserve flags",
    },
    {
      label: "Reporting",
      traditional: "Executive report written from scratch",
      ai: "First-draft report in the firm's format",
    },
    {
      label: "Governance",
      traditional: "Assumptions live in spreadsheets",
      ai: "Versioned assumptions and source-traceable workpapers",
    },
  ],
  governance: [
    "The analyzer is read-heavy and write-controlled: it can analyze, draft, flag, and recommend.",
    "It does not finalize valuations, alter collateral records, or issue reports without examiner review.",
    "All output preserves source data, assumptions, eligibility logic, and the reviewer's decision.",
    "Built for confidential work that may be examined by lenders, courts, or in litigation support.",
  ],
  faq: [
    {
      question: "What is a field examination in asset-based lending?",
      answer:
        "A field examination is a periodic review of a borrower's collateral and financial records—receivables, inventory, payables, and cash—used to validate the borrowing base, test eligibility, and confirm a lender's collateral position.",
    },
    {
      question: "What does the field examination analyzer do?",
      answer:
        "It reads approved borrower agings, inventory, GL, and bank statements to produce the standard working-capital exam—roll-forward, dilution, turnover, ineligibles, and a first-draft executive report—for examiner review and approval.",
    },
    {
      question: "Does it replace the field examiner?",
      answer:
        "No. The analyzer drafts the exam and surfaces findings; the examiner reviews, adjusts, and signs. Every figure traces back to its source document, and no report is issued without human approval.",
    },
    {
      question: "How does it connect to the cash flow model?",
      answer:
        "A clean, structured exam supplies most of the inputs for the comprehensive cash flow model, so the same output that validates collateral also shortens the downstream forecast work.",
    },
    {
      question: "Is our borrower data kept confidential?",
      answer:
        "Yes. The analyzer runs on business or enterprise tiers that contractually isolate the firm's data and never train on it, with role-based access, audit logs, and a SOC 2 Type II and ISO 27001 foundation.",
    },
    {
      question: "What data is needed for a discovery workshop?",
      answer:
        "ITECS typically asks for exam methodology, eligibility definitions, sample reports and workpapers, AR and AP agings, inventory listings, GL detail, bank statements, and borrowing base certificates.",
    },
  ],
};

export const FINANCIAL_SERVICES_SPOKE_PAGES: VerticalSpokePageContent[] = [
  {
    slug: "cash-flow-model-builder",
    title: "Cash Flow Modeling AI for Lenders & Advisory Firms",
    shortTitle: "Cash Flow Modeling",
    description:
      "AI that assembles full financial-statement forecasts—balance sheet, P&L, EBITDA, working-capital roll-forward, and borrowing-base availability—from borrower data and prior workpapers.",
    href: "/financial-services/cash-flow-model-builder",
    h1: "Comprehensive Cash Flow Modeling for Financial Services",
    eyebrow: "Financial-services AI for forecast speed",
    heroSummary:
      "ITECS helps lenders and advisory firms assemble comprehensive cash flow models—balance sheet, P&L with EBITDA, working-capital roll-forward, and borrowing-base availability—in hours instead of days, because a completed field exam and prior reports already supply most of the inputs.",
    longDescription:
      "The goal is not a prettier spreadsheet. It is a governed modeling workflow that turns existing exam output and borrower financials into a defensible forecast professionals review and sign, so senior judgment goes to the findings instead of the data assembly.",
    primaryCta: "Plan a Cash Flow Modeling Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Financial Services AI",
    secondaryCtaHref: "/financial-services",
    keywords: [
      "cash flow modeling AI",
      "financial forecast automation",
      "borrowing base availability model",
      "advisory cash flow model",
      "AI financial statement forecast",
    ],
    stats: [
      { value: "~80%", label: "of inputs already exist after an exam" },
      { value: "Hours", label: "to a first-draft model" },
      { value: "Human", label: "review before delivery" },
    ],
    pain: {
      eyebrow: "Modeling pressure",
      title: "Model Assembly Buries the Senior Judgment Clients Pay For",
      description:
        "Advisory and lending teams often rebuild comprehensive models by hand each engagement, even when a fresh field exam and prior reports already contain most of the inputs. The assembly work crowds out the analysis.",
      proof:
        "A governed modeling agent should assemble the statements, reconcile the math, and flag assumptions so professionals start from a defensible draft and move straight to scenarios and findings.",
    },
    chart: {
      mode: "matrix",
      eyebrow: "Illustrative model readiness",
      title: "How Much of the Model Already Exists",
      description:
        "Most of a comprehensive model is derivable from exam output and prior reports; the remaining inputs are where senior judgment belongs.",
      summaryMetric: {
        label: "Model build time",
        value: "~70% less",
        detail: "Assembly shifted to review when exam output is clean",
      },
      signals: [
        {
          label: "Field exam output",
          value: "Ready",
          detail: "Roll-forward, dilution, and eligibility already structured",
          score: 90,
          tone: "recoverable",
        },
        {
          label: "Historical financials",
          value: "Ready",
          detail: "Balance sheet, P&L, and EBITDA history available",
          score: 82,
          tone: "recoverable",
        },
        {
          label: "Working-capital roll-forward",
          value: "Derived",
          detail: "AR, inventory, and AP assembled from exam detail",
          score: 72,
          tone: "watch",
        },
        {
          label: "Forward assumptions",
          value: "Input needed",
          detail: "Where professionals apply judgment and scenarios",
          score: 44,
          tone: "risk",
        },
      ],
      notes: [
        "Reuses exam output and prior reports instead of rebuilding from scratch",
        "Keeps assumptions visible and source-traceable for review",
        "Separates derivable assembly from the judgment that needs a human",
      ],
    },
    capabilities: [
      {
        title: "Statement forecast assembly",
        description:
          "Build the integrated balance sheet, P&L with EBITDA, and working-capital roll-forward from exam output and historical financials.",
        points: [
          "Integrated three-statement structure with traceable inputs",
          "Working-capital roll-forward derived from exam detail",
          "First-draft model in the firm's format for review",
        ],
      },
      {
        title: "Borrowing-base and availability math",
        description:
          "Connect the forecast to eligible collateral and advance rates so availability moves with the model.",
        points: [
          "Borrowing-base availability tied to forecast collateral",
          "Covenant and liquidity checks across the projection",
          "Reconciliation against the field exam and prior reports",
        ],
      },
      {
        title: "Scenario and sensitivity",
        description:
          "Turn the base model into scenarios stakeholders can interrogate without rebuilding the workbook.",
        points: [
          "Upside, downside, and stress scenarios with shared assumptions",
          "Sensitivity on margin, collections, and advance rates",
          "Draft commentary with source-backed rationale",
        ],
      },
    ],
    scenario: {
      title: "Anonymized cash flow modeling scenario",
      description:
        "An advisory firm needs to deliver a comprehensive model quickly after a field exam, without rebuilding the statements by hand each time.",
      startingPoint:
        "Models are reassembled in spreadsheets per engagement, even though the recent exam and prior reports already contain most of the inputs.",
      scopedOutcome:
        "ITECS scopes a modeling agent that assembles the statements from exam output, reconciles the math, flags assumptions, and produces a first-draft model and scenarios for professional review.",
    },
    dataInputs: [
      {
        label: "Field exam output",
        description:
          "Collateral roll-forward, dilution, eligibility, and turnover detail from the most recent exam.",
      },
      {
        label: "Historical financials",
        description:
          "Balance sheet, P&L, EBITDA, and trial-balance history for the borrower or company.",
      },
      {
        label: "Working-capital detail",
        description:
          "AR, inventory, and AP detail used to build the roll-forward and liquidity view.",
      },
      {
        label: "Debt and borrowing base",
        description:
          "Debt schedule, advance rates, reserves, and covenant terms from the loan agreement.",
      },
      {
        label: "Management assumptions",
        description:
          "Forward revenue, margin, capex, and collections assumptions provided by professionals.",
      },
    ],
    workflow: [
      {
        title: "Ingest",
        description:
          "Read approved exam output, historical financials, and working-capital detail.",
      },
      {
        title: "Assemble",
        description:
          "Build the integrated statements and working-capital roll-forward with traceable inputs.",
      },
      {
        title: "Reconcile",
        description:
          "Tie the model back to the field exam, prior reports, and the borrowing base.",
      },
      {
        title: "Model",
        description:
          "Generate scenarios and sensitivities with shared, source-backed assumptions.",
      },
      {
        title: "Approve",
        description:
          "Route the draft model and commentary to professionals for review and sign-off.",
      },
    ],
    governance: [
      "The agent assembles and recommends, but professionals own and sign the model.",
      "It does not deliver a model or commentary to clients without human review.",
      "All assumptions, inputs, and reconciliations remain visible and source-traceable.",
      "Role-based access separates engagement, credit, and client-facing views.",
    ],
    roadmap: [
      {
        step: "Model method review",
        description:
          "Document the firm's model structure, conventions, and the exam-to-model handoff.",
      },
      {
        step: "Historical reproduction",
        description:
          "Rebuild a recent model and reconcile against the issued version.",
      },
      {
        step: "Scenario cockpit",
        description:
          "Add scenarios, sensitivities, and borrowing-base availability logic.",
      },
      {
        step: "Review workflow",
        description:
          "Embed assumptions, commentary drafts, and sign-off into the engagement cadence.",
      },
    ],
    comparison: [
      {
        label: "Model build",
        traditional: "Reassembled by hand each engagement",
        ai: "Assembled from exam output with traceable inputs",
      },
      {
        label: "Time to first draft",
        traditional: "Days of spreadsheet work",
        ai: "Hours, then professional review",
      },
      {
        label: "Scenarios",
        traditional: "Separate workbooks and versions",
        ai: "Shared assumptions with sensitivity views",
      },
      {
        label: "Governance",
        traditional: "Assumptions buried in cells",
        ai: "Versioned, source-traceable, and reviewed",
      },
    ],
    roiStatement:
      "The value is speed from engagement to advice: a defensible model in hours, more engagements per professional, and senior time spent on findings instead of assembly.",
    pricingNotes: [
      "Discovery starts with the firm's model structure and exam-to-model handoff",
      "The first proof point is reproducing a recent model and reconciling it",
      "Client delivery remains human-reviewed and human-signed",
    ],
    security: {
      description:
        "Cash flow models contain confidential borrower and company financials. ITECS scopes access so each role sees only the engagements and data it is permitted to use.",
      points: [
        "Business and enterprise tiers that isolate firm data and never train on it",
        "Versioned assumptions and source-traceable inputs",
        "No autonomous client delivery of models or commentary",
        "Audit history for model versions, assumptions, and approvals",
      ],
    },
    relatedHrefs: [
      "/financial-services/field-examination-analyzer",
      "/financial-services/portfolio-monitoring-covenant-ai",
      "/financial-services/ar-collections-receivables-ai",
    ],
    faq: [
      {
        question: "How is this different from a modeling template?",
        answer:
          "A template still has to be filled in by hand. The agent assembles the statements and working-capital roll-forward from exam output and historical financials, reconciles the math, and flags assumptions, so professionals start from a defensible draft.",
      },
      {
        question: "Does it replace the analyst or advisor?",
        answer:
          "No. It removes the assembly work so professionals spend time on scenarios, findings, and judgment. Professionals own, review, and sign every model.",
      },
      {
        question: "Why does so much of the model already exist?",
        answer:
          "Once a field exam is complete, the roll-forward, eligibility, and working-capital detail supply most of the inputs a comprehensive model needs, so the model is largely an assembly and reconciliation task.",
      },
      {
        question: "Can it produce scenarios for stakeholders?",
        answer:
          "Yes. The agent builds upside, downside, and stress scenarios on shared assumptions, with sensitivity on margin, collections, and advance rates, and draft commentary for review.",
      },
      {
        question: "What is needed for a modeling pilot?",
        answer:
          "A focused pilot typically starts with the firm's model structure, a recent field exam, historical financials, the debt and borrowing-base terms, and the forward assumptions professionals normally apply.",
      },
    ],
  },
  {
    slug: "portfolio-monitoring-covenant-ai",
    title: "Portfolio Monitoring & Covenant Early-Warning AI",
    shortTitle: "Portfolio Monitoring",
    description:
      "AI that continuously watches borrower reporting for negative trends, covenant-breach risk, and deteriorating collateral so periodic review becomes continuous signal.",
    href: "/financial-services/portfolio-monitoring-covenant-ai",
    h1: "Portfolio Monitoring and Covenant Early-Warning",
    eyebrow: "Financial-services AI for continuous risk",
    heroSummary:
      "ITECS helps lenders turn periodic borrower reporting into continuous monitoring—surfacing covenant-breach risk, collateral deterioration, and negative trends early enough to act, with every alert traceable to its source.",
    longDescription:
      "Monitoring is not useful when it only produces a stack of reports. It becomes valuable when it ranks borrowers by risk, explains what changed, and surfaces the enhanced-scope trigger before a credit becomes a problem.",
    primaryCta: "Plan a Portfolio Monitoring Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Financial Services AI",
    secondaryCtaHref: "/financial-services",
    keywords: [
      "portfolio monitoring AI",
      "covenant compliance AI",
      "credit early warning system",
      "borrower risk monitoring",
      "AI loan portfolio monitoring",
    ],
    stats: [
      { value: "Continuous", label: "borrower risk signal" },
      { value: "Covenant", label: "headroom and breach tracking" },
      { value: "Human", label: "review before action" },
    ],
    pain: {
      eyebrow: "Monitoring pressure",
      title: "Troubled Credits Are Usually Visible Before They Default",
      description:
        "Negative trends often show up across borrowing-base reporting, agings, and financials before a covenant breach, but periodic review can miss them until the next cycle.",
      proof:
        "A monitoring agent should rank borrowers by risk, explain what changed, and surface covenant and collateral deterioration early instead of waiting for the next reporting period.",
    },
    chart: {
      mode: "matrix",
      eyebrow: "Illustrative borrower risk matrix",
      title: "Portfolio Risk by Borrower and Signal",
      description:
        "A monitoring view should show which borrowers deserve attention first because they combine covenant pressure with collateral or trend deterioration.",
      summaryMetric: {
        label: "Exposure on watch",
        value: "$6.1M",
        detail: "Commitment tied to borrowers trending negative",
      },
      signals: [
        {
          label: "Borrower A",
          value: "High",
          detail: "Covenant headroom and dilution both deteriorating",
          score: 88,
          tone: "risk",
        },
        {
          label: "Borrower B",
          value: "Watch",
          detail: "Aging drift and slowing collections",
          score: 62,
          tone: "watch",
        },
        {
          label: "Borrower C",
          value: "Stable",
          detail: "Reporting within expected ranges",
          score: 30,
          tone: "stable",
        },
        {
          label: "Recoverable items",
          value: "$540K",
          detail: "Ineligibles that may clear with documentation",
          score: 58,
          tone: "recoverable",
        },
      ],
      notes: [
        "Ranks borrowers by covenant pressure and collateral trend",
        "Explains what changed instead of just flagging a value",
        "Surfaces the enhanced-scope trigger before the next cycle",
      ],
    },
    capabilities: [
      {
        title: "Continuous trend detection",
        description:
          "Watch borrowing-base reporting, agings, and financials for negative movement between exams.",
        points: [
          "Dilution, aging, and turnover drift detection",
          "Collateral deterioration and concentration shifts",
          "Plain-language explanation of what changed and why",
        ],
      },
      {
        title: "Covenant early-warning",
        description:
          "Track covenant headroom across the book and flag borrowers approaching a breach.",
        points: [
          "Fixed-charge, leverage, and liquidity covenant tracking",
          "Headroom trend and projected breach timing",
          "Enhanced-scope and reappraisal triggers",
        ],
      },
      {
        title: "Portfolio prioritization",
        description:
          "Rank borrowers by risk and exposure so review time goes where it matters first.",
        points: [
          "Risk-and-exposure ranking across the active book",
          "Draft watch-list updates and review notes",
          "Source-traceable evidence for every alert",
        ],
      },
    ],
    scenario: {
      title: "Anonymized portfolio monitoring scenario",
      description:
        "A lender wants earlier warning on deteriorating credits without adding headcount to review every borrower report manually.",
      startingPoint:
        "Borrower reporting arrives on different cadences and is reviewed periodically, so negative trends can go unnoticed until the next exam.",
      scopedOutcome:
        "ITECS scopes a monitoring agent that ingests borrowing-base reporting and financials, ranks borrowers by risk, tracks covenant headroom, and drafts watch-list updates for credit review.",
    },
    dataInputs: [
      {
        label: "Borrowing-base reporting",
        description:
          "Recurring borrowing-base certificates, agings, and collateral detail by borrower.",
      },
      {
        label: "Borrower financials",
        description:
          "Periodic financial statements, compliance certificates, and covenant calculations.",
      },
      {
        label: "Loan agreement terms",
        description:
          "Covenant definitions, advance rates, reserves, and reporting requirements.",
      },
      {
        label: "Exam and appraisal history",
        description:
          "Prior field exams and appraisals used as a baseline for trend detection.",
      },
      {
        label: "Watch-list and notes",
        description:
          "Existing watch-list status, review notes, and risk ratings where available.",
      },
    ],
    workflow: [
      {
        title: "Ingest",
        description:
          "Read approved borrowing-base reporting, financials, and covenant calculations.",
      },
      {
        title: "Detect",
        description:
          "Identify negative trends, covenant pressure, and collateral deterioration.",
      },
      {
        title: "Prioritize",
        description:
          "Rank borrowers by risk and exposure with supporting evidence.",
      },
      {
        title: "Explain",
        description:
          "Draft watch-list updates and review notes that explain what changed.",
      },
      {
        title: "Review",
        description:
          "Route alerts and recommendations to credit and portfolio managers for action.",
      },
    ],
    governance: [
      "The agent monitors and recommends, but credit officers decide and act.",
      "It does not change risk ratings, send borrower communications, or alter loan terms.",
      "Every alert preserves its source data, calculation, and the reviewer's decision.",
      "Access is scoped by borrower, portfolio, and credit role.",
    ],
    roadmap: [
      {
        step: "Monitoring scope review",
        description:
          "Document reporting cadences, covenant definitions, and current watch-list process.",
      },
      {
        step: "Historical backtest",
        description:
          "Replay prior deterioration to confirm the agent would have flagged it earlier.",
      },
      {
        step: "Early-warning signals",
        description:
          "Add covenant headroom, trend, and collateral deterioration signals.",
      },
      {
        step: "Review workflow",
        description:
          "Embed watch-list updates, alerts, and approvals into the credit cadence.",
      },
    ],
    comparison: [
      {
        label: "Review cadence",
        traditional: "Periodic, report-by-report",
        ai: "Continuous with risk-ranked alerts",
      },
      {
        label: "Time to detection",
        traditional: "Found at the next exam or cycle",
        ai: "Surfaced as trends deteriorate",
      },
      {
        label: "Covenant tracking",
        traditional: "Checked at reporting dates",
        ai: "Headroom tracked with projected breach timing",
      },
      {
        label: "Evidence",
        traditional: "Reassembled for each review",
        ai: "Source-traceable behind every alert",
      },
    ],
    roiStatement:
      "The value is earlier intervention: troubled credits surfaced before default, lower loss given default, and senior time focused on the borrowers that matter.",
    pricingNotes: [
      "Discovery starts with reporting cadences and covenant definitions",
      "The first proof point is a backtest against credits that previously deteriorated",
      "Risk decisions and actions remain with credit officers",
    ],
    security: {
      description:
        "Portfolio monitoring touches confidential borrower reporting and credit data. ITECS scopes access so each role sees only the borrowers and portfolios it is permitted to review.",
      points: [
        "Business and enterprise tiers that isolate firm data and never train on it",
        "Source-traceable evidence behind every alert",
        "No autonomous borrower communications or rating changes",
        "Audit history for alerts, reviews, and approvals",
      ],
    },
    relatedHrefs: [
      "/financial-services/field-examination-analyzer",
      "/financial-services/cash-flow-model-builder",
      "/financial-services/ar-collections-receivables-ai",
    ],
    faq: [
      {
        question: "How is AI monitoring different from a covenant report?",
        answer:
          "A covenant report shows status at a point in time. The monitoring agent watches reporting continuously, ranks borrowers by risk, explains what changed, and surfaces covenant and collateral deterioration before the next cycle.",
      },
      {
        question: "Does it make credit decisions?",
        answer:
          "No. The agent monitors, ranks, and drafts watch-list updates. Credit officers make decisions and take action; the agent keeps every alert traceable to its source.",
      },
      {
        question: "Can it give earlier warning than periodic review?",
        answer:
          "Yes. Because it reads reporting as it arrives and tracks trends and covenant headroom continuously, it can surface deterioration earlier than a periodic, report-by-report review.",
      },
      {
        question: "Does it work across different reporting cadences?",
        answer:
          "Yes. The agent normalizes borrowing-base reporting and financials that arrive on different cadences so the portfolio can be compared on a consistent basis.",
      },
      {
        question: "What is needed for a monitoring pilot?",
        answer:
          "A focused pilot typically starts with recurring borrowing-base reporting, borrower financials, covenant definitions, prior exam history, and the current watch-list process.",
      },
    ],
  },
  {
    slug: "ar-collections-receivables-ai",
    title: "AR Collections & Receivables Intelligence AI",
    shortTitle: "AR Collections",
    description:
      "AI that benchmarks collection days, surfaces systemic credit and process issues, prioritizes accounts, and maintains the weekly receivables roll-forward and reconciliation.",
    href: "/financial-services/ar-collections-receivables-ai",
    h1: "AR Collections and Receivables Intelligence",
    eyebrow: "Financial-services AI for receivables",
    heroSummary:
      "ITECS helps lenders and advisory firms turn receivables data into collections intelligence—benchmarking collection days, surfacing systemic issues, prioritizing accounts, and maintaining the weekly roll-forward and collateral-to-cash reconciliation.",
    longDescription:
      "Collections work is often reactive and manual, especially when a legacy accounting system is gone. The goal is a governed receivables workflow that diagnoses what is slowing cash, prioritizes the accounts that matter, and keeps the reconciliation clean.",
    primaryCta: "Plan a Receivables Intelligence Workshop",
    primaryCtaHref: "/contact",
    secondaryCta: "Return to Financial Services AI",
    secondaryCtaHref: "/financial-services",
    keywords: [
      "AR collections AI",
      "receivables intelligence",
      "collections analytics AI",
      "ledgered receivables reconciliation",
      "accounts receivable AI",
    ],
    stats: [
      { value: "DSO", label: "benchmarked against peers" },
      { value: "Weekly", label: "roll-forward and reconciliation" },
      { value: "Human", label: "approval before outreach" },
    ],
    pain: {
      eyebrow: "Collections pressure",
      title: "Cash Is Slow and the Reason Is Buried in the Ledger",
      description:
        "Collections teams often work the loudest accounts instead of the most systemic ones, and reconciliation gets harder when the original accounting system is no longer available.",
      proof:
        "A receivables agent should index collection days against benchmarks, surface systemic credit and process issues, prioritize accounts, and keep the weekly roll-forward reconciled to cash.",
    },
    chart: {
      mode: "timeline",
      eyebrow: "Illustrative collections signal",
      title: "Where Receivables Cash Is Stuck",
      description:
        "A collections view should separate aging drift from systemic credit issues and show which accounts to work first.",
      summaryMetric: {
        label: "Cash tied up",
        value: "$3.4M",
        detail: "Past-due receivables above the expected DSO band",
      },
      signals: [
        {
          label: "Past-due concentration",
          value: "$1.6M",
          detail: "A few accounts driving most of the overdue balance",
          score: 86,
          tone: "risk",
        },
        {
          label: "DSO vs. benchmark",
          value: "+11 days",
          detail: "Collection days above the peer benchmark",
          score: 64,
          tone: "watch",
        },
        {
          label: "Dispute and deduction drag",
          value: "$420K",
          detail: "Balances stalled in disputes and short-pays",
          score: 52,
          tone: "watch",
        },
        {
          label: "Recoverable quick-wins",
          value: "$610K",
          detail: "Accounts likely to pay with prioritized outreach",
          score: 60,
          tone: "recoverable",
        },
      ],
      notes: [
        "Benchmarks collection days against peers and history",
        "Separates systemic credit issues from one-off late payers",
        "Keeps the weekly roll-forward reconciled to cash",
      ],
    },
    capabilities: [
      {
        title: "Collections diagnosis",
        description:
          "Index collection days against benchmarks and surface the systemic credit and process issues behind slow cash.",
        points: [
          "DSO and collection-days benchmarking by customer and segment",
          "Systemic issue detection across credit terms and processes",
          "Dispute, deduction, and short-pay pattern analysis",
        ],
      },
      {
        title: "Account prioritization",
        description:
          "Rank accounts by recoverable balance and likelihood so teams work the highest-value accounts first.",
        points: [
          "Priority queue by balance, age, and recovery likelihood",
          "Draft outreach summaries for collector review",
          "Recoverable quick-win identification",
        ],
      },
      {
        title: "Receivables reconciliation",
        description:
          "Maintain the weekly receivables roll-forward and the collateral-to-cash reconciliation, even without the original system.",
        points: [
          "Weekly AR roll-forward with traceable movement",
          "Collateral-to-cash reconciliation for lender reporting",
          "Reconstructed ledger views when legacy systems are gone",
        ],
      },
    ],
    scenario: {
      title: "Anonymized receivables scenario",
      description:
        "A company in a workout needs to accelerate collections and keep the receivables reconciliation clean for its lender, but the original accounting system is no longer available.",
      startingPoint:
        "Collections are worked reactively from spreadsheets, and the weekly roll-forward is rebuilt manually for lender reporting.",
      scopedOutcome:
        "ITECS scopes a receivables agent that benchmarks collection days, prioritizes accounts, drafts outreach summaries, and maintains the weekly roll-forward and collateral-to-cash reconciliation for review.",
    },
    dataInputs: [
      {
        label: "AR agings and history",
        description:
          "Detailed receivable agings, payment history, terms, and customer detail.",
      },
      {
        label: "Cash application",
        description:
          "Cash receipts and application detail to reconcile collections to the ledger.",
      },
      {
        label: "Disputes and deductions",
        description:
          "Dispute, deduction, short-pay, and credit-memo detail where available.",
      },
      {
        label: "Credit terms",
        description:
          "Customer credit terms, limits, and historical payment behavior.",
      },
      {
        label: "Lender reporting context",
        description:
          "Collateral-to-cash reporting requirements and prior roll-forward formats.",
      },
    ],
    workflow: [
      {
        title: "Ingest",
        description:
          "Read approved AR agings, cash application, and dispute detail.",
      },
      {
        title: "Diagnose",
        description:
          "Benchmark collection days and surface systemic credit and process issues.",
      },
      {
        title: "Prioritize",
        description:
          "Rank accounts by recoverable balance and likelihood of payment.",
      },
      {
        title: "Draft",
        description:
          "Prepare outreach summaries and the weekly roll-forward for review.",
      },
      {
        title: "Approve",
        description:
          "Route prioritized accounts and outreach to collectors before any contact.",
      },
    ],
    governance: [
      "The agent diagnoses, prioritizes, and drafts, but collectors approve outreach.",
      "It does not contact customers or change credit terms autonomously.",
      "The roll-forward and reconciliation preserve source data and movement.",
      "Access is scoped by customer, engagement, and collections role.",
    ],
    roadmap: [
      {
        step: "Receivables review",
        description:
          "Document AR data sources, reconciliation needs, and lender reporting format.",
      },
      {
        step: "Diagnostic baseline",
        description:
          "Benchmark DSO and identify systemic issues against historical data.",
      },
      {
        step: "Prioritization workflow",
        description:
          "Add the account priority queue and draft outreach summaries.",
      },
      {
        step: "Reconciliation cadence",
        description:
          "Automate the weekly roll-forward and collateral-to-cash reconciliation.",
      },
    ],
    comparison: [
      {
        label: "Account focus",
        traditional: "Loudest accounts worked first",
        ai: "Highest recoverable balance prioritized",
      },
      {
        label: "Diagnosis",
        traditional: "Anecdotal and manual",
        ai: "Benchmarked DSO and systemic-issue detection",
      },
      {
        label: "Reconciliation",
        traditional: "Rebuilt by hand each week",
        ai: "Maintained roll-forward, even without the legacy system",
      },
      {
        label: "Governance",
        traditional: "Outreach decisions undocumented",
        ai: "Reviewed, approved, and source-traceable",
      },
    ],
    roiStatement:
      "The value is faster cash and cleaner reporting: lower DSO, prioritized recovery, and a weekly reconciliation the lender can trust.",
    pricingNotes: [
      "Discovery starts with AR data availability and reconciliation needs",
      "The first proof point is a DSO benchmark and systemic-issue diagnosis",
      "Customer outreach remains human-approved",
    ],
    security: {
      description:
        "Receivables work exposes customer, credit, and payment data. ITECS scopes access so each role sees only the accounts and engagements it is permitted to work.",
      points: [
        "Business and enterprise tiers that isolate firm data and never train on it",
        "Source-traceable roll-forward and reconciliation",
        "No autonomous customer contact or credit-term changes",
        "Audit history for prioritization, outreach, and approvals",
      ],
    },
    relatedHrefs: [
      "/financial-services/field-examination-analyzer",
      "/financial-services/cash-flow-model-builder",
      "/financial-services/portfolio-monitoring-covenant-ai",
    ],
    faq: [
      {
        question: "How is this different from a collections report?",
        answer:
          "A report lists what is overdue. The agent benchmarks collection days, surfaces the systemic credit and process issues behind slow cash, prioritizes accounts by recoverable balance, and keeps the weekly roll-forward reconciled.",
      },
      {
        question: "Does it contact our customers automatically?",
        answer:
          "No. The agent drafts prioritized outreach summaries for collector review. Customer contact and credit-term changes require human approval.",
      },
      {
        question: "Can it work if our old accounting system is gone?",
        answer:
          "Yes. The agent can reconstruct ledgered-receivable views and maintain the roll-forward and collateral-to-cash reconciliation from available agings, cash application, and history.",
      },
      {
        question: "How does it prioritize accounts?",
        answer:
          "It ranks accounts by recoverable balance, age, and likelihood of payment so collectors work the highest-value accounts first instead of the loudest ones.",
      },
      {
        question: "What is needed for a receivables pilot?",
        answer:
          "A focused pilot typically starts with AR agings and payment history, cash application detail, dispute and deduction data, credit terms, and the lender reporting format.",
      },
    ],
  },
];

export function getFinancialServicesSpokePage(
  href: string
): VerticalSpokePageContent {
  const page = FINANCIAL_SERVICES_SPOKE_PAGES.find((item) => item.href === href);
  if (!page) {
    throw new Error(`Unknown financial-services spoke page: ${href}`);
  }
  return page;
}
