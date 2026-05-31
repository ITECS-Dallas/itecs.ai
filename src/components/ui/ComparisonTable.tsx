import type { ReactNode } from "react";

export interface ComparisonColumn {
  id: string;
  label: ReactNode;
}

type ComparisonTone = "default" | "brand" | "success" | "muted";

export type ComparisonCell =
  | ReactNode
  | {
      value: ReactNode;
      tone?: ComparisonTone;
    };

export interface ComparisonRow {
  label: ReactNode;
  cells: ComparisonCell[];
}

interface ComparisonTableProps {
  columns: readonly ComparisonColumn[];
  rows: readonly ComparisonRow[];
  caption?: ReactNode;
  className?: string;
}

const comparisonToneClasses: Record<ComparisonTone, string> = {
  default: "text-text-secondary",
  brand: "text-brand-hover",
  success: "text-[var(--success)]",
  muted: "text-text-tertiary",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isStructuredCell(
  cell: ComparisonCell,
): cell is { value: ReactNode; tone?: ComparisonTone } {
  return typeof cell === "object" && cell !== null && "value" in cell;
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  className,
}: ComparisonTableProps) {
  return (
    <div
      className={joinClasses(
        "overflow-x-auto rounded-lg border border-[var(--border-default)]",
        className,
      )}
      tabIndex={0}
    >
      <table className="min-w-[720px] border-collapse bg-bg-surface text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="sticky top-0 z-10 bg-bg-elevated text-text-primary">
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-20 border-b border-[var(--border-default)] bg-bg-elevated px-5 py-4 font-semibold shadow-[1px_0_0_var(--border-default)]"
            >
              Capability
            </th>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="border-b border-[var(--border-default)] px-5 py-4 font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowBg = rowIndex % 2 === 0 ? "bg-bg-surface" : "bg-bg-sunken";

            return (
              <tr key={rowIndex} className={rowBg}>
                <th
                  scope="row"
                  className={joinClasses(
                    "sticky left-0 z-10 px-5 py-4 font-semibold text-text-primary shadow-[1px_0_0_var(--border-default)]",
                    rowBg,
                  )}
                >
                  {row.label}
                </th>
                {columns.map((column, columnIndex) => {
                  const cell = row.cells[columnIndex];
                  const structuredCell = isStructuredCell(cell);
                  const value = structuredCell ? cell.value : cell;
                  const tone = structuredCell ? cell.tone ?? "default" : "default";

                  return (
                    <td
                      key={column.id}
                      className={joinClasses(
                        "px-5 py-4",
                        comparisonToneClasses[tone],
                      )}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
