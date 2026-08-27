import { BeforeAfterSlider } from "@/components/transformations/before-after-slider";
import type { Transformation } from "@/lib/types/content";

interface TransformationCardProps {
  transformation: Transformation;
  /** Renders larger, spans more columns — used for the first/featured entry. */
  featured?: boolean;
}

export function TransformationCard({ transformation, featured = false }: TransformationCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <BeforeAfterSlider
        beforeImage={transformation.beforeImage}
        afterImage={transformation.afterImage}
        clientLabel={transformation.clientName}
        tall={featured}
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-medium uppercase tracking-[0.14em] text-accent">
            {transformation.category}
          </p>
          <p className="mt-1 break-words font-display text-lg leading-snug text-ink">
            {transformation.clientName}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-surface-border bg-canvas-raised px-3 py-1.5 text-xs font-medium text-ink-muted">
          {transformation.duration}
        </span>
      </div>
      <p className="break-words text-sm leading-relaxed text-ink-muted">
        {transformation.description}
      </p>
      {transformation.metrics.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {transformation.metrics.map((metric) => (
            <span
              key={metric.label}
              className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-strong"
            >
              {metric.label}: {metric.value}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
