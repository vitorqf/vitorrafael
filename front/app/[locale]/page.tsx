import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HomePage } from "@/components/portfolio/home-page"
import { isLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/lib/sanity/queries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const siteSettings = await getSiteSettings(locale)

  return createLocalizedMetadata({
    locale,
    path: "/",
    title: siteSettings.metadataTitle[locale],
    description: siteSettings.metadataDescription[locale],
    openGraphImageUrl: siteSettings.openGraphImageUrl,
    siteName: siteSettings.siteName,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <HomePage />
}
