import type { Metadata } from 'next'
import './globals.css'
import { siteUrl, siteName, siteDescription } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Free Software Tools Store`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'software tools',
    'free download',
    'productivity tools',
    'development tools',
    'design tools',
    'utilities',
    'free software',
    'VizaLabs',
    'tool store',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Free Software Tools Store`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Free Software Tools Store`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
}

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/tools?search={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body className="font-sans bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
