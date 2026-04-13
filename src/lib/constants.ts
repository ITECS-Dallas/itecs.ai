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
  { label: "AI Receptionist", href: "/ai-receptionist" },
  { label: "CRM & Sales AI", href: "/crm-sales-ai" },
  { label: "Data Audit", href: "/data-audit" },
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
  {
    slug: "ai-receptionist",
    title: "AI Receptionists & Voice Agents for Small Businesses",
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
      "AI receptionist for small business",
      "AI phone answering service",
      "AI voice agent Dallas",
      "virtual receptionist AI",
      "automated phone answering small business",
      "AI appointment booking",
    ],
    h1: "Human-Sounding AI Receptionists for Small Businesses",
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
        question: "How much does an AI receptionist cost for a small business?",
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
      "AI lead scoring small business",
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
        question: "How much does AI CRM integration cost for a small business?",
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
      "Your company knowledge is trapped in SharePoint folders, Google Drives, Notion pages, and people's heads. New hires take months to get up to speed. Employees ask the same questions over and over. ITECS builds private, RAG-powered AI knowledge bases that connect all your documentation into a single natural-language search interface — like having a ChatGPT that only knows your company's SOPs, policies, and institutional knowledge, and cites the source document for every answer.",
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
      "RAG knowledge base SMB",
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
    title: "The Small Business AI Data Readiness Audit",
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
      "small business data audit Dallas",
      "AI readiness assessment",
      "data security audit for AI",
    ],
    h1: "The Small Business AI Data Readiness Audit",
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
    description: "Core security assessment for small teams",
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
      "Most guides cover tools like Zapier, Make.com, and Microsoft Copilot that require no coding. For custom deployments like private ChatGPT or voice agents, ITECS handles the technical build.",
  },
] as const;

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
      "ITECS AI is born. First engagements: custom ChatGPT deployments for internal knowledge bases, workflow automation with Zapier and Make, and AI consulting for businesses exploring GPT-4.",
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
      "22 years of on-the-ground IT operations in Dallas-Fort Worth. We know your compliance landscape, your vendor ecosystem, and the realities of running a 10–300 person company.",
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
      "ITECS was founded in 2002 in Dallas, Texas. We have over 22 years of managed IT operations experience serving small and mid-sized businesses across healthcare, legal, financial services, and manufacturing sectors in the Dallas-Fort Worth area.",
  },
  {
    question: "What makes ITECS different from AI startups?",
    answer:
      "Most AI companies launched in 2023. ITECS has 22 years of IT infrastructure experience — we already understand your network, security requirements, and compliance needs before we build a single AI tool. AI is our next layer, not our first product.",
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
      "ITECS is headquartered at 500 N Central Expy, Suite 500, Plano, TX 75074 — serving the entire Dallas-Fort Worth area including Dallas, Plano, Frisco, Richardson, and surrounding cities.",
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
