<?php

$title = $attributes['title'] ?? '';

$description = $attributes['description'] ?? '';

$title_color = $attributes['titleColor'] ?? '#000000';

$description_color = $attributes['descriptionColor'] ?? '#555555';

$title_font_size = isset($attributes['titleFontSize'])
    ? (int) $attributes['titleFontSize']
    : 36;

$description_font_size = isset($attributes['descriptionFontSize'])
    ? (int) $attributes['descriptionFontSize']
    : 18;

$text_align = $attributes['textAlign'] ?? 'center';

$background_color = $attributes['backgroundColor'] ?? '#F5F5F5';

$padding_top = isset($attributes['paddingTop'])
    ? (int) $attributes['paddingTop']
    : 70;

$padding_bottom = isset($attributes['paddingBottom'])
    ? (int) $attributes['paddingBottom']
    : 90;

$title_margin_bottom = isset($attributes['titleMarginBottom'])
    ? (int) $attributes['titleMarginBottom']
    : 20;

$description_margin_bottom = isset($attributes['descriptionMarginBottom'])
    ? (int) $attributes['descriptionMarginBottom']
    : 40;

$icons = $attributes['icons'] ?? [];

$icon_size = isset($attributes['iconSize'])
    ? (int) $attributes['iconSize']
    : 80;

$icon_background_color = $attributes['iconBackgroundColor']
    ?? '#FFFFFF';

$icon_gap = isset($attributes['iconGap'])
    ? (int) $attributes['iconGap']
    : 20;

$icon_border_radius = isset($attributes['iconBorderRadius'])
    ? (int) $attributes['iconBorderRadius']
    : 0;

$image_url = $attributes['imageUrl'] ?? '';

$image_alt = $attributes['imageAlt'] ?? '';

$image_margin_top = isset($attributes['imageMarginTop'])
    ? (int) $attributes['imageMarginTop']
    : -50;


/*
|--------------------------------------------------------------------------
| LIMITES
|--------------------------------------------------------------------------
*/

$icon_size = max(30, min(200, $icon_size));

$icon_gap = max(0, min(100, $icon_gap));

$icon_border_radius = max(0, min(100, $icon_border_radius));

$padding_top = max(0, min(300, $padding_top));

$padding_bottom = max(0, min(300, $padding_bottom));

$image_margin_top = max(-300, min(100, $image_margin_top));


/*
|--------------------------------------------------------------------------
| CLASES DEL BLOQUE
|--------------------------------------------------------------------------
*/

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'cosmos-info-icons-image',
]);


/*
|--------------------------------------------------------------------------
| ESTILOS
|--------------------------------------------------------------------------
*/

$content_style = sprintf(
    'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
    esc_attr($background_color),
    $padding_top,
    $padding_bottom
);

$title_style = sprintf(
    'color:%s;font-size:%dpx;margin-bottom:%dpx;',
    esc_attr($title_color),
    $title_font_size,
    $title_margin_bottom
);

$description_style = sprintf(
    'color:%s;font-size:%dpx;margin-bottom:%dpx;',
    esc_attr($description_color),
    $description_font_size,
    $description_margin_bottom
);

$icons_style = sprintf(
    'gap:%dpx;',
    $icon_gap
);

$icon_style = sprintf(
    'width:%dpx;height:%dpx;background-color:%s;border-radius:%dpx;',
    $icon_size,
    $icon_size,
    esc_attr($icon_background_color),
    $icon_border_radius
);

$image_style = sprintf(
    'margin-top:%dpx;',
    $image_margin_top
);

?>

<section <?php echo $wrapper_attributes; ?>>


    <!--
    =========================================================
    FONDO FULL WIDTH
    =========================================================
    -->

    <div
        class="cosmos-info-icons-image__content"
        style="<?php echo esc_attr($content_style); ?>"
    >

        <div
            class="container"
            style="text-align: <?php echo esc_attr($text_align); ?>;"
        >


            <?php if ($title) : ?>

                <h2
                    class="cosmos-info-icons-image__title"
                    style="<?php echo esc_attr($title_style); ?>"
                >
                    <?php echo wp_kses_post($title); ?>
                </h2>

            <?php endif; ?>


            <?php if ($description) : ?>

                <div
                    class="cosmos-info-icons-image__description"
                    style="<?php echo esc_attr($description_style); ?>"
                >
                    <?php echo wp_kses_post($description); ?>
                </div>

            <?php endif; ?>


            <?php if (!empty($icons)) : ?>

                <div
                    class="cosmos-info-icons-image__icons"
                    style="<?php echo esc_attr($icons_style); ?>"
                >

                    <?php foreach ($icons as $icon) : ?>

                        <?php

                        $icon_url = $icon['url'] ?? '';

                        $icon_alt = $icon['alt'] ?? '';

                        if (!$icon_url) {
                            continue;
                        }

                        ?>

                        <div
                            class="cosmos-info-icons-image__icon"
                            style="<?php echo esc_attr($icon_style); ?>"
                        >

                            <img
                                src="<?php echo esc_url($icon_url); ?>"
                                alt="<?php echo esc_attr($icon_alt); ?>"
                                loading="lazy"
                            />

                        </div>

                    <?php endforeach; ?>

                </div>

            <?php endif; ?>


        </div>

    </div>


    <!--
    =========================================================
    IMAGEN DENTRO DEL CONTAINER
    =========================================================
    -->

    <?php if ($image_url) : ?>

        <div
            class="cosmos-info-icons-image__image container"
            style="<?php echo esc_attr($image_style); ?>"
        >

            <img
                src="<?php echo esc_url($image_url); ?>"
                alt="<?php echo esc_attr($image_alt); ?>"
                loading="lazy"
            />

        </div>

    <?php endif; ?>


</section>