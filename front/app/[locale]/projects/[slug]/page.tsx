import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { isLocale, locales } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import {
  getDictionary,
  getProjectBySlug,
  getProjectSlugs,
  getSiteSettings,
} from "@/lib/sanity/queries"

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale: locale.code,
      slug,
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

  const [project, t, siteSettings] = await Promise.all([
    getProjectBySlug(slug),
    getDictionary(locale),
    getSiteSettings(locale),
  ])

  if (!project) {
    notFound()
  }

  return createLocalizedMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.seo?.title?.[locale] ?? `${project.title} - ${t.pages.caseStudy}`,
    description: project.seo?.description?.[locale] ?? project.summary[locale],
    canonicalPath: project.seo?.canonicalPath,
    openGraphImageUrl: project.seo?.openGraphImageUrl ?? siteSettings.openGraphImageUrl,
    siteName: siteSettings.siteName,
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

  const [project, t] = await Promise.all([getProjectBySlug(slug), getDictionary(locale)])

  if (!project) {
    notFound()
  }

  const projectStack =
    project.stack.length > 0
      ? project.stack
      : Array.from(new Set(project.caseStudies.flatMap((caseStudy) => caseStudy.stack)))
  const categoryLine = [project.category[locale], project.year].filter(Boolean).join(" / ")

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
                {categoryLine}
              </div>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
                {project.summary[locale]}
              </p>

              <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-[-0.025em]">{t.pages.caseStudies}</h2>

                {project.caseStudies.length ? (
                  <div className="mt-7 space-y-6">
                    {project.caseStudies.map((caseStudy, index) => (
                      <Card
                        key={`${caseStudy.slug}-${index}`}
                        id={caseStudy.slug}
                        className="border-border/60 bg-card/45 p-6 md:p-7"
                      >
                        <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {t.pages.caseLabel} {String(index + 1).padStart(2, "0")}
                        </div>
                        <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight">
                          {caseStudy.title[locale]}
                        </h3>
                        <p className="mt-4 text-pretty text-sm leading-7 text-muted-foreground md:text-[0.95rem]">
                          {caseStudy.summary[locale]}
                        </p>

                        <dl className="mt-8 grid gap-5 border-y border-border/60 py-6 md:grid-cols-3">
                          <div>
                            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                              {t.pages.problem}
                            </dt>
                            <dd className="mt-2 text-sm leading-6 text-foreground/85">
                              {caseStudy.problem[locale]}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                              {t.pages.systemFocus}
                            </dt>
                            <dd className="mt-2 text-sm leading-6 text-foreground/85">
                              {caseStudy.systemFocus[locale]}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                              {t.pages.outcome}
                            </dt>
                            <dd className="mt-2 text-sm leading-6 text-foreground/85">
                              {caseStudy.outcome[locale]}
                            </dd>
                          </div>
                        </dl>

                        {caseStudy.highlights[locale].length ? (
                          <div className="mt-7">
                            <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                              {t.pages.highlights}
                            </h4>
                            <ul className="mt-4 grid gap-3">
                              {caseStudy.highlights[locale].map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                                >
                                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {caseStudy.body[locale].length ? (
                          <div className="mt-7 space-y-3">
                            {caseStudy.body[locale].map((paragraph, paragraphIndex) => (
                              <p
                                key={`${caseStudy.slug}-${paragraphIndex}`}
                                className="text-sm leading-7 text-foreground/85"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        <div className="mt-7 flex flex-wrap gap-1.5">
                          {caseStudy.stack.map((item) => (
                            <Badge
                              key={`${caseStudy.slug}-${item}`}
                              variant="secondary"
                              className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>

                        {caseStudy.externalUrl ? (
                          <Button asChild className="mt-6 rounded-full" size="sm">
                            <a href={caseStudy.externalUrl} target="_blank" rel="noreferrer">
                              {t.pages.openProject}
                              <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
                            </a>
                          </Button>
                        ) : null}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="mt-6 border-border/60 bg-card/45 p-6 text-sm text-muted-foreground">
                    {t.pages.noCaseStudies}
                  </Card>
                )}
              </section>
            </div>

            <Card className="sticky top-20 border-border/60 bg-card/50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.pages.stack}
              </h2>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {projectStack.map((item) => (
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
