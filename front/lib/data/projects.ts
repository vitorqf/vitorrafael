// Projects — designed to mirror a Sanity `project` document.
export type Project = {
  slug: string
  title: string
  category: { en: string; "pt-BR": string }
  summary: { en: string; "pt-BR": string }
  highlights: { en: string[]; "pt-BR": string[] }
  stack: string[]
  externalUrl?: string
  caseStudyUrl: string
  accent: "cyan" | "amber" | "violet" | "emerald"
  year: string
}

export const projects: Project[] = [
  {
    slug: "tela-brasil",
    title: "Tela Brasil",
    category: {
      en: "Frontend Architecture · Performance",
      "pt-BR": "Arquitetura de Frontend · Performance",
    },
    summary: {
      en: "Refactored a public streaming platform frontend to reduce server pressure and improve scalability through client-side data fetching, TanStack Query and CDN-friendly delivery.",
      "pt-BR":
        "Refatoração do frontend de uma plataforma pública de streaming para reduzir pressão no servidor e melhorar a escalabilidade via data fetching no cliente, TanStack Query e entrega CDN-friendly.",
    },
    highlights: {
      en: [
        "Custom video player with DASH and HLS support",
        "Migrated data fetching to client-side with TanStack Query",
        "Served as static frontend through AWS CloudFront",
        "Improved scalability under load testing up to 3M concurrent users",
      ],
      "pt-BR": [
        "Player de vídeo customizado com suporte a DASH e HLS",
        "Migração de data fetching para o cliente com TanStack Query",
        "Frontend servido como estático via AWS CloudFront",
        "Escalabilidade validada em testes de carga até 3M de usuários simultâneos",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "TanStack Query", "Axios", "AWS CloudFront", "DASH", "HLS"],
    externalUrl: "https://telabrasil.com.br",
    caseStudyUrl: "/projects/tela-brasil",
    accent: "cyan",
    year: "2024",
  },
  {
    slug: "safepilot",
    title: "SafePilot",
    category: {
      en: "Mobile · Native SDK Integration",
      "pt-BR": "Mobile · Integração de SDK Nativo",
    },
    summary: {
      en: "Led mobile development for an AI-driven driving behavior app using React Native, Expo and native SDK integration.",
      "pt-BR":
        "Liderança do desenvolvimento mobile de um app de comportamento de direção com IA usando React Native, Expo e integração de SDK nativo.",
    },
    highlights: {
      en: [
        "Integrated telemetry SDK through native modules",
        "Tracked driving events such as harsh braking and overspeeding",
        "Built app architecture for a product targeting around 100k drivers",
        "Worked in a fast-paced startup-style delivery process",
      ],
      "pt-BR": [
        "Integração de SDK de telemetria via native modules",
        "Rastreamento de eventos como freadas bruscas e excesso de velocidade",
        "Arquitetura do app para um produto com alvo de 100k motoristas",
        "Operação em ciclo de entrega de startup, com ritmo acelerado",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "Native Modules", "Android", "iOS"],
    caseStudyUrl: "/projects/safepilot",
    accent: "amber",
    year: "2024",
  },
  {
    slug: "ticket-rush-api",
    title: "Ticket Rush API",
    category: {
      en: "Backend · Concurrency",
      "pt-BR": "Backend · Concorrência",
    },
    summary: {
      en: "Designed a high-concurrency ticketing backend focused on preventing overselling, duplicate bookings and race conditions.",
      "pt-BR":
        "Backend de venda de ingressos de alta concorrência focado em evitar overselling, reservas duplicadas e race conditions.",
    },
    highlights: {
      en: [
        "Rate limiting and throttling at the edge",
        "Idempotency interceptor for safe retries",
        "Redis distributed locks for critical sections",
        "Optimistic concurrency control with database constraints",
      ],
      "pt-BR": [
        "Rate limiting e throttling na borda",
        "Interceptor de idempotência para retries seguros",
        "Locks distribuídos com Redis em seções críticas",
        "Controle de concorrência otimista com constraints no banco",
      ],
    },
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    externalUrl: "https://github.com/vitorrafael/ticket-rush-api",
    caseStudyUrl: "/projects/ticket-rush-api",
    accent: "violet",
    year: "2025",
  },
  {
    slug: "offertando",
    title: "Offertando",
    category: {
      en: "SEO · Automation · Affiliate",
      "pt-BR": "SEO · Automação · Afiliados",
    },
    summary: {
      en: "Built a deal aggregation platform with SEO-focused pages and WhatsApp automation for promotion distribution.",
      "pt-BR":
        "Plataforma de agregação de ofertas com páginas focadas em SEO e automação de WhatsApp para distribuição de promoções.",
    },
    highlights: {
      en: [
        "SEO-focused Next.js pages with structured data",
        "Affiliate link workflows with attribution tracking",
        "WhatsApp promotion automation across 10+ groups",
        "Product experimentation around promotion distribution",
      ],
      "pt-BR": [
        "Páginas Next.js otimizadas para SEO com structured data",
        "Fluxos de links de afiliado com tracking de atribuição",
        "Automação de promoções no WhatsApp em 10+ grupos",
        "Experimentação de produto em torno da distribuição de promoções",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "Node.js", "WhatsApp Automation", "SEO"],
    externalUrl: "https://offertando.com.br",
    caseStudyUrl: "/projects/offertando",
    accent: "emerald",
    year: "2023",
  },
]
