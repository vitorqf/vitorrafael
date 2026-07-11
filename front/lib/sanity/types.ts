import type { Dictionary } from "@/lib/i18n/dictionaries"

export type LocalizedString = {
  en: string
  "pt-BR": string
}

export type LocalizedStringArray = {
  en: string[]
  "pt-BR": string[]
}

export type SanityLocalizedString = {
  en?: string
  ptBR?: string
} | null

export type SanityLocalizedStringArray = {
  en?: string[]
  ptBR?: string[]
} | null

export type SocialIconKey = "github" | "linkedin" | "email"
export type SkillIconKey = "layers" | "smartphone" | "shield-check" | "gauge" | "compass" | "wrench"
export type MetricIconKey = "users" | "car-front" | "messages-square" | "lock"
export type ProjectAccent = "cyan" | "amber" | "violet" | "emerald"

export type SocialLink = {
  id: string
  label: string
  href: string
  username: string
  icon: SocialIconKey
  order: number
}

export type Profile = {
  name: string
  role: LocalizedString
  location: LocalizedString
  email: string
  resumeUrl: string
  aboutBody: LocalizedString
  basedIn: LocalizedString
  timezone: LocalizedString
  languages: LocalizedString
  socials: {
    github: SocialLink | null
    linkedin: SocialLink | null
    email: SocialLink | null
  }
}

export type Metric = {
  id: string
  value: string
  label: LocalizedString
  icon: MetricIconKey
}

export type SkillGroup = {
  id: string
  icon: SkillIconKey
  title: LocalizedString
  description: LocalizedString
  technologies: string[]
}

export type ExperienceItem = {
  id: string
  role: LocalizedString
  company: string
  period: {
    start: string
    end: string | "present"
  }
  summary: LocalizedString
  achievements: LocalizedStringArray
  stack: string[]
}

export type CaseStudy = {
  slug: string
  title: LocalizedString
  summary: LocalizedString
  problem: LocalizedString
  systemFocus: LocalizedString
  outcome: LocalizedString
  highlights: LocalizedStringArray
  body: LocalizedStringArray
  stack: string[]
  externalUrl?: string
  featured: boolean
  order: number
}

export type Project = {
  slug: string
  title: string
  category: LocalizedString
  summary: LocalizedString
  stack: string[]
  caseStudies: CaseStudy[]
  externalUrl?: string
  coverImageUrl?: string
  accent: ProjectAccent
  year: string
  featured: boolean
}

export type Article = {
  slug: string
  title: LocalizedString
  excerpt: LocalizedString
  body: LocalizedStringArray
  tags: string[]
  readTime: number
  publishedAt: string
  updatedAt?: string
}

export type SiteSettings = {
  siteName: string
  analyticsKey?: string
  resumeUrl?: string
  metadataTitle: LocalizedString
  metadataDescription: LocalizedString
  dictionaryOverride: Partial<Dictionary>
}
