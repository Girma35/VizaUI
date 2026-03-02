import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { invoices } from '@/lib/data'
import { CreditCard, Check, Download } from 'lucide-react'
import clsx from 'clsx'

export default function BillingPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Billing</h1>
        <p className="text-slate-400">Manage your subscription and payment details</p>
      </div>

      {/* Current Plan */}
      <Card gradient className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Current Plan</p>
            <h2 className="text-2xl font-bold text-white">Pro</h2>
            <p className="text-purple-400 font-semibold mt-1">$29 / month</p>
          </div>
          <Button variant="secondary" size="sm">Upgrade Plan</Button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Next billing date', value: 'May 1, 2024' },
            { label: 'Team members', value: '4 / 10' },
            { label: 'Status', value: 'Active' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Usage</h2>
        <div className="space-y-4">
          {[
            { label: 'API Calls', used: 68500, total: 100000 },
            { label: 'Storage', used: 2.4, total: 10, unit: 'GB' },
          ].map(({ label, used, total, unit }) => {
            const pct = Math.round((used / total) * 100)
            return (
              <div key={label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{label}</span>
                  <span className="text-slate-400">
                    {used.toLocaleString()}{unit || ''} / {total.toLocaleString()}{unit || ''}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{pct}% used</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Payment Method</h2>
          <Button variant="secondary" size="sm">Update</Button>
        </div>
        <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-700">
          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
            <p className="text-xs text-slate-400">Expires 12/26</p>
          </div>
          <div className="ml-auto">
            <span className="flex items-center gap-1 text-xs text-green-400">
              <Check className="h-3 w-3" /> Default
            </span>
          </div>
        </div>
      </Card>

      {/* Invoice History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 text-slate-400 font-medium">Invoice</th>
                <th className="text-left py-3 text-slate-400 font-medium">Date</th>
                <th className="text-left py-3 text-slate-400 font-medium">Amount</th>
                <th className="text-left py-3 text-slate-400 font-medium">Status</th>
                <th className="text-right py-3 text-slate-400 font-medium">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 text-white font-mono">{inv.id}</td>
                  <td className="py-3 text-slate-300">{inv.date}</td>
                  <td className="py-3 text-slate-300">{inv.amount}</td>
                  <td className="py-3">
                    <span className={clsx(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      inv.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    )}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
