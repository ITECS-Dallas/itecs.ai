// ---------------------------------------------------------------------------
// ITECS.AI — Single source of truth for all structured content
// ---------------------------------------------------------------------------

export const SITE_CONFIG = {
  name: "ITECS AI",
  legalName: "ITECS, LLC",
  url: "https://itecs.ai",
  mainSiteUrl: "https://itecsonline.com",
  tagline: "Practical AI for Dallas Businesses.",
  description:
    "ITECS helps small and mid-sized Dallas businesses save time and cut costs with practical AI automation, custom AI agents, and hands-on AI consulting. 24+ years of IT operations expertise.",
  phone: "(214) 444-7884",
  phoneE164: "+1-214-444-7884",
  supportPhone: "(877) 483-2710",
  supportPhoneE164: "+1-877-483-2710",
  email: "sales@itecsonline.com",
  foundingYear: 2002,
  address: {
    street: "500 N Central Expy, Suite 455",
    city: "Plano",
    state: "TX",
    zip: "75074",
    country: "US",
  },
  geo: { lat: 33.0198, lng: -96.6989 },
  googleMapsUrl: "https://g.page/r/CQoNZt8x7nlmEBM",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13391.854690743687!2d-96.8023315!3d32.9519685!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6679ee31df660d0a!2siTecs!5e0!3m2!1sen!2sus!4v1675527511387!5m2!1sen!2sus",
  social: {
    linkedin: "https://www.linkedin.com/company/itecsonline",
    facebook: "https://www.facebook.com/itecscorp",
    x: "https://x.com/ITECS_Dallas",
    youtube: "https://www.youtube.com/@itecsoutsourcingandsupport2028",
    github: "https://github.com/ITECS-Dallas",
  },
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
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
      "We help Dallas businesses with 10–300 employees adopt AI without confusion: understand the opportunity, configure the right tools, train the team, and only build custom AI when it is justified.",
    longDescription:
      "Most small businesses know AI could help, but don't know where to start or what it should cost. We sit down with your team, identify the tasks eating up the most time, and build a practical adoption plan. Often that starts with properly setting up tools like ChatGPT, Claude, Gemini, or Microsoft Copilot before anyone pays for a custom agent.",
    heroSummary:
      "We guide Dallas businesses through AI adoption from workflow discovery to tool setup, security guardrails, employee training, and testing. Consulting can be hourly or through a prepaid retainer, with flat project pricing reserved for scoped AI builds.",
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
        question: "How much does AI consulting cost for a small business?",
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
        question: "How much does a custom AI agent cost for a small business?",
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
      "MLOps for small business",
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
        question: "Do small businesses need MLOps or AI DevOps?",
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
      "employee AI training small business",
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
      "If you're running a Dallas business with 10–300 employees, AI is no longer optional. It's the difference between scaling efficiently and drowning in manual work that your competitors automated six months ago. The good news: you don't need a data science team or a six-figure budget to get started.",
      "**The first step is working with an experienced [AI consulting partner](/consulting) who understands small business operations.** At ITECS, we've helped dozens of Dallas businesses identify the manual tasks that cost them the most time — and automate them with practical AI tools that pay for themselves within weeks.",
      "**Identify Your Biggest Time Drains First**",
      "Most small businesses waste 15–25 hours per week on tasks that AI handles in seconds. Data entry, customer follow-up emails, report generation, appointment scheduling, answering the same customer questions over and over. These are not complex AI problems. They are workflow problems that tools like Microsoft Copilot, ChatGPT, Zapier, and Make.com solve today.",
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
        question: "What's the easiest way to start using AI in a small business?",
        answer:
          "Identify your team's top 3 most repetitive tasks, then evaluate whether existing tools like Microsoft Copilot or ChatGPT can automate them. For custom automation, a free AI assessment from ITECS identifies quick wins and estimates ROI in under an hour.",
      },
      {
        question: "How much does AI cost for a small business?",
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
    hubSlug: "custom-ai-agents",
    hubLabel: "Custom AI Agents",
    hubHref: "/custom-ai-agents",
    keywords: [
      "how to secure business data from ChatGPT",
      "ChatGPT data security for business",
      "AI data protection small business",
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
      "The average small business takes over 24 hours to respond to a new lead. By that point, 78% of buyers have already gone with whoever responded first. If you are not following up within minutes, you are losing deals to competitors who are. The fix is simpler than you think — and the ROI is immediate.",
      "**[AI-powered workflow automation](/automation) can follow up with new leads within seconds of form submission — via email, text, or both.** At ITECS, we build these automated lead follow-up systems for Dallas businesses using tools like Zapier, Make.com, HubSpot AI, and custom integrations.",
      "**Why Speed to Lead Is the Highest-ROI Metric You Are Ignoring**",
      "Harvard Business Review research shows that companies contacting leads within 5 minutes are 100x more likely to connect than those waiting 30 minutes. InsideSales.com data shows that 50% of leads go to the vendor that responds first. Yet most small businesses rely on their office manager to check email, then manually enter lead info into the CRM, then draft a follow-up — a process that takes hours on a good day.",
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
      "**Zapier** is the most popular no-code automation platform for small business. It connects 6,000+ apps with simple trigger-action workflows. Best for straightforward lead routing and CRM sync. Plans start at $20/month.",
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
      "AI adoption does not need to start as a large fixed project. ITECS can consult hourly, but most clients prefer a prepaid retainer block of time they can use at their discretion with no minimum monthly usage and no expiration date. Every hour consumed is documented clearly. Flat project pricing is used only when the scope is defined, such as building an AI agent, automation, or secure platform integration.",
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
  { name: "Ad Pages", src: "/images/clients/adpages.webp", width: 162, height: 28 },
  { name: "Phoenix Capital", src: "/images/clients/phoenix-capital.webp", width: 129, height: 35 },
  { name: "Sterling Family Partners", src: "/images/clients/sterling-family-partners.webp", width: 154, height: 34 },
  { name: "First Choice Containers", src: "/images/clients/first-choice-containers.webp", width: 100, height: 44 },
  { name: "BURNCO", src: "/images/clients/burnco-logo.webp", width: 197, height: 32 },
] as const;

export const PARTNER_LOGOS = [
  { name: "Microsoft Azure", src: "/images/partners/azure.svg", width: 168, height: 32 },
  { name: "Microsoft", src: "/images/partners/microsoft.svg", width: 153, height: 32 },
  { name: "Claude", src: "/images/partners/claude.svg", width: 129, height: 32 },
  { name: "OpenAI", src: "/images/partners/openai.svg", width: 132, height: 32 },
  { name: "Microsoft Copilot", src: "/images/partners/copilot.svg", width: 103, height: 32 },
  { name: "Sophos", src: "/images/partners/sophos.svg", width: 101, height: 32 },
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
      "ITECS is headquartered at 500 N Central Expy, Suite 455, Plano, TX 75074 — serving the entire Dallas-Fort Worth area including Dallas, Plano, Frisco, Richardson, and surrounding cities.",
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
  eyebrow: "Est. 2002",
  title: "24 Years of IT Operations Behind Every AI Deployment",
  description:
    "ITECS started as a managed IT and cybersecurity firm in Dallas in 2002. We launched itecs.ai as the AI division of that same company — not a startup that discovered AI last year. Every automation we build sits on top of two decades of network security, compliance, and infrastructure experience.",
  stats: [
    { value: "2002", label: "Founded in Dallas" },
    { value: "92%", label: "Client Retention Rate" },
    { value: "200+", label: "Client Engagements" },
    { value: "CMMC", label: "Compliance Expertise" },
  ],
  parentLink: {
    text: "Learn more about ITECS managed IT services",
    href: "https://itecsonline.com",
  },
} as const;

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
