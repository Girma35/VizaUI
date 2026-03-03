'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, TrendingUp } from 'lucide-react'
import Card from '@/components/ui/Card'
import { getToolsActiveThisWeek, toolCategories } from '@/lib/data'

export default function Features() {
  const activeTools = getToolsActiveThisWeek()

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
        >
          Tools actively used this week
        </motion.h2>
        <p className="text-black max-w-2xl mx-auto">
          Most popular tools right now. Updated daily.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTools.map((tool, i) => {
          const categoryLabel = toolCategories.find((c) => c.value === tool.category)?.label ?? tool.category
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/tools/${tool.slug}`}>
                <Card hover className="p-6 h-full !bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 text-slate-700 shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {tool.usedThisWeek?.toLocaleString()} this week
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-1">{tool.name}</h3>
                  <p className="text-slate-600 text-xs mb-2">{categoryLabel}</p>
                  <p className="text-black text-sm leading-relaxed line-clamp-2">{tool.description}</p>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
