<?php

$columns = intval(
    $attributes['columns'] ?? 3
);

$columns = max(1, min(4, $columns));


$width_mode = $attributes['widthMode'] ?? 'container';


$gap = intval(
    $attributes['gap'] ?? 20
);

$gap = max(0, min(80, $gap));


$image_height = intval(
    $attributes['imageHeight'] ?? 420
);

$image_height = max(150, min(800, $image_height));


$border_radius = intval(
    $attributes['borderRadius'] ?? 0
);

$border_radius = max(0, min(50, $border_radius));


$images = array();


for ($i = 1; $i <= 4; $i++) {

    $url = $attributes["image{$i}Url"] ?? '';
    $alt = $attributes["image{$i}Alt"] ?? '';

    if (!empty($url)) {

        $images[] = array(
            'url' => $url,
            'alt' => $alt
        );
    }
}


$classes = array(
    'cosmos-gallery',
    'cosmos-gallery--' . sanitize_html_class($width_mode),
    'wp-block-hoteles-cosmos-gallery'
);


$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => implode(' ', $classes)
    )
);

?>

<div <?php echo $wrapper_attributes; ?>>

    <div
        class="cosmos-gallery__inner"
        style="
            --cosmos-gallery-columns: <?php echo esc_attr($columns); ?>;
            --cosmos-gallery-gap: <?php echo esc_attr($gap); ?>px;
            --cosmos-gallery-height: <?php echo esc_attr($image_height); ?>px;
            --cosmos-gallery-radius: <?php echo esc_attr($border_radius); ?>px;
        "
    >

        <?php foreach ($images as $image) : ?>

            <figure class="cosmos-gallery__item">

                <img
                    class="cosmos-gallery__img"
                    src="<?php echo esc_url($image['url']); ?>"
                    alt="<?php echo esc_attr($image['alt']); ?>"
                    loading="lazy"
                >

            </figure>

        <?php endforeach; ?>

    </div>

</div>