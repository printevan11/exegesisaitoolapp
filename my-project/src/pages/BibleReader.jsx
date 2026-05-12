import { useEffect, useMemo, useState } from 'react'

import {
  Search,
  BookMarked,
  Highlighter,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  Type,
  Columns2,
} from 'lucide-react'
import clsx from 'clsx'
import { bibleService, TRANSLATION_IDS } from '../services/bibleService'

function stripHtmlToText(html) {

  if (!html) return ''
  const withoutScripts = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
  const withoutStyles = withoutScripts.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
  const text = withoutStyles.replace(/<[^>]+>/g, ' ')
  return text.replace(/\s+/g, ' ').trim()
}

export default function BibleReader() {
  const [selectedBook, setSelectedBook] = useState('Romans')
  const [selectedChapter, setSelectedChapter] = useState(8)
  const selectedTranslation = 'ESV'

  const [fontSize, setFontSize] = useState('base')
  const [highlightedVerses, setHighlightedVerses] = useState(new Set())
  const [bookmarkedVerses, setBookmarkedVerses] = useState(new Set())
  const [readerMode, setReaderMode] = useState('single')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const [bookOptions, setBookOptions] = useState([])
  const [loadingChapter, setLoadingChapter] = useState(false)
  const [chapterError, setChapterError] = useState('')

  const [verses, setVerses] = useState([])

  const fontSizes = { sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' }

  useEffect(() => {
    // Load books list once so the dropdown is accurate
    let alive = true
    bibleService
      .getBooks()
      .then(data => {
        if (!alive) return
        setBookOptions(data || [])
      })
      .catch(() => {
        if (!alive) return
        setBookOptions([])
      })

    return () => {
      alive = false
    }
  }, [])

  // Your Bible API token may be limited to a single translation.
  // Always load ESV so the reader remains functional.
  const translationId = useMemo(() => TRANSLATION_IDS.ESV, [])


  const selectedBookId = useMemo(() => {
    // Scripture API bookId is not the same as the display name.
    // bookOptions typically contains objects with { id, name }.
    const hit = bookOptions.find(b => b.name === selectedBook)
    return hit?.id || selectedBook
  }, [bookOptions, selectedBook])

  useEffect(() => {
    let alive = true
    const run = async () => {
      setLoadingChapter(true)
      setChapterError('')
      try {
        const html = await bibleService.getChapter(String(selectedBookId), String(selectedChapter), translationId)
        if (!alive) return null

        const rawText = stripHtmlToText(html)


        // If chapter isn't available the API may return null/empty HTML.
        if (!rawText) {
          setChapterError('This chapter is not available in ESV right now. Try another chapter or book.')
          setVerses([])
          return
        }


        // For now, keep the entire chapter text as a single "verse" entry.
        // This guarantees verses will render even if the API's HTML format is
        // different from what we expected.
        setVerses([{ verse: 1, text: rawText }])

      } catch (e) {
        if (!alive) {
          return
        }
        setChapterError(e?.message || 'Failed to load chapter')
        setVerses([])
      }

      if (alive) {
        setLoadingChapter(false)
      }

    }

    run()
    return () => {
      alive = false
    }
  }, [selectedBookId, selectedChapter, translationId])

  const toggleHighlight = (v) => {
    const s = new Set(highlightedVerses)
    s.has(v) ? s.delete(v) : s.add(v)
    setHighlightedVerses(s)
  }

  const toggleBookmark = (v) => {
    const s = new Set(bookmarkedVerses)
    s.has(v) ? s.delete(v) : s.add(v)
    setBookmarkedVerses(s)
  }

  return (
    <div className="min-h-screen">
      {/* Bible Reader Header */}
      <div className="sticky top-[73px] z-10 bg-navy-950/90 backdrop-blur-sm border-b border-navy-700/40 px-4 sm:px-6 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-2">
          {/* Book selector */}
          <select
            value={selectedBook}
            onChange={e => setSelectedBook(e.target.value)}
            className="input-field text-sm py-2 flex-1 min-w-0 max-w-[220px] cursor-pointer"
          >
            {bookOptions.length > 0 ? (
              bookOptions.map(b => (
                <option key={b.id || b.name} value={b.name || b.id}>
                  {b.name || b.id}
                </option>
              ))
            ) : (
              // Minimal fallback if API is unavailable
              ['Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Isaiah', 'Matthew', 'Mark', 'Luke', 'John', 'Romans', 'Galatians', 'Ephesians', 'Philippians', 'Hebrews', 'Revelation'].map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))
            )}
          </select>

          {/* Chapter */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSelectedChapter(c => Math.max(1, c - 1))} className="btn-ghost p-2">
              <ChevronLeft size={16} />
            </button>
            <span className="text-white font-semibold text-sm w-16 text-center">Ch. {selectedChapter}</span>
            <button onClick={() => setSelectedChapter(c => c + 1)} className="btn-ghost p-2">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Translation (ESV only) */}
          <div className="input-field text-sm py-2 cursor-default min-w-[80px] text-center">
            ESV
          </div>


          {/* Tools */}
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setShowSearch(!showSearch)} className={clsx('btn-ghost p-2', showSearch && 'text-gold-400 bg-gold-500/10')}>
              <Search size={16} />
            </button>
            <button
              onClick={() => setReaderMode(r => (r === 'single' ? 'split' : 'single'))}
              className={clsx('btn-ghost p-2 hidden sm:flex', readerMode === 'split' && 'text-gold-400 bg-gold-500/10')}
            >
              <Columns2 size={16} />
            </button>
            {['sm', 'base', 'lg'].map(size => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={clsx('btn-ghost px-2 py-1 text-xs hidden sm:block', fontSize === size && 'text-gold-400')}
              >
                <Type size={size === 'sm' ? 12 : size === 'base' ? 15 : 18} />
              </button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        {showSearch && (
          <div className="max-w-4xl mx-auto mt-3">
            <input
              autoFocus
              type="text"
              placeholder='Search by verse, keyword, topic, or character...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field w-full text-sm"
              disabled
            />
            <p className="text-xs text-slate-500 mt-1">Search UI is currently disabled; the chapter loader is enabled.</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className={clsx('gap-8', readerMode === 'split' ? 'grid grid-cols-2' : '')}>
          {/* Main Reading */}
          <div>
            {/* Chapter heading */}
            <div className="mb-8 text-center">
              <h2 className="font-serif text-3xl font-bold text-white">{selectedBook}</h2>
              <p className="text-gold-400 font-medium mt-1">Chapter {selectedChapter} · {selectedTranslation}</p>
            </div>

            {/* Verses */}
            <div className="space-y-1">
              {loadingChapter && (
                <div className="text-slate-400 text-sm">Loading chapter…</div>
              )}

              {chapterError && (
                <div className="text-red-400 text-sm">
                  {chapterError}
                </div>
              )}

              {!loadingChapter && !chapterError && verses.map(({ verse, text }) => (
                <div
                  key={`${verse}-${text.slice(0, 10)}`}
                  className={clsx(
                    'group flex gap-4 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-navy-800/40',
                    highlightedVerses.has(verse) && 'bg-gold-500/8 border-l-2 border-gold-500 pl-2'
                  )}
                >
                  <span className="text-gold-500 font-bold text-xs mt-1 w-6 flex-shrink-0 font-mono">{verse}</span>
                  <p className={clsx('text-slate-200 leading-relaxed flex-1', fontSizes[fontSize])}>{text}</p>

                  <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => toggleHighlight(verse)}
                      className={clsx('p-1 rounded-md transition-colors', highlightedVerses.has(verse) ? 'text-gold-400' : 'text-slate-600 hover:text-gold-400')}
                      title="Highlight"
                    >
                      <Highlighter size={13} />
                    </button>
                    <button
                      onClick={() => toggleBookmark(verse)}
                      className={clsx('p-1 rounded-md transition-colors', bookmarkedVerses.has(verse) ? 'text-gold-400' : 'text-slate-600 hover:text-gold-400')}
                      title="Bookmark"
                    >
                      <BookMarked size={13} />
                    </button>
                    <button className="p-1 rounded-md text-slate-600 hover:text-blue-400 transition-colors" title="Add note">
                      <StickyNote size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {!loadingChapter && !chapterError && verses.length === 0 && (
                <div className="text-slate-500 text-sm">No chapter text available.</div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-navy-700/40">
              <button
                onClick={() => setSelectedChapter(c => Math.max(1, c - 1))}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <ChevronLeft size={16} />
                Chapter {selectedChapter - 1}
              </button>
              <span className="text-slate-500 text-sm">{selectedBook} {selectedChapter}</span>
              <button
                onClick={() => setSelectedChapter(c => c + 1)}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                Chapter {selectedChapter + 1}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Split Column — Notes / Cross-refs */}
          {readerMode === 'split' && (
            <div className="space-y-6">
              <div className="glass-card p-4">
                <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                  <StickyNote size={14} className="text-gold-400" />
                  Study Notes
                </h4>
                <textarea
                  className="input-field w-full text-sm resize-none min-h-[120px]"
                  placeholder="Write your personal notes for this chapter..."
                />
              </div>

              <div className="glass-card p-4">
                <h4 className="font-semibold text-white text-sm mb-3">Cross References</h4>
                <div className="space-y-2">
                  {['John 3:17', 'Jeremiah 29:11', 'Psalm 23:6', 'Isaiah 41:10'].map(ref => (
                    <div key={ref} className="flex items-center gap-2 text-sm cursor-pointer hover:text-gold-400 transition-colors">
                      <ChevronRight size={12} className="text-gold-500" />
                      <span className="text-gold-400 font-medium">{ref}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4">
                <h4 className="font-semibold text-white text-sm mb-3">Bookmarked Verses</h4>
                <div className="space-y-2">
                  {[...bookmarkedVerses].map(v => (
                    <div key={v} className="badge-gold inline-block">
                      {selectedBook} {selectedChapter}:{v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

