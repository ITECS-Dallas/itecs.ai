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
      <div className="font-mono text-[length:var(--fs-metric)] font-semibold tracking-normal text-brand">
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium tracking-[0.05em] uppercase text-text-dim">
        {label}
      </div>
    </div>
  );
}
