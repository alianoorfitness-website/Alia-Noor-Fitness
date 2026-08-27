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
 * The first `featured` transformation (or the first entry overall) gets a
 * large, editorial single-column treatment; remaining entries fill a
 * secondary grid — this keeps the section from feeling like a flat,
 * repetitive 3-column layout even with only a couple of entries.
 */
export function TransformationsSection({ transformations }: TransformationsSectionProps) {
  if (transformations.length === 0) return null;

  const featuredIndex = transformations.findIndex((t) => t.featured);
  const featured = featuredIndex >= 0 ? transformations[featuredIndex] : transformations[0];
  const rest = transformations.filter((t) => t.id !== featured.id);

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

        <div className="mt-14 flex flex-col gap-14">
          <Reveal className="mx-auto w-full max-w-xl lg:max-w-3xl">
            <TransformationCard transformation={featured} featured />
          </Reveal>

          {rest.length > 0 ? (
            <div
              className={`grid grid-cols-1 gap-14 lg:gap-10 ${
                rest.length === 1 ? "mx-auto max-w-sm" : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {rest.map((transformation, index) => (
                <Reveal key={transformation.id} delay={index * 0.08}>
                  <TransformationCard transformation={transformation} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
