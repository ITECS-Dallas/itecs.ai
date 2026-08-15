#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright";

const GOOGLEBOT_SMARTPHONE =
  "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const NORMAL_BROWSER =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

function parseArguments(argv) {
  const options = {
    baseUrl: "https://itecs.ai",
    canonicalOrigin: "",
    output: "",
    checkExternal: false,
    profile: "mobile",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--base-url") options.baseUrl = argv[++index];
    else if (argument === "--canonical-origin") options.canonicalOrigin = argv[++index];
    else if (argument === "--output") options.output = argv[++index];
    else if (argument === "--check-external") options.checkExternal = true;
    else if (argument === "--profile") options.profile = argv[++index];
    else throw new Error(`Unknown argument: ${argument}`);
  }

  if (!options.output) throw new Error("--output is required");
  options.baseUrl = new URL(options.baseUrl).origin;
  options.canonicalOrigin = new URL(options.canonicalOrigin || options.baseUrl).origin;
  if (!["mobile", "desktop"].includes(options.profile)) {
    throw new Error("--profile must be mobile or desktop");
  }
  return options;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

export function parseSitemap(xml) {
  const entries = [];
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = match[1];
    const location = block.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];
    const lastModified = block.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1] ?? null;
    if (location) {
      entries.push({
        url: decodeXml(location.trim()),
        lastModified: lastModified ? decodeXml(lastModified.trim()) : null,
      });
    }
  }
  return entries;
}

function normalizePageUrl(value, baseUrl) {
  const url = new URL(value, baseUrl);
  url.hash = "";
  url.search = "";
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString();
}

function toCanonicalUrl(value, fetchOrigin, canonicalOrigin) {
  const parsed = new URL(value, canonicalOrigin);
  if (parsed.origin === fetchOrigin || parsed.origin === canonicalOrigin) {
    return normalizePageUrl(`${canonicalOrigin}${parsed.pathname}${parsed.search}`, canonicalOrigin);
  }
  return normalizePageUrl(parsed, canonicalOrigin);
}

function toFetchUrl(value, fetchOrigin, canonicalOrigin) {
  const parsed = new URL(value, canonicalOrigin);
  if (parsed.origin !== canonicalOrigin && parsed.origin !== fetchOrigin) return parsed.toString();
  return `${fetchOrigin}${parsed.pathname}${parsed.search}`;
}

export function inventoryForUrl(value) {
  const pathname = new URL(value).pathname;
  const appOwner = pathname === "/"
    ? "src/app/page.tsx"
    : `src/app${pathname}/page.tsx`;
  const sharedOwner = "src/lib/metadata.ts; src/lib/seo.ts";
  const common = {
    canonicalOwner: `${appOwner}; ${sharedOwner}`,
    sourceOwner: appOwner,
    intendedAudienceDecision: "Business and technology leaders deciding whether to engage ITECS",
    primaryConversion: "/contact",
    nearestCompetingRoute: "/services",
  };

  if (pathname === "/") {
    return { ...common, pageClass: "homepage", nearestCompetingRoute: "none" };
  }
  if (pathname === "/insights") {
    return {
      ...common,
      pageClass: "insights-hub",
      sourceOwner: `${appOwner}; src/lib/constants.ts#INSIGHTS`,
      intendedAudienceDecision: "Leaders selecting a current AI governance or operations topic",
      primaryConversion: "an Insights article, then /contact",
      nearestCompetingRoute: "none; canonical editorial hub",
    };
  }
  if (pathname.startsWith("/insights/")) {
    return {
      ...common,
      pageClass: "insights-article",
      sourceOwner: `${appOwner}; src/lib/constants.ts#INSIGHTS`,
      intendedAudienceDecision: "Business and technology leaders researching a governed AI response",
      primaryConversion: "relevant service CTA or /contact",
      nearestCompetingRoute: "/insights (hub; not a duplicate canonical)",
    };
  }
  if (pathname.startsWith("/case-studies/")) {
    return {
      ...common,
      pageClass: "case-study",
      canonicalOwner: `src/app/case-studies/[slug]/page.tsx; ${sharedOwner}`,
      sourceOwner: "src/app/case-studies/[slug]/page.tsx; src/lib/constants.ts",
      intendedAudienceDecision: "Buyers validating ITECS delivery evidence",
      nearestCompetingRoute: "/about",
    };
  }
  if (pathname === "/ai-optimized-seo") {
    return {
      ...common,
      pageClass: "ai-seo-hub",
      intendedAudienceDecision: "Marketing leaders evaluating AI-search readiness",
      nearestCompetingRoute: "/services",
    };
  }
  if (pathname.startsWith("/ai-optimized-seo/")) {
    return {
      ...common,
      pageClass: "ai-seo-package",
      intendedAudienceDecision: "Marketing leaders comparing an AI-SEO engagement tier",
      nearestCompetingRoute: "/ai-optimized-seo",
    };
  }
  if (pathname === "/manufacturing" || pathname === "/financial-services") {
    return {
      ...common,
      pageClass: "industry-hub",
      intendedAudienceDecision: "Industry leaders prioritizing governed AI use cases",
      nearestCompetingRoute: "/services",
    };
  }
  if (pathname.startsWith("/manufacturing/") || pathname.startsWith("/financial-services/")) {
    return {
      ...common,
      pageClass: "industry-solution",
      intendedAudienceDecision: "Industry operators evaluating a specific AI workflow",
      nearestCompetingRoute: pathname.startsWith("/manufacturing/")
        ? "/manufacturing"
        : "/financial-services",
    };
  }
  if (pathname === "/training") {
    return {
      ...common,
      pageClass: "training-hub",
      intendedAudienceDecision: "Leaders planning role-based AI enablement",
      nearestCompetingRoute: "/consulting",
    };
  }
  if (["/claude-cowork-training", "/chatgpt-codex-training", "/copilot-training"].includes(pathname)) {
    return {
      ...common,
      pageClass: "training-product",
      intendedAudienceDecision: "Leaders evaluating platform-specific team training",
      nearestCompetingRoute: "/training",
    };
  }
  if (pathname === "/services") {
    return {
      ...common,
      pageClass: "service-hub",
      intendedAudienceDecision: "Buyers selecting an ITECS AI service",
      nearestCompetingRoute: "/consulting",
    };
  }
  if (pathname.startsWith("/services/")) {
    return { ...common, pageClass: "service-program", nearestCompetingRoute: "/training" };
  }
  if (pathname === "/pricing") {
    return {
      ...common,
      pageClass: "pricing",
      intendedAudienceDecision: "Qualified buyers comparing engagement scope and price",
      nearestCompetingRoute: "/services",
    };
  }
  if (pathname === "/assessment") {
    return {
      ...common,
      pageClass: "conversion-assessment",
      intendedAudienceDecision: "Prospects completing an AI readiness intake",
      primaryConversion: "assessment form submission",
      nearestCompetingRoute: "/contact",
    };
  }
  if (pathname === "/contact") {
    return {
      ...common,
      pageClass: "conversion-contact",
      intendedAudienceDecision: "Prospects requesting an ITECS consultation",
      primaryConversion: "contact form submission",
      nearestCompetingRoute: "/assessment",
    };
  }
  if (pathname === "/about") {
    return {
      ...common,
      pageClass: "company",
      intendedAudienceDecision: "Buyers validating ITECS identity and experience",
      nearestCompetingRoute: "/contact",
    };
  }
  return { ...common, pageClass: "service-solution" };
}

function rawTextLength(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

function rawMetadata(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ??
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ??
    "";
  return { title, canonical };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 20_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRaw(url) {
  const started = performance.now();
  try {
    const redirectChain = [];
    let currentUrl = url;
    let response;
    for (let hop = 0; hop < 10; hop += 1) {
      response = await fetchWithTimeout(currentUrl, {
        redirect: "manual",
        headers: { "user-agent": NORMAL_BROWSER, accept: "text/html,application/xhtml+xml" },
      });
      const location = response.headers.get("location");
      if (response.status < 300 || response.status >= 400 || !location) break;
      const destination = new URL(location, currentUrl).toString();
      redirectChain.push({ status: response.status, url: currentUrl, destination });
      currentUrl = destination;
    }
    if (!response) throw new Error("No HTTP response received");
    const body = await response.text();
    return {
      status: response.status,
      finalUrl: currentUrl,
      redirectChain,
      contentType: response.headers.get("content-type") ?? "",
      robotsHeader: response.headers.get("x-robots-tag") ?? "",
      cacheControl: response.headers.get("cache-control") ?? "",
      headers: Object.fromEntries(response.headers),
      bytes: Buffer.byteLength(body),
      sha256: sha256(body),
      textLength: rawTextLength(body),
      metadata: rawMetadata(body),
      durationMs: Math.round(performance.now() - started),
      error: null,
    };
  } catch (error) {
    return {
      status: 0,
      finalUrl: url,
      redirectChain: [],
      contentType: "",
      robotsHeader: "",
      cacheControl: "",
      headers: {},
      bytes: 0,
      sha256: "",
      textLength: 0,
      metadata: { title: "", canonical: "" },
      durationMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function renderPage(context, url) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text().slice(0, 500));
  });
  page.on("pageerror", (error) => pageErrors.push(error.message.slice(0, 500)));

  const started = performance.now();
  let response;
  try {
    response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(100);

    const dom = await page.evaluate(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      };
      const text = (element) => element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const accessibleName = (element) => {
        const labelledBy = element.getAttribute("aria-labelledby");
        const labelledText = labelledBy
          ?.split(/\s+/)
          .map((id) => text(document.getElementById(id)))
          .filter(Boolean)
          .join(" ");
        return (
          element.getAttribute("aria-label") ??
          labelledText ??
          element.getAttribute("title") ??
          element.getAttribute("alt") ??
          element.querySelector("img[alt]")?.getAttribute("alt") ??
          text(element)
        ).trim();
      };
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (element, index) => {
          try {
            return { index, valid: true, value: JSON.parse(element.textContent ?? ""), error: null };
          } catch (error) {
            return {
              index,
              valid: false,
              value: null,
              error: error instanceof Error ? error.message : String(error),
            };
          }
        },
      );
      const links = [...document.querySelectorAll("a[href]")].map((element) => ({
        href: element.href,
        rawHref: element.getAttribute("href") ?? "",
        text: text(element).slice(0, 240),
        rel: element.getAttribute("rel") ?? "",
        visible: visible(element),
      }));
      const images = [...document.querySelectorAll("img")].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          src: element.currentSrc || element.src,
          alt: element.getAttribute("alt"),
          widthAttribute: element.getAttribute("width"),
          heightAttribute: element.getAttribute("height"),
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
          renderedWidth: Math.round(rect.width),
          renderedHeight: Math.round(rect.height),
          visible: visible(element),
        };
      });
      const smallTargets = [...document.querySelectorAll("a[href],button,input,select,textarea")]
        .filter(visible)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            name: accessibleName(element).slice(0, 120),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        })
        .filter((target) => target.width < 24 || target.height < 24)
        .slice(0, 30);
      const unnamedTargets = [...document.querySelectorAll("a[href],button,input,select,textarea")]
        .filter(visible)
        .filter((element) => {
          return !accessibleName(element);
        })
        .map((element) => element.outerHTML.slice(0, 300))
        .slice(0, 30);
      const indexableClone = document.body.cloneNode(true);
      indexableClone.querySelectorAll("script,style,noscript,template").forEach((element) => element.remove());
      const indexableText = indexableClone.textContent?.replace(/\s+/g, " ").trim() ?? "";

      return {
        title: document.title,
        description:
          document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
        viewport: document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "",
        language: document.documentElement.lang,
        h1: [...document.querySelectorAll("h1")].map(text),
        headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((element) => ({
          level: Number(element.tagName.slice(1)),
          text: text(element).slice(0, 300),
        })),
        bodyText: document.body.innerText.replace(/\s+/g, " ").trim(),
        bodyTextLength: document.body.innerText.replace(/\s+/g, " ").trim().length,
        indexableText,
        indexableTextLength: indexableText.length,
        jsonLd,
        links,
        images,
        missingAltCount: images.filter((image) => image.alt === null).length,
        emptyAltCount: images.filter((image) => image.alt === "").length,
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        smallTargets,
        unnamedTargets,
      };
    });

    const timing = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      if (!navigation) return null;
      return {
        domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
        loadMs: Math.round(navigation.loadEventEnd),
        transferSize: navigation.transferSize,
        encodedBodySize: navigation.encodedBodySize,
        decodedBodySize: navigation.decodedBodySize,
      };
    });

    const redirectChain = [];
    let redirectedRequest = response?.request();
    while (redirectedRequest?.redirectedFrom()) {
      const previousRequest = redirectedRequest.redirectedFrom();
      redirectChain.unshift({ from: previousRequest.url(), to: redirectedRequest.url() });
      redirectedRequest = previousRequest;
    }

    return {
      status: response?.status() ?? 0,
      finalUrl: page.url(),
      redirectChain,
      responseHeaders: response ? await response.allHeaders() : {},
      durationMs: Math.round(performance.now() - started),
      timing,
      dom,
      consoleErrors,
      pageErrors,
      error: null,
    };
  } catch (error) {
    return {
      status: response?.status() ?? 0,
      finalUrl: page.url(),
      redirectChain: [],
      responseHeaders: response ? await response.allHeaders().catch(() => ({})) : {},
      durationMs: Math.round(performance.now() - started),
      timing: null,
      dom: null,
      consoleErrors,
      pageErrors,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await page.close();
  }
}

async function mapWithConcurrency(values, concurrency, operation) {
  const results = new Array(values.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await operation(values[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}

async function checkLink({ url, requestUrl }) {
  const started = performance.now();
  try {
    let response = await fetchWithTimeout(
      requestUrl,
      { method: "HEAD", redirect: "follow", headers: { "user-agent": NORMAL_BROWSER } },
      10_000,
    );
    if (response.status >= 400) {
      response = await fetchWithTimeout(
        requestUrl,
        { method: "GET", redirect: "follow", headers: { "user-agent": NORMAL_BROWSER } },
        10_000,
      );
      await response.body?.cancel();
    }
    const reportedUrl = new URL(url);
    const requestedUrl = new URL(requestUrl);
    const finalUrl = new URL(response.url);
    if (requestedUrl.origin !== reportedUrl.origin && finalUrl.origin === requestedUrl.origin) {
      finalUrl.protocol = reportedUrl.protocol;
      finalUrl.hostname = reportedUrl.hostname;
      finalUrl.port = reportedUrl.port;
    }
    return {
      url,
      requestUrl,
      status: response.status,
      finalUrl: finalUrl.toString(),
      durationMs: Math.round(performance.now() - started),
      error: null,
    };
  } catch (error) {
    return {
      url,
      requestUrl,
      status: 0,
      finalUrl: url,
      durationMs: Math.round(performance.now() - started),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function duplicateGroups(pages, selector) {
  const groups = new Map();
  for (const page of pages) {
    const value = selector(page)?.trim();
    if (!value) continue;
    const members = groups.get(value) ?? [];
    members.push(page.url);
    groups.set(value, members);
  }
  return [...groups.entries()]
    .filter(([, members]) => members.length > 1)
    .map(([value, members]) => ({ value, urls: members }));
}

function buildGraph(pages, sitemapUrls, fetchOrigin, canonicalOrigin) {
  const sitemapSet = new Set(sitemapUrls);
  const inbound = Object.fromEntries(sitemapUrls.map((url) => [url, 0]));
  const adjacency = Object.fromEntries(sitemapUrls.map((url) => [url, []]));
  const discovered = new Set();
  const selfLinks = [];

  for (const page of pages) {
    const source = normalizePageUrl(page.url, canonicalOrigin);
    const destinations = new Set();
    for (const link of page.rendered.dom?.links ?? []) {
      let destination;
      try {
        const parsed = new URL(link.href);
        if (![fetchOrigin, canonicalOrigin].includes(parsed.origin) || !["http:", "https:"].includes(parsed.protocol)) continue;
        destination = toCanonicalUrl(parsed, fetchOrigin, canonicalOrigin);
      } catch {
        continue;
      }
      discovered.add(destination);
      if (destination === source) selfLinks.push({ source, text: link.text, href: link.href });
      if (sitemapSet.has(destination)) destinations.add(destination);
    }
    adjacency[source] = [...destinations];
    for (const destination of destinations) inbound[destination] += 1;
  }

  const depth = { [`${canonicalOrigin}/`]: 0 };
  const queue = [`${canonicalOrigin}/`];
  while (queue.length > 0) {
    const source = queue.shift();
    for (const destination of adjacency[source] ?? []) {
      if (depth[destination] !== undefined) continue;
      depth[destination] = depth[source] + 1;
      queue.push(destination);
    }
  }

  return {
    inbound,
    depth,
    orphans: sitemapUrls.filter((url) => url !== `${canonicalOrigin}/` && inbound[url] === 0),
    unreachableFromHome: sitemapUrls.filter((url) => depth[url] === undefined),
    selfLinks,
    discoveredSameOrigin: [...discovered].sort(),
    discoveredNotInSitemap: [...discovered].filter((url) => !sitemapSet.has(url)).sort(),
  };
}

function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== "object") return [];
  const nodes = value["@type"] ? [value] : [];
  return nodes.concat(Object.values(value).flatMap(schemaNodes));
}

function normalizedText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function digits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function schemaParity(page) {
  const dom = page.rendered.dom;
  if (!dom) return { checkedNodeCount: 0, violations: [] };
  const body = normalizedText(dom.indexableText);
  const nodes = dom.jsonLd.flatMap((block) => (block.valid ? schemaNodes(block.value) : []));
  const violations = [];

  for (const node of nodes) {
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    if (types.some((type) => ["Organization", "LocalBusiness", "Service", "Offer", "BlogPosting"].includes(type)) && !node["@id"]) {
      violations.push({ type: "missing-stable-id", schemaType: types.join(",") });
    }
    if (types.includes("BlogPosting")) {
      if (normalizedText(node.headline) !== normalizedText(dom.h1[0])) {
        violations.push({ type: "article-headline-parity", schemaValue: node.headline, visibleValue: dom.h1[0] });
      }
      if (normalizedText(node.description) !== normalizedText(dom.description)) {
        violations.push({ type: "article-description-parity" });
      }
      if (node.author?.name && !body.includes(normalizedText(node.author.name))) {
        violations.push({ type: "article-author-parity", schemaValue: node.author.name });
      }
    }
    if (types.includes("FAQPage")) {
      for (const question of node.mainEntity ?? []) {
        if (question.name && !body.includes(normalizedText(question.name))) {
          violations.push({ type: "faq-question-parity", schemaValue: question.name });
        }
        const answer = question.acceptedAnswer?.text;
        if (answer && !body.includes(normalizedText(answer))) {
          violations.push({ type: "faq-answer-parity", schemaValue: question.name });
        }
      }
    }
    if (types.includes("BreadcrumbList")) {
      for (const item of node.itemListElement ?? []) {
        if (item.name && !body.includes(normalizedText(item.name))) {
          violations.push({ type: "breadcrumb-parity", schemaValue: item.name });
        }
      }
    }
    if (types.includes("Offer") && node.price !== undefined) {
      const priceDigits = digits(node.price);
      if (priceDigits && !digits(dom.indexableText).includes(priceDigits)) {
        violations.push({ type: "offer-price-parity", schemaValue: node.price });
      }
    }
  }

  return { checkedNodeCount: nodes.length, violations };
}

function collectIssues(pages, graph, linkChecks, canonicalOrigin) {
  const issues = [];
  for (const page of pages) {
    const expected = normalizePageUrl(page.url, canonicalOrigin);
    const dom = page.rendered.dom;
    if (page.raw.status !== 200) issues.push({ severity: "critical", type: "raw-status", url: page.url, evidence: page.raw.status });
    if (page.rendered.status !== 200) issues.push({ severity: "critical", type: "render-status", url: page.url, evidence: page.rendered.status });
    if (dom && normalizePageUrl(dom.canonical || page.url, canonicalOrigin) !== expected) issues.push({ severity: "high", type: "canonical-mismatch", url: page.url, evidence: dom.canonical });
    if (!dom?.title) issues.push({ severity: "high", type: "missing-title", url: page.url });
    if (!dom?.description) issues.push({ severity: "medium", type: "missing-description", url: page.url });
    if (dom?.h1.length !== 1) issues.push({ severity: "medium", type: "h1-count", url: page.url, evidence: dom?.h1.length ?? 0 });
    if (!dom?.language) issues.push({ severity: "medium", type: "missing-language", url: page.url });
    if (!dom?.viewport) issues.push({ severity: "high", type: "missing-viewport", url: page.url });
    if (dom?.horizontalOverflow) issues.push({ severity: "high", type: "horizontal-overflow", url: page.url, evidence: `${dom.documentWidth}/${dom.viewportWidth}` });
    if (dom?.jsonLd.some((block) => !block.valid)) issues.push({ severity: "high", type: "invalid-json-ld", url: page.url });
    for (const violation of page.schemaParity.violations) {
      const severity = violation.type === "missing-stable-id" ? "medium" : "high";
      issues.push({ severity, type: `schema-${violation.type}`, url: page.url, evidence: violation });
    }
    if (page.rendered.error) issues.push({ severity: "critical", type: "render-error", url: page.url, evidence: page.rendered.error });
  }
  for (const url of graph.orphans) issues.push({ severity: "medium", type: "orphan", url });
  for (const url of graph.unreachableFromHome) issues.push({ severity: "medium", type: "unreachable-from-home", url });
  for (const check of linkChecks) {
    if (check.status === 0 || check.status >= 500 || check.status === 404 || check.status === 410) {
      issues.push({ severity: "high", type: "broken-link", url: check.url, evidence: check.status || check.error });
    }
  }
  return issues;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const startedAt = new Date().toISOString();
  const sitemapUrl = `${options.baseUrl}/sitemap.xml`;
  const [sitemapResponseOne, sitemapResponseTwo] = await Promise.all([
    fetchWithTimeout(sitemapUrl, { headers: { "user-agent": NORMAL_BROWSER } }),
    fetchWithTimeout(sitemapUrl, { headers: { "user-agent": NORMAL_BROWSER } }),
  ]);
  const [sitemapXmlOne, sitemapXmlTwo] = await Promise.all([
    sitemapResponseOne.text(),
    sitemapResponseTwo.text(),
  ]);
  const sitemapEntries = parseSitemap(sitemapXmlOne);
  const sitemapUrls = sitemapEntries.map((entry) => normalizePageUrl(entry.url, options.canonicalOrigin));
  const privateSitemapUrls = sitemapUrls.filter((url) => new URL(url).pathname.startsWith("/p/") || new URL(url).pathname.startsWith("/api/"));
  const renderProfile = options.profile === "mobile"
    ? {
        viewport: { width: 412, height: 915 },
        deviceScaleFactor: 2.625,
        isMobile: true,
        hasTouch: true,
        userAgent: GOOGLEBOT_SMARTPHONE,
      }
    : {
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        userAgent: NORMAL_BROWSER,
      };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...renderProfile,
    reducedMotion: "reduce",
  });

  const pages = await mapWithConcurrency(sitemapUrls, 4, async (url) => {
    const fetchUrl = toFetchUrl(url, options.baseUrl, options.canonicalOrigin);
    const page = {
      url,
      fetchUrl,
      inventory: inventoryForUrl(url),
      raw: await fetchRaw(fetchUrl),
      rendered: await renderPage(context, fetchUrl),
    };
    return { ...page, schemaParity: schemaParity(page) };
  });
  await context.close();
  await browser.close();

  const graph = buildGraph(pages, sitemapUrls, options.baseUrl, options.canonicalOrigin);
  const allHttpLinks = new Map();
  for (const page of pages) {
    for (const link of page.rendered.dom?.links ?? []) {
      try {
        const parsed = new URL(link.href);
        if (!["http:", "https:"].includes(parsed.protocol)) continue;
        const isInternal = [options.baseUrl, options.canonicalOrigin].includes(parsed.origin);
        if (!options.checkExternal && !isInternal) continue;
        parsed.hash = "";
        const url = isInternal
          ? toCanonicalUrl(parsed, options.baseUrl, options.canonicalOrigin)
          : parsed.toString();
        const requestUrl = isInternal
          ? toFetchUrl(parsed, options.baseUrl, options.canonicalOrigin)
          : parsed.toString();
        allHttpLinks.set(`${url}\n${requestUrl}`, { url, requestUrl });
      } catch {
        // Invalid links are reported through the DOM record rather than fetched.
      }
    }
  }
  const linkChecks = await mapWithConcurrency(
    [...allHttpLinks.values()].sort((left, right) => left.url.localeCompare(right.url)),
    12,
    checkLink,
  );
  const duplicateTitles = duplicateGroups(pages, (page) => page.rendered.dom?.title);
  const duplicateDescriptions = duplicateGroups(pages, (page) => page.rendered.dom?.description);
  const issues = collectIssues(pages, graph, linkChecks, options.canonicalOrigin);

  const report = {
    version: 1,
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl: options.baseUrl,
    canonicalOrigin: options.canonicalOrigin,
    profile: options.profile,
    userAgents: { normal: NORMAL_BROWSER, rendered: renderProfile.userAgent },
    viewport: renderProfile,
    sitemap: {
      url: sitemapUrl,
      status: sitemapResponseOne.status,
      contentType: sitemapResponseOne.headers.get("content-type") ?? "",
      bytes: Buffer.byteLength(sitemapXmlOne),
      sha256: sha256(sitemapXmlOne),
      secondSha256: sha256(sitemapXmlTwo),
      byteStableAcrossFetches: sitemapXmlOne === sitemapXmlTwo,
      entries: sitemapEntries,
      privateUrls: privateSitemapUrls,
    },
    summary: {
      sitemapUrlCount: sitemapUrls.length,
      pageCount: pages.length,
      insightsCount: sitemapUrls.filter((url) => new URL(url).pathname.startsWith("/insights/")).length,
      renderedCount: pages.filter((page) => page.rendered.dom).length,
      invalidJsonLdPageCount: pages.filter((page) => page.rendered.dom?.jsonLd.some((block) => !block.valid)).length,
      schemaParityViolationPageCount: pages.filter((page) => page.schemaParity.violations.length > 0).length,
      overflowPageCount: pages.filter((page) => page.rendered.dom?.horizontalOverflow).length,
      orphanCount: graph.orphans.length,
      unreachableFromHomeCount: graph.unreachableFromHome.length,
      duplicateTitleGroupCount: duplicateTitles.length,
      duplicateDescriptionGroupCount: duplicateDescriptions.length,
      checkedLinkCount: linkChecks.length,
      redirectedLinkCount: linkChecks.filter((check) => check.finalUrl !== check.url).length,
      issueCount: issues.length,
      inventoryByClass: Object.fromEntries(
        Object.entries(Object.groupBy(pages, (page) => page.inventory.pageClass)).map(
          ([pageClass, members]) => [pageClass, members.length],
        ),
      ),
      issuesBySeverity: Object.fromEntries(
        Object.entries(Object.groupBy(issues, (issue) => issue.severity)).map(
          ([severity, members]) => [severity, members.length],
        ),
      ),
    },
    duplicateTitles,
    duplicateDescriptions,
    graph,
    linkChecks,
    issues,
    pages,
  };

  await mkdir(dirname(options.output), { recursive: true });
  await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
  console.log(JSON.stringify(report.summary, null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
