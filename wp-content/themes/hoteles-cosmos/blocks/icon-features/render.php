<?php

$items = isset($attributes['items'])
    ? $attributes['items']
    : array();


/*
 * =====================================================
 * CÍRCULO
 * =====================================================
 */

$circle_size = isset($attributes['circleSize'])
    ? intval($attributes['circleSize'])
    : 80;


$icon_size = isset($attributes['iconSize'])
    ? intval($attributes['iconSize'])
    : 34;


$circle_background = isset($attributes['circleBackground'])
    ? $attributes['circleBackground']
    : '#000000';


$circle_border_color = isset($attributes['circleBorderColor'])
    ? $attributes['circleBorderColor']
    : '#000000';


$circle_border_width = isset($attributes['circleBorderWidth'])
    ? intval($attributes['circleBorderWidth'])
    : 1;


$circle_border_radius = isset($attributes['circleBorderRadius'])
    ? intval($attributes['circleBorderRadius'])
    : 50;


$circle_padding = isset($attributes['circlePadding'])
    ? intval($attributes['circlePadding'])
    : 0;


/*
 * =====================================================
 * TEXTO
 * =====================================================
 */

$text_size = isset($attributes['textSize'])
    ? intval($attributes['textSize'])
    : 16;


$text_color = isset($attributes['textColor'])
    ? $attributes['textColor']
    : '#111111';


$text_weight = isset($attributes['textWeight'])
    ? $attributes['textWeight']
    : '400';


$text_align = isset($attributes['textAlign'])
    ? $attributes['textAlign']
    : 'center';


$spacing = isset($attributes['spacing'])
    ? intval($attributes['spacing'])
    : 24;


/*
 * =====================================================
 * VALIDACIONES
 * =====================================================
 */

$allowed_weights = array(
    '400',
    '500',
    '600',
    '700'
);

if (!in_array($text_weight, $allowed_weights, true)) {
    $text_weight = '400';
}


$allowed_alignments = array(
    'left',
    'center',
    'right'
);

if (!in_array($text_align, $allowed_alignments, true)) {
    $text_align = 'center';
}


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$circle_size = max(
    40,
    min(160, $circle_size)
);


$icon_size = max(
    16,
    min(100, $icon_size)
);


$circle_border_width = max(
    0,
    min(10, $circle_border_width)
);


$circle_border_radius = max(
    0,
    min(50, $circle_border_radius)
);


$circle_padding = max(
    0,
    min(40, $circle_padding)
);


$text_size = max(
    10,
    min(40, $text_size)
);


$spacing = max(
    0,
    min(100, $spacing)
);


if (empty($items)) {
    return;
}


/*
 * =====================================================
 * LIMITAR A 6 ELEMENTOS
 * =====================================================
 */

$items = array_slice(
    $items,
    0,
    6
);


/*
 * =====================================================
 * COLUMNAS
 * =====================================================
 */

$columns = count($items);

if ($columns < 1) {
    $columns = 1;
}

if ($columns > 6) {
    $columns = 6;
}


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-icon-circle-size:%dpx;
     --cosmos-icon-size:%dpx;
     --cosmos-icon-circle-background:%s;
     --cosmos-icon-circle-border-color:%s;
     --cosmos-icon-circle-border-width:%dpx;
     --cosmos-icon-circle-radius:%d%%;
     --cosmos-icon-circle-padding:%dpx;
     --cosmos-icon-text-size:%dpx;
     --cosmos-icon-text-color:%s;
     --cosmos-icon-text-weight:%s;
     --cosmos-icon-text-align:%s;
     --cosmos-icon-spacing:%dpx;
     --cosmos-icon-columns:%d;',

    $circle_size,

    $icon_size,

    esc_attr(
        $circle_background
    ),

    esc_attr(
        $circle_border_color
    ),

    $circle_border_width,

    $circle_border_radius,

    $circle_padding,

    $text_size,

    esc_attr(
        $text_color
    ),

    esc_attr(
        $text_weight
    ),

    esc_attr(
        $text_align
    ),

    $spacing,

    $columns
);

?>


<section
    <?php
    echo get_block_wrapper_attributes(
        array(
            'class' => 'cosmos-icon-text'
        )
    );
    ?>
>

    <div class="container">

        <div
            class="cosmos-icon-text__grid"
            style="<?php echo esc_attr($style); ?>"
        >

            <?php foreach ($items as $item) : ?>

                <?php

                $icon_url = isset($item['iconUrl'])
                    ? $item['iconUrl']
                    : '';


                $icon_alt = isset($item['iconAlt'])
                    ? $item['iconAlt']
                    : '';


                $text = isset($item['text'])
                    ? $item['text']
                    : '';

                ?>


                <div class="cosmos-icon-text__item">


                    <?php if (!empty($icon_url)) : ?>

                        <div
                            class="cosmos-icon-text__circle"
                        >

                            <img
                                src="<?php
                                    echo esc_url(
                                        $icon_url
                                    );
                                ?>"
                                alt="<?php
                                    echo esc_attr(
                                        $icon_alt
                                    );
                                ?>"
                                loading="lazy"
                            >

                        </div>

                    <?php endif; ?>


                    <?php if (!empty($text)) : ?>

                        <p class="cosmos-icon-text__text">

                            <?php
                            echo esc_html(
                                $text
                            );
                            ?>

                        </p>

                    <?php endif; ?>


                </div>

            <?php endforeach; ?>

        </div>

    </div>

</section>