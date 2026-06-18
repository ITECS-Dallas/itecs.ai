interface HeroGlyphProps {
  /** Rendered SVG size in px. */
  size?: number;
  className?: string;
}

/* ---------------------------------------------------------------------------
   HERO GLYPH — light-mode "intelligence" decoration for left-aligned light
   heroes (services, contact, about) that would otherwise leave the right half
   empty on desktop. A faceted hexagon wireframe with facet lines radiating to
   node diamonds, a glowing center, and a crease line. Hard-edged, monochrome
   blue on the light canvas — the light-surface companion to <AICore>.
   --------------------------------------------------------------------------- */
export function HeroGlyph({ size = 420, className }: HeroGlyphProps) {
  return (
    <svg
      viewBox="0 0 460 460"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      className={className}
      style={{ display: "block", overflow: "visible", maxWidth: "100%" }}
    >
      {/* faint chamfered backing panel for depth */}
      <polygon
        points="70,40 420,40 420,360 110,360 70,320"
        fill="var(--brand-subtle)"
        stroke="var(--card-line)"
        strokeWidth="1"
      />
      {/* crease line + node */}
      <polyline
        points="20,300 250,210 470,250"
        fill="none"
        stroke="var(--itecs-blue-bright)"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      {/* outer breathing ring */}
      <circle
        cx="240"
        cy="210"
        r="150"
        fill="none"
        stroke="var(--itecs-blue-bright)"
        strokeWidth="1"
        strokeOpacity="0.25"
        style={{ transformOrigin: "240px 210px", animation: "coreGlow 3s ease-in-out infinite" }}
      />
      {/* faceted hexagon shell */}
      <polygon
        points="80,210 160,72 320,72 400,210 320,348 160,348"
        fill="rgba(0,71,117,0.04)"
        stroke="var(--itecs-blue)"
        strokeWidth="2"
      />
      {/* inner facet hexagon */}
      <polygon
        points="160,210 200,141 280,141 320,210 280,279 200,279"
        fill="none"
        stroke="var(--itecs-blue-bright)"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      {/* facet lines to nodes */}
      <line x1="240" y1="210" x2="160" y2="72" stroke="var(--itecs-blue)" strokeWidth="1.4" strokeOpacity="0.45" />
      <line x1="240" y1="210" x2="400" y2="210" stroke="var(--itecs-blue)" strokeWidth="1.4" strokeOpacity="0.45" />
      <line x1="240" y1="210" x2="160" y2="348" stroke="var(--itecs-blue)" strokeWidth="1.4" strokeOpacity="0.45" />
      {/* node diamonds (rotated squares) */}
      {[
        [160, 72],
        [400, 210],
        [160, 348],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          fill="var(--itecs-blue-bright)"
          transform={`rotate(45 ${x} ${y})`}
        />
      ))}
      {/* glowing center */}
      <circle
        cx="240"
        cy="210"
        r="13"
        fill="none"
        stroke="var(--itecs-blue)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        style={{ transformOrigin: "240px 210px", animation: "coreGlow 3s ease-in-out infinite" }}
      />
      <circle cx="240" cy="210" r="7" fill="var(--itecs-blue)" />
    </svg>
  );
}
