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
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for individuals and small projects',
    features: [
      '1,000 API calls/month',
      '1 AI model',
      'Basic analytics',
      'Community support',
      '1 team member',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams and businesses',
    features: [
      '100,000 API calls/month',
      '10 AI models',
      'Advanced analytics',
      'Priority support',
      '10 team members',
      'Custom integrations',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    description: 'For large organizations',
    features: [
      'Unlimited API calls',
      'Unlimited AI models',
      'Enterprise analytics',
      'Dedicated support',
      'Unlimited team members',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
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
