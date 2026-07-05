#!/usr/bin/env node
/**
 * ITECS SEO audit — pulls Search Console + GA4 data and writes a JSON report.
 *
 * Usage:  node scripts/seo/audit.mjs [--no-inspect]
 *
 * Credentials: service account key at /home/itecs/.google-seo/itecs-seo-bot.json
 * (itecs-seo-bot@itecs-ai.iam.gserviceaccount.com — Full user on GSC domain
 * property sc-domain:itecs.ai, Viewer on GA4 property 333719828).
 *
 * Output: /home/itecs/.google-seo/reports/audit-<date>.json plus a stdout summary.
 * --no-inspect skips the per-URL index-coverage inspection (slow, quota 2000/day).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createSign } from "node:crypto";

const KEY_PATH = "/home/itecs/.google-seo/itecs-seo-bot.json";
const REPORT_DIR = "/home/itecs/.google-seo/reports";
const GSC_SITE = "sc-domain:itecs.ai";
const GA4_PROPERTY = "333719828";
const SITEMAP_URL = "https://itecs.ai/sitemap.xml";
const INSPECT = !process.argv.includes("--no-inspect");

const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");

async function getToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const claims = b64url({
    iss: key.client_email,
    scope:
      "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
    aud: key.token_uri,
    iat: now,
    exp: now + 3600,
  });
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const sig = signer.sign(key.private_key).toString("base64url");
  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${sig}`,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`token: ${JSON.stringify(data)}`);
  return data.access_token;
}

let token;
async function api(url, body, method) {
  const res = await fetch(url, {
    method: method ?? (body ? "POST" : "GET"),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${url} -> ${res.status}: ${JSON.stringify(data).slice(0, 500)}`);
  return data;
}

const day = (offset) => new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);

async function gscQuery(startDate, endDate, dimensions, rowLimit = 1000) {
  const data = await api(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`,
    { startDate, endDate, dimensions, rowLimit },
  );
  return data.rows ?? [];
}

async function ga4Report(body) {
  return api(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY}:runReport`,
    body,
  );
}

async function main() {
  token = await getToken();
  // GSC data lags ~3 days; use two consecutive 28-day windows for trend deltas.
  const end = day(-3);
  const start = day(-31);
  const prevEnd = day(-32);
  const prevStart = day(-60);
  const report = {
    generatedAt: new Date().toISOString(),
    window: { start, end },
    prevWindow: { start: prevStart, end: prevEnd },
  };

  console.error(`Pulling GSC ${start}..${end} (prev ${prevStart}..${prevEnd})...`);
  [
    report.gscQueries,
    report.gscPages,
    report.gscQueryPage,
    report.gscQueriesPrev,
    report.gscPagesPrev,
    report.gscTotalsByDate,
  ] = await Promise.all([
    gscQuery(start, end, ["query"]),
    gscQuery(start, end, ["page"]),
    gscQuery(start, end, ["query", "page"], 2500),
    gscQuery(prevStart, prevEnd, ["query"]),
    gscQuery(prevStart, prevEnd, ["page"]),
    gscQuery(prevStart, end, ["date"]),
  ]);

  console.error("Pulling GSC sitemaps...");
  report.sitemaps = await api(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/sitemaps`,
  ).catch((e) => ({ error: String(e) }));

  console.error("Pulling GA4...");
  const organicFilter = {
    filter: {
      fieldName: "sessionDefaultChannelGroup",
      stringFilter: { value: "Organic Search" },
    },
  };
  const aiFilter = {
    filter: {
      fieldName: "sessionDefaultChannelGroup",
      stringFilter: { value: "AI Assistant" },
    },
  };
  [report.ga4OrganicLanding, report.ga4AiLanding, report.ga4KeyEvents, report.ga4Channels] =
    await Promise.all([
      ga4Report({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "landingPage" }],
        metrics: [{ name: "sessions" }, { name: "keyEvents" }, { name: "engagementRate" }],
        dimensionFilter: organicFilter,
        limit: 200,
      }),
      ga4Report({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "landingPage" }],
        metrics: [{ name: "sessions" }, { name: "keyEvents" }],
        dimensionFilter: aiFilter,
        limit: 100,
      }),
      ga4Report({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "keyEvents" }],
        limit: 50,
      }),
      ga4Report({
        dateRanges: [{ startDate: start, endDate: end }],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "keyEvents" }],
      }),
    ]);

  if (INSPECT) {
    console.error("Inspecting sitemap URLs for index coverage...");
    const xml = await (await fetch(SITEMAP_URL)).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    report.indexCoverage = [];
    for (const url of urls) {
      try {
        const r = await api(
          "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
          { inspectionUrl: url, siteUrl: GSC_SITE },
        );
        const idx = r.inspectionResult?.indexStatusResult ?? {};
        report.indexCoverage.push({
          url,
          verdict: idx.verdict,
          coverageState: idx.coverageState,
          lastCrawlTime: idx.lastCrawlTime,
          robotsTxtState: idx.robotsTxtState,
          pageFetchState: idx.pageFetchState,
          googleCanonical: idx.googleCanonical,
        });
      } catch (e) {
        report.indexCoverage.push({ url, error: String(e).slice(0, 200) });
      }
      process.stderr.write(".");
    }
    console.error(" done");
  }

  mkdirSync(REPORT_DIR, { recursive: true });
  const outPath = `${REPORT_DIR}/audit-${day(0)}.json`;
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  // Compact stdout summary
  const totals = (rows) =>
    rows.reduce(
      (a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }),
      { clicks: 0, impressions: 0 },
    );
  const cur = totals(report.gscQueries);
  const prev = totals(report.gscQueriesPrev);
  console.log(`report: ${outPath}`);
  console.log(
    `GSC ${start}..${end}: ${cur.clicks} clicks / ${cur.impressions} impressions across ${report.gscQueries.length} queries, ${report.gscPages.length} pages`,
  );
  console.log(
    `GSC prev window:     ${prev.clicks} clicks / ${prev.impressions} impressions across ${report.gscQueriesPrev.length} queries`,
  );
  if (report.indexCoverage) {
    const byState = {};
    for (const c of report.indexCoverage)
      byState[c.coverageState ?? c.error ?? "?"] = (byState[c.coverageState ?? c.error ?? "?"] ?? 0) + 1;
    console.log(`index coverage: ${JSON.stringify(byState)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
