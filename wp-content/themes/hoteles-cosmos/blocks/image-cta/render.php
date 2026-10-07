<?php

/*
|--------------------------------------------------------------------------
| ATRIBUTOS
|--------------------------------------------------------------------------
*/

$margin_top =
    isset($attributes['marginTop'])
        ? (int) $attributes['marginTop']
        : 50;

$margin_bottom =
    isset($attributes['marginBottom'])
        ? (int) $attributes['marginBottom']
        : 50;

$card_gap =
    isset($attributes['cardGap'])
        ? (int) $attributes['cardGap']
        : 30;

$image_aspect_ratio =
    !empty($attributes['imageAspectRatio'])
        ? $attributes['imageAspectRatio']
        : '4/3';

$button_background_color =
    !empty($attributes['buttonBackgroundColor'])
        ? $attributes['buttonBackgroundColor']
        : '#111111';

$button_text_color =
    !empty($attributes['buttonTextColor'])
        ? $attributes['buttonTextColor']
        : '#ffffff';

$button_border_color =
    !empty($attributes['buttonBorderColor'])
        ? $attributes['buttonBorderColor']
        : '#111111';

$button_border_radius =
    isset($attributes['buttonBorderRadius'])
        ? (int) $attributes['buttonBorderRadius']
        : 0;

$button_border_width =
    isset($attributes['buttonBorderWidth'])
        ? (int) $attributes['buttonBorderWidth']
        : 1;

$button_height =
    isset($attributes['buttonHeight'])
        ? (int) $attributes['buttonHeight']
        : 55;

$cards =
    isset($attributes['cards']) &&
    is_array($attributes['cards'])
        ? $attributes['cards']
        : [];


/*
|--------------------------------------------------------------------------
| GARANTIZAR EXACTAMENTE DOS CARDS
|--------------------------------------------------------------------------
*/

$default_card = [
    'imageId'    => 0,
    'imageUrl'   => '',
    'imageAlt'   => '',
    'buttonText' => 'Conoce más',
    'buttonUrl'  => '',
];

$normalized_cards = [
    isset($cards[0]) && is_array($cards[0])
        ? $cards[0]
        : $default_card,

    isset($cards[1]) && is_array($cards[1])
        ? $cards[1]
        : $default_card,
];


/*
|--------------------------------------------------------------------------
| ESTILOS
|--------------------------------------------------------------------------
*/

$style = sprintf(
    '--cosmos-image-cta-margin-top:%dpx;' .
    '--cosmos-image-cta-margin-bottom:%dpx;' .
    '--cosmos-image-cta-gap:%dpx;' .
    '--cosmos-image-cta-image-aspect-ratio:%s;' .
    '--cosmos-image-cta-button-background:%s;' .
    '--cosmos-image-cta-button-color:%s;' .
    '--cosmos-image-cta-button-border-color:%s;' .
    '--cosmos-image-cta-button-radius:%dpx;' .
    '--cosmos-image-cta-button-border-width:%dpx;' .
    '--cosmos-image-cta-button-height:%dpx;',

    $margin_top,
    $margin_bottom,
    $card_gap,
    esc_attr(
        str_replace(
            '/',
            ' / ',
            $image_aspect_ratio
        )
    ),
    esc_attr($button_background_color),
    esc_attr($button_text_color),
    esc_attr($button_border_color),
    $button_border_radius,
    $button_border_width,
    $button_height
);


/*
|--------------------------------------------------------------------------
| BLOCK PROPS
|--------------------------------------------------------------------------
*/

$wrapper_attributes =
    get_block_wrapper_attributes(
        [
            'class' => 'cosmos-image-cta',
            'style' => $style,
        ]
    );


/*
|--------------------------------------------------------------------------
| OUTPUT
|--------------------------------------------------------------------------
*/

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="cosmos-image-cta__container">

        <div class="cosmos-image-cta__grid">

            <?php foreach ($normalized_cards as $card) : ?>

                <?php

                $image_url =
                    !empty($card['imageUrl'])
                        ? $card['imageUrl']
                        : '';

                $image_alt =
                    !empty($card['imageAlt'])
                        ? $card['imageAlt']
                        : '';

                $button_text =
                    !empty($card['buttonText'])
                        ? $card['buttonText']
                        : 'Conoce más';

                $button_url =
                    !empty($card['buttonUrl'])
                        ? $card['buttonUrl']
                        : '#';

                ?>

                <article class="cosmos-image-cta__card">

                    <?php if ($image_url) : ?>

                        <div class="cosmos-image-cta__image-wrapper">

                            <img
                                class="cosmos-image-cta__image"
                                src="<?php echo esc_url($image_url); ?>"
                                alt="<?php echo esc_attr($image_alt); ?>"
                                loading="lazy"
                            />

                        </div>

                    <?php else : ?>

                        <div class="cosmos-image-cta__image-wrapper">

                            <div class="cosmos-image-cta__image-placeholder">
                            </div>

                        </div>

                    <?php endif; ?>


                    <a
                        class="cosmos-image-cta__button"
                        href="<?php echo esc_url($button_url); ?>"
                    >
                        <?php echo esc_html($button_text); ?>
                    </a>

                </article>

            <?php endforeach; ?>

        </div>

    </div>

</section>