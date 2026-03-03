import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Time zone converter',
  description:
    'Set a date and time, add time zones, and see the time in each zone plus how many hours and minutes left or ago—updates in real time.',
  openGraph: {
    url: `${siteUrl}/time-zone-tool`,
    title: `Time zone converter | ${siteName}`,
    description: 'Convert time across time zones and see countdown in real time.',
  },
  alternates: { canonical: `${siteUrl}/time-zone-tool` },
}

export default function TimeZoneToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
