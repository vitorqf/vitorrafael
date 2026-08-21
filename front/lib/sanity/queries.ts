import "server-only"
import { cache } from "react"
import groq from "groq"
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries"
import { sanityClient } from "@/lib/sanity/client"
import type {
  Article,
  CaseStudy,
  ExperienceItem,
  LocalizedString,
  LocalizedStringArray,
  Metric,
  Profile,
  Project,
  SanityLocalizedString,
  SanityLocalizedStringArray,
  SeoFields,
  SiteSettings,
  SkillGroup,
  SocialIconKey,
  SocialLink,
} from "@/lib/sanity/types"
import { experience as fallbackExperience } from "@/lib/data/experience"
import { metrics as fallbackMetrics } from "@/lib/data/metrics"
import { profile as fallbackProfile } from "@/lib/data/profile"
import { projects as fallbackProjects } from "@/lib/data/projects"
import { skillGroups as fallbackSkillGroups } from "@/lib/data/skills"
import { articles as fallbackArticles } from "@/lib/data/writing"

const fetchOptions = { next: { revalidate: 60 } }

type RawSiteSettings = {
  siteName?: string
  analyticsKey?: string
  resumeUrl?: string
  openGraphImageUrl?: string
  metadataTitle?: SanityLocalizedString
  metadataDescription?: SanityLocalizedString
  copy?: Record<string, unknown>
} | null

type RawSeo = {
  title?: SanityLocalizedString
  description?: SanityLocalizedString
  canonicalPath?: string
  openGraphImageUrl?: string
} | null

type RawCaseStudy = {
  slug?: string
  title?: SanityLocalizedString
  summary?: SanityLocalizedString
  problem?: SanityLocalizedString
  systemFocus?: SanityLocalizedString
  outcome?: SanityLocalizedString
  highlights?: SanityLocalizedStringArray
  body?: SanityLocalizedStringArray
  stack?: string[]
  externalUrl?: string
  featured?: boolean
  order?: number
} | null

type RawProject = {
  slug?: string
  title?: SanityLocalizedString
  category?: SanityLocalizedString
  summary?: SanityLocalizedString
  caseStudies?: RawCaseStudy[]
  stack?: string[]
  externalUrl?: string
  accent?: Project["accent"]
  year?: string
  featured?: boolean
  seo?: RawSeo
} | null

type RawPost = {
  slug?: string
  title?: SanityLocalizedString
  excerpt?: SanityLocalizedString
  body?: SanityLocalizedStringArray
  tags?: string[]
  readTime?: number
  publishedAt?: string
  updatedAt?: string
  seo?: RawSeo
} | null

type RawSkillGroup = {
  id?: string
  icon?: SkillGroup["icon"]
  title?: SanityLocalizedString
  description?: SanityLocalizedString
  technologies?: string[]
} | null

type RawExperienceItem = {
  id?: string
  role?: SanityLocalizedString
  company?: string
  period?: { start?: string; end?: string }
  summary?: SanityLocalizedString
  achievements?: SanityLocalizedStringArray
  stack?: string[]
} | null

type RawMetric = {
  id?: string
  value?: string
  label?: SanityLocalizedString
  icon?: Metric["icon"]
} | null

type RawProfile = {
  name?: string
  role?: SanityLocalizedString
  location?: SanityLocalizedString
  email?: string
  resumeUrl?: string
  aboutBody?: SanityLocalizedString
  basedIn?: SanityLocalizedString
  timezone?: SanityLocalizedString
  languages?: SanityLocalizedString
} | null

type RawSocialLink = {
  id?: string
  label?: string
  href?: string
  username?: string
  icon?: SocialIconKey
  order?: number
} | null

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    analyticsKey,
    resumeUrl,
    "openGraphImageUrl": openGraphImage.asset->url,
    metadataTitle,
    metadataDescription,
    copy
  }
`

const projectsQuery = groq`
  *[_type == "project" && defined(slug.current)]
    | order(featured desc, coalesce(order, 999) asc, _createdAt desc) {
      "slug": slug.current,
      title,
      category,
      summary,
      caseStudies[]{
        slug,
        title,
        summary,
        problem,
        systemFocus,
        outcome,
        highlights,
        body,
        stack,
        externalUrl,
        featured,
        order
      },
      stack,
      externalUrl,
      accent,
      year,
      featured,
      seo{
        title,
        description,
        canonicalPath,
        "openGraphImageUrl": openGraphImage.asset->url
      }
    }
`

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    category,
    summary,
    caseStudies[]{
      slug,
      title,
      summary,
      problem,
      systemFocus,
      outcome,
      highlights,
      body,
      stack,
      externalUrl,
      featured,
      order
    },
    stack,
    externalUrl,
    accent,
    year,
    featured,
    seo{
      title,
      description,
      canonicalPath,
      "openGraphImageUrl": openGraphImage.asset->url
    }
  }
`

const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`

const postsQuery = groq`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc, _createdAt desc) {
      "slug": slug.current,
      title,
      excerpt,
      body,
      tags,
      readTime,
      publishedAt,
      updatedAt,
      seo{
        title,
        description,
        canonicalPath,
        "openGraphImageUrl": openGraphImage.asset->url
      }
    }
`

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    excerpt,
    body,
    tags,
    readTime,
    publishedAt,
    updatedAt,
    seo{
      title,
      description,
      canonicalPath,
      "openGraphImageUrl": openGraphImage.asset->url
    }
  }
`

const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`

const skillsQuery = groq`
  *[_type == "skillGroup" && coalesce(active, true) == true]
    | order(coalesce(order, 999) asc, _createdAt asc) {
      "id": coalesce(id, _id),
      icon,
      title,
      description,
      technologies
    }
`

const experienceQuery = groq`
  *[_type == "experienceItem" && coalesce(active, true) == true]
    | order(coalesce(order, 999) asc, _createdAt asc) {
      "id": coalesce(id, _id),
      role,
      company,
      "period": {
        "start": period.start,
        "end": period.end
      },
      summary,
      achievements,
      stack
    }
`

const metricsQuery = groq`
  *[_type == "metric" && coalesce(active, true) == true]
    | order(coalesce(order, 999) asc, _createdAt asc) {
      "id": coalesce(id, _id),
      value,
      label,
      icon
    }
`

const profileQuery = groq`
  *[_type == "profile"][0]{
    name,
    role,
    location,
    email,
    resumeUrl,
    aboutBody,
    basedIn,
    timezone,
    languages
  }
`

const socialLinksQuery = groq`
  *[_type == "socialLink" && coalesce(active, true) == true]
    | order(coalesce(order, 999) asc, _createdAt asc) {
      "id": _id,
      label,
      href,
      username,
      icon,
      order
    }
`

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) return null

  try {
    return await sanityClient.fetch<T>(query, params, fetchOptions)
  } catch {
    return null
  }
}

function asLocalizedString(value: unknown): SanityLocalizedString {
  if (!value || typeof value !== "object") return null

  const record = value as Record<string, unknown>
  const en = typeof record.en === "string" ? record.en.trim() : undefined
  const ptBR = typeof record.ptBR === "string" ? record.ptBR.trim() : undefined

  if (!en && !ptBR) return null

  return { en, ptBR }
}

function asLocalizedStringArray(value: unknown): SanityLocalizedStringArray {
  if (!value || typeof value !== "object") return null

  const record = value as Record<string, unknown>
  const en = Array.isArray(record.en) ? record.en.filter((item): item is string => typeof item === "string") : undefined
  const ptBR = Array.isArray(record.ptBR)
    ? record.ptBR.filter((item): item is string => typeof item === "string")
    : undefined

  if (!en?.length && !ptBR?.length) return null

  return { en, ptBR }
}

function toLocalizedString(value: SanityLocalizedString, fallback: LocalizedString): LocalizedString {
  return {
    en: value?.en ?? value?.ptBR ?? fallback.en,
    "pt-BR": value?.ptBR ?? value?.en ?? fallback["pt-BR"],
  }
}

function toLocalizedStringArray(value: SanityLocalizedStringArray, fallback: LocalizedStringArray): LocalizedStringArray {
  return {
    en: value?.en?.length ? value.en : value?.ptBR?.length ? value.ptBR : fallback.en,
    "pt-BR": value?.ptBR?.length ? value.ptBR : value?.en?.length ? value.en : fallback["pt-BR"],
  }
}

const emptyLocalizedString: LocalizedString = { en: "", "pt-BR": "" }

function mapSeoFields(value: RawSeo | undefined): SeoFields | undefined {
  if (!value) return undefined

  const titleValue = asLocalizedString(value.title)
  const descriptionValue = asLocalizedString(value.description)

  const title = titleValue ? toLocalizedString(titleValue, emptyLocalizedString) : undefined
  const description = descriptionValue
    ? toLocalizedString(descriptionValue, emptyLocalizedString)
    : undefined
  const canonicalPath =
    typeof value.canonicalPath === "string" && value.canonicalPath.trim().length
      ? value.canonicalPath.trim()
      : undefined
  const openGraphImageUrl =
    typeof value.openGraphImageUrl === "string" && value.openGraphImageUrl.trim().length
      ? value.openGraphImageUrl.trim()
      : undefined

  if (!title && !description && !canonicalPath && !openGraphImageUrl) {
    return undefined
  }

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonicalPath ? { canonicalPath } : {}),
    ...(openGraphImageUrl ? { openGraphImageUrl } : {}),
  }
}

function readPath(input: unknown, path: string): unknown {
  const tokens = path.split(".")
  let current = input as Record<string, unknown> | undefined

  for (const token of tokens) {
    if (!current || typeof current !== "object") return undefined
    current = current[token] as Record<string, unknown> | undefined
  }

  return current
}

function setPath(target: Record<string, unknown>, path: string, value: unknown) {
  const tokens = path.split(".")
  let current = target

  for (let i = 0; i < tokens.length - 1; i += 1) {
    const token = tokens[i]
    const next = current[token]

    if (!next || typeof next !== "object" || Array.isArray(next)) {
      current[token] = {}
    }

    current = current[token] as Record<string, unknown>
  }

  current[tokens[tokens.length - 1]] = value
}

function resolveLocalizedStringForLocale(
  value: SanityLocalizedString,
  locale: Locale,
  fallback: string,
) {
  if (!value) return fallback
  if (locale === "en") return value.en ?? value.ptBR ?? fallback
  return value.ptBR ?? value.en ?? fallback
}

function resolveLocalizedArrayForLocale(
  value: SanityLocalizedStringArray,
  locale: Locale,
  fallback: string[],
) {
  if (!value) return fallback
  if (locale === "en") return value.en?.length ? value.en : value.ptBR?.length ? value.ptBR : fallback
  return value.ptBR?.length ? value.ptBR : value.en?.length ? value.en : fallback
}

function estimateReadTimeFromBody(body: LocalizedStringArray) {
  const words = `${body.en.join(" ")} ${body["pt-BR"].join(" ")}`.trim().split(/\s+/).filter(Boolean).length
  if (!words) return 1
  return Math.max(1, Math.ceil(words / 220))
}

const skillIconFallbackById: Record<string, SkillGroup["icon"]> = {
  "frontend-architecture": "layers",
  mobile: "smartphone",
  backend: "shield-check",
  performance: "gauge",
  product: "compass",
  dx: "wrench",
}

const metricIconFallbackById: Record<string, Metric["icon"]> = {
  "concurrent-users": "users",
  drivers: "car-front",
  whatsapp: "messages-square",
  concurrency: "lock",
}

function fallbackDictionary(locale: Locale): Dictionary {
  return JSON.parse(JSON.stringify(dictionaries[locale])) as Dictionary
}

function fallbackProjectsData(): Project[] {
  return fallbackProjects.map((project) => ({
    ...project,
    stack: [...project.stack],
    caseStudies: project.caseStudies.map((caseStudy) => ({
      ...caseStudy,
      title: { ...caseStudy.title },
      summary: { ...caseStudy.summary },
      problem: { ...caseStudy.problem },
      systemFocus: { ...caseStudy.systemFocus },
      outcome: { ...caseStudy.outcome },
      highlights: {
        en: [...caseStudy.highlights.en],
        "pt-BR": [...caseStudy.highlights["pt-BR"]],
      },
      body: {
        en: [...caseStudy.body.en],
        "pt-BR": [...caseStudy.body["pt-BR"]],
      },
      stack: [...caseStudy.stack],
    })),
  }))
}

function fallbackCaseStudy(projectSlug: string, index: number): CaseStudy {
  return {
    slug: `${projectSlug}-case-${index + 1}`,
    title: { en: "", "pt-BR": "" },
    summary: { en: "", "pt-BR": "" },
    problem: { en: "", "pt-BR": "" },
    systemFocus: { en: "", "pt-BR": "" },
    outcome: { en: "", "pt-BR": "" },
    highlights: { en: [], "pt-BR": [] },
    body: { en: [], "pt-BR": [] },
    stack: [],
    featured: index === 0,
    order: index + 1,
  }
}

function fallbackProjectEntry(projectSlug: string): Project {
  return {
    slug: projectSlug,
    title: projectSlug,
    category: { en: "", "pt-BR": "" },
    summary: { en: "", "pt-BR": "" },
    stack: [],
    caseStudies: [fallbackCaseStudy(projectSlug, 0)],
    accent: "cyan",
    year: "",
    featured: false,
  }
}

function mapRawCaseStudies(rawProject: NonNullable<RawProject>, fallbackProject: Project): CaseStudy[] {
  const fallbackCases = fallbackProject.caseStudies
  const mapped = (rawProject.caseStudies ?? [])
    .map((caseStudy, index): CaseStudy | null => {
      if (!caseStudy) return null
      const fallbackCase = fallbackCases[index] ?? fallbackCases[0] ?? fallbackCaseStudy(rawProject.slug ?? "project", index)
      const externalUrl = caseStudy.externalUrl
      const slug =
        typeof caseStudy.slug === "string" && caseStudy.slug.trim().length
          ? caseStudy.slug.trim()
          : fallbackCase.slug

      return {
        slug,
        title: toLocalizedString(caseStudy.title ?? null, fallbackCase.title),
        summary: toLocalizedString(caseStudy.summary ?? null, fallbackCase.summary),
        problem: toLocalizedString(caseStudy.problem ?? null, fallbackCase.problem),
        systemFocus: toLocalizedString(caseStudy.systemFocus ?? null, fallbackCase.systemFocus),
        outcome: toLocalizedString(caseStudy.outcome ?? null, fallbackCase.outcome),
        highlights: toLocalizedStringArray(caseStudy.highlights ?? null, fallbackCase.highlights),
        body: toLocalizedStringArray(caseStudy.body ?? null, fallbackCase.body),
        stack: caseStudy.stack?.length ? caseStudy.stack : fallbackCase.stack,
        ...(externalUrl ? { externalUrl } : {}),
        featured: caseStudy.featured ?? fallbackCase.featured,
        order: caseStudy.order ?? fallbackCase.order,
      }
    })
    .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy))

  if (mapped.length > 0) {
    return mapped.sort((a, b) => {
      const byFeatured = Number(b.featured) - Number(a.featured)
      if (byFeatured !== 0) return byFeatured
      return a.order - b.order
    })
  }

  return fallbackCases.length ? fallbackCases : [fallbackCaseStudy(rawProject.slug ?? "project", 0)]
}

function fallbackPostsData(): Article[] {
  return fallbackArticles.map((article) => ({
    ...article,
    updatedAt: undefined,
  }))
}

function fallbackSkillsData(): SkillGroup[] {
  return fallbackSkillGroups.map((group) => ({
    id: group.id,
    icon: skillIconFallbackById[group.id] ?? "layers",
    title: group.title,
    description: group.description,
    technologies: group.technologies,
  }))
}

function fallbackExperienceData(): ExperienceItem[] {
  return fallbackExperience
}

function fallbackMetricsData(): Metric[] {
  return fallbackMetrics.map((metric) => ({
    id: metric.id,
    value: metric.value,
    label: metric.label,
    icon: metricIconFallbackById[metric.id] ?? "users",
  }))
}

function fallbackSocialLinks(): SocialLink[] {
  return [
    {
      id: "github",
      label: fallbackProfile.socials.github.label,
      href: fallbackProfile.socials.github.href,
      username: fallbackProfile.socials.github.username,
      icon: "github",
      order: 1,
    },
    {
      id: "linkedin",
      label: fallbackProfile.socials.linkedin.label,
      href: fallbackProfile.socials.linkedin.href,
      username: fallbackProfile.socials.linkedin.username,
      icon: "linkedin",
      order: 2,
    },
    {
      id: "email",
      label: fallbackProfile.socials.email.label,
      href: fallbackProfile.socials.email.href,
      username: fallbackProfile.socials.email.username,
      icon: "email",
      order: 3,
    },
  ]
}

function fallbackProfileData(): Profile {
  const fallbackSocials = fallbackSocialLinks()

  const findSocial = (icon: SocialIconKey) => fallbackSocials.find((item) => item.icon === icon) ?? null

  return {
    name: fallbackProfile.name,
    role: { en: fallbackProfile.role, "pt-BR": fallbackProfile.role },
    location: { en: fallbackProfile.location, "pt-BR": fallbackProfile.location },
    email: fallbackProfile.email,
    resumeUrl: fallbackProfile.resumeUrl,
    aboutBody: {
      en: dictionaries.en.about.body,
      "pt-BR": dictionaries["pt-BR"].about.body,
    },
    basedIn: {
      en: dictionaries.en.about.basedIn,
      "pt-BR": dictionaries["pt-BR"].about.basedIn,
    },
    timezone: {
      en: dictionaries.en.about.timezone,
      "pt-BR": dictionaries["pt-BR"].about.timezone,
    },
    languages: {
      en: dictionaries.en.about.languages,
      "pt-BR": dictionaries["pt-BR"].about.languages,
    },
    socials: {
      github: findSocial("github"),
      linkedin: findSocial("linkedin"),
      email: findSocial("email"),
    },
  }
}

function applyDictionaryOverrides(locale: Locale, copy: Record<string, unknown> | undefined) {
  const dictionary = fallbackDictionary(locale) as Record<string, unknown>
  if (!copy) return dictionary as Dictionary

  const stringFields = [
    "metadata.title",
    "metadata.description",
    "nav.projects",
    "nav.writing",
    "nav.about",
    "nav.contact",
    "nav.resume",
    "hero.availability",
    "hero.timezone",
    "hero.headline",
    "hero.description",
    "hero.ctaPrimary",
    "hero.ctaSecondary",
    "hero.currentlyBuilding",
    "hero.focusKicker",
    "hero.focusTitle",
    "metrics.eyebrow",
    "metrics.title",
    "metrics.description",
    "projects.eyebrow",
    "projects.title",
    "projects.description",
    "projects.readCaseStudy",
    "projects.viewCaseStudies",
    "projects.visit",
    "projects.editorialNote",
    "skills.eyebrow",
    "skills.title",
    "skills.description",
    "experience.eyebrow",
    "experience.title",
    "experience.description",
    "experience.present",
    "writing.eyebrow",
    "writing.title",
    "writing.description",
    "writing.readArticle",
    "writing.minRead",
    "writing.viewAll",
    "about.eyebrow",
    "about.title",
    "about.body",
    "about.basedIn",
    "about.timezone",
    "about.languages",
    "about.locationLabel",
    "about.timezoneLabel",
    "about.languagesLabel",
    "contact.eyebrow",
    "contact.title",
    "contact.description",
    "contact.contactMe",
    "contact.downloadCv",
    "contact.linkedin",
    "footer.builtWith",
    "footer.location",
    "footer.rights",
    "pages.projectsTitle",
    "pages.projectsDescription",
    "pages.blogTitle",
    "pages.blogDescription",
    "pages.backHome",
    "pages.backProjects",
    "pages.backBlog",
    "pages.caseStudy",
    "pages.caseStudies",
    "pages.caseLabel",
    "pages.noCaseStudies",
    "pages.overview",
    "pages.problem",
    "pages.systemFocus",
    "pages.outcome",
    "pages.highlights",
    "pages.stack",
    "pages.openProject",
    "pages.readArticle",
    "pages.published",
  ] as const

  for (const fieldPath of stringFields) {
    const fieldValue = asLocalizedString(readPath(copy, fieldPath))
    const fallbackValue = readPath(dictionary, fieldPath)

    if (typeof fallbackValue !== "string") continue

    const resolved = resolveLocalizedStringForLocale(fieldValue, locale, fallbackValue)
    setPath(dictionary, fieldPath, resolved)
  }

  const arrayFields = ["hero.focusItems"] as const

  for (const fieldPath of arrayFields) {
    const fieldValue = asLocalizedStringArray(readPath(copy, fieldPath))
    const fallbackValue = readPath(dictionary, fieldPath)

    if (!Array.isArray(fallbackValue)) continue

    const resolved = resolveLocalizedArrayForLocale(fieldValue, locale, fallbackValue.filter((item): item is string => typeof item === "string"))
    setPath(dictionary, fieldPath, resolved)
  }

  return dictionary as Dictionary
}

const getRawSiteSettings = cache(async () => safeFetch<RawSiteSettings>(siteSettingsQuery))

const getRawProfile = cache(async () => safeFetch<RawProfile>(profileQuery))

const getRawSocialLinks = cache(async () => safeFetch<RawSocialLink[]>(socialLinksQuery))

export const getDictionary = cache(async (locale: Locale) => {
  const rawSettings = await getRawSiteSettings()
  return applyDictionaryOverrides(locale, rawSettings?.copy)
})

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSettings> => {
  const rawSettings = await getRawSiteSettings()
  const dictionary = await getDictionary(locale)
  const openGraphImageUrl =
    typeof rawSettings?.openGraphImageUrl === "string" && rawSettings.openGraphImageUrl.trim().length
      ? rawSettings.openGraphImageUrl.trim()
      : undefined

  const metadataTitle = toLocalizedString(rawSettings?.metadataTitle ?? null, {
    en: dictionaries.en.metadata.title,
    "pt-BR": dictionaries["pt-BR"].metadata.title,
  })

  const metadataDescription = toLocalizedString(rawSettings?.metadataDescription ?? null, {
    en: dictionaries.en.metadata.description,
    "pt-BR": dictionaries["pt-BR"].metadata.description,
  })

  return {
    siteName: rawSettings?.siteName ?? fallbackProfile.name,
    analyticsKey: rawSettings?.analyticsKey,
    resumeUrl: rawSettings?.resumeUrl ?? fallbackProfile.resumeUrl,
    openGraphImageUrl,
    metadataTitle,
    metadataDescription,
    dictionaryOverride: dictionary,
  }
})

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const rawLinks = await getRawSocialLinks()
  if (!rawLinks?.length) {
    return fallbackSocialLinks()
  }

  const links = rawLinks
    .map((link, index) => {
      if (!link?.href || !link.icon) return null

      return {
        id: link.id ?? `${link.icon}-${index}`,
        label: link.label ?? link.icon,
        href: link.href,
        username: link.username ?? link.href,
        icon: link.icon,
        order: link.order ?? index,
      } satisfies SocialLink
    })
    .filter((item): item is SocialLink => Boolean(item))

  return links.length ? links : fallbackSocialLinks()
})

export const getProfile = cache(async (): Promise<Profile> => {
  const rawProfile = await getRawProfile()
  const socialLinks = await getSocialLinks()
  const fallback = fallbackProfileData()

  const findSocial = (icon: SocialIconKey) => socialLinks.find((item) => item.icon === icon) ?? null

  return {
    name: rawProfile?.name ?? fallback.name,
    role: toLocalizedString(rawProfile?.role ?? null, fallback.role),
    location: toLocalizedString(rawProfile?.location ?? null, fallback.location),
    email: rawProfile?.email ?? fallback.email,
    resumeUrl: rawProfile?.resumeUrl ?? fallback.resumeUrl,
    aboutBody: toLocalizedString(rawProfile?.aboutBody ?? null, fallback.aboutBody),
    basedIn: toLocalizedString(rawProfile?.basedIn ?? null, fallback.basedIn),
    timezone: toLocalizedString(rawProfile?.timezone ?? null, fallback.timezone),
    languages: toLocalizedString(rawProfile?.languages ?? null, fallback.languages),
    socials: {
      github: findSocial("github"),
      linkedin: findSocial("linkedin"),
      email: findSocial("email"),
    },
  }
})

const getRawProjects = cache(async () => safeFetch<RawProject[]>(projectsQuery))

export const getProjects = cache(async (): Promise<Project[]> => {
  const rawProjects = await getRawProjects()
  const fallback = fallbackProjectsData()

  if (!rawProjects?.length) {
    return fallback
  }

  const mapped = rawProjects
    .map((item, index): Project | null => {
      if (!item?.slug) return null
      const fallbackProject = fallback[index] ?? fallback[0] ?? fallbackProjectEntry(item.slug)
      const externalUrl = item.externalUrl
      const seo = mapSeoFields(item.seo)

      return {
        slug: item.slug,
        title:
          item.title?.en ??
          item.title?.ptBR ??
          fallbackProject?.title ??
          item.slug,
        category: toLocalizedString(item.category ?? null, fallbackProject?.category ?? { en: "", "pt-BR": "" }),
        summary: toLocalizedString(item.summary ?? null, fallbackProject?.summary ?? { en: "", "pt-BR": "" }),
        stack: item.stack?.length ? item.stack : fallbackProject?.stack ?? [],
        caseStudies: mapRawCaseStudies(item, fallbackProject),
        ...(externalUrl ? { externalUrl } : {}),
        accent: item.accent ?? fallbackProject?.accent ?? "cyan",
        year: item.year ?? fallbackProject?.year ?? "",
        featured: item.featured ?? fallbackProject?.featured ?? false,
        ...(seo ? { seo } : {}),
      }
    })
    .filter((project): project is Project => Boolean(project))

  return mapped.length ? mapped : fallback
})

export const getProjectSlugs = cache(async () => {
  const slugs = await safeFetch<string[]>(projectSlugsQuery)
  if (!slugs?.length) {
    return fallbackProjects.map((project) => project.slug)
  }

  return slugs
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const rawProject = await safeFetch<RawProject>(projectBySlugQuery, { slug })
  if (!rawProject?.slug) {
    const fallback = fallbackProjectsData().find((item) => item.slug === slug)
    return fallback ?? null
  }

  const fallback =
    fallbackProjectsData().find((item) => item.slug === slug) ??
    fallbackProjectsData()[0] ??
    fallbackProjectEntry(rawProject.slug)

  const externalUrl = rawProject.externalUrl
  const seo = mapSeoFields(rawProject.seo)

  return {
    slug: rawProject.slug,
    title: rawProject.title?.en ?? rawProject.title?.ptBR ?? fallback?.title ?? rawProject.slug,
    category: toLocalizedString(rawProject.category ?? null, fallback?.category ?? { en: "", "pt-BR": "" }),
    summary: toLocalizedString(rawProject.summary ?? null, fallback?.summary ?? { en: "", "pt-BR": "" }),
    stack: rawProject.stack?.length ? rawProject.stack : fallback?.stack ?? [],
    caseStudies: mapRawCaseStudies(rawProject, fallback),
    ...(externalUrl ? { externalUrl } : {}),
    accent: rawProject.accent ?? fallback?.accent ?? "cyan",
    year: rawProject.year ?? fallback?.year ?? "",
    featured: rawProject.featured ?? fallback?.featured ?? false,
    ...(seo ? { seo } : {}),
  }
})

const getRawPosts = cache(async () => safeFetch<RawPost[]>(postsQuery))

export const getPosts = cache(async (): Promise<Article[]> => {
  const rawPosts = await getRawPosts()
  const fallback = fallbackPostsData()

  if (!rawPosts?.length) {
    return fallback
  }

  const mapped = rawPosts
    .map((item, index): Article | null => {
      if (!item?.slug) return null
      const fallbackPost = fallback[index] ?? fallback[0]
      const body = toLocalizedStringArray(item.body ?? null, fallbackPost?.body ?? { en: [], "pt-BR": [] })
      const readTime = item.readTime ?? estimateReadTimeFromBody(body)
      const updatedAt = item.updatedAt ?? fallbackPost?.updatedAt
      const seo = mapSeoFields(item.seo)

      return {
        slug: item.slug,
        title: toLocalizedString(item.title ?? null, fallbackPost?.title ?? { en: "", "pt-BR": "" }),
        excerpt: toLocalizedString(item.excerpt ?? null, fallbackPost?.excerpt ?? { en: "", "pt-BR": "" }),
        body,
        tags: item.tags?.length ? item.tags : fallbackPost?.tags ?? [],
        readTime,
        publishedAt: item.publishedAt ?? fallbackPost?.publishedAt ?? new Date().toISOString(),
        ...(updatedAt ? { updatedAt } : {}),
        ...(seo ? { seo } : {}),
      }
    })
    .filter((post): post is Article => Boolean(post))

  return mapped.length ? mapped : fallback
})

export const getPostSlugs = cache(async () => {
  const slugs = await safeFetch<string[]>(postSlugsQuery)
  if (!slugs?.length) {
    return fallbackArticles.map((article) => article.slug)
  }

  return slugs
})

export const getPostBySlug = cache(async (slug: string): Promise<Article | null> => {
  const rawPost = await safeFetch<RawPost>(postBySlugQuery, { slug })
  if (!rawPost?.slug) {
    const fallback = fallbackPostsData().find((item) => item.slug === slug)
    return fallback ?? null
  }

  const fallback = fallbackPostsData().find((item) => item.slug === slug) ?? fallbackPostsData()[0]
  const body = toLocalizedStringArray(rawPost.body ?? null, fallback?.body ?? { en: [], "pt-BR": [] })
  const readTime = rawPost.readTime ?? estimateReadTimeFromBody(body)
  const updatedAt = rawPost.updatedAt ?? fallback?.updatedAt
  const seo = mapSeoFields(rawPost.seo)

  return {
    slug: rawPost.slug,
    title: toLocalizedString(rawPost.title ?? null, fallback?.title ?? { en: "", "pt-BR": "" }),
    excerpt: toLocalizedString(rawPost.excerpt ?? null, fallback?.excerpt ?? { en: "", "pt-BR": "" }),
    body,
    tags: rawPost.tags?.length ? rawPost.tags : fallback?.tags ?? [],
    readTime,
    publishedAt: rawPost.publishedAt ?? fallback?.publishedAt ?? new Date().toISOString(),
    ...(updatedAt ? { updatedAt } : {}),
    ...(seo ? { seo } : {}),
  }
})

export const getSkillGroups = cache(async (): Promise<SkillGroup[]> => {
  const rawGroups = await safeFetch<RawSkillGroup[]>(skillsQuery)
  const fallback = fallbackSkillsData()

  if (!rawGroups?.length) {
    return fallback
  }

  const mapped = rawGroups
    .map((group, index) => {
      if (!group) return null
      const fallbackGroup = fallback[index] ?? fallback[0]

      return {
        id: group.id ?? fallbackGroup?.id ?? `skill-${index}`,
        icon: group.icon ?? fallbackGroup?.icon ?? "layers",
        title: toLocalizedString(group.title ?? null, fallbackGroup?.title ?? { en: "", "pt-BR": "" }),
        description: toLocalizedString(group.description ?? null, fallbackGroup?.description ?? { en: "", "pt-BR": "" }),
        technologies: group.technologies?.length ? group.technologies : fallbackGroup?.technologies ?? [],
      } satisfies SkillGroup
    })
    .filter((group): group is SkillGroup => Boolean(group))

  return mapped.length ? mapped : fallback
})

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const rawItems = await safeFetch<RawExperienceItem[]>(experienceQuery)
  const fallback = fallbackExperienceData()

  if (!rawItems?.length) {
    return fallback
  }

  const mapped = rawItems
    .map((item, index) => {
      if (!item) return null
      const fallbackItem = fallback[index] ?? fallback[0]

      return {
        id: item.id ?? fallbackItem?.id ?? `experience-${index}`,
        role: toLocalizedString(item.role ?? null, fallbackItem?.role ?? { en: "", "pt-BR": "" }),
        company: item.company ?? fallbackItem?.company ?? "",
        period: {
          start: item.period?.start ?? fallbackItem?.period.start ?? "",
          end: (item.period?.end as ExperienceItem["period"]["end"] | undefined) ?? fallbackItem?.period.end ?? "present",
        },
        summary: toLocalizedString(item.summary ?? null, fallbackItem?.summary ?? { en: "", "pt-BR": "" }),
        achievements: toLocalizedStringArray(item.achievements ?? null, fallbackItem?.achievements ?? { en: [], "pt-BR": [] }),
        stack: item.stack?.length ? item.stack : fallbackItem?.stack ?? [],
      } satisfies ExperienceItem
    })
    .filter((entry): entry is ExperienceItem => Boolean(entry))

  return mapped.length ? mapped : fallback
})

export const getMetrics = cache(async (): Promise<Metric[]> => {
  const rawMetrics = await safeFetch<RawMetric[]>(metricsQuery)
  const fallback = fallbackMetricsData()

  if (!rawMetrics?.length) {
    return fallback
  }

  const mapped = rawMetrics
    .map((metric, index) => {
      if (!metric) return null
      const fallbackMetric = fallback[index] ?? fallback[0]

      return {
        id: metric.id ?? fallbackMetric?.id ?? `metric-${index}`,
        value: metric.value ?? fallbackMetric?.value ?? "",
        label: toLocalizedString(metric.label ?? null, fallbackMetric?.label ?? { en: "", "pt-BR": "" }),
        icon: metric.icon ?? fallbackMetric?.icon ?? "users",
      } satisfies Metric
    })
    .filter((entry): entry is Metric => Boolean(entry))

  return mapped.length ? mapped : fallback
})

export const getHomePageContent = cache(async () => {
  const [metrics, projects, skillGroups, experience, articles] = await Promise.all([
    getMetrics(),
    getProjects(),
    getSkillGroups(),
    getExperience(),
    getPosts(),
  ])

  return {
    metrics,
    projects,
    skillGroups,
    experience,
    articles,
  }
})
