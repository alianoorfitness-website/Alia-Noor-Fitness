import { PortableText } from "@portabletext/react";
import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
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
  yearsExperience?: number;
}

/**
 * Compact "Meet Alia" credibility section — one realistic photo on the
 * left, introduction/philosophy/experience/certifications on the right.
 * This is deliberately NOT a large standalone Coach Profile section: it
 * exists so a visitor can understand what Alia does, how experienced she
 * is, and why she's credible without scrolling through several oversized
 * sections. Content comes entirely from the Sanity Coach Profile document
 * — see app/page.tsx and lib/sanity/queries.ts.
 */
export function CoachIntroSection({
  coachName,
  introduction,
  coachingPhilosophy,
  profileImageUrl,
  profileImageAlt,
  credentials,
  yearsExperience,
}: CoachIntroSectionProps) {
  return (
    <section id="about" className="scroll-anchor py-16 sm:py-20 lg:py-24">
      <div
        className={`mx-auto max-w-6xl px-6 sm:px-8 ${
          profileImageUrl ? "grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14" : "max-w-3xl"
        }`}
      >
        {profileImageUrl ? (
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_30px_60px_-35px_rgba(28,26,25,0.35)]">
              <Image
                src={profileImageUrl}
                alt={profileImageAlt}
                fill
                sizes="(min-width: 1024px) 28vw, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              About Alia
            </span>
            <h2 className="mt-3 text-balance text-3xl leading-[1.1] text-ink sm:text-4xl">
              I help you build strength, confidence, and habits that last.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-xl text-balance text-base leading-relaxed text-ink-muted [&_p]:mb-3 [&_p:last-child]:mb-0">
              <PortableText value={introduction} />
            </div>
          </Reveal>

          <Reveal
            delay={0.12}
            className="flex flex-wrap gap-6 border-y border-surface-border py-5"
          >
            {yearsExperience && yearsExperience > 0 ? (
              <div className="flex items-center gap-2.5">
                <span className="font-display text-2xl font-semibold text-accent-strong">
                  {yearsExperience}+
                </span>
                <span className="text-xs leading-tight text-ink-muted">
                  Years
                  <br />
                  Experience
                </span>
              </div>
            ) : null}
            <div className="flex items-center gap-2.5">
              <CheckBadgeIcon />
              <span className="text-xs leading-tight text-ink-muted">
                Personalized
                <br />
                Coaching
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckBadgeIcon />
              <span className="text-xs leading-tight text-ink-muted">
                Science-backed
                <br />
                Approach
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckBadgeIcon />
              <span className="text-xs leading-tight text-ink-muted">
                Realistic &amp;
                <br />
                Sustainable
              </span>
            </div>
          </Reveal>

          {credentials.length > 0 ? (
            <Reveal delay={0.16}>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                Certifications
              </p>
              <ul className="flex flex-col gap-2">
                {credentials.map((credential) => (
                  <li key={credential.id} className="flex items-start gap-2.5 text-sm text-ink">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0 break-words">
                      {credential.title}
                      {credential.level ? (
                        <span className="text-ink-muted"> &middot; {credential.level}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {coachingPhilosophy && coachingPhilosophy.length > 0 ? (
            <Reveal delay={0.2} className="border-l-2 border-accent-soft pl-5">
              <div className="max-w-xl text-balance font-display text-lg font-medium italic leading-snug text-ink [&_p]:mb-1 [&_p:last-child]:mb-0">
                <PortableText value={coachingPhilosophy} />
              </div>
              <p className="mt-2 text-sm text-ink-faint">&mdash; {coachName}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CheckBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong"
    >
      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
        <path
          d="M3 8.5 6.5 12 13 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
