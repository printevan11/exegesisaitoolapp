// Google Gemini AI service
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

const getApiKey = () => {
  // Vite exposes env vars prefixed with VITE_
  const key = import.meta.env?.VITE_GEMINI_API_KEY
  return key
}

const buildSystemInstruction = ({ language, studyMode }) => {
  return `You are an expert biblical scholar and theological assistant named "Exegesis AI". You help users deeply understand Scripture through:
- Historical and cultural context
- Original language insights (Greek/Hebrew)
- Theological meaning and significance
- Practical modern application
- Cross-references and related passages
- Commentary-style explanations

${language === 'Tagalog' ? 'Please respond primarily in Tagalog/Filipino language.' : 'Respond in English.'}
${studyMode === 'deep' ? 'Provide an in-depth academic-level analysis with Greek/Hebrew word studies, historical background, and multiple theological perspectives.' : 'Provide a clear, accessible explanation suitable for all levels of Bible study.'}

Format your responses with clear sections. When referencing Bible verses, include the book, chapter, and verse number. Be reverent, scholarly, and practical.`
}

export const geminiService = {
  async chat(messages, _systemPrompt, language = 'English', studyMode = 'standard') {
    const GEMINI_API_KEY = getApiKey()
    if (!GEMINI_API_KEY) {
      throw new Error('Missing VITE_GEMINI_API_KEY. Create a .env file based on .env.example')
    }

    try {
      const contents = (messages || [])
        .filter(m => m?.content)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))

      const systemInstruction = buildSystemInstruction({ language, studyMode })

      const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data?.error?.message || `Gemini request failed with status ${response.status}`
        throw new Error(msg)
      }

      if (data?.error?.message) throw new Error(data.error.message)

      return data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process that. Please try again."
    } catch (err) {
      console.error('Error calling Gemini API:', err)
      throw err
    }
  },

  async explainVerse(verse, translation = 'ESV', language = 'English') {
    const GEMINI_API_KEY = getApiKey()
    if (!GEMINI_API_KEY) {
      throw new Error('Missing VITE_GEMINI_API_KEY. Create a .env file based on .env.example')
    }

    try {
      const prompt = `Explain the following Bible verse in detail. Include historical context, original language insights, theological significance, and modern application. Format clearly with sections.

Verse: ${verse}
Translation: ${translation}
${language === 'Tagalog' ? 'Language: Tagalog/Filipino' : 'Language: English'}`

      const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        const msg = data?.error?.message || `Gemini request failed with status ${response.status}`
        throw new Error(msg)
      }

      return data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    } catch (err) {
      console.error('Error explaining verse:', err)
      throw err
    }
  }
}

