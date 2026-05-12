import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Home, BookOpen, Sparkles, Heart, Mic2, Users, User,
  BookMarked, Flame, Trophy, X, ChevronRight, Cross
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/bible', icon: BookOpen, label: 'Bible Reader' },
  { to: '/ai-study', icon: Sparkles, label: 'AI Study' },
  { to: '/devotionals', icon: Heart, label: 'Devotionals' },
  { to: '/sermons', icon: Mic2, label: 'Sermon Builder' },
  { to: '/reading-plans', icon: BookMarked, label: 'Reading Plans' },
  { to: '/community', icon: Users, label: 'Community' },
]

export default function Sidebar({ mobile, onClose }) {
  return (
    <aside className={clsx(
      'flex flex-col h-full bg-navy-900/95 backdrop-blur-md border-r border-navy-700/40',
      mobile ? 'w-72' : 'w-64 fixed inset-y-0 left-0 hidden lg:flex z-30'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-navy-700/40">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-shadow">
            <BookOpen size={18} className="text-navy-950" />
          </div>
          <div>
            <p className="font-serif font-semibold text-white text-base leading-none">Exegesis</p>
            <p className="text-gold-400 text-xs font-medium tracking-widest uppercase leading-none mt-0.5">AI</p>
          </div>
        </Link>
        {mobile && (
          <button onClick={onClose} className="btn-ghost p-2 -mr-1">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Streak Banner */}
      <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-gold-500/15 to-amber-500/10 border border-gold-500/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <Flame size={16} className="text-gold-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Daily Streak</p>
            <p className="text-white font-semibold text-sm">7 Days 🔥</p>
          </div>
          <div className="ml-auto">
            <span className="badge-gold">Active</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">Main</p>
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
              isActive
                ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20'
                : 'text-slate-400 hover:text-white hover:bg-navy-800/60'
            )}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={clsx(
                  'transition-colors',
                  isActive ? 'text-gold-400' : 'text-slate-500 group-hover:text-slate-300'
                )} />
                <span>{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </>
            )}
          </NavLink>
        ))}

        <div className="divider my-4" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">Account</p>
        <NavLink
          to="/profile"
          onClick={mobile ? onClose : undefined}
          className={({ isActive }) => clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
            isActive
              ? 'bg-gold-500/15 text-gold-400 border border-gold-500/20'
              : 'text-slate-400 hover:text-white hover:bg-navy-800/60'
          )}
        >
          {({ isActive }) => (
            <>
              <User size={18} className={clsx(
                isActive ? 'text-gold-400' : 'text-slate-500 group-hover:text-slate-300'
              )} />
              <span>Profile</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* Bottom Card */}
      <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-navy-800/80 to-navy-900/60 border border-navy-600/30">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={14} className="text-gold-400" />
          <p className="text-xs font-semibold text-gold-400">Daily Challenge</p>
        </div>
        <p className="text-xs text-slate-400 mb-3">Memorize John 3:16 and earn 50 XP today!</p>
        <button className="w-full btn-primary text-xs py-2">Start Challenge</button>
      </div>
    </aside>
  )
}