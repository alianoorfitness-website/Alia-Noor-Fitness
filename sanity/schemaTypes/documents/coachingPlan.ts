import { defineField, defineType } from "sanity";

/**
 * A coaching plan/offer (e.g. "Transformation Coaching"). Deliberately has
 * no pricing field — CTAs route to WhatsApp instead of displaying a price,
 * per project requirements.
 */
export const coachingPlan = defineType({
  name: "coachingPlan",
  title: "Coaching Plan",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Transformation Coaching"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "string",
      description: 'e.g. "For clients training in-person in South Delhi"',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "What's included in this plan, shown as a checklist.",
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Visually highlights this plan as the recommended option. Use sparingly — ideally one at a time.",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'Optional label shown on a featured plan, e.g. "Most Popular".',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Inactive plans are hidden from the public website.",
      initialValue: true,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      description: 'e.g. "Apply Now" or "Let\'s Talk". No pricing is ever displayed.',
      validation: (Rule) => Rule.required().max(30),
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "idealFor" },
  },
});
