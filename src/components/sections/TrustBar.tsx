import { CLIENT_LOGOS, PARTNER_LOGOS } from "@/lib/constants";
import { LogoWall } from "@/components/ui/LogoWall";

export function TrustBar() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-sunken py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
            Published historical case studies
          </p>
          <h2 className="mt-3 text-[length:var(--fs-h4)] font-semibold text-text-primary">
            Named organizations with public ITECS source pages.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-tertiary">
            Logos identify organizations covered by the historical case-study
            summaries linked on this site; they do not imply a current
            engagement, endorsement, or AI-specific result.
          </p>
        </div>
        <LogoWall logos={CLIENT_LOGOS} />

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-10">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
                Platforms we build on
              </p>
              <h3 className="mt-2 text-lg font-semibold text-text-primary">
                Built across the platforms enterprise teams already trust.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-tertiary">
              Microsoft, Azure, Copilot, Claude, OpenAI, and Sophos are among
              the platforms ITECS evaluates, configures, and supports. Logos do
              not imply a formal partnership unless one is stated separately.
            </p>
          </div>
          <LogoWall logos={PARTNER_LOGOS} columns="partners" />
        </div>
      </div>
    </section>
  );
}
