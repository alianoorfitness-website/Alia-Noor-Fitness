"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroFloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Small translucent card that floats above the hero's transparent coach
 * cutout (see hero-section.tsx for the full z-index stack: gradient →
 * cutout → text/UI → these cards). Kept deliberately compact and
 * restrained — the brief calls for 2-3 of these at most, never a
 * cluttered hero.
 */
export function HeroFloatingCard({ children, className = "", delay = 0 }: HeroFloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel rounded-2xl px-5 py-4 shadow-[0_20px_45px_-20px_rgba(4,15,22,0.55)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
