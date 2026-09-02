<?php

/*
 * =====================================================
 * ATRIBUTOS
 * =====================================================
 */

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';

$text = isset($attributes['text'])
    ? $attributes['text']
    : '';

$text_position = isset($attributes['textPosition'])
    ? $attributes['textPosition']
    : 'center-center';

$text_background_enabled =
    !empty($attributes['textBackgroundEnabled']);

$text_background = isset($attributes['textBackground'])
    ? $attributes['textBackground']
    : '#000000';

$text_background_opacity =
    isset($attributes['textBackgroundOpacity'])
        ? intval($attributes['textBackgroundOpacity'])
        : 75;

$text_color = isset($attributes['textColor'])
    ? $attributes['textColor']
    : '#ffffff';

$text_size = isset($attributes['textSize'])
    ? intval($attributes['textSize'])
    : 32;

$text_weight = isset($attributes['textWeight'])
    ? $attributes['textWeight']
    : '400';

$text_align = isset($attributes['textAlign'])
    ? $attributes['textAlign']
    : 'center';

$text_padding = isset($attributes['textPadding'])
    ? intval($attributes['textPadding'])
    : 20;

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 50;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 50;

$banner_height = isset($attributes['bannerHeight'])
    ? intval($attributes['bannerHeight'])
    : 450;

$overlay = isset($attributes['overlay'])
    ? intval($attributes['overlay'])
    : 25;


/*
 * =====================================================
 * VALIDACIONES
 * =====================================================
 */

$allowed_positions = array(

    'top-left',
    'top-center',
    'top-right',

    'center-left',
    'center-center',
    'center-right',

    'bottom-left',
    'bottom-center',
    'bottom-right'

);

if (
    !in_array(
        $text_position,
        $allowed_positions,
        true
    )
) {

    $text_position = 'center-center';

}


$allowed_weights = array(
    '400',
    '500',
    '600',
    '700'
);

if (
    !in_array(
        $text_weight,
        $allowed_weights,
        true
    )
) {

    $text_weight = '400';

}


$allowed_alignments = array(
    'left',
    'center',
    'right'
);

if (
    !in_array(
        $text_align,
        $allowed_alignments,
        true
    )
) {

    $text_align = 'center';

}


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$margin_top = max(
    0,
    min(200, $margin_top)
);

$margin_bottom = max(
    0,
    min(200, $margin_bottom)
);

$banner_height = max(
    150,
    min(900, $banner_height)
);

$overlay = max(
    0,
    min(100, $overlay)
);

$text_size = max(
    10,
    min(100, $text_size)
);

$text_padding = max(
    0,
    min(100, $text_padding)
);

$text_background_opacity = max(
    0,
    min(100, $text_background_opacity)
);


/*
 * =====================================================
 * ESTILO
 * =====================================================
 */

$style = sprintf(

    '--cosmos-banner-height:%dpx;
     --cosmos-banner-margin-top:%dpx;
     --cosmos-banner-margin-bottom:%dpx;
     --cosmos-banner-overlay:%f;
     --cosmos-banner-text-color:%s;
     --cosmos-banner-text-size:%dpx;
     --cosmos-banner-text-weight:%s;
     --cosmos-banner-text-align:%s;
     --cosmos-banner-text-padding:%dpx;
     --cosmos-banner-text-background:%s;
     --cosmos-banner-text-background-opacity:%f;',

    $banner_height,

    $margin_top,

    $margin_bottom,

    $overlay / 100,

    esc_attr(
        $text_color
    ),

    $text_size,

    esc_attr(
        $text_weight
    ),

    esc_attr(
        $text_align
    ),

    $text_padding,

    esc_attr(
        $text_background
    ),

    $text_background_opacity / 100

);

?>


<section
    <?php
    echo get_block_wrapper_attributes(
        array(
            'class' =>
                'cosmos-image-text-banner',
            'style' =>
                $style
        )
    );
    ?>
>

    <?php if ($image_url) : ?>

        <div
            class="
                cosmos-image-text-banner__background
                position-<?php
                    echo esc_attr(
                        $text_position
                    );
                ?>
            "
        >

            <img
                class="
                    cosmos-image-text-banner__image
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
            />


            <div
                class="
                    cosmos-image-text-banner__overlay
                "
            ></div>


            <div
                class="
                    container
                    cosmos-image-text-banner__container
                "
            >

                <?php if ($text) : ?>

                    <div
                        class="
                            cosmos-image-text-banner__text
                            <?php
                            echo $text_background_enabled
                                ? 'has-background'
                                : '';
                            ?>
                        "
                    >

                        <?php
                        echo wp_kses_post(
                            $text
                        );
                        ?>

                    </div>

                <?php endif; ?>

            </div>

        </div>

    <?php else : ?>

        <div
            class="
                cosmos-image-text-banner__empty
            "
        >

            <?php
            echo esc_html__(
                'No se ha seleccionado una imagen.',
                'hoteles-cosmos'
            );
            ?>

        </div>

    <?php endif; ?>

</section>