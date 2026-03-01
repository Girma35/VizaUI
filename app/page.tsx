import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Pricing from '@/components/landing/Pricing'
import CTA from '@/components/landing/CTA'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white">VizaLabs</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 VizaLabs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
