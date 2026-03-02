import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VizaLabs - AI SaaS Platform',
  description: 'Build smarter AI applications with VizaLabs. The complete platform for AI-powered SaaS.',
  keywords: ['AI', 'SaaS', 'machine learning', 'API', 'VizaLabs'],
  openGraph: {
    title: 'VizaLabs - AI SaaS Platform',
    description: 'Build smarter AI applications with VizaLabs.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
