import { defineField, defineType } from "sanity";

/**
 * Singleton document describing Alia Noor for the "Meet Your Coach"
 * section. Only one instance should exist — enforced in the Studio
 * structure, not by a schema constraint.
 */
export const coachProfile = defineType({
  name: "coachProfile",
  title: "Coach Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "Certified Personal Trainer / Fitness Coach"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      description: 'e.g. 4 (renders as "4+ Years")',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "currentAssociation",
      title: "Current Association",
      type: "string",
      description: 'e.g. "Freelance Personal Trainer at Anytime Fitness, Malviya Nagar, Delhi"',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "associationExperience",
      title: "Association Experience",
      type: "string",
      description: 'e.g. "3 years"',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
      description: "The main editorial introduction paragraph(s) in the coach section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coachingPhilosophy",
      title: "Coaching Philosophy",
      type: "array",
      of: [{ type: "block" }],
      description: "Short statement of coaching approach/philosophy.",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
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
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "credential" }],
      description: "Certifications and qualifications, shown in the coach section and credential strip.",
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [{ type: "reference", to: [{ type: "expertise" }] }],
      description: "Optional: highlight specific expertise areas on the coach profile.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "profileImage" },
  },
});
