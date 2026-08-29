import Image from "next/image";

import type { Testimonial } from "@/lib/types/content";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/**
 * A single testimonial's visual presentation, shared by the marquee (one
 * card per slot) and the single-testimonial static fallback. Uses a
 * flex-column layout with the quote at the top and the client info pinned
 * to the bottom via `justify-between` — combined with the marquee
 * track's default flex `align-items: stretch`, every card in a row ends
 * up the same height regardless of quote length, and the name/context
 * always sits in the same position near the bottom of the card.
 *
 * Deliberately compact (per the premium-editorial redesign) — a fixed
 * `min-h` plus `line-clamp` on the quote keeps every card the same size
 * regardless of how long a given testimonial's text is, rather than
 * letting content length drive card height.
 */
export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <figure
      className={`flex h-full min-h-[190px] flex-col justify-between gap-4 rounded-2xl border border-surface-border bg-canvas-raised p-5 shadow-[0_16px_35px_-28px_rgba(28,26,25,0.28)] ${className}`}
    >
      <div>
        <span aria-hidden="true" className="font-display text-2xl leading-none text-accent-soft">
          &ldquo;
        </span>
        <blockquote className="mt-1 line-clamp-4 text-balance break-words text-sm leading-relaxed text-ink">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-2.5">
        {testimonial.portrait ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-canvas bg-surface">
            <Image
              src={testimonial.portrait}
              alt={`Portrait of ${testimonial.clientName}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm text-accent-strong"
          >
            {testimonial.clientName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-ink">{testimonial.clientName}</p>
          <p className="break-words text-xs text-ink-muted">
            {testimonial.category ?? testimonial.result ?? ""}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
