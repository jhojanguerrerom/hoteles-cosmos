<?php

$image_id = isset($attributes['imageId'])
    ? intval($attributes['imageId'])
    : 0;

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';

$width_mode = isset($attributes['widthMode'])
    ? $attributes['widthMode']
    : 'container';

$image_width = isset($attributes['imageWidth'])
    ? $attributes['imageWidth']
    : 'auto';

$alignment = isset($attributes['alignment'])
    ? $attributes['alignment']
    : 'center';

$border_radius = isset($attributes['borderRadius'])
    ? intval($attributes['borderRadius'])
    : 0;


/*
 * =====================================================
 * SEGURIDAD
 * =====================================================
 */

$allowed_width_modes = array(
    'container',
    'full'
);

$allowed_image_widths = array(
    'auto',
    'full'
);

$allowed_alignments = array(
    'left',
    'center',
    'right'
);


if (!in_array($width_mode, $allowed_width_modes, true)) {
    $width_mode = 'container';
}

if (!in_array($image_width, $allowed_image_widths, true)) {
    $image_width = 'auto';
}

if (!in_array($alignment, $allowed_alignments, true)) {
    $alignment = 'center';
}


/*
 * El radio nunca puede ser menor que 0
 * ni mayor que 50.
 */

$border_radius = max(
    0,
    min(50, $border_radius)
);


/*
 * =====================================================
 * SI EXISTE ID DE WORDPRESS
 * =====================================================
 */

if ($image_id) {

    $image_url_from_wp = wp_get_attachment_image_url(
        $image_id,
        'full'
    );

    if ($image_url_from_wp) {
        $image_url = $image_url_from_wp;
    }

    $image_alt_from_wp = get_post_meta(
        $image_id,
        '_wp_attachment_image_alt',
        true
    );

    if ($image_alt_from_wp) {
        $image_alt = $image_alt_from_wp;
    }
}


/*
 * =====================================================
 * SI NO HAY IMAGEN
 * =====================================================
 */

if (!$image_url) {
    return;
}


/*
 * =====================================================
 * CLASES
 * =====================================================
 */

$classes = array(
    'cosmos-image',
    'cosmos-image--' . $width_mode,
    'cosmos-image--' . $image_width,
    'cosmos-image--align-' . $alignment
);


/*
 * =====================================================
 * ESTILO
 * =====================================================
 */

$image_style = sprintf(
    'border-radius:%dpx;',
    $border_radius
);

?>

<div <?php echo get_block_wrapper_attributes(array(
    'class' => implode(' ', $classes)
)); ?>>

    <div class="cosmos-image__inner">

        <img
            class="cosmos-image__img"
            src="<?php echo esc_url($image_url); ?>"
            alt="<?php echo esc_attr($image_alt); ?>"
            style="<?php echo esc_attr($image_style); ?>"
            loading="lazy"
        >

    </div>

</div>