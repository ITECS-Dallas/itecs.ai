import {
  CERTIFICATION_BADGES,
  CLIENT_LOGOS,
  PARTNER_LOGOS,
} from "@/lib/constants";
import { CertificationStrip } from "@/components/ui/CertificationStrip";
import { LogoWall } from "@/components/ui/LogoWall";

export function TrustBar() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-sunken py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
            Existing Proof, Carried Forward
          </p>
          <h2 className="mt-3 text-[length:var(--fs-h4)] font-semibold text-text-primary">
            Trusted by Dallas-Fort Worth organizations.
          </h2>
        </div>
        <LogoWall logos={CLIENT_LOGOS} />

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-10">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
                Platform Partners
              </p>
              <h3 className="mt-2 text-lg font-semibold text-text-primary">
                Built across the platforms enterprise teams already trust.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-tertiary">
              Microsoft, Azure, Copilot, Claude, OpenAI, and Sophos remain part
              of the approved proof layer.
            </p>
          </div>
          <LogoWall logos={PARTNER_LOGOS} columns="partners" />
        </div>

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-10">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
                Certifications & Governance
              </p>
              <h3 className="mt-2 text-lg font-semibold text-text-primary">
                Security and compliance posture visible from the first scroll.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-tertiary">
              Only confirmed ITECS credentials and platform relationships are
              shown.
            </p>
          </div>
          <CertificationStrip badges={CERTIFICATION_BADGES} />
        </div>
      </div>
    </section>
  );
}
