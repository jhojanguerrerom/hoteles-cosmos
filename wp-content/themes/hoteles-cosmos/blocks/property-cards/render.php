<?php

$cards =
    $attributes['cards'] ?? [];


/*
 * =====================================================
 * ANCHO DEL BLOQUE
 * =====================================================
 */

$content_width =
    $attributes['contentWidth'] ?? 'container';

$content_width_class =
    $content_width === 'full'
        ? 'cosmos-property-cards--full'
        : 'cosmos-property-cards--container';


/*
 * =====================================================
 * TEXTO SOBRE IMAGEN
 * =====================================================
 */

$overlay_text_color =
    $attributes['overlayTextColor']
        ?? '#ffffff';

$overlay_text_size =
    isset($attributes['overlayTextSize'])
        ? intval(
            $attributes['overlayTextSize']
        )
        : 24;

$overlay_text_weight =
    isset($attributes['overlayTextWeight'])
        ? intval(
            $attributes['overlayTextWeight']
        )
        : 700;


/*
 * =====================================================
 * FRANJA
 * =====================================================
 */

$bar_background =
    $attributes['barBackgroundColor']
        ?? '#111111';

$area_label_color =
    $attributes['areaLabelColor']
        ?? '#ffffff';

$area_label_size =
    isset($attributes['areaLabelSize'])
        ? intval(
            $attributes['areaLabelSize']
        )
        : 20;

$area_label_weight =
    isset($attributes['areaLabelWeight'])
        ? intval(
            $attributes['areaLabelWeight']
        )
        : 700;


/*
 * =====================================================
 * ICONOS
 * =====================================================
 */

$icon_size =
    isset($attributes['iconSize'])
        ? intval(
            $attributes['iconSize']
        )
        : 28;

$icon_gap =
    isset($attributes['iconGap'])
        ? intval(
            $attributes['iconGap']
        )
        : 12;


/*
 * =====================================================
 * VALORES
 * =====================================================
 */

$value_color =
    $attributes['valueColor']
        ?? '#111111';

$value_size =
    isset($attributes['valueSize'])
        ? intval(
            $attributes['valueSize']
        )
        : 16;

$value_weight =
    isset($attributes['valueWeight'])
        ? intval(
            $attributes['valueWeight']
        )
        : 500;


/*
 * =====================================================
 * IMAGEN
 * =====================================================
 */

$image_aspect_ratio =
    $attributes['imageAspectRatio']
        ?? '4/3';


/*
 * =====================================================
 * ESPACIADO
 * =====================================================
 */

$image_bar_gap =
    isset($attributes['imageBarGap'])
        ? intval(
            $attributes['imageBarGap']
        )
        : 10;

$card_gap =
    isset($attributes['cardGap'])
        ? intval(
            $attributes['cardGap']
        )
        : 30;

$value_gap =
    isset($attributes['valueGap'])
        ? intval(
            $attributes['valueGap']
        )
        : 10;


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$overlay_text_size = max(
    10,
    min(
        60,
        $overlay_text_size
    )
);

$overlay_text_weight = max(
    100,
    min(
        900,
        $overlay_text_weight
    )
);

$area_label_size = max(
    10,
    min(
        50,
        $area_label_size
    )
);

$area_label_weight = max(
    100,
    min(
        900,
        $area_label_weight
    )
);

$icon_size = max(
    10,
    min(
        60,
        $icon_size
    )
);

$icon_gap = max(
    0,
    min(
        40,
        $icon_gap
    )
);

$value_size = max(
    10,
    min(
        40,
        $value_size
    )
);

$value_weight = max(
    100,
    min(
        900,
        $value_weight
    )
);

$image_bar_gap = max(
    0,
    min(
        40,
        $image_bar_gap
    )
);

$card_gap = max(
    0,
    min(
        60,
        $card_gap
    )
);

$value_gap = max(
    0,
    min(
        40,
        $value_gap
    )
);


/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(

    '--cosmos-property-overlay-color:%s;
     --cosmos-property-overlay-size:%dpx;
     --cosmos-property-overlay-weight:%d;
     --cosmos-property-bar-background:%s;
     --cosmos-property-area-color:%s;
     --cosmos-property-area-size:%dpx;
     --cosmos-property-area-weight:%d;
     --cosmos-property-icon-size:%dpx;
     --cosmos-property-icon-gap:%dpx;
     --cosmos-property-value-color:%s;
     --cosmos-property-value-size:%dpx;
     --cosmos-property-value-weight:%d;
     --cosmos-property-image-bar-gap:%dpx;
     --cosmos-property-card-gap:%dpx;
     --cosmos-property-value-gap:%dpx;',

    esc_attr(
        $overlay_text_color
    ),

    $overlay_text_size,
    $overlay_text_weight,

    esc_attr(
        $bar_background
    ),

    esc_attr(
        $area_label_color
    ),

    $area_label_size,
    $area_label_weight,

    $icon_size,
    $icon_gap,

    esc_attr(
        $value_color
    ),

    $value_size,
    $value_weight,

    $image_bar_gap,
    $card_gap,
    $value_gap
);

?>


<section
    <?php
    echo get_block_wrapper_attributes([
        'class' =>
            'cosmos-property-cards ' .
            $content_width_class,

        'style' =>
            $style
    ]);
    ?>
>

    <?php if (!empty($cards)) : ?>

        <div
            class="
                cosmos-property-cards__grid
            "
        >

            <?php foreach ($cards as $card) : ?>

                <?php

                $image_url =
                    $card['imageUrl']
                    ?? '';

                $image_alt =
                    $card['imageAlt']
                    ?? '';

                $title =
                    $card['title']
                    ?? '';

                $area_value =
                    $card['areaValue']
                    ?? '';

                $features =
                    is_array(
                        $card['features'] ?? null
                    )
                        ? $card['features']
                        : [];


                /*
                 * =================================================
                 * COLUMNAS
                 * =================================================
                 *
                 * Primera columna:
                 *     1fr
                 *
                 * Siguientes columnas:
                 *     una por cada icono
                 *
                 * Esto hace que la franja y los valores
                 * compartan exactamente las mismas columnas.
                 */

                $spec_columns =
                    '1fr';

                if (!empty($features)) {

                    $spec_columns .=
                        ' repeat(' .
                        count($features) .
                        ', max-content)';
                }

                ?>


                <article
                    class="
                        cosmos-property-cards__card
                    "
                >

                    <?php if ($image_url) : ?>

                        <div
                            class="
                                cosmos-property-cards__image-wrapper
                            "
                            style="
                                aspect-ratio:
                                <?php
                                echo esc_attr(
                                    $image_aspect_ratio
                                );
                                ?>;
                            "
                        >

                            <img
                                class="
                                    cosmos-property-cards__image
                                "
                                src="<?php
                                echo esc_url(
                                    $image_url
                                );
                                ?>"
                                alt="<?php
                                echo esc_attr(
                                    $image_alt
                                );
                                ?>"
                                loading="lazy"
                            />


                            <div
                                class="
                                    cosmos-property-cards__overlay-gradient
                                "
                            ></div>


                            <?php if ($title) : ?>

                                <div
                                    class="
                                        cosmos-property-cards__overlay-title
                                    "
                                >

                                    <?php
                                    echo esc_html(
                                        $title
                                    );
                                    ?>

                                </div>

                            <?php endif; ?>

                        </div>

                    <?php endif; ?>


                    <!--
                    =================================================
                    FRANJA + VALORES
                    =================================================

                    Todo vive dentro de la MISMA GRID.

                    Columna 1:
                        M²
                        120

                    Columna 2:
                        icono
                        4

                    Columna 3:
                        icono
                        2

                    Columna 4:
                        icono
                        1

                    =================================================
                    -->

                    <div
                        class="
                            cosmos-property-cards__specs
                        "
                        style="
                            grid-template-columns:
                            <?php
                            echo esc_attr(
                                $spec_columns
                            );
                            ?>;
                        "
                    >


                        <!-- =================================================
                             M²
                        ================================================= -->

                        <div
                            class="
                                cosmos-property-cards__spec-area
                            "
                        >

                            <div
                                class="
                                    cosmos-property-cards__spec-icon
                                    cosmos-property-cards__spec-icon--area
                                "
                            >

                                M<sup>2</sup>

                            </div>


                            <div
                                class="
                                    cosmos-property-cards__spec-value
                                    cosmos-property-cards__spec-value--area
                                "
                            >

                                <?php
                                echo esc_html(
                                    $area_value ?: '0'
                                );
                                ?>

                            </div>

                        </div>


                        <!-- =================================================
                             ICONOS + VALORES
                        ================================================= -->

                        <?php foreach ($features as $feature) : ?>

                            <?php

                            $icon_url =
                                $feature['iconUrl']
                                ?? '';

                            $icon_alt =
                                $feature['iconAlt']
                                ?? '';

                            $feature_value =
                                $feature['value']
                                ?? '';

                            ?>


                            <div
                                class="
                                    cosmos-property-cards__spec-feature
                                "
                            >

                                <div
                                    class="
                                        cosmos-property-cards__spec-icon
                                    "
                                >

                                    <?php if ($icon_url) : ?>

                                        <img
                                            class="
                                                cosmos-property-cards__icon
                                            "
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
                                        />

                                    <?php endif; ?>

                                </div>


                                <div
                                    class="
                                        cosmos-property-cards__spec-value
                                    "
                                >

                                    <?php
                                    echo esc_html(
                                        $feature_value ?: '0'
                                    );
                                    ?>

                                </div>

                            </div>

                        <?php endforeach; ?>


                    </div>

                </article>

            <?php endforeach; ?>

        </div>

    <?php endif; ?>

</section>