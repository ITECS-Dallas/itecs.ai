import type { CSSProperties, ElementType, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------------------------------------------------------------------
   EYEBROW — mono, wide-tracked, uppercase. Precedes most headlines.
   The rhythm anchor of the Intelligence system.
   --------------------------------------------------------------------------- */
interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Render a leading diamond marker before the text. */
  marker?: boolean;
  as?: ElementType;
}

export function Eyebrow({ children, className, marker = false, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag className={cx("eyebrow inline-flex items-center gap-2", className)}>
      {marker ? <Diamond className="sm" /> : null}
      <span>{children}</span>
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   DIAMOND — rotated square. The universal bullet / list marker.
   Replaces every round dot. Pass `sm` via className for the smaller size.
   --------------------------------------------------------------------------- */
interface DiamondProps {
  className?: string;
  style?: CSSProperties;
}

export function Diamond({ className, style }: DiamondProps) {
  return <span aria-hidden="true" className={cx("diamond", className)} style={style} />;
}

/* ---------------------------------------------------------------------------
   HEX — the AI / "intelligence" mark. Hard-edged six planes.
   Used for step badges, avatar frames, and small accents. Never a circle.
   --------------------------------------------------------------------------- */
interface HexProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Hex({ children, className, style }: HexProps) {
  return (
    <span className={cx("hex inline-flex items-center justify-center", className)} style={style}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   CHAMFER — signature notched corner. Wrap any card / chip / tag.
   A border still shows through the clip and is used to color the edge.
   --------------------------------------------------------------------------- */
type ChamferSize = "sm" | "md" | "lg";
const chamferClass: Record<ChamferSize, string> = {
  sm: "chamfer-sm",
  md: "chamfer-md",
  lg: "chamfer-lg",
};

interface ChamferProps {
  children: ReactNode;
  className?: string;
  size?: ChamferSize;
  style?: CSSProperties;
  as?: ElementType;
}

export function Chamfer({
  children,
  className,
  size = "md",
  style,
  as: Tag = "div",
}: ChamferProps) {
  return (
    <Tag className={cx(chamferClass[size], className)} style={style}>
      {children}
    </Tag>
  );
}
