"use client"

import * as React from "react"

export function PointerBackdrop() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarsePointer = window.matchMedia("(pointer: coarse)")
    if (reducedMotion.matches || coarsePointer.matches) return

    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const update = () => {
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`
    }

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(update)
    }

    update()
    node.dataset.active = "true"
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      node.dataset.active = "false"
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-active="false"
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-20 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,oklch(from_var(--accent)_l_c_h_/_0.2)_0%,oklch(from_var(--accent)_l_c_h_/_0.08)_38%,transparent_70%)] opacity-0 blur-2xl mix-blend-multiply transition-opacity duration-500 data-[active=true]:opacity-70 dark:mix-blend-screen dark:data-[active=true]:opacity-55"
    />
  )
}
