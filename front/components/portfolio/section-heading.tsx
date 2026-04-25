import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
        )}
      >
        <span className="h-px w-8 bg-border" aria-hidden />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-balance font-sans text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
