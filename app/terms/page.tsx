import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Zap } from 'lucide-react'
import { siteName } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${siteName}. Rules and guidelines for using our website and tools.`,
}

export default function TermsPage() {
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

        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: March 2025</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using {siteName} (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              {siteName} provides a software tools store, including free and subscription-based access to tools, downloads, and related features. We reserve the right to modify or discontinue the Service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Subscription and Payment</h2>
            <p>
              Paid plans (e.g., $5/month) are billed in advance. You may cancel at any time. Refunds are handled according to our refund policy. You are responsible for providing accurate payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p>
              You agree not to use the Service for any illegal purpose, to violate any laws, to infringe others&apos; rights, or to transmit malware or harmful content. We may suspend or terminate access for violations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>
              The Service, including content, design, and software, is owned by us or our licensors. You may not copy, modify, or distribute our materials without permission. Tools you download may have their own licenses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free service. Use of downloaded tools is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance. We will indicate the &quot;Last updated&quot; date at the top.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, please contact us using the information provided on our website.
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
