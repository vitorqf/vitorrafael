import { defineArrayMember, defineField, defineType } from "sanity"

export const experienceItem = defineType({
  name: "experienceItem",
  title: "Experience Item",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      description: "Stable identifier used by the frontend.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "object",
      fields: [
        defineField({ name: "start", title: "Start", type: "string" }),
        defineField({ name: "end", title: "End", type: "string" }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
    }),
    defineField({
      name: "achievements",
      title: "Achievements",
      type: "localizedStringArray",
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "role.en",
      subtitle: "company",
    },
  },
})
