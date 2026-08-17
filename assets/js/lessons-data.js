/**
 * Default offline/fallback data for English Master AI
 */
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
            {
              "id": "a1-u1-l1",
              "title": "Saying Hello & Personal Info",
              "duration": "8 min",
              "type": "vocabulary",
              "xp": 20,
              "content": "Learn how to greet someone and introduce yourself with confidence.",
              "vocabulary_ids": ["hello", "name", "nice_to_meet_you", "student", "teacher"]
            },
            {
              "id": "a1-u1-l2",
              "title": "Verb 'To Be' (Am / Is / Are)",
              "duration": "10 min",
              "type": "grammar",
              "xp": 25,
              "grammar_id": "verb_to_be"
            },
            {
              "id": "a1-u1-l3",
              "title": "Pronouncing 'Th' & Vowels",
              "duration": "6 min",
              "type": "pronunciation",
              "xp": 20,
              "target_word": "think"
            },
            {
              "id": "a1-u1-l4",
              "title": "Mini Conversation: Meeting Alex",
              "duration": "10 min",
              "type": "speaking",
              "xp": 30,
              "scenario_id": "greeting_alex"
            }
          ]
        },
        {
          "id": "a1-u2",
          "title": "2. Daily Routine & Numbers",
          "lessons_total": 4,
          "lessons_completed": 2,
          "icon": "⏰",
          "lessons": [
            {
              "id": "a1-u2-l1",
              "title": "Numbers 1 to 100 and Time",
              "duration": "8 min",
              "type": "vocabulary",
              "xp": 20,
              "vocabulary_ids": ["morning", "evening", "time", "clock", "breakfast"]
            },
            {
              "id": "a1-u2-l2",
              "title": "Present Simple for Habits",
              "duration": "12 min",
              "type": "grammar",
              "xp": 25,
              "grammar_id": "present_simple_habits"
            }
          ]
        },
        {
          "id": "a1-u3",
          "title": "3. Family & Everyday Objects",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "👨‍👩‍👧",
          "lessons": [
            {
              "id": "a1-u3-l1",
              "title": "Family Members & Possessives",
              "duration": "10 min",
              "type": "vocabulary",
              "xp": 20,
              "vocabulary_ids": ["father", "mother", "brother", "sister", "family"]
            }
          ]
        },
        {
          "id": "a1-u4",
          "title": "4. Food & Basic Ordering",
          "lessons_total": 4,
          "lessons_completed": 0,
          "icon": "🍎",
          "lessons": [
            {
              "id": "a1-u4-l1",
              "title": "Ordering a coffee or snack",
              "duration": "10 min",
              "type": "speaking",
              "xp": 25,
              "scenario_id": "cafe_basic"
            }
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
            {
              "id": "a2-u1-l1",
              "title": "Describing Your Typical Day",
              "duration": "10 min",
              "type": "writing",
              "xp": 25,
              "prompt_id": "daily_routine"
            },
            {
              "id": "a2-u1-l2",
              "title": "Frequency Adverbs (Always, Usually, Never)",
              "duration": "10 min",
              "type": "grammar",
              "xp": 20,
              "grammar_id": "adverbs_frequency"
            }
          ]
        },
        {
          "id": "a2-u2",
          "title": "2. At the Restaurant",
          "lessons_total": 8,
          "lessons_completed": 5,
          "icon": "🍽️",
          "lessons": [
            {
              "id": "a2-u2-l1",
              "title": "Ordering Food & Asking for the Bill",
              "duration": "12 min",
              "type": "speaking",
              "xp": 30,
              "scenario_id": "restaurant_order"
            },
            {
              "id": "a2-u2-l2",
              "title": "Food & Dietary Preferences",
              "duration": "8 min",
              "type": "vocabulary",
              "xp": 20,
              "vocabulary_ids": ["menu", "bill", "delicious", "vegetarian", "drink"]
            }
          ]
        },
        {
          "id": "a2-u3",
          "title": "3. Traveling",
          "lessons_total": 9,
          "lessons_completed": 4,
          "icon": "✈️",
          "lessons": [
            {
              "id": "a2-u3-l1",
              "title": "At the Airport & Security",
              "duration": "12 min",
              "type": "vocabulary",
              "xp": 25,
              "vocabulary_ids": ["airport", "flight", "delay", "passport", "luggage"]
            },
            {
              "id": "a2-u3-l2",
              "title": "Listening to Flight Announcements",
              "duration": "8 min",
              "type": "listening",
              "xp": 20,
              "listening_id": "airport_announcement"
            }
          ]
        },
        {
          "id": "a2-u4",
          "title": "4. At the Hotel",
          "lessons_total": 8,
          "lessons_completed": 3,
          "icon": "🏨",
          "lessons": [
            {
              "id": "a2-u4-l1",
              "title": "Hotel Check-in Dialogue",
              "duration": "10 min",
              "type": "speaking",
              "xp": 30,
              "scenario_id": "hotel_checkin"
            }
          ]
        },
        {
          "id": "a2-u5",
          "title": "5. Shopping",
          "lessons_total": 8,
          "lessons_completed": 2,
          "icon": "🛍️",
          "lessons": [
            {
              "id": "a2-u5-l1",
              "title": "Asking for Sizes, Prices and Discounts",
              "duration": "10 min",
              "type": "vocabulary",
              "xp": 20,
              "vocabulary_ids": ["discount", "size", "cheap", "expensive", "fitting_room"]
            }
          ]
        },
        {
          "id": "a2-u6",
          "title": "6. Communication",
          "lessons_total": 8,
          "lessons_completed": 1,
          "icon": "💬",
          "lessons": [
            {
              "id": "a2-u6-l1",
              "title": "Making Phone Calls & Simple Messages",
              "duration": "10 min",
              "type": "speaking",
              "xp": 25,
              "scenario_id": "phone_call_basic"
            }
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
            {
              "id": "b1-u1-l1",
              "title": "Grammar: Present Perfect (have/has + past participle)",
              "duration": "12 min",
              "type": "grammar",
              "xp": 30,
              "grammar_id": "present_perfect"
            },
            {
              "id": "b1-u1-l2",
              "title": "Travel & Airport Masterclass",
              "duration": "10 min",
              "type": "vocabulary",
              "xp": 25,
              "vocabulary_ids": ["airport", "flight", "delay", "destination", "boarding_pass"]
            },
            {
              "id": "b1-u1-l3",
              "title": "Listening: At the Airport Gate",
              "duration": "8 min",
              "type": "listening",
              "xp": 20,
              "listening_id": "airport_conversation"
            },
            {
              "id": "b1-u1-l4",
              "title": "Speaking: Hotel Check-in Challenge",
              "duration": "10 min",
              "type": "speaking",
              "xp": 30,
              "scenario_id": "hotel_checkin"
            }
          ]
        },
        {
          "id": "b1-u2",
          "title": "2. Work & Career Communication",
          "lessons_total": 8,
          "lessons_completed": 3,
          "icon": "💼",
          "lessons": [
            {
              "id": "b1-u2-l1",
              "title": "Writing Professional Emails",
              "duration": "14 min",
              "type": "writing",
              "xp": 30,
              "prompt_id": "formal_email"
            },
            {
              "id": "b1-u2-l2",
              "title": "Phrasal Verbs in the Office",
              "duration": "10 min",
              "type": "phrasal_verbs",
              "xp": 25,
              "phrasal_ids": ["look_after", "call_off", "bring_up", "carry_out"]
            }
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
            {
              "id": "b2-u1-l1",
              "title": "Second & Third Conditionals",
              "duration": "15 min",
              "type": "grammar",
              "xp": 35,
              "grammar_id": "conditionals_complex"
            },
            {
              "id": "b2-u1-l2",
              "title": "Business Negotiation Dialogue",
              "duration": "12 min",
              "type": "speaking",
              "xp": 35,
              "scenario_id": "business_negotiation"
            }
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
            {
              "id": "c1-u1-l1",
              "title": "Advanced Inversion & Emphasis",
              "duration": "15 min",
              "type": "grammar",
              "xp": 40,
              "grammar_id": "grammatical_inversion"
            }
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
            {
              "id": "c2-u1-l1",
              "title": "Subtle Cultural Nuances & Wit",
              "duration": "15 min",
              "type": "speaking",
              "xp": 45,
              "scenario_id": "cultural_debate"
            }
          ]
        }
      ]
    }
  ],
  "pronunciation_words": [
    {
      "id": "think",
      "word": "think",
      "phonetic": "/θɪŋk/",
      "level": "A1",
      "french": "penser / réfléchir",
      "tips": "Try to pronounce the 'th' sound. Keep your tongue between your teeth with gentle airflow.",
      "audio_sample": "think",
      "difficulty": "Medium",
      "target_accuracy": 85
    },
    {
      "id": "comfortable",
      "word": "comfortable",
      "phonetic": "/ˈkʌmftəbl/",
      "level": "A2",
      "french": "confortable / à l'aise",
      "tips": "Notice that 'or' is silent! Pronounce it like 'KUMF-ter-bl'. 3 syllables, not 4.",
      "audio_sample": "comfortable",
      "difficulty": "Hard",
      "target_accuracy": 80
    },
    {
      "id": "vocabulary",
      "word": "vocabulary",
      "phonetic": "/vəˈkæbjʊləri/",
      "level": "B1",
      "french": "vocabulaire",
      "tips": "Emphasize the second syllable: vo-CAB-u-la-ry.",
      "audio_sample": "vocabulary",
      "difficulty": "Medium",
      "target_accuracy": 85
    },
    {
      "id": "world",
      "word": "world",
      "phonetic": "/wɜːld/",
      "level": "A2",
      "french": "monde",
      "tips": "Curl the tongue back for the 'r' then press against roof of mouth for 'l'.",
      "audio_sample": "world",
      "difficulty": "Hard",
      "target_accuracy": 80
    },
    {
      "id": "specifically",
      "word": "specifically",
      "phonetic": "/spəˈsɪfɪkli/",
      "level": "B2",
      "french": "spécifiquement / en particulier",
      "tips": "Stress 'CIF': spe-SIF-ik-lee.",
      "audio_sample": "specifically",
      "difficulty": "Hard",
      "target_accuracy": 85
    },
    {
      "id": "schedule",
      "word": "schedule",
      "phonetic": "/ˈskedʒuːl/",
      "level": "B1",
      "french": "emploi du temps / horaire",
      "tips": "American style: 'SKED-jool'. British style: 'SHED-yool'.",
      "audio_sample": "schedule",
      "difficulty": "Medium",
      "target_accuracy": 85
    }
  ],
  "grammar_modules": [
    {
      "id": "present_perfect",
      "title": "Present Perfect",
      "formula": "have / has + past participle",
      "level": "B1",
      "summary": "Used to describe an action that happened at an unspecified time in the past or that continues into the present.",
      "example_en": "I have visited Paris.",
      "example_fr": "J'ai visité Paris.",
      "rules": [
        "Use 'have' with I, You, We, They.",
        "Use 'has' with He, She, It.",
        "For regular verbs: verb + ed (e.g., worked, visited).",
        "For irregular verbs: 3rd column (e.g., go -> went -> gone, see -> saw -> seen)."
      ],
      "exercises": [
        {
          "question": "She ______ (live) in London for five years.",
          "options": ["has lived", "have lived", "lived", "is living"],
          "correct": 0,
          "explanation": "With 'She', we use 'has' + past participle 'lived'."
        },
        {
          "question": "I ______ (never / see) such a beautiful sunset before.",
          "options": ["have never saw", "has never seen", "have never seen", "never have saw"],
          "correct": 2,
          "explanation": "'See' is irregular (see - saw - seen). Correct: 'have never seen'."
        },
        {
          "question": "______ you ever ______ (be) to New York?",
          "options": ["Did / be", "Have / been", "Has / been", "Do / be"],
          "correct": 1,
          "explanation": "Question form for life experience: 'Have you ever been...?'"
        }
      ]
    },
    {
      "id": "verb_to_be",
      "title": "Verb 'To Be' (Être)",
      "formula": "Subject + am / is / are",
      "level": "A1",
      "summary": "The most fundamental verb in English for identity, origin, feelings and states.",
      "example_en": "I am a student. She is French.",
      "example_fr": "Je suis étudiant. Elle est française.",
      "rules": [
        "I -> am ('m)",
        "He / She / It -> is ('s)",
        "You / We / They -> are ('re)"
      ],
      "exercises": [
        {
          "question": "They ______ excited to learn English.",
          "options": ["is", "are", "am", "be"],
          "correct": 1,
          "explanation": "With 'They', the verb to be is 'are'."
        },
        {
          "question": "My brother ______ a software engineer.",
          "options": ["am", "are", "is", "be"],
          "correct": 2,
          "explanation": "'My brother' = 'He', so we use 'is'."
        }
      ]
    },
    {
      "id": "conditionals_complex",
      "title": "Second & Third Conditionals",
      "formula": "If + past simple, would + verb | If + past perfect, would have + past participle",
      "level": "B2",
      "summary": "Hypothetical present situations and regrets about past events.",
      "example_en": "If I had known, I would have helped you.",
      "example_fr": "Si j'avais su, je t'aurais aidé.",
      "rules": [
        "2nd Conditional (Imaginary present/future): If I were rich, I would travel around the world.",
        "3rd Conditional (Past impossible / regret): If you had studied, you would have passed."
      ],
      "exercises": [
        {
          "question": "If I ______ more free time, I would learn Spanish too.",
          "options": ["have", "had", "would have", "had had"],
          "correct": 1,
          "explanation": "Second conditional uses past simple in the 'if' clause: 'If I had...'."
        }
      ]
    }
  ],
  "vocabulary_items": [
    {
      "id": "airport",
      "word": "airport",
      "phonetic": "/ˈeəpɔːt/",
      "level": "A2",
      "translation": "aéroport",
      "category": "Travel",
      "definition": "A complex of runways and buildings for the takeoff, landing, and maintenance of aircraft.",
      "example": "We arrived at the airport two hours early.",
      "image_icon": "✈️",
      "srs_state": "learning"
    },
    {
      "id": "flight",
      "word": "flight",
      "phonetic": "/flaɪt/",
      "level": "A2",
      "translation": "vol",
      "category": "Travel",
      "definition": "A journey made through the air, especially in a plane.",
      "example": "Our flight to London was very smooth.",
      "image_icon": "🛫",
      "srs_state": "new"
    },
    {
      "id": "delay",
      "word": "delay",
      "phonetic": "/dɪˈleɪ/",
      "level": "B1",
      "translation": "retard / reporter",
      "category": "Travel",
      "definition": "A period of time by which something is late or postponed.",
      "example": "Due to bad weather, there is a one-hour delay.",
      "image_icon": "⏳",
      "srs_state": "review"
    },
    {
      "id": "book",
      "word": "book",
      "phonetic": "/bʊk/",
      "level": "A1",
      "translation": "livre / réserver",
      "category": "Daily Life",
      "definition": "A written or printed work / To reserve accommodation or a ticket.",
      "example": "I need to book a hotel room for next weekend.",
      "image_icon": "📖",
      "srs_state": "mastered"
    },
    {
      "id": "achievement",
      "word": "achievement",
      "phonetic": "/əˈtʃiːvmənt/",
      "level": "B2",
      "translation": "accomplissement / réussite",
      "category": "Work & Career",
      "definition": "A thing done successfully with effort, skill, or courage.",
      "example": "Getting certified in English was a proud achievement.",
      "image_icon": "🏆",
      "srs_state": "new"
    },
    {
      "id": "schedule",
      "word": "schedule",
      "phonetic": "/ˈskedʒuːl/",
      "level": "B1",
      "translation": "emploi du temps / planning",
      "category": "Work & Career",
      "definition": "A plan that gives expected times for different things to happen.",
      "example": "Let's check the schedule for tomorrow's meeting.",
      "image_icon": "📅",
      "srs_state": "learning"
    }
  ],
  "listening_modules": [
    {
      "id": "airport_announcement",
      "title": "Airport Gate Announcement",
      "level": "A2",
      "duration": "0:45",
      "transcript": "Good morning passengers. This is the final boarding call for flight BA342 to London Heathrow. All booked passengers should proceed immediately to Gate 14.",
      "audio_text": "Good morning passengers. This is the final boarding call for flight BA342 to London Heathrow. All booked passengers should proceed immediately to Gate 14. Gate 14 is now closing.",
      "question": "Listen and choose: Where should passengers go?",
      "options": [
        "To Gate 14 immediately",
        "To the baggage claim area",
        "To the ticket counter",
        "To Terminal 2"
      ],
      "correct": 0,
      "explanation": "The announcement states 'proceed immediately to Gate 14'."
    },
    {
      "id": "job_role_listening",
      "title": "Identifying Occupations",
      "level": "A1",
      "duration": "0:30",
      "transcript": "Hello, my name is David. I work at St. Mary's Hospital and I take care of sick patients every day.",
      "audio_text": "Hello, my name is David. I work at St. Mary's Hospital and I take care of sick patients every day.",
      "question": "Listen and choose:",
      "options": [
        "He is a doctor.",
        "He is a teacher.",
        "He is a student.",
        "He is a pilot."
      ],
      "correct": 0,
      "explanation": "He works in a hospital and treats sick patients, so he is a doctor."
    }
  ],
  "speaking_scenarios": [
    {
      "id": "hotel_checkin",
      "title": "Hotel Check-In",
      "level": "A2 - B1",
      "ai_role": "Receptionist",
      "user_role": "Guest",
      "opening_message": "Good afternoon! Welcome to Grand Palace Hotel. How can I help you today?",
      "suggested_replies": [
        "Hello! I have a reservation under the name Alex Martin.",
        "Hi, do you have any free rooms available for two nights?",
        "Good afternoon, I'd like to check in, please."
      ],
      "dialogue_tree": [
        {
          "ai": "Good afternoon! Welcome to Grand Palace Hotel. How can I help you today?",
          "expected_topics": ["reservation", "check-in", "booking"],
          "sample_responses": {
            "reservation": "Wonderful! Let me look that up for you. Could I please have your passport or ID?",
            "default": "Certainly! May I please see your ID or booking confirmation number?"
          }
        }
      ]
    },
    {
      "id": "restaurant_order",
      "title": "At the Restaurant",
      "level": "A1 - A2",
      "ai_role": "Waiter",
      "user_role": "Customer",
      "opening_message": "Hello! Welcome to Bella Vista. Are you ready to order, or would you like a few more minutes with the menu?",
      "suggested_replies": [
        "I'm ready to order, thank you!",
        "Could I have a glass of water first?",
        "What do you recommend for lunch today?"
      ]
    },
    {
      "id": "business_negotiation",
      "title": "Business Negotiation",
      "level": "B2 - C1",
      "ai_role": "Managing Director",
      "user_role": "Project Lead",
      "opening_message": "Thanks for joining this call. We reviewed your proposal, but the budget seems about 15% higher than expected. How can we make this work?",
      "suggested_replies": [
        "We can adjust the timeline to optimize resource costs.",
        "Let's look at phased delivery milestones to spread the investment.",
        "I understand your concern; let me break down the ROI and deliverables."
      ]
    }
  ],
  "writing_prompts": [
    {
      "id": "daily_routine",
      "title": "Write about your daily routine",
      "level": "A2",
      "instructions": "Describe your morning, what you do at work or school, and how you relax in the evening (50-100 words).",
      "sample_starter": "Every morning I wake up at 7:00 AM. First, I drink a cup of coffee and...",
      "key_criteria": ["Use Present Simple", "Include frequency adverbs", "Check subject-verb agreement"]
    },
    {
      "id": "formal_email",
      "title": "Formal Business Inquiry",
      "level": "B1",
      "instructions": "Write an email to request a meeting with a client next Tuesday to discuss project updates.",
      "sample_starter": "Dear Mr. Davis,\n\nI hope this email finds you well. I am writing to request a brief meeting...",
      "key_criteria": ["Formal greeting & closing", "Polite modal verbs", "Clear purpose"]
    }
  ],
  "phrasal_verbs": [
    {
      "id": "look_after",
      "verb": "look after",
      "meaning": "to take care of someone or something",
      "french": "s'occuper de / prendre soin de",
      "example": "She looks after her younger brothers when her parents are at work.",
      "level": "A2",
      "category": "Daily Life"
    },
    {
      "id": "give_up",
      "verb": "give up",
      "meaning": "to stop doing or trying something; quit",
      "french": "abandonner / arrêter",
      "example": "Never give up on your goals, even when it feels difficult.",
      "level": "A2",
      "category": "Motivation"
    },
    {
      "id": "run_out_of",
      "verb": "run out of",
      "meaning": "to use up the available supply of something",
      "french": "ne plus avoir de / être à court de",
      "example": "We have run out of coffee, so I need to go to the grocery store.",
      "level": "B1",
      "category": "Shopping & Home"
    },
    {
      "id": "bring_up",
      "verb": "bring up",
      "meaning": "to introduce a topic in conversation",
      "french": "aborder / évoquer un sujet",
      "example": "He brought up an interesting idea during the team meeting.",
      "level": "B2",
      "category": "Business & Work"
    },
    {
      "id": "turn_down",
      "verb": "turn down",
      "meaning": "to reject or refuse an offer, or reduce volume",
      "french": "refuser / baisser le volume",
      "example": "She had to turn down the job offer because the commute was too long.",
      "level": "B1",
      "category": "Work & Career"
    },
    {
      "id": "figure_out",
      "verb": "figure out",
      "meaning": "to discover or understand something after thinking",
      "french": "comprendre / trouver une solution",
      "example": "I am trying to figure out how this new software works.",
      "level": "B1",
      "category": "Technology"
    }
  ],
  "idioms_expressions": [
    {
      "id": "raining_cats_and_dogs",
      "expression": "It's raining cats and dogs.",
      "french": "Il pleut des cordes / Il pleut à verse.",
      "meaning": "It is raining very heavily.",
      "origin": "An old English idiom dating back to the 17th century.",
      "example": "Don't forget your umbrella today, it's raining cats and dogs outside!",
      "level": "A2",
      "image_tag": "🌧️"
    },
    {
      "id": "bite_the_bullet",
      "expression": "Bite the bullet",
      "french": "Prendre son courage à deux mains / Serrer les dents.",
      "meaning": "To endure a painful or difficult situation with courage.",
      "example": "I don't really want to go to the dentist, but I'll just have to bite the bullet.",
      "level": "B2",
      "image_tag": "🎯"
    },
    {
      "id": "break_a_leg",
      "expression": "Break a leg!",
      "french": "Bonne chance ! (dans le spectacle / avant un défi)",
      "meaning": "Good luck! (traditionally said to performers before going on stage).",
      "example": "You have your big presentation today—break a leg!",
      "level": "B1",
      "image_tag": "🎭"
    },
    {
      "id": "under_the_weather",
      "expression": "Under the weather",
      "french": "Pas dans son assiette / Un peu malade.",
      "meaning": "Feeling slightly ill or unwell.",
      "example": "Sarah won't be coming to the party because she is feeling under the weather.",
      "level": "A2",
      "image_tag": "🤒"
    },
    {
      "id": "piece_of_cake",
      "expression": "A piece of cake",
      "french": "C'est du gâteau / Un jeu d'enfant.",
      "meaning": "Something that is very easy to accomplish.",
      "example": "Don't worry about the driving test, it's a piece of cake if you practice.",
      "level": "A1",
      "image_tag": "🍰"
    },
    {
      "id": "once_in_a_blue_moon",
      "expression": "Once in a blue moon",
      "french": "Tous les 36 du mois / Très rarement.",
      "meaning": "Very rarely; almost never.",
      "example": "He lives abroad, so we only see each other once in a blue moon.",
      "level": "B1",
      "image_tag": "🌕"
    }
  ],
  "initial_assessment": {
    "title": "Évaluation Initiale de Niveau",
    "description": "Test rapide en 6 questions pour évaluer votre niveau du CECRL (A1 à C2) et personnaliser votre parcours.",
    "questions": [
      {
        "id": "q1",
        "skill": "Grammaire",
        "question": "Choose the correct sentence:",
        "options": [
          "She don't like coffee.",
          "She doesn't likes coffee.",
          "She doesn't like coffee.",
          "She not likes coffee."
        ],
        "correct": 2,
        "points": 1
      },
      {
        "id": "q2",
        "skill": "Vocabulaire",
        "question": "What is the synonym of 'Crucial'?",
        "options": [
          "Unimportant",
          "Essential",
          "Slow",
          "Optional"
        ],
        "correct": 1,
        "points": 2
      },
      {
        "id": "q3",
        "skill": "Grammaire",
        "question": "If I ______ you, I would accept the offer immediately.",
        "options": [
          "was",
          "were",
          "am",
          "have been"
        ],
        "correct": 1,
        "points": 2
      },
      {
        "id": "q4",
        "skill": "Compréhension écrite",
        "question": "'The meeting has been called off until further notice.' What does this mean?",
        "options": [
          "The meeting has started early.",
          "The meeting has been cancelled.",
          "The meeting is moved to another room.",
          "The meeting will last longer."
        ],
        "correct": 1,
        "points": 2
      },
      {
        "id": "q5",
        "skill": "Expressions",
        "question": "What does 'To hit the nail on the head' mean?",
        "options": [
          "To hurt oneself accidentally",
          "To build furniture",
          "To describe exactly what is causing a situation",
          "To make a big noise"
        ],
        "correct": 2,
        "points": 3
      },
      {
        "id": "q6",
        "skill": "Grammaire avancée",
        "question": "Seldom ______ such a remarkable performance.",
        "options": [
          "I have witnessed",
          "have I witnessed",
          "I had witnessed",
          "witnessed I"
        ],
        "correct": 1,
        "points": 3
      }
    ]
  },
  "gamification": {
    "daily_goal_minutes": 30,
    "default_streak": 7,
    "badges": [
      {
        "id": "first_lesson",
        "title": "Premier Pas",
        "icon": "🌱",
        "description": "Compléter votre première leçon d'anglais.",
        "unlocked": true
      },
      {
        "id": "streak_7",
        "title": "Habitude d'Acier",
        "icon": "🔥",
        "description": "Atteindre une série de 7 jours consécutifs.",
        "unlocked": true
      },
      {
        "id": "pronunciation_pro",
        "title": "Accent Parfait",
        "icon": "🎙️",
        "description": "Obtenir un score de prononciation supérieur à 85%.",
        "unlocked": true
      },
      {
        "id": "vocab_50",
        "title": "Maître des Mots",
        "icon": "📚",
        "description": "Maîtriser 50 mots dans le système SRS.",
        "unlocked": true
      },
      {
        "id": "ai_chatter",
        "title": "Bilingue IA",
        "icon": "🤖",
        "description": "Terminer 5 conversations complètes avec le tuteur IA.",
        "unlocked": false
      },
      {
        "id": "level_b1_cert",
        "title": "Diplômé B1",
        "icon": "📜",
        "description": "Débloquer le certificat intermédiaire B1.",
        "unlocked": true
      }
    ]
  }
};
