/**
 * English Master AI - Firebase Cloud Engine (Realtime Database & Firestore Dual Sync)
 * Automatically syncs with Realtime Database (europe-west1) and Firestore.
 */

(function () {
  'use strict';

  const defaultFirebaseConfig = {
    apiKey: "AIzaSyDZOm_DhihLvmwdugTVF9B3IkZUaaBZsAQ",
    authDomain: "english-master-ai-4936d.firebaseapp.com",
    databaseURL: "https://english-master-ai-4936d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "english-master-ai-4936d",
    storageBucket: "english-master-ai-4936d.firebasestorage.app",
    messagingSenderId: "139561705495",
    appId: "1:139561705495:web:d62ca6594cb15e65093c52",
    measurementId: "G-761XZL5RD7"
  };

  window.EMA_Firebase = {
    db: null,       // Firestore instance
    rtdb: null,     // Realtime Database instance
    auth: null,     // Auth instance
    isInitialized: false,
    config: null,

    /**
     * Initialize Firebase with Realtime Database & Firestore support
     */
    async init(customConfig = null) {
      this.config = customConfig || (window.EMA_CONFIG && window.EMA_CONFIG.firebase) || defaultFirebaseConfig;

      if (!this.config || !this.config.apiKey) {
        console.info('[EMA Firebase] Clé API non configurée. Mode local actif.');
        return false;
      }

      try {
        if (!window.firebase || !window.firebase.database) {
          await this.loadFirebaseSDKs();
        }

        if (!firebase.apps.length) {
          firebase.initializeApp(this.config);
        }

        // Initialize Realtime Database (europe-west1 default)
        try {
          this.rtdb = firebase.database();
          console.log('⚡ [EMA Firebase] Realtime Database initialisée:', this.config.databaseURL);
        } catch (rtdbErr) {
          console.warn('[EMA Firebase] RTDB warning:', rtdbErr);
        }

        // Initialize Firestore
        try {
          this.db = firebase.firestore();
        } catch (fsErr) {
          console.warn('[EMA Firebase] Firestore warning:', fsErr);
        }

        // Initialize Auth
        try {
          this.auth = firebase.auth();
        } catch (authErr) {
          console.warn('[EMA Firebase] Auth warning:', authErr);
        }

        this.isInitialized = true;
        console.log('🔥 [EMA Firebase] Connecté avec succès à Firebase (Projet: ' + this.config.projectId + ')');

        // Anonymous Auth for per-device sync
        if (this.auth && !this.auth.currentUser) {
          try {
            await this.auth.signInAnonymously();
            console.log('👤 [EMA Firebase] Session anonyme synchronisée:', this.auth.currentUser.uid);
          } catch (authErr) {
            console.warn('[EMA Firebase] Auth anonyme désactivée ou optionnelle:', authErr.message);
          }
        }

        return true;
      } catch (err) {
        console.warn('⚠️ [EMA Firebase] Initialisation échouée, fallback local:', err);
        return false;
      }
    },

    /**
     * Dynamically load Firebase SDKs via CDN (App, Database, Firestore, Auth)
     */
    loadFirebaseSDKs() {
      return new Promise((resolve, reject) => {
        if (window.firebase && window.firebase.database && window.firebase.firestore) return resolve();

        const loadScript = (src) => {
          return new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = res;
            s.onerror = rej;
            document.head.appendChild(s);
          });
        };

        const base = 'https://www.gstatic.com/firebasejs/10.12.0/';
        loadScript(base + 'firebase-app-compat.js')
          .then(() => Promise.all([
            loadScript(base + 'firebase-database-compat.js'),
            loadScript(base + 'firebase-firestore-compat.js'),
            loadScript(base + 'firebase-auth-compat.js')
          ]))
          .then(resolve)
          .catch(reject);
      });
    },

    /**
     * Fetch dynamic curriculum from Realtime Database or Firestore with local fallback
     */
    async fetchCurriculum() {
      if (!this.isInitialized) return window.EMA_DATASET || null;

      // 1. Try Realtime Database
      if (this.rtdb) {
        try {
          const snapshot = await this.rtdb.ref('curriculum/master_dataset').once('value');
          const val = snapshot.val();
          if (val && val.levels) {
            console.log('✅ [EMA Firebase] Dataset chargé depuis Realtime Database');
            window.EMA_DATASET = { ...window.EMA_DATASET, ...val };
            return window.EMA_DATASET;
          }
        } catch (e) {
          console.warn('[EMA Firebase] RTDB fetch fallback:', e.message);
        }
      }

      // 2. Try Firestore
      if (this.db) {
        try {
          const docRef = this.db.collection('curriculum').doc('master_dataset');
          const docSnap = await docRef.get();
          if (docSnap.exists) {
            console.log('✅ [EMA Firebase] Dataset chargé depuis Firestore');
            window.EMA_DATASET = { ...window.EMA_DATASET, ...docSnap.data() };
            return window.EMA_DATASET;
          }
        } catch (e) {
          console.warn('[EMA Firebase] Firestore fetch fallback:', e.message);
        }
      }

      return window.EMA_DATASET || null;
    },

    /**
     * Seed all curriculum dataset into both Realtime Database and Firestore
     */
    async seedFirestore(dataset = window.EMA_DATASET) {
      if (!this.isInitialized) {
        throw new Error("Firebase non initialisé. Vérifiez votre connexion.");
      }

      if (!dataset) {
        throw new Error("Aucun dataset trouvé à envoyer.");
      }

      console.log('🚀 [EMA Firebase] Envoi des données vers Firebase...');
      let rtdbSuccess = false;
      let firestoreSuccess = false;

      // 1. Write to Realtime Database
      if (this.rtdb) {
        try {
          await this.rtdb.ref('curriculum/master_dataset').set(dataset);
          if (dataset.grammar_modules) {
            await this.rtdb.ref('grammar_modules').set(dataset.grammar_modules);
          }
          if (dataset.vocabulary_items) {
            await this.rtdb.ref('vocabulary_items').set(dataset.vocabulary_items);
          }
          if (dataset.levels) {
            await this.rtdb.ref('levels').set(dataset.levels);
          }
          rtdbSuccess = true;
          console.log('✅ [EMA Firebase] Données enregistrées dans Realtime Database !');
        } catch (rtdbErr) {
          console.warn('[EMA Firebase] Erreur écriture RTDB:', rtdbErr.message);
        }
      }

      // 2. Write to Cloud Firestore
      if (this.db) {
        try {
          await this.db.collection('curriculum').doc('master_dataset').set(dataset, { merge: true });
          firestoreSuccess = true;
          console.log('✅ [EMA Firebase] Données enregistrées dans Firestore !');
        } catch (fsErr) {
          console.warn('[EMA Firebase] Erreur écriture Firestore:', fsErr.message);
        }
      }

      if (!rtdbSuccess && !firestoreSuccess) {
        throw new Error("Impossible d'écrire sur Firebase. Vérifiez les règles de sécurité dans la console.");
      }

      return true;
    },

    /**
     * Cloud sync user profile & progress across Realtime Database & Firestore
     */
    async saveUserProfile(user) {
      if (!this.isInitialized) return false;
      const uid = (this.auth && this.auth.currentUser) ? this.auth.currentUser.uid : (user.user_id || 'user_' + (user.name || 'guest').toLowerCase().replace(/[^a-z0-9]/g, '_'));

      const profilePayload = {
        name: user.name || 'Alex Martin',
        avatar: user.avatar || '👨‍🎓',
        level: user.level || 'B1',
        level_name: user.level_name || 'Intermediate',
        progress: user.progress || 64,
        xp: user.xp || 1480,
        streak: user.streak || 1,
        daily_goal: user.daily_goal || 30,
        daily_spent: user.daily_spent || 20,
        user_id: String(uid),
        updated_at: new Date().toISOString()
      };

      // 1. Save to Realtime Database
      if (this.rtdb) {
        try {
          await this.rtdb.ref('users/' + uid).set(profilePayload);
          await this.rtdb.ref('leaderboard/' + uid).set({
            name: profilePayload.name,
            avatar: profilePayload.avatar,
            level: profilePayload.level,
            xp: profilePayload.xp
          });
          console.log('☁️ [EMA Firebase] Profil sauvegardé sur Realtime Database (ID:', uid, ')');
        } catch (e) {
          console.warn('[EMA Firebase] RTDB save profile:', e.message);
        }
      }

      // 2. Save to Firestore
      if (this.db) {
        try {
          await this.db.collection('users').doc(String(uid)).set(profilePayload, { merge: true });
          console.log('☁️ [EMA Firebase] Profil sauvegardé sur Firestore (ID:', uid, ')');
        } catch (e) {
          console.warn('[EMA Firebase] Firestore save profile:', e.message);
        }
      }

      return true;
    },

    /**
     * Load cloud user profile
     */
    async loadUserProfile(fallbackUser) {
      if (!this.isInitialized) return fallbackUser;
      const uid = (this.auth && this.auth.currentUser) ? this.auth.currentUser.uid : (fallbackUser.user_id || 'user_' + (fallbackUser.name || 'guest').toLowerCase().replace(/[^a-z0-9]/g, '_'));

      // 1. Try Realtime Database
      if (this.rtdb) {
        try {
          const snap = await this.rtdb.ref('users/' + uid).once('value');
          const val = snap.val();
          if (val && val.name) {
            return { ...fallbackUser, ...val };
          }
        } catch (e) {}
      }

      // 2. Try Firestore
      if (this.db) {
        try {
          const doc = await this.db.collection('users').doc(String(uid)).get();
          if (doc.exists) {
            return { ...fallbackUser, ...doc.data() };
          }
        } catch (e) {}
      }

      return fallbackUser;
    },

    /**
     * Get top learners leaderboard from Realtime Database or Firestore
     */
    async getLeaderboard(limitCount = 10) {
      if (!this.isInitialized) return [];

      // 1. Try Realtime Database
      if (this.rtdb) {
        try {
          const snap = await this.rtdb.ref('leaderboard').orderByChild('xp').limitToLast(limitCount).once('value');
          const val = snap.val();
          if (val) {
            const list = Object.values(val);
            list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
            return list;
          }
        } catch (e) {}
      }

      // 2. Try Firestore
      if (this.db) {
        try {
          const snap = await this.db.collection('users').orderBy('xp', 'desc').limit(limitCount).get();
          const leaderboard = [];
          snap.forEach(doc => leaderboard.push(doc.data()));
          if (leaderboard.length > 0) return leaderboard;
        } catch (e) {}
      }

      return [];
    }
  };

})();
