# Canonical Dallas office hours

Brian confirmed in `ITECS-AI-DFW-SEO-20260912-R2` on September 12, 2026:

- Office: Monday–Friday, **08:00–17:00 America/Chicago**.
- Daily operational availability: **07:00–22:00**, a separate service/operations concept, not office opening hours.

`SITE_CONFIG.officeHours` in `src/lib/site-config.ts` is the canonical application owner. The shared LocalBusiness JSON-LD helper consumes its weekdays, opening and closing values. Times are local Dallas wall-clock times, following America/Chicago daylight-saving changes; do not hardcode a permanent UTC offset or add a nonstandard timezone property to OpeningHoursSpecification.

This corrects the old schema's weekday 18:00 closing and Saturday 09:00–17:00 entry. The visible contact page had no contradictory numeric office hours, so its copy and operational response-routing language are unchanged. Do not turn operational availability, managed-service coverage, or workshop office hours into corporate-office opening hours.

Validate with `node --test tests/office-hours.test.mjs`, typecheck/build, and raw/rendered LocalBusiness readback on `/training`, `/automation`, and `/contact`. Preserve the existing address, phone, entity IDs, parent founding attribution, contact route, and R1 guides. Revalidate this source only when the owner changes the actual office schedule.
