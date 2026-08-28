<?php

$items = $attributes['items'] ?? [];


/*
 * =====================================================
 * TEXTO
 * =====================================================
 */

$text_color =
    $attributes['textColor'] ?? '#111111';

$text_size =
    isset($attributes['textSize'])
        ? intval($attributes['textSize'])
        : 18;

$text_align =
    $attributes['textAlign'] ?? 'center';


/*
 * =====================================================
 * IMAGEN
 * =====================================================
 */

$image_radius =
    isset($attributes['imageRadius'])
        ? intval($attributes['imageRadius'])
        : 50;

$image_size =
    isset($attributes['imageSize'])
        ? intval($attributes['imageSize'])
        : 100;


/*
 * =====================================================
 * DISTRIBUCIÓN
 * =====================================================
 */

$card_gap =
    isset($attributes['cardGap'])
        ? intval($attributes['cardGap'])
        : 30;

$desktop_columns =
    isset($attributes['desktopColumns'])
        ? intval($attributes['desktopColumns'])
        : 3;

$tablet_columns =
    isset($attributes['tabletColumns'])
        ? intval($attributes['tabletColumns'])
        : 2;

$mobile_columns =
    isset($attributes['mobileColumns'])
        ? intval($attributes['mobileColumns'])
        : 1;


/*
 * =====================================================
 * FLECHAS
 * =====================================================
 */

$show_arrows =
    !empty($attributes['showArrows']);

$arrow_color =
    $attributes['arrowColor'] ?? '#111111';

$arrow_background_color =
    $attributes['arrowBackgroundColor'] ?? '#ffffff';

$arrow_size =
    isset($attributes['arrowSize'])
        ? intval($attributes['arrowSize'])
        : 42;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$text_size = max(
    10,
    min(40, $text_size)
);

$image_radius = max(
    0,
    min(50, $image_radius)
);

$image_size = max(
    50,
    min(100, $image_size)
);

$card_gap = max(
    0,
    min(80, $card_gap)
);

$desktop_columns = max(
    1,
    min(4, $desktop_columns)
);

$tablet_columns = max(
    1,
    min(3, $tablet_columns)
);

$mobile_columns = max(
    1,
    min(2, $mobile_columns)
);

$arrow_size = max(
    25,
    min(70, $arrow_size)
);


/*
 * =====================================================
 * STYLE VARIABLES
 * =====================================================
 */

$style = sprintf(

    '--cosmos-carousel-text-color:%s;
     --cosmos-carousel-text-size:%dpx;
     --cosmos-carousel-text-align:%s;
     --cosmos-carousel-image-radius:%d%%;
     --cosmos-carousel-image-size:%d%%;
     --cosmos-carousel-gap:%dpx;
     --cosmos-carousel-desktop-columns:%d;
     --cosmos-carousel-tablet-columns:%d;
     --cosmos-carousel-mobile-columns:%d;
     --cosmos-carousel-arrow-color:%s;
     --cosmos-carousel-arrow-background:%s;
     --cosmos-carousel-arrow-size:%dpx;',

    esc_attr($text_color),
    $text_size,
    esc_attr($text_align),

    $image_radius,
    $image_size,

    $card_gap,

    $desktop_columns,
    $tablet_columns,
    $mobile_columns,

    esc_attr($arrow_color),
    esc_attr($arrow_background_color),

    $arrow_size
);

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-image-carousel',
        'style' => $style
    ]);
    ?>
>

    <div class="container cosmos-image-carousel__container">

        <div class="cosmos-image-carousel__viewport">

            <div class="cosmos-image-carousel__track">

                <?php foreach ($items as $index => $item) : ?>

                    <?php

                    $image_url =
                        $item['url'] ?? '';

                    $image_alt =
                        $item['alt'] ?? '';

                    $text =
                        $item['text'] ?? '';

                    ?>

                    <article
                        class="cosmos-image-carousel__slide"
                        data-index="<?php echo esc_attr($index); ?>"
                    >

                        <div class="cosmos-image-carousel__card">

                            <?php if ($image_url) : ?>

                                <div class="cosmos-image-carousel__image-wrapper">

                                    <img
                                        class="cosmos-image-carousel__image"
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($image_alt); ?>"
                                        loading="lazy"
                                    >

                                </div>

                            <?php endif; ?>


                            <?php if ($text) : ?>

                                <div class="cosmos-image-carousel__text">

                                    <?php
                                    echo wp_kses_post($text);
                                    ?>

                                </div>

                            <?php endif; ?>

                        </div>

                    </article>

                <?php endforeach; ?>

            </div>

        </div>


        <?php if ($show_arrows) : ?>

            <button
                type="button"
                class="
                    cosmos-image-carousel__arrow
                    cosmos-image-carousel__arrow--prev
                "
                aria-label="Imagen anterior"
            >
                <span aria-hidden="true">‹</span>
            </button>


            <button
                type="button"
                class="
                    cosmos-image-carousel__arrow
                    cosmos-image-carousel__arrow--next
                "
                aria-label="Imagen siguiente"
            >
                <span aria-hidden="true">›</span>
            </button>

        <?php endif; ?>

    </div>

</section>