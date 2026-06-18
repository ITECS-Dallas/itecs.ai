import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "icon"
  | "ondark"
  | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
}

type NativeButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | "href"> & {
    href: string;
    disabled?: boolean;
  };

export type ButtonProps = NativeButtonProps | ButtonLinkProps;

const baseClasses =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-[10px] font-semibold tracking-normal transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--border-default)] disabled:bg-bg-elevated disabled:text-text-disabled disabled:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0";

const variantClasses: Record<ButtonVariant, string> = {
  // PRIMARY — solid ITECS blue, white text, soft brand-tinted shadow.
  primary:
    "border border-transparent bg-itecs-blue text-white shadow-[0_12px_28px_rgba(0,71,117,0.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,71,117,0.34)] active:translate-y-0 active:bg-[var(--brand-active)]",
  // SECONDARY (on light) — outline; hover tints toward the canvas band.
  secondary:
    "border border-[var(--border-strong)] bg-transparent text-ink hover:-translate-y-0.5 hover:border-itecs-steel hover:bg-canvas-sunken active:translate-y-0",
  // TERTIARY — the demoted text-link CTA.
  tertiary:
    "border border-transparent bg-transparent px-0 text-itecs-blue hover:text-ink active:text-[var(--brand-active)]",
  icon:
    "border border-[var(--card-line)] bg-card text-ink shadow-[var(--elev-1-inset)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-canvas-sunken active:translate-y-0",
  // ON-DARK — white fill, ITECS-blue text (for the blue CTA band).
  ondark:
    "border border-transparent bg-white text-itecs-blue shadow-[0_14px_30px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 hover:bg-[#f3f6f9] active:translate-y-0",
  // GHOST (on dark) — transparent, hairline white border.
  ghost:
    "border border-white/40 bg-transparent text-white hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/5 active:translate-y-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-[52px] px-7 text-base",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 w-11 p-0",
  md: "h-11 w-11 p-0",
  lg: "h-[52px] w-[52px] p-0",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getLinkProps(props: ButtonLinkProps) {
  const linkProps: Partial<ButtonLinkProps> = { ...props };
  delete linkProps.children;
  delete linkProps.className;
  delete linkProps.disabled;
  delete linkProps.href;
  delete linkProps.icon;
  delete linkProps.size;
  delete linkProps.variant;

  return linkProps as AnchorHTMLAttributes<HTMLAnchorElement>;
}

function getNativeButtonProps(props: NativeButtonProps) {
  const buttonProps: Partial<NativeButtonProps> = { ...props };
  delete buttonProps.children;
  delete buttonProps.className;
  delete buttonProps.href;
  delete buttonProps.icon;
  delete buttonProps.size;
  delete buttonProps.variant;

  return buttonProps as ButtonHTMLAttributes<HTMLButtonElement>;
}

function getTrackedCtaType(href: string) {
  if (href === "/assessment" || href.startsWith("/assessment#")) {
    return "assessment";
  }

  if (href === "/contact" || href.startsWith("/contact#")) {
    return "contact";
  }

  if (href.startsWith("tel:")) {
    return "phone";
  }

  return null;
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    disabled,
  } = props;
  const isIconButton = variant === "icon";

  const classes = joinClasses(
    baseClasses,
    variantClasses[variant],
    isIconButton ? iconSizeClasses[size] : sizeClasses[size],
    disabled && "pointer-events-none cursor-not-allowed opacity-70",
    className,
  );

  const content = (
    <>
      {icon ? (
        <span
          aria-hidden="true"
          className={joinClasses("relative z-10 inline-flex", !children && "m-0")}
        >
          {icon}
        </span>
      ) : null}
      {children ? <span className="relative z-10">{children}</span> : null}
      {variant === "tertiary" ? (
        <span
          aria-hidden="true"
          className="relative z-10 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/button:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/button:translate-x-0"
        >
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const linkProps = getLinkProps(props);
    const { href } = props;
    const { rel, target } = linkProps;
    const safeRel =
      target === "_blank" && !rel ? "noopener noreferrer" : rel;
    const ctaType = getTrackedCtaType(href);
    const ctaTrackingProps = ctaType
      ? {
          "data-cta-type": ctaType,
          "data-cta-destination": href,
        }
      : {};

    if (disabled) {
      return (
        <span
          {...linkProps}
          {...ctaTrackingProps}
          aria-disabled="true"
          className={classes}
          role="link"
        >
          {content}
        </span>
      );
    }

    return (
      <Link
        {...linkProps}
        {...ctaTrackingProps}
        href={href}
        rel={safeRel}
        target={target}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  const buttonOnlyProps = props as NativeButtonProps;
  const buttonProps = getNativeButtonProps(buttonOnlyProps);

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
