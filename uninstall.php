<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

global $wpdb;

// Drop custom tables
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ema_user_progress");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ema_srs_vocabulary");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}ema_user_stats");

// Delete options
delete_option('ema_ai_provider');
delete_option('ema_openai_api_key');
delete_option('ema_gemini_api_key');
delete_option('ema_enable_speech');
delete_option('ema_certificate_institution');
delete_option('ema_certificate_signature_name');
delete_option('ema_daily_goal_default');

// Flush rewrite rules
flush_rewrite_rules();
