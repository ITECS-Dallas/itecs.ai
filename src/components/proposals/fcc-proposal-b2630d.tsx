"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import {
  Globe,
  Server,
  Shield,
  Search,
  Sparkles,
  FileCode2,
  LayoutDashboard,
  Rocket,
  CheckCircle2,
  Clock,

  Zap,
  Monitor,
  Database,
  Lock,
  PenTool,
  BarChart3,
  BookOpen,
  ArrowRight,
  ChevronDown,
  MapPin,
  TrendingUp,
  Bot,
  ImageIcon,
  FileText,
  AlertTriangle,
  X,
  Check,
} from "lucide-react";

/* ───────────────────────── helpers ───────────────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent-bright mb-4">
      {children}
    </span>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────────── main page ───────────────────────── */

export default function FCCProposal() {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      icon: <Server className="w-5 h-5" />,
      title: "Infrastructure & Stack Setup",
      hours: "3 hrs",
      items: [
        "Provision dedicated IP on existing Promus Linux server",
        "Install & configure NGINX, Node.js, PostgreSQL",
        "Deploy Directus CMS with PostgreSQL backend",
        "Configure Let's Encrypt SSL via Cloudflare API (auto-renewal)",
        "Set up Cloudflare Proxy, DNS, WAF, and caching rules",
        "Initialize Next.js project with Tailwind CSS, Framer Motion",
      ],
    },
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      title: "Design & Frontend Development",
      hours: "6 hrs",
      items: [
        "Homepage with animated hero, product tiers, stats, FAQ, and quote form",
        "Use Case landing pages: Housing, Moving, Shipping, Storage",
        "Shop pages: Buy, Rent, Rent-to-Own, Modified Containers",
        "Guidelines pages: Container Ratings, Dimensions, Delivery Parameters",
        "Resources: FAQ, Sales Tax & Exemptions, Driver Application",
        "Contact page with office location, email, hours, and form",
        "Regional SEO landing pages for 20+ covered cities",
        "Fully responsive mobile-first design with Framer Motion animations",
      ],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "CMS & Content Architecture",
      hours: "3 hrs",
      items: [
        "Design Directus content collections: Products, Regions, Use Cases, Blog, FAQ, Testimonials",
        "Configure media library for container imagery",
        "Build REST/GraphQL API integration with Next.js frontend",
        "Set up content workflows and user roles for Michael",
        "Migrate existing content from WordPress into Directus",
      ],
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "SEO & Analytics Infrastructure",
      hours: "3 hrs",
      items: [
        "Implement schema markup (Organization, Product, LocalBusiness, FAQ)",
        "Configure OpenGraph and Twitter Card meta tags across all pages",
        "Set up internal linking policies and XML sitemap generation",
        "Integrate Google Analytics 4 and Google Search Console",
        "Create llms.txt, ai.txt, and robots.txt for AI search inclusion",
        "Implement structured data for regional landing pages",
        "Configure Cloudflare performance optimizations and caching headers",
      ],
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI Skills & Automation Setup",
      hours: "3 hrs",
      items: [
        "Install and configure Claude Code CLI on Michael's system",
        "Build custom skill: SEO-rich article generation with keyword targeting",
        "Build custom skill: AI image generation for blog and product imagery",
        "Build custom skill: SEO auditing and content optimization",
        "Build custom skill: Content writing for landing pages and product descriptions",
        "Configure all skills with FCC brand voice, style, and terminology",
      ],
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Testing, Training & Launch",
      hours: "2 hrs",
      items: [
        "Cross-browser and mobile device testing",
        "Performance audit and optimization (Core Web Vitals)",
        "Security review and penetration testing",
        "2-hour training session with Michael: Directus workflows, Claude Code skills, content management",
        "DNS cutover and go-live",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-surface text-text-primary font-sans">
      {/* ─── HERO ─── */}
      <div className="relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-6">
          {/* Hero content */}
          <div className="grid md:grid-cols-2 gap-12 items-center pb-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <SectionLabel>Web Application Proposal</SectionLabel>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary leading-tight mb-6">
                  A Modern Platform for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent-bright to-brand-accent">
                    First Choice Containers
                  </span>
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  Replace your aging WordPress site with a high-performance
                  Next.js application — complete with an intuitive CMS,
                  AI-powered content tools, enterprise-grade security, and
                  an SEO architecture built for the future of search.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#scope"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent-bright text-bg-void font-medium text-sm rounded-lg transition-colors"
                >
                  VIEW FULL SCOPE <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-brand-accent/50 text-text-secondary font-medium text-sm rounded-lg transition-colors"
                >
                  SEE PRICING
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
                <Image
                  src="/images/proposals/fcc-homepage-screenshot.jpg"
                  alt="First Choice Containers current website homepage"
                  width={1280}
                  height={800}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-gray-700/50">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-text-secondary">
                      Current site: WordPress + Avada — multiple broken pages, outdated architecture
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center pb-8"
        >
          <ChevronDown className="w-5 h-5 text-text-dim" />
        </motion.div>
      </div>

      <CircuitTrace variant="section-divider" />

      {/* ─── CURRENT ISSUES ─── */}
      <Section className="border-t border-gray-800/50">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Site Audit Findings</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              What We Found on the Current Site
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
              title: "Broken Pages",
              description:
                "The Shop, Buy, and Use Cases pages all return 404 errors. Visitors trying to purchase or explore services hit dead ends — directly impacting revenue.",
              severity: "Critical",
              color: "red",
            },
            {
              icon: <Globe className="w-5 h-5 text-amber-400" />,
              title: "Outdated Platform",
              description:
                "Built on WordPress with the Avada/Fusion Builder theme. Heavy page builder overhead, limited customization, and no modern content management workflow.",
              severity: "High",
              color: "amber",
            },
            {
              icon: <Search className="w-5 h-5 text-amber-400" />,
              title: "SEO Gaps",
              description:
                "No schema markup, missing OpenGraph tags, no regional landing pages, and zero AI search optimization (llms.txt, ai.txt). Leaving organic traffic on the table.",
              severity: "High",
              color: "amber",
            },
          ].map((issue, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="p-6 rounded-xl border border-gray-800/50 bg-gray-900/30 hover:border-gray-700/50 transition-colors h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-gray-800/50">{issue.icon}</div>
                  <span
                    className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-full ${
                      issue.color === "red"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <h3 className="text-text-primary font-medium mb-2">{issue.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {issue.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Before / After comparison */}
        <FadeIn delay={0.3}>
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-2 mb-4">
                <X className="w-5 h-5 text-red-400" />
                <h3 className="text-text-primary font-medium">Current State</h3>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "WordPress + Avada page builder",
                  "Multiple 404 errors on critical pages",
                  "No content management workflow",
                  "No AI search optimization",
                  "Static quote form (lead capture only)",
                  "Manual content updates require developer",
                  "No regional SEO strategy",
                  "Basic shared hosting security",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-red-500/60 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-brand-accent/20 bg-brand-accent/5">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-brand-accent-bright" />
                <h3 className="text-text-primary font-medium">After ITECS Rebuild</h3>
              </div>
              <ul className="space-y-2 text-sm text-text-secondary">
                {[
                  "Next.js with server-side rendering & static generation",
                  "Every page functional, fast, and mobile-optimized",
                  "Directus CMS — update content without touching code",
                  "llms.txt, ai.txt, schema markup for AI search inclusion",
                  "Dynamic inventory browser and quoting system",
                  "AI-powered content creation via Claude Code CLI",
                  "20+ regional landing pages for local SEO dominance",
                  "Cloudflare WAF, proxy, caching + Let's Encrypt SSL",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-brand-accent-bright mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ─── TECH STACK DIAGRAM ─── */}
      <Section className="border-t border-gray-800/50 bg-bg-void relative" id="stack">
        <GridBackground opacity={0.03} />
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Technology Stack</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              Built on Modern, Proven Technology
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Every component chosen for performance, developer experience,
              and long-term maintainability.
            </p>
          </div>
        </FadeIn>

        {/* Architecture diagram */}
        <FadeIn delay={0.2}>
          <div className="relative p-8 rounded-2xl border border-gray-800/50 bg-gray-900/20">
            {/* Row 1: User-facing */}
            <div className="text-center mb-3">
              <span className="text-[10px] tracking-widest uppercase text-text-dim">
                Visitor Experience
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Globe className="w-6 h-6" />, name: "Next.js 14", desc: "React Framework" },
                { icon: <PenTool className="w-6 h-6" />, name: "Tailwind CSS", desc: "Utility-First Styling" },
                { icon: <Sparkles className="w-6 h-6" />, name: "Framer Motion", desc: "Animations" },
                { icon: <FileCode2 className="w-6 h-6" />, name: "Lucide Icons", desc: "Icon System" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.3)" }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800/50 bg-gray-800/20 transition-colors"
                >
                  <div className="text-brand-accent-bright">{tech.icon}</div>
                  <span className="text-sm text-text-primary font-medium">{tech.name}</span>
                  <span className="text-[11px] text-text-dim">{tech.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Connection line */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-8 bg-gradient-to-b from-brand-accent/40 to-transparent" />
            </div>

            {/* Row 2: Backend */}
            <div className="text-center mb-3">
              <span className="text-[10px] tracking-widest uppercase text-text-dim">
                Backend & Content
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <LayoutDashboard className="w-6 h-6" />, name: "Directus CMS", desc: "Headless Content" },
                { icon: <Database className="w-6 h-6" />, name: "PostgreSQL", desc: "Database" },
                { icon: <Server className="w-6 h-6" />, name: "NGINX", desc: "Web Server" },
                { icon: <Bot className="w-6 h-6" />, name: "Claude Code", desc: "AI Content Engine" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.3)" }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800/50 bg-gray-800/20 transition-colors"
                >
                  <div className="text-brand-accent-bright">{tech.icon}</div>
                  <span className="text-sm text-text-primary font-medium">{tech.name}</span>
                  <span className="text-[11px] text-text-dim">{tech.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Connection line */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-8 bg-gradient-to-b from-brand-accent/40 to-transparent" />
            </div>

            {/* Row 3: Security & Infrastructure */}
            <div className="text-center mb-3">
              <span className="text-[10px] tracking-widest uppercase text-text-dim">
                Security & Delivery
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Shield className="w-6 h-6" />, name: "Cloudflare", desc: "WAF, CDN, DDoS" },
                { icon: <Lock className="w-6 h-6" />, name: "Let's Encrypt", desc: "Auto-Renewing SSL" },
                { icon: <Search className="w-6 h-6" />, name: "SEO Engine", desc: "Schema, OG, Sitemap" },
                { icon: <BarChart3 className="w-6 h-6" />, name: "Analytics", desc: "GA4 + Search Console" },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.3)" }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-800/50 bg-gray-800/20 transition-colors"
                >
                  <div className="text-brand-accent-bright">{tech.icon}</div>
                  <span className="text-sm text-text-primary font-medium">{tech.name}</span>
                  <span className="text-[11px] text-text-dim">{tech.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ─── SCOPE OF WORK ─── */}
      <Section className="border-t border-gray-800/50" id="scope">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              What We Will Build Together
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Six phases of work covering infrastructure, design, content,
              SEO, AI automation, and launch — totaling 20 hours of focused
              development.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Phase selector */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {phases.map((phase, i) => (
              <motion.button
                key={i}
                onClick={() => setActivePhase(i)}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm whitespace-nowrap md:whitespace-normal transition-all ${
                  activePhase === i
                    ? "bg-brand-accent/10 border border-brand-accent/30 text-brand-accent-bright"
                    : "border border-transparent hover:border-gray-800 text-text-dim hover:text-text-secondary"
                }`}
              >
                {phase.icon}
                <span className="font-medium">{phase.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Phase detail */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-2xl border border-gray-800/50 bg-gray-900/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-text-primary font-medium">
                Phase {activePhase + 1}: {phases[activePhase].title}
              </h3>
              <span className="flex items-center gap-1.5 text-sm text-brand-accent-bright font-medium">
                <Clock className="w-4 h-4" />
                {phases[activePhase].hours}
              </span>
            </div>
            <ul className="space-y-3">
              {phases[activePhase].items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-accent/60 mt-0.5 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ─── AI SKILLS ─── */}
      <Section className="border-t border-gray-800/50 bg-bg-void">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>AI-Powered Content Engine</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              Your Website Keeps Growing After Launch
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              We install Claude Code CLI with custom skills tailored to
              First Choice Containers. Generate SEO articles, product imagery,
              and optimized content — on demand, in your brand voice.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FileText className="w-6 h-6" />,
              title: "Article Generation",
              description:
                "Generate SEO-rich blog posts targeting container-related keywords. Each article is optimized for search rankings and written in your brand voice.",
            },
            {
              icon: <ImageIcon className="w-6 h-6" />,
              title: "AI Image Generation",
              description:
                "Create professional product and lifestyle imagery for blog posts, landing pages, and social media — without a photoshoot.",
            },
            {
              icon: <Search className="w-6 h-6" />,
              title: "SEO Auditing",
              description:
                "Run on-demand SEO audits across your site. Identify missing meta tags, broken links, thin content, and opportunities to improve rankings.",
            },
            {
              icon: <PenTool className="w-6 h-6" />,
              title: "Content Writing",
              description:
                "Generate product descriptions, landing page copy, and regional content. Maintain consistency across every page on your site.",
            },
          ].map((skill, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.3)" }}
                className="p-6 rounded-xl border border-gray-800/50 bg-gray-900/30 transition-colors h-full"
              >
                <div className="p-2 rounded-lg bg-brand-accent/10 inline-block mb-4">
                  <div className="text-brand-accent-bright">{skill.icon}</div>
                </div>
                <h3 className="text-text-primary font-medium mb-2">{skill.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* ─── SEO STRATEGY ─── */}
      <Section className="border-t border-gray-800/50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <SlideIn direction="left">
            <SectionLabel>SEO & AI Search Strategy</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-6">
              Built for Google <em className="text-brand-accent-bright">and</em> AI Search
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              Traditional SEO gets you found on Google. But in 2026, AI
              assistants like ChatGPT, Claude, and Perplexity are answering
              buying questions directly. We build for both — so First Choice
              Containers appears in traditional results and AI-generated
              recommendations.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Schema Markup",
                  desc: "Product, LocalBusiness, FAQ, and Organization structured data",
                },
                {
                  label: "Regional Landing Pages",
                  desc: "20+ city-specific pages targeting local container searches",
                },
                {
                  label: "AI Search Files",
                  desc: "llms.txt, ai.txt — tell AI crawlers exactly what your business does",
                },
                {
                  label: "OpenGraph & Meta",
                  desc: "Rich previews on every social share and search result",
                },
                {
                  label: "Internal Linking",
                  desc: "Automated linking policies that distribute authority across pages",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent mt-1 shrink-0" />
                  <div>
                    <span className="text-text-primary text-sm font-medium">
                      {item.label}
                    </span>
                    <p className="text-xs text-text-dim">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="relative">
              <div className="p-6 rounded-2xl border border-gray-800/50 bg-gray-900/20">
                <div className="text-[10px] tracking-widest uppercase text-text-dim mb-4">
                  Regional Coverage Map
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { region: "Southwest", cities: "Dallas, Houston, Austin, Fort Worth, El Paso, OKC, Tulsa" },
                    { region: "Southeast", cities: "Nashville, Memphis, Jacksonville, Miami, Atlanta, Orlando" },
                    { region: "Midwest", cities: "Kansas City, Chicago, St. Louis, Wichita" },
                    { region: "Northeast", cities: "Louisville, New Orleans" },
                  ].map((r, i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-gray-800/30">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3 h-3 text-brand-accent-bright" />
                        <span className="text-xs text-brand-accent-bright font-medium">{r.region}</span>
                      </div>
                      <p className="text-[11px] text-text-dim leading-relaxed">{r.cities}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-brand-accent/5 border border-brand-accent/20">
                  <p className="text-xs text-brand-accent-bright">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Each city gets a dedicated landing page optimized for
                    &ldquo;shipping containers [city]&rdquo; — the highest-intent local keywords.
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* ─── PRICING ─── */}
      <Section className="border-t border-gray-800/50 bg-bg-void" id="pricing">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Investment</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              Transparent, Fixed-Price Engagement
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto">
            {/* Main pricing card */}
            <div className="p-8 md:p-10 rounded-2xl border border-brand-accent/20 bg-gradient-to-b from-brand-accent/5 to-transparent">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-2xl text-text-primary font-medium mb-1">
                    Website Application Build
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Complete design, development, deployment, and training
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-dim line-through">
                    $175.00/hr &times; 20 hrs = $3,500.00
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent-bright font-medium">
                      40% DISCOUNT
                    </span>
                  </div>
                  <div className="text-3xl text-text-primary font-light mt-2">
                    $2,100<span className="text-lg text-text-dim">.00</span>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-3 border-t border-gray-800/50 pt-6 mb-6">
                {phases.map((phase, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span className="text-brand-accent/40">{phase.icon}</span>
                      {phase.title}
                    </div>
                    <span className="text-text-dim">{phase.hours}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-800/30">
                  <span className="text-text-secondary font-medium">Total Development</span>
                  <span className="text-text-primary font-medium">20 hours</span>
                </div>
              </div>

              {/* Rate breakdown */}
              <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-800/30 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg text-text-dim line-through">$175.00</div>
                    <div className="text-[10px] text-text-dim tracking-widest uppercase">
                      Standard Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-brand-accent-bright">40%</div>
                    <div className="text-[10px] text-text-dim tracking-widest uppercase">
                      Client Discount
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-text-primary font-medium">$105.00</div>
                    <div className="text-[10px] text-text-dim tracking-widest uppercase">
                      Your Rate
                    </div>
                  </div>
                </div>
              </div>

              {/* Post-launch support */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/20 border border-gray-800/30">
                <div>
                  <div className="text-sm text-text-primary font-medium">
                    Post-Launch Support
                  </div>
                  <div className="text-xs text-text-dim">
                    2 one-hour sessions — system management, updates, and
                    confidence building
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-dim line-through">$350.00</div>
                  <div className="text-brand-accent-bright font-medium">Included</div>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-gray-800/50 flex items-end justify-between">
                <div>
                  <div className="text-sm text-text-secondary">Total Investment</div>
                  <div className="text-xs text-text-dim mt-1">
                    Savings of $1,750.00 from standard pricing
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-dim line-through">$3,850.00</div>
                  <div className="text-4xl text-text-primary font-light">
                    $2,100<span className="text-xl text-text-dim">.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ongoing costs */}
            <FadeIn delay={0.3}>
              <div className="mt-8 p-6 rounded-xl border border-gray-800/50 bg-gray-900/20">
                <h4 className="text-text-primary font-medium mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-accent-bright" />
                  Ongoing Monthly Costs
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-gray-800/20">
                    <div className="text-xs text-text-dim mb-1">Dedicated IP</div>
                    <div className="text-text-primary">$10.00<span className="text-xs text-text-dim">/mo</span></div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/20">
                    <div className="text-xs text-text-dim mb-1">SSL Certificate</div>
                    <div className="text-brand-accent-bright text-sm font-medium">Included — Free</div>
                    <div className="text-[10px] text-text-dim">Let&apos;s Encrypt + Cloudflare auto-renewal</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-800/20">
                    <div className="text-xs text-text-dim mb-1">Cloudflare</div>
                    <div className="text-brand-accent-bright text-sm font-medium">Included — Free</div>
                    <div className="text-[10px] text-text-dim">DNS, CDN, WAF, and DDoS protection</div>
                  </div>
                </div>
                <p className="text-xs text-text-dim mt-4">
                  Your existing Promus server hosting continues at current rates.
                  The only incremental cost is the dedicated IP at $10/month.
                </p>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Section>

      {/* ─── TIMELINE ─── */}
      <Section className="border-t border-gray-800/50">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Timeline</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              From Kickoff to Launch
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {[
            {
              week: "Week 1",
              title: "Infrastructure + Design + Content",
              desc: "Stack setup, Cloudflare configuration, Directus CMS deployment, frontend development begins, content migration from WordPress.",
              hours: "12 hrs",
            },
            {
              week: "Week 2",
              title: "SEO + AI Skills + Testing",
              desc: "SEO infrastructure implementation, regional landing pages, Claude Code CLI skills configuration, cross-browser testing, and performance optimization.",
              hours: "6 hrs",
            },
            {
              week: "Week 2–3",
              title: "Training + Launch",
              desc: "2-hour training session with Michael covering Directus workflows, Claude Code skills, and system management. DNS cutover and go-live.",
              hours: "2 hrs",
            },
            {
              week: "Week 4–6",
              title: "Post-Launch Support",
              desc: "Two scheduled one-hour sessions to ensure Michael is fully comfortable managing content, running AI skills, and handling server updates.",
              hours: "2 hrs",
            },
          ].map((milestone, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent-bright text-sm font-medium shrink-0">
                    {i + 1}
                  </div>
                  {i < 3 && (
                    <div className="w-px h-full bg-gradient-to-b from-brand-accent/30 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] tracking-widest uppercase text-brand-accent-bright font-semibold">
                      {milestone.week}
                    </span>
                    <span className="text-xs text-text-dim">
                      {milestone.hours}
                    </span>
                  </div>
                  <h3 className="text-text-primary font-medium mb-1">{milestone.title}</h3>
                  <p className="text-sm text-text-secondary">{milestone.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <Section className="border-t border-gray-800/50 bg-bg-void">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>Everything Included</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary">
              One Engagement. Complete Transformation.
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Monitor className="w-6 h-6" />,
              title: "Full Application Build",
              items: [
                "Custom Next.js application",
                "All pages designed and developed",
                "Mobile-responsive design",
                "Framer Motion animations",
                "Dynamic quote/inventory system",
              ],
            },
            {
              icon: <Database className="w-6 h-6" />,
              title: "CMS & Infrastructure",
              items: [
                "Directus CMS configured",
                "PostgreSQL database",
                "NGINX web server",
                "Cloudflare WAF & CDN",
                "Let's Encrypt SSL (auto-renewal)",
              ],
            },
            {
              icon: <Search className="w-6 h-6" />,
              title: "SEO & Analytics",
              items: [
                "Schema markup (4 types)",
                "OpenGraph & meta tags",
                "Google Analytics 4",
                "Google Search Console",
                "llms.txt & ai.txt",
              ],
            },
            {
              icon: <Bot className="w-6 h-6" />,
              title: "AI Content Skills",
              items: [
                "Claude Code CLI setup",
                "Article generation skill",
                "Image generation skill",
                "SEO auditing skill",
                "Content writing skill",
              ],
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: "Regional SEO Pages",
              items: [
                "20+ city landing pages",
                "Local keyword targeting",
                "Regional schema markup",
                "Internal linking strategy",
                "Programmatic generation via CMS",
              ],
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: "Training & Support",
              items: [
                "2-hr platform training session",
                "Directus content workflows",
                "Claude Code skill usage",
                "2 post-launch support sessions",
                "Server & app update guidance",
              ],
            },
          ].map((block, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-6 rounded-xl border border-gray-800/50 bg-gray-900/30 h-full">
                <div className="text-brand-accent-bright mb-4">{block.icon}</div>
                <h3 className="text-text-primary font-medium mb-3">{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <Check className="w-3 h-3 text-brand-accent/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ─── ABOUT ITECS ─── */}
      <Section className="border-t border-gray-800/50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <SlideIn direction="left">
            <SectionLabel>About ITECS</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-6">
              23+ Years Building Technology That Works
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              ITECS has been a trusted IT partner to Dallas-Fort Worth
              businesses since 2002. We provide managed IT services,
              cybersecurity, cloud hosting, and AI consulting — serving
              75+ active clients with a 95% retention rate.
            </p>
            <p className="text-text-secondary leading-relaxed">
              This project combines our deep infrastructure expertise with
              modern web development and AI automation. First Choice
              Containers won&apos;t just get a new website — you&apos;ll get a platform
              that grows your business.
            </p>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2002", label: "Founded in Dallas" },
                { value: "75+", label: "Active Clients" },
                { value: "95%", label: "Client Retention" },
                { value: "99.9%", label: "Uptime Guarantee" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-gray-800/50 bg-gray-900/20 text-center"
                >
                  <div className="text-2xl text-brand-accent-bright font-light mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-text-dim tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* ─── CTA ─── */}
      <Section className="border-t border-gray-800/50 bg-bg-void relative overflow-hidden">
        <GradientOrb color="cyan" size="md" position={{ top: "-100px", left: "-100px" }} />
        <GradientOrb color="purple" size="sm" position={{ bottom: "-80px", right: "-60px" }} />
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>Next Steps</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-light text-text-primary mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              This proposal is valid for 30 days. To move forward, simply
              confirm approval and we&apos;ll schedule the kickoff. Your new
              platform can be live within 2–3 weeks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:bdesmot@itecsonline.com?subject=FCC%20Website%20Approval%20Status%20Green"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-accent-bright text-bg-void font-medium text-sm rounded-lg transition-colors"
              >
                APPROVE PROPOSAL <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+12149194324"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-brand-accent/50 text-text-secondary font-medium text-sm rounded-lg transition-colors"
              >
                CALL TO DISCUSS
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

    </div>
  );
}
