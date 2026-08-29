<?php

$image_url =
    $attributes['imageUrl'] ?? '';

$image_alt =
    $attributes['imageAlt'] ?? '';

$image_position =
    $attributes['imagePosition'] ?? 'left';


/*
 * =====================================================
 * COLUMNAS
 * =====================================================
 */

$image_width =
    isset($attributes['imageWidth'])
        ? intval($attributes['imageWidth'])
        : 50;

$image_width = max(
    20,
    min(80, $image_width)
);

$text_width =
    100 - $image_width;


/*
 * =====================================================
 * CONTENIDO
 * =====================================================
 */

$title =
    $attributes['title'] ?? '';

$text_background_color =
    $attributes['textBackgroundColor']
        ?? '#111111';

$text_color =
    $attributes['textColor']
        ?? '#ffffff';

$title_size =
    isset($attributes['titleSize'])
        ? intval($attributes['titleSize'])
        : 52;

$title_weight =
    isset($attributes['titleWeight'])
        ? intval($attributes['titleWeight'])
        : 700;


/*
 * =====================================================
 * CTA
 * =====================================================
 */

$show_cta =
    !empty($attributes['showCta']);

$cta_text =
    $attributes['ctaText']
        ?? 'Conoce más';

$cta_url =
    $attributes['ctaUrl']
        ?? '#';

$cta_background_color =
    $attributes['ctaBackgroundColor']
        ?? '#ffffff';

$cta_text_color =
    $attributes['ctaTextColor']
        ?? '#111111';

$cta_style =
    $attributes['ctaStyle']
        ?? 'filled';

$cta_text_size =
    isset($attributes['ctaTextSize'])
        ? intval($attributes['ctaTextSize'])
        : 16;

$cta_padding_vertical =
    isset($attributes['ctaPaddingVertical'])
        ? intval($attributes['ctaPaddingVertical'])
        : 14;

$cta_padding_horizontal =
    isset($attributes['ctaPaddingHorizontal'])
        ? intval($attributes['ctaPaddingHorizontal'])
        : 28;

$cta_radius =
    isset($attributes['ctaRadius'])
        ? intval($attributes['ctaRadius'])
        : 4;


/*
 * =====================================================
 * ALTURA
 * =====================================================
 */

$hero_height =
    isset($attributes['heroHeight'])
        ? intval($attributes['heroHeight'])
        : 600;

$mobile_height =
    isset($attributes['mobileHeight'])
        ? intval($attributes['mobileHeight'])
        : 650;


/*
 * =====================================================
 * MOBILE
 * =====================================================
 */

$mobile_image_first =
    !isset($attributes['mobileImageFirst'])
    || !empty($attributes['mobileImageFirst']);


/*
 * =====================================================
 * ANCHO
 * =====================================================
 */

$content_width =
    $attributes['contentWidth'] ?? 'full';

$content_width_class =
    $content_width === 'container'
        ? 'cosmos-split-hero--container'
        : 'cosmos-split-hero--full';


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$title_size = max(
    20,
    min(100, $title_size)
);

$title_weight = max(
    100,
    min(900, $title_weight)
);


/*
 * CTA STYLE
 */

$cta_style = in_array(
    $cta_style,
    ['filled', 'outline'],
    true
)
    ? $cta_style
    : 'filled';


$cta_text_size = max(
    10,
    min(30, $cta_text_size)
);

$cta_padding_vertical = max(
    0,
    min(50, $cta_padding_vertical)
);

$cta_padding_horizontal = max(
    0,
    min(100, $cta_padding_horizontal)
);

$cta_radius = max(
    0,
    min(50, $cta_radius)
);

$hero_height = max(
    300,
    min(1000, $hero_height)
);

$mobile_height = max(
    300,
    min(1000, $mobile_height)
);


/*
 * =====================================================
 * STYLE
 * =====================================================
 */

$style = sprintf(

    '--cosmos-split-hero-image-width:%d%%;
     --cosmos-split-hero-text-width:%d%%;
     --cosmos-split-hero-height:%dpx;
     --cosmos-split-hero-mobile-height:%dpx;
     --cosmos-split-hero-text-background:%s;
     --cosmos-split-hero-text-color:%s;
     --cosmos-split-hero-title-size:%dpx;
     --cosmos-split-hero-title-weight:%d;
     --cosmos-split-hero-cta-background:%s;
     --cosmos-split-hero-cta-color:%s;
     --cosmos-split-hero-cta-size:%dpx;
     --cosmos-split-hero-cta-padding-y:%dpx;
     --cosmos-split-hero-cta-padding-x:%dpx;
     --cosmos-split-hero-cta-radius:%dpx;',

    $image_width,
    $text_width,

    $hero_height,
    $mobile_height,

    esc_attr(
        $text_background_color
    ),

    esc_attr(
        $text_color
    ),

    $title_size,
    $title_weight,

    esc_attr(
        $cta_background_color
    ),

    esc_attr(
        $cta_text_color
    ),

    $cta_text_size,

    $cta_padding_vertical,
    $cta_padding_horizontal,

    $cta_radius
);


/*
 * =====================================================
 * CLASES
 * =====================================================
 */

$position_class =
    $image_position === 'right'
        ? 'cosmos-split-hero__image-right'
        : '';


$cta_style_class =
    $cta_style === 'outline'
        ? 'cosmos-split-hero__cta--outline'
        : 'cosmos-split-hero__cta--filled';


$mobile_order_class =
    $mobile_image_first
        ? 'cosmos-split-hero__mobile-image-first'
        : 'cosmos-split-hero__mobile-content-first';

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' =>
            'cosmos-split-hero ' .
            $content_width_class,
        'style' => $style
    ]);
    ?>
>

    <div
        class="
            cosmos-split-hero__inner
            <?php echo esc_attr($position_class); ?>
            <?php echo esc_attr($mobile_order_class); ?>
        "
    >

        <!-- IMAGEN -->

        <div
            class="
                cosmos-split-hero__image-column
            "
        >

            <?php if ($image_url) : ?>

                <img
                    class="
                        cosmos-split-hero__image
                    "
                    src="<?php
                        echo esc_url(
                            $image_url
                        );
                    ?>"
                    alt="<?php
                        echo esc_attr(
                            $image_alt
                        );
                    ?>"
                    loading="lazy"
                >

            <?php endif; ?>

        </div>


        <!-- CONTENIDO -->

        <div
            class="
                cosmos-split-hero__content-column
            "
        >

            <div
                class="
                    cosmos-split-hero__content
                "
            >

                <?php if ($title) : ?>

                    <h1
                        class="
                            cosmos-split-hero__title
                        "
                    >

                        <?php
                        echo wp_kses_post(
                            $title
                        );
                        ?>

                    </h1>

                <?php endif; ?>


                <?php if ($show_cta && $cta_text) : ?>

                    <div
                        class="
                            cosmos-split-hero__cta-wrapper
                        "
                    >

                        <a
                            class="
                                cosmos-split-hero__cta
                                <?php echo esc_attr(
                                    $cta_style_class
                                ); ?>
                            "
                            href="<?php
                                echo esc_url(
                                    $cta_url
                                );
                            ?>"
                        >

                            <?php
                            echo esc_html(
                                wp_strip_all_tags(
                                    $cta_text
                                )
                            );
                            ?>

                        </a>

                    </div>

                <?php endif; ?>

            </div>

        </div>

    </div>

</section>