'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { canAccessTool } from '@/lib/tool-access'
import { Lock, Zap } from 'lucide-react'

interface ProToolGateProps {
  toolSlug: string
  toolName: string
  children: React.ReactNode
}

/**
 * Wraps content for pro-only tools. If the tool is free for all, always shows children.
 * If pro-only and user is not subscribed, shows paywall; otherwise shows children.
 * Use this in layout or page of future pro tools only. Do not wrap api-tester or time-zone-converter.
 */
export function ProToolGate({ toolSlug, toolName, children }: ProToolGateProps) {
  const { data: session, status } = useSession()
  const isSubscribed = (session as { isSubscribed?: boolean } | null)?.isSubscribed ?? false
  const canAccess = canAccessTool(toolSlug, session ? isSubscribed : null)

  if (status === 'loading') {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-slate-400">Loading…</p>
      </div>
    )
  }

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Pro tool</h1>
          <p className="text-slate-400 mb-6">
            <strong className="text-white">{toolName}</strong> is available for subscribers. Subscribe to get ad-free access and all future tools.
          </p>
          <Link
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-amber-500 text-black hover:bg-amber-400 transition-colors"
          >
            <Zap className="h-5 w-5" /> Subscribe — $5/month
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            <Link href="/tools" className="underline hover:text-slate-400">Back to all tools</Link>
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
