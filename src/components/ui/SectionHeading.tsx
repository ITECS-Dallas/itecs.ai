interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="font-display text-3xl md:text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink">
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-lg text-ink-body max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
