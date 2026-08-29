import { defineField, defineType } from "sanity";

/**
 * Singleton document holding global site/brand/contact information and
 * hero copy. Only one instance of this document should ever exist —
 * enforced in the Studio structure (sanity/structure.ts), not by a schema
 * constraint, since Sanity has no native "singleton" document type.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "Used in the browser tab and as the default page title.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "coachName",
      title: "Coach Name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "profession",
      title: "Profession",
      type: "string",
      description: 'e.g. "Certified Personal Trainer / Fitness Coach"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "South Delhi, India"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            name: "email",
            invert: false,
          })
          .error("Enter a valid email address."),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description:
        'Full international number, digits only (e.g. "917295861360"). Used to build wa.me links — do not include spaces, dashes, or a leading "+".',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{8,15}$/, {
            name: "digits-only international number",
          })
          .error("Digits only, international format (e.g. 917295861360)."),
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "Main hero statement. Line breaks are not supported here — keep it short.",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      description: 'e.g. "Start Your Transformation"',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label",
      type: "string",
      description: 'e.g. "Explore Coaching"',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description:
        "Upload a transparent PNG/WebP cutout of Alia only — no background, no design elements. The website's hero background (gradient, decorative shapes, layout) is built in code and will show through around this cutout automatically.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describes the image for screen readers and SEO.",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Overrides the default <title> tag for search engines and social shares.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
