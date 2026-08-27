import { BeforeAfterSlider } from "@/components/transformations/before-after-slider";
import type { Transformation } from "@/lib/types/content";

interface TransformationCardProps {
  transformation: Transformation;
}

export function TransformationCard({ transformation }: TransformationCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <BeforeAfterSlider
        beforeImage={transformation.beforeImage}
        afterImage={transformation.afterImage}
        clientLabel={transformation.clientName}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            {transformation.category}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {transformation.description}
          </p>
        </div>
        {transformation.metric ? (
          <span className="shrink-0 rounded-full border border-surface-border bg-canvas-raised px-3 py-1.5 text-sm font-medium text-ink">
            {transformation.metric}
          </span>
        ) : null}
      </div>
      <p className="text-xs text-ink-faint">{transformation.duration}</p>
    </div>
  );
}
