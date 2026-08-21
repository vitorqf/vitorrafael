import type { Metadata } from "next"
import { dictionaries, locales, type Locale } from "@/lib/i18n/dictionaries"
import { getPathWithLocale } from "@/lib/i18n/routing"
import { siteConfig } from "@/lib/site"

type MetadataInput = {
  locale: Locale
  path: string
  title?: string
  description?: string
  canonicalPath?: string
  openGraphImageUrl?: string
  siteName?: string
}

export function createLocalizedMetadata({
  locale,
  path,
  title,
  description,
  canonicalPath,
  openGraphImageUrl,
  siteName,
}: MetadataInput): Metadata {
  const dictionary = dictionaries[locale]
  const resolvedTitle = title ?? dictionary.metadata.title
  const resolvedDescription = description ?? dictionary.metadata.description
  const localizedPath = getPathWithLocale(path, locale)
  const canonicalOverride = canonicalPath?.trim()
    ? canonicalPath.trim().replace(/\{locale\}/g, locale)
    : undefined
  const canonical = canonicalOverride
    ? new URL(canonicalOverride.startsWith("/") ? canonicalOverride : `/${canonicalOverride}`, siteConfig.url)
    : new URL(localizedPath, siteConfig.url)
  const images = openGraphImageUrl ? [{ url: openGraphImageUrl }] : undefined

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((item) => [item.code, getPathWithLocale(path, item.code)]),
      ),
    },
    openGraph: {
      type: "website",
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: siteName ?? siteConfig.name,
      locale,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(images ? { images: images.map((item) => item.url) } : {}),
    },
  }
}
