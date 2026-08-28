<?php

/*
 * =====================================================
 * CONTENIDO
 * =====================================================
 */

$text = $attributes['text'] ?? '';

$url = $attributes['url'] ?? '';


/*
 * =====================================================
 * TEXTO
 * =====================================================
 */

$text_color = $attributes['textColor'] ?? '#111111';

$text_align = $attributes['textAlign'] ?? 'left';

$font_size = isset($attributes['fontSize'])
    ? intval($attributes['fontSize'])
    : 32;

$font_weight = $attributes['fontWeight'] ?? '400';


/*
 * =====================================================
 * FONDO
 * =====================================================
 */

$has_background = !empty(
    $attributes['hasBackground']
);

$background_color =
    $attributes['backgroundColor'] ?? '#111111';


/*
 * =====================================================
 * BORDE
 * =====================================================
 */

$has_border = !empty(
    $attributes['hasBorder']
);

$border_color =
    $attributes['borderColor'] ?? '#111111';

$border_width = isset(
    $attributes['borderWidth']
)
    ? intval($attributes['borderWidth'])
    : 1;


/*
 * =====================================================
 * FORMA
 * =====================================================
 */

$border_radius = isset(
    $attributes['borderRadius']
)
    ? intval($attributes['borderRadius'])
    : 0;


/*
 * =====================================================
 * PADDING
 * =====================================================
 */

$padding_vertical = isset(
    $attributes['paddingVertical']
)
    ? intval($attributes['paddingVertical'])
    : 14;

$padding_horizontal = isset(
    $attributes['paddingHorizontal']
)
    ? intval($attributes['paddingHorizontal'])
    : 28;


/*
 * =====================================================
 * SUBRAYADO
 * =====================================================
 */

$has_underline = !empty(
    $attributes['hasUnderline']
);


/*
 * =====================================================
 * MÁRGENES
 * =====================================================
 */

$margin_top = isset(
    $attributes['marginTop']
)
    ? intval($attributes['marginTop'])
    : 0;

$margin_bottom = isset(
    $attributes['marginBottom']
)
    ? intval($attributes['marginBottom'])
    : 0;


/*
 * =====================================================
 * LIMITAR VALORES
 * =====================================================
 */

$font_size = max(
    12,
    min(100, $font_size)
);

$border_width = max(
    0,
    min(10, $border_width)
);

$border_radius = max(
    0,
    min(50, $border_radius)
);

$padding_vertical = max(
    0,
    min(50, $padding_vertical)
);

$padding_horizontal = max(
    0,
    min(100, $padding_horizontal)
);

$margin_top = max(
    0,
    min(250, $margin_top)
);

$margin_bottom = max(
    0,
    min(250, $margin_bottom)
);


/*
 * =====================================================
 * CLASE DE ALINEACIÓN
 * =====================================================
 */

$alignment_class =
    'cosmos-cta__inner--left';

if ($text_align === 'center') {

    $alignment_class =
        'cosmos-cta__inner--center';

} elseif ($text_align === 'right') {

    $alignment_class =
        'cosmos-cta__inner--right';
}


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-cta-text-color:%s;
     --cosmos-cta-text-align:%s;
     --cosmos-cta-font-size:%dpx;
     --cosmos-cta-font-weight:%s;
     --cosmos-cta-background:%s;
     --cosmos-cta-border-width:%dpx;
     --cosmos-cta-border-color:%s;
     --cosmos-cta-border-radius:%dpx;
     --cosmos-cta-padding-vertical:%dpx;
     --cosmos-cta-padding-horizontal:%dpx;
     --cosmos-cta-text-decoration:%s;
     --cosmos-cta-margin-top:%dpx;
     --cosmos-cta-margin-bottom:%dpx;',

    esc_attr($text_color),

    esc_attr($text_align),

    $font_size,

    esc_attr($font_weight),

    $has_background
        ? esc_attr($background_color)
        : 'transparent',

    $has_border
        ? $border_width
        : 0,

    $has_border
        ? esc_attr($border_color)
        : 'transparent',

    $border_radius,

    $padding_vertical,

    $padding_horizontal,

    $has_underline
        ? 'underline'
        : 'none',

    $margin_top,

    $margin_bottom
);


/*
 * =====================================================
 * BLOQUE
 * =====================================================
 */

$wrapper_attributes =
    get_block_wrapper_attributes([
        'class' => 'cosmos-cta',
        'style' => $style
    ]);

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="container">

        <div
            class="cosmos-cta__inner <?php echo esc_attr($alignment_class); ?>"
        >

            <?php if (!empty($text)) : ?>

                <a
                    class="cosmos-cta__link"
                    href="<?php echo esc_url($url); ?>"
                >

                    <?php
                    echo wp_kses_post($text);
                    ?>

                </a>

            <?php endif; ?>

        </div>

    </div>

</section>