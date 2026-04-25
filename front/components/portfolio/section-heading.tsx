import { cn } from "@/lib/utils"
import { ScrollReveal } from "./scroll-reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <ScrollReveal
      variant="fade"
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <div
        className={cn(
          "inline-flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground",
        )}
      >
        <span className="h-px w-10 bg-border" aria-hidden />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-balance font-sans text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty leading-8 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </ScrollReveal>
  )
}
