'use client'

import { motion } from 'framer-motion'
import { MessageSquare, BarChart3, Users, Shield, Cpu, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
}

const features = [
  {
    icon: 'MessageSquare',
    title: 'AI Chat',
    description: 'Integrate powerful conversational AI into your applications with our easy-to-use chat API.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics',
    description: 'Get deep insights into your AI usage with real-time dashboards and detailed reports.',
  },
  {
    icon: 'Users',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with role-based access control and shared workspaces.',
  },
  {
    icon: 'Shield',
    title: 'Secure API',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.',
  },
  {
    icon: 'Cpu',
    title: 'Custom Models',
    description: 'Fine-tune and deploy your own AI models tailored to your specific use case.',
  },
  {
    icon: 'Zap',
    title: 'Fast Integration',
    description: 'Get up and running in minutes with our comprehensive SDKs and documentation.',
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
          Everything you need to build{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AI apps
          </span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A complete toolkit for building, deploying, and scaling AI-powered applications.
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
