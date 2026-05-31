"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Bot,
  Brain,
  Building2,
  CornerDownRight,
  Database,
  Factory,
  GraduationCap,
  Headset,
  Menu,
  PackageCheck,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import {
  SITE_CONFIG,
  MEGA_MENU_CATEGORIES,
  type MegaMenuLink,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const REDUCE_MOTION = "motion-reduce:transition-none motion-reduce:transform-none";
type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;
type SolutionMegaItem = {
  label: string;
  href: string;
  description: string;
  icon: MenuIcon;
};

type SolutionMegaColumn = {
  title: string;
  description: string;
  items: SolutionMegaItem[];
};

const CATEGORY_ICONS: Record<string, MenuIcon> = {
  "AI Services": Brain,
  "AI Products": PackageCheck,
  Industries: Factory,
  Resources: BookOpenText,
  Company: Building2,
};

const desktopNavLinks = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/services",
    match: [
      "/services",
      "/consulting",
      "/custom-ai-agents",
      "/automation",
      "/training",
      "/ai-receptionist",
      "/crm-sales-ai",
      "/ai-knowledge-base",
      "/data-audit",
      "/ai-devops",
      "/ai-optimized-seo",
      "/managed-intelligence-provider",
    ],
  },
  {
    label: "Industries",
    href: "/manufacturing",
    match: ["/manufacturing"],
  },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

const solutionsMegaColumns: SolutionMegaColumn[] = [
  {
    title: "Managed Intelligence",
    description:
      "Managed AI operations, governance, monitoring, and executive reporting.",
    items: [
      {
        label: "Managed Intelligence Provider",
        href: "/managed-intelligence-provider",
        description: "The MSP model evolved into managed AI operations.",
        icon: ServerCog,
      },
      {
        label: "AI Champion Program",
        href: "/services/ai-champion-program",
        description: "Build internal AI operators with ITECS guidance.",
        icon: GraduationCap,
      },
      {
        label: "AI DevOps",
        href: "/ai-devops",
        description: "Operate prompts, agents, RAG, cost, and releases.",
        icon: Workflow,
      },
    ],
  },
  {
    title: "AI Consulting & Strategy",
    description:
      "Readiness, ROI, governance, training, and security-first adoption.",
    items: [
      {
        label: "AI Consulting",
        href: "/consulting",
        description: "Prioritize workflows and defend the business case.",
        icon: Brain,
      },
      {
        label: "Data & AI Readiness Audit",
        href: "/data-audit",
        description: "Find data risk and practical automation openings.",
        icon: Database,
      },
      {
        label: "AI Training",
        href: "/training",
        description: "Teach teams how to use AI safely and productively.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "AI Solutions",
    description:
      "Agents, workflow automation, CRM AI, voice AI, knowledge bases, and AI SEO.",
    items: [
      {
        label: "Custom AI Agents",
        href: "/custom-ai-agents",
        description: "Secure agents grounded in approved business context.",
        icon: Bot,
      },
      {
        label: "Workflow Automation",
        href: "/automation",
        description: "Connect systems and remove repetitive manual steps.",
        icon: Workflow,
      },
      {
        label: "CRM & Sales AI",
        href: "/crm-sales-ai",
        description: "Research, score, route, and follow up with leads.",
        icon: Building2,
      },
      {
        label: "AI Receptionist",
        href: "/ai-receptionist",
        description: "Answer, qualify, route, and book inbound calls.",
        icon: Headset,
      },
      {
        label: "Knowledge Base",
        href: "/ai-knowledge-base",
        description: "Private retrieval across SOPs, files, and systems.",
        icon: BookOpenText,
      },
      {
        label: "AI-Optimized SEO",
        href: "/ai-optimized-seo",
        description: "Prepare content for AI search and answer engines.",
        icon: Search,
      },
    ],
  },
];

function routeMatches(pathname: string, link: MegaMenuLink) {
  return !link.external && pathname === link.href;
}

function desktopRouteMatches(
  pathname: string,
  link: (typeof desktopNavLinks)[number],
) {
  if (link.href === "/") {
    return pathname === "/";
  }

  if ("match" in link) {
    return link.match.some(
      (href) => pathname === href || pathname.startsWith(`${href}/`),
    );
  }

  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

function findCategoryIndex(pathname: string) {
  const index = MEGA_MENU_CATEGORIES.findIndex((cat) =>
    cat.links.some((link) => routeMatches(pathname, link))
  );

  return index >= 0 ? index : 0;
}

function solutionMegaRouteMatches(pathname: string, item: SolutionMegaItem) {
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function isNodeInside(parent: HTMLElement | null, child: EventTarget | null) {
  return Boolean(parent && child instanceof Node && parent.contains(child));
}

/** Renders an internal Next.js <Link> or an external new-tab <a>. */
function MenuLink({
  link,
  onNavigate,
  className,
  children,
}: {
  link: MegaMenuLink;
  onNavigate: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen takeover menu                                           */
/* ------------------------------------------------------------------ */

function MegaMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [activeCat, setActiveCat] = useState(() => findCategoryIndex(pathname));
  const activeCategory = MEGA_MENU_CATEGORIES[activeCat] ?? MEGA_MENU_CATEGORIES[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.name] ?? Sparkles;
  const primaryLink: MegaMenuLink = {
    label: activeCategory.primaryCta,
    href: activeCategory.primaryHref,
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 top-0 z-[60] overflow-y-auto bg-bg-void"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Ambient grid + glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(55% 45% at 82% 6%, var(--brand-subtle), transparent 60%), radial-gradient(45% 38% at 10% 96%, var(--accent-cyan-subtle), transparent 60%)",
            }}
          />

          {/* Menu header bar */}
          <div className="relative z-[2] flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4 md:px-8">
            <Link href="/" onClick={onClose} className="flex items-center shrink-0">
              <Image
                src="/images/logos/itecs-horizontal.svg"
                alt="ITECS"
                width={148}
                height={44}
                className="brightness-0 invert"
                style={{ height: "40px", width: "auto" }}
              />
            </Link>
            <div className="flex items-center gap-2.5">
              <Button href="/contact" size="sm">
                Get Started
              </Button>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent ${REDUCE_MOTION}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body — 3 columns on desktop, stacked on mobile */}
          <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[0.9fr_1.28fr_1.12fr]">
            {/* Column 1 — categories */}
            <div className="border-b border-[var(--border-subtle)] px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
              <div className="mb-5 border-t border-[var(--border-subtle)] pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                  Navigate // ITECS AI
                </span>
              </div>

              <div className="space-y-2">
                {MEGA_MENU_CATEGORIES.map((cat, i) => {
                  const isActive = activeCat === i;
                  const CatIcon = CATEGORY_ICONS[cat.name] ?? Sparkles;
                  return (
                    <motion.button
                      key={cat.name}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.05,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onMouseEnter={() => setActiveCat(i)}
                      onFocus={() => setActiveCat(i)}
                      onClick={() => setActiveCat(i)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group/cat relative isolate w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-all ${REDUCE_MOTION} ${
                        isActive
                          ? "border-[var(--border-active)] bg-bg-elevated text-text-primary shadow-[0_0_36px_var(--brand-subtle)]"
                          : "border-transparent text-text-secondary hover:border-[var(--border-subtle)] hover:bg-bg-surface/70 hover:text-text-primary"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mega-menu-active-category"
                          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,var(--brand-subtle),transparent_34%),radial-gradient(circle_at_88%_76%,var(--accent-cyan-subtle),transparent_38%)]"
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                      <span className="flex items-start justify-between gap-3">
                        <span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                            {cat.num}
                          </span>
                          <span className="mt-1 block text-[25px] font-light leading-tight tracking-tight md:text-[29px]">
                            {cat.name}
                          </span>
                          <span className="mt-1.5 line-clamp-2 block text-[12.5px] leading-relaxed text-text-dim">
                            {cat.eyebrow}
                          </span>
                        </span>
                        <CatIcon
                          className={`mt-1 h-6 w-6 shrink-0 transition-colors ${
                            isActive ? "text-brand" : "text-text-dim group-hover/cat:text-brand-accent"
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Column 2 — active category story and cards */}
            <div className="border-b border-[var(--border-subtle)] px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeCategory.name}-story`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                      {activeCategory.num}
                      {" // "}
                      {activeCategory.name}
                    </span>
                    <MenuLink
                      link={primaryLink}
                      onNavigate={onClose}
                      className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-brand-accent"
                    >
                      Open section ↗
                    </MenuLink>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated p-6 shadow-[0_0_60px_var(--accent-cyan-subtle)]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-95"
                      style={{
                        background:
                          "radial-gradient(42% 58% at 84% 18%, var(--brand-subtle), transparent 62%), radial-gradient(42% 58% at 8% 92%, var(--accent-cyan-subtle), transparent 66%)",
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                            {activeCategory.eyebrow}
                          </div>
                          <h2 className="mt-3 max-w-[520px] text-[34px] font-light leading-tight tracking-tight text-text-primary md:text-[42px]">
                            {activeCategory.name}
                          </h2>
                        </div>
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-active)] bg-bg-void/65 text-brand shadow-[0_0_35px_var(--brand-subtle)]">
                          <ActiveIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                      </div>
                      <p className="mt-4 max-w-[580px] text-[15px] leading-relaxed text-text-secondary">
                        {activeCategory.summary}
                      </p>
                      <MenuLink
                        link={primaryLink}
                        onNavigate={onClose}
                        className={`group/primary mt-6 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-brand to-cyan px-5 py-3 text-[13px] font-bold uppercase tracking-[0.05em] text-bg-void transition-all ${REDUCE_MOTION} hover:brightness-110`}
                      >
                        {activeCategory.primaryCta}
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${REDUCE_MOTION} group-hover/primary:translate-x-1`}
                          aria-hidden="true"
                        />
                      </MenuLink>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {activeCategory.cards.map((card, index) => (
                      <MenuLink
                        key={card.href}
                        link={{
                          label: card.title,
                          href: card.href,
                          external: card.external,
                        }}
                        onNavigate={onClose}
                        className={`group/card relative min-h-[224px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-5 transition-all ${REDUCE_MOTION} hover:-translate-y-0.5 hover:border-[var(--border-active)] hover:shadow-[0_0_32px_var(--brand-subtle)]`}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-24 opacity-80 transition-opacity group-hover/card:opacity-100"
                          style={{
                            background:
                              index % 2 === 0
                                ? "radial-gradient(80% 90% at 18% 0%, var(--accent-cyan-subtle), transparent 68%)"
                                : "radial-gradient(80% 90% at 18% 0%, var(--brand-subtle), transparent 68%)",
                          }}
                        />
                        <div className="relative">
                          <div className="flex items-start justify-between gap-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-accent">
                              {card.eyebrow}
                            </div>
                            <Bot className="h-5 w-5 shrink-0 text-brand/80" aria-hidden="true" />
                          </div>
                          <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight text-text-primary">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
                            {card.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-accent">
                            {card.cta}
                            {card.external ? (
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <ArrowRight
                                className={`h-3.5 w-3.5 transition-transform ${REDUCE_MOTION} group-hover/card:translate-x-1`}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>
                      </MenuLink>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Column 3 — active category links and proof points */}
            <div className="px-6 py-8 md:px-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeCategory.name}-links`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                      Explore
                      {" // "}
                      {activeCategory.name}
                    </span>
                    <MenuLink
                      link={primaryLink}
                      onNavigate={onClose}
                      className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-brand-accent"
                    >
                      View hub ↗
                    </MenuLink>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {activeCategory.links.map((link) => {
                      const active = routeMatches(pathname, link);
                      return (
                        <MenuLink
                          key={link.label}
                          link={link}
                          onNavigate={onClose}
                          className={`group/link flex min-h-[52px] items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-[14.5px] transition-all ${REDUCE_MOTION} hover:-translate-y-0.5 ${
                            active
                              ? "border-[var(--border-active)] bg-brand-accent/10 text-brand-accent"
                              : "border-[var(--border-subtle)] bg-bg-surface/70 text-text-secondary hover:border-[var(--border-active)] hover:text-text-primary"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <CornerDownRight
                              className="h-3.5 w-3.5 shrink-0 text-brand"
                              aria-hidden="true"
                            />
                            <span>{link.label}</span>
                          </span>
                          {link.external ? (
                            <ArrowUpRight
                              className="h-3.5 w-3.5 shrink-0 text-text-dim transition-colors group-hover/link:text-brand-accent"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowRight
                              className={`h-3.5 w-3.5 shrink-0 text-text-dim transition-all ${REDUCE_MOTION} group-hover/link:translate-x-1 group-hover/link:text-brand-accent`}
                              aria-hidden="true"
                            />
                          )}
                        </MenuLink>
                      );
                    })}
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated">
                    <div className="border-b border-[var(--border-subtle)] bg-[linear-gradient(135deg,var(--brand-subtle),var(--accent-cyan-subtle))] px-5 py-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-brand-accent">
                        {activeCategory.proofLabel}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="space-y-3">
                        {activeCategory.proofPoints.map((point) => (
                          <div key={point} className="flex gap-3 text-[13.5px] leading-relaxed text-text-secondary">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_14px_var(--brand-subtle)]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                      <MenuLink
                        link={{ label: "Contact", href: "/contact" }}
                        onNavigate={onClose}
                        className={`mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-accent transition-all ${REDUCE_MOTION} hover:translate-x-1`}
                      >
                        Talk with the ITECS Dallas team
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </MenuLink>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] px-6 py-4 md:px-8">
            <div className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-text-dim">
              <span className="text-text-secondary">Dallas–Fort Worth, TX</span>
              <a
                href={SITE_CONFIG.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-accent"
              >
                YouTube
              </a>
              <a
                href={SITE_CONFIG.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-accent"
              >
                X
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-accent"
              >
                LinkedIn
              </a>
            </div>
            <Link
              href="/contact"
              onClick={onClose}
              className={`inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-brand to-cyan px-6 py-3 text-[14px] font-bold text-bg-void transition-all ${REDUCE_MOTION} hover:brightness-110`}
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SolutionsMegaMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id="solutions-mega-menu"
      role="region"
      aria-label="Solutions menu"
      hidden={!open}
      className="absolute left-0 top-full hidden w-full border-y border-[var(--border-subtle)] bg-bg-elevated/95 shadow-e3 backdrop-blur-md lg:block"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_0.95fr] gap-0 px-8">
        {solutionsMegaColumns.map((column) => (
          <section
            key={column.title}
            className="border-r border-[var(--border-subtle)] px-5 py-6 first:pl-0"
          >
            <p className="font-mono text-xs uppercase text-brand-accent">
              {column.title}
            </p>
            <p className="mt-2 min-h-12 text-sm leading-relaxed text-text-tertiary">
              {column.description}
            </p>
            <div className="mt-5 space-y-1.5">
              {column.items.map((item) => {
                const Icon = item.icon;
                const active = solutionMegaRouteMatches(pathname, item);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group/item grid min-h-[72px] grid-cols-[2.75rem_1fr] gap-3 rounded-md border px-3 py-3 transition-[background-color,border-color,color] duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated ${
                      active
                        ? "border-[var(--border-strong)] bg-brand-subtle text-text-primary"
                        : "border-transparent text-text-secondary hover:border-[var(--border-default)] hover:bg-bg-surface hover:text-text-primary"
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-subtle text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <aside className="px-6 py-6">
          <div className="relative h-full overflow-hidden rounded-lg border border-[var(--border-default)] bg-bg-surface p-5 [box-shadow:var(--elev-1-inset),var(--elev-2)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[image:var(--glow-hero)] opacity-75"
            />
            <div className="relative flex h-full flex-col">
              <p className="font-mono text-xs uppercase text-brand-accent">
                Featured
              </p>
              <h2 className="mt-3 text-[length:var(--fs-h4)] font-semibold leading-tight text-text-primary">
                AI Readiness Assessment
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                A focused executive conversation to identify where AI can be
                governed, useful, and worth operational investment.
              </p>
              <div className="mt-5 grid gap-2 text-xs text-text-tertiary">
                <span>30 minutes</span>
                <span>No obligation</span>
                <span>Dallas-Fort Worth team</span>
              </div>
              <div className="mt-auto pt-6">
                <Button href="/contact" size="sm" className="w-full">
                  Book AI Assessment
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main header                                                         */
/* ------------------------------------------------------------------ */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const chromeRef = useRef<HTMLDivElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!solutionsOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!isNodeInside(chromeRef.current, event.target)) {
        setSolutionsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSolutionsOpen(false);
        solutionsTriggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [solutionsOpen]);

  return (
    <>
      <header
        ref={chromeRef}
        onMouseLeave={() => setSolutionsOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setSolutionsOpen(false);
          }
        }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || menuOpen || solutionsOpen
            ? "bg-bg-elevated/80 backdrop-blur-md border-[var(--border-subtle)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logos/itecs-horizontal.svg"
              alt="ITECS"
              width={148}
              height={44}
              priority
              className="brightness-0 invert"
              style={{ height: "44px", width: "auto" }}
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {desktopNavLinks.map((link) => {
              const isActive = desktopRouteMatches(pathname, link);

              if (link.label === "Solutions") {
                return (
                  <button
                    key={link.label}
                    ref={solutionsTriggerRef}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={solutionsOpen}
                    aria-controls="solutions-mega-menu"
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onFocus={() => setSolutionsOpen(true)}
                    onClick={() => setSolutionsOpen((current) => !current)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSolutionsOpen((current) => !current);
                      }
                    }}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
                      isActive
                        ? "text-text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
                    isActive
                      ? "text-text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side — phone + CTA + mobile menu toggle */}
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-4 lg:flex">
              <a
                href={`tel:${SITE_CONFIG.phoneE164}`}
                className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                {SITE_CONFIG.phone}
              </a>
              <Button href="/contact" size="sm">
                Book AI Assessment
              </Button>
            </div>
            <button
              className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-bg-surface text-text-primary transition-colors hover:border-[var(--border-strong)] hover:text-brand-accent lg:hidden ${REDUCE_MOTION}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <SolutionsMegaMenu
          open={solutionsOpen}
          pathname={pathname}
          onNavigate={() => setSolutionsOpen(false)}
        />
      </header>

      {/* Full-screen takeover — rendered outside header to avoid stacking issues */}
      <MegaMenu
        key={pathname}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
