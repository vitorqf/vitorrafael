import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { isEnabledLocale } from "@/lib/i18n/dictionaries"
import { createLocalizedMetadata } from "@/lib/seo"
import { getDictionary, getPosts } from "@/lib/sanity/queries"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!isEnabledLocale(locale)) {
    notFound()
  }

  const t = await getDictionary(locale)

  return createLocalizedMetadata({
    locale,
    path: "/blog",
    title: t.pages.blogTitle,
    description: t.pages.blogDescription,
  })
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isEnabledLocale(locale)) {
    notFound()
  }

  const [t, articles] = await Promise.all([getDictionary(locale), getPosts()])
  const formatter = new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  })

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

          <SectionHeading
            eyebrow={t.writing.eyebrow}
            title={t.pages.blogTitle}
            description={t.pages.blogDescription}
          />

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Card
                key={article.slug}
                className="group relative flex h-full flex-col overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <time dateTime={article.publishedAt} className="font-mono">
                    {formatter.format(new Date(article.publishedAt))}
                  </time>
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3" aria-hidden />
                    {article.readTime} {t.writing.minRead}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                  <Link href={`/${locale}/blog/${article.slug}`} className="after:absolute after:inset-0">
                    {article.title[locale]}
                  </Link>
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt[locale]}
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
                  {t.pages.readArticle}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PortfolioShell>
  )
}
