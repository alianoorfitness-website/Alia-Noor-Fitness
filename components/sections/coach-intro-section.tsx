import { PortableText } from "@portabletext/react";
import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortableTextContent } from "@/lib/sanity/types";

export interface CoachIntroCredential {
  id: string;
  title: string;
}

export interface CoachIntroSectionProps {
  introduction: PortableTextContent;
  coachingPhilosophy?: PortableTextContent | null;
  /** Undefined until a profile image is uploaded in Sanity. */
  profileImageUrl?: string;
  profileImageAlt: string;
  credentials: CoachIntroCredential[];
  associationLabel?: string | null;
  associationExperience?: string | null;
}

/**
 * Editorial "Meet Your Coach" section. Content (introduction, philosophy,
 * credentials, profile image) comes from the Sanity Coach Profile document
 * — see app/page.tsx and lib/sanity/queries.ts.
 */
export function CoachIntroSection({
  introduction,
  coachingPhilosophy,
  profileImageUrl,
  profileImageAlt,
  credentials,
  associationLabel,
  associationExperience,
}: CoachIntroSectionProps) {
  return (
    <section id="about" className="scroll-anchor py-24 sm:py-32">
      <div
        className={`mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 px-6 sm:px-8 lg:gap-16 ${
          profileImageUrl ? "lg:grid-cols-[0.85fr_1.15fr]" : ""
        }`}
      >
        {profileImageUrl ? (
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface">
              <Image
                src={profileImageUrl}
                alt={profileImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            {associationExperience && associationLabel ? (
              <div className="glass-panel absolute -bottom-6 right-4 flex max-w-[calc(100%-2rem)] flex-col gap-0.5 rounded-2xl px-5 py-4 sm:-right-8 sm:max-w-[10rem]">
                <span className="font-display text-2xl text-ink">{associationExperience}</span>
                <span className="text-xs leading-tight text-ink-muted">
                  {associationLabel}
                </span>
              </div>
            ) : null}
          </Reveal>
        ) : null}

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
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-lg text-balance text-base leading-relaxed text-ink-muted [&_p]:mb-4 [&_p:last-child]:mb-0">
              <PortableText value={introduction} />
            </div>
          </Reveal>

          {coachingPhilosophy && coachingPhilosophy.length > 0 ? (
            <Reveal delay={0.12}>
              <div className="max-w-lg text-balance text-base leading-relaxed text-ink-muted [&_p]:mb-4 [&_p:last-child]:mb-0">
                <PortableText value={coachingPhilosophy} />
              </div>
            </Reveal>
          ) : null}

          {credentials.length > 0 ? (
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {credentials.map((credential) => (
                  <div
                    key={credential.id}
                    className="flex items-start gap-3 rounded-xl border border-surface-border bg-canvas-raised px-4 py-3"
                  >
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0 break-words text-sm leading-snug text-ink">{credential.title}</span>
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
