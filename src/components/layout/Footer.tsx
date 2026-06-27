import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CERTIFICATION_BADGES, SITE_CONFIG, SERVICES } from "@/lib/constants";
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { CertificationStrip } from "@/components/ui/CertificationStrip";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const solutionLinks: FooterLink[] = [
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
  { label: "AI Consulting", href: "/consulting" },
  { label: "Custom AI Agents", href: "/custom-ai-agents" },
  { label: "Workflow Automation", href: "/automation" },
  { label: "AI DevOps", href: "/ai-devops" },
  { label: "AI Champion Program", href: "/services/ai-champion-program" },
  ...SERVICES.slice(4, 8).map((service) => ({
    label: service.shortTitle,
    href: service.href,
  })),
];

const industryLinks: FooterLink[] = [
  { label: "Manufacturing AI", href: "/manufacturing" },
  { label: "PPV Agent", href: "/manufacturing/ppv-agent" },
  {
    label: "Demand & S&OP",
    href: "/manufacturing/demand-forecasting-sop-ai",
  },
  {
    label: "Predictive Maintenance",
    href: "/manufacturing/predictive-maintenance-ai",
  },
  {
    label: "Quality & Traceability",
    href: "/manufacturing/quality-traceability-ai",
  },
  {
    label: "Inventory & Working Capital",
    href: "/manufacturing/inventory-working-capital-ai",
  },
];

const companyLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "ITECS MSP", href: SITE_CONFIG.mainSiteUrl, external: true },
  {
    label: "Customer Portal",
    href: "https://portal.itecs.io/",
    external: true,
  },
];

const resourceLinks: FooterLink[] = [
  { label: "CEO Guide to AI ROI", href: "/insights/ceo-guide-ai-roi" },
  {
    label: "Secure Business Data",
    href: "/insights/secure-business-data-chatgpt",
  },
  {
    label: "Agentic AI Workflows",
    href: "/insights/agentic-ai-workflows-enterprise-operations",
  },
  {
    label: "Whitepapers & Case Studies",
    href: "https://itecsonline.com/white-papers-case-studies",
    external: true,
  },
  {
    label: "Experiencing a Breach?",
    href: "https://itecsonline.com/experiencing-a-breach",
    external: true,
  },
];

const socialLinks = [
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: LinkedInIcon },
  { label: "X", href: SITE_CONFIG.social.x, icon: XIcon },
  { label: "Facebook", href: SITE_CONFIG.social.facebook, icon: FacebookIcon },
  { label: "YouTube", href: SITE_CONFIG.social.youtube, icon: YouTubeIcon },
  { label: "GitHub", href: SITE_CONFIG.social.github, icon: GitHubIcon },
];

function FooterNavLink({ link }: { link: FooterLink }) {
  const className =
    "flex min-h-11 items-center text-sm text-text-tertiary transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="font-mono text-xs font-semibold uppercase text-text-primary">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={`${title}-${link.href}-${link.label}`}>
            <FooterNavLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// The footer is a navy dark section (handover spec). We re-scope the design
// tokens to on-dark values here so every existing text-/border-/accent utility
// inside the footer reads correctly against navy without per-element rewrites.
const footerDarkScope = {
  background: "var(--itecs-navy)",
  "--text-primary": "#ffffff",
  "--text-secondary": "#aebfcb",
  "--text-tertiary": "#8497a6",
  "--border-subtle": "rgba(255,255,255,0.10)",
  "--border-default": "rgba(255,255,255,0.14)",
  "--border-strong": "rgba(255,255,255,0.28)",
  "--bg-surface": "rgba(255,255,255,0.04)",
  "--bg-elevated": "rgba(255,255,255,0.10)",
  "--surface-3": "rgba(255,255,255,0.14)",
  "--bg-sunken": "var(--itecs-navy)",
  "--brand-accent": "var(--itecs-blue-pale)",
} as CSSProperties;

export function Footer() {
  return (
    <footer style={footerDarkScope}>
      <h2 className="sr-only">ITECS footer navigation</h2>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center">
              <Image
                src="/images/logos/itecs-horizontal.svg"
                alt="ITECS"
                width={112}
                height={34}
                className="brightness-0 invert"
                style={{ height: "34px", width: "auto" }}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {SITE_CONFIG.tagline} Built on the managed IT, cybersecurity, and
              cloud operations foundation ITECS has operated since 2002.
            </p>
            <address className="mt-5 text-sm leading-relaxed text-text-tertiary not-italic">
              {SITE_CONFIG.address.street}
              <br />
              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
              {SITE_CONFIG.address.zip}
            </address>
          </div>

          <FooterColumn title="Solutions" links={solutionLinks} />
          <FooterColumn title="Industries" links={industryLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <section
          aria-labelledby="footer-certifications"
          className="mt-12 border-y border-[var(--border-subtle)] py-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3
                id="footer-certifications"
                className="font-mono text-xs font-semibold uppercase text-text-primary"
              >
                Certifications & Partners
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-tertiary">
                Real security, cloud, and platform credentials supporting ITECS
                managed intelligence delivery.
              </p>
            </div>
            <CertificationStrip
              badges={CERTIFICATION_BADGES}
              className="lg:max-w-3xl"
            />
          </div>
        </section>

        <section
          aria-labelledby="footer-contact"
          className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <h3
              id="footer-contact"
              className="font-mono text-xs font-semibold uppercase text-text-primary"
            >
              Contact
            </h3>
            <div className="mt-4 grid gap-4 text-sm text-text-tertiary sm:grid-cols-3">
              <div>
                <p className="text-text-secondary">Dallas HQ</p>
                <address className="mt-1 leading-relaxed not-italic">
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                  {SITE_CONFIG.address.zip}
                </address>
              </div>
              <div>
                <p className="text-text-secondary">Phone</p>
                <a
                  href={`tel:${SITE_CONFIG.phoneE164}`}
                  className="mt-1 flex min-h-11 items-center font-mono transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div>
                <p className="text-text-secondary">Email</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="mt-1 flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface text-text-tertiary transition-colors hover:border-[var(--border-strong)] hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName}. All
            rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/sitemap.xml"
              className="flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
            >
              Sitemap
            </Link>
            <Link
              href="/ai.txt"
              className="flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
            >
              AI Policy
            </Link>
            <a
              href={`${SITE_CONFIG.mainSiteUrl}/privacy-policy`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
            >
              Privacy Policy
            </a>
            <a
              href={`${SITE_CONFIG.mainSiteUrl}/terms`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
            >
              Terms
            </a>
            <a
              href={SITE_CONFIG.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-sunken"
            >
              itecsonline.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
