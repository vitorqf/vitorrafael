import { defaultLocale, isLocale, locales, type Locale } from "./dictionaries"

export const localeCodes = locales.map((locale) => locale.code)

export function getLocaleOrDefault(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale
}

export function getPathWithLocale(pathname: string, locale: Locale) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  const segments = path.split("/")

  if (isLocale(segments[1] ?? "")) {
    segments[1] = locale
    return segments.join("/") || `/${locale}`
  }

  return `/${locale}${path === "/" ? "" : path}`
}
