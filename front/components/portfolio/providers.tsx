"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries"

type LocaleContextValue = {
  locale: Locale
  t: Dictionary
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const ctx = React.useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within Providers")
  return ctx
}

function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  React.useEffect(() => {
    document.documentElement.lang = initialLocale
  }, [initialLocale])

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale: initialLocale, t: dictionaries[initialLocale] }),
    [initialLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
    </NextThemesProvider>
  )
}
