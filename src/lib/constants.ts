// ---------------------------------------------------------------------------
// ITECS.AI — Single source of truth for all structured content
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: "ITECS",
  legalName: "ITECS, LLC",
  url: "https://itecs.ai",
  mainSiteUrl: "https://itecsonline.com",
  tagline: "Practical AI for Dallas Businesses.",
  description:
    "ITECS helps small and mid-sized Dallas businesses save time and cut costs with practical AI automation, custom ChatGPT development, and hands-on AI consulting. 22+ years of IT operations expertise.",
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
  heroMetric: string;
  href: string;
  icon: string;
  keywords: string[];
  h1: string;
  features: string[];
  howItWorks: { step: string; description: string }[];
  toolsMentioned: string[];
  stats: { value: number; suffix: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "ai-consulting",
    title: "Small Business AI Consulting in Dallas",
    shortTitle: "AI Consulting",
    description:
      "We help Dallas businesses with 10–300 employees find the right AI tools to save time, cut costs, and automate manual work — without the enterprise price tag.",
    longDescription:
      "Most small businesses know AI could help, but don't know where to start. We sit down with your team, identify the tasks eating up the most time, and build a practical plan to automate them. No jargon, no year-long roadmaps — just clear steps to save your team 20+ hours a week.",
    heroMetric:
      "Our Dallas clients save an average of 20+ hours per week after implementing our AI recommendations.",
    href: "/services/ai-consulting",
    icon: "Brain",
    keywords: [
      "AI consulting for small business",
      "small business AI Dallas",
      "how to use AI in small business",
      "AI consultant Dallas",
      "AI readiness assessment Dallas",
    ],
    h1: "AI Consulting for Small Businesses in Dallas",
    features: [
      "Identify which manual tasks are costing you the most time and money",
      "Get a plain-English AI adoption plan tailored to your budget",
      "Evaluate tools like Microsoft Copilot, OpenAI, and custom AI options",
      "Train your staff to use AI tools safely and effectively",
      "Measure ROI with clear before-and-after KPIs",
      "Industry-specific guidance for healthcare, legal, finance, and manufacturing",
    ],
    howItWorks: [
      {
        step: "We audit your manual tasks",
        description:
          "We spend time with your team to find the repetitive, time-consuming workflows that are ripe for AI automation.",
      },
      {
        step: "We build a practical AI plan",
        description:
          "You get a prioritized roadmap with cost estimates, timelines, and the specific tools that fit your business and budget.",
      },
      {
        step: "We implement and train your team",
        description:
          "We set up the AI tools, integrate them with your existing systems, and train your staff until they're self-sufficient.",
      },
    ],
    toolsMentioned: [
      "Microsoft Copilot",
      "OpenAI API",
      "Azure OpenAI",
      "Google Vertex AI",
      "Custom GPT",
    ],
    stats: [
      { value: 20, suffix: "+", label: "Hours Saved per Week" },
      { value: 3.2, suffix: "x", label: "Average Client ROI" },
      { value: 45, suffix: "%", label: "Faster Than DIY Implementation" },
    ],
    faq: [
      {
        question: "How much does AI consulting cost for a small business?",
        answer:
          "Our engagements start with a two-week AI Insight Sprint for Dallas businesses, typically ranging from $3,000–$8,000 depending on complexity. Full implementation projects vary based on scope. We always provide a clear quote upfront with no hidden costs — and most clients see ROI within the first month.",
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
    slug: "managed-ai",
    title: "AI Automation & Workflow Management in Dallas",
    shortTitle: "AI Automation",
    description:
      "We build and manage AI-powered workflow automations for Dallas businesses — from lead follow-up to data entry to customer onboarding. Set it and forget it.",
    longDescription:
      "Your team shouldn't waste hours on tasks a machine can handle. We map your repetitive workflows — lead follow-ups, invoice processing, data entry, appointment scheduling — and automate them with AI tools like Zapier, Make, Microsoft Power Automate, and custom integrations. Then we monitor everything so it keeps running smoothly.",
    heroMetric:
      "Dallas businesses using our AI automation save an average of 40% on operational costs.",
    href: "/services/managed-ai",
    icon: "Activity",
    keywords: [
      "AI workflow automation for small business",
      "automate lead follow up with AI",
      "AI automation Dallas",
      "workflow automation Dallas",
      "small business automation",
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
    howItWorks: [
      {
        step: "We map your repetitive workflows",
        description:
          "We identify the manual tasks your team does every day — lead follow-ups, data entry, scheduling, report generation — and rank them by time wasted.",
      },
      {
        step: "We build automated AI pipelines",
        description:
          "Using tools like Zapier, Make, Power Automate, and custom AI, we connect your existing systems and automate the workflows that eat up the most hours.",
      },
      {
        step: "We monitor and optimize continuously",
        description:
          "We don't just set it and leave. Our team monitors your automations 24/7, fixes issues before you notice, and optimizes for even more time savings.",
      },
    ],
    toolsMentioned: [
      "Zapier",
      "Make",
      "Microsoft Power Automate",
      "HubSpot AI",
      "OpenAI API",
    ],
    stats: [
      { value: 40, suffix: "%", label: "Avg. Cost Reduction" },
      { value: 99.9, suffix: "%", label: "Automation Uptime" },
      { value: 2, suffix: "x", label: "Workload Without New Hires" },
    ],
    faq: [
      {
        question: "How much does AI workflow automation cost for a small business?",
        answer:
          "Setup costs for Dallas businesses typically range from $2,500–$10,000 depending on the number of workflows, with ongoing management starting at $500/month. Most clients break even within the first month through time savings alone.",
      },
      {
        question: "What tasks can you automate with AI?",
        answer:
          "The most common automations we build for Dallas SMBs: lead follow-up emails and texts, appointment scheduling and reminders, invoice processing and data entry, customer onboarding sequences, report generation, and helpdesk ticket routing. If your team does it repeatedly, we can probably automate it.",
      },
      {
        question: "Do I need to change my existing software to use AI automation?",
        answer:
          "No. We integrate with the tools you already use — HubSpot, QuickBooks, Outlook, Teams, Slack, your CRM, your helpdesk. The whole point is connecting your existing stack, not replacing it.",
      },
      {
        question: "Can you automate lead follow-up with AI?",
        answer:
          "Yes — this is one of our most popular automations for Dallas businesses. We build AI-powered sequences that follow up with leads via email and text within minutes of form submission, qualify them based on your criteria, and route hot leads directly to your sales team. Most clients see a 30–50% improvement in lead response time.",
      },
    ],
  },
  {
    slug: "ai-chatbot-development",
    title: "Custom ChatGPT & AI Chatbot Development in Dallas",
    shortTitle: "Custom ChatGPT",
    description:
      "We build custom ChatGPT-style chatbots for Dallas businesses — trained on your data, connected to your systems, and handling customer questions 24/7.",
    longDescription:
      "Imagine a ChatGPT that only knows your business — your products, your policies, your pricing. We build secure, private AI chatbots that connect to your company data and answer customer questions, handle HR inquiries, and support your team around the clock. No hallucinations, no off-topic answers, just reliable AI that knows your business inside and out.",
    heroMetric:
      "Our custom business chatbots reduce customer support tickets by up to 40% for Dallas companies.",
    href: "/services/ai-chatbot-development",
    icon: "MessageSquareCode",
    keywords: [
      "custom ChatGPT for business data",
      "AI customer service bot for SMB",
      "custom chatbot development Dallas",
      "AI receptionist Dallas",
      "business chatbot Dallas",
    ],
    h1: "Custom ChatGPT for Your Dallas Business",
    features: [
      "A private ChatGPT trained exclusively on your business data",
      "Handles customer questions, HR inquiries, and internal support 24/7",
      "Connects securely to your knowledge base, CRM, and helpdesk",
      "Deploys on your website, Slack, Teams, SMS, or all of the above",
      "Escalates to a human when it can't answer — with full conversation context",
      "HIPAA and SOC 2 compliant options for regulated industries",
    ],
    howItWorks: [
      {
        step: "We connect to your business data securely",
        description:
          "We ingest your documentation, knowledge base, product info, and policies into a secure, private AI system. Your data never leaves your control.",
      },
      {
        step: "We build your custom ChatGPT",
        description:
          "We train an AI chatbot that only answers based on your data — no hallucinations, no off-topic responses. It knows your business and nothing else.",
      },
      {
        step: "We deploy and train your team",
        description:
          "We launch the chatbot on your website, Slack, Teams, or SMS. We train your team to manage it, and we keep optimizing based on real conversation data.",
      },
    ],
    toolsMentioned: [
      "OpenAI API",
      "CustomGPT",
      "Microsoft Copilot",
      "Slack",
      "Microsoft Teams",
    ],
    stats: [
      { value: 40, suffix: "%", label: "Fewer Support Tickets" },
      { value: 85, suffix: "%", label: "Query Resolution Rate" },
      { value: 3, suffix: "sec", label: "Avg. Response Time" },
    ],
    faq: [
      {
        question:
          "How much does a custom AI chatbot cost for a small business?",
        answer:
          "Custom ChatGPT development for Dallas businesses typically ranges from $5,000–$15,000 for initial setup, depending on the number of data sources and channels. Ongoing hosting and management starts at $300/month. We provide transparent pricing upfront.",
      },
      {
        question: "How do I build a custom ChatGPT for my customer service team?",
        answer:
          "That's exactly what we do. We connect your company documentation, FAQs, product guides, and support history to a private AI model. The result is a chatbot that answers customer questions accurately using only your data — deployed on your website, Slack, Teams, or SMS within 2–4 weeks.",
      },
      {
        question:
          "Will the chatbot make up answers or go off-topic?",
        answer:
          "No. We implement strict data boundaries and confidence scoring. When the chatbot can't find an answer in your data, it says so and escalates to a human team member with full conversation context — rather than making something up.",
      },
      {
        question: "Can the chatbot connect to our CRM and helpdesk?",
        answer:
          "Yes. We build integrations with HubSpot, Salesforce, HaloPSA, ConnectWise, Hudu, ServiceNow, and custom APIs. Your chatbot pulls live data from the tools your team already uses.",
      },
    ],
  },
  {
    slug: "ai-security-compliance",
    title: "AI Security & Data Protection for Dallas Businesses",
    shortTitle: "AI Security",
    description:
      "We help Dallas businesses use AI safely — protecting sensitive data, meeting HIPAA/SOX/FINRA requirements, and keeping your company data out of public AI models.",
    longDescription:
      "Worried about employees pasting company data into ChatGPT? You should be. We help Dallas businesses set up AI tools the right way — with proper data boundaries, compliance controls, and security monitoring. Whether you need HIPAA compliance for healthcare or SOX alignment for finance, we make sure your AI usage doesn't create liability.",
    heroMetric:
      "100% compliance pass rate across every HIPAA, SOX, and FINRA audit we've supported.",
    href: "/services/ai-security-compliance",
    icon: "ShieldCheck",
    keywords: [
      "how to secure business data from ChatGPT",
      "AI cybersecurity Dallas",
      "HIPAA AI compliance Dallas",
      "AI data protection small business",
      "AI security Dallas",
    ],
    h1: "AI Security & Data Protection in Dallas",
    features: [
      "Prevent sensitive company data from leaking into public AI models",
      "HIPAA, SOX, FINRA, and CMMC compliance for AI systems",
      "Private AI deployments that keep your data under your control",
      "Employee AI usage policies and training",
      "Automated PHI/PII redaction before data enters any AI model",
      "Security assessments and penetration testing for AI applications",
    ],
    howItWorks: [
      {
        step: "We assess your current AI security posture",
        description:
          "We audit how your team is using AI today — ChatGPT, Copilot, other tools — and identify where sensitive data is at risk of leaking.",
      },
      {
        step: "We implement secure AI data handling",
        description:
          "We set up private AI environments, data boundaries, automatic PII redaction, and compliance controls tailored to your industry's regulations.",
      },
      {
        step: "We monitor and maintain compliance",
        description:
          "We provide ongoing monitoring, employee training updates, and audit-ready documentation so you stay compliant as regulations evolve.",
      },
    ],
    toolsMentioned: [
      "Azure OpenAI",
      "Microsoft Purview",
      "SentinelOne",
      "Microsoft Copilot",
      "OpenAI API",
    ],
    stats: [
      { value: 100, suffix: "%", label: "Compliance Pass Rate" },
      { value: 0, suffix: "", label: "Data Breaches" },
      { value: 50, suffix: "+", label: "Audits Supported" },
    ],
    faq: [
      {
        question: "How do I secure my business data from ChatGPT?",
        answer:
          "The biggest risk is employees pasting sensitive information — customer records, financial data, proprietary documents — into public ChatGPT. We solve this by deploying private AI instances (Azure OpenAI, on-premise models) that keep your data within your control, implementing DLP (data loss prevention) policies, and training your staff on safe AI usage.",
      },
      {
        question: "How much does AI security compliance cost for a small business?",
        answer:
          "AI security assessments for Dallas businesses start at $2,500. Full compliance implementation (HIPAA, SOX, etc.) ranges from $5,000–$20,000 depending on the scope. Ongoing compliance monitoring starts at $500/month. Most businesses find it far cheaper than the cost of a data breach or failed audit.",
      },
      {
        question: "Can AI be HIPAA compliant?",
        answer:
          "Yes, when properly set up. We deploy AI on HIPAA-compliant infrastructure like Azure OpenAI with private endpoints, implement automatic PHI redaction before data enters the model, maintain audit logs, and ensure BAA coverage across all processing components. We've maintained a 100% compliance pass rate for all HIPAA AI deployments.",
      },
      {
        question: "Do you help with employee AI usage policies?",
        answer:
          "Yes. We draft and implement clear AI acceptable-use policies for your organization, train staff on what can and can't be shared with AI tools, and set up technical guardrails to enforce those policies automatically.",
      },
    ],
  },
  {
    slug: "ai-seo",
    title: "AI-Powered SEO & Generative Engine Optimization in Dallas",
    shortTitle: "AI SEO",
    description:
      "We help Dallas businesses rank in Google and AI search results like ChatGPT, Perplexity, and Google AI Overviews. Traditional SEO + the new rules of AI-powered search.",
    longDescription:
      "Google isn't the only search engine anymore. When your customers ask ChatGPT or Perplexity for recommendations, does your business show up? We optimize your online presence for both traditional search engines and AI assistants — so you get found no matter how people search.",
    heroMetric:
      "Our Dallas clients see an average 340% increase in organic traffic within 6 months.",
    href: "/services/ai-seo",
    icon: "Search",
    keywords: [
      "AI SEO Dallas",
      "generative engine optimization Dallas",
      "GEO services Dallas",
      "AI search optimization",
      "small business SEO Dallas",
    ],
    h1: "AI-Powered SEO & GEO for Dallas Businesses",
    features: [
      "Rank in ChatGPT, Perplexity, and Google AI Overviews — not just traditional search",
      "Structured data and schema markup that AI search engines love",
      "Content strategy built around the questions your customers actually ask",
      "LLMs.txt and AI.txt implementation for crawler accessibility",
      "Citation tracking across ChatGPT, Perplexity, and Google AI",
      "Technical SEO automation and monthly performance reporting",
    ],
    howItWorks: [
      {
        step: "We audit your visibility across Google and AI search",
        description:
          "We check how your business shows up in Google, ChatGPT, Perplexity, and other AI search tools. We identify gaps and missed opportunities.",
      },
      {
        step: "We optimize for both traditional and AI search",
        description:
          "We restructure your content, add schema markup, and implement GEO best practices so AI systems can understand and cite your business.",
      },
      {
        step: "We track and grow your citations",
        description:
          "We monitor how often AI assistants mention your business and continually optimize to increase your visibility across all search channels.",
      },
    ],
    toolsMentioned: [
      "Google Search Console",
      "Ahrefs",
      "ChatGPT",
      "Perplexity",
      "Google AI Overviews",
    ],
    stats: [
      { value: 340, suffix: "%", label: "Avg. Organic Traffic Increase" },
      { value: 12, suffix: "x", label: "AI Citation Growth" },
      { value: 90, suffix: "+", label: "Lighthouse SEO Score" },
    ],
    faq: [
      {
        question: "How much does AI SEO cost for a small business in Dallas?",
        answer:
          "Our Dallas AI SEO packages start at $1,500/month for small businesses, which includes both traditional SEO and generative engine optimization. One-time audits and setup projects range from $3,000–$8,000. We provide clear monthly reporting so you can see exactly what you're getting.",
      },
      {
        question: "What is Generative Engine Optimization (GEO)?",
        answer:
          "GEO is the practice of optimizing your website to appear in AI-generated search results — ChatGPT responses, Google AI Overviews, Perplexity answers. When someone asks an AI assistant 'What's the best AI consultant in Dallas?', GEO helps make sure your business gets cited in the answer.",
      },
      {
        question: "Is traditional SEO still relevant with AI search?",
        answer:
          "Absolutely. Traditional SEO is the foundation. AI search engines still rely on the same signals — quality content, domain authority, and structured data. GEO builds on top of strong traditional SEO. You need both to dominate search in 2026.",
      },
      {
        question: "How do you track whether AI search engines are recommending my business?",
        answer:
          "We monitor your brand mentions and citations across ChatGPT, Google AI Overviews, Perplexity, and Claude. We track how often your business is recommended, what queries trigger mentions, and how that changes month-over-month.",
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
  { value: 500, suffix: "+", label: "Dallas Endpoints Managed" },
  { value: 20, suffix: "+", label: "Hours Saved per Client Weekly" },
] as const;

// ---------------------------------------------------------------------------
// Homepage FAQ
// ---------------------------------------------------------------------------

export const FAQ_ITEMS = [
  {
    question: "How much does AI cost for a small business?",
    answer:
      "It depends on what you need. AI consulting engagements start at $3,000, workflow automations at $2,500, and custom chatbots at $5,000. Most of our Dallas clients see ROI within the first month. We provide transparent pricing upfront and never push unnecessary services.",
  },
  {
    question: "What makes ITECS different from other AI companies in Dallas?",
    answer:
      "We're not a startup that discovered AI last year. ITECS has been managing IT infrastructure for Dallas businesses since 2002. That means your AI tools are built by people who already understand networks, security, compliance, and the realities of running a business with 10–300 employees.",
  },
  {
    question: "How do I know if AI is right for my small business?",
    answer:
      "If your team spends time on repetitive tasks — data entry, report generation, customer follow-ups, answering the same questions, scheduling — AI can help. We offer a free initial assessment where we identify the tasks that are costing you the most time and show you exactly what AI can automate.",
  },
  {
    question: "Which AI tools do you work with?",
    answer:
      "We're vendor-neutral and work with Microsoft Copilot, OpenAI (ChatGPT), Azure OpenAI, Google Vertex AI, Zapier, Make, Power Automate, and custom-built solutions. We recommend what fits your business and budget — not what pays us the highest margin.",
  },
  {
    question: "How do I keep my company data safe when using AI?",
    answer:
      "This is one of the most common concerns for Dallas businesses adopting AI. The short answer: don't paste sensitive data into public ChatGPT. We deploy private AI instances, set up data loss prevention policies, train your staff, and ensure compliance with HIPAA, SOX, or whatever regulations apply to your industry.",
  },
  {
    question: "Can you build a custom ChatGPT for my business?",
    answer:
      "Yes — this is one of our most popular services. We build private AI chatbots trained exclusively on your company data that handle customer questions, internal HR inquiries, and support requests 24/7. They connect to your CRM, helpdesk, and knowledge base, and escalate to a human when they can't answer.",
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
    bio: "Brian founded ITECS in 2002 with a mission to deliver enterprise-grade IT to Dallas businesses without the enterprise price tag. With over two decades of hands-on operations experience, he now leads the firm's expansion into practical AI solutions for small and mid-sized businesses.",
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
      "We never deploy AI that puts your sensitive data at risk. Every tool we build uses private, secure AI environments — not public ChatGPT. Your customer records, financial data, and proprietary information stay under your control, always.",
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
      "Custom chatbots that pull live data from your existing systems",
      "Zapier and Make automations connecting everything together",
    ],
  },
] as const;
