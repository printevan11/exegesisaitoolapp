import React, { useState } from 'react'
import { Menu, Search, Bell, Settings } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Home',
  '/bible': 'Bible Reader',
  '/ai-study': 'AI Study Assistant',
  '/devotionals': 'Daily Devotionals',
  '/sermons': 'Sermon Builder',
  '/reading-plans': 'Reading Plans',
  '/community': 'Community',
  '/profile': 'My Profile',
}

export default function TopBar({ onMenuClick }) {
  const location = useLocation()
  const [showSearch, setShowSearch] = useState(false)
  const title = pageTitles[location.pathname] || 'Exegesis AI'

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 px-4 sm:px-6 py-4 bg-navy-950/80 backdrop-blur-md border-b border-navy-700/30">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="btn-ghost p-2 -ml-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-serif text-lg font-semibold text-white truncate lg:hidden">{title}</h1>
        {showSearch ? (
          <input
            autoFocus
            type="text"
            placeholder="Search verses, topics, characters..."
            className="input-field w-full text-sm hidden lg:block"
            onBlur={() => setShowSearch(false)}
          />
        ) : (
          <p className="text-slate-400 text-sm hidden lg:block">
            Good morning, <span className="text-gold-400 font-medium">Juan</span> — May your study be blessed today
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="btn-ghost p-2"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button className="btn-ghost p-2 relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-gold-400 rounded-full"></span>
        </button>
        <button className="btn-ghost p-2" aria-label="Settings">
          <Settings size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-semibold text-sm ml-1 cursor-pointer hover:ring-2 hover:ring-gold-400/50 transition-all">
          J
        </div>
      </div>
    </header>
  )
}