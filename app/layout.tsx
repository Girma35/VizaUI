import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VizaLabs - Free Software Tools Store',
  description: 'Browse and download software tools. Productivity, development, design & utilities. Free for everyone, no sign-up required.',
  keywords: ['software tools', 'free download', 'productivity', 'development', 'utilities', 'VizaLabs'],
  openGraph: {
    title: 'VizaLabs - Free Software Tools Store',
    description: 'Browse and download software tools. Free for everyone.',
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
