#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { chromium } from "playwright";

function parseArguments(argv) {
  const options = { baseUrl: "http://127.0.0.1:3000", output: "", screenshots: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--base-url") options.baseUrl = argv[++index];
    else if (argument === "--output") options.output = argv[++index];
    else if (argument === "--screenshots") options.screenshots = argv[++index];
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!options.output) throw new Error("--output is required");
  options.baseUrl = new URL(options.baseUrl).origin;
  return options;
}

const routes = [
  { id: "home", path: "/", expectedLink: "/contact", screenshot: true },
  { id: "services", path: "/services", expectedLink: "/consulting", screenshot: true },
  { id: "consulting", path: "/consulting", expectedLink: "/contact" },
  { id: "ai-seo", path: "/ai-optimized-seo", expectedLink: "/contact", screenshot: true },
  { id: "ai-seo-package", path: "/ai-optimized-seo/foundation", expectedLink: "/contact" },
  { id: "manufacturing", path: "/manufacturing", expectedLink: "/manufacturing/ppv-agent", screenshot: true },
  { id: "manufacturing-solution", path: "/manufacturing/ppv-agent", expectedLink: "/contact" },
  { id: "financial-services", path: "/financial-services", expectedLink: "/financial-services/field-examination-analyzer" },
  { id: "financial-solution", path: "/financial-services/cash-flow-model-builder", expectedLink: "/contact" },
  { id: "training", path: "/training", expectedLink: "/chatgpt-codex-training", screenshot: true },
  { id: "training-product", path: "/chatgpt-codex-training", expectedLink: "/contact" },
  { id: "insights", path: "/insights", expectedLink: "/insights/ai-adoption-gap-assistants-to-agents", screenshot: true },
  { id: "insight-article", path: "/insights/ai-adoption-gap-assistants-to-agents", expectedLink: "/contact", screenshot: true },
  { id: "case-study", path: "/case-studies/pegasus-foods-zero-downtime-relocation", expectedLink: "/contact" },
  { id: "managed-intelligence", path: "/managed-intelligence-provider", expectedLink: "/contact" },
  { id: "pricing", path: "/pricing", expectedLink: "/contact" },
  { id: "about", path: "/about", expectedLink: "/contact" },
  { id: "assessment", path: "/assessment", form: true, multiStep: true },
  { id: "contact", path: "/contact", form: true, screenshot: true },
];

const profiles = [
  {
    id: "mobile",
    context: { viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true },
  },
  {
    id: "desktop",
    context: { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  },
];

async function inspectRoute(context, profile, route, options) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 500));
  });
  page.on("pageerror", (error) => pageErrors.push(error.message.slice(0, 500)));
  const response = await page.goto(`${options.baseUrl}${route.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  await page.waitForTimeout(150);

  const common = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const vitals = window.__sitewideAuditVitals ?? {};
    return {
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      h1Count: document.querySelectorAll("h1").length,
      language: document.documentElement.lang,
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      transferSize: navigation?.transferSize ?? 0,
      encodedBodySize: navigation?.encodedBodySize ?? 0,
      domContentLoadedMs: Math.round(navigation?.domContentLoadedEventEnd ?? 0),
      loadMs: Math.round(navigation?.loadEventEnd ?? 0),
      largestContentfulPaintMs: Math.round(vitals.lcp ?? 0),
      cumulativeLayoutShift: Number((vitals.cls ?? 0).toFixed(4)),
    };
  });

  const checks = {
    status200: response?.status() === 200,
    titlePresent: Boolean(common.title),
    canonicalMatches: common.canonical === `https://itecs.ai${route.path}`,
    oneH1: common.h1Count === 1,
    languagePresent: Boolean(common.language),
    noHorizontalOverflow: !common.horizontalOverflow,
    noPageErrors: pageErrors.length === 0,
  };

  if (route.expectedLink) {
    checks.expectedLinkPresent = (await page.locator(`a[href="${route.expectedLink}"]`).count()) > 0;
  }
  if (route.form) {
    checks.formPresent = (await page.locator("form").count()) > 0;
    checks.labeledControlPresent = (await page.locator("form input, form textarea, form select").count()) > 0;
    if (route.multiStep) {
      checks.progressControlPresent = (await page.getByRole("button", { name: "Continue" }).count()) > 0;
    } else {
      checks.submitControlPresent = (await page.locator('form button[type="submit"], form input[type="submit"]').count()) > 0;
    }
  }

  if (route.id === "home") {
    if (profile.id === "desktop") {
      await page.locator('[aria-controls="solutions-mega-menu"]').hover();
      await page.locator("#solutions-mega-menu").waitFor({ state: "visible", timeout: 3_000 }).catch(() => {});
      checks.navigationDrawerOpens = await page.locator("#solutions-mega-menu").isVisible();
      checks.navigationRoutePresent = await page.locator('#solutions-mega-menu a[href="/consulting"]').isVisible();
    } else {
      await page.locator('button[aria-label="Open menu"]').click();
      await page.getByRole("dialog", { name: "Site navigation" }).waitFor({ state: "visible", timeout: 3_000 }).catch(() => {});
      checks.navigationDrawerOpens = await page.getByRole("dialog", { name: "Site navigation" }).isVisible();
      checks.navigationRoutePresent = await page.locator('#mobile-solutions a[href="/consulting"]').isVisible();
    }
  }

  let screenshot = null;
  if (options.screenshots && route.screenshot) {
    screenshot = join(options.screenshots, `${profile.id}-${route.id}.png`);
    await page.screenshot({ path: screenshot, fullPage: false });
  }

  await page.close();
  return {
    profile: profile.id,
    id: route.id,
    path: route.path,
    checks,
    passed: Object.values(checks).every(Boolean),
    diagnostics: common,
    consoleErrors,
    pageErrors,
    screenshot,
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.screenshots) await mkdir(options.screenshots, { recursive: true, mode: 0o700 });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const profile of profiles) {
      const context = await browser.newContext({ ...profile.context, reducedMotion: "reduce" });
      await context.addInitScript(() => {
        window.__sitewideAuditVitals = { cls: 0, lcp: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__sitewideAuditVitals.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__sitewideAuditVitals.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      for (const route of routes) results.push(await inspectRoute(context, profile, route, options));
      await context.close();
    }
  } finally {
    await browser.close();
  }

  const report = {
    version: 1,
    baseUrl: options.baseUrl,
    createdAt: new Date().toISOString(),
    routeCount: routes.length,
    profileCount: profiles.length,
    checkCount: results.reduce((count, result) => count + Object.keys(result.checks).length, 0),
    passed: results.every((result) => result.passed),
    failedJourneys: results.filter((result) => !result.passed).map((result) => ({
      profile: result.profile,
      id: result.id,
      failedChecks: Object.entries(result.checks).filter(([, passed]) => !passed).map(([name]) => name),
    })),
    results,
  };
  await mkdir(dirname(options.output), { recursive: true });
  await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
  console.log(JSON.stringify({
    routeCount: report.routeCount,
    profileCount: report.profileCount,
    checkCount: report.checkCount,
    passed: report.passed,
    failedJourneys: report.failedJourneys,
  }, null, 2));
  if (!report.passed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
