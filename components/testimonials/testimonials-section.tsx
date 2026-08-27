import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel";
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
 */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-anchor bg-surface py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="In their words."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-[2rem] bg-canvas-raised p-8 shadow-[0_30px_60px_-40px_rgba(28,26,25,0.25)] sm:p-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
