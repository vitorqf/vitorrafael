// Centralized copy for EN / PT-BR. Structured to be replaced by a CMS later.
export type Locale = "en" | "pt-BR"

export const defaultLocale: Locale = "en"

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT-BR" },
]

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale.code === value)
}

export const dictionaries = {
  en: {
    metadata: {
      title: "Vitor Rafael - Frontend-heavy Fullstack Engineer",
      description:
        "Senior Frontend / Frontend-heavy Fullstack Engineer based in Brazil. Building scalable web and mobile products with React, Next.js, React Native and Node.js.",
    },
    nav: {
      projects: "Projects",
      writing: "Writing",
      about: "About",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      availability: "Available for remote roles",
      timezone: "LATAM timezone, US overlap",
      headline: "Frontend-heavy Fullstack Engineer building scalable web and mobile products.",
      description:
        "I work across React, Next.js, React Native and Node.js - focusing on performance, architecture and shipping products that hold up in the real world.",
      ctaPrimary: "View projects",
      ctaSecondary: "Download CV",
      currentlyBuilding: "Currently building",
      focusKicker: "Portfolio index",
      focusTitle: "Systems I tend to improve",
      focusItems: [
        "Frontend architecture under real traffic",
        "Mobile products with native constraints",
        "Backend flows where retries and concurrency matter",
      ],
    },
    metrics: {
      eyebrow: "Impact",
      title: "Built for scale, measured by outcomes.",
      description:
        "A snapshot of the kind of problems I work on - high concurrency, large user bases and reliability under pressure.",
    },
    projects: {
      eyebrow: "Selected work",
      title: "Featured projects",
      description:
        "A mix of frontend architecture, mobile engineering and backend reliability - chosen to show range, not volume.",
      readCaseStudy: "Read case study",
      viewCaseStudies: "View case studies",
      visit: "Visit",
      editorialNote:
        "Each case is framed by the engineering constraint, the system boundary, and the outcome it moved.",
    },
    skills: {
      eyebrow: "Capabilities",
      title: "What I bring to a team",
      description:
        "Grouped by where I tend to add the most leverage. Not a checklist - these are the areas I keep going deep on.",
    },
    experience: {
      eyebrow: "Experience",
      title: "Roles & impact",
      description:
        "Senior frontend and fullstack roles delivering production software for high-traffic platforms and venture-backed startups.",
      present: "Present",
    },
    writing: {
      eyebrow: "Writing",
      title: "Notes from production",
      description:
        "Short, opinionated pieces on architecture decisions, concurrency, and what I have learned shipping software.",
      readArticle: "Read",
      minRead: "min read",
      viewAll: "All writing",
    },
    about: {
      eyebrow: "About",
      title: "Pragmatic engineering, real-world products.",
      body: "I am a software engineer from Brazil with strong frontend expertise and fullstack experience. I have worked on high-traffic web platforms, React Native apps with native SDK integrations, and backend systems where concurrency, idempotency and reliability matter. I care about pragmatic architecture, performance and building products that survive real-world usage.",
      basedIn: "Based in Brazil",
      timezone: "LATAM timezone, US overlap",
      languages: "EN / PT-BR",
      locationLabel: "Location",
      timezoneLabel: "Timezone",
      languagesLabel: "Languages",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Let us build something reliable, fast and useful.",
      description:
        "Open to senior frontend, fullstack and mobile roles - full-time remote or contract. Comfortable working across LATAM, US and EU timezones.",
      contactMe: "Contact me",
      downloadCv: "Download CV",
      linkedin: "LinkedIn",
    },
    footer: {
      builtWith: "Built with Next.js, TypeScript and Sanity-ready architecture.",
      location: "Brazil / LATAM timezone",
      rights: "All rights reserved.",
    },
    pages: {
      projectsTitle: "Projects",
      projectsDescription:
        "Selected case studies across frontend architecture, mobile engineering and backend reliability.",
      blogTitle: "Writing",
      blogDescription:
        "Production notes about architecture, performance, mobile engineering and reliability.",
      backHome: "Back home",
      backProjects: "Back to projects",
      backBlog: "Back to writing",
      caseStudy: "Case study",
      caseStudies: "Case studies",
      caseLabel: "Case",
      noCaseStudies: "Case studies are being prepared.",
      overview: "Overview",
      problem: "Problem",
      systemFocus: "System focus",
      outcome: "Outcome",
      highlights: "Highlights",
      stack: "Stack",
      openProject: "Open project",
      readArticle: "Read article",
      published: "Published",
    },
  },
  "pt-BR": {
    metadata: {
      title: "Vitor Rafael - Engenheiro Fullstack com foco em frontend",
      description:
        "Engenheiro Senior Frontend / Fullstack com foco em frontend, baseado no Brasil. Construindo produtos web e mobile escalaveis com React, Next.js, React Native e Node.js.",
    },
    nav: {
      projects: "Projetos",
      writing: "Artigos",
      about: "Sobre",
      contact: "Contato",
      resume: "Curriculo",
    },
    hero: {
      availability: "Disponivel para vagas remotas",
      timezone: "Fuso LATAM, overlap com EUA",
      headline: "Engenheiro Fullstack com foco em frontend, construindo produtos web e mobile escalaveis.",
      description:
        "Trabalho com React, Next.js, React Native e Node.js - focando em performance, arquitetura e em entregar produtos que se sustentam no mundo real.",
      ctaPrimary: "Ver projetos",
      ctaSecondary: "Baixar CV",
      currentlyBuilding: "Construindo agora",
      focusKicker: "Indice do portfolio",
      focusTitle: "Sistemas que costumo melhorar",
      focusItems: [
        "Arquitetura frontend sob trafego real",
        "Produtos mobile com restricoes nativas",
        "Fluxos backend onde retries e concorrencia importam",
      ],
    },
    metrics: {
      eyebrow: "Impacto",
      title: "Feito para escalar, medido por resultados.",
      description:
        "Uma amostra do tipo de problema com que trabalho - alta concorrencia, bases de usuarios grandes e confiabilidade sob pressao.",
    },
    projects: {
      eyebrow: "Trabalhos selecionados",
      title: "Projetos em destaque",
      description:
        "Uma combinacao de arquitetura de frontend, engenharia mobile e confiabilidade no backend - escolhidos pela diversidade, nao pelo volume.",
      readCaseStudy: "Ler case",
      viewCaseStudies: "Ver cases",
      visit: "Visitar",
      editorialNote:
        "Cada case parte da restricao de engenharia, do limite do sistema e do resultado que moveu.",
    },
    skills: {
      eyebrow: "Capacidades",
      title: "O que entrego em um time",
      description:
        "Agrupado por onde costumo gerar mais alavancagem. Nao e um checklist - sao areas em que continuo me aprofundando.",
    },
    experience: {
      eyebrow: "Experiencia",
      title: "Cargos & impacto",
      description:
        "Cargos senior de frontend e fullstack entregando software em producao para plataformas de alto trafego e startups com investimento.",
      present: "Atual",
    },
    writing: {
      eyebrow: "Artigos",
      title: "Notas da producao",
      description:
        "Textos curtos e opinativos sobre decisoes de arquitetura, concorrencia e o que aprendi entregando software.",
      readArticle: "Ler",
      minRead: "min de leitura",
      viewAll: "Todos os artigos",
    },
    about: {
      eyebrow: "Sobre",
      title: "Engenharia pragmatica, produtos reais.",
      body: "Sou engenheiro de software brasileiro com forte expertise em frontend e experiencia fullstack. Trabalhei em plataformas web de alto trafego, apps React Native com integracao de SDKs nativos e sistemas de backend onde concorrencia, idempotencia e confiabilidade importam. Me importo com arquitetura pragmatica, performance e produtos que sobrevivem ao uso real.",
      basedIn: "Baseado no Brasil",
      timezone: "Fuso LATAM, overlap com EUA",
      languages: "EN / PT-BR",
      locationLabel: "Localizacao",
      timezoneLabel: "Fuso",
      languagesLabel: "Idiomas",
    },
    contact: {
      eyebrow: "Vamos conversar",
      title: "Vamos construir algo confiavel, rapido e util.",
      description:
        "Aberto a posicoes senior de frontend, fullstack e mobile - remoto full-time ou contrato. Confortavel trabalhando entre LATAM, EUA e Europa.",
      contactMe: "Fale comigo",
      downloadCv: "Baixar CV",
      linkedin: "LinkedIn",
    },
    footer: {
      builtWith: "Construido com Next.js, TypeScript e arquitetura pronta para Sanity.",
      location: "Brasil / Fuso LATAM",
      rights: "Todos os direitos reservados.",
    },
    pages: {
      projectsTitle: "Projetos",
      projectsDescription:
        "Cases selecionados de arquitetura frontend, engenharia mobile e confiabilidade backend.",
      blogTitle: "Artigos",
      blogDescription:
        "Notas de producao sobre arquitetura, performance, engenharia mobile e confiabilidade.",
      backHome: "Voltar para inicio",
      backProjects: "Voltar para projetos",
      backBlog: "Voltar para artigos",
      caseStudy: "Case",
      caseStudies: "Cases",
      caseLabel: "Case",
      noCaseStudies: "Cases em preparacao.",
      overview: "Visao geral",
      problem: "Problema",
      systemFocus: "Foco do sistema",
      outcome: "Resultado",
      highlights: "Destaques",
      stack: "Stack",
      openProject: "Abrir projeto",
      readArticle: "Ler artigo",
      published: "Publicado",
    },
  },
} as const

export type Dictionary = (typeof dictionaries)[Locale]
