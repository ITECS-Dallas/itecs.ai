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
      {eyebrow && (
        <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-4">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl md:text-5xl font-light tracking-[-0.02em] text-text-primary">
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-lg text-text-secondary max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
