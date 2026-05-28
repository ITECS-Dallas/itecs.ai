# Sidebar Mega Menu Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Manufacturing-led full-screen hamburger panel with a traditional full-screen sidebar mega menu ordered AI Services, Industries, Resources, Company, with Manufacturing AI Hub as the Industries parent and manufacturing pages nested beneath it.

**Architecture:** Keep `Header` as the lightweight logo/contact/hamburger shell and keep the lightweight manufacturing navigation data boundary. Extend `navData.ts` with category, resources, and company navigation groups, then rewrite `FullscreenNavMenu.tsx` into a sidebar mega menu that preserves the existing dialog, focus trap, exact `aria-current`, and route-closing behavior.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Framer Motion, Tailwind CSS v4, lucide-react, existing `navData.ts` and `manufacturingNavigation.ts`.

---

## File Structure

- Modify `tests/manufacturing-pages.test.mjs`
  - Strengthens source regression coverage for the new sidebar mega menu structure.

- Modify `src/components/layout/navData.ts`
  - Adds resource links, company links, and category metadata for the mega menu.
  - Keeps manufacturing data lightweight and avoids importing `@/lib/constants`.

- Modify `src/components/layout/FullscreenNavMenu.tsx`
  - Replaces the Manufacturing hero layout with a sidebar category rail and mega menu content groups.
  - Preserves accessibility and focus behavior.

- Modify `scripts/seo-audit.mjs`
  - Aligns static SEO/internal-link checks with the new mega menu source structure.

- No planned changes:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/lib/manufacturingNavigation.ts`

---

### Task 1: Add Sidebar Mega Menu Regression Tests

**Files:**
- Modify: `tests/manufacturing-pages.test.mjs`

- [ ] **Step 1: Replace the navigation assertion block**

In `tests/manufacturing-pages.test.mjs`, replace the test named `links manufacturing pages from full-screen navigation and grouped footer` with this body:

```js
  it("links manufacturing pages from sidebar mega menu and grouped footer", () => {
    const header = read("src/components/layout/Header.tsx");
    const navData = read("src/components/layout/navData.ts");
    const manufacturingNavigation = read("src/lib/manufacturingNavigation.ts");
    const footer = read("src/components/layout/Footer.tsx");
    const fullScreenMenu = read("src/components/layout/FullscreenNavMenu.tsx");

    assert.match(navData, /MANUFACTURING_HUB_NAV_ITEM/);
    assert.match(navData, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(navData, /RESOURCE_NAV_ITEMS/);
    assert.match(navData, /COMPANY_NAV_ITEMS/);
    assert.match(navData, /MENU_CATEGORY_ITEMS/);
    assert.match(navData, /@\/lib\/manufacturingNavigation/);
    assert.match(navData, /resolveManufacturingIcon/);
    assert.doesNotMatch(navData, /@\/lib\/constants/);
    assert.doesNotMatch(navData, /PPV_AGENT_USE_CASE/);
    assert.doesNotMatch(navData, /MANUFACTURING_VERTICAL/);
    assert.doesNotMatch(navData, /MANUFACTURING_SPOKE_PAGES/);

    assert.match(manufacturingNavigation, /MANUFACTURING_HUB_NAV_DATA/);
    assert.match(manufacturingNavigation, /MANUFACTURING_USE_CASE_NAV_DATA/);
    assert.match(manufacturingNavigation, /Manufacturing AI Hub/);
    assert.match(manufacturingNavigation, /PPV Agent/);
    assert.match(manufacturingNavigation, /Demand & S&OP/);
    assert.match(manufacturingNavigation, /Vendor Anomaly Detection/);
    assert.doesNotMatch(manufacturingNavigation, /@\/lib\/constants/);

    assert.match(fullScreenMenu, /SidebarCategoryRail/);
    assert.match(fullScreenMenu, /MegaMenuLink/);
    assert.match(fullScreenMenu, /ManufacturingChildLink/);
    assert.match(fullScreenMenu, /MENU_CATEGORY_ITEMS/);
    assert.match(fullScreenMenu, /SERVICE_NAV_ITEMS/);
    assert.match(fullScreenMenu, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(fullScreenMenu, /RESOURCE_NAV_ITEMS/);
    assert.match(fullScreenMenu, /COMPANY_NAV_ITEMS/);
    assert.match(fullScreenMenu, /AI Services/);
    assert.match(fullScreenMenu, /Industries/);
    assert.match(fullScreenMenu, /Resources/);
    assert.match(fullScreenMenu, /Company/);
    assert.match(fullScreenMenu, /Manufacturing AI Hub/);
    assert.match(fullScreenMenu, /Manufacturing AI child pages/);
    assert.match(fullScreenMenu, /Contact Us/);
    assert.match(fullScreenMenu, /Insights/);
    assert.match(fullScreenMenu, /ITECS MSP/);
    assert.match(fullScreenMenu, /brand-purple/);
    assert.match(fullScreenMenu, /prefers-reduced-motion/);

    const aiServicesIndex = fullScreenMenu.indexOf("AI Services");
    const industriesIndex = fullScreenMenu.indexOf("Industries");
    const resourcesIndex = fullScreenMenu.indexOf("Resources");
    const companyIndex = fullScreenMenu.indexOf("Company");

    assert.ok(aiServicesIndex >= 0, "AI Services category should exist");
    assert.ok(industriesIndex > aiServicesIndex, "Industries should follow AI Services");
    assert.ok(resourcesIndex > industriesIndex, "Resources should follow Industries");
    assert.ok(companyIndex > resourcesIndex, "Company should follow Resources");

    assert.match(fullScreenMenu, /dialogRef/);
    assert.match(fullScreenMenu, /focusableElements/);
    assert.match(fullScreenMenu, /shiftKey/);
    assert.match(fullScreenMenu, /isExactPath/);
    assert.match(fullScreenMenu, /aria-current=\{current \? "page" : undefined\}/);

    assert.match(header, /FullscreenNavMenu/);
    assert.match(header, /aria-label/);
    assert.match(header, /Open site menu/);
    assert.match(header, /Close site menu/);
    assert.match(header, /href="\/contact"/);
    assert.doesNotMatch(header, /SolutionsDropdown/);
    assert.doesNotMatch(header, /IndustriesDropdown/);
    assert.doesNotMatch(header, /const navItems = \[/);

    assert.match(footer, /Manufacturing use cases/);
    assert.match(footer, /MANUFACTURING_USE_CASE_NAV_ITEMS/);
    assert.match(footer, /ITECS MSP/);
    assert.doesNotMatch(footer, /ITECS Main Site/);
  });
```

- [ ] **Step 2: Run the focused test and verify red**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
```

Expected: one failure in the updated navigation test because `RESOURCE_NAV_ITEMS`, `COMPANY_NAV_ITEMS`, `MENU_CATEGORY_ITEMS`, `SidebarCategoryRail`, and the new menu labels are not implemented yet.

- [ ] **Step 3: Commit the failing regression test**

```bash
git add tests/manufacturing-pages.test.mjs
git commit -m "Add sidebar mega menu regression test"
```

---

### Task 2: Add Mega Menu Navigation Data

**Files:**
- Modify: `src/components/layout/navData.ts`
- Test: `tests/manufacturing-pages.test.mjs`

- [ ] **Step 1: Update imports in `navData.ts`**

Replace the current lucide import block with this import block:

```ts
import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  ChartNoAxesCombined,
  Compass,
  Factory,
  FileSearch,
  GraduationCap,
  LineChart,
  Phone,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRoundCheck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
```

- [ ] **Step 2: Extend nav item types**

In `src/components/layout/navData.ts`, replace the existing `LayoutNavItem` interface with:

```ts
export interface LayoutNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
  external?: boolean;
}

export type MenuCategoryAccent = "cyan" | "purple" | "neutral";

export interface MenuCategoryItem {
  label: string;
  desc: string;
  icon: LucideIcon;
  accent: MenuCategoryAccent;
}
```

- [ ] **Step 3: Add resource and company nav groups**

After `SERVICE_NAV_ITEMS`, add:

```ts
export const RESOURCE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "Insights",
    href: "/insights",
    icon: BookOpen,
    desc: "AI strategy, security, and operations articles",
  },
  {
    label: "AI-Optimized SEO",
    href: "/ai-optimized-seo",
    icon: Search,
    desc: "GEO and traditional SEO for AI-era search",
  },
  {
    label: "Services Overview",
    href: "/services",
    icon: Compass,
    desc: "All ITECS AI services in one place",
  },
];

export const COMPANY_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "About",
    href: "/about",
    icon: Building2,
    desc: "ITECS AI background and operating model",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: BadgeDollarSign,
    desc: "Engagement models and managed AI options",
  },
  {
    label: "Managed Intelligence",
    href: "/managed-intelligence-provider",
    icon: Sparkles,
    desc: "Ongoing AI operations and improvement",
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Phone,
    desc: "Start a practical AI conversation",
  },
  {
    label: "ITECS MSP",
    href: "https://itecsonline.com",
    icon: ShieldCheck,
    desc: "Dallas managed IT services from ITECS",
    external: true,
  },
];

export const MENU_CATEGORY_ITEMS: MenuCategoryItem[] = [
  {
    label: "AI Services",
    desc: "Consulting, agents, automation, and AI operations.",
    icon: Brain,
    accent: "cyan",
  },
  {
    label: "Industries",
    desc: "Manufacturing AI hub and use-case pages.",
    icon: Factory,
    accent: "purple",
  },
  {
    label: "Resources",
    desc: "Insights and reference pages.",
    icon: BookOpen,
    accent: "neutral",
  },
  {
    label: "Company",
    desc: "About, pricing, contact, and ITECS MSP.",
    icon: Building2,
    accent: "neutral",
  },
];
```

- [ ] **Step 4: Run typecheck**

Run:

```bash
npx tsc --noEmit
```

Expected: pass.

- [ ] **Step 5: Run the focused test and verify remaining red**

Run:

```bash
node --test tests/manufacturing-pages.test.mjs
```

Expected: the navigation test still fails because `FullscreenNavMenu.tsx` does not yet contain `SidebarCategoryRail`, `MegaMenuLink`, `ManufacturingChildLink`, or the new layout labels.

- [ ] **Step 6: Commit nav data**

```bash
git add src/components/layout/navData.ts tests/manufacturing-pages.test.mjs
git commit -m "Add sidebar mega menu navigation data"
```

---

### Task 3: Rewrite Fullscreen Menu As Sidebar Mega Menu

**Files:**
- Modify: `src/components/layout/FullscreenNavMenu.tsx`
- Test: `tests/manufacturing-pages.test.mjs`

- [ ] **Step 1: Replace imports from lucide and nav data**

At the top of `src/components/layout/FullscreenNavMenu.tsx`, replace the lucide/navData imports with:

```tsx
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
```

- [ ] **Step 2: Remove Manufacturing-hero-only constants and components**

In `src/components/layout/FullscreenNavMenu.tsx`, delete:

```tsx
const decisionAreas = [
  "Margin",
  "Working capital",
  "Throughput",
  "Quality",
  "Supply chain",
];
```

Delete the old `SectionHeading`, `MenuCard`, and `SecondaryLink` component definitions.

- [ ] **Step 3: Add mega menu helper constants and accent helpers**

After `focusableSelector`, add:

```tsx
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
```

- [ ] **Step 4: Add reusable link and category components**

Add these component definitions below `IconFrame`:

```tsx
function SidebarCategoryRail({
  pathname,
}: {
  pathname: string;
}) {
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
            category.label === "Industries" &&
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
                      category.accent === "purple"
                        ? "text-brand-purple"
                        : category.accent === "cyan"
                          ? "text-brand-accent"
                          : "text-text-dim"
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
  const active = isActivePath(pathname, item.href);
  const current = isExactPath(pathname, item.href);
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
```

- [ ] **Step 5: Update `IconFrame` signature**

Replace `IconFrame` with:

```tsx
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
```

- [ ] **Step 6: Replace the JSX inside `<motion.div variants={panelVariants}>`**

Inside `FullscreenNavMenu`, keep the existing `useEffect` and top-level `<AnimatePresence>`/dialog wrapper. Replace the old header/body content inside the main `motion.div` with:

```tsx
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
                        About, pricing, and contact
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
```

- [ ] **Step 7: Update overlay background to include restrained purple**

In the top-level dialog wrapper, keep the grid background and add a purple/cyan wash by replacing the first decorative background div with:

```tsx
          <div
            className="pointer-events-none fixed inset-0 opacity-80"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(139, 92, 246, 0.16), transparent 28%), linear-gradient(300deg, rgba(6, 182, 212, 0.12), transparent 36%), linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
              backgroundSize: "auto, auto, 48px 48px, 48px 48px",
            }}
          />
```

- [ ] **Step 8: Add reduced-motion source marker**

Add this source comment immediately above `overlayVariants` so the regression test and future maintainers see the intended motion boundary:

```tsx
// Tailwind motion-safe utilities and Framer Motion durations keep this menu
// compatible with users who request reduced motion via prefers-reduced-motion.
```

- [ ] **Step 9: Run focused validation**

Run:

```bash
npx tsc --noEmit
node --test tests/manufacturing-pages.test.mjs
```

Expected: both pass.

- [ ] **Step 10: Commit component rewrite**

```bash
git add src/components/layout/FullscreenNavMenu.tsx tests/manufacturing-pages.test.mjs
git commit -m "Redesign fullscreen menu as sidebar mega menu"
```

---

### Task 4: Update SEO Audit For Sidebar Mega Menu

**Files:**
- Modify: `scripts/seo-audit.mjs`

- [ ] **Step 1: Replace fullscreen menu assertions**

In `scripts/seo-audit.mjs`, replace:

```js
assert(
  fullScreenMenu.includes("Industries / Manufacturing AI"),
  "Fullscreen menu must expose Industries navigation."
);
assert(
  navData.includes("MANUFACTURING_USE_CASE_NAV_ITEMS") &&
    navData.includes("MANUFACTURING_USE_CASE_NAV_DATA"),
  "Layout nav data must expose manufacturing use-case navigation."
);
```

with:

```js
assert(
  fullScreenMenu.includes("AI Services") &&
    fullScreenMenu.includes("Industries") &&
    fullScreenMenu.indexOf("AI Services") < fullScreenMenu.indexOf("Industries"),
  "Fullscreen menu must expose AI Services before Industries."
);
assert(
  fullScreenMenu.includes("Manufacturing AI child pages"),
  "Fullscreen menu must nest manufacturing use-case pages under the Manufacturing AI hub."
);
assert(
  fullScreenMenu.includes("Resources") &&
    fullScreenMenu.includes("Company") &&
    fullScreenMenu.includes("Contact Us") &&
    fullScreenMenu.includes("Insights") &&
    fullScreenMenu.includes("ITECS MSP"),
  "Fullscreen menu must expose resources, company, contact, insights, and ITECS MSP links."
);
assert(
  navData.includes("MANUFACTURING_USE_CASE_NAV_ITEMS") &&
    navData.includes("MANUFACTURING_USE_CASE_NAV_DATA") &&
    navData.includes("RESOURCE_NAV_ITEMS") &&
    navData.includes("COMPANY_NAV_ITEMS") &&
    navData.includes("MENU_CATEGORY_ITEMS"),
  "Layout nav data must expose manufacturing, resources, company, and category navigation."
);
```

- [ ] **Step 2: Run SEO audit**

Run:

```bash
npm run seo:audit
```

Expected: pass.

- [ ] **Step 3: Commit audit update**

```bash
git add scripts/seo-audit.mjs
git commit -m "Update SEO audit for sidebar mega menu"
```

---

### Task 5: Full Validation, Visual Audit, Deploy

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

- [ ] **Step 2: Start temporary local production server**

Use the Ubuntu server private IP:

```bash
npm run start -- -H 10.30.30.93 -p 3107
```

Expected: Next.js server reports `Ready` at `http://10.30.30.93:3107`.

- [ ] **Step 3: Run mobile Playwright smoke**

Use viewport `390x844` against:

```text
http://10.30.30.93:3107/manufacturing
```

Open the hamburger menu and evaluate:

```js
() => {
  const dialog = document.querySelector('[role="dialog"]');
  const text = dialog?.innerText || "";
  return {
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    hasDialog: Boolean(dialog),
    hasAIServices: text.includes("AI Services"),
    hasIndustries: text.includes("Industries"),
    aiBeforeIndustries: text.indexOf("AI Services") >= 0 && text.indexOf("AI Services") < text.indexOf("Industries"),
    hasManufacturingHub: text.includes("Manufacturing AI Hub"),
    hasChildPages: text.includes("Manufacturing AI child pages"),
    hasContactUs: text.includes("Contact Us"),
    hasInsights: text.includes("Insights"),
    hasItecsMsp: text.includes("ITECS MSP"),
    hasAllManufacturingRoutes: [
      "/manufacturing/ppv-agent",
      "/manufacturing/demand-forecasting-sop-ai",
      "/manufacturing/predictive-maintenance-ai",
      "/manufacturing/inventory-working-capital-ai",
      "/manufacturing/quality-traceability-ai",
      "/manufacturing/customer-sku-profitability-ai",
      "/manufacturing/production-scheduling-yield-ai",
      "/manufacturing/contract-pass-through-intelligence",
      "/manufacturing/energy-freight-scope-3-ai",
      "/manufacturing/vendor-payment-anomaly-ai",
    ].every((route) => Boolean(dialog?.querySelector(`a[href="${route}"]`))),
    activeLabel: document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent?.trim(),
    bodyOverflow: getComputedStyle(document.body).overflow,
  };
}
```

Expected:

- `documentWidth === width`
- `hasDialog === true`
- `hasAIServices === true`
- `hasIndustries === true`
- `aiBeforeIndustries === true`
- `hasManufacturingHub === true`
- `hasChildPages === true`
- `hasContactUs === true`
- `hasInsights === true`
- `hasItecsMsp === true`
- `hasAllManufacturingRoutes === true`
- `activeLabel === "Close site menu"`
- `bodyOverflow === "hidden"`

- [ ] **Step 4: Run desktop Playwright smoke**

Use viewport `1440x1000` against:

```text
http://10.30.30.93:3107/manufacturing/ppv-agent
```

Open the hamburger menu and validate:

- header has no visible `Solutions`, `Industries`, `Pricing`, `Insights`, or `About` root links
- sidebar rail exists
- AI Services appears before Industries
- Manufacturing AI Hub appears inside Industries
- manufacturing child links appear under the hub
- exact `aria-current="page"` appears only on `/manufacturing/ppv-agent`
- purple treatments render around Industries/Manufacturing
- no horizontal overflow

- [ ] **Step 5: Audit visual quality and tone**

Review screenshots from mobile and desktop and confirm:

- menu reads as an enterprise mega menu, not a manufacturing hero
- purple adds color without overpowering the palette
- copy is concise and executive-facing
- hover and entrance motion are polished and restrained
- no text overlaps or clipped labels are visible
- static pages and contact paths are easy to find

- [ ] **Step 6: Stop temporary local server**

Stop the local `next start` session with `Ctrl+C`.

- [ ] **Step 7: Commit any validation fixes**

If QA required fixes:

```bash
git add src/components/layout/FullscreenNavMenu.tsx src/components/layout/navData.ts tests/manufacturing-pages.test.mjs scripts/seo-audit.mjs
git commit -m "Polish sidebar mega menu"
```

If no fixes were required:

```bash
git status --short --branch
```

- [ ] **Step 8: Push branch**

```bash
git push
```

Expected: `manufacturing-spoke-expansion` pushes cleanly to origin.

- [ ] **Step 9: Deploy**

Run:

```bash
docker compose -p itecsai up -d --build --no-deps web
```

Expected:

- Docker build succeeds
- `itecsai-web-1` restarts and reports `Up`

- [ ] **Step 10: Live smoke**

Run:

```bash
curl -k -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://itecs.ai/manufacturing
curl -k -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://itecs.ai/manufacturing/ppv-agent
docker ps --filter name=itecsai-web-1 --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
```

Expected:

- both curl checks return `200`
- container status is `Up`

- [ ] **Step 11: GSC decision**

This redesign changes internal navigation presentation and source assertions only. It does not change URLs, metadata, canonical tags, robots directives, sitemap entries, or indexable page content. Do not run GSC submission unless implementation changes those surfaces during QA.

---

## Self-Review

- Spec coverage: Sidebar rail order, AI Services first, Industries second, Manufacturing AI Hub parent, child manufacturing links, Resources/Company/static links, purple color treatment, sleek motion, accessibility preservation, SEO checks, browser QA, push, and deploy are covered.
- Red-flag scan: No deferred work markers, placeholder tokens, incomplete commands, or unspecified file edits remain.
- Type consistency: `LayoutNavItem`, `MenuCategoryAccent`, `MenuCategoryItem`, `RESOURCE_NAV_ITEMS`, `COMPANY_NAV_ITEMS`, and `MENU_CATEGORY_ITEMS` are defined before `FullscreenNavMenu.tsx` consumes them.
- Scope control: Header shell, footer hierarchy, URLs, page metadata, sitemap, DNS, NGINX, secrets, and GSC submission remain unchanged unless validation exposes a defect.
