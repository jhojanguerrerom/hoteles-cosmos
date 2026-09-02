<?php

$image_id = isset($attributes['imageId'])
    ? intval($attributes['imageId'])
    : 0;

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';

$container_mode = isset($attributes['containerMode'])
    ? $attributes['containerMode']
    : 'container';

$image_width = isset($attributes['imageWidth'])
    ? intval($attributes['imageWidth'])
    : 60;

$text_width = 100 - $image_width;

$image_height = isset($attributes['imageHeight'])
    ? intval($attributes['imageHeight'])
    : 450;

$desktop_order = isset($attributes['desktopOrder'])
    ? $attributes['desktopOrder']
    : 'image-text';

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 50;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 50;

$text = isset($attributes['text'])
    ? $attributes['text']
    : '';

$text_size = isset($attributes['textSize'])
    ? intval($attributes['textSize'])
    : 32;

$text_color = isset($attributes['textColor'])
    ? $attributes['textColor']
    : '#111111';

$text_weight = isset($attributes['textWeight'])
    ? $attributes['textWeight']
    : '400';

$text_align = isset($attributes['textAlign'])
    ? $attributes['textAlign']
    : 'center';

$text_background_enabled =
    !empty($attributes['textBackgroundEnabled']);

$text_background = isset($attributes['textBackground'])
    ? $attributes['textBackground']
    : '#ffffff';

$text_padding = isset($attributes['textPadding'])
    ? intval($attributes['textPadding'])
    : 40;

$button_text = isset($attributes['buttonText'])
    ? $attributes['buttonText']
    : 'Conoce más';

$button_url = isset($attributes['buttonUrl'])
    ? $attributes['buttonUrl']
    : '#';

$button_width = isset($attributes['buttonWidth'])
    ? intval($attributes['buttonWidth'])
    : 70;

$button_height = isset($attributes['buttonHeight'])
    ? intval($attributes['buttonHeight'])
    : 46;

$button_text_size = isset($attributes['buttonTextSize'])
    ? intval($attributes['buttonTextSize'])
    : 14;

$button_text_color =
    $attributes['buttonTextColor'] ?? '#ffffff';

$button_background =
    $attributes['buttonBackground'] ?? '#111111';

$button_border_color =
    $attributes['buttonBorderColor'] ?? '#111111';

$button_border_width =
    isset($attributes['buttonBorderWidth'])
        ? intval($attributes['buttonBorderWidth'])
        : 1;

$button_border_radius =
    isset($attributes['buttonBorderRadius'])
        ? intval($attributes['buttonBorderRadius'])
        : 0;

$button_text_weight =
    $attributes['buttonTextWeight'] ?? '600';

$button_margin_top =
    isset($attributes['buttonMarginTop'])
        ? intval($attributes['buttonMarginTop'])
        : 25;

$button_align =
    isset($attributes['buttonAlign'])
        ? $attributes['buttonAlign']
        : 'center';


/*
 * =====================================================
 * VALIDACIONES
 * =====================================================
 */

$image_width = max(
    20,
    min(80, $image_width)
);

$text_width = 100 - $image_width;


$image_height = max(
    150,
    min(800, $image_height)
);


$margin_top = max(
    0,
    min(150, $margin_top)
);

$margin_bottom = max(
    0,
    min(150, $margin_bottom)
);


$text_size = max(
    10,
    min(80, $text_size)
);


$text_padding = max(
    0,
    min(100, $text_padding)
);


$button_width = max(
    20,
    min(100, $button_width)
);

$button_height = max(
    30,
    min(100, $button_height)
);


$button_text_size = max(
    8,
    min(30, $button_text_size)
);


$button_border_width = max(
    0,
    min(5, $button_border_width)
);


$button_border_radius = max(
    0,
    min(50, $button_border_radius)
);


$button_margin_top = max(
    0,
    min(80, $button_margin_top)
);


/*
 * =====================================================
 * VALIDAR ORDEN
 * =====================================================
 */

if (
    !in_array(
        $desktop_order,
        array(
            'image-text',
            'text-image'
        ),
        true
    )
) {

    $desktop_order = 'image-text';

}


/*
 * =====================================================
 * VALIDAR ALINEACIÓN BOTÓN
 * =====================================================
 */

if (
    !in_array(
        $button_align,
        array(
            'left',
            'center',
            'right'
        ),
        true
    )
) {

    $button_align = 'center';

}


/*
 * =====================================================
 * CONVERTIR ALINEACIÓN
 *
 * left   → flex-start
 * center → center
 * right  → flex-end
 * =====================================================
 */

$button_align_self =
    $button_align === 'left'
        ? 'flex-start'
        : (
            $button_align === 'right'
                ? 'flex-end'
                : 'center'
        );


/*
 * =====================================================
 * CLASES
 * =====================================================
 */

$wrapper_class =
    'cosmos-image-text-columns__wrapper';


/*
 * ANCHO
 */

if ($container_mode === 'full') {

    $wrapper_class .= ' is-full';

} else {

    $wrapper_class .= ' is-container';

}


/*
 * ORDEN
 */

if ($desktop_order === 'text-image') {

    $wrapper_class .= ' is-text-first';

} else {

    $wrapper_class .= ' is-image-first';

}


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-image-text-image-width:%d%%;
     --cosmos-image-text-text-width:%d%%;
     --cosmos-image-text-image-height:%dpx;
     --cosmos-image-text-margin-top:%dpx;
     --cosmos-image-text-margin-bottom:%dpx;
     --cosmos-image-text-size:%dpx;
     --cosmos-image-text-color:%s;
     --cosmos-image-text-weight:%s;
     --cosmos-image-text-align:%s;
     --cosmos-image-text-background:%s;
     --cosmos-image-text-padding:%dpx;
     --cosmos-image-text-button-width:%d%%;
     --cosmos-image-text-button-height:%dpx;
     --cosmos-image-text-button-size:%dpx;
     --cosmos-image-text-button-color:%s;
     --cosmos-image-text-button-background:%s;
     --cosmos-image-text-button-border-color:%s;
     --cosmos-image-text-button-border-width:%dpx;
     --cosmos-image-text-button-radius:%dpx;
     --cosmos-image-text-button-weight:%s;
     --cosmos-image-text-button-margin-top:%dpx;
     --cosmos-image-text-button-align:%s;
     --cosmos-image-text-button-align-self:%s;',

    $image_width,
    $text_width,
    $image_height,
    $margin_top,
    $margin_bottom,
    $text_size,
    esc_attr($text_color),
    esc_attr($text_weight),
    esc_attr($text_align),

    $text_background_enabled
        ? esc_attr($text_background)
        : 'transparent',

    $text_padding,

    $button_width,
    $button_height,
    $button_text_size,
    esc_attr($button_text_color),
    esc_attr($button_background),
    esc_attr($button_border_color),
    $button_border_width,
    $button_border_radius,
    esc_attr($button_text_weight),
    $button_margin_top,
    esc_attr($button_align),
    esc_attr($button_align_self)
);

?>

<section
    <?php
    echo get_block_wrapper_attributes(
        array(
            'class' => 'cosmos-image-text-columns',
            'style' => $style
        )
    );
    ?>
>

    <?php if ($container_mode === 'container') : ?>

        <div class="container">

    <?php endif; ?>


        <div class="<?php echo esc_attr($wrapper_class); ?>">

            <div class="cosmos-image-text-columns__inner">


                <!-- =============================================
                     COLUMNA IMAGEN
                ============================================== -->

                <div class="cosmos-image-text-columns__image">

                    <?php if ($image_url) : ?>

                        <img
                            src="<?php echo esc_url($image_url); ?>"
                            alt="<?php echo esc_attr($image_alt); ?>"
                            loading="lazy"
                        >

                    <?php endif; ?>

                </div>


                <!-- =============================================
                     COLUMNA TEXTO
                ============================================== -->

                <div class="cosmos-image-text-columns__content">

                    <?php if (!empty($text)) : ?>

                        <div class="cosmos-image-text-columns__text">

                            <?php
                            echo wp_kses_post($text);
                            ?>

                        </div>

                    <?php endif; ?>


                    <?php if (!empty($button_text)) : ?>

                        <a
                            class="cosmos-image-text-columns__button"
                            href="<?php echo esc_url($button_url); ?>"
                        >

                            <?php
                            echo esc_html($button_text);
                            ?>

                        </a>

                    <?php endif; ?>

                </div>

            </div>

        </div>


    <?php if ($container_mode === 'container') : ?>

        </div>

    <?php endif; ?>

</section>