<?php

$items = isset($attributes['items'])
    ? $attributes['items']
    : array();

$circle_size = isset($attributes['circleSize'])
    ? intval($attributes['circleSize'])
    : 80;

$icon_size = isset($attributes['iconSize'])
    ? intval($attributes['iconSize'])
    : 34;

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


if (empty($items)) {
    return;
}


/*
 * =====================================================
 * LIMITAR A 6 ELEMENTOS
 * =====================================================
 */

$items = array_slice($items, 0, 6);


/*
 * =====================================================
 * ESTILOS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-icon-circle-size:%dpx;--cosmos-icon-size:%dpx;--cosmos-icon-text-size:%dpx;--cosmos-icon-text-color:%s;--cosmos-icon-text-weight:%s;--cosmos-icon-text-align:%s;--cosmos-icon-spacing:%dpx;',
    $circle_size,
    $icon_size,
    $text_size,
    esc_attr($text_color),
    esc_attr($text_weight),
    esc_attr($text_align),
    $spacing
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
 * HTML
 * =====================================================
 */

?>

<section
    <?php echo get_block_wrapper_attributes(
        array(
            'class' => 'cosmos-icon-text',
        )
    ); ?>
>

    <div class="container">

        <div
            class="cosmos-icon-text__grid"
            style="<?php echo esc_attr($style); ?> --cosmos-icon-columns: <?php echo esc_attr($columns); ?>;"
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

                        <div class="cosmos-icon-text__circle">

                            <img
                                src="<?php echo esc_url($icon_url); ?>"
                                alt="<?php echo esc_attr($icon_alt); ?>"
                                loading="lazy"
                            >

                        </div>

                    <?php endif; ?>


                    <?php if (!empty($text)) : ?>

                        <p class="cosmos-icon-text__text">
                            <?php echo esc_html($text); ?>
                        </p>

                    <?php endif; ?>

                </div>

            <?php endforeach; ?>

        </div>

    </div>

</section>