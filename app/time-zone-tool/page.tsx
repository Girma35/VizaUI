'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import { Zap, Plus, Trash2 } from 'lucide-react'

const FALLBACK_TIMEZONES = [
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Denver',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
  'UTC',
]

function getTimeZones(): string[] {
  if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
    try {
      return (Intl as unknown as { supportedValuesOf(t: 'timeZone'): string[] }).supportedValuesOf('timeZone').sort()
    } catch {
      return FALLBACK_TIMEZONES
    }
  }
  return FALLBACK_TIMEZONES
}

function formatInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeStyle: 'long',
  }).format(date)
}

function formatTimeZoneLabel(tz: string): string {
  return tz.replace(/_/g, ' ')
}

/** Break down ms difference into months (≈30d), days, hours, minutes for display */
function getRemainingBreakdown(diffMs: number): { months: number; days: number; hours: number; minutes: number; isPast: boolean } {
  const totalMinutes = Math.floor(Math.abs(diffMs) / 60000)
  const totalDays = Math.floor(totalMinutes / (24 * 60))
  const months = Math.floor(totalDays / 30)
  const days = totalDays % 30
  const remainderMinutes = totalMinutes % (24 * 60)
  const hours = Math.floor(remainderMinutes / 60)
  const minutes = remainderMinutes % 60
  return {
    months,
    days,
    hours,
    minutes,
    isPast: diffMs < 0,
  }
}

function formatRemainingTime(diffMs: number): string {
  if (diffMs === 0) return 'Now'
  const { months, days, hours, minutes, isPast } = getRemainingBreakdown(diffMs)
  const parts: string[] = []
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`)
  parts.push(`${minutes} ${minutes === 1 ? 'min' : 'min'}`)
  const joined = parts.join(' ')
  return isPast ? `${joined} ago` : `${joined} left`
}

function getInitialTime(): string {
  if (typeof window === 'undefined') return '12:00'
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function TimeZoneToolPage() {
  const [targetMoment, setTargetMoment] = useState<Date | null>(null)
  const [timeInput, setTimeInput] = useState('')
  const [selectedList, setSelectedList] = useState<string[]>([])
  const [addTz, setAddTz] = useState('')
  const [now, setNow] = useState(() => new Date())
  const [mounted, setMounted] = useState(false)
  const timeZones = getTimeZones()

  useEffect(() => {
    setMounted(true)
    setTimeInput(getInitialTime())
  }, [])

  const updateTargetFromInput = useCallback(() => {
    if (!mounted || !timeInput.trim()) {
      if (!timeInput.trim()) setTargetMoment(null)
      return
    }
    const [h, m] = timeInput.split(':').map(Number)
    if (h === undefined || m === undefined || Number.isNaN(h) || Number.isNaN(m)) {
      setTargetMoment(null)
      return
    }
    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m, 0, 0)
    setTargetMoment(date)
  }, [timeInput, mounted])

  useEffect(() => {
    updateTargetFromInput()
  }, [timeInput, updateTargetFromInput])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const addTimeZone = () => {
    if (addTz && !selectedList.includes(addTz)) {
      setSelectedList((prev) => [...prev, addTz])
      setAddTz('')
    }
  }

  const removeTimeZone = (tz: string) => {
    setSelectedList((prev) => prev.filter((t) => t !== tz))
  }

  const diffFromNow = targetMoment
    ? targetMoment.getTime() - now.getTime()
    : 0
  const diffLabel = targetMoment ? formatRemainingTime(diffFromNow) : '—'

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Time zone converter</h1>
          <p className="text-slate-400 text-sm">
            Set your event time, add time zones to see that time in each zone. The system uses the current real time to show how many days, months, hours and minutes are left (or ago) until that time.
          </p>
        </div>

        <section className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Your time (today)</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1">
              <label className="block text-slate-400 text-sm mb-1">Time</label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800/30 p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Add time zones</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={addTz}
              onChange={(e) => setAddTz(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-0"
            >
              <option value="">Select a time zone…</option>
              {timeZones.map((tz) => (
                <option key={tz} value={tz}>
                  {formatTimeZoneLabel(tz)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addTimeZone}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors"
            >
              <Plus className="h-5 w-5" /> Add
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Result (real time)</h2>
          {!targetMoment && (
            <p className="text-slate-500 text-sm">Enter a time above to see conversions.</p>
          )}
          {targetMoment && selectedList.length === 0 && (
            <p className="text-slate-500 text-sm">Add at least one time zone from the dropdown above.</p>
          )}
          {targetMoment && selectedList.length > 0 && (
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-900/80 border border-slate-600 p-4 mb-4">
                <p className="text-slate-400 text-sm mb-1">Time until your event (from current real time)</p>
                <p className="text-white font-semibold text-lg">{diffLabel}</p>
                <p className="text-slate-500 text-xs mt-1">Updates every second</p>
              </div>
              <ul className="space-y-3">
                {selectedList.map((tz) => (
                  <li
                    key={tz}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900 border border-slate-600 p-4"
                  >
                    <div>
                      <p className="font-medium text-white">{formatTimeZoneLabel(tz)}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{formatInTimeZone(targetMoment, tz)}</p>
                      <p className="text-slate-500 text-xs mt-1">{diffLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTimeZone(tz)}
                      className="text-slate-400 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <p className="mt-6 text-slate-500 text-xs">
          Uses the browser’s real-time clock. All conversions use the standard IANA time zone database.
        </p>
      </main>
      <footer className="border-t border-slate-800 py-6 px-4 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
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
