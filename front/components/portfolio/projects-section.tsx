"use client"

import { ArrowUpRight, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { projects, type Project } from "@/lib/data/projects"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"

const accentRing: Record<Project["accent"], string> = {
  cyan: "from-accent/40 to-accent/0",
  amber: "from-accent/40 to-accent/0",
  violet: "from-accent/40 to-accent/0",
  emerald: "from-accent/40 to-accent/0",
}

export function ProjectsSection() {
  const { t, locale } = useLocale()

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((p) => (
            <Card
              key={p.slug}
              className="group relative flex flex-col overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50 md:p-7"
            >
              <div
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -top-px h-px bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100",
                  accentRing[p.accent],
                )}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.category[locale]} · {p.year}
                  </div>
                  <h3 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h3>
                </div>
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-colors group-hover:border-accent/60 group-hover:text-accent">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </div>
              </div>

              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {p.summary[locale]}
              </p>

              <ul className="mt-5 space-y-2">
                {p.highlights[locale].map((h) => (
                  <li key={h} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
                  >
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/60 pt-5">
                <Button asChild size="sm" variant="outline" className="h-8 rounded-full">
                  <Link href={`/${locale}/projects/${p.slug}`}>
                    {t.projects.readCaseStudy}
                    <ChevronRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Button>
                {p.externalUrl ? (
                  <Button asChild size="sm" variant="ghost" className="h-8 rounded-full text-muted-foreground hover:text-foreground">
                    <a href={p.externalUrl} target="_blank" rel="noreferrer">
                      {t.projects.visit}
                      <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
                    </a>
                  </Button>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
