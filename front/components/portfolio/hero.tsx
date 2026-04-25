"use client"

import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "./providers"
import { profile } from "@/lib/data/profile"

export function Hero() {
  const { t, locale } = useLocale()

  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
        {/* Availability */}
        <div className="flex max-w-full flex-wrap items-center gap-2">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t.hero.availability}
          </span>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            {t.hero.timezone}
          </span>
        </div>

        {/* Name */}
        <div className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-border" aria-hidden />
          {profile.name}
        </div>

        {/* Headline */}
        <h1 className="mt-4 max-w-4xl text-balance font-sans text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-6xl lg:text-[4.25rem]">
          {t.hero.headline}
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-11 rounded-full px-5">
            <a href={`/${locale}#projects`}>
              {t.hero.ctaPrimary}
              <ArrowDown className="ml-1 h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
            <a href={profile.resumeUrl} download>
              <Download className="mr-1 h-4 w-4" aria-hidden />
              {t.hero.ctaSecondary}
            </a>
          </Button>
        </div>

        {/* Socials */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <a
            href={profile.socials.github.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden />
            <span>{profile.socials.github.username}</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </a>
          <a
            href={profile.socials.linkedin.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            <span>{profile.socials.linkedin.username}</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </a>
          <a
            href={profile.socials.email.href}
            className="group inline-flex items-center gap-2 hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden />
            <span>{profile.socials.email.username}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
