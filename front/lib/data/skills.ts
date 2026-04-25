import type { LucideIcon } from "lucide-react"
import { Layers, Smartphone, ShieldCheck, Gauge, Compass, Wrench } from "lucide-react"

export type SkillGroup = {
  id: string
  icon: LucideIcon
  title: { en: string; "pt-BR": string }
  description: { en: string; "pt-BR": string }
  technologies: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend-architecture",
    icon: Layers,
    title: { en: "Frontend Architecture", "pt-BR": "Arquitetura de Frontend" },
    description: {
      en: "Component systems, data layers and rendering strategies that scale beyond the demo.",
      "pt-BR": "Design systems, camadas de dados e estratégias de renderização que escalam além da demo.",
    },
    technologies: ["Next.js", "React", "TypeScript", "TanStack Query", "Zustand", "Radix UI"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: { en: "Mobile Engineering", "pt-BR": "Engenharia Mobile" },
    description: {
      en: "Cross-platform apps with native bridges where it matters — telemetry, sensors, deep OS integration.",
      "pt-BR": "Apps cross-platform com bridges nativos onde importa — telemetria, sensores, integração com SO.",
    },
    technologies: ["React Native", "Expo", "Native Modules", "Android", "iOS", "EAS"],
  },
  {
    id: "backend",
    icon: ShieldCheck,
    title: { en: "Backend Reliability", "pt-BR": "Confiabilidade no Backend" },
    description: {
      en: "Concurrency, idempotency and consistency patterns for systems that can’t silently corrupt data.",
      "pt-BR": "Concorrência, idempotência e consistência para sistemas que não podem corromper dados em silêncio.",
    },
    technologies: ["NestJS", "Node.js", "PostgreSQL", "Redis", "BullMQ", "Prisma"],
  },
  {
    id: "performance",
    icon: Gauge,
    title: { en: "Performance & CDN", "pt-BR": "Performance & CDN" },
    description: {
      en: "Caching, edge delivery and client-side data strategies that take pressure off origin servers.",
      "pt-BR": "Cache, entrega na borda e estratégias de dados no cliente que aliviam servidores de origem.",
    },
    technologies: ["AWS CloudFront", "Vercel Edge", "ISR", "Streaming", "Web Vitals"],
  },
  {
    id: "product",
    icon: Compass,
    title: { en: "Product Thinking", "pt-BR": "Visão de Produto" },
    description: {
      en: "Pragmatic scoping, user-facing tradeoffs and shipping the version that actually moves metrics.",
      "pt-BR": "Escopo pragmático, tradeoffs voltados ao usuário e entrega da versão que move métricas de verdade.",
    },
    technologies: ["Discovery", "Prioritization", "A/B testing", "Analytics"],
  },
  {
    id: "dx",
    icon: Wrench,
    title: { en: "Developer Experience", "pt-BR": "Developer Experience" },
    description: {
      en: "Tooling, conventions and CI flows that make a team faster — not just one person.",
      "pt-BR": "Ferramental, convenções e CI que tornam um time mais rápido — não só uma pessoa.",
    },
    technologies: ["Monorepos", "Turborepo", "ESLint", "Vitest", "Playwright", "GitHub Actions"],
  },
]
