document.addEventListener(
    'DOMContentLoaded',
    () => {

        const blocks =
            document.querySelectorAll(
                '.cosmos-statistics-grid'
            );


        if (!blocks.length) {
            return;
        }


        /*
         * =====================================================
         * FORMATEAR NÚMERO
         * =====================================================
         */

        const formatNumber = (
            value,
            decimals
        ) => {

            return Number(value).toLocaleString(
                'es-CO',
                {
                    minimumFractionDigits:
                        decimals,

                    maximumFractionDigits:
                        decimals
                }
            );
        };


        /*
         * =====================================================
         * ANIMAR BLOQUE
         * =====================================================
         */

        const animateBlock = (
            block
        ) => {

            if (
                block.dataset.animated === 'true'
            ) {
                return;
            }


            block.dataset.animated = 'true';


            const numbers =
                block.querySelectorAll(
                    '.cosmos-statistics-grid__number'
                );


            const duration =
                parseInt(
                    getComputedStyle(block)
                        .getPropertyValue(
                            '--cosmos-statistics-animation-duration'
                        )
                ) || 1800;


            const decimals =
                parseInt(
                    getComputedStyle(block)
                        .getPropertyValue(
                            '--cosmos-statistics-animation-decimals'
                        )
                ) || 0;


            numbers.forEach(
                (numberElement) => {

                    const target =
                        parseFloat(
                            numberElement.dataset.target
                        ) || 0;


                    const valueElement =
                        numberElement.querySelector(
                            '.cosmos-statistics-grid__number-value'
                        );


                    if (!valueElement) {
                        return;
                    }


                    const startTime =
                        performance.now();


                    const animate =
                        (currentTime) => {

                            const elapsed =
                                currentTime -
                                startTime;


                            const progress =
                                Math.min(
                                    elapsed / duration,
                                    1
                                );


                            /*
                             * Easing
                             */

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const currentValue =
                                target *
                                eased;


                            valueElement.textContent =
                                formatNumber(
                                    currentValue,
                                    decimals
                                );


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                valueElement.textContent =
                                    formatNumber(
                                        target,
                                        decimals
                                    );
                            }
                        };


                    requestAnimationFrame(
                        animate
                    );

                }
            );
        };


        /*
         * =====================================================
         * INTERSECTION OBSERVER
         * =====================================================
         */

        if (
            'IntersectionObserver'
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    animateBlock(
                                        entry.target
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );
                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            blocks.forEach(
                (block) => {

                    observer.observe(
                        block
                    );

                }
            );

        } else {

            /*
             * Fallback para navegadores
             * sin IntersectionObserver.
             */

            blocks.forEach(
                (block) => {

                    animateBlock(
                        block
                    );

                }
            );

        }

    }
);