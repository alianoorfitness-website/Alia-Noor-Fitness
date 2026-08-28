/**
 * Centralized GROQ queries. Components never write GROQ directly — page
 * code (Server Components) calls the fetch functions in this file, which
 * return typed results from lib/sanity/types.ts. See lib/sanity/mappers.ts
 * for how those results become the frontend's existing prop shapes.
 *
 * Each query only projects the fields a section actually needs. Every
 * export is wrapped in React's `cache()` so that if both the root layout
 * and the homepage need the same data (e.g. Site Settings) within a
 * single request, it's only fetched once.
 *
 * Fetching goes through `sanityFetch` (lib/sanity/live.ts) rather than
 * `client.fetch` directly. `sanityFetch` tags each cached result with the
 * sync tags Content Lake returns for that specific query, which is what
 * lets `<SanityLive />` revalidate exactly the right cached data the moment
 * a document is published — see lib/sanity/live.ts for details.
 */

import { cache } from "react";

import { sanityFetch } from "@/lib/sanity/live";
import type {
  CoachingPlanResult,
  CoachProfileResult,
  ExpertiseResult,
  FaqResult,
  ProcessStepResult,
  SiteSettingsResult,
  TestimonialResult,
  TransformationResult,
} from "@/lib/sanity/types";

const IMAGE_WITH_ALT_PROJECTION = `{
  ...,
  alt
}`;

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsResult | null> => {
    const query = /* groq */ `
      *[_type == "siteSettings"][0]{
        siteTitle,
        coachName,
        profession,
        location,
        email,
        whatsappNumber,
        heroHeadline,
        heroSubheadline,
        primaryCtaLabel,
        secondaryCtaLabel,
        heroImage${IMAGE_WITH_ALT_PROJECTION},
        seoTitle,
        seoDescription
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as SiteSettingsResult | null;
  }
);

export const getCoachProfile = cache(
  async (): Promise<CoachProfileResult | null> => {
    const query = /* groq */ `
      *[_type == "coachProfile"][0]{
        name,
        role,
        yearsExperience,
        currentAssociation,
        associationExperience,
        location,
        introduction,
        coachingPhilosophy,
        profileImage${IMAGE_WITH_ALT_PROJECTION},
        credentials[]{
          title,
          organization,
          level,
          description,
          order,
          featured
        } | order(order asc)
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as CoachProfileResult | null;
  }
);

export const getExpertise = cache(async (): Promise<ExpertiseResult[]> => {
  const query = /* groq */ `
    *[_type == "expertise" && active == true] | order(order asc) {
      _id,
      title,
      shortDescription,
      description,
      category,
      iconKey,
      order,
      featured
    }
  `;
  const { data } = await sanityFetch({ query, stega: false });
  return data as ExpertiseResult[];
});

export const getTransformations = cache(
  async (): Promise<TransformationResult[]> => {
    const query = /* groq */ `
      *[_type == "transformation" && published == true] | order(order asc) {
        _id,
        clientName,
        beforeImage${IMAGE_WITH_ALT_PROJECTION},
        afterImage${IMAGE_WITH_ALT_PROJECTION},
        description,
        duration,
        category,
        metrics[]{ label, value },
        featured,
        order
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as TransformationResult[];
  }
);

export const getTestimonials = cache(
  async (): Promise<TestimonialResult[]> => {
    const query = /* groq */ `
      *[_type == "testimonial" && published == true] | order(order asc) {
        _id,
        clientName,
        testimonial,
        clientImage${IMAGE_WITH_ALT_PROJECTION},
        transformationType,
        roleOrDescriptor,
        featured,
        order
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as TestimonialResult[];
  }
);

export const getCoachingPlans = cache(
  async (): Promise<CoachingPlanResult[]> => {
    const query = /* groq */ `
      *[_type == "coachingPlan" && active == true] | order(order asc) {
        _id,
        title,
        shortDescription,
        idealFor,
        description,
        features,
        featured,
        badge,
        order,
        ctaLabel
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as CoachingPlanResult[];
  }
);

export const getProcessSteps = cache(
  async (): Promise<ProcessStepResult[]> => {
    const query = /* groq */ `
      *[_type == "processStep" && active == true] | order(order asc) {
        _id,
        number,
        title,
        description,
        order
      }
    `;
    const { data } = await sanityFetch({ query, stega: false });
    return data as ProcessStepResult[];
  }
);

export const getFaqs = cache(async (): Promise<FaqResult[]> => {
  const query = /* groq */ `
    *[_type == "faq" && published == true] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order
    }
  `;
  const { data } = await sanityFetch({ query, stega: false });
  return data as FaqResult[];
});
