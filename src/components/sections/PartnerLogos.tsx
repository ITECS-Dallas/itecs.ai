import { PARTNER_LOGOS } from "@/lib/constants";
import { LogoWall } from "@/components/ui/LogoWall";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PartnerLogos() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Technology Partners"
          title="Backed by Leading Platforms"
        />

        <div className="mt-12">
          <LogoWall logos={PARTNER_LOGOS} columns="partners" />
        </div>
      </div>
    </section>
  );
}
