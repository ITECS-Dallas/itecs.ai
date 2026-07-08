import { STATS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Motifs";

/* ---------------------------------------------------------------------------
   HERO — the light faceted "Intelligence" hero.
   Aesthetic-Usability · Von Restorff · Hick's Law:
   one elevated primary action; the secondary is demoted to a text link.
   Decorative faceted art bleeds off the top-right and hides below lg.
   --------------------------------------------------------------------------- */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-36 md:pb-24">
      {/* ---- Faceted hero art (decorative; hidden < lg) ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* faceted brand blade (deep-blue) bleeding off the right, below the nav */}
        <div
          className="absolute"
          style={{
            top: "118px",
            right: "-150px",
            width: "790px",
            height: "760px",
            background: "var(--itecs-blue)",
            clipPath: "polygon(32% 0, 100% 0, 100% 100%, 57% 100%, 2% 45%)",
          }}
        />
        {/* darker crease-fold facet */}
        <div
          className="absolute"
          style={{
            top: "118px",
            right: "-150px",
            width: "790px",
            height: "760px",
            background: "var(--itecs-navy-3)",
            clipPath: "polygon(32% 0, 48% 0, 11% 54%, 2% 45%)",
          }}
        />
        {/* bright accent shard */}
        <div
          className="absolute"
          style={{
            top: "504px",
            right: "404px",
            width: "128px",
            height: "120px",
            background: "var(--itecs-blue-bright)",
            clipPath: "polygon(0 18%, 100% 0, 100% 82%, 0 100%)",
          }}
        />
        {/* angular crease line + circuit nodes */}
        <svg
          viewBox="0 0 1440 760"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <polyline
            points="-60,580 700,452 1540,320"
            fill="none"
            stroke="var(--itecs-blue-bright)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="700" cy="452" r="5.5" fill="var(--itecs-blue)" />
          <circle cx="1318" cy="353" r="4" fill="var(--itecs-blue-bright)" />
        </svg>
        {/* ITECS shield, knocked out to white on the blue blade */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/itecs-icon-darkblue.svg"
          alt=""
          className="absolute z-[2]"
          style={{
            top: "248px",
            right: "104px",
            height: "286px",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-[3] mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="max-w-[720px]">
          <Eyebrow className="mb-6">
            Managed Intelligence · For 50–300 Employee Organizations
          </Eyebrow>

          <h1 className="text-[clamp(2.75rem,1.6rem+4.6vw,4.625rem)] font-medium leading-[1.0] tracking-[-0.025em] text-ink">
            Your team already
            <br />
            uses AI.
            <br />
            <span className="text-itecs-blue">Make it pay off.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-[length:var(--fs-body-l)] leading-relaxed text-ink-body">
            Copilot, Claude, and ChatGPT are already in your employees&apos;
            hands. ITECS makes them governed, secure, and worth the spend —
            then builds what comes next: personal agents on every desktop and
            enterprise agents wired into your core systems. Backed by 24 years
            of managed IT and cybersecurity.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/assessment" size="lg">
              Get a Free AI Assessment
            </Button>
            <Button href="#ai-agents" variant="tertiary" size="lg">
              or see the two kinds of agents
            </Button>
          </div>

          {/* stat row */}
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[38px] font-semibold leading-none tracking-[-0.01em] text-ink">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="mt-1.5 text-[13px] text-ink-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
