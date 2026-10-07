document.addEventListener(
    'DOMContentLoaded',
    () => {

        const carousels =
            document.querySelectorAll(
                '.cosmos-info-carousel'
            );


        carousels.forEach((carousel) => {

            const track =
                carousel.querySelector(
                    '.cosmos-info-carousel__track'
                );

            const cards =
                Array.from(
                    carousel.querySelectorAll(
                        '.cosmos-info-carousel__card'
                    )
                );

            const prevButton =
                carousel.querySelector(
                    '.cosmos-info-carousel__arrow--prev'
                );

            const nextButton =
                carousel.querySelector(
                    '.cosmos-info-carousel__arrow--next'
                );


            /*
             * =================================================
             * SI NO HAY CARDS
             * =================================================
             */

            if (
                !track ||
                cards.length <= 1
            ) {

                return;

            }


            /*
             * =================================================
             * CONFIGURACIÓN
             * =================================================
             */

            let currentIndex = 0;

            let autoplay = null;

            let isAnimating = false;

            let visibleCards = 4;


            /*
             * =================================================
             * CALCULAR CARDS VISIBLES
             * =================================================
             */

            const getVisibleCards = () => {

                if (
                    window.innerWidth <= 767
                ) {

                    return 1;

                }

                if (
                    window.innerWidth <= 1024
                ) {

                    return 2;

                }

                return 4;
            };


            /*
             * =================================================
             * ACTUALIZAR VISIBLE
             * =================================================
             */

            const updateVisibleCards = () => {

                visibleCards =
                    getVisibleCards();

            };


            /*
             * =================================================
             * OBTENER ANCHO DE CARD
             * =================================================
             */

            const getStep = () => {

                const card =
                    cards[0];

                if (!card) {
                    return 0;
                }


                const style =
                    window.getComputedStyle(
                        track
                    );

                const gap =
                    parseFloat(
                        style.columnGap ||
                        style.gap ||
                        0
                    );


                return (
                    card.offsetWidth +
                    gap
                );
            };


            /*
             * =================================================
             * MOSTRAR POSICIÓN
             * =================================================
             */

            const showPosition = (
                index,
                animate = true
            ) => {

                const step =
                    getStep();

                if (!step) {
                    return;
                }


                if (!animate) {

                    track.style.transition =
                        'none';

                } else {

                    track.style.transition =
                        'transform 0.6s ease';

                }


                track.style.transform =
                    `translate3d(
                        -${index * step}px,
                        0,
                        0
                    )`;


                if (!animate) {

                    track.offsetHeight;

                    track.style.transition =
                        'transform 0.6s ease';

                }

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


                updateVisibleCards();


                /*
                 * Cuando llegamos al final,
                 * volvemos al principio.
                 */

                const maxIndex =
                    Math.max(
                        0,
                        cards.length -
                        visibleCards
                    );


                if (
                    currentIndex >=
                    maxIndex
                ) {

                    currentIndex = 0;

                    showPosition(
                        currentIndex,
                        true
                    );

                    return;
                }


                currentIndex++;

                isAnimating = true;


                showPosition(
                    currentIndex,
                    true
                );


                setTimeout(
                    () => {

                        isAnimating =
                            false;

                    },
                    650
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


                updateVisibleCards();


                if (
                    currentIndex <= 0
                ) {

                    currentIndex =
                        Math.max(
                            0,
                            cards.length -
                            visibleCards
                        );

                    showPosition(
                        currentIndex,
                        false
                    );

                    return;
                }


                currentIndex--;

                isAnimating = true;


                showPosition(
                    currentIndex,
                    true
                );


                setTimeout(
                    () => {

                        isAnimating =
                            false;

                    },
                    650
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


                autoplay =
                    setInterval(
                        () => {

                            next();

                        },
                        4500
                    );

            };


            /*
             * =================================================
             * STOP AUTOPLAY
             * =================================================
             */

            const stopAutoplay = () => {

                clearInterval(
                    autoplay
                );

            };


            /*
             * =================================================
             * NEXT
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
             * PREVIOUS
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
             * PAUSAR CON MOUSE
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
             * RESPONSIVE
             * =================================================
             */

            window.addEventListener(
                'resize',
                () => {

                    updateVisibleCards();

                    const maxIndex =
                        Math.max(
                            0,
                            cards.length -
                            visibleCards
                        );


                    if (
                        currentIndex >
                        maxIndex
                    ) {

                        currentIndex =
                            maxIndex;

                    }


                    showPosition(
                        currentIndex,
                        false
                    );

                }
            );


            /*
             * =================================================
             * INICIO
             * =================================================
             */

            updateVisibleCards();

            showPosition(
                0,
                false
            );


            /*
             * =================================================
             * AUTOPLAY INICIAL
             * =================================================
             */

            startAutoplay();

        });

    }
);