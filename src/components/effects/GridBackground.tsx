interface GridBackgroundProps {
  className?: string;
  opacity?: number;
}

const gridNodes = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  cx: 60 * ((index % 4) + 2),
  cy: 60 * (Math.floor(index / 4) + 2),
  delay: `${index * 0.3}s`,
}));

export function GridBackground({
  className = "",
  opacity = 0.03,
}: GridBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--brand-accent)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <g className="animate-grid-pulse">
          {gridNodes.map((node) => (
            <circle
              key={node.id}
              cx={node.cx}
              cy={node.cy}
              r="1.5"
              fill="var(--brand-accent)"
              opacity="0.6"
              style={{ animationDelay: node.delay }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
