'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Copy, Check } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    usage: true,
    marketing: false,
    security: true,
  })

  const apiKey = 'vz_live_sk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
            JD
          </div>
          <div>
            <p className="font-medium text-white">John Doe</p>
            <p className="text-sm text-slate-400">Pro Plan</p>
          </div>
          <Button variant="secondary" size="sm" className="ml-auto">
            Change avatar
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="John Doe" />
          <Input label="Email" type="email" defaultValue="john@example.com" />
          <Input label="Company" defaultValue="Acme Inc." />
          <Input label="Role" defaultValue="Developer" />
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email notifications', desc: 'Receive email updates about your account' },
            { key: 'usage', label: 'Usage alerts', desc: 'Get notified when you approach API limits' },
            { key: 'security', label: 'Security alerts', desc: 'Receive alerts for suspicious activity' },
            { key: 'marketing', label: 'Marketing emails', desc: 'Updates about new features and promotions' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(key as keyof typeof notifications)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  notifications[key as keyof typeof notifications] ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* API Key */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">API Key</h2>
        <p className="text-sm text-slate-400 mb-4">Use this key to authenticate API requests</p>
        <div className="flex gap-2">
          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 font-mono text-sm text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
            {apiKey}
          </div>
          <Button variant="secondary" size="md" onClick={handleCopy} className="gap-2 flex-shrink-0">
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="md" onClick={handleSave} loading={saved} className="min-w-[120px]">
          {saved ? 'Saved!' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}
