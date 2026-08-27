import { Reveal } from "@/components/ui/reveal";

export interface CredentialStripItem {
  id: string;
  label: string;
}

interface CredentialStripProps {
  items: CredentialStripItem[];
}

/**
 * Compact credibility strip between the hero and the coach introduction.
 * Deliberately typographic rather than a logo grid — separators instead
 * of cards or boxes keep it feeling editorial, not template-like.
 *
 * Renders nothing if there are no items to show, rather than an empty bar.
 */
export function CredentialStrip({ items }: CredentialStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-surface-border bg-canvas-raised">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-8 sm:px-8 sm:py-10">
        {items.map((item, index) => (
          <span key={item.id} className="flex items-center gap-8">
            <span className="break-words text-xs font-medium uppercase tracking-[0.16em] text-ink-muted sm:text-sm">
              {item.label}
            </span>
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-accent sm:block" />
            ) : null}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
