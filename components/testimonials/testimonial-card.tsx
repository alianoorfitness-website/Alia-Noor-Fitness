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
 * to the bottom via `mt-auto` — combined with the marquee track's default
 * flex `align-items: stretch`, every card in a row ends up the same
 * height regardless of quote length, and the name/context always sits in
 * the same position near the bottom of the card.
 */
export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  return (
    <figure
      className={`flex h-full min-h-[260px] flex-col justify-between gap-6 rounded-[1.75rem] border border-surface-border bg-canvas-raised p-7 shadow-[0_20px_45px_-32px_rgba(28,26,25,0.28)] sm:min-h-[280px] sm:p-8 ${className}`}
    >
      <div>
        <span
          aria-hidden="true"
          className="font-display text-5xl leading-none text-accent-soft"
        >
          &ldquo;
        </span>
        <blockquote className="mt-3 text-balance break-words font-display text-xl leading-snug text-ink sm:text-2xl">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        {testimonial.portrait ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-canvas bg-surface shadow-[0_6px_16px_-8px_rgba(28,26,25,0.4)]">
            <Image
              src={testimonial.portrait}
              alt={`Portrait of ${testimonial.clientName}`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-base text-accent-strong"
          >
            {testimonial.clientName.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="break-words font-medium text-ink">{testimonial.clientName}</p>
          <p className="break-words text-sm text-ink-muted">
            {testimonial.category}
            {testimonial.result ? ` · ${testimonial.result}` : ""}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
