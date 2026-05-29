"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ArrowUpRight, CornerDownRight } from "lucide-react";
import {
  SITE_CONFIG,
  MEGA_MENU_CATEGORIES,
  MEGA_MENU_FEATURED,
  MEGA_MENU_QUICK_LINKS,
  MEGA_MENU_STATS,
  type MegaMenuLink,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const REDUCE_MOTION = "motion-reduce:transition-none motion-reduce:transform-none";

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
  // First category expanded by default; hover (desktop) or tap (mobile) switches.
  const [activeCat, setActiveCat] = useState(0);

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
                "radial-gradient(55% 45% at 82% 6%, rgba(139,92,246,0.16), transparent 60%), radial-gradient(45% 38% at 10% 96%, rgba(6,182,212,0.12), transparent 60%)",
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
          <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr_0.95fr]">
            {/* Column 1 — categories */}
            <div className="border-b border-[var(--border-subtle)] px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                  Navigate // ITECS AI
                </span>
                <Link
                  href="/services"
                  onClick={onClose}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-brand-accent"
                >
                  All services ↗
                </Link>
              </div>

              {MEGA_MENU_CATEGORIES.map((cat, i) => {
                const isActive = activeCat === i;
                return (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setActiveCat(i)}
                    className="py-0.5"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCat(isActive ? -1 : i)}
                      aria-expanded={isActive}
                      className="flex w-full items-baseline gap-3 py-2 text-left"
                    >
                      <span
                        className={`text-[28px] font-light leading-tight tracking-tight transition-colors md:text-[33px] ${
                          isActive
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {cat.name}
                      </span>
                      <span className="font-mono text-[10.5px] text-text-dim">{cat.num}</span>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${REDUCE_MOTION} ${
                        isActive ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {cat.links.map((link) => {
                        const active = !link.external && pathname === link.href;
                        return (
                          <MenuLink
                            key={link.label}
                            link={link}
                            onNavigate={onClose}
                            className={`group/link flex items-center gap-2.5 py-1.5 pl-0.5 text-[17px] transition-all ${REDUCE_MOTION} hover:translate-x-1 ${
                              active
                                ? "text-brand-accent"
                                : "text-text-dim hover:text-text-primary"
                            }`}
                          >
                            <CornerDownRight
                              className="h-3.5 w-3.5 shrink-0 text-brand-accent opacity-75 transition-opacity group-hover/link:opacity-100"
                              aria-hidden="true"
                            />
                            <span>{link.label}</span>
                            {link.external && (
                              <ArrowUpRight
                                className="h-3 w-3 text-text-dim"
                                aria-hidden="true"
                              />
                            )}
                          </MenuLink>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Column 2 — featured proof cards */}
            <div className="border-b border-[var(--border-subtle)] px-6 py-8 md:px-8 lg:border-b-0 lg:border-r">
              <div className="mb-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                  Featured // Proof
                </span>
                <Link
                  href="/insights"
                  onClick={onClose}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-brand-accent"
                >
                  View insights ↗
                </Link>
              </div>

              {MEGA_MENU_FEATURED.map((feat) => (
                <Link
                  key={feat.href}
                  href={feat.href}
                  onClick={onClose}
                  className={`group/feat mb-4 block overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-elevated transition-all ${REDUCE_MOTION} hover:-translate-y-0.5 hover:border-[var(--border-active)]`}
                >
                  <div
                    className="relative h-[120px] overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(40% 60% at 78% 30%, rgba(6,182,212,0.35), transparent 60%), radial-gradient(50% 70% at 22% 80%, rgba(139,92,246,0.32), transparent 62%), linear-gradient(135deg, #0f1b3a, #0a1124)",
                    }}
                  >
                    <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.1em] text-text-secondary">
                      ◇ ITECS.AI
                    </span>
                    <span className="absolute bottom-3 right-3 h-2.5 w-2.5 animate-pulse rounded-full bg-brand-accent" />
                  </div>
                  <div className="px-5 py-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-accent">
                      {feat.eyebrow}
                    </div>
                    <h3 className="mt-2 text-[18px] font-semibold leading-snug tracking-tight text-text-primary">
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                      {feat.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-accent">
                      {feat.cta}
                      <ArrowRight
                        className={`h-3.5 w-3.5 transition-transform ${REDUCE_MOTION} group-hover/feat:translate-x-1`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Column 3 — offerings, stats, quick links */}
            <div className="px-6 py-8 md:px-8">
              <div className="mb-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                  Offerings
                </span>
                <Link
                  href="/services"
                  onClick={onClose}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-brand-accent"
                >
                  View all ↗
                </Link>
              </div>

              <p className="mb-4 text-[14.5px] leading-relaxed text-text-secondary">
                Packaged, production-ready AI you can deploy in weeks: receptionists,
                sales AI, internal knowledge search and AI-era SEO — all governed and
                supported.
              </p>
              <Link
                href="/services"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-accent"
              >
                <CornerDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                Explore AI Services
              </Link>

              {/* Stats */}
              <div className="my-6 flex overflow-hidden rounded-xl border border-[var(--border-subtle)]">
                {MEGA_MENU_STATS.map((stat) => (
                  <div
                    key={stat.l}
                    className="flex-1 border-r border-[var(--border-subtle)] p-3.5 last:border-r-0"
                  >
                    <div className="text-[20px] font-bold text-text-primary">{stat.n}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-text-secondary">
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="mb-4 border-t border-[var(--border-subtle)] pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
                  Quick links
                </span>
              </div>
              <div className="flex flex-col">
                {MEGA_MENU_QUICK_LINKS.map((link) => (
                  <MenuLink
                    key={link.label}
                    link={link}
                    onNavigate={onClose}
                    className={`group/q flex items-center justify-between border-b border-[var(--border-subtle)] py-2.5 text-[15px] text-text-secondary transition-all ${REDUCE_MOTION} hover:pl-2 hover:text-text-primary`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-text-dim transition-colors group-hover/q:text-brand-accent"
                      aria-hidden="true"
                    />
                  </MenuLink>
                ))}
              </div>
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
              className={`inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-brand-accent to-brand-purple px-6 py-3 text-[14px] font-bold text-bg-void transition-all ${REDUCE_MOTION} hover:brightness-110`}
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
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
