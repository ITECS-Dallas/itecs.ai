import assert from "node:assert/strict";
import { chromium } from "playwright";
import { profile, savePrivate } from "../scripts/indexnow.mjs";

const [base = "http://127.0.0.1:3120", output] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome" });
const result = { at: new Date().toISOString(), base, archive: [], articles: [] };
try {
  const context = await browser.newContext({ ...profile, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert.equal(sitemap.status(), 200);
  const paths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname).filter((p) => p.startsWith("/insights/"));
  assert.ok(paths.length > 0);
  assert.equal((await page.goto(`${base}/insights`, { waitUntil: "load" })).status(), 200);
  for (const path of paths) {
    const image = page.locator(`main a[href="${path}"] img`);
    assert.equal(await image.count(), 1, `${path}: one archive image`);
    await image.scrollIntoViewIfNeeded();
    const data = await image.evaluate(async (img) => {
      await img.decode();
      const rect = img.getBoundingClientRect();
      return { src: img.getAttribute("src"), alt: img.alt, naturalWidth: img.naturalWidth, width: rect.width, height: rect.height };
    });
    assert.ok(data.naturalWidth > 0 && data.width > 0 && data.height > 0, path);
    result.archive.push({ path, ...data });
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  if (output) {
    await page.locator('main a[href="' + paths[0] + '"] img').scrollIntoViewIfNeeded();
    await page.screenshot({ path: output.replace(".json", "-archive.png") });
  }
  for (const { path, alt, src } of result.archive) {
    assert.equal((await page.goto(base + path, { waitUntil: "load" })).status(), 200);
    const image = page.locator("main figure img").first();
    await image.scrollIntoViewIfNeeded();
    const data = await image.evaluate(async (img) => {
      await img.decode();
      const h1 = document.querySelector("main h1").getBoundingClientRect();
      const columns = [...document.querySelectorAll("main article > div")].map((n) => {
        const r = n.getBoundingClientRect(), s = getComputedStyle(n);
        return { left: r.left + parseFloat(s.paddingLeft), right: r.right - parseFloat(s.paddingRight) };
      });
      const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map((n) => JSON.parse(n.textContent));
      return { src: img.getAttribute("src"), alt: img.alt, naturalWidth: img.naturalWidth,
        og: document.querySelector('meta[property="og:image"]').content,
        articleImage: schema.find((s) => s['@type'] === 'BlogPosting')?.image[0],
        header: { left: h1.left, right: h1.right }, columns,
        overflow: document.documentElement.scrollWidth > innerWidth };
    });
    const asset = (value) => { const u = new URL(value, base); return u.searchParams.get("url") ?? u.pathname; };
    assert.equal(data.alt, alt, path);
    assert.equal(asset(data.src), asset(src), path);
    assert.equal(asset(data.og), asset(src), path);
    assert.equal(asset(data.articleImage), asset(src), path);
    assert.ok(data.naturalWidth > 0, path);
    assert.equal(data.overflow, false, path);
    assert.equal(data.columns.length, 3);
    for (const column of data.columns) {
      assert.ok(Math.abs(column.left - data.header.left) < 1, path);
      assert.ok(Math.abs(column.right - data.header.right) < 1, path);
    }
    result.articles.push({ path, ...data });
    if (output && ["/insights/gpt-6-astra-managed-intelligence-providers", "/insights/ai-agent-evaluation-score-tool-use-before-production"].includes(path)) {
      await page.locator("main h1").scrollIntoViewIfNeeded();
      await page.screenshot({ path: output.replace(".json", `-${path.split("/").pop()}.png`) });
    }
  }
  assert.deepEqual(errors, []);
  if (output) savePrivate(output, result);
  console.log(JSON.stringify({ archiveImages: result.archive.length, articleImages: result.articles.length, decoded: true, aligned: true, browserErrors: errors.length }));
} finally { await browser.close(); }
