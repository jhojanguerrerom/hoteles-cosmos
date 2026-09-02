<?php

/**
 * =========================================================
 * CONFIGURACIÓN DEL TEMA
 * =========================================================
 */

function hoteles_cosmos_setup() {

    add_theme_support('title-tag');

    add_theme_support('post-thumbnails');

    add_theme_support('custom-logo', array(
        'height'      => 120,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    register_nav_menus(array(
        'primary' => __('Menú principal', 'hoteles-cosmos'),
        'footer'  => __('Menú del footer', 'hoteles-cosmos'),
    ));
}

add_action('after_setup_theme', 'hoteles_cosmos_setup');


/**
 * =========================================================
 * CSS Y JAVASCRIPT
 * =========================================================
 */

function hoteles_cosmos_assets() {

    wp_enqueue_style(
        'hoteles-cosmos-style',
        get_stylesheet_uri(),
        array(),
        '1.0.4'
    );

    wp_enqueue_script(
        'hoteles-cosmos-main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.4',
        true
    );
}

add_action('wp_enqueue_scripts', 'hoteles_cosmos_assets');


/**
 * =========================================================
 * PERSONALIZADOR
 * REDES SOCIALES
 * =========================================================
 */

function hoteles_cosmos_customize_register($wp_customize) {

    /*
     * -----------------------------------------------------
     * SECCIÓN
     * -----------------------------------------------------
     */

    $wp_customize->add_section(
        'hoteles_cosmos_social',
        array(
            'title'       => __('Redes sociales', 'hoteles-cosmos'),
            'description' => __('Configura los enlaces de las redes sociales que aparecerán en el footer.', 'hoteles-cosmos'),
            'priority'    => 40,
        )
    );


    /*
     * -----------------------------------------------------
     * REDES SOCIALES
     * -----------------------------------------------------
     */

    $social_networks = array(

        'instagram' => 'Instagram',

        'facebook' => 'Facebook',

        'linkedin' => 'LinkedIn',

        'youtube' => 'YouTube',

        'tiktok' => 'TikTok',

        'x' => 'X / Twitter',

    );


    /*
     * -----------------------------------------------------
     * CAMPOS
     * -----------------------------------------------------
     */

    foreach ($social_networks as $key => $label) {

        $wp_customize->add_setting(
            'hoteles_cosmos_social_' . $key,
            array(
                'default'           => '',
                'sanitize_callback' => 'esc_url_raw',
            )
        );

        $wp_customize->add_control(
            'hoteles_cosmos_social_' . $key,
            array(
                'label'       => $label,
                'description' => 'Enlace completo de ' . $label . '.',
                'section'     => 'hoteles_cosmos_social',
                'type'        => 'url',
            )
        );
    }


    /*
     * -----------------------------------------------------
     * CORREO
     * -----------------------------------------------------
     */

    $wp_customize->add_setting(
        'hoteles_cosmos_footer_email',
        array(
            'default'           => '',
            'sanitize_callback' => 'sanitize_email',
        )
    );

    $wp_customize->add_control(
        'hoteles_cosmos_footer_email',
        array(
            'label'       => __('Correo electrónico', 'hoteles-cosmos'),
            'description' => __('Correo que aparecerá en el footer.', 'hoteles-cosmos'),
            'section'     => 'hoteles_cosmos_social',
            'type'        => 'email',
        )
    );
}

add_action(
    'customize_register',
    'hoteles_cosmos_customize_register'
);


/**
 * =========================================================
 * BLOQUES GUTENBERG
 * =========================================================
 */

function hoteles_cosmos_block_categories($block_categories, $editor_context) {

    $block_categories[] = array(
        'slug'  => 'cosmos',
        'title' => __('Hoteles Cosmos', 'hoteles-cosmos'),
    );

    return $block_categories;
}

add_filter('block_categories_all', 'hoteles_cosmos_block_categories', 10, 2);


function hoteles_cosmos_register_blocks() {

    register_block_type(
        get_template_directory() . '/blocks/hero'
    );

    register_block_type(
        get_template_directory() . '/blocks/overlap-content'
    );

    register_block_type(
        get_template_directory() . '/blocks/cta'
    );

    register_block_type(
        get_template_directory() . '/blocks/image'
    );

    register_block_type(
        get_template_directory() . '/blocks/text'
    );

    register_block_type(
        get_template_directory() . '/blocks/gallery'
    );

    register_block_type(
        get_template_directory() . '/blocks/icon-features'
    );

    register_block_type(
        get_template_directory() . '/blocks/text-columns'
    );

    register_block_type(
        get_template_directory() . '/blocks/image-text-banner'
    );

    register_block_type(
        get_template_directory() . '/blocks/two-column-text'
    );

    register_block_type(
        get_template_directory() . '/blocks/image-cards'
    );

    register_block_type(
        get_template_directory() . '/blocks/three-columns-image'
    );

    register_block_type(
        get_template_directory() . '/blocks/image-text-section'
    );

    register_block_type(
        get_template_directory() . '/blocks/carousel'
    );

    register_block_type(
        get_template_directory() . '/blocks/statistics-grid'
    );

    register_block_type(
        get_template_directory() . '/blocks/split-hero'
    );

    register_block_type(
        get_template_directory() . '/blocks/booking-engine'
    );

    register_block_type(
        get_template_directory() . '/blocks/card-grid'
    );

    register_block_type(
        get_template_directory() . '/blocks/image-text-banner-2'
    );

    register_block_type(
        get_template_directory() . '/blocks/image-text-columns'
    );
}

add_action(
    'init',
    'hoteles_cosmos_register_blocks'
);