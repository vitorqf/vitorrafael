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

const fetchOptions = { next: { revalidate: 60 } }

type RawSiteSettings = {
  siteName?: string
  analyticsKey?: string
  resumeUrl?: string
  openGraphImageUrl?: string
  resumeFileUrl?: string
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
  coverImageUrl?: string
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
  toptalUrl?: string
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
    "resumeFileUrl": resumeFile.asset->url,
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
      "coverImageUrl": coverImage.asset->url,
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
    "coverImageUrl": coverImage.asset->url,
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
    toptalUrl,
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

function toLocalizedString(value: SanityLocalizedString, fallback: LocalizedString = { en: "", "pt-BR": "" }): LocalizedString {
  return {
    en: value?.en ?? value?.ptBR ?? fallback.en,
    "pt-BR": value?.ptBR ?? value?.en ?? fallback["pt-BR"],
  }
}

function toLocalizedStringArray(
  value: SanityLocalizedStringArray,
  fallback: LocalizedStringArray = { en: [], "pt-BR": [] },
): LocalizedStringArray {
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

function fallbackDictionary(locale: Locale): Dictionary {
  return JSON.parse(JSON.stringify(dictionaries[locale])) as Dictionary
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

function mapRawCaseStudies(rawProject: NonNullable<RawProject>): CaseStudy[] {
  const mapped = (rawProject.caseStudies ?? [])
    .map((caseStudy, index): CaseStudy | null => {
      if (!caseStudy) return null
      const externalUrl = caseStudy.externalUrl
      const slug =
        typeof caseStudy.slug === "string" && caseStudy.slug.trim().length
          ? caseStudy.slug.trim()
          : fallbackCaseStudy(rawProject.slug ?? "project", index).slug

      return {
        slug,
        title: toLocalizedString(caseStudy.title ?? null),
        summary: toLocalizedString(caseStudy.summary ?? null),
        problem: toLocalizedString(caseStudy.problem ?? null),
        systemFocus: toLocalizedString(caseStudy.systemFocus ?? null),
        outcome: toLocalizedString(caseStudy.outcome ?? null),
        highlights: toLocalizedStringArray(caseStudy.highlights ?? null),
        body: toLocalizedStringArray(caseStudy.body ?? null),
        stack: caseStudy.stack?.length ? caseStudy.stack : [],
        ...(externalUrl ? { externalUrl } : {}),
        featured: caseStudy.featured ?? index === 0,
        order: caseStudy.order ?? index + 1,
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

  return []
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
    siteName: rawSettings?.siteName ?? "Portfolio",
    analyticsKey: rawSettings?.analyticsKey,
    resumeUrl: rawSettings?.resumeFileUrl ?? rawSettings?.resumeUrl,
    openGraphImageUrl,
    metadataTitle,
    metadataDescription,
    dictionaryOverride: dictionary,
  }
})

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const rawLinks = await getRawSocialLinks()
  if (!rawLinks?.length) {
    return []
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

  return links
})

export const getProfile = cache(async (): Promise<Profile> => {
  const rawProfile = await getRawProfile()
  const socialLinks = await getSocialLinks()

  const findSocial = (icon: SocialIconKey) => socialLinks.find((item) => item.icon === icon) ?? null

  return {
    name: rawProfile?.name ?? "",
    role: toLocalizedString(rawProfile?.role ?? null),
    location: toLocalizedString(rawProfile?.location ?? null),
    email: rawProfile?.email ?? "",
    resumeUrl: rawProfile?.resumeUrl ?? "",
    toptalUrl: rawProfile?.toptalUrl,
    aboutBody: toLocalizedString(rawProfile?.aboutBody ?? null),
    basedIn: toLocalizedString(rawProfile?.basedIn ?? null),
    timezone: toLocalizedString(rawProfile?.timezone ?? null),
    languages: toLocalizedString(rawProfile?.languages ?? null),
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
  if (!rawProjects?.length) return []

  const mapped = rawProjects
    .map((item): Project | null => {
      if (!item?.slug) return null
      const externalUrl = item.externalUrl
      const coverImageUrl = item.coverImageUrl
      const seo = mapSeoFields(item.seo)

      return {
        slug: item.slug,
        title: item.title?.en ?? item.title?.ptBR ?? item.slug,
        category: toLocalizedString(item.category ?? null),
        summary: toLocalizedString(item.summary ?? null),
        stack: item.stack?.length ? item.stack : [],
        caseStudies: mapRawCaseStudies(item),
        ...(externalUrl ? { externalUrl } : {}),
        ...(coverImageUrl ? { coverImageUrl } : {}),
        accent: item.accent ?? "cyan",
        year: item.year ?? "",
        featured: item.featured ?? false,
        ...(seo ? { seo } : {}),
      }
    })
    .filter((project): project is Project => Boolean(project))

  return mapped
})

export const getProjectSlugs = cache(async () => {
  const slugs = await safeFetch<string[]>(projectSlugsQuery)
  return slugs ?? []
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const rawProject = await safeFetch<RawProject>(projectBySlugQuery, { slug })
  if (!rawProject?.slug) return null

  const externalUrl = rawProject.externalUrl
  const coverImageUrl = rawProject.coverImageUrl
  const seo = mapSeoFields(rawProject.seo)

  return {
    slug: rawProject.slug,
    title: rawProject.title?.en ?? rawProject.title?.ptBR ?? rawProject.slug,
    category: toLocalizedString(rawProject.category ?? null),
    summary: toLocalizedString(rawProject.summary ?? null),
    stack: rawProject.stack?.length ? rawProject.stack : [],
    caseStudies: mapRawCaseStudies(rawProject),
    ...(externalUrl ? { externalUrl } : {}),
    ...(coverImageUrl ? { coverImageUrl } : {}),
    accent: rawProject.accent ?? "cyan",
    year: rawProject.year ?? "",
    featured: rawProject.featured ?? false,
    ...(seo ? { seo } : {}),
  }
})

const getRawPosts = cache(async () => safeFetch<RawPost[]>(postsQuery))

export const getPosts = cache(async (): Promise<Article[]> => {
  const rawPosts = await getRawPosts()
  if (!rawPosts?.length) return []

  const mapped = rawPosts
    .map((item): Article | null => {
      if (!item?.slug) return null
      const body = toLocalizedStringArray(item.body ?? null)
      const readTime = item.readTime ?? estimateReadTimeFromBody(body)
      const updatedAt = item.updatedAt
      const seo = mapSeoFields(item.seo)

      return {
        slug: item.slug,
        title: toLocalizedString(item.title ?? null),
        excerpt: toLocalizedString(item.excerpt ?? null),
        body,
        tags: item.tags?.length ? item.tags : [],
        readTime,
        publishedAt: item.publishedAt ?? new Date().toISOString(),
        ...(updatedAt ? { updatedAt } : {}),
        ...(seo ? { seo } : {}),
      }
    })
    .filter((post): post is Article => Boolean(post))

  return mapped
})

export const getPostSlugs = cache(async () => {
  const slugs = await safeFetch<string[]>(postSlugsQuery)
  return slugs ?? []
})

export const getPostBySlug = cache(async (slug: string): Promise<Article | null> => {
  const rawPost = await safeFetch<RawPost>(postBySlugQuery, { slug })
  if (!rawPost?.slug) return null

  const body = toLocalizedStringArray(rawPost.body ?? null)
  const readTime = rawPost.readTime ?? estimateReadTimeFromBody(body)
  const updatedAt = rawPost.updatedAt
  const seo = mapSeoFields(rawPost.seo)

  return {
    slug: rawPost.slug,
    title: toLocalizedString(rawPost.title ?? null),
    excerpt: toLocalizedString(rawPost.excerpt ?? null),
    body,
    tags: rawPost.tags?.length ? rawPost.tags : [],
    readTime,
    publishedAt: rawPost.publishedAt ?? new Date().toISOString(),
    ...(updatedAt ? { updatedAt } : {}),
    ...(seo ? { seo } : {}),
  }
})

export const getSkillGroups = cache(async (): Promise<SkillGroup[]> => {
  const rawGroups = await safeFetch<RawSkillGroup[]>(skillsQuery)
  if (!rawGroups?.length) return []

  const mapped = rawGroups
    .map((group, index) => {
      if (!group) return null

      return {
        id: group.id ?? `skill-${index}`,
        icon: group.icon ?? "layers",
        title: toLocalizedString(group.title ?? null),
        description: toLocalizedString(group.description ?? null),
        technologies: group.technologies?.length ? group.technologies : [],
      } satisfies SkillGroup
    })
    .filter((group): group is SkillGroup => Boolean(group))

  return mapped
})

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  const rawItems = await safeFetch<RawExperienceItem[]>(experienceQuery)
  if (!rawItems?.length) return []

  const mapped = rawItems
    .map((item, index) => {
      if (!item) return null

      return {
        id: item.id ?? `experience-${index}`,
        role: toLocalizedString(item.role ?? null),
        company: item.company ?? "",
        period: {
          start: item.period?.start ?? "",
          end: (item.period?.end as ExperienceItem["period"]["end"] | undefined) ?? "present",
        },
        summary: toLocalizedString(item.summary ?? null),
        achievements: toLocalizedStringArray(item.achievements ?? null),
        stack: item.stack?.length ? item.stack : [],
      } satisfies ExperienceItem
    })
    .filter((entry): entry is ExperienceItem => Boolean(entry))

  return mapped
})

export const getMetrics = cache(async (): Promise<Metric[]> => {
  const rawMetrics = await safeFetch<RawMetric[]>(metricsQuery)
  if (!rawMetrics?.length) return []

  const mapped = rawMetrics
    .map((metric, index) => {
      if (!metric) return null

      return {
        id: metric.id ?? `metric-${index}`,
        value: metric.value ?? "",
        label: toLocalizedString(metric.label ?? null),
        icon: metric.icon ?? "users",
      } satisfies Metric
    })
    .filter((entry): entry is Metric => Boolean(entry))

  return mapped
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
