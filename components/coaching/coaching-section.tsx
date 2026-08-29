import { CoachingPlanCard } from "@/components/coaching/coaching-plan-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CoachingPlan } from "@/lib/types/content";

interface CoachingSectionProps {
  plans: CoachingPlan[];
  whatsappNumber: string;
}

/**
 * Renders zero, one, or multiple plans depending on what's active in
 * Sanity. Hides the section entirely if there are no active plans.
 *
 * Desktop (`sm`+): a real CSS grid, so every card in a row stretches to
 * the same height automatically regardless of feature-list length.
 *
 * Mobile: a horizontally swipeable row (scroll-snap) — "[ Plan 1 ]
 * [ Partial Plan 2 → ]" — rather than stacking every plan vertically.
 * `overflow-x-auto` is scoped to this row only, so the page itself never
 * overflows horizontally.
 */
export function CoachingSection({ plans, whatsappNumber }: CoachingSectionProps) {
  if (plans.length === 0) return null;

  const isSingle = plans.length === 1;

  return (
    <section id="coaching" className="scroll-anchor py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Coaching"
            title="A coaching path for where you are."
            description="Every plan is a real coaching relationship, not a template. Apply and we'll figure out the right fit together."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>
      </div>

      <div className="mt-10 sm:mt-16">
        <div
          className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-auto sm:max-w-6xl sm:grid sm:snap-none sm:gap-8 sm:overflow-visible sm:px-8 sm:pb-0 ${
            isSingle
              ? "sm:mx-auto sm:max-w-md"
              : plans.length === 2
                ? "sm:mx-auto sm:max-w-3xl sm:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 0.08}
              className={`h-full shrink-0 snap-start sm:w-auto sm:shrink ${
                isSingle ? "w-[85%] max-w-[320px]" : "w-[80%] max-w-[300px]"
              }`}
            >
              <CoachingPlanCard plan={plan} whatsappNumber={whatsappNumber} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
