"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ExpertiseResult } from "@/lib/sanity/types";

interface ExpertiseSectionProps {
  items: ExpertiseResult[];
}

/**
 * Premium, editorial numbered list rather than a grid of oversized
 * cards. Each row shows a number, the title, and (if present) a
 * short description; clicking a row expands it to reveal the longer
 * `description` field from Sanity, if one has been entered. Renders
 * nothing if there are no active expertise items — no fabricated
 * placeholder items.
 */
export function ExpertiseSection({ items }: ExpertiseSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section id="expertise" className="scroll-anchor bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Expertise"
            title="What I Help You Build"
            description="Every program folds into one coaching relationship — movement quality, strength, and nutrition working together rather than in isolation."
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mt-12 flex flex-col divide-y divide-surface-border border-y border-surface-border sm:mt-16">
          {items.map((item, index) => {
            const isOpen = item._id === openId;
            const hasDetail = Boolean(item.description);
            return (
              <Reveal key={item._id} delay={index * 0.05}>
                <div>
                  <button
                    type="button"
                    onClick={() => hasDetail && setOpenId(isOpen ? null : item._id)}
                    aria-expanded={hasDetail ? isOpen : undefined}
                    aria-controls={hasDetail ? `expertise-panel-${item._id}` : undefined}
                    className={`flex w-full items-start gap-5 py-6 text-left sm:gap-8 sm:py-8 ${
                      hasDetail ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span className="shrink-0 font-display text-2xl font-semibold text-accent sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                        {item.title}
                      </h3>
                      {item.shortDescription ? (
                        <p className="mt-2 max-w-xl break-words text-sm leading-relaxed text-ink-muted sm:text-base">
                          {item.shortDescription}
                        </p>
                      ) : null}
                    </div>
                    {hasDetail ? (
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border text-lg text-ink"
                      >
                        +
                      </motion.span>
                    ) : null}
                  </button>
                  {hasDetail ? (
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`expertise-panel-${item._id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl break-words pb-6 pl-[3.25rem] text-sm leading-relaxed text-ink-muted sm:pl-[4.5rem] sm:text-base">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
