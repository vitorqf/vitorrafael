// Profile mock data — structured to mirror a CMS document.
export type SocialLink = {
  label: string
  href: string
  username: string
}

export type Profile = {
  name: string
  role: string
  location: string
  email: string
  resumeUrl: string
  socials: {
    github: SocialLink
    linkedin: SocialLink
    email: SocialLink
  }
}

export const profile: Profile = {
  name: "Vitor Rafael",
  role: "Frontend-heavy Fullstack Engineer",
  location: "Brazil · LATAM",
  email: "hello@vitorrafael.dev",
  resumeUrl: "/vitor-rafael-cv.pdf",
  socials: {
    github: {
      label: "GitHub",
      href: "https://github.com/vitorrafael",
      username: "@vitorrafael",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://linkedin.com/in/vitorrafael",
      username: "in/vitorrafael",
    },
    email: {
      label: "Email",
      href: "mailto:hello@vitorrafael.dev",
      username: "hello@vitorrafael.dev",
    },
  },
}
