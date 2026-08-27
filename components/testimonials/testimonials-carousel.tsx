"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import type { Testimonial } from "@/lib/types/content";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

/**
 * Large editorial testimonial with a slide transition between entries.
 * Navigation controls (dots + arrows) only render when there's more than
 * one testimonial — a single testimonial shows as a clean static quote
 * with no controls implying more content exists.
 */
export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const go = (direction: 1 | -1) => {
    setIndex((prev) => (prev + direction + testimonials.length) % testimonials.length);
  };

  if (!current) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="relative min-h-[260px] sm:min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
          >
            <span
              aria-hidden="true"
              className="font-display text-6xl leading-none text-accent-soft sm:text-7xl"
            >
              &ldquo;
            </span>
            <div className="min-w-0 flex-1">
              <blockquote className="text-balance break-words font-display text-2xl leading-snug text-ink sm:text-3xl">
                {current.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                {current.portrait ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-canvas-raised bg-surface shadow-[0_8px_20px_-10px_rgba(28,26,25,0.4)]">
                    <Image
                      src={current.portrait}
                      alt={`Portrait of ${current.clientName}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-lg text-accent-strong"
                  >
                    {current.clientName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="break-words font-medium text-ink">{current.clientName}</p>
                  <p className="break-words text-sm text-ink-muted">
                    {current.category}
                    {current.result ? ` · ${current.result}` : ""}
                  </p>
                </div>
              </figcaption>
            </div>
          </motion.figure>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 ? (
        <div className="flex items-center gap-3 sm:pl-[4.5rem]">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${testimonial.clientName}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-4 bg-surface-border"
              }`}
            />
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-ink transition-colors hover:border-ink hover:bg-canvas-raised"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-ink transition-colors hover:border-ink hover:bg-canvas-raised"
            >
              &rarr;
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
