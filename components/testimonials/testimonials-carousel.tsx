"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import type { Testimonial } from "@/lib/types/content";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

/**
 * Single large editorial testimonial with a slide transition between
 * entries, rather than a 3-column card grid.
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
      <div className="relative min-h-[220px] sm:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display text-balance text-2xl leading-snug text-ink sm:text-3xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              {current.portrait ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface">
                  <Image
                    src={current.portrait}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div>
                <p className="text-sm font-medium text-ink">{current.clientName}</p>
                <p className="text-xs text-ink-muted">
                  {current.category}
                  {current.result ? ` · ${current.result}` : ""}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-ink transition-colors hover:border-ink"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-ink transition-colors hover:border-ink"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
