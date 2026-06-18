import type { ReactNode } from "react";
import type { ServiceItem } from "@/lib/constants";
import { Eyebrow } from "@/components/ui/Motifs";
import { FacetedBackdrop } from "@/components/ui/FacetedBackdrop";

interface ServiceHeroProps {
  service: ServiceItem;
  /** @deprecated retained for caller compatibility; the AI Core motif is used instead. */
  circuit?: ReactNode;
}

/* ---------------------------------------------------------------------------
   SERVICE HERO — the sub-page hero treatment.
   The dark navy "Managed intelligence" panel: a faceted plate, an ops-grid
   texture, the hex AI Core, an answer-first summary, and the page H1.
   --------------------------------------------------------------------------- */
export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-8 md:pt-32 md:pb-16">
      <div
        className="relative grid overflow-hidden rounded-[var(--r-section)] lg:grid-cols-[1fr_0.74fr]"
        style={{ background: "var(--itecs-navy)", minHeight: "440px" }}
      >
        {/* Left: eyebrow + H1 + answer-first summary */}
        <div className="relative z-[3] flex flex-col justify-center p-8 md:p-14">
          <Eyebrow className="mb-5 !text-itecs-blue-pale">
            {service.shortTitle}
          </Eyebrow>

          <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.025em] text-white">
            {service.h1}
          </h1>

          {/* answer-first ROI summary — GEO-extractable */}
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-itecs-blue-pale">
            {service.heroSummary}
          </p>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#aebfcb]">
            {service.longDescription}
          </p>
        </div>

        {/* Right: AI Core panel (decorative, hidden on mobile) */}
        <div className="relative hidden lg:block">
          <FacetedBackdrop
            coreSize={240}
            clip="polygon(22% 0, 100% 0, 100% 100%, 4% 100%)"
            creaseClip="polygon(22% 0, 24% 0, 6% 100%, 4% 100%)"
          />
        </div>
      </div>
    </section>
  );
}
