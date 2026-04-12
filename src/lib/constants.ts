// ---------------------------------------------------------------------------
// ITECS.AI — Single source of truth for all structured content
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: "ITECS",
  legalName: "ITECS, LLC",
  url: "https://itecs.ai",
  mainSiteUrl: "https://itecsonline.com",
  tagline: "Intelligent Systems. Autonomous Operations.",
  description:
    "ITECS provides enterprise AI consulting, managed intelligence, chatbot development, and AI security compliance services in Dallas, TX. 22+ years of IT operations expertise.",
  phone: "(972) 408-2020",
  email: "info@itecsonline.com",
  foundingYear: 2002,
  address: {
    street: "500 N Central Expy, Suite 500",
    city: "Plano",
    state: "TX",
    zip: "75074",
    country: "US",
  },
  geo: { lat: 33.0198, lng: -96.6989 },
  social: {
    linkedin: "https://www.linkedin.com/company/itecsonline",
    facebook: "https://www.facebook.com/itecsonline",
  },
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  href: string;
  icon: string;
  keywords: string[];
  h1: string;
  features: string[];
  stats: { value: number; suffix: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting & Strategy",
    shortTitle: "AI Consulting",
    description:
      "Vendor-neutral AI readiness assessments, ROI modeling, and governance frameworks for Dallas enterprises across healthcare, finance, manufacturing, and legal.",
    longDescription:
      "We evaluate your operational landscape, identify high-impact AI opportunities, and build a phased adoption roadmap — without locking you into a single platform. From two-week insight sprints to full governance frameworks, every engagement is anchored in measurable business outcomes.",
    href: "/services/ai-consulting",
    icon: "Brain",
    keywords: [
      "AI Consulting Dallas",
      "AI Strategy Dallas",
      "AI Readiness Assessment",
      "AI ROI Modeling",
      "AI Governance Framework",
    ],
    h1: "AI Consulting & Strategy for Dallas Enterprises",
    features: [
      "AI readiness assessments tied to business KPIs",
      "Two-week Insight Sprints for rapid opportunity identification",
      "ROI modeling with 3.2x average return projections",
      "Governance and ethical AI framework development",
      "Vendor-neutral platform evaluation and selection",
      "Industry-specific use case mapping (healthcare, finance, legal, manufacturing)",
    ],
    stats: [
      { value: 3.2, suffix: "x", label: "Average Client ROI" },
      { value: 92, suffix: "%", label: "Security Compliance Rate" },
      { value: 45, suffix: "%", label: "Faster Implementation" },
    ],
    faq: [
      {
        question: "What does an AI consulting engagement look like?",
        answer:
          "Every engagement starts with a two-week Insight Sprint where we audit your data landscape, interview stakeholders, and identify the highest-ROI AI use cases for your industry. From there we deliver a prioritized roadmap with cost projections, timeline, and compliance considerations.",
      },
      {
        question: "Do you sell or recommend specific AI platforms?",
        answer:
          "No. ITECS is vendor-neutral — we evaluate Azure OpenAI, AWS Bedrock, Google Vertex, and open-source options against your requirements. Our recommendations are driven by fit, not vendor margins.",
      },
      {
        question: "How long until we see measurable results from AI?",
        answer:
          "Most clients see initial results within 4-6 weeks of a proof-of-concept deployment. Full production implementations typically run 8-12 weeks, with measurable KPI improvements tracked from day one.",
      },
    ],
  },
  {
    slug: "managed-ai",
    title: "Managed AI Operations",
    shortTitle: "Managed AI",
    description:
      "24/7 managed AI infrastructure, model monitoring, drift detection, and MLOps for Dallas businesses that need continuous, reliable AI operations.",
    longDescription:
      "Once your AI systems are in production, they need the same operational rigor as your core infrastructure. Our managed AI service provides 24/7 monitoring, automated drift detection, model retraining pipelines, and incident response — so your AI keeps delivering value without becoming a liability.",
    href: "/services/managed-ai",
    icon: "Activity",
    keywords: [
      "Managed AI Dallas",
      "AI Operations Dallas",
      "MLOps Dallas",
      "AI Monitoring",
      "Managed Intelligence Provider",
    ],
    h1: "Managed AI Operations for Dallas Businesses",
    features: [
      "24/7 model performance monitoring and alerting",
      "Automated drift detection and retraining triggers",
      "MLOps pipeline management (CI/CD for models)",
      "GPU and inference infrastructure optimization",
      "Cost monitoring and compute right-sizing",
      "Incident response and model rollback procedures",
    ],
    stats: [
      { value: 99.9, suffix: "%", label: "Uptime SLA" },
      { value: 24, suffix: "/7", label: "Operations Coverage" },
      { value: 40, suffix: "%", label: "Avg. Cost Reduction" },
    ],
    faq: [
      {
        question: "What is a managed intelligence provider?",
        answer:
          "A managed intelligence provider operates and maintains your AI systems post-deployment — handling monitoring, retraining, infrastructure, and incident response so your team can focus on business outcomes rather than model operations.",
      },
      {
        question: "Can you manage AI systems we built with another vendor?",
        answer:
          "Yes. We manage AI deployments across Azure OpenAI, AWS, Google Cloud, and custom on-premise installations regardless of who built the initial system.",
      },
      {
        question: "How do you handle model drift?",
        answer:
          "We deploy automated monitoring that tracks prediction accuracy, data distribution shifts, and feature importance changes. When drift is detected, our pipeline triggers retraining with fresh data and validates the new model before promotion to production.",
      },
    ],
  },
  {
    slug: "ai-chatbot-development",
    title: "AI Chatbot Development",
    shortTitle: "AI Chatbots",
    description:
      "Custom enterprise chatbot and RAG-powered knowledge assistant development for Dallas businesses. Multi-channel deployment with compliance-aware architecture.",
    longDescription:
      "We build intelligent conversational AI that actually knows your business. Using retrieval-augmented generation (RAG), your chatbot draws from your internal documentation, knowledge bases, and live data sources to deliver accurate, contextual responses — not generic AI hallucinations.",
    href: "/services/ai-chatbot-development",
    icon: "MessageSquareCode",
    keywords: [
      "AI Chatbot Development Dallas",
      "Enterprise Chatbot Dallas",
      "RAG Chatbot",
      "Knowledge Assistant AI",
      "Conversational AI Dallas",
    ],
    h1: "Custom AI Chatbot Development in Dallas",
    features: [
      "RAG-powered knowledge assistants grounded in your data",
      "Multi-channel deployment (web, Teams, Slack, SMS)",
      "HIPAA and SOC 2 compliant conversation handling",
      "Integration with Hudu, HaloPSA, ServiceNow, and custom APIs",
      "Conversation analytics and continuous improvement loops",
      "Fallback-to-human escalation with full context transfer",
    ],
    stats: [
      { value: 85, suffix: "%", label: "Query Resolution Rate" },
      { value: 60, suffix: "%", label: "Support Cost Reduction" },
      { value: 3, suffix: "sec", label: "Avg. Response Time" },
    ],
    faq: [
      {
        question: "What is a RAG-powered chatbot?",
        answer:
          "RAG (Retrieval-Augmented Generation) means the chatbot retrieves relevant information from your internal documents, databases, and knowledge bases before generating a response. This grounds answers in your actual data rather than relying solely on the AI model's training data.",
      },
      {
        question: "Can the chatbot integrate with our existing tools?",
        answer:
          "Yes. We build integrations with PSA platforms (HaloPSA, ConnectWise), documentation systems (Hudu, IT Glue), CRMs, ticketing systems, and custom APIs. The chatbot pulls live data from your existing stack.",
      },
      {
        question: "How do you ensure the chatbot doesn't hallucinate?",
        answer:
          "We implement strict retrieval boundaries, confidence scoring, and citation tracking. When the chatbot can't find a grounded answer in your data, it acknowledges the limitation and escalates to a human agent rather than generating unreliable information.",
      },
    ],
  },
  {
    slug: "ai-security-compliance",
    title: "AI Security & Compliance",
    shortTitle: "AI Security",
    description:
      "HIPAA, SOX, FINRA, and CMMC-aligned AI security assessments, PHI/PII redaction, data governance, and compliance frameworks for regulated Dallas industries.",
    longDescription:
      "AI systems handling sensitive data need security architectures that satisfy regulators, not just auditors. We design and implement compliance-first AI deployments with PHI/PII redaction, audit logging, access controls, and data governance frameworks built for healthcare, financial services, and government contractors.",
    href: "/services/ai-security-compliance",
    icon: "ShieldCheck",
    keywords: [
      "AI Security Compliance Dallas",
      "HIPAA AI Dallas",
      "AI Data Governance",
      "AI Compliance Framework",
      "PHI PII Redaction AI",
    ],
    h1: "AI Security & Compliance for Regulated Industries",
    features: [
      "HIPAA, SOX, FINRA, and CMMC compliance alignment",
      "PHI/PII automatic redaction and audit logging",
      "Azure OpenAI private networking and data residency",
      "Pre-deployment security assessments and penetration testing",
      "Data governance frameworks for AI training data",
      "Compliance documentation and regulator-ready reporting",
    ],
    stats: [
      { value: 100, suffix: "%", label: "Compliance Pass Rate" },
      { value: 0, suffix: "", label: "Data Breaches" },
      { value: 50, suffix: "+", label: "Compliance Audits Supported" },
    ],
    faq: [
      {
        question: "Can AI be HIPAA compliant?",
        answer:
          "Yes, when properly architected. We deploy AI systems on HIPAA-compliant infrastructure (Azure OpenAI with private endpoints), implement PHI redaction before data enters the model, maintain comprehensive audit logs, and ensure BAA coverage across all processing components.",
      },
      {
        question: "How do you handle AI training data governance?",
        answer:
          "We implement data lineage tracking, consent management, retention policies, and access controls for all training data. Every piece of data used to train or fine-tune models is documented, classified, and subject to your organization's data governance policies.",
      },
      {
        question: "What regulations do you cover?",
        answer:
          "We align AI deployments with HIPAA, SOX, FINRA, CMMC, GDPR, PCI DSS, and SOC 2 requirements. For industries with overlapping regulations, we build unified compliance frameworks that satisfy multiple standards simultaneously.",
      },
    ],
  },
  {
    slug: "ai-seo",
    title: "AI-Optimized SEO & GEO",
    shortTitle: "AI SEO",
    description:
      "Generative engine optimization (GEO), AI-driven content strategy, and technical SEO automation for Dallas businesses looking to dominate AI-powered search.",
    longDescription:
      "Search is evolving. AI-generated answers, knowledge panels, and conversational search are replacing traditional blue links. Our GEO service optimizes your digital presence for both traditional search engines and AI assistants — ensuring your business appears in ChatGPT responses, Google AI Overviews, and Perplexity citations.",
    href: "/services/ai-seo",
    icon: "Search",
    keywords: [
      "AI SEO Dallas",
      "Generative Engine Optimization",
      "GEO Services Dallas",
      "AI Content Strategy",
      "AI Search Optimization",
    ],
    h1: "AI-Optimized SEO & Generative Engine Optimization",
    features: [
      "Generative Engine Optimization (GEO) for AI-powered search",
      "LLMs.txt and AI.txt implementation for crawler accessibility",
      "Structured data and schema markup optimization",
      "AI-driven content strategy and topical authority mapping",
      "Technical SEO automation and site health monitoring",
      "Citation tracking across ChatGPT, Perplexity, and Google AI Overviews",
    ],
    stats: [
      { value: 340, suffix: "%", label: "Avg. Organic Traffic Increase" },
      { value: 12, suffix: "x", label: "AI Citation Growth" },
      { value: 90, suffix: "+", label: "Lighthouse SEO Score" },
    ],
    faq: [
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer:
          "GEO is the practice of optimizing your website and content to appear in AI-generated search results — including ChatGPT responses, Google AI Overviews, Perplexity answers, and other AI assistants that synthesize information from the web.",
      },
      {
        question: "Is traditional SEO still relevant?",
        answer:
          "Absolutely. Traditional SEO remains the foundation. GEO builds on top of strong technical SEO, quality content, and structured data. AI search engines still rely heavily on the same signals — domain authority, content relevance, and structured markup.",
      },
      {
        question: "How do you track AI search citations?",
        answer:
          "We monitor your brand mentions and content citations across major AI platforms including ChatGPT, Google AI Overviews, Perplexity, and Claude. This gives you visibility into how AI assistants reference your business when answering user queries.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Homepage stats
// ---------------------------------------------------------------------------

export const STATS = [
  { value: 22, suffix: "+", label: "Years of IT Operations" },
  { value: 92, suffix: "%", label: "Client Retention Rate" },
  { value: 500, suffix: "+", label: "Endpoints Managed" },
  { value: 3.2, suffix: "x", label: "Average AI ROI" },
] as const;

// ---------------------------------------------------------------------------
// Homepage FAQ
// ---------------------------------------------------------------------------

export const FAQ_ITEMS = [
  {
    question: "What makes ITECS different from other AI consulting firms in Dallas?",
    answer:
      "ITECS isn't a pure-play AI startup — we're a 22-year managed services provider that added AI capabilities on top of deep operational expertise. That means your AI strategy is built by people who understand enterprise infrastructure, security, compliance, and the realities of production IT environments.",
  },
  {
    question: "Do you only work with large enterprises?",
    answer:
      "No. While we serve enterprise clients, our AI consulting engagements are structured to meet businesses where they are — from two-week Insight Sprints for organizations exploring AI for the first time to full-scale managed AI operations for mature deployments.",
  },
  {
    question: "Which AI platforms do you work with?",
    answer:
      "We are vendor-neutral and work across Azure OpenAI, AWS Bedrock, Google Vertex AI, and open-source models. Our recommendations are driven by your requirements, compliance needs, and existing infrastructure — not vendor partnerships.",
  },
  {
    question: "How do you ensure AI security and compliance?",
    answer:
      "Security is embedded in every engagement. We deploy AI on compliant infrastructure, implement PHI/PII redaction, maintain audit logs, and align with HIPAA, SOX, FINRA, and CMMC frameworks. Every AI system undergoes a security assessment before production deployment.",
  },
  {
    question: "What industries do you specialize in for AI consulting?",
    answer:
      "We have deep expertise in healthcare (Dallas Medical District), financial services (Legacy West, Uptown), manufacturing and telecom (Richardson Corridor), and legal services. Each industry vertical has specific compliance requirements and AI use cases that we tailor our approach to.",
  },
  {
    question: "Can you help with AI if we don't have a data strategy yet?",
    answer:
      "Yes — that's often where we start. Our Insight Sprint includes a data landscape audit that identifies what data you have, where it lives, its quality, and how it can fuel AI initiatives. We help you build the data foundation before layering on AI capabilities.",
  },
  {
    question: "What is your pricing model for AI consulting?",
    answer:
      "We offer project-based engagements (Insight Sprints, POCs, implementations) and ongoing managed AI retainers. Pricing depends on scope and complexity. Contact us for a free initial assessment and custom quote.",
  },
] as const;

// ---------------------------------------------------------------------------
// Client / partner logos
// ---------------------------------------------------------------------------

export const CLIENT_LOGOS = [
  { name: "PepsiCo", src: "/images/clients/pepsico.webp", width: 120, height: 40 },
  { name: "Pizza Hut", src: "/images/clients/pizzahut.webp", width: 120, height: 40 },
  { name: "OpenText", src: "/images/clients/opentext.webp", width: 120, height: 40 },
  { name: "Miller", src: "/images/clients/miller.webp", width: 120, height: 40 },
  { name: "BE Farms", src: "/images/clients/befarms.webp", width: 120, height: 40 },
] as const;

export const PARTNER_LOGOS = [
  { name: "Microsoft Azure", src: "/images/partners/azure.svg", width: 100, height: 32 },
  { name: "Cisco", src: "/images/partners/cisco.svg", width: 100, height: 32 },
  { name: "SentinelOne", src: "/images/partners/sentinelone.svg", width: 120, height: 32 },
  { name: "Sophos", src: "/images/partners/sophos.svg", width: 100, height: 32 },
] as const;

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export const TEAM_MEMBERS = [
  {
    name: "Brian Desmot",
    title: "Founder & CEO",
    image: "/images/team/brian-desmot.webp",
    bio: "Brian founded ITECS in 2002 with a mission to deliver enterprise-grade IT to Dallas businesses. With over two decades of operational experience, he now leads the firm's expansion into AI consulting and managed intelligence services.",
  },
] as const;

// ---------------------------------------------------------------------------
// Homepage features (for FeatureShowcase)
// ---------------------------------------------------------------------------

export const HOMEPAGE_FEATURES = [
  {
    eyebrow: "Security-First AI",
    title: "Built on 22 Years of Operational Rigor",
    description:
      "Every AI system we deploy inherits the same security posture, monitoring, and incident response we've refined across two decades of managed IT operations. Your AI isn't an experiment — it's production infrastructure.",
    image: "/images/services/cybersecurity.webp",
    bullets: [
      "Pre-deployment security assessments",
      "HIPAA, SOX, and FINRA compliance alignment",
      "24/7 monitoring with automated drift detection",
      "Incident response and model rollback procedures",
    ],
  },
  {
    eyebrow: "Enterprise Integration",
    title: "AI That Connects to Your Existing Stack",
    description:
      "We don't build AI in a vacuum. Our integrations connect with your PSA, documentation, CRM, and ticketing systems — so AI delivers value through the tools your team already uses.",
    image: "/images/services/technology-desks.webp",
    bullets: [
      "Azure OpenAI, AWS Bedrock, Google Vertex integrations",
      "HaloPSA, Hudu, ServiceNow connectors",
      "RAG pipelines grounded in your knowledge base",
      "API development for legacy system modernization",
    ],
  },
] as const;
