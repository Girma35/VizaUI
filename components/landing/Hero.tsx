'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Now in public beta
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          Build smarter with{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          VizaLabs is the complete AI platform for building, deploying, and scaling intelligent applications. Start free, scale infinitely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <Button variant="primary" size="lg" className="gap-2">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="gap-2 text-slate-300">
            <Play className="h-5 w-5" /> View Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-1 shadow-2xl shadow-purple-900/20">
            <div className="rounded-xl bg-slate-900 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 mx-4 h-6 bg-slate-800 rounded-md" />
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/30 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-slate-700/60 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-700/60 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 space-y-1.5 flex flex-col items-end">
                    <div className="h-4 bg-purple-600/30 rounded-md w-2/3" />
                    <div className="h-4 bg-purple-600/30 rounded-md w-1/3" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
