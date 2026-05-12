import React, { useState } from 'react'
import { Users, Heart, MessageCircle, Plus, Search, Flame, BookOpen, Send } from 'lucide-react'
import clsx from 'clsx'

const prayerRequests = [
  { name: 'Maria S.', time: '5m ago', request: 'Please pray for my mother\'s healing. She was diagnosed with cancer last week.', prayers: 34, avatar: 'M', color: 'bg-rose-500/20 text-rose-400' },
  { name: 'David L.', time: '23m ago', request: 'Praying for wisdom in a difficult decision about my career. I need God\'s direction.', prayers: 18, avatar: 'D', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Grace T.', time: '1h ago', request: 'My marriage is going through a difficult season. Please pray for restoration and healing.', prayers: 52, avatar: 'G', color: 'bg-emerald-500/20 text-emerald-400' },
  { name: 'Anonymous', time: '2h ago', request: 'Struggling with anxiety and fear. Pray that I experience the peace of God today.', prayers: 71, avatar: '?', color: 'bg-violet-500/20 text-violet-400' },
]

const studyGroups = [
  { name: 'Romans Deep Dive', members: 24, book: 'Romans', level: 'Advanced', active: true },
  { name: 'New Believers Journey', members: 41, book: 'John', level: 'Beginner', active: true },
  { name: 'Women of Faith', members: 18, book: 'Proverbs 31', level: 'All Levels', active: false },
  { name: 'Leadership in Scripture', members: 12, book: 'Nehemiah', level: 'Intermediate', active: true },
]

const discussions = [
  { title: 'How do you handle doubt in your faith?', replies: 23, author: 'James K.', time: '30m ago' },
  { title: 'Best resources for understanding Revelation?', replies: 15, author: 'Ruth A.', time: '2h ago' },
  { title: 'Daily devotional routines — what works for you?', replies: 41, author: 'Peter M.', time: '5h ago' },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('prayer')
  const [prayerText, setPrayerText] = useState('')
  const [prayedFor, setPrayedFor] = useState(new Set())

  const tabs = [
    { id: 'prayer', label: 'Prayer Wall', icon: '🙏' },
    { id: 'groups', label: 'Study Groups', icon: '📚' },
    { id: 'discussions', label: 'Discussions', icon: '💬' },
  ]

  return (
    <div className="page-container py-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 badge-gold mb-3">
          <Users size={12} />
          Community
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Study Together</h1>
        <p className="text-slate-400">Pray, study, and grow in community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Members', value: '2,841', icon: '👥' },
          { label: 'Prayers', value: '14,920', icon: '🙏' },
          { label: 'Groups', value: '48', icon: '📖' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass-card p-4 text-center">
            <span className="text-2xl">{icon}</span>
            <p className="text-white font-bold text-xl mt-1">{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy-800/40 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.id ? 'bg-gold-500 text-navy-950' : 'text-slate-400 hover:text-white'
            )}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Prayer Wall */}
      {activeTab === 'prayer' && (
        <div className="space-y-4">
          {/* Submit prayer */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white mb-3">Share a Prayer Request</h3>
            <textarea
              value={prayerText}
              onChange={e => setPrayerText(e.target.value)}
              placeholder="Share what's on your heart..."
              className="input-field w-full text-sm resize-none mb-3"
              rows={3}
            />
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                <input type="checkbox" className="accent-gold-500" />
                Post anonymously
              </label>
              <button
                disabled={!prayerText.trim()}
                className={clsx(
                  'flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all',
                  prayerText.trim() ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
                )}
              >
                <Send size={14} /> Post Request
              </button>
            </div>
          </div>

          {/* Prayer requests */}
          {prayerRequests.map((req, i) => (
            <div key={i} className="glass-card p-5 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className={clsx('w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0', req.color)}>
                  {req.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white text-sm">{req.name}</p>
                    <p className="text-slate-500 text-xs">{req.time}</p>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mt-1">{req.request}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-navy-700/40">
                <button
                  onClick={() => {
                    const s = new Set(prayedFor)
                    s.has(i) ? s.delete(i) : s.add(i)
                    setPrayedFor(s)
                  }}
                  className={clsx(
                    'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all',
                    prayedFor.has(i) ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'btn-ghost text-slate-400'
                  )}
                >
                  🙏 {prayedFor.has(i) ? 'Prayed' : 'Pray'} · {req.prayers + (prayedFor.has(i) ? 1 : 0)}
                </button>
                <button className="btn-ghost text-xs text-slate-400 flex items-center gap-1.5">
                  <MessageCircle size={12} /> Encourage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Study Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <button className="btn-primary flex items-center gap-2 ml-auto">
            <Plus size={16} /> Create Group
          </button>
          {studyGroups.map((group, i) => (
            <div key={i} className="glass-card p-5 flex items-center gap-4 card-hover cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 flex items-center justify-center text-xl flex-shrink-0">
                📖
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-white">{group.name}</p>
                  {group.active && <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>}
                </div>
                <p className="text-slate-400 text-sm">{group.book}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Users size={10} /> {group.members} members
                  </span>
                  <span className={clsx('badge text-xs', {
                    'bg-gold-500/15 text-gold-400': group.level === 'Advanced',
                    'bg-emerald-500/15 text-emerald-400': group.level === 'Beginner',
                    'bg-blue-500/15 text-blue-400': group.level !== 'Advanced' && group.level !== 'Beginner',
                  })}>{group.level}</span>
                </div>
              </div>
              <button className="btn-secondary text-sm flex-shrink-0">Join</button>
            </div>
          ))}
        </div>
      )}

      {/* Discussions */}
      {activeTab === 'discussions' && (
        <div className="space-y-3">
          <button className="btn-primary flex items-center gap-2 ml-auto">
            <Plus size={16} /> Start Discussion
          </button>
          {discussions.map((d, i) => (
            <div key={i} className="glass-card p-5 card-hover cursor-pointer">
              <p className="font-semibold text-white mb-2">{d.title}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{d.author}</span>
                <span>·</span>
                <span>{d.time}</span>
                <span className="ml-auto flex items-center gap-1">
                  <MessageCircle size={11} /> {d.replies} replies
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}