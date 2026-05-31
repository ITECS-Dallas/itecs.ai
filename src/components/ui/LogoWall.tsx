import Image from "next/image";

export type LogoWallItem = {
  readonly name: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

type LogoWallProps = {
  logos: readonly LogoWallItem[];
  columns?: "clients" | "partners";
};

export function LogoWall({ logos, columns = "clients" }: LogoWallProps) {
  const gridClass =
    columns === "partners"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";

  return (
    <ul className={`grid ${gridClass} gap-3 md:gap-4`}>
      {logos.map((logo) => (
        <li key={logo.name}>
          <div className="group flex min-h-[86px] items-center justify-center rounded-lg border border-[var(--border-default)] bg-bg-surface px-5 py-4 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)] transition-[border-color,background-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-[var(--border-strong)] hover:bg-bg-elevated hover:[box-shadow:var(--elev-1-inset),var(--elev-2)]">
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="max-h-10 w-auto object-contain opacity-65 grayscale brightness-0 invert transition-[filter,opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0"
              style={{ width: "auto" }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
