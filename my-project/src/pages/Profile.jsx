import React, { useState } from 'react'
import { User, Flame, Zap, Trophy, BookOpen, Star, Edit3, Settings, Bell, Shield, HelpCircle } from 'lucide-react'
import clsx from 'clsx'

const achievements = [
  { icon: '📖', title: 'Scripture Scholar', desc: 'Read 100 chapters', earned: true },
  { icon: '🔥', title: '7-Day Streak', desc: '7 days in a row', earned: true },
  { icon: '⭐', title: 'Verse Memorizer', desc: 'Memorize 10 verses', earned: true },
  { icon: '🙏', title: 'Prayer Warrior', desc: 'Pray for 50 people', earned: false },
  { icon: '✝️', title: 'Gospel Reader', desc: 'Complete all Gospels', earned: false },
  { icon: '🦁', title: 'Lion of Judah', desc: 'Complete OT in 90 days', earned: false },
]

const stats = [
  { label: 'Day Streak', value: '7', icon: Flame, color: 'text-orange-400 bg-orange-500/15' },
  { label: 'Chapters Read', value: '284', icon: BookOpen, color: 'text-blue-400 bg-blue-500/15' },
  { label: 'Total XP', value: '1,420', icon: Zap, color: 'text-gold-400 bg-gold-500/15' },
  { label: 'Achievements', value: '3', icon: Trophy, color: 'text-violet-400 bg-violet-500/15' },
]

const settingGroups = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Daily Reminders', desc: '8:00 AM' },
      { icon: BookOpen, label: 'Default Translation', desc: 'ESV' },
      { icon: Star, label: 'Preferred Language', desc: 'English' },
    ]
  },
  {
    title: 'Account',
    items: [
      { icon: Shield, label: 'Privacy & Security' },
      { icon: HelpCircle, label: 'Help & Support' },
      { icon: Settings, label: 'App Settings' },
    ]
  }
]

export default function Profile() {
  const [xp] = useState(1420)
  const xpToNext = 2000
  const level = 8

  return (
    <div className="page-container py-6 space-y-6 animate-fade-in">
      {/* Profile Card */}
      <div className="relative overflow-hidden glass-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-3xl shadow-xl shadow-gold-500/20">
              J
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center border-2 border-navy-900">
              <span className="text-white text-xs font-bold">{level}</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
              <h2 className="font-serif text-2xl font-bold text-white">Juan dela Cruz</h2>
              <button className="btn-ghost p-1.5">
                <Edit3 size={14} />
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-1">juan@email.com</p>
            <p className="text-gold-400 text-xs font-medium">Member since January 2024 · Philippines 🇵🇭</p>

            {/* XP Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Level {level} — Scripture Explorer</span>
                <span className="text-gold-400 font-semibold">{xp.toLocaleString()} / {xpToNext.toLocaleString()} XP</span>
              </div>
              <div className="bg-navy-700/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all"
                  style={{ width: `${(xp / xpToNext) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{xpToNext - xp} XP until Level {level + 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2', color)}>
              <Icon size={18} className={color.split(' ')[0]} />
            </div>
            <p className="text-white font-bold text-xl">{value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Reading Streak Calendar */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Flame size={16} className="text-orange-400" />
            7-Day Reading Streak 🔥
          </h3>
          <span className="badge-gold">Keep it up!</span>
        </div>
        <div className="flex gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={clsx(
                'w-full aspect-square rounded-xl flex items-center justify-center text-sm transition-all',
                i < 6 ? 'bg-gold-500/20 border border-gold-500/30' : 'bg-navy-800/40 border border-navy-700/30'
              )}>
                {i < 6 ? '✓' : ''}
              </div>
              <span className="text-slate-500 text-xs">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Achievements</h3>
          <span className="badge-gold">3/6 Earned</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={clsx(
                'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all',
                a.earned
                  ? 'border-gold-500/30 bg-gold-500/10 hover:bg-gold-500/15 cursor-pointer'
                  : 'border-navy-700/30 bg-navy-800/30 opacity-40 cursor-not-allowed'
              )}
            >
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-semibold text-white leading-tight">{a.title}</p>
              <p className="text-xs text-slate-500 leading-tight">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      {settingGroups.map(group => (
        <div key={group.title} className="glass-card overflow-hidden">
          <div className="px-5 py-3 border-b border-navy-700/40">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{group.title}</p>
          </div>
          <div className="divide-y divide-navy-700/30">
            {group.items.map(({ icon: Icon, label, desc }) => (
              <button key={label} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-navy-800/40 transition-colors text-left">
                <div className="w-8 h-8 rounded-lg bg-navy-700/60 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{label}</p>
                  {desc && <p className="text-slate-400 text-xs">{desc}</p>}
                </div>
                <span className="text-slate-600 text-lg">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <button className="w-full py-3 rounded-xl text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 transition-all text-sm font-medium">
        Sign Out
      </button>
    </div>
  )
}