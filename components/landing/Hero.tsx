'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs - palette blues */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-palette-blue/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-palette-accent/40 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-palette-blue/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-palette-blue/30 text-black border border-palette-accent/40 mb-6">
            <span className="w-2 h-2 bg-palette-accent rounded-full animate-pulse" />
            Free software tools for everyone
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-black"
        >
          Your free{' '}
          <span className="text-black">software tools</span>
          {' '}store
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-black max-w-2xl mx-auto mb-10"
        >
          Browse and download productivity, development, and utility tools. No sign-up required — anyone can access and download.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 font-medium rounded-lg px-6 py-3 text-base border-0 shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cream-light focus:ring-amber-600"
            style={{ backgroundColor: '#F6CE71', color: 'black' }}
          >
            Browse & Download Tools <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 font-medium rounded-lg px-6 py-3 text-base border-0 shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
            style={{ backgroundColor: '#F6CE71', color: 'black' }}
          >
            <Play className="h-5 w-5" /> View all tools
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="rounded-2xl border border-palette-blue/50 bg-cream backdrop-blur-sm p-1 shadow-xl shadow-palette-blue/20">
            <div className="rounded-xl bg-white/80 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 mx-4 h-6 bg-palette-blue/20 rounded-md" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-palette-blue/40 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-palette-blue/30 rounded-md w-3/4" />
                    <div className="h-4 bg-palette-blue/20 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 space-y-1.5 flex flex-col items-end">
                    <div className="h-4 bg-palette-accent/30 rounded-md w-2/3" />
                    <div className="h-4 bg-palette-accent/20 rounded-md w-1/3" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-palette-accent/40 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
