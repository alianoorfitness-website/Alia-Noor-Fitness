import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/layout/nav-links";
import { buildConsultationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface SiteFooterProps {
  siteTitle: string;
  location: string;
  email: string;
  whatsappNumber: string;
  profession: string;
}

export function SiteFooter({
  siteTitle,
  location,
  email,
  whatsappNumber,
  profession,
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  const whatsappUrl = whatsappNumber
    ? buildWhatsAppUrl(whatsappNumber, buildConsultationMessage())
    : null;

  return (
    <footer id="contact" className="scroll-anchor border-t border-surface-border bg-ink text-canvas">
      <div className="mx-auto px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid max-w-6xl grid-cols-1 gap-12 sm:mx-auto sm:grid-cols-[1.2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-2xl">{siteTitle}</p>
            <p className="mt-2 text-sm text-canvas/60">{location}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-canvas/70">
              Certified personal training and coaching, built around your body,
              your schedule, and your goals.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-canvas/50">
              Navigate
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-canvas/75 transition-colors hover:text-canvas"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-canvas/50">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              {whatsappUrl ? (
                <Button
                  href={whatsappUrl}
                  external
                  className="w-full justify-center bg-canvas text-ink hover:bg-highlight sm:w-auto"
                >
                  Chat on WhatsApp
                </Button>
              ) : null}
              <a
                href="#coaching"
                className="text-sm text-canvas/75 transition-colors hover:text-canvas"
              >
                View Coaching Plans
              </a>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-canvas/75 transition-colors hover:text-canvas"
                >
                  {email}
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-canvas/10 pt-6 text-xs text-canvas/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteTitle}. All rights reserved.
          </p>
          <p>{profession} &middot; {location}</p>
        </div>
      </div>
    </footer>
  );
}
