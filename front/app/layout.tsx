import type { Metadata, Viewport } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { siteConfig } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Vitor Rafael - Frontend-heavy Fullstack Engineer",
    template: "%s | Vitor Rafael",
  },
  description:
    "Senior Frontend / Frontend-heavy Fullstack Engineer based in Brazil. Building scalable web and mobile products with React, Next.js, React Native and Node.js.",
  keywords: [
    "Frontend Engineer",
    "Fullstack Engineer",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "Brazil",
    "Remote",
    "LATAM",
  ],
  authors: [{ name: "Vitor Rafael" }],
  creator: "Vitor Rafael",
  generator: "Next.js",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#111317" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
