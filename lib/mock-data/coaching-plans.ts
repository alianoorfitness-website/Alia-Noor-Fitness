/**
 * TEMPORARY MOCK DATA — Phase 2 only.
 *
 * Sanity schemas for Coaching Plans do not exist yet. The rendering
 * component (components/coaching/*) accepts this shape through props, so
 * this file can be deleted and replaced by a Sanity query later without
 * any component changes.
 *
 * No real pricing is included per project requirements — CTAs route to
 * WhatsApp/application flow instead of displaying a price.
 */

import type { CoachingPlan } from "@/lib/types/content";

export const mockCoachingPlans: CoachingPlan[] = [
  {
    id: "p1",
    name: "Personal Training",
    audience: "For clients training in-person in South Delhi",
    description:
      "Hands-on, in-person coaching with real-time form correction, progressive programming, and direct accountability every session.",
    features: [
      "In-person sessions",
      "Real-time form & technique correction",
      "Progressive strength programming",
      "Ongoing plan adjustments",
    ],
    ctaLabel: "Apply Now",
  },
  {
    id: "p2",
    name: "Transformation Coaching",
    audience: "For clients committed to a focused, structured transformation",
    description:
      "A complete coaching system combining training, nutrition guidance, and consistent check-ins built around a defined transformation goal.",
    features: [
      "Personalized training program",
      "Nutrition & sports nutrition guidance",
      "Regular progress check-ins",
      "Direct WhatsApp support",
    ],
    ctaLabel: "Apply Now",
    featured: true,
  },
  {
    id: "p3",
    name: "Online Coaching",
    audience: "For clients who want expert programming from anywhere",
    description:
      "Remote coaching for clients who want a structured, expert-built plan with flexibility on where and when they train.",
    features: [
      "Custom remote training plan",
      "Video form review",
      "Nutrition framework",
      "Async coaching support",
    ],
    ctaLabel: "Let's Talk",
  },
];
