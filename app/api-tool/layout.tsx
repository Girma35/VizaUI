import type { Metadata } from 'next'
import { siteUrl, siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: 'API Tester',
  description:
    'Test API endpoints in the browser. Send GET, POST, PUT, PATCH, DELETE with custom headers and body. View formatted JSON response. Free, no sign-up.',
  openGraph: {
    url: `${siteUrl}/api-tool`,
    title: `API Tester | ${siteName}`,
    description:
      'Test API endpoints in the browser. Send requests with headers and body, view formatted response.',
  },
  alternates: { canonical: `${siteUrl}/api-tool` },
  robots: { index: true, follow: true },
}

export default function ApiToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
