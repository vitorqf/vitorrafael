import { notFound } from "next/navigation"
import { Providers } from "@/components/portfolio/providers"
import { isLocale, locales } from "@/lib/i18n/dictionaries"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale: locale.code }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <Providers initialLocale={locale}>{children}</Providers>
}
