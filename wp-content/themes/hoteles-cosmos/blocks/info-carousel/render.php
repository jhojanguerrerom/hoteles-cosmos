<?php

$cards = $attributes['cards'] ?? [];


/*
 * =====================================================
 * CONFIGURACIÓN GENERAL
 * =====================================================
 */

$content_width =
    $attributes['contentWidth'] ?? 'container';

$card_background =
    $attributes['cardBackground'] ?? '#ffffff';

$card_has_background =
    !empty($attributes['cardHasBackground']);

$card_border_color =
    $attributes['cardBorderColor'] ?? '#dddddd';

$card_border_width =
    isset($attributes['cardBorderWidth'])
        ? intval($attributes['cardBorderWidth'])
        : 1;

$card_border_radius =
    isset($attributes['cardBorderRadius'])
        ? intval($attributes['cardBorderRadius'])
        : 0;

$card_padding =
    isset($attributes['cardPadding'])
        ? intval($attributes['cardPadding'])
        : 30;


/*
 * =====================================================
 * ICONO
 * =====================================================
 */

$icon_size =
    isset($attributes['iconSize'])
        ? intval($attributes['iconSize'])
        : 42;

$icon_title_gap =
    isset($attributes['iconTitleGap'])
        ? intval($attributes['iconTitleGap'])
        : 15;


/*
 * =====================================================
 * TÍTULO
 * =====================================================
 */

$title_color =
    $attributes['titleColor'] ?? '#111111';

$title_font_size =
    isset($attributes['titleFontSize'])
        ? intval($attributes['titleFontSize'])
        : 22;

$title_weight =
    isset($attributes['titleWeight'])
        ? intval($attributes['titleWeight'])
        : 600;


/*
 * =====================================================
 * LISTA
 * =====================================================
 */

$list_color =
    $attributes['listColor'] ?? '#333333';

$list_font_size =
    isset($attributes['listFontSize'])
        ? intval($attributes['listFontSize'])
        : 16;

$list_weight =
    isset($attributes['listWeight'])
        ? intval($attributes['listWeight'])
        : 400;

$list_gap =
    isset($attributes['listGap'])
        ? intval($attributes['listGap'])
        : 8;


/*
 * =====================================================
 * CARRUSEL
 * =====================================================
 */

$card_gap =
    isset($attributes['cardGap'])
        ? intval($attributes['cardGap'])
        : 30;


/*
 * =====================================================
 * ESPACIADO
 * =====================================================
 */

$margin_top =
    isset($attributes['marginTop'])
        ? intval($attributes['marginTop'])
        : 50;

$margin_bottom =
    isset($attributes['marginBottom'])
        ? intval($attributes['marginBottom'])
        : 50;


/*
 * =====================================================
 * FLECHAS
 * =====================================================
 */

$show_arrows =
    !empty($attributes['showArrows']);

$arrow_color =
    $attributes['arrowColor'] ?? '#ffffff';

$arrow_background =
    $attributes['arrowBackground'] ?? '#111111';

$arrow_size =
    isset($attributes['arrowSize'])
        ? intval($attributes['arrowSize'])
        : 42;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$card_border_width = max(
    0,
    min(10, $card_border_width)
);

$card_border_radius = max(
    0,
    min(60, $card_border_radius)
);

$card_padding = max(
    10,
    min(80, $card_padding)
);

$icon_size = max(
    20,
    min(100, $icon_size)
);

$icon_title_gap = max(
    0,
    min(50, $icon_title_gap)
);

$title_font_size = max(
    12,
    min(60, $title_font_size)
);

$title_weight = max(
    300,
    min(900, $title_weight)
);

$list_font_size = max(
    10,
    min(40, $list_font_size)
);

$list_weight = max(
    300,
    min(900, $list_weight)
);

$list_gap = max(
    0,
    min(30, $list_gap)
);

$card_gap = max(
    0,
    min(80, $card_gap)
);

$margin_top = max(
    0,
    min(150, $margin_top)
);

$margin_bottom = max(
    0,
    min(150, $margin_bottom)
);

$arrow_size = max(
    25,
    min(80, $arrow_size)
);


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-info-card-background:%s;
     --cosmos-info-card-border:%s;
     --cosmos-info-card-border-width:%dpx;
     --cosmos-info-card-radius:%dpx;
     --cosmos-info-card-padding:%dpx;
     --cosmos-info-icon-size:%dpx;
     --cosmos-info-icon-title-gap:%dpx;
     --cosmos-info-title-color:%s;
     --cosmos-info-title-size:%dpx;
     --cosmos-info-title-weight:%d;
     --cosmos-info-list-color:%s;
     --cosmos-info-list-size:%dpx;
     --cosmos-info-list-weight:%d;
     --cosmos-info-list-gap:%dpx;
     --cosmos-info-card-gap:%dpx;
     --cosmos-info-margin-top:%dpx;
     --cosmos-info-margin-bottom:%dpx;
     --cosmos-info-arrow-color:%s;
     --cosmos-info-arrow-background:%s;
     --cosmos-info-arrow-size:%dpx;',
    esc_attr(
        $card_has_background
            ? $card_background
            : 'transparent'
    ),
    esc_attr($card_border_color),
    $card_border_width,
    $card_border_radius,
    $card_padding,
    $icon_size,
    $icon_title_gap,
    esc_attr($title_color),
    $title_font_size,
    $title_weight,
    esc_attr($list_color),
    $list_font_size,
    $list_weight,
    $list_gap,
    $card_gap,
    $margin_top,
    $margin_bottom,
    esc_attr($arrow_color),
    esc_attr($arrow_background),
    $arrow_size
);


/*
 * =====================================================
 * SIN CARDS
 * =====================================================
 */

if (empty($cards)) {
    return;
}

?>

<section
    <?php
    echo get_block_wrapper_attributes(
        array(
            'class' =>
                'cosmos-info-carousel cosmos-info-carousel--' .
                esc_attr($content_width),
            'style' => $style
        )
    );
    ?>
>

    <!--
     * =================================================
     * VIEWPORT
     * =================================================
     *
     * Solamente las cards están dentro del viewport.
     * Este elemento conserva overflow:hidden.
     *
     -->

    <div class="cosmos-info-carousel__viewport">

        <div class="cosmos-info-carousel__track">

            <?php foreach ($cards as $index => $card) : ?>

                <?php

                $icon_url =
                    $card['iconUrl'] ?? '';

                $icon_alt =
                    $card['iconAlt'] ?? '';

                $title =
                    $card['title'] ?? '';

                $items =
                    isset($card['items']) &&
                    is_array($card['items'])
                        ? $card['items']
                        : [];

                ?>

                <article
                    class="cosmos-info-carousel__card"
                >

                    <!--
                     * =============================================
                     * CABECERA
                     * =============================================
                     -->

                    <div class="cosmos-info-carousel__header">

                        <?php if ($icon_url) : ?>

                            <img
                                class="cosmos-info-carousel__icon"
                                src="<?php echo esc_url($icon_url); ?>"
                                alt="<?php echo esc_attr($icon_alt); ?>"
                                loading="lazy"
                            >

                        <?php endif; ?>


                        <?php if ($title) : ?>

                            <h3
                                class="cosmos-info-carousel__title"
                            >
                                <?php
                                echo wp_kses_post($title);
                                ?>
                            </h3>

                        <?php endif; ?>

                    </div>


                    <!--
                     * =============================================
                     * LISTA
                     * =============================================
                     -->

                    <?php if (!empty($items)) : ?>

                        <ul
                            class="cosmos-info-carousel__list"
                        >

                            <?php foreach ($items as $item) : ?>

                                <?php if ($item !== '') : ?>

                                    <li
                                        class="cosmos-info-carousel__list-item"
                                    >
                                        <?php
                                        echo wp_kses_post($item);
                                        ?>
                                    </li>

                                <?php endif; ?>

                            <?php endforeach; ?>

                        </ul>

                    <?php endif; ?>

                </article>

            <?php endforeach; ?>

        </div>

    </div>


    <!--
     * =================================================
     * FLECHAS
     * =================================================
     *
     * IMPORTANTE:
     *
     * Este contenedor está FUERA del viewport.
     *
     * De esta manera:
     *
     * viewport  = recorta las cards
     * arrows    = pueden sobresalir del viewport
     *
     -->

    <?php if ($show_arrows && count($cards) > 1) : ?>

        <div class="cosmos-info-carousel__arrows">

            <button
                type="button"
                class="
                    cosmos-info-carousel__arrow
                    cosmos-info-carousel__arrow--prev
                "
                aria-label="Información anterior"
            >
                <span aria-hidden="true">
                    ‹
                </span>
            </button>


            <button
                type="button"
                class="
                    cosmos-info-carousel__arrow
                    cosmos-info-carousel__arrow--next
                "
                aria-label="Información siguiente"
            >
                <span aria-hidden="true">
                    ›
                </span>
            </button>

        </div>

    <?php endif; ?>

</section>