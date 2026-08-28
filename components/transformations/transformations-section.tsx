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
 * Every entry renders through the same TransformationCard at the same
 * size in a responsive horizontal grid — one card gets a comfortable
 * max-width single column, two+ fill a 2/3-column row depending on
 * viewport. There's no "featured" large-card treatment: with real,
 * mostly-portrait source photography, giving one entry a different
 * aspect ratio made the whole section inconsistent, so every card now
 * shares an identical fixed-ratio image container regardless of count.
 */
export function TransformationsSection({ transformations }: TransformationsSectionProps) {
  if (transformations.length === 0) return null;

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

        <div
          className={`mt-14 grid grid-cols-1 gap-8 sm:gap-10 ${
            transformations.length === 1
              ? "mx-auto max-w-sm"
              : transformations.length === 2
                ? "mx-auto max-w-3xl sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {transformations.map((transformation, index) => (
            <Reveal key={transformation.id} delay={index * 0.08} className="h-full">
              <TransformationCard transformation={transformation} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
