// Projects - fallback content mirroring the Sanity `project` + `caseStudies[]` model.
type LocalizedText = { en: string; "pt-BR": string }
type LocalizedTextArray = { en: string[]; "pt-BR": string[] }

type CaseStudy = {
  slug: string
  title: LocalizedText
  summary: LocalizedText
  problem: LocalizedText
  systemFocus: LocalizedText
  outcome: LocalizedText
  highlights: LocalizedTextArray
  body: LocalizedTextArray
  stack: string[]
  externalUrl?: string
  featured: boolean
  order: number
}

export type Project = {
  slug: string
  title: string
  category: LocalizedText
  summary: LocalizedText
  stack: string[]
  caseStudies: CaseStudy[]
  externalUrl?: string
  accent: "cyan" | "amber" | "violet" | "emerald"
  year: string
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: "tela-brasil",
    title: "Tela Brasil",
    category: {
      en: "Frontend Architecture / Performance",
      "pt-BR": "Arquitetura de Frontend / Performance",
    },
    summary: {
      en: "Refactored a public streaming platform frontend to reduce server pressure and improve scalability through client-side data fetching, TanStack Query and CDN-friendly delivery.",
      "pt-BR":
        "Refatoracao do frontend de uma plataforma publica de streaming para reduzir pressao no servidor e melhorar a escalabilidade via data fetching no cliente, TanStack Query e entrega CDN-friendly.",
    },
    stack: ["Next.js", "React", "TypeScript", "TanStack Query", "Axios", "AWS CloudFront", "DASH", "HLS"],
    externalUrl: "https://telabrasil.com.br",
    accent: "cyan",
    year: "2024",
    featured: true,
    caseStudies: [
      {
        slug: "streaming-scale-frontend",
        title: {
          en: "Streaming Scale Frontend Architecture",
          "pt-BR": "Arquitetura Frontend para Escala de Streaming",
        },
        summary: {
          en: "Reworked the frontend architecture to reduce origin pressure and improve delivery reliability under high traffic.",
          "pt-BR":
            "Reestruturei a arquitetura frontend para reduzir pressao na origem e melhorar a confiabilidade da entrega sob alto trafego.",
        },
        problem: {
          en: "Origin services were carrying too much repeat read traffic during peak streaming demand.",
          "pt-BR": "Servicos de origem carregavam leitura repetida demais durante picos de streaming.",
        },
        systemFocus: {
          en: "Static delivery, client cache boundaries, player reliability, and CDN handoff.",
          "pt-BR": "Entrega estatica, limites de cache no cliente, confiabilidade do player e handoff com CDN.",
        },
        outcome: {
          en: "Validated a frontend path designed for millions of concurrent viewers.",
          "pt-BR": "Validado um caminho frontend desenhado para milhoes de espectadores simultaneos.",
        },
        highlights: {
          en: [
            "Custom video player with DASH and HLS support",
            "Migrated data fetching to client-side with TanStack Query",
            "Served the frontend statically through AWS CloudFront",
            "Improved scalability under load testing up to 3M concurrent users",
          ],
          "pt-BR": [
            "Player de video customizado com suporte a DASH e HLS",
            "Migracao de data fetching para o cliente com TanStack Query",
            "Frontend servido como estatico via AWS CloudFront",
            "Escalabilidade validada em testes de carga ate 3M de usuarios simultaneos",
          ],
        },
        body: { en: [], "pt-BR": [] },
        stack: ["Next.js", "TanStack Query", "AWS CloudFront", "DASH", "HLS"],
        externalUrl: "https://telabrasil.com.br",
        featured: true,
        order: 1,
      },
    ],
  },
  {
    slug: "safepilot",
    title: "SafePilot",
    category: {
      en: "Mobile / Native SDK Integration",
      "pt-BR": "Mobile / Integracao de SDK Nativo",
    },
    summary: {
      en: "Led mobile development for an AI-driven driving behavior app using React Native, Expo and native SDK integration.",
      "pt-BR":
        "Lideranca do desenvolvimento mobile de um app de comportamento de direcao com IA usando React Native, Expo e integracao de SDK nativo.",
    },
    stack: ["React Native", "Expo", "TypeScript", "Native Modules", "Android", "iOS"],
    accent: "amber",
    year: "2024",
    featured: true,
    caseStudies: [
      {
        slug: "native-telemetry-integration",
        title: {
          en: "Native Telemetry SDK Integration",
          "pt-BR": "Integracao de SDK Nativo de Telemetria",
        },
        summary: {
          en: "Integrated native telemetry capabilities while keeping product flows independent from platform-specific details.",
          "pt-BR":
            "Integrei telemetria nativa mantendo os fluxos de produto independentes de detalhes especificos de plataforma.",
        },
        problem: {
          en: "The app needed native telemetry without making product screens depend on platform-specific details.",
          "pt-BR": "O app precisava de telemetria nativa sem acoplar telas de produto a detalhes de plataforma.",
        },
        systemFocus: {
          en: "Native bridge boundaries, permission states, event tracking, and release workflow.",
          "pt-BR": "Limites da bridge nativa, estados de permissao, rastreamento de eventos e fluxo de release.",
        },
        outcome: {
          en: "A production-ready mobile foundation for a product targeting around 100k drivers.",
          "pt-BR": "Uma base mobile pronta para producao para um produto mirando cerca de 100k motoristas.",
        },
        highlights: {
          en: [
            "Integrated telemetry SDK through native modules",
            "Tracked driving events such as harsh braking and overspeeding",
            "Built app architecture for a product targeting around 100k drivers",
            "Worked in a fast-paced startup-style delivery process",
          ],
          "pt-BR": [
            "Integracao de SDK de telemetria via native modules",
            "Rastreamento de eventos como freadas bruscas e excesso de velocidade",
            "Arquitetura do app para um produto com alvo de 100k motoristas",
            "Operacao em ciclo de entrega de startup, com ritmo acelerado",
          ],
        },
        body: { en: [], "pt-BR": [] },
        stack: ["React Native", "Expo", "TypeScript", "Native Modules"],
        featured: true,
        order: 1,
      },
    ],
  },
  {
    slug: "ticket-rush-api",
    title: "Ticket Rush API",
    category: {
      en: "Backend / Concurrency",
      "pt-BR": "Backend / Concorrencia",
    },
    summary: {
      en: "Designed a high-concurrency ticketing backend focused on preventing overselling, duplicate bookings and race conditions.",
      "pt-BR":
        "Backend de venda de ingressos de alta concorrencia focado em evitar overselling, reservas duplicadas e race conditions.",
    },
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    externalUrl: "https://github.com/vitorrafael/ticket-rush-api",
    accent: "violet",
    year: "2025",
    featured: true,
    caseStudies: [
      {
        slug: "concurrency-and-idempotency",
        title: {
          en: "Concurrency and Idempotency for Ticket Reservations",
          "pt-BR": "Concorrencia e Idempotencia em Reservas de Ingresso",
        },
        summary: {
          en: "Designed reservation safety mechanisms to avoid race conditions, duplicate retries, and inventory corruption.",
          "pt-BR":
            "Desenhei mecanismos de seguranca para reservas evitando race conditions, retries duplicados e corrupcao de inventario.",
        },
        problem: {
          en: "High-intent buyers can trigger duplicate retries, overselling, and inventory races at the worst moment.",
          "pt-BR": "Compradores com alta intencao podem gerar retries duplicados, overselling e corridas de inventario no pior momento.",
        },
        systemFocus: {
          en: "Idempotency, distributed locks, database constraints, and queue-backed recovery.",
          "pt-BR": "Idempotencia, locks distribuidos, constraints no banco e recuperacao baseada em filas.",
        },
        outcome: {
          en: "A safer reservation flow where duplicate work becomes harmless instead of corrupting inventory.",
          "pt-BR": "Um fluxo de reserva mais seguro em que trabalho duplicado se torna inofensivo em vez de corromper inventario.",
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
            "Interceptor de idempotencia para retries seguros",
            "Locks distribuidos com Redis em secoes criticas",
            "Controle de concorrencia otimista com constraints no banco",
          ],
        },
        body: { en: [], "pt-BR": [] },
        stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
        externalUrl: "https://github.com/vitorrafael/ticket-rush-api",
        featured: true,
        order: 1,
      },
    ],
  },
  {
    slug: "offertando",
    title: "Offertando",
    category: {
      en: "SEO / Automation / Affiliate",
      "pt-BR": "SEO / Automacao / Afiliados",
    },
    summary: {
      en: "Built a deal aggregation platform with SEO-focused pages and WhatsApp automation for promotion distribution.",
      "pt-BR":
        "Plataforma de agregacao de ofertas com paginas focadas em SEO e automacao de WhatsApp para distribuicao de promocoes.",
    },
    stack: ["Next.js", "React", "TypeScript", "Node.js", "WhatsApp Automation", "SEO"],
    externalUrl: "https://offertando.com.br",
    accent: "emerald",
    year: "2023",
    featured: true,
    caseStudies: [
      {
        slug: "seo-and-distribution-loop",
        title: {
          en: "SEO + WhatsApp Distribution Loop",
          "pt-BR": "Loop de Distribuicao com SEO + WhatsApp",
        },
        summary: {
          en: "Built the growth loop connecting search-indexed pages with automation-driven promotion distribution.",
          "pt-BR":
            "Construido o loop de crescimento conectando paginas indexadas em busca com distribuicao automatizada de promocoes.",
        },
        problem: {
          en: "Promotion discovery needed search visibility and fast distribution across owned channels.",
          "pt-BR": "Descoberta de promocoes precisava de visibilidade em busca e distribuicao rapida em canais proprios.",
        },
        systemFocus: {
          en: "Structured pages, affiliate attribution, automation workflows, and fast content publishing.",
          "pt-BR": "Paginas estruturadas, atribuicao de afiliados, fluxos de automacao e publicacao rapida de conteudo.",
        },
        outcome: {
          en: "A compact growth loop connecting SEO inventory with WhatsApp distribution.",
          "pt-BR": "Um loop de crescimento compacto conectando inventario SEO com distribuicao por WhatsApp.",
        },
        highlights: {
          en: [
            "SEO-focused Next.js pages with structured data",
            "Affiliate link workflows with attribution tracking",
            "WhatsApp promotion automation across 10+ groups",
            "Product experimentation around promotion distribution",
          ],
          "pt-BR": [
            "Paginas Next.js otimizadas para SEO com structured data",
            "Fluxos de links de afiliado com tracking de atribuicao",
            "Automacao de promocoes no WhatsApp em 10+ grupos",
            "Experimentacao de produto em torno da distribuicao de promocoes",
          ],
        },
        body: { en: [], "pt-BR": [] },
        stack: ["Next.js", "SEO", "WhatsApp Automation"],
        externalUrl: "https://offertando.com.br",
        featured: true,
        order: 1,
      },
    ],
  },
]
