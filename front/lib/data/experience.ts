export type ExperienceItem = {
  id: string
  role: { en: string; "pt-BR": string }
  company: string
  period: { start: string; end: string | "present" }
  summary: { en: string; "pt-BR": string }
  achievements: { en: string[]; "pt-BR": string[] }
  stack: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: "senior-frontend-lead",
    role: {
      en: "Senior Frontend Engineer · Lead Software Engineer",
      "pt-BR": "Senior Frontend Engineer · Lead Software Engineer",
    },
    company: "Tela Brasil",
    period: { start: "2024", end: "present" },
    summary: {
      en: "Lead the frontend architecture of a public streaming platform serving millions, focused on scalability and CDN-friendly delivery.",
      "pt-BR":
        "Lidero a arquitetura de frontend de uma plataforma pública de streaming para milhões de usuários, focando em escalabilidade e entrega CDN-friendly.",
    },
    achievements: {
      en: [
        "Refactored data layer to TanStack Query, removing origin pressure",
        "Built a custom DASH/HLS player and CloudFront delivery pipeline",
        "Validated 3M+ concurrent users in load tests",
      ],
      "pt-BR": [
        "Refatoração da camada de dados para TanStack Query, removendo pressão da origem",
        "Player customizado DASH/HLS e pipeline de entrega via CloudFront",
        "Validação de 3M+ de usuários simultâneos em testes de carga",
      ],
    },
    stack: ["Next.js", "TypeScript", "TanStack Query", "AWS"],
  },
  {
    id: "mobile-lead",
    role: {
      en: "Mobile Lead · React Native Engineer",
      "pt-BR": "Líder Mobile · Engenheiro React Native",
    },
    company: "SafePilot",
    period: { start: "2023", end: "2024" },
    summary: {
      en: "Led mobile delivery of an AI-driven driving behavior app, integrating native telemetry SDKs and shipping to ~100k drivers.",
      "pt-BR":
        "Liderança da entrega mobile de um app de comportamento de direção com IA, integrando SDKs nativos de telemetria para ~100k motoristas.",
    },
    achievements: {
      en: [
        "Designed app architecture for production scale",
        "Integrated proprietary telemetry SDK via native modules",
        "Shipped to Android and iOS in a startup-style delivery cadence",
      ],
      "pt-BR": [
        "Arquitetura do app pensada para produção em escala",
        "Integração de SDK proprietário de telemetria via native modules",
        "Entregas para Android e iOS em cadência de startup",
      ],
    },
    stack: ["React Native", "Expo", "Native Modules"],
  },
  {
    id: "fullstack",
    role: {
      en: "Frontend-heavy Fullstack Engineer",
      "pt-BR": "Engenheiro Fullstack com foco em Frontend",
    },
    company: "Independent · Contract",
    period: { start: "2021", end: "2023" },
    summary: {
      en: "Delivered web and mobile products end-to-end across affiliate, SaaS and ticketing domains.",
      "pt-BR":
        "Entrega ponta-a-ponta de produtos web e mobile nos domínios de afiliados, SaaS e ticketing.",
    },
    achievements: {
      en: [
        "Shipped Offertando — SEO-driven affiliate platform with WhatsApp automation",
        "Designed Ticket Rush API with Redis locks and idempotency",
        "Worked directly with founders on scoping and delivery",
      ],
      "pt-BR": [
        "Entrega do Offertando — plataforma de afiliados com SEO e automação de WhatsApp",
        "Design da Ticket Rush API com locks Redis e idempotência",
        "Trabalho direto com founders em escopo e entrega",
      ],
    },
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
  },
]
