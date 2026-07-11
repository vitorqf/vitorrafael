import type { Metadata } from "next"
import { dictionaries, enabledLocales, type Locale } from "@/lib/i18n/dictionaries"
import { getPathWithLocale } from "@/lib/i18n/routing"
import { siteConfig } from "@/lib/site"

type MetadataInput = {
  locale: Locale
  path: string
  title?: string
  description?: string
  imageUrl?: string
}

export function createLocalizedMetadata({
  locale,
  path,
  title,
  description,
  imageUrl,
}: MetadataInput): Metadata {
  const dictionary = dictionaries[locale]
  const resolvedTitle = title ?? dictionary.metadata.title
  const resolvedDescription = description ?? dictionary.metadata.description
  const localizedPath = getPathWithLocale(path, locale)
  const url = new URL(localizedPath, siteConfig.url)

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        enabledLocales.map((item) => [item.code, getPathWithLocale(path, item.code)]),
      ),
    },
    openGraph: {
      type: "website",
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      locale,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}
