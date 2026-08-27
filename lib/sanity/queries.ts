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
 */

import { cache } from "react";

import { client } from "@/lib/sanity/client";
import type {
  CoachingPlanResult,
  CoachProfileResult,
  ExpertiseResult,
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
    return client.fetch<SiteSettingsResult | null>(query);
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
    return client.fetch<CoachProfileResult | null>(query);
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
      order
    }
  `;
  return client.fetch<ExpertiseResult[]>(query);
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
    return client.fetch<TransformationResult[]>(query);
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
    return client.fetch<TestimonialResult[]>(query);
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
    return client.fetch<CoachingPlanResult[]>(query);
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
    return client.fetch<ProcessStepResult[]>(query);
  }
);
