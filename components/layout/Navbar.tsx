'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import clsx from 'clsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isLightPages = isHome || pathname.startsWith('/tools')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = isLightPages
    ? 'text-black hover:underline text-sm transition-colors'
    : 'text-slate-400 hover:text-white text-sm transition-colors'
  const logoTextClass = isLightPages ? 'font-bold text-xl text-black' : 'font-bold text-xl text-white'
  const logoIconBg = isLightPages ? 'bg-slate-800' : 'bg-gradient-to-br from-purple-600 to-blue-600'
  const scrolledBg = isLightPages
    ? 'bg-slate-50/95 backdrop-blur-xl border-b border-slate-200'
    : 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800'
  const mobileMenuBg = isLightPages ? 'bg-white border-t border-slate-200' : 'bg-slate-900 border-t border-slate-800'
  const mobileLinkClass = isLightPages ? 'block text-black hover:underline py-2' : 'block text-slate-300 hover:text-white py-2'

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? scrolledBg : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', logoIconBg)}>
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className={logoTextClass}>VizaLabs</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/tools" className={navLinkClass}>Tools</Link>
            <Link href="#features" className={navLinkClass}>Active this week</Link>
            <Link href="#pricing" className={navLinkClass}>Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLightPages ? (
              <Link
                href="/tools"
                className="inline-flex items-center justify-center font-medium rounded-lg px-3 py-1.5 text-sm border-0 transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F6CE71', color: 'black' }}
              >
                Browse Tools
              </Link>
            ) : (
              <Link href="/tools">
                <Button variant="primary" size="sm">Browse Tools</Button>
              </Link>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className={clsx('md:hidden', isLightPages ? 'text-black' : 'text-slate-400 hover:text-white')}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={clsx('md:hidden border-t px-4 py-4 space-y-3', mobileMenuBg)}>
          <Link href="/tools" className={mobileLinkClass}>Tools</Link>
          <Link href="#features" className={mobileLinkClass}>Active this week</Link>
          <Link href="#pricing" className={mobileLinkClass}>Pricing</Link>
          {isLightPages ? (
            <Link
              href="/tools"
              className="block pt-2 w-full inline-flex items-center justify-center font-medium rounded-lg px-3 py-1.5 text-sm border-0 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F6CE71', color: 'black' }}
            >
              Browse Tools
            </Link>
          ) : (
            <Link href="/tools" className="block pt-2">
              <Button variant="primary" size="sm" className="w-full">Browse Tools</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
