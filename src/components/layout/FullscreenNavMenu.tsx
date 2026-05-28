"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, X, type LucideIcon } from "lucide-react";
import {
  MANUFACTURING_HUB_NAV_ITEM,
  MANUFACTURING_USE_CASE_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
  type LayoutNavItem,
} from "@/components/layout/navData";

interface FullscreenNavMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

interface MenuCardProps {
  item: LayoutNavItem;
  pathname: string;
  onClose: () => void;
  compact?: boolean;
  parentActive?: boolean;
}

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

const decisionAreas = [
  "Margin",
  "Working capital",
  "Throughput",
  "Quality",
  "Supply chain",
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SectionHeading({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
        {eyebrow}
      </p>
      <h2 id={id} className="text-xl font-light text-text-primary sm:text-2xl">
        {title}
      </h2>
      {children ? (
        <p className="max-w-2xl text-sm leading-relaxed text-text-dim">
          {children}
        </p>
      ) : null}
    </div>
  );
}

function IconFrame({
  icon: Icon,
  active,
}: {
  icon: LucideIcon;
  active: boolean;
}) {
  return (
    <div
      className={classNames(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors",
        active
          ? "border-brand-accent/40 bg-brand-accent/15 text-brand-accent"
          : "border-white/10 bg-bg-void/50 text-text-secondary group-hover:border-brand-accent/30 group-hover:text-brand-accent"
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

function MenuCard({
  item,
  pathname,
  onClose,
  compact = false,
  parentActive = false,
}: MenuCardProps) {
  const active = parentActive || isActivePath(pathname, item.href);
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
      <Link
        href={item.href}
        onClick={onClose}
        aria-current={active ? "page" : undefined}
        className={classNames(
          "group flex h-full rounded-xl border transition-colors duration-200",
          compact
            ? "min-h-[92px] gap-3 p-3"
            : "min-h-[132px] flex-col justify-between gap-4 p-4",
          active
            ? "border-[var(--border-active)] bg-brand-accent/10"
            : "border-[var(--border-subtle)] bg-bg-surface/55 hover:border-[var(--border-active)] hover:bg-bg-elevated/70"
        )}
      >
        <div className={classNames("flex", compact ? "gap-3" : "flex-col gap-4")}>
          <IconFrame icon={Icon} active={active} />
          <div>
            <span
              className={classNames(
                "block text-sm leading-snug transition-colors",
                active
                  ? "text-brand-accent"
                  : "text-text-primary group-hover:text-brand-accent"
              )}
            >
              {item.label}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-text-dim">
              {item.desc}
            </span>
          </div>
        </div>
        {!compact ? (
          <ArrowRight
            className={classNames(
              "h-4 w-4 transition-transform duration-200 group-hover:translate-x-1",
              active ? "text-brand-accent" : "text-text-dim"
            )}
            aria-hidden="true"
          />
        ) : null}
      </Link>
    </motion.div>
  );
}

function SecondaryLink({
  label,
  href,
  pathname,
  onClose,
}: {
  label: string;
  href: string;
  pathname: string;
  onClose: () => void;
}) {
  const active = isActivePath(pathname, href);

  return (
    <motion.div variants={itemVariants}>
      <Link
        href={href}
        onClick={onClose}
        aria-current={active ? "page" : undefined}
        className={classNames(
          "group flex min-h-12 items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors",
          active
            ? "border-[var(--border-active)] bg-brand-accent/10 text-brand-accent"
            : "border-[var(--border-subtle)] bg-bg-surface/45 text-text-secondary hover:border-[var(--border-active)] hover:text-text-primary"
        )}
      >
        <span>{label}</span>
        <ArrowRight
          className="h-3.5 w-3.5 text-text-dim transition-transform group-hover:translate-x-1 group-hover:text-brand-accent"
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const HubIcon = MANUFACTURING_HUB_NAV_ITEM.icon;
  const hubActive = isActivePath(pathname, MANUFACTURING_HUB_NAV_ITEM.href);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-bg-void text-text-primary"
        >
          <div
            className="pointer-events-none fixed inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="pointer-events-none fixed inset-x-0 top-24 h-px bg-brand-accent/25"
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
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-bg-elevated text-xs font-medium text-brand-accent">
                  AI
                </span>
                <span className="uppercase tracking-[0.14em]">ITECS</span>
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
            </motion.header>

            <div className="grid flex-1 grid-cols-1 gap-6 pb-8 lg:grid-cols-12">
              <motion.section
                variants={itemVariants}
                aria-labelledby="fullscreen-manufacturing-heading"
                className="lg:col-span-7 xl:col-span-8"
              >
                <SectionHeading
                  eyebrow="Industries / Manufacturing AI"
                  title="Manufacturing intelligence"
                >
                  Governed AI navigation for margin, working capital,
                  throughput, quality, and supply-chain decisions.
                </SectionHeading>

                <motion.div variants={itemVariants} whileHover={{ y: -3 }}>
                  <Link
                    href={MANUFACTURING_HUB_NAV_ITEM.href}
                    onClick={onClose}
                    aria-current={hubActive ? "page" : undefined}
                    className={classNames(
                      "group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-xl border p-5 transition-colors sm:p-6",
                      hubActive
                        ? "border-[var(--border-active)] bg-brand-accent/10"
                        : "border-[var(--border-subtle)] bg-bg-elevated/80 hover:border-[var(--border-active)]"
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40"
                      aria-hidden="true"
                      style={{
                        backgroundImage:
                          "linear-gradient(120deg, rgba(6, 182, 212, 0.14), transparent 34%), linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 45%)",
                      }}
                    />
                    <div className="relative flex flex-col gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-brand-accent/35 bg-brand-accent/15 text-brand-accent">
                          <HubIcon className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <div className="hidden rounded-lg border border-white/10 bg-bg-void/45 px-3 py-2 text-right sm:block">
                          <p className="text-xs uppercase tracking-[0.12em] text-text-dim">
                            Parent hub
                          </p>
                          <p className="mt-1 text-sm text-text-secondary">
                            Dallas team. National manufacturing reach.
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand-accent">
                          Manufacturing command center
                        </p>
                        <h2
                          id="fullscreen-manufacturing-heading"
                          className="mt-3 max-w-2xl text-4xl font-light leading-tight text-text-primary sm:text-5xl"
                        >
                          Manufacturing AI Hub
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                          {MANUFACTURING_HUB_NAV_ITEM.desc}. Start here for the
                          executive view, then move into focused operational use
                          cases.
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-8 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        {decisionAreas.map((area) => (
                          <span
                            key={area}
                            className="flex min-h-10 items-center justify-center rounded-lg border border-white/10 bg-bg-void/40 px-2 text-center text-xs text-text-secondary"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-sm text-brand-accent">
                        <span>Open manufacturing hub</span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-5 border-l border-brand-accent/30 pl-4 sm:pl-5"
                >
                  <div className="mb-4 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-dim">
                        Child pages under the hub
                      </p>
                      <h3 className="mt-1 text-xl font-light text-text-primary">
                        Manufacturing use cases
                      </h3>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-text-dim">
                      Each card goes deeper on one finance, plant, quality, or
                      supply-chain decision lane.
                    </p>
                  </div>

                  <motion.div
                    variants={panelVariants}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {MANUFACTURING_USE_CASE_NAV_ITEMS.map((item) => (
                      <MenuCard
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClose={onClose}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.section>

              <motion.aside
                variants={itemVariants}
                className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4"
              >
                <section aria-labelledby="fullscreen-services-heading">
                  <SectionHeading
                    id="fullscreen-services-heading"
                    eyebrow="Services"
                    title="AI services"
                  >
                    Advisory, agents, automation, training, DevOps, and
                    operating support for production AI.
                  </SectionHeading>

                  <motion.div
                    variants={panelVariants}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"
                  >
                    {SERVICE_NAV_ITEMS.map((item) => (
                      <MenuCard
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClose={onClose}
                        compact
                      />
                    ))}
                  </motion.div>
                </section>

                <section aria-labelledby="fullscreen-explore-heading">
                  <SectionHeading
                    id="fullscreen-explore-heading"
                    eyebrow="Explore"
                    title="Company and resources"
                  />

                  <motion.div
                    variants={panelVariants}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"
                  >
                    {SECONDARY_NAV_ITEMS.map((item) => (
                      <SecondaryLink
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        pathname={pathname}
                        onClose={onClose}
                      />
                    ))}
                  </motion.div>
                </section>

                <motion.section
                  variants={itemVariants}
                  aria-label="Assessment call"
                  className="rounded-xl border border-[var(--border-subtle)] bg-bg-elevated/70 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Start with the manufacturing readiness assessment.
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-dim">
                        A concise executive working session for data, workflow,
                        governance, and first-use-case fit.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent px-4 py-3 text-sm font-medium text-bg-void transition-colors hover:bg-brand-accent-bright"
                  >
                    Request assessment
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.section>
              </motion.aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default FullscreenNavMenu;
