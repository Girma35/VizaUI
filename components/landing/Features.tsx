'use client'

import { motion } from 'framer-motion'
import { Download, FolderOpen, LockOpen, Search, LayoutGrid, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'

const iconMap: Record<string, React.ReactNode> = {
  Download: <Download className="h-6 w-6" />,
  FolderOpen: <FolderOpen className="h-6 w-6" />,
  LockOpen: <LockOpen className="h-6 w-6" />,
  Search: <Search className="h-6 w-6" />,
  LayoutGrid: <LayoutGrid className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
}

const features = [
  {
    icon: 'FolderOpen',
    title: 'Browse tools',
    description: 'Explore productivity, development, design, and utility tools in one place.',
  },
  {
    icon: 'Download',
    title: 'One-click download',
    description: 'Download any tool instantly. No account or payment required.',
  },
  {
    icon: 'LockOpen',
    title: 'Free for everyone',
    description: 'All tools are free to access and download. No sign-up needed.',
  },
  {
    icon: 'Search',
    title: 'Search & filter',
    description: 'Find what you need quickly with search and category filters.',
  },
  {
    icon: 'LayoutGrid',
    title: 'Organized by category',
    description: 'Tools are grouped by type so you can discover similar software easily.',
  },
  {
    icon: 'Zap',
    title: 'Always available',
    description: 'Store and share your favorite software tools. Anyone can access anytime.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Why use our{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            tools store
          </span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A simple place to discover and download software tools. No barriers, no sign-up.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hover className="p-6 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
