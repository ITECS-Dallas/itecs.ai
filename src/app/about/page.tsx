import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import {
  STATS,
  TEAM_MEMBERS,
  ABOUT_VALUES,
  ABOUT_FAQ,
} from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TrustBar } from "@/components/sections/TrustBar";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutHero } from "./AboutHero";
import { AboutStats } from "./AboutStats";
import { AboutValues } from "./AboutValues";
import { AboutLeadership } from "./AboutLeadership";

export const metadata = generatePageMetadata({
  title: "About ITECS — Dallas IT & AI Consulting Since 2002",
  description:
    "ITECS is a Dallas IT company founded in 2002 — 24 years of managed IT, cybersecurity, and now practical AI consulting for growth-stage and mid-market teams. Meet the team.",
  path: "/about",
  keywords: [
    "About ITECS Dallas",
    "ITECS AI consulting",
    "Dallas IT company",
    "mid-market AI Dallas",
    "managed IT services Dallas",
    "ITECS history",
    "Dallas AI company",
  ],
});

// Override the "Does ITECS still provide managed IT services?" FAQ to link
// the existing itecsonline.com mention. Anchors point to the parent site's
// canonical About page so authority concentrates on the brand-equity URL.
const aboutFaqWithLinks = ABOUT_FAQ.map((item) =>
  item.question === "Does ITECS still provide managed IT services?"
    ? {
        ...item,
        answer: (
          <>
            Yes. ITECS continues to deliver full managed IT services including
            helpdesk, cybersecurity, cloud management, and infrastructure
            support through{" "}
            <a
              href="https://itecsonline.com/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:decoration-brand-accent"
            >
              itecsonline.com
            </a>
            . ITECS AI is the dedicated AI consulting and automation division.
          </>
        ),
        schemaAnswer: item.answer,
      }
    : item,
);

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />
      </div>

      {/* 1. Hero — H1 + GEO Answer-First Block */}
      <AboutHero />

      {/* 2. Stats Bar — Animated counters */}
      <AboutStats stats={STATS} />

      {/* 3. Origin Story — Client logos trust signal */}
      <TrustBar />

      {/* 4. Timeline — 24 years of milestones */}
      <AboutTimeline />

      {/* 5. Company Photo — Multimedia directive */}
      <section className="py-16 bg-bg-surface">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <figure
            role="img"
            aria-label="ITECS team at their Dallas office — a small team delivering enterprise-grade IT and AI consulting to local businesses"
          >
            <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)]">
              <Image
                src="/images/team/team-office.webp"
                alt="ITECS team working at their Dallas office, delivering managed IT and AI consulting services to growing organizations"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-text-dim">
              The ITECS team at our Plano, TX headquarters — serving Dallas-Fort
              Worth businesses since 2002.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 6. Values / Differentiators */}
      <AboutValues values={ABOUT_VALUES} />

      {/* 7. Leadership */}
      <AboutLeadership members={TEAM_MEMBERS} />

      {/* 8. Partner Logos */}
      <PartnerLogos />

      {/* 9. FAQ — LAST content section before CTA (V2.0 protocol) */}
      <FAQ items={aboutFaqWithLinks} heading="About ITECS — FAQ" />

      {/* 10. Final CTA */}
      <CTASection />

      {/* JSON-LD Schemas */}
      <JsonLd data={generateFAQSchema(aboutFaqWithLinks)} />
    </>
  );
}
