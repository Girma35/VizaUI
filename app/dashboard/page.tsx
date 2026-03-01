import { stats, recentActivity } from '@/lib/data'
import Card from '@/components/ui/Card'
import { TrendingUp, Users, MessageSquare, Activity, DollarSign } from 'lucide-react'
import clsx from 'clsx'

const statIcons = [Users, MessageSquare, Activity, DollarSign]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-400">Welcome back, John! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = statIcons[i]
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <span className={clsx(
                  'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                  stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                )}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </Card>
          )
        })}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={clsx(
                  'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                  item.type === 'success' ? 'bg-green-400' :
                  item.type === 'warning' ? 'bg-yellow-400' :
                  item.type === 'user' ? 'bg-blue-400' : 'bg-purple-400'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200">{item.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Start new chat session', desc: 'Open the AI chat interface' },
              { label: 'View API documentation', desc: 'Learn how to integrate our API' },
              { label: 'Manage team members', desc: 'Add or remove team access' },
              { label: 'Upgrade your plan', desc: 'Get more API calls and features' },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full text-left p-3 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
              >
                <div className="text-sm font-medium text-slate-200">{action.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{action.desc}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
