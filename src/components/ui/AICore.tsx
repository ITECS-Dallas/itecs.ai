interface AICoreProps {
  /** Rendered SVG size in px. */
  size?: number;
  className?: string;
}

/* ---------------------------------------------------------------------------
   AI CORE — a faceted hexagon with internal facet lines radiating to node
   dots, a glowing center, and a slow coreGlow pulse. The brand's AI
   signifier. Monochrome-blue, intended for navy panels. Hard-edged only.
   --------------------------------------------------------------------------- */
export function AICore({ size = 268, className }: AICoreProps) {
  return (
    <svg
      viewBox="0 0 420 420"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      className={className}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* outer breathing ring */}
      <circle
        cx="210"
        cy="210"
        r="150"
        fill="none"
        stroke="var(--itecs-blue-light)"
        strokeWidth="1"
        strokeOpacity="0.18"
        style={{ transformOrigin: "210px 210px", animation: "coreGlow 3s ease-in-out infinite" }}
      />
      {/* faceted hexagon shell */}
      <polygon
        points="50,210 130,72 290,72 370,210 290,348 130,348"
        fill="rgba(91,168,216,0.05)"
        stroke="var(--itecs-blue-light)"
        strokeWidth="2"
      />
      {/* inner facet hexagon */}
      <polygon
        points="130,210 170,141 250,141 290,210 250,279 170,279"
        fill="none"
        stroke="#2f6f9e"
        strokeWidth="1.2"
        strokeOpacity="0.75"
      />
      {/* facet lines to nodes */}
      <line x1="210" y1="210" x2="130" y2="72" stroke="var(--itecs-blue-light)" strokeWidth="1.4" strokeOpacity="0.55" />
      <line x1="210" y1="210" x2="370" y2="210" stroke="var(--itecs-blue-light)" strokeWidth="1.4" strokeOpacity="0.55" />
      <line x1="210" y1="210" x2="130" y2="348" stroke="var(--itecs-blue-light)" strokeWidth="1.4" strokeOpacity="0.55" />
      {/* node dots */}
      <circle cx="130" cy="72" r="5" fill="var(--itecs-blue-light)" />
      <circle cx="370" cy="210" r="5" fill="var(--itecs-blue-light)" />
      <circle cx="130" cy="348" r="5" fill="var(--itecs-blue-light)" />
      {/* glowing center */}
      <circle
        cx="210"
        cy="210"
        r="13"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        style={{ transformOrigin: "210px 210px", animation: "coreGlow 3s ease-in-out infinite" }}
      />
      <circle cx="210" cy="210" r="7" fill="#fff" />
    </svg>
  );
}
