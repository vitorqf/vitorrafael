import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HomePage } from "@/components/portfolio/home-page"
import { isLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import { getDictionary } from "@/lib/sanity/queries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale)

  return createLocalizedMetadata({
    locale,
    path: "/",
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
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
