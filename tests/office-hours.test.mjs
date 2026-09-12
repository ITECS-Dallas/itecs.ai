import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { SITE_CONFIG } from "../src/lib/site-config.ts";

test("canonical office schedule is weekdays 08:00-17:00 in America/Chicago", () => {
  assert.deepEqual(SITE_CONFIG.officeHours, {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
    timeZone: "America/Chicago",
  });
});

test("LocalBusiness reads the canonical office schedule and omits weekend/operations hours", () => {
  const source = readFileSync(new URL("../src/lib/seo.ts", import.meta.url), "utf8");
  const hours = source.split("openingHoursSpecification: [")[1].split("areaServed:")[0];
  assert.equal(hours.split('"@type": "OpeningHoursSpecification"').length - 1, 1);
  for (const field of ["dayOfWeek", "opens", "closes"]) {
    assert.ok(hours.includes(`${field}: SITE_CONFIG.officeHours.${field}`));
  }
  assert.doesNotMatch(hours, /Saturday|Sunday|18:00|09:00|07:00|22:00|timeZone:/);
});

test("local office timezone observes winter and summer instead of a fixed UTC offset", () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: SITE_CONFIG.officeHours.timeZone,
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  });
  assert.equal(formatter.format(new Date("2026-01-12T14:00:00Z")), "08:00");
  assert.equal(formatter.format(new Date("2026-07-13T13:00:00Z")), "08:00");
});
