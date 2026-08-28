"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  clientLabel: string;
}

/**
 * Touch- and mouse-friendly before/after comparison slider. Dragging the
 * handle (via pointer events, which unify mouse/touch/pen) reveals more or
 * less of the "after" image over the "before" image beneath it.
 *
 * Uses a fixed portrait aspect ratio (3:4) so the image container is
 * identical for every card regardless of each uploaded photo's own
 * dimensions — most of the source transformation photos are
 * portrait/vertical, so the container is built around that shape rather
 * than letting the tallest image dictate card height. `object-contain`
 * keeps the full photo visible within that fixed box (never cropped or
 * stretched) instead of `object-cover`, which would crop portrait images
 * to fit a wider frame.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  clientLabel,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      setPosition((p) => Math.max(0, p - 4));
    } else if (event.key === "ArrowRight") {
      setPosition((p) => Math.min(100, p + 4));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full touch-none select-none bg-surface"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Image
        src={beforeImage}
        alt={`${clientLabel} before transformation`}
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
        className="pointer-events-none object-contain"
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={`${clientLabel} after transformation`}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
          className="object-contain"
        />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={`Comparison slider for ${clientLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute inset-y-0 flex w-0.5 -translate-x-1/2 cursor-ew-resize flex-col items-center justify-center bg-canvas-raised/80"
        style={{ left: `${position}%` }}
      >
        <span className="glass-panel flex h-8 w-8 items-center justify-center rounded-full text-ink shadow-[0_6px_20px_-8px_rgba(28,26,25,0.4)] sm:h-9 sm:w-9">
          <ArrowsIcon />
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-canvas-raised/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-canvas">
        After
      </span>
    </div>
  );
}

function ArrowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 3 1 8l4 5M11 3l4 5-4 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
