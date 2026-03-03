'use client'

import { useState, useCallback } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Share2, Copy, Check, Twitter, Linkedin, MessageCircle } from 'lucide-react'

interface ShareToolPopupProps {
  toolName: string
  shareUrl: string
  trigger?: React.ReactNode
  className?: string
}

const encodeUrl = (url: string) => encodeURIComponent(url)
const encodeText = (text: string) => encodeURIComponent(text)

export function ShareToolPopup({ toolName, shareUrl, trigger, className }: ShareToolPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [shareUrl])

  const shareText = `Check out ${toolName} on VizaLabs — ${shareUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeText(shareText)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl(shareUrl)}`
  const redditUrl = `https://reddit.com/submit?url=${encodeUrl(shareUrl)}&title=${encodeText(toolName + ' - VizaLabs Tools')}`

  return (
    <>
      {trigger ? (
        <button type="button" onClick={() => setIsOpen(true)} className={className}>
          {trigger}
        </button>
      ) : (
        <Button
          variant="secondary"
          size="lg"
          className={`gap-2 ${className ?? ''}`}
          onClick={() => setIsOpen(true)}
        >
          <Share2 className="h-5 w-5" /> Share
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Share this tool"
      >
        <div className="space-y-5">
          <p className="text-slate-400 text-sm">
            Share with your community — copy the link or post to social.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 rounded-lg bg-slate-800 border border-slate-600 px-4 py-2.5 text-sm text-slate-200 font-mono"
            />
            <Button
              variant="primary"
              size="md"
              className="gap-1.5 shrink-0"
              onClick={copyLink}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">
              Share to social
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
              >
                <Twitter className="h-4 w-4" /> X (Twitter)
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-700/50 hover:border-slate-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Reddit
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
