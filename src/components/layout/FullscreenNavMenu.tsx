"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, ExternalLink, X, type LucideIcon } from "lucide-react";
import {
  COMPANY_NAV_ITEMS,
  MANUFACTURING_HUB_NAV_ITEM,
  MANUFACTURING_USE_CASE_NAV_ITEMS,
  MENU_CATEGORY_ITEMS,
  RESOURCE_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
  type LayoutNavItem,
  type MenuCategoryAccent,
  type MenuCategoryItem,
} from "@/components/layout/navData";

interface FullscreenNavMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

// Tailwind motion-safe utilities and Framer Motion durations keep this menu
// compatible with users who request reduced motion via prefers-reduced-motion.
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
      staggerChildren: 0.035,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 6 },
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const menuSectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut", staggerChildren: 0.03 },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18, ease: "easeOut" } },
};

const sidebarVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.04 },
  },
  exit: { opacity: 0, x: -10, transition: { duration: 0.18, ease: "easeOut" } },
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isExactPath(pathname: string, href: string) {
  return pathname === href;
}

function accentClasses(accent: MenuCategoryAccent, active = false) {
  if (accent === "purple") {
    return active
      ? "border-brand-purple/70 bg-brand-purple/15 text-text-primary shadow-[inset_3px_0_0_rgba(139,92,246,0.9)]"
      : "border-brand-purple/35 bg-brand-purple/10 text-text-secondary hover:border-brand-purple/60 hover:text-text-primary";
  }

  if (accent === "cyan") {
    return active
      ? "border-brand-accent/70 bg-brand-accent/15 text-text-primary shadow-[inset_3px_0_0_rgba(6,182,212,0.9)]"
      : "border-brand-accent/30 bg-brand-accent/10 text-text-secondary hover:border-brand-accent/60 hover:text-text-primary";
  }

  return active
    ? "border-[var(--border-active)] bg-bg-elevated text-text-primary shadow-[inset_3px_0_0_rgba(148,163,184,0.45)]"
    : "border-[var(--border-subtle)] bg-bg-surface/45 text-text-secondary hover:border-[var(--border-active)] hover:text-text-primary";
}

function categoryIconTone(category: MenuCategoryItem) {
  if (category.accent === "purple") {
    return "text-brand-purple";
  }

  if (category.accent === "cyan") {
    return "text-brand-accent";
  }

  return "text-text-dim";
}

function IconFrame({
  icon: Icon,
  active,
  accent = "cyan",
}: {
  icon: LucideIcon;
  active: boolean;
  accent?: MenuCategoryAccent;
}) {
  const activeTone =
    accent === "purple"
      ? "border-brand-purple/50 bg-brand-purple/15 text-brand-purple"
      : "border-brand-accent/40 bg-brand-accent/15 text-brand-accent";

  const idleTone =
    accent === "purple"
      ? "border-brand-purple/25 bg-brand-purple/10 text-brand-purple group-hover:border-brand-purple/45"
      : "border-white/10 bg-bg-void/50 text-text-secondary group-hover:border-brand-accent/30 group-hover:text-brand-accent";

  return (
    <div
      className={classNames(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
        active ? activeTone : idleTone
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

function SidebarCategoryRail({ pathname }: { pathname: string }) {
  return (
    <motion.aside
      variants={sidebarVariants}
      className="border-b border-[var(--border-subtle)] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6"
      aria-label="Menu categories"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-dim">
        Navigation
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {MENU_CATEGORY_ITEMS.map((category) => {
          const Icon = category.icon;
          const categoryActive =
            category.accent === "purple" &&
            isActivePath(pathname, MANUFACTURING_HUB_NAV_ITEM.href);

          return (
            <motion.div key={category.label} variants={itemVariants}>
              <div
                className={classNames(
                  "group rounded-xl border p-4 transition-colors duration-200",
                  accentClasses(category.accent, categoryActive)
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={classNames(
                      "mt-0.5 h-5 w-5 shrink-0",
                      categoryIconTone(category)
                    )}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {category.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-dim">
                      {category.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.aside>
  );
}

function MegaMenuLink({
  item,
  pathname,
  onClose,
  accent = "cyan",
  compact = false,
}: {
  item: LayoutNavItem;
  pathname: string;
  onClose: () => void;
  accent?: MenuCategoryAccent;
  compact?: boolean;
}) {
  const active = item.external ? false : isActivePath(pathname, item.href);
  const current = item.external ? false : isExactPath(pathname, item.href);
  const Icon = item.icon;
  const content = (
    <>
      <IconFrame icon={Icon} active={active} accent={accent} />
      <span className="min-w-0 flex-1">
        <span
          className={classNames(
            "block text-sm font-medium leading-snug transition-colors",
            active ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
          )}
        >
          {item.label}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-text-dim">
          {item.desc}
        </span>
      </span>
      {item.external ? (
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 text-text-dim transition-colors group-hover:text-brand-purple"
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 text-text-dim transition-transform group-hover:translate-x-1 group-hover:text-brand-accent"
          aria-hidden="true"
        />
      )}
    </>
  );

  const className = classNames(
    "group flex h-full rounded-xl border transition-colors duration-200 motion-safe:hover:-translate-y-0.5",
    compact ? "min-h-[76px] gap-3 p-3" : "min-h-[92px] gap-3 p-4",
    accentClasses(accent, active)
  );

  if (item.external) {
    return (
      <motion.div variants={itemVariants}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={className}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        onClick={onClose}
        aria-current={current ? "page" : undefined}
        className={className}
      >
        {content}
      </Link>
    </motion.div>
  );
}

function ManufacturingChildLink({
  item,
  pathname,
  onClose,
}: {
  item: LayoutNavItem;
  pathname: string;
  onClose: () => void;
}) {
  const active = isActivePath(pathname, item.href);
  const current = isExactPath(pathname, item.href);

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        onClick={onClose}
        aria-current={current ? "page" : undefined}
        className={classNames(
          "group flex min-h-12 items-center justify-between gap-3 border-l-2 bg-bg-surface/45 px-3 py-2 text-sm transition-colors motion-safe:hover:translate-x-0.5",
          active
            ? "border-brand-purple bg-brand-purple/15 text-text-primary"
            : "border-brand-purple/35 text-text-secondary hover:border-brand-purple hover:text-text-primary"
        )}
      >
        <span className="leading-snug">{item.label}</span>
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 text-text-dim transition-transform group-hover:translate-x-1 group-hover:text-brand-purple"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export function FullscreenNavMenu({
  open,
  pathname,
  onClose,
}: FullscreenNavMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hubActive = isActivePath(pathname, MANUFACTURING_HUB_NAV_ITEM.href);
  const hubCurrent = isExactPath(pathname, MANUFACTURING_HUB_NAV_ITEM.href);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function trapFocus(event: KeyboardEvent) {
      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!dialog.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        trapFocus(event);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
      ) {
        previouslyFocusedElement.focus({ preventScroll: true });
      }
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-bg-void text-text-primary"
        >
          <div
            className="pointer-events-none fixed inset-0 opacity-80"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(139, 92, 246, 0.16), transparent 28%), linear-gradient(300deg, rgba(6, 182, 212, 0.12), transparent 36%), linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 48px 48px, 48px 48px",
            }}
          />
          <div
            className="pointer-events-none fixed inset-x-0 top-24 h-px bg-brand-purple/25"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none fixed inset-y-0 left-[12%] w-px bg-white/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none fixed inset-y-0 right-[18%] w-px bg-white/5"
            aria-hidden="true"
          />

          <motion.div
            variants={panelVariants}
            className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8"
          >
            <motion.header
              variants={itemVariants}
              className="sticky top-0 z-10 mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] bg-bg-void/90 py-4 backdrop-blur-xl"
            >
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-purple/30 bg-brand-purple/10 text-xs font-medium text-brand-accent">
                  AI
                </span>
                <span className="uppercase tracking-[0.14em]">ITECS</span>
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="hidden min-h-10 items-center justify-center rounded-lg bg-gradient-to-r from-brand-accent to-brand-purple px-4 text-sm font-medium text-bg-void transition-opacity hover:opacity-90 sm:flex"
                >
                  Contact
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close site menu"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface/70 text-text-secondary transition-colors hover:border-[var(--border-active)] hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/60 focus:ring-offset-2 focus:ring-offset-bg-void"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </motion.header>

            <div className="grid flex-1 grid-cols-1 gap-6 pb-8 lg:grid-cols-[250px_1fr]">
              <SidebarCategoryRail pathname={pathname} />

              <motion.main
                variants={menuSectionVariants}
                className="space-y-7"
                aria-label="Mega menu links"
              >
                <div className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
                  <section aria-labelledby="mega-services-heading">
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                        AI Services
                      </p>
                      <h2
                        id="mega-services-heading"
                        className="mt-2 text-2xl font-light text-text-primary"
                      >
                        Build and operate practical AI
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-dim">
                        Consulting, agents, automation, training, and managed AI operations.
                      </p>
                    </div>
                    <motion.div
                      variants={menuSectionVariants}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {SERVICE_NAV_ITEMS.map((item) => (
                        <MegaMenuLink
                          key={item.href}
                          item={item}
                          pathname={pathname}
                          onClose={onClose}
                          accent="cyan"
                          compact
                        />
                      ))}
                    </motion.div>
                  </section>

                  <section aria-labelledby="mega-industries-heading">
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-purple">
                        Industries
                      </p>
                      <h2
                        id="mega-industries-heading"
                        className="mt-2 text-2xl font-light text-text-primary"
                      >
                        Manufacturing AI
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-text-dim">
                        Manufacturing AI Hub and use-case pages for finance, plant, quality, and supply-chain decisions.
                      </p>
                    </div>

                    <motion.div variants={itemVariants}>
                      <Link
                        href={MANUFACTURING_HUB_NAV_ITEM.href}
                        onClick={onClose}
                        aria-current={hubCurrent ? "page" : undefined}
                        className={classNames(
                          "group relative block overflow-hidden rounded-xl border p-4 transition-colors duration-200",
                          hubActive
                            ? "border-brand-purple/70 bg-brand-purple/15"
                            : "border-brand-purple/35 bg-brand-purple/10 hover:border-brand-purple/60"
                        )}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(6,182,212,0.08),transparent_60%)]"
                          aria-hidden="true"
                        />
                        <div className="relative flex items-start gap-3">
                          <IconFrame
                            icon={MANUFACTURING_HUB_NAV_ITEM.icon}
                            active={hubActive}
                            accent="purple"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-base font-medium text-text-primary">
                              Manufacturing AI Hub
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-text-dim">
                              Parent page for manufacturing finance and operations AI.
                            </span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-text-dim transition-transform group-hover:translate-x-1 group-hover:text-brand-purple"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </motion.div>

                    <div className="mt-4 border-l border-brand-purple/35 pl-4">
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-text-dim">
                        Manufacturing AI child pages
                      </p>
                      <motion.div
                        variants={menuSectionVariants}
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        {MANUFACTURING_USE_CASE_NAV_ITEMS.map((item) => (
                          <ManufacturingChildLink
                            key={item.href}
                            item={item}
                            pathname={pathname}
                            onClose={onClose}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </section>
                </div>

                <div className="grid gap-6 border-t border-[var(--border-subtle)] pt-6 lg:grid-cols-2">
                  <section aria-labelledby="mega-resources-heading">
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-dim">
                        Resources
                      </p>
                      <h2
                        id="mega-resources-heading"
                        className="mt-2 text-xl font-light text-text-primary"
                      >
                        Insights and reference pages
                      </h2>
                    </div>
                    <motion.div
                      variants={menuSectionVariants}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {RESOURCE_NAV_ITEMS.map((item) => (
                        <MegaMenuLink
                          key={item.href}
                          item={item}
                          pathname={pathname}
                          onClose={onClose}
                          accent="neutral"
                          compact
                        />
                      ))}
                    </motion.div>
                  </section>

                  <section aria-labelledby="mega-company-heading">
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-dim">
                        Company
                      </p>
                      <h2
                        id="mega-company-heading"
                        className="mt-2 text-xl font-light text-text-primary"
                      >
                        About, pricing, contact, and ITECS MSP
                      </h2>
                    </div>
                    <motion.div
                      variants={menuSectionVariants}
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {COMPANY_NAV_ITEMS.map((item) => (
                        <MegaMenuLink
                          key={item.href}
                          item={item}
                          pathname={pathname}
                          onClose={onClose}
                          accent={item.label === "Contact Us" ? "cyan" : "neutral"}
                          compact
                        />
                      ))}
                    </motion.div>
                  </section>
                </div>
              </motion.main>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default FullscreenNavMenu;
