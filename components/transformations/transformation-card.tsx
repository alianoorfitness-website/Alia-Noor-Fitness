import { BeforeAfterSlider } from "@/components/transformations/before-after-slider";
import type { Transformation } from "@/lib/types/content";

interface TransformationCardProps {
  transformation: Transformation;
}

/**
 * Compact, editorial transformation card: a fixed-aspect-ratio (portrait,
 * ~3:4) before/after image area on top, metadata below, everything the
 * same height and shape regardless of card position. The image area's
 * dimensions never depend on the source photo's own dimensions — see
 * BeforeAfterSlider's fixed aspect-[3/4] — which is what keeps every card
 * uniform whether there's one transformation or six.
 *
 * Sized comfortably at every viewport: on mobile the section shows one
 * full card plus a peek of the next (horizontal swipe), so this card
 * doesn't need the extra-compact typography a "fit everything on screen
 * at once" layout would require.
 */
export function TransformationCard({ transformation }: TransformationCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-canvas-raised shadow-[0_20px_45px_-32px_rgba(28,26,25,0.35)]">
      <BeforeAfterSlider
        beforeImage={transformation.beforeImage}
        afterImage={transformation.afterImage}
        clientLabel={transformation.clientName}
      />
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex flex-wrap items-start justify-between gap-1.5">
          <div className="min-w-0">
            <p className="break-words text-[10px] font-medium uppercase tracking-[0.12em] text-accent">
              {transformation.category}
            </p>
            <p className="mt-0.5 break-words font-display text-base font-medium leading-snug text-ink">
              {transformation.clientName}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-surface-border bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-muted">
            {transformation.duration}
          </span>
        </div>
        {transformation.metrics.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-0.5">
            {transformation.metrics.map((metric) => (
              <span
                key={metric.label}
                className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent-strong"
              >
                {metric.label}: {metric.value}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
