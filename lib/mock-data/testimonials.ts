/**
 * TEMPORARY MOCK DATA — Phase 2 only.
 *
 * Sanity schemas for Testimonials do not exist yet. The rendering component
 * (components/testimonials/*) accepts this shape through props, so this
 * file can be deleted and replaced by a Sanity query later without any
 * component changes.
 *
 * Do not add real client quotes here — placeholder content only.
 */

import type { Testimonial } from "@/lib/types/content";

export const mockTestimonials: Testimonial[] = [
  {
    id: "te1",
    clientName: "Client A",
    quote:
      "Alia built a program around my actual schedule and body, not a generic template. I finally understand how to train and eat for how I want to feel, not just a number.",
    category: "Fat Loss & Body Transformation",
    portrait: "/mock/testimonials/placeholder-portrait-1.svg",
    result: "16 weeks, -9 kg",
  },
  {
    id: "te2",
    clientName: "Client B",
    quote:
      "After my second pregnancy I had no idea where to start again. Alia's postpartum program was patient, safe, and genuinely rebuilt my confidence in my own body.",
    category: "Postpartum Fitness & Recovery",
    portrait: "/mock/testimonials/placeholder-portrait-2.svg",
    result: "6 months, full return to training",
  },
  {
    id: "te3",
    clientName: "Client C",
    quote:
      "Every session had a clear purpose. My posture, my lifts, my recovery — all of it improved because the plan was actually built for me.",
    category: "Strength Training",
    portrait: "/mock/testimonials/placeholder-portrait-3.svg",
    result: "12 weeks, +18% strength",
  },
];
