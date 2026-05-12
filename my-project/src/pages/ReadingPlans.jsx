import React, { useState } from 'react'
import { BookMarked, TrendingUp, Calendar, Clock, ChevronRight, Check } from 'lucide-react'
import clsx from 'clsx'

const plans = [
  {
    id: 1,
    title: 'Bible in a Year',
    desc: 'Read through the entire Bible in 365 days with daily readings from Old and New Testament.',
    duration: 365,
    progress: 42,
    category: 'Complete Bible',
    emoji: '📖',
    difficulty: 'Committed',
    color: 'from-emerald-500/20 border-emerald-500/25',
    enrolled: true,
  },
  {
    id: 2,
    title: 'Faith During Trials',
    desc: 'A 30-day journey through Scripture passages about perseverance, trust, and God\'s faithfulness.',
    duration: 30,
    progress: 60,
    category: 'Topical',
    emoji: '🛡️',
    difficulty: 'Accessible',
    color: 'from-blue-500/20 border-blue-500/25',
    enrolled: true,
  },
  {
    id: 3,
    title: 'New Believer Journey',
    desc: 'A gentle 21-day introduction to the core truths of the Christian faith.',
    duration: 21,
    progress: 0,
    category: 'Foundation',
    emoji: '🌱',
    difficulty: 'Beginner',
    color: 'from-teal-500/20 border-teal-500/25',
    enrolled: false,
  },
  {
    id: 4,
    title: 'Prayer & Worship',
    desc: 'Deepen your prayer life through 21 days of Psalms and New Testament passages on worship.',
    duration: 21,
    progress: 20,
    category: 'Spiritual Discipline',
    emoji: '🙏',
    difficulty: 'Accessible',
    color: 'from-violet-500/20 border-violet-500/25',
    enrolled: true,
  },
  {
    id: 5,
    title: 'Leadership in Scripture',
    desc: 'A 40-day study of biblical leaders and principles of servant leadership.',
    duration: 40,
    progress: 0,
    category: 'Leadership',
    emoji: '👑',
    difficulty: 'Intermediate',
    color: 'from-gold-500/20 border-gold-500/25',
    enrolled: false,
  },
  {
    id: 6,
    title: 'Spiritual Growth',
    desc: 'A 30-day plan focused on spiritual formation, discipleship, and growing in Christlikeness.',
    duration: 30,
    progress: 0,
    category: 'Formation',
    emoji: '🌟',
    difficulty: 'Intermediate',
    color: 'from-amber-500/20 border-amber-500/25',
    enrolled: false,
  },
]

export default function ReadingPlans() {
  const [filter, setFilter] = useState('All')
  const [enrolled, setEnrolled] = useState(new Set(plans.filter(p => p.enrolled).map(p => p.id)))
  const filters = ['All', 'Enrolled', 'Not Started', 'Beginner']

  const filtered = plans.filter(p => {
    if (filter === 'Enrolled') return enrolled.has(p.id)
    if (filter === 'Not Started') return p.progress === 0
    if (filter === 'Beginner') return p.difficulty === 'Beginner'
    return true
  })

  return (
    <div className="page-container py-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 badge-gold mb-3">
          <BookMarked size={12} />
          Reading Plans
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Your Study Journey</h1>
        <p className="text-slate-400">Structured reading plans to guide your daily Scripture study</p>
      </div>

      {/* My Active Plans */}
      {[...enrolled].length > 0 && (
        <section>
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-gold-400" />
            My Active Plans
          </h2>
          <div className="space-y-3">
            {plans.filter(p => enrolled.has(p.id) && p.progress > 0).map(plan => (
              <div key={plan.id} className="glass-card p-5">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl">{plan.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{plan.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Day {Math.round(plan.duration * plan.progress / 100)} of {plan.duration}</p>
                  </div>
                  <span className="text-gold-400 font-bold">{plan.progress}%</span>
                </div>
                <div className="bg-navy-700/40 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all"
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
                <button className="btn-primary text-sm flex items-center gap-2">
                  <BookMarked size={14} />
                  Continue Today's Reading
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              filter === f ? 'bg-gold-500 text-navy-950' : 'btn-ghost'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* All Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(plan => (
          <div key={plan.id} className={clsx('glass-card p-5 card-hover bg-gradient-to-br border', plan.color)}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{plan.emoji}</span>
              <div className="flex items-center gap-2">
                <span className="badge-navy text-xs">{plan.duration} days</span>
                {enrolled.has(plan.id) && (
                  <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Check size={10} className="inline mr-1" />Enrolled
                  </span>
                )}
              </div>
            </div>
            <h3 className="font-semibold text-white mb-1">{plan.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{plan.desc}</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="badge-navy">{plan.category}</span>
              <span className={clsx('badge', {
                'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20': plan.difficulty === 'Beginner',
                'bg-gold-500/15 text-gold-400 border border-gold-500/20': plan.difficulty === 'Committed',
                'bg-blue-500/15 text-blue-400 border border-blue-500/20': !['Beginner', 'Committed'].includes(plan.difficulty),
              })}>
                {plan.difficulty}
              </span>
            </div>

            {plan.progress > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{plan.progress}%</span>
                </div>
                <div className="bg-navy-700/40 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-gold-500 rounded-full" style={{ width: `${plan.progress}%` }} />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const s = new Set(enrolled)
                if (s.has(plan.id)) s.delete(plan.id)
                else s.add(plan.id)
                setEnrolled(s)
              }}
              className={enrolled.has(plan.id) ? 'btn-secondary w-full text-sm' : 'btn-primary w-full text-sm'}
            >
              {enrolled.has(plan.id) ? (plan.progress > 0 ? 'Continue Reading →' : 'Start Today →') : 'Enroll in Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}