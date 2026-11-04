document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("site-header");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navigation =
        document.getElementById("site-navigation");


    /*
     * =====================================================
     * HEADER AL HACER SCROLL
     * =====================================================
     */

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /*
     * =====================================================
     * MENÚ HAMBURGUESA
     * =====================================================
     */

    if (menuToggle && navigation) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    menuToggle.classList.toggle(
                        "is-active"
                    );

                navigation.classList.toggle(
                    "is-open",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Cerrar menú"
                        : "Abrir menú"
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );

    }


    /*
     * =====================================================
     * SUBMENÚS EN MOBILE
     *
     * IMPORTANTE:
     *
     * El enlace principal NO se bloquea.
     *
     * Ejemplo:
     *
     *     HOTELES  → navega a /hoteles/
     *
     *     ›        → abre el submenú
     *
     * =====================================================
     */

    const menuItems =
        document.querySelectorAll(
            ".primary-menu > .menu-item-has-children"
        );


    menuItems.forEach((parent) => {

        const link =
            parent.querySelector(
                ":scope > a"
            );

        const submenu =
            parent.querySelector(
                ":scope > .sub-menu"
            );


        /*
         * Si por alguna razón el elemento
         * no tiene enlace o submenú,
         * no hacemos nada.
         */

        if (!link || !submenu) {
            return;
        }


        /*
         * -------------------------------------------------
         * EVITAR CREAR EL BOTÓN DOS VECES
         * -------------------------------------------------
         */

        if (
            parent.querySelector(
                ":scope > .submenu-toggle"
            )
        ) {
            return;
        }


        /*
         * -------------------------------------------------
         * ID DEL SUBMENÚ
         * -------------------------------------------------
         */

        const submenuId =
            submenu.id ||
            `submenu-${Math.random()
                .toString(36)
                .substring(2, 9)}`;

        submenu.id = submenuId;


        /*
         * -------------------------------------------------
         * CREAR BOTÓN
         * -------------------------------------------------
         */

        const submenuToggle =
            document.createElement("button");

        submenuToggle.type = "button";

        submenuToggle.className =
            "submenu-toggle";

        submenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        submenuToggle.setAttribute(
            "aria-controls",
            submenuId
        );

        submenuToggle.setAttribute(
            "aria-label",
            `Abrir submenú de ${link.textContent.trim()}`
        );


        /*
         * -------------------------------------------------
         * CREAR FLECHA
         * -------------------------------------------------
         */

        const arrow =
            document.createElement("span");

        arrow.className =
            "submenu-toggle__arrow";

        arrow.setAttribute(
            "aria-hidden",
            "true"
        );


        submenuToggle.appendChild(
            arrow
        );


        /*
         * -------------------------------------------------
         * INSERTAR EL BOTÓN
         *
         * IMPORTANTE:
         *
         * Lo colocamos ANTES del submenu.
         *
         * Resultado:
         *
         * <li>
         *
         *     <a>Hoteles</a>
         *
         *     <button>›</button>
         *
         *     <ul class="sub-menu">
         *         ...
         *     </ul>
         *
         * </li>
         * -------------------------------------------------
         */

        parent.insertBefore(
            submenuToggle,
            submenu
        );


        /*
         * -------------------------------------------------
         * CLICK DEL BOTÓN
         * -------------------------------------------------
         */

        submenuToggle.addEventListener(
            "click",
            (event) => {

                /*
                 * El botón es independiente
                 * del enlace principal.
                 */

                event.preventDefault();

                event.stopPropagation();


                /*
                 * Solo controla el submenu
                 * en mobile.
                 */

                if (window.innerWidth > 900) {
                    return;
                }


                /*
                 * Abrir / cerrar
                 */

                const isOpen =
                    submenu.classList.toggle(
                        "is-open"
                    );


                /*
                 * Clase en el elemento padre
                 */

                parent.classList.toggle(
                    "submenu-open",
                    isOpen
                );


                /*
                 * Accesibilidad
                 */

                submenuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

                submenuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? `Cerrar submenú de ${link.textContent.trim()}`
                        : `Abrir submenú de ${link.textContent.trim()}`
                );

            }
        );

    });


    /*
     * =====================================================
     * CERRAR SUBMENÚS
     * =====================================================
     */

    const closeMobileSubmenus = () => {

        document
            .querySelectorAll(
                ".primary-menu > .menu-item-has-children"
            )
            .forEach((parent) => {

                const submenu =
                    parent.querySelector(
                        ":scope > .sub-menu"
                    );

                const toggle =
                    parent.querySelector(
                        ":scope > .submenu-toggle"
                    );


                if (submenu) {

                    submenu.classList.remove(
                        "is-open"
                    );

                }


                parent.classList.remove(
                    "submenu-open"
                );


                if (toggle) {

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const link =
                        parent.querySelector(
                            ":scope > a"
                        );

                    if (link) {

                        toggle.setAttribute(
                            "aria-label",
                            `Abrir submenú de ${link.textContent.trim()}`
                        );

                    }

                }

            });

    };


    /*
     * =====================================================
     * CERRAR MENÚ AL CAMBIAR A DESKTOP
     * =====================================================
     */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                menuToggle?.classList.remove(
                    "is-active"
                );

                navigation?.classList.remove(
                    "is-open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                closeMobileSubmenus();

            }

        }
    );


    /*
     * =====================================================
     * ESC PARA CERRAR EL MENÚ
     * =====================================================
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navigation?.classList.contains(
                    "is-open"
                )
            ) {

                menuToggle?.click();

            }

        }
    );

});