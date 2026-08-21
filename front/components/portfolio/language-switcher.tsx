"use client"

import { Languages } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "./providers"
import { enabledLocales } from "@/lib/i18n/dictionaries"
import { getPathWithLocale } from "@/lib/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale } = useLocale()
  const pathname = usePathname()
  const switcherLocales = enabledLocales

  if (switcherLocales.length <= 1) {
    return null
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/50 p-0.5 text-xs",
        className,
      )}
      role="group"
      aria-label="Language switcher"
    >
      <Languages className="ml-2 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {switcherLocales.map((l) => {
        const active = l.code === locale
        return (
          <Link
            key={l.code}
            href={getPathWithLocale(pathname, l.code)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium tracking-wide transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {l.label}
          </Link>
        )
      })}
    </div>
  )
}
