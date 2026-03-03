/**
 * Tool access control: which tools are free vs pro-only.
 * Existing tools (API Tester, Time Zone Converter) are always free and never gated.
 */

import { getToolBySlug } from './data'

/** Slugs that are always free for everyone — do not gate these. */
export const ALWAYS_FREE_TOOL_SLUGS = ['api-tester', 'time-zone-converter'] as const

export function isToolFreeForAll(slug: string): boolean {
  if (ALWAYS_FREE_TOOL_SLUGS.includes(slug as (typeof ALWAYS_FREE_TOOL_SLUGS)[number])) return true
  const tool = getToolBySlug(slug)
  return tool ? !tool.proOnly : true
}

export function isProOnlyTool(slug: string): boolean {
  if (ALWAYS_FREE_TOOL_SLUGS.includes(slug as (typeof ALWAYS_FREE_TOOL_SLUGS)[number])) return false
  const tool = getToolBySlug(slug)
  return Boolean(tool?.proOnly)
}

/**
 * Whether the user can access this tool (no paywall).
 * Pass null for anonymous user; pass subscription status for logged-in user.
 */
export function canAccessTool(
  slug: string,
  isSubscribed: boolean | null
): boolean {
  if (isToolFreeForAll(slug)) return true
  return isSubscribed === true
}

/**
 * Whether to show ads on this tool page (free user on a pro tool = show ads).
 * Existing free tools never show ads.
 */
export function shouldShowAdsOnTool(slug: string, isSubscribed: boolean | null): boolean {
  if (isToolFreeForAll(slug)) return false
  return isSubscribed !== true
}
