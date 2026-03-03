'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingPlans } from '@/lib/data'
import Button from '@/components/ui/Button'
import clsx from 'clsx'

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Simple{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            pricing
          </span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          $5/month — no ads, exclusive tools, and the perfect toolkit.
        </p>
      </div>

      <div className="grid md:grid-cols-1 max-w-md mx-auto gap-8 items-stretch">
        {pricingPlans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex"
          >
            <div className={clsx(
              'flex flex-col w-full rounded-2xl p-8',
              plan.highlighted
                ? 'bg-gradient-to-b from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50 shadow-xl shadow-purple-500/10 relative'
                : 'bg-slate-800/50 border border-slate-700'
            )}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs font-semibold text-white">
                    No ads · Exclusive tools
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400">{plan.period}</span>}
                </div>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/register" className="block w-full">
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
