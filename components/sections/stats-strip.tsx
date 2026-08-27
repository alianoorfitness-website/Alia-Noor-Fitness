import { Reveal } from "@/components/ui/reveal";

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface StatsStripProps {
  items: StatItem[];
}

/**
 * Visually distinct trust/metrics strip shown right after the hero. Every
 * value is derived from real Sanity content (years of experience entered
 * on the Coach Profile, counts of actual published transformations,
 * credentials, and expertise areas) — never a fabricated business claim
 * like a client count. See app/page.tsx for how `items` is built.
 *
 * Renders nothing if there's nothing real to show.
 */
export function StatsStrip({ items }: StatsStripProps) {
  if (items.length === 0) return null;

  return (
    <section className="relative bg-ink py-10 sm:py-12">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 sm:gap-8 sm:px-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col gap-1 text-center sm:text-left ${
              index > 0 ? "sm:border-l sm:border-canvas/15 sm:pl-8" : ""
            }`}
          >
            <span className="font-display text-3xl text-canvas sm:text-4xl">{item.value}</span>
            <span className="text-xs uppercase tracking-[0.14em] text-canvas/65 sm:text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
