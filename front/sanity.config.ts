import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { schemaTypes } from "./sanity/schemas"

const singletonTypes = new Set(["siteSettings", "profile"])

export default defineConfig({
  name: "default",
  title: "Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.editor().id("siteSettings").schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(S.editor().id("profile").schemaType("profile").documentId("profile")),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? "")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
