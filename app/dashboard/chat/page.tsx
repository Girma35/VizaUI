'use client'

import { useState, useRef, useEffect } from 'react'
import { chatMessages } from '@/lib/data'
import { Send, Bot, User } from 'lucide-react'
import clsx from 'clsx'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const aiResponses = [
  "I understand! Let me analyze that for you. Based on the data patterns I can see, there are several key insights worth noting.",
  "Great question! I can help you with that. Here's what I recommend based on best practices and current trends.",
  "Absolutely! I've processed your request. The results show promising patterns that could optimize your workflow significantly.",
  "Thanks for sharing that. I've reviewed the information and have some detailed analysis and recommendations for you.",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(chatMessages as Message[])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">AI Chat</h1>
        <p className="text-sm text-slate-400">Powered by VizaAI</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}

            <div className={clsx(
              'max-w-[75%] rounded-2xl px-4 py-3',
              message.role === 'user'
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm'
                : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
            )}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={clsx(
                'text-xs mt-1',
                message.role === 'user' ? 'text-purple-200' : 'text-slate-500'
              )}>
                {message.timestamp}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-slate-800">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-blue-500 transition-all flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  )
}
