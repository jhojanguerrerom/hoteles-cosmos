
<?php

/*
 * =====================================================
 * TARJETAS
 * =====================================================
 */

$cards = $attributes['cards'] ?? [];

if (!is_array($cards)) {
    $cards = [];
}

$cards = array_slice($cards, 0, 6);

/*
 * Mantener un mínimo de 2 tarjetas si los atributos
 * guardados estuvieran vacíos o incompletos.
 */

while (count($cards) < 2) {
    $index = count($cards);

    $cards[] = [
        'imageUrl'    => '',
        'imageId'     => 0,
        'imageAlt'    => '',
        'title'       => 'Título de la card ' . ($index + 1),
        'description' => 'Descripción de la card ' . ($index + 1) . '.',
    ];
}

$card_count = count($cards);

/*
 * =====================================================
 * DISEÑO GENERAL
 * =====================================================
 */

$card_height = max(
    350,
    min(800, intval($attributes['cardHeight'] ?? 560))
);

$card_gap = max(
    0,
    min(60, intval($attributes['cardGap'] ?? 24))
);

$overlay = max(
    0,
    min(90, intval($attributes['overlay'] ?? 45))
);

/*
 * =====================================================
 * TÍTULO
 * =====================================================
 */

$title_color = sanitize_hex_color(
    $attributes['titleColor'] ?? '#ffffff'
) ?: '#ffffff';

$title_size = max(
    16,
    min(60, intval($attributes['titleSize'] ?? 28))
);

$title_weight = (string) ($attributes['titleWeight'] ?? '600');

if (!in_array($title_weight, ['400', '500', '600', '700'], true)) {
    $title_weight = '600';
}

$title_align = (string) ($attributes['titleAlign'] ?? 'left');

if (!in_array($title_align, ['left', 'center', 'right', 'justify'], true)) {
    $title_align = 'left';
}

/*
 * =====================================================
 * DESCRIPCIÓN
 * =====================================================
 */

$description_color = sanitize_hex_color(
    $attributes['descriptionColor'] ?? '#ffffff'
) ?: '#ffffff';

$description_size = max(
    12,
    min(36, intval($attributes['descriptionSize'] ?? 16))
);

$description_weight = (string) ($attributes['descriptionWeight'] ?? '400');

if (!in_array($description_weight, ['400', '500', '600', '700'], true)) {
    $description_weight = '400';
}

$description_align = (string) (
    $attributes['descriptionAlign'] ?? 'left'
);

if (!in_array(
    $description_align,
    ['left', 'center', 'right', 'justify'],
    true
)) {
    $description_align = 'left';
}

/*
 * =====================================================
 * MÁRGENES
 * =====================================================
 */

$margin_top = max(
    0,
    min(200, intval($attributes['blockMarginTop'] ?? 0))
);

$margin_bottom = max(
    0,
    min(200, intval($attributes['blockMarginBottom'] ?? 0))
);

/*
 * =====================================================
 * VARIABLES CSS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-card-columns:%1$d;
     --cosmos-card-height:%2$dpx;
     --cosmos-card-gap:%3$dpx;
     --cosmos-card-overlay:%4$s;
     --cosmos-card-title-color:%5$s;
     --cosmos-card-title-size:%6$dpx;
     --cosmos-card-title-weight:%7$s;
     --cosmos-card-title-align:%8$s;
     --cosmos-card-description-color:%9$s;
     --cosmos-card-description-size:%10$dpx;
     --cosmos-card-description-weight:%11$s;
     --cosmos-card-description-align:%12$s;
     --cosmos-block-margin-top:%13$dpx;
     --cosmos-block-margin-bottom:%14$dpx;',
    $card_count,
    $card_height,
    $card_gap,
    $overlay / 100,
    $title_color,
    $title_size,
    $title_weight,
    $title_align,
    $description_color,
    $description_size,
    $description_weight,
    $description_align,
    $margin_top,
    $margin_bottom
);

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => 'cosmos-image-cards',
        'style' => $style,
    ]);
    ?>
>
    <div class="container">
        <div class="cosmos-image-cards__grid">

            <?php foreach ($cards as $card) : ?>

                <?php
                $image_url = esc_url($card['imageUrl'] ?? '');
                $image_alt = sanitize_text_field($card['imageAlt'] ?? '');
                $title = $card['title'] ?? '';
                $description = $card['description'] ?? '';
                ?>

                <article
                    class="cosmos-image-cards__card"
                    <?php if ($image_url) : ?>
                        style="background-image:
                            linear-gradient(
                                rgba(0, 0, 0, var(--cosmos-card-overlay)),
                                rgba(0, 0, 0, var(--cosmos-card-overlay))
                            ),
                            url('<?php echo esc_url($image_url); ?>');"
                    <?php endif; ?>
                    <?php if ($image_alt !== '') : ?>
                        aria-label="<?php echo esc_attr($image_alt); ?>"
                    <?php endif; ?>
                >
                    <div class="cosmos-image-cards__content">

                        <?php if ($title !== '') : ?>
                            <div class="cosmos-image-cards__title-area">
                                <h3 class="cosmos-image-cards__title">
                                    <?php echo wp_kses_post($title); ?>
                                </h3>
                            </div>
                        <?php endif; ?>

                        <?php if ($description !== '') : ?>
                            <div class="cosmos-image-cards__description-area">
                                <div class="cosmos-image-cards__description">
                                    <?php echo wp_kses_post($description); ?>
                                </div>
                            </div>
                        <?php endif; ?>

                    </div>
                </article>

            <?php endforeach; ?>

        </div>
    </div>
</section>
