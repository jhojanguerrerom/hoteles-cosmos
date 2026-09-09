<?php

/**
 * Card Grid
 *
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block
 */


/*
 * =========================================
 * ATRIBUTOS GENERALES
 * =========================================
 */

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 40;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 40;


/*
 * =========================================
 * ESTILOS GENERALES DEL TÍTULO
 * =========================================
 */

$title_color = isset($attributes['titleColor'])
    ? $attributes['titleColor']
    : '#222222';

$title_size = isset($attributes['titleSize'])
    ? intval($attributes['titleSize'])
    : 24;

$title_weight = isset($attributes['titleWeight'])
    ? $attributes['titleWeight']
    : '700';

$title_align = isset($attributes['titleAlign'])
    ? $attributes['titleAlign']
    : 'left';

$title_margin_bottom = isset($attributes['titleMarginBottom'])
    ? intval($attributes['titleMarginBottom'])
    : 18;


/*
 * =========================================
 * ESTILOS GENERALES DEL CONTENIDO
 * =========================================
 */

$content_background = isset($attributes['contentBackground'])
    ? $attributes['contentBackground']
    : '#f5f1ea';

$item_color = isset($attributes['itemColor'])
    ? $attributes['itemColor']
    : '#333333';

$item_size = isset($attributes['itemSize'])
    ? intval($attributes['itemSize'])
    : 15;

$item_weight = isset($attributes['itemWeight'])
    ? $attributes['itemWeight']
    : '400';

$item_spacing = isset($attributes['itemSpacing'])
    ? intval($attributes['itemSpacing'])
    : 12;


/*
 * =========================================
 * CARDS
 * =========================================
 */

$cards = isset($attributes['cards'])
    && is_array($attributes['cards'])
    ? $attributes['cards']
    : [];


/*
 * =========================================
 * ESTILOS DEL BLOQUE
 * =========================================
 */

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'cosmos-card-grid-2',

        'style' => sprintf(
            '--cosmos-card-grid-2-margin-top:%dpx;' .
            '--cosmos-card-grid-2-margin-bottom:%dpx;' .

            '--cosmos-card-title-color:%s;' .
            '--cosmos-card-title-size:%dpx;' .
            '--cosmos-card-title-weight:%s;' .
            '--cosmos-card-title-align:%s;' .
            '--cosmos-card-title-margin-bottom:%dpx;' .

            '--cosmos-card-content-background:%s;' .
            '--cosmos-card-item-color:%s;' .
            '--cosmos-card-item-size:%dpx;' .
            '--cosmos-card-item-weight:%s;' .
            '--cosmos-card-item-spacing:%dpx;',

            $margin_top,
            $margin_bottom,

            esc_attr($title_color),
            $title_size,
            esc_attr($title_weight),
            esc_attr($title_align),
            $title_margin_bottom,

            esc_attr($content_background),
            esc_attr($item_color),
            $item_size,
            esc_attr($item_weight),
            $item_spacing
        )
    )
);


/*
 * =========================================
 * RUTAS DE ICONOS
 * =========================================
 */

$theme_uri = get_template_directory_uri();

$instagram_icon =
    $theme_uri . '/assets/icons/black-instagram.svg';

$facebook_icon =
    $theme_uri . '/assets/icons/black-facebook.svg';

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="container">

        <div class="cosmos-card-grid-2__cards">

            <?php foreach ($cards as $index => $card) : ?>

                <?php

                /*
                 * =====================================
                 * IMAGEN
                 * =====================================
                 */

                $image_url = isset($card['imageUrl'])
                    ? $card['imageUrl']
                    : '';

                $image_alt = isset($card['imageAlt'])
                    ? $card['imageAlt']
                    : '';

                $image_position = isset($card['imagePosition'])
                    ? $card['imagePosition']
                    : 'center center';


                /*
                 * =====================================
                 * TÍTULO
                 * =====================================
                 */

                $title = isset($card['title'])
                    ? $card['title']
                    : '';


                /*
                 * =====================================
                 * DESCRIPCIÓN
                 * =====================================
                 */

                $description = isset($card['description'])
                    ? $card['description']
                    : '';


                /*
                 * =====================================
                 * MENÚ
                 * =====================================
                 */

                $menu_enabled = !empty($card['menuEnabled']);

                $menu_text = isset($card['menuText'])
                    ? $card['menuText']
                    : 'Menú';

                $menu_url = isset($card['menuUrl'])
                    ? $card['menuUrl']
                    : '';


                /*
                 * =====================================
                 * UBICACIÓN
                 * =====================================
                 */

                $location_enabled = !empty($card['locationEnabled']);

                $location = isset($card['location'])
                    ? $card['location']
                    : '';


                /*
                 * =====================================
                 * HORARIO
                 * =====================================
                 */

                $schedule_enabled = !empty($card['scheduleEnabled']);

                $schedule = isset($card['schedule'])
                    ? $card['schedule']
                    : '';


                /*
                 * =====================================
                 * REDES SOCIALES
                 * =====================================
                 */

                $instagram_url = isset($card['socialInstagram'])
                    ? trim($card['socialInstagram'])
                    : '';

                $facebook_url = isset($card['socialFacebook'])
                    ? trim($card['socialFacebook'])
                    : '';

                ?>


                <article class="cosmos-card-grid-2__card">


                    <?php if ($image_url) : ?>

                        <div
                            class="cosmos-card-grid-2__image"
                            style="
                                background-image: url('<?php echo esc_url($image_url); ?>');
                                background-position: <?php echo esc_attr($image_position); ?>;
                            "
                            role="img"
                            aria-label="<?php echo esc_attr($image_alt); ?>"
                        ></div>

                    <?php else : ?>

                        <div
                            class="cosmos-card-grid-2__image-placeholder"
                            aria-hidden="true"
                        ></div>

                    <?php endif; ?>


                    <?php if ($title) : ?>

                        <h3 class="cosmos-card-grid-2__title">
                            <?php echo wp_kses_post($title); ?>
                        </h3>

                    <?php endif; ?>


                    <div class="cosmos-card-grid-2__content">


                        <?php if ($description) : ?>

                            <div class="cosmos-card-grid-2__description">
                                <?php echo wp_kses_post($description); ?>
                            </div>

                        <?php endif; ?>


                        <div class="cosmos-card-grid-2__items">


                            <?php if ($menu_enabled && $menu_text) : ?>

                                <?php if ($menu_url) : ?>

                                    <a
                                        href="<?php echo esc_url($menu_url); ?>"
                                        class="cosmos-card-grid-2__item cosmos-card-grid-2__menu"
                                    >
                                        <span>
                                            <?php echo esc_html($menu_text); ?>
                                        </span>
                                    </a>

                                <?php else : ?>

                                    <div class="cosmos-card-grid-2__item cosmos-card-grid-2__menu">

                                        <span>
                                            <?php echo esc_html($menu_text); ?>
                                        </span>

                                    </div>

                                <?php endif; ?>

                            <?php endif; ?>


                            <?php if ($location_enabled && $location) : ?>

                                <div class="cosmos-card-grid-2__item">

                                    <span class="cosmos-card-grid-2__item-icon">
                                        ⌖
                                    </span>

                                    <span>
                                        <?php echo esc_html($location); ?>
                                    </span>

                                </div>

                            <?php endif; ?>


                            <?php if ($schedule_enabled && $schedule) : ?>

                                <div class="cosmos-card-grid-2__item">

                                    <span class="cosmos-card-grid-2__item-icon">
                                        ◷
                                    </span>

                                    <span>
                                        <?php echo esc_html($schedule); ?>
                                    </span>

                                </div>

                            <?php endif; ?>


                        </div>


                        <?php if ($instagram_url || $facebook_url) : ?>

                            <div class="cosmos-card-grid-2__social">


                                <?php if ($instagram_url) : ?>

                                    <a
                                        href="<?php echo esc_url($instagram_url); ?>"
                                        class="cosmos-card-grid-2__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                    >

                                        <img
                                            src="<?php echo esc_url($instagram_icon); ?>"
                                            alt="Instagram"
                                        />

                                    </a>

                                <?php endif; ?>


                                <?php if ($facebook_url) : ?>

                                    <a
                                        href="<?php echo esc_url($facebook_url); ?>"
                                        class="cosmos-card-grid-2__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                    >

                                        <img
                                            src="<?php echo esc_url($facebook_icon); ?>"
                                            alt="Facebook"
                                        />

                                    </a>

                                <?php endif; ?>


                            </div>

                        <?php endif; ?>


                    </div>

                </article>

            <?php endforeach; ?>


            <?php if ($cards === []) : ?>

                <div class="cosmos-card-grid-2__empty">

                    <p>
                        <?php
                        echo esc_html(
                            __('Aún no hay cards.', 'hoteles-cosmos')
                        );
                        ?>
                    </p>

                </div>

            <?php endif; ?>


        </div>

    </div>

</section>