"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

type SectionLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  sectionId: string
  locale: string
  onNavigate?: () => void
}

const pendingScrollKey = "portfolio-scroll-target"

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId)

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  } else if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
}

export function consumePendingSectionScroll() {
  const sectionId = window.sessionStorage.getItem(pendingScrollKey)
  if (!sectionId) return

  window.sessionStorage.removeItem(pendingScrollKey)
  window.requestAnimationFrame(() => scrollToSection(sectionId))
}

export function SectionLink({
  sectionId,
  locale,
  onNavigate,
  onClick,
  href,
  children,
  ...props
}: SectionLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  const homePath = `/${locale}`

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return

    event.preventDefault()
    onNavigate?.()

    if (pathname === homePath) {
      scrollToSection(sectionId)
      return
    }

    window.sessionStorage.setItem(pendingScrollKey, sectionId)
    router.push(homePath)
  }

  return (
    <a href={href ?? homePath} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
