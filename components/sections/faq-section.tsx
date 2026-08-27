"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Faq } from "@/lib/types/content";

interface FaqSectionProps {
  faqs: Faq[];
}

/**
 * Polished FAQ accordion. Data comes from Sanity via app/page.tsx — see
 * lib/sanity/queries.ts (getFaqs) and lib/sanity/mappers.ts (mapFaq).
 * Renders nothing if there's no published FAQ content; no fallback
 * questions are ever fabricated here.
 */
export function FaqSection({ faqs }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            align="center"
            className="mx-auto max-w-xl"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col divide-y divide-surface-border border-y border-surface-border">
          {faqs.map((faq) => {
            const isOpen = faq.id === openId;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="break-words font-display text-lg leading-snug text-ink sm:text-xl">
                    {faq.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border text-lg text-ink"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="break-words pb-6 text-sm leading-relaxed text-ink-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
