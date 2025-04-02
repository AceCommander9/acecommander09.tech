import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AceCommander09.vercel.app',
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
      <body>{children}</body>
    </html>
  )
}
