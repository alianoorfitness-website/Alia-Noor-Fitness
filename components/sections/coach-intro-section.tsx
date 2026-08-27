import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const credentials = [
  "Certified Personal Trainer",
  "EREPS Certified Fitness Trainer / Instructor — EQF Level 3",
  "Fitness Nutrition Specialist",
  "Certified Sports Nutrition Specialist",
  "Posture & Functional Corrective Exercise Specialist",
  "Resistance Band Training Specialist",
  "Plyometric Training",
  "Olympic Weightlifting / Olympic Lifting",
  "Coach AEL | EREPS Certified",
];

/**
 * Editorial "Meet Your Coach" section. All facts here are sourced directly
 * from the project brief — no invented achievements, client counts, or
 * qualifications.
 */
export function CoachIntroSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface">
            <Image
              src="/mock/hero/coach-intro.svg"
              alt="Alia Noor coaching a client"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="glass-panel absolute -bottom-6 right-4 flex flex-col gap-0.5 rounded-2xl px-5 py-4 sm:-right-8">
            <span className="font-display text-2xl text-ink">3 yrs</span>
            <span className="text-xs leading-tight text-ink-muted">
              Freelance PT at
              <br />
              Anytime Fitness, Malviya Nagar
            </span>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Meet Your Coach"
              title={
                <>
                  Coaching that&rsquo;s built around{" "}
                  <span className="font-display italic text-accent-strong">you</span>,
                  not a template.
                </>
              }
              description="Alia Noor is a certified personal trainer and fitness coach with 4+ years in the industry, currently a freelance personal trainer at Anytime Fitness, Malviya Nagar, Delhi — around 3 years there. Her coaching combines strength training, corrective exercise, and nutrition guidance into one personalized system."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-lg text-balance text-base leading-relaxed text-ink-muted">
              Every program starts with how your body actually moves —
              correcting posture and movement patterns before layering on
              strength, muscle, and performance work. The goal isn&rsquo;t a
              quick fix; it&rsquo;s a stronger, more capable version of you
              that lasts.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {credentials.map((credential) => (
                <div
                  key={credential}
                  className="flex items-start gap-3 rounded-xl border border-surface-border bg-canvas-raised px-4 py-3"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm leading-snug text-ink">{credential}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
