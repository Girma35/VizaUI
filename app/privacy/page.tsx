import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Zap } from 'lucide-react'
import { siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteName}. How we collect, use, and protect your information.`,
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block text-slate-400 hover:text-white text-sm mb-8 transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: March 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              {siteName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and software tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p>
              We may collect information you provide directly (e.g., account registration, payment for subscriptions, support requests) and information collected automatically (e.g., usage data, device information, cookies and similar technologies).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>
              We use collected information to provide, maintain, and improve our services; process payments; send updates and support; and comply with legal obligations. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Cookies and Tracking</h2>
            <p>
              We may use cookies and similar technologies for authentication, preferences, and analytics. You can manage cookie settings in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or port your data, and to object to or restrict certain processing. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p>
              For questions about this Privacy Policy or our practices, contact us at the email or address provided on our website.
            </p>
          </section>
        </div>
      </main>
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
            <Zap className="h-5 w-5" />
            <span className="font-bold text-white">{siteName}</span>
          </Link>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
