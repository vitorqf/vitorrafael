import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "localizedText",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalPath",
      title: "Canonical Path",
      description: "Optional path override, e.g. /en/projects/tela-brasil",
      type: "string",
    }),
  ],
})
