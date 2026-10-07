<?php

/*
|--------------------------------------------------------------------------
| CONFIGURACIÓN GENERAL
|--------------------------------------------------------------------------
*/

$width =
    $attributes['width'] ?? 'container';

$alignment =
    $attributes['alignment'] ?? 'left';

$background_color =
    $attributes['backgroundColor'] ?? '#FFFFFF';

$margin_top =
    intval($attributes['marginTop'] ?? 50);

$margin_bottom =
    intval($attributes['marginBottom'] ?? 50);


/*
|--------------------------------------------------------------------------
| TAG
|--------------------------------------------------------------------------
*/

$show_tag =
    !empty($attributes['showTag']);

$tag_text =
    $attributes['tagText'] ?? 'TAG';

$tag_color =
    $attributes['tagColor'] ?? '#111111';

$tag_background =
    $attributes['tagBackground'] ?? '#F5F5F5';

$tag_font_size =
    intval($attributes['tagFontSize'] ?? 12);

$tag_font_weight =
    intval($attributes['tagFontWeight'] ?? 600);

$tag_padding_top =
    intval($attributes['tagPaddingTop'] ?? 6);

$tag_padding_right =
    intval($attributes['tagPaddingRight'] ?? 12);

$tag_padding_bottom =
    intval($attributes['tagPaddingBottom'] ?? 6);

$tag_padding_left =
    intval($attributes['tagPaddingLeft'] ?? 12);

$tag_margin_top =
    intval($attributes['tagMarginTop'] ?? 0);

$tag_margin_bottom =
    intval($attributes['tagMarginBottom'] ?? 20);

$tag_border_radius =
    intval($attributes['tagBorderRadius'] ?? 0);


/*
|--------------------------------------------------------------------------
| TÍTULO
|--------------------------------------------------------------------------
*/

$show_title =
    !empty($attributes['showTitle']);

$title =
    $attributes['title'] ?? '';

$title_color =
    $attributes['titleColor'] ?? '#111111';

$title_font_size =
    intval($attributes['titleFontSize'] ?? 42);

$title_font_weight =
    intval($attributes['titleFontWeight'] ?? 600);

$title_line_height =
    floatval($attributes['titleLineHeight'] ?? 1.2);

$title_margin_top =
    intval($attributes['titleMarginTop'] ?? 0);

$title_margin_bottom =
    intval($attributes['titleMarginBottom'] ?? 20);


/*
|--------------------------------------------------------------------------
| DESCRIPCIÓN
|--------------------------------------------------------------------------
*/

$show_description =
    !empty($attributes['showDescription']);

$description =
    $attributes['description'] ?? '';

$description_color =
    $attributes['descriptionColor'] ?? '#333333';

$description_font_size =
    intval($attributes['descriptionFontSize'] ?? 18);

$description_font_weight =
    intval($attributes['descriptionFontWeight'] ?? 400);

$description_line_height =
    floatval($attributes['descriptionLineHeight'] ?? 1.5);

$description_margin_top =
    intval($attributes['descriptionMarginTop'] ?? 0);

$description_margin_bottom =
    intval($attributes['descriptionMarginBottom'] ?? 25);


/*
|--------------------------------------------------------------------------
| BOTÓN
|--------------------------------------------------------------------------
*/

$show_button =
    !empty($attributes['showButton']);

$button_text =
    $attributes['buttonText'] ?? 'Conoce más';

$button_url =
    $attributes['buttonUrl'] ?? '#';

$button_target =
    $attributes['buttonTarget'] ?? '_self';

$button_color =
    $attributes['buttonColor'] ?? '#FFFFFF';

$button_background =
    $attributes['buttonBackground'] ?? '#111111';

$button_hover_color =
    $attributes['buttonHoverColor'] ?? '#FFFFFF';

$button_hover_background =
    $attributes['buttonHoverBackground'] ?? '#333333';

$button_font_size =
    intval($attributes['buttonFontSize'] ?? 16);

$button_font_weight =
    intval($attributes['buttonFontWeight'] ?? 500);

$button_padding_top =
    intval($attributes['buttonPaddingTop'] ?? 12);

$button_padding_right =
    intval($attributes['buttonPaddingRight'] ?? 24);

$button_padding_bottom =
    intval($attributes['buttonPaddingBottom'] ?? 12);

$button_padding_left =
    intval($attributes['buttonPaddingLeft'] ?? 24);

$button_border_color =
    $attributes['buttonBorderColor'] ?? '#111111';

$button_border_width =
    intval($attributes['buttonBorderWidth'] ?? 1);

$button_border_radius =
    intval($attributes['buttonBorderRadius'] ?? 0);

$button_margin_top =
    intval($attributes['buttonMarginTop'] ?? 0);

$button_margin_bottom =
    intval($attributes['buttonMarginBottom'] ?? 0);


/*
|--------------------------------------------------------------------------
| VARIABLES CSS
|--------------------------------------------------------------------------
*/

$style = sprintf(

    '--cosmos-content-background:%s;
     --cosmos-content-margin-top:%dpx;
     --cosmos-content-margin-bottom:%dpx;

     --cosmos-content-tag-color:%s;
     --cosmos-content-tag-background:%s;
     --cosmos-content-tag-size:%dpx;
     --cosmos-content-tag-weight:%d;
     --cosmos-content-tag-padding-top:%dpx;
     --cosmos-content-tag-padding-right:%dpx;
     --cosmos-content-tag-padding-bottom:%dpx;
     --cosmos-content-tag-padding-left:%dpx;
     --cosmos-content-tag-margin-top:%dpx;
     --cosmos-content-tag-margin-bottom:%dpx;
     --cosmos-content-tag-radius:%dpx;

     --cosmos-content-title-color:%s;
     --cosmos-content-title-size:%dpx;
     --cosmos-content-title-weight:%d;
     --cosmos-content-title-line-height:%s;
     --cosmos-content-title-margin-top:%dpx;
     --cosmos-content-title-margin-bottom:%dpx;

     --cosmos-content-description-color:%s;
     --cosmos-content-description-size:%dpx;
     --cosmos-content-description-weight:%d;
     --cosmos-content-description-line-height:%s;
     --cosmos-content-description-margin-top:%dpx;
     --cosmos-content-description-margin-bottom:%dpx;

     --cosmos-content-button-color:%s;
     --cosmos-content-button-background:%s;
     --cosmos-content-button-hover-color:%s;
     --cosmos-content-button-hover-background:%s;
     --cosmos-content-button-size:%dpx;
     --cosmos-content-button-weight:%d;
     --cosmos-content-button-padding-top:%dpx;
     --cosmos-content-button-padding-right:%dpx;
     --cosmos-content-button-padding-bottom:%dpx;
     --cosmos-content-button-padding-left:%dpx;
     --cosmos-content-button-border-color:%s;
     --cosmos-content-button-border-width:%dpx;
     --cosmos-content-button-radius:%dpx;
     --cosmos-content-button-margin-top:%dpx;
     --cosmos-content-button-margin-bottom:%dpx;',

    esc_attr($background_color),
    $margin_top,
    $margin_bottom,

    esc_attr($tag_color),
    esc_attr($tag_background),
    $tag_font_size,
    $tag_font_weight,
    $tag_padding_top,
    $tag_padding_right,
    $tag_padding_bottom,
    $tag_padding_left,
    $tag_margin_top,
    $tag_margin_bottom,
    $tag_border_radius,

    esc_attr($title_color),
    $title_font_size,
    $title_font_weight,
    $title_line_height,
    $title_margin_top,
    $title_margin_bottom,

    esc_attr($description_color),
    $description_font_size,
    $description_font_weight,
    $description_line_height,
    $description_margin_top,
    $description_margin_bottom,

    esc_attr($button_color),
    esc_attr($button_background),
    esc_attr($button_hover_color),
    esc_attr($button_hover_background),
    $button_font_size,
    $button_font_weight,
    $button_padding_top,
    $button_padding_right,
    $button_padding_bottom,
    $button_padding_left,
    esc_attr($button_border_color),
    $button_border_width,
    $button_border_radius,
    $button_margin_top,
    $button_margin_bottom
);


/*
|--------------------------------------------------------------------------
| CLASES
|--------------------------------------------------------------------------
*/

$classes =
    'cosmos-content' .
    ' cosmos-content--' .
    esc_attr($width) .
    ' cosmos-content--align-' .
    esc_attr($alignment);


/*
|--------------------------------------------------------------------------
| ATRIBUTOS DEL BLOQUE
|--------------------------------------------------------------------------
*/

$wrapper_attributes =
    get_block_wrapper_attributes(
        array(
            'class' => $classes,
            'style' => $style
        )
    );


/*
|--------------------------------------------------------------------------
| BLOQUE
|--------------------------------------------------------------------------
*/

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="cosmos-content__inner">


        <?php if ($show_tag && $tag_text) : ?>

            <div class="cosmos-content__tag">

                <?php
                echo wp_kses_post($tag_text);
                ?>

            </div>

        <?php endif; ?>


        <?php if ($show_title && $title) : ?>

            <h2 class="cosmos-content__title">

                <?php
                echo wp_kses_post($title);
                ?>

            </h2>

        <?php endif; ?>


        <?php if ($show_description && $description) : ?>

            <div class="cosmos-content__description">

                <?php
                echo wp_kses_post($description);
                ?>

            </div>

        <?php endif; ?>


        <?php if ($show_button && $button_text) : ?>

            <div class="cosmos-content__button-wrapper">

                <a
                    class="cosmos-content__button"
                    href="<?php echo esc_url($button_url); ?>"
                    target="<?php echo esc_attr($button_target); ?>"
                    <?php if ($button_target === '_blank') : ?>
                        rel="noopener noreferrer"
                    <?php endif; ?>
                >

                    <?php
                    echo wp_kses_post($button_text);
                    ?>

                </a>

            </div>

        <?php endif; ?>


    </div>

</section>