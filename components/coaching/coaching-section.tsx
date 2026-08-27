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
 */
export function CoachingSection({ plans, whatsappNumber }: CoachingSectionProps) {
  if (plans.length === 0) return null;

  return (
    <section id="coaching" className="scroll-anchor py-24 sm:py-32">
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

        <div
          className={`mt-14 grid grid-cols-1 gap-6 ${
            plans.length === 1
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
