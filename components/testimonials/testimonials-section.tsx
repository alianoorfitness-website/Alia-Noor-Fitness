import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { TestimonialsMarquee } from "@/components/testimonials/testimonials-marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Testimonial } from "@/lib/types/content";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

/**
 * Data comes from Sanity via app/page.tsx. No fallback to mock data — the
 * section is hidden entirely when there are no published testimonials
 * rather than ever showing fabricated quotes.
 *
 * Two or more testimonials scroll in a continuous horizontal marquee (see
 * TestimonialsMarquee). A single testimonial has nothing to loop against,
 * so it renders as one static centered card instead — looping a single
 * repeated card would look broken, not premium.
 */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-anchor overflow-hidden bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="In their words." />
        </Reveal>
      </div>

      {testimonials.length === 1 ? (
        <div className="mx-auto mt-12 max-w-xl px-6 sm:px-8">
          <Reveal delay={0.1}>
            <TestimonialCard testimonial={testimonials[0]} />
          </Reveal>
        </div>
      ) : (
        <Reveal delay={0.1} className="mt-12">
          <TestimonialsMarquee testimonials={testimonials} />
        </Reveal>
      )}
    </section>
  );
}
