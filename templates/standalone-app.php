<?php
/**
 * Standalone Full-Screen App Template
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>English Master AI - Apprentissage d'Anglais Intelligent</title>
    <?php wp_head(); ?>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            background: #090e21;
            width: 100%;
            height: 100%;
        }
        #wpadminbar {
            display: none !important;
        }
    </style>
</head>
<body <?php body_class('ema-standalone-body'); ?>>
    <div id="english-master-ai-app"></div>
    <?php wp_footer(); ?>
</body>
</html>
