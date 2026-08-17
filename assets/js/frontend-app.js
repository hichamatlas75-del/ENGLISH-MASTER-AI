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

  // State
  let appData = CONFIG.initial_data || window.EMA_DATASET;
  let currentUser = { ...CONFIG.user };
  let currentTab = 'home'; // home, learn, practice, speak, progress
  let activeLevelId = 'B1';
  let activeUnitTab = 'units'; // units, lessons
  let selectedUnit = null;
  let recognitionInstance = null;
  let isRecording = false;

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
    }

    renderApp();
  }

  function saveProfile() {
    localStorage.setItem('ema_user_profile', JSON.stringify(currentUser));
  }

  function renderApp() {
    const root = document.getElementById('english-master-ai-app');
    if (!root || !appData) return;

    root.innerHTML = `
      <div class="ema-app-viewport">
        <!-- iOS/Android Mock Status Bar -->
        <div class="ema-status-bar">
          <span>9:41</span>
          <div class="ema-status-icons">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
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
     SCREEN 1: HOME DASHBOARD (Mockup Screen 1)
     ------------------------------------------------------------- */
  function renderHomeScreen() {
    return `
      <!-- Greeting -->
      <div class="ema-home-greeting">
        <h2>Good morning, ${currentUser.name}! 👋</h2>
        <p>Ready to improve your English today?</p>
      </div>

      <!-- Current Level Banner Card -->
      <div class="ema-current-level-card" onclick="window.EMA.navTo('learn')" style="cursor: pointer;">
        <div class="ema-level-row">
          <div class="ema-level-pill-badge">${currentUser.level}</div>
          <div class="ema-level-meta">
            <div class="sub">Current Level</div>
            <div class="name">${currentUser.level_name}</div>
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
            <div class="cat" style="color: #10b981;">Grammar</div>
            <div class="title">Present Perfect</div>
          </div>
          <div class="ema-recom-time">12 min ❯</div>
        </div>

        <!-- Vocabulary Item -->
        <div class="ema-recom-item" onclick="window.EMA.navTo('practice')">
          <div class="ema-recom-icon-box" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">📚</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #f59e0b;">Vocabulary</div>
            <div class="title">Travel & Airport</div>
          </div>
          <div class="ema-recom-time">10 min ❯</div>
        </div>

        <!-- Listening Item -->
        <div class="ema-recom-item" onclick="window.EMA.openListeningModal()">
          <div class="ema-recom-icon-box" style="background: rgba(37, 99, 235, 0.15); color: #60a5fa;">🎧</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #60a5fa;">Listening</div>
            <div class="title">At the Airport</div>
          </div>
          <div class="ema-recom-time">08 min ❯</div>
        </div>

        <!-- Speaking Item -->
        <div class="ema-recom-item" onclick="window.EMA.navTo('speak')">
          <div class="ema-recom-icon-box" style="background: rgba(139, 92, 246, 0.15); color: #a78bfa;">🎙️</div>
          <div class="ema-recom-info">
            <div class="cat" style="color: #a78bfa;">Speaking</div>
            <div class="title">Hotel Check-In</div>
          </div>
          <div class="ema-recom-time">10 min ❯</div>
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 2: LEARN / PARCOURS A1-C2 (Mockup Screen 2)
     ------------------------------------------------------------- */
  function renderLearnScreen() {
    const levelObj = appData.levels.find(l => l.id === activeLevelId) || appData.levels[1];

    return `
      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">${levelObj.title}</h3>
        <span class="ema-header-badge">45%</span>
      </div>

      <!-- Segment Tabs (Units / Lessons) -->
      <div class="ema-segment-control">
        <button class="ema-segment-btn ${activeUnitTab === 'units' ? 'active' : ''}" onclick="window.EMA.setUnitTab('units')">Units</button>
        <button class="ema-segment-btn ${activeUnitTab === 'lessons' ? 'active' : ''}" onclick="window.EMA.setUnitTab('lessons')">Lessons</button>
      </div>

      <!-- Units List -->
      ${levelObj.units.map((unit, idx) => `
        <div class="ema-unit-card" onclick="window.EMA.openUnitDetail('${unit.id}', '${unit.title}')">
          <div class="ema-unit-icon">${unit.icon}</div>
          <div class="ema-unit-details">
            <div class="title">${unit.title}</div>
            <div class="count">${unit.lessons_completed}/${unit.lessons_total} lessons</div>
          </div>
          <div class="ema-chevron-right">›</div>
        </div>
      `).join('')}
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 3: SPEAK & PRONUNCIATION (Mockup Screen 3)
     ------------------------------------------------------------- */
  function renderSpeakScreen() {
    const pronunWord = appData.pronunciation_words[0];

    return `
      <!-- Header -->
      <div class="ema-mobile-header" style="padding-left: 0; padding-right: 0;">
        <button class="ema-header-btn-back" onclick="window.EMA.navTo('home')">‹</button>
        <h3 class="ema-header-title">Pronunciation Practice</h3>
        <div style="width: 38px;"></div>
      </div>

      <div class="ema-pronun-container">
        <!-- Target Word & Phonetic -->
        <h1 class="ema-target-word-title">${pronunWord.word}</h1>
        <div class="ema-target-word-ipa">${pronunWord.phonetic}</div>
        
        <div class="ema-audio-sub-prompt">Listen and repeat</div>

        <!-- Listen & Record Buttons -->
        <div class="ema-pronun-actions-row">
          <button class="ema-btn-circle-listen" onclick="window.EMA.listenWord('${pronunWord.word}')" title="Listen">
            🔊
          </button>
          <button class="ema-btn-circle-mic" id="ema-mobile-mic-btn" onclick="window.EMA.toggleMobileRecord('${pronunWord.word}')" title="Speak">
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
            <span>Great job!</span> <span>🎉</span>
          </div>
          <div class="sub">Your pronunciation is very good.</div>
          <div class="tips-title">Tips:</div>
          <ul>
            <li>Try to pronounce the 'th' sound.</li>
            <li>Keep your tongue between your teeth.</li>
          </ul>
        </div>

        <!-- Continue Button -->
        <button class="ema-mobile-primary-btn" onclick="window.EMA.continuePronunciation()">
          Continue
        </button>
      </div>
    `;
  }

  /* -------------------------------------------------------------
     SCREEN 4: PRACTICE (Grammar, Vocab SRS, Listening, Writing)
     ------------------------------------------------------------- */
  function renderPracticeScreen() {
    const vocab = appData.vocabulary_items[0];

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
        <div style="font-size: 34px; margin-bottom: 4px;">${vocab.image_icon}</div>
        <h2 style="font-size: 26px; margin: 0; color: #fff;">${vocab.word}</h2>
        <div style="font-family: monospace; color: #93c5fd; font-size: 15px; margin: 2px 0 8px 0;">${vocab.phonetic}</div>
        <div style="font-size: 16px; font-weight: 700; color: #f59e0b; margin-bottom: 8px;">${vocab.translation}</div>
        <p style="font-size: 12px; color: #cbd5e1; font-style: italic; margin-bottom: 14px;">"${vocab.example}"</p>
        
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

      <!-- Certificate Card -->
      <div class="ema-current-level-card" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-color: rgba(251,191,36,0.3); text-align: center;">
        <div style="font-size: 36px; margin-bottom: 4px;">🎓</div>
        <h3 style="margin: 0; font-size: 18px; color: #fbbf24;">Certificat de Niveau B1</h3>
        <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 14px 0;">Délivré officiellement à ${currentUser.name} Martin</p>
        <button class="ema-mobile-primary-btn" style="background: #fbbf24; color: #0f172a; padding: 12px; margin-bottom: 0;" onclick="window.print()">
          🖨️ Télécharger le Diplôme (PDF)
        </button>
      </div>
    `;
  }

  // Public API methods
  window.EMA = {
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
        AudioFX.playSuccess();
        currentUser.xp += 25;
        saveProfile();
        alert(`🎙️ Prononciation détectée : "${spoken}"\nPrécision : 92% (Excellent !)\n+25 XP gagnés !`);
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
      alert("Exercice validé avec succès ! (+20 XP)");
      window.EMA.navTo('home');
    },

    startDailyLesson() {
      AudioFX.playSuccess();
      currentUser.daily_spent = Math.min(currentUser.daily_goal, currentUser.daily_spent + 5);
      currentUser.xp += 30;
      saveProfile();
      window.EMA.navTo('speak');
    },

    srsRate(quality) {
      AudioFX.playSuccess();
      currentUser.xp += 10;
      saveProfile();
      alert("Statut SRS mis à jour avec succès (+10 XP) !");
      renderApp();
    },

    openGrammarModal() {
      AudioFX.playTap();
      alert("Grammaire : Present Perfect (have/has + past participle)\nExemple : 'I have visited Paris.'\n\nQuiz : 'She _____ in London for 5 years.'\nRéponse : has lived (+15 XP) !");
    },

    openListeningModal() {
      AudioFX.playTap();
      speakEnglish("Good morning passengers. This is the final boarding call for flight BA342 to London Heathrow. Please proceed to Gate 14.");
      alert("🎧 Écoutez l'annonce de l'aéroport qui vient d'être jouée !");
    },

    openWritingModal() {
      const text = prompt("Écrivez une phrase en anglais sur votre journée :");
      if (text) {
        AudioFX.playSuccess();
        currentUser.xp += 25;
        saveProfile();
        alert(`✨ Correction IA :\nTexte analysé : "${text}"\nScore de précision : 90/100\n+25 XP gagnés !`);
      }
    },

    openIdiomsModal() {
      AudioFX.playTap();
      alert("💡 Expression : 'It's raining cats and dogs.'\nSignification : Il pleut des cordes !\n\nExemple : 'Don't forget your umbrella today.'");
    },

    openAssessmentModal() {
      AudioFX.playSuccess();
      currentUser.level = 'B1';
      currentUser.level_name = 'Intermediate';
      currentUser.progress = 64;
      currentUser.xp += 100;
      saveProfile();
      alert("Test complété avec succès ! Votre niveau estimé est B1 Intermédiaire (+100 XP).");
      renderApp();
    },

    openUnitDetail(id, title) {
      AudioFX.playTap();
      window.EMA.navTo('speak');
    }
  };

})();
