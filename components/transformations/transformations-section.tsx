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
 */
export function TransformationsSection({ transformations }: TransformationsSectionProps) {
  if (transformations.length === 0) return null;

  return (
    <section id="transformations" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Transformations"
            title="Real change, built one plan at a time."
            description="Drag the slider to compare. Every transformation below reflects a program built around a specific goal — fat loss, recovery, or strength."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {transformations.map((transformation, index) => (
            <Reveal key={transformation.id} delay={index * 0.08}>
              <TransformationCard transformation={transformation} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
