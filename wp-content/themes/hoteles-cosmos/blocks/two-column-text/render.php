<?php

$background_color = $attributes['backgroundColor'] ?? '#ffffff';

$padding_top = intval(
    $attributes['paddingTop'] ?? 80
);

$padding_bottom = intval(
    $attributes['paddingBottom'] ?? 80
);

$block_margin_top = intval(
    $attributes['blockMarginTop'] ?? 0
);

$block_margin_bottom = intval(
    $attributes['blockMarginBottom'] ?? 0
);

$column_gap = intval(
    $attributes['columnGap'] ?? 60
);


/*
 * =====================================================
 * DISTRIBUCIÓN DE COLUMNAS
 * =====================================================
 *
 * leftColumnWidth representa el porcentaje
 * de la columna izquierda.
 *
 * La columna derecha ocupa automáticamente
 * el porcentaje restante.
 */

$left_column_width = intval(
    $attributes['leftColumnWidth'] ?? 60
);


/*
 * Seguridad:
 *
 * Evitamos valores demasiado pequeños
 * o demasiado grandes.
 */

$left_column_width = max(
    20,
    min(80, $left_column_width)
);


/*
 * =====================================================
 * COLUMNA IZQUIERDA
 * =====================================================
 */

$left_text = $attributes['leftText'] ?? '';

$left_color =
    $attributes['leftTextColor'] ?? '#111111';

$left_size = intval(
    $attributes['leftTextSize'] ?? 42
);

$left_weight =
    $attributes['leftTextWeight'] ?? '400';

$left_align =
    $attributes['leftTextAlign'] ?? 'left';


/*
 * =====================================================
 * COLUMNA DERECHA
 * =====================================================
 */

$right_text =
    $attributes['rightText'] ?? '';

$right_color =
    $attributes['rightTextColor'] ?? '#333333';

$right_size = intval(
    $attributes['rightTextSize'] ?? 18
);

$right_weight =
    $attributes['rightTextWeight'] ?? '400';

$right_align =
    $attributes['rightTextAlign'] ?? 'left';


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-two-column-background:%s;
     --cosmos-two-column-padding-top:%dpx;
     --cosmos-two-column-padding-bottom:%dpx;
     --cosmos-two-column-margin-top:%dpx;
     --cosmos-two-column-margin-bottom:%dpx;
     --cosmos-two-column-gap:%dpx;
     --cosmos-two-column-left-width:%d%%;
     --cosmos-two-column-left-color:%s;
     --cosmos-two-column-left-size:%dpx;
     --cosmos-two-column-left-weight:%s;
     --cosmos-two-column-left-align:%s;
     --cosmos-two-column-right-color:%s;
     --cosmos-two-column-right-size:%dpx;
     --cosmos-two-column-right-weight:%s;
     --cosmos-two-column-right-align:%s;',

    esc_attr($background_color),

    $padding_top,
    $padding_bottom,

    $block_margin_top,
    $block_margin_bottom,

    $column_gap,

    $left_column_width,

    esc_attr($left_color),
    $left_size,
    esc_attr($left_weight),
    esc_attr($left_align),

    esc_attr($right_color),
    $right_size,
    esc_attr($right_weight),
    esc_attr($right_align)
);

?>


<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-two-column-text',
        'style' => $style
    ]);
    ?>
>

    <div class="container">

        <div class="cosmos-two-column-text__grid">


            <?php if ($left_text) : ?>

                <div
                    class="
                        cosmos-two-column-text__column
                        cosmos-two-column-text__column--left
                    "
                >

                    <div class="cosmos-two-column-text__left-text">

                        <?php
                        echo wp_kses_post($left_text);
                        ?>

                    </div>

                </div>

            <?php endif; ?>


            <?php if ($right_text) : ?>

                <div
                    class="
                        cosmos-two-column-text__column
                        cosmos-two-column-text__column--right
                    "
                >

                    <div class="cosmos-two-column-text__right-text">

                        <?php
                        echo wp_kses_post($right_text);
                        ?>

                    </div>

                </div>

            <?php endif; ?>


        </div>

    </div>

</section>