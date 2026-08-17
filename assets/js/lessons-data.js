window.EMA_DATASET = {
  "app_info": {
    "name": "English Master AI",
    "tagline": "Learn English. Speak with Confidence.",
    "subtitle": "L'application d'anglais la plus complète du débutant à l'avancé",
    "version": "1.0.0"
  },
  "levels": [
    {
      "id": "A1",
      "name": "Débutant",
      "title": "A1 - Débutant",
      "description": "Bases essentielles et premières expressions du quotidien.",
      "color": "#10B981",
      "badge": "🌱 Starter",
      "units_count": 4,
      "lessons_count": 16,
      "units": [
        {
          "id": "a1-u1",
          "title": "1. First Greetings & Introductions",
          "lessons_total": 4,
          "lessons_completed": 4,
          "icon": "👋",
          "lessons": [
            { "id": "a1-u1-l1", "title": "Saying Hello & Personal Info", "duration": "8 min", "type": "vocabulary", "xp": 20, "vocabulary_ids": ["hello", "name", "nice_to_meet_you", "student", "teacher"] },
            { "id": "a1-u1-l2", "title": "Verb 'To Be' (Am / Is / Are)", "duration": "10 min", "type": "grammar", "xp": 25, "grammar_id": "verb_to_be" },
            { "id": "a1-u1-l3", "title": "Pronouncing 'Th' & Vowels", "duration": "6 min", "type": "pronunciation", "xp": 20, "target_word": "think" },
            { "id": "a1-u1-l4", "title": "Mini Conversation: Meeting Alex", "duration": "10 min", "type": "speaking", "xp": 30, "scenario_id": "greeting_alex" }
          ]
        },
        {
          "id": "a1-u2",
          "title": "2. Daily Routine & Numbers",
          "lessons_total": 4,
          "lessons_completed": 2,
          "icon": "⏰",
          "lessons": [
            { "id": "a1-u2-l1", "title": "Numbers 1 to 100 and Time", "duration": "8 min", "type": "vocabulary", "xp": 20, "vocabulary_ids": ["morning", "evening", "time", "clock", "breakfast"] },
            { "id": "a1-u2-l2", "title": "Present Simple for Habits", "duration": "12 min", "type": "grammar", "xp": 25, "grammar_id": "present_simple" }
          ]
        },
        {
          "id": "a1-u3",
          "title": "3. Family & Everyday Objects",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "👨‍👩‍👧",
          "lessons": [
            { "id": "a1-u3-l1", "title": "Family Members & Possessives", "duration": "10 min", "type": "vocabulary", "xp": 20, "vocabulary_ids": ["father", "mother", "brother", "sister", "family"] },
            { "id": "a1-u3-l2", "title": "Possessives", "duration": "10 min", "type": "grammar", "xp": 25, "grammar_id": "possessives" }
          ]
        },
        {
          "id": "a1-u4",
          "title": "4. Food & Basic Ordering",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "🍎",
          "lessons": [
            { "id": "a1-u4-l1", "title": "Ordering a coffee or snack", "duration": "10 min", "type": "speaking", "xp": 25, "scenario_id": "cafe_basic" },
            { "id": "a1-u4-l2", "title": "Articles", "duration": "10 min", "type": "grammar", "xp": 25, "grammar_id": "articles" }
          ]
        }
      ]
    },
    {
      "id": "A2",
      "name": "Élémentaire",
      "title": "A2 - Élémentaire",
      "description": "Communication simple dans des situations courantes.",
      "color": "#3B82F6",
      "badge": "🚀 Explorer",
      "units_count": 6,
      "lessons_count": 45,
      "units": [
        {
          "id": "a2-u1",
          "title": "1. Daily Life",
          "lessons_total": 8,
          "lessons_completed": 6,
          "icon": "🛋️",
          "lessons": [
            { "id": "a2-u1-l1", "title": "Describing Your Typical Day", "duration": "10 min", "type": "writing", "xp": 25, "prompt_id": "daily_routine" },
            { "id": "a2-u1-l2", "title": "Past Simple", "duration": "10 min", "type": "grammar", "xp": 20, "grammar_id": "past_simple" }
          ]
        },
        {
          "id": "a2-u2",
          "title": "2. At the Restaurant",
          "lessons_total": 8,
          "lessons_completed": 5,
          "icon": "🍽️",
          "lessons": [
            { "id": "a2-u2-l1", "title": "Ordering Food & Asking for the Bill", "duration": "12 min", "type": "speaking", "xp": 30, "scenario_id": "restaurant_order" },
            { "id": "a2-u2-l2", "title": "Prepositions", "duration": "8 min", "type": "grammar", "xp": 20, "grammar_id": "prepositions" }
          ]
        },
        {
          "id": "a2-u3",
          "title": "3. Traveling",
          "lessons_total": 9,
          "lessons_completed": 4,
          "icon": "✈️",
          "lessons": [
            { "id": "a2-u3-l1", "title": "Comparatives", "duration": "12 min", "type": "grammar", "xp": 25, "grammar_id": "comparatives" },
            { "id": "a2-u3-l2", "title": "Listening to Flight Announcements", "duration": "8 min", "type": "listening", "xp": 20, "listening_id": "airport_announcement" }
          ]
        },
        {
          "id": "a2-u4",
          "title": "4. At the Hotel",
          "lessons_total": 8,
          "lessons_completed": 3,
          "icon": "🏨",
          "lessons": [
            { "id": "a2-u4-l1", "title": "Hotel Check-in Dialogue", "duration": "10 min", "type": "speaking", "xp": 30, "scenario_id": "hotel_checkin" },
            { "id": "a2-u4-l2", "title": "Present Continuous", "duration": "12 min", "type": "grammar", "xp": 25, "grammar_id": "present_continuous" }
          ]
        }
      ]
    },
    {
      "id": "B1",
      "name": "Intermédiaire",
      "title": "B1 - Intermédiaire",
      "description": "Compréhension et expression fluide dans la vie quotidienne.",
      "color": "#6366F1",
      "badge": "⭐ Achiever",
      "units_count": 6,
      "lessons_count": 52,
      "units": [
        {
          "id": "b1-u1",
          "title": "1. Present Perfect & Life Experiences",
          "lessons_total": 8,
          "lessons_completed": 5,
          "icon": "🎯",
          "lessons": [
            { "id": "b1-u1-l1", "title": "Grammar: Present Perfect", "duration": "12 min", "type": "grammar", "xp": 30, "grammar_id": "present_perfect" },
            { "id": "b1-u1-l2", "title": "Listening: At the Airport Gate", "duration": "8 min", "type": "listening", "xp": 20, "listening_id": "airport_conversation" }
          ]
        },
        {
          "id": "b1-u2",
          "title": "2. Work & Career Communication",
          "lessons_total": 8,
          "lessons_completed": 3,
          "icon": "💼",
          "lessons": [
            { "id": "b1-u2-l1", "title": "First Conditional", "duration": "14 min", "type": "grammar", "xp": 30, "grammar_id": "first_conditional" },
            { "id": "b1-u2-l2", "title": "Modal Verbs", "duration": "10 min", "type": "grammar", "xp": 25, "grammar_id": "modal_verbs" }
          ]
        },
        {
          "id": "b1-u3",
          "title": "3. Descriptions",
          "lessons_total": 8,
          "lessons_completed": 3,
          "icon": "🗣️",
          "lessons": [
            { "id": "b1-u3-l1", "title": "Relative Clauses", "duration": "14 min", "type": "grammar", "xp": 30, "grammar_id": "relative_clauses" }
          ]
        }
      ]
    },
    {
      "id": "B2",
      "name": "Intermédiaire supérieur",
      "title": "B2 - Intermédiaire supérieur",
      "description": "Conversations complexes et anglais professionnel étendu.",
      "color": "#8B5CF6",
      "badge": "🏆 Master",
      "units_count": 6,
      "lessons_count": 48,
      "units": [
        {
          "id": "b2-u1",
          "title": "1. Conditionals & Hypothetical Thinking",
          "lessons_total": 8,
          "lessons_completed": 2,
          "icon": "🧠",
          "lessons": [
            { "id": "b2-u1-l1", "title": "Second & Third Conditionals", "duration": "15 min", "type": "grammar", "xp": 35, "grammar_id": "second_third_conditional" },
            { "id": "b2-u1-l2", "title": "Business Negotiation Dialogue", "duration": "12 min", "type": "speaking", "xp": 35, "scenario_id": "business_negotiation" }
          ]
        },
        {
          "id": "b2-u2",
          "title": "2. The News",
          "lessons_total": 5,
          "lessons_completed": 0,
          "icon": "📰",
          "lessons": [
            { "id": "b2-u2-l1", "title": "Passive Voice", "duration": "15 min", "type": "grammar", "xp": 40, "grammar_id": "passive_voice" },
            { "id": "b2-u2-l2", "title": "Reported Speech", "duration": "15 min", "type": "grammar", "xp": 40, "grammar_id": "reported_speech" }
          ]
        },
        {
          "id": "b2-u3",
          "title": "3. Past Habits",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "🕰️",
          "lessons": [
            { "id": "b2-u3-l1", "title": "Used To", "duration": "15 min", "type": "grammar", "xp": 40, "grammar_id": "used_to" }
          ]
        }
      ]
    },
    {
      "id": "C1",
      "name": "Avancé",
      "title": "C1 - Avancé",
      "description": "Maîtrise de la langue dans des contextes variés et soutenus.",
      "color": "#EC4899",
      "badge": "👑 Expert",
      "units_count": 6,
      "lessons_count": 40,
      "units": [
        {
          "id": "c1-u1",
          "title": "1. Nuance, Subtlety and Rhetoric",
          "lessons_total": 6,
          "lessons_completed": 1,
          "icon": "🎭",
          "lessons": [
            { "id": "c1-u1-l1", "title": "Advanced Inversion", "duration": "15 min", "type": "grammar", "xp": 40, "grammar_id": "inversion" }
          ]
        },
        {
          "id": "c1-u2",
          "title": "2. Complex Conditions",
          "lessons_total": 5,
          "lessons_completed": 0,
          "icon": "📝",
          "lessons": [
            { "id": "c1-u2-l1", "title": "Mixed Conditionals", "duration": "20 min", "type": "grammar", "xp": 50, "grammar_id": "mixed_conditionals" },
            { "id": "c1-u2-l2", "title": "Cleft Sentences", "duration": "20 min", "type": "grammar", "xp": 50, "grammar_id": "cleft_sentences" }
          ]
        },
        {
          "id": "c1-u3",
          "title": "3. Official Speak",
          "lessons_total": 5,
          "lessons_completed": 0,
          "icon": "🏛️",
          "lessons": [
            { "id": "c1-u3-l1", "title": "Subjunctive", "duration": "15 min", "type": "grammar", "xp": 45, "grammar_id": "subjunctive" }
          ]
        }
      ]
    },
    {
      "id": "C2",
      "name": "Maîtrise",
      "title": "C2 - Maîtrise",
      "description": "Niveau natif – compréhension et expression spontanées et précises.",
      "color": "#F59E0B",
      "badge": "🌟 Polyglot Legend",
      "units_count": 6,
      "lessons_count": 36,
      "units": [
        {
          "id": "c2-u1",
          "title": "1. Native Idiomatic Fluency",
          "lessons_total": 6,
          "lessons_completed": 0,
          "icon": "🎓",
          "lessons": [
            { "id": "c2-u1-l1", "title": "Ellipsis", "duration": "15 min", "type": "grammar", "xp": 45, "grammar_id": "ellipsis_substitution" }
          ]
        },
        {
          "id": "c2-u2",
          "title": "2. Literary Mastery",
          "lessons_total": 5,
          "lessons_completed": 0,
          "icon": "📚",
          "lessons": [
            { "id": "c2-u2-l1", "title": "Fronting", "duration": "25 min", "type": "grammar", "xp": 55, "grammar_id": "fronting" },
            { "id": "c2-u2-l2", "title": "Discourse Markers", "duration": "25 min", "type": "grammar", "xp": 55, "grammar_id": "discourse_markers" }
          ]
        },
        {
          "id": "c2-u3",
          "title": "3. Style",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "🖋️",
          "lessons": [
            { "id": "c2-u3-l1", "title": "Register & Style", "duration": "20 min", "type": "grammar", "xp": 60, "grammar_id": "register_style" }
          ]
        }
      ]
    }
  ],
  "grammar_modules": [
    { "id": "verb_to_be", "level": "A1", "title": "Verb 'To Be' (am / is / are)", "description": "Master the most fundamental verb in English.", "questions": [
      { "question": "I ______ a student.", "options": ["am", "is", "are", "be"], "correct_index": 0, "explanation": "'I' pairs with 'am'." },
      { "question": "She ______ happy.", "options": ["am", "is", "are", "be"], "correct_index": 1, "explanation": "'She' pairs with 'is'." },
      { "question": "They ______ my friends.", "options": ["am", "is", "are", "be"], "correct_index": 2, "explanation": "'They' pairs with 'are'." },
      { "question": "We ______ late.", "options": ["am", "is", "are", "be"], "correct_index": 2, "explanation": "'We' pairs with 'are'." },
      { "question": "He ______ a doctor.", "options": ["am", "is", "are", "be"], "correct_index": 1, "explanation": "'He' pairs with 'is'." }
    ]},
    { "id": "present_simple", "level": "A1", "title": "Present Simple", "description": "Talk about routines and habits.", "questions": [
      { "question": "She ______ to school every day.", "options": ["go", "goes", "going", "gone"], "correct_index": 1, "explanation": "Third person singular 's' rule: She goes." },
      { "question": "I ______ coffee.", "options": ["likes", "like", "liking", "liked"], "correct_index": 1, "explanation": "'I' does not take an 's'." },
      { "question": "He ______ tennis on Sundays.", "options": ["play", "plays", "playing", "played"], "correct_index": 1, "explanation": "Third person singular 's' rule." },
      { "question": "They ______ work at 5 PM.", "options": ["finish", "finishes", "finishing", "finished"], "correct_index": 0, "explanation": "'They' does not take an 's'." },
      { "question": "It ______ a lot in winter.", "options": ["rain", "rains", "raining", "rained"], "correct_index": 1, "explanation": "'It' takes the 's'." }
    ]},
    { "id": "articles", "level": "A1", "title": "Articles", "description": "Learn a, an, and the.", "questions": [
      { "question": "I saw ______ cat.", "options": ["a", "an", "the", "none"], "correct_index": 0, "explanation": "Use 'a' before consonants." },
      { "question": "She has ______ apple.", "options": ["a", "an", "the", "none"], "correct_index": 1, "explanation": "Use 'an' before vowels." },
      { "question": "______ sun is hot.", "options": ["A", "An", "The", "none"], "correct_index": 2, "explanation": "Use 'the' for unique things." },
      { "question": "He is ______ honest man.", "options": ["a", "an", "the", "none"], "correct_index": 1, "explanation": "'honest' starts with a vowel sound." },
      { "question": "I bought ______ car.", "options": ["a", "an", "the", "none"], "correct_index": 0, "explanation": "General car." }
    ]},
    { "id": "possessives", "level": "A1", "title": "Possessives", "description": "Talk about ownership.", "questions": [
      { "question": "This is ______ book.", "options": ["my", "mine", "me", "I"], "correct_index": 0, "explanation": "'my' is the possessive adjective." },
      { "question": "Is that ______ car?", "options": ["you", "your", "yours", "yourself"], "correct_index": 1, "explanation": "'your' is the possessive adjective." },
      { "question": "______ name is John.", "options": ["His", "Him", "He", "Himself"], "correct_index": 0, "explanation": "'His' for males." },
      { "question": "______ dress is blue.", "options": ["She", "Her", "Hers", "Herself"], "correct_index": 1, "explanation": "'Her' for females." },
      { "question": "We love ______ house.", "options": ["our", "ours", "we", "us"], "correct_index": 0, "explanation": "'our' for 'we'." }
    ]},
    { "id": "past_simple", "level": "A2", "title": "Past Simple", "description": "Talk about finished past actions.", "questions": [
      { "question": "I ______ to the park yesterday.", "options": ["go", "goes", "went", "gone"], "correct_index": 2, "explanation": "Irregular past of 'go' is 'went'." },
      { "question": "She ______ pizza last night.", "options": ["eat", "eats", "ate", "eaten"], "correct_index": 2, "explanation": "Irregular past of 'eat' is 'ate'." },
      { "question": "They ______ TV all evening.", "options": ["watch", "watches", "watched", "watching"], "correct_index": 2, "explanation": "Regular past ends in -ed." },
      { "question": "We ______ a great time.", "options": ["have", "has", "had", "having"], "correct_index": 2, "explanation": "Irregular past of 'have' is 'had'." },
      { "question": "He ______ his homework.", "options": ["do", "does", "did", "done"], "correct_index": 2, "explanation": "Irregular past of 'do' is 'did'." }
    ]},
    { "id": "prepositions", "level": "A2", "title": "Prepositions", "description": "Place and Time.", "questions": [
      { "question": "The book is ______ the table.", "options": ["in", "on", "at", "under"], "correct_index": 1, "explanation": "Use 'on' for surfaces." },
      { "question": "I will see you ______ Monday.", "options": ["in", "on", "at", "by"], "correct_index": 1, "explanation": "Use 'on' for days." },
      { "question": "She is ______ school.", "options": ["in", "on", "at", "by"], "correct_index": 2, "explanation": "Use 'at' for specific places." },
      { "question": "My birthday is ______ August.", "options": ["in", "on", "at", "by"], "correct_index": 0, "explanation": "Use 'in' for months." },
      { "question": "The cat is ______ the bed.", "options": ["in", "on", "at", "under"], "correct_index": 3, "explanation": "Use 'under' for below." }
    ]},
    { "id": "comparatives", "level": "A2", "title": "Comparatives", "description": "Comparing things.", "questions": [
      { "question": "He is ______ than me.", "options": ["tall", "taller", "tallest", "more tall"], "correct_index": 1, "explanation": "Add -er for short adjectives." },
      { "question": "This book is ______ than that one.", "options": ["interesting", "interestinger", "more interesting", "most interesting"], "correct_index": 2, "explanation": "Use 'more' for long adjectives." },
      { "question": "She is the ______ girl in class.", "options": ["smart", "smarter", "smartest", "most smart"], "correct_index": 2, "explanation": "Superlative -est." },
      { "question": "My car is ______ than yours.", "options": ["good", "better", "best", "more good"], "correct_index": 1, "explanation": "Irregular 'good' -> 'better'." },
      { "question": "This is the ______ day ever.", "options": ["bad", "worse", "worst", "most bad"], "correct_index": 2, "explanation": "Irregular 'bad' -> 'worst'." }
    ]},
    { "id": "present_continuous", "level": "A2", "title": "Present Continuous", "description": "Actions happening right now.", "questions": [
      { "question": "I ______ right now.", "options": ["study", "am studying", "studied", "studies"], "correct_index": 1, "explanation": "'am' + verb-ing." },
      { "question": "She ______ TV at the moment.", "options": ["watch", "is watching", "watches", "watched"], "correct_index": 1, "explanation": "'is' + verb-ing." },
      { "question": "They ______ dinner.", "options": ["eat", "eating", "are eating", "eats"], "correct_index": 2, "explanation": "'are' + verb-ing." },
      { "question": "Look! It ______.", "options": ["rain", "rains", "is raining", "rained"], "correct_index": 2, "explanation": "'is' + verb-ing." },
      { "question": "We ______ for the bus.", "options": ["wait", "waiting", "are waiting", "waits"], "correct_index": 2, "explanation": "'are' + verb-ing." }
    ]},
    { "id": "present_perfect", "level": "B1", "title": "Present Perfect", "description": "Past events with present results.", "questions": [
      { "question": "She ______ in London for five years.", "options": ["has lived", "have lived", "lived", "is living"], "correct_index": 0, "explanation": "With 'She', we use 'has' + past participle 'lived'." },
      { "question": "I ______ such a beautiful sunset before.", "options": ["have never saw", "has never seen", "have never seen", "never have saw"], "correct_index": 2, "explanation": "'have never seen'." },
      { "question": "______ you ever ______ to New York?", "options": ["Did / be", "Have / been", "Has / been", "Do / be"], "correct_index": 1, "explanation": "Question form for life experience: 'Have you ever been...?'" },
      { "question": "He ______ his homework.", "options": ["has already finished", "already has finished", "finished already", "have already finished"], "correct_index": 0, "explanation": "Adverb placement." },
      { "question": "They ______ here since 2010.", "options": ["have been", "were", "are", "has been"], "correct_index": 0, "explanation": "Since + point in time." }
    ]},
    { "id": "first_conditional", "level": "B1", "title": "First Conditional", "description": "Real future possibilities.", "questions": [
      { "question": "If it rains, we ______ at home.", "options": ["stay", "will stay", "would stay", "stayed"], "correct_index": 1, "explanation": "If + present, will + verb." },
      { "question": "If she ______, I will tell her.", "options": ["call", "calls", "will call", "called"], "correct_index": 1, "explanation": "If clause uses present simple." },
      { "question": "I will buy a car if I ______ enough money.", "options": ["save", "saves", "will save", "saved"], "correct_index": 0, "explanation": "Present simple." },
      { "question": "If you don't hurry, you ______ the train.", "options": ["miss", "will miss", "missed", "would miss"], "correct_index": 1, "explanation": "Will + verb." },
      { "question": "What will you do if she ______?", "options": ["leave", "leaves", "will leave", "left"], "correct_index": 1, "explanation": "Present simple." }
    ]},
    { "id": "modal_verbs", "level": "B1", "title": "Modal Verbs", "description": "Ability, obligation, and advice.", "questions": [
      { "question": "You ______ smoke here.", "options": ["can", "mustn't", "should", "have to"], "correct_index": 1, "explanation": "Prohibition." },
      { "question": "She ______ speak three languages.", "options": ["can", "should", "must", "might"], "correct_index": 0, "explanation": "Ability." },
      { "question": "I think you ______ see a doctor.", "options": ["can", "should", "must", "might"], "correct_index": 1, "explanation": "Advice." },
      { "question": "We ______ wear a uniform at school.", "options": ["can", "might", "have to", "should"], "correct_index": 2, "explanation": "External obligation." },
      { "question": "It ______ rain later.", "options": ["must", "can", "should", "might"], "correct_index": 3, "explanation": "Possibility." }
    ]},
    { "id": "relative_clauses", "level": "B1", "title": "Relative Clauses", "description": "Adding information with who, which, that.", "questions": [
      { "question": "The man ______ lives next door is friendly.", "options": ["which", "who", "where", "whose"], "correct_index": 1, "explanation": "'who' for people." },
      { "question": "The car ______ I bought is red.", "options": ["who", "which", "where", "whose"], "correct_index": 1, "explanation": "'which' for things." },
      { "question": "That's the house ______ I was born.", "options": ["which", "who", "where", "whose"], "correct_index": 2, "explanation": "'where' for places." },
      { "question": "The woman ______ car was stolen went to the police.", "options": ["who", "which", "where", "whose"], "correct_index": 3, "explanation": "'whose' for possession." },
      { "question": "This is the book ______ everyone is talking about.", "options": ["who", "which", "where", "whose"], "correct_index": 1, "explanation": "'which' (or that) for things." }
    ]},
    { "id": "second_third_conditional", "level": "B2", "title": "Second & Third Conditionals", "description": "Hypothetical and unreal situations.", "questions": [
      { "question": "If I ______ a million dollars, I would buy a yacht.", "options": ["have", "had", "will have", "had had"], "correct_index": 1, "explanation": "Second conditional: If + past simple." },
      { "question": "If she had studied harder, she ______ the exam.", "options": ["would pass", "would have passed", "passed", "will pass"], "correct_index": 1, "explanation": "Third conditional: would have + past participle." },
      { "question": "If I were you, I ______ go there.", "options": ["will not", "do not", "would not", "have not"], "correct_index": 2, "explanation": "Second conditional advice." },
      { "question": "We would have won if we ______ better.", "options": ["play", "played", "had played", "have played"], "correct_index": 2, "explanation": "Third conditional: If + past perfect." },
      { "question": "What would you do if you ______ a ghost?", "options": ["see", "saw", "had seen", "have seen"], "correct_index": 1, "explanation": "Second conditional." }
    ]},
    { "id": "passive_voice", "level": "B2", "title": "Passive Voice", "description": "Focusing on the action receiver.", "questions": [
      { "question": "The book ______ by Stephen King.", "options": ["wrote", "was written", "was wrote", "written"], "correct_index": 1, "explanation": "Past simple passive: was + past participle." },
      { "question": "My car ______ right now.", "options": ["is repaired", "is being repaired", "repairs", "has repaired"], "correct_index": 1, "explanation": "Present continuous passive." },
      { "question": "The letters ______ every morning.", "options": ["deliver", "are delivered", "delivered", "are delivering"], "correct_index": 1, "explanation": "Present simple passive." },
      { "question": "A new hospital ______ built next year.", "options": ["will be", "is", "was", "has been"], "correct_index": 0, "explanation": "Future passive." },
      { "question": "The work ______ finished yet.", "options": ["has not", "is not", "has not been", "was not"], "correct_index": 2, "explanation": "Present perfect passive." }
    ]},
    { "id": "reported_speech", "level": "B2", "title": "Reported Speech", "description": "Reporting what someone said.", "questions": [
      { "question": "He said, 'I am tired.' -> He said that he ______ tired.", "options": ["am", "is", "was", "were"], "correct_index": 2, "explanation": "Present changes to past." },
      { "question": "She asked, 'Where do you live?' -> She asked me where I ______.", "options": ["live", "lived", "do live", "am living"], "correct_index": 1, "explanation": "Present simple changes to past simple." },
      { "question": "He said he ______ arrive late.", "options": ["will", "would", "shall", "can"], "correct_index": 1, "explanation": "'Will' changes to 'would'." },
      { "question": "They said they ______ seen the movie.", "options": ["have", "had", "did", "were"], "correct_index": 1, "explanation": "Present perfect changes to past perfect." },
      { "question": "She told me ______ open the door.", "options": ["to not", "not to", "don't", "didn't"], "correct_index": 1, "explanation": "Negative command: not to + verb." }
    ]},
    { "id": "used_to", "level": "B2", "title": "Used to / Would for Past Habits", "description": "Talking about the past.", "questions": [
      { "question": "I ______ smoke, but I quit last year.", "options": ["use to", "used to", "would", "am used to"], "correct_index": 1, "explanation": "Used to for past habits." },
      { "question": "When we were kids, we ______ play outside all day.", "options": ["used", "would", "use to", "are used to"], "correct_index": 1, "explanation": "'Would' can express typical past behavior." },
      { "question": "She didn't ______ like vegetables.", "options": ["use to", "used to", "would", "uses to"], "correct_index": 0, "explanation": "Didn't use to (base form after did)." },
      { "question": "I am ______ waking up early.", "options": ["used to", "use to", "would", "using to"], "correct_index": 0, "explanation": "Be used to + -ing." },
      { "question": "Did you ______ have long hair?", "options": ["used to", "use to", "would", "used"], "correct_index": 1, "explanation": "Base form 'use to' in questions." }
    ]},
    { "id": "inversion", "level": "C1", "title": "Inversion", "description": "Hardly had... / Not only...", "questions": [
      { "question": "Hardly ______ arrived when it started to rain.", "options": ["I had", "had I", "did I", "I did"], "correct_index": 1, "explanation": "Inversion after 'Hardly'." },
      { "question": "Not only ______ late, but he also forgot the tickets.", "options": ["was he", "he was", "did he", "he did"], "correct_index": 0, "explanation": "Inversion after 'Not only'." },
      { "question": "Rarely ______ such a beautiful voice.", "options": ["I have heard", "have I heard", "do I heard", "heard I"], "correct_index": 1, "explanation": "Inversion after 'Rarely'." },
      { "question": "Under no circumstances ______ the door unlocked.", "options": ["you should leave", "should you leave", "you leave", "leave you"], "correct_index": 1, "explanation": "Inversion after negative adverbial phrases." },
      { "question": "Never before ______ seen anything like it.", "options": ["she had", "had she", "did she", "she did"], "correct_index": 1, "explanation": "Inversion after 'Never before'." }
    ]},
    { "id": "mixed_conditionals", "level": "C1", "title": "Mixed Conditionals", "description": "Mixing past conditions and present results.", "questions": [
      { "question": "If I had taken that job, I ______ in Paris right now.", "options": ["will be", "would be", "would have been", "am"], "correct_index": 1, "explanation": "Past condition (had taken) -> present result (would be)." },
      { "question": "If she wasn't so shy, she ______ to him at the party last night.", "options": ["would speak", "would have spoken", "spoke", "had spoken"], "correct_index": 1, "explanation": "Present trait -> past result." },
      { "question": "If we had brought a map, we ______ lost now.", "options": ["wouldn't be", "won't be", "wouldn't have been", "aren't"], "correct_index": 0, "explanation": "Past condition -> present result." },
      { "question": "If I knew Spanish, I ______ the document yesterday.", "options": ["translated", "would translate", "would have translated", "had translated"], "correct_index": 2, "explanation": "Present trait -> past result." },
      { "question": "If he had slept better, he ______ so tired today.", "options": ["wouldn't have been", "wouldn't be", "won't be", "isn't"], "correct_index": 1, "explanation": "Past condition -> present result." }
    ]},
    { "id": "cleft_sentences", "level": "C1", "title": "Cleft Sentences", "description": "Emphasis using 'It is... that...'", "questions": [
      { "question": "______ was John who broke the window.", "options": ["He", "This", "It", "That"], "correct_index": 2, "explanation": "'It' is used in cleft sentences." },
      { "question": "What I need ______ a good cup of coffee.", "options": ["is", "are", "be", "am"], "correct_index": 0, "explanation": "Singular verb for 'What I need'." },
      { "question": "It was in 1999 ______ they met.", "options": ["when", "that", "which", "where"], "correct_index": 1, "explanation": "'that' often follows 'It was...'." },
      { "question": "The person ______ told me was Sarah.", "options": ["who", "which", "whom", "whose"], "correct_index": 0, "explanation": "'who' for a person." },
      { "question": "All I want ______ to sleep.", "options": ["is", "are", "be", "were"], "correct_index": 0, "explanation": "'All I want' takes a singular verb." }
    ]},
    { "id": "subjunctive", "level": "C1", "title": "Subjunctive Mood", "description": "Expressing wishes, demands, suggestions.", "questions": [
      { "question": "It is essential that he ______ present at the meeting.", "options": ["is", "be", "was", "will be"], "correct_index": 1, "explanation": "Base form 'be' for subjunctive." },
      { "question": "The doctor recommended that she ______ smoking.", "options": ["stop", "stops", "stopped", "stopping"], "correct_index": 0, "explanation": "Base form 'stop' for subjunctive." },
      { "question": "I suggest that John ______ early.", "options": ["arrives", "arrive", "arrived", "will arrive"], "correct_index": 1, "explanation": "Base form 'arrive'." },
      { "question": "I demand that the manager ______ to me.", "options": ["speaks", "speak", "spoke", "speaking"], "correct_index": 1, "explanation": "Base form 'speak'." },
      { "question": "It is crucial that they ______ informed.", "options": ["are", "be", "will be", "were"], "correct_index": 1, "explanation": "Base form 'be'." }
    ]},
    { "id": "ellipsis_substitution", "level": "C2", "title": "Ellipsis & Substitution", "description": "Advanced economy of language.", "questions": [
      { "question": "I don't have a pen. Do you have ______?", "options": ["it", "one", "some", "any"], "correct_index": 1, "explanation": "'one' substitutes 'a pen'." },
      { "question": "He loves jazz, and so ______ I.", "options": ["do", "am", "have", "love"], "correct_index": 0, "explanation": "'do' substitutes the present simple verb." },
      { "question": "I thought she would come, but she didn't ______.", "options": ["come", "came", "do", "coming"], "correct_index": 0, "explanation": "Ellipsis of the main verb." },
      { "question": "Are they arriving today? I hope ______.", "options": ["it", "so", "that", "this"], "correct_index": 1, "explanation": "'so' substitutes the whole clause." },
      { "question": "She didn't pass, ______ is a pity.", "options": ["what", "which", "that", "it"], "correct_index": 1, "explanation": "'which' refers to the whole previous clause." }
    ]},
    { "id": "fronting", "level": "C2", "title": "Fronting & Topicalisation", "description": "Changing word order for emphasis.", "questions": [
      { "question": "Out of the darkness ______ a huge bear.", "options": ["came", "did come", "comes", "has come"], "correct_index": 0, "explanation": "Inversion after place adverbial." },
      { "question": "A genius he ______ not.", "options": ["is", "be", "was", "are"], "correct_index": 0, "explanation": "Fronting the complement." },
      { "question": "That I will ______ tolerate.", "options": ["never", "not", "no", "none"], "correct_index": 0, "explanation": "Fronting the object." },
      { "question": "Into the room ______ the teacher.", "options": ["walked", "did walk", "walks", "walking"], "correct_index": 0, "explanation": "Fronting directional phrase." },
      { "question": "Strange ______ it may seem, I like Monday mornings.", "options": ["as", "though", "although", "but"], "correct_index": 0, "explanation": "Adjective + as + subject + verb." }
    ]},
    { "id": "discourse_markers", "level": "C2", "title": "Discourse Markers", "description": "Advanced linking words.", "questions": [
      { "question": "______, I would like to thank my parents.", "options": ["Foremost", "First and foremost", "Firstly", "At first"], "correct_index": 1, "explanation": "Idiomatic discourse marker." },
      { "question": "It's expensive; ______, it's worth it.", "options": ["nevertheless", "furthermore", "besides", "thus"], "correct_index": 0, "explanation": "Contrast." },
      { "question": "______, we must consider the economic impact.", "options": ["By and large", "Namely", "In hindsight", "Moreover"], "correct_index": 3, "explanation": "Adding a point." },
      { "question": "______, I don't really care.", "options": ["To be honest", "Honestly speaking", "Frankly", "All of the above"], "correct_index": 3, "explanation": "All are correct." },
      { "question": "He is not stupid. ______, he is quite brilliant.", "options": ["On the contrary", "Conversely", "Instead", "Rather"], "correct_index": 0, "explanation": "Contradicting a negative statement." }
    ]},
    { "id": "register_style", "level": "C2", "title": "Register, Style & Idiomatic Precision", "description": "Mastering tone and style.", "questions": [
      { "question": "He was ______ disappointed by the results.", "options": ["bitterly", "strongly", "heavily", "deeply"], "correct_index": 0, "explanation": "Collocation: bitterly disappointed." },
      { "question": "She possesses a ______ intellect.", "options": ["sharp", "keen", "profound", "All of the above"], "correct_index": 3, "explanation": "All collocate with intellect." },
      { "question": "The plan was fraught ______ danger.", "options": ["with", "of", "in", "by"], "correct_index": 0, "explanation": "Fraught with." },
      { "question": "His argument doesn't hold ______.", "options": ["water", "fire", "air", "ground"], "correct_index": 0, "explanation": "Idiom: hold water." },
      { "question": "We must nip this problem in the ______.", "options": ["bud", "end", "root", "start"], "correct_index": 0, "explanation": "Idiom: nip in the bud." }
    ]}
  ],
  "vocabulary_items": [
    {"id": "v_a1_1", "word": "Family", "phonetic": "/ˈfæm.əl.i/", "level": "A1", "category": "Family", "translation": "Famille", "definition": "A group of parents and children.", "example": "I have a big family.", "image_icon": "👨‍👩‍👧", "srs_state": "new"},
    {"id": "v_a1_2", "word": "Mother", "phonetic": "/ˈmʌð.ɚ/", "level": "A1", "category": "Family", "translation": "Mère", "definition": "A female parent.", "example": "My mother is kind.", "image_icon": "👩", "srs_state": "new"},
    {"id": "v_a1_3", "word": "Father", "phonetic": "/ˈfɑː.ðɚ/", "level": "A1", "category": "Family", "translation": "Père", "definition": "A male parent.", "example": "My father works hard.", "image_icon": "👨", "srs_state": "new"},
    {"id": "v_a1_4", "word": "Apple", "phonetic": "/ˈæp.əl/", "level": "A1", "category": "Food", "translation": "Pomme", "definition": "A round fruit with red or green skin.", "example": "I eat an apple every day.", "image_icon": "🍎", "srs_state": "new"},
    {"id": "v_a1_5", "word": "Bread", "phonetic": "/bred/", "level": "A1", "category": "Food", "translation": "Pain", "definition": "Food made from flour and water.", "example": "I like bread with butter.", "image_icon": "🍞", "srs_state": "new"},
    {"id": "v_a1_6", "word": "Red", "phonetic": "/red/", "level": "A1", "category": "Colors", "translation": "Rouge", "definition": "The color of blood or tomatoes.", "example": "My car is red.", "image_icon": "🔴", "srs_state": "new"},
    {"id": "v_a1_7", "word": "Blue", "phonetic": "/bluː/", "level": "A1", "category": "Colors", "translation": "Bleu", "definition": "The color of the sky.", "example": "The sky is blue.", "image_icon": "🔵", "srs_state": "new"},
    {"id": "v_a1_8", "word": "One", "phonetic": "/wʌn/", "level": "A1", "category": "Numbers", "translation": "Un", "definition": "The number 1.", "example": "I have one brother.", "image_icon": "1️⃣", "srs_state": "new"},
    {"id": "v_a1_9", "word": "Two", "phonetic": "/tuː/", "level": "A1", "category": "Numbers", "translation": "Deux", "definition": "The number 2.", "example": "She has two cats.", "image_icon": "2️⃣", "srs_state": "new"},
    {"id": "v_a1_10", "word": "Head", "phonetic": "/hed/", "level": "A1", "category": "Body", "translation": "Tête", "definition": "The top part of the body.", "example": "My head hurts.", "image_icon": "👤", "srs_state": "new"},
    {"id": "v_a1_11", "word": "Hand", "phonetic": "/hænd/", "level": "A1", "category": "Body", "translation": "Main", "definition": "The part of the arm at the end.", "example": "Wash your hands.", "image_icon": "🖐️", "srs_state": "new"},
    {"id": "v_a1_12", "word": "House", "phonetic": "/haʊs/", "level": "A1", "category": "Home", "translation": "Maison", "definition": "A building for human habitation.", "example": "We live in a big house.", "image_icon": "🏠", "srs_state": "new"},
    {"id": "v_a1_13", "word": "Door", "phonetic": "/dɔːr/", "level": "A1", "category": "Home", "translation": "Porte", "definition": "An entrance to a room or building.", "example": "Open the door, please.", "image_icon": "🚪", "srs_state": "new"},
    {"id": "v_a1_14", "word": "Window", "phonetic": "/ˈwɪn.doʊ/", "level": "A1", "category": "Home", "translation": "Fenêtre", "definition": "An opening in a wall to let in light.", "example": "Look out the window.", "image_icon": "🪟", "srs_state": "new"},
    {"id": "v_a1_15", "word": "Table", "phonetic": "/ˈteɪ.bəl/", "level": "A1", "category": "Home", "translation": "Table", "definition": "A piece of furniture with a flat top.", "example": "Put the book on the table.", "image_icon": "🪑", "srs_state": "new"},

    {"id": "v_a2_1", "word": "Airport", "phonetic": "/ˈer.pɔːrt/", "level": "A2", "category": "Travel", "translation": "Aéroport", "definition": "A place where planes take off and land.", "example": "We arrived at the airport two hours early.", "image_icon": "✈️", "srs_state": "new"},
    {"id": "v_a2_2", "word": "Flight", "phonetic": "/flaɪt/", "level": "A2", "category": "Travel", "translation": "Vol", "definition": "A journey made through the air.", "example": "Our flight was delayed.", "image_icon": "🛫", "srs_state": "new"},
    {"id": "v_a2_3", "word": "Store", "phonetic": "/stɔːr/", "level": "A2", "category": "Shopping", "translation": "Magasin", "definition": "A place where goods are sold.", "example": "I need to go to the store.", "image_icon": "🏪", "srs_state": "new"},
    {"id": "v_a2_4", "word": "Price", "phonetic": "/praɪs/", "level": "A2", "category": "Shopping", "translation": "Prix", "definition": "The amount of money expected.", "example": "What is the price of this shirt?", "image_icon": "💰", "srs_state": "new"},
    {"id": "v_a2_5", "word": "Morning", "phonetic": "/ˈmɔːr.nɪŋ/", "level": "A2", "category": "Daily Life", "translation": "Matin", "definition": "The early part of the day.", "example": "I drink coffee in the morning.", "image_icon": "🌅", "srs_state": "new"},
    {"id": "v_a2_6", "word": "Evening", "phonetic": "/ˈiːv.nɪŋ/", "level": "A2", "category": "Daily Life", "translation": "Soir", "definition": "The latter part of the day.", "example": "We watch TV in the evening.", "image_icon": "🌇", "srs_state": "new"},
    {"id": "v_a2_7", "word": "Rain", "phonetic": "/reɪn/", "level": "A2", "category": "Weather", "translation": "Pluie", "definition": "Water falling in drops from clouds.", "example": "It will rain tomorrow.", "image_icon": "🌧️", "srs_state": "new"},
    {"id": "v_a2_8", "word": "Sun", "phonetic": "/sʌn/", "level": "A2", "category": "Weather", "translation": "Soleil", "definition": "The star around which the earth orbits.", "example": "The sun is shining.", "image_icon": "☀️", "srs_state": "new"},
    {"id": "v_a2_9", "word": "Bus", "phonetic": "/bʌs/", "level": "A2", "category": "Transport", "translation": "Bus", "definition": "A large motor vehicle.", "example": "I take the bus to work.", "image_icon": "🚌", "srs_state": "new"},
    {"id": "v_a2_10", "word": "Train", "phonetic": "/treɪn/", "level": "A2", "category": "Transport", "translation": "Train", "definition": "A series of connected railway cars.", "example": "The train leaves at 5 PM.", "image_icon": "🚆", "srs_state": "new"},
    {"id": "v_a2_11", "word": "Doctor", "phonetic": "/ˈdɑːk.tɚ/", "level": "A2", "category": "Health", "translation": "Docteur", "definition": "A qualified practitioner of medicine.", "example": "You should see a doctor.", "image_icon": "👨‍⚕️", "srs_state": "new"},
    {"id": "v_a2_12", "word": "Medicine", "phonetic": "/ˈmed.ɪ.sən/", "level": "A2", "category": "Health", "translation": "Médicament", "definition": "A drug or other preparation for the treatment of disease.", "example": "Take this medicine twice a day.", "image_icon": "💊", "srs_state": "new"},
    {"id": "v_a2_13", "word": "Hospital", "phonetic": "/ˈhɑː.spɪ.təl/", "level": "A2", "category": "Health", "translation": "Hôpital", "definition": "An institution providing medical treatment.", "example": "She works at the hospital.", "image_icon": "🏥", "srs_state": "new"},
    {"id": "v_a2_14", "word": "Ticket", "phonetic": "/ˈtɪk.ɪt/", "level": "A2", "category": "Travel", "translation": "Billet", "definition": "A piece of paper giving the right of admission.", "example": "I bought a train ticket.", "image_icon": "🎫", "srs_state": "new"},
    {"id": "v_a2_15", "word": "Luggage", "phonetic": "/ˈlʌɡ.ɪdʒ/", "level": "A2", "category": "Travel", "translation": "Bagages", "definition": "Suitcases or other bags.", "example": "Where is my luggage?", "image_icon": "🧳", "srs_state": "new"},

    {"id": "v_b1_1", "word": "Colleague", "phonetic": "/ˈkɑː.liːɡ/", "level": "B1", "category": "Work", "translation": "Collègue", "definition": "A person with whom one works.", "example": "I had lunch with a colleague.", "image_icon": "👥", "srs_state": "new"},
    {"id": "v_b1_2", "word": "Meeting", "phonetic": "/ˈmiː.tɪŋ/", "level": "B1", "category": "Work", "translation": "Réunion", "definition": "An assembly of people for a purpose.", "example": "The meeting starts at 10.", "image_icon": "📅", "srs_state": "new"},
    {"id": "v_b1_3", "word": "Degree", "phonetic": "/dɪˈɡriː/", "level": "B1", "category": "Education", "translation": "Diplôme", "definition": "An academic rank.", "example": "She has a degree in physics.", "image_icon": "🎓", "srs_state": "new"},
    {"id": "v_b1_4", "word": "Campus", "phonetic": "/ˈkæm.pəs/", "level": "B1", "category": "Education", "translation": "Campus", "definition": "The grounds and buildings of a university.", "example": "The campus is huge.", "image_icon": "🏫", "srs_state": "new"},
    {"id": "v_b1_5", "word": "Software", "phonetic": "/ˈsɑːft.wer/", "level": "B1", "category": "Technology", "translation": "Logiciel", "definition": "The programs used by a computer.", "example": "I installed new software.", "image_icon": "💻", "srs_state": "new"},
    {"id": "v_b1_6", "word": "Network", "phonetic": "/ˈnet.wɝːk/", "level": "B1", "category": "Technology", "translation": "Réseau", "definition": "A group of interconnected computers.", "example": "The network is down.", "image_icon": "🌐", "srs_state": "new"},
    {"id": "v_b1_7", "word": "Climate", "phonetic": "/ˈklaɪ.mət/", "level": "B1", "category": "Environment", "translation": "Climat", "definition": "The weather conditions prevailing in an area.", "example": "The climate is changing.", "image_icon": "🌍", "srs_state": "new"},
    {"id": "v_b1_8", "word": "Pollution", "phonetic": "/pəˈluː.ʃən/", "level": "B1", "category": "Environment", "translation": "Pollution", "definition": "The presence of harmful substances.", "example": "Pollution is a big problem.", "image_icon": "🏭", "srs_state": "new"},
    {"id": "v_b1_9", "word": "Journalist", "phonetic": "/ˈdʒɝː.nə.lɪst/", "level": "B1", "category": "Media", "translation": "Journaliste", "definition": "A person who writes for newspapers.", "example": "He is a famous journalist.", "image_icon": "📰", "srs_state": "new"},
    {"id": "v_b1_10", "word": "Broadcast", "phonetic": "/ˈbrɑːd.kæst/", "level": "B1", "category": "Media", "translation": "Diffusion", "definition": "Transmit by radio or TV.", "example": "The broadcast was live.", "image_icon": "📡", "srs_state": "new"},
    {"id": "v_b1_11", "word": "Photography", "phonetic": "/fəˈtɑː.ɡrə.fi/", "level": "B1", "category": "Hobbies", "translation": "Photographie", "definition": "The art of taking photos.", "example": "I enjoy photography.", "image_icon": "📷", "srs_state": "new"},
    {"id": "v_b1_12", "word": "Gardening", "phonetic": "/ˈɡɑːr.dən.ɪŋ/", "level": "B1", "category": "Hobbies", "translation": "Jardinage", "definition": "The practice of growing plants.", "example": "Gardening is relaxing.", "image_icon": "🌱", "srs_state": "new"},
    {"id": "v_b1_13", "word": "Salary", "phonetic": "/ˈsæl.ɚ.i/", "level": "B1", "category": "Work", "translation": "Salaire", "definition": "A fixed regular payment.", "example": "He earns a good salary.", "image_icon": "💵", "srs_state": "new"},
    {"id": "v_b1_14", "word": "Exam", "phonetic": "/ɪɡˈzæm/", "level": "B1", "category": "Education", "translation": "Examen", "definition": "A formal test of knowledge.", "example": "I passed my exam.", "image_icon": "📝", "srs_state": "new"},
    {"id": "v_b1_15", "word": "Keyboard", "phonetic": "/ˈkiː.bɔːrd/", "level": "B1", "category": "Technology", "translation": "Clavier", "definition": "A panel of keys.", "example": "My keyboard is broken.", "image_icon": "⌨️", "srs_state": "new"},

    {"id": "v_b2_1", "word": "Negotiation", "phonetic": "/nəˌɡoʊ.ʃiˈeɪ.ʃən/", "level": "B2", "category": "Business", "translation": "Négociation", "definition": "Discussion aimed at reaching an agreement.", "example": "The negotiation was tough.", "image_icon": "🤝", "srs_state": "new"},
    {"id": "v_b2_2", "word": "Strategy", "phonetic": "/ˈstræt̬.ə.dʒi/", "level": "B2", "category": "Business", "translation": "Stratégie", "definition": "A plan of action.", "example": "We need a new strategy.", "image_icon": "♟️", "srs_state": "new"},
    {"id": "v_b2_3", "word": "Election", "phonetic": "/iˈlek.ʃən/", "level": "B2", "category": "Politics", "translation": "Élection", "definition": "A formal decision-making process.", "example": "The election is next month.", "image_icon": "🗳️", "srs_state": "new"},
    {"id": "v_b2_4", "word": "Policy", "phonetic": "/ˈpɑː.lə.si/", "level": "B2", "category": "Politics", "translation": "Politique", "definition": "A principle of action.", "example": "The company has a strict policy.", "image_icon": "📜", "srs_state": "new"},
    {"id": "v_b2_5", "word": "Hypothesis", "phonetic": "/haɪˈpɑː.θə.sɪs/", "level": "B2", "category": "Science", "translation": "Hypothèse", "definition": "A proposed explanation.", "example": "We tested the hypothesis.", "image_icon": "🧪", "srs_state": "new"},
    {"id": "v_b2_6", "word": "Research", "phonetic": "/ˈriː.sɝːtʃ/", "level": "B2", "category": "Science", "translation": "Recherche", "definition": "Systematic investigation.", "example": "Scientific research is crucial.", "image_icon": "🔬", "srs_state": "new"},
    {"id": "v_b2_7", "word": "Heritage", "phonetic": "/ˈher.ɪ.t̬ɪdʒ/", "level": "B2", "category": "Culture", "translation": "Héritage / Patrimoine", "definition": "Property that is or may be inherited.", "example": "Cultural heritage is important.", "image_icon": "🏛️", "srs_state": "new"},
    {"id": "v_b2_8", "word": "Tradition", "phonetic": "/trəˈdɪʃ.ən/", "level": "B2", "category": "Culture", "translation": "Tradition", "definition": "The transmission of customs.", "example": "It is a local tradition.", "image_icon": "🏮", "srs_state": "new"},
    {"id": "v_b2_9", "word": "Investment", "phonetic": "/ɪnˈvest.mənt/", "level": "B2", "category": "Finance", "translation": "Investissement", "definition": "The action or process of investing money for profit.", "example": "Real estate is a good investment.", "image_icon": "📈", "srs_state": "new"},
    {"id": "v_b2_10", "word": "Budget", "phonetic": "/ˈbʌdʒ.ɪt/", "level": "B2", "category": "Finance", "translation": "Budget", "definition": "An estimate of income and expenditure.", "example": "We are on a tight budget.", "image_icon": "📊", "srs_state": "new"},
    {"id": "v_b2_11", "word": "Court", "phonetic": "/kɔːrt/", "level": "B2", "category": "Law", "translation": "Tribunal", "definition": "A body of people presided over by a judge.", "example": "The case went to court.", "image_icon": "⚖️", "srs_state": "new"},
    {"id": "v_b2_12", "word": "Justice", "phonetic": "/ˈdʒʌs.tɪs/", "level": "B2", "category": "Law", "translation": "Justice", "definition": "Just behavior or treatment.", "example": "They demanded justice.", "image_icon": "⚖️", "srs_state": "new"},
    {"id": "v_b2_13", "word": "Leadership", "phonetic": "/ˈliː.dɚ.ʃɪp/", "level": "B2", "category": "Business", "translation": "Leadership", "definition": "The action of leading a group.", "example": "Strong leadership is required.", "image_icon": "👑", "srs_state": "new"},
    {"id": "v_b2_14", "word": "Campaign", "phonetic": "/kæmˈpeɪn/", "level": "B2", "category": "Politics", "translation": "Campagne", "definition": "Work in an organized and active way toward a particular goal.", "example": "The political campaign was successful.", "image_icon": "📢", "srs_state": "new"},
    {"id": "v_b2_15", "word": "Evidence", "phonetic": "/ˈev.ə.dəns/", "level": "B2", "category": "Law", "translation": "Preuve", "definition": "The available body of facts.", "example": "There is not enough evidence.", "image_icon": "🔍", "srs_state": "new"},

    {"id": "v_c1_1", "word": "Paradigm", "phonetic": "/ˈper.ə.daɪm/", "level": "C1", "category": "Academia", "translation": "Paradigme", "definition": "A typical example or pattern of something.", "example": "There is a new paradigm in education.", "image_icon": "📚", "srs_state": "new"},
    {"id": "v_c1_2", "word": "Discourse", "phonetic": "/ˈdɪs.kɔːrs/", "level": "C1", "category": "Academia", "translation": "Discours", "definition": "Written or spoken communication.", "example": "Academic discourse can be complex.", "image_icon": "🗣️", "srs_state": "new"},
    {"id": "v_c1_3", "word": "Methodology", "phonetic": "/ˌmeθ.əˈdɑː.lə.dʒi/", "level": "C1", "category": "Research", "translation": "Méthodologie", "definition": "A system of methods used in a particular area of study.", "example": "The methodology is flawed.", "image_icon": "📋", "srs_state": "new"},
    {"id": "v_c1_4", "word": "Empirical", "phonetic": "/ɪmˈpɪr.ɪ.kəl/", "level": "C1", "category": "Research", "translation": "Empirique", "definition": "Based on observation or experience.", "example": "We need empirical evidence.", "image_icon": "📊", "srs_state": "new"},
    {"id": "v_c1_5", "word": "Existential", "phonetic": "/ˌeɡ.zɪˈsten.ʃəl/", "level": "C1", "category": "Philosophy", "translation": "Existentiel", "definition": "Relating to existence.", "example": "He faced an existential crisis.", "image_icon": "🤔", "srs_state": "new"},
    {"id": "v_c1_6", "word": "Pragmatic", "phonetic": "/præɡˈmæt̬.ɪk/", "level": "C1", "category": "Philosophy", "translation": "Pragmatique", "definition": "Dealing with things sensibly and realistically.", "example": "She took a pragmatic approach.", "image_icon": "🛠️", "srs_state": "new"},
    {"id": "v_c1_7", "word": "Eloquence", "phonetic": "/ˈel.ə.kwəns/", "level": "C1", "category": "Rhetoric", "translation": "Éloquence", "definition": "Fluent or persuasive speaking or writing.", "example": "He spoke with great eloquence.", "image_icon": "🎙️", "srs_state": "new"},
    {"id": "v_c1_8", "word": "Persuasion", "phonetic": "/pɚˈsweɪ.ʒən/", "level": "C1", "category": "Rhetoric", "translation": "Persuasion", "definition": "The action of persuading.", "example": "The art of persuasion is powerful.", "image_icon": "💬", "srs_state": "new"},
    {"id": "v_c1_9", "word": "Diplomacy", "phonetic": "/dɪˈploʊ.mə.si/", "level": "C1", "category": "Diplomacy", "translation": "Diplomatie", "definition": "The profession of managing international relations.", "example": "Diplomacy is key to peace.", "image_icon": "🕊️", "srs_state": "new"},
    {"id": "v_c1_10", "word": "Treaty", "phonetic": "/ˈtriː.t̬i/", "level": "C1", "category": "Diplomacy", "translation": "Traité", "definition": "A formally concluded and ratified agreement.", "example": "The countries signed a peace treaty.", "image_icon": "📜", "srs_state": "new"},
    {"id": "v_c1_11", "word": "Syntax", "phonetic": "/ˈsɪn.tæks/", "level": "C1", "category": "Linguistics", "translation": "Syntaxe", "definition": "The arrangement of words and phrases.", "example": "The syntax of the language is complex.", "image_icon": "🔤", "srs_state": "new"},
    {"id": "v_c1_12", "word": "Semantics", "phonetic": "/səˈmæn.t̬ɪks/", "level": "C1", "category": "Linguistics", "translation": "Sémantique", "definition": "The meaning of a word, phrase, or text.", "example": "We argued over semantics.", "image_icon": "📖", "srs_state": "new"},
    {"id": "v_c1_13", "word": "Thesis", "phonetic": "/ˈθiː.sɪs/", "level": "C1", "category": "Academia", "translation": "Thèse", "definition": "A statement or theory that is put forward.", "example": "She is writing her doctoral thesis.", "image_icon": "📑", "srs_state": "new"},
    {"id": "v_c1_14", "word": "Qualitative", "phonetic": "/ˈkwɑː.lə.teɪ.t̬ɪv/", "level": "C1", "category": "Research", "translation": "Qualitatif", "definition": "Relating to, measuring, or measured by the quality of something.", "example": "Qualitative research involves interviews.", "image_icon": "🔎", "srs_state": "new"},
    {"id": "v_c1_15", "word": "Negotiator", "phonetic": "/nəˈɡoʊ.ʃi.eɪ.t̬ɚ/", "level": "C1", "category": "Diplomacy", "translation": "Négociateur", "definition": "A person who conducts negotiations.", "example": "He is a skilled negotiator.", "image_icon": "🤝", "srs_state": "new"},

    {"id": "v_c2_1", "word": "Etymology", "phonetic": "/ˌet̬.əˈmɑː.lə.dʒi/", "level": "C2", "category": "Etymology", "translation": "Étymologie", "definition": "The study of the origin of words.", "example": "The etymology of the word is fascinating.", "image_icon": "📖", "srs_state": "new"},
    {"id": "v_c2_2", "word": "Derivation", "phonetic": "/ˌder.əˈveɪ.ʃən/", "level": "C2", "category": "Etymology", "translation": "Dérivation", "definition": "The obtaining of something from a source.", "example": "The derivation of the word is unknown.", "image_icon": "🔍", "srs_state": "new"},
    {"id": "v_c2_3", "word": "Jurisprudence", "phonetic": "/ˌdʒʊr.ɪsˈpruː.dəns/", "level": "C2", "category": "Jurisprudence", "translation": "Jurisprudence", "definition": "The theory or philosophy of law.", "example": "He is a scholar of jurisprudence.", "image_icon": "⚖️", "srs_state": "new"},
    {"id": "v_c2_4", "word": "Litigation", "phonetic": "/ˌlɪt̬.əˈɡeɪ.ʃən/", "level": "C2", "category": "Jurisprudence", "translation": "Litige", "definition": "The process of taking legal action.", "example": "The company wishes to avoid litigation.", "image_icon": "📜", "srs_state": "new"},
    {"id": "v_c2_5", "word": "Epistemology", "phonetic": "/ɪˌpɪs.təˈmɑː.lə.dʒi/", "level": "C2", "category": "Epistemology", "translation": "Épistémologie", "definition": "The theory of knowledge.", "example": "Epistemology asks 'How do we know what we know?'.", "image_icon": "🧠", "srs_state": "new"},
    {"id": "v_c2_6", "word": "Ontology", "phonetic": "/ɑːnˈtɑː.lə.dʒi/", "level": "C2", "category": "Epistemology", "translation": "Ontologie", "definition": "The branch of metaphysics dealing with the nature of being.", "example": "Ontology explores the concept of existence.", "image_icon": "🌌", "srs_state": "new"},
    {"id": "v_c2_7", "word": "Hermeneutics", "phonetic": "/ˌhɝː.məˈnuː.t̬ɪks/", "level": "C2", "category": "Literary criticism", "translation": "Herméneutique", "definition": "The branch of knowledge that deals with interpretation.", "example": "Hermeneutics is crucial for reading ancient texts.", "image_icon": "📚", "srs_state": "new"},
    {"id": "v_c2_8", "word": "Deconstruction", "phonetic": "/ˌdiː.kənˈstrʌk.ʃən/", "level": "C2", "category": "Literary criticism", "translation": "Déconstruction", "definition": "A method of critical analysis.", "example": "Derrida is known for deconstruction.", "image_icon": "🧩", "srs_state": "new"},
    {"id": "v_c2_9", "word": "Synapse", "phonetic": "/ˈsɪn.æps/", "level": "C2", "category": "Neuroscience", "translation": "Synapse", "definition": "A junction between two nerve cells.", "example": "Information is transmitted across the synapse.", "image_icon": "⚡", "srs_state": "new"},
    {"id": "v_c2_10", "word": "Neuroplasticity", "phonetic": "/ˌnʊr.oʊ.plæsˈtɪs.ə.t̬i/", "level": "C2", "category": "Neuroscience", "translation": "Neuroplasticité", "definition": "The brain's ability to reorganize itself.", "example": "Neuroplasticity allows learning throughout life.", "image_icon": "🧠", "srs_state": "new"},
    {"id": "v_c2_11", "word": "Signifier", "phonetic": "/ˈsɪɡ.nə.faɪ.ɚ/", "level": "C2", "category": "Semiotics", "translation": "Signifiant", "definition": "A sign's physical form.", "example": "The word 'dog' is a signifier.", "image_icon": "🗣️", "srs_state": "new"},
    {"id": "v_c2_12", "word": "Signified", "phonetic": "/ˈsɪɡ.nə.faɪd/", "level": "C2", "category": "Semiotics", "translation": "Signifié", "definition": "The meaning or idea expressed by a sign.", "example": "The concept of a dog is the signified.", "image_icon": "💡", "srs_state": "new"},
    {"id": "v_c2_13", "word": "Polysemy", "phonetic": "/pəˈlɪs.ə.mi/", "level": "C2", "category": "Semiotics", "translation": "Polysémie", "definition": "The capacity for a sign to have multiple meanings.", "example": "Polysemy makes language rich but ambiguous.", "image_icon": "🔀", "srs_state": "new"},
    {"id": "v_c2_14", "word": "Cognition", "phonetic": "/kɑːɡˈnɪʃ.ən/", "level": "C2", "category": "Neuroscience", "translation": "Cognition", "definition": "The mental action of acquiring knowledge.", "example": "Aging affects cognition.", "image_icon": "💭", "srs_state": "new"},
    {"id": "v_c2_15", "word": "Precedent", "phonetic": "/ˈpres.ə.dənt/", "level": "C2", "category": "Jurisprudence", "translation": "Précédent", "definition": "An earlier event or action that is regarded as an example.", "example": "The ruling set a dangerous precedent.", "image_icon": "⚖️", "srs_state": "new"}
  ],
  "listening_exercises": [
    {"id": "a1_list_1", "level": "A1", "title": "Greetings Intro", "duration": "0:30", "audio_text": "Hello, my name is Sarah. I am from London. Nice to meet you.", "transcript": "Hello, my name is Sarah. I am from London. Nice to meet you.", "question": "Where is Sarah from?", "options": ["Paris", "London", "New York", "Berlin"], "correct_index": 1},
    {"id": "a1_list_2", "level": "A1", "title": "Classroom Instructions", "duration": "0:25", "audio_text": "Please open your books to page 10 and look at the first exercise.", "transcript": "Please open your books to page 10 and look at the first exercise.", "question": "Which page should you open?", "options": ["Page 2", "Page 10", "Page 12", "Page 20"], "correct_index": 1},
    {"id": "a1_list_3", "level": "A1", "title": "Simple Phone Call", "duration": "0:40", "audio_text": "Hi, this is John. Can I speak to Mary, please? No? Okay, I will call later.", "transcript": "Hi, this is John. Can I speak to Mary, please? No? Okay, I will call later.", "question": "Who is John trying to call?", "options": ["Sarah", "Mary", "Peter", "David"], "correct_index": 1},

    {"id": "airport_announcement", "level": "A2", "title": "Airport Gate Announcement", "duration": "0:45", "audio_text": "Good morning passengers. This is the final boarding call for flight BA342 to London. Please proceed to Gate 14.", "transcript": "Good morning passengers. This is the final boarding call for flight BA342 to London. Please proceed to Gate 14.", "question": "Which gate should passengers go to?", "options": ["Gate 14", "Gate 41", "Gate 4", "Gate 40"], "correct_index": 0},
    {"id": "a2_list_2", "level": "A2", "title": "Restaurant Order", "duration": "0:50", "audio_text": "I would like a cheeseburger with fries, and a large cola, please.", "transcript": "I would like a cheeseburger with fries, and a large cola, please.", "question": "What drink did the person order?", "options": ["Water", "Orange juice", "Cola", "Coffee"], "correct_index": 2},
    {"id": "a2_list_3", "level": "A2", "title": "Weather Forecast", "duration": "0:45", "audio_text": "Tomorrow will be sunny in the morning, but we expect heavy rain in the afternoon.", "transcript": "Tomorrow will be sunny in the morning, but we expect heavy rain in the afternoon.", "question": "What will the weather be like in the afternoon?", "options": ["Sunny", "Snowy", "Heavy rain", "Cloudy"], "correct_index": 2},

    {"id": "b1_list_1", "level": "B1", "title": "Job Interview Excerpt", "duration": "1:15", "audio_text": "I have worked in marketing for three years. I have experience in managing social media campaigns.", "transcript": "I have worked in marketing for three years. I have experience in managing social media campaigns.", "question": "How many years of experience does the speaker have?", "options": ["One year", "Two years", "Three years", "Four years"], "correct_index": 2},
    {"id": "b1_list_2", "level": "B1", "title": "News Bulletin", "duration": "1:20", "audio_text": "The local council has approved the construction of a new park in the city center. Work begins next month.", "transcript": "The local council has approved the construction of a new park in the city center. Work begins next month.", "question": "What is being constructed in the city center?", "options": ["A hospital", "A school", "A park", "A shopping mall"], "correct_index": 2},
    {"id": "b1_list_3", "level": "B1", "title": "Train Delay", "duration": "1:00", "audio_text": "Attention passengers. The 10:15 train to Manchester is delayed by approximately 20 minutes due to signal failure.", "transcript": "Attention passengers. The 10:15 train to Manchester is delayed by approximately 20 minutes due to signal failure.", "question": "Why is the train delayed?", "options": ["Bad weather", "Signal failure", "Staff strike", "Train breakdown"], "correct_index": 1},

    {"id": "b2_list_1", "level": "B2", "title": "TED Talk Excerpt", "duration": "1:45", "audio_text": "Innovation isn't just about creating new technologies; it's about solving real-world problems in sustainable ways.", "transcript": "Innovation isn't just about creating new technologies; it's about solving real-world problems in sustainable ways.", "question": "According to the speaker, innovation is about solving problems in what way?", "options": ["Profitable ways", "Sustainable ways", "Technological ways", "Fast ways"], "correct_index": 1},
    {"id": "b2_list_2", "level": "B2", "title": "Debate Clip", "duration": "1:30", "audio_text": "While I agree that the internet has connected us, we must acknowledge the severe impact it has had on our attention spans.", "transcript": "While I agree that the internet has connected us, we must acknowledge the severe impact it has had on our attention spans.", "question": "What negative impact does the speaker mention?", "options": ["Loss of privacy", "Impact on attention spans", "Increase in fake news", "Cyberbullying"], "correct_index": 1},
    {"id": "b2_list_3", "level": "B2", "title": "Business Meeting", "duration": "1:50", "audio_text": "We need to cut our Q3 budget by 10% across all departments, focusing primarily on reducing travel expenses.", "transcript": "We need to cut our Q3 budget by 10% across all departments, focusing primarily on reducing travel expenses.", "question": "Which expenses are the primary focus for reduction?", "options": ["Marketing", "Salaries", "Travel", "Office supplies"], "correct_index": 2},

    {"id": "c1_list_1", "level": "C1", "title": "Academic Lecture", "duration": "2:30", "audio_text": "The industrial revolution catalyzed a profound shift, not merely in economic structures, but in the very fabric of social relations.", "transcript": "The industrial revolution catalyzed a profound shift, not merely in economic structures, but in the very fabric of social relations.", "question": "What did the industrial revolution shift besides economic structures?", "options": ["Political borders", "Social relations", "Religious beliefs", "Educational systems"], "correct_index": 1},
    {"id": "c1_list_2", "level": "C1", "title": "Legal Proceeding", "duration": "2:15", "audio_text": "Your Honor, the prosecution has failed to establish a clear motive, relying instead on circumstantial evidence.", "transcript": "Your Honor, the prosecution has failed to establish a clear motive, relying instead on circumstantial evidence.", "question": "What type of evidence is the prosecution relying on?", "options": ["DNA evidence", "Eyewitness testimony", "Circumstantial evidence", "Digital evidence"], "correct_index": 2},
    {"id": "c1_list_3", "level": "C1", "title": "Diplomatic Speech", "duration": "2:40", "audio_text": "Bilateral cooperation is paramount if we are to address the multifaceted challenges posed by global climate change.", "transcript": "Bilateral cooperation is paramount if we are to address the multifaceted challenges posed by global climate change.", "question": "What is described as 'paramount'?", "options": ["Economic growth", "Bilateral cooperation", "Technological advancement", "Military strength"], "correct_index": 1},

    {"id": "c2_list_1", "level": "C2", "title": "Satirical Commentary", "duration": "3:00", "audio_text": "The irony of our hyper-connected age is that as our bandwidth expands exponentially, the depth of our discourse seemingly approaches zero.", "transcript": "The irony of our hyper-connected age is that as our bandwidth expands exponentially, the depth of our discourse seemingly approaches zero.", "question": "What approaches zero according to the commentary?", "options": ["Bandwidth", "Connectivity", "Depth of discourse", "Irony"], "correct_index": 2},
    {"id": "c2_list_2", "level": "C2", "title": "Philosophical Debate", "duration": "3:15", "audio_text": "If determinism holds true, the conceptual framework of moral culpability essentially collapses into an illusion.", "transcript": "If determinism holds true, the conceptual framework of moral culpability essentially collapses into an illusion.", "question": "What collapses into an illusion if determinism is true?", "options": ["Free will", "Moral culpability", "Human existence", "Justice"], "correct_index": 1},
    {"id": "c2_list_3", "level": "C2", "title": "Literary Analysis", "duration": "3:30", "audio_text": "Joyce's stream-of-consciousness technique eschews traditional narrative structures, opting instead for a visceral, unmediated representation of thought.", "transcript": "Joyce's stream-of-consciousness technique eschews traditional narrative structures, opting instead for a visceral, unmediated representation of thought.", "question": "What does Joyce's technique eschew?", "options": ["Character development", "Emotional depth", "Traditional narrative structures", "Punctuation"], "correct_index": 2}
  ],
  "writing_prompts": [
    {"id": "wp_a1_1", "level": "A1", "title": "Ma famille", "prompt": "Write about your family.", "instructions": "Write 3-4 sentences describing who is in your family.", "sample_start": "In my family, there are...", "key_criteria": ["Use of 'have'", "Family vocabulary", "Basic sentence structure"]},
    {"id": "wp_a1_2", "level": "A1", "title": "Ma maison", "prompt": "Describe your house or apartment.", "instructions": "List the rooms in your house.", "sample_start": "My house is small. It has...", "key_criteria": ["Rooms vocabulary", "Use of 'there is/are'"]},
    {"id": "daily_routine", "level": "A2", "title": "Ma routine quotidienne", "prompt": "Write about your daily routine using time expressions.", "instructions": "Include at least 5 daily activities with time markers.", "sample_start": "Every morning, I wake up at...", "key_criteria": ["Use of time expressions", "Present simple tense", "Sequencing words"]},
    {"id": "wp_a2_2", "level": "A2", "title": "Dernières vacances", "prompt": "Write about your last vacation.", "instructions": "Describe where you went and what you did.", "sample_start": "Last summer, I went to...", "key_criteria": ["Past simple tense", "Travel vocabulary", "Adjectives of opinion"]},
    {"id": "formal_email", "level": "B1", "title": "Formal Business Inquiry", "prompt": "Write an email to request a meeting.", "instructions": "Use polite requests and suggest a time.", "sample_start": "Dear Mr. Davis, I am writing to request...", "key_criteria": ["Formal greeting & closing", "Polite modal verbs", "Clear purpose"]},
    {"id": "wp_b1_2", "level": "B1", "title": "Mon film préféré", "prompt": "Review a movie you recently watched.", "instructions": "Summarize the plot and explain why you liked it.", "sample_start": "Recently, I watched a movie called...", "key_criteria": ["Vocabulary of opinion", "Present perfect", "Connecting words"]},
    {"id": "wp_b2_1", "level": "B2", "title": "Pour ou contre", "prompt": "Write a short essay on the pros and cons of remote work.", "instructions": "Provide at least two arguments for and two against.", "sample_start": "Remote work has become increasingly popular...", "key_criteria": ["Linking words of contrast", "Structuring an argument", "Advanced vocabulary"]},
    {"id": "news_summary", "level": "B2", "title": "Résumé d'actualité", "prompt": "Summarize a recent news event.", "instructions": "Report the facts clearly and objectively.", "sample_start": "Last week, it was announced that...", "key_criteria": ["Passive voice", "Reported speech", "Formal tone"]},
    {"id": "academic_essay", "level": "C1", "title": "Essai académique", "prompt": "Discuss the impact of AI on education.", "instructions": "Write a structured essay with an introduction, body paragraphs, and conclusion.", "sample_start": "The advent of artificial intelligence has catalyzed...", "key_criteria": ["Complex sentence structures", "Academic vocabulary", "Cohesion and coherence"]},
    {"id": "wp_c1_2", "level": "C1", "title": "Lettre de réclamation", "prompt": "Write a formal letter of complaint.", "instructions": "Be polite but firm about a poor service you received.", "sample_start": "I am writing to express my profound dissatisfaction with...", "key_criteria": ["Formal register", "Precise vocabulary", "Clear demands"]},
    {"id": "literary_critique", "level": "C2", "title": "Critique littéraire", "prompt": "Analyze a theme in a classic novel.", "instructions": "Provide a deep analysis supported by examples.", "sample_start": "The overarching theme of alienation in...", "key_criteria": ["Nuanced expression", "Sophisticated vocabulary", "Literary analysis skills"]},
    {"id": "wp_c2_2", "level": "C2", "title": "Éditorial", "prompt": "Write an editorial on a global issue.", "instructions": "Persuade the reader using rhetorical devices.", "sample_start": "It is an inescapable reality that our current trajectory...", "key_criteria": ["Rhetorical devices", "Persuasive tone", "Flawless grammar and style"]}
  ],
  "pronunciation_words": [
    {"word": "Think", "phonetic": "/θɪŋk/", "level": "A1", "translation": "Penser", "tip": "Place tongue between teeth for 'th'.", "accuracy_target": 75},
    {"word": "Brother", "phonetic": "/ˈbrʌð.ɚ/", "level": "A1", "translation": "Frère", "tip": "Voiced 'th', vocal cords vibrate.", "accuracy_target": 75},
    {"word": "Water", "phonetic": "/ˈwɑː.t̬ɚ/", "level": "A1", "translation": "Eau", "tip": "In US English, the 't' sounds like a quick 'd'.", "accuracy_target": 75},
    {"word": "Girl", "phonetic": "/ɡɝːl/", "level": "A1", "translation": "Fille", "tip": "Curl the tongue back for the 'r' sound.", "accuracy_target": 75},

    {"word": "Comfortable", "phonetic": "/ˈkʌmftəbl/", "level": "A2", "translation": "Confortable", "tip": "Pronounced as 3 syllables: KUMF-tuh-bul.", "accuracy_target": 80},
    {"word": "Vegetable", "phonetic": "/ˈvedʒ.tə.bəl/", "level": "A2", "translation": "Légume", "tip": "Pronounced as 3 syllables: VEJ-tuh-bul.", "accuracy_target": 80},
    {"word": "Schedule", "phonetic": "/ˈskedʒ.uːl/", "level": "A2", "translation": "Emploi du temps", "tip": "US: SKED-jool, UK: SHED-yool.", "accuracy_target": 80},
    {"word": "Recipe", "phonetic": "/ˈres.ə.pi/", "level": "A2", "translation": "Recette", "tip": "Three syllables, ends in an 'ee' sound.", "accuracy_target": 80},

    {"word": "Vocabulary", "phonetic": "/vəˈkæb.jə.ler.i/", "level": "B1", "translation": "Vocabulaire", "tip": "Stress the second syllable: vo-CAB-u-la-ry.", "accuracy_target": 85},
    {"word": "Literature", "phonetic": "/ˈlɪt̬.ɚ.ə.tʃɚ/", "level": "B1", "translation": "Littérature", "tip": "Four syllables.", "accuracy_target": 85},
    {"word": "Particularly", "phonetic": "/pɚˈtɪk.jə.lɚ.li/", "level": "B1", "translation": "Particulièrement", "tip": "Stress the second syllable.", "accuracy_target": 85},
    {"word": "Environment", "phonetic": "/ɪnˈvaɪ.rən.mənt/", "level": "B1", "translation": "Environnement", "tip": "Don't forget the 'n' in the middle.", "accuracy_target": 85},

    {"word": "Entrepreneur", "phonetic": "/ˌɑːn.trə.prəˈnɝː/", "level": "B2", "translation": "Entrepreneur", "tip": "French origin, stress the final syllable.", "accuracy_target": 85},
    {"word": "Hierarchy", "phonetic": "/ˈhaɪ.rɑːr.ki/", "level": "B2", "translation": "Hiérarchie", "tip": "Three syllables: HI-er-ar-chy.", "accuracy_target": 85},
    {"word": "Choir", "phonetic": "/kwaɪɚ/", "level": "B2", "translation": "Chorale", "tip": "Rhymes with 'fire'.", "accuracy_target": 85},
    {"word": "Mischievous", "phonetic": "/ˈmɪs.tʃə.vəs/", "level": "B2", "translation": "Espiègle", "tip": "Three syllables: MIS-chuh-vus. No 'ee' sound at the end.", "accuracy_target": 85},

    {"word": "Anemone", "phonetic": "/əˈnem.ə.ni/", "level": "C1", "translation": "Anémone", "tip": "Four syllables, stress the second.", "accuracy_target": 90},
    {"word": "Isthmus", "phonetic": "/ˈɪs.məs/", "level": "C1", "translation": "Isthme", "tip": "The 'th' is silent.", "accuracy_target": 90},
    {"word": "Synecdoche", "phonetic": "/sɪˈnek.də.ki/", "level": "C1", "translation": "Synecdoque", "tip": "Four syllables, stress the second.", "accuracy_target": 90},
    {"word": "Onomatopoeia", "phonetic": "/ˌɑː.noʊˌmæt̬.əˈpiː.ə/", "level": "C1", "translation": "Onomatopée", "tip": "Six syllables.", "accuracy_target": 90},

    {"word": "Sesquipedalian", "phonetic": "/ˌses.kwɪ.pəˈdeɪ.li.ən/", "level": "C2", "translation": "Sesquipédalien (mots longs)", "tip": "Six syllables, stress the 'deɪ'.", "accuracy_target": 95},
    {"word": "Floccinaucinihilipilification", "phonetic": "/ˌflɑːk.səˌnɔː.sɪˌnaɪ.hɪl.ɪˌpɪl.ɪ.fɪˈkeɪ.ʃən/", "level": "C2", "translation": "Le fait d'estimer quelque chose sans valeur", "tip": "Take a deep breath. Stress 'keɪ'.", "accuracy_target": 95},
    {"word": "Pneumonoultramicroscopicsilicovolcanoconiosis", "phonetic": "/ˌnuː.mə.noʊˌʌl.trəˌmaɪ.krəˈskɑː.pɪkˌsɪl.ɪ.koʊ.vɑːlˌkeɪ.noʊˌkoʊ.niˈoʊ.sɪs/", "level": "C2", "translation": "Maladie pulmonaire (silicose)", "tip": "The 'p' is silent.", "accuracy_target": 95},
    {"word": "Antidisestablishmentarianism", "phonetic": "/ˌæn.t̬iˌdɪs.ɪˌstæb.lɪʃ.mənˈter.i.ə.nɪ.zəm/", "level": "C2", "translation": "Opposition au démantèlement de l'Église d'État", "tip": "Break it into root words.", "accuracy_target": 95}
  ],
  "speaking_scenarios": [
    {"id": "greeting_alex", "level": "A1", "title": "Meeting Alex", "description": "Introduce yourself to Alex.", "ai_role": "Alex", "user_role": "You", "suggested_start": "Hi, I am...", "vocabulary_hints": ["name", "nice to meet you"]},
    {"id": "cafe_basic", "level": "A1", "title": "Coffee Shop", "description": "Order a coffee.", "ai_role": "Barista", "user_role": "Customer", "suggested_start": "I would like a coffee, please.", "vocabulary_hints": ["coffee", "please", "thank you"]},
    {"id": "hotel_checkin", "level": "A2", "title": "Hotel Check-In", "description": "Check into your hotel room.", "ai_role": "Receptionist", "user_role": "Guest", "suggested_start": "Hello, I have a reservation.", "vocabulary_hints": ["reservation", "room", "key"]},
    {"id": "restaurant_order", "level": "A2", "title": "Restaurant Dinner", "description": "Order food at a restaurant.", "ai_role": "Waiter", "user_role": "Customer", "suggested_start": "Can I see the menu, please?", "vocabulary_hints": ["menu", "bill", "delicious"]},
    {"id": "airport_conversation", "level": "B1", "title": "At the Airport Gate", "description": "Ask about a delayed flight.", "ai_role": "Gate Agent", "user_role": "Passenger", "suggested_start": "Excuse me, is the flight delayed?", "vocabulary_hints": ["delayed", "boarding", "gate"]},
    {"id": "job_interview", "level": "B1", "title": "Job Interview", "description": "Answer basic interview questions.", "ai_role": "Interviewer", "user_role": "Candidate", "suggested_start": "I have experience in...", "vocabulary_hints": ["experience", "skills", "teamwork"]},
    {"id": "business_negotiation", "level": "B2", "title": "Business Negotiation", "description": "Negotiate a budget for a project.", "ai_role": "Client", "user_role": "Project Manager", "suggested_start": "Let's discuss the budget.", "vocabulary_hints": ["budget", "timeline", "compromise"]},
    {"id": "complaint", "level": "B2", "title": "Making a Complaint", "description": "Complain about a faulty product.", "ai_role": "Customer Service", "user_role": "Customer", "suggested_start": "I bought this yesterday and it's broken.", "vocabulary_hints": ["refund", "manager", "unacceptable"]},
    {"id": "complex_debate", "level": "C1", "title": "Complex Debate", "description": "Debate the ethics of AI.", "ai_role": "Debate Opponent", "user_role": "Debater", "suggested_start": "While I see your point, I argue that...", "vocabulary_hints": ["ethics", "implications", "fundamental"]},
    {"id": "academic_defense", "level": "C1", "title": "Thesis Defense", "description": "Defend your research findings.", "ai_role": "Professor", "user_role": "Student", "suggested_start": "My research demonstrates...", "vocabulary_hints": ["methodology", "empirical", "significant"]},
    {"id": "cultural_debate", "level": "C2", "title": "Cultural Debate", "description": "Discuss subtle cultural nuances.", "ai_role": "Philosopher", "user_role": "Intellectual", "suggested_start": "The paradigm shift we are observing...", "vocabulary_hints": ["paradigm", "discourse", "nuance"]},
    {"id": "diplomatic_talk", "level": "C2", "title": "Diplomatic Negotiation", "description": "Negotiate an international treaty.", "ai_role": "Ambassador", "user_role": "Diplomat", "suggested_start": "Our bilateral interests require...", "vocabulary_hints": ["treaty", "sovereignty", "mutual benefit"]}
  ],
  "phrasal_verbs": [
    {"id": "pv_a1_1", "verb": "wake up", "meaning": "stop sleeping", "example": "I wake up at 7 AM.", "level": "A1", "translation": "se réveiller"},
    {"id": "pv_a1_2", "verb": "get up", "meaning": "leave bed", "example": "I get up and take a shower.", "level": "A1", "translation": "se lever"},
    {"id": "pv_a1_3", "verb": "sit down", "meaning": "take a seat", "example": "Please sit down.", "level": "A1", "translation": "s'asseoir"},
    {"id": "look_after", "verb": "look after", "meaning": "take care of", "example": "She looks after her brother.", "level": "A2", "translation": "prendre soin de"},
    {"id": "give_up", "verb": "give up", "meaning": "quit", "example": "Don't give up!", "level": "A2", "translation": "abandonner"},
    {"id": "pv_a2_3", "verb": "turn on", "meaning": "start a machine", "example": "Turn on the TV.", "level": "A2", "translation": "allumer"},
    {"id": "run_out_of", "verb": "run out of", "meaning": "have none left", "example": "We ran out of milk.", "level": "B1", "translation": "être à court de"},
    {"id": "turn_down", "verb": "turn down", "meaning": "reject", "example": "She turned down the job offer.", "level": "B1", "translation": "refuser"},
    {"id": "figure_out", "verb": "figure out", "meaning": "understand", "example": "I can't figure out this puzzle.", "level": "B1", "translation": "comprendre, résoudre"},
    {"id": "bring_up", "verb": "bring up", "meaning": "mention a topic", "example": "Don't bring up politics.", "level": "B2", "translation": "aborder un sujet"},
    {"id": "pv_b2_2", "verb": "call off", "meaning": "cancel", "example": "The meeting was called off.", "level": "B2", "translation": "annuler"},
    {"id": "pv_b2_3", "verb": "put off", "meaning": "postpone", "example": "They put off the game due to rain.", "level": "B2", "translation": "repousser"},
    {"id": "pv_c1_1", "verb": "boil down to", "meaning": "be summarized as", "example": "It all boils down to money.", "level": "C1", "translation": "se résumer à"},
    {"id": "pv_c1_2", "verb": "chalk up to", "meaning": "attribute to", "example": "Chalk it up to bad luck.", "level": "C1", "translation": "attribuer à"},
    {"id": "pv_c1_3", "verb": "mull over", "meaning": "think deeply about", "example": "I need time to mull it over.", "level": "C1", "translation": "réfléchir mûrement à"},
    {"id": "pv_c2_1", "verb": "fob off", "meaning": "deceive someone into accepting something inferior", "example": "Don't let them fob you off with excuses.", "level": "C2", "translation": "refiler / se débarrasser de quelqu'un avec une excuse"},
    {"id": "pv_c2_2", "verb": "winkle out", "meaning": "extract information with difficulty", "example": "The journalist managed to winkle out the truth.", "level": "C2", "translation": "soutirer"},
    {"id": "pv_c2_3", "verb": "cotton on", "meaning": "begin to understand", "example": "It took him a while to cotton on to what was happening.", "level": "C2", "translation": "piger"}
  ],
  "idioms_expressions": [
    {"id": "piece_of_cake", "expression": "A piece of cake", "meaning": "Very easy", "example": "The test was a piece of cake.", "level": "A1", "translation": "C'est du gâteau"},
    {"id": "ie_a1_2", "expression": "Under the sun", "meaning": "Everything possible", "example": "I've tried everything under the sun.", "level": "A1", "translation": "Sous le soleil"},
    {"id": "ie_a1_3", "expression": "Up in the air", "meaning": "Undecided", "example": "Our plans are up in the air.", "level": "A1", "translation": "En suspens"},
    {"id": "raining_cats_and_dogs", "expression": "Raining cats and dogs", "meaning": "Raining heavily", "example": "It's raining cats and dogs.", "level": "A2", "translation": "Il pleut des cordes"},
    {"id": "under_the_weather", "expression": "Under the weather", "meaning": "Sick", "example": "I'm feeling under the weather.", "level": "A2", "translation": "Pas dans son assiette"},
    {"id": "ie_a2_3", "expression": "Break the ice", "meaning": "Start a conversation", "example": "He told a joke to break the ice.", "level": "A2", "translation": "Briser la glace"},
    {"id": "break_a_leg", "expression": "Break a leg!", "meaning": "Good luck", "example": "Break a leg tonight!", "level": "B1", "translation": "Bonne chance"},
    {"id": "once_in_a_blue_moon", "expression": "Once in a blue moon", "meaning": "Very rarely", "example": "I go to the cinema once in a blue moon.", "level": "B1", "translation": "Tous les 36 du mois"},
    {"id": "ie_b1_3", "expression": "Hit the sack", "meaning": "Go to sleep", "example": "I'm exhausted, time to hit the sack.", "level": "B1", "translation": "Aller se pieuter"},
    {"id": "bite_the_bullet", "expression": "Bite the bullet", "meaning": "Endure a difficult situation", "example": "I have to bite the bullet and tell him.", "level": "B2", "translation": "Serrer les dents"},
    {"id": "ie_b2_2", "expression": "Call it a day", "meaning": "Stop working", "example": "Let's call it a day.", "level": "B2", "translation": "S'arrêter là pour aujourd'hui"},
    {"id": "ie_b2_3", "expression": "Cut corners", "meaning": "Do something poorly to save time/money", "example": "They cut corners when building the house.", "level": "B2", "translation": "Faire des économies de bouts de chandelle"},
    {"id": "ie_c1_1", "expression": "Devil's advocate", "meaning": "Argue against something for the sake of argument", "example": "I'm just playing devil's advocate.", "level": "C1", "translation": "L'avocat du diable"},
    {"id": "ie_c1_2", "expression": "Sit on the fence", "meaning": "Avoid making a decision", "example": "You can't sit on the fence forever.", "level": "C1", "translation": "Ménager la chèvre et le chou"},
    {"id": "ie_c1_3", "expression": "Throw caution to the wind", "meaning": "Take a risk", "example": "She threw caution to the wind and quit her job.", "level": "C1", "translation": "Agir au mépris du danger"},
    {"id": "ie_c2_1", "expression": "A bitter pill to swallow", "meaning": "An unpleasant truth to accept", "example": "Losing the election was a bitter pill to swallow.", "level": "C2", "translation": "La pilule est dure à avaler"},
    {"id": "ie_c2_2", "expression": "Jump on the bandwagon", "meaning": "Join a popular trend", "example": "Everyone is jumping on the electric car bandwagon.", "level": "C2", "translation": "Prendre le train en marche"},
    {"id": "ie_c2_3", "expression": "Spill the beans", "meaning": "Reveal a secret", "example": "Come on, spill the beans!", "level": "C2", "translation": "Vendre la mèche"}
  ],
  "gamification": {
    "daily_goal_minutes": 30,
    "default_streak": 7,
    "badges": [
      { "id": "first_lesson", "title": "Premier Pas", "icon": "🌱", "description": "Compléter votre première leçon d'anglais.", "unlocked": true },
      { "id": "streak_7", "title": "Habitude d'Acier", "icon": "🔥", "description": "Atteindre une série de 7 jours consécutifs.", "unlocked": true },
      { "id": "pronunciation_pro", "title": "Accent Parfait", "icon": "🎙️", "description": "Obtenir un score de prononciation supérieur à 85%.", "unlocked": true },
      { "id": "vocab_50", "title": "Maître des Mots", "icon": "📚", "description": "Maîtriser 50 mots dans le système SRS.", "unlocked": true },
      { "id": "ai_chatter", "title": "Bilingue IA", "icon": "🤖", "description": "Terminer 5 conversations complètes avec le tuteur IA.", "unlocked": false },
      { "id": "level_a1_cert", "title": "Diplômé A1", "icon": "📜", "description": "Débloquer le certificat débutant A1.", "unlocked": true },
      { "id": "level_a2_cert", "title": "Diplômé A2", "icon": "📜", "description": "Débloquer le certificat élémentaire A2.", "unlocked": true },
      { "id": "level_b1_cert", "title": "Diplômé B1", "icon": "📜", "description": "Débloquer le certificat intermédiaire B1.", "unlocked": true },
      { "id": "level_b2_cert", "title": "Diplômé B2", "icon": "📜", "description": "Débloquer le certificat avancé B2.", "unlocked": false },
      { "id": "level_c1_cert", "title": "Diplômé C1", "icon": "📜", "description": "Débloquer le certificat expert C1.", "unlocked": false },
      { "id": "level_c2_cert", "title": "Diplômé C2", "icon": "👑", "description": "Débloquer le certificat maîtrise C2.", "unlocked": false }
    ]
  },
  "initial_assessment": {
    "title": "Évaluation Initiale de Niveau",
    "description": "Test rapide en 6 questions pour évaluer votre niveau du CECRL (A1 à C2) et personnaliser votre parcours.",
    "questions": [
      {
        "id": "q1",
        "skill": "Grammaire",
        "question": "Choose the correct sentence:",
        "options": ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not likes coffee."],
        "correct_index": 2,
        "points": 1
      },
      {
        "id": "q2",
        "skill": "Vocabulaire",
        "question": "What is the synonym of 'Crucial'?",
        "options": ["Unimportant", "Essential", "Slow", "Optional"],
        "correct_index": 1,
        "points": 2
      },
      {
        "id": "q3",
        "skill": "Grammaire",
        "question": "If I ______ you, I would accept the offer immediately.",
        "options": ["was", "were", "am", "have been"],
        "correct_index": 1,
        "points": 2
      },
      {
        "id": "q4",
        "skill": "Compréhension écrite",
        "question": "'The meeting has been called off until further notice.' What does this mean?",
        "options": ["The meeting has started early.", "The meeting has been cancelled.", "The meeting is moved to another room.", "The meeting will last longer."],
        "correct_index": 1,
        "points": 2
      },
      {
        "id": "q5",
        "skill": "Expressions",
        "question": "What does 'To hit the nail on the head' mean?",
        "options": ["To hurt oneself accidentally", "To build furniture", "To describe exactly what is causing a situation", "To make a big noise"],
        "correct_index": 2,
        "points": 3
      },
      {
        "id": "q6",
        "skill": "Grammaire avancée",
        "question": "Seldom ______ such a remarkable performance.",
        "options": ["I have witnessed", "have I witnessed", "I had witnessed", "witnessed I"],
        "correct_index": 1,
        "points": 3
      }
    ]
  }
};
