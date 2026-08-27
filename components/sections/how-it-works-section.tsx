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
    <section className="bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From application to transformation."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line — only visible at the width where steps sit in
              a single row, so it never floats disconnected on mobile. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-surface-border lg:block"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step._id} delay={index * 0.1} className="relative flex flex-col gap-3">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-canvas">
                  {step.number}
                </span>
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
