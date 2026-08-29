"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/layout/nav-links";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface SiteHeaderProps {
  /** From Sanity Site Settings — the quick-chat icon is omitted entirely when absent. */
  whatsappNumber?: string;
}

/**
 * Floating, sticky navigation. Gains a glass treatment once the page is
 * scrolled past the hero so it stays legible over varied background
 * imagery without being intrusive at the very top of the page.
 */
export function SiteHeader({ whatsappNumber }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappUrl = whatsappNumber
    ? buildWhatsAppUrl(whatsappNumber, "Hi Alia! I'd like to know more about training with you.")
    : null;

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
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-3 text-canvas transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-canvas/10 bg-ink/70 shadow-[0_8px_30px_-12px_rgba(4,15,22,0.45)] backdrop-blur-xl"
            : "border border-canvas/15 bg-canvas/5 backdrop-blur-sm"
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg leading-none tracking-tight text-canvas sm:text-xl"
        >
          Alia Noor
          <span className="ml-1.5 hidden text-xs font-sans font-medium uppercase tracking-[0.2em] text-canvas/60 sm:inline">
            Fitness
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-canvas/75 transition-colors hover:text-canvas"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Alia on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas/20 text-canvas/80 transition-colors hover:border-canvas/40 hover:text-canvas"
            >
              <WhatsAppGlyph />
            </a>
          ) : null}
          <Button href="#coaching" variant="accent" className="px-5 py-2.5 text-xs">
            Start Your Transformation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-canvas lg:hidden"
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
            className="absolute inset-x-4 top-20 z-40 flex flex-col gap-1 rounded-3xl border border-canvas/10 bg-ink/90 p-4 shadow-[0_20px_50px_-20px_rgba(4,15,22,0.55)] backdrop-blur-xl sm:inset-x-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-canvas transition-colors hover:bg-canvas/10"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 px-4">
              <Button
                href="#coaching"
                variant="accent"
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

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.874-2.9-1.56-4.06-3.54-.306-.526.306-.489.877-1.627.098-.198.05-.371-.05-.52-.099-.149-.669-1.61-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.012-.57-.012-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.058 3.135 4.987 4.274 2.928 1.14 2.928.76 3.877.712.95-.05 3.075-1.263 3.5-2.479.427-1.213.427-2.253.297-2.478-.13-.223-.297-.297-.594-.446z" />
      <path d="M12.043 2C6.517 2 2 6.478 2 12c0 1.99.577 3.845 1.578 5.416L2 22l4.706-1.542A9.99 9.99 0 0 0 12.043 22C17.57 22 22.086 17.522 22.086 12S17.57 2 12.043 2zm0 18.146c-1.786 0-3.44-.526-4.838-1.435l-.347-.223-2.94.965.982-2.85-.223-.323A8.09 8.09 0 0 1 3.914 12c0-4.487 3.664-8.146 8.13-8.146 4.464 0 8.128 3.659 8.128 8.146s-3.664 8.146-8.129 8.146z" />
    </svg>
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
