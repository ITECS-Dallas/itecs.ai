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
import { usePathname } from "next/navigation";
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
  Menu,
  Search,
  ServerCog,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
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
  match?: readonly string[];
};

const desktopNavLinks: readonly NavLink[] = [
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
];

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

function desktopRouteMatches(pathname: string, link: NavLink) {
  if (link.match) {
    return link.match.some((href) => routeMatches(pathname, href));
  }

  return routeMatches(pathname, link.href);
}

function isNodeInside(parent: HTMLElement | null, child: EventTarget | null) {
  return Boolean(parent && child instanceof Node && parent.contains(child));
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

function MobileNavDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
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
    if (!open) return;

    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

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

  if (!open) {
    return null;
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
          <Link href="/" onClick={onClose} className="flex items-center">
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
          <Button href="/contact" size="lg" className="w-full" onClick={onClose}>
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const chromeRef = useRef<HTMLElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMenuOpen(false);
      setSolutionsOpen(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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

  function closeMobileMenu() {
    setMenuOpen(false);
    mobileTriggerRef.current?.focus();
  }

  return (
    <>
      <header
        ref={chromeRef}
        onMouseLeave={() => setSolutionsOpen(false)}
        onBlur={(event) => {
          if (!isNodeInside(event.currentTarget, event.relatedTarget)) {
            setSolutionsOpen(false);
          }
        }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || menuOpen || solutionsOpen
            ? "border-[var(--border-subtle)] bg-bg-elevated/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8 lg:h-[72px]">
          <Link href="/" className="flex shrink-0 items-center">
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
              const active = desktopRouteMatches(pathname, link);

              if (link.label === "Solutions") {
                return (
                  <button
                    key={link.label}
                    ref={solutionsTriggerRef}
                    type="button"
                    aria-current={active ? "page" : undefined}
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
                      active
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
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
                    active
                      ? "text-text-primary after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

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
              ref={mobileTriggerRef}
              type="button"
              className="relative z-50 flex h-12 w-12 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface text-text-primary transition-colors hover:border-[var(--border-strong)] hover:text-brand-accent lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-site-drawer"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <SolutionsMegaMenu
          open={solutionsOpen}
          pathname={pathname}
          onNavigate={() => setSolutionsOpen(false)}
        />
      </header>

      <div id="mobile-site-drawer">
        <MobileNavDrawer
          open={menuOpen}
          pathname={pathname}
          onClose={closeMobileMenu}
        />
      </div>
    </>
  );
}
