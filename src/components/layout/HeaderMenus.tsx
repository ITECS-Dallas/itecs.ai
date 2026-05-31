"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type SVGProps,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenText,
  Bot,
  Brain,
  Building2,
  ChevronDown,
  Database,
  Factory,
  GraduationCap,
  Headset,
  Search,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

type MenuItem = {
  label: string;
  href: string;
  description: string;
  icon: MenuIcon;
};

type MenuColumn = {
  title: string;
  description: string;
  items: MenuItem[];
};

type NavLink = {
  label: string;
  href: string;
};

const solutionsMegaColumns: MenuColumn[] = [
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

const industryLinks: MenuItem[] = [
  {
    label: "Manufacturing AI",
    href: "/manufacturing",
    description: "Finance, plant, supply chain, and operating intelligence.",
    icon: Factory,
  },
  {
    label: "PPV Agent",
    href: "/manufacturing/ppv-agent",
    description: "Purchase price variance and commodity cost intelligence.",
    icon: Database,
  },
  {
    label: "Demand & S&OP",
    href: "/manufacturing/demand-forecasting-sop-ai",
    description: "Forecasting and planning workflows for manufacturers.",
    icon: Workflow,
  },
  {
    label: "Quality & Traceability",
    href: "/manufacturing/quality-traceability-ai",
    description: "Root-cause and traceability intelligence.",
    icon: ShieldCheck,
  },
];

const mobilePrimaryLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

function routeMatches(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.offsetParent !== null,
  );
}

export function SolutionsMegaMenu({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id="solutions-mega-menu"
      role="region"
      aria-label="Solutions menu"
      className="absolute left-0 top-full hidden w-full border-y border-[var(--border-subtle)] bg-bg-elevated/95 shadow-e3 backdrop-blur-md lg:block"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_0.95fr] px-8">
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
                const active = routeMatches(pathname, item.href);

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
                <Button href="/assessment" size="sm" className="w-full">
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

function MobileMenuItem({
  item,
  pathname,
  onNavigate,
}: {
  item: MenuItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const active = routeMatches(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`grid min-h-12 grid-cols-[2.5rem_1fr] gap-3 rounded-md border px-3 py-3 ${
        active
          ? "border-[var(--border-strong)] bg-brand-subtle text-text-primary"
          : "border-[var(--border-default)] bg-bg-surface text-text-secondary"
      }`}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-subtle text-brand">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{item.label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

export function MobileNavDrawer({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [openSections, setOpenSections] = useState({
    solutions: true,
    industries: false,
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !drawerRef.current) {
      return;
    }

    const focusable = getFocusable(drawerRef.current);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const solutionItems = solutionsMegaColumns.flatMap((column) => column.items);

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-bg-base text-text-primary lg:hidden"
    >
      <div className="flex min-h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] px-5">
          <Link href="/" onClick={onClose} className="flex min-h-12 items-center">
            <Image
              src="/images/logos/itecs-horizontal.svg"
              alt="ITECS"
              width={132}
              height={40}
              className="brightness-0 invert"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-12 w-12 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface text-text-primary"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 px-5 pb-36 pt-5">
          <div className="grid gap-2">
            {mobilePrimaryLinks.map((link) => {
              const active = routeMatches(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-md border px-4 text-base font-semibold ${
                    active
                      ? "border-[var(--border-strong)] bg-brand-subtle text-text-primary"
                      : "border-[var(--border-default)] bg-bg-surface text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-[var(--border-default)] bg-bg-sunken">
            <button
              type="button"
              aria-expanded={openSections.solutions}
              aria-controls="mobile-solutions"
              onClick={() =>
                setOpenSections((current) => ({
                  ...current,
                  solutions: !current.solutions,
                }))
              }
              className="flex min-h-12 w-full items-center justify-between px-4 text-left text-base font-semibold text-text-primary"
            >
              Solutions
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 transition-transform duration-[var(--dur-base)] ${
                  openSections.solutions ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id="mobile-solutions"
              hidden={!openSections.solutions}
              className="grid gap-2 border-t border-[var(--border-subtle)] p-3"
            >
              {solutionItems.map((item) => (
                <MobileMenuItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[var(--border-default)] bg-bg-sunken">
            <button
              type="button"
              aria-expanded={openSections.industries}
              aria-controls="mobile-industries"
              onClick={() =>
                setOpenSections((current) => ({
                  ...current,
                  industries: !current.industries,
                }))
              }
              className="flex min-h-12 w-full items-center justify-between px-4 text-left text-base font-semibold text-text-primary"
            >
              Industries
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 transition-transform duration-[var(--dur-base)] ${
                  openSections.industries ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id="mobile-industries"
              hidden={!openSections.industries}
              className="grid gap-2 border-t border-[var(--border-subtle)] p-3"
            >
              {industryLinks.map((item) => (
                <MobileMenuItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={onClose}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="fixed inset-x-0 bottom-0 border-t border-[var(--border-default)] bg-bg-base px-5 py-4">
          <Button href="/assessment" size="lg" className="w-full" onClick={onClose}>
            Book AI Assessment
          </Button>
          <a
            href={`tel:${SITE_CONFIG.phoneE164}`}
            className="mt-3 flex min-h-12 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface font-mono text-sm text-text-secondary"
          >
            {SITE_CONFIG.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
