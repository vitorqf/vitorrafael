import { AboutSection } from "@/components/portfolio/about-section"
import { ContactCta } from "@/components/portfolio/contact-cta"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { Hero } from "@/components/portfolio/hero"
import { MetricsSection } from "@/components/portfolio/metrics-section"
import { PortfolioShell } from "@/components/portfolio/portfolio-shell"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { WritingSection } from "@/components/portfolio/writing-section"

export function HomePage() {
  return (
    <PortfolioShell>
      <Hero />
      <MetricsSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <WritingSection />
      <AboutSection />
      <ContactCta />
    </PortfolioShell>
  )
}
