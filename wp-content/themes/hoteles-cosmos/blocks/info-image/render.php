<?php

/**
 * Render del bloque Información + Imagen.
 *
 * @var array    $attributes
 * @var string   $content
 * @var WP_Block $block
 */


/*
 * DISTRIBUCIÓN
 */

$text_width = isset($attributes['textWidth'])
    ? absint($attributes['textWidth'])
    : 60;

$text_width = max(20, min(80, $text_width));

$image_width = 100 - $text_width;


$column_gap = isset($attributes['columnGap'])
    ? absint($attributes['columnGap'])
    : 8;


/*
 * ORDEN
 */

$first_column = isset($attributes['firstColumn'])
    ? $attributes['firstColumn']
    : 'text';

if (!in_array($first_column, array('text', 'image'), true)) {
    $first_column = 'text';
}


/*
 * MÁRGENES
 */

$margin_top = isset($attributes['marginTop'])
    ? absint($attributes['marginTop'])
    : 0;

$margin_bottom = isset($attributes['marginBottom'])
    ? absint($attributes['marginBottom'])
    : 0;


/*
 * FONDO TEXTO
 */

$text_background = isset($attributes['textBackground'])
    ? $attributes['textBackground']
    : '#F5F1EA';


/*
 * IMAGEN
 */

$image_id = isset($attributes['imageId'])
    ? absint($attributes['imageId'])
    : 0;

$image_url = isset($attributes['imageUrl'])
    ? $attributes['imageUrl']
    : '';

$image_alt = isset($attributes['imageAlt'])
    ? $attributes['imageAlt']
    : '';

$image_position = isset($attributes['imagePosition'])
    ? $attributes['imagePosition']
    : 'center';

$allowed_image_positions = array(
    'center',
    'top',
    'bottom',
    'left',
    'right'
);

if (!in_array($image_position, $allowed_image_positions, true)) {
    $image_position = 'center';
}

if (!$image_url && $image_id) {

    $image_url = wp_get_attachment_image_url(
        $image_id,
        'full'
    );

}

if (!$image_alt && $image_id) {

    $image_alt = get_post_meta(
        $image_id,
        '_wp_attachment_image_alt',
        true
    );

}


/*
 * TAG
 */

$tag_enabled = isset($attributes['tagEnabled'])
    ? (bool) $attributes['tagEnabled']
    : true;

$tag_text = isset($attributes['tagText'])
    ? $attributes['tagText']
    : 'CONTACTO';

$tag_position = isset($attributes['tagPosition'])
    ? $attributes['tagPosition']
    : 'left';

$tag_background = isset($attributes['tagBackground'])
    ? $attributes['tagBackground']
    : '#000000';

$tag_color = isset($attributes['tagColor'])
    ? $attributes['tagColor']
    : '#ffffff';

$tag_size = isset($attributes['tagSize'])
    ? absint($attributes['tagSize'])
    : 12;

$tag_weight = isset($attributes['tagWeight'])
    ? $attributes['tagWeight']
    : '600';

$tag_padding_horizontal = isset($attributes['tagPaddingHorizontal'])
    ? absint($attributes['tagPaddingHorizontal'])
    : 18;

$tag_padding_vertical = isset($attributes['tagPaddingVertical'])
    ? absint($attributes['tagPaddingVertical'])
    : 10;


/*
 * TÍTULO
 */

$title = isset($attributes['title'])
    ? $attributes['title']
    : 'Contáctanos';

$title_color = isset($attributes['titleColor'])
    ? $attributes['titleColor']
    : '#222222';

$title_size = isset($attributes['titleSize'])
    ? absint($attributes['titleSize'])
    : 42;

$title_weight = isset($attributes['titleWeight'])
    ? $attributes['titleWeight']
    : '700';

$title_align = isset($attributes['titleAlign'])
    ? $attributes['titleAlign']
    : 'left';

$title_line_height = isset($attributes['titleLineHeight'])
    ? (float) $attributes['titleLineHeight']
    : 1.15;

$title_margin_bottom = isset($attributes['titleMarginBottom'])
    ? absint($attributes['titleMarginBottom'])
    : 30;


/*
 * INFORMACIÓN
 */

$info_align = isset($attributes['infoAlign'])
    ? $attributes['infoAlign']
    : 'left';

$info_text_color = isset($attributes['infoTextColor'])
    ? $attributes['infoTextColor']
    : '#333333';

$info_text_size = isset($attributes['infoTextSize'])
    ? absint($attributes['infoTextSize'])
    : 16;

$info_text_weight = isset($attributes['infoTextWeight'])
    ? $attributes['infoTextWeight']
    : '400';

$info_icon_color = isset($attributes['infoIconColor'])
    ? $attributes['infoIconColor']
    : '#333333';

$info_icon_size = isset($attributes['infoIconSize'])
    ? absint($attributes['infoIconSize'])
    : 20;

$info_item_spacing = isset($attributes['infoItemSpacing'])
    ? absint($attributes['infoItemSpacing'])
    : 14;


$address_enabled = isset($attributes['addressEnabled'])
    ? (bool) $attributes['addressEnabled']
    : true;

$address = isset($attributes['address'])
    ? $attributes['address']
    : 'Carrera 43 # 10-25';


$phone_enabled = isset($attributes['phoneEnabled'])
    ? (bool) $attributes['phoneEnabled']
    : true;

$phone = isset($attributes['phone'])
    ? $attributes['phone']
    : '+57 300 000 0000';


$email_enabled = isset($attributes['emailEnabled'])
    ? (bool) $attributes['emailEnabled']
    : true;

$email = isset($attributes['email'])
    ? $attributes['email']
    : 'reservas@hotel.com';


/*
 * BOTONES
 */

$buttons_count = isset($attributes['buttonsCount'])
    ? absint($attributes['buttonsCount'])
    : 2;

$buttons_count = max(0, min(2, $buttons_count));


$button_gap = isset($attributes['buttonGap'])
    ? absint($attributes['buttonGap'])
    : 16;

$button_width = isset($attributes['buttonWidth'])
    ? absint($attributes['buttonWidth'])
    : 160;

$button_height = isset($attributes['buttonHeight'])
    ? absint($attributes['buttonHeight'])
    : 46;

$button_text_size = isset($attributes['buttonTextSize'])
    ? absint($attributes['buttonTextSize'])
    : 14;

$button_text_weight = isset($attributes['buttonTextWeight'])
    ? $attributes['buttonTextWeight']
    : '600';

$button_text_color = isset($attributes['buttonTextColor'])
    ? $attributes['buttonTextColor']
    : '#ffffff';

$button_background = isset($attributes['buttonBackground'])
    ? $attributes['buttonBackground']
    : '#000000';

$button_border_color = isset($attributes['buttonBorderColor'])
    ? $attributes['buttonBorderColor']
    : '#000000';

$button_border_width = isset($attributes['buttonBorderWidth'])
    ? absint($attributes['buttonBorderWidth'])
    : 1;

$button_border_radius = isset($attributes['buttonBorderRadius'])
    ? absint($attributes['buttonBorderRadius'])
    : 4;


$button_1_text = isset($attributes['button1Text'])
    ? $attributes['button1Text']
    : 'Reservar';

$button_1_url = isset($attributes['button1Url'])
    ? $attributes['button1Url']
    : '#';


$button_2_text = isset($attributes['button2Text'])
    ? $attributes['button2Text']
    : 'Contactar';

$button_2_url = isset($attributes['button2Url'])
    ? $attributes['button2Url']
    : '#';


/*
 * VARIABLES CSS
 */

$style = sprintf(
    '--cosmos-info-text-width:%d%%;
     --cosmos-info-image-width:%d%%;
     --cosmos-info-column-gap:%dpx;
     --cosmos-info-margin-top:%dpx;
     --cosmos-info-margin-bottom:%dpx;

     --cosmos-info-text-background:%s;

     --cosmos-info-tag-background:%s;
     --cosmos-info-tag-color:%s;
     --cosmos-info-tag-size:%dpx;
     --cosmos-info-tag-weight:%s;
     --cosmos-info-tag-padding-x:%dpx;
     --cosmos-info-tag-padding-y:%dpx;

     --cosmos-info-title-color:%s;
     --cosmos-info-title-size:%dpx;
     --cosmos-info-title-weight:%s;
     --cosmos-info-title-align:%s;
     --cosmos-info-title-line-height:%s;
     --cosmos-info-title-margin-bottom:%dpx;

     --cosmos-info-align:%s;
     --cosmos-info-text-color:%s;
     --cosmos-info-text-size:%dpx;
     --cosmos-info-text-weight:%s;
     --cosmos-info-icon-color:%s;
     --cosmos-info-icon-size:%dpx;
     --cosmos-info-item-spacing:%dpx;

     --cosmos-info-button-gap:%dpx;
     --cosmos-info-button-width:%dpx;
     --cosmos-info-button-height:%dpx;
     --cosmos-info-button-size:%dpx;
     --cosmos-info-button-weight:%s;
     --cosmos-info-button-color:%s;
     --cosmos-info-button-background:%s;
     --cosmos-info-button-border-color:%s;
     --cosmos-info-button-border-width:%dpx;
     --cosmos-info-button-radius:%dpx;',
     
    $text_width,
    $image_width,
    $column_gap,
    $margin_top,
    $margin_bottom,

    esc_attr($text_background),

    esc_attr($tag_background),
    esc_attr($tag_color),
    $tag_size,
    esc_attr($tag_weight),
    $tag_padding_horizontal,
    $tag_padding_vertical,

    esc_attr($title_color),
    $title_size,
    esc_attr($title_weight),
    esc_attr($title_align),
    esc_attr($title_line_height),
    $title_margin_bottom,

    esc_attr($info_align),
    esc_attr($info_text_color),
    $info_text_size,
    esc_attr($info_text_weight),
    esc_attr($info_icon_color),
    $info_icon_size,
    $info_item_spacing,

    $button_gap,
    $button_width,
    $button_height,
    $button_text_size,
    esc_attr($button_text_weight),
    esc_attr($button_text_color),
    esc_attr($button_background),
    esc_attr($button_border_color),
    $button_border_width,
    $button_border_radius
);


/*
 * CLASES DE ORDEN
 */

$text_order_class = $first_column === 'text'
    ? 'is-first'
    : 'is-second';

$image_order_class = $first_column === 'image'
    ? 'is-first'
    : 'is-second';


/*
 * WRAPPER
 */

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'cosmos-info-image',
        'style' => $style,
    )
);

?>

<section <?php echo $wrapper_attributes; ?>>

    <div class="container">

        <div class="cosmos-info-image__columns">


            <!-- =============================================
                 COLUMNA TEXTO
            ============================================== -->

            <div
                class="
                    cosmos-info-image__text-column
                    <?php echo esc_attr($text_order_class); ?>
                "
            >

                <?php if ($tag_enabled) : ?>

                    <div
                        class="
                            cosmos-info-image__tag
                            is-position-<?php echo esc_attr($tag_position); ?>
                        "
                    >
                        <?php echo esc_html($tag_text); ?>
                    </div>

                <?php endif; ?>


                <div class="cosmos-info-image__content">


                    <!-- TÍTULO -->

                    <div class="cosmos-info-image__title">
                        <?php echo wp_kses_post($title); ?>
                    </div>


                    <!-- INFORMACIÓN -->

                    <div class="cosmos-info-image__items">


                        <?php if ($address_enabled && $address) : ?>

                            <div class="cosmos-info-image__info-item">

                                <span class="cosmos-info-image__icon">
                                    ⌖
                                </span>

                                <span class="cosmos-info-image__info-text">
                                    <?php echo esc_html($address); ?>
                                </span>

                            </div>

                        <?php endif; ?>


                        <?php if ($phone_enabled && $phone) : ?>

                            <div class="cosmos-info-image__info-item">

                                <span class="cosmos-info-image__icon">
                                    ☎
                                </span>

                                <span class="cosmos-info-image__info-text">
                                    <?php echo esc_html($phone); ?>
                                </span>

                            </div>

                        <?php endif; ?>


                        <?php if ($email_enabled && $email) : ?>

                            <div class="cosmos-info-image__info-item">

                                <span class="cosmos-info-image__icon">
                                    ✉
                                </span>

                                <span class="cosmos-info-image__info-text">
                                    <?php echo esc_html($email); ?>
                                </span>

                            </div>

                        <?php endif; ?>


                    </div>


                    <!-- BOTONES -->

                    <?php if ($buttons_count > 0) : ?>

                        <div class="cosmos-info-image__buttons">


                            <?php if ($buttons_count >= 1) : ?>

                                <a
                                    class="cosmos-info-image__button"
                                    href="<?php echo esc_url($button_1_url); ?>"
                                >
                                    <?php echo esc_html($button_1_text); ?>
                                </a>

                            <?php endif; ?>


                            <?php if ($buttons_count >= 2) : ?>

                                <a
                                    class="cosmos-info-image__button"
                                    href="<?php echo esc_url($button_2_url); ?>"
                                >
                                    <?php echo esc_html($button_2_text); ?>
                                </a>

                            <?php endif; ?>


                        </div>

                    <?php endif; ?>


                </div>

            </div>


            <!-- =============================================
                 COLUMNA IMAGEN
            ============================================== -->

            <div
                class="
                    cosmos-info-image__image-column
                    <?php echo esc_attr($image_order_class); ?>
                "
            >

                <?php if ($image_url) : ?>

                    <div
                        class="cosmos-info-image__image"
                        style="
                            background-image:url('<?php echo esc_url($image_url); ?>');
                            background-position:<?php echo esc_attr($image_position); ?>;
                        "
                        <?php if ($image_alt) : ?>
                            role="img"
                            aria-label="<?php echo esc_attr($image_alt); ?>"
                        <?php endif; ?>
                    ></div>

                <?php else : ?>

                    <div class="cosmos-info-image__image-placeholder">
                        <?php echo esc_html__(
                            'Imagen no seleccionada',
                            'hoteles-cosmos'
                        ); ?>
                    </div>

                <?php endif; ?>

            </div>


        </div>

    </div>

</section>