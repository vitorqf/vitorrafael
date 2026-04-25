"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: "lift" | "fade" | "scale" | "clip"
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade",
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reveal = () => {
      node.dataset.revealState = "visible"
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal()
      return
    }

    let revealed = false
    let frame = 0

    const isVisible = () => {
      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      return rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * -0.08
    }

    const revealIfVisible = () => {
      if (revealed) return
      if (isVisible()) {
        revealed = true
        reveal()
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onScroll)
      }
    }

    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(revealIfVisible)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        revealed = true
        reveal()
        observer.unobserve(node)
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onScroll)
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    )

    if (!isVisible()) {
      node.dataset.revealState = "hidden"
    }

    observer.observe(node)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    frame = window.requestAnimationFrame(revealIfVisible)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-reveal=""
      data-reveal-variant={variant}
      data-reveal-state="visible"
      className={cn("scroll-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
