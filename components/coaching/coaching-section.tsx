import { CoachingPlanCard } from "@/components/coaching/coaching-plan-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { mockCoachingPlans } from "@/lib/mock-data/coaching-plans";
import type { CoachingPlan } from "@/lib/types/content";

interface CoachingSectionProps {
  /** Defaults to temporary mock data; pass Sanity-sourced data once available. */
  plans?: CoachingPlan[];
}

export function CoachingSection({ plans = mockCoachingPlans }: CoachingSectionProps) {
  return (
    <section id="coaching" className="py-24 sm:py-32">
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.08} className="h-full">
              <CoachingPlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
