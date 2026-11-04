<?php

$image_one_url = $attributes['imageOneUrl'] ?? '';
$image_one_alt = $attributes['imageOneAlt'] ?? '';

$image_two_url = $attributes['imageTwoUrl'] ?? '';
$image_two_alt = $attributes['imageTwoAlt'] ?? '';

$title = $attributes['title'] ?? '';
$highlight = $attributes['highlight'] ?? '';
$content = $attributes['content'] ?? '';

$has_image_one = !empty($image_one_url);
$has_image_two = !empty($image_two_url);

$images_count = ($has_image_one ? 1 : 0) + ($has_image_two ? 1 : 0);
$images_modifier_class = '';

if ($images_count === 1) {
    $images_modifier_class = ' is-single-image';
} elseif ($images_count === 2) {
    $images_modifier_class = ' is-double-images';
}

?>

<section <?php echo get_block_wrapper_attributes([
    'class' => 'cosmos-overlap-content'
]); ?>>

    <div class="container">

        <div class="cosmos-overlap-content__grid">

            <!-- =============================================
                 IMÁGENES
            ============================================== -->
            <?php if ($images_count > 0) : ?>
                <div class="cosmos-overlap-content__images<?php echo esc_attr($images_modifier_class); ?>">

                    <?php if ($has_image_one) : ?>
                        <div class="cosmos-overlap-content__image-one">
                            <img
                                src="<?php echo esc_url($image_one_url); ?>"
                                alt="<?php echo esc_attr($image_one_alt); ?>"
                                loading="lazy"
                            />
                        </div>
                    <?php endif; ?>

                    <?php if ($has_image_two) : ?>
                        <div class="cosmos-overlap-content__image-two">
                            <img
                                src="<?php echo esc_url($image_two_url); ?>"
                                alt="<?php echo esc_attr($image_two_alt); ?>"
                                loading="lazy"
                            />
                        </div>
                    <?php endif; ?>

                </div>
            <?php endif; ?>

            <!-- =============================================
                 CONTENIDO
            ============================================== -->
            <div class="cosmos-overlap-content__text">

                <?php if ($title) : ?>
                    <h2 class="cosmos-overlap-content__title">
                        <?php echo wp_kses_post($title); ?>
                    </h2>
                <?php endif; ?>

                <?php if ($highlight) : ?>
                    <strong class="cosmos-overlap-content__highlight">
                        <?php echo wp_kses_post($highlight); ?>
                    </strong>
                <?php endif; ?>

                <?php if ($content) : ?>
                    <div class="cosmos-overlap-content__description">
                        <?php echo wp_kses_post($content); ?>
                    </div>
                <?php endif; ?>

            </div>

        </div>

    </div>

</section>