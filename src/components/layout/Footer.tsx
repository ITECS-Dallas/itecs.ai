import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import {
  LinkedInIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
  GitHubIcon,
} from "@/components/ui/SocialIcons";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "ITECS Main Site", href: SITE_CONFIG.mainSiteUrl, external: true },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "X (Twitter)",
    href: SITE_CONFIG.social.x,
    icon: XIcon,
  },
  {
    label: "Facebook",
    href: SITE_CONFIG.social.facebook,
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: SITE_CONFIG.social.youtube,
    icon: YouTubeIcon,
  },
  {
    label: "GitHub",
    href: SITE_CONFIG.social.github,
    icon: GitHubIcon,
  },
];

const featuredServiceLinks = [
  ...SERVICES.map((service) => ({
    key: service.slug,
    label: service.shortTitle,
    href: service.href,
  })),
  {
    key: "ai-champion-program",
    label: "AI Champion Program",
    href: "/services/ai-champion-program",
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Address */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logos/itecs-horizontal.svg"
                alt="ITECS"
                width={94}
                height={28}
                className="brightness-0 invert"
                style={{ height: "28px", width: "auto" }}
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

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* AI Services */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              AI Services
            </h4>
            <ul className="space-y-3">
              {featuredServiceLinks.map((service) => (
                <li key={service.key}>
                  <Link
                    href={service.href}
                    className="text-sm text-text-dim hover:text-brand-accent transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-dim">
              <li>
                <span className="block text-text-secondary text-xs uppercase tracking-wider mb-0.5">
                  International
                </span>
                <a
                  href={`tel:${SITE_CONFIG.phoneE164}`}
                  className="hover:text-brand-accent transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <span className="block text-text-secondary text-xs uppercase tracking-wider mb-0.5">
                  Toll Free
                </span>
                <a
                  href={`tel:${SITE_CONFIG.supportPhoneE164}`}
                  className="hover:text-brand-accent transition-colors"
                >
                  {SITE_CONFIG.supportPhone}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-accent transition-colors"
                >
                  {SITE_CONFIG.email}
                </Link>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-void/50 border border-[var(--border-subtle)] text-text-dim hover:text-brand-accent hover:border-[var(--border-active)] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust badge */}
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
