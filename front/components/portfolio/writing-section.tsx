"use client"

import { ArrowUpRight, Clock } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/data/writing"
import { useLocale } from "./providers"
import { SectionHeading } from "./section-heading"

export function WritingSection() {
  const { t, locale } = useLocale()

  const formatter = new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  })

  return (
    <section id="writing" className="scroll-mt-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t.writing.eyebrow}
            title={t.writing.title}
            description={t.writing.description}
          />
          <Button asChild variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
            <Link href={`/${locale}/blog`}>
              {t.writing.viewAll}
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <Card
              key={a.slug}
              className="group relative flex h-full flex-col overflow-hidden border-border/60 bg-card/60 p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <time dateTime={a.publishedAt} className="font-mono">
                  {formatter.format(new Date(a.publishedAt))}
                </time>
                <span className="inline-flex items-center gap-1 font-mono">
                  <Clock className="h-3 w-3" aria-hidden />
                  {a.readTime} {t.writing.minRead}
                </span>
              </div>

              <h3 className="mt-3 font-sans text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">
                <Link href={`/${locale}/blog/${a.slug}`} className="after:absolute after:inset-0">
                  {a.title[locale]}
                </Link>
              </h3>

              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {a.excerpt[locale]}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
                <ul className="flex flex-wrap gap-1.5">
                  {a.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
                  {t.writing.readArticle}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
