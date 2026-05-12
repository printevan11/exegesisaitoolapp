import React, { useState } from 'react'
import { Mic2, Sparkles, RefreshCw, Copy, Download, ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import clsx from 'clsx'

const sermonTypes = ['Expository', 'Topical', 'Narrative', 'Evangelistic', 'Devotional']
const audiences = ['Adults', 'Youth', 'Children', 'Mixed Congregation', 'Men\'s Group', 'Women\'s Group']

const sampleSermon = {
  title: 'Unshakeable: Living with Romans 8 Peace',
  type: 'Expository',
  mainVerse: 'Romans 8:28',
  theme: 'God\'s sovereignty and goodness in all circumstances',
  introduction: "We all know what it feels like when life doesn't go according to plan. A job is lost. A relationship ends. A diagnosis changes everything. In those moments, we search for something — or Someone — to anchor our souls. Today, we're going to look at one of the most quoted verses in all of Scripture and discover why it's not just a bumper sticker slogan, but a profound theological anchor for every believer.",
  outline: [
    {
      point: 'I. The Confident Declaration (v. 28a)',
      content: '"And we know" — This is not wishful thinking or optimistic hope. It is certain knowledge rooted in the character of God.',
      verses: ['Romans 8:28', 'Psalm 46:1'],
    },
    {
      point: 'II. The Scope of "All Things" (v. 28b)',
      content: 'God works not just in the good things, but in ALL things — the painful, the confusing, the tragic. Joseph\'s story in Genesis 50:20 illustrates this perfectly.',
      verses: ['Genesis 50:20', 'Jeremiah 29:11'],
    },
    {
      point: 'III. The Qualifying Condition (v. 28c)',
      content: '"For those who love him" — This promise is specifically for believers. It invites self-examination: Do I love God?',
      verses: ['John 14:15', '1 John 4:19'],
    },
    {
      point: 'IV. The Ultimate Purpose (v. 28d)',
      content: '"Called according to his purpose" — God\'s goal is not our comfort but our conformity to Christ (v. 29). The good He is working toward is our holiness.',
      verses: ['Romans 8:29', 'Philippians 1:6'],
    },
  ],
  conclusion: "You may be in a season where nothing makes sense. Hold on. The One who called you is faithful. He is not wasting a single moment of your pain. Take Romans 8:28 not as a platitude, but as a promise — one backed by the full weight of God's eternal purpose and unfailing love.",
  illustrations: [
    "The tapestry analogy: From underneath, the threads look tangled and messy. From above, a masterpiece emerges.",
    "Joseph's life: 13 years of suffering that produced a nation's salvation.",
  ],
  applications: [
    'Journal about a difficult situation and write how God might be working in it',
    'Memorize Romans 8:28 this week',
    'Share the verse with someone who needs encouragement',
  ],
}

export default function SermonBuilder() {
  const [form, setForm] = useState({ verse: '', theme: '', type: 'Expository', audience: 'Adults', duration: '30' })
  const [sermon, setSermon] = useState(sampleSermon)
  const [generating, setGenerating] = useState(false)
  const [expandedPoints, setExpandedPoints] = useState(new Set([0]))

  const togglePoint = (i) => {
    const s = new Set(expandedPoints)
    s.has(i) ? s.delete(i) : s.add(i)
    setExpandedPoints(s)
  }

  const generate = async () => {
    if (!form.verse && !form.theme) return
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2500))
    setGenerating(false)
  }

  return (
    <div className="page-container py-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 badge-gold mb-3">
          <Mic2 size={12} />
          Sermon Builder
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Craft Powerful Sermons</h1>
        <p className="text-slate-400">AI-powered sermon preparation with biblical depth and practical application</p>
      </div>

      {/* Generator Form */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-white">Sermon Parameters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Main Verse / Passage</label>
            <input
              value={form.verse}
              onChange={e => setForm({ ...form, verse: e.target.value })}
              placeholder="e.g., Romans 8:28-39"
              className="input-field w-full text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Sermon Theme</label>
            <input
              value={form.theme}
              onChange={e => setForm({ ...form, theme: e.target.value })}
              placeholder="e.g., God's sovereignty in suffering"
              className="input-field w-full text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Sermon Type</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="input-field w-full text-sm cursor-pointer"
            >
              {sermonTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1.5">Target Audience</label>
            <select
              value={form.audience}
              onChange={e => setForm({ ...form, audience: e.target.value })}
              className="input-field w-full text-sm cursor-pointer"
            >
              {audiences.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">Duration: {form.duration} minutes</label>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
            className="w-full accent-gold-500"
          />
        </div>

        <button
          onClick={generate}
          disabled={generating}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {generating ? (
            <><RefreshCw size={16} className="animate-spin" /> Building your sermon...</>
          ) : (
            <><Sparkles size={16} /> Generate Sermon</>
          )}
        </button>
      </div>

      {/* Generated Sermon */}
      {sermon && (
        <div className="space-y-4 animate-slide-up">
          {/* Title Card */}
          <div className="relative overflow-hidden glass-card p-6 sm:p-8 border-gold-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="badge-gold mb-3 inline-block">{sermon.type} Sermon</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">{sermon.title}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="badge-navy flex items-center gap-1"><BookOpen size={10} /> {sermon.mainVerse}</span>
                  <span className="badge-navy">{form.duration || '30'} min</span>
                  <span className="badge-navy">{form.audience || 'Adults'}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="btn-ghost p-2" title="Copy"><Copy size={16} /></button>
                <button className="btn-ghost p-2" title="Download"><Download size={16} /></button>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="glass-card p-6">
            <h4 className="font-semibold text-gold-400 text-xs uppercase tracking-wider mb-3">Introduction</h4>
            <p className="text-slate-300 leading-relaxed text-sm">{sermon.introduction}</p>
          </div>

          {/* Outline */}
          <div className="glass-card p-6">
            <h4 className="font-semibold text-gold-400 text-xs uppercase tracking-wider mb-4">Sermon Outline</h4>
            <div className="space-y-3">
              {sermon.outline.map((point, i) => (
                <div key={i} className="border border-navy-600/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => togglePoint(i)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-navy-800/40 transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold-400 font-bold text-xs">{i + 1}</span>
                    </div>
                    <p className="font-semibold text-white text-sm flex-1">{point.point}</p>
                    {expandedPoints.has(i) ? <ChevronDown size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />}
                  </button>
                  {expandedPoints.has(i) && (
                    <div className="px-4 pb-4 border-t border-navy-700/40 pt-3">
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">{point.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {point.verses.map(v => (
                          <span key={v} className="badge-gold text-xs cursor-pointer">{v}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="glass-card p-6">
            <h4 className="font-semibold text-gold-400 text-xs uppercase tracking-wider mb-3">Conclusion</h4>
            <p className="text-slate-300 leading-relaxed text-sm">{sermon.conclusion}</p>
          </div>

          {/* Illustrations & Applications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-5">
              <h4 className="font-semibold text-white text-sm mb-3">💡 Illustrations</h4>
              <div className="space-y-2">
                {sermon.illustrations.map((ill, i) => (
                  <p key={i} className="text-slate-400 text-sm leading-relaxed">{ill}</p>
                ))}
              </div>
            </div>
            <div className="glass-card p-5">
              <h4 className="font-semibold text-white text-sm mb-3">✅ Application Points</h4>
              <div className="space-y-2">
                {sermon.applications.map((app, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <ChevronRight size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}