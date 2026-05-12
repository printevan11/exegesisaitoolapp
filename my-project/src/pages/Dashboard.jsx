import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, Sparkles, Heart, Flame, Trophy, ArrowRight,
  Play, Star, Clock, ChevronRight, Zap, BookMarked,
  TrendingUp, Sun, Moon, Cloud
} from 'lucide-react'
import clsx from 'clsx'

const dailyVerse = {
  reference: 'Romans 8:28',
  text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  translation: 'NIV',
}

const quickActions = [
  { icon: Sparkles, label: 'Ask AI', desc: 'Explain any verse', to: '/ai-study', color: 'from-violet-500/20 to-purple-500/10 border-violet-500/25' },
  { icon: BookOpen, label: 'Read Bible', desc: 'Continue reading', to: '/bible', color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/25' },
  { icon: Heart, label: 'Devotional', desc: "Today's reflection", to: '/devotionals', color: 'from-rose-500/20 to-pink-500/10 border-rose-500/25' },
  { icon: Trophy, label: 'Challenges', desc: 'Earn XP & badges', to: '/profile', color: 'from-gold-500/20 to-amber-500/10 border-gold-500/25' },
]

const recentStudies = [
  { title: 'The Sermon on the Mount', book: 'Matthew 5-7', time: '2h ago', progress: 75 },
  { title: "Paul's Letter to Romans", book: 'Romans 1-8', time: 'Yesterday', progress: 45 },
  { title: 'The Creation Account', book: 'Genesis 1-2', time: '3 days ago', progress: 100 },
]

const readingPlans = [
  { title: 'Bible in a Year', progress: 42, days: 365, color: 'text-emerald-400 bg-emerald-500/15' },
  { title: 'Faith During Trials', progress: 60, days: 30, color: 'text-blue-400 bg-blue-500/15' },
  { title: 'Prayer & Worship', progress: 20, days: 21, color: 'text-violet-400 bg-violet-500/15' },
]

const achievements = [
  { icon: '📖', label: 'Scholar', earned: true },
  { icon: '🔥', label: 'Streak 7', earned: true },
  { icon: '⭐', label: 'Memorizer', earned: true },
  { icon: '🙏', label: 'Prayer Warrior', earned: false },
  { icon: '✝️', label: 'Gospel Reader', earned: false },
]

export default function Dashboard() {
  const [moodSelected, setMoodSelected] = useState(null)
  const moods = [
    { icon: Sun, label: 'Joyful', color: 'text-yellow-400' },
    { icon: Cloud, label: 'Struggling', color: 'text-blue-400' },
    { icon: Moon, label: 'Peaceful', color: 'text-violet-400' },
  ]

  return (
    <div className="page-container py-6 space-y-8 animate-fade-in">

      {/* Hero — Daily Verse */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 border border-navy-700/40 p-6 sm:p-8 verse-card-glow">
        {/* Decorative stars */}
        <div className="absolute top-4 right-8 w-1 h-1 bg-gold-400 rounded-full opacity-60 animate-float" />
        <div className="absolute top-12 right-20 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-gold-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-gold">✨ Verse of the Day</span>
            <span className="badge-navy">{dailyVerse.translation}</span>
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-4 text-balance">
            "{dailyVerse.text}"
          </blockquote>

          <p className="text-gold-400 font-semibold text-sm mb-6">— {dailyVerse.reference}</p>

          <div className="flex flex-wrap gap-3">
            <Link to="/ai-study" className="btn-primary flex items-center gap-2 text-sm">
              <Sparkles size={15} />
              Explain This Verse
            </Link>
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <BookMarked size={15} />
              Save to Notes
            </button>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { label: 'Day Streak', value: '7', icon: Flame, color: 'text-orange-400 bg-orange-500/15' },
          { label: 'Verses Read', value: '284', icon: BookOpen, color: 'text-blue-400 bg-blue-500/15' },
          { label: 'Total XP', value: '1,420', icon: Zap, color: 'text-gold-400 bg-gold-500/15' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-4 text-center card-hover cursor-pointer">
            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2', color)}>
              <Icon size={16} className={color.split(' ')[0]} />
            </div>
            <p className="text-white font-bold text-xl">{value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading text-xl">Quick Study</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ icon: Icon, label, desc, to, color }) => (
            <Link key={label} to={to} className={clsx(
              'glass-card p-4 card-hover cursor-pointer bg-gradient-to-br border',
              color
            )}>
              <Icon size={22} className="text-white mb-3" />
              <p className="font-semibold text-white text-sm">{label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mood Check */}
      <section className="glass-card p-5">
        <h3 className="font-semibold text-white mb-1">How are you feeling today?</h3>
        <p className="text-slate-400 text-sm mb-4">Get a devotional tailored to your heart</p>
        <div className="flex gap-3">
          {moods.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              onClick={() => setMoodSelected(label)}
              className={clsx(
                'flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border transition-all duration-200',
                moodSelected === label
                  ? 'bg-gold-500/20 border-gold-500/40 text-gold-400'
                  : 'border-navy-700/40 text-slate-400 hover:border-navy-600/60 hover:text-white'
              )}
            >
              <Icon size={20} className={moodSelected === label ? 'text-gold-400' : color} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
        {moodSelected && (
          <Link to="/devotionals" className="btn-primary w-full mt-3 flex items-center justify-center gap-2 text-sm">
            <Heart size={15} />
            Generate Devotional for {moodSelected} Heart
          </Link>
        )}
      </section>

      {/* Continue Reading */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading text-xl">Continue Reading</h2>
          <Link to="/bible" className="text-gold-400 text-sm hover:text-gold-300 flex items-center gap-1">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentStudies.map((study) => (
            <Link key={study.title} to="/bible" className="glass-card p-4 flex items-center gap-4 card-hover cursor-pointer block">
              <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} className="text-gold-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">{study.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{study.book} · {study.time}</p>
                <div className="mt-2 bg-navy-700/40 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all"
                    style={{ width: `${study.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-gold-400 font-semibold text-sm">{study.progress}%</p>
                {study.progress === 100 && <p className="text-emerald-400 text-xs">Done ✓</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reading Plans */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading text-xl">My Reading Plans</h2>
          <Link to="/reading-plans" className="text-gold-400 text-sm hover:text-gold-300 flex items-center gap-1">
            Explore <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {readingPlans.map((plan) => (
            <div key={plan.title} className="glass-card p-4 flex items-center gap-4 card-hover cursor-pointer">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', plan.color.split(' ')[1])}>
                <TrendingUp size={18} className={plan.color.split(' ')[0]} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{plan.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{plan.days}-day plan</p>
                <div className="mt-2 bg-navy-700/40 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-current"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
              </div>
              <p className={clsx('font-semibold text-sm flex-shrink-0', plan.color.split(' ')[0])}>{plan.progress}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Achievements</h3>
          <span className="badge-gold">3/5 Earned</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={clsx(
                'flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all',
                a.earned
                  ? 'border-gold-500/30 bg-gold-500/10'
                  : 'border-navy-700/30 bg-navy-800/30 opacity-50'
              )}
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="text-xs text-slate-400 font-medium">{a.label}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}