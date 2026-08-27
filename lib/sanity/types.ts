/**
 * Types describing raw GROQ query results, shaped exactly like the
 * projections in lib/sanity/queries.ts (not the full Sanity document
 * schema). These are the "before mapping" shapes — see
 * lib/sanity/mappers.ts for how they're normalized into the frontend's
 * existing component prop types (lib/types/content.ts).
 */

/**
 * Portable Text content is an array of loosely-typed block objects; we
 * don't need a precise shape here since it's passed straight through to
 * `@portabletext/react`'s <PortableText> component for rendering. `_type`
 * is required so it satisfies `@portabletext/react`'s `TypedObject`.
 */
export type PortableTextContent = Array<{ _type: string } & Record<string, unknown>>;

/**
 * An image field value as returned by our `{ ..., alt }` GROQ projection:
 * the full image object (asset reference, hotspot, crop) plus the custom
 * `alt` subfield. This object itself is a valid `SanityImageSource` for
 * `urlFor()` — pass it directly, not a nested `.asset`.
 */
export interface SanityImageWithAlt {
  asset?: { _ref: string; _type: "reference" };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
}

export interface SiteSettingsResult {
  siteTitle: string;
  coachName: string;
  profession: string;
  location: string;
  email: string;
  whatsappNumber: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  heroImage: SanityImageWithAlt | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface CredentialResult {
  title: string;
  organization?: string | null;
  level?: string | null;
  description?: string | null;
  order?: number | null;
  featured?: boolean | null;
}

export interface CoachProfileResult {
  name: string;
  role: string;
  yearsExperience: number;
  currentAssociation?: string | null;
  associationExperience?: string | null;
  location?: string | null;
  introduction: PortableTextContent;
  coachingPhilosophy?: PortableTextContent | null;
  profileImage: SanityImageWithAlt | null;
  credentials?: CredentialResult[] | null;
}

export interface ExpertiseResult {
  _id: string;
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  category: string;
  iconKey?: string | null;
  order: number;
  featured?: boolean | null;
}

export interface MetricResult {
  label: string;
  value: string;
}

export interface TransformationResult {
  _id: string;
  clientName: string;
  beforeImage: SanityImageWithAlt | null;
  afterImage: SanityImageWithAlt | null;
  description: string;
  duration: string;
  category: string;
  metrics?: MetricResult[] | null;
  featured?: boolean | null;
  order?: number | null;
}

export interface TestimonialResult {
  _id: string;
  clientName: string;
  testimonial: string;
  clientImage: SanityImageWithAlt | null;
  transformationType?: string | null;
  roleOrDescriptor?: string | null;
  featured?: boolean | null;
  order?: number | null;
}

export interface CoachingPlanResult {
  _id: string;
  title: string;
  shortDescription?: string | null;
  idealFor: string;
  description: string;
  features: string[];
  featured?: boolean | null;
  badge?: string | null;
  order?: number | null;
  ctaLabel: string;
}

export interface ProcessStepResult {
  _id: string;
  number: string;
  title: string;
  description: string;
  order: number;
}

export interface FaqResult {
  _id: string;
  question: string;
  answer: string;
  category?: string | null;
  order?: number | null;
}
