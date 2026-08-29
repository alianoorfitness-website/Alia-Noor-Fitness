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
    <footer id="contact" className="hero-gradient scroll-anchor text-canvas">
      <div className="mx-auto px-6 py-12 sm:px-8 sm:py-14">
        <div className="grid max-w-6xl grid-cols-1 gap-10 sm:mx-auto sm:grid-cols-[1.2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold">{siteTitle}</p>
            <span className="mt-1.5 flex items-center gap-1.5 text-sm text-canvas/60">
              <LocationIcon />
              {location}
            </span>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-canvas/50">
              Quick Links
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-2">
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
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-canvas/50">
              Get In Touch
            </p>
            <div className="flex flex-col gap-2">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-canvas/75 transition-colors hover:text-canvas"
                >
                  WhatsApp
                </a>
              ) : null}
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

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-canvas/10 pt-5 text-xs text-canvas/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteTitle}. All rights reserved.
          </p>
          <p>{profession} &middot; {location}</p>
        </div>
      </div>
    </footer>
  );
}

function LocationIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 14.5S13 10.4 13 6.5A5 5 0 0 0 3 6.5c0 3.9 5 8 5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="6.5" r="1.75" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
