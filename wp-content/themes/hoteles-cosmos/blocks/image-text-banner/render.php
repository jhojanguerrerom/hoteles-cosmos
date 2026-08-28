<?php

$image_url = $attributes['imageUrl'] ?? '';

$image_alt = $attributes['imageAlt'] ?? '';

$image_height = intval(
    $attributes['imageHeight'] ?? 500
);

$background_position =
    $attributes['backgroundPosition']
    ?? 'center center';

$overlay = intval(
    $attributes['overlay'] ?? 0
);


/*
 * =====================================================
 * TÍTULO
 * =====================================================
 */

$title = $attributes['title'] ?? '';

$title_color =
    $attributes['titleColor']
    ?? '#111111';

$title_size = intval(
    $attributes['titleSize'] ?? 42
);

$title_weight =
    $attributes['titleWeight']
    ?? '400';

$title_align =
    $attributes['titleAlign']
    ?? 'left';


/*
 * =====================================================
 * DESCRIPCIÓN
 * =====================================================
 */

$description =
    $attributes['description']
    ?? '';

$description_color =
    $attributes['descriptionColor']
    ?? '#333333';

$description_size = intval(
    $attributes['descriptionSize'] ?? 17
);

$description_align =
    $attributes['descriptionAlign']
    ?? 'left';


/*
 * =====================================================
 * CONTENIDO
 * =====================================================
 */

$content_background =
    $attributes['contentBackgroundColor']
    ?? '#ffffff';

$content_padding_top = intval(
    $attributes['contentPaddingTop'] ?? 60
);

$content_padding_bottom = intval(
    $attributes['contentPaddingBottom'] ?? 60
);

$content_padding_left = intval(
    $attributes['contentPaddingLeft'] ?? 60
);

$content_padding_right = intval(
    $attributes['contentPaddingRight'] ?? 60
);


/*
 * =====================================================
 * FONDO
 * =====================================================
 */

$background_padding_top = intval(
    $attributes['backgroundPaddingTop'] ?? 90
);

$background_padding_bottom = intval(
    $attributes['backgroundPaddingBottom'] ?? 90
);


/*
 * =====================================================
 * MARGEN DEL BLOQUE COMPLETO
 * =====================================================
 */

$block_margin_top = intval(
    $attributes['blockMarginTop'] ?? 0
);

$block_margin_bottom = intval(
    $attributes['blockMarginBottom'] ?? 0
);


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-banner-height:%dpx;
     --cosmos-banner-position:%s;
     --cosmos-banner-overlay:%d;
     --cosmos-title-color:%s;
     --cosmos-title-size:%dpx;
     --cosmos-title-weight:%s;
     --cosmos-title-align:%s;
     --cosmos-description-color:%s;
     --cosmos-description-size:%dpx;
     --cosmos-description-align:%s;
     --cosmos-content-background:%s;
     --cosmos-content-padding-top:%dpx;
     --cosmos-content-padding-bottom:%dpx;
     --cosmos-content-padding-left:%dpx;
     --cosmos-content-padding-right:%dpx;
     --cosmos-background-padding-top:%dpx;
     --cosmos-background-padding-bottom:%dpx;
     --cosmos-block-margin-top:%dpx;
     --cosmos-block-margin-bottom:%dpx;',

    $image_height,

    esc_attr(
        $background_position
    ),

    $overlay,

    esc_attr(
        $title_color
    ),

    $title_size,

    esc_attr(
        $title_weight
    ),

    esc_attr(
        $title_align
    ),

    esc_attr(
        $description_color
    ),

    $description_size,

    esc_attr(
        $description_align
    ),

    esc_attr(
        $content_background
    ),

    $content_padding_top,

    $content_padding_bottom,

    $content_padding_left,

    $content_padding_right,

    $background_padding_top,

    $background_padding_bottom,

    $block_margin_top,

    $block_margin_bottom
);


/*
 * =====================================================
 * ESTILO DEL FONDO
 * =====================================================
 */

$background_style = '';

if ($image_url) {

    $overlay_value =
        $overlay / 100;

    $background_style = sprintf(

        'background-image:
        linear-gradient(
            rgba(0,0,0,%s),
            rgba(0,0,0,%s)
        ),
        url("%s");',

        $overlay_value,
        $overlay_value,

        esc_url(
            $image_url
        )
    );
}

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-image-text-banner',
        'style' => $style
    ]);
    ?>
>

    <div
        class="cosmos-image-text-banner__background"
        style="<?php echo esc_attr($background_style); ?>"
    >

        <div class="container">

            <div class="cosmos-image-text-banner__content">

                <?php if ($title) : ?>

                    <h2
                        class="cosmos-image-text-banner__title"
                    >
                        <?php
                        echo wp_kses_post($title);
                        ?>
                    </h2>

                <?php endif; ?>


                <?php if ($description) : ?>

                    <div
                        class="cosmos-image-text-banner__description"
                    >
                        <?php
                        echo wp_kses_post(
                            $description
                        );
                        ?>
                    </div>

                <?php endif; ?>

            </div>

        </div>

    </div>

</section>