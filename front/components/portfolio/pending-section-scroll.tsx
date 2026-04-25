"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { consumePendingSectionScroll } from "./section-link"

export function PendingSectionScroll() {
  const pathname = usePathname()

  React.useEffect(() => {
    consumePendingSectionScroll()
  }, [pathname])

  return null
}
