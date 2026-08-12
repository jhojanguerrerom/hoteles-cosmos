document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("site-navigation");


    /*
     * HEADER AL HACER SCROLL
     */

    const updateHeader = () => {

        if (window.scrollY > 40) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /*
     * MENÚ HAMBURGUESA
     */

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("is-active");

            navigation.classList.toggle(
                "is-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
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

        });

    }


    /*
     * SUBMENÚS EN MOBILE
     */

    const menuItems =
        document.querySelectorAll(
            ".primary-menu > .menu-item-has-children > a"
        );


    menuItems.forEach((link) => {

        link.addEventListener("click", (event) => {

            if (window.innerWidth > 900) {
                return;
            }

            event.preventDefault();

            const parent =
                link.parentElement;

            const submenu =
                parent.querySelector(":scope > .sub-menu");

            if (!submenu) {
                return;
            }

            submenu.classList.toggle("is-open");

        });

    });


    /*
     * CERRAR MENÚ AL CAMBIAR A DESKTOP
     */

    window.addEventListener("resize", () => {

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

        }

    });


    /*
     * ESC PARA CERRAR EL MENÚ
     */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navigation?.classList.contains("is-open")
        ) {

            menuToggle?.click();

        }

    });

});