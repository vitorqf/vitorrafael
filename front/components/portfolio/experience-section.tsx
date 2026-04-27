"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import type { ExperienceItem } from "@/lib/sanity/types"
import { useLocale } from "./providers"
import { ScrollReveal } from "./scroll-reveal"
import { SectionHeading } from "./section-heading"

export function ExperienceSection({ experience }: { experience: ExperienceItem[] }) {
  const { t, locale } = useLocale()
  const timelineRef = React.useRef<HTMLOListElement>(null)

  React.useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const dots = Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-dot]"))
    const dotCores = Array.from(timeline.querySelectorAll<HTMLElement>("[data-timeline-dot-core]"))

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.style.setProperty("--timeline-progress", "1")
      dots.forEach((dot) => dot.dataset.active = "true")
      dotCores.forEach((core) => core.dataset.active = "true")
      return
    }

    let frame = 0

    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const readLine = viewportHeight * 0.58
      const rawProgress = (readLine - rect.top) / Math.max(rect.height, 1)
      const progress = Math.min(Math.max(rawProgress, 0), 1)

      timeline.style.setProperty("--timeline-progress", progress.toFixed(4))

      dots.forEach((dot, index) => {
        const dotRect = dot.getBoundingClientRect()
        const isActive = dotRect.top + dotRect.height / 2 <= readLine
        dot.dataset.active = String(isActive)
        dotCores[index].dataset.active = String(isActive)
      })
    }

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateTimeline)
    }

    updateTimeline()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] items-center border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />

        <ol
          ref={timelineRef}
          className="relative mt-12 pl-6 md:pl-8"
          style={{ "--timeline-progress": "0" } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-border/60"
          />
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px origin-top scale-y-[var(--timeline-progress)] bg-accent transition-transform duration-200 ease-out"
          />
          {experience.map((item, index) => (
            <li key={item.id} className="relative pb-10 last:pb-0" aria-label={item.role[locale]}>
              <ScrollReveal delay={Math.min(index * 90, 240)}>
                <span
                  data-timeline-dot
                  data-active="false"
                  aria-hidden
                  className="absolute -left-[33px] mt-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-border/70 bg-background transition-colors duration-300 data-[active=true]:border-accent/80 md:-left-[37px]"
                >
                  <span
                    data-timeline-dot-core
                    data-active="false"
                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground/35 transition-colors duration-300 data-[active=true]:bg-accent"
                  />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.period.start} - {item.period.end === "present" ? t.experience.present : item.period.end}
                  </span>
                  <span className="text-xs text-muted-foreground/60">/</span>
                  <span className="text-xs font-medium text-accent">{item.company}</span>
                </div>

                <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                  {item.role[locale]}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.summary[locale]}
                </p>

                <ul className="mt-4 grid max-w-2xl gap-1.5">
                  {item.achievements[locale].map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-sm text-foreground/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((stackItem) => (
                    <Badge
                      key={stackItem}
                      variant="secondary"
                      className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
                    >
                      {stackItem}
                    </Badge>
                  ))}
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
