"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "./providers"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

const sections = [
  { id: "projects", key: "projects" as const },
  { id: "writing", key: "writing" as const },
  { id: "about", key: "about" as const },
  { id: "contact", key: "contact" as const },
]

export function SiteHeader() {
  const { t, locale } = useLocale()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href={`/${locale}#top`} className="group flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md border border-border/60 bg-card font-mono text-xs font-semibold text-accent"
          >
            VR
          </span>
          <span className="hidden text-sm font-medium tracking-tight md:inline">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`/${locale}#${s.id}`}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t.nav[s.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm" className="h-9 rounded-full">
            <a href={profile.resumeUrl} download>
              {t.nav.resume}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </a>
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="h-9 w-9 rounded-full border border-border/60"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`/${locale}#${s.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t.nav[s.key]}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-3">
              <LanguageSwitcher />
              <Button asChild size="sm" className="h-9 rounded-full">
                <a href={profile.resumeUrl} download>
                  {t.nav.resume}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
