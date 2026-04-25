"use client"

import { Globe2, MapPin, Clock } from "lucide-react"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"

export function AboutSection() {
  const { t } = useLocale()

  return (
    <section id="about" className="scroll-mt-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          </div>
          <div className="lg:col-span-7">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.about.body}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {t.about.locationLabel}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{t.about.basedIn}</dd>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {t.about.timezoneLabel}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{t.about.timezone}</dd>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Globe2 className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {t.about.languagesLabel}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{t.about.languages}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
