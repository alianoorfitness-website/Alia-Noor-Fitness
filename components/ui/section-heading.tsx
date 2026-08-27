import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small uppercase label above the heading, e.g. "Expertise". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent eyebrow + display heading + supporting copy pattern used at
 * the top of most homepage sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl leading-[1.1] text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-balance text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
