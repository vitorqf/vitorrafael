import { redirect } from "next/navigation"
import { defaultLocale } from "@/lib/i18n/dictionaries"

export default function Page() {
  redirect(`/${defaultLocale}`)
}
