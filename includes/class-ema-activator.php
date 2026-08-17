<?php
/**
 * Fired during plugin activation & deactivation
 */

if (!defined('ABSPATH')) {
    exit;
}

class EMA_Activator {

    public static function activate() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        // 1. Table User Progress
        $table_progress = $wpdb->prefix . 'ema_user_progress';
        $sql_progress = "CREATE TABLE IF NOT EXISTS $table_progress (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            lesson_id varchar(100) NOT NULL,
            level_id varchar(10) NOT NULL,
            score int(11) DEFAULT 0,
            xp_earned int(11) DEFAULT 0,
            completed_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY user_lesson (user_id, lesson_id)
        ) $charset_collate;";
        dbDelta($sql_progress);

        // 2. Table Spaced Repetition (SRS) Vocabulary
        $table_srs = $wpdb->prefix . 'ema_srs_vocabulary';
        $sql_srs = "CREATE TABLE IF NOT EXISTS $table_srs (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            word_id varchar(100) NOT NULL,
            repetition int(11) DEFAULT 0,
            interval_days float DEFAULT 1,
            ease_factor float DEFAULT 2.5,
            status varchar(20) DEFAULT 'learning',
            next_review_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY user_word (user_id, word_id),
            KEY user_review (user_id, next_review_at)
        ) $charset_collate;";
        dbDelta($sql_srs);

        // 3. Table User Stats & Gamification
        $table_stats = $wpdb->prefix . 'ema_user_stats';
        $sql_stats = "CREATE TABLE IF NOT EXISTS $table_stats (
            user_id bigint(20) NOT NULL,
            current_level varchar(10) DEFAULT 'B1',
            streak_days int(11) DEFAULT 1,
            last_activity_date date,
            total_xp int(11) DEFAULT 0,
            daily_goal_minutes int(11) DEFAULT 30,
            initial_test_score int(11) DEFAULT 0,
            badges_json text,
            PRIMARY KEY  (user_id)
        ) $charset_collate;";
        dbDelta($sql_stats);

        // Default plugin settings
        if (!get_option('ema_ai_provider')) {
            update_option('ema_ai_provider', 'builtin'); // builtin, openai, gemini, claude
        }
        if (!get_option('ema_enable_speech')) {
            update_option('ema_enable_speech', 'yes');
        }
        if (!get_option('ema_certificate_institution')) {
            update_option('ema_certificate_institution', 'English Master AI Academy');
        }

        // Flush rewrite rules for /learn-english/
        flush_rewrite_rules();
    }

    public static function deactivate() {
        flush_rewrite_rules();
    }
}
