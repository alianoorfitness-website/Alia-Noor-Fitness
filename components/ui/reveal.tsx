"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, useful for staggering siblings manually. */
  delay?: number;
  /** Vertical offset the element travels while revealing, in pixels. */
  distance?: number;
  as?: "div" | "span";
}

const makeVariants = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0 },
});

/**
 * Fades + slides an element in once it scrolls into view. Used throughout
 * the homepage for section-level reveal animations. Respects
 * prefers-reduced-motion via Framer Motion's built-in handling combined
 * with the global CSS override in globals.css.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
}: RevealProps) {
  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={makeVariants(distance)}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each direct child's reveal, in seconds. */
  staggerDelay?: number;
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Wraps a list of children and staggers their entrance. Direct children
 * should use `staggerItemVariants` (via `motion.div variants={staggerItemVariants}`)
 * to participate in the stagger.
 */
export function Stagger({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}
