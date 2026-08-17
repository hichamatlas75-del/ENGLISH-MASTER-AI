/**
 * English Master AI - 100% Mobile-First Engine
 * Optimized for Mobile devices & Smartphone Navigation
 */

(function () {
  'use strict';

  // Config fallback
  const CONFIG = window.EMA_CONFIG || {
    api_root: '/wp-json/english-master-ai/v1/',
    nonce: '',
    plugin_url: './',
    user: {
      name: 'Alex',
      level: 'B1',
      level_name: 'Intermediate',
      progress: 64,
      streak: 7,
      daily_goal: 30,
      daily_spent: 20,
      xp: 1480,
    },
    initial_data: null,
  };

  // Utility: Escape HTML
  function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function(match) {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });
  }

  // State
  let appData = CONFIG.initial_data || window.EMA_DATASET;
  let currentUser = { ...CONFIG.user };
  let currentTab = 'home'; // home, learn, practice, speak, progress
  let activeLevelId = 'B1';
  let activeUnitTab = 'units'; // units, lessons
  let selectedUnit = null;
  let recognitionInstance = null;
  let isRecording = false;
  let currentPronunIndex = 0;

  // Sound effects
  const AudioFX = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
    },
    playSuccess() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(783.99, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    },
    playTap() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    }
  };

  // TTS Voice
  function speakEnglish(text, rate = 0.9) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  // REST API Integration Helper
  async function apiCall(endpoint, method = 'GET', body = null) {
    try {
      const res = await fetch(CONFIG.api_root + endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': CONFIG.nonce },
        body: body ? JSON.stringify(body) : undefined
      });
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch(e) {
      console.warn('API offline, using local fallback', e);
      return null;
    }
  }

  // Levenshtein Distance for Pronunciation Accuracy
  function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Modal Manager
  const Modal = {
    overlay: null,
    open(title, contentHTML, footerHTML = '') {
      this.close(); // Close any existing modal
      this.overlay = document.createElement('div');
      this.overlay.className = 'ema-modal-overlay';
      this.overlay.onclick = (e) => {
        if (e.target === this.overlay) this.close();
      };

      const card = document.createElement('div');
      card.className = 'ema-modal-card';
      
      const header = document.createElement('div');
      header.className = 'ema-modal-header';
      header.innerHTML = `<span>${escapeHTML(title)}</span>`;
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'ema-modal-close';
      closeBtn.innerHTML = '✕';
      closeBtn.onclick = () => this.close();
      header.appendChild(closeBtn);

      const body = document.createElement('div');
      body.className = 'ema-modal-body';
      body.innerHTML = contentHTML;

      card.appendChild(header);
      card.appendChild(body);

      if (footerHTML) {
        const footer = document.createElement('div');
        footer.className = 'ema-modal-footer';
        footer.innerHTML = footerHTML;
        card.appendChild(footer);
      }

      this.overlay.appendChild(card);
      
      const viewport = document.querySelector('.ema-app-viewport');
      if (viewport) {
        viewport.appendChild(this.overlay);
      } else {
        document.body.appendChild(this.overlay);
      }
    },
    close() {
      if (this.overlay && this.overlay.parentNode) {
        // Optional: Add close animation logic here before removing
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.overlay = null;
    },
    isOpen() {
      return this.overlay !== null;
    }
  };

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  function initApp() {
    if (!appData && window.EMA_DATASET) {
      appData = window.EMA_DATASET;
    }

    const saved = localStorage.getItem('ema_user_profile');
    if (saved) {
      try {
        currentUser = { ...currentUser, ...JSON.parse(saved) };
        activeLevelId = currentUser.level || 'B1';
      } catch (e) {}
    } else {
      // First visit: Open Profile Creation Onboarding!
      setTimeout(() => {
        if (window.EMA && window.EMA.openProfileModal) {
          window.EMA.openProfileModal(true);
        }
      }, 400);
    }

    // Try initializing Firebase Cloud Sync
    if (window.EMA_Firebase) {
      window.EMA_Firebase.init().then(async (connected) => {
        if (connected) {
          const cloudCurriculum = await window.EMA_Firebase.fetchCurriculum();
          if (cloudCurriculum) {
            appData = cloudCurriculum;
          }
          currentUser = await window.EMA_Firebase.loadUserProfile(currentUser);
          renderApp();
        }
      });
    }

    renderApp();
  }

  function saveProfile() {
    localStorage.setItem('ema_user_profile', JSON.stringify(currentUser));
    if (window.EMA_Firebase && window.EMA_Firebase.isInitialized) {
      window.EMA_Firebase.saveUserProfile(currentUser);
    }
  }

  function renderApp() {
    const root = document.getElementById('english-master-ai-app');
    if (!root || !appData) return;

    root.innerHTML = `
      <div class="ema-app-viewport">
        <!-- iOS/Android Mock Status Bar -->
        <div class="ema-status-bar">
          <button class="ema-profile-chip-btn" onclick="window.EMA.openProfileModal(false)" title="Gérer mon profil Cloud">
            <span class="avatar">${escapeHTML(currentUser.avatar || '👨‍🎓')}</span>
            <span>${escapeHTML(currentUser.name || 'Profil')}</span>
          </button>
          <div class="ema-status-icons">
            <span style="font-size: 11px; color: #60a5fa; font-weight: 800; background: rgba(37,99,235,0.2); padding: 2px 6px; border-radius: 6px;">${escapeHTML(currentUser.level)}</span>
            <span>⚡ ${currentUser.xp} XP</span>
          </div>
        </div>

        <!-- Render Main Screen View -->
        <div class="ema-mobile-body" id="ema-mobile-main-body">
          ${renderCurrentView()}
        </div>

        <!-- 100% Native Mobile Bottom Navigation Bar -->
        <nav class="ema-bottom-nav">
          <button class="ema-nav-item ${currentTab === 'home' ? 'active' : ''}" onclick="window.EMA.navTo('home')">
            <span class="icon">🏠</span>
            <span>Home</span>
          </button>
          <button class="ema-nav-item ${currentTab === 'learn' ? 'active' : ''}" onclick="window.EMA.navTo('learn')">
            <span class="icon">📚</span>
            <span>Learn</span>
          </button>
          <button class="ema-nav-item ${currentTab === 'practice' ? 'active' : ''}" onclick="window.EMA.navTo('practice')">
            <span class="icon">✍️</span>
            <span>Practice</span>
          </button>
          <button class="ema-nav-item ${currentTab === 'speak' ? 'active' : ''}" onclick="window.EMA.navTo('speak')">
            <span class="icon">🎙️</span>
            <span>Speak</span>
          </button>
          <button class="ema-nav-item ${currentTab === 'progress' ? 'active' : ''}" onclick="window.EMA.navTo('progress')">
            <span class="icon">📊</span>
            <span>Progress</span>
          </button>
        </nav>
      </div>
    `;
  }

  function renderCurrentView() {
    switch (currentTab) {
      case 'learn':
        return renderLearnScreen();
      case 'practice':
        return renderPracticeScreen();
      case 'speak':
        return renderSpeakScreen();
      case 'progress':
        return renderProgressScreen();
      case 'home':
      default:
        return renderHomeScreen();
    }
  }

  /* -------------------------------------------------------------
     SCREEN 1: HOME DASHBOARD
     ------------------------------------------------------------- */
  function renderHomeScreen() {
    return `
      <!-- Greeting -->
      <div class="ema-home-greeting">
        <h2>Good morning, ${escapeHTML(currentUser.name)}! 👋</h2>
        <p>Ready to improve your English today?</p>
      </div>

      <!-- Current Level Banner Card -->
      <div class="ema-current-level-card" onclick="window.EMA.navTo('learn')" style="cursor: pointer;">
        <div class="ema-level-row">
          <div class="ema-level-pill-badge">${escapeHTML(currentUser.level)}</div>
          <div class="ema-level-meta">
            <div class="sub">Current Level</div>
            <div class="name">${escapeHTML(currentUser.level_name)}</div>
            <div class="ema-progress-track">
              <div class="ema-progress-fill" style="width: ${currentUser.progress}%;"></div>
            </div>
          </div>
          <div class="ema-level-pct">${currentUser.progress}%</div>
        </div>
      </div>

      <!-- Daily Goal & 7 Day Streak Dual Cards -->
      <div class="ema-stats-dual-grid">
        <div class="ema-small-stat-card">
          <div class="label">Daily Goal</div>
          <div class="val">${currentUser.daily_spent} / ${currentUser.daily_goal} min <span style="font-size: 14px;">🔥</span></div>
          <div class="ema-progress-track" style="margin-top: 6px; height: 5px;">
            <div class="ema-progress-fill" style="width: ${(currentUser.daily_spent / currentUser.daily_goal) * 100}%; background: #f59e0b;"></div>
          </div>
        </div>

        <div class="ema-small-stat-card">
          <div class="label">7 day streak</div>
          <div class="val">${currentUser.streak} <span style="font-size: 13px; color: #10b981; font-weight: normal;">days 🔥</span></div>
          <div style="display: flex; gap: 4px; margin-top: 6px;">
            <span style="font-size: 10px; color: #10b981;">●●●●●●</span><span style="font-size: 10px; color: #f59e0b;">●</span>
          </div>
        </div>
      </div>

      <!-- Start Today's Lesson Big Button -->
      <button class="ema-mobile-primary-btn" onclick="window.EMA.startDailyLesson()">
        <span>Start Today's Lesson</span> ➔
      </button>

      <!-- Recommended for you Section -->
      <div class="ema-mobile-sec-header">
        <span>Recommended for you</span>
        <span style="font-size: 12px; color: #60a5fa; cursor: pointer;" onclick="window.EMA.navTo('practice')">See all</span>
      </div>

      <div class="ema-recom-list">
        <!-- Grammar Item -->
        <div class="ema-recom-item" onclick="window.EMA.openGrammarModal()">
          <div class="ema-recom-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">📖</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #10b981;">Grammar (${escapeHTML(activeLevelId)})</div>
            <div class="title">Level ${escapeHTML(activeLevelId)} Grammar Practice</div>
          </div>
          <div class="ema-recom-time">12 min ❯</div>
        </div>

        <!-- Vocabulary Item -->
        <div class="ema-recom-item" onclick="window.EMA.navTo('practice')">
          <div class="ema-recom-icon-box" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">📚</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #f59e0b;">Vocabulary (${escapeHTML(activeLevelId)})</div>
            <div class="title">Level ${escapeHTML(activeLevelId)} Vocabulary</div>
          </div>
          <div class="ema-recom-time">10 min ❯</div>
        </div>

        <!-- Listening Item -->
        <div class="ema-recom-item" onclick="window.EMA.openListeningModal()">
          <div class="ema-recom-icon-box" style="background: rgba(37, 99, 235, 0.15); color: #60a5fa;">🎧</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #60a5fa;">Listening (${escapeHTML(activeLevelId)})</div>
            <div class="title">Level ${escapeHTML(activeLevelId)} Listening</div>
          </div>
          <div class="ema-recom-time">08 min ❯</div>
        </div>

        <!-- Speaking Item -->
        <div class="ema-recom-item" onclick="window.EMA.navTo('speak')">
          <div class="ema-recom-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #a78bfa;">🎙️</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #a78bfa;">Speaking (${escapeHTML(activeLevelId)})</div>
            <div class="title">Level ${escapeHTML(activeLevelId)} Pronunciation</div>
          </div>
          <div class="ema-recom-time">10 min ❯</div>
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 2: LEARN / PARCOURS A1-C2
     ------------------------------------------------------------- */
  function renderLearnScreen() {
    const levelNames = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper-Int', C1: 'Advanced', C2: 'Mastery' };
    const levelObj = appData.levels.find(l => l.id === activeLevelId) || appData.levels[1];

    let content = '';

    if (activeUnitTab === 'units') {
      content = levelObj.units.map((unit) => `
        <div class="ema-unit-card" onclick="window.EMA.openUnitDetail('${escapeHTML(unit.id)}', '${escapeHTML(unit.title)}')">
          <div class="ema-unit-icon">${escapeHTML(unit.icon)}</div>
          <div class="ema-unit-details">
            <div class="title">${escapeHTML(unit.title)}</div>
            <div class="count">${unit.lessons_completed}/${unit.lessons_total} lessons</div>
          </div>
          <div class="ema-chevron-right">›</div>
        </div>
      `).join('');
    } else {
      // Flatten lessons
      const lessons = [];
      levelObj.units.forEach(unit => {
        if (unit.lessons) {
          unit.lessons.forEach(lesson => lessons.push({ ...lesson, unitTitle: unit.title }));
        }
      });
      content = lessons.map(lesson => `
        <div class="ema-recom-item" onclick="window.EMA.navTo('speak')">
          <div class="ema-recom-icon-box" style="background: rgba(37, 99, 235, 0.15); color: #60a5fa;">📘</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #60a5fa;">${escapeHTML(lesson.unitTitle)}</div>
            <div class="title">${escapeHTML(lesson.title)}</div>
          </div>
          <div class="ema-recom-time">${lesson.completed ? '✅' : '15 min ❯'}</div>
        </div>
      `).join('');
    }

    // Compute real progress
    let totalCompleted = 0;
    let totalLessons = 0;
    levelObj.units.forEach(unit => {
      totalCompleted += (unit.lessons_completed || 0);
      totalLessons += (unit.lessons_total || 0);
    });
    const progressPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

    return `
      <div class="ema-level-picker">
        ${['A1','A2','B1','B2','C1','C2'].map(lvl => `
          <div class="ema-level-chip ${activeLevelId === lvl ? 'active' : ''}" data-level="${lvl}" onclick="window.EMA.selectLevel('${lvl}')">
            <span class="chip-level">${lvl}</span>
            <span class="chip-name">${levelNames[lvl]}</span>
          </div>
        `).join('')}
      </div>

      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">${escapeHTML(levelObj.title)}</h3>
        <span class="ema-header-badge">${progressPct}%</span>
      </div>

      <!-- Segment Tabs (Units / Lessons) -->
      <div class="ema-segment-control">
        <button class="ema-segment-btn ${activeUnitTab === 'units' ? 'active' : ''}" onclick="window.EMA.setUnitTab('units')">Units</button>
        <button class="ema-segment-btn ${activeUnitTab === 'lessons' ? 'active' : ''}" onclick="window.EMA.setUnitTab('lessons')">Lessons</button>
      </div>

      <!-- List -->
      ${content}
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 3: SPEAK & PRONUNCIATION
     ------------------------------------------------------------- */
  function renderSpeakScreen() {
    const levelWords = appData.pronunciation_words.filter(w => w.level === activeLevelId);
    const wordsList = levelWords.length > 0 ? levelWords : appData.pronunciation_words;
    const pronunWord = wordsList[currentPronunIndex % wordsList.length];

    return `
      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">Pronunciation Practice</h3>
        <div style="width: 38px;"></div>
      </div>

      <div class="ema-pronun-container">
        <!-- Target Word & Phonetic -->
        <h1 class="ema-target-word-title">${escapeHTML(pronunWord.word)}</h1>
        <div class="ema-target-word-ipa">${escapeHTML(pronunWord.phonetic)}</div>
        
        <div class="ema-audio-sub-prompt">Listen and repeat</div>

        <!-- Listen & Record Buttons -->
        <div class="ema-pronun-actions-row">
          <button class="ema-btn-circle-listen" onclick="window.EMA.listenWord('${escapeHTML(pronunWord.word)}')" title="Listen">
            🔊
          </button>
          <button class="ema-btn-circle-mic" id="ema-mobile-mic-btn" onclick="window.EMA.toggleMobileRecord('${escapeHTML(pronunWord.word)}')" title="Speak">
            🎙️
          </button>
        </div>

        <!-- Audio Waveform Visualizer -->
        <div class="ema-wave-visualizer">
          <div class="ema-wave-bar"></div>
          <div class="ema-wave-bar"></div>
          <div class="ema-wave-bar"></div>
          <div class="ema-wave-bar"></div>
          <div class="ema-wave-bar"></div>
          <div class="ema-wave-bar"></div>
        </div>

        <!-- Feedback Card -->
        <div class="ema-feedback-box">
          <div class="top">
            <span>Keep going!</span> <span>💪</span>
          </div>
          <div class="sub">Practice makes perfect.</div>
          <div class="tips-title">Tips:</div>
          <ul>
            <li>Speak clearly and naturally.</li>
            <li>Focus on the phonetic sounds.</li>
          </ul>
        </div>

        <!-- Continue Button -->
        <button class="ema-mobile-primary-btn" onclick="window.EMA.continuePronunciation()">
          Skip / Next Word
        </button>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 4: PRACTICE
     ------------------------------------------------------------- */
  function renderPracticeScreen() {
    const levelVocab = appData.vocabulary_items.filter(v => v.level === activeLevelId);
    const vocab = levelVocab.length > 0 ? levelVocab[0] : appData.vocabulary_items[0];

    return `
      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">Practice & Skills</h3>
        <div style="width: 38px;"></div>
      </div>

      <!-- Spaced Repetition Flashcard Card -->
      <div class="ema-current-level-card" style="text-align: center;">
        <div style="font-size: 11px; color: #f59e0b; font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">
          🧠 Répétition Espacée (SRS)
        </div>
        <div style="font-size: 34px; margin-bottom: 4px;">${escapeHTML(vocab.image_icon)}</div>
        <h2 style="font-size: 26px; margin: 0; color: #fff;">${escapeHTML(vocab.word)}</h2>
        <div style="font-family: monospace; color: #93c5fd; font-size: 15px; margin: 2px 0 8px 0;">${escapeHTML(vocab.phonetic)}</div>
        <div style="font-size: 16px; font-weight: 700; color: #f59e0b; margin-bottom: 8px;">${escapeHTML(vocab.translation)}</div>
        <p style="font-size: 12px; color: #cbd5e1; font-style: italic; margin-bottom: 14px;">"${escapeHTML(vocab.example)}"</p>
        
        <div style="display: flex; gap: 8px;">
          <button class="button" style="flex: 1; background: rgba(239,68,68,0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 10px; border-radius: 10px; font-weight: bold;" onclick="window.EMA.srsRate(1)">À revoir</button>
          <button class="button" style="flex: 1; background: rgba(16,185,129,0.2); border: 1px solid #10b981; color: #6ee7b7; padding: 10px; border-radius: 10px; font-weight: bold;" onclick="window.EMA.srsRate(5)">Maîtrisé ✅</button>
        </div>
      </div>

      <!-- Additional Practice Tools -->
      <div class="ema-mobile-sec-header">
        <span>Outils Pratiques</span>
      </div>

      <div class="ema-recom-list">
        <div class="ema-recom-item" onclick="window.EMA.openGrammarModal()">
          <div class="ema-recom-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">📖</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #10b981;">Grammaire</div>
            <div class="title">Règles & Quiz Interactifs</div>
          </div>
          <div class="ema-recom-time">Faire le test ❯</div>
        </div>

        <div class="ema-recom-item" onclick="window.EMA.openWritingModal()">
          <div class="ema-recom-icon-box" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">✏️</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #60a5fa;">Écriture</div>
            <div class="title">Atelier de Rédaction IA</div>
          </div>
          <div class="ema-recom-time">Corriger ❯</div>
        </div>

        <div class="ema-recom-item" onclick="window.EMA.openIdiomsModal()">
          <div class="ema-recom-icon-box" style="background: rgba(236, 72, 153, 0.15); color: #f472b6;">💡</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #f472b6;">Expressions</div>
            <div class="title">Idioms & Phrasal Verbs</div>
          </div>
          <div class="ema-recom-time">Explorer ❯</div>
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 5: PROGRESS & CERTIFICATE
     ------------------------------------------------------------- */
  function renderProgressScreen() {
    return `
      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">Progression & Diplôme</h3>
        <div style="width: 38px;"></div>
      </div>

      <!-- Stats Grid -->
      <div class="ema-stats-dual-grid">
        <div class="ema-small-stat-card">
          <div class="label">XP Total</div>
          <div class="val" style="color: #818cf8;">⚡ ${currentUser.xp.toLocaleString()}</div>
        </div>
        <div class="ema-small-stat-card">
          <div class="label">Mots Maîtrisés</div>
          <div class="val" style="color: #34d399;">📚 134</div>
        </div>
      </div>

      <!-- Level Assessment Test Card -->
      <div class="ema-current-level-card" style="margin-bottom: 18px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
          <span style="font-size: 26px;">📊</span>
          <div>
            <div style="font-size: 15px; font-weight: 800; color: #fff;">Test d'Évaluation Initiale</div>
            <div style="font-size: 12px; color: var(--ema-text-muted);">Calibrez votre niveau CECRL (A1-C2)</div>
          </div>
        </div>
        <button class="ema-mobile-primary-btn" style="padding: 10px; margin-bottom: 0;" onclick="window.EMA.openAssessmentModal()">
          Passer le test (6 questions)
        </button>
      </div>

      <!-- Firebase Cloud Sync Card -->
      <div class="ema-current-level-card" style="background: linear-gradient(135deg, #131c38 0%, #1e1b4b 100%); border-color: rgba(245, 158, 11, 0.3); margin-bottom: 18px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 22px;">🔥</span>
            <span style="font-size: 14px; font-weight: 800; color: #fff;">Firebase Firestore Cloud</span>
          </div>
          <span class="ema-header-badge" style="background: ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}; color: ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? '#34d399' : '#fbbf24'}; border-color: ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? '#10b981' : '#f59e0b'};">
            ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? '● Connecté' : '⚡ Prêt'}
          </span>
        </div>
        <p style="font-size: 12px; color: var(--ema-text-muted); margin: 0 0 12px 0;">
          ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? 'Données & progression synchronisées en temps réel sur Firestore.' : 'Connectez votre projet Firebase pour synchroniser vos 120 QCM et votre progression dans le cloud.'}
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="ema-mobile-primary-btn" style="flex: 1; min-width: 130px; padding: 10px; margin-bottom: 0; font-size: 13px;" onclick="window.EMA.openProfileModal(false)">
            👤 Mon Profil Cloud
          </button>
          <button class="ema-mobile-primary-btn" style="flex: 1; min-width: 130px; padding: 10px; margin-bottom: 0; font-size: 13px; background: #3b82f6;" onclick="window.EMA.openLeaderboardModal()">
            🏆 Classement
          </button>
          ${(window.EMA_Firebase && window.EMA_Firebase.isInitialized) ? `
            <button class="ema-mobile-primary-btn" style="width: 100%; padding: 10px; margin-top: 8px; margin-bottom: 0; font-size: 13px; background: #10b981;" onclick="window.EMA.seedFirebaseData()">
              🚀 Uploader Dataset (120 QCM)
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Certificate Card -->
      <div class="ema-current-level-card" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-color: rgba(251,191,36,0.3); text-align: center;">
        <div style="font-size: 36px; margin-bottom: 4px;">🎓</div>
        <h3 style="margin: 0; font-size: 18px; color: #fbbf24;">Certificat de Niveau ${escapeHTML(currentUser.level)}</h3>
        <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 14px 0;">Délivré officiellement à ${escapeHTML(currentUser.name)}</p>
        <button class="ema-mobile-primary-btn" style="background: #fbbf24; color: #0f172a; padding: 12px; margin-bottom: 0;" onclick="window.EMA.downloadCertificate()">
          🖨️ Télécharger le Diplôme (PDF)
        </button>
      </div>
    `;
  }

  // Public API methods
  window.EMA = {
    selectLevel(levelId) {
      AudioFX.playTap();
      activeLevelId = levelId;
      activeUnitTab = 'units';
      renderApp();
    },

    navTo(tab) {
      AudioFX.playTap();
      currentTab = tab;
      renderApp();
    },

    setUnitTab(tab) {
      AudioFX.playTap();
      activeUnitTab = tab;
      renderApp();
    },

    listenWord(text) {
      AudioFX.playTap();
      speakEnglish(text);
    },

    toggleMobileRecord(targetWord) {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        alert("La reconnaissance vocale nécessite Google Chrome, Safari ou Edge.");
        return;
      }

      const micBtn = document.getElementById('ema-mobile-mic-btn');

      if (isRecording) {
        if (recognitionInstance) recognitionInstance.stop();
        isRecording = false;
        if (micBtn) micBtn.classList.remove('recording');
        return;
      }

      recognitionInstance = new SpeechRec();
      recognitionInstance.lang = 'en-US';
      isRecording = true;
      if (micBtn) micBtn.classList.add('recording');

      recognitionInstance.onresult = (e) => {
        const spoken = e.results[0][0].transcript.toLowerCase();
        const target = targetWord.toLowerCase();
        
        const dist = levenshteinDistance(spoken, target);
        const accuracy = Math.max(0, 100 - (dist / target.length * 100)).toFixed(0);
        
        AudioFX.playSuccess();
        currentUser.xp += 25;
        saveProfile();
        
        let feedbackHTML = `
          <div class="ema-score-circle">${accuracy}%</div>
          <div style="text-align:center; margin-bottom: 16px;">
            <p style="color: var(--ema-text-muted); font-size: 14px; margin-bottom: 4px;">Target: <strong>${escapeHTML(targetWord)}</strong></p>
            <p style="color: #fff; font-size: 16px;">You said: <strong>${escapeHTML(spoken)}</strong></p>
          </div>
          <div class="ema-feedback-box">
            <div class="tips-title">Tips:</div>
            <ul>
              <li>${accuracy >= 80 ? 'Excellent pronunciation!' : 'Try to match the phonetic sounds more closely.'}</li>
              <li>Keep practicing to improve!</li>
            </ul>
          </div>
        `;
        
        const footerHTML = `<button class="ema-mobile-primary-btn" onclick="Modal.close(); window.EMA.continuePronunciation()">Continue (+25 XP)</button>`;
        
        Modal.open('Pronunciation Result', feedbackHTML, footerHTML);
      };

      recognitionInstance.onend = () => {
        isRecording = false;
        if (micBtn) micBtn.classList.remove('recording');
      };

      recognitionInstance.start();
    },

    continuePronunciation() {
      AudioFX.playSuccess();
      currentUser.xp += 20;
      saveProfile();
      currentPronunIndex++;
      renderApp(); // re-render speak screen to show next word
    },

    startDailyLesson() {
      AudioFX.playSuccess();
      currentUser.daily_spent = Math.min(currentUser.daily_goal, currentUser.daily_spent + 5);
      currentUser.xp += 30;
      saveProfile();
      window.EMA.navTo('speak');
    },

    async srsRate(quality) {
      AudioFX.playTap();
      // Example integration
      await apiCall('srs/rate', 'POST', { item_id: 1, quality: quality });
      AudioFX.playSuccess();
      currentUser.xp += 10;
      saveProfile();
      renderApp();
    },

    openGrammarModal() {
      AudioFX.playTap();
      const levelModules = appData.grammar_modules.filter(m => m.level === activeLevelId);
      const module = levelModules.length > 0 ? levelModules[Math.floor(Math.random() * levelModules.length)] : appData.grammar_modules[0];
      const questions = module.questions;
      let qIndex = 0;
      let score = 0;
      
      const renderQuestion = () => {
        if (qIndex >= questions.length) {
          Modal.open('Grammar Quiz Complete', `
            <div style="text-align:center;">
              <div class="ema-score-circle">${score}/${questions.length}</div>
              <p>Great job! You earned ${score * 15} XP.</p>
            </div>
          `, `<button class="ema-mobile-primary-btn" onclick="Modal.close()">Finish</button>`);
          currentUser.xp += score * 15;
          saveProfile();
          renderApp();
          return;
        }
        
        const q = questions[qIndex];
        const html = `
          <div style="font-size:16px; font-weight:700; margin-bottom: 20px;">${escapeHTML(q.question)}</div>
          <div id="quiz-options">
            ${q.options.map((opt, i) => `<div class="ema-quiz-option" onclick="window.EMA.submitGrammarAnswer(${i}, ${q.correct_index}, '${escapeHTML(q.explanation)}')">${escapeHTML(opt)}</div>`).join('')}
          </div>
          <div id="quiz-feedback" class="ema-quiz-feedback"></div>
        `;
        
        window.EMA.submitGrammarAnswer = (idx, correctIdx, exp) => {
          const options = document.querySelectorAll('.ema-quiz-option');
          options.forEach(o => o.style.pointerEvents = 'none'); // disable clicks
          
          if (idx === correctIdx) {
            options[idx].classList.add('correct');
            AudioFX.playSuccess();
            score++;
            document.getElementById('quiz-feedback').className = 'ema-quiz-feedback show success';
            document.getElementById('quiz-feedback').innerHTML = '✅ Correct! ' + exp;
          } else {
            options[idx].classList.add('incorrect');
            options[correctIdx].classList.add('correct');
            AudioFX.playTap();
            document.getElementById('quiz-feedback').className = 'ema-quiz-feedback show error';
            document.getElementById('quiz-feedback').innerHTML = '❌ Incorrect. ' + exp;
          }
          
          setTimeout(() => {
            qIndex++;
            renderQuestion();
          }, 2500);
        };
        
        Modal.open('Grammar Quiz', html);
      };
      
      renderQuestion();
    },

    openListeningModal() {
      AudioFX.playTap();
      const levelExercises = appData.listening_exercises.filter(e => e.level === activeLevelId);
      const exercise = levelExercises.length > 0 ? levelExercises[Math.floor(Math.random() * levelExercises.length)] : appData.listening_exercises[0];
      
      const html = `
        <div style="text-align:center; margin-bottom: 24px;">
          <button class="ema-btn-circle-listen" style="margin: 0 auto;" onclick="window.EMA.listenWord('${escapeHTML(exercise.audio_text)}')">🔊</button>
          <div style="font-size: 13px; color: var(--ema-text-muted); margin-top: 10px;">Tap to play audio</div>
        </div>
        <div style="font-size:16px; font-weight:700; margin-bottom: 20px;">${escapeHTML(exercise.question)}</div>
        <div id="listen-options">
          ${exercise.options.map((opt, i) => `<div class="ema-quiz-option" onclick="window.EMA.submitListeningAnswer(${i}, ${exercise.correct_index})">${escapeHTML(opt)}</div>`).join('')}
        </div>
        <div id="listen-feedback" class="ema-quiz-feedback"></div>
      `;
      
      window.EMA.submitListeningAnswer = (idx, correctIdx) => {
        const options = document.querySelectorAll('.ema-quiz-option');
        options.forEach(o => o.style.pointerEvents = 'none'); // disable clicks
        
        if (idx === correctIdx) {
          options[idx].classList.add('correct');
          AudioFX.playSuccess();
          document.getElementById('listen-feedback').className = 'ema-quiz-feedback show success';
          document.getElementById('listen-feedback').innerHTML = '✅ Excellent listening!';
          currentUser.xp += 20;
          saveProfile();
          setTimeout(() => Modal.close(), 2000);
        } else {
          options[idx].classList.add('incorrect');
          options[correctIdx].classList.add('correct');
          AudioFX.playTap();
          document.getElementById('listen-feedback').className = 'ema-quiz-feedback show error';
          document.getElementById('listen-feedback').innerHTML = '❌ Not quite right.';
          setTimeout(() => Modal.close(), 2000);
        }
      };
      
      Modal.open('Listening Practice', html);
    },

    openWritingModal() {
      AudioFX.playTap();
      const levelPrompts = appData.writing_prompts.filter(p => p.level === activeLevelId);
      const promptData = levelPrompts.length > 0 ? levelPrompts[Math.floor(Math.random() * levelPrompts.length)] : appData.writing_prompts[0];
      
      const html = `
        <div style="font-size: 15px; margin-bottom: 16px;"><strong>Prompt:</strong> ${escapeHTML(promptData.prompt)}</div>
        <textarea id="writing-textarea" class="ema-writing-textarea" placeholder="Start writing here..."></textarea>
      `;
      
      const footer = `<button class="ema-mobile-primary-btn" onclick="window.EMA.submitWriting()">Submit for Correction</button>`;
      
      window.EMA.submitWriting = async () => {
        const text = document.getElementById('writing-textarea').value.trim();
        if (!text) return;
        
        const btn = document.querySelector('.ema-modal-footer button');
        btn.innerHTML = 'Submitting...';
        btn.disabled = true;
        
        let result = await apiCall('ai/correct-writing', 'POST', { text });
        if (!result) {
          // Local fallback
          const wordCount = text.split(/\s+/).length;
          const score = Math.min(100, Math.max(0, 50 + wordCount * 2)); // rough scoring
          result = {
            score: score,
            feedback: [
              "Good attempt!",
              "Try to use more complex vocabulary.",
              `Word count: ${wordCount}`
            ]
          };
        }
        
        AudioFX.playSuccess();
        currentUser.xp += 30;
        saveProfile();
        
        const feedbackHTML = `
          <div class="ema-score-circle">${result.score}/100</div>
          <div class="ema-feedback-box">
            <div class="tips-title">Feedback:</div>
            <ul>
              ${result.feedback.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
            </ul>
          </div>
        `;
        
        Modal.open('Writing Corrected', feedbackHTML, `<button class="ema-mobile-primary-btn" onclick="Modal.close()">Awesome (+30 XP)</button>`);
      };
      
      Modal.open('Writing Exercise', html, footer);
    },

    openIdiomsModal() {
      AudioFX.playTap();
      const items = [...appData.phrasal_verbs.filter(i => i.level === activeLevelId), ...appData.idioms_expressions.filter(i => i.level === activeLevelId)];
      if (items.length === 0) {
        items.push(...appData.phrasal_verbs, ...appData.idioms_expressions);
      }
      let idx = 0;
      
      const renderCard = () => {
        const item = items[idx];
        const html = `
          <div class="ema-flashcard">
            <div class="ema-flashcard-expression">${escapeHTML(item.verb || item.expression)}</div>
            <div class="ema-flashcard-meaning">${escapeHTML(item.meaning)}</div>
            <div class="ema-flashcard-example">"${escapeHTML(item.example)}"</div>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:24px;">
            <button class="ema-header-btn-back" style="background:#2563eb" onclick="window.EMA.prevIdiom()">‹</button>
            <div style="color:var(--ema-text-muted); font-size:14px; align-self:center;">${idx + 1} / ${items.length}</div>
            <button class="ema-header-btn-back" style="background:#2563eb" onclick="window.EMA.nextIdiom()">›</button>
          </div>
        `;
        Modal.open('Flashcards', html);
      };
      
      window.EMA.prevIdiom = () => {
        if (idx > 0) idx--;
        else idx = items.length - 1;
        renderCard();
      };
      
      window.EMA.nextIdiom = () => {
        if (idx < items.length - 1) idx++;
        else idx = 0;
        renderCard();
      };
      
      renderCard();
    },

    openAssessmentModal() {
      AudioFX.playTap();
      const questions = appData.initial_assessment.questions;
      let qIndex = 0;
      let score = 0;
      
      const renderAssessment = () => {
        if (qIndex >= questions.length) {
          // Calculate level
          let newLevel = 'A1';
          let levelName = 'Beginner';
          if (score > 12) { newLevel = 'C1'; levelName = 'Advanced'; }
          else if (score > 8) { newLevel = 'B2'; levelName = 'Upper Intermediate'; }
          else if (score > 5) { newLevel = 'B1'; levelName = 'Intermediate'; }
          else if (score > 2) { newLevel = 'A2'; levelName = 'Elementary'; }
          
          currentUser.level = newLevel;
          currentUser.level_name = levelName;
          currentUser.xp += 100;
          saveProfile();
          
          Modal.open('Assessment Complete', `
            <div style="text-align:center;">
              <div style="font-size: 40px; margin-bottom: 10px;">🎓</div>
              <h2 style="margin: 0 0 10px 0; color: #fff;">${newLevel} Level Achieved!</h2>
              <p style="color: var(--ema-text-muted);">You scored ${score} points. Your estimated level is ${levelName}. (+100 XP)</p>
            </div>
          `, `<button class="ema-mobile-primary-btn" onclick="Modal.close(); window.EMA.navTo('home')">Start Learning</button>`);
          return;
        }
        
        const q = questions[qIndex];
        
        // Progress indicators
        const progressHTML = `
          <div class="ema-assessment-progress">
            ${questions.map((_, i) => `<div class="ema-assessment-progress-dot ${i === qIndex ? 'active' : (i < qIndex ? 'completed' : '')}"></div>`).join('')}
          </div>
        `;
        
        const html = `
          ${progressHTML}
          <div style="font-size:16px; font-weight:700; margin-bottom: 20px;">${escapeHTML(q.question)}</div>
          <div id="assess-options">
            ${q.options.map((opt, i) => `<div class="ema-quiz-option" onclick="window.EMA.submitAssessment(${i}, ${q.correct_index}, ${q.points})">${escapeHTML(opt)}</div>`).join('')}
          </div>
        `;
        
        window.EMA.submitAssessment = (idx, correctIdx, points) => {
          const options = document.querySelectorAll('.ema-quiz-option');
          options.forEach(o => o.style.pointerEvents = 'none');
          
          if (idx === correctIdx) {
            options[idx].classList.add('correct');
            score += points;
            AudioFX.playSuccess();
          } else {
            options[idx].classList.add('incorrect');
            options[correctIdx].classList.add('correct');
            AudioFX.playTap();
          }
          
          setTimeout(() => {
            qIndex++;
            renderAssessment();
          }, 1500);
        };
        
        Modal.open('Level Assessment', html);
      };
      
      renderAssessment();
    },
    
    downloadCertificate() {
      AudioFX.playTap();
      // Check if api_root looks like a wordpress endpoint
      if (CONFIG.api_root.includes('wp-json')) {
        const url = CONFIG.api_root.replace('wp-json/english-master-ai/v1/', '') + 
          '?ema_certificate=1&user_name=' + encodeURIComponent(currentUser.name) + 
          '&level=' + encodeURIComponent(currentUser.level) + 
          '&level_name=' + encodeURIComponent(currentUser.level_name);
        window.open(url, '_blank');
      } else {
        // Fallback to modal display
        Modal.open('Certificate', `
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 10px;">🎓</div>
            <h2 style="color: #fbbf24; margin: 0 0 10px 0;">Certificate of Achievement</h2>
            <p style="color: #fff; font-size: 16px;">This certifies that</p>
            <h3 style="color: #fff; font-size: 24px; margin: 10px 0;">${escapeHTML(currentUser.name)}</h3>
            <p style="color: #fff; font-size: 16px;">has achieved</p>
            <h3 style="color: var(--ema-primary); font-size: 22px; margin: 10px 0;">${escapeHTML(currentUser.level)} - ${escapeHTML(currentUser.level_name)}</h3>
          </div>
        `);
      }
    },

    openUnitDetail(id, title) {
      AudioFX.playTap();
      window.EMA.navTo('speak');
    },

    openFirebaseModal() {
      AudioFX.playTap();
      const currentKey = localStorage.getItem('ema_firebase_api_key') || (CONFIG.firebase && CONFIG.firebase.apiKey) || '';
      const projectId = (CONFIG.firebase && CONFIG.firebase.projectId) || 'english-master-ai-4936d';

      const html = `
        <div style="font-size: 14px; margin-bottom: 14px;">
          Synchronisez votre application avec votre base de données <strong>Google Firebase Firestore</strong> pour du contenu illimité et une synchronisation cloud en temps réel.
        </div>

        <div style="background: #111933; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
          <div style="font-size: 11px; color: var(--ema-text-muted); margin-bottom: 4px;">PROJECT ID :</div>
          <div style="font-size: 14px; font-weight: bold; color: #60a5fa; font-family: monospace;">${escapeHTML(projectId)}</div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 12px; color: var(--ema-text-muted); font-weight: 700; margin-bottom: 6px;">
            CLÉ API WEB (apiKey Firebase) :
          </label>
          <input type="text" id="ema-fb-api-key" value="${escapeHTML(currentKey)}" placeholder="AIzaSy..." 
            style="width: 100%; box-sizing: border-box; background: #111933; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #fff; padding: 12px; font-size: 13px; font-family: monospace;" />
          <div style="font-size: 11px; color: var(--ema-text-muted); margin-top: 6px;">
            Trouvez-la dans <em>Paramètres du projet > Général > Vos applications (Web)</em> dans la console Firebase.
          </div>
        </div>
      `;

      const footer = `
        <button class="ema-mobile-primary-btn" onclick="window.EMA.saveFirebaseKey()">
          💾 Enregistrer & Connecter
        </button>
      `;

      Modal.open('🔥 Configuration Firebase', html, footer);
    },

    async saveFirebaseKey() {
      const input = document.getElementById('ema-fb-api-key');
      if (!input) return;
      const key = input.value.trim();
      localStorage.setItem('ema_firebase_api_key', key);
      
      if (!CONFIG.firebase) CONFIG.firebase = {};
      CONFIG.firebase.apiKey = key;

      if (window.EMA_Firebase) {
        const ok = await window.EMA_Firebase.init({
          projectId: "english-master-ai-4936d",
          authDomain: "english-master-ai-4936d.firebaseapp.com",
          storageBucket: "english-master-ai-4936d.appspot.com",
          apiKey: key
        });

        if (ok) {
          AudioFX.playSuccess();
          Modal.open('🔥 Connexion Réussie', `
            <div style="text-align: center; padding: 10px 0;">
              <div style="font-size: 40px; margin-bottom: 10px;">✅</div>
              <h3 style="color: #10b981; margin: 0 0 10px 0;">Connecté à Firestore !</h3>
              <p style="font-size: 13px; color: #cbd5e1;">Votre application est maintenant reliée au projet <code>english-master-ai-4936d</code>.</p>
            </div>
          `, `<button class="ema-mobile-primary-btn" onclick="Modal.close(); renderApp();">Terminer</button>`);
          return;
        }
      }

      AudioFX.playTap();
      Modal.close();
      renderApp();
    },

    async seedFirebaseData() {
      if (!window.EMA_Firebase || !window.EMA_Firebase.isInitialized) {
        alert("Veuillez d'abord configurer votre clé API Firebase.");
        return;
      }

      AudioFX.playTap();
      Modal.open('🚀 Synchronisation Cloud', `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 40px; margin-bottom: 10px; animation: wave-anim 1s infinite alternate;">⏳</div>
          <h3 style="color: #60a5fa; margin: 0 0 10px 0;">Envoi vers Firestore en cours...</h3>
          <p style="font-size: 13px; color: var(--ema-text-muted);">Transfert des 120 QCM, 90 mots de vocabulaire, 18 modules d'écoute et 6 niveaux vers la base de données cloud.</p>
        </div>
      `);

      try {
        await window.EMA_Firebase.seedFirestore(window.EMA_DATASET);
        AudioFX.playSuccess();
        Modal.open('🎉 Données Envoyées !', `
          <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 40px; margin-bottom: 10px;">☁️✨</div>
            <h3 style="color: #10b981; margin: 0 0 10px 0;">120 QCM & Contenu sur Firestore !</h3>
            <p style="font-size: 13px; color: #cbd5e1;">Toutes les collections (grammar, vocabulary, listening, writing, levels) sont désormais disponibles et modifiables en direct depuis la console Firebase.</p>
          </div>
        `, `<button class="ema-mobile-primary-btn" onclick="Modal.close()">Super !</button>`);
      } catch (err) {
        Modal.open('❌ Erreur d\'envoi', `
          <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 40px; margin-bottom: 10px;">⚠️</div>
            <h3 style="color: #ef4444; margin: 0 0 10px 0;">Échec du transfert</h3>
            <p style="font-size: 13px; color: #cbd5e1;">${escapeHTML(err.message)}</p>
            <p style="font-size: 11px; color: var(--ema-text-muted);">Assurez-vous d'avoir cliqué sur "Créer une base de données" dans Firestore Database dans la console Firebase.</p>
          </div>
        `, `<button class="ema-mobile-primary-btn" onclick="Modal.close()">Fermer</button>`);
      }
    },

    openProfileModal(isOnboarding = false) {
      AudioFX.playTap();
      const avatars = ['👨‍🎓', '👩‍🎓', '🚀', '🌟', '🦉', '🦊', '⚡', '🎯', '💡', '🦁'];
      let selectedAvatar = currentUser.avatar || '👨‍🎓';
      const levelNames = { A1: 'A1 - Débutant', A2: 'A2 - Élémentaire', B1: 'B1 - Intermédiaire', B2: 'B2 - Avancé', C1: 'C1 - Autonome', C2: 'C2 - Bilingue' };

      const html = `
        ${isOnboarding ? `
          <div style="text-align:center; margin-bottom: 14px;">
            <div style="font-size: 32px;">👋✨</div>
            <h3 style="margin: 4px 0 2px 0; color: #fff;">Bienvenue sur English Master AI !</h3>
            <p style="font-size: 12px; color: var(--ema-text-muted); margin: 0;">Créez votre profil pour sauvegarder votre progression sur Firebase Cloud.</p>
          </div>
        ` : ''}

        <div class="ema-form-group">
          <label>Votre Nom ou Pseudo</label>
          <input type="text" id="ema-prof-name" class="ema-form-input" value="${escapeHTML(currentUser.name || '')}" placeholder="Ex: Alex Martin" />
        </div>

        <div class="ema-form-group">
          <label>Choisissez votre Avatar</label>
          <div class="ema-avatar-grid" id="ema-avatar-selector">
            ${avatars.map(av => `
              <div class="ema-avatar-option ${selectedAvatar === av ? 'selected' : ''}" onclick="window.EMA.selectAvatar('${av}')">
                ${av}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="ema-form-group">
          <label>Niveau de Départ</label>
          <select id="ema-prof-level" class="ema-form-select">
            ${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => `
              <option value="${lvl}" ${(currentUser.level === lvl) ? 'selected' : ''}>${levelNames[lvl]}</option>
            `).join('')}
          </select>
        </div>

        <div class="ema-form-group">
          <label>Objectif Quotidien</label>
          <select id="ema-prof-goal" class="ema-form-select">
            <option value="15" ${currentUser.daily_goal == 15 ? 'selected' : ''}>⚡ 15 min / jour (Tranquille)</option>
            <option value="30" ${currentUser.daily_goal == 30 ? 'selected' : ''}>🔥 30 min / jour (Recommandé)</option>
            <option value="45" ${currentUser.daily_goal == 45 ? 'selected' : ''}>💪 45 min / jour (Intensif)</option>
            <option value="60" ${currentUser.daily_goal == 60 ? 'selected' : ''}>🚀 60 min / jour (Immersion)</option>
          </select>
        </div>
      `;

      const footer = `
        <button class="ema-mobile-primary-btn" onclick="window.EMA.saveProfileForm(${isOnboarding})">
          ${isOnboarding ? '🚀 Créer mon Profil & Commencer' : '💾 Enregistrer mon Profil'}
        </button>
      `;

      window.EMA._tempAvatar = selectedAvatar;
      Modal.open(isOnboarding ? '🎉 Nouveau Profil' : '👤 Mon Profil Cloud', html, footer);
    },

    selectAvatar(av) {
      AudioFX.playTap();
      window.EMA._tempAvatar = av;
      const opts = document.querySelectorAll('.ema-avatar-option');
      opts.forEach(el => {
        el.classList.toggle('selected', el.innerText.trim() === av);
      });
    },

    async saveProfileForm(isOnboarding = false) {
      const nameInput = document.getElementById('ema-prof-name');
      const levelSelect = document.getElementById('ema-prof-level');
      const goalSelect = document.getElementById('ema-prof-goal');
      
      const name = (nameInput && nameInput.value.trim()) || 'Learner';
      const level = (levelSelect && levelSelect.value) || 'B1';
      const goal = parseInt(goalSelect ? goalSelect.value : 30, 10);
      const avatar = window.EMA._tempAvatar || currentUser.avatar || '👨‍🎓';

      const levelNames = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper-Int', C1: 'Advanced', C2: 'Mastery' };

      currentUser.name = name;
      currentUser.avatar = avatar;
      currentUser.level = level;
      currentUser.level_name = levelNames[level] || 'Intermediate';
      currentUser.daily_goal = goal;
      activeLevelId = level;

      if (isOnboarding && !currentUser.xp) {
        currentUser.xp = 50; // Welcome XP
      }

      saveProfile();
      AudioFX.playSuccess();
      Modal.close();
      renderApp();

      if (window.EMA_Firebase && window.EMA_Firebase.isInitialized) {
        await window.EMA_Firebase.saveUserProfile(currentUser);
      }
    },

    async openLeaderboardModal() {
      AudioFX.playTap();
      Modal.open('🏆 Classement Cloud', `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 32px; animation: wave-anim 1s infinite alternate;">⏳</div>
          <p style="font-size: 13px; color: var(--ema-text-muted);">Chargement des apprenants depuis Firestore...</p>
        </div>
      `);

      let learners = [];
      if (window.EMA_Firebase) {
        learners = await window.EMA_Firebase.getLeaderboard(10);
      }

      if (!learners || learners.length === 0) {
        // Mock / local demo learners
        learners = [
          { name: currentUser.name || 'Vous', avatar: currentUser.avatar || '👨‍🎓', level: currentUser.level || 'B1', xp: currentUser.xp || 1480 },
          { name: 'Sarah Connor', avatar: '👩‍🎓', level: 'B2', xp: 2150 },
          { name: 'David Miller', avatar: '🚀', level: 'C1', xp: 1890 },
          { name: 'Emma Watson', avatar: '🌟', level: 'B1', xp: 1420 },
          { name: 'Lucas Scott', avatar: '🦊', level: 'A2', xp: 870 }
        ].sort((a, b) => b.xp - a.xp);
      }

      const html = `
        <div style="margin-bottom: 12px; font-size: 12px; color: var(--ema-text-muted);">
          Top apprenants actifs synchronisés avec Firebase :
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${learners.map((l, i) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #111933; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 14px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 800; font-size: 14px; color: ${i === 0 ? '#fbbf24' : (i === 1 ? '#94a3b8' : (i === 2 ? '#b45309' : '#64748b'))}; width: 16px;">
                  #${i + 1}
                </span>
                <span style="font-size: 22px;">${l.avatar || '👨‍🎓'}</span>
                <div>
                  <div style="font-size: 13px; font-weight: 700; color: #fff;">${escapeHTML(l.name)}</div>
                  <span style="font-size: 10px; color: #60a5fa; font-weight: 800; background: rgba(37,99,235,0.2); padding: 1px 5px; border-radius: 4px;">${escapeHTML(l.level || 'B1')}</span>
                </div>
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #818cf8;">
                ⚡ ${(l.xp || 0).toLocaleString()} XP
              </div>
            </div>
          `).join('')}
        </div>
      `;

      Modal.open('🏆 Classement des Apprenants', html, `<button class="ema-mobile-primary-btn" onclick="Modal.close()">Fermer</button>`);
    }
  };

})();
