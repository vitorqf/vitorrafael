"use client"

import { usePathname } from "next/navigation"

export function SkipToContent() {
  const pathname = usePathname()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const main = document.getElementById("main")
    main?.focus({ preventScroll: true })
    main?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
  }

  return (
    <a
      href={pathname}
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
    >
      Skip to content
    </a>
  )
}
