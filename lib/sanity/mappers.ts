/**
 * Normalizes raw Sanity query results (lib/sanity/types.ts) into the
 * frontend's existing component prop shapes (lib/types/content.ts). This
 * is the only place that should know both "what Sanity returns" and "what
 * the components expect" — components themselves stay unaware of Sanity.
 */

import { urlFor } from "@/lib/sanity/image";
import type {
  CoachingPlanResult,
  CredentialResult,
  SanityImageWithAlt,
  TestimonialResult,
  TransformationResult,
} from "@/lib/sanity/types";
import type { CoachingPlan, Testimonial, Transformation } from "@/lib/types/content";

/**
 * Builds a sized Sanity CDN URL for a given image field, or returns
 * `undefined` if the field is empty (e.g. optional testimonial portraits).
 */
export function sanityImageUrl(
  image: SanityImageWithAlt | null | undefined,
  width: number
): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image).width(width).auto("format").url();
}

export function mapTransformation(result: TransformationResult): Transformation | null {
  const beforeImage = sanityImageUrl(result.beforeImage, 900);
  const afterImage = sanityImageUrl(result.afterImage, 900);

  // Both images are required for a usable before/after slider — skip
  // entries missing either rather than rendering a broken comparison.
  if (!beforeImage || !afterImage) return null;

  const primaryMetric = result.metrics?.[0];

  return {
    id: result._id,
    clientName: result.clientName,
    beforeImage,
    afterImage,
    duration: result.duration,
    category: result.category,
    description: result.description,
    metric: primaryMetric ? primaryMetric.value : undefined,
  };
}

export function mapTestimonial(result: TestimonialResult): Testimonial {
  return {
    id: result._id,
    clientName: result.clientName,
    quote: result.testimonial,
    category: result.transformationType ?? undefined,
    portrait: sanityImageUrl(result.clientImage, 96),
    result: result.roleOrDescriptor ?? undefined,
  };
}

/**
 * Maps a Sanity credential object into the `{ id, title }` shape used by
 * both the coach intro section's credential grid and the credential strip.
 * Credentials are objects, not documents, so there's no `_id` — a stable
 * key is derived from the title + index at the call site instead.
 */
export function mapCredentialTitle(result: CredentialResult, index: number): { id: string; title: string } {
  return { id: `${result.title}-${index}`, title: result.title };
}

export function mapCoachingPlan(result: CoachingPlanResult): CoachingPlan {
  return {
    id: result._id,
    name: result.title,
    audience: result.idealFor,
    description: result.description,
    features: result.features,
    ctaLabel: result.ctaLabel,
    featured: result.featured ?? false,
  };
}
