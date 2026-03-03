'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-3xl bg-cream border-2 border-palette-blue/50 p-12 text-center relative overflow-hidden shadow-xl shadow-palette-blue/10"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-palette-blue/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-palette-accent/30 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Ready to find your next tool?
          </h2>
          <p className="text-black max-w-xl mx-auto mb-8">
            Browse our collection and download any software tool. Free, no sign-up, no barriers.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center font-medium rounded-lg px-6 py-3 text-base border-0 shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
            style={{ backgroundColor: '#F6CE71', color: 'black' }}
          >
            Browse all tools
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
