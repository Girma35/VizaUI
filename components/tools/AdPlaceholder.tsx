'use client'

import { useSession } from 'next-auth/react'
import { shouldShowAdsOnTool } from '@/lib/tool-access'

interface AdPlaceholderProps {
  toolSlug: string
  className?: string
  /** Optional: slot id for ad networks (e.g. Google AdSense) */
  slotId?: string
}

/**
 * Renders an ad slot only for free users on pro-only tools.
 * For free tools (e.g. API Tester, Time Zone Converter) renders nothing.
 * Replace the placeholder with your ad network component when ready.
 */
export function AdPlaceholder({ toolSlug, className = '', slotId }: AdPlaceholderProps) {
  const { data: session, status } = useSession()
  const isSubscribed = (session as { isSubscribed?: boolean } | null)?.isSubscribed ?? false
  const showAds = shouldShowAdsOnTool(toolSlug, session ? isSubscribed : false)

  if (status === 'loading' || !showAds) return null

  return (
    <div
      className={`rounded-lg border border-slate-600 bg-slate-800/50 p-4 text-center text-slate-500 text-sm ${className}`}
      data-ad-slot={slotId}
    >
      {/* Replace this with your ad network tag (e.g. AdSense) */}
      <span className="text-slate-500">Ad placeholder — integrate your ad network here</span>
    </div>
  )
}
