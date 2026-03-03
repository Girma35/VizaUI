import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Button from '@/components/ui/Button'
import { getToolBySlug, toolCategories } from '@/lib/data'
import { Download, ArrowLeft, Zap } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: 'Tool not found | VizaLabs' }
  return {
    title: `${tool.name} | VizaLabs Tools`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const categoryLabel = toolCategories.find((c) => c.value === tool.category)?.label ?? tool.category

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all tools
          </Link>

          <div className="rounded-2xl border border-slate-700 bg-slate-800/30 backdrop-blur-sm p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center flex-shrink-0">
                <Zap className="h-7 w-7 text-purple-400" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {categoryLabel}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">{tool.name}</h1>
                <p className="text-slate-400 mt-1">Version {tool.version}</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-8">{tool.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              {tool.isWebTool ? (
                <Link href={tool.downloadUrl}>
                  <Button size="lg" className="gap-2">
                    <Zap className="h-5 w-5" /> Use tool
                  </Button>
                </Link>
              ) : (
                <a href={tool.downloadUrl} download>
                  <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" /> Download
                  </Button>
                </a>
              )}
              {tool.fileSize && (
                <span className="text-slate-500 text-sm">Size: {tool.fileSize}</span>
              )}
            </div>

            <p className="text-slate-500 text-sm mt-6">
              Anyone can access and download this tool. No account required.
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-800 py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white">VizaLabs</span>
          </div>
          <p className="text-slate-400 text-sm">© 2025 VizaLabs. All tools free to download.</p>
        </div>
      </footer>
    </div>
  )
}
