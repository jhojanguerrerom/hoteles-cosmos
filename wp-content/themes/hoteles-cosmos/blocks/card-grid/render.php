<?php

$cards = (
    isset($attributes['cards']) &&
    is_array($attributes['cards'])
)
    ? $attributes['cards']
    : [];

$margin_top = max(
    0,
    min(150, intval($attributes['marginTop'] ?? 50))
);

$margin_bottom = max(
    0,
    min(150, intval($attributes['marginBottom'] ?? 50))
);

$card_gap = max(
    0,
    min(80, intval($attributes['cardGap'] ?? 30))
);

$image_aspect_ratio = $attributes['imageAspectRatio'] ?? '4/3';

$overlay = max(
    0,
    min(100, intval($attributes['overlay'] ?? 55))
);

$cta_width = max(
    50,
    min(100, intval($attributes['ctaWidth'] ?? 90))
);

$cta_border_width = max(
    0,
    min(5, intval($attributes['ctaBorderWidth'] ?? 1))
);

$cta_border_radius = max(
    0,
    min(50, intval($attributes['ctaBorderRadius'] ?? 0))
);

$cta_color = $attributes['ctaColor'] ?? '#111111';
$cta_background = $attributes['ctaBackground'] ?? 'transparent';
$cta_text = $attributes['ctaText'] ?? 'Conoce más';

$allowed_ratios = [
    '4/3',
    '3/2',
    '16/9',
    '9/10',
    '1/1'
];

if (!in_array($image_aspect_ratio, $allowed_ratios, true)) {
    $image_aspect_ratio = '4/3';
}

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
    esc_attr(str_replace('/', ' / ', $image_aspect_ratio)),
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

            <div class="cosmos-card-grid__carousel">

                <?php if (count($cards) > 1) : ?>
                    <div class="cosmos-card-grid__arrows">
                        <button
                            type="button"
                            class="cosmos-card-grid__arrow cosmos-card-grid__arrow--prev"
                            aria-label="<?php echo esc_attr__('Tarjetas anteriores', 'hoteles-cosmos'); ?>"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>

                        <button
                            type="button"
                            class="cosmos-card-grid__arrow cosmos-card-grid__arrow--next"
                            aria-label="<?php echo esc_attr__('Tarjetas siguientes', 'hoteles-cosmos'); ?>"
                        >
                            <span aria-hidden="true">›</span>
                        </button>
                    </div>
                <?php endif; ?>

                <div class="cosmos-card-grid__viewport">
                    <div class="cosmos-card-grid__list">

                        <?php foreach ($cards as $card) : ?>

                            <?php
                            $image_url = $card['imageUrl'] ?? '';
                            $image_alt = $card['imageAlt'] ?? '';
                            $text = $card['text'] ?? '';
                            $text_color = $card['textColor'] ?? '#ffffff';

                            $text_size = max(
                                10,
                                min(60, intval($card['textSize'] ?? 20))
                            );

                            $text_align = $card['textAlign'] ?? 'left';

                            if (!in_array(
                                $text_align,
                                ['left', 'center', 'right'],
                                true
                            )) {
                                $text_align = 'left';
                            }

                            $text_bold = !empty($card['textBold']);
                            $url = $card['ctaUrl'] ?? '';
                            ?>

                            <article class="cosmos-card-grid__card">

                                <?php if ($image_url) : ?>

                                    <a
                                        class="cosmos-card-grid__image-link"
                                        href="<?php echo esc_url($url ?: '#'); ?>"
                                        <?php if (!$url) : ?>
                                            aria-disabled="true"
                                            onclick="return false;"
                                        <?php endif; ?>
                                    >
                                        <div class="cosmos-card-grid__image-wrapper">

                                            <img
                                                src="<?php echo esc_url($image_url); ?>"
                                                alt="<?php echo esc_attr($image_alt); ?>"
                                                loading="lazy"
                                            />

                                            <div class="cosmos-card-grid__overlay"></div>

                                            <?php if ($text !== '') : ?>
                                                <div
                                                    class="cosmos-card-grid__text <?php echo $text_bold ? 'is-bold' : ''; ?>"
                                                    style="<?php
                                                        echo esc_attr(
                                                            'color:' . $text_color .
                                                            ';font-size:' . $text_size . 'px' .
                                                            ';text-align:' . $text_align . ';'
                                                        );
                                                    ?>"
                                                >
                                                    <?php echo wp_kses_post($text); ?>
                                                </div>
                                            <?php endif; ?>

                                        </div>
                                    </a>

                                <?php endif; ?>

                                <?php if ($url) : ?>
                                    <a
                                        class="cosmos-card-grid__cta"
                                        href="<?php echo esc_url($url); ?>"
                                    >
                                        <?php echo esc_html($cta_text); ?>
                                    </a>
                                <?php else : ?>
                                    <span class="cosmos-card-grid__cta">
                                        <?php echo esc_html($cta_text); ?>
                                    </span>
                                <?php endif; ?>

                            </article>

                        <?php endforeach; ?>

                    </div>
                </div>

            </div>

        <?php endif; ?>

    </div>
</section>