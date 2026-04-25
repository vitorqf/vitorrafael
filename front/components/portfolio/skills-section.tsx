"use client"

import { Card } from "@/components/ui/card"
import { skillGroups } from "@/lib/data/skills"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"
import { ScrollReveal } from "./scroll-reveal"

export function SkillsSection() {
  const { t, locale } = useLocale()

  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] items-center border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, index) => {
            const Icon = g.icon
            return (
              <ScrollReveal key={g.id} delay={Math.min(60 * index, 240)} variant="fade" className="h-full">
                <Card className="group relative h-full overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-background/50 text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground">
                      {g.title[locale]}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {g.description[locale]}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {g.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
