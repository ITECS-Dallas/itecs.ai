"use client";

interface GridBackgroundProps {
  className?: string;
  opacity?: number;
}

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
        {/* Pulsing intersection nodes */}
        <g className="animate-grid-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={60 * ((i % 4) + 2)}
              cy={60 * (Math.floor(i / 4) + 2)}
              r="1.5"
              fill="var(--brand-accent)"
              opacity="0.6"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
