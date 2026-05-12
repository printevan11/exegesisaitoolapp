// Bible API service
// Using bible.helloao.org endpoints (your provided "available_translations.json" source)
const BIBLE_API_BASE = 'https://bible.helloao.org/api'


const getApiKey = () => import.meta.env?.VITE_BIBLE_API_KEY

// Bible translation IDs (Scripture API)
export const TRANSLATION_IDS = {
  ESV: 'c7fb1b34c6d1e3f6-01'
}


export const bibleService = {
  async getBooks() {
    const apiKey = getApiKey()
    if (!apiKey) throw new Error('Missing VITE_BIBLE_API_KEY. Create a .env file based on .env.example')

    try {
      // Scripture API: /bibles contains list of bible translations.
      // We need book list per translation; simplest is to fetch a default translation first and then query books.
      // However, existing UI expects book names; we’ll pull books from ESV by default.
      const translationId = TRANSLATION_IDS.ESV
      const res = await fetch(`${BIBLE_API_BASE}/bibles/${translationId}/books`, {
        headers: { Authorization: `Token ${apiKey}` }
      })
      const data = await res.json()
      return data.data || []
    } catch (err) {
      console.error('Error fetching books:', err)
      return []
    }
  },

  async getChapter(bookId, chapterId, translationId = TRANSLATION_IDS.ESV) {

    const apiKey = getApiKey()
    if (!apiKey) throw new Error('Missing VITE_BIBLE_API_KEY. Create a .env file based on .env.example')

    try {
      const res = await fetch(
        `${BIBLE_API_BASE}/bibles/${translationId}/chapters/${bookId}${chapterId}?content-type=html&include-notes=false`,
        { headers: { Authorization: `Token ${apiKey}` } }
      )
      const data = await res.json()
      // API typically returns structured text inside data.data.content (HTML). We'll extract raw text client-side.
      return data.data?.content || null
    } catch (err) {
      console.error('Error fetching chapter:', err)
      return null
    }
  },

  async searchVerses(query, translationId = TRANSLATION_IDS.ESV) {
    const apiKey = getApiKey()
    if (!apiKey) throw new Error('Missing VITE_BIBLE_API_KEY. Create a .env file based on .env.example')

    try {
      const res = await fetch(
        `${BIBLE_API_BASE}/bibles/${translationId}/search?query=${encodeURIComponent(query)}&limit=50`,
        { headers: { Authorization: `Token ${apiKey}` } }
      )
      const data = await res.json()
      return data.data?.verses || []
    } catch (err) {
      console.error('Error searching verses:', err)
      return []
    }
  },

  async getVerse(bookId, chapterId, verseId, translationId = TRANSLATION_IDS.ESV) {
    const apiKey = getApiKey()
    if (!apiKey) throw new Error('Missing VITE_BIBLE_API_KEY. Create a .env file based on .env.example')

    try {
      const res = await fetch(
        `${BIBLE_API_BASE}/bibles/${translationId}/verses/${bookId}${chapterId}:${verseId}?content-type=text`,
        { headers: { Authorization: `Token ${apiKey}` } }
      )
      const data = await res.json()
      return data.data || null
    } catch (err) {
      console.error('Error fetching verse:', err)
      return null
    }
  }
}

