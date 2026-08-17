# 📘 English Master AI — Open Source & Cloud-Powered Web App

> **L'application d'anglais Open Source la plus complète du débutant à l'avancé (A1 à C2)**  
> Utilisable en direct via le web (GitHub Pages / Standalone) ou comme plugin WordPress avec synchronisation cloud **Google Firebase Firestore**, analyse vocale en temps réel, 120 QCM interactifs, tuteur IA et certificats officiels.

---

## 🌐 Open Source & Profils Cloud Multi-Utilisateurs

Toute personne qui ouvre le lien peut :
1. **Créer son propre profil personnalisé** (Prénom/Pseudo, Avatar animé, niveau de départ A1-C2, objectif quotidien).
2. **Sauvegarder sa progression dans le Cloud** : Ses scores, XP, série quotidienne (streak) et mots maîtrisés sont enregistrés en direct sur **Google Firebase Firestore**.
3. **Participer au classement (Leaderboard)** : Suivre sa position parmi les apprenants actifs.
4. **Changer ou recharger son profil à tout moment** via le bouton profil dans l'en-tête de l'application.

---

## 🌟 Fonctionnalités Incluses

### 1. 🗺️ Parcours Complet CECRL (A1 à C2) & Sélecteur Visuel
* **Sélecteur de niveau instantané** avec badges interactifs (A1 Starter à C2 Bilingue).
* **120 Questions QCM interactives** réparties sur 24 modules de grammaire (4 modules par niveau).
* **90 Mots de Vocabulaire enrichis** avec phonétique IPA, définitions et statut SuperMemo-2 (SRS).
* **18 Exercices de Compréhension Orale (Listening)** avec lecture audio TTS et questions.
* **12 Prompts d'Écriture IA** avec correction automatique et score de fluidité.
* **24 Mots de Prononciation Phonétique** avec scoring réel par distance de Levenshtein.
* **12 Scénarios de Conversation** (Hôtel, Restaurant, Entretien, Débat...).

### 2. 🔥 Moteur Cloud Firebase Firestore
* **Projet Cloud** : `english-master-ai-4936d`
* **Synchronisation temps réel** : Profils utilisateurs, historique des leçons, répétition espacée (SRS).
* **Mode Offline Hybride** : Fonctionne 100% hors-ligne même sans connexion Internet avec bascule transparente vers Firebase dès que le réseau est disponible.

---

## 🚀 Déploiement & Utilisation Directe

### 1. En Ligne via GitHub Pages
1. Rendez-vous sur votre dépôt GitHub : [hichamatlas75-del/ENGLISH-MASTER-AI](https://github.com/hichamatlas75-del/ENGLISH-MASTER-AI)
2. Allez dans **Settings > Pages**.
3. Choisissez la branche `main` et le dossier `/ (root)` puis cliquez sur **Save**.
4. Votre application sera accessible publiquement à l'adresse :
   ```text
   https://hichamatlas75-del.github.io/ENGLISH-MASTER-AI/
   ```

### 2. En Local (Standalone)
Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur web moderne.

### 3. Sous WordPress
Installez le dossier dans `wp-content/plugins/english-master-ai/` et utilisez le shortcode :
```text
[english_master_ai]
```
Ou l'URL plein écran : `/learn-english/`.

---

## 📄 Licence

Ce projet est sous licence **MIT** — Libre d'utilisation, de modification et de partage.
