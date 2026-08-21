import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CaseStudyCard } from "@/components/portfolio/case-study-card"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { isLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import { getDictionary, getProjects, getSiteSettings } from "@/lib/sanity/queries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const [t, siteSettings] = await Promise.all([getDictionary(locale), getSiteSettings(locale)])

  return createLocalizedMetadata({
    locale,
    path: "/projects",
    title: t.pages.projectsTitle,
    description: t.pages.projectsDescription,
    openGraphImageUrl: siteSettings.openGraphImageUrl,
    siteName: siteSettings.siteName,
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

  const [t, projects] = await Promise.all([getDictionary(locale), getProjects()])

  return (
    <PortfolioShell>
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Button asChild variant="ghost" size="sm" className="mb-8 rounded-full text-muted-foreground">
            <Link href={`/${locale}`}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden />
              {t.pages.backHome}
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,0.55fr)] md:items-end">
            <SectionHeading
              eyebrow={t.projects.eyebrow}
              title={t.pages.projectsTitle}
              description={t.pages.projectsDescription}
              className="max-w-3xl"
            />
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:justify-self-end">
              {t.projects.editorialNote}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {projects.map((project, index) => (
              <CaseStudyCard
                key={project.slug}
                project={project}
                index={index}
                locale={locale}
                labels={t}
              />
            ))}
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}
