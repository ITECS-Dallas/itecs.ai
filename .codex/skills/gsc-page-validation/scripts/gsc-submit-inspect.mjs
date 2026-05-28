#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_SITEMAP_URL = "https://itecs.ai/sitemap.xml";
const DEFAULT_REPORT_PREFIX = "/tmp/gsc-page-validation";

function usage() {
  console.log(`Usage:
  node .codex/skills/gsc-page-validation/scripts/gsc-submit-inspect.mjs [options] <url...>

Options:
  --env <path>       Env file path. Default: .env
  --site <siteUrl>   GSC property. Default: GSC_SITE_URL
  --sitemap <url>    Sitemap URL. Default: ${DEFAULT_SITEMAP_URL}
  --output <path>    Full JSON report output path.
  --no-submit        Skip sitemap submission.
  --help             Show this help.
`);
}

function parseArgs(argv) {
  const options = {
    envPath: ".env",
    siteUrl: null,
    sitemapUrl: DEFAULT_SITEMAP_URL,
    outputPath: null,
    submitSitemap: true,
    urls: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    if (arg === "--env") {
      options.envPath = argv[++index];
      continue;
    }
    if (arg === "--site") {
      options.siteUrl = argv[++index];
      continue;
    }
    if (arg === "--sitemap") {
      options.sitemapUrl = argv[++index];
      continue;
    }
    if (arg === "--output") {
      options.outputPath = argv[++index];
      continue;
    }
    if (arg === "--no-submit") {
      options.submitSitemap = false;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    options.urls.push(arg);
  }

  options.urls = [...new Set(options.urls)];
  if (options.urls.length === 0) {
    throw new Error("Provide at least one URL to inspect.");
  }
  return options;
}

function loadEnv(envPath) {
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;
    const key = trimmed.slice(0, equalsIndex);
    let value = trimmed.slice(equalsIndex + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function daysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

async function jsonFetch(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { raw: text };
    }
  }
  return { status: response.status, ok: response.ok, body };
}

async function getAccessToken(credentialsPath) {
  if (!credentialsPath) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set.");
  }
  if (!fs.existsSync(credentialsPath)) {
    throw new Error(`GOOGLE_APPLICATION_CREDENTIALS path does not exist: ${credentialsPath}`);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error("Service account JSON must include client_email and private_key.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), serviceAccount.private_key);
  const assertion = `${unsigned}.${signature
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")}`;

  const token = await jsonFetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!token.ok) {
    throw new Error(`Token request failed ${token.status}: ${token.body?.error || "unknown"}`);
  }
  return token.body.access_token;
}

async function gscFetch(token, url, options = {}) {
  return jsonFetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      authorization: `Bearer ${token}`,
    },
  });
}

function summarizeInspection(response) {
  const inspection = response.body?.inspectionResult || {};
  const index = inspection.indexStatusResult || {};
  const mobile = inspection.mobileUsabilityResult || {};
  const rich = inspection.richResultsResult || {};
  const amp = inspection.ampResult || {};

  return {
    status: response.status,
    ok: response.ok,
    verdict: index.verdict || null,
    coverageState: index.coverageState || null,
    robotsTxtState: index.robotsTxtState || null,
    indexingState: index.indexingState || null,
    pageFetchState: index.pageFetchState || null,
    crawledAs: index.crawledAs || null,
    lastCrawlTime: index.lastCrawlTime || null,
    userCanonical: index.userCanonical || null,
    googleCanonical: index.googleCanonical || null,
    sitemapCount: Array.isArray(index.sitemap) ? index.sitemap.length : 0,
    referringUrlCount: Array.isArray(index.referringUrls) ? index.referringUrls.length : 0,
    mobileVerdict: mobile.verdict || null,
    richResultsVerdict: rich.verdict || null,
    detectedRichResultTypes: Array.isArray(rich.detectedItems)
      ? rich.detectedItems.map((item) => item.richResultType).filter(Boolean)
      : [],
    ampVerdict: amp.verdict || null,
    inspectionResultLink: inspection.inspectionResultLink || null,
    error: response.ok ? null : response.body?.error || response.body,
  };
}

async function livePageCheck(url, sitemapText) {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
  });
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || null;
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || null;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || null;

  return {
    status: response.status,
    redirected: response.status >= 300 && response.status < 400,
    location: response.headers.get("location"),
    canonical,
    canonicalMatches: canonical === url,
    robots,
    indexFollow: robots === "index, follow",
    title,
    jsonLdCount: [...html.matchAll(/application\/ld\+json/g)].length,
    inSitemap: sitemapText.includes(`<loc>${url}</loc>`),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const env = { ...process.env, ...loadEnv(options.envPath) };
  const siteUrl = options.siteUrl || env.GSC_SITE_URL;
  if (!siteUrl) throw new Error("GSC_SITE_URL is not set.");

  const token = await getAccessToken(env.GOOGLE_APPLICATION_CREDENTIALS);
  const base = "https://www.googleapis.com/webmasters/v3";
  const report = {
    timestamp: new Date().toISOString(),
    siteUrl,
    sitemapUrl: options.sitemapUrl,
    urls: options.urls,
    checks: {},
  };

  const sites = await gscFetch(token, `${base}/sites`);
  report.checks.sitesList = {
    status: sites.status,
    ok: sites.ok,
    sites: (sites.body?.siteEntry || []).map((site) => ({
      siteUrl: site.siteUrl,
      permissionLevel: site.permissionLevel,
    })),
    error: sites.body?.error || null,
  };

  const siteGet = await gscFetch(token, `${base}/sites/${encodeURIComponent(siteUrl)}`);
  report.checks.siteGet = {
    status: siteGet.status,
    ok: siteGet.ok,
    permissionLevel: siteGet.body?.permissionLevel || null,
    error: siteGet.body?.error || null,
  };

  if (options.submitSitemap) {
    const sitemapSubmit = await gscFetch(
      token,
      `${base}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(options.sitemapUrl)}`,
      { method: "PUT" }
    );
    report.checks.sitemapSubmit = {
      status: sitemapSubmit.status,
      ok: sitemapSubmit.ok,
      error: sitemapSubmit.body?.error || null,
    };
  }

  const sitemapGet = await gscFetch(
    token,
    `${base}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(options.sitemapUrl)}`
  );
  report.checks.sitemapGet = {
    status: sitemapGet.status,
    ok: sitemapGet.ok,
    path: sitemapGet.body?.path,
    lastSubmitted: sitemapGet.body?.lastSubmitted,
    lastDownloaded: sitemapGet.body?.lastDownloaded,
    isPending: sitemapGet.body?.isPending,
    isSitemapsIndex: sitemapGet.body?.isSitemapsIndex,
    warnings: sitemapGet.body?.warnings,
    errors: sitemapGet.body?.errors,
    contents: sitemapGet.body?.contents,
    error: sitemapGet.body?.error || null,
  };

  const sitemapList = await gscFetch(token, `${base}/sites/${encodeURIComponent(siteUrl)}/sitemaps`);
  report.checks.sitemapList = {
    status: sitemapList.status,
    ok: sitemapList.ok,
    count: sitemapList.body?.sitemap?.length || 0,
    error: sitemapList.body?.error || null,
  };

  const analyticsRows = [];
  for (const url of options.urls) {
    const searchAnalytics = await gscFetch(
      token,
      `${base}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          startDate: daysAgo(90),
          endDate: daysAgo(2),
          dimensions: ["page"],
          dimensionFilterGroups: [
            {
              filters: [
                {
                  dimension: "page",
                  operator: "equals",
                  expression: url,
                },
              ],
            },
          ],
          rowLimit: 1,
        }),
      }
    );
    analyticsRows.push({
      url,
      status: searchAnalytics.status,
      ok: searchAnalytics.ok,
      row: searchAnalytics.body?.rows?.[0] || null,
      error: searchAnalytics.body?.error || null,
    });
  }
  report.checks.searchAnalytics90d = {
    ok: analyticsRows.every((row) => row.ok),
    rowCount: analyticsRows.filter((row) => row.row).length,
    totals: analyticsRows.reduce(
      (acc, row) => {
        acc.clicks += row.row?.clicks || 0;
        acc.impressions += row.row?.impressions || 0;
        return acc;
      },
      { clicks: 0, impressions: 0 }
    ),
    rows: analyticsRows.map((entry) => ({
      page: entry.url,
      status: entry.status,
      ok: entry.ok,
      clicks: entry.row?.clicks || 0,
      impressions: entry.row?.impressions || 0,
      ctr: entry.row?.ctr || 0,
      position: entry.row?.position || 0,
      error: entry.error,
    })),
  };

  const robotsResponse = await fetch("https://itecs.ai/robots.txt", {
    headers: { "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
  });
  const robotsText = await robotsResponse.text();
  const sitemapResponse = await fetch(options.sitemapUrl, {
    headers: { "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
  });
  const sitemapText = await sitemapResponse.text();
  report.checks.live = {
    robots: {
      status: robotsResponse.status,
      hasSitemap: robotsText.includes("Sitemap:"),
      blocksTargetPaths: options.urls.some((url) => {
        const pathname = new URL(url).pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`Disallow:\\s*${pathname}\\b`, "i").test(robotsText);
      }),
    },
    sitemap: {
      status: sitemapResponse.status,
      targetUrlCount: options.urls.filter((url) => sitemapText.includes(`<loc>${url}</loc>`)).length,
      expectedUrlCount: options.urls.length,
    },
    pages: {},
  };

  for (const url of options.urls) {
    const inspection = await gscFetch(
      token,
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ inspectionUrl: url, siteUrl, languageCode: "en-US" }),
      }
    );
    report.checks[url] = {
      urlInspection: summarizeInspection(inspection),
      live: await livePageCheck(url, sitemapText),
    };
  }

  const outputPath =
    options.outputPath ||
    `${DEFAULT_REPORT_PREFIX}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  const summary = {
    reportPath: outputPath,
    siteGet: report.checks.siteGet,
    sitemapSubmit: report.checks.sitemapSubmit || { skipped: true },
    sitemapGet: report.checks.sitemapGet,
    searchAnalytics90d: {
      ok: report.checks.searchAnalytics90d.ok,
      rowCount: report.checks.searchAnalytics90d.rowCount,
      totals: report.checks.searchAnalytics90d.totals,
    },
    live: report.checks.live,
    urls: options.urls.map((url) => ({
      url,
      gsc: report.checks[url].urlInspection,
      live: report.checks[url].live,
    })),
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ error: error.message }, null, 2));
  process.exit(1);
});
