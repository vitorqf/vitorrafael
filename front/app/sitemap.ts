import type { MetadataRoute } from "next"
import { articles } from "@/lib/data/writing"
import { projects } from "@/lib/data/projects"
import { locales } from "@/lib/i18n/dictionaries"
import { siteConfig } from "@/lib/site"

const staticPaths = ["", "/projects", "/blog"]

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      urls.push({
        url: absoluteUrl(`/${locale.code}${path}`),
        changeFrequency: path === "" ? "monthly" : "weekly",
        priority: path === "" ? 1 : 0.8,
      })
    }

    for (const project of projects) {
      urls.push({
        url: absoluteUrl(`/${locale.code}/projects/${project.slug}`),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }

    for (const article of articles) {
      urls.push({
        url: absoluteUrl(`/${locale.code}/blog/${article.slug}`),
        lastModified: new Date(article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return urls
}
