"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
  /** Undefined until a hero image is uploaded in Sanity — the portrait is omitted, not broken, when absent. */
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
 * Fully CMS-driven hero. All copy, the portrait image, and CTA labels come
 * from Sanity Site Settings / Coach Profile via the page-level data layer —
 * see app/page.tsx and lib/sanity/queries.ts.
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

  return (
    <section
      id="top"
      className="scroll-anchor relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pb-28"
    >
      {/* Subtle background texture — grain + soft radial glow, kept quiet
          so it never competes with the portrait or copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent-soft)_0%,_transparent_55%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:gap-10 ${
          heroImageUrl ? "lg:grid-cols-[1.08fr_0.92fr]" : "max-w-4xl"
        }`}
      >
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-surface-border bg-canvas-raised px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted"
          >
            <span className="break-words">
              {profession} &middot; {location}
            </span>
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-balance break-words font-display text-5xl leading-[1.03] text-ink sm:text-6xl md:text-7xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-lg text-balance text-base leading-relaxed text-ink-muted sm:text-lg"
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
            <Button href={whatsappUrl} external className="px-7 py-3.5 text-[15px]">
              {primaryCtaLabel}
            </Button>
            <Button href="#coaching" variant="secondary" className="px-7 py-3.5 text-[15px]">
              {secondaryCtaLabel}
            </Button>
          </motion.div>

          {(yearsExperience > 0 && !heroImageUrl) || trustBadges.length > 0 ? (
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-surface-border pt-6"
            >
              {yearsExperience > 0 && !heroImageUrl ? (
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl text-ink">{yearsExperience}+</span>
                  <span className="text-sm leading-tight text-ink-muted">
                    Years of coaching
                    <br />
                    experience
                  </span>
                </div>
              ) : null}
              {trustBadges.slice(0, 3).map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="max-w-[10rem] break-words text-sm leading-tight text-ink-muted">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : null}
        </div>

        {heroImageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-surface shadow-[0_40px_80px_-40px_rgba(28,26,25,0.35)] sm:max-w-md lg:max-w-none">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="min-w-0">
                  <p className="truncate font-display text-xl text-canvas">{coachName}</p>
                  <p className="truncate text-xs uppercase tracking-[0.14em] text-canvas/75">
                    {profession}
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping accent card — a deliberate editorial detail so
                the portrait doesn't sit in a plain, isolated box. */}
            {yearsExperience > 0 ? (
              <div className="glass-panel absolute -left-4 -top-4 hidden flex-col rounded-2xl px-5 py-4 sm:-left-6 sm:-top-6 sm:flex">
                <span className="font-display text-2xl text-ink">{yearsExperience}+</span>
                <span className="text-xs leading-tight text-ink-muted">Years coaching</span>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
