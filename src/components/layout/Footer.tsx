import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logos/itecs-horizontal.svg"
                alt="ITECS"
                width={100}
                height={28}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-text-dim leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            <address className="mt-4 text-sm text-text-dim not-italic leading-relaxed">
              {SITE_CONFIG.address.street}
              <br />
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
              {SITE_CONFIG.address.zip}
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE_CONFIG.mainSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                >
                  ITECS Main Site
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              AI Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-dim">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="hover:text-brand-accent transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-brand-accent transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badge — child-to-parent authority link (Ticket 3) */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)]">
          <p className="text-sm text-text-dim text-center">
            ITECS AI is a division of{" "}
            <a
              href={SITE_CONFIG.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:text-brand-accent-bright transition-colors"
            >
              ITECS
            </a>
            , providing trusted Dallas IT services since 2002.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dim">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/sitemap.xml"
              className="hover:text-brand-accent transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/ai.txt"
              className="hover:text-brand-accent transition-colors"
            >
              AI Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
