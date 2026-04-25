"use client"

import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { profile } from "@/lib/data/profile"
import { useLocale } from "./providers"

export function SiteFooter() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-md border border-border/60 bg-card font-mono text-xs font-semibold text-accent"
            >
              VR
            </span>
            <div>
              <div className="text-sm font-medium text-foreground">{profile.name}</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" aria-hidden />
                {t.footer.location}
              </div>
            </div>
          </div>

          <nav aria-label="Social" className="flex flex-wrap items-center gap-2">
            <FooterLink href={profile.socials.github.href} label="GitHub" icon={<Github className="h-3.5 w-3.5" />} external />
            <FooterLink href={profile.socials.linkedin.href} label="LinkedIn" icon={<Linkedin className="h-3.5 w-3.5" />} external />
            <FooterLink href={profile.socials.email.href} label="Email" icon={<Mail className="h-3.5 w-3.5" />} />
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {profile.name}. {t.footer.rights}
          </p>
          <p className="font-mono">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  label,
  icon,
  external,
}: {
  href: string
  label: string
  icon: React.ReactNode
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
    >
      {icon}
      {label}
      {external ? <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden /> : null}
    </a>
  )
}
