import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import type { Testimonial } from "@/lib/types/content";

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
}

/** Seconds each additional testimonial adds to one full loop — keeps the
 * per-card travel speed constant regardless of how many entries exist,
 * rather than a fixed total duration that would speed up or slow down as
 * content is added/removed in Sanity. */
const SECONDS_PER_ITEM = 7;
const MIN_DURATION_SECONDS = 24;

const CARD_WIDTH_CLASSES = "w-[240px] shrink-0 sm:w-[280px] md:w-[300px]";

/**
 * Continuously scrolling, seamless horizontal testimonial loop. Purely
 * CSS-driven (see the `.testimonial-marquee*` rules in app/globals.css) —
 * no scroll listeners or animation library needed, which keeps this a
 * server component.
 *
 * Seamlessness comes from rendering the testimonial list twice back to
 * back and animating the track exactly 50% of its own width: since both
 * halves are identical, the moment the first half scrolls fully out of
 * view the second half is in the exact position the first started in,
 * so the loop point is invisible. This works for any testimonial count.
 *
 * With exactly one testimonial there's nothing to loop — rendering it
 * twice would just show the same card twice with an unnecessary
 * animation, so a single testimonial renders as a static centered card
 * instead (see TestimonialsSection).
 */
export function TestimonialsMarquee({ testimonials }: TestimonialsMarqueeProps) {
  const duration = Math.max(MIN_DURATION_SECONDS, testimonials.length * SECONDS_PER_ITEM);

  return (
    <div
      className="testimonial-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      role="region"
      aria-label="Client testimonials"
    >
      <div
        className="testimonial-marquee-track flex w-max gap-4 py-2 sm:gap-6"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={CARD_WIDTH_CLASSES}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
        {/* Exact duplicate of the set above, hidden from assistive tech so
            screen readers don't announce every testimonial twice. `display:
            contents` keeps these divs from affecting flex layout — their
            children participate as direct flex items of the track, which is
            what makes the "-50%" translate in the CSS keyframe line up
            exactly with the end of the first (real) set. */}
        <div aria-hidden="true" style={{ display: "contents" }}>
          {testimonials.map((testimonial) => (
            <div key={`${testimonial.id}-duplicate`} className={CARD_WIDTH_CLASSES}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
