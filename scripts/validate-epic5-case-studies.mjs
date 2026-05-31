import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const constants = read("src/lib/constants.ts");
const outcomes = read("src/components/sections/OutcomesProof.tsx");
const sitemap = read("src/app/sitemap.ts");
const detailPath = "src/app/case-studies/[slug]/page.tsx";

if (!existsSync(join(root, detailPath))) {
  throw new Error(`${detailPath} does not exist`);
}

const detailPage = read(detailPath);
const combined = `${constants}\n${outcomes}\n${sitemap}\n${detailPage}`;

for (const value of [
  "TRUST_CASE_STUDIES",
  "Pegasus Foods",
  "100% uptime maintained",
  "challenge",
  "solution",
  "measuredOutcome",
  "detailHref",
  "sourceHref",
  "Challenge",
  "Solution",
  "Measured outcome",
  "generateStaticParams",
  "notFound",
  "TRUST_CASE_STUDIES.map",
]) {
  if (!combined.includes(value)) {
    throw new Error(`Epic 5 case-study contract missing: ${value}`);
  }
}

const caseStudyBlock =
  constants.match(/export const TRUST_CASE_STUDIES = \[(.*?)\] as const;/s)?.[1] ??
  "";
const caseCount = [...caseStudyBlock.matchAll(/slug: "[-a-z0-9]+"/g)].length;

if (caseCount < 3) {
  throw new Error(`Expected at least 3 trust case studies, found ${caseCount}`);
}

for (const forbidden of ["Lorem", "TBD", "placeholder", "anonymous CEO"]) {
  if (combined.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`Forbidden case-study placeholder found: ${forbidden}`);
  }
}

console.log("Epic 5 case-study validation passed");
