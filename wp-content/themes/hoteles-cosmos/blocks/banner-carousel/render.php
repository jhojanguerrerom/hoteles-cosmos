<?php

$slides = $attributes['slides'] ?? [];


/*
 * =====================================================
 * CONFIGURACIÓN GENERAL
 * =====================================================
 */

$banner_height = isset($attributes['bannerHeight'])
    ? intval($attributes['bannerHeight'])
    : 520;

$overlay = isset($attributes['overlay'])
    ? intval($attributes['overlay'])
    : 35;


/*
 * =====================================================
 * TÍTULO
 * =====================================================
 */

$title_font_size = isset($attributes['titleFontSize'])
    ? intval($attributes['titleFontSize'])
    : 42;

$title_color =
    $attributes['titleColor'] ?? '#ffffff';

$title_weight = isset($attributes['titleWeight'])
    ? intval($attributes['titleWeight'])
    : 600;


/*
 * =====================================================
 * CTA
 * =====================================================
 */

$cta_text_color =
    $attributes['ctaTextColor'] ?? '#ffffff';

$cta_background =
    $attributes['ctaBackground'] ?? '#000000';

$cta_has_background =
    !empty($attributes['ctaHasBackground']);

$cta_border_color =
    $attributes['ctaBorderColor'] ?? '#ffffff';

$cta_border_width =
    isset($attributes['ctaBorderWidth'])
        ? intval($attributes['ctaBorderWidth'])
        : 1;

$cta_border_radius =
    isset($attributes['ctaBorderRadius'])
        ? intval($attributes['ctaBorderRadius'])
        : 0;

$cta_padding_vertical =
    isset($attributes['ctaPaddingVertical'])
        ? intval($attributes['ctaPaddingVertical'])
        : 12;

$cta_padding_horizontal =
    isset($attributes['ctaPaddingHorizontal'])
        ? intval($attributes['ctaPaddingHorizontal'])
        : 28;


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
    $attributes['arrowBackground'] ?? 'rgba(0,0,0,0.35)';

$arrow_size =
    isset($attributes['arrowSize'])
        ? intval($attributes['arrowSize'])
        : 46;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$banner_height = max(
    250,
    min(900, $banner_height)
);

$overlay = max(
    0,
    min(90, $overlay)
);

$title_font_size = max(
    16,
    min(100, $title_font_size)
);

$title_weight = max(
    300,
    min(900, $title_weight)
);

$cta_border_width = max(
    0,
    min(10, $cta_border_width)
);

$cta_border_radius = max(
    0,
    min(50, $cta_border_radius)
);

$cta_padding_vertical = max(
    4,
    min(40, $cta_padding_vertical)
);

$cta_padding_horizontal = max(
    8,
    min(60, $cta_padding_horizontal)
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
    '--cosmos-banner-height:%dpx;
     --cosmos-banner-overlay:%s;
     --cosmos-banner-title-size:%dpx;
     --cosmos-banner-title-color:%s;
     --cosmos-banner-title-weight:%d;
     --cosmos-banner-cta-text:%s;
     --cosmos-banner-cta-background:%s;
     --cosmos-banner-cta-border:%s;
     --cosmos-banner-cta-border-width:%dpx;
     --cosmos-banner-cta-radius:%dpx;
     --cosmos-banner-cta-padding-y:%dpx;
     --cosmos-banner-cta-padding-x:%dpx;
     --cosmos-banner-arrow-color:%s;
     --cosmos-banner-arrow-background:%s;
     --cosmos-banner-arrow-size:%dpx;',
    $banner_height,
    $overlay / 100,
    $title_font_size,
    esc_attr($title_color),
    $title_weight,
    esc_attr($cta_text_color),
    esc_attr($cta_background),
    esc_attr($cta_border_color),
    $cta_border_width,
    $cta_border_radius,
    $cta_padding_vertical,
    $cta_padding_horizontal,
    esc_attr($arrow_color),
    esc_attr($arrow_background),
    $arrow_size
);


/*
 * =====================================================
 * NO HAY SLIDES
 * =====================================================
 */

if (empty($slides)) {
    return;
}

?>

<section
    <?php
    echo get_block_wrapper_attributes(
        array(
            'class' => 'cosmos-banner-carousel',
            'style' => $style
        )
    );
    ?>
>

    <div class="cosmos-banner-carousel__viewport">

        <div class="cosmos-banner-carousel__track">

            <?php foreach ($slides as $index => $slide) : ?>

                <?php

                $image_url =
                    $slide['url'] ?? '';

                $image_alt =
                    $slide['alt'] ?? '';

                $title =
                    $slide['title'] ?? '';

                $cta_text =
                    $slide['ctaText'] ?? 'Conoce más';

                $cta_url =
                    $slide['ctaUrl'] ?? '';

                $position =
                    $slide['position'] ?? 'center-center';

                ?>

                <article
                    class="
                        cosmos-banner-carousel__slide
                        cosmos-banner-carousel__position--<?php echo esc_attr($position); ?>
                    "
                >

                    <?php if ($image_url) : ?>

                        <img
                            class="cosmos-banner-carousel__image"
                            src="<?php echo esc_url($image_url); ?>"
                            alt="<?php echo esc_attr($image_alt); ?>"
                        >

                    <?php endif; ?>


                    <div class="cosmos-banner-carousel__overlay"></div>


                    <div class="cosmos-banner-carousel__content">

                        <?php if ($title) : ?>

                            <h2 class="cosmos-banner-carousel__title">

                                <?php
                                echo wp_kses_post($title);
                                ?>

                            </h2>

                        <?php endif; ?>


                        <?php if ($cta_url) : ?>

                            <a
                                class="
                                    cosmos-banner-carousel__button
                                    <?php
                                    echo !$cta_has_background
                                        ? 'cosmos-banner-carousel__button--transparent'
                                        : '';
                                    ?>
                                "
                                href="<?php echo esc_url($cta_url); ?>"
                            >
                                <?php
                                echo esc_html($cta_text);
                                ?>
                            </a>

                        <?php endif; ?>

                    </div>

                </article>

            <?php endforeach; ?>

        </div>


        <?php if ($show_arrows && count($slides) > 1) : ?>

            <button
                type="button"
                class="
                    cosmos-banner-carousel__arrow
                    cosmos-banner-carousel__arrow--prev
                "
                aria-label="Banner anterior"
            >
                <span aria-hidden="true">‹</span>
            </button>


            <button
                type="button"
                class="
                    cosmos-banner-carousel__arrow
                    cosmos-banner-carousel__arrow--next
                "
                aria-label="Banner siguiente"
            >
                <span aria-hidden="true">›</span>
            </button>

        <?php endif; ?>

    </div>

</section>