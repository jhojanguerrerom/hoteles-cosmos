<?php

$cards = (
    isset($attributes['cards']) &&
    is_array($attributes['cards'])
)
    ? $attributes['cards']
    : [];


$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 50;


$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 50;


$card_gap = isset($attributes['cardGap'])
    ? intval($attributes['cardGap'])
    : 30;


$image_aspect_ratio =
    $attributes['imageAspectRatio'] ?? '4/3';


$overlay = isset($attributes['overlay'])
    ? intval($attributes['overlay'])
    : 55;


$cta_width = isset($attributes['ctaWidth'])
    ? intval($attributes['ctaWidth'])
    : 90;


$cta_border_width =
    isset($attributes['ctaBorderWidth'])
        ? intval($attributes['ctaBorderWidth'])
        : 1;


$cta_border_radius =
    isset($attributes['ctaBorderRadius'])
        ? intval($attributes['ctaBorderRadius'])
        : 0;


$cta_color =
    $attributes['ctaColor'] ?? '#111111';


$cta_background =
    $attributes['ctaBackground'] ?? 'transparent';


$cta_text =
    $attributes['ctaText'] ?? 'Conoce más';


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$margin_top = max(
    0,
    min(150, $margin_top)
);


$margin_bottom = max(
    0,
    min(150, $margin_bottom)
);


$card_gap = max(
    0,
    min(80, $card_gap)
);


$overlay = max(
    0,
    min(100, $overlay)
);


$cta_width = max(
    50,
    min(100, $cta_width)
);


$cta_border_width = max(
    0,
    min(5, $cta_border_width)
);


$cta_border_radius = max(
    0,
    min(50, $cta_border_radius)
);


/*
 * =====================================================
 * RATIOS
 * =====================================================
 */

$allowed_ratios = [
    '4/3',
    '3/2',
    '16/9',
    '9/10',
    '1/1'
];


if (
    !in_array(
        $image_aspect_ratio,
        $allowed_ratios,
        true
    )
) {

    $image_aspect_ratio = '4/3';

}


/*
 * =====================================================
 * ESTILOS DEL BLOQUE
 * =====================================================
 */

$style = sprintf(
    '--cosmos-card-grid-margin-top:%dpx;
     --cosmos-card-grid-margin-bottom:%dpx;
     --cosmos-card-grid-gap:%dpx;
     --cosmos-card-grid-image-ratio:%s;
     --cosmos-card-grid-overlay:%d;
     --cosmos-card-grid-cta-width:%d%%;
     --cosmos-card-grid-cta-border-width:%dpx;
     --cosmos-card-grid-cta-border-radius:%dpx;
     --cosmos-card-grid-cta-color:%s;
     --cosmos-card-grid-cta-background:%s;',

    $margin_top,

    $margin_bottom,

    $card_gap,

    esc_attr($image_aspect_ratio),

    $overlay,

    $cta_width,

    $cta_border_width,

    $cta_border_radius,

    esc_attr($cta_color),

    esc_attr($cta_background)
);

?>


<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-card-grid',
        'style' => $style
    ]);
    ?>
>

    <div class="container">

        <?php if (!empty($cards)) : ?>

            <div class="cosmos-card-grid__list">

                <?php foreach ($cards as $card) : ?>

                    <?php

                    $image_url =
                        $card['imageUrl'] ?? '';

                    $image_alt =
                        $card['imageAlt'] ?? '';

                    $text =
                        $card['text'] ?? '';

                    $text_color =
                        $card['textColor']
                        ?? '#ffffff';

                    $text_size =
                        isset($card['textSize'])
                            ? intval($card['textSize'])
                            : 20;

                    $text_align =
                        $card['textAlign']
                        ?? 'left';

                    $text_bold =
                        !empty($card['textBold']);

                    $url =
                        $card['ctaUrl'] ?? '';

                    ?>


                    <article
                        class="cosmos-card-grid__card"
                    >

                        <?php if ($image_url) : ?>

                            <a
                                class="cosmos-card-grid__image-link"
                                href="<?php
                                    echo esc_url($url);
                                ?>"
                                <?php if (!$url) : ?>
                                    aria-disabled="true"
                                    onclick="return false;"
                                <?php endif; ?>
                            >

                                <div
                                    class="cosmos-card-grid__image-wrapper"
                                >

                                    <img
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
                                        class="cosmos-card-grid__overlay"
                                    ></div>


                                    <?php if ($text) : ?>

                                        <div
                                            class="cosmos-card-grid__text <?php
                                                echo $text_bold
                                                    ? 'is-bold'
                                                    : '';
                                            ?>"
                                            style="
                                                color: <?php
                                                    echo esc_attr(
                                                        $text_color
                                                    );
                                                ?>;

                                                font-size: <?php
                                                    echo esc_attr(
                                                        $text_size
                                                    );
                                                ?>px;

                                                text-align: <?php
                                                    echo esc_attr(
                                                        $text_align
                                                    );
                                                ?>;
                                            "
                                        >

                                            <?php
                                            echo wp_kses_post(
                                                $text
                                            );
                                            ?>

                                        </div>

                                    <?php endif; ?>

                                </div>

                            </a>

                        <?php endif; ?>


                        <?php if ($url) : ?>

                            <a
                                class="cosmos-card-grid__cta"
                                href="<?php
                                    echo esc_url($url);
                                ?>"
                            >

                                <?php
                                echo esc_html(
                                    $cta_text
                                );
                                ?>

                            </a>

                        <?php else : ?>

                            <span
                                class="cosmos-card-grid__cta"
                            >

                                <?php
                                echo esc_html(
                                    $cta_text
                                );
                                ?>

                            </span>

                        <?php endif; ?>

                    </article>

                <?php endforeach; ?>

            </div>

        <?php endif; ?>

    </div>

</section>