import { Reveal } from "@/components/ui/reveal";

const credentials = [
  "4+ Years Experience",
  "EREPS Certified",
  "EQF Level 3",
  "Fitness Nutrition Specialist",
  "Sports Nutrition Specialist",
];

/**
 * Compact credibility strip between the hero and the coach introduction.
 * Deliberately typographic rather than a logo grid — separators instead
 * of cards or boxes keep it feeling editorial, not template-like.
 */
export function CredentialStrip() {
  return (
    <section className="border-y border-surface-border bg-canvas-raised">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-8 sm:px-8 sm:py-10">
        {credentials.map((item, index) => (
          <span key={item} className="flex items-center gap-8">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted sm:text-sm">
              {item}
            </span>
            {index < credentials.length - 1 ? (
              <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
            ) : null}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
