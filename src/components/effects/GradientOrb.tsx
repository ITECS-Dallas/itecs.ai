interface GradientOrbProps {
  color?: "cyan" | "brand" | "mixed";
  size?: "sm" | "md" | "lg";
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  className?: string;
}

/* ---------------------------------------------------------------------------
   RETIRED. The ITECS "Intelligence" system bans soft rounded blobs.
   This component is intentionally a no-op so existing call sites keep
   compiling while the ambient-glow motif is removed site-wide. Use the
   angular FacetedBackdrop / faceted shards for decoration instead.
   --------------------------------------------------------------------------- */
export function GradientOrb(props: GradientOrbProps) {
  void props;
  return null;
}
