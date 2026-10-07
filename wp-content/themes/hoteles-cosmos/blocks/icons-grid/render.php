<?php

$items = $attributes['items'] ?? [];


/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN DE ICONOS
|--------------------------------------------------------------------------
*/

$icon_size = isset($attributes['iconSize'])
    ? (int) $attributes['iconSize']
    : 80;

$icon_background_color = $attributes['iconBackgroundColor']
    ?? '#FFFFFF';

$icon_border_radius = isset($attributes['iconBorderRadius'])
    ? (int) $attributes['iconBorderRadius']
    : 0;

$icon_gap = isset($attributes['iconGap'])
    ? (int) $attributes['iconGap']
    : 30;


/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN DEL TEXTO
|--------------------------------------------------------------------------
*/

$text_color = $attributes['textColor']
    ?? '#000000';

$text_font_size = isset($attributes['textFontSize'])
    ? (int) $attributes['textFontSize']
    : 18;

$text_align = $attributes['textAlign']
    ?? 'center';

$text_margin_top = isset($attributes['textMarginTop'])
    ? (int) $attributes['textMarginTop']
    : 15;


/*
|--------------------------------------------------------------------------
| ESPACIADO
|--------------------------------------------------------------------------
*/

$padding_top = isset($attributes['paddingTop'])
    ? (int) $attributes['paddingTop']
    : 30;

$padding_bottom = isset($attributes['paddingBottom'])
    ? (int) $attributes['paddingBottom']
    : 30;


/*
|--------------------------------------------------------------------------
| LIMITES DE SEGURIDAD
|--------------------------------------------------------------------------
*/

$icon_size = max(
    30,
    min(200, $icon_size)
);

$icon_gap = max(
    0,
    min(100, $icon_gap)
);

$icon_border_radius = max(
    0,
    min(100, $icon_border_radius)
);

$text_font_size = max(
    10,
    min(50, $text_font_size)
);

$text_margin_top = max(
    0,
    min(80, $text_margin_top)
);

$padding_top = max(
    0,
    min(300, $padding_top)
);

$padding_bottom = max(
    0,
    min(300, $padding_bottom)
);


/*
|--------------------------------------------------------------------------
| ALINEACIÓN SEGURA
|--------------------------------------------------------------------------
*/

$allowed_alignments = [
    'left',
    'center',
    'right'
];

if (!in_array($text_align, $allowed_alignments, true)) {
    $text_align = 'center';
}


/*
|--------------------------------------------------------------------------
| CLASE DEL BLOQUE
|--------------------------------------------------------------------------
*/

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'cosmos-icons-grid',
]);


/*
|--------------------------------------------------------------------------
| ESTILOS
|--------------------------------------------------------------------------
*/

$container_style = sprintf(
    'padding-top:%dpx;padding-bottom:%dpx;',
    $padding_top,
    $padding_bottom
);

$items_style = sprintf(
    'gap:%dpx;',
    $icon_gap
);

$icon_style = sprintf(
    'width:%dpx;height:%dpx;',
    $icon_size,
    $icon_size
);

$item_style = sprintf(
    'background-color:%s;border-radius:%dpx;',
    esc_attr($icon_background_color),
    $icon_border_radius
);

$text_style = sprintf(
    'color:%s;font-size:%dpx;text-align:%s;margin-top:%dpx;',
    esc_attr($text_color),
    $text_font_size,
    esc_attr($text_align),
    $text_margin_top
);

?>

<section <?php echo $wrapper_attributes; ?>>

    <div
        class="container"
        style="<?php echo esc_attr($container_style); ?>"
    >

        <?php if (!empty($items)) : ?>

            <div
                class="cosmos-icons-grid__items"
                style="<?php echo esc_attr($items_style); ?>"
            >

                <?php foreach ($items as $item) : ?>

                    <?php

                    $icon_url = $item['url'] ?? '';

                    $icon_alt = $item['alt'] ?? '';

                    $text = $item['text'] ?? '';

                    if (!$icon_url) {
                        continue;
                    }

                    ?>

                    <div
                        class="cosmos-icons-grid__item"
                        style="<?php echo esc_attr($item_style); ?>"
                    >

                        <div
                            class="cosmos-icons-grid__icon"
                            style="<?php echo esc_attr($icon_style); ?>"
                        >

                            <img
                                src="<?php echo esc_url($icon_url); ?>"
                                alt="<?php echo esc_attr($icon_alt); ?>"
                                loading="lazy"
                            />

                        </div>


                        <div
                            class="cosmos-icons-grid__text"
                            style="<?php echo esc_attr($text_style); ?>"
                        >
                            <?php
                            echo wp_kses_post($text);
                            ?>
                        </div>

                    </div>

                <?php endforeach; ?>

            </div>

        <?php endif; ?>

    </div>

</section>