import { TransformationCard } from "@/components/transformations/transformation-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Transformation } from "@/lib/types/content";

interface TransformationsSectionProps {
  transformations: Transformation[];
}

/**
 * Renders client transformations as drag-to-compare before/after sliders.
 * Data comes from Sanity via app/page.tsx (see lib/sanity/queries.ts and
 * lib/sanity/mappers.ts) — this component has no knowledge of Sanity and
 * no fallback to mock data, so it hides itself entirely when there are no
 * published transformations rather than ever showing fabricated content.
 *
 * Desktop (`sm`+): a real CSS grid — 3 columns for 3+, 2 for exactly 2, a
 * single centered column for 1.
 *
 * Mobile: a horizontally swipeable row (scroll-snap), not a stacked
 * list. Each card is sized so the next one peeks in from the right edge
 * ("Full Card] [Partial Next →"), signaling more content is available
 * without needing every card's full height. `overflow-x-auto` is scoped
 * to this row only — the section/page itself never overflows.
 */
export function TransformationsSection({ transformations }: TransformationsSectionProps) {
  if (transformations.length === 0) return null;

  const isSingle = transformations.length === 1;

  return (
    <section id="transformations" className="scroll-anchor py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Transformations"
            title="Real change, built one plan at a time."
            description="Drag the slider to compare. Every transformation below reflects a program built around a specific goal — fat loss, recovery, or strength."
            className="max-w-2xl"
          />
        </Reveal>
      </div>

      <div className="mt-10 sm:mt-14">
        <div
          className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-auto sm:max-w-6xl sm:grid sm:snap-none sm:gap-8 sm:overflow-visible sm:px-8 sm:pb-0 ${
            isSingle
              ? "sm:mx-auto sm:max-w-sm"
              : transformations.length === 2
                ? "sm:mx-auto sm:max-w-3xl sm:grid-cols-2"
                : "sm:grid-cols-3"
          }`}
        >
          {transformations.map((transformation, index) => (
            <Reveal
              key={transformation.id}
              delay={index * 0.08}
              className={`h-full shrink-0 snap-start sm:w-auto sm:shrink ${
                isSingle ? "w-[85%] max-w-[300px]" : "w-[78%] max-w-[280px]"
              }`}
            >
              <TransformationCard transformation={transformation} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
