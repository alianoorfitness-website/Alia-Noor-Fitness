import { Reveal } from "@/components/ui/reveal";
import { buildConsultationMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface FinalCtaSectionProps {
  whatsappNumber: string;
}

export function FinalCtaSection({ whatsappNumber }: FinalCtaSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, buildConsultationMessage());

  return (
    <section className="hero-gradient relative overflow-hidden py-16 text-canvas sm:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
            Ready to Become <span className="text-highlight">a Stronger You?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-base leading-relaxed text-canvas/75">
            Let&rsquo;s build a fitness routine that works for your body, your
            goals and your life.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors duration-200 hover:bg-accent-strong hover:text-canvas"
          >
            Start Your Transformation
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-canvas/30 px-6 py-3 text-sm font-medium tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas/10"
          >
            WhatsApp Alia
          </a>
        </Reveal>
      </div>
    </section>
  );
}
