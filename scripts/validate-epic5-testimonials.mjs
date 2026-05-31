import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

const constants = read("src/lib/constants.ts");
const component = read("src/components/sections/Testimonials.tsx");
const combined = `${constants}\n${component}`;

for (const value of [
  "HOMEPAGE_TESTIMONIALS",
  "Dan",
  "David Bryant",
  "Jason Jones",
  "name",
  "title",
  "company",
  "sourceHref",
  "testimonial.name",
]) {
  if (!combined.includes(value)) {
    throw new Error(`Epic 5 testimonial contract missing: ${value}`);
  }
}

for (const forbidden of [
  "IT Manager",
  "IT Director",
  "CEO, Company",
  "Anonymous",
]) {
  if (constants.includes(forbidden)) {
    throw new Error(`Unattributed testimonial/filler remains: ${forbidden}`);
  }
}

const testimonialBlock =
  constants.match(/export const HOMEPAGE_TESTIMONIALS = \{(.*?)\n\} as const;/s)?.[1] ??
  "";
const testimonials = testimonialBlock.split(/\n    \{/).slice(1);

if (testimonials.length < 3) {
  throw new Error(`Expected at least 3 testimonials, found ${testimonials.length}`);
}

for (const testimonial of testimonials) {
  for (const field of ["name:", "title:", "company:", "sourceHref:"]) {
    if (!testimonial.includes(field)) {
      throw new Error(`Testimonial is missing required field ${field}`);
    }
  }
}

console.log("Epic 5 testimonial validation passed");
