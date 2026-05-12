import React, { useState } from 'react'
import { Heart, Sparkles, RefreshCw, Sun, Cloud, Moon, Zap, Shield, BookOpen, Star } from 'lucide-react'
import clsx from 'clsx'

const topics = [
  { icon: '💪', label: 'Strength', color: 'from-orange-500/20 border-orange-500/25' },
  { icon: '🙏', label: 'Prayer', color: 'from-blue-500/20 border-blue-500/25' },
  { icon: '❤️', label: 'Love', color: 'from-rose-500/20 border-rose-500/25' },
  { icon: '🕊️', label: 'Peace', color: 'from-teal-500/20 border-teal-500/25' },
  { icon: '🌟', label: 'Hope', color: 'from-yellow-500/20 border-yellow-500/25' },
  { icon: '🛡️', label: 'Faith', color: 'from-violet-500/20 border-violet-500/25' },
  { icon: '😢', label: 'Grief', color: 'from-slate-500/20 border-slate-500/25' },
  { icon: '🎯', label: 'Purpose', color: 'from-emerald-500/20 border-emerald-500/25' },
]

const sampleDevotional = {
  title: 'Finding Peace in the Storm',
  verse: 'John 16:33',
  verseText: '"I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world."',
  reflection: "Life often brings storms — unexpected hardships, loss, confusion, or fear. But Jesus doesn't promise a storm-free life; He promises His presence in the middle of every storm. This verse is a realistic yet profoundly hopeful anchor. Jesus acknowledges the reality of trouble while simultaneously declaring His ultimate victory over it.\n\nWhen you're in the middle of a difficult season, remember that your peace is not dependent on your circumstances. It's anchored in the One who has already overcome everything you're facing.",
  prayer: "Lord Jesus, in the midst of this storm, I choose to fix my eyes on You. When anxiety rises and fear threatens to overwhelm me, remind me of Your words — that You have overcome the world. Let Your peace, which surpasses all understanding, guard my heart today. Amen.",
  action: [
    'Write down one fear or worry, then write John 16:33 beside it as God\'s response',
    'Spend 5 minutes in silence, focusing on God\'s presence rather than your problem',
    'Share this verse with someone who is struggling today',
  ],
  relatedVerses: ['Philippians 4:6-7', 'Psalm 23:4', 'Isaiah 41:10', 'Matthew 11:28'],
}

export default function Devotionals() {
  const [selectedTopics, setSelectedTopics] = useState([])
  const [devotional, setDevotional] = useState(sampleDevotional)
  const [generating, setGenerating] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const toggleTopic = (label) => {
    setSelectedTopics(prev =>
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    )
  }

  const generateDevotional = async () => {
    setGenerating(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
  }

  return (
    <div className="page-container py-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 badge-gold mb-4">
          <Heart size={12} />
          Daily Devotionals
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Your Daily Bread</h1>
        <p className="text-slate-400 max-w-md mx-auto">Personalized devotionals crafted for your spiritual journey today</p>
      </div>

      {/* Generator */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-1">Generate a Devotional</h3>
        <p className="text-slate-400 text-sm mb-4">Select what's on your heart or describe your situation</p>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
          {topics.map(({ icon, label, color }) => (
            <button
              key={label}
              onClick={() => toggleTopic(label)}
              className={clsx(
                'flex flex-col items-center gap-1.5 py-3 rounded-xl border bg-gradient-to-b transition-all',
                selectedTopics.includes(label)
                  ? 'border-gold-500/50 bg-gold-500/15 scale-105'
                  : `${color} hover:scale-105`
              )}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs text-slate-400 font-medium">{label}</span>
            </button>
          ))}
        </div>

        <textarea
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          placeholder="Or describe what you're going through... (e.g., 'I'm feeling anxious about my job situation')"
          className="input-field w-full text-sm resize-none mb-4"
          rows={3}
        />

        <button
          onClick={generateDevotional}
          disabled={generating}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Crafting your devotional...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Devotional
            </>
          )}
        </button>
      </div>

      {/* Today's Devotional */}
      {devotional && (
        <div className="space-y-4 animate-slide-up">
          {/* Title */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 border border-navy-600/40 p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <span className="badge-gold mb-3 inline-block">✨ Today's Devotional</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">{devotional.title}</h2>
              <div className="verse-highlight mb-2">
                <p className="font-serif text-base sm:text-lg text-slate-200 italic leading-relaxed">
                  {devotional.verseText}
                </p>
              </div>
              <p className="text-gold-400 font-semibold text-sm">— {devotional.verse}</p>
            </div>
          </div>

          {/* Reflection */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BookOpen size={14} className="text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Reflection</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{devotional.reflection}</p>
          </div>

          {/* Prayer */}
          <div className="glass-card p-6 bg-gradient-to-br from-violet-500/5 to-transparent border-violet-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <span className="text-sm">🙏</span>
              </div>
              <h3 className="font-semibold text-white">Prayer</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm italic">{devotional.prayer}</p>
          </div>

          {/* Action Steps */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Action Steps</h3>
            </div>
            <div className="space-y-3">
              {devotional.action.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Verses */}
          <div className="glass-card p-5">
            <h4 className="font-semibold text-white text-sm mb-3">Related Verses</h4>
            <div className="flex flex-wrap gap-2">
              {devotional.relatedVerses.map(verse => (
                <span key={verse} className="badge-gold cursor-pointer hover:bg-gold-500/30 transition-colors">
                  {verse}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}