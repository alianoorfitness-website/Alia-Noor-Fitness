import { defineField, defineType } from "sanity";

/**
 * A single step in the "How It Works" section (e.g. "01 — Apply").
 */
export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: 'Display label, e.g. "01"',
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Apply"',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
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
    select: { title: "title", subtitle: "number" },
  },
});
