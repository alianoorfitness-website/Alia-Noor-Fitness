"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { buildCoachingPlanMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CoachingPlan } from "@/lib/types/content";

const featuredCtaClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-canvas/30 px-5 py-2.5 text-sm font-medium tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2";
const primaryCtaClasses =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-accent-strong hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2";

interface CoachingPlanCardProps {
  plan: CoachingPlan;
  whatsappNumber: string;
}

/** How many features show by default before "View More" is needed to reveal the rest. */
const COLLAPSED_FEATURE_COUNT = 3;

/**
 * Compact by default: name, short description, ideal-for, a handful of
 * features, and a CTA. The remaining features (if any) sit behind a
 * "View More" inline expansion — chosen over a modal/drawer since it
 * keeps everything in the same card without an extra layer of UI, and
 * every card in a row still stretches to equal height via the parent
 * grid, badge included.
 */
export function CoachingPlanCard({ plan, whatsappNumber }: CoachingPlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    buildCoachingPlanMessage(plan.name)
  );

  const visibleFeatures = plan.features.slice(0, COLLAPSED_FEATURE_COUNT);
  const remainingFeatures = plan.features.slice(COLLAPSED_FEATURE_COUNT);
  const hasMore = remainingFeatures.length > 0;

  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-2xl p-6 ${
        plan.featured
          ? "bg-ink text-canvas shadow-[0_35px_70px_-30px_rgba(28,26,25,0.55)]"
          : "border border-surface-border bg-canvas-raised text-ink"
      }`}
    >
      {plan.featured ? (
        <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink shadow-[0_8px_16px_-6px_rgba(224,138,99,0.5)]">
          {plan.badge || "Most Popular"}
        </span>
      ) : null}

      <div>
        <h3 className="break-words font-display text-xl font-semibold">{plan.name}</h3>
        <p className={`mt-1 text-sm leading-snug ${plan.featured ? "text-canvas/70" : "text-ink-muted"}`}>
          {plan.audience}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <ul className="flex flex-col gap-2">
          {visibleFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <CheckIcon
                className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-highlight" : "text-accent"}`}
              />
              <span className="break-words">{feature}</span>
            </li>
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p
                className={`pt-2 text-sm leading-relaxed ${
                  plan.featured ? "text-canvas/85" : "text-ink-muted"
                }`}
              >
                {plan.description}
              </p>
              {remainingFeatures.length > 0 ? (
                <ul className="mt-2 flex flex-col gap-2">
                  {remainingFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-highlight" : "text-accent"}`}
                      />
                      <span className="break-words">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className={`self-start text-sm font-medium underline-offset-2 hover:underline ${
            plan.featured ? "text-canvas/80" : "text-ink-muted"
          }`}
        >
          {expanded ? "View Less" : "View More"}
        </button>
      ) : null}

      <div className="mt-1 flex flex-wrap gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={plan.featured ? featuredCtaClasses : primaryCtaClasses}
        >
          {plan.ctaLabel}
        </a>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
