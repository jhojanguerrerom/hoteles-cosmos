<?php

/**
 * Texto + Imagen
 *
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block
 */


/*
 * =========================================
 * CONFIGURACIÓN GENERAL
 * =========================================
 */

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 40;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 40;


/*
 * =========================================
 * FONDO COLUMNA TEXTO
 * =========================================
 */

$text_background = isset($attributes['textBackground'])
    ? $attributes['textBackground']
    : '#f5f1ea';


/*
 * =========================================
 * TÍTULO
 * =========================================
 */

$title = isset($attributes['title'])
    ? $attributes['title']
    : '';

$title_color = isset($attributes['titleColor'])
    ? $attributes['titleColor']
    : '#222222';

$title_size = isset($attributes['titleSize'])
    ? intval($attributes['titleSize'])
    : 42;

$title_weight = isset($attributes['titleWeight'])
    ? $attributes['titleWeight']
    : '700';

$title_align = isset($attributes['titleAlign'])
    ? $attributes['titleAlign']
    : 'left';

$title_margin_bottom = isset($attributes['titleMarginBottom'])
    ? intval($attributes['titleMarginBottom'])
    : 20;


/*
 * =========================================
 * DESCRIPCIÓN
 * =========================================
 */

$description = isset($attributes['description'])
    ? $attributes['description']
    : '';

$description_color = isset($attributes['descriptionColor'])
    ? $attributes['descriptionColor']
    : '#333333';

$description_size = isset($attributes['descriptionSize'])
    ? intval($attributes['descriptionSize'])
    : 17;

$description_weight = isset($attributes['descriptionWeight'])
    ? $attributes['descriptionWeight']
    : '400';

$description_align = isset($attributes['descriptionAlign'])
    ? $attributes['descriptionAlign']
    : 'left';


/*
 * =========================================
 * BOTÓN 1
 * =========================================
 */

$button1_enabled = !empty($attributes['button1Enabled']);

$button1_text = isset($attributes['button1Text'])
    ? $attributes['button1Text']
    : 'Conoce más';

$button1_url = isset($attributes['button1Url'])
    ? $attributes['button1Url']
    : '#';


/*
 * =========================================
 * BOTÓN 2
 * =========================================
 */

$button2_enabled = !empty($attributes['button2Enabled']);

$button2_text = isset($attributes['button2Text'])
    ? $attributes['button2Text']
    : 'Ver más';

$button2_url = isset($attributes['button2Url'])
    ? $attributes['button2Url']
    : '#';


/*
 * =========================================
 * ESTILO DE BOTONES
 * =========================================
 */

$button_background = isset($attributes['buttonBackground'])
    ? $attributes['buttonBackground']
    : '#222222';

$button_color = isset($attributes['buttonColor'])
    ? $attributes['buttonColor']
    : '#ffffff';

$button_size = isset($attributes['buttonSize'])
    ? intval($attributes['buttonSize'])
    : 15;

$button_weight = isset($attributes['buttonWeight'])
    ? $attributes['buttonWeight']
    : '600';

$button_padding_vertical = isset($attributes['buttonPaddingVertical'])
    ? intval($attributes['buttonPaddingVertical'])
    : 14;

$button_padding_horizontal = isset($attributes['buttonPaddingHorizontal'])
    ? intval($attributes['buttonPaddingHorizontal'])
    : 28;

$button_border_width = isset($attributes['buttonBorderWidth'])
    ? intval($attributes['buttonBorderWidth'])
    : 0;

$button_border_color = isset($attributes['buttonBorderColor'])
    ? $attributes['buttonBorderColor']
    : '#222222';

$button_radius = isset($attributes['buttonRadius'])
    ? intval($attributes['buttonRadius'])
    : 4;


/*
 * =========================================
 * IMAGEN
 * =========================================
 */

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';

$image_position = isset($attributes['imagePosition'])
    ? $attributes['imagePosition']
    : 'center center';

$image_height = isset($attributes['imageHeight'])
    ? intval($attributes['imageHeight'])
    : 600;


/*
 * =========================================
 * WRAPPER
 * =========================================
 */

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'cosmos-text-image',

        'style' => sprintf(
            '--cosmos-text-image-margin-top:%dpx;' .
            '--cosmos-text-image-margin-bottom:%dpx;' .

            '--cosmos-text-image-text-background:%s;' .

            '--cosmos-text-image-title-color:%s;' .
            '--cosmos-text-image-title-size:%dpx;' .
            '--cosmos-text-image-title-weight:%s;' .
            '--cosmos-text-image-title-align:%s;' .
            '--cosmos-text-image-title-margin-bottom:%dpx;' .

            '--cosmos-text-image-description-color:%s;' .
            '--cosmos-text-image-description-size:%dpx;' .
            '--cosmos-text-image-description-weight:%s;' .
            '--cosmos-text-image-description-align:%s;' .

            '--cosmos-text-image-button-background:%s;' .
            '--cosmos-text-image-button-color:%s;' .
            '--cosmos-text-image-button-size:%dpx;' .
            '--cosmos-text-image-button-weight:%s;' .
            '--cosmos-text-image-button-padding-vertical:%dpx;' .
            '--cosmos-text-image-button-padding-horizontal:%dpx;' .
            '--cosmos-text-image-button-border-width:%dpx;' .
            '--cosmos-text-image-button-border-color:%s;' .
            '--cosmos-text-image-button-radius:%dpx;' .

            '--cosmos-text-image-image-height:%dpx;',

            $margin_top,
            $margin_bottom,

            esc_attr($text_background),

            esc_attr($title_color),
            $title_size,
            esc_attr($title_weight),
            esc_attr($title_align),
            $title_margin_bottom,

            esc_attr($description_color),
            $description_size,
            esc_attr($description_weight),
            esc_attr($description_align),

            esc_attr($button_background),
            esc_attr($button_color),
            $button_size,
            esc_attr($button_weight),
            $button_padding_vertical,
            $button_padding_horizontal,
            $button_border_width,
            esc_attr($button_border_color),
            $button_radius,

            $image_height
        )
    )
);

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="cosmos-text-image__columns">


        <!-- =========================================
             IMAGEN
        ========================================== -->

        <div class="cosmos-text-image__image-column">

            <?php if ($image_url) : ?>

                <div
                    class="cosmos-text-image__image"
                    style="
                        background-image: url('<?php echo esc_url($image_url); ?>');
                        background-position: <?php echo esc_attr($image_position); ?>;
                    "
                    role="img"
                    aria-label="<?php echo esc_attr($image_alt); ?>"
                ></div>

            <?php else : ?>

                <div
                    class="cosmos-text-image__image-placeholder"
                    aria-hidden="true"
                ></div>

            <?php endif; ?>

        </div>


        <!-- =========================================
             TEXTO
        ========================================== -->

        <div class="cosmos-text-image__text-column">

            <div class="cosmos-text-image__text-inner">


                <?php if ($title) : ?>

                    <h2 class="cosmos-text-image__title">
                        <?php echo wp_kses_post($title); ?>
                    </h2>

                <?php endif; ?>


                <?php if ($description) : ?>

                    <div class="cosmos-text-image__description">
                        <?php echo wp_kses_post($description); ?>
                    </div>

                <?php endif; ?>


                <?php if ($button1_enabled || $button2_enabled) : ?>

                    <div class="cosmos-text-image__buttons">


                        <?php if ($button1_enabled && $button1_text) : ?>

                            <a
                                href="<?php echo esc_url($button1_url); ?>"
                                class="cosmos-text-image__button"
                            >
                                <?php echo esc_html($button1_text); ?>
                            </a>

                        <?php endif; ?>


                        <?php if ($button2_enabled && $button2_text) : ?>

                            <a
                                href="<?php echo esc_url($button2_url); ?>"
                                class="cosmos-text-image__button"
                            >
                                <?php echo esc_html($button2_text); ?>
                            </a>

                        <?php endif; ?>


                    </div>

                <?php endif; ?>


            </div>

        </div>

    </div>

</section>