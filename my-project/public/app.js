// =============================================
//   EXEGESIS AI – MAIN APP JS
// =============================================

const CLAUDE_API = "https://api.anthropic.com/v1/messages";
let currentScreen = 'home';
let currentLang = 'en';
let studyMode = 'simple';
let currentBook = null;
let currentChapter = 1;
let currentVerseData = null;
let selectedMood = 'peaceful';
let selectedTopic = 'Faith';
let isDark = true;

// ============ SPLASH & INIT ============
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('main-app').classList.remove('hidden');
      setGreeting();
      renderBooks('ot');
    }, 600);
  }, 2200);
});

function setGreeting() {
  const h = new Date().getHours();
  const el = document.getElementById('greeting-text');
  if (h < 12) el.textContent = 'Good morning,';
  else if (h < 17) el.textContent = 'Good afternoon,';
  else el.textContent = 'Good evening,';
}

// ============ SCREEN NAVIGATION ============
function switchScreen(name, btn) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');
  const navBtn = btn || document.getElementById('nav-' + name);
  if (navBtn) navBtn.classList.add('active');
  currentScreen = name;
}

// ============ BIBLE DATA ============
const OT_BOOKS = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
const NT_BOOKS = ['Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation'];

const SAMPLE_VERSES = {
  'John': {
    3: [
      { n:1, t:"There was a man of the Pharisees named Nicodemus, a ruler of the Jews." },
      { n:2, t:"He came to Jesus at night and said, \"Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him.\"" },
      { n:3, t:"Jesus replied, \"Very truly I tell you, no one can see the kingdom of God unless they are born again.\"" },
      { n:4, t:"\"How can someone be born when they are old?\" Nicodemus asked. \"Surely they cannot enter a second time into their mother's womb to be born!\"" },
      { n:5, t:"Jesus answered, \"Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.\"" },
      { n:6, t:"Flesh gives birth to flesh, but the Spirit gives birth to spirit." },
      { n:7, t:"You should not be surprised at my saying, 'You must be born again.'" },
      { n:8, t:"The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit." },
      { n:14, t:"Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up," },
      { n:15, t:"that everyone who believes may have eternal life in him." },
      { n:16, t:"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
      { n:17, t:"For God did not send his Son into the world to condemn the world, but to save the world through him." }
    ]
  },
  'Romans': {
    8: [
      { n:1, t:"Therefore, there is now no condemnation for those who are in Christ Jesus," },
      { n:2, t:"because through Christ Jesus the law of the Spirit who gives life has set you free from the law of sin and death." },
      { n:18, t:"I consider that our present sufferings are not worth comparing with the glory that will be revealed in us." },
      { n:26, t:"In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans." },
      { n:28, t:"And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
      { n:38, t:"For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers," },
      { n:39, t:"neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." }
    ]
  },
  'Psalms': {
    23: [
      { n:1, t:"The Lord is my shepherd, I lack nothing." },
      { n:2, t:"He makes me lie down in green pastures, he leads me beside quiet waters," },
      { n:3, t:"he refreshes my soul. He guides me along the right paths for his name's sake." },
      { n:4, t:"Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
      { n:5, t:"You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows." },
      { n:6, t:"Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever." }
    ]
  }
};

const VERSE_DETAILS = {
  'John 3:16': {
    author: 'The Apostle John, likely written 85–90 AD. Audience: Believers and seekers in the early church.',
    context: 'Jesus spoke these words to Nicodemus, a Pharisee and member of the Jewish ruling council, at night. The conversation follows Jesus\' discussion about being "born again" — a concept Nicodemus struggled to understand. John 3:16 is the theological heart of the Gospel.',
    greek: [
      { w: 'ἠγάπησεν', trans: 'ēgapēsen', def: 'Loved — from agapaō; unconditional, self-sacrificial love. Not eros (romantic) nor phileo (friendship), but divine, covenant love that gives at great cost.' },
      { w: 'μονογενῆ', trans: 'monogenē', def: 'One and only / only-begotten — unique, one of a kind. Emphasizes the incomparable nature of the Son sent.' },
      { w: 'αἰώνιον', trans: 'aiōnion', def: 'Eternal — not merely unending duration, but a quality of life belonging to the age to come; divine life itself.' }
    ],
    cross: [
      { ref: 'Romans 5:8', text: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.' },
      { ref: '1 John 4:9', text: 'This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.' },
      { ref: 'Isaiah 53:5', text: 'But he was pierced for our transgressions, he was crushed for our iniquities...' }
    ],
    apply: 'This verse is both an invitation and a declaration. God\'s love is not passive — it acts. Today, let this truth anchor you: you are so valued that God gave what was most precious. Application: Receive this love. Share it. Let "whoever believes" remind you that no one is beyond its reach.',
    oia: '📌 Observe: God gave (action), his one and only Son (cost), whoever believes (scope), shall not perish (consequence avoided), but have eternal life (gift received).\n📖 Interpret: Salvation is initiated by God\'s love, enacted through Christ\'s sacrifice, and received through faith — not works.\n💡 Apply: Ask yourself — do I live in the security of being loved this way? Do I extend this same love to others?'
  }
};

function renderBooks(testament) {
  const books = testament === 'ot' ? OT_BOOKS : NT_BOOKS;
  const grid = document.getElementById('books-grid');
  grid.innerHTML = books.map(b => `<button class="book-btn" onclick="openBook('${b}')">${b}</button>`).join('');
}

function setTestament(t, btn) {
  document.querySelectorAll('.t-tab').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('chapter-reader').classList.add('hidden');
  renderBooks(t);
}

function openBook(book) {
  currentBook = book;
  currentChapter = 1;
  document.querySelectorAll('.book-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === book);
  });
  document.getElementById('books-grid').classList.add('hidden');
  renderChapter();
  document.getElementById('chapter-reader').classList.remove('hidden');
}

function renderChapter() {
  document.getElementById('ch-title').textContent = `${currentBook} ${currentChapter}`;
  const verses = SAMPLE_VERSES[currentBook]?.[currentChapter] || generateSampleVerses(currentBook, currentChapter);
  const content = document.getElementById('chapter-content');
  content.innerHTML = verses.map(v => `
    <div class="verse-row" onclick="openVerseModal('${currentBook}', ${currentChapter}, ${v.n}, \`${v.t.replace(/`/g,"'")}\`)">
      <span class="verse-num">${v.n}</span>
      <span class="verse-text">${v.t}</span>
    </div>
  `).join('');
}

function generateSampleVerses(book, ch) {
  return Array.from({length: 12}, (_, i) => ({
    n: i+1, t: getSampleVerse(book, ch, i+1)
  }));
}

function getSampleVerse(book, ch, v) {
  const samples = [
    "In the beginning God created the heavens and the earth, and all that was in it was good.",
    "The Lord said, Fear not, for I am with you; be not dismayed, for I am your God.",
    "Trust in the Lord with all your heart and lean not on your own understanding.",
    "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    "Be still and know that I am God; I will be exalted among the nations.",
    "The Lord is my light and my salvation — whom shall I fear?",
    "Come to me, all you who are weary and burdened, and I will give you rest.",
    "I can do all things through Christ who strengthens me.",
    "For the word of God is alive and active, sharper than any double-edged sword.",
    "Now faith is confidence in what we hope for and assurance about what we do not see.",
    "If we confess our sins, he is faithful and just and will forgive us our sins.",
    "And the peace of God, which transcends all understanding, will guard your hearts."
  ];
  return samples[(v - 1) % samples.length];
}

function prevChapter() {
  if (currentChapter > 1) { currentChapter--; renderChapter(); }
  else {
    document.getElementById('chapter-reader').classList.add('hidden');
    document.getElementById('books-grid').classList.remove('hidden');
  }
}
function nextChapter() { currentChapter++; renderChapter(); }

function searchBible(query) {
  if (!query) return;
  // Simple search — show relevant books
}

// ============ VERSE MODAL ============
function openVerseModal(book, ch, num, text) {
  currentVerseData = { book, ch, num, text };
  const key = `${book} ${ch}:${num}`;
  const details = VERSE_DETAILS[key] || getGenericDetails(book, ch, num);

  document.getElementById('vm-ref').textContent = key;
  document.getElementById('vm-text').textContent = `"${text}"`;
  document.getElementById('vm-author').textContent = details.author;
  document.getElementById('vm-context').textContent = details.context;
  document.getElementById('vm-apply').textContent = details.apply;
  document.getElementById('vm-oia').textContent = details.oia;

  const greekEl = document.getElementById('vm-greek');
  greekEl.innerHTML = details.greek.map(g => `
    <div class="greek-word-card">
      <div class="greek-original">${g.w}</div>
      <div class="greek-trans">${g.trans}</div>
      <div class="greek-def">${g.def}</div>
    </div>
  `).join('');

  const crossEl = document.getElementById('vm-cross');
  crossEl.innerHTML = details.cross.map(c => `
    <div class="cross-ref-item" onclick="closeModal('verse-modal')">
      <div class="cross-ref-ref">${c.ref}</div>
      <div class="cross-ref-text">${c.text}</div>
    </div>
  `).join('');

  setVerseTab('context', document.querySelector('.vtab'));
  document.getElementById('verse-modal').classList.remove('hidden');
}

function getGenericDetails(book, ch, num) {
  return {
    author: `Written in the context of ${book}, chapter ${ch}. The author addresses the community of faith with pastoral care and theological depth.`,
    context: `This verse is part of a larger discourse in ${book}. The original audience would have understood the cultural and religious significance embedded in its language. Read within its literary unit for fuller meaning.`,
    greek: [
      { w: 'κύριος', trans: 'kyrios', def: 'Lord — the sovereign ruler and master; often used to translate the divine name YHWH in the Septuagint, affirming divine authority.' },
      { w: 'πίστις', trans: 'pistis', def: 'Faith / trust — active reliance, not merely intellectual assent; an ongoing posture of trust toward God.' }
    ],
    cross: [
      { ref: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
      { ref: 'Proverbs 3:5', text: 'Trust in the Lord with all your heart and lean not on your own understanding.' }
    ],
    apply: 'Reflect on how this verse speaks into your current season. Scripture is not merely ancient text — it is living and active. Ask: What is God saying to me specifically through these words today?',
    oia: `📌 Observe: What does the text actually say? Identify the key subjects, verbs, and objects.\n📖 Interpret: What did it mean to its original audience?\n💡 Apply: What principle emerges that is timeless and applicable today?`
  };
}

function setVerseTab(tab, btn) {
  document.querySelectorAll('.vtab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('.vtab').forEach(b => b.classList.remove('active'));
  document.getElementById('vtab-' + tab)?.classList.remove('hidden');
  if (btn) btn.classList.add('active');
  else document.querySelectorAll('.vtab')[['context','greek','cross','apply'].indexOf(tab)]?.classList.add('active');
}

function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

function studyVerseAI() {
  closeModal('verse-modal');
  const ref = `${currentVerseData?.book} ${currentVerseData?.ch}:${currentVerseData?.num}`;
  switchScreen('ai');
  document.getElementById('chat-input').value = `Explain ${ref} in detail`;
  sendMessage();
}

function bookmarkCurrentVerse() {
  showToast('🔖 Verse bookmarked!');
  closeModal('verse-modal');
}

// ============ AI CHAT ============
function setLang(lang, btn) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setMode(mode, btn) {
  studyMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function askSuggestion(btn) {
  document.getElementById('chat-input').value = btn.textContent;
  document.getElementById('ai-suggestions').style.display = 'none';
  sendMessage();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';

  const messages = document.getElementById('chat-messages');

  // User bubble
  messages.innerHTML += `
    <div class="chat-bubble user-bubble">
      <div class="bubble-body">
        <p>${escapeHtml(text)}</p>
        <div class="bubble-meta">You · Just now</div>
      </div>
    </div>
  `;

  // Typing indicator
  const typingId = 'typing-' + Date.now();
  messages.innerHTML += `
    <div class="chat-bubble ai-bubble" id="${typingId}">
      <div class="bubble-avatar">✦</div>
      <div class="bubble-body">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
        <div class="bubble-meta">Exegesis AI · Studying…</div>
      </div>
    </div>
  `;
  messages.scrollTop = messages.scrollHeight;

  const systemPrompt = buildSystemPrompt();
  
  try {
    const response = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: text }]
      })
    });

    const data = await response.json();
    const rawText = data.content?.map(c => c.text || '').join('') || 'I encountered an issue. Please try again.';

    document.getElementById(typingId)?.remove();

    const formatted = formatAIResponse(rawText);
    messages.innerHTML += `
      <div class="chat-bubble ai-bubble">
        <div class="bubble-avatar">✦</div>
        <div class="bubble-body">
          ${formatted}
          <div class="bubble-meta">Exegesis AI · ${studyMode === 'deep' ? 'Deep Study' : 'Simple'} · ${currentLang === 'tl' ? 'Tagalog' : 'English'}</div>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById(typingId)?.remove();
    messages.innerHTML += `
      <div class="chat-bubble ai-bubble">
        <div class="bubble-avatar">✦</div>
        <div class="bubble-body">
          <p>I'm having trouble connecting. Please check your connection and try again.</p>
          <div class="bubble-meta">Exegesis AI</div>
        </div>
      </div>
    `;
  }

  messages.scrollTop = messages.scrollHeight;
}

function buildSystemPrompt() {
  const isDeep = studyMode === 'deep';
  const isTagalog = currentLang === 'tl';
  return `You are Exegesis AI — a deeply knowledgeable, reverent, and intelligent biblical scholar and theological assistant built into a premium Bible study app.

Your purpose: Help users understand Scripture deeply — not just read it.

${isTagalog ? 'LANGUAGE: Respond primarily in Tagalog/Filipino. Use respectful, devotional language.' : 'LANGUAGE: Respond in clear, beautiful English.'}

${isDeep ? `DEEP STUDY MODE — Structure your response with these labeled sections:
📜 HISTORICAL CONTEXT: Background of the text
🎭 AUTHOR & AUDIENCE: Who wrote it and to whom
🔤 ORIGINAL LANGUAGE: Key Greek/Hebrew words with transliteration
⛪ THEOLOGICAL MEANING: Core doctrinal significance
🌍 CULTURAL BACKGROUND: Cultural elements original readers would know
✝️ CHRISTOLOGICAL CONNECTION: How it points to Christ (if applicable)
💡 LIFE APPLICATION: Practical application today
🙏 REFLECTION QUESTION: One question to ponder` 
: `SIMPLE MODE — Give a warm, clear, accessible explanation in 3-4 paragraphs:
1. What the verse/topic means simply
2. Historical/cultural context (brief)
3. Theological significance
4. How to apply it today`}

Guidelines:
- Be reverent, accurate, and spiritually insightful
- Use Scripture to interpret Scripture when possible
- Acknowledge different theological perspectives fairly
- Encourage deep personal reflection
- Keep your tone like a trusted biblical mentor
- Never be preachy or condescending
- For complex questions, acknowledge the mystery while providing insight`;
}

function formatAIResponse(text) {
  // Parse section headers and format nicely
  const lines = text.split('\n').filter(l => l.trim());
  let html = '';
  let inSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^[📜🎭🔤⛪🌍✝️💡🙏]/)) {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > -1) {
        const title = trimmed.substring(0, colonIdx + 1);
        const content = trimmed.substring(colonIdx + 1).trim();
        html += `<div class="ai-section"><div class="ai-section-title">${escapeHtml(title)}</div><p>${escapeHtml(content)}</p></div>`;
        inSection = true;
        continue;
      }
    }
    if (trimmed) {
      if (inSection && html.endsWith('</div>')) {
        // Append to last section or start new paragraph
        html += `<p style="margin-top:8px;font-family:var(--font-body);font-size:.86rem;line-height:1.65;color:var(--white-muted)">${escapeHtml(trimmed)}</p>`;
      } else {
        html += `<p>${escapeHtml(trimmed)}</p>`;
      }
    }
  }

  return html || `<p>${escapeHtml(text)}</p>`;
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============ AI STUDY OPENER ============
function openAIStudy(question) {
  switchScreen('ai');
  document.getElementById('nav-ai').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => { if(n.id !== 'nav-ai') n.classList.remove('active'); });
  setTimeout(() => {
    document.getElementById('chat-input').value = question;
    sendMessage();
  }, 100);
}

// ============ DEVOTIONAL GENERATOR ============
function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedMood = btn.dataset.mood;
}

function selectTopic(btn) {
  document.querySelectorAll('.topic-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedTopic = btn.textContent;
}

async function generateDevotion() {
  const btn = document.getElementById('gen-devotion-btn');
  const label = document.getElementById('gen-devotion-label');
  label.textContent = '✦ Generating…';
  btn.disabled = true;

  const prompt = `Generate a personal daily devotional for someone who is feeling ${selectedMood} and wants to reflect on the topic of "${selectedTopic}".

Format your response as JSON (and ONLY JSON, no markdown):
{
  "verse": "The full verse text",
  "ref": "Book Chapter:Verse · Translation",
  "title": "A beautiful devotional title",
  "body": "3-4 paragraphs of devotional reflection (plain text, no formatting)",
  "prayer": "A heartfelt prayer (2-3 sentences)"
}

Make it warm, personal, spiritually rich, theologically sound, and genuinely moving.`;

  try {
    const response = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const rawText = data.content?.map(c => c.text || '').join('') || '';
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    document.getElementById('devo-verse').textContent = `"${parsed.verse}"`;
    document.getElementById('devo-ref').textContent = parsed.ref;
    document.getElementById('devo-title').textContent = parsed.title;
    document.getElementById('devo-body').textContent = parsed.body;
    document.getElementById('devo-prayer').textContent = parsed.prayer;

    document.getElementById('devotion-output').classList.remove('hidden');
  } catch (err) {
    showToast('⚠️ Generation failed. Please try again.');
  }

  label.textContent = '✨ Generate My Devotional';
  btn.disabled = false;
}

// ============ SERMON GENERATOR ============
async function generateSermon() {
  const topic = document.getElementById('sermon-topic').value.trim();
  if (!topic) { showToast('Enter a sermon topic first'); return; }

  const label = document.getElementById('gen-sermon-label');
  label.textContent = '✦ Generating…';

  const prompt = `Create a sermon outline for the topic: "${topic}".

Return ONLY a JSON object:
{
  "title": "Sermon title",
  "theme": "Core theme in one sentence",
  "intro": "Opening hook paragraph",
  "points": [
    {"point": "Point 1 title", "verse": "Key verse", "content": "Brief point content"},
    {"point": "Point 2 title", "verse": "Key verse", "content": "Brief point content"},
    {"point": "Point 3 title", "verse": "Key verse", "content": "Brief point content"}
  ],
  "conclusion": "Conclusion paragraph",
  "callToAction": "Practical response"
}`;

  try {
    const response = await fetch(CLAUDE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const raw = data.content?.map(c => c.text || '').join('') || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    const s = JSON.parse(clean);

    const output = document.getElementById('sermon-output');
    output.innerHTML = `
      <div class="sermon-section">
        <div class="sermon-section-title">✦ Title</div>
        <div class="sermon-content" style="font-family:var(--font-display);font-size:1.05rem;color:var(--gold-light)">${s.title}</div>
      </div>
      <div class="sermon-section">
        <div class="sermon-section-title">🎯 Theme</div>
        <div class="sermon-content">${s.theme}</div>
      </div>
      <div class="sermon-section">
        <div class="sermon-section-title">📢 Introduction</div>
        <div class="sermon-content">${s.intro}</div>
      </div>
      ${s.points.map((p, i) => `
        <div class="sermon-section">
          <div class="sermon-section-title">📌 Point ${i+1}: ${p.point}</div>
          <div class="sermon-content" style="color:var(--gold);font-size:.75rem;margin-bottom:4px">${p.verse}</div>
          <div class="sermon-content">${p.content}</div>
        </div>
      `).join('')}
      <div class="sermon-section">
        <div class="sermon-section-title">🏁 Conclusion</div>
        <div class="sermon-content">${s.conclusion}</div>
      </div>
      <div class="sermon-section">
        <div class="sermon-section-title">🙏 Call to Action</div>
        <div class="sermon-content">${s.callToAction}</div>
      </div>
    `;
    output.classList.remove('hidden');
  } catch(err) {
    showToast('⚠️ Generation failed. Try again.');
  }

  label.textContent = 'Generate Sermon Outline';
}

// ============ MISC ============
function openReadingPlan(plan) {
  showToast('📅 Reading Plan opened');
}

function openCommunity() {
  showToast('🙏 Prayer Wall coming soon');
}

function openSermonGen() {
  switchScreen('devotion');
  document.getElementById('nav-devotion').classList.add('active');
  setTimeout(() => {
    document.getElementById('sermon-topic').focus();
    document.getElementById('sermon-topic').scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

function shareVerse() { showToast('↗ Link copied!'); }
function bookmarkVerse() { showToast('🔖 Verse saved to bookmarks!'); }
function shareDevo() { showToast('↗ Devotional shared!'); }
function saveDevo() { showToast('🔖 Devotional saved!'); }
function askAIDevo() {
  const verse = document.getElementById('devo-ref').textContent;
  openAIStudy(`Explain ${verse} in depth`);
}

function toggleDark() {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  document.getElementById('dark-toggle').classList.toggle('active', isDark);
  showToast(isDark ? '🌙 Dark mode on' : '☀️ Light mode on');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.add('hidden'), 2500);
}