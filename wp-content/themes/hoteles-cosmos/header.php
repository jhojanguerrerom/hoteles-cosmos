<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>

    <meta charset="<?php bloginfo('charset'); ?>">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>


<header class="site-header" id="site-header">

    <div class="header-inner">

        <!-- Menú móvil -->

        <button
            class="menu-toggle"
            id="menu-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="site-navigation"
        >

            <span></span>
            <span></span>
            <span></span>

        </button>


        <!-- Logo -->

        <div class="site-logo">

            <?php
            if ( function_exists('the_custom_logo') ) {
                the_custom_logo();
            }
            ?>

        </div>


        <!-- Navegación -->

        <nav
            class="main-navigation"
            id="site-navigation"
            aria-label="Navegación principal"
        >

            <?php

            wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'primary-menu',
                    'fallback_cb'    => false,
                    'depth'          => 3,
                )
            );

            ?>

        </nav>


        <!-- Idiomas -->

        <div class="language-switcher">

            <a
                href="#"
                class="language active"
                aria-label="Español"
            >
                🇪🇸
                <span>ES</span>
            </a>

            <span class="language-separator">|</span>

            <a
                href="#"
                class="language"
                aria-label="English"
            >
                🇬🇧
                <span>EN</span>
            </a>

        </div>

    </div>

</header>