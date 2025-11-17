import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AceCommander09.tech',
  description: 'AceCommander09 Official Website',
  generator: 'acecommander09',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
