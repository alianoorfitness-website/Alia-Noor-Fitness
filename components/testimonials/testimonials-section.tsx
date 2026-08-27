import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { mockTestimonials } from "@/lib/mock-data/testimonials";
import type { Testimonial } from "@/lib/types/content";

interface TestimonialsSectionProps {
  /** Defaults to temporary mock data; pass Sanity-sourced data once available. */
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  testimonials = mockTestimonials,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="In their words."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14 rounded-[2rem] bg-canvas-raised p-8 sm:p-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
