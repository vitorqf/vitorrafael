"use client"

import { ArrowUpRight, Download, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "./providers"
import { ScrollReveal } from "./scroll-reveal"
import { profile } from "@/lib/data/profile"

export function ContactCta() {
  const { t } = useLocale()

  return (
    <section id="contact" className="flex min-h-[calc(100svh-3.5rem)] scroll-mt-14 items-center border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal variant="fade" className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-8 bg-border" aria-hidden />
              {t.contact.eyebrow}
              <span className="h-px w-8 bg-border" aria-hidden />
            </div>
            <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
              {t.contact.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-5">
                <a href={profile.socials.email.href}>
                  <Mail className="mr-1 h-4 w-4" aria-hidden />
                  {t.contact.contactMe}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
                <a href={profile.resumeUrl} download>
                  <Download className="mr-1 h-4 w-4" aria-hidden />
                  {t.contact.downloadCv}
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-11 rounded-full px-5 text-muted-foreground hover:text-foreground">
                <a href={profile.socials.linkedin.href} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-1 h-4 w-4" aria-hidden />
                  {t.contact.linkedin}
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
