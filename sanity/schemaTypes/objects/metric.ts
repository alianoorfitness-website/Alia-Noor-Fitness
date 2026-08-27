import { defineField, defineType } from "sanity";

/**
 * Reusable label/value pair used for optional transformation metrics
 * (e.g. "Duration" / "12 weeks"). Deliberately generic — no numeric
 * "results" fields, since we do not want to imply verified before/after
 * statistics beyond what the coach explicitly enters.
 */
export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Duration"',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: 'e.g. "12 weeks"',
      validation: (Rule) => Rule.required().max(60),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
