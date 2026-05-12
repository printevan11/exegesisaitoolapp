import React, { useState, useRef, useEffect } from 'react'
import {
  Send, Sparkles, BookOpen, Globe, Heart, Lightbulb,
  Languages, BookMarked, RefreshCw, Copy, ThumbsUp, X
} from 'lucide-react'
import clsx from 'clsx'
import { geminiService } from '../services/geminiService'

const suggestedQuestions = [
  'Explain Romans 8:28 in context',
  'What is the difference between grace and mercy?',
  'Who wrote the book of Revelation?',
  'What does John 3:16 mean?',
  'What is the significance of the Sermon on the Mount?',
  'Explain the concept of grace in the New Testament',
]

const savedChats = [
  { title: 'Understanding Grace vs Mercy', time: '2h ago' },
  { title: 'Context of Romans 8', time: 'Yesterday' },
  { title: 'Sermon on the Mount deep dive', time: '3 days ago' },
]

function TypingIndicator() {
  return (
    <div className="chat-bubble-ai flex items-center gap-1.5">
      <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full"></span>
      <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full"></span>
      <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full"></span>
    </div>
  )
}

function Message({ msg }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(msg.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={clsx('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
      {msg.role === 'assistant' && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0 mt-1">
          <Sparkles size={14} className="text-navy-950" />
        </div>
      )}
      <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        {msg.role === 'assistant' && msg.content === '' ? (
          <TypingIndicator />
        ) : (
          <>
            <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{msg.content}</p>
            {msg.role === 'assistant' && msg.content && (
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-navy-600/30">
                <button onClick={copy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-gold-400 transition-colors">
                  <Copy size={11} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                  <ThumbsUp size={11} />
                  Helpful
                </button>
                <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-gold-400 transition-colors ml-auto">
                  <BookMarked size={11} />
                  Save
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function AIStudy() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Shalom! I'm your AI Exegesis Assistant. Ask me anything about Scripture — verse explanations, historical context, Greek/Hebrew insights, theological concepts, or how biblical principles apply to your life today.\n\nYou can also ask in Tagalog: 'Ano ang ibig sabihin ng Romans 8:28?'"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('English')
  const [studyMode, setStudyMode] = useState('standard') // standard | deep
  const [showSidebar, setShowSidebar] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const query = text || input.trim()
    if (!query || loading) return

    setInput('')
    setLoading(true)

    const userMsg = { role: 'user', content: query }
    const assistantMsg = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, userMsg, assistantMsg])

    try {
      const reply = await geminiService.chat(
        [...messages, userMsg],
        '',
        language,
        studyMode
      )

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: reply }
        return updated
      })
    } catch (err) {
      console.error('Error:', err)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `I'm having trouble connecting right now. Error: ${err.message}. Please check your API configuration or try again.`
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-73px)] flex overflow-hidden">
      {/* Sidebar — Saved Chats (desktop) */}
      <div className="hidden lg:flex flex-col w-64 border-r border-navy-700/40 bg-navy-900/40 p-4 flex-shrink-0">
        <h3 className="font-semibold text-white text-sm mb-4">Saved Conversations</h3>
        <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide">
          {savedChats.map(chat => (
            <button key={chat.title} className="w-full text-left p-3 rounded-xl hover:bg-navy-800/60 transition-all group">
              <p className="text-sm text-slate-300 group-hover:text-white truncate font-medium">{chat.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{chat.time}</p>
            </button>
          ))}
        </div>
        <button className="btn-secondary text-sm mt-4">+ New Conversation</button>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Options Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-navy-700/40 bg-navy-950/50 flex-wrap">
          <div className="flex items-center gap-1 bg-navy-800/60 rounded-xl p-1">
            {['standard', 'deep'].map(mode => (
              <button
                key={mode}
                onClick={() => setStudyMode(mode)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                  studyMode === mode ? 'bg-gold-500 text-navy-950' : 'text-slate-400 hover:text-white'
                )}
              >
                {mode === 'deep' ? '🔬 Deep Study' : '📖 Standard'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-navy-800/60 rounded-xl p-1">
            {['English', 'Tagalog'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  language === lang ? 'bg-gold-500 text-navy-950' : 'text-slate-400 hover:text-white'
                )}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Languages size={14} className="text-slate-500" />
            <span className="text-xs text-slate-500">{language} mode</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          <div ref={endRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length < 2 && (
          <div className="px-4 sm:px-6 pb-2">
            <p className="text-xs text-slate-500 mb-2 font-medium">Try asking:</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs bg-navy-800/60 hover:bg-navy-700/60 border border-navy-600/40 hover:border-navy-500/60 text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 sm:p-6 border-t border-navy-700/40 bg-navy-950/30">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder='Ask about any verse, theological concept, or biblical topic...'
                rows={1}
                style={{ minHeight: '48px', maxHeight: '140px', resize: 'none' }}
                className="input-field w-full pr-4 text-sm"
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className={clsx(
                'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                input.trim() && !loading
                  ? 'bg-gold-500 hover:bg-gold-400 text-navy-950 active:scale-95 shadow-lg shadow-gold-500/20'
                  : 'bg-navy-800/60 text-slate-600 cursor-not-allowed'
              )}
            >
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">
            Powered by Google Gemini AI · Responses may contain theological perspectives — verify with Scripture
          </p>
        </div>
      </div>
    </div>
  )
}