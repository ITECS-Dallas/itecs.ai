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
  { label: "Consulting", href: "/consulting" },
  { label: "Custom ChatGPT", href: "/custom-chatgpt" },
  { label: "Automation", href: "/automation" },
  { label: "Training", href: "/training" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
    title: "Small Business AI Consulting in Dallas",
    shortTitle: "AI Consulting",
    description:
      "We help Dallas businesses with 10–300 employees find the right AI tools to save time, cut costs, and automate manual work — without the enterprise price tag.",
    longDescription:
      "Most small businesses know AI could help, but don't know where to start. We sit down with your team, identify the tasks eating up the most time, and build a practical plan to automate them. No jargon, no year-long roadmaps — just clear steps to save your team 20+ hours a week.",
    heroSummary:
      "We audit your team's manual workflows, identify the biggest time-wasters, and build a practical AI adoption plan that saves Dallas businesses an average of 20+ hours per week — with clear ROI projections and no vendor lock-in.",
    href: "/consulting",
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
          "You get a prioritized roadmap with cost estimates, timelines, and the specific tools that fit your business and budget. No 50-page decks — just actionable steps.",
      },
      {
        step: "We implement the tools and train your team",
        description:
          "We set up the AI tools, integrate them with your existing systems, and train your staff until they're self-sufficient. Most clients are up and running within 2–4 weeks.",
      },
    ],
    integrations: [
      "Microsoft Copilot",
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
    slug: "custom-chatgpt",
    title: "Custom ChatGPT & AI Chatbot Development in Dallas",
    shortTitle: "Custom ChatGPT",
    description:
      "We build custom ChatGPT-style chatbots for Dallas businesses — trained on your data, connected to your systems, and handling customer questions 24/7.",
    longDescription:
      "Imagine a ChatGPT that only knows your business — your products, your policies, your pricing. We build secure, private AI chatbots that connect to your company data and answer customer questions, handle HR inquiries, and support your team around the clock. No hallucinations, no off-topic answers, just reliable AI that knows your business inside and out.",
    heroSummary:
      "We build Custom ChatGPTs for your business that connect securely to your proprietary data, reducing customer support response times by up to 40% and eliminating manual data entry for your Dallas team.",
    href: "/custom-chatgpt",
    icon: "MessageSquareCode",
    keywords: [
      "custom ChatGPT for business data",
      "AI customer service bot for SMB",
      "custom chatbot development Dallas",
      "AI receptionist Dallas",
      "business chatbot Dallas",
      "how to build a custom ChatGPT",
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
    howItWorksHeading: "How to build a Custom ChatGPT for your business",
    howItWorks: [
      {
        step: "Audit current manual processes and data sources",
        description:
          "We identify which customer questions, HR inquiries, and support requests can be handled by AI, and map the data sources your chatbot needs access to.",
      },
      {
        step: "Connect your secure data via API and build your ChatGPT",
        description:
          "We ingest your documentation, knowledge base, and policies into a private AI system. Your data never leaves your control. The chatbot only answers based on your data — no hallucinations.",
      },
      {
        step: "Deploy across your channels and train your staff",
        description:
          "We launch the chatbot on your website, Slack, Teams, or SMS. We train your team to manage it and continuously optimize based on real conversation data.",
      },
    ],
    integrations: [
      "OpenAI API",
      "CustomGPT",
      "Microsoft Copilot",
      "Slack",
      "Microsoft Teams",
      "HubSpot",
      "Salesforce",
      "HaloPSA",
    ],
    stats: [
      { value: 40, suffix: "%", label: "Fewer Support Tickets" },
      { value: 85, suffix: "%", label: "Query Resolution Rate" },
      { value: 3, suffix: "sec", label: "Avg. Response Time" },
    ],
    faq: [
      {
        question: "How much does a custom AI chatbot cost for a small business?",
        answer:
          "Custom ChatGPT development for Dallas businesses typically ranges from $5,000–$15,000 for initial setup, depending on the number of data sources and channels. Ongoing hosting and management starts at $300/month. We provide transparent pricing upfront — no surprise invoices.",
      },
      {
        question: "How do I build a custom ChatGPT for my customer service team?",
        answer:
          "That's exactly what we do. We connect your company documentation, FAQs, product guides, and support history to a private AI model. The result is a chatbot that answers customer questions accurately using only your data — deployed on your website, Slack, Teams, or SMS within 2–4 weeks.",
      },
      {
        question: "How do I secure my business data from ChatGPT?",
        answer:
          "The biggest risk is employees pasting sensitive data into public ChatGPT. We solve this by deploying private AI instances (Azure OpenAI, on-premise models) that keep your data within your control, implementing DLP policies, and training your staff on safe AI usage. Your data never trains public models.",
      },
      {
        question: "Will the chatbot make up answers or go off-topic?",
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
    slug: "training",
    title: "AI Training for Employees in Dallas",
    shortTitle: "AI Training",
    description:
      "Hands-on AI training for your Dallas team — teach employees to use ChatGPT, Copilot, and automation tools safely and productively. No technical background required.",
    longDescription:
      "Your employees are already using AI — the question is whether they're using it safely and effectively. We train your team on the AI tools that matter: ChatGPT, Microsoft Copilot, automation platforms, and custom tools. Hands-on workshops, not boring slide decks. Your staff walks away knowing exactly how to use AI to do their job faster without putting company data at risk.",
    heroSummary:
      "We train your Dallas team to use AI tools like ChatGPT and Microsoft Copilot safely and productively — with hands-on workshops that cut task completion time by 30% while keeping sensitive company data secure.",
    href: "/training",
    icon: "GraduationCap",
    keywords: [
      "AI training for employees",
      "AI training Dallas",
      "ChatGPT training for business",
      "Microsoft Copilot training Dallas",
      "employee AI training small business",
    ],
    h1: "AI Training for Your Dallas Team",
    features: [
      "Hands-on workshops — your team practices with real work scenarios, not slides",
      "ChatGPT, Microsoft Copilot, and automation tool training",
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
          "Your team practices with real work scenarios using ChatGPT, Copilot, and automation tools. We cover prompt engineering, data safety, and role-specific use cases — not generic demos.",
      },
      {
        step: "Provide ongoing support and refresher training",
        description:
          "AI tools evolve fast. We provide monthly office hours, updated training materials, and refresher sessions so your team stays current and keeps getting value from AI.",
      },
    ],
    integrations: [
      "Microsoft Copilot",
      "ChatGPT / OpenAI",
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
          "Group workshops for Dallas businesses start at $2,000 for a half-day session covering up to 20 employees. Full-day deep dives and multi-session programs range from $4,000–$10,000. We also offer ongoing monthly training retainers starting at $500/month.",
      },
      {
        question: "Do my employees need a technical background for AI training?",
        answer:
          "No. Our training is designed for non-technical staff — sales reps, customer support agents, HR managers, accountants, and office admins. If they can use email, they can learn to use AI effectively.",
      },
      {
        question: "What AI tools do you train on?",
        answer:
          "We cover ChatGPT (free and Plus), Microsoft Copilot (Word, Excel, Outlook, Teams), automation platforms (Zapier, Make.com, Power Automate), and any custom AI tools your business uses. Training is customized to the tools your team will actually use.",
      },
      {
        question: "How do you handle AI data safety in training?",
        answer:
          "Data safety is built into every session. We teach employees exactly what they can and can't share with AI tools, set up company-wide AI usage policies, and show them how to use private AI instances for sensitive work. This is especially critical for healthcare, legal, and financial services teams in Dallas.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Insight / Spoke Pages
// ---------------------------------------------------------------------------

export interface InsightItem {
  slug: string;
  title: string;
  description: string;
  href: string;
  hubSlug: string;
  hubLabel: string;
  hubHref: string;
  keywords: string[];
  h1: string;
  content: string[];
  faq: { question: string; answer: string }[];
}

export const INSIGHTS: InsightItem[] = [
  {
    slug: "how-to-use-ai-small-business",
    title: "How to Use AI in a Small Business (2026 Guide)",
    description:
      "A practical guide for Dallas small business owners on using AI to automate tasks, reduce costs, and grow without hiring. From ChatGPT to workflow automation.",
    href: "/insights/how-to-use-ai-small-business",
    hubSlug: "consulting",
    hubLabel: "AI Consulting for Small Businesses",
    hubHref: "/consulting",
    keywords: [
      "how to use AI in small business",
      "AI for small business owners",
      "small business AI guide 2026",
      "AI tools for small companies",
    ],
    h1: "How to Use AI in Your Small Business",
    content: [
      "If you're running a Dallas business with 10–300 employees, AI isn't a luxury anymore — it's the difference between growing efficiently and drowning in manual work. The good news: you don't need a data science team or a six-figure budget to get started.",
      "**The first step is working with an experienced [AI consulting partner](/consulting) who understands small business operations.** At ITECS, we've helped dozens of Dallas businesses identify the manual tasks that cost them the most time — and automate them with practical AI tools.",
      "Here's the reality: most small businesses waste 15–25 hours per week on tasks that AI can handle. Data entry, customer follow-up emails, report generation, appointment scheduling, answering the same customer questions over and over. These aren't complex AI problems — they're workflow problems that modern tools like Microsoft Copilot, ChatGPT, Zapier, and Make.com solve today.",
      "The key is starting with the right tasks. Don't try to build a self-driving car — start by automating the three tasks your team complains about most. A good AI consultant will audit your workflows, estimate time savings, and have your first automation running within weeks, not months.",
      "For Dallas businesses in healthcare, legal, or financial services, data safety is critical. Public AI tools like ChatGPT shouldn't be used for sensitive data without proper guardrails. Private AI deployments and employee training ensure your team gets the productivity benefits without the security risks.",
    ],
    faq: [
      {
        question: "What's the easiest way to start using AI in a small business?",
        answer:
          "Start by identifying your team's top 3 most repetitive tasks. Then evaluate whether existing tools (Microsoft Copilot, ChatGPT) can automate them, or whether you need custom automation. A free AI assessment from a consultant like ITECS can identify quick wins in under an hour.",
      },
      {
        question: "How much does AI cost for a small business?",
        answer:
          "AI tools range from free (ChatGPT free tier) to a few hundred dollars per month (Microsoft Copilot, Zapier). Custom implementations like private chatbots or workflow automations typically cost $2,500–$15,000 to set up. Most Dallas businesses see ROI within the first month.",
      },
    ],
  },
  {
    slug: "secure-business-data-chatgpt",
    title: "How to Secure Your Business Data from ChatGPT",
    description:
      "Your employees are using ChatGPT at work. Here's how to protect sensitive company data, set up safe AI policies, and deploy private AI alternatives for your Dallas business.",
    href: "/insights/secure-business-data-chatgpt",
    hubSlug: "custom-chatgpt",
    hubLabel: "Custom ChatGPT for Business",
    hubHref: "/custom-chatgpt",
    keywords: [
      "how to secure business data from ChatGPT",
      "ChatGPT data security for business",
      "AI data protection small business",
      "private ChatGPT for business",
    ],
    h1: "How to Secure Your Business Data from ChatGPT",
    content: [
      "Your employees are almost certainly using ChatGPT at work — even if you haven't approved it. And every time they paste a customer email, financial report, or internal document into the public ChatGPT, that data potentially becomes training data for OpenAI's models.",
      "**The safest approach is deploying a [private Custom ChatGPT](/custom-chatgpt) that keeps your business data completely under your control.** At ITECS, we build secure, private AI chatbots for Dallas businesses that give your team all the productivity benefits of ChatGPT without the data leakage risks.",
      "Here's what you need to know: the free version of ChatGPT uses your conversations to train its models. That means customer PII, financial data, legal documents, and trade secrets can end up in OpenAI's training data. For Dallas businesses in healthcare (HIPAA), finance (SOX), or legal services, this isn't just risky — it's potentially a compliance violation.",
      "The fix isn't banning AI — it's channeling it safely. Deploy Azure OpenAI or private API instances where your data stays in your own environment. Set up DLP (data loss prevention) policies that block sensitive data from reaching public AI endpoints. Train your employees on what they can and can't share. And build custom AI tools that access your data securely through APIs, not copy-paste.",
      "At ITECS, we've deployed private ChatGPT solutions for dozens of Dallas businesses with a 100% compliance pass rate. Your employees get an AI assistant that knows your business inside and out — and your data never leaves your infrastructure.",
    ],
    faq: [
      {
        question: "Does ChatGPT store my business data?",
        answer:
          "The free version of ChatGPT may use your conversations for model training. ChatGPT Enterprise and API access offer data privacy guarantees, but the safest option for sensitive business data is a private deployment (Azure OpenAI, on-premise) where you control the infrastructure.",
      },
      {
        question: "Can I use ChatGPT and still be HIPAA compliant?",
        answer:
          "Not the public version. For HIPAA compliance, you need a private AI deployment with a signed BAA, PHI redaction, audit logging, and proper access controls. Azure OpenAI with private endpoints is the most common solution we deploy for Dallas healthcare businesses.",
      },
    ],
  },
  {
    slug: "automate-lead-follow-up",
    title: "How to Automate Lead Follow-Up with AI",
    description:
      "Stop losing leads to slow follow-up. Learn how Dallas businesses automate lead response with AI — from instant email/text replies to smart lead qualification.",
    href: "/insights/automate-lead-follow-up",
    hubSlug: "automation",
    hubLabel: "AI Workflow Automation",
    hubHref: "/automation",
    keywords: [
      "automate lead follow up with AI",
      "AI lead follow up",
      "automated lead response",
      "lead automation small business",
    ],
    h1: "How to Automate Lead Follow-Up with AI",
    content: [
      "The average small business takes over 24 hours to respond to a new lead. By that point, 78% of buyers have already gone with whoever responded first. If you're not following up within minutes, you're losing deals — and the fix is simpler than you think.",
      "**[AI-powered workflow automation](/automation) can follow up with new leads within seconds of form submission — via email, text, or both.** At ITECS, we build these automated lead follow-up systems for Dallas businesses using tools like Zapier, Make.com, HubSpot AI, and custom integrations.",
      "Here's how it works: a lead fills out your website form. Within 60 seconds, they receive a personalized email and text acknowledging their inquiry. The AI qualifies the lead based on your criteria (company size, budget, service interest) and routes hot leads directly to your sales team with a notification. Warm leads enter a nurture sequence. Everything is tracked in your CRM automatically.",
      "The results speak for themselves. Our Dallas clients who implement AI lead follow-up see a 30–50% improvement in lead response time and a 25% increase in conversion rates. The automation runs 24/7 — nights, weekends, holidays — so you never miss a lead again.",
      "The best part: you don't need to change your existing tools. We connect Zapier or Make.com to your website forms, CRM (HubSpot, Salesforce), email platform, and SMS provider. Setup takes 1–2 weeks, and you start seeing results immediately.",
    ],
    faq: [
      {
        question: "What tools do you use to automate lead follow-up?",
        answer:
          "We typically use Zapier or Make.com as the automation backbone, connected to your CRM (HubSpot, Salesforce), email platform, and SMS provider (Twilio). For more advanced lead qualification, we add OpenAI API for AI-powered lead scoring and personalized responses.",
      },
      {
        question: "How fast can AI follow up with a new lead?",
        answer:
          "Under 60 seconds from form submission to personalized email and text message. This is one of the highest-ROI automations we build for Dallas businesses — speed to lead is the single biggest factor in conversion rates.",
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
      "We're vendor-neutral and work with Microsoft Copilot, OpenAI (ChatGPT), Azure OpenAI, Google Vertex AI, Zapier, Make.com, Power Automate, HubSpot AI, and custom-built solutions. We recommend what fits your business and budget — not what pays us the highest margin.",
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
      "Zapier and Make.com automations connecting everything together",
    ],
  },
] as const;
