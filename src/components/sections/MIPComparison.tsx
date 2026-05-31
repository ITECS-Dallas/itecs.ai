import { MIP_COMPARISON } from "@/lib/constants";
import { ComparisonTable, type ComparisonRow } from "@/components/ui/Structural";
import { SectionHeading } from "@/components/ui/SectionHeading";

function getTone(mark: string) {
  return mark === "✓" ? "success" : "muted";
}

function renderCell(cell: { mark: string; detail: string }) {
  return (
    <span className="grid gap-1">
      <span className="font-mono text-lg font-semibold leading-none">
        {cell.mark}
      </span>
      <span className="text-sm leading-relaxed">{cell.detail}</span>
    </span>
  );
}

const rows: ComparisonRow[] = MIP_COMPARISON.rows.map((row) => ({
  label: row.label,
  cells: [
    {
      value: renderCell(row.msp),
      tone: getTone(row.msp.mark),
    },
    {
      value: renderCell(row.mip),
      tone: getTone(row.mip.mark),
    },
  ],
}));

export function MIPComparison() {
  return (
    <section className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow={MIP_COMPARISON.eyebrow}
          title={MIP_COMPARISON.title}
          description={MIP_COMPARISON.description}
        />

        <ComparisonTable
          className="mt-12"
          columns={MIP_COMPARISON.columns}
          rows={rows}
          caption="MSP versus Managed Intelligence Provider capability comparison"
        />
      </div>
    </section>
  );
}
