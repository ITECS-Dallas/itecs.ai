import { generatePageMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import { generateContactPageSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GridBackground } from "@/components/effects/GridBackground";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/forms/ContactForm";
import { Building2, Clock3, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { TrustBar } from "@/components/sections/TrustBar";
import {
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
  GitHubIcon,
} from "@/components/ui/SocialIcons";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Contact ITECS — Dallas Managed AI Team",
  description:
    "Contact ITECS for managed AI consulting, automation, governance, and AI Readiness Assessment conversations from the Plano corporate office serving Dallas-Fort Worth.",
  path: "/contact",
  keywords: [
    "contact AI consultant Dallas",
    "AI Readiness Assessment Dallas",
    "managed AI consulting Dallas",
    "AI automation consultation Dallas",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={generateContactPageSchema()} />

      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />
      </div>

      <section className="relative pt-8 pb-24 overflow-hidden">
        <GridBackground opacity={0.03} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow mb-6">Contact ITECS</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.025em] leading-[1.05] max-w-3xl text-ink">
            Talk with the Dallas team that can make AI{" "}
            <span className="text-itecs-blue">governed and useful</span>
          </h1>
          <p className="mt-6 text-lg text-ink-body max-w-xl">
            Use this page for architect conversations, AI Readiness Assessment
            follow-up, or direct contact with the ITECS team serving DFW from
            Plano.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="overflow-hidden pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <ScrollReveal direction="up">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-accent/10">
                  <Phone className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Phone</h3>
                  <a
                    href={`tel:${SITE_CONFIG.phoneE164}`}
                    className="flex min-h-11 items-center text-text-secondary transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    {SITE_CONFIG.phone}
                    <span className="text-text-dim text-xs ml-2">International</span>
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.supportPhoneE164}`}
                    className="mt-1 flex min-h-11 items-center text-text-secondary transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    {SITE_CONFIG.supportPhone}
                    <span className="text-text-dim text-xs ml-2">
                      Toll Free
                    </span>
                  </a>
                </div>
              </div>

              <div
                id="response-time"
                className="rounded-lg border border-[var(--border-default)] bg-bg-elevated p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                    <Clock3 className="h-5 w-5 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      Response-time promise
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Assessment and architect requests route to the ITECS team
                      by email. A qualified team member follows up on the next
                      business day; urgent requests should call {SITE_CONFIG.phone}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-accent/10">
                  <Mail className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Email</h3>
                  <span className="text-text-secondary">
                    {SITE_CONFIG.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-accent/10">
                  <MapPin className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Office</h3>
                  <address className="text-text-secondary not-italic">
                    {SITE_CONFIG.address.street}
                    <br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                    {SITE_CONFIG.address.zip}
                  </address>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: LinkedInIcon },
                  { label: "X (Twitter)", href: SITE_CONFIG.social.x, icon: XIcon },
                  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: FacebookIcon },
                  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: YouTubeIcon },
                  { label: "GitHub", href: SITE_CONFIG.social.github, icon: GitHubIcon },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-bg-surface text-text-dim transition-colors hover:border-[var(--border-active)] hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-sm text-text-dim">
                  Serving the Dallas-Fort Worth Metroplex: Dallas, Plano,
                  Richardson, Frisco, McKinney, and surrounding areas.
                </p>
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/services"
                    className="inline-flex min-h-11 items-center text-sm text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    View our services &rarr;
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex min-h-11 items-center text-sm text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  >
                    About ITECS &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-8">
              <h2 className="text-2xl font-light text-text-primary mb-6">
                Contact ITECS
              </h2>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-bg-surface/45 py-20 md:py-24"
        itemScope
        itemType="https://schema.org/LocalBusiness"
        itemID={`${SITE_CONFIG.url}/#localbusiness`}
      >
        <meta itemProp="name" content="ITECS AI" />
        <meta itemProp="legalName" content={SITE_CONFIG.legalName} />
        <meta itemProp="url" content={SITE_CONFIG.url} />
        <meta itemProp="image" content={`${SITE_CONFIG.url}/images/logos/itecs-horizontal.svg`} />
        <meta itemProp="priceRange" content="$$" />
        <meta itemProp="telephone" content={SITE_CONFIG.phoneE164} />
        <link itemProp="hasMap" href={SITE_CONFIG.googleMapsUrl} />
        <span itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
          <meta itemProp="latitude" content={String(SITE_CONFIG.geo.lat)} />
          <meta itemProp="longitude" content={String(SITE_CONFIG.geo.lng)} />
        </span>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <ScrollReveal direction="up">
            <div className="h-full">
              <p className="eyebrow">Corporate Office</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">
                ITECS corporate office in Plano, Texas
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
                ITECS AI serves Dallas-Fort Worth businesses from the ITECS
                corporate office in Plano. Use this page to confirm our official
                office location, Google Maps listing, and phone lines for AI
                consulting, training, security, and DevOps conversations.
              </p>

              <div className="mt-8 rounded-lg border border-[var(--border-subtle)] bg-bg-void/70 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
                    <Building2 className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">ITECS AI</h3>
                    <address
                      className="mt-2 not-italic text-text-secondary"
                      itemProp="address"
                      itemScope
                      itemType="https://schema.org/PostalAddress"
                    >
                      <span itemProp="streetAddress">{SITE_CONFIG.address.street}</span>
                      <br />
                      <span itemProp="addressLocality">{SITE_CONFIG.address.city}</span>,{" "}
                      <span itemProp="addressRegion">{SITE_CONFIG.address.state}</span>{" "}
                      <span itemProp="postalCode">{SITE_CONFIG.address.zip}</span>
                      <meta itemProp="addressCountry" content={SITE_CONFIG.address.country} />
                    </address>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <a
                    href={`tel:${SITE_CONFIG.phoneE164}`}
                    className="rounded-lg border border-[var(--border-subtle)] bg-bg-surface/60 p-4 transition-colors hover:border-[var(--border-active)]"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-dim">
                      International
                    </span>
                    <span className="mt-1 block text-text-secondary">{SITE_CONFIG.phone}</span>
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.supportPhoneE164}`}
                    className="rounded-lg border border-[var(--border-subtle)] bg-bg-surface/60 p-4 transition-colors hover:border-[var(--border-active)]"
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-text-dim">
                      Toll Free
                    </span>
                    <span className="mt-1 block text-text-secondary">
                      {SITE_CONFIG.supportPhone}
                    </span>
                  </a>
                </div>

                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                >
                  View ITECS on Google Maps
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-void shadow-[0_0_40px_var(--accent-cyan-subtle)] md:min-h-[430px]">
              <iframe
                title="Google map showing ITECS corporate office in Plano, Texas"
                src={SITE_CONFIG.googleMapsEmbedUrl}
                className="h-[340px] w-full border-0 md:h-[430px] lg:h-full lg:min-h-[500px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
