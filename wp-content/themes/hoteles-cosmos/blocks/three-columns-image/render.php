<?php

$left_title =
    $attributes['leftTitle'] ?? '';

$left_description =
    $attributes['leftDescription'] ?? '';

$right_title =
    $attributes['rightTitle'] ?? '';

$right_description =
    $attributes['rightDescription'] ?? '';


$image_url =
    $attributes['imageUrl'] ?? '';

$image_alt =
    $attributes['imageAlt'] ?? '';


$background_color =
    $attributes['backgroundColor'] ?? '#ffffff';


$title_color =
    $attributes['titleColor'] ?? '#111111';

$title_size =
    intval($attributes['titleSize'] ?? 28);

$title_weight =
    $attributes['titleWeight'] ?? '600';


$description_color =
    $attributes['descriptionColor'] ?? '#333333';

$description_size =
    intval($attributes['descriptionSize'] ?? 16);

$description_weight =
    $attributes['descriptionWeight'] ?? '400';


$left_align =
    $attributes['leftAlign'] ?? 'left';

$right_align =
    $attributes['rightAlign'] ?? 'left';


$image_width =
    intval($attributes['imageWidth'] ?? 100);

$image_height =
    intval($attributes['imageHeight'] ?? 500);


$column_gap =
    intval($attributes['columnGap'] ?? 40);


$padding_top =
    intval($attributes['paddingTop'] ?? 70);

$padding_bottom =
    intval($attributes['paddingBottom'] ?? 70);


$margin_top =
    intval($attributes['blockMarginTop'] ?? 0);

$margin_bottom =
    intval($attributes['blockMarginBottom'] ?? 0);


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-three-background:%s;
     --cosmos-three-title-color:%s;
     --cosmos-three-title-size:%dpx;
     --cosmos-three-title-weight:%s;
     --cosmos-three-description-color:%s;
     --cosmos-three-description-size:%dpx;
     --cosmos-three-description-weight:%s;
     --cosmos-three-left-align:%s;
     --cosmos-three-right-align:%s;
     --cosmos-three-image-width:%d%%;
     --cosmos-three-image-height:%dpx;
     --cosmos-three-gap:%dpx;
     --cosmos-three-padding-top:%dpx;
     --cosmos-three-padding-bottom:%dpx;
     --cosmos-three-margin-top:%dpx;
     --cosmos-three-margin-bottom:%dpx;',

    esc_attr($background_color),

    esc_attr($title_color),
    $title_size,
    esc_attr($title_weight),

    esc_attr($description_color),
    $description_size,
    esc_attr($description_weight),

    esc_attr($left_align),
    esc_attr($right_align),

    $image_width,
    $image_height,

    $column_gap,

    $padding_top,
    $padding_bottom,

    $margin_top,
    $margin_bottom
);

?>


<section
    <?php

    echo get_block_wrapper_attributes([

        'class' => 'cosmos-three-columns-image',

        'style' => $style

    ]);

    ?>
>


    <div class="cosmos-three-columns-image__inner">


        <!-- =============================================
             COLUMNA IZQUIERDA
        ============================================== -->

        <div
            class="cosmos-three-columns-image__text cosmos-three-columns-image__text--left"
        >

            <?php if ($left_title) : ?>

                <h2 class="cosmos-three-columns-image__title">

                    <?php
                    echo wp_kses_post($left_title);
                    ?>

                </h2>

            <?php endif; ?>


            <?php if ($left_description) : ?>

                <div class="cosmos-three-columns-image__description">

                    <?php
                    echo wp_kses_post($left_description);
                    ?>

                </div>

            <?php endif; ?>

        </div>


        <!-- =============================================
             IMAGEN CENTRAL
        ============================================== -->

        <div class="cosmos-three-columns-image__image">

            <?php if ($image_url) : ?>

                <img
                    src="<?php echo esc_url($image_url); ?>"
                    alt="<?php echo esc_attr($image_alt); ?>"
                    loading="lazy"
                />

            <?php endif; ?>

        </div>


        <!-- =============================================
             COLUMNA DERECHA
        ============================================== -->

        <div
            class="cosmos-three-columns-image__text cosmos-three-columns-image__text--right"
        >

            <?php if ($right_title) : ?>

                <h2 class="cosmos-three-columns-image__title">

                    <?php
                    echo wp_kses_post($right_title);
                    ?>

                </h2>

            <?php endif; ?>


            <?php if ($right_description) : ?>

                <div class="cosmos-three-columns-image__description">

                    <?php
                    echo wp_kses_post($right_description);
                    ?>

                </div>

            <?php endif; ?>

        </div>


    </div>

</section>