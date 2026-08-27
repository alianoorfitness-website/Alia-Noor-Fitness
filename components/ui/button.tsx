import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-accent-strong",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  ghost: "text-ink hover:text-accent",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  ComponentPropsWithoutRef<"a"> & { href: string; external: true };

type ButtonProps = ButtonAsLink | ButtonAsButton | ButtonAsAnchor;

/**
 * Shared CTA button used across the homepage (nav, hero, coaching plans,
 * final CTA). Renders as an internal Link, an external anchor (for
 * WhatsApp/mailto links), or a plain button depending on props supplied.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    if ("external" in props && props.external) {
      const { external, ...anchorProps } = rest as ButtonAsAnchor;
      void external;
      return (
        <a
          {...anchorProps}
          className={classes}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noopener noreferrer"}
        />
      );
    }
    return <Link {...(rest as ButtonAsLink)} className={classes} />;
  }

  return <button {...(rest as ButtonAsButton)} className={classes} />;
}
