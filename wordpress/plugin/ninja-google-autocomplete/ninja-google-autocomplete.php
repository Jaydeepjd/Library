<?php
/**
 * Plugin Name: Ninja Forms Google Address Autocomplete (Correct & Stable)
 * Description: Safely adds Google Places Autocomplete to Ninja Forms fields.
 * Version: 4.0
 * Author: jaydeep Dhokai
 */

if (!defined('ABSPATH')) {
    exit;
}

function nf_google_autocomplete_scripts() {

    wp_enqueue_script(
        'nf-google-autocomplete',
        plugin_dir_url(__FILE__) . 'autocomplete.js',
        ['jquery'],
        '4.0',
        true
    );

    wp_localize_script(
        'nf-google-autocomplete',
        'NF_GMAPS',
        [
            'apiKey'      => 'Your_Google_API_Key_Here',
            'placeholder' => 'Enter location'
        ]
    );
}

add_action('wp_enqueue_scripts', 'nf_google_autocomplete_scripts');