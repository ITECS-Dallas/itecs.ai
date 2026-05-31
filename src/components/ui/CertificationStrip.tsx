type CertificationBadge = {
  readonly label: string;
  readonly detail: string;
  readonly sourceHref?: string;
  readonly sourceLabel?: string;
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
        {badges.map((badge) => {
          const content = (
            <>
              <span>{badge.label}</span>
              {badge.sourceLabel ? (
                <span className="mt-1 block text-[0.62rem] normal-case text-text-tertiary">
                  {badge.sourceLabel}
                </span>
              ) : null}
            </>
          );
          const classes =
            "flex min-h-12 flex-col items-center justify-center rounded-md border border-[var(--border-default)] bg-bg-surface px-3 py-2 text-center font-mono text-xs uppercase text-text-secondary transition-[border-color,background-color,color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-[var(--border-strong)] hover:bg-bg-elevated hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

          return (
            <li key={badge.label}>
              {badge.sourceHref ? (
                <a
                  href={badge.sourceHref}
                  target="_blank"
                  rel="noreferrer"
                  title={badge.detail}
                  className={classes}
                  aria-label={`${badge.label}: ${badge.detail}`}
                >
                  {content}
                </a>
              ) : (
                <span title={badge.detail} className={classes}>
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
