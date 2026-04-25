import Link from "next/link"
import { Button } from "@/components/ui/button"
import { defaultLocale } from "@/lib/i18n/dictionaries"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The page may have moved, or the selected language does not have this route.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href={`/${defaultLocale}`}>Back home</Link>
        </Button>
      </div>
    </main>
  )
}
