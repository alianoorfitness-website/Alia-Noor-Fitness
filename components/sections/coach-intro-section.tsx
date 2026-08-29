import { PortableText } from "@portabletext/react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortableTextContent } from "@/lib/sanity/types";

export interface CoachIntroSectionProps {
  coachName: string;
  introduction: PortableTextContent;
  coachingPhilosophy?: PortableTextContent | null;
  associationLabel?: string | null;
  associationExperience?: string | null;
  yearsExperience?: number;
}

/**
 * Typography-led "Meet the coach" section — deliberately has no portrait.
 * The hero's transparent cutout is the homepage's one large image of
 * Alia; this section leans on type scale, whitespace, and a pull-quote
 * treatment for the coaching philosophy instead of a second photograph.
 * Content (introduction, philosophy, experience) comes from the Sanity
 * Coach Profile document — see app/page.tsx and lib/sanity/queries.ts.
 * Credentials render separately in CredentialStrip.
 */
export function CoachIntroSection({
  coachName,
  introduction,
  coachingPhilosophy,
  associationLabel,
  associationExperience,
  yearsExperience,
}: CoachIntroSectionProps) {
  return (
    <section id="about" className="scroll-anchor py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Meet Alia" title="Certified. Personal. Sustainable." />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto] sm:gap-12">
          <Reveal delay={0.08}>
            <div className="max-w-2xl text-balance text-base leading-relaxed text-ink-muted [&_p]:mb-4 [&_p:last-child]:mb-0">
              <PortableText value={introduction} />
            </div>
          </Reveal>

          {yearsExperience && yearsExperience > 0 ? (
            <Reveal delay={0.12} className="flex sm:justify-end">
              <div className="flex items-start gap-3 rounded-2xl border border-surface-border bg-canvas-raised px-5 py-4 sm:flex-col sm:items-center sm:text-center">
                <span className="font-display text-4xl font-semibold text-accent-strong">
                  {yearsExperience}+
                </span>
                <span className="text-xs uppercase leading-tight tracking-[0.1em] text-ink-muted">
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </Reveal>
          ) : null}
        </div>

        {associationExperience && associationLabel ? (
          <Reveal delay={0.14} className="mt-6 text-sm text-ink-faint">
            {associationLabel} &middot; {associationExperience}
          </Reveal>
        ) : null}

        {coachingPhilosophy && coachingPhilosophy.length > 0 ? (
          <Reveal delay={0.18} className="mt-14 border-l-2 border-accent-soft pl-6 sm:mt-16 sm:pl-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Coaching Philosophy
            </p>
            <div className="max-w-2xl text-balance font-display text-2xl font-medium italic leading-snug text-ink sm:text-3xl [&_p]:mb-2 [&_p:last-child]:mb-0">
              <PortableText value={coachingPhilosophy} />
            </div>
            <p className="mt-4 text-sm text-ink-faint">&mdash; {coachName}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
