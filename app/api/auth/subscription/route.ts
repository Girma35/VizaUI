/**
 * GET: return current user's subscription status (for client-side access checks).
 * Use after login so UI can show/hide ads and paywalls immediately.
 */
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSubscriptionStatus } from '@/lib/subscription'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.userId) {
    return NextResponse.json({ status: 'free', isSubscribed: false })
  }
  const status = await getSubscriptionStatus(session.userId)
  return NextResponse.json({
    status,
    isSubscribed: status === 'active',
  })
}
