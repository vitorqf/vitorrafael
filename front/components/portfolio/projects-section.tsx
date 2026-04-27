"use client"

import { CaseStudyCard } from "@/components/portfolio/case-study-card"
import type { Project } from "@/lib/sanity/types"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const { t, locale } = useLocale()

  return (
    <section id="projects" className="flex min-h-[calc(100svh-3.5rem)] scroll-mt-14 items-center border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,0.55fr)] md:items-end">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
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
  )
}
