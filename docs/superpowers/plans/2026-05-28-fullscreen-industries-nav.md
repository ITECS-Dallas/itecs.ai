# Fullscreen Industries Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat desktop Industries dropdown with a premium full-screen hamburger navigation that presents Manufacturing AI as the parent hub and manufacturing use cases as child pages.

**Architecture:** Move header navigation data into a small layout data module, create a focused `FullscreenNavMenu` overlay component, simplify `Header` into logo/contact/menu controls, and restructure the footer Industries section into parent/child hierarchy. Preserve existing URLs, metadata, page content, and sitemap behavior.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, existing manufacturing constants.

---

## File Structure

- Create `src/components/layout/navData.ts`
  - Owns service navigation and manufacturing navigation data for the header/footer.
  - Exports icon-bearing navigation item arrays.

- Create `src/components/layout/FullscreenNavMenu.tsx`
  - Owns the full-screen overlay UI, animation, manufacturing hierarchy, secondary links, and close behavior.
  - Receives `open`, `pathname`, and `onClose` from `Header`.

- Modify `src/components/layout/Header.tsx`
  - Remove desktop root links and dropdown components.
  - Keep logo, Contact CTA, and hamburger menu trigger.
  - Render `FullscreenNavMenu` outside the header.
  - Lock body scroll while the menu is open.

- Modify `src/components/layout/Footer.tsx`
  - Use hierarchical Manufacturing AI hub + child use-case list instead of one flat Industries array.

- Modify `tests/manufacturing-pages.test.mjs`
  - Add source-level assertions for the new full-screen menu, simplified header, and footer hierarchy.

---

### Task 1: Add Navigation Regression Tests

**Files:**
- Modify: `tests/manufacturing-pages.test.mjs`

- [ ] **Step 1: Add assertions for full-screen menu source**

In `tests/manufacturing-pages.test.mjs`, update the existing `links manufacturing pages from global navigation and footer` test to check the new architecture. Replace that test body with:

```js
  it("links manufacturing pages from full-screen navigation and grouped footer", () => {
    const header = read("src/components/layout/Header.tsx");
    const fullScreenMenu = read("src/components/layout/FullscreenNavMenu.tsx");
    const navData = read("src/components/layout/navData.ts");
    const footer = read("src/components/layout/Footer.tsx");

    assert.match(header, /FullscreenNavMenu/);
    assert.match(header, /aria-label=\\{mobileOpen \\? "Close site menu" : "Open site menu"\\}/);
    assert.match(header, /href="\\/contact"/);
    assert.doesNotMatch(header, /SolutionsDropdown/);
    assert.doesNotMatch(header, /IndustriesDropdown/);
    assert.doesNotMatch(header, /const navItems = \\[/);

    assert.match(fullScreenMenu, /Manufacturing AI Hub/);
    assert.match(fullScreenMenu, /Dallas team/);
    assert.match(fullScreenMenu, /National manufacturing reach/);
    assert.match(fullScreenMenu, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(fullScreenMenu, /SERVICE_NAV_ITEMS/);

    assert.match(navData, /MANUFACTURING_HUB_NAV_ITEM/);
    assert.match(navData, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(navData, /PPV_AGENT_USE_CASE/);
    assert.match(navData, /MANUFACTURING_SPOKE_PAGES/);

    assert.match(footer, /Manufacturing use cases/);
    assert.match(footer, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(footer, /ITECS MSP/);
    assert.doesNotMatch(footer, /ITECS Main Site/);

    for (const route of spokeRoutes) {
      assert.match(navData, new RegExp(route));
    }
    assert.match(navData, /\\/manufacturing\\/ppv-agent/);
  });
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
```

Expected: failure because `FullscreenNavMenu.tsx` and `navData.ts` do not exist yet, or because `Header.tsx` still contains `SolutionsDropdown` and `IndustriesDropdown`.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/manufacturing-pages.test.mjs
git commit -m "Add fullscreen nav regression test"
```

---

### Task 2: Extract Shared Navigation Data

**Files:**
- Create: `src/components/layout/navData.ts`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create the nav data module**

Create `src/components/layout/navData.ts`:

```ts
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  ChartNoAxesCombined,
  Factory,
  FileSearch,
  GraduationCap,
  LineChart,
  Phone,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  MANUFACTURING_SPOKE_PAGES,
  MANUFACTURING_VERTICAL,
  PPV_AGENT_USE_CASE,
} from "@/lib/constants";

export interface LayoutNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
}

export const SERVICE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "AI Consulting",
    href: "/consulting",
    icon: Brain,
    desc: "Workflow audit and AI roadmap",
  },
  {
    label: "Custom AI Agents",
    href: "/custom-ai-agents",
    icon: Bot,
    desc: "Claude, Codex, RAG, and app workflows",
  },
  {
    label: "Automation",
    href: "/automation",
    icon: Zap,
    desc: "Connect tools, eliminate handoffs",
  },
  {
    label: "AI DevOps",
    href: "/ai-devops",
    icon: ServerCog,
    desc: "Deploy, monitor, and operate AI",
  },
  {
    label: "AI Training",
    href: "/training",
    icon: GraduationCap,
    desc: "Hands-on workshops for your team",
  },
  {
    label: "AI Champion Program",
    href: "/services/ai-champion-program",
    icon: UserRoundCheck,
    desc: "Develop your internal AI lead",
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
  {
    label: "AI-Optimized SEO",
    href: "/ai-optimized-seo",
    icon: Search,
    desc: "GEO + traditional SEO for Dallas",
  },
];

export const MANUFACTURING_HUB_NAV_ITEM: LayoutNavItem = {
  label: "Manufacturing AI Hub",
  href: MANUFACTURING_VERTICAL.href,
  icon: Factory,
  desc: "AI for manufacturing finance, operations, quality, and supply chain decisions",
};

const manufacturingIconMap: Record<string, LucideIcon> = {
  Activity,
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  FileSearch,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Truck,
  UsersRound,
};

export const MANUFACTURING_USE_CASE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: PPV_AGENT_USE_CASE.shortTitle,
    href: PPV_AGENT_USE_CASE.href,
    icon: BadgeDollarSign,
    desc: "Purchase price variance and commodity cost intelligence",
  },
  ...MANUFACTURING_SPOKE_PAGES.map((page) => ({
    label: page.shortTitle,
    href: page.href,
    icon: manufacturingIconMap[
      MANUFACTURING_VERTICAL.useCases.find((useCase) => useCase.href === page.href)
        ?.icon ?? ""
    ] ?? Factory,
    desc: page.description,
  })),
];

export const SECONDARY_NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
] as const;
```

- [ ] **Step 2: Remove local nav arrays from `Header.tsx`**

In `src/components/layout/Header.tsx`, remove the local `serviceItems` and `industryItems` arrays after the imports. Imports will be repaired in Task 4 after `FullscreenNavMenu` is created.

- [ ] **Step 3: Run typecheck and record expected failures**

Run:

```bash
npx tsc --noEmit
```

Expected: errors in `Header.tsx` because it still references removed arrays and dropdown components. Continue to the next task.

- [ ] **Step 4: Commit the data module**

```bash
git add src/components/layout/navData.ts src/components/layout/Header.tsx
git commit -m "Extract layout navigation data"
```

If `Header.tsx` cannot be committed because the repo blocks commits with failing typecheck, include this change in the next task's commit instead.

---

### Task 3: Build the Full-Screen Menu Component

**Files:**
- Create: `src/components/layout/FullscreenNavMenu.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/layout/FullscreenNavMenu.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  CircuitBoard,
  Factory,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  MANUFACTURING_HUB_NAV_ITEM,
  MANUFACTURING_USE_CASE_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
} from "@/components/layout/navData";

interface FullscreenNavMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function FullscreenNavMenu({
  open,
  pathname,
  onClose,
}: FullscreenNavMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-bg-void/98 text-text-primary backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(6,182,212,0.18),transparent_32%),radial-gradient(circle_at_82%_10%,rgba(139,92,246,0.16),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 md:px-8">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-5">
              <Link
                href="/"
                onClick={onClose}
                className="text-sm font-medium tracking-[0.16em] text-text-primary uppercase"
              >
                ITECS AI
              </Link>
              <div className="flex items-center gap-3">
                <Button href="/contact" size="sm">
                  Contact
                </Button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close site menu"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface/60 text-text-primary transition-colors hover:border-[var(--border-active)] hover:text-brand-accent"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid flex-1 gap-8 py-8 lg:grid-cols-[1.05fr_1.7fr_0.75fr] lg:py-12">
              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.32 }}
                className="relative overflow-hidden rounded-xl border border-brand-accent/25 bg-bg-elevated/70 p-6 shadow-2xl shadow-black/30"
              >
                <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-brand-purple/10" />
                <div className="relative">
                  <p className="text-xs font-medium tracking-[0.16em] text-brand-accent uppercase">
                    Industries / Manufacturing AI
                  </p>
                  <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-xl border border-brand-accent/25 bg-brand-accent/10">
                    <Factory className="h-7 w-7 text-brand-accent" aria-hidden="true" />
                  </div>
                  <h2 className="mt-8 text-4xl font-light leading-tight tracking-[-0.02em] text-text-primary md:text-5xl">
                    {MANUFACTURING_HUB_NAV_ITEM.label}
                  </h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
                    Margin, working capital, throughput, quality, and supply-chain intelligence for manufacturers that need governed AI tied to operating decisions.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {["Margin", "Working capital", "Throughput", "Risk"].map((label) => (
                      <div
                        key={label}
                        className="rounded-lg border border-[var(--border-subtle)] bg-bg-void/40 p-3 text-sm text-text-secondary"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={MANUFACTURING_HUB_NAV_ITEM.href}
                    onClick={onClose}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-bright"
                  >
                    Open hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.32 }}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-[0.16em] text-text-dim uppercase">
                      Manufacturing use cases
                    </p>
                    <h3 className="mt-3 text-2xl font-light text-text-primary">
                      Connected child pages under the hub
                    </h3>
                  </div>
                  <p className="hidden text-right text-xs text-text-dim md:block">
                    Dallas team. National manufacturing reach.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {MANUFACTURING_USE_CASE_NAV_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 + index * 0.025, duration: 0.24 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`group flex min-h-[150px] flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--border-active)] ${
                            active
                              ? "border-brand-accent/40 bg-brand-accent/10"
                              : "border-[var(--border-subtle)] bg-bg-surface/45"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                              <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                            </div>
                            <ArrowRight className="h-4 w-4 translate-x-[-4px] text-text-dim opacity-0 transition-all group-hover:translate-x-0 group-hover:text-brand-accent group-hover:opacity-100" />
                          </div>
                          <h4 className="mt-5 text-base font-light leading-snug text-text-primary">
                            {item.label}
                          </h4>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-dim">
                            {item.desc}
                          </p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.aside
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.32 }}
                className="space-y-8 border-t border-[var(--border-subtle)] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              >
                <section>
                  <p className="text-xs font-medium tracking-[0.16em] text-text-dim uppercase">
                    AI Services
                  </p>
                  <div className="mt-4 space-y-2">
                    {SERVICE_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-3 rounded-lg p-2 text-sm text-text-secondary transition-colors hover:bg-bg-surface/50 hover:text-brand-accent"
                        >
                          <Icon className="h-4 w-4 text-text-dim transition-colors group-hover:text-brand-accent" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <p className="text-xs font-medium tracking-[0.16em] text-text-dim uppercase">
                    Explore
                  </p>
                  <div className="mt-4 space-y-3">
                    {SECONDARY_NAV_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="block text-sm text-text-secondary transition-colors hover:text-brand-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </section>

                <Link
                  href="/managed-intelligence-provider"
                  onClick={onClose}
                  className="group block rounded-xl border border-brand-purple/25 bg-brand-purple/10 p-5 transition-colors hover:border-brand-purple/50"
                >
                  <div className="flex items-center gap-3 text-brand-purple">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                    <span className="text-sm font-medium">Managed Intelligence</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                    Ongoing AI operations, monitoring, and improvement after launch.
                  </p>
                </Link>
              </motion.aside>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] py-5 text-xs text-text-dim md:flex-row md:items-center md:justify-between">
              <span>Dallas team. National manufacturing reach.</span>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2">
                  <CircuitBoard className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                  Governed AI workflows
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4 text-brand-accent" aria-hidden="true" />
                  Finance-led value cases
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Run typecheck and record expected failures**

Run:

```bash
npx tsc --noEmit
```

Expected: `Header.tsx` still fails until Task 4 removes old dropdown references and imports the new component.

- [ ] **Step 3: Commit the new component**

```bash
git add src/components/layout/FullscreenNavMenu.tsx
git commit -m "Add fullscreen site navigation menu"
```

If typecheck gating prevents this isolated commit, include this file in Task 4's commit.

---

### Task 4: Simplify Header to Contact + Hamburger

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace the `Header.tsx` imports**

At the top of `src/components/layout/Header.tsx`, replace imports with:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FullscreenNavMenu } from "@/components/layout/FullscreenNavMenu";
```

- [ ] **Step 2: Delete old dropdown and mobile panel code**

Remove these blocks from `Header.tsx`:

- local `serviceItems`
- local `industryItems`
- `SolutionsDropdown`
- `IndustriesDropdown`
- `MobileNav`

Do not leave unused imports.

- [ ] **Step 3: Replace the `Header` component body**

Replace the `Header` component with:

```tsx
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMobileOpen(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 h-[72px] border-b transition-[top,background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || mobileOpen ? "top-0" : "top-8"
        } ${
          scrolled || mobileOpen
            ? "bg-bg-elevated/80 backdrop-blur-xl border-[var(--border-subtle)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
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

          <div className="flex shrink-0 items-center gap-3">
            <Button href="/contact" size="sm">
              Contact
            </Button>
            <button
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface/40 text-text-primary transition-colors hover:border-[var(--border-active)] hover:text-brand-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close site menu" : "Open site menu"}
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
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
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <FullscreenNavMenu
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 4: Run typecheck**

Run:

```bash
npx tsc --noEmit
```

Expected: pass or only errors in `navData.ts` from type inference. If `navData.ts` errors because icon inference is too narrow, explicitly annotate mapped items with `LayoutNavItem`.

- [ ] **Step 5: Run the manufacturing test**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
```

Expected: pass.

- [ ] **Step 6: Commit header work**

```bash
git add src/components/layout/Header.tsx src/components/layout/FullscreenNavMenu.tsx src/components/layout/navData.ts tests/manufacturing-pages.test.mjs
git commit -m "Replace header links with fullscreen navigation"
```

---

### Task 5: Restructure Footer Industries Hierarchy

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update footer imports**

Replace the manufacturing imports at the top of `Footer.tsx` with:

```ts
import {
  MANUFACTURING_HUB_NAV_ITEM,
  MANUFACTURING_USE_CASE_NAV_ITEMS,
} from "@/components/layout/navData";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
```

- [ ] **Step 2: Remove the flat `industryLinks` array**

Delete:

```ts
const industryLinks = [
  {
    key: "manufacturing",
    label: "Manufacturing AI",
    href: "/manufacturing",
  },
  {
    key: "ppv-agent",
    label: PPV_AGENT_USE_CASE.shortTitle,
    href: PPV_AGENT_USE_CASE.href,
  },
  ...MANUFACTURING_SPOKE_PAGES.map((page) => ({
    key: page.slug,
    label: page.shortTitle,
    href: page.href,
  })),
];
```

- [ ] **Step 3: Replace the Industries footer section**

Replace the Industries `<div>` in `Footer.tsx` with:

```tsx
          <div>
            <h4 className="mb-4 text-sm font-medium tracking-[0.05em] text-text-primary uppercase">
              Industries
            </h4>
            <div className="space-y-4">
              <Link
                href={MANUFACTURING_HUB_NAV_ITEM.href}
                className="group block rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-3 transition-colors hover:border-brand-accent/40"
              >
                <span className="block text-sm font-medium text-text-primary transition-colors group-hover:text-brand-accent">
                  Manufacturing AI
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-text-dim">
                  Finance, operations, quality, and supply-chain use cases
                </span>
              </Link>

              <div>
                <p className="mb-3 text-xs font-medium tracking-[0.08em] text-text-secondary uppercase">
                  Manufacturing use cases
                </p>
                <ul className="space-y-2 border-l border-[var(--border-subtle)] pl-3">
                  {MANUFACTURING_USE_CASE_NAV_ITEMS.map((industry) => (
                    <li key={industry.href}>
                      <Link
                        href={industry.href}
                        className="text-sm text-text-dim transition-colors hover:text-brand-accent"
                      >
                        {industry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
```

- [ ] **Step 4: Run footer-related tests**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
npx tsc --noEmit
```

Expected: both pass.

- [ ] **Step 5: Commit footer work**

```bash
git add src/components/layout/Footer.tsx tests/manufacturing-pages.test.mjs
git commit -m "Group manufacturing links in footer"
```

---

### Task 6: Full Validation, Browser QA, Deploy, and GSC Decision

**Files:**
- No expected source edits unless validation finds a defect.

- [ ] **Step 1: Run full local validation**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
npm run seo:audit
npx tsc --noEmit
npm run lint
npm run build
```

Expected:

- manufacturing tests pass
- SEO audit passes
- TypeScript clean
- lint clean
- production build succeeds

- [ ] **Step 2: Run Playwright mobile smoke**

Use Googlebot Smartphone viewport:

- width `412`
- height `915`

Validate on `https://itecs.ai/manufacturing` after deploy, and on local/prod build before deploy if a local server is running:

- menu opens from hamburger
- menu closes with close button
- menu has `Manufacturing AI Hub`
- menu has all manufacturing use-case links
- no horizontal overflow
- Contact CTA remains visible in header

Use this browser evaluation after opening the menu:

```js
() => {
  const text = document.body.innerText;
  return {
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    hasHub: text.includes("Manufacturing AI Hub"),
    hasPPV: text.includes("PPV Agent"),
    hasDemand: text.includes("Demand"),
    hasContact: [...document.querySelectorAll("a")].some((a) => a.textContent?.includes("Contact")),
    hasOldHeaderRoots: [...document.querySelectorAll("header a, header button")].some((el) =>
      ["Solutions", "Industries", "Pricing", "Insights", "About"].includes(el.textContent?.trim() || "")
    ),
  };
}
```

Expected:

- `documentWidth === width`
- `hasHub === true`
- `hasPPV === true`
- `hasContact === true`
- `hasOldHeaderRoots === false`

- [ ] **Step 3: Run Playwright desktop smoke**

Use a desktop viewport such as `1440x1000`.

Validate:

- visible header contains logo, Contact, and hamburger/menu button
- visible header does not show Solutions, Industries, Pricing, Insights, or About root links
- full-screen overlay opens
- manufacturing hub card and use-case grid are visible
- Services and Explore sections are visible
- close button and Escape close the overlay

- [ ] **Step 4: Deploy**

Run:

```bash
docker compose -p itecsai up -d --build --no-deps web
```

Expected:

- Docker build succeeds
- `itecsai-web-1` restarts and is `Up`

- [ ] **Step 5: Verify live route and container**

Run:

```bash
curl -k -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://itecs.ai/manufacturing
docker ps --filter name=itecsai-web-1 --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
```

Expected:

- HTTP `200`
- container status `Up`

- [ ] **Step 6: Decide whether GSC skill is required**

This implementation changes navigation and internal links, not URLs, page metadata, robots, canonicals, or sitemap contents. GSC submission is not required by the approved spec.

If the implementation materially changes indexable page content during QA fixes, run:

```bash
node .codex/skills/gsc-page-validation/scripts/gsc-submit-inspect.mjs \
  https://itecs.ai/manufacturing \
  https://itecs.ai/manufacturing/ppv-agent \
  https://itecs.ai/manufacturing/demand-forecasting-sop-ai \
  https://itecs.ai/manufacturing/predictive-maintenance-ai \
  https://itecs.ai/manufacturing/inventory-working-capital-ai \
  https://itecs.ai/manufacturing/quality-traceability-ai \
  https://itecs.ai/manufacturing/customer-sku-profitability-ai \
  https://itecs.ai/manufacturing/production-scheduling-yield-ai \
  https://itecs.ai/manufacturing/contract-pass-through-intelligence \
  https://itecs.ai/manufacturing/energy-freight-scope-3-ai \
  https://itecs.ai/manufacturing/vendor-payment-anomaly-ai
```

Expected:

- `siteGet.ok === true`
- sitemap submit status `204`
- live checks return `200`, matching canonical, `index, follow`, and sitemap inclusion

- [ ] **Step 7: Commit final validation fixes if any**

If QA required fixes:

```bash
git add src/components/layout/Header.tsx src/components/layout/FullscreenNavMenu.tsx src/components/layout/navData.ts src/components/layout/Footer.tsx tests/manufacturing-pages.test.mjs
git commit -m "Polish fullscreen navigation"
git push
```

If no fixes were required after prior commits:

```bash
git status --short --branch
git push
```

Expected: branch is clean and pushed.

---

## Self-Review

- Spec coverage: Header simplification, full-screen overlay, Manufacturing AI parent hierarchy, footer grouping, visual direction, data reuse, validation, and GSC decision are covered.
- Deferred-work scan: Clean. The plan contains complete file paths, source snippets, commands, and expected outcomes for every task.
- Type consistency: `LayoutNavItem`, `SERVICE_NAV_ITEMS`, `MANUFACTURING_HUB_NAV_ITEM`, and `MANUFACTURING_USE_CASE_NAV_ITEMS` are defined before they are consumed.
- Scope control: URL architecture, page content, DNS, NGINX, and secrets are out of scope.
