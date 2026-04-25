import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries"
import type { Project } from "@/lib/data/projects"

const accentTone: Record<Project["accent"], string> = {
  cyan: "bg-accent",
  amber: "bg-[oklch(0.78_0.12_78)]",
  violet: "bg-[oklch(0.72_0.12_315)]",
  emerald: "bg-[oklch(0.76_0.11_155)]",
}

type CaseStudyCardProps = {
  project: Project
  index: number
  locale: Locale
  labels: Dictionary
  className?: string
}

export function CaseStudyCard({
  project,
  index,
  locale,
  labels,
  className,
}: CaseStudyCardProps) {
  const caseUrl = `/${locale}/projects/${project.slug}`

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/70 bg-card/45 transition-colors hover:border-accent/50",
        className,
      )}
    >
      <div className="grid min-h-full gap-0 lg:grid-cols-[8rem_minmax(0,1fr)_18rem]">
        <div className="border-b border-border/60 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            {labels.pages.caseLabel}
          </div>
          <div className="mt-4 font-mono text-5xl font-semibold tracking-[-0.08em] text-foreground/15 transition-colors group-hover:text-accent/50 md:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className={cn("mt-5 h-1 w-10 rounded-full", accentTone[project.accent])} />
        </div>

        <div className="p-5 md:p-7">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            {project.category[locale]} / {project.year}
          </div>
          <h3 className="mt-3 max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
            <Link href={caseUrl} className="after:absolute after:inset-0">
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground md:text-[0.95rem]">
            {project.summary[locale]}
          </p>

          <div className="mt-7 grid gap-5 border-t border-border/60 pt-6 md:grid-cols-2">
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                {labels.pages.problem}
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/85">{project.problem[locale]}</p>
            </div>
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                {labels.pages.outcome}
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/85">{project.outcome[locale]}</p>
            </div>
          </div>
        </div>

        <aside className="border-t border-border/60 bg-background/25 p-5 lg:border-l lg:border-t-0 lg:p-6">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            {labels.pages.systemFocus}
          </div>
          <p className="mt-3 text-sm leading-6 text-foreground/80">{project.systemFocus[locale]}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="rounded-md border border-border/60 bg-card/55 px-2 py-0.5 font-mono text-[0.67rem] font-normal text-muted-foreground"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="relative z-10 mt-7 flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline" className="h-8 rounded-full">
              <Link href={caseUrl}>
                {labels.projects.readCaseStudy}
                <ChevronRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
              </Link>
            </Button>
            {project.externalUrl ? (
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-8 rounded-full text-muted-foreground hover:text-foreground"
              >
                <a href={project.externalUrl} target="_blank" rel="noreferrer">
                  {labels.projects.visit}
                  <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
                </a>
              </Button>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  )
}
