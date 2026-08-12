<?php
/**
 * Footer - Hoteles Cosmos
 */
?>

<footer class="site-footer">

    <div class="footer-inner">

        <!-- =====================================================
             COLUMNA 1 - MARCA
             ===================================================== -->

        <div class="footer-brand">

            <div class="footer-logo">

                <?php
                if ( function_exists( 'the_custom_logo' ) ) {
                    the_custom_logo();
                }
                ?>

            </div>


            <!-- Redes sociales -->

            <div class="footer-social">

                <?php

                $social_networks = array(

                    'instagram' => 'Instagram',
                    'facebook'  => 'Facebook',
                    'linkedin'  => 'LinkedIn',
                    'youtube'   => 'YouTube',
                    'tiktok'    => 'TikTok',
                    'x'         => 'X',

                );

                foreach ( $social_networks as $key => $label ) :

                    $url = get_theme_mod(
                        'hoteles_cosmos_social_' . $key,
                        ''
                    );

                    if ( ! empty( $url ) ) :

                ?>

                    <a
                        href="<?php echo esc_url( $url ); ?>"
                        class="social-link social-<?php echo esc_attr( $key ); ?>"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="<?php echo esc_attr( $label ); ?>"
                    >

                        <img
                            src="<?php echo esc_url(
                                get_template_directory_uri()
                                . '/assets/icons/'
                                . $key
                                . '.svg'
                            ); ?>"
                            alt=""
                            aria-hidden="true"
                        >

                    </a>

                <?php

                    endif;

                endforeach;

                ?>

            </div>


            <!-- Correo -->

            <?php

            $email = get_theme_mod(
                'hoteles_cosmos_footer_email',
                ''
            );

            ?>

            <?php if ( ! empty( $email ) ) : ?>

                <a
                    href="mailto:<?php echo esc_attr( $email ); ?>"
                    class="footer-email"
                >

                    <?php echo esc_html( $email ); ?>

                </a>

            <?php endif; ?>

        </div>


        <!-- =====================================================
             COLUMNA 2 - INFORMACIÓN
             ===================================================== -->

        <div class="footer-navigation">

            <h3 class="footer-title">
                Información
            </h3>


            <?php

            wp_nav_menu(
                array(
                    'theme_location' => 'footer',
                    'container'      => false,
                    'menu_class'     => 'footer-menu',
                    'fallback_cb'    => false,
                    'depth'          => 3,
                )
            );

            ?>

        </div>


        <!-- =====================================================
             COLUMNA 3 - NAVEGACIÓN
             ===================================================== -->

        <div class="footer-navigation">

            <h3 class="footer-title">
                Navegación
            </h3>


            <?php

            wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'footer-menu',
                    'fallback_cb'    => false,
                    'depth'          => 3,
                )
            );

            ?>

        </div>

    </div>


    <!-- =====================================================
         COPYRIGHT
         ===================================================== -->

    <div class="footer-bottom">

        <div class="footer-bottom-inner">

            <p>
                © <?php echo esc_html( date( 'Y' ) ); ?>
                Hoteles Cosmos.
                Todos los derechos reservados.
            </p>

        </div>

    </div>

</footer>


<?php wp_footer(); ?>

</body>
</html>