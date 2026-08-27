/**
 * Shared content shapes for sections that will eventually be backed by
 * Sanity (Transformations, Testimonials, Coaching Plans).
 *
 * These types describe the data a component needs to render — not the
 * Sanity document schema. When Sanity schemas are introduced in the next
 * phase, a small mapping/query layer will translate Sanity documents into
 * these same shapes, so none of the components below need to change.
 */

export interface TransformationMetric {
  label: string;
  value: string;
}

export interface Transformation {
  id: string;
  clientName: string;
  /** Local placeholder path or future Sanity CDN URL. */
  beforeImage: string;
  afterImage: string;
  duration: string;
  category: string;
  description: string;
  /** Free-text label/value pairs entered by the coach, e.g. Duration / 16 weeks. */
  metrics: TransformationMetric[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  category?: string;
  /** Local placeholder path or future Sanity CDN URL. */
  portrait?: string;
  result?: string;
}

export interface CoachingPlan {
  id: string;
  name: string;
  audience: string;
  description: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
