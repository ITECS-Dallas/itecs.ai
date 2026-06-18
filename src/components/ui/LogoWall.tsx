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
          <div className="group chamfer-md flex min-h-[86px] items-center justify-center border border-[var(--card-line)] bg-card px-5 py-4 transition-[border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-itecs-steel">
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              className="max-h-10 w-auto object-contain opacity-70 grayscale transition-[filter,opacity,transform] duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={{ width: "auto" }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
