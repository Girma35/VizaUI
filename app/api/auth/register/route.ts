/**
 * User registration: hash password, create user, store referral from cookie.
 * Call this from the register page; then sign in via signIn('credentials', ...).
 */
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/db'

const REFERRAL_COOKIE = 'viza_ref'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body as { email?: string; password?: string; name?: string }
    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    const referralCode = request.headers.get('cookie')?.match(new RegExp(`${REFERRAL_COOKIE}=([^;]+)`))?.[1] ?? null

    const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const passwordHash = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        passwordHash,
        referralCode: referralCode || null,
        subscriptionStatus: 'free',
      },
    })

    return NextResponse.json({ ok: true, userId: user.id, email: user.email })
  } catch (e) {
    console.error('Register error', e)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
