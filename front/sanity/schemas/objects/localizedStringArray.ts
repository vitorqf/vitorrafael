import { defineArrayMember, defineField, defineType } from "sanity"

export const localizedStringArray = defineType({
  name: "localizedStringArray",
  title: "Localized String Array",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ptBR",
      title: "Portuguese (Brazil)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      const localized = value as { en?: string[]; ptBR?: string[] }
      return localized.en?.length || localized.ptBR?.length ? true : "Provide at least one localized value"
    }),
})
