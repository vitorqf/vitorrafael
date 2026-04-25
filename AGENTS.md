# AGENTS.md

## Project Direction

This repository is for a personal portfolio optimized for hiring and professional credibility. Future work should prioritize clear presentation of projects, case studies, technical skills, experience, writing, contact paths, and resume access.

The portfolio should feel clean, professional, fast, readable, accessible, and polished. Avoid gimmicks, heavy animation, decorative effects, or visual choices that reduce clarity, performance, or maintainability.

## Default Stack

- Use Next.js with the App Router and TypeScript.
- Use Sanity as the CMS for editable structured content.
- Use Vercel as the default deployment and preview environment.
- Prefer server components and static or incremental rendering where practical.
- Keep client-side JavaScript minimal. Add client components only for real interactivity.
- If adding styling from scratch, prefer a lightweight, maintainable system that supports responsive design, design tokens, and consistent components.

## Internationalization

Support `pt-BR` and `en` from v1.

- Use locale-aware routes with this shape:
  - `/[locale]`
  - `/[locale]/projects`
  - `/[locale]/projects/[slug]`
  - `/[locale]/blog`
  - `/[locale]/blog/[slug]`
- Localize navigation, page copy, CMS content, metadata, Open Graph content, sitemap entries, and alternate language links.
- Provide a visible language switcher that preserves the current page when a translation exists.
- Define clear fallback behavior for missing translations. Prefer showing the available locale with an explicit CMS-driven fallback rather than broken pages.
- Do not hard-code user-facing copy in components if it belongs in localized content or CMS-managed fields.

## CMS Content Contract

Sanity content should be the source of truth for portfolio content that the site owner may update without code changes.

Required editable content types:

- Projects and project case studies
- Blog posts/articles
- Profile/about content
- Skills and technology groups
- Work experience or professional timeline
- Social links
- Resume and contact calls to action
- Navigation labels and ordering
- Site settings
- SEO fields

Project entries should support localized titles, summaries, body content, cover images, galleries, role, dates, technologies, links, featured status, and slug fields.

Blog entries should support localized title, excerpt, body content, publication date, update date, tags/categories, author/profile reference, cover image, slug, and SEO fields.

Site settings should support localized default metadata, Open Graph image, contact links, analytics configuration, and global navigation/footer content.

## UX And Visual Standards

- Design for recruiters, hiring managers, clients, and technical peers who need to scan quickly.
- Make the first viewport immediately communicate the person's name, role, location or availability context if relevant, and primary call to action.
- Projects should be easy to browse and compare, with strong case-study pages for selected work.
- Blog content should be readable, well-spaced, and optimized for long-form reading.
- Use responsive layouts that work well on mobile, tablet, and desktop.
- Do not let text overflow buttons, cards, nav items, or narrow mobile layouts.
- Use real project imagery or high-quality generated/curated visuals only when they clarify the work.
- Avoid UI cards inside other cards and avoid decorative visuals that dominate the content.

## Performance Requirements

Performance is a release criterion, not a later polish task.

- Target excellent Lighthouse scores and Core Web Vitals.
- Optimize images with Next.js image tooling or an equivalent pipeline.
- Use stable dimensions or aspect ratios for media to prevent layout shift.
- Optimize fonts with `next/font` or an equivalent local/font-loading strategy.
- Avoid large animation libraries, unnecessary client state, and broad client-side bundles.
- Prefer static generation, ISR, caching, and CDN-friendly data fetching where content allows it.
- Keep third-party scripts minimal and load them only when justified.

## Accessibility Requirements

- Use semantic HTML and proper heading order.
- Ensure keyboard navigation works for menus, links, forms, dialogs, and language switching.
- Maintain accessible color contrast.
- Provide meaningful alt text for content images and empty alt text for decorative images.
- Respect reduced-motion preferences.
- Ensure focus states are visible.
- Test responsive zoom and narrow viewport behavior.

## SEO And Discoverability

- Generate localized metadata for every public route.
- Include Open Graph and Twitter/social sharing metadata.
- Generate `sitemap.xml` and `robots.txt`.
- Include canonical URLs and alternate locale links.
- Use structured data where it is useful, especially for person/profile, articles, and projects.
- Ensure project and blog slugs are stable and CMS-managed.

## Analytics, Privacy, And Security

- Keep analytics privacy-conscious and lightweight.
- Do not add tracking that is unrelated to portfolio goals.
- Keep secrets in environment variables. Never commit tokens, API keys, or private CMS credentials.
- Use read-only public tokens for published content when possible.
- Use preview or draft tokens only on server-side preview paths.
- Document all required environment variables in an example env file when the app is scaffolded.

Expected environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` for preview or draft access when needed
- `NEXT_PUBLIC_SITE_URL`
- Optional analytics key if analytics are added

## Testing And Verification

Before calling implementation work complete, run the relevant project checks. Once the app is scaffolded, maintain scripts for:

- type checking
- linting
- unit or component tests where useful
- production build
- basic route smoke tests

Browser verification should cover:

- responsive layout on mobile and desktop
- language switching
- home page
- projects listing and project detail pages
- blog listing and blog detail pages
- CMS empty, loading, fallback, and missing-translation states
- SEO metadata and social preview fields
- contact and resume calls to action

Run Lighthouse or an equivalent performance check before declaring the portfolio ready for release.

## Development Workflow

- Keep changes focused and consistent with the existing codebase.
- Prefer small, well-named components with clear responsibilities.
- Use structured CMS queries and typed content models instead of ad hoc data access.
- Keep content rendering resilient to missing optional CMS fields.
- Do not introduce new dependencies unless they clearly improve quality, maintainability, or performance.
- When adding a new public route, update i18n behavior, metadata, sitemap coverage, and smoke tests.
- When adding new CMS fields, update types, queries, preview behavior, fallback behavior, and documentation.

## Commit Messages

Use Conventional Commits for all commit messages.

Format:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Use `feat:` for new features and `fix:` for bug fixes. Other valid types include `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, and `chore:`.

Breaking changes must use `!` in the type/scope prefix or a `BREAKING CHANGE:` footer.

