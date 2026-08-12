<?php

$text = $attributes['text'] ?? '';

$url = $attributes['url'] ?? '';

$text_color = $attributes['textColor'] ?? '#111111';

$text_align = $attributes['textAlign'] ?? 'left';

$font_size = $attributes['fontSize'] ?? 32;

$font_weight = $attributes['fontWeight'] ?? '400';

$has_background = !empty($attributes['hasBackground']);

$background_color = $attributes['backgroundColor'] ?? '#111111';

$border_radius = isset($attributes['borderRadius'])
    ? intval($attributes['borderRadius'])
    : 0;

$padding_vertical = isset($attributes['paddingVertical'])
    ? intval($attributes['paddingVertical'])
    : 14;

$padding_horizontal = isset($attributes['paddingHorizontal'])
    ? intval($attributes['paddingHorizontal'])
    : 28;

$has_underline = !empty($attributes['hasUnderline']);


/*
 * =====================================================
 * LIMITAR VALORES
 * =====================================================
 */

$border_radius = max(0, min(50, $border_radius));

$padding_vertical = max(0, min(50, $padding_vertical));

$padding_horizontal = max(0, min(100, $padding_horizontal));


/*
 * =====================================================
 * CLASE DE ALINEACIÓN
 * =====================================================
 */

$alignment_class = 'cosmos-cta__inner--left';

if ($text_align === 'center') {

    $alignment_class = 'cosmos-cta__inner--center';

} elseif ($text_align === 'right') {

    $alignment_class = 'cosmos-cta__inner--right';

}


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$style = sprintf(

    'color:%s;
     text-align:%s;
     font-size:%dpx;
     font-weight:%s;
     background-color:%s;
     border-radius:%dpx;
     padding:%dpx %dpx;
     text-decoration:%s;',

    esc_attr($text_color),

    esc_attr($text_align),

    intval($font_size),

    esc_attr($font_weight),

    $has_background
        ? esc_attr($background_color)
        : 'transparent',

    $border_radius,

    $padding_vertical,

    $padding_horizontal,

    $has_underline
        ? 'underline'
        : 'none'
);

?>

<section class="cosmos-cta">

    <div class="container">

        <div class="cosmos-cta__inner <?php echo esc_attr($alignment_class); ?>">

            <?php if (!empty($text)) : ?>

                <a
                    class="cosmos-cta__link"
                    href="<?php echo esc_url($url); ?>"
                    style="<?php echo esc_attr($style); ?>"
                >

                    <?php echo wp_kses_post($text); ?>

                </a>

            <?php endif; ?>

        </div>

    </div>

</section>