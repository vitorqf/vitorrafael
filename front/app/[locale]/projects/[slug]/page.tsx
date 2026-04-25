import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { dictionaries, isLocale, locales } from "@/lib/i18n/dictionaries"
import { projects } from "@/lib/data/projects"
import { createLocalizedMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale: locale.code,
      slug: project.slug,
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return createLocalizedMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `${project.title} - ${dictionaries[locale].pages.caseStudy}`,
    description: project.summary[locale],
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  const t = dictionaries[locale]

  return (
    <PortfolioShell>
      <article className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Button asChild variant="ghost" size="sm" className="mb-8 rounded-full text-muted-foreground">
            <Link href={`/${locale}/projects`}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden />
              {t.pages.backProjects}
            </Link>
          </Button>

          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {project.category[locale]} / {project.year}
              </div>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                {project.summary[locale]}
              </p>

              <dl className="mt-12 grid gap-5 border-y border-border/60 py-7 md:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.pages.problem}
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-foreground/85">{project.problem[locale]}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.pages.systemFocus}
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-foreground/85">{project.systemFocus[locale]}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.pages.outcome}
                  </dt>
                  <dd className="mt-3 text-sm leading-6 text-foreground/85">{project.outcome[locale]}</dd>
                </div>
              </dl>

              <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.pages.highlights}</h2>
                <ul className="mt-6 grid gap-4">
                  {project.highlights[locale].map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <Card className="sticky top-20 border-border/60 bg-card/50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.pages.stack}
              </h2>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              {project.externalUrl ? (
                <Button asChild className="mt-6 w-full rounded-full">
                  <a href={project.externalUrl} target="_blank" rel="noreferrer">
                    {t.pages.openProject}
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                  </a>
                </Button>
              ) : null}
            </Card>
          </div>
        </div>
      </article>
    </PortfolioShell>
  )
}
