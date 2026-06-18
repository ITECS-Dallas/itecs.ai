import { Eyebrow } from "@/components/ui/Motifs";
import { FacetedBackdrop } from "@/components/ui/FacetedBackdrop";

/* ---------------------------------------------------------------------------
   EVOLUTION BAND — Serial Position Effect.
   The MSP → MSSP → MIP journey ends on the most memorable item (MIP),
   which is visually highlighted so the AI story is what sticks.
   Dark navy plate + the hex AI Core (the brand's AI signifier).
   --------------------------------------------------------------------------- */
const STAGES = [
  {
    year: "2002",
    name: "MSP",
    blurb: "Proactive IT & uptime.",
    highlight: false,
  },
  {
    year: "2018",
    name: "MSSP",
    blurb: "Detection & response.",
    highlight: false,
  },
  {
    year: "2026",
    name: "MIP",
    blurb: "AI agents & intelligent ops.",
    highlight: true,
  },
] as const;

export function EvolutionBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-20">
      <div
        className="relative grid overflow-hidden rounded-[var(--r-section)] lg:grid-cols-[1fr_0.82fr]"
        style={{ background: "var(--itecs-navy)", minHeight: "430px" }}
      >
        {/* Left: narrative + timeline */}
        <div className="relative z-[3] flex flex-col justify-center p-8 md:p-14">
          <Eyebrow className="mb-5 !text-itecs-blue-pale">
            The Next Evolution · MSP → MSSP → MIP
          </Eyebrow>
          <h2 className="mb-7 font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-white">
            Beyond managed services.
            <br />
            <span className="text-itecs-blue-pale">Managed intelligence.</span>
          </h2>

          <div className="flex max-w-[560px] items-stretch">
            {STAGES.map((stage, i) => (
              <div key={stage.name} className="flex items-stretch">
                <div
                  className="flex-1 pt-4 pr-5"
                  style={{
                    borderTop: stage.highlight
                      ? "2px solid var(--itecs-blue-bright)"
                      : "2px solid #2a3b4a",
                  }}
                >
                  <div
                    className="mb-2 font-mono text-[11px]"
                    style={{ color: stage.highlight ? "var(--itecs-blue-pale)" : "#6d7c89" }}
                  >
                    {stage.year}
                  </div>
                  <div
                    className="font-display text-[20px] font-semibold"
                    style={{ color: stage.highlight ? "#fff" : "#7c8a96" }}
                  >
                    {stage.name}
                  </div>
                  <div
                    className="mt-1.5 text-[12px] leading-snug"
                    style={{ color: stage.highlight ? "#aebfcb" : "#7a8794" }}
                  >
                    {stage.blurb}
                  </div>
                </div>
                {i < STAGES.length - 1 ? (
                  <div
                    className="self-start pt-3 text-base"
                    style={{ color: STAGES[i + 1].highlight ? "var(--itecs-blue-bright)" : "#566876" }}
                  >
                    →
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Core panel (hidden on mobile — decorative) */}
        <div className="relative hidden lg:block">
          <FacetedBackdrop />
        </div>
      </div>
    </section>
  );
}
