"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImageUrl: string;
  heroImageAlt: string;
  coachName: string;
  profession: string;
  location: string;
  whatsappNumber: string;
  yearsExperience: number;
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
}: HeroSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    `Hi Alia! I'd like to start my transformation.`
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Subtle background texture — grain + soft radial glow, kept quiet
          so it never competes with the portrait or copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent-soft)_0%,_transparent_55%)] opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="order-2 flex flex-col gap-7 lg:order-1">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-surface-border bg-canvas-raised px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted"
          >
            {profession} &middot; {location}
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-balance font-display text-5xl leading-[1.04] text-ink sm:text-6xl md:text-7xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-md text-balance text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {subheadline}
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href={whatsappUrl} external>
              {primaryCtaLabel}
            </Button>
            <Button href="#expertise" variant="secondary">
              {secondaryCtaLabel}
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-3 pt-2"
          >
            <span className="font-display text-3xl text-ink">{yearsExperience}+</span>
            <span className="text-sm leading-tight text-ink-muted">
              Years of coaching
              <br />
              experience
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] bg-surface sm:max-w-md lg:max-w-none">
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
              className="object-cover"
            />
            <div className="glass-panel absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl px-4 py-3 sm:bottom-6 sm:left-6 sm:right-6">
              <div>
                <p className="font-display text-lg text-ink">{coachName}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {profession}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
