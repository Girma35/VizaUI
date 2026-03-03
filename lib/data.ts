// Software tools store – anyone can browse and download
export type ToolCategory = 'productivity' | 'development' | 'design' | 'utilities' | 'other'

export interface Tool {
  id: string
  slug: string
  name: string
  description: string
  category: ToolCategory
  version: string
  downloadUrl: string
  fileSize?: string
  icon?: string
  featured?: boolean
  /** If true, downloadUrl opens the web tool instead of a file download */
  isWebTool?: boolean
}

export const toolCategories: { value: ToolCategory; label: string }[] = [
  { value: 'productivity', label: 'Productivity' },
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'other', label: 'Other' },
]

export const tools: Tool[] = [
  {
    id: '1',
    slug: 'file-sync-pro',
    name: 'File Sync Pro',
    description: 'Keep folders in sync across devices. Lightweight, fast, and works offline.',
    category: 'productivity',
    version: '2.1.0',
    downloadUrl: '/downloads/file-sync-pro.zip',
    fileSize: '12 MB',
    featured: true,
  },
  {
    id: '2',
    slug: 'code-formatter',
    name: 'Code Formatter',
    description: 'Format and lint code in 50+ languages. CLI and editor plugins included.',
    category: 'development',
    version: '1.4.2',
    downloadUrl: '/downloads/code-formatter.zip',
    fileSize: '8 MB',
    featured: true,
  },
  {
    id: '3',
    slug: 'color-palette-gen',
    name: 'Color Palette Gen',
    description: 'Generate accessible color palettes from a single base color. Export to CSS/SCSS.',
    category: 'design',
    version: '1.0.0',
    downloadUrl: '/downloads/color-palette-gen.zip',
    fileSize: '3 MB',
    featured: false,
  },
  {
    id: '4',
    slug: 'batch-renamer',
    name: 'Batch Renamer',
    description: 'Rename hundreds of files with patterns, regex, and preview before applying.',
    category: 'utilities',
    version: '3.0.1',
    downloadUrl: '/downloads/batch-renamer.zip',
    fileSize: '5 MB',
    featured: true,
  },
  {
    id: '5',
    slug: 'json-viewer',
    name: 'JSON Viewer',
    description: 'Pretty-print, validate, and search JSON. Drag-and-drop or paste support.',
    category: 'development',
    version: '2.2.0',
    downloadUrl: '/downloads/json-viewer.zip',
    fileSize: '4 MB',
    featured: false,
  },
  {
    id: '6',
    slug: 'screenshot-tool',
    name: 'Screenshot Tool',
    description: 'Capture region, window, or full screen. Annotate and share in one click.',
    category: 'utilities',
    version: '1.5.0',
    downloadUrl: '/downloads/screenshot-tool.zip',
    fileSize: '6 MB',
    featured: false,
  },
  {
    id: '7',
    slug: 'api-tester',
    name: 'API Tester',
    description: 'Test API endpoints in the browser. Send GET/POST/PUT/DELETE, set headers and body, view formatted JSON response.',
    category: 'development',
    version: '1.0.0',
    downloadUrl: '/api-tool',
    featured: true,
    isWebTool: true,
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category)
}

export const stats = [
  { label: 'Total Users', value: '12,847', change: '+12%', trend: 'up' },
  { label: 'Active Chats', value: '3,291', change: '+8%', trend: 'up' },
  { label: 'API Calls', value: '1.2M', change: '+24%', trend: 'up' },
  { label: 'Revenue', value: '$48,290', change: '+18%', trend: 'up' },
]

export const chatMessages = [
  { id: 1, role: 'assistant', content: "Hello! I'm VizaAI. How can I help you today?", timestamp: '10:00 AM' },
  { id: 2, role: 'user', content: 'Can you help me analyze my sales data?', timestamp: '10:01 AM' },
  { id: 3, role: 'assistant', content: 'Absolutely! Please share your data and I\'ll provide detailed insights and visualizations.', timestamp: '10:01 AM' },
]

export const pricingPlans = [
  {
    name: 'Pro',
    price: '$5',
    period: '/month',
    description: 'No ads, exclusive tools, and the perfect toolkit. One simple plan.',
    features: [
      'No ads — clean experience',
      'Exclusive tools — members only',
      'Perfect toolkit — everything you need',
      'All updates included',
      'Cancel anytime',
    ],
    cta: 'Subscribe — $5/month',
    highlighted: true,
  },
]

export const features = [
  {
    icon: 'MessageSquare',
    title: 'AI Chat',
    description: 'Integrate powerful conversational AI into your applications with our easy-to-use chat API.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics',
    description: 'Get deep insights into your AI usage with real-time dashboards and detailed reports.',
  },
  {
    icon: 'Users',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with role-based access control and shared workspaces.',
  },
  {
    icon: 'Shield',
    title: 'Secure API',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.',
  },
  {
    icon: 'Cpu',
    title: 'Custom Models',
    description: 'Fine-tune and deploy your own AI models tailored to your specific use case.',
  },
  {
    icon: 'Zap',
    title: 'Fast Integration',
    description: 'Get up and running in minutes with our comprehensive SDKs and documentation.',
  },
]

export const invoices = [
  { id: 'INV-001', date: 'Jan 1, 2024', amount: '$29.00', status: 'Paid' },
  { id: 'INV-002', date: 'Feb 1, 2024', amount: '$29.00', status: 'Paid' },
  { id: 'INV-003', date: 'Mar 1, 2024', amount: '$29.00', status: 'Paid' },
  { id: 'INV-004', date: 'Apr 1, 2024', amount: '$29.00', status: 'Pending' },
]

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Chat', href: '/dashboard/chat', icon: 'MessageSquare' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  { label: 'Billing', href: '/dashboard/billing', icon: 'CreditCard' },
]

export const recentActivity = [
  { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
  { id: 2, action: 'API call limit reached', time: '15 minutes ago', type: 'warning' },
  { id: 3, action: 'Payment processed', time: '1 hour ago', type: 'success' },
  { id: 4, action: 'New chat session started', time: '2 hours ago', type: 'chat' },
  { id: 5, action: 'Model training completed', time: '3 hours ago', type: 'success' },
]
