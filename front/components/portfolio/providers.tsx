"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries"
import type { Profile } from "@/lib/sanity/types"

type LocaleContextValue = {
  locale: Locale
  t: Dictionary
  profile: Profile
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
  initialDictionary,
  profile,
}: {
  children: React.ReactNode
  initialLocale: Locale
  initialDictionary: Dictionary
  profile: Profile
}) {
  React.useEffect(() => {
    document.documentElement.lang = initialLocale
  }, [initialLocale])

  const value = React.useMemo<LocaleContextValue>(
    () => ({ locale: initialLocale, t: initialDictionary, profile }),
    [initialDictionary, initialLocale, profile],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function Providers({
  children,
  initialLocale,
  initialDictionary,
  profile,
}: {
  children: React.ReactNode
  initialLocale: Locale
  initialDictionary?: Dictionary
  profile: Profile
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LocaleProvider
        initialLocale={initialLocale}
        initialDictionary={initialDictionary ?? dictionaries[initialLocale]}
        profile={profile}
      >
        {children}
      </LocaleProvider>
    </NextThemesProvider>
  )
}
