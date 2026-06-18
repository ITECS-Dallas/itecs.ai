import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldTone = "default" | "error" | "success";
type StatusTone = "error" | "success";

interface FieldShellProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  successMessage?: ReactNode;
  className?: string;
  children: (props: {
    describedBy?: string;
    tone: FieldTone;
    labelId: string;
  }) => ReactNode;
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name"> {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  successMessage?: ReactNode;
  wrapperClassName?: string;
}

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "name"> {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  successMessage?: ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name"> {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  successMessage?: ReactNode;
  wrapperClassName?: string;
}

interface CheckboxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type"> {
  id: string;
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  successMessage?: ReactNode;
  wrapperClassName?: string;
}

interface FormStatusProps {
  tone: StatusTone;
  message: ReactNode;
  id?: string;
  className?: string;
}

const baseControlClasses =
  "w-full rounded-none border-[1.5px] bg-card px-4 py-3 text-base text-ink transition-[border-color,box-shadow,background-color] duration-[var(--dur-base)] ease-[var(--ease-out)] placeholder:text-ink-faint focus:border-itecs-blue focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] disabled:cursor-not-allowed disabled:border-[var(--border-default)] disabled:bg-canvas-sunken disabled:text-text-disabled";

const toneClasses: Record<FieldTone, string> = {
  default: "border-[var(--border-strong)]",
  error: "border-[var(--danger)]",
  success: "border-[var(--success)]",
};

const messageClasses: Record<StatusTone, string> = {
  error: "border-[var(--danger)] text-danger",
  success: "border-[var(--success)] text-success",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  successMessage,
  className,
  children,
}: FieldShellProps) {
  const tone: FieldTone = error ? "error" : successMessage ? "success" : "default";
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const successId = successMessage ? `${id}-success` : undefined;
  const describedBy = [hintId, errorId, successId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("space-y-2", className)}>
      <label id={labelId} htmlFor={id} className="block text-sm font-medium text-text-secondary">
        {label}
        {required ? (
          <span className="ml-1 text-brand" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children({ describedBy, tone, labelId })}
      {hint ? (
        <p id={hintId} className="text-sm leading-relaxed text-text-tertiary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm leading-relaxed text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {successMessage ? (
        <p id={successId} className="text-sm leading-relaxed text-success">
          {successMessage}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  id,
  name,
  label,
  hint,
  error,
  successMessage,
  wrapperClassName,
  className,
  required,
  ...inputProps
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      successMessage={successMessage}
      required={required}
      className={wrapperClassName}
    >
      {({ describedBy, tone, labelId }) => (
        <input
          {...inputProps}
          id={id}
          name={name}
          required={required}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={tone === "error" || undefined}
          aria-required={required || undefined}
          className={joinClasses(baseControlClasses, toneClasses[tone], className)}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  id,
  name,
  label,
  hint,
  error,
  successMessage,
  options,
  placeholder,
  wrapperClassName,
  className,
  required,
  children,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      successMessage={successMessage}
      required={required}
      className={wrapperClassName}
    >
      {({ describedBy, tone, labelId }) => (
        <select
          {...selectProps}
          id={id}
          name={name}
          required={required}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={tone === "error" || undefined}
          aria-required={required || undefined}
          className={joinClasses(baseControlClasses, toneClasses[tone], className)}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  name,
  label,
  hint,
  error,
  successMessage,
  wrapperClassName,
  className,
  required,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      successMessage={successMessage}
      required={required}
      className={wrapperClassName}
    >
      {({ describedBy, tone, labelId }) => (
        <textarea
          {...textareaProps}
          id={id}
          name={name}
          required={required}
          aria-labelledby={labelId}
          aria-describedby={describedBy}
          aria-invalid={tone === "error" || undefined}
          aria-required={required || undefined}
          className={joinClasses(
            baseControlClasses,
            "min-h-32 resize-y",
            toneClasses[tone],
            className,
          )}
        />
      )}
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  name,
  label,
  hint,
  error,
  successMessage,
  wrapperClassName,
  className,
  required,
  ...checkboxProps
}: CheckboxFieldProps) {
  const tone: FieldTone = error ? "error" : successMessage ? "success" : "default";
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const successId = successMessage ? `${id}-success` : undefined;
  const describedBy = [hintId, errorId, successId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={joinClasses("space-y-2", wrapperClassName)}>
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-text-secondary">
        <input
          {...checkboxProps}
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-describedby={describedBy}
          aria-invalid={tone === "error" || undefined}
          aria-required={required || undefined}
          className={joinClasses(
            "mt-0.5 h-5 w-5 shrink-0 rounded-none border-[1.5px] bg-card text-itecs-blue accent-[var(--itecs-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] focus:ring-offset-2 focus:ring-offset-bg-base",
            toneClasses[tone],
            className,
          )}
        />
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-brand" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
      </label>
      {hint ? (
        <p id={hintId} className="pl-8 text-sm leading-relaxed text-text-tertiary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="pl-8 text-sm leading-relaxed text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {successMessage ? (
        <p id={successId} className="pl-8 text-sm leading-relaxed text-success">
          {successMessage}
        </p>
      ) : null}
    </div>
  );
}

export function FormStatus({ tone, message, id, className }: FormStatusProps) {
  return (
    <p
      id={id}
      className={joinClasses(
        "chamfer-sm border bg-card px-4 py-3 text-sm leading-relaxed",
        messageClasses[tone],
        className,
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      {message}
    </p>
  );
}
