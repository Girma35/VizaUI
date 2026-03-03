/**
 * NextAuth configuration: credentials provider (email + password), session with subscription.
 * Secure: passwords hashed with bcrypt; session stored in DB.
 */
import type { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './db'
import { isSubscribed } from './subscription'
import { compare } from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    userId?: string
    subscriptionStatus?: 'free' | 'active' | 'cancelled' | 'past_due'
    isSubscribed?: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user?.passwordHash) return null
        const ok = await compare(credentials.password, user.passwordHash)
        if (!ok) return null
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        (session as Session).userId = token.userId as string
        let subscribed = false
        if (token.userId) subscribed = await isSubscribed(token.userId as string)
        (session as Session).isSubscribed = subscribed
        (session as Session).subscriptionStatus = subscribed ? 'active' : 'free'
      }
      return session
    },
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
