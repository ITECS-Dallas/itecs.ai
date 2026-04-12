import { generatePageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Contact ITECS — Free AI Assessment for Dallas Businesses",
  description:
    "Contact ITECS for a free AI assessment. We help Dallas businesses with 10–300 employees save time with AI automation, custom ChatGPT, and workflow tools. Call (972) 408-2020.",
  path: "/contact",
  keywords: [
    "contact AI consultant Dallas",
    "free AI assessment Dallas",
    "small business AI help Dallas",
    "AI automation consultation Dallas",
  ],
});

export default function ContactPage() {
  return (
    <>
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
        <GradientOrb color="cyan" size="md" position={{ top: "20%", right: "15%" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[1.1] max-w-3xl">
            Let&apos;s Find Where AI Can{" "}
            <span className="bg-gradient-to-r from-brand-accent to-brand-purple bg-clip-text text-transparent">
              Save You Time & Money
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-xl">
            Start with a free AI assessment for your Dallas business. We&apos;ll
            show you exactly which tasks AI can automate and how much time
            you&apos;ll save — no commitments, no vendor lock-in.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-accent/10">
                  <Phone className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Phone</h3>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="text-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-accent/10">
                  <Mail className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Email</h3>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
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

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-sm text-text-dim">
                  Serving the Dallas-Fort Worth Metroplex: Dallas, Plano,
                  Richardson, Frisco, McKinney, and surrounding areas.
                </p>
                <div className="mt-4 flex gap-4">
                  <Link
                    href="/services"
                    className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm"
                  >
                    View our services &rarr;
                  </Link>
                  <Link
                    href="/about"
                    className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm"
                  >
                    About ITECS &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact form */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-8">
              <h2 className="text-2xl font-light text-text-primary mb-6">
                Request a Free Assessment
              </h2>
              <form
                action={`mailto:${SITE_CONFIG.email}`}
                method="POST"
                encType="text/plain"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-text-dim mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm text-text-dim mb-1.5">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-text-dim mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-text-dim mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-bg-void border border-[var(--border-subtle)] text-text-primary placeholder:text-text-dim/50 focus:border-brand-accent focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your AI goals..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-brand-accent text-bg-void font-medium text-sm tracking-wide uppercase hover:shadow-[0_0_30px_var(--glow-cyan)] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Contact", url: `${SITE_CONFIG.url}/contact` },
        ])}
      />
    </>
  );
}
