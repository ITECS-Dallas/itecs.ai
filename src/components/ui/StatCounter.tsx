interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="font-display text-[length:var(--fs-metric)] font-semibold tracking-[-0.01em] text-itecs-blue">
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-ink-muted">
        {label}
      </div>
    </div>
  );
}
