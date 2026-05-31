type CertificationBadge = {
  readonly label: string;
  readonly detail: string;
};

type CertificationStripProps = {
  badges: readonly CertificationBadge[];
  className?: string;
};

export function CertificationStrip({
  badges,
  className = "",
}: CertificationStripProps) {
  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {badges.map((badge) => (
          <li key={badge.label}>
            <span
              title={badge.detail}
              className="flex min-h-10 items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface px-3 py-2 text-center font-mono text-xs uppercase text-text-secondary transition-[border-color,background-color,color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-[var(--border-strong)] hover:bg-bg-elevated hover:text-text-primary"
            >
              {badge.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
