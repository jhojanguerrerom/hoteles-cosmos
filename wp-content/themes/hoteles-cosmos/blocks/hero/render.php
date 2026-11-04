<?php
/*
 * HERO COSMOS
 * Renderizado dinámico del bloque.
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';

$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';

$button_text = $attributes['buttonText'] ?? '';
$button_url = $attributes['buttonUrl'] ?? '';

$overlay = isset($attributes['overlay']) ? (int) $attributes['overlay'] : 55;
$content_width = $attributes['contentWidth'] ?? 'medium';
$content_position = $attributes['contentPosition'] ?? 'left';
$valid_positions = ['left', 'center', 'right', 'center-banner'];
$content_position = in_array($content_position, $valid_positions, true) ? $content_position : 'left';

$eyebrow_size = isset($attributes['eyebrowSize']) ? (int) $attributes['eyebrowSize'] : 13;
$eyebrow_color = $attributes['eyebrowColor'] ?? 'rgba(255, 255, 255, 0.78)';
$eyebrow_align = $attributes['eyebrowAlign'] ?? 'left';
$eyebrow_weight = (string) ($attributes['eyebrowWeight'] ?? '600');

$title_size = isset($attributes['titleSize']) ? (int) $attributes['titleSize'] : 64;
$title_color = $attributes['titleColor'] ?? '#ffffff';
$title_align = $attributes['titleAlign'] ?? 'left';
$title_weight = (string) ($attributes['titleWeight'] ?? '700');

$subtitle_size = isset($attributes['subtitleSize']) ? (int) $attributes['subtitleSize'] : 18;
$subtitle_color = $attributes['subtitleColor'] ?? '#ffffff';
$subtitle_align = $attributes['subtitleAlign'] ?? 'left';
$subtitle_weight = (string) ($attributes['subtitleWeight'] ?? '500');

$overlay = max(0, min(90, $overlay));
$overlay_opacity = $overlay / 100;

$content_widths = [
    'small' => '760px',
    'medium' => '900px',
    'large' => '1100px',
];
$content_max_width = $content_widths[$content_width] ?? $content_widths['medium'];

$valid_alignments = ['left', 'center', 'right'];
$eyebrow_align = in_array($eyebrow_align, $valid_alignments, true) ? $eyebrow_align : 'left';
$title_align = in_array($title_align, $valid_alignments, true) ? $title_align : 'left';
$subtitle_align = in_array($subtitle_align, $valid_alignments, true) ? $subtitle_align : 'left';

$eyebrow_size = max(8, min(32, $eyebrow_size));
$title_size = max(24, min(120, $title_size));
$subtitle_size = max(10, min(48, $subtitle_size));

$valid_weights = ['400', '500', '600', '700'];
$eyebrow_weight = in_array($eyebrow_weight, $valid_weights, true) ? $eyebrow_weight : '600';
$title_weight = in_array($title_weight, $valid_weights, true) ? $title_weight : '700';
$subtitle_weight = in_array($subtitle_weight, $valid_weights, true) ? $subtitle_weight : '500';

$eyebrow_style = sprintf(
    'font-size:%dpx;color:%s;text-align:%s;font-weight:%s;',
    $eyebrow_size, esc_attr($eyebrow_color), esc_attr($eyebrow_align), esc_attr($eyebrow_weight)
);
$title_style = sprintf(
    'font-size:clamp(32px, %svw, %dpx);color:%s;text-align:%s;font-weight:%s;',
    esc_attr((string) max(2, $title_size / 16)), $title_size,
    esc_attr($title_color), esc_attr($title_align), esc_attr($title_weight)
);
$subtitle_style = sprintf(
    'font-size:%dpx;color:%s;text-align:%s;font-weight:%s;',
    $subtitle_size, esc_attr($subtitle_color), esc_attr($subtitle_align), esc_attr($subtitle_weight)
);
?>

<section <?php echo get_block_wrapper_attributes([
    'class' => 'cosmos-hero cosmos-hero--' . sanitize_html_class($content_width) . ' cosmos-hero--position-' . sanitize_html_class($content_position),
]); ?>>
    <?php if ($image_url) : ?>
        <img
            class="cosmos-hero__image"
            src="<?php echo esc_url($image_url); ?>"
            alt="<?php echo esc_attr($image_alt); ?>"
            loading="eager"
            fetchpriority="high"
        >
    <?php endif; ?>

    <div class="cosmos-hero__overlay"
         style="opacity: <?php echo esc_attr((string) $overlay_opacity); ?>;"
         aria-hidden="true"></div>

    <div class="container">
        <div class="cosmos-hero__content cosmos-hero__content--<?php echo esc_attr(sanitize_html_class($content_width)); ?>"
             style="max-width: <?php echo esc_attr($content_max_width); ?>;">
            <?php if ($eyebrow) : ?>
                <div class="cosmos-hero__eyebrow" style="<?php echo esc_attr($eyebrow_style); ?>">
                    <?php echo wp_kses_post($eyebrow); ?>
                </div>
            <?php endif; ?>

            <?php if ($title) : ?>
                <h1 class="cosmos-hero__title" style="<?php echo esc_attr($title_style); ?>">
                    <?php echo wp_kses_post($title); ?>
                </h1>
            <?php endif; ?>

            <?php if ($subtitle) : ?>
                <h2 class="cosmos-hero__subtitle" style="<?php echo esc_attr($subtitle_style); ?>">
                    <?php echo wp_kses_post($subtitle); ?>
                </h2>
            <?php endif; ?>

            <?php if ($button_text && $button_url) : ?>
                <a class="cosmos-hero__button" href="<?php echo esc_url($button_url); ?>">
                    <?php echo esc_html($button_text); ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>
