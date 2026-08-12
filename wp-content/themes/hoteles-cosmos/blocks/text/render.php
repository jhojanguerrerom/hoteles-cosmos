<?php

$classes = array(
    'cosmos-text',
    'cosmos-text--' . sanitize_html_class($attributes['containerWidth'] ?? 'container')
);

$show_title = !empty($attributes['showTitle']);
$show_paragraph = !empty($attributes['showParagraph']);

$title_tag = $attributes['titleTag'] ?? 'h2';

$allowed_title_tags = array(
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
);

if (!in_array($title_tag, $allowed_title_tags, true)) {
    $title_tag = 'h2';
}


$title_font_size = intval($attributes['titleFontSize'] ?? 42);
$title_color = $attributes['titleColor'] ?? '#111111';
$title_weight = intval($attributes['titleFontWeight'] ?? 400);

$paragraph_font_size = intval($attributes['paragraphFontSize'] ?? 17);
$paragraph_color = $attributes['paragraphColor'] ?? '#333333';
$paragraph_weight = intval($attributes['paragraphFontWeight'] ?? 400);

$text_align = $attributes['textAlign'] ?? 'left';
$paragraph_align = $attributes['paragraphAlign'] ?? 'left';


$title = $attributes['title'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';


$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => implode(' ', $classes)
    )
);

?>

<div <?php echo $wrapper_attributes; ?>>

    <?php if ($show_title && $title !== '') : ?>

        <<?php echo esc_html($title_tag); ?>
            class="cosmos-text__title"
            style="
                font-size: <?php echo esc_attr($title_font_size); ?>px;
                color: <?php echo esc_attr($title_color); ?>;
                font-weight: <?php echo esc_attr($title_weight); ?>;
                text-align: <?php echo esc_attr($text_align); ?>;
            "
        >

            <?php
            echo wp_kses_post($title);
            ?>

        </<?php echo esc_html($title_tag); ?>>

    <?php endif; ?>


    <?php if ($show_paragraph && $paragraph !== '') : ?>

        <div
            class="cosmos-text__paragraph"
            style="
                font-size: <?php echo esc_attr($paragraph_font_size); ?>px;
                color: <?php echo esc_attr($paragraph_color); ?>;
                font-weight: <?php echo esc_attr($paragraph_weight); ?>;
                text-align: <?php echo esc_attr($paragraph_align); ?>;
            "
        >

            <?php
            echo wp_kses_post($paragraph);
            ?>

        </div>

    <?php endif; ?>

</div>