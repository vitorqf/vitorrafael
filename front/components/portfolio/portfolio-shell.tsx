import { BackToTopButton } from "./back-to-top-button"
import { PointerBackdrop } from "./pointer-backdrop"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { PendingSectionScroll } from "./pending-section-scroll"
import { SkipToContent } from "./skip-to-content"

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <PointerBackdrop />
      <SkipToContent />
      <PendingSectionScroll />
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
      <BackToTopButton />
    </div>
  )
}
