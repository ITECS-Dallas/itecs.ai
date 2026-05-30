"use client";

import { useState, useEffect } from "react";
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
  Factory,
  Menu,
  PackageCheck,
  Sparkles,
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

const CATEGORY_ICONS: Record<string, MenuIcon> = {
  "AI Services": Brain,
  "AI Products": PackageCheck,
  Industries: Factory,
  Resources: BookOpenText,
  Company: Building2,
};

function routeMatches(pathname: string, link: MegaMenuLink) {
  return !link.external && pathname === link.href;
}

function findCategoryIndex(pathname: string) {
  const index = MEGA_MENU_CATEGORIES.findIndex((cat) =>
    cat.links.some((link) => routeMatches(pathname, link))
  );

  return index >= 0 ? index : 0;
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

/* ------------------------------------------------------------------ */
/* Main header                                                         */
/* ------------------------------------------------------------------ */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
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

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 h-[72px] border-b transition-[top,background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || menuOpen ? "top-0" : "top-8"
        } ${
          scrolled || menuOpen
            ? "bg-bg-elevated/80 backdrop-blur-xl border-[var(--border-subtle)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
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

          {/* Right side — CTA + menu toggle */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <Button href="/contact" size="sm">
                Get Started
              </Button>
            </div>
            <button
              className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface text-text-primary transition-colors hover:border-brand-accent hover:text-brand-accent ${REDUCE_MOTION}`}
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
