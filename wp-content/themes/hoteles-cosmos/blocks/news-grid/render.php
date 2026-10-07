<?php

$posts_per_page = isset($attributes['postsPerPage'])
	? max(1, intval($attributes['postsPerPage']))
	: 6;

$title_font_size = isset($attributes['titleFontSize'])
	? intval($attributes['titleFontSize'])
	: 22;

$title_color = isset($attributes['titleColor'])
	? $attributes['titleColor']
	: '#222222';

$title_weight = isset($attributes['titleWeight'])
	? $attributes['titleWeight']
	: '600';

$title_alignment = isset($attributes['titleAlignment'])
	? $attributes['titleAlignment']
	: 'left';

$description_font_size = isset($attributes['descriptionFontSize'])
	? intval($attributes['descriptionFontSize'])
	: 16;

$description_color = isset($attributes['descriptionColor'])
	? $attributes['descriptionColor']
	: '#555555';

$description_weight = isset($attributes['descriptionWeight'])
	? $attributes['descriptionWeight']
	: '400';

$description_alignment = isset($attributes['descriptionAlignment'])
	? $attributes['descriptionAlignment']
	: 'left';

$button_text = isset($attributes['buttonText'])
	? $attributes['buttonText']
	: 'Leer noticia';

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
	? intval($attributes['buttonBorderWidth'])
	: 0;

$button_border_radius = isset($attributes['buttonBorderRadius'])
	? intval($attributes['buttonBorderRadius'])
	: 4;

$button_alignment = isset($attributes['buttonAlignment'])
	? $attributes['buttonAlignment']
	: 'left';

$button_padding_vertical = isset($attributes['buttonPaddingVertical'])
	? intval($attributes['buttonPaddingVertical'])
	: 12;

$button_padding_horizontal = isset($attributes['buttonPaddingHorizontal'])
	? intval($attributes['buttonPaddingHorizontal'])
	: 24;

$card_background = isset($attributes['cardBackground'])
	? $attributes['cardBackground']
	: '#ffffff';

$card_border_radius = isset($attributes['cardBorderRadius'])
	? intval($attributes['cardBorderRadius'])
	: 0;

$card_gap = isset($attributes['cardGap'])
	? intval($attributes['cardGap'])
	: 24;

$margin_top = isset($attributes['marginTop'])
	? intval($attributes['marginTop'])
	: 0;

$margin_bottom = isset($attributes['marginBottom'])
	? intval($attributes['marginBottom'])
	: 0;


/*
 * Consulta las entradas publicadas.
 */
$news_query = new WP_Query(
	array(
		'post_type'           => 'post',
		'post_status'         => 'publish',
		'posts_per_page'      => $posts_per_page,
		'ignore_sticky_posts' => true,
	)
);

?>

<section
	class="cosmos-news-grid"
	style="
		--news-gap: <?php echo esc_attr($card_gap); ?>px;
		--news-margin-top: <?php echo esc_attr($margin_top); ?>px;
		--news-margin-bottom: <?php echo esc_attr($margin_bottom); ?>px;
	"
>

	<div class="container">

		<?php if ($news_query->have_posts()) : ?>

			<div class="cosmos-news-grid__cards">

				<?php while ($news_query->have_posts()) : $news_query->the_post(); ?>

					<?php
					$post_id = get_the_ID();

					$title = get_the_title();

					$permalink = get_permalink();

					$image_url = get_the_post_thumbnail_url(
						$post_id,
						'large'
					);

					$excerpt = get_the_excerpt();

					if (empty($excerpt)) {
						$excerpt = wp_trim_words(
							wp_strip_all_tags(
								get_the_content()
							),
							25,
							'...'
						);
					}
					?>

					<article
						class="cosmos-news-grid__card"
						style="
							--card-background: <?php echo esc_attr($card_background); ?>;
							--card-radius: <?php echo esc_attr($card_border_radius); ?>px;
						"
					>

						<?php if ($image_url) : ?>

							<a
								class="cosmos-news-grid__image-link"
								href="<?php echo esc_url($permalink); ?>"
								aria-label="<?php echo esc_attr($title); ?>"
							>
								<img
									class="cosmos-news-grid__image"
									src="<?php echo esc_url($image_url); ?>"
									alt="<?php echo esc_attr(get_post_meta(get_post_thumbnail_id($post_id), '_wp_attachment_image_alt', true)); ?>"
									loading="lazy"
								>
							</a>

						<?php endif; ?>

						<div class="cosmos-news-grid__content">

							<h3
								class="cosmos-news-grid__title"
								style="
									font-size: <?php echo esc_attr($title_font_size); ?>px;
									color: <?php echo esc_attr($title_color); ?>;
									font-weight: <?php echo esc_attr($title_weight); ?>;
									text-align: <?php echo esc_attr($title_alignment); ?>;
								"
							>
								<?php echo esc_html($title); ?>
							</h3>

							<?php if (!empty($excerpt)) : ?>

								<div
									class="cosmos-news-grid__description"
									style="
										font-size: <?php echo esc_attr($description_font_size); ?>px;
										color: <?php echo esc_attr($description_color); ?>;
										font-weight: <?php echo esc_attr($description_weight); ?>;
										text-align: <?php echo esc_attr($description_alignment); ?>;
									"
								>
									<?php echo wp_kses_post($excerpt); ?>
								</div>

							<?php endif; ?>

							<div
								class="cosmos-news-grid__button-wrapper"
								style="text-align: <?php echo esc_attr($button_alignment); ?>;"
							>

								<a
									class="cosmos-news-grid__button"
									href="<?php echo esc_url($permalink); ?>"
									style="
										color: <?php echo esc_attr($button_text_color); ?>;
										background-color: <?php echo esc_attr($button_background); ?>;
										border: <?php echo esc_attr($button_border_width); ?>px solid <?php echo esc_attr($button_border_color); ?>;
										border-radius: <?php echo esc_attr($button_border_radius); ?>px;
										padding: <?php echo esc_attr($button_padding_vertical); ?>px <?php echo esc_attr($button_padding_horizontal); ?>px;
									"
								>
									<?php echo esc_html($button_text); ?>
								</a>

							</div>

						</div>

					</article>

				<?php endwhile; ?>

			</div>

		<?php else : ?>

			<p class="cosmos-news-grid__empty">
				<?php esc_html_e('No hay noticias publicadas.', 'hoteles-cosmos'); ?>
			</p>

		<?php endif; ?>

	</div>

</section>

<?php

wp_reset_postdata();