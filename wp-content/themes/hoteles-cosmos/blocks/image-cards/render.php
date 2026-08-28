<?php

$cards = $attributes['cards'] ?? [];

$card_height = intval(
    $attributes['cardHeight'] ?? 560
);

$card_gap = intval(
    $attributes['cardGap'] ?? 24
);

$overlay = intval(
    $attributes['overlay'] ?? 45
);


/*
 * =====================================================
 * TÍTULO
 * =====================================================
 */

$title_color =
    $attributes['titleColor'] ?? '#ffffff';

$title_size = intval(
    $attributes['titleSize'] ?? 28
);

$title_weight =
    $attributes['titleWeight'] ?? '600';

$title_align =
    $attributes['titleAlign'] ?? 'left';


/*
 * =====================================================
 * DESCRIPCIÓN
 * =====================================================
 */

$description_color =
    $attributes['descriptionColor'] ?? '#ffffff';

$description_size = intval(
    $attributes['descriptionSize'] ?? 16
);

$description_weight =
    $attributes['descriptionWeight'] ?? '400';

$description_align =
    $attributes['descriptionAlign'] ?? 'left';


/*
 * =====================================================
 * MARGEN DEL BLOQUE COMPLETO
 * =====================================================
 */

$margin_top = intval(
    $attributes['blockMarginTop'] ?? 0
);

$margin_bottom = intval(
    $attributes['blockMarginBottom'] ?? 0
);


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-card-height:%dpx;
     --cosmos-card-gap:%dpx;
     --cosmos-card-overlay:%s;
     --cosmos-card-title-color:%s;
     --cosmos-card-title-size:%dpx;
     --cosmos-card-title-weight:%s;
     --cosmos-card-title-align:%s;
     --cosmos-card-description-color:%s;
     --cosmos-card-description-size:%dpx;
     --cosmos-card-description-weight:%s;
     --cosmos-card-description-align:%s;
     --cosmos-block-margin-top:%dpx;
     --cosmos-block-margin-bottom:%dpx;',
     
    $card_height,
    $card_gap,
    esc_attr($overlay / 100),

    esc_attr($title_color),
    $title_size,
    esc_attr($title_weight),
    esc_attr($title_align),

    esc_attr($description_color),
    $description_size,
    esc_attr($description_weight),
    esc_attr($description_align),

    $margin_top,
    $margin_bottom
);

?>


<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-image-cards',
        'style' => $style
    ]);
    ?>
>

    <div class="container">

        <div class="cosmos-image-cards__grid">


            <?php foreach ($cards as $card) : ?>

                <?php

                $image_url =
                    $card['imageUrl'] ?? '';

                $image_alt =
                    $card['imageAlt'] ?? '';

                $title =
                    $card['title'] ?? '';

                $description =
                    $card['description'] ?? '';

                ?>


                <article
                    class="cosmos-image-cards__card"

                    <?php if ($image_url) : ?>

                        style="background-image:
                            linear-gradient(
                                rgba(
                                    0,
                                    0,
                                    0,
                                    var(--cosmos-card-overlay)
                                ),
                                rgba(
                                    0,
                                    0,
                                    0,
                                    var(--cosmos-card-overlay)
                                )
                            ),
                            url('<?php echo esc_url($image_url); ?>');"

                    <?php endif; ?>

                    <?php if ($image_alt) : ?>

                        aria-label="<?php echo esc_attr($image_alt); ?>"

                    <?php endif; ?>
                >


                    <div class="cosmos-image-cards__content">


                        <!-- =================================================
                             TÍTULO ARRIBA
                        ================================================== -->

                        <?php if ($title) : ?>

                            <div class="cosmos-image-cards__title-area">

                                <h3 class="cosmos-image-cards__title">

                                    <?php
                                    echo wp_kses_post($title);
                                    ?>

                                </h3>

                            </div>

                        <?php endif; ?>


                        <!-- =================================================
                             DESCRIPCIÓN ABAJO
                        ================================================== -->

                        <?php if ($description) : ?>

                            <div class="cosmos-image-cards__description-area">

                                <div class="cosmos-image-cards__description">

                                    <?php
                                    echo wp_kses_post(
                                        $description
                                    );
                                    ?>

                                </div>

                            </div>

                        <?php endif; ?>


                    </div>


                </article>


            <?php endforeach; ?>


        </div>

    </div>

</section>