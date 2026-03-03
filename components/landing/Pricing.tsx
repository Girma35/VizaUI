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
          className="text-3xl sm:text-4xl font-bold text-black mb-4"
        >
          Simple <span className="text-black">pricing</span>
        </motion.h2>
        <p className="text-black max-w-2xl mx-auto">
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
                ? 'bg-cream border-2 border-palette-accent/60 shadow-xl shadow-palette-blue/20 relative'
                : 'bg-cream border border-palette-blue/40'
            )}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-palette-accent rounded-full text-xs font-semibold text-white">
                    No ads · Exclusive tools
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold text-black">{plan.price}</span>
                  {plan.period && <span className="text-black">{plan.period}</span>}
                </div>
                <p className="text-sm text-black">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-black">
                    <Check className="h-4 w-4 text-palette-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="inline-flex items-center justify-center w-full font-medium rounded-lg px-4 py-2 text-sm transition-opacity hover:opacity-90 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
                style={{ backgroundColor: '#F6CE71', color: 'black' }}
              >
                {plan.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
