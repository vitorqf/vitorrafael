import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { dictionaries, isLocale } from "@/lib/i18n/dictionaries"
import { projects } from "@/lib/data/projects"
import { createLocalizedMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const t = dictionaries[locale]

  return createLocalizedMetadata({
    locale,
    path: "/projects",
    title: t.pages.projectsTitle,
    description: t.pages.projectsDescription,
  })
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const t = dictionaries[locale]

  return (
    <PortfolioShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Button asChild variant="ghost" size="sm" className="mb-8 rounded-full text-muted-foreground">
            <Link href={`/${locale}`}>{t.pages.backHome}</Link>
          </Button>

          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.pages.projectsTitle}
            description={t.pages.projectsDescription}
          />

          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="group flex h-full flex-col overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {project.category[locale]} / {project.year}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {project.title}
                    </h2>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.summary[locale]}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
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

                <div className="mt-6 border-t border-border/60 pt-5">
                  <Button asChild size="sm" variant="outline" className="h-8 rounded-full">
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      {t.projects.readCaseStudy}
                      <ChevronRight className="ml-0.5 h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}
