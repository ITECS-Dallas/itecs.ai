"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Bot,
  Zap,
  GraduationCap,
  Phone,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/* Nav data — structured by role, not flat list                        */
/* ------------------------------------------------------------------ */

const serviceItems = [
  {
    label: "AI Consulting",
    href: "/consulting",
    icon: Brain,
    desc: "Workflow audit and AI roadmap",
  },
  {
    label: "Custom ChatGPT",
    href: "/custom-chatgpt",
    icon: Bot,
    desc: "Private AI agents on your data",
  },
  {
    label: "Automation",
    href: "/automation",
    icon: Zap,
    desc: "Connect tools, eliminate handoffs",
  },
  {
    label: "AI Training",
    href: "/training",
    icon: GraduationCap,
    desc: "Hands-on workshops for your team",
  },
  {
    label: "AI Receptionist",
    href: "/ai-receptionist",
    icon: Phone,
    desc: "24/7 call answering and booking",
  },
  {
    label: "CRM & Sales AI",
    href: "/crm-sales-ai",
    icon: BarChart3,
    desc: "AI-powered pipeline automation",
  },
  {
    label: "Knowledge Base",
    href: "/ai-knowledge-base",
    icon: BookOpen,
    desc: "Internal RAG search for SOPs",
  },
  {
    label: "Data Audit",
    href: "/data-audit",
    icon: ShieldCheck,
    desc: "Score your AI readiness",
  },
];

/* ------------------------------------------------------------------ */
/* Desktop mega-dropdown                                               */
/* ------------------------------------------------------------------ */

function SolutionsDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-xl border border-[var(--border-subtle)] bg-bg-elevated/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Services grid */}
          <div className="p-5">
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-dim mb-4">
              AI Services
            </p>
            <div className="grid grid-cols-2 gap-1">
              {serviceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-bg-surface/60 transition-colors"
                  >
                    <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-md bg-brand-accent/8 group-hover:bg-brand-accent/15 transition-colors">
                      <Icon
                        className="h-4 w-4 text-brand-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <span className="block text-sm text-text-primary group-hover:text-brand-accent transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-text-dim leading-snug mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom bar — featured links */}
          <div className="border-t border-[var(--border-subtle)] bg-bg-surface/40 px-5 py-3 flex items-center justify-between">
            <Link
              href="/managed-intelligence-provider"
              onClick={onClose}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-brand-accent transition-colors"
            >
              <Sparkles
                className="h-4 w-4 text-brand-purple"
                aria-hidden="true"
              />
              <span>Managed Intelligence Provider</span>
              <ArrowRight
                className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/services"
              onClick={onClose}
              className="text-xs text-text-dim hover:text-brand-accent transition-colors"
            >
              View all services &rarr;
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile nav panel                                                    */
/* ------------------------------------------------------------------ */

function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 top-[72px] z-[60] bg-bg-void/98 backdrop-blur-2xl md:hidden overflow-y-auto"
        >
          <nav className="px-6 pt-8 pb-16">
            {/* Services section */}
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-dim mb-4">
              AI Services
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {serviceItems.map((item, i) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border transition-colors ${
                        active
                          ? "border-[var(--border-active)] bg-brand-accent/10"
                          : "border-[var(--border-subtle)] bg-bg-surface/30 active:bg-bg-surface/60"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          active ? "text-brand-accent" : "text-text-dim"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-sm ${
                          active ? "text-brand-accent" : "text-text-primary"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border-subtle)] mb-6" />

            {/* Featured link */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/managed-intelligence-provider"
                onClick={onClose}
                className={`flex items-center gap-3 p-4 rounded-lg border mb-6 transition-colors ${
                  pathname === "/managed-intelligence-provider"
                    ? "border-brand-purple/40 bg-brand-purple/10"
                    : "border-[var(--border-subtle)] bg-bg-surface/30"
                }`}
              >
                <Sparkles
                  className="h-5 w-5 text-brand-purple shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-sm font-medium text-text-primary">
                    Managed Intelligence Provider
                  </span>
                  <span className="block text-xs text-text-dim mt-0.5">
                    The evolution beyond the MSP
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Page links */}
            <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-dim mb-4">
              Company
            </p>
            {[
              { label: "All Services", href: "/services" },
              { label: "Insights", href: "/insights" },
              { label: "About", href: "/about" },
            ].map((link, i) => {
              const active = pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block py-3 text-lg font-light transition-colors ${
                      active
                        ? "text-brand-accent"
                        : "text-text-primary active:text-brand-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button href="/contact" size="lg" className="w-full">
                Get Your Free Assessment
              </Button>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center justify-center gap-2 py-3 text-sm text-text-secondary hover:text-brand-accent transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE_CONFIG.phone}
              </a>
            </motion.div>
          </nav>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isServicePage =
    pathname.startsWith("/services") ||
    pathname.startsWith("/consulting") ||
    pathname.startsWith("/custom-chatgpt") ||
    pathname.startsWith("/automation") ||
    pathname.startsWith("/training") ||
    pathname.startsWith("/ai-receptionist") ||
    pathname.startsWith("/crm-sales-ai") ||
    pathname.startsWith("/ai-knowledge-base") ||
    pathname.startsWith("/data-audit") ||
    pathname.startsWith("/managed-intelligence-provider");

  const navItems = [
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] border-b transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled || mobileOpen
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
              width={160}
              height={44}
              priority
              className="h-11 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Solutions dropdown trigger */}
            <div className="relative">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onMouseEnter={() => setSolutionsOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm tracking-wide transition-colors ${
                  isServicePage || solutionsOpen
                    ? "text-brand-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <SolutionsDropdown
                open={solutionsOpen}
                onClose={() => setSolutionsOpen(false)}
              />
            </div>

            {/* Direct links */}
            {navItems.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm tracking-wide transition-colors ${
                    active
                      ? "text-brand-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block shrink-0">
            <Button href="/contact" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-lg text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile panel — rendered outside header to avoid stacking context issues */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
