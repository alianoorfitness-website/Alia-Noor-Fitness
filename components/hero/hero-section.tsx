"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { HeroFloatingCard } from "@/components/hero/hero-floating-card";
import { Button } from "@/components/ui/button";
import { buildConsultationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  /** Undefined until a hero image is uploaded in Sanity — the cutout is omitted, not broken, when absent. */
  heroImageUrl?: string;
  heroImageAlt: string;
  coachName: string;
  profession: string;
  location: string;
  whatsappNumber: string;
  yearsExperience: number;
  /** Featured credential titles (Sanity `credential.featured`), shown as compact trust badges near the hero copy. */
  trustBadges: string[];
}

/**
 * Splits a headline into a "base" and "emphasis" fragment purely from its
 * own punctuation — never from hardcoded content. Sanity's `heroHeadline`
 * is a single plain-text field, so there's no rich-text markup to carry an
 * accent-color instruction. Splitting on the last sentence boundary (". ")
 * when one exists, or otherwise the last few words, lets any headline the
 * client types get the same "final phrase in accent color" treatment the
 * design calls for, without this component ever knowing or hardcoding
 * what that phrase actually says.
 */
function splitHeadlineEmphasis(headline: string): { base: string; emphasis: string } {
  const sentenceBreak = headline.lastIndexOf(". ");
  if (sentenceBreak !== -1) {
    return {
      base: headline.slice(0, sentenceBreak + 1),
      emphasis: headline.slice(sentenceBreak + 2),
    };
  }
  const words = headline.trim().split(/\s+/);
  if (words.length <= 3) return { base: "", emphasis: headline };
  return {
    base: words.slice(0, -3).join(" ") + " ",
    emphasis: words.slice(-3).join(" "),
  };
}

/**
 * Fully CMS-driven hero. All copy and CTA labels come from Sanity Site
 * Settings; the coach cutout image comes from Sanity Site Settings'
 * `heroImage` field, which is expected to contain ONLY a transparent
 * PNG/WebP portrait cutout — never a pre-composed background.
 *
 * Layering, bottom to top:
 *   1. Local hero background photo (public/hero/hero-background.png) — a
 *      static/coded asset, not Sanity content.
 *   2. Coded scrim (`.hero-photo-scrim`) over that photo for text
 *      contrast — still entirely coded, never baked into the photo file.
 *   3. The transparent Sanity cutout — absolutely positioned, `z-0`.
 *   4. Hero text/CTAs — normal flow content, implicitly above the
 *      absolutely-positioned image because it comes later in the DOM.
 *   5. Floating info cards — `z-20`, explicitly above the cutout.
 *
 * If the client replaces the cutout with a different transparent image
 * (or removes it entirely), the background photo, scrim, layout, and
 * floating cards are untouched — nothing about the hero's visual
 * identity lives in Sanity except that one image.
 */
export function HeroSection({
  headline,
  subheadline,
  primaryCtaLabel,
  secondaryCtaLabel,
  heroImageUrl,
  heroImageAlt,
  coachName,
  profession,
  location,
  whatsappNumber,
  yearsExperience,
  trustBadges,
}: HeroSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, buildConsultationMessage());
  const { base, emphasis } = splitHeadlineEmphasis(headline);

  return (
    <section
      id="top"
      className="scroll-anchor relative overflow-hidden pt-28 pb-16 text-canvas sm:pt-32 sm:pb-20 lg:min-h-[90vh] lg:pb-16"
    >
      {/* Layer 1: local hero background photo. `priority` since this is
          the LCP element for the page's most important section. */}
      <Image
        src="/hero/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover object-[70%_center]"
      />
      {/* Layer 2: coded scrim over the photo — deepens the left/bottom for
          text contrast, leaves the upper-right (behind the cutout)
          lighter so the photo's own depth still reads through. */}
      <div aria-hidden="true" className="hero-photo-scrim pointer-events-none absolute inset-0 -z-10" />

      {/* Layer 3: transparent Sanity cutout. Absolutely positioned so it
          can bleed toward the viewport edge rather than sitting in a
          bounded card, and so text/floating cards can layer on top of it
          without pushing layout around. `object-contain` + `object-
          bottom` keeps the whole cutout visible and grounded regardless
          of the uploaded image's own aspect ratio. */}
      {heroImageUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto h-[52vh] w-full max-w-xs sm:h-[62vh] sm:max-w-sm lg:inset-x-auto lg:right-[2%] lg:h-[85%] lg:w-[42%] lg:max-w-none xl:right-[5%] xl:w-[36%]"
        >
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 38vw, 80vw"
            className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(2,10,15,0.45)]"
          />
        </motion.div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Layer 4: hero copy + CTAs — normal flow, so it's naturally
              above the absolutely-positioned image layer. */}
          <div className="flex flex-col gap-5">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="rounded-full border border-canvas/25 bg-canvas/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-canvas/90 backdrop-blur-sm">
                {profession}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-canvas/25 bg-canvas/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-canvas/90 backdrop-blur-sm">
                <LocationIcon />
                {location}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-balance break-words text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.5rem]"
            >
              {base}
              <span className="text-highlight">{emphasis}</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-md text-balance text-base leading-relaxed text-canvas/80 sm:text-lg"
            >
              {subheadline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Button href={whatsappUrl} external variant="accent" className="px-6 py-3 text-sm">
                {primaryCtaLabel}
              </Button>
              <Button href="#coaching" variant="accent-outline" className="px-6 py-3 text-sm">
                {secondaryCtaLabel}
              </Button>
            </motion.div>

            {trustBadges.length > 0 ? (
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-4"
              >
                {trustBadges.slice(0, 3).map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" />
                    <span className="max-w-[11rem] break-words text-sm leading-tight text-canvas/75">
                      {badge}
                    </span>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </div>

          {/* Right column: empty spacer reserving the visual space the
              absolutely positioned cutout occupies on desktop. Nothing
              renders here directly — floating cards (Layer 5) are
              positioned relative to the outer section, not this column,
              so they can sit flush with the viewport edge. */}
          <div aria-hidden="true" />
        </div>
      </div>

      {/* Layer 5: floating info cards, explicitly z-20 so they always sit
          above the cutout image. On mobile/tablet they drop below the
          copy/CTA in normal flow rather than floating over the subject's
          face. At `lg`, this outer wrapper switches to `absolute inset-0`
          so it's anchored to the hero section's own top/right edges —
          not to wherever the copy block happens to end in normal flow.
          The inner card stack's `top-28` matches the section's own
          `pt-28` copy offset, which is what clears the fixed site header
          (~80px tall) — a smaller offset here puts the cards directly
          behind the header instead of below it. */}
      <div className="relative z-20 mx-auto mt-8 max-w-6xl px-6 sm:px-8 lg:absolute lg:inset-0 lg:mt-0 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:absolute lg:right-8 lg:top-28 lg:w-72 lg:flex-col lg:flex-nowrap">
          <HeroFloatingCard delay={0.5} className="flex-1 sm:max-w-xs lg:max-w-none">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Coaching That
            </p>
            <p className="mt-1.5 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
              Fits Your Life. Your Goals.{" "}
              <span className="text-accent-strong">Your Pace.</span>
            </p>
          </HeroFloatingCard>

          {yearsExperience > 0 ? (
            <HeroFloatingCard
              delay={0.62}
              className="flex-1 self-start bg-ink/85 text-canvas sm:max-w-[13rem] lg:max-w-none"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-semibold text-highlight sm:text-3xl">
                  {yearsExperience}+
                </span>
                <span className="text-xs leading-tight text-canvas/80">
                  Years
                  <br />
                  Personal Training
                </span>
              </div>
            </HeroFloatingCard>
          ) : null}
        </div>
      </div>

      {/* Screen-reader-only fallback so the coach's name/role is
          announced even when the cutout image can't render (still
          resolves to a normal <img alt> once the image loads). */}
      <span className="sr-only">
        {coachName}, {profession}
      </span>
    </section>
  );
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 14.5S13 10.4 13 6.5A5 5 0 0 0 3 6.5c0 3.9 5 8 5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="6.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
