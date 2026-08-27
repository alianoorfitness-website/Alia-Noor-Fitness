import { defineField, defineType } from "sanity";

/**
 * A client before/after transformation. Rendered by the frontend's
 * drag-to-compare slider (components/transformations/before-after-slider.tsx).
 *
 * Content rule: metrics are free-text label/value pairs entered by the
 * coach — the schema does not compute, imply, or store any medical/weight
 * statistics on its own. Do not seed fabricated metrics.
 */
export const transformation = defineType({
  name: "transformation",
  title: "Transformation",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description: "First name or initials — respect client privacy preferences.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "16 weeks"',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Should generally match one of the Expertise titles/categories.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{ type: "metric" }],
      description:
        'Optional free-text stats provided by the coach, e.g. Label: "Duration", Value: "16 weeks". Do not fabricate.',
      validation: (Rule) => Rule.max(4),
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
      description: "Unpublished transformations are hidden from the public website.",
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
    select: { title: "clientName", subtitle: "category", media: "afterImage" },
  },
});
