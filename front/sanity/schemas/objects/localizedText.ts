import { defineField, defineType } from "sanity"

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "ptBR",
      title: "Portuguese (Brazil)",
      type: "text",
      rows: 5,
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      const localized = value as { en?: string; ptBR?: string }
      return localized.en || localized.ptBR ? true : "Provide at least one localized value"
    }),
})
