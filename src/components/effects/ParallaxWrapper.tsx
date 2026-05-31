import type { ReactNode } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
}: ParallaxWrapperProps) {
  return (
    <div className={className}>
      <div data-motion="parallax" data-parallax-speed={speed}>
        {children}
      </div>
    </div>
  );
}
