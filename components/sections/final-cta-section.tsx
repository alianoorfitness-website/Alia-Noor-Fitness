import { Reveal } from "@/components/ui/reveal";
import { buildConsultationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface FinalCtaSectionProps {
  whatsappNumber: string;
}

export function FinalCtaSection({ whatsappNumber }: FinalCtaSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, buildConsultationMessage());

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-canvas sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(168,80,59,0.4)_0%,_transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(199,160,90,0.18)_0%,_transparent_55%)]"
      />
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-canvas/60">
            Start Today
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            Your strongest chapter{" "}
            <span className="italic text-highlight">starts here.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-balance text-base leading-relaxed text-canvas/75">
            Personalized coaching, built around your body and your goals —
            starting with a single conversation on WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-canvas px-7 py-3.5 text-[15px] font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-highlight"
          >
            Start Your Transformation
          </a>
          <a
            href="#coaching"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-canvas/30 px-7 py-3.5 text-[15px] font-medium tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink"
          >
            View Coaching Plans
          </a>
        </Reveal>
      </div>
    </section>
  );
}
