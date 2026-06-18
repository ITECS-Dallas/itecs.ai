import { AICore } from "@/components/ui/AICore";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------------------------------------------------------------------
   FACETED BACKDROP — the "command/NOC" AI-core panel.
   An angular dark plate cut on a diagonal, a 2px bright crease sliver on the
   fold, a faint ops grid inside, and (optionally) the hex AI Core.
   Fills its positioned parent (parent must be position:relative).
   Used by the homepage Evolution band and every sub-page hero.
   --------------------------------------------------------------------------- */
interface FacetedBackdropProps {
  className?: string;
  /** Render the AI Core mark on the right of the plate. */
  showCore?: boolean;
  coreSize?: number;
  /** clip-path polygon for the plate (diagonal split). */
  clip?: string;
  /** clip-path polygon for the bright crease sliver. */
  creaseClip?: string;
}

export function FacetedBackdrop({
  className,
  showCore = true,
  coreSize = 268,
  clip = "polygon(28% 0, 100% 0, 100% 100%, 6% 100%)",
  creaseClip = "polygon(28% 0, 30% 0, 8% 100%, 6% 100%)",
}: FacetedBackdropProps) {
  return (
    <div aria-hidden="true" className={cx("absolute inset-0 overflow-hidden", className)}>
      {/* dark plate */}
      <div className="absolute inset-0" style={{ background: "var(--itecs-navy-2)", clipPath: clip }} />
      {/* bright crease sliver on the fold */}
      <div className="absolute inset-0" style={{ background: "var(--itecs-blue-bright)", clipPath: creaseClip }} />
      {/* faint ops grid inside the dark region */}
      <div className="absolute inset-0 ops-grid" style={{ clipPath: clip }} />
      {/* the AI core */}
      {showCore ? (
        <div
          className="absolute top-1/2 right-[16%] -translate-y-1/2 z-[2]"
        >
          <AICore size={coreSize} />
        </div>
      ) : null}
    </div>
  );
}
