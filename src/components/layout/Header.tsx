"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

const SolutionsMegaMenu = dynamic(
  () => import("./HeaderMenus").then((mod) => mod.SolutionsMegaMenu),
  { ssr: false },
);

const MobileNavDrawer = dynamic(
  () => import("./HeaderMenus").then((mod) => mod.MobileNavDrawer),
  { ssr: false },
);

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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const chromeRef = useRef<HTMLElement>(null);
  const solutionsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        className={`fixed left-0 right-0 z-50 border-b transition-[top,background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || menuOpen || solutionsOpen ? "top-0" : "top-8"
        } ${
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
                        setSolutionsOpen(true);
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
              <Button href="/assessment" size="sm">
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

        {solutionsOpen ? (
          <SolutionsMegaMenu
            pathname={pathname}
            onNavigate={() => setSolutionsOpen(false)}
          />
        ) : null}
      </header>

      <div id="mobile-site-drawer">
        {menuOpen ? (
          <MobileNavDrawer pathname={pathname} onClose={closeMobileMenu} />
        ) : null}
      </div>
    </>
  );
}
