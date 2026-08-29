import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export interface CredentialStripItem {
  id: string;
  title: string;
  level?: string | null;
}

interface CredentialStripProps {
  items: CredentialStripItem[];
}

/**
 * Refined, horizontal certification strip. Data comes from the Sanity
 * Coach Profile's `credentials` array (see app/page.tsx) — never invented
 * here. Renders nothing if there are no credentials on record.
 *
 * Horizontally scrollable rather than wrapped into a grid: certification
 * names vary a lot in length, and a horizontal row reads as a restrained
 * credibility strip rather than another card grid competing with
 * Expertise/Transformations/Coaching for attention.
 */
export function CredentialStrip({ items }: CredentialStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-surface-border bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Certifications" title="Trained, tested, certified." align="center" className="mx-auto" />
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-surface-border bg-canvas-raised px-5 py-3 whitespace-nowrap"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm font-medium text-ink">
                  {item.title}
                  {item.level ? <span className="text-ink-muted"> &middot; {item.level}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
