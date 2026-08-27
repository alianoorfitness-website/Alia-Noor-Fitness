import { ExpertiseIcon } from "@/components/sections/expertise-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ExpertiseResult } from "@/lib/sanity/types";

export interface ExpertiseGroup {
  category: string;
  items: ExpertiseResult[];
}

interface ExpertiseSectionProps {
  items: ExpertiseResult[];
}

/**
 * Groups flat Sanity expertise documents by their `category` field
 * (preserving first-seen category order, which follows each item's `order`
 * since the query is already sorted).
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
    groups[groupIndex].items.push(item);
  }

  return groups;
}

/**
 * Premium program/service card grid, grouped by category. Renders nothing
 * if there are no active expertise items in Sanity.
 */
export function ExpertiseSection({ items }: ExpertiseSectionProps) {
  const groups = groupByCategory(items);

  if (groups.length === 0) return null;

  return (
    <section id="expertise" className="scroll-anchor bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Expertise"
            title="A coaching system, not a workout plan."
            description="Every program below folds into one coaching relationship — movement quality, strength, and nutrition working together rather than in isolation."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-14">
          {groups.map((group, groupIndex) => (
            <div key={group.category}>
              <Reveal delay={groupIndex * 0.06}>
                <h3 className="mb-6 font-display text-xl text-ink-faint sm:text-2xl">
                  {group.category}
                </h3>
              </Reveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, itemIndex) => (
                  <Reveal
                    key={item._id}
                    delay={groupIndex * 0.06 + itemIndex * 0.05}
                    className="h-full"
                  >
                    <div
                      className={`group flex h-full flex-col gap-4 rounded-[1.5rem] p-6 transition-shadow duration-300 sm:p-7 ${
                        item.featured
                          ? "bg-ink text-canvas shadow-[0_25px_50px_-25px_rgba(28,26,25,0.45)]"
                          : "border border-surface-border bg-canvas-raised text-ink hover:shadow-[0_20px_40px_-28px_rgba(28,26,25,0.25)]"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          item.featured ? "bg-canvas/15 text-highlight" : "bg-accent-soft text-accent-strong"
                        }`}
                      >
                        <ExpertiseIcon iconKey={item.iconKey} />
                      </span>
                      <div className="flex-1">
                        <h4 className="break-words font-display text-lg leading-snug sm:text-xl">
                          {item.title}
                        </h4>
                        {item.shortDescription ? (
                          <p
                            className={`mt-2 break-words text-sm leading-relaxed ${
                              item.featured ? "text-canvas/75" : "text-ink-muted"
                            }`}
                          >
                            {item.shortDescription}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
