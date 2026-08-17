<?php
/**
 * Plugin Name: English Master AI - Apprentissage d'Anglais Intelligent
 * Plugin URI: https://github.com/englishmasterai/wp-plugin
 * Description: L'application d'apprentissage d'anglais la plus complète du débutant à l'avancé (A1 à C2), avec analyse de prononciation IA, grammaire, vocabulaire SRS, tuteur de conversation IA, listening et certificats.
 * Version: 1.0.0
 * Author: English Master AI Team
 * Author URI: https://englishmasterai.com
 * License: GPLv2 or later
 * Text Domain: english-master-ai
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('EMA_VERSION', '1.0.0');
define('EMA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('EMA_PLUGIN_URL', plugin_dir_url(__FILE__));
define('EMA_BASENAME', plugin_basename(__FILE__));

// Require Core Classes
require_once EMA_PLUGIN_DIR . 'includes/class-ema-activator.php';
require_once EMA_PLUGIN_DIR . 'includes/class-ema-rest-api.php';
require_once EMA_PLUGIN_DIR . 'includes/class-ema-admin.php';

/**
 * Main Plugin Class
 */
final class EnglishMasterAI {

    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->init_hooks();
    }

    private function init_hooks() {
        register_activation_hook(__FILE__, array('EMA_Activator', 'activate'));
        register_deactivation_hook(__FILE__, array('EMA_Activator', 'deactivate'));

        add_action('init', array($this, 'load_textdomain'));
        add_action('init', array($this, 'register_shortcodes'));
        add_action('init', array($this, 'add_rewrite_rules'));
        add_filter('query_vars', array($this, 'add_query_vars'));
        add_action('template_redirect', array($this, 'render_standalone_app'));

        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
        
        // Admin
        if (is_admin()) {
            new EMA_Admin();
        }

        // REST API
        add_action('rest_api_init', array(new EMA_Rest_API(), 'register_routes'));
    }

    public function load_textdomain() {
        load_plugin_textdomain('english-master-ai', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Register Assets
     */
    public function register_assets() {
        wp_register_style(
            'ema-google-fonts',
            'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
            array(),
            null
        );

        wp_register_style(
            'ema-frontend-css',
            EMA_PLUGIN_URL . 'assets/css/frontend-app.css',
            array('ema-google-fonts'),
            EMA_VERSION
        );

        wp_register_script(
            'ema-lessons-data',
            EMA_PLUGIN_URL . 'assets/js/lessons-data.js',
            array(),
            EMA_VERSION,
            true
        );

        wp_register_script(
            'ema-firebase-sync',
            EMA_PLUGIN_URL . 'assets/js/firebase-sync.js',
            array(),
            EMA_VERSION,
            true
        );

        wp_register_script(
            'ema-frontend-js',
            EMA_PLUGIN_URL . 'assets/js/frontend-app.js',
            array('jquery', 'ema-lessons-data', 'ema-firebase-sync'),
            EMA_VERSION,
            true
        );

        // Get initial data - defer reading to render_shortcode
        $lessons_data = array();

        $current_user = wp_get_current_user();
        $user_data = array(
            'is_logged_in' => is_user_logged_in(),
            'user_id'      => $current_user->ID,
            'name'         => is_user_logged_in() ? $current_user->display_name : 'Alex Martin',
            'email'        => is_user_logged_in() ? $current_user->user_email : 'alex@example.com',
            'level'        => 'B1',
            'level_name'   => 'Intermediate',
            'progress'     => 64,
            'streak'       => 7,
            'daily_goal'   => 30,
            'daily_spent'  => 20,
            'xp'           => 1480
        );
        
        if (is_user_logged_in()) {
            global $wpdb;
            $table_stats = $wpdb->prefix . 'ema_user_stats';
            $stats = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_stats WHERE user_id = %d", $current_user->ID), ARRAY_A);
            if ($stats) {
                $user_data['level'] = $stats['current_level'] ?? 'B1';
                $user_data['streak'] = $stats['streak_days'] ?? 1;
                $user_data['xp'] = $stats['total_xp'] ?? 0;
                $user_data['daily_goal'] = $stats['daily_goal_minutes'] ?? 30;
            }
        }

        $ai_provider = get_option('ema_ai_provider', 'builtin'); // builtin, openai, gemini, claude
        $firebase_api_key = get_option('ema_firebase_api_key', '');
        $firebase_project_id = get_option('ema_firebase_project_id', 'english-master-ai-4936d');

        wp_localize_script('ema-frontend-js', 'EMA_CONFIG', array(
            'api_root'     => esc_url_raw(rest_url('english-master-ai/v1/')),
            'nonce'        => wp_create_nonce('wp_rest'),
            'plugin_url'   => EMA_PLUGIN_URL,
            'user'         => $user_data,
            'initial_data' => $lessons_data,
            'ai_provider'  => $ai_provider,
            'firebase'     => array(
                'projectId'     => esc_attr($firebase_project_id),
                'authDomain'    => esc_attr($firebase_project_id) . '.firebaseapp.com',
                'storageBucket' => esc_attr($firebase_project_id) . '.appspot.com',
                'apiKey'        => esc_attr($firebase_api_key),
            ),
            'i18n'         => array(
                'listening'    => __('Listening', 'english-master-ai'),
                'speaking'     => __('Speaking', 'english-master-ai'),
                'grammar'      => __('Grammar', 'english-master-ai'),
                'vocabulary'   => __('Vocabulary', 'english-master-ai'),
                'streak'       => __('Série quotidienne', 'english-master-ai'),
                'correct'      => __('Bravo ! Réponse correcte.', 'english-master-ai'),
                'incorrect'    => __('Oups ! Réessayez.', 'english-master-ai'),
                'mic_prompt'   => __('Parlez maintenant...', 'english-master-ai'),
                'mic_success'  => __('Prononciation excellente !', 'english-master-ai'),
            )
        ));
    }

    /**
     * Shortcode [english_master_ai]
     */
    public function register_shortcodes() {
        add_shortcode('english_master_ai', array($this, 'render_shortcode'));
    }

    public function render_shortcode($atts) {
        wp_enqueue_style('ema-frontend-css');
        wp_enqueue_script('ema-frontend-js');

        $lessons_file = EMA_PLUGIN_DIR . 'includes/data/lessons-data.json';
        $lessons_data = file_exists($lessons_file) ? json_decode(file_get_contents($lessons_file), true) : array();

        ob_start();
        include EMA_PLUGIN_DIR . 'templates/app-container.php';
        return ob_get_clean();
    }

    /**
     * Standalone App rewrite rules (e.g. /learn-english/)
     */
    public function add_rewrite_rules() {
        add_rewrite_rule('^learn-english/?$', 'index.php?ema_app=1', 'top');
    }

    public function add_query_vars($vars) {
        $vars[] = 'ema_app';
        return $vars;
    }

    public function render_standalone_app() {
        if (get_query_var('ema_app')) {
            wp_enqueue_style('ema-frontend-css');
            wp_enqueue_script('ema-frontend-js');
            include EMA_PLUGIN_DIR . 'templates/standalone-app.php';
            exit;
        }
    }
}

function english_master_ai() {
    return EnglishMasterAI::instance();
}

english_master_ai();
