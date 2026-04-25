export type Article = {
  slug: string
  title: { en: string; "pt-BR": string }
  excerpt: { en: string; "pt-BR": string }
  body: { en: string[]; "pt-BR": string[] }
  tags: string[]
  readTime: number
  publishedAt: string
}

export const articles: Article[] = [
  {
    slug: "when-not-to-use-nextjs",
    title: {
      en: "When not to use Next.js",
      "pt-BR": "Quando nao usar Next.js",
    },
    excerpt: {
      en: "A senior take on the cases where Next.js gets in the way - and what to reach for instead.",
      "pt-BR":
        "Uma visao senior sobre os casos em que Next.js atrapalha - e o que usar no lugar.",
    },
    body: {
      en: [
        "Next.js is excellent when the product benefits from server rendering, route-level composition, image optimization, and a strong deployment story. It becomes less compelling when the app is mostly authenticated client-side workflow with little public SEO surface.",
        "For internal tools, highly interactive canvases, or mobile-style web apps, the extra routing and rendering model can add complexity without improving the user outcome. In those cases, a focused Vite app can be faster to reason about and cheaper to operate.",
        "The decision should start with the product surface: who needs to discover it, how much content changes, where data is fetched, and whether edge caching changes the economics of the application.",
      ],
      "pt-BR": [
        "Next.js e excelente quando o produto se beneficia de renderizacao no servidor, composicao por rotas, otimizacao de imagens e uma boa historia de deploy. Ele fica menos necessario quando o app e majoritariamente um fluxo autenticado no cliente, com pouco SEO publico.",
        "Para ferramentas internas, canvases muito interativos ou apps web com comportamento de mobile, o modelo de rotas e renderizacao pode adicionar complexidade sem melhorar o resultado para o usuario. Nesses casos, um app Vite focado pode ser mais simples de manter.",
        "A decisao deve partir da superficie do produto: quem precisa descobrir a pagina, quanto conteudo muda, onde os dados sao buscados e se cache na borda muda a economia da aplicacao.",
      ],
    },
    tags: ["Next.js", "Architecture"],
    readTime: 7,
    publishedAt: "2025-08-12",
  },
  {
    slug: "concurrency-in-ticketing",
    title: {
      en: "Handling concurrency in ticketing systems",
      "pt-BR": "Lidando com concorrencia em sistemas de ticketing",
    },
    excerpt: {
      en: "Idempotency, distributed locks and database constraints - practical patterns from a real backend.",
      "pt-BR":
        "Idempotencia, locks distribuidos e constraints - padroes praticos de um backend real.",
    },
    body: {
      en: [
        "Ticketing systems fail when they trust happy-path request ordering. The same seat, coupon, or reservation can be touched by many clients at once, and retries can multiply the pressure exactly when the system is already stressed.",
        "A reliable design layers protection: idempotency keys for safe retries, database constraints for final truth, and short-lived locks around critical inventory transitions. No single mechanism carries the full correctness story.",
        "The important engineering habit is to make duplicate work harmless. If a request is replayed, the system should return the known result or fail clearly without corrupting inventory.",
      ],
      "pt-BR": [
        "Sistemas de ingressos falham quando confiam na ordem feliz das requisicoes. O mesmo assento, cupom ou reserva pode ser tocado por muitos clientes ao mesmo tempo, e retries aumentam a pressao justamente quando o sistema ja esta no limite.",
        "Um desenho confiavel combina camadas: chaves de idempotencia para retries seguros, constraints no banco como verdade final e locks curtos em transicoes criticas de inventario. Nenhum mecanismo sozinho resolve toda a historia de consistencia.",
        "O habito importante e tornar trabalho duplicado inofensivo. Se uma requisicao for repetida, o sistema deve retornar o resultado conhecido ou falhar de forma clara sem corromper inventario.",
      ],
    },
    tags: ["Backend", "Concurrency", "Redis"],
    readTime: 10,
    publishedAt: "2025-06-04",
  },
  {
    slug: "native-sdks-react-native-expo",
    title: {
      en: "Integrating native SDKs in React Native with Expo",
      "pt-BR": "Integrando SDKs nativos em React Native com Expo",
    },
    excerpt: {
      en: "How to wire a third-party telemetry SDK into Expo without ejecting - and where the rough edges are.",
      "pt-BR":
        "Como integrar um SDK de telemetria de terceiros no Expo sem ejetar - e onde estao as arestas.",
    },
    body: {
      en: [
        "Expo does not prevent native SDK work, but it does force discipline. The integration should isolate native modules behind a narrow TypeScript interface so product screens do not depend on platform-specific details.",
        "The rough edges usually appear around permissions, background execution, build profiles, and test devices. Treat those as product constraints early instead of leaving them as release-week surprises.",
        "A good bridge makes the native capability feel boring to the React Native app: typed events in, typed commands out, and failure states that the UI can explain to the user.",
      ],
      "pt-BR": [
        "Expo nao impede trabalho com SDK nativo, mas exige disciplina. A integracao deve isolar native modules atras de uma interface TypeScript pequena para que as telas do produto nao dependam de detalhes especificos da plataforma.",
        "As arestas normalmente aparecem em permissoes, execucao em background, perfis de build e dispositivos de teste. Trate isso como restricao de produto desde cedo, nao como surpresa na semana de release.",
        "Uma boa bridge faz a capacidade nativa parecer simples para o app React Native: eventos tipados entrando, comandos tipados saindo e estados de falha que a UI consegue explicar ao usuario.",
      ],
    },
    tags: ["React Native", "Expo", "Native"],
    readTime: 8,
    publishedAt: "2025-04-21",
  },
  {
    slug: "client-side-caching-tanstack-query",
    title: {
      en: "Client-side caching at scale with TanStack Query",
      "pt-BR": "Cache no cliente em escala com TanStack Query",
    },
    excerpt: {
      en: "Cache keys, invalidation strategies and CDN handoffs that survived a 3M-user load test.",
      "pt-BR":
        "Chaves de cache, estrategias de invalidacao e handoffs com CDN que sobreviveram a um load test de 3M.",
    },
    body: {
      en: [
        "Client-side caching is not a shortcut for backend performance, but it can remove repeated pressure from origin services when the data model and freshness needs are understood.",
        "The hard part is not adding TanStack Query. The hard part is naming cache keys consistently, deciding when stale data is acceptable, and making invalidation explicit enough that the team can reason about it months later.",
        "At scale, the best frontend cache works with the CDN and backend contracts. Each layer should know whether it owns freshness, durability, or just a faster path to the same truth.",
      ],
      "pt-BR": [
        "Cache no cliente nao e atalho para performance de backend, mas pode remover pressao repetida da origem quando o modelo de dados e a necessidade de frescor estao claros.",
        "A parte dificil nao e adicionar TanStack Query. A parte dificil e nomear cache keys de forma consistente, decidir quando dado stale e aceitavel e tornar invalidacao explicita o bastante para o time entender meses depois.",
        "Em escala, o melhor cache no frontend trabalha junto com CDN e contratos de backend. Cada camada deve saber se responde por frescor, durabilidade ou apenas por um caminho mais rapido para a mesma verdade.",
      ],
    },
    tags: ["Frontend", "Performance", "TanStack Query"],
    readTime: 9,
    publishedAt: "2025-02-18",
  },
]
