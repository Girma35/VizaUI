'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { shouldShowAdsOnTool } from '@/lib/tool-access'
import { Sparkles } from 'lucide-react'

interface SubscribePromptProps {
  toolSlug: string
  variant?: 'banner' | 'inline'
  className?: string
}

/**
 * Shown to free users on pro tools to encourage subscription.
 * Renders nothing for subscribers or on free-for-all tools.
 */
export function SubscribePrompt({ toolSlug, variant = 'inline', className = '' }: SubscribePromptProps) {
  const { data: session, status } = useSession()
  const isSubscribed = (session as { isSubscribed?: boolean } | null)?.isSubscribed ?? false
  const show = shouldShowAdsOnTool(toolSlug, session ? isSubscribed : false)

  if (status === 'loading' || !show) return null

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          <div>
            <p className="font-medium text-white">Enjoying this tool?</p>
            <p className="text-sm text-slate-400">Subscribe for ad-free experience and all future tools.</p>
          </div>
        </div>
        <Link
          href="/dashboard/billing"
          className="shrink-0 px-4 py-2 rounded-lg bg-amber-500 text-black font-medium hover:bg-amber-400 transition-colors text-sm"
        >
          Subscribe — $5/mo
        </Link>
      </div>
    )
  }

  return (
    <div className={`text-center py-3 text-slate-500 text-sm ${className}`}>
      <Link href="/dashboard/billing" className="text-amber-400 hover:text-amber-300 underline">
        Subscribe to remove ads and unlock all tools
      </Link>
    </div>
  )
}
