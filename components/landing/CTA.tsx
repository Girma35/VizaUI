'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/20 p-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to find your next tool?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Browse our collection and download any software tool. Free, no sign-up, no barriers.
          </p>
          <Link href="/tools">
            <Button variant="primary" size="lg">
              Browse all tools
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
