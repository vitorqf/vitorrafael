import { defineArrayMember, defineField, defineType } from "sanity"

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localizedString",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      description: "Absolute URL or local path, e.g. /vitor-rafael-cv.pdf",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "localizedText",
    }),
    defineField({
      name: "basedIn",
      title: "Based In",
      type: "localizedString",
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "localizedString",
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "localizedString",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "socialLink" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.en",
    },
  },
})
