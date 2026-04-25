"use client"

import { Badge } from "@/components/ui/badge"
import { experience } from "@/lib/data/experience"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"

export function ExperienceSection() {
  const { t, locale } = useLocale()

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />

        <ol className="relative mt-12 border-l border-border/60 pl-6 md:pl-8">
          {experience.map((item, idx) => (
            <li
              key={item.id}
              className="relative pb-10 last:pb-0"
              aria-label={item.role[locale]}
            >
              <span
                aria-hidden
                className="absolute -left-[33px] mt-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-accent/60 bg-background md:-left-[37px]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.period.start} — {item.period.end === "present" ? t.experience.present : item.period.end}
                </span>
                <span className="text-xs text-muted-foreground/60">·</span>
                <span className="text-xs font-medium text-accent">{item.company}</span>
              </div>

              <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                {item.role[locale]}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.summary[locale]}
              </p>

              <ul className="mt-4 grid max-w-2xl gap-1.5">
                {item.achievements[locale].map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-foreground/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
                  >
                    {s}
                  </Badge>
                ))}
              </div>

              {idx === experience.length - 1 ? null : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
