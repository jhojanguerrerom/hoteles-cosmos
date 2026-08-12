<?php

$columns = isset($attributes['columns'])
    ? intval($attributes['columns'])
    : 1;

$columns = ($columns === 2) ? 2 : 1;

$font_size = isset($attributes['fontSize'])
    ? intval($attributes['fontSize'])
    : 18;

$font_weight = $attributes['fontWeight'] ?? '400';

$text_color = $attributes['textColor'] ?? '#111111';

$background_color = $attributes['backgroundColor'] ?? 'transparent';

$has_background = !empty($attributes['hasBackground']);

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 0;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 0;

$text_align = $attributes['textAlign'] ?? 'left';

$column_gap = isset($attributes['columnGap'])
    ? intval($attributes['columnGap'])
    : 60;


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-text-columns-font-size:%dpx;
     --cosmos-text-columns-font-weight:%s;
     --cosmos-text-columns-text-color:%s;
     --cosmos-text-columns-background:%s;
     --cosmos-text-columns-margin-top:%dpx;
     --cosmos-text-columns-margin-bottom:%dpx;
     --cosmos-text-columns-text-align:%s;
     --cosmos-text-columns-column-gap:%dpx;',
     
    $font_size,
    esc_attr($font_weight),
    esc_attr($text_color),

    $has_background
        ? esc_attr($background_color)
        : 'transparent',

    $margin_top,
    $margin_bottom,

    esc_attr($text_align),

    $column_gap
);


/*
 * =====================================================
 * CONTENIDOS
 * =====================================================
 */

$content_1 = $attributes['contentOne'] ?? '';

$content_2 = $attributes['contentTwo'] ?? '';


/*
 * =====================================================
 * SALIDA
 * =====================================================
 */

?>

<section
    class="cosmos-text-columns"
    style="<?php echo esc_attr($style); ?>"
>

    <div class="container">

        <div
            class="
                cosmos-text-columns__grid
                cosmos-text-columns__grid--columns-<?php echo esc_attr($columns); ?>
            "
        >

            <div class="cosmos-text-columns__column">

                <div class="cosmos-text-columns__content">

                    <?php echo wp_kses_post($content_1); ?>

                </div>

            </div>


            <?php if ($columns === 2) : ?>

                <div class="cosmos-text-columns__column">

                    <div class="cosmos-text-columns__content">

                        <?php echo wp_kses_post($content_2); ?>

                    </div>

                </div>

            <?php endif; ?>

        </div>

    </div>

</section>