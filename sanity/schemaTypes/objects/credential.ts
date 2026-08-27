import { defineField, defineType } from "sanity";

/**
 * Reusable credential object, referenced as an array on `coachProfile`
 * (and could be reused elsewhere without duplicating the field structure).
 */
export const credential = defineType({
  name: "credential",
  title: "Credential",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Certified Personal Trainer"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      description: 'e.g. "EREPS"',
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      description: 'e.g. "EQF Level 3"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers display first.",
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this credential in the compact credential strip.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "level" },
  },
});
