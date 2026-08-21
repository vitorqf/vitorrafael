import type { MetadataRoute } from "next"
import { enabledLocales } from "@/lib/i18n/dictionaries"
import { getPostSlugs, getPosts, getProjectSlugs } from "@/lib/sanity/queries"
import { siteConfig } from "@/lib/site"

const staticPaths = ["", "/projects", "/blog"]

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, postSlugs, posts] = await Promise.all([
    getProjectSlugs(),
    getPostSlugs(),
    getPosts(),
  ])

  const postDateBySlug = new Map(posts.map((post) => [post.slug, post.publishedAt]))
  const urls: MetadataRoute.Sitemap = []

  for (const locale of enabledLocales) {
    for (const path of staticPaths) {
      urls.push({
        url: absoluteUrl(`/${locale.code}${path}`),
        changeFrequency: path === "" ? "monthly" : "weekly",
        priority: path === "" ? 1 : 0.8,
      })
    }

    for (const slug of projectSlugs) {
      urls.push({
        url: absoluteUrl(`/${locale.code}/projects/${slug}`),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    }

    for (const slug of postSlugs) {
      urls.push({
        url: absoluteUrl(`/${locale.code}/blog/${slug}`),
        lastModified: postDateBySlug.get(slug) ? new Date(postDateBySlug.get(slug) as string) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  }

  return urls
}
