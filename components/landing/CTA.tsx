'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

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
            Ready to get started?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Join thousands of developers building the future with AI. Start for free, no credit card required.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
              🎉 You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button type="submit" variant="primary" size="md">
                Get Early Access
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
