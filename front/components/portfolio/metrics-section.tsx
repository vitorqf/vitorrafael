"use client"

import { Card } from "@/components/ui/card"
import { metrics } from "@/lib/data/metrics"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"

export function MetricsSection() {
  const { t, locale } = useLocale()

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.metrics.eyebrow}
          title={t.metrics.title}
          description={t.metrics.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <Card
                key={m.id}
                className="group relative overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-background/50 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                </div>
                <div className="mt-6 font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {m.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.label[locale]}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
