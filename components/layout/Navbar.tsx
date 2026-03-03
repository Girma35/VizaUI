'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import clsx from 'clsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">VizaLabs</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/tools" className="text-slate-400 hover:text-white text-sm transition-colors">Tools</Link>
            <Link href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</Link>
            <Link href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/tools">
              <Button variant="primary" size="sm">Browse Tools</Button>
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-400 hover:text-white">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <Link href="/tools" className="block text-slate-300 hover:text-white py-2">Tools</Link>
          <Link href="#features" className="block text-slate-300 hover:text-white py-2">Features</Link>
          <Link href="#pricing" className="block text-slate-300 hover:text-white py-2">Pricing</Link>
          <Link href="/tools" className="block pt-2">
            <Button variant="primary" size="sm" className="w-full">Browse Tools</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
