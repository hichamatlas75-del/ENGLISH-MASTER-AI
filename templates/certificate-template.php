<?php
/**
 * Official CEFR Certificate Printable Template
 */

if (!defined('ABSPATH')) {
    exit;
}

$user_name = sanitize_text_field($_GET['user_name'] ?? 'Alex Martin');
$level = sanitize_text_field($_GET['level'] ?? 'B1');
$level_name = sanitize_text_field($_GET['level_name'] ?? 'Intermediate');
$date = date_i18n(get_option('date_format'), current_time('timestamp'));
$institution = get_option('ema_certificate_institution', 'English Master AI Academy');
$signature = get_option('ema_certificate_signature_name', 'Dr. Sarah Jenkins - Academic Director');
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Certificat de Réussite - <?php echo esc_html($user_name); ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #f1f5f9;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .certificate-sheet {
            background: #ffffff;
            width: 900px;
            padding: 60px 50px;
            border: 12px solid #1e3a8a;
            outline: 3px solid #d97706;
            outline-offset: -8px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            position: relative;
        }
        .cert-header {
            font-family: 'Cinzel', serif;
            font-size: 34px;
            color: #1e3a8a;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin: 0 0 10px 0;
        }
        .cert-sub {
            font-size: 16px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .cert-name {
            font-size: 36px;
            font-weight: 800;
            color: #0f172a;
            border-bottom: 2px solid #cbd5e1;
            display: inline-block;
            padding: 10px 40px;
            margin: 24px 0;
        }
        .cert-body {
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            max-width: 650px;
            margin: 0 auto 30px auto;
        }
        .cert-level-badge {
            font-size: 24px;
            font-weight: 800;
            color: #1e40af;
            background: #eff6ff;
            display: inline-block;
            padding: 8px 24px;
            border-radius: 999px;
            border: 1px solid #bfdbfe;
            margin-bottom: 40px;
        }
        .cert-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
        }
        .cert-signature {
            text-align: center;
        }
        .sign-img {
            font-family: 'Brush Script MT', cursive;
            font-size: 28px;
            color: #1e3a8a;
        }
        @media print {
            body { background: none; padding: 0; }
            .certificate-sheet { box-shadow: none; border-width: 8px; width: 100%; height: 100%; }
        }
    </style>
</head>
<body>
    <div class="certificate-sheet">
        <div style="font-size: 50px; margin-bottom: 10px;">🏅</div>
        <h1 class="cert-header"><?php echo esc_html($institution); ?></h1>
        <div class="cert-sub">Certificate of Achievement & Language Proficiency</div>

        <p style="color: #64748b; margin-top: 30px;">This is to certify that</p>
        <div class="cert-name"><?php echo esc_html($user_name); ?></div>
        
        <p class="cert-body">
            has demonstrated required oral fluency, grammar precision, listening comprehension, and lexical mastery according to the Common European Framework of Reference for Languages (CEFR) for:
        </p>

        <div class="cert-level-badge">
            English Level <?php echo esc_html($level); ?> - <?php echo esc_html($level_name); ?>
        </div>

        <div class="cert-footer">
            <div class="cert-signature">
                <div class="sign-img">Sarah Jenkins</div>
                <div style="font-size: 13px; color: #64748b;"><?php echo esc_html($signature); ?></div>
            </div>
            <div style="text-align: right; font-size: 13px; color: #64748b;">
                <strong>Date :</strong> <?php echo esc_html($date); ?><br>
                <strong>ID :</strong> EMA-<?php echo esc_html($level); ?>-<?php echo rand(1000, 9999); ?>
            </div>
        </div>
    </div>
</body>
</html>
