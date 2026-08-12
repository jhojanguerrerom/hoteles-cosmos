<?php get_header(); ?>

<main class="site-content">

    <?php
    if (have_posts()) :

        while (have_posts()) :
            the_post();
            ?>

            <article>
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article>

            <?php
        endwhile;

    else :
        ?>

        <p>No hay contenido disponible.</p>

        <?php
    endif;
    ?>

</main>

<?php get_footer(); ?>