import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProcessStepResult } from "@/lib/sanity/types";

interface HowItWorksSectionProps {
  steps: ProcessStepResult[];
}

/**
 * Renders nothing if there are no active process steps in Sanity.
 */
export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  if (steps.length === 0) return null;

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
            <Reveal key={step._id} delay={index * 0.1} className="relative">
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
