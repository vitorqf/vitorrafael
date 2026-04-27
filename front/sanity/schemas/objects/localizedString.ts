import { defineField, defineType } from "sanity"

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
    defineField({
      name: "ptBR",
      title: "Portuguese (Brazil)",
      type: "string",
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      const localized = value as { en?: string; ptBR?: string }
      return localized.en || localized.ptBR ? true : "Provide at least one localized value"
    }),
})
