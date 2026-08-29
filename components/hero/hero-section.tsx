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
 * Layering (see the JSX comments below for exactly where each lives):
 *   1. Coded deep blue/teal gradient — `.hero-gradient` in globals.css.
 *      This is the section's own CSS background, so it always paints
 *      behind every child with zero extra markup or z-index.
 *   2. The transparent Sanity cutout — positioned absolutely, `z-0`.
 *   3. Hero text/CTAs — normal flow content, implicitly above the
 *      absolutely-positioned image because it comes later in the DOM.
 *   4. Floating info cards — `z-20`, explicitly above the cutout.
 *
 * If the client replaces the cutout with a different transparent image
 * (or removes it entirely), the gradient, layout, and floating cards are
 * untouched — nothing about the hero's visual identity lives in Sanity
 * except that one image.
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
      className="hero-gradient scroll-anchor relative overflow-hidden pt-32 pb-14 text-canvas sm:pt-40 sm:pb-20 lg:min-h-[92vh] lg:pb-24"
    >
      {/* Layer 2: transparent Sanity cutout. Absolutely positioned so it
          can bleed toward the edge of the viewport rather than sitting in
          a bounded card, and so text/floating cards can layer on top of
          it without pushing layout around. `object-contain` + `object-
          bottom` keeps the whole cutout visible and grounded at the base
          of the hero regardless of the uploaded image's own aspect ratio. */}
      {heroImageUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto h-[62vh] w-full max-w-md sm:h-[72vh] sm:max-w-lg lg:inset-x-auto lg:right-[2%] lg:h-[88%] lg:w-[46%] lg:max-w-none xl:right-[4%] xl:w-[40%]"
        >
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* Layer 3: hero copy + CTAs — normal flow, so it's naturally
              above the absolutely-positioned image layer. */}
          <div className="flex flex-col gap-6">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="rounded-full border border-canvas/25 bg-canvas/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-canvas/90 backdrop-blur-sm">
                {profession}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-canvas/25 bg-canvas/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-canvas/90 backdrop-blur-sm">
                <LocationIcon />
                {location}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-balance break-words text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl"
            >
              {base}
              <span className="text-highlight">{emphasis}</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-lg text-balance text-base leading-relaxed text-canvas/80 sm:text-lg"
            >
              {subheadline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4"
            >
              <Button href={whatsappUrl} external variant="accent" className="px-7 py-3.5 text-[15px]">
                {primaryCtaLabel}
              </Button>
              <Button
                href="#coaching"
                variant="accent-outline"
                className="px-7 py-3.5 text-[15px]"
              >
                {secondaryCtaLabel}
              </Button>
            </motion.div>

            {trustBadges.length > 0 ? (
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-canvas/15 pt-6"
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

          {/* Right column: reserves the visual space the absolutely
              positioned cutout occupies on desktop, and anchors the
              floating cards (Layer 4) relative to it. Empty on mobile —
              the cutout there is centered/full-width behind the copy
              above rather than beside it. */}
          <div className="relative hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Layer 4: floating info cards, explicitly z-20 so they always sit
          above the cutout image regardless of DOM position. Positioned
          relative to the viewport-width hero container so they read as
          "around" the subject rather than inside a card with her. */}
      <div className="pointer-events-none relative z-20 mx-auto mt-8 max-w-6xl px-6 sm:mt-0 sm:px-8">
        <div className="flex flex-col gap-4 sm:absolute sm:right-8 sm:top-4 sm:w-72 lg:right-8 lg:top-12 lg:w-72">
          <div className="pointer-events-auto">
            <HeroFloatingCard delay={0.5}>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Coaching That
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">
                Fits Your Life. Your Goals.{" "}
                <span className="text-accent-strong">Your Pace.</span>
              </p>
            </HeroFloatingCard>
          </div>

          {yearsExperience > 0 ? (
            <div className="pointer-events-auto self-start">
              <HeroFloatingCard delay={0.65} className="bg-ink/85 text-canvas">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-semibold text-highlight">
                    {yearsExperience}+
                  </span>
                  <span className="text-xs leading-tight text-canvas/80">
                    Years
                    <br />
                    Personal Training
                    <br />
                    Experience
                  </span>
                </div>
              </HeroFloatingCard>
            </div>
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
