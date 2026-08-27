import { defineField, defineType } from "sanity";

/**
 * A single expertise/service area (e.g. "Strength Training"). Rendered by
 * the frontend's grouped, expandable expertise list — `category` drives
 * the grouping, `order` drives sort order within a category.
 */
export const expertise = defineType({
  name: "expertise",
  title: "Expertise",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Strength Training"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "Optional one-line summary.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional longer description, if the design ever needs it.",
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Groups this item under a heading in the expertise section.",
      options: {
        list: [
          { title: "Transformation & Strength", value: "Transformation & Strength" },
          { title: "Movement & Recovery", value: "Movement & Recovery" },
          { title: "Performance & Nutrition", value: "Performance & Nutrition" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconKey",
      title: "Icon Key",
      type: "string",
      description:
        "A controlled key the frontend maps to an icon. Do not put icon components/JSX here.",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Strength", value: "strength" },
          { title: "Fat Loss", value: "fat-loss" },
          { title: "Recovery", value: "recovery" },
          { title: "Mobility", value: "mobility" },
          { title: "Nutrition", value: "nutrition" },
          { title: "Performance", value: "performance" },
        ],
      },
      initialValue: "none",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers display first within their category.",
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Inactive items are hidden from the public website.",
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
    select: { title: "title", subtitle: "category" },
  },
});
