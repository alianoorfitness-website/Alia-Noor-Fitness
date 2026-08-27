import { ExpertiseList } from "@/components/sections/expertise-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export interface ExpertiseGroup {
  category: string;
  items: string[];
}

const expertiseGroups: ExpertiseGroup[] = [
  {
    category: "Transformation & Strength",
    items: [
      "Fat Loss & Body Transformation",
      "Strength Training",
      "Muscle Building",
      "Functional Training",
    ],
  },
  {
    category: "Movement & Recovery",
    items: [
      "Postpartum Fitness & Recovery",
      "Corrective Exercise",
      "Posture & Movement Correction",
      "Mobility Training",
      "Injury Prevention",
      "Rehabilitation-focused Training",
    ],
  },
  {
    category: "Performance & Nutrition",
    items: ["Sports & Performance Training", "Nutrition & Sports Nutrition"],
  },
];

/**
 * Editorial expertise section: three grouped categories rendered as an
 * interactive numbered list rather than a grid of a dozen identical cards.
 */
export function ExpertiseSection() {
  return (
    <section id="expertise" className="bg-surface py-24 sm:py-32">
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
          <ExpertiseList groups={expertiseGroups} />
        </div>
      </div>
    </section>
  );
}
