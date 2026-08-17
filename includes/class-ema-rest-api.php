<?php
/**
 * REST API Endpoints for English Master AI
 */

if (!defined('ABSPATH')) {
    exit;
}

class EMA_Rest_API {

    private $namespace = 'english-master-ai/v1';

    public function register_routes() {
        // Fetch Curriculum Data
        register_rest_route($this->namespace, '/curriculum', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_curriculum'),
            'permission_callback' => '__return_true',
        ));

        // Fetch User Profile & Stats
        register_rest_route($this->namespace, '/user-stats', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_user_stats'),
            'permission_callback' => '__return_true',
        ));

        // Complete Lesson & Add XP
        register_rest_route($this->namespace, '/lesson/complete', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'complete_lesson'),
            'permission_callback' => '__return_true',
        ));

        // Spaced Repetition (SRS) Review update
        register_rest_route($this->namespace, '/srs/review', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'update_srs_review'),
            'permission_callback' => '__return_true',
        ));

        // AI Chat Coach
        register_rest_route($this->namespace, '/ai/chat', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'handle_ai_chat'),
            'permission_callback' => function($request) {
                $nonce = $request->get_header('X-WP-Nonce');
                if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) return true;
                return is_user_logged_in();
            },
        ));

        // AI Writing Correction
        register_rest_route($this->namespace, '/ai/correct-writing', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'correct_writing'),
            'permission_callback' => function($request) {
                $nonce = $request->get_header('X-WP-Nonce');
                if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) return true;
                return is_user_logged_in();
            },
        ));
    }

    public function get_curriculum($request) {
        $json_file = EMA_PLUGIN_DIR . 'includes/data/lessons-data.json';
        if (!file_exists($json_file)) {
            return new WP_Error('no_data', 'Lessons data file not found', array('status' => 404));
        }

        $data = json_decode(file_get_contents($json_file), true);
        return rest_ensure_response($data);
    }

    public function get_user_stats($request) {
        $user_id = get_current_user_id();
        
        // Defaults for guest/demo mode
        if (!$user_id) {
            return rest_ensure_response(array(
                'user_id'         => 0,
                'name'            => 'Alex Martin',
                'level'           => 'B1',
                'level_name'      => 'Intermediate',
                'progress'        => 64,
                'streak'          => 7,
                'daily_goal'      => 30,
                'daily_spent'     => 20,
                'xp'              => 1480,
                'skills'          => array(
                    'vocabulary'    => 72,
                    'grammar'       => 65,
                    'listening'     => 60,
                    'speaking'      => 58,
                    'pronunciation' => 70,
                    'writing'       => 55,
                ),
                'srs_counts'      => array(
                    'new'      => 12,
                    'learning' => 24,
                    'review'   => 18,
                    'recheck'  => 15,
                    'mastered' => 134,
                ),
            ));
        }

        global $wpdb;
        $table_stats = $wpdb->prefix . 'ema_user_stats';
        $stats = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_stats WHERE user_id = %d", $user_id), ARRAY_A);

        $current_user = wp_get_current_user();

        if (!$stats) {
            $stats = array(
                'user_id'            => $user_id,
                'name'               => $current_user->display_name,
                'level'              => 'B1',
                'level_name'         => 'Intermediate',
                'progress'           => 64,
                'streak'             => 7,
                'daily_goal'         => 30,
                'daily_spent'        => 20,
                'xp'                 => 1480,
            );
        }

        return rest_ensure_response($stats);
    }

    public function complete_lesson($request) {
        $params = $request->get_json_params();
        $lesson_id = sanitize_text_field($params['lesson_id'] ?? '');
        $level_id  = sanitize_text_field($params['level_id'] ?? 'A1');
        $xp        = intval($params['xp'] ?? 20);
        $score     = intval($params['score'] ?? 100);

        $user_id = get_current_user_id();

        if ($user_id > 0) {
            global $wpdb;
            $table_progress = $wpdb->prefix . 'ema_user_progress';
            $wpdb->insert($table_progress, array(
                'user_id'      => $user_id,
                'lesson_id'    => $lesson_id,
                'level_id'     => $level_id,
                'score'        => $score,
                'xp_earned'    => $xp,
                'completed_at' => current_time('mysql'),
            ));

            $table_stats = $wpdb->prefix . 'ema_user_stats';
            $exists = $wpdb->get_var($wpdb->prepare("SELECT user_id FROM $table_stats WHERE user_id = %d", $user_id));
            if (!$exists) {
                $wpdb->insert($table_stats, array('user_id' => $user_id, 'total_xp' => $xp, 'current_level' => 'A1', 'streak_days' => 1, 'daily_goal_minutes' => 30));
            } else {
                $wpdb->query($wpdb->prepare("UPDATE $table_stats SET total_xp = total_xp + %d WHERE user_id = %d", $xp, $user_id));
            }
        }

        return rest_ensure_response(array(
            'success'   => true,
            'xp_earned' => $xp,
            'message'   => 'Leçon complétée avec succès ! +'.$xp.' XP',
        ));
    }

    public function update_srs_review($request) {
        $params = $request->get_json_params();
        $word_id = sanitize_text_field($params['word_id'] ?? '');
        $rating  = intval($params['rating'] ?? 4); // 0 (blackout) to 5 (perfect)

        $user_id = get_current_user_id();
        
        $ease_factor = 2.5;
        $interval = 1;
        $repetitions = 0;
        $status = 'learning';
        
        if ($user_id > 0) {
            global $wpdb;
            $table_srs = $wpdb->prefix . 'ema_srs_vocabulary';
            
            // Load existing card data
            $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_srs WHERE user_id = %d AND word_id = %s", $user_id, $word_id));
            
            if ($row) {
                $ease_factor = floatval($row->ease_factor);
                $interval = floatval($row->interval_days);
                $repetitions = intval($row->repetition);
            }
            
            // SuperMemo-2 Algorithm Implementation
            // EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
            $ease_factor = $ease_factor + (0.1 - (5 - $rating) * (0.08 + (5 - $rating) * 0.02));
            $ease_factor = max(1.3, $ease_factor);
            
            if ($rating >= 3) {
                if ($repetitions == 0) {
                    $interval = 1;
                } elseif ($repetitions == 1) {
                    $interval = 6;
                } else {
                    $interval = round($interval * $ease_factor);
                }
                $repetitions++;
                $status = $rating >= 4 ? 'mastered' : 'review';
            } else {
                $repetitions = 0;
                $interval = 1;
                $status = 'learning';
            }
            
            $next_review = date('Y-m-d H:i:s', strtotime("+$interval days"));
            
            $wpdb->replace($table_srs, array(
                'user_id' => $user_id,
                'word_id' => $word_id,
                'repetition' => $repetitions,
                'interval_days' => $interval,
                'ease_factor' => $ease_factor,
                'status' => $status,
                'next_review_at' => $next_review,
            ));
        } else {
            // Guest mode fallback
            if ($rating >= 4) {
                $interval = 3;
                $status = 'mastered';
            } elseif ($rating == 3) {
                $interval = 1;
                $status = 'review';
            } else {
                $interval = 0.5;
                $status = 'learning';
            }
        }

        return rest_ensure_response(array(
            'success'     => true,
            'word_id'     => $word_id,
            'new_status'  => $status,
            'interval'    => $interval,
            'ease_factor' => $ease_factor,
        ));
    }

    public function handle_ai_chat($request) {
        $params = $request->get_json_params();
        $message = sanitize_text_field($params['message'] ?? '');
        $scenario_id = sanitize_text_field($params['scenario_id'] ?? 'general');
        $history = $params['history'] ?? array();

        $provider = get_option('ema_ai_provider', 'builtin');
        $api_key  = get_option('ema_openai_api_key', '');
        $gemini_key = get_option('ema_gemini_api_key', '');

        // If an OpenAI or Gemini API Key is configured in WP Admin, we can call it:
        if ($provider === 'openai' && !empty($api_key)) {
            $response = $this->call_openai_chat($message, $history, $api_key, $scenario_id);
            if (!is_wp_error($response) && !empty($response['reply'])) {
                return rest_ensure_response($response);
            }
        } elseif ($provider === 'gemini' && !empty($gemini_key)) {
            $response = $this->call_gemini_chat($message, $history, $gemini_key, $scenario_id);
            if (!is_wp_error($response) && !empty($response['reply'])) {
                return rest_ensure_response($response);
            }
        }

        // Built-in intelligent conversational engine (works instantly without external API key)
        $ai_reply = $this->generate_smart_local_reply($message, $scenario_id, $history);

        return rest_ensure_response(array(
            'reply'       => $ai_reply['text'],
            'correction'  => $ai_reply['correction'],
            'tip'         => $ai_reply['tip'],
            'audio_text'  => $ai_reply['text'],
        ));
    }

    private function generate_smart_local_reply($message, $scenario, $history) {
        $msg_lower = strtolower(trim($message));

        if (empty($msg_lower)) {
            return array(
                'text'       => "I didn't quite catch that. Could you please say that again?",
                'correction' => null,
                'tip'        => "Speak clearly or type your answer in the box below."
            );
        }

        // Check common grammatical mistakes for instant real-time feedback
        $correction = null;
        $tip = null;

        if (preg_match('/\bi am agree\b/i', $message)) {
            $correction = "Instead of 'I am agree', in English say 'I agree'.";
            $tip = "'Agree' is already a verb in English.";
        } elseif (preg_match('/\bhe go\b/i', $message) || preg_match('/\bshe go\b/i', $message)) {
            $correction = "Remember the 3rd person singular 's': 'He/She goes'.";
            $tip = "Add -es to verbs ending in 'o' with he/she/it.";
        } elseif (preg_match('/\bi have (\d+) years\b/i', $message)) {
            $correction = "In English we say 'I am 25 years old', not 'I have 25 years'.";
            $tip = "Age in English uses the verb 'To Be'.";
        }

        // Contextual responses based on scenarios
        if ($scenario === 'hotel_checkin') {
            if (strpos($msg_lower, 'reservation') !== false || strpos($msg_lower, 'booking') !== false || strpos($msg_lower, 'name') !== false) {
                return array(
                    'text' => "Thank you! I found your booking. Would you prefer a room with a king-sized bed or two twin beds?",
                    'correction' => $correction,
                    'tip' => "Try answering with: 'I would prefer a king-sized bed, please.'"
                );
            } elseif (strpos($msg_lower, 'king') !== false || strpos($msg_lower, 'twin') !== false || strpos($msg_lower, 'bed') !== false) {
                return array(
                    'text' => "Perfect! Your room is on the 5th floor, room 504. Breakfast is served from 7 to 10 AM. Here is your keycard. Is there anything else you need?",
                    'correction' => $correction,
                    'tip' => "You can ask about Wi-Fi or parking: 'What is the Wi-Fi password?'"
                );
            } elseif (strpos($msg_lower, 'wifi') !== false || strpos($msg_lower, 'wi-fi') !== false) {
                return array(
                    'text' => "The Wi-Fi is complimentary throughout the hotel. The network is 'GrandPalace_Guest' and there is no password required. Have a wonderful stay!",
                    'correction' => $correction,
                    'tip' => "Say: 'Thank you very much for your help!'"
                );
            } else {
                return array(
                    'text' => "Certainly! I'd be delighted to assist you with that. Could you please provide your confirmation number or passport?",
                    'correction' => $correction,
                    'tip' => $tip
                );
            }
        } elseif ($scenario === 'restaurant_order') {
            if (strpos($msg_lower, 'ready') !== false || strpos($msg_lower, 'order') !== false || strpos($msg_lower, 'water') !== false) {
                return array(
                    'text' => "Excellent! Today's chef special is grilled salmon with seasonal asparagus, or our classic homemade pasta. What sounds good to you?",
                    'correction' => $correction,
                    'tip' => "Use polite ordering phrases: 'I'll have the grilled salmon, please.'"
                );
            } elseif (strpos($msg_lower, 'salmon') !== false || strpos($msg_lower, 'pasta') !== false || strpos($msg_lower, 'steak') !== false) {
                return array(
                    'text' => "Great choice! And would you like something to drink with your meal? We have freshly squeezed juices, iced tea, or sparkling water.",
                    'correction' => $correction,
                    'tip' => "Say: 'A sparkling water with lemon, please.'"
                );
            } else {
                return array(
                    'text' => "Sounds delicious! I will put that order in for you right away. It should take about 15 minutes.",
                    'correction' => $correction,
                    'tip' => $tip
                );
            }
        } else {
            // General English Conversation
            if (strpos($msg_lower, 'hello') !== false || strpos($msg_lower, 'hi') !== false || strpos($msg_lower, 'hey') !== false) {
                return array(
                    'text' => "Hello there! It's fantastic to practice English with you today. What would you like to talk about: your hobbies, your work, or your travel plans?",
                    'correction' => $correction,
                    'tip' => "Choose one topic to develop your sentence structure!"
                );
            } elseif (strpos($msg_lower, 'travel') !== false || strpos($msg_lower, 'trip') !== false || strpos($msg_lower, 'vacation') !== false) {
                return array(
                    'text' => "Traveling is one of the best ways to broaden your horizons! What is the most memorable country or city you have ever visited?",
                    'correction' => $correction,
                    'tip' => "Use Present Perfect: 'I have visited...' or Past Simple: 'I visited... in 2022'."
                );
            } elseif (strpos($msg_lower, 'work') !== false || strpos($msg_lower, 'job') !== false) {
                return array(
                    'text' => "That sounds engaging! How long have you been working in your current field, and what do you enjoy most about it?",
                    'correction' => $correction,
                    'tip' => "Use 'for' with duration (for 3 years) or 'since' with starting point (since 2021)."
                );
            } else {
                return array(
                    'text' => "That is very interesting! Can you elaborate a bit more on that, or give me a concrete example?",
                    'correction' => $correction,
                    'tip' => "Try using connectors like 'Furthermore', 'For instance', or 'In my opinion'."
                );
            }
        }
    }

    public function correct_writing($request) {
        $params = $request->get_json_params();
        $text = sanitize_textarea_field($params['text'] ?? '');
        $prompt_id = sanitize_text_field($params['prompt_id'] ?? '');

        if (empty(trim($text))) {
            return new WP_Error('empty_text', 'Le texte est vide.', array('status' => 400));
        }

        $word_count = str_word_count($text);
        
        $sentences = preg_split('/[.!?]+/', $text, -1, PREG_SPLIT_NO_EMPTY);
        $sentence_count = count($sentences);
        
        $words = str_word_count(strtolower($text), 1);
        $unique_words = count(array_unique($words));
        $lexical_diversity = $word_count > 0 ? $unique_words / $word_count : 0;
        
        $score = min(98, max(60, 60 + ($word_count > 30 ? 10 : 0) + ($sentence_count > 2 ? 10 : 0) + ($lexical_diversity > 0.5 ? 10 : 0) + ($lexical_diversity > 0.7 ? 8 : 0)));

        $feedback_list = array();
        
        // Automated rule-based writing feedback
        if ($word_count < 25) {
            $feedback_list[] = array(
                'type'    => 'suggestion',
                'message' => 'Essayez d\'étoffer votre réponse pour dépasser au moins 50 mots.'
            );
        } else {
            $feedback_list[] = array(
                'type'    => 'success',
                'message' => 'Bonne longueur de texte (' . $word_count . ' mots).'
            );
        }
        
        if ($sentence_count < 3) {
            $feedback_list[] = array(
                'type'    => 'suggestion',
                'message' => 'Essayez de diviser vos idées en plusieurs phrases pour plus de clarté.'
            );
        }

        if (preg_match('/\b(firstly|then|afterwards|moreover|finally|furthermore|in addition)\b/i', $text)) {
            $feedback_list[] = array(
                'type'    => 'success',
                'message' => 'Excellente utilisation de mots de liaison (connecteurs logiques).'
            );
        } else {
            $feedback_list[] = array(
                'type'    => 'tip',
                'message' => 'Conseil : Utilisez des connecteurs comme "First", "Then", "Moreover" pour structurer vos paragraphes.'
            );
        }
        
        // Common spelling patterns
        if (preg_match('/\b(teh)\b/i', $text) || preg_match('/\b(alot)\b/i', $text) || preg_match('/\b(recieve)\b/i', $text)) {
            $feedback_list[] = array(
                'type'    => 'tip',
                'message' => 'Faites attention aux fautes de frappe courantes (ex: the, a lot, receive).'
            );
        }
        
        if ($lexical_diversity > 0.6) {
            $feedback_list[] = array(
                'type'    => 'success',
                'message' => 'Très bonne diversité de vocabulaire !'
            );
        }
        
        $cefr_level = 'A2';
        if ($word_count > 40 && $lexical_diversity > 0.5 && $sentence_count > 3) $cefr_level = 'B1+';
        if ($word_count > 80 && $lexical_diversity > 0.65 && $sentence_count > 6) $cefr_level = 'B2';

        return rest_ensure_response(array(
            'score'       => $score,
            'word_count'  => $word_count,
            'feedback'    => $feedback_list,
            'corrected'   => ucfirst(trim($text)),
            'cefr_level'  => $cefr_level,
            'xp_awarded'  => 25
        ));
    }

    private function call_openai_chat($message, $history, $api_key, $scenario) {
        $system_prompt = "You are an empathetic, encouraging and world-class English tutor in the English Master AI platform. Keep replies concise (2-3 sentences), natural, ask a follow-up question, and offer a short grammar/vocabulary tip if appropriate.";
        
        $messages = array(
            array('role' => 'system', 'content' => $system_prompt)
        );

        foreach ($history as $h) {
            $messages[] = array('role' => $h['role'], 'content' => $h['content']);
        }
        $messages[] = array('role' => 'user', 'content' => $message);

        $response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
            'headers' => array(
                'Content-Type'  => 'application/json',
                'Authorization' => 'Bearer ' . $api_key,
            ),
            'body'    => json_encode(array(
                'model'       => 'gpt-4o-mini',
                'messages'    => $messages,
                'temperature' => 0.7,
            )),
            'timeout' => 15,
        ));

        if (is_wp_error($response)) {
            return $response;
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        $reply = $body['choices'][0]['message']['content'] ?? '';

        return array(
            'reply'      => $reply,
            'correction' => null,
            'tip'        => null,
            'audio_text' => $reply,
        );
    }
    
    private function call_gemini_chat($message, $history, $api_key, $scenario) {
        $system_prompt = "You are an empathetic, encouraging and world-class English tutor in the English Master AI platform. Keep replies concise (2-3 sentences), natural, ask a follow-up question, and offer a short grammar/vocabulary tip if appropriate.";
        
        $contents = array();
        
        // Gemini expects role to be 'user' or 'model'
        foreach ($history as $h) {
            $role = ($h['role'] === 'assistant' || $h['role'] === 'model') ? 'model' : 'user';
            $contents[] = array('role' => $role, 'parts' => array(array('text' => $h['content'])));
        }
        
        $contents[] = array('role' => 'user', 'parts' => array(array('text' => $message)));
        
        $body = array(
            'systemInstruction' => array(
                'parts' => array(array('text' => $system_prompt))
            ),
            'contents' => $contents,
            'generationConfig' => array(
                'temperature' => 0.7
            )
        );

        $response = wp_remote_post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $api_key, array(
            'headers' => array(
                'Content-Type'  => 'application/json',
            ),
            'body'    => json_encode($body),
            'timeout' => 15,
        ));

        if (is_wp_error($response)) {
            return $response;
        }

        $body_data = json_decode(wp_remote_retrieve_body($response), true);
        $reply = $body_data['candidates'][0]['content']['parts'][0]['text'] ?? '';

        return array(
            'reply'      => $reply,
            'correction' => null,
            'tip'        => null,
            'audio_text' => $reply,
        );
    }
}
