"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { ExpertiseGroup } from "@/components/sections/expertise-section";

interface ExpertiseListProps {
  groups: ExpertiseGroup[];
}

/**
 * Numbered, expandable list of expertise categories. Only one group is
 * expanded at a time, and each item within a group animates in with a
 * stagger — an editorial alternative to a repetitive card grid.
 */
export function ExpertiseList({ groups }: ExpertiseListProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col divide-y divide-surface-border border-y border-surface-border">
      {groups.map((group, index) => {
        const isOpen = index === openIndex;

        return (
          <div key={group.category}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={`expertise-panel-${index}`}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent-strong sm:py-8"
            >
              <span className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-display text-xl text-ink-faint sm:text-2xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                  {group.category}
                </span>
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
                  id={`expertise-panel-${index}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-wrap gap-3 pb-8 pl-0 sm:pl-16">
                    {group.items.map((item, itemIndex) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.04 }}
                        className="rounded-full border border-surface-border bg-canvas-raised px-4 py-2 text-sm text-ink"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
