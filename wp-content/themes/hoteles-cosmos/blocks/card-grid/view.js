
(function () {
    'use strict';

    const AUTOPLAY_INTERVAL = 3000;
    const TRANSITION_DURATION = 450;
    const RESIZE_DEBOUNCE = 180;
    const SWIPE_THRESHOLD = 40;

    function initCarousel(root) {
        if (
            !root ||
            root.dataset.carouselInitialized === 'true'
        ) {
            return;
        }

        const viewport = root.querySelector(
            '.cosmos-card-grid__viewport'
        );

        const track = root.querySelector(
            '.cosmos-card-grid__list'
        );

        const previousButton = root.querySelector(
            '.cosmos-card-grid__arrow--prev'
        );

        const nextButton = root.querySelector(
            '.cosmos-card-grid__arrow--next'
        );

        if (!viewport || !track) {
            return;
        }

        /*
         * Conservamos únicamente las tarjetas originales.
         * Los clones se crean de nuevo cuando cambia el ancho.
         */
        const originalCards = Array.from(
            track.querySelectorAll(
                '.cosmos-card-grid__card'
            )
        ).filter(function (card) {
            return (
                card.dataset.cosmosCarouselClone !== 'true'
            );
        });

        if (originalCards.length < 2) {
            if (previousButton) {
                previousButton.hidden = true;
            }

            if (nextButton) {
                nextButton.hidden = true;
            }

            return;
        }

        root.dataset.carouselInitialized = 'true';

        let currentIndex = 0;
        let visibleCards = 1;
        let cloneCount = 0;
        let step = 0;

        let autoplayTimer = null;
        let resizeTimer = null;

        let isAnimating = false;
        let isPaused = false;
        let isBuilding = false;

        let touchStartX = 0;
        let touchStartY = 0;

        function getVisibleCards() {
            const width = viewport.clientWidth;

            if (width <= 600) {
                return Math.min(1, originalCards.length);
            }

            if (width <= 900) {
                return Math.min(2, originalCards.length);
            }

            return Math.min(3, originalCards.length);
        }

        function getGap() {
            const styles = window.getComputedStyle(track);

            return (
                parseFloat(styles.columnGap) ||
                parseFloat(styles.gap) ||
                0
            );
        }

        function getCardStep() {
            const cards = Array.from(track.children).filter(
                function (card) {
                    return card.classList.contains(
                        'cosmos-card-grid__card'
                    );
                }
            );

            if (cards.length < 2) {
                if (!cards.length) {
                    return 0;
                }

                return (
                    cards[0].getBoundingClientRect().width +
                    getGap()
                );
            }

            /*
             * Medimos la distancia entre dos tarjetas
             * consecutivas. Esta distancia incluye el gap
             * y no depende de la transformación horizontal.
             */
            const firstRect =
                cards[0].getBoundingClientRect();

            const secondRect =
                cards[1].getBoundingClientRect();

            const measuredStep =
                secondRect.left - firstRect.left;

            if (
                Number.isFinite(measuredStep) &&
                measuredStep > 0
            ) {
                return measuredStep;
            }

            return (
                firstRect.width + getGap()
            );
        }

        function setTransition(enabled) {
            track.style.transition = enabled
                ? `transform ${TRANSITION_DURATION}ms ease`
                : 'none';
        }

        function updatePosition(animate) {
            step = getCardStep();

            if (!step) {
                return;
            }

            setTransition(animate);

            track.style.transform =
                `translate3d(${-currentIndex * step}px, 0, 0)`;
        }

        function removeClones() {
            track
                .querySelectorAll(
                    '[data-cosmos-carousel-clone="true"]'
                )
                .forEach(function (clone) {
                    clone.remove();
                });
        }

        function createClone(card) {
            const clone = card.cloneNode(true);

            clone.dataset.cosmosCarouselClone = 'true';
            clone.setAttribute('aria-hidden', 'true');

            /*
             * Evitamos que los clones dupliquen identificadores
             * HTML o controles accesibles.
             */
            clone.removeAttribute('id');

            clone.querySelectorAll('[id]').forEach(
                function (element) {
                    element.removeAttribute('id');
                }
            );

            clone.querySelectorAll(
                'a, button, input, select, textarea, [tabindex]'
            ).forEach(function (element) {
                element.setAttribute('tabindex', '-1');
            });

            clone.querySelectorAll(
                'a, button, input, select, textarea'
            ).forEach(function (element) {
                element.setAttribute('aria-hidden', 'true');
            });

            return clone;
        }

        function createClones() {
            removeClones();

            /*
             * Clonamos tantas tarjetas como caben en el viewport.
             * Así nunca queda visible un hueco al cruzar los límites
             * del carrusel, incluso cuando se ven tres tarjetas.
             */
            cloneCount = visibleCards;

            const fragmentBefore =
                document.createDocumentFragment();

            const fragmentAfter =
                document.createDocumentFragment();

            const cardsToPrepend = originalCards.slice(
                -cloneCount
            );

            const cardsToAppend = originalCards.slice(
                0,
                cloneCount
            );

            cardsToPrepend.forEach(function (card) {
                fragmentBefore.appendChild(
                    createClone(card)
                );
            });

            cardsToAppend.forEach(function (card) {
                fragmentAfter.appendChild(
                    createClone(card)
                );
            });

            track.insertBefore(
                fragmentBefore,
                track.firstChild
            );

            track.appendChild(fragmentAfter);
        }

        function updateButtons() {
            const canMove =
                originalCards.length > visibleCards;

            [previousButton, nextButton].forEach(
                function (button) {
                    if (!button) {
                        return;
                    }

                    button.hidden = !canMove;
                    button.disabled = !canMove;
                }
            );
        }

        function stopAutoplay() {
            if (autoplayTimer !== null) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function shouldPause() {
            return (
                isPaused ||
                root.matches(':hover') ||
                root.contains(document.activeElement)
            );
        }

        function startAutoplay() {
            stopAutoplay();

            if (
                originalCards.length <= visibleCards ||
                shouldPause()
            ) {
                return;
            }

            autoplayTimer = window.setInterval(
                function () {
                    next();
                },
                AUTOPLAY_INTERVAL
            );
        }

        function restartAutoplay() {
            startAutoplay();
        }

        function buildCarousel() {
            if (isBuilding) {
                return;
            }

            isBuilding = true;
            isAnimating = false;
            stopAutoplay();

            visibleCards = getVisibleCards();

            /*
             * Primero eliminamos clones antiguos para que las
             * medidas y el nuevo montaje partan de las originales.
             */
            removeClones();

            track.style.transition = 'none';
            track.style.transform = 'none';
            track.style.justifyContent = 'flex-start';

            if (originalCards.length <= visibleCards) {
                cloneCount = 0;
                currentIndex = 0;

                track.style.justifyContent = 'center';

                updateButtons();

                isBuilding = false;
                return;
            }

            createClones();

            /*
             * Esperamos a que el navegador calcule las dimensiones
             * reales de las tarjetas antes de posicionar el track.
             */
            step = getCardStep();

            currentIndex = cloneCount;

            updatePosition(false);
            updateButtons();

            /*
             * Forzamos la aplicación de la posición sin animación
             * antes de volver a habilitar las transiciones.
             */
            track.getBoundingClientRect();

            setTransition(true);

            isBuilding = false;

            startAutoplay();
        }

        function goTo(index, animate) {
            if (
                isBuilding ||
                isAnimating ||
                originalCards.length <= visibleCards
            ) {
                return;
            }

            currentIndex = index;

            if (animate) {
                isAnimating = true;
            }

            updatePosition(animate);

            /*
             * Si no hay transición, normalizamos inmediatamente.
             */
            if (!animate) {
                normalizeIndex();
            }
        }

        function normalizeIndex() {
            const firstRealIndex = cloneCount;
            const lastRealIndex =
                cloneCount + originalCards.length - 1;

            if (currentIndex < firstRealIndex) {
                currentIndex = lastRealIndex;
                updatePosition(false);
            } else if (
                currentIndex >=
                cloneCount + originalCards.length
            ) {
                currentIndex = firstRealIndex;
                updatePosition(false);
            }
        }

        function next() {
            if (
                isAnimating ||
                originalCards.length <= visibleCards
            ) {
                return;
            }

            goTo(currentIndex + 1, true);
        }

        function previous() {
            if (
                isAnimating ||
                originalCards.length <= visibleCards
            ) {
                return;
            }

            goTo(currentIndex - 1, true);
        }

        track.addEventListener(
            'transitionend',
            function (event) {
                if (
                    event.target !== track ||
                    event.propertyName !== 'transform'
                ) {
                    return;
                }

                isAnimating = false;

                /*
                 * Al alcanzar una tarjeta clonada, saltamos
                 * a su equivalente original sin transición.
                 */
                normalizeIndex();
            }
        );

        if (previousButton) {
            previousButton.addEventListener(
                'click',
                function () {
                    previous();
                    restartAutoplay();
                }
            );
        }

        if (nextButton) {
            nextButton.addEventListener(
                'click',
                function () {
                    next();
                    restartAutoplay();
                }
            );
        }

        root.addEventListener(
            'mouseenter',
            function () {
                isPaused = true;
                stopAutoplay();
            }
        );

        root.addEventListener(
            'mouseleave',
            function () {
                isPaused = false;
                startAutoplay();
            }
        );

        root.addEventListener(
            'focusin',
            function () {
                isPaused = true;
                stopAutoplay();
            }
        );

        root.addEventListener(
            'focusout',
            function (event) {
                if (
                    !root.contains(event.relatedTarget)
                ) {
                    isPaused = false;
                    startAutoplay();
                }
            }
        );

        viewport.addEventListener(
            'touchstart',
            function (event) {
                if (!event.changedTouches.length) {
                    return;
                }

                touchStartX =
                    event.changedTouches[0].screenX;

                touchStartY =
                    event.changedTouches[0].screenY;
            },
            { passive: true }
        );

        viewport.addEventListener(
            'touchend',
            function (event) {
                if (!event.changedTouches.length) {
                    return;
                }

                const touchEndX =
                    event.changedTouches[0].screenX;

                const touchEndY =
                    event.changedTouches[0].screenY;

                const distanceX =
                    touchEndX - touchStartX;

                const distanceY =
                    touchEndY - touchStartY;

                /*
                 * No interpretamos el desplazamiento vertical
                 * de la página como un gesto del carrusel.
                 */
                if (
                    Math.abs(distanceX) < SWIPE_THRESHOLD ||
                    Math.abs(distanceX) <= Math.abs(distanceY)
                ) {
                    return;
                }

                if (distanceX < 0) {
                    next();
                } else {
                    previous();
                }

                restartAutoplay();
            },
            { passive: true }
        );

        window.addEventListener(
            'resize',
            function () {
                window.clearTimeout(resizeTimer);

                resizeTimer = window.setTimeout(
                    function () {
                        buildCarousel();
                    },
                    RESIZE_DEBOUNCE
                );
            }
        );

        buildCarousel();
    }

    function initAllCarousels() {
        document
            .querySelectorAll(
                '.wp-block-hoteles-cosmos-card-grid'
            )
            .forEach(initCarousel);
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initAllCarousels
        );
    } else {
        initAllCarousels();
    }
})();
