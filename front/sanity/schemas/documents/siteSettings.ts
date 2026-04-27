import { defineField, defineType } from "sanity"

const ls = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "localizedString",
  })

const lt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "localizedText",
  })

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Vitor Rafael",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metadataTitle",
      title: "Default Metadata Title",
      type: "localizedString",
    }),
    defineField({
      name: "metadataDescription",
      title: "Default Metadata Description",
      type: "localizedText",
    }),
    defineField({
      name: "openGraphImage",
      title: "Default Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      description: "Absolute URL or local path, e.g. /vitor-rafael-cv.pdf",
      type: "string",
    }),
    defineField({
      name: "analyticsKey",
      title: "Analytics Key",
      type: "string",
    }),
    defineField({
      name: "copy",
      title: "Localized UI Copy",
      type: "object",
      fields: [
        defineField({
          name: "metadata",
          title: "Metadata Copy",
          type: "object",
          fields: [ls("title", "Title"), lt("description", "Description")],
        }),
        defineField({
          name: "nav",
          title: "Navigation Copy",
          type: "object",
          fields: [
            ls("projects", "Projects"),
            ls("writing", "Writing"),
            ls("about", "About"),
            ls("contact", "Contact"),
            ls("resume", "Resume"),
          ],
        }),
        defineField({
          name: "hero",
          title: "Hero Copy",
          type: "object",
          fields: [
            ls("availability", "Availability"),
            ls("timezone", "Timezone"),
            lt("headline", "Headline"),
            lt("description", "Description"),
            ls("ctaPrimary", "Primary CTA"),
            ls("ctaSecondary", "Secondary CTA"),
            ls("currentlyBuilding", "Currently Building"),
            ls("focusKicker", "Focus Kicker"),
            ls("focusTitle", "Focus Title"),
            defineField({
              name: "focusItems",
              title: "Focus Items",
              type: "localizedStringArray",
            }),
          ],
        }),
        defineField({
          name: "metrics",
          title: "Metrics Section Copy",
          type: "object",
          fields: [ls("eyebrow", "Eyebrow"), ls("title", "Title"), lt("description", "Description")],
        }),
        defineField({
          name: "projects",
          title: "Projects Section Copy",
          type: "object",
          fields: [
            ls("eyebrow", "Eyebrow"),
            ls("title", "Title"),
            lt("description", "Description"),
            ls("readCaseStudy", "Read Case Study"),
            ls("visit", "Visit"),
            lt("editorialNote", "Editorial Note"),
          ],
        }),
        defineField({
          name: "skills",
          title: "Skills Section Copy",
          type: "object",
          fields: [ls("eyebrow", "Eyebrow"), ls("title", "Title"), lt("description", "Description")],
        }),
        defineField({
          name: "experience",
          title: "Experience Section Copy",
          type: "object",
          fields: [
            ls("eyebrow", "Eyebrow"),
            ls("title", "Title"),
            lt("description", "Description"),
            ls("present", "Present Label"),
          ],
        }),
        defineField({
          name: "writing",
          title: "Writing Section Copy",
          type: "object",
          fields: [
            ls("eyebrow", "Eyebrow"),
            ls("title", "Title"),
            lt("description", "Description"),
            ls("readArticle", "Read Article"),
            ls("minRead", "Min Read Label"),
            ls("viewAll", "View All Label"),
          ],
        }),
        defineField({
          name: "about",
          title: "About Section Copy",
          type: "object",
          fields: [
            ls("eyebrow", "Eyebrow"),
            ls("title", "Title"),
            lt("body", "Body"),
            ls("basedIn", "Based In"),
            ls("timezone", "Timezone"),
            ls("languages", "Languages"),
            ls("locationLabel", "Location Label"),
            ls("timezoneLabel", "Timezone Label"),
            ls("languagesLabel", "Languages Label"),
          ],
        }),
        defineField({
          name: "contact",
          title: "Contact Section Copy",
          type: "object",
          fields: [
            ls("eyebrow", "Eyebrow"),
            ls("title", "Title"),
            lt("description", "Description"),
            ls("contactMe", "Contact Me"),
            ls("downloadCv", "Download CV"),
            ls("linkedin", "LinkedIn Label"),
          ],
        }),
        defineField({
          name: "footer",
          title: "Footer Copy",
          type: "object",
          fields: [lt("builtWith", "Built With"), ls("location", "Location"), ls("rights", "Rights")],
        }),
        defineField({
          name: "pages",
          title: "Page Copy",
          type: "object",
          fields: [
            ls("projectsTitle", "Projects Title"),
            lt("projectsDescription", "Projects Description"),
            ls("blogTitle", "Blog Title"),
            lt("blogDescription", "Blog Description"),
            ls("backHome", "Back Home"),
            ls("backProjects", "Back Projects"),
            ls("backBlog", "Back Blog"),
            ls("caseStudy", "Case Study"),
            ls("caseLabel", "Case Label"),
            ls("overview", "Overview"),
            ls("problem", "Problem"),
            ls("systemFocus", "System Focus"),
            ls("outcome", "Outcome"),
            ls("highlights", "Highlights"),
            ls("stack", "Stack"),
            ls("openProject", "Open Project"),
            ls("readArticle", "Read Article"),
            ls("published", "Published"),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
      }
    },
  },
})
