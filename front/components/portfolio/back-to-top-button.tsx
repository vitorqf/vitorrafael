"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BackToTopButton() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      aria-label="Back to top"
      onClick={goTop}
      className={cn(
        "fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full border-border/70 bg-background/75 shadow-sm backdrop-blur transition-all duration-300 hover:border-accent/60 hover:text-accent md:bottom-7 md:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </Button>
  )
}
