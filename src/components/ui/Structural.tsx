"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type AccentTone = "default" | "brand" | "cyan" | "success" | "warning" | "danger";

interface EyebrowProps {
  children: ReactNode;
  tone?: Extract<AccentTone, "brand" | "cyan" | "warning">;
  className?: string;
}

interface BadgeProps {
  children: ReactNode;
  tone?: AccentTone;
  className?: string;
}

interface SectionDividerProps {
  variant?: "line" | "grid";
  className?: string;
}

interface LiveIndicatorProps {
  label?: string;
  className?: string;
}

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string | null;
  className?: string;
}

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

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

const badgeToneClasses: Record<AccentTone, string> = {
  default: "border-[var(--border-default)] bg-bg-elevated text-text-secondary",
  brand: "border-[var(--brand)] bg-brand-subtle text-brand-hover",
  cyan: "border-[var(--accent-cyan)] bg-cyan-subtle text-brand-accent",
  success: "border-[var(--success)] bg-bg-elevated text-success",
  warning: "border-[var(--warning)] bg-bg-elevated text-amber",
  danger: "border-[var(--danger)] bg-bg-elevated text-danger",
};

const eyebrowToneClasses: Record<Required<EyebrowProps>["tone"], string> = {
  brand: "text-brand-hover before:bg-brand",
  cyan: "text-brand-accent before:bg-brand-accent",
  warning: "text-amber before:bg-amber",
};

const comparisonToneClasses: Record<ComparisonTone, string> = {
  default: "text-text-secondary",
  brand: "text-brand-hover",
  success: "text-[var(--success)]",
  muted: "text-text-tertiary",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function focusByIndex(
  refs: Array<HTMLButtonElement | null>,
  nextIndex: number,
) {
  const boundedIndex = (nextIndex + refs.length) % refs.length;
  refs[boundedIndex]?.focus();
}

function isStructuredCell(cell: ComparisonCell): cell is { value: ReactNode; tone?: ComparisonTone } {
  return typeof cell === "object" && cell !== null && "value" in cell;
}

export function Eyebrow({ children, tone = "brand", className }: EyebrowProps) {
  return (
    <p
      className={joinClasses(
        "before:content-[''] flex items-center gap-3 font-mono text-[length:var(--fs-eyebrow)] font-semibold uppercase tracking-normal before:h-px before:w-6",
        eyebrowToneClasses[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center rounded-pill border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-normal",
        badgeToneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionDivider({ variant = "line", className }: SectionDividerProps) {
  if (variant === "grid") {
    return (
      <div
        aria-hidden="true"
        className={joinClasses(
          "h-12 border-y border-[var(--border-subtle)] bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:24px_24px] opacity-70",
          className,
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={joinClasses("h-px w-full bg-[var(--border-subtle)]", className)}
    />
  );
}

export function LiveIndicator({ label = "Live", className }: LiveIndicatorProps) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase text-brand-accent",
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-accent-cyan opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-pill bg-accent-cyan" />
      </span>
      {label}
    </span>
  );
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId === undefined ? items[0]?.id ?? null : defaultOpenId,
  );
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function setButtonRef(index: number) {
    return (node: HTMLButtonElement | null) => {
      buttonRefs.current[index] = node;
    };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number, id: string) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusByIndex(buttonRefs.current, index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusByIndex(buttonRefs.current, index - 1);
        break;
      case "Home":
        event.preventDefault();
        buttonRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        buttonRefs.current[items.length - 1]?.focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setOpenId((current) => (current === id ? null : id));
        break;
      default:
        break;
    }
  }

  return (
    <div className={joinClasses("rounded-lg border border-[var(--border-default)] bg-bg-surface", className)}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={joinClasses(index > 0 && "border-t border-[var(--border-subtle)]")}
          >
            <button
              ref={setButtonRef(index)}
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              onKeyDown={(event) => handleKeyDown(event, index, item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-text-primary transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] hover:bg-bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-inset"
            >
              <span>{item.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={joinClasses(
                  "h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-text-secondary"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Tabs({ items, defaultValue, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultValue ?? items[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function setTabRef(index: number) {
    return (node: HTMLButtonElement | null) => {
      tabRefs.current[index] = node;
    };
  }

  function activateIndex(index: number) {
    const boundedIndex = (index + items.length) % items.length;
    const item = items[boundedIndex];
    if (!item) {
      return;
    }
    setActiveId(item.id);
    tabRefs.current[boundedIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        activateIndex(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        activateIndex(index - 1);
        break;
      case "Home":
        event.preventDefault();
        activateIndex(0);
        break;
      case "End":
        event.preventDefault();
        activateIndex(items.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setActiveId(items[index]?.id);
        break;
      default:
        break;
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-1 border-b border-[var(--border-default)]"
      >
        {items.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={setTabRef(index)}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={joinClasses(
                "relative px-4 py-3 text-sm font-semibold text-text-secondary transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-inset",
                isActive && "text-text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-brand",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <div
            key={item.id}
            id={`tabpanel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            tabIndex={0}
            hidden={!isActive}
            className="pt-6 text-sm leading-relaxed text-text-secondary"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  className,
}: ComparisonTableProps) {
  return (
    <div
      className={joinClasses("overflow-x-auto rounded-lg border border-[var(--border-default)]", className)}
      tabIndex={0}
    >
      <table className="min-w-[720px] border-collapse bg-bg-surface text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="sticky top-0 z-10 bg-bg-elevated text-text-primary">
          <tr>
            <th scope="col" className="sticky left-0 z-20 border-b border-[var(--border-default)] bg-bg-elevated px-5 py-4 font-semibold shadow-[1px_0_0_var(--border-default)]">
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
