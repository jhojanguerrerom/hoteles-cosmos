document.addEventListener(
    'DOMContentLoaded',
    () => {

        const carousels =
            document.querySelectorAll(
                '.cosmos-image-carousel'
            );


        carousels.forEach((carousel) => {

            const viewport =
                carousel.querySelector(
                    '.cosmos-image-carousel__viewport'
                );

            const track =
                carousel.querySelector(
                    '.cosmos-image-carousel__track'
                );

            const originalSlides =
                Array.from(
                    carousel.querySelectorAll(
                        '.cosmos-image-carousel__slide'
                    )
                );

            const prevButton =
                carousel.querySelector(
                    '.cosmos-image-carousel__arrow--prev'
                );

            const nextButton =
                carousel.querySelector(
                    '.cosmos-image-carousel__arrow--next'
                );


            if (
                !viewport ||
                !track ||
                originalSlides.length === 0
            ) {
                return;
            }


            /*
             * =================================================
             * CONFIGURACIÓN
             * =================================================
             */

            let currentIndex = 0;

            let isAnimating = false;

            let resizeTimeout;


            /*
             * =================================================
             * CLONAR ELEMENTOS
             *
             * Los clones permiten crear el efecto infinito.
             * =================================================
             */

            const getVisibleColumns = () => {

                const width =
                    window.innerWidth;


                if (width <= 767) {

                    return parseInt(
                        getComputedStyle(
                            carousel
                        ).getPropertyValue(
                            '--cosmos-carousel-mobile-columns'
                        )
                    ) || 1;
                }


                if (width <= 1024) {

                    return parseInt(
                        getComputedStyle(
                            carousel
                        ).getPropertyValue(
                            '--cosmos-carousel-tablet-columns'
                        )
                    ) || 2;
                }


                return parseInt(
                    getComputedStyle(
                        carousel
                    ).getPropertyValue(
                        '--cosmos-carousel-desktop-columns'
                    )
                ) || 3;
            };


            /*
             * =================================================
             * CREAR CLONES
             * =================================================
             */

            const createClones = () => {

                /*
                 * Eliminar clones anteriores
                 */

                track
                    .querySelectorAll(
                        '[data-carousel-clone="true"]'
                    )
                    .forEach(
                        (clone) => clone.remove()
                    );


                const visible =
                    getVisibleColumns();


                /*
                 * Necesitamos suficientes clones
                 * para poder desplazarnos continuamente.
                 */

                const cloneCount =
                    Math.max(
                        visible + 1,
                        originalSlides.length
                    );


                /*
                 * CLONES AL FINAL
                 */

                for (
                    let i = 0;
                    i < cloneCount;
                    i++
                ) {

                    const source =
                        originalSlides[
                            i %
                            originalSlides.length
                        ];


                    const clone =
                        source.cloneNode(true);


                    clone.dataset.carouselClone =
                        'true';


                    track.appendChild(
                        clone
                    );
                }


                /*
                 * CLONES AL PRINCIPIO
                 */

                for (
                    let i = 0;
                    i < cloneCount;
                    i++
                ) {

                    const sourceIndex =
                        (
                            originalSlides.length -
                            1 -
                            (i %
                                originalSlides.length)
                        );


                    const source =
                        originalSlides[
                            sourceIndex
                        ];


                    const clone =
                        source.cloneNode(true);


                    clone.dataset.carouselClone =
                        'true';


                    track.insertBefore(
                        clone,
                        track.firstChild
                    );
                }
            };


            /*
             * =================================================
             * POSICIÓN INICIAL
             * =================================================
             */

            const getCloneCount = () => {

                return Math.max(
                    getVisibleColumns() + 1,
                    originalSlides.length
                );
            };


            const setInitialPosition = () => {

                const cloneCount =
                    getCloneCount();


                currentIndex =
                    cloneCount;


                track.style.transition =
                    'none';


                moveTrack();


                /*
                 * Forzar reflow para que el navegador
                 * registre la posición inicial.
                 */

                track.offsetHeight;


                track.style.transition =
                    '';
            };


            /*
             * =================================================
             * MOVER TRACK
             * =================================================
             */

            const moveTrack = () => {

                const slides =
                    Array.from(
                        track.querySelectorAll(
                            '.cosmos-image-carousel__slide'
                        )
                    );


                if (!slides.length) {
                    return;
                }


                const gap =
                    parseFloat(
                        getComputedStyle(
                            track
                        ).gap
                    ) || 0;


                const slideWidth =
                    slides[0]
                        .getBoundingClientRect()
                        .width;


                const movement =
                    slideWidth + gap;


                track.style.transform =
                    `translate3d(
                        -${currentIndex * movement}px,
                        0,
                        0
                    )`;
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


                isAnimating = true;


                currentIndex++;


                track.style.transition =
                    'transform 0.45s ease';


                moveTrack();
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


                isAnimating = true;


                currentIndex--;


                track.style.transition =
                    'transform 0.45s ease';


                moveTrack();
            };


            /*
             * =================================================
             * FIN DE ANIMACIÓN
             *
             * Aquí hacemos el salto invisible cuando
             * entramos en la zona de clones.
             * =================================================
             */

            track.addEventListener(
                'transitionend',
                (event) => {

                    if (
                        event.propertyName !==
                        'transform'
                    ) {
                        return;
                    }


                    const cloneCount =
                        getCloneCount();


                    /*
                     * Hemos avanzado demasiado.
                     *
                     * Volvemos a la posición equivalente
                     * dentro de las tarjetas originales.
                     */

                    if (
                        currentIndex >=
                        cloneCount +
                        originalSlides.length
                    ) {

                        currentIndex -=
                            originalSlides.length;


                        track.style.transition =
                            'none';


                        moveTrack();


                        track.offsetHeight;


                        track.style.transition =
                            'transform 0.45s ease';
                    }


                    /*
                     * Hemos retrocedido demasiado.
                     */

                    if (
                        currentIndex <
                        cloneCount
                    ) {

                        currentIndex +=
                            originalSlides.length;


                        track.style.transition =
                            'none';


                        moveTrack();


                        track.offsetHeight;


                        track.style.transition =
                            'transform 0.45s ease';
                    }


                    isAnimating = false;
                }
            );


            /*
             * =================================================
             * BOTÓN SIGUIENTE
             * =================================================
             */

            if (nextButton) {

                nextButton.addEventListener(
                    'click',
                    next
                );
            }


            /*
             * =================================================
             * BOTÓN ANTERIOR
             * =================================================
             */

            if (prevButton) {

                prevButton.addEventListener(
                    'click',
                    previous
                );
            }


            /*
             * =================================================
             * RESIZE
             * =================================================
             */

            window.addEventListener(
                'resize',
                () => {

                    clearTimeout(
                        resizeTimeout
                    );


                    resizeTimeout =
                        setTimeout(
                            () => {

                                createClones();

                                setInitialPosition();

                                isAnimating =
                                    false;

                            },
                            150
                        );
                }
            );


            /*
             * =================================================
             * INICIALIZACIÓN
             * =================================================
             */

            createClones();

            setInitialPosition();

        });

    }
);