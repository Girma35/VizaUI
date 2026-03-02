import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export default function Card({ children, className, hover = false, gradient = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm',
        hover && 'hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer',
        gradient && 'border-transparent bg-gradient-to-br from-purple-500/10 to-blue-500/10 ring-1 ring-purple-500/30',
        className
      )}
    >
      {children}
    </div>
  )
}
