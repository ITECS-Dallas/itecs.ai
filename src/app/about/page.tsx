import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG, TEAM_MEMBERS } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "About ITECS — Dallas IT & AI Consulting Since 2002",
  description:
    "ITECS is a Dallas-based IT services company founded in 2002, now helping small and mid-sized businesses save time and money with practical AI consulting, automation, and custom ChatGPT development.",
  path: "/about",
  keywords: [
    "About ITECS Dallas",
    "ITECS AI consulting",
    "Dallas IT company",
    "small business AI Dallas",
    "managed IT services Dallas",
  ],
});

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

      {/* Hero */}
      <section className="relative pt-8 pb-24 overflow-hidden">
        <GridBackground opacity={0.03} />
        <GradientOrb color="cyan" size="md" position={{ top: "20%", right: "10%" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-3xl">
            22 Years Serving Dallas Businesses.
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Now Bringing Them AI.
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
            ITECS was founded in 2002 with a simple promise: give Dallas small
            businesses the same IT power that Fortune 500 companies have — without
            the Fortune 500 price tag. Now we&apos;re doing the same thing with AI.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-bg-surface">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)]">
              <Image
                src="/images/team/team-office.webp"
                alt="ITECS team at the Dallas office"
                width={640}
                height={420}
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary">
              Not a Startup. Your Dallas IT Partner Since 2002.
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Most AI companies popped up in the last two years. We&apos;ve been
              managing IT infrastructure for Dallas businesses for over two
              decades — 500+ endpoints, a 92% client retention rate, and 24/7
              monitoring across healthcare, financial services, manufacturing,
              and legal sectors in the Dallas-Fort Worth area.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              That means when we build AI tools for your business, we already
              understand your infrastructure, security requirements, and
              compliance needs. AI isn&apos;t a side project for us — it&apos;s
              the next layer of practical technology built on a foundation
              we&apos;ve spent 22 years refining.
            </p>
            <div className="mt-6">
              <Link
                href="/services"
                className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm"
              >
                See how we help Dallas businesses with AI &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-center mb-12">
              Leadership
            </h2>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <ScrollReveal key={member.name}>
                <div className="flex flex-col sm:flex-row items-center gap-8 p-8 rounded-xl border border-[var(--border-subtle)] bg-bg-surface">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="w-32 h-32 rounded-full object-cover border-2 border-[var(--border-subtle)]"
                  />
                  <div>
                    <h3 className="text-xl font-medium text-text-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm text-brand-accent">{member.title}</p>
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <PartnerLogos />
      <CTASection />

      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "About", url: `${SITE_CONFIG.url}/about` },
        ])}
      />
    </>
  );
}
