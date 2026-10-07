document.addEventListener(
    'DOMContentLoaded',
    () => {

        const carousels =
            document.querySelectorAll(
                '.cosmos-banner-carousel'
            );


        carousels.forEach((carousel) => {

            const track =
                carousel.querySelector(
                    '.cosmos-banner-carousel__track'
                );

            const slides =
                Array.from(
                    carousel.querySelectorAll(
                        '.cosmos-banner-carousel__slide'
                    )
                );

            const prevButton =
                carousel.querySelector(
                    '.cosmos-banner-carousel__arrow--prev'
                );

            const nextButton =
                carousel.querySelector(
                    '.cosmos-banner-carousel__arrow--next'
                );


            /*
             * =================================================
             * SI SOLO HAY UN BANNER
             * =================================================
             */

            if (
                !track ||
                slides.length <= 1
            ) {

                return;

            }


            /*
             * =================================================
             * CONFIGURACIÓN
             * =================================================
             */

            let currentIndex = 0;

            let autoplay;

            let isAnimating = false;


            /*
             * =================================================
             * MOSTRAR SLIDE
             * =================================================
             */

            const showSlide = (
                index,
                animate = true
            ) => {

                if (isAnimating) {
                    return;
                }


                isAnimating = true;


                if (!animate) {

                    track.style.transition =
                        'none';

                } else {

                    track.style.transition =
                        'transform 0.6s ease';

                }


                track.style.transform =
                    `translate3d(
                        -${index * 100}%,
                        0,
                        0
                    )`;


                if (!animate) {

                    track.offsetHeight;

                    track.style.transition =
                        'transform 0.6s ease';

                }


                setTimeout(
                    () => {

                        isAnimating = false;

                    },
                    animate ? 650 : 0
                );
            };


            /*
             * =================================================
             * SIGUIENTE
             * =================================================
             */

            const next = () => {

                if (isAnimating) {
                    return;
                }


                currentIndex++;


                /*
                 * Llegamos al último.
                 *
                 * Primero mostramos el movimiento
                 * y luego volvemos silenciosamente al primero.
                 */

                if (
                    currentIndex >=
                    slides.length
                ) {

                    showSlide(
                        currentIndex,
                        true
                    );


                    setTimeout(
                        () => {

                            currentIndex = 0;

                            showSlide(
                                currentIndex,
                                false
                            );

                        },
                        650
                    );

                    return;
                }


                showSlide(
                    currentIndex,
                    true
                );
            };


            /*
             * =================================================
             * ANTERIOR
             * =================================================
             */

            const previous = () => {

                if (isAnimating) {
                    return;
                }


                if (currentIndex <= 0) {

                    /*
                     * Saltamos al último sin animación.
                     */

                    currentIndex =
                        slides.length - 1;

                    showSlide(
                        currentIndex,
                        false
                    );

                    return;
                }


                currentIndex--;

                showSlide(
                    currentIndex,
                    true
                );
            };


            /*
             * =================================================
             * AUTOPLAY
             * =================================================
             */

            const startAutoplay = () => {

                clearInterval(
                    autoplay
                );


                autoplay = setInterval(
                    () => {

                        next();

                    },
                    5000
                );
            };


            /*
             * =================================================
             * DETENER AUTOPLAY
             * =================================================
             */

            const stopAutoplay = () => {

                clearInterval(
                    autoplay
                );

            };


            /*
             * =================================================
             * BOTÓN ANTERIOR
             * =================================================
             */

            if (prevButton) {

                prevButton.addEventListener(
                    'click',
                    () => {

                        previous();

                        startAutoplay();

                    }
                );

            }


            /*
             * =================================================
             * BOTÓN SIGUIENTE
             * =================================================
             */

            if (nextButton) {

                nextButton.addEventListener(
                    'click',
                    () => {

                        next();

                        startAutoplay();

                    }
                );

            }


            /*
             * =================================================
             * PAUSAR AL PASAR EL MOUSE
             * =================================================
             */

            carousel.addEventListener(
                'mouseenter',
                stopAutoplay
            );


            carousel.addEventListener(
                'mouseleave',
                startAutoplay
            );


            /*
             * =================================================
             * INICIO
             * =================================================
             */

            showSlide(
                0,
                false
            );

            startAutoplay();

        });

    }
);