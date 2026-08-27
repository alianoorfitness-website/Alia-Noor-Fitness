import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/layout/nav-links";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    `Hi Alia! I found your website and I'd like to know more about coaching.`
  );

  return (
    <footer id="contact" className="border-t border-surface-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-ink-muted">{siteConfig.location}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
              Certified personal training and coaching, built around your body,
              your schedule, and your goals.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 sm:items-end">
            <Button href="#coaching" variant="secondary" className="w-full sm:w-auto">
              Start Coaching
            </Button>
            <Button href={whatsappUrl} external variant="ghost" className="w-full sm:w-auto">
              WhatsApp Alia
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-surface-border pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Certified Personal Trainer &middot; {siteConfig.location}</p>
        </div>
      </div>
    </footer>
  );
}
