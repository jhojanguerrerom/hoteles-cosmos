<?php

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';

$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';

$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '';

$overlay = isset($attributes['overlay'])
    ? (int) $attributes['overlay']
    : 55;

$content_width = $attributes['contentWidth'] ?? 'medium';

$overlay = max(0, min(90, $overlay));

$overlay_opacity = $overlay / 100;

?>

<section
    <?php echo get_block_wrapper_attributes([
        'class' => 'cosmos-hero cosmos-hero--' . sanitize_html_class($content_width),
    ]); ?>
>

    <?php if ($image_url) : ?>

        <img
            class="cosmos-hero__image"
            src="<?php echo esc_url($image_url); ?>"
            alt="<?php echo esc_attr($image_alt); ?>"
            loading="eager"
            fetchpriority="high"
        >

    <?php endif; ?>


    <div
        class="cosmos-hero__overlay"
        style="opacity: <?php echo esc_attr($overlay_opacity); ?>;"
        aria-hidden="true"
    ></div>


    <div class="container">

        <div class="cosmos-hero__content">


            <?php if ($eyebrow) : ?>

                <div class="cosmos-hero__eyebrow">
                    <?php echo wp_kses_post($eyebrow); ?>
                </div>

            <?php endif; ?>


            <?php if ($title) : ?>

                <h1 class="cosmos-hero__title">
                    <?php echo wp_kses_post($title); ?>
                </h1>

            <?php endif; ?>


            <?php if ($subtitle) : ?>

                <h2 class="cosmos-hero__subtitle">
                    <?php echo wp_kses_post($subtitle); ?>
                </h2>

            <?php endif; ?>


            <?php if ($button_text && $button_url) : ?>

                <a
                    class="cosmos-hero__button"
                    href="<?php echo esc_url($button_url); ?>"
                >
                    <?php echo esc_html($button_text); ?>
                </a>

            <?php endif; ?>


        </div>

    </div>

</section>