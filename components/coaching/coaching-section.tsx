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
 * Mobile: plans stack vertically (not a horizontal carousel) — with only
 * three plans, comparing them side by side matters more than saving
 * vertical space, and a carousel would make that comparison awkward.
 * Each card's own "View More" interaction (see CoachingPlanCard) keeps
 * the default stacked view compact.
 */
export function CoachingSection({ plans, whatsappNumber }: CoachingSectionProps) {
  if (plans.length === 0) return null;

  const isSingle = plans.length === 1;

  return (
    <section id="coaching" className="scroll-anchor py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Coaching Plans"
            title="Choose Your Path"
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div
          className={`mt-10 grid grid-cols-1 gap-5 sm:mt-12 ${
            isSingle
              ? "mx-auto max-w-md"
              : plans.length === 2
                ? "mx-auto max-w-3xl sm:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.08} className="h-full">
              <CoachingPlanCard plan={plan} whatsappNumber={whatsappNumber} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
