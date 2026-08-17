<?php
/**
 * WordPress Admin Management Interface
 */

if (!defined('ABSPATH')) {
    exit;
}

class EMA_Admin {

    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_pages'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }

    public function add_admin_pages() {
        add_menu_page(
            'English Master AI',
            'English Master AI',
            'manage_options',
            'english-master-ai',
            array($this, 'render_dashboard_page'),
            'dashicons-translation',
            30
        );

        add_submenu_page(
            'english-master-ai',
            'Tableau de bord',
            'Tableau de bord',
            'manage_options',
            'english-master-ai',
            array($this, 'render_dashboard_page')
        );

        add_submenu_page(
            'english-master-ai',
            'Réglages & IA',
            'Réglages & IA',
            'manage_options',
            'ema-settings',
            array($this, 'render_settings_page')
        );

        add_submenu_page(
            'english-master-ai',
            'Progression Étudiants',
            'Progression Étudiants',
            'manage_options',
            'ema-students',
            array($this, 'render_students_page')
        );
    }

    public function register_settings() {
        register_setting('ema_settings_group', 'ema_ai_provider', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_openai_api_key', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_gemini_api_key', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_firebase_api_key', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_firebase_project_id', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_certificate_institution', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_certificate_signature_name', array('sanitize_callback' => 'sanitize_text_field'));
        register_setting('ema_settings_group', 'ema_daily_goal_default', array('sanitize_callback' => 'absint'));
    }

    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'english-master-ai') !== false || strpos($hook, 'ema-') !== false) {
            wp_enqueue_style('ema-admin-style', EMA_PLUGIN_URL . 'assets/css/admin-style.css', array(), EMA_VERSION);
        }
    }

    public function render_dashboard_page() {
        ?>
        <div class="wrap ema-admin-wrap">
            <div class="ema-admin-header">
                <div class="ema-admin-brand">
                    <span class="ema-logo-icon">📘✨</span>
                    <div>
                        <h1>English Master AI</h1>
                        <p class="ema-subtitle">L'application d'anglais la plus complète du débutant à l'avancé (A1 - C2)</p>
                    </div>
                </div>
                <div class="ema-header-actions">
                    <a href="<?php echo esc_url(home_url('/learn-english/')); ?>" target="_blank" class="button button-primary button-hero">
                        🚀 Ouvrir l'Application Web
                    </a>
                </div>
            </div>

            <!-- Stats Bar -->
            <div class="ema-stats-grid">
                <div class="ema-stat-card">
                    <div class="stat-icon">🎓</div>
                    <div class="stat-content">
                        <h3>Niveaux CECRL</h3>
                        <p class="stat-value">6 Niveaux (A1 → C2)</p>
                        <span class="stat-meta">Conforme standards européens</span>
                    </div>
                </div>
                <div class="ema-stat-card">
                    <div class="stat-icon">🎙️</div>
                    <div class="stat-content">
                        <h3>Modules Intégrés</h3>
                        <p class="stat-value">8 Modules Clés</p>
                        <span class="stat-meta">Prononciation, IA, SRS, Grammaire...</span>
                    </div>
                </div>
                <div class="ema-stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-content">
                        <h3>Gamification</h3>
                        <p class="stat-value">XP, Badges & Streaks</p>
                        <span class="stat-meta">Rétention & engagement élevé</span>
                    </div>
                </div>
                <div class="ema-stat-card">
                    <div class="stat-icon">📜</div>
                    <div class="stat-content">
                        <h3>Certificats</h3>
                        <p class="stat-value">Génération PDF / HTML</p>
                        <span class="stat-meta">Personnalisables & téléchargeables</span>
                    </div>
                </div>
            </div>

            <!-- Shortcode Integration Card -->
            <div class="ema-card ema-integration-box">
                <h2>📌 Intégration sur votre site WordPress</h2>
                <p>Vous pouvez intégrer l'application d'apprentissage n'importe où sur votre site WordPress :</p>
                
                <div class="ema-code-box">
                    <code>[english_master_ai]</code>
                    <button type="button" class="button button-secondary" onclick="navigator.clipboard.writeText('[english_master_ai]'); alert('Shortcode copié !');">Copier le Shortcode</button>
                </div>
                <p class="description">Créez simplement une nouvelle page WordPress (ex: <em>Apprendre l'anglais</em>) et collez le shortcode ci-dessus dans le contenu.</p>
                <p>Ou utilisez l'URL plein écran autonome : <a href="<?php echo esc_url(home_url('/learn-english/')); ?>" target="_blank"><code><?php echo esc_url(home_url('/learn-english/')); ?></code></a></p>
            </div>
        </div>
        <?php
    }

    public function render_settings_page() {
        ?>
        <div class="wrap ema-admin-wrap">
            <h1>⚙️ Configuration & Moteur IA - English Master AI</h1>
            <hr />

            <form method="post" action="options.php" class="ema-settings-form">
                <?php
                settings_fields('ema_settings_group');
                do_settings_sections('ema_settings_group');

                $provider = get_option('ema_ai_provider', 'builtin');
                $openai_key = get_option('ema_openai_api_key', '');
                $gemini_key = get_option('ema_gemini_api_key', '');
                $institution = get_option('ema_certificate_institution', 'English Master AI Academy');
                $signature = get_option('ema_certificate_signature_name', 'Dr. Sarah Jenkins - Head of Academic Studies');
                $daily_goal = get_option('ema_daily_goal_default', 30);
                ?>

                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="ema_ai_provider">Fournisseur d'IA pour le Tuteur</label></th>
                        <td>
                            <select name="ema_ai_provider" id="ema_ai_provider" class="regular-text">
                                <option value="builtin" <?php selected($provider, 'builtin'); ?>>Moteur IA Hybride Intégré (Fonctionne immédiatement, sans clé requise)</option>
                                <option value="openai" <?php selected($provider, 'openai'); ?>>OpenAI API (GPT-4o / GPT-4o-mini)</option>
                                <option value="gemini" <?php selected($provider, 'gemini'); ?>>Google Gemini API (Gemini 1.5 Pro / Flash)</option>
                            </select>
                            <p class="description">Le moteur intégré gère nativement les dialogues, la grammaire et les corrections de niveau sans frais d'API.</p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_openai_api_key">Clé API OpenAI (Optionnelle)</label></th>
                        <td>
                            <input type="password" name="ema_openai_api_key" id="ema_openai_api_key" value="<?php echo esc_attr($openai_key); ?>" class="regular-text" placeholder="sk-..." />
                            <p class="description">Nécessaire uniquement si vous sélectionnez le fournisseur OpenAI.</p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_gemini_api_key">Clé API Google Gemini (Optionnelle)</label></th>
                        <td>
                            <input type="password" name="ema_gemini_api_key" id="ema_gemini_api_key" value="<?php echo esc_attr($gemini_key); ?>" class="regular-text" placeholder="AIzaSy..." />
                            <p class="description">Nécessaire si vous utilisez Google Gemini pour le tuteur conversationnel.</p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_firebase_api_key">🔥 Clé API Web Firebase (Firestore)</label></th>
                        <td>
                            <?php $fb_key = get_option('ema_firebase_api_key', 'AIzaSyDZOm_DhihLvmwdugTVF9B3IkZUaaBZsAQ'); ?>
                            <input type="password" name="ema_firebase_api_key" id="ema_firebase_api_key" value="<?php echo esc_attr($fb_key); ?>" class="regular-text" placeholder="AIzaSy..." />
                            <p class="description">Trouvez-la dans <em>Paramètres du projet > Général > Vos applications (Web)</em> dans la console Firebase.</p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_firebase_project_id">🔥 ID de Projet Firebase</label></th>
                        <td>
                            <?php $fb_project = get_option('ema_firebase_project_id', 'english-master-ai-4936d'); ?>
                            <input type="text" name="ema_firebase_project_id" id="ema_firebase_project_id" value="<?php echo esc_attr($fb_project); ?>" class="regular-text" placeholder="english-master-ai-4936d" />
                            <p class="description">ID de votre projet Firebase Firestore (ex: <code>english-master-ai-4936d</code>).</p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_certificate_institution">Nom de l'Organisme / École sur les Certificats</label></th>
                        <td>
                            <input type="text" name="ema_certificate_institution" id="ema_certificate_institution" value="<?php echo esc_attr($institution); ?>" class="regular-text" />
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_certificate_signature_name">Signataire Officiel du Certificat</label></th>
                        <td>
                            <input type="text" name="ema_certificate_signature_name" id="ema_certificate_signature_name" value="<?php echo esc_attr($signature); ?>" class="regular-text" />
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"><label for="ema_daily_goal_default">Objectif Quotidien par Défaut (Minutes)</label></th>
                        <td>
                            <input type="number" name="ema_daily_goal_default" id="ema_daily_goal_default" value="<?php echo esc_attr($daily_goal); ?>" class="small-text" min="5" max="120" /> min / jour
                        </td>
                    </tr>
                </table>

                <?php submit_button('Enregistrer les Réglages'); ?>
            </form>
        </div>
        <?php
    }

    public function render_students_page() {
        ?>
        <div class="wrap ema-admin-wrap">
            <h1>👥 Suivi des Apprenants & Statistiques</h1>
            <p>Consultez la progression des utilisateurs, les scores de prononciation et les niveaux atteints.</p>

            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Utilisateur</th>
                        <th>Niveau CECRL</th>
                        <th>Score Global</th>
                        <th>Série (Streak)</th>
                        <th>XP Total</th>
                        <th>Mots Maîtrisés</th>
                        <th>Dernière Activité</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    global $wpdb;
                    $table_stats = $wpdb->prefix . 'ema_user_stats';
                    $students = $wpdb->get_results(
                        "SELECT s.*, u.display_name, u.user_email 
                         FROM $table_stats s 
                         JOIN {$wpdb->users} u ON s.user_id = u.ID 
                         ORDER BY s.total_xp DESC 
                         LIMIT 50", ARRAY_A
                    );

                    if (empty($students)) :
                    ?>
                    <tr>
                        <td><strong>Alex Martin</strong><br><small>alex@example.com</small></td>
                        <td><span class="badge-level" style="background:#6366F1; color:#fff; padding:3px 8px; border-radius:12px; font-weight:bold;">B1 Intermédiaire</span></td>
                        <td>
                            <div style="background:#e2e8f0; border-radius:6px; overflow:hidden; width:120px; height:12px;">
                                <div style="width:64%; height:100%; background:#10b981;"></div>
                            </div>
                            <small>64% complété</small>
                        </td>
                        <td>🔥 7 jours</td>
                        <td><strong>1,480 XP</strong></td>
                        <td>134 mots</td>
                        <td>Aujourd'hui</td>
                    </tr>
                    <?php else :
                        foreach ($students as $student) : 
                    ?>
                    <tr>
                        <td><strong><?php echo esc_html($student['display_name']); ?></strong><br><small><?php echo esc_html($student['user_email']); ?></small></td>
                        <td><span class="badge-level" style="background:#6366F1; color:#fff; padding:3px 8px; border-radius:12px; font-weight:bold;"><?php echo esc_html($student['current_level']); ?></span></td>
                        <td>
                            <div style="background:#e2e8f0; border-radius:6px; overflow:hidden; width:120px; height:12px;">
                                <div style="width:100%; height:100%; background:#10b981;"></div>
                            </div>
                            <small>En cours</small>
                        </td>
                        <td>🔥 <?php echo intval($student['streak_days']); ?> jours</td>
                        <td><strong><?php echo number_format_i18n($student['total_xp']); ?> XP</strong></td>
                        <td>-</td>
                        <td><?php echo esc_html($student['last_activity_date'] ?? 'N/A'); ?></td>
                    </tr>
                    <?php 
                        endforeach;
                    endif; 
                    ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}
