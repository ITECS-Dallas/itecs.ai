import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG, TEAM_MEMBERS, PARTNER_LOGOS } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PartnerLogos } from "@/components/sections/PartnerLogos";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "About ITECS — 22 Years of IT Operations, Now Powering AI",
  description:
    "ITECS is a Dallas-based managed IT services provider founded in 2002. Now expanding into enterprise AI consulting, managed intelligence, and AI security compliance.",
  path: "/about",
  keywords: [
    "About ITECS",
    "ITECS Dallas",
    "IT Services Company Dallas",
    "AI Consulting Company",
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
            22 Years of IT Operations.
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Now Powering AI.
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
            ITECS was founded in 2002 with a simple promise: treat every
            client&apos;s infrastructure like our own. Two decades later, that
            operational rigor is the foundation of our AI practice.
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
              Not Just a Vendor. Your IT Department.
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Since 2002, ITECS has operated as a true extension of our
              clients&apos; teams. We manage over 500 endpoints, maintain a 92%
              client retention rate, and provide 24/7 monitoring across
              healthcare, financial services, manufacturing, and legal sectors
              in the Dallas-Fort Worth area.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Our expansion into AI consulting is a natural evolution — we
              already understand our clients&apos; infrastructure, security
              requirements, and compliance obligations. AI isn&apos;t an add-on;
              it&apos;s the next layer of operational intelligence built on a
              foundation we&apos;ve spent two decades refining.
            </p>
            <div className="mt-6">
              <Link
                href="/services"
                className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm"
              >
                Explore our AI services &rarr;
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
