"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { LiquidCard, CardContent, CardHeader } from "@/components/ui/liquid-glass-card"
import { Badge } from "@/components/ui/badge"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { tools, toolCategories, type Tool, type ToolCategory } from "@/lib/data"

// Utils
function circumference(r: number): number {
  return 2 * Math.PI * r
}

function getReadinessScore(tool: Tool): number {
  if (tool.featured) return 88
  const hash = tool.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return 50 + (hash % 45)
}

// Context for staggered animation
type CounterContextType = { getNextIndex: () => number }
const CounterContext = createContext<CounterContextType | undefined>(undefined)

const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const counterRef = useRef(0)
  const getNextIndex = useCallback(() => counterRef.current++, [])
  return <CounterContext.Provider value={{ getNextIndex }}>{children}</CounterContext.Provider>
}

const useCounter = () => {
  const ctx = useContext(CounterContext)
  if (!ctx) throw new Error("useCounter must be used within CounterProvider")
  return ctx.getNextIndex
}

// Half-circle gauge
function ToolScoreHalfCircle({ value, max = 100, id }: { value: number; max?: number; id: string }) {
  const strokeRef = useRef<SVGCircleElement>(null)
  const radius = 45
  const dist = circumference(radius)
  const distHalf = dist / 2
  const strokeDasharray = `${distHalf} ${distHalf}`
  const strokeDashoffset = -Math.min(value / max, 1) * distHalf

  useEffect(() => {
    strokeRef.current?.animate(
      [
        { strokeDashoffset: "0", offset: 0 },
        { strokeDashoffset: "0", offset: 0.3 },
        { strokeDashoffset: String(strokeDashoffset) },
      ],
      { duration: 1400, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
    )
  }, [value, strokeDashoffset])

  const percent = Math.round((value / max) * 100)
  const isStrong = percent >= 80
  const isModerate = percent >= 40 && percent < 80
  const stop1 = isStrong ? "#34d399" : isModerate ? "#fbbf24" : "#94a3b8"
  const stop2 = isStrong ? "#059669" : isModerate ? "#d97706" : "#64748b"
  const gradId = `tool-grad-${id}`

  return (
    <svg className="block mx-auto w-auto max-w-full h-36" viewBox="0 0 100 50" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={stop1} />
          <stop offset="100%" stopColor={stop2} />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="10" transform="translate(50, 50.5)">
        <circle className="stroke-slate-700/50" r={radius} />
        <circle
          ref={strokeRef}
          stroke={`url(#${gradId})`}
          strokeDasharray={strokeDasharray}
          r={radius}
        />
      </g>
    </svg>
  )
}

// Display under gauge: version
function ToolScoreDisplay({ version }: { version: string }) {
  return (
    <div className="absolute bottom-0 w-full text-center">
      <div className="text-2xl font-medium h-10 text-white">v{version}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wide">Version</div>
    </div>
  )
}

// Card header: tool name + category badge
function ToolScoreHeader({ tool }: { tool: Tool }) {
  const categoryLabel = toolCategories.find((c) => c.value === tool.category)?.label ?? tool.category

  return (
    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-6 px-0">
      <h2 className="text-xl font-medium truncate text-white">{tool.name}</h2>
      <div className="flex items-center gap-2 shrink-0">
        {tool.featured && (
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
            Featured
          </Badge>
        )}
        <Badge variant="secondary" className="text-xs border-slate-600 text-slate-300">
          {categoryLabel}
        </Badge>
      </div>
    </CardHeader>
  )
}

// Single tool card
function ToolScoreCard({ tool, index }: { tool: Tool; index: number }) {
  const [appearing, setAppearing] = useState(false)
  const score = getReadinessScore(tool)

  useEffect(() => {
    const delay = 300 + index * 200
    const t = setTimeout(() => setAppearing(true), delay)
    return () => clearTimeout(t)
  }, [index])

  if (!appearing) return null

  return (
    <LiquidCard className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-800 fill-mode-both">
      <CardContent className="p-9">
        <ToolScoreHeader tool={tool} />
        <div className="relative mb-8 animate-in fade-in slide-in-from-bottom-12 duration-800 delay-100">
          <ToolScoreHalfCircle value={score} id={tool.id} />
          <ToolScoreDisplay version={tool.version} />
        </div>
        <p className="text-slate-400 text-center mb-9 min-h-[4.5rem] text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-800 delay-200">
          {tool.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <LiquidButton variant="default" size="lg" className="w-full sm:flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500" asChild>
            <a href={tool.downloadUrl} download>Download</a>
          </LiquidButton>
          <LiquidButton variant="secondary" size="lg" className="w-full sm:flex-1 h-12" asChild>
            <Link href={`/tools/${tool.slug}`}>View details</Link>
          </LiquidButton>
        </div>
      </CardContent>
    </LiquidCard>
  )
}

export interface ToolScoreCardsProps {
  toolsList?: Tool[]
}

export function ToolScoreCards({ toolsList }: ToolScoreCardsProps) {
  const list = toolsList ?? tools
  const getNextIndex = useCounter()

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6 py-6 px-4">
      {list.map((tool, i) => (
        <ToolScoreCard key={tool.id} tool={tool} index={getNextIndex()} />
      ))}
    </div>
  )
}

// Wrapper with provider for use on tools page
export function ToolScoreCardsWithProvider({ toolsList }: ToolScoreCardsProps) {
  return (
    <CounterProvider>
      <ToolScoreCards toolsList={toolsList} />
    </CounterProvider>
  )
}
