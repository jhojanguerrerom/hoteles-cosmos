<?php

$row1 = $attributes['row1'] ?? [];
$row2 = $attributes['row2'] ?? [];


/*
 * =====================================================
 * ANCHO DEL BLOQUE
 * =====================================================
 */

$content_width =
    $attributes['contentWidth'] ?? 'container';

$content_width_class =
    $content_width === 'full'
        ? 'cosmos-statistics-grid-tags--full'
        : 'cosmos-statistics-grid-tags--container';


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$number_color =
    $attributes['numberColor'] ?? '#111111';

$text_color =
    $attributes['textColor'] ?? '#666666';

$number_size =
    isset($attributes['numberSize'])
        ? intval($attributes['numberSize'])
        : 42;

$text_size =
    isset($attributes['textSize'])
        ? intval($attributes['textSize'])
        : 16;

$number_weight =
    isset($attributes['numberWeight'])
        ? intval($attributes['numberWeight'])
        : 700;

$text_weight =
    isset($attributes['textWeight'])
        ? intval($attributes['textWeight'])
        : 400;

$line_color =
    $attributes['lineColor'] ?? '#dddddd';

$line_width =
    isset($attributes['lineWidth'])
        ? intval($attributes['lineWidth'])
        : 1;


/*
 * =====================================================
 * ANIMACIÓN
 * =====================================================
 */

$animation_duration =
    isset($attributes['animationDuration'])
        ? intval($attributes['animationDuration'])
        : 1800;

$animation_decimals =
    isset($attributes['animationDecimals'])
        ? intval($attributes['animationDecimals'])
        : 0;


/*
 * =====================================================
 * ESPACIADO
 * =====================================================
 */

$column_gap =
    isset($attributes['columnGap'])
        ? intval($attributes['columnGap'])
        : 0;

$row_gap =
    isset($attributes['rowGap'])
        ? intval($attributes['rowGap'])
        : 0;

$padding_top =
    isset($attributes['sectionPaddingTop'])
        ? intval($attributes['sectionPaddingTop'])
        : 20;

$padding_bottom =
    isset($attributes['sectionPaddingBottom'])
        ? intval($attributes['sectionPaddingBottom'])
        : 20;


/*
 * =====================================================
 * FONDO
 * =====================================================
 */

$background_color =
    $attributes['backgroundColor'] ?? 'transparent';


/*
 * =====================================================
 * TAG
 * =====================================================
 */

$tag_background =
    $attributes['tagBackground'] ?? '#111111';

$tag_text_color =
    $attributes['tagTextColor'] ?? '#ffffff';

$tag_border_radius =
    isset($attributes['tagBorderRadius'])
        ? intval($attributes['tagBorderRadius'])
        : 20;

$tag_alignment =
    $attributes['tagAlignment'] ?? 'center';

$tag_padding_vertical =
    isset($attributes['tagPaddingVertical'])
        ? intval($attributes['tagPaddingVertical'])
        : 6;

$tag_padding_horizontal =
    isset($attributes['tagPaddingHorizontal'])
        ? intval($attributes['tagPaddingHorizontal'])
        : 14;

$tag_font_size =
    isset($attributes['tagFontSize'])
        ? intval($attributes['tagFontSize'])
        : 13;

$tag_weight =
    isset($attributes['tagWeight'])
        ? intval($attributes['tagWeight'])
        : 500;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$number_size = max(
    20,
    min(100, $number_size)
);

$text_size = max(
    10,
    min(40, $text_size)
);

$number_weight = max(
    100,
    min(900, $number_weight)
);

$text_weight = max(
    100,
    min(900, $text_weight)
);

$line_width = max(
    1,
    min(5, $line_width)
);

$animation_duration = max(
    500,
    min(5000, $animation_duration)
);

$animation_decimals = max(
    0,
    min(3, $animation_decimals)
);

$column_gap = max(
    0,
    min(50, $column_gap)
);

$row_gap = max(
    0,
    min(50, $row_gap)
);

$padding_top = max(
    0,
    min(100, $padding_top)
);

$padding_bottom = max(
    0,
    min(100, $padding_bottom)
);

$tag_border_radius = max(
    0,
    min(100, $tag_border_radius)
);

$tag_padding_vertical = max(
    0,
    min(30, $tag_padding_vertical)
);

$tag_padding_horizontal = max(
    0,
    min(50, $tag_padding_horizontal)
);

$tag_font_size = max(
    8,
    min(30, $tag_font_size)
);

$tag_weight = max(
    100,
    min(900, $tag_weight)
);


/*
 * =====================================================
 * ALINEACIÓN TAG
 * =====================================================
 */

$allowed_alignments = [
    'left',
    'center',
    'right'
];

if (
    !in_array(
        $tag_alignment,
        $allowed_alignments,
        true
    )
) {
    $tag_alignment = 'center';
}


/*
 * =====================================================
 * ESTILOS DE ALINEACIÓN DEL TAG
 * =====================================================
 */

$tag_margin_left = 'auto';
$tag_margin_right = 'auto';

if ($tag_alignment === 'left') {

    $tag_margin_left = '0';
    $tag_margin_right = 'auto';

}

if ($tag_alignment === 'right') {

    $tag_margin_left = 'auto';
    $tag_margin_right = '0';

}


/*
 * =====================================================
 * STYLE VARIABLES
 * =====================================================
 */

$style = sprintf(
    '--cosmos-statistics-number-color:%s;
     --cosmos-statistics-text-color:%s;
     --cosmos-statistics-number-size:%dpx;
     --cosmos-statistics-text-size:%dpx;
     --cosmos-statistics-number-weight:%d;
     --cosmos-statistics-text-weight:%d;
     --cosmos-statistics-line-color:%s;
     --cosmos-statistics-line-width:%dpx;
     --cosmos-statistics-column-gap:%dpx;
     --cosmos-statistics-row-gap:%dpx;
     --cosmos-statistics-padding-top:%dpx;
     --cosmos-statistics-padding-bottom:%dpx;
     --cosmos-statistics-animation-duration:%dms;
     --cosmos-statistics-animation-decimals:%d;
     --cosmos-statistics-background:%s;
     --cosmos-statistics-tag-background:%s;
     --cosmos-statistics-tag-color:%s;
     --cosmos-statistics-tag-radius:%dpx;
     --cosmos-statistics-tag-padding-y:%dpx;
     --cosmos-statistics-tag-padding-x:%dpx;
     --cosmos-statistics-tag-size:%dpx;
     --cosmos-statistics-tag-weight:%d;',

    esc_attr($number_color),
    esc_attr($text_color),

    $number_size,
    $text_size,

    $number_weight,
    $text_weight,

    esc_attr($line_color),
    $line_width,

    $column_gap,
    $row_gap,

    $padding_top,
    $padding_bottom,

    $animation_duration,
    $animation_decimals,

    esc_attr($background_color),

    esc_attr($tag_background),
    esc_attr($tag_text_color),

    $tag_border_radius,

    $tag_padding_vertical,
    $tag_padding_horizontal,

    $tag_font_size,
    $tag_weight
);


/*
 * =====================================================
 * FUNCIÓN PARA RENDERIZAR UNA FILA
 * =====================================================
 */

$render_row = function (
    $items,
    $row_class
) use (
    $tag_alignment,
    $tag_margin_left,
    $tag_margin_right
) {

    if (empty($items)) {
        return;
    }


    /*
     * Máximo 5 elementos
     */

    $items = array_slice(
        $items,
        0,
        5
    );


    /*
     * Cantidad real
     */

    $item_count = count($items);

    ?>

    <div
        class="
            cosmos-statistics-grid-tags__row
            <?php echo esc_attr($row_class); ?>
        "
        style="
            --cosmos-statistics-columns:
            <?php echo esc_attr($item_count); ?>;
        "
    >

        <?php foreach ($items as $item) : ?>

            <?php

            $number =
                isset($item['number'])
                    ? floatval($item['number'])
                    : 0;

            $prefix =
                $item['prefix'] ?? '';

            $suffix =
                $item['suffix'] ?? '';

            $text =
                $item['text'] ?? '';

            $tag =
                $item['tag'] ?? '';

            ?>

            <div class="cosmos-statistics-grid-tags__item">

                <div
                    class="cosmos-statistics-grid-tags__number"
                    data-target="<?php echo esc_attr($number); ?>"
                >

                    <?php if ($prefix) : ?>

                        <span
                            class="
                                cosmos-statistics-grid-tags__prefix
                            "
                        >
                            <?php
                            echo esc_html($prefix);
                            ?>
                        </span>

                    <?php endif; ?>


                    <span
                        class="
                            cosmos-statistics-grid-tags__number-value
                        "
                    >
                        0
                    </span>


                    <?php if ($suffix) : ?>

                        <span
                            class="
                                cosmos-statistics-grid-tags__suffix
                            "
                        >
                            <?php
                            echo esc_html($suffix);
                            ?>
                        </span>

                    <?php endif; ?>

                </div>


                <?php if ($text) : ?>

                    <div
                        class="
                            cosmos-statistics-grid-tags__text
                        "
                    >

                        <?php
                        echo wp_kses_post($text);
                        ?>

                    </div>

                <?php endif; ?>


                <?php if ($tag) : ?>

                    <div
                        class="
                            cosmos-statistics-grid-tags__tag
                            cosmos-statistics-grid-tags__tag--<?php
                            echo esc_attr($tag_alignment);
                            ?>
                        "
                        style="
                            margin-left:
                            <?php echo esc_attr($tag_margin_left); ?>;
                            margin-right:
                            <?php echo esc_attr($tag_margin_right); ?>;
                        "
                    >

                        <?php
                        echo esc_html($tag);
                        ?>

                    </div>

                <?php endif; ?>

            </div>

        <?php endforeach; ?>

    </div>

    <?php
};

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' =>
            'cosmos-statistics-grid-tags ' .
            $content_width_class,
        'style' => $style
    ]);
    ?>
>

    <div class="cosmos-statistics-grid-tags__rows">

        <?php

        /*
         * FILA SUPERIOR
         */

        $render_row(
            $row1,
            'cosmos-statistics-grid-tags__row--top'
        );


        /*
         * FILA INFERIOR
         */

        $render_row(
            $row2,
            'cosmos-statistics-grid-tags__row--bottom'
        );

        ?>

    </div>

</section>