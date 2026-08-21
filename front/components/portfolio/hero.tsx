"use client"

import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "./providers"
import { ScrollReveal } from "./scroll-reveal"
import { SectionLink } from "./section-link"
import { ToptalBadge } from "./toptal-badge"

export function Hero() {
  const { t, locale, profile } = useLocale()
  const hasResume = Boolean(profile.resumeUrl)
  const isRemoteResume = /^https?:\/\//.test(profile.resumeUrl)

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14 md:px-6 md:pb-28 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <ScrollReveal className="flex max-w-full flex-wrap items-center gap-2" variant="fade">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/55 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t.hero.availability}
              </span>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/55 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                {t.hero.timezone}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={80} className="mt-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-10 bg-border" aria-hidden />
              {profile.name}
            </ScrollReveal>

            <ScrollReveal delay={120} variant="fade">
              <h1 className="mt-5 max-w-5xl text-balance font-sans text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.35rem]">
                {t.hero.headline}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={180} variant="fade">
              <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                {t.hero.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={220} variant="fade" className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-5">
                <SectionLink sectionId="projects" locale={locale}>
                  {t.hero.ctaPrimary}
                  <ArrowDown className="ml-1 h-4 w-4" aria-hidden />
                </SectionLink>
              </Button>
              {hasResume ? (
                <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
                  <a
                    href={profile.resumeUrl}
                    {...(isRemoteResume ? { target: "_blank", rel: "noreferrer" } : { download: true })}
                  >
                    <Download className="mr-1 h-4 w-4" aria-hidden />
                    {t.hero.ctaSecondary}
                  </a>
                </Button>
              ) : null}
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-8">
            <ScrollReveal delay={160} variant="fade" className="flex justify-center lg:justify-start lg:pl-7">
              <ToptalBadge />
            </ScrollReveal>

            <ScrollReveal delay={200} variant="fade" className="border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                {t.hero.focusKicker}
              </div>
              <h2 className="mt-3 text-balance text-xl font-semibold leading-tight tracking-tight">
                {t.hero.focusTitle}
              </h2>
              <ol className="mt-5 flex flex-col gap-4">
                {t.hero.focusItems.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-t border-border/60 pt-4">
                    <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={260} variant="fade" className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          {profile.socials.github ? (
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
          ) : null}
          {profile.socials.linkedin ? (
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
          ) : null}
          {profile.socials.email ? (
            <a href={profile.socials.email.href} className="group inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" aria-hidden />
              <span>{profile.socials.email.username}</span>
            </a>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  )
}
