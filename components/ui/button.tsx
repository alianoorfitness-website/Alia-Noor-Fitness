import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent" | "accent-outline";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

// Every variant is a complete, mutually exclusive class set (no variant
// relies on a `className` override to change bg-*/border-* utilities) —
// Tailwind's generated CSS order isn't the same as class-string order, so
// concatenating a conflicting override after a variant's classes doesn't
// reliably win. Add a new variant instead of overriding these via className.
const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-accent-strong",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  ghost: "text-ink hover:text-accent",
  /** Warm peach/coral primary CTA — used on the dark hero and final CTA. */
  accent: "bg-accent text-ink hover:bg-accent-strong hover:text-canvas",
  /** Outlined secondary CTA for use over the dark hero gradient. */
  "accent-outline":
    "border border-canvas/30 text-canvas hover:border-canvas hover:bg-canvas/10",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  ComponentPropsWithoutRef<"a"> & { href: string; external: true };

type ButtonProps = ButtonAsLink | ButtonAsButton | ButtonAsAnchor;

/**
 * Shared CTA button used across the homepage (nav, hero, coaching plans,
 * final CTA). Renders as a native anchor (internal same-page hash links or
 * external WhatsApp/mailto links) or a plain button depending on props
 * supplied.
 *
 * Internal links intentionally use a plain `<a>` rather than `next/link`.
 * This site has a single route (`/`), so every internal link is a
 * same-page hash anchor (`#coaching`, `#about`, etc.) — `next/link`'s
 * client-side soft-navigation doesn't reliably trigger the browser's
 * native scroll-to-anchor behavior for hash-only same-page navigations,
 * which was causing clicks to update the URL without scrolling. A native
 * anchor gets correct browser scrolling for free.
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
    return <a {...(rest as ButtonAsLink)} className={classes} />;
  }

  return <button {...(rest as ButtonAsButton)} className={classes} />;
}
