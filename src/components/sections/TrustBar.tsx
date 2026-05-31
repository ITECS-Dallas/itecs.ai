import { CLIENT_LOGOS } from "@/lib/constants";
import { LogoWall } from "@/components/ui/LogoWall";

export function TrustBar() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-sunken py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
            Existing Client Proof
          </p>
          <h2 className="mt-3 text-[length:var(--fs-h4)] font-semibold text-text-primary">
            Trusted by Dallas-Fort Worth organizations.
          </h2>
        </div>
        <LogoWall logos={CLIENT_LOGOS} />
      </div>
    </section>
  );
}
