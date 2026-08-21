import { notFound } from "next/navigation"
import { Providers } from "@/components/portfolio/providers"
import { enabledLocales, isEnabledLocale } from "@/lib/i18n/dictionaries"
import { getDictionary, getProfile, getSiteSettings } from "@/lib/sanity/queries"

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale: locale.code }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isEnabledLocale(locale)) {
    notFound()
  }

  const [dictionary, profile, siteSettings] = await Promise.all([
    getDictionary(locale),
    getProfile(),
    getSiteSettings(locale),
  ])

  const mergedProfile = {
    ...profile,
    resumeUrl: siteSettings.resumeUrl ?? profile.resumeUrl,
  }

  return (
    <Providers initialLocale={locale} initialDictionary={dictionary} profile={mergedProfile}>
      {children}
    </Providers>
  )
}
