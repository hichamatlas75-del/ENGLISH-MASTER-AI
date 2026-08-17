/**
 * English Master AI - Firebase Firestore Sync & Cloud Engine
 * Handles dynamic content fetching, real-time user progress sync, and Firestore dataset seeding
 */

(function () {
  'use strict';

  const defaultFirebaseConfig = {
    projectId: "english-master-ai-4936d",
    authDomain: "english-master-ai-4936d.firebaseapp.com",
    storageBucket: "english-master-ai-4936d.appspot.com"
  };

  window.EMA_Firebase = {
    db: null,
    auth: null,
    isInitialized: false,
    config: null,

    /**
     * Initialize Firebase with provided config or stored settings
     */
    async init(customConfig = null) {
      this.config = customConfig || (window.EMA_CONFIG && window.EMA_CONFIG.firebase) || defaultFirebaseConfig;

      if (!this.config || !this.config.apiKey) {
        console.info('[EMA Firebase] Clé API non renseignée. Mode local/offline actif.');
        return false;
      }

      try {
        if (!window.firebase) {
          await this.loadFirebaseSDKs();
        }

        if (!firebase.apps.length) {
          firebase.initializeApp(this.config);
        }

        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.isInitialized = true;
        console.log('🔥 [EMA Firebase] Connecté avec succès à Firestore (Projet: ' + this.config.projectId + ')');

        // Optional Anonymous Auth for secure per-device cloud sync
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
     * Dynamically load Firebase SDK via CDN (modular & lightweight)
     */
    loadFirebaseSDKs() {
      return new Promise((resolve, reject) => {
        if (window.firebase) return resolve();

        const appScript = document.createElement('script');
        appScript.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
        appScript.onload = () => {
          const firestoreScript = document.createElement('script');
          firestoreScript.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js';
          
          const authScript = document.createElement('script');
          authScript.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js';

          let loaded = 0;
          const checkReady = () => {
            loaded++;
            if (loaded === 2) resolve();
          };

          firestoreScript.onload = checkReady;
          authScript.onload = checkReady;
          firestoreScript.onerror = reject;
          authScript.onerror = reject;

          document.head.appendChild(firestoreScript);
          document.head.appendChild(authScript);
        };
        appScript.onerror = reject;
        document.head.appendChild(appScript);
      });
    },

    /**
     * Fetch dynamic curriculum from Firestore with fallback to local dataset
     */
    async fetchCurriculum() {
      if (!this.isInitialized || !this.db) {
        return window.EMA_DATASET || null;
      }

      try {
        const docRef = this.db.collection('curriculum').doc('master_dataset');
        const docSnap = await docRef.get();

        if (docSnap.exists) {
          console.log('✅ [EMA Firebase] Dataset dynamique chargé depuis Firestore');
          const cloudData = docSnap.data();
          // Merge with window.EMA_DATASET for fallback safety
          window.EMA_DATASET = { ...window.EMA_DATASET, ...cloudData };
          return window.EMA_DATASET;
        } else {
          console.log('ℹ️ [EMA Firebase] Aucune collection distante trouvée, utilisation du dataset local.');
          return window.EMA_DATASET;
        }
      } catch (e) {
        console.warn('⚠️ [EMA Firebase] Erreur fetch Firestore, fallback local:', e);
        return window.EMA_DATASET;
      }
    },

    /**
     * Seed all current 120 QCM, 90 words, 18 audios into Firestore with 1 click
     */
    async seedFirestore(dataset = window.EMA_DATASET) {
      if (!this.isInitialized || !this.db) {
        throw new Error("Firebase non initialisé. Veuillez renseigner votre apiKey.");
      }

      if (!dataset) {
        throw new Error("Aucun dataset trouvé à uploader.");
      }

      console.log('🚀 [EMA Firebase] Début de l\'envoi des données vers Firestore...');
      
      // 1. Upload master dataset doc
      await this.db.collection('curriculum').doc('master_dataset').set(dataset, { merge: true });

      // 2. Upload grammar modules to dedicated collection for granular queries
      const batch = this.db.batch();
      if (dataset.grammar_modules) {
        dataset.grammar_modules.forEach(mod => {
          const ref = this.db.collection('grammar_modules').doc(mod.id);
          batch.set(ref, mod, { merge: true });
        });
      }

      // 3. Upload vocabulary items
      if (dataset.vocabulary_items) {
        dataset.vocabulary_items.forEach(vocab => {
          const ref = this.db.collection('vocabulary_items').doc(vocab.id);
          batch.set(ref, vocab, { merge: true });
        });
      }

      // 4. Upload listening exercises
      if (dataset.listening_exercises) {
        dataset.listening_exercises.forEach(listen => {
          const ref = this.db.collection('listening_exercises').doc(listen.id);
          batch.set(ref, listen, { merge: true });
        });
      }

      await batch.commit();
      console.log('🎉 [EMA Firebase] Données synchronisées avec succès sur Firestore !');
      return true;
    },

    /**
     * Cloud sync user profile & progress
     */
    async saveUserProfile(user) {
      if (!this.isInitialized || !this.db) return false;
      const uid = (this.auth && this.auth.currentUser) ? this.auth.currentUser.uid : (user.user_id || 'guest_device');
      
      try {
        await this.db.collection('users').doc(String(uid)).set({
          ...user,
          updated_at: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return true;
      } catch (err) {
        console.warn('[EMA Firebase] Erreur sauvegarde profil cloud:', err);
        return false;
      }
    },

    /**
     * Load cloud user profile
     */
    async loadUserProfile(fallbackUser) {
      if (!this.isInitialized || !this.db) return fallbackUser;
      const uid = (this.auth && this.auth.currentUser) ? this.auth.currentUser.uid : (fallbackUser.user_id || 'guest_device');

      try {
        const doc = await this.db.collection('users').doc(String(uid)).get();
        if (doc.exists) {
          return { ...fallbackUser, ...doc.data() };
        }
      } catch (err) {
        console.warn('[EMA Firebase] Erreur chargement profil cloud:', err);
      }
      return fallbackUser;
    }
  };

})();
