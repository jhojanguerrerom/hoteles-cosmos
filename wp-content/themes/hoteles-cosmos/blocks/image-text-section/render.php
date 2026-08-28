<?php

$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';

$image_position =
    $attributes['imagePosition'] ?? 'left';


/*
 * =====================================================
 * COLUMNAS
 * =====================================================
 */

$image_width = isset($attributes['imageWidth'])
    ? intval($attributes['imageWidth'])
    : 50;

$image_width = max(
    20,
    min(80, $image_width)
);

$text_width = 100 - $image_width;


/*
 * =====================================================
 * TEXTO PRINCIPAL
 * =====================================================
 */

$title =
    $attributes['title'] ?? '';

$description =
    $attributes['description'] ?? '';

$text_align =
    $attributes['textAlign'] ?? 'left';

$text_color =
    $attributes['textColor'] ?? '#111111';

$title_size =
    isset($attributes['titleSize'])
        ? intval($attributes['titleSize'])
        : 42;

$description_size =
    isset($attributes['descriptionSize'])
        ? intval($attributes['descriptionSize'])
        : 18;

$background_color =
    $attributes['backgroundColor'] ?? '#ffffff';


/*
 * =====================================================
 * ESPACIADO
 * =====================================================
 */

$margin_top =
    isset($attributes['marginTop'])
        ? intval($attributes['marginTop'])
        : 0;

$margin_bottom =
    isset($attributes['marginBottom'])
        ? intval($attributes['marginBottom'])
        : 0;


/*
 * =====================================================
 * CTA
 * =====================================================
 */

$show_cta =
    !empty($attributes['showCta']);

$cta_title =
    $attributes['ctaTitle'] ?? '';

$cta_description =
    $attributes['ctaDescription'] ?? '';

$cta_button_text =
    $attributes['ctaButtonText'] ?? 'Conoce más';

$cta_button_url =
    $attributes['ctaButtonUrl'] ?? '#';

$cta_align =
    $attributes['ctaAlign'] ?? 'left';


/*
 * =====================================================
 * CTA TÍTULO
 * =====================================================
 */

$cta_title_size =
    isset($attributes['ctaTitleSize'])
        ? intval($attributes['ctaTitleSize'])
        : 24;

$cta_title_color =
    $attributes['ctaTitleColor'] ?? '#111111';


/*
 * =====================================================
 * CTA DESCRIPCIÓN
 * =====================================================
 */

$cta_description_size =
    isset($attributes['ctaDescriptionSize'])
        ? intval($attributes['ctaDescriptionSize'])
        : 16;

$cta_description_color =
    $attributes['ctaDescriptionColor'] ?? '#111111';


/*
 * =====================================================
 * CTA BOTÓN
 * =====================================================
 */

$cta_button_color =
    $attributes['ctaButtonColor'] ?? '#111111';

$cta_button_text_color =
    $attributes['ctaButtonTextColor'] ?? '#ffffff';

$cta_button_size =
    isset($attributes['ctaButtonSize'])
        ? intval($attributes['ctaButtonSize'])
        : 16;

$cta_button_padding_vertical =
    isset($attributes['ctaButtonPaddingVertical'])
        ? intval($attributes['ctaButtonPaddingVertical'])
        : 14;

$cta_button_padding_horizontal =
    isset($attributes['ctaButtonPaddingHorizontal'])
        ? intval($attributes['ctaButtonPaddingHorizontal'])
        : 28;

$cta_button_radius =
    isset($attributes['ctaButtonRadius'])
        ? intval($attributes['ctaButtonRadius'])
        : 4;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$cta_title_size = max(
    12,
    min(60, $cta_title_size)
);

$cta_description_size = max(
    10,
    min(40, $cta_description_size)
);

$cta_button_size = max(
    10,
    min(30, $cta_button_size)
);

$cta_button_padding_vertical = max(
    0,
    min(50, $cta_button_padding_vertical)
);

$cta_button_padding_horizontal = max(
    0,
    min(100, $cta_button_padding_horizontal)
);

$cta_button_radius = max(
    0,
    min(50, $cta_button_radius)
);


/*
 * =====================================================
 * STYLE VARIABLES
 * =====================================================
 */

$style = sprintf(
    '--cosmos-image-text-image-width:%d%%;
     --cosmos-image-text-content-width:%d%%;
     --cosmos-image-text-background:%s;
     --cosmos-image-text-color:%s;
     --cosmos-image-text-title-size:%dpx;
     --cosmos-image-text-description-size:%dpx;
     --cosmos-image-text-margin-top:%dpx;
     --cosmos-image-text-margin-bottom:%dpx;
     --cosmos-image-text-align:%s;
     --cosmos-image-text-cta-align:%s;
     --cosmos-image-text-cta-title-size:%dpx;
     --cosmos-image-text-cta-title-color:%s;
     --cosmos-image-text-cta-description-size:%dpx;
     --cosmos-image-text-cta-description-color:%s;
     --cosmos-image-text-cta-button-color:%s;
     --cosmos-image-text-cta-button-text-color:%s;
     --cosmos-image-text-cta-button-size:%dpx;
     --cosmos-image-text-cta-button-padding-vertical:%dpx;
     --cosmos-image-text-cta-button-padding-horizontal:%dpx;
     --cosmos-image-text-cta-button-radius:%dpx;',

    $image_width,
    $text_width,

    esc_attr($background_color),
    esc_attr($text_color),

    $title_size,
    $description_size,

    $margin_top,
    $margin_bottom,

    esc_attr($text_align),
    esc_attr($cta_align),

    $cta_title_size,
    esc_attr($cta_title_color),

    $cta_description_size,
    esc_attr($cta_description_color),

    esc_attr($cta_button_color),
    esc_attr($cta_button_text_color),

    $cta_button_size,

    $cta_button_padding_vertical,
    $cta_button_padding_horizontal,

    $cta_button_radius
);


/*
 * =====================================================
 * POSICIÓN IMAGEN
 * =====================================================
 */

$position_class =
    $image_position === 'right'
        ? 'cosmos-image-text__image-right'
        : '';

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-image-text',
        'style' => $style
    ]);
    ?>
>

    <div
        class="
            cosmos-image-text__inner
            <?php echo esc_attr($position_class); ?>
        "
    >

        <!-- IMAGEN -->

        <div class="cosmos-image-text__image-column">

            <?php if ($image_url) : ?>

                <img
                    class="cosmos-image-text__image"
                    src="<?php echo esc_url($image_url); ?>"
                    alt="<?php echo esc_attr($image_alt); ?>"
                    loading="lazy"
                >

            <?php endif; ?>

        </div>


        <!-- CONTENIDO -->

        <div class="cosmos-image-text__content-column">

            <?php if ($title) : ?>

                <h2 class="cosmos-image-text__title">
                    <?php
                    echo wp_kses_post($title);
                    ?>
                </h2>

            <?php endif; ?>


            <?php if ($description) : ?>

                <div class="cosmos-image-text__description">
                    <?php
                    echo wp_kses_post($description);
                    ?>
                </div>

            <?php endif; ?>


            <?php if ($show_cta) : ?>

                <div class="cosmos-image-text__cta">

                    <?php if ($cta_title) : ?>

                        <h3 class="cosmos-image-text__cta-title">
                            <?php
                            echo wp_kses_post($cta_title);
                            ?>
                        </h3>

                    <?php endif; ?>


                    <?php if ($cta_description) : ?>

                        <div class="cosmos-image-text__cta-description">
                            <?php
                            echo wp_kses_post(
                                $cta_description
                            );
                            ?>
                        </div>

                    <?php endif; ?>


                    <?php if ($cta_button_text) : ?>

                        <div
                            class="cosmos-image-text__cta-button-wrapper"
                        >

                            <a
                                class="cosmos-image-text__cta-button"
                                href="<?php echo esc_url($cta_button_url); ?>"
                            >
                                <?php
                                echo esc_html(
                                    wp_strip_all_tags(
                                        $cta_button_text
                                    )
                                );
                                ?>
                            </a>

                        </div>

                    <?php endif; ?>

                </div>

            <?php endif; ?>

        </div>

    </div>

</section>