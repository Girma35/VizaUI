/**
 * Webhook endpoint for your payment provider (e.g. Stripe).
 * On subscription created/updated: set user.subscriptionStatus = 'active', subscriptionId, etc.
 * On subscription cancelled: set subscriptionStatus = 'cancelled', subscriptionEndsAt = end of period.
 * Access updates immediately because session callback reads from DB each time.
 */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  // TODO: verify webhook signature (e.g. Stripe webhook secret)
  try {
    const body = await request.json() as {
      type?: string
      userId?: string
      subscriptionId?: string
      status?: 'active' | 'cancelled' | 'past_due'
      endsAt?: string
    }
    const { type, userId, status, subscriptionId, endsAt } = body
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 })
    }

    if (type === 'subscription.created' || type === 'subscription.updated' || status === 'active') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: 'active',
          subscriptionId: subscriptionId ?? undefined,
          subscriptionEndsAt: endsAt ? new Date(endsAt) : null,
        },
      })
    } else if (type === 'subscription.cancelled' || status === 'cancelled' || status === 'past_due') {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: status ?? 'cancelled',
          subscriptionEndsAt: endsAt ? new Date(endsAt) : null,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Subscription webhook error', e)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
