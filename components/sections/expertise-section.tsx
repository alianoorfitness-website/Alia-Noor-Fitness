import { ExpertiseList } from "@/components/sections/expertise-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ExpertiseResult } from "@/lib/sanity/types";

export interface ExpertiseGroup {
  category: string;
  items: { id: string; title: string }[];
}

interface ExpertiseSectionProps {
  items: ExpertiseResult[];
}

/**
 * Groups flat Sanity expertise documents by their `category` field
 * (preserving first-seen category order, which follows each item's `order`
 * since the query is already sorted) before handing them to the
 * interactive list component.
 */
function groupByCategory(items: ExpertiseResult[]): ExpertiseGroup[] {
  const groups: ExpertiseGroup[] = [];
  const indexByCategory = new Map<string, number>();

  for (const item of items) {
    let groupIndex = indexByCategory.get(item.category);
    if (groupIndex === undefined) {
      groupIndex = groups.length;
      indexByCategory.set(item.category, groupIndex);
      groups.push({ category: item.category, items: [] });
    }
    groups[groupIndex].items.push({ id: item._id, title: item.title });
  }

  return groups;
}

/**
 * Editorial expertise section: grouped categories rendered as an
 * interactive numbered list rather than a grid of identical cards.
 * Renders nothing if there are no active expertise items in Sanity.
 */
export function ExpertiseSection({ items }: ExpertiseSectionProps) {
  const groups = groupByCategory(items);

  if (groups.length === 0) return null;

  return (
    <section id="expertise" className="scroll-anchor bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Expertise"
            title="A coaching system, not a workout plan."
            description="Every service below folds into one coaching relationship — movement quality, strength, and nutrition working together rather than in isolation."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-14">
          <ExpertiseList groups={groups} />
        </div>
      </div>
    </section>
  );
}
