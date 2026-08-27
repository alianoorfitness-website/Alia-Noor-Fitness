import { PortableText } from "@portabletext/react";
import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortableTextContent } from "@/lib/sanity/types";

export interface CoachIntroCredential {
  id: string;
  title: string;
  level?: string | null;
}

export interface CoachIntroSectionProps {
  coachName: string;
  introduction: PortableTextContent;
  coachingPhilosophy?: PortableTextContent | null;
  /** Undefined until a profile image is uploaded in Sanity. */
  profileImageUrl?: string;
  profileImageAlt: string;
  credentials: CoachIntroCredential[];
  associationLabel?: string | null;
  associationExperience?: string | null;
  yearsExperience?: number;
}

/**
 * "Meet Your Coach" section. Content (introduction, philosophy,
 * credentials, profile image) comes from the Sanity Coach Profile document
 * — see app/page.tsx and lib/sanity/queries.ts.
 */
export function CoachIntroSection({
  coachName,
  introduction,
  coachingPhilosophy,
  profileImageUrl,
  profileImageAlt,
  credentials,
  associationLabel,
  associationExperience,
  yearsExperience,
}: CoachIntroSectionProps) {
  return (
    <section id="about" className="scroll-anchor py-20 sm:py-28 lg:py-32">
      <div
        className={`mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 px-6 sm:px-8 lg:gap-20 ${
          profileImageUrl ? "lg:grid-cols-[0.8fr_1.2fr]" : ""
        }`}
      >
        {profileImageUrl ? (
          <Reveal className="relative lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-surface shadow-[0_30px_60px_-30px_rgba(28,26,25,0.3)]">
              <Image
                src={profileImageUrl}
                alt={profileImageAlt}
                fill
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="object-cover"
              />
            </div>
            {associationExperience && associationLabel ? (
              <div className="glass-panel absolute -bottom-6 right-4 flex max-w-[calc(100%-2rem)] flex-col gap-0.5 rounded-2xl px-5 py-4 sm:-right-8 sm:max-w-[11rem]">
                <span className="font-display text-2xl text-ink">{associationExperience}</span>
                <span className="text-xs leading-tight text-ink-muted">
                  {associationLabel}
                </span>
              </div>
            ) : null}
          </Reveal>
        ) : null}

        <div className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Meet Your Coach"
              title={
                <>
                  {coachName ? <>{coachName}: </> : null}
                  Coaching that&rsquo;s built around{" "}
                  <span className="font-display italic text-accent-strong">you</span>,
                  not a template.
                </>
              }
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:gap-10">
            <Reveal delay={0.08}>
              <div className="max-w-lg text-balance text-base leading-relaxed text-ink-muted [&_p]:mb-4 [&_p:last-child]:mb-0">
                <PortableText value={introduction} />
              </div>
            </Reveal>

            {yearsExperience && yearsExperience > 0 ? (
              <Reveal delay={0.1} className="flex sm:justify-end">
                <div className="flex items-start gap-3 rounded-2xl border border-surface-border bg-canvas-raised px-5 py-4 sm:flex-col sm:items-center sm:text-center">
                  <span className="font-display text-4xl text-accent-strong">
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

          {coachingPhilosophy && coachingPhilosophy.length > 0 ? (
            <Reveal delay={0.14} className="border-l-2 border-accent-soft pl-5">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                Coaching Philosophy
              </p>
              <div className="max-w-lg text-balance font-display text-xl italic leading-snug text-ink [&_p]:mb-2 [&_p:last-child]:mb-0">
                <PortableText value={coachingPhilosophy} />
              </div>
            </Reveal>
          ) : null}

          {credentials.length > 0 ? (
            <Reveal delay={0.18}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                Certifications &amp; Qualifications
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {credentials.map((credential) => (
                  <div
                    key={credential.id}
                    className="flex items-start gap-3 rounded-xl border border-surface-border bg-canvas-raised px-4 py-3"
                  >
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0 break-words text-sm leading-snug text-ink">
                      {credential.title}
                      {credential.level ? (
                        <span className="text-ink-muted"> &middot; {credential.level}</span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
