<?php

$image_one_url = $attributes['imageOneUrl'] ?? '';
$image_one_alt = $attributes['imageOneAlt'] ?? '';

$image_two_url = $attributes['imageTwoUrl'] ?? '';
$image_two_alt = $attributes['imageTwoAlt'] ?? '';

$title = $attributes['title'] ?? '';
$highlight = $attributes['highlight'] ?? '';
$content = $attributes['content'] ?? '';

?>


<section <?php echo get_block_wrapper_attributes([
    'class' => 'cosmos-overlap-content'
]); ?>>

    <div class="container">

        <div class="cosmos-overlap-content__grid">


            <!-- =============================================
                 IMÁGENES
            ============================================== -->

            <div class="cosmos-overlap-content__images">


                <?php if ($image_one_url) : ?>

                    <div class="cosmos-overlap-content__image-one">

                        <img
                            src="<?php echo esc_url($image_one_url); ?>"
                            alt="<?php echo esc_attr($image_one_alt); ?>"
                            loading="lazy"
                        />

                    </div>

                <?php endif; ?>


                <?php if ($image_two_url) : ?>

                    <div class="cosmos-overlap-content__image-two">

                        <img
                            src="<?php echo esc_url($image_two_url); ?>"
                            alt="<?php echo esc_attr($image_two_alt); ?>"
                            loading="lazy"
                        />

                    </div>

                <?php endif; ?>


            </div>


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