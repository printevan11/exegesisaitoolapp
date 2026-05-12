import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Sparkles, Heart, User } from 'lucide-react'
import clsx from 'clsx'

const items = [
  { to: '/', icon: Home, label: 'Home', end: true },
  { to: '/bible', icon: BookOpen, label: 'Bible' },
  { to: '/ai-study', icon: Sparkles, label: 'AI Study' },
  { to: '/devotionals', icon: Heart, label: 'Devotion' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav fixed bottom-0 inset-x-0 z-30 lg:hidden bg-navy-900/95 backdrop-blur-md border-t border-navy-700/40 flex items-center px-2 py-3">
      {items.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => clsx(
            'flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all duration-200',
            isActive ? 'text-gold-400' : 'text-slate-500'
          )}
        >
          {({ isActive }) => (
            <>
              <div className={clsx(
                'w-10 h-8 flex items-center justify-center rounded-lg transition-all duration-200',
                isActive ? 'bg-gold-500/15' : ''
              )}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className={clsx(
                'text-xs font-medium transition-all',
                isActive ? 'text-gold-400' : 'text-slate-500'
              )}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}