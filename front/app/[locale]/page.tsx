import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HomePage } from "@/components/portfolio/home-page"
import { dictionaries, isLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return createLocalizedMetadata({
    locale,
    path: "/",
    title: dictionaries[locale].metadata.title,
    description: dictionaries[locale].metadata.description,
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
