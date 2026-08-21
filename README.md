# Vitor Rafael — Portfolio

Personal portfolio site. Lists recent projects and skills, with content (case studies, project entries) managed through a Sanity Studio embedded in the same app.

## Tech Stack

- **Framework:** Next.js 16 (App Router, i18n via `[locale]` routing), React 19, TypeScript
- **Content:** Sanity CMS (`next-sanity`, embedded Sanity Studio, Portable Text rendering)
- **UI:** Tailwind CSS, Radix UI primitives, shadcn-style components, `next-themes`
- **Other:** React Hook Form + Zod (forms/validation), Recharts, Embla Carousel, Vercel Analytics & Speed Insights

## Features

- Locale-aware routing (`app/[locale]`)
- Content-managed pages backed by Sanity (schemas in `sanity/schemas`)
- SEO basics: `robots.ts` and `sitemap.ts`
- Dark/light theme support
- Analytics and speed insights via Vercel

## Getting Started

```bash
cd front
cp .env.example .env.local
npm install
npm run dev
```

Environment variables (`front/.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used in sitemap/robots) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (e.g. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version |
| `SANITY_API_READ_TOKEN` | Read token for fetching content |
| `NEXT_PUBLIC_ANALYTICS_KEY` | Optional, for analytics |

Run the embedded Sanity Studio with:

```bash
npm run sanity
```
