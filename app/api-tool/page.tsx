'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import { Send, Trash2, Copy, Check, Zap } from 'lucide-react'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
type Method = (typeof METHODS)[number]

function parseHeaders(text: string): Record<string, string> {
  const out: Record<string, string> = {}
  text
    .trim()
    .split('\n')
    .forEach((line) => {
      const i = line.indexOf(':')
      if (i > 0) {
        const key = line.slice(0, i).trim()
        const value = line.slice(i + 1).trim()
        if (key) out[key] = value
      }
    })
  return out
}

function tryFormatJson(raw: string): string {
  const t = raw.trim()
  if (!t) return ''
  try {
    return JSON.stringify(JSON.parse(t), null, 2)
  } catch {
    return raw
  }
}

export default function ApiToolPage() {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState<Method>('GET')
  const [headersText, setHeadersText] = useState('Content-Type: application/json')
  const [bodyText, setBodyText] = useState('')
  const [loading, setLoading] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [responseStatus, setResponseStatus] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const sendRequest = useCallback(async () => {
    const trimmed = url.trim()
    if (!trimmed) {
      setError('Please enter an API URL.')
      return
    }
    setError('')
    setResponseText('')
    setResponseStatus(null)
    setLoading(true)
    try {
      const headers = parseHeaders(headersText)
      const opts: RequestInit = {
        method,
        headers: Object.keys(headers).length ? headers : undefined,
      }
      if (method !== 'GET' && bodyText.trim()) {
        opts.body = bodyText.trim()
      }
      const res = await fetch(trimmed, opts)
      setResponseStatus(res.status)
      const raw = await res.text()
      setResponseText(tryFormatJson(raw))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Request failed'
      setError(message)
      setResponseStatus(null)
      setResponseText('')
    } finally {
      setLoading(false)
    }
  }, [url, method, headersText, bodyText])

  const clearAll = useCallback(() => {
    setResponseText('')
    setResponseStatus(null)
    setError('')
  }, [])

  const copyResponse = useCallback(async () => {
    if (!responseText) return
    try {
      await navigator.clipboard.writeText(responseText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Copy failed')
    }
  }, [responseText])

  const statusColor =
    responseStatus === null
      ? 'text-slate-400'
      : responseStatus >= 200 && responseStatus < 300
        ? 'text-emerald-400'
        : responseStatus >= 400
          ? 'text-red-400'
          : 'text-amber-400'

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">API Tester</h1>
          <p className="text-slate-400 text-sm">
            Enter an API URL, choose method, optional headers and body, then send. Response is shown below.
          </p>
        </div>

        {/* Request panel */}
        <section className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Request
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">API URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/users"
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as Method)}
                className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[140px]"
              >
                {METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Headers (optional)</label>
              <textarea
                value={headersText}
                onChange={(e) => setHeadersText(e.target.value)}
                placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-y min-h-[80px]"
              />
            </div>

            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
              <div>
                <label className="block text-sm text-slate-400 mb-1">Body (optional)</label>
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder='{"key": "value"}'
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-y min-h-[100px]"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                onClick={sendRequest}
                className="gap-2"
              >
                <Send className="h-5 w-5" /> Send Request
              </Button>
              <Button variant="secondary" size="lg" onClick={clearAll} className="gap-2">
                <Trash2 className="h-5 w-5" /> Clear
              </Button>
            </div>
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 mb-6 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Response panel */}
        <section className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Response
          </h2>

          {(responseStatus !== null || responseText || loading) && (
            <>
              {loading && (
                <div className="flex items-center gap-2 text-slate-400 mb-4">
                  <span className="inline-block w-4 h-4 border-2 border-slate-500 border-t-purple-400 rounded-full animate-spin" />
                  Loading…
                </div>
              )}
              {!loading && responseStatus !== null && (
                <div className={`flex items-center gap-2 mb-4 font-medium ${statusColor}`}>
                  Status: {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 404 ? 'Not Found' : responseStatus === 500 ? 'Server Error' : ''}
                </div>
              )}
              {!loading && responseText && (
                <div className="relative">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyResponse}
                      className="gap-1.5 text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied' : 'Copy response'}
                    </Button>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-900 border border-slate-600 text-slate-300 text-sm overflow-auto max-h-[400px] font-mono whitespace-pre-wrap break-words">
                    {responseText}
                  </pre>
                </div>
              )}
              {!loading && responseStatus === null && !responseText && !error && (
                <p className="text-slate-500 text-sm">Send a request to see the response here.</p>
              )}
            </>
          )}
          {!loading && responseStatus === null && !responseText && !error && (
            <p className="text-slate-500 text-sm">Send a request to see the response here.</p>
          )}
        </section>

        <p className="mt-6 text-slate-500 text-xs">
          Note: Requests run from your browser. APIs must allow CORS for cross-origin requests to work.
        </p>
      </main>
      <footer className="border-t border-slate-800 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <Link href="/tools" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <Zap className="h-4 w-4" /> Back to Tools
          </Link>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-white text-sm">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white text-sm">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
