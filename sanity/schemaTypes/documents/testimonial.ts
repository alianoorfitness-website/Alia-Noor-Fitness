import { defineField, defineType } from "sanity";

/**
 * A client testimonial. Rendered by the editorial testimonial carousel
 * (components/testimonials/testimonials-carousel.tsx). Do not seed
 * fabricated testimonials — this schema exists so real ones can be added
 * later; the frontend hides the section entirely when none are published.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "clientImage",
      title: "Client Image",
      type: "image",
      description: "Optional small portrait shown alongside the quote.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "transformationType",
      title: "Transformation Type",
      type: "string",
      description: 'e.g. "Fat Loss & Body Transformation"',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "roleOrDescriptor",
      title: "Role / Descriptor",
      type: "string",
      description: 'Optional short descriptor shown under the client name, e.g. "12 weeks in".',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Unpublished testimonials are hidden from the public website.",
      initialValue: false,
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
    select: { title: "clientName", subtitle: "transformationType", media: "clientImage" },
  },
});
