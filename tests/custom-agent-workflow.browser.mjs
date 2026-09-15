import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";
import { profile } from "../scripts/indexnow.mjs";

// Run against the production build, not a mocked intersection observer:
// BASE_URL=http://127.0.0.1:3120 node --test tests/custom-agent-workflow.browser.mjs
const base = process.env.BASE_URL || "http://127.0.0.1:3120";
const labels = ["Map Workflows", "Build Agent", "Test & Tune", "Deploy", "Monitor"];

for (const mode of ["normal", "reduced-motion", "no-javascript"]) {
  test(`custom agent pipeline is readable on mobile: ${mode}`, async () => {
    const browser = await chromium.launch({
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    });
    try {
      const context = await browser.newContext({
        ...profile,
        reducedMotion: mode === "reduced-motion" ? "reduce" : "no-preference",
        javaScriptEnabled: mode !== "no-javascript",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(`${base}/custom-ai-agents`, { waitUntil: "load" });
      assert.equal(response.status(), 200);
      const section = page.locator("section").filter({
        has: page.getByRole("heading", { name: "From Workflow Design to a Governed Agent in Production", exact: true }),
      });
      const mobile = section.locator("figure > div").nth(1);
      assert.equal(await mobile.isVisible(), true);
      for (const label of labels) {
        const card = mobile.getByText(label, { exact: true }).locator("..");
        await card.scrollIntoViewIfNeeded();
        // Allow existing reveal delays to finish; visibility must not depend on
        // the desktop-only element ever intersecting the mobile viewport.
        if (mode !== "no-javascript") await page.waitForTimeout(1200);
        assert.equal(await card.evaluate((node) => {
          for (let parent = node; parent; parent = parent.parentElement) {
            const style = getComputedStyle(parent);
            if (Number(style.opacity) < 0.99 || style.visibility === "hidden" || style.display === "none") return false;
          }
          const bounds = node.getBoundingClientRect();
          return node.checkVisibility({ contentVisibilityAuto: true }) && bounds.width > 0 && bounds.top >= 0 && bounds.bottom <= innerHeight;
        }), true, `${label}: invisible card or ancestor`);
        const paragraphs = card.locator("p");
        assert.equal(await paragraphs.count(), 2, `${label}: missing label or detail`);
        assert.ok((await paragraphs.nth(1).textContent()).trim().length > 0);
        if (process.env.WORKFLOW_SCREENSHOT_DIR && ["Map Workflows", "Monitor"].includes(label)) {
          await page.screenshot({ path: `${process.env.WORKFLOW_SCREENSHOT_DIR}/${mode}-${label.replaceAll(" ", "-")}.png` });
        }
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "Mobile horizontal overflow");
      assert.deepEqual(errors, [], "Browser errors");
    } finally {
      await browser.close();
    }
  });
}
