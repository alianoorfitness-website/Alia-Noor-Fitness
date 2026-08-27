import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Tell Alia about your goals, schedule, and training history.",
  },
  {
    number: "02",
    title: "Consultation",
    description: "A focused conversation to understand what a real plan for you looks like.",
  },
  {
    number: "03",
    title: "Personalized Plan",
    description: "Training and nutrition built around your body, not a generic template.",
  },
  {
    number: "04",
    title: "Transform",
    description: "Consistent coaching, adjustments, and accountability as you progress.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From application to transformation."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1} className="relative">
              <span className="font-display text-5xl text-accent-soft">{step.number}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-6 hidden h-px w-6 -translate-y-1/2 translate-x-[calc(100%+0.75rem)] bg-surface-border lg:block"
                />
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
