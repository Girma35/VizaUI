'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { tools, toolCategories, type ToolCategory } from '@/lib/data'
import { ToolScoreCardsWithProvider } from '@/components/ui/tool-score-cards'
import { Search, Wrench, Zap } from 'lucide-react'

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ToolCategory | 'all'>('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tools.filter((tool) => {
      const matchSearch =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      const matchCategory = category === 'all' || tool.category === category
      return matchSearch && matchCategory
    })
  }, [search, category])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-black">
              All <span className="text-black">Tools</span>
            </h1>
            <p className="text-black/80 text-lg max-w-2xl mx-auto">
              Browse all tools — use web tools in the browser or download. Free, no sign-up required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-slate-300"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ToolCategory | 'all')}
              className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-slate-300 min-w-[180px]"
            >
              <option value="all">All categories</option>
              {toolCategories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-600">
              <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50 text-slate-400" />
              <p>No tools match your filters. Try a different search or category.</p>
            </div>
          ) : (
            <ToolScoreCardsWithProvider key={`${search}-${category}`} toolsList={filtered} />
          )}
        </div>
      </main>
      <footer className="border-t border-slate-200 py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
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
