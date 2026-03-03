import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Software Tools',
  description:
    'Browse and download free software tools. Productivity, development, design, and utilities. Search by category, no sign-up required.',
  openGraph: {
    url: `${siteUrl}/tools`,
    title: `Software Tools | ${siteName}`,
    description:
      'Browse and download free software tools. Productivity, development, design, and utilities.',
  },
  alternates: { canonical: `${siteUrl}/tools` },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
