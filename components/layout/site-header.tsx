"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/layout/nav-links";

/**
 * Floating, sticky navigation. Gains a glass treatment once the page is
 * scrolled past the hero so it stays legible over varied background
 * imagery without being intrusive at the very top of the page.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <div
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? "glass-panel shadow-[0_8px_30px_-12px_rgba(28,26,25,0.25)]" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg leading-none tracking-tight text-ink sm:text-xl"
        >
          Alia Noor
          <span className="ml-1.5 hidden text-xs font-sans font-medium uppercase tracking-[0.2em] text-ink-muted sm:inline">
            Fitness
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#coaching" className="px-5 py-2.5 text-xs">
            Start Your Transformation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel absolute inset-x-4 top-20 z-40 flex flex-col gap-1 rounded-3xl p-4 shadow-[0_20px_50px_-20px_rgba(28,26,25,0.35)] sm:inset-x-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 px-4">
              <Button
                href="#coaching"
                onClick={() => setMobileOpen(false)}
                className="w-full"
              >
                Start Your Transformation
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none"
    >
      <motion.line
        x1="3"
        x2="17"
        y1="6"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
        style={{ transformOrigin: "10px 6px" }}
      />
      <motion.line
        x1="3"
        x2="17"
        y1="14"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
        style={{ transformOrigin: "10px 14px" }}
      />
    </svg>
  );
}
