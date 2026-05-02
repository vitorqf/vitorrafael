import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { enabledLocales, isEnabledLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import { getDictionary, getPostBySlug, getPostSlugs } from "@/lib/sanity/queries"

export async function generateStaticParams() {
  const slugs = await getPostSlugs()

  return enabledLocales.flatMap((locale) =>
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

  if (!isEnabledLocale(locale)) {
    notFound()
  }

  const article = await getPostBySlug(slug)

  if (!article) {
    notFound()
  }

  return createLocalizedMetadata({
    locale,
    path: `/blog/${article.slug}`,
    title: article.title[locale],
    description: article.excerpt[locale],
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isEnabledLocale(locale)) {
    notFound()
  }

  const [article, t] = await Promise.all([getPostBySlug(slug), getDictionary(locale)])

  if (!article) {
    notFound()
  }
  const formatter = new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <PortfolioShell>
      <article className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <Button asChild variant="ghost" size="sm" className="mb-8 rounded-full text-muted-foreground">
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" aria-hidden />
              {t.pages.backBlog}
            </Link>
          </Button>

          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t.pages.published} {formatter.format(new Date(article.publishedAt))}
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {article.title[locale]}
          </h1>
          <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {article.excerpt[locale]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {article.readTime} {t.writing.minRead}
            </span>
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-6 text-base leading-8 text-foreground/85">
            {article.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </PortfolioShell>
  )
}
