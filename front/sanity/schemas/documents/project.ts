import { defineArrayMember, defineField, defineType } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document) =>
          ((document as { title?: { en?: string; ptBR?: string } }).title?.en ||
            (document as { title?: { en?: string; ptBR?: string } }).title?.ptBR ||
            ""),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "localizedString",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caseStudies",
      title: "Case Studies",
      description: "One project can contain multiple case-study highlights.",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "caseStudy",
          title: "Case Study",
          type: "object",
          fields: [
            defineField({
              name: "slug",
              title: "Case Study Slug",
              description: "Used for section anchors in the project page (kebab-case).",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .regex(
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    "Use lowercase letters, numbers, and dashes only.",
                  ),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "summary",
              title: "Summary",
              type: "localizedText",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "problem",
              title: "Problem",
              type: "localizedText",
            }),
            defineField({
              name: "systemFocus",
              title: "System Focus",
              type: "localizedText",
            }),
            defineField({
              name: "outcome",
              title: "Outcome",
              type: "localizedText",
            }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "localizedStringArray",
            }),
            defineField({
              name: "body",
              title: "Case Study Body",
              type: "localizedStringArray",
            }),
            defineField({
              name: "stack",
              title: "Technology Stack",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "externalUrl",
              title: "External URL",
              type: "url",
            }),
            defineField({
              name: "featured",
              title: "Featured",
              description: "Primary highlight used in project cards.",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              initialValue: 100,
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "slug",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "stack",
      title: "Technology Stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "object",
      fields: [
        defineField({ name: "startDate", title: "Start Date", type: "date" }),
        defineField({ name: "endDate", title: "End Date", type: "date" }),
      ],
    }),
    defineField({
      name: "year",
      title: "Year Label",
      description: "Optional short label, e.g. 2025",
      type: "string",
    }),
    defineField({
      name: "accent",
      title: "Accent Tone",
      type: "string",
      options: {
        list: [
          { title: "Cyan", value: "cyan" },
          { title: "Amber", value: "amber" },
          { title: "Violet", value: "violet" },
          { title: "Emerald", value: "emerald" },
        ],
      },
      initialValue: "cyan",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "slug.current",
      media: "coverImage",
    },
  },
})
