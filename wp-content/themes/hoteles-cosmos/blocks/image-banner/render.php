<?php

/**
 * Render del bloque Image Banner.
 *
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block
 */


/* =====================================================
   ATRIBUTOS
===================================================== */

$image_id = isset($attributes['imageId'])
    ? absint($attributes['imageId'])
    : 0;

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';


/* =====================================================
   OVERLAY
===================================================== */

$overlay_enabled = isset($attributes['overlayEnabled'])
    ? (bool) $attributes['overlayEnabled']
    : true;

$overlay_color = isset($attributes['overlayColor'])
    ? $attributes['overlayColor']
    : '#000000';

$overlay_opacity = isset($attributes['overlayOpacity'])
    ? (float) $attributes['overlayOpacity'] / 100
    : 0.35;


/* =====================================================
   POSICIÓN
===================================================== */

$content_position = isset($attributes['contentPosition'])
    ? $attributes['contentPosition']
    : 'top-left';


$allowed_positions = array(
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right'
);


if (!in_array($content_position, $allowed_positions, true)) {
    $content_position = 'top-left';
}


/* =====================================================
   PADDING
===================================================== */

$content_padding = isset($attributes['contentPadding'])
    ? absint($attributes['contentPadding'])
    : 0;


/* =====================================================
   TEXTO
===================================================== */

$text = isset($attributes['text'])
    ? $attributes['text']
    : 'Escribe tu texto aquí';

$text_size = isset($attributes['textSize'])
    ? absint($attributes['textSize'])
    : 48;

$text_color = isset($attributes['textColor'])
    ? $attributes['textColor']
    : '#ffffff';

$text_weight = isset($attributes['textWeight'])
    ? $attributes['textWeight']
    : '700';

$text_align = isset($attributes['textAlign'])
    ? $attributes['textAlign']
    : 'left';


/* =====================================================
   ALINEACIÓN
===================================================== */

$allowed_alignments = array(
    'left',
    'center',
    'right'
);


if (!in_array($text_align, $allowed_alignments, true)) {
    $text_align = 'left';
}


/* =====================================================
   BOTÓN
===================================================== */

$button_enabled = isset($attributes['buttonEnabled'])
    ? (bool) $attributes['buttonEnabled']
    : true;

$button_text = isset($attributes['buttonText'])
    ? $attributes['buttonText']
    : 'Conoce más';

$button_url = isset($attributes['buttonUrl'])
    ? $attributes['buttonUrl']
    : '#';

$button_width = isset($attributes['buttonWidth'])
    ? absint($attributes['buttonWidth'])
    : 180;

$button_height = isset($attributes['buttonHeight'])
    ? absint($attributes['buttonHeight'])
    : 48;

$button_text_size = isset($attributes['buttonTextSize'])
    ? absint($attributes['buttonTextSize'])
    : 14;

$button_text_color = isset($attributes['buttonTextColor'])
    ? $attributes['buttonTextColor']
    : '#ffffff';

$button_background = isset($attributes['buttonBackground'])
    ? $attributes['buttonBackground']
    : 'transparent';

$button_border_color = isset($attributes['buttonBorderColor'])
    ? $attributes['buttonBorderColor']
    : '#ffffff';

$button_border_width = isset($attributes['buttonBorderWidth'])
    ? absint($attributes['buttonBorderWidth'])
    : 1;

$button_border_radius = isset($attributes['buttonBorderRadius'])
    ? absint($attributes['buttonBorderRadius'])
    : 0;

$button_text_weight = isset($attributes['buttonTextWeight'])
    ? $attributes['buttonTextWeight']
    : '600';

$button_margin_top = isset($attributes['buttonMarginTop'])
    ? absint($attributes['buttonMarginTop'])
    : 25;


/* =====================================================
   IMAGEN
===================================================== */

if (!$image_url && $image_id) {

    $image_url = wp_get_attachment_image_url(
        $image_id,
        'full'
    );
}


if (!$image_alt && $image_id) {

    $image_alt = get_post_meta(
        $image_id,
        '_wp_attachment_image_alt',
        true
    );
}


/* =====================================================
   CSS VARIABLES
===================================================== */

$style = sprintf(
    '--cosmos-banner-overlay-color:%s;
     --cosmos-banner-overlay-opacity:%s;
     --cosmos-banner-content-padding:%dpx;
     --cosmos-banner-text-size:%dpx;
     --cosmos-banner-text-color:%s;
     --cosmos-banner-text-weight:%s;
     --cosmos-banner-text-align:%s;
     --cosmos-banner-button-width:%dpx;
     --cosmos-banner-button-height:%dpx;
     --cosmos-banner-button-size:%dpx;
     --cosmos-banner-button-color:%s;
     --cosmos-banner-button-background:%s;
     --cosmos-banner-button-border-color:%s;
     --cosmos-banner-button-border-width:%dpx;
     --cosmos-banner-button-radius:%dpx;
     --cosmos-banner-button-weight:%s;
     --cosmos-banner-button-margin-top:%dpx;',
    esc_attr($overlay_color),
    esc_attr($overlay_opacity),
    $content_padding,
    $text_size,
    esc_attr($text_color),
    esc_attr($text_weight),
    esc_attr($text_align),
    $button_width,
    $button_height,
    $button_text_size,
    esc_attr($button_text_color),
    esc_attr($button_background),
    esc_attr($button_border_color),
    $button_border_width,
    $button_border_radius,
    esc_attr($button_text_weight),
    $button_margin_top
);


/* =====================================================
   BLOCK ATTRIBUTES
===================================================== */

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'cosmos-image-banner',
        'style' => $style,
    )
);

?>

<section <?php echo $wrapper_attributes; ?>>

    <div
        class="cosmos-image-banner__background"
        <?php if ($image_url) : ?>
            style="background-image:url('<?php echo esc_url($image_url); ?>');"
        <?php endif; ?>
        <?php if ($image_alt) : ?>
            role="img"
            aria-label="<?php echo esc_attr($image_alt); ?>"
        <?php endif; ?>
    >

        <?php if ($overlay_enabled) : ?>

            <div class="cosmos-image-banner__overlay"></div>

        <?php endif; ?>


        <!-- =================================================
             POSICIONAMIENTO
        ================================================= -->

        <div class="cosmos-image-banner__position">

            <!--
                IMPORTANTE:
                Se conserva la clase global .container.
                No modificamos su ancho.
                Este bloque solamente le agrega
                el comportamiento de grid.
            -->

            <div class="container cosmos-image-banner__grid">

                <div
                    class="
                        cosmos-image-banner__content
                        is-position-<?php echo esc_attr($content_position); ?>
                        is-text-align-<?php echo esc_attr($text_align); ?>
                    "
                >

                    <!-- =================================================
                         TEXTO
                    ================================================= -->

                    <div class="cosmos-image-banner__text">

                        <?php echo wp_kses_post($text); ?>

                    </div>


                    <!-- =================================================
                         BOTÓN
                    ================================================= -->

                    <?php if ($button_enabled) : ?>

                        <a
                            class="cosmos-image-banner__button"
                            href="<?php echo esc_url($button_url); ?>"
                        >
                            <?php echo esc_html($button_text); ?>
                        </a>

                    <?php endif; ?>

                </div>

            </div>

        </div>

    </div>

</section>