/**
 * Subscription status helpers. Use these to gate pro tools and show/hide ads.
 * Update subscription via Stripe webhooks or your billing API so access updates immediately.
 */

import { prisma } from './db'

export type SubscriptionStatus = 'free' | 'active' | 'cancelled' | 'past_due'

export function isActiveSubscription(status: string | null | undefined): boolean {
  return status === 'active'
}

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionStatus: true, subscriptionEndsAt: true },
  })
  if (!user) return 'free'
  if (user.subscriptionStatus === 'active') return 'active'
  if (user.subscriptionStatus === 'cancelled' || user.subscriptionStatus === 'past_due') {
    if (user.subscriptionEndsAt && user.subscriptionEndsAt > new Date()) return 'active'
    return user.subscriptionStatus as SubscriptionStatus
  }
  return (user.subscriptionStatus as SubscriptionStatus) ?? 'free'
}

/** Returns true if user has access to pro tools (no ads, full access). */
export async function isSubscribed(userId: string): Promise<boolean> {
  const status = await getSubscriptionStatus(userId)
  return status === 'active'
}
