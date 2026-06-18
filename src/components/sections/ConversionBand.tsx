import { Button } from "@/components/ui/Button";
import { Hex } from "@/components/ui/Motifs";
import { SITE_CONFIG } from "@/lib/constants";

const STEPS = ["Book a call", "Free assessment", "Your roadmap"] as const;

/* ---------------------------------------------------------------------------
   CONVERSION BAND — Fitts's Law + Goal-Gradient Effect.
   A large, unmissable target on the ITECS-blue band, preceded by a visible
   3-step path so the goal feels nearly done.
   --------------------------------------------------------------------------- */
export function ConversionBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--itecs-blue)" }}
    >
      {/* faint shield watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logos/itecs-icon-darkblue.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-16 hidden -translate-y-1/2 md:block"
        style={{ height: "230px", filter: "brightness(0) invert(1)", opacity: 0.12 }}
      />
      {/* faceted accent shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-130px",
          left: "-120px",
          width: "470px",
          height: "430px",
          background: "rgba(50,136,182,0.22)",
          clipPath: "polygon(0 0, 64% 0, 100% 54%, 46% 100%, 0 66%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-[70px] md:px-8">
        <div className="max-w-[760px]">
          <h2 className="font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            Ready to see where AI moves your business forward?
          </h2>

          {/* goal-gradient: visible 3-step path */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2.5">
                <Hex
                  className="h-6 w-6 font-mono text-xs font-semibold"
                  style={{ background: "var(--itecs-blue-pale)", color: "#012" }}
                >
                  {i + 1}
                </Hex>
                <span className="text-sm font-medium text-[#cfe0ec]">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/assessment" variant="ondark" size="lg">
              Request your free AI assessment
            </Button>
            <Button href={`tel:${SITE_CONFIG.phoneE164}`} variant="ghost" size="lg">
              Call {SITE_CONFIG.phone} →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
