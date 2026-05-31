"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from "react";
import { ANALYTICS_EVENTS, trackConversionEvent } from "@/lib/analytics";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "icon";
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
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md font-semibold tracking-normal transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--border-default)] disabled:bg-bg-elevated disabled:text-text-disabled disabled:shadow-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-brand text-white shadow-[0_8px_24px_var(--brand-subtle)] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:opacity-0 before:transition-[transform,opacity] before:duration-[var(--dur-slow)] before:ease-[var(--ease-out)] before:[background:var(--gradient-intelligence)] hover:-translate-y-0.5 hover:bg-brand-hover hover:text-text-onaccent hover:shadow-[0_12px_32px_var(--brand-subtle)] hover:before:translate-x-0 hover:before:opacity-20 active:translate-y-0 active:bg-brand-active active:text-white",
  secondary:
    "border border-[var(--border-strong)] bg-transparent text-text-primary hover:-translate-y-0.5 hover:border-[var(--text-tertiary)] hover:bg-bg-elevated active:translate-y-0 active:bg-[var(--surface-3)]",
  tertiary:
    "border border-transparent bg-transparent px-0 text-brand-hover hover:text-text-primary active:text-brand",
  icon:
    "border border-[var(--border-default)] bg-bg-elevated text-text-primary shadow-[var(--elev-1-inset)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-3)] active:translate-y-0",
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
          className="relative z-10 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/button:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const linkProps = getLinkProps(props);
    const { href } = props;
    const { rel, target, onClick } = linkProps;
    const safeRel =
      target === "_blank" && !rel ? "noopener noreferrer" : rel;
    const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const ctaType = getTrackedCtaType(href);

      if (ctaType) {
        trackConversionEvent(ANALYTICS_EVENTS.ctaClick, {
          cta_type: ctaType,
          destination: href,
        });
      }
    };

    if (disabled) {
      return (
        <span
          {...linkProps}
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
        href={href}
        rel={safeRel}
        target={target}
        onClick={handleClick}
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
