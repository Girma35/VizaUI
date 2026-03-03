import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Pricing from '@/components/landing/Pricing'
import CTA from '@/components/landing/CTA'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { siteUrl, siteName, siteDescription } from '@/lib/site'

export const metadata: Metadata = {
  title: `${siteName} - Free Software Tools Store`,
  description: siteDescription,
  openGraph: {
    url: siteUrl,
    title: `${siteName} - Free Software Tools Store`,
    description: siteDescription,
  },
  alternates: { canonical: siteUrl },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <footer className="border-t border-slate-200 py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-black">VizaLabs</span>
          </div>
          <p className="text-black text-sm">© 2025 VizaLabs.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-black hover:underline text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-black hover:underline text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
