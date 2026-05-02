"use client"

import { Card } from "@/components/ui/card"
import { getMetricIcon } from "@/lib/icons"
import type { Metric } from "@/lib/sanity/types"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"
import { ScrollReveal } from "./scroll-reveal"

export function MetricsSection({ metrics }: { metrics: Metric[] }) {
  const { t, locale } = useLocale()

  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] items-center border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.metrics.eyebrow}
          title={t.metrics.title}
          description={t.metrics.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.length ? (
            metrics.map((m, index) => {
              const Icon = getMetricIcon(m.icon)
              return (
                <ScrollReveal key={m.id} delay={Math.min(60 * index, 180)} variant="fade">
                  <Card className="group relative overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50">
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
                </ScrollReveal>
              )
            })
          ) : (
            <p className="rounded-xl border border-border/60 bg-card/50 p-6 text-sm text-muted-foreground lg:col-span-4">
              No metrics published yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
