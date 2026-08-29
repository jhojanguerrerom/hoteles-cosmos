document.addEventListener(
    'DOMContentLoaded',
    function () {

        const engines =
            document.querySelectorAll(
                '[data-cosmos-booking-engine]'
            );


        if (!engines.length) {
            return;
        }


        engines.forEach(
            function (form) {

                /*
                 * =================================================
                 * ELEMENTOS
                 * =================================================
                 */

                const hotel =
                    form.querySelector(
                        '#cosmos-booking-hotel'
                    );

                const dateIn =
                    form.querySelector(
                        '#cosmos-booking-datein'
                    );

                const dateOut =
                    form.querySelector(
                        '#cosmos-booking-dateout'
                    );

                const rooms =
                    form.querySelector(
                        '#cosmos-booking-rooms'
                    );

                const adults =
                    form.querySelector(
                        '#cosmos-booking-adults'
                    );

                const children =
                    form.querySelector(
                        '#cosmos-booking-children'
                    );


                /*
                 * =================================================
                 * FECHA MÍNIMA
                 * =================================================
                 */

                const today =
                    new Date();

                const todayString =
                    today.toISOString()
                        .split('T')[0];


                if (dateIn) {

                    dateIn.min =
                        todayString;

                }


                /*
                 * =================================================
                 * SALIDA DESPUÉS DE ENTRADA
                 * =================================================
                 */

                if (dateIn && dateOut) {

                    dateIn.addEventListener(
                        'change',
                        function () {

                            if (!dateIn.value) {
                                return;
                            }


                            dateOut.min =
                                dateIn.value;


                            if (
                                dateOut.value
                                &&
                                dateOut.value <=
                                dateIn.value
                            ) {

                                dateOut.value =
                                    '';

                            }

                        }
                    );

                }


                /*
                 * =================================================
                 * SUBMIT
                 * =================================================
                 */

                form.addEventListener(
                    'submit',
                    function (event) {

                        event.preventDefault();


                        /*
                         * =========================================
                         * VALIDACIONES
                         * =========================================
                         */

                        clearErrors(form);


                        if (
                            !hotel
                            ||
                            !hotel.value
                        ) {

                            markError(hotel);

                            return;

                        }


                        if (
                            !dateIn
                            ||
                            !dateIn.value
                        ) {

                            markError(dateIn);

                            return;

                        }


                        if (
                            !dateOut
                            ||
                            !dateOut.value
                        ) {

                            markError(dateOut);

                            return;

                        }


                        if (
                            dateOut.value <=
                            dateIn.value
                        ) {

                            markError(dateOut);

                            return;

                        }


                        /*
                         * =========================================
                         * VALORES
                         * =========================================
                         */

                        const roomsValue =
                            normalizeNumber(
                                rooms
                                    ? rooms.value
                                    : 1,
                                1,
                                10
                            );


                        const adultsValue =
                            normalizeNumber(
                                adults
                                    ? adults.value
                                    : 1,
                                1,
                                20
                            );


                        const childrenValue =
                            normalizeNumber(
                                children
                                    ? children.value
                                    : 0,
                                0,
                                20
                            );


                        /*
                         * =========================================
                         * HOTEL SELECCIONADO
                         * =========================================
                         */

                        const selectedOption =
                            hotel.options[
                                hotel.selectedIndex
                            ];


                        if (!selectedOption) {
                            return;
                        }


                        const engine =
                            selectedOption.dataset.engine
                            || detectEngine(
                                hotel.value
                            );


                        /*
                         * =========================================
                         * URL
                         * =========================================
                         */

                        let reservationUrl = '';


                        if (
                            engine === 'cosmos'
                        ) {

                            reservationUrl =
                                buildCosmosUrl(
                                    hotel.value,
                                    dateIn.value,
                                    dateOut.value,
                                    roomsValue,
                                    adultsValue,
                                    childrenValue
                                );

                        } else if (
                            engine === 'hilton'
                        ) {

                            reservationUrl =
                                buildHiltonUrl(
                                    hotel.value,
                                    dateIn.value,
                                    dateOut.value,
                                    roomsValue,
                                    adultsValue
                                );

                        } else {

                            /*
                             * Si el menú contiene otro tipo
                             * de hotel, utilizamos la URL
                             * directamente.
                             */

                            reservationUrl =
                                hotel.value;

                        }


                        if (!reservationUrl) {
                            return;
                        }


                        /*
                         * =========================================
                         * REDIRECCIÓN
                         * =========================================
                         */

                        window.location.href =
                            reservationUrl;

                    }
                );

            }
        );

    }
);


/*
 * =========================================================
 * COSMOS
 * =========================================================
 */

function buildCosmosUrl(
    baseUrl,
    dateIn,
    dateOut,
    rooms,
    adults,
    children
) {

    let url;


    try {

        url =
            new URL(
                baseUrl,
                window.location.origin
            );

    } catch (error) {

        return '';

    }


    /*
     * -------------------------------------------------------
     * Parámetros Cosmos
     * -------------------------------------------------------
     */

    url.search = '';


    url.searchParams.set(
        'adults',
        String(adults)
    );

    url.searchParams.set(
        'children',
        String(children)
    );

    url.searchParams.set(
        'datein',
        formatCosmosDate(dateIn)
    );

    url.searchParams.set(
        'dateout',
        formatCosmosDate(dateOut)
    );

    url.searchParams.set(
        'domain',
        'www.hotelescosmos.com'
    );

    url.searchParams.set(
        'languageid',
        '2'
    );

    url.searchParams.set(
        'rooms',
        String(rooms)
    );


    /*
     * -------------------------------------------------------
     * Cosmos utiliza el hash del motor
     * -------------------------------------------------------
     */

    url.hash =
        '/guestsandrooms';


    return url.toString();

}


/*
 * =========================================================
 * HILTON
 * =========================================================
 */

function buildHiltonUrl(
    baseUrl,
    dateIn,
    dateOut,
    rooms,
    adults
) {

    let url;


    try {

        url =
            new URL(
                baseUrl,
                window.location.origin
            );

    } catch (error) {

        return '';

    }


    /*
     * -------------------------------------------------------
     * Obtener ctyhocn
     * -------------------------------------------------------
     */

    const existingCtyhocn =
        url.searchParams.get(
            'ctyhocn'
        );


    let ctyhocn =
        existingCtyhocn;


    /*
     * Si por alguna razón el parámetro
     * no está en la URL del menú,
     * intentamos obtenerlo de la ruta
     * o del contenido de la URL.
     */

    if (!ctyhocn) {

        const match =
            baseUrl.match(
                /ctyhocn=([^&]+)/i
            );


        if (match) {

            ctyhocn =
                match[1];

        }

    }


    if (!ctyhocn) {
        return '';
    }


    /*
     * -------------------------------------------------------
     * Fechas
     * -------------------------------------------------------
     */

    const arrival =
        parseDate(
            dateIn
        );


    const departure =
        parseDate(
            dateOut
        );


    if (
        !arrival
        ||
        !departure
    ) {

        return '';

    }


    /*
     * -------------------------------------------------------
     * Construcción limpia
     * -------------------------------------------------------
     */

    url.search = '';


    url.searchParams.set(
        'ctyhocn',
        ctyhocn
    );

    url.searchParams.set(
        'inputModule',
        'HOTEL_SEARCH'
    );

    url.searchParams.set(
        'arrivalDay',
        pad(
            arrival.day
        )
    );

    url.searchParams.set(
        'arrivalMonth',
        pad(
            arrival.month
        )
    );

    url.searchParams.set(
        'arrivalYear',
        String(
            arrival.year
        )
    );

    url.searchParams.set(
        'departureDay',
        pad(
            departure.day
        )
    );

    url.searchParams.set(
        'departureMonth',
        pad(
            departure.month
        )
    );

    url.searchParams.set(
        'departureYear',
        String(
            departure.year
        )
    );

    url.searchParams.set(
        'numRooms',
        String(rooms)
    );

    url.searchParams.set(
        'numAdults',
        String(adults)
    );


    url.hash = '';


    return url.toString();

}


/*
 * =========================================================
 * FECHA COSMOS
 * =========================================================
 */

function formatCosmosDate(
    value
) {

    const parsed =
        parseDate(
            value
        );


    if (!parsed) {
        return '';
    }


    return (
        pad(parsed.month)
        + '/'
        + pad(parsed.day)
        + '/'
        + parsed.year
    );

}


/*
 * =========================================================
 * PARSE DATE
 * =========================================================
 */

function parseDate(
    value
) {

    if (!value) {
        return null;
    }


    const parts =
        value.split('-');


    if (
        parts.length !== 3
    ) {

        return null;

    }


    const year =
        parseInt(
            parts[0],
            10
        );


    const month =
        parseInt(
            parts[1],
            10
        );


    const day =
        parseInt(
            parts[2],
            10
        );


    if (
        !year
        ||
        !month
        ||
        !day
    ) {

        return null;

    }


    return {

        year: year,

        month: month,

        day: day

    };

}


/*
 * =========================================================
 * NÚMEROS
 * =========================================================
 */

function normalizeNumber(
    value,
    min,
    max
) {

    let number =
        parseInt(
            value,
            10
        );


    if (
        Number.isNaN(number)
    ) {

        number = min;

    }


    number =
        Math.max(
            min,
            Math.min(
                max,
                number
            )
        );


    return number;

}


/*
 * =========================================================
 * ENGINE
 * =========================================================
 */

function detectEngine(
    url
) {

    if (!url) {
        return 'unknown';
    }


    const lower =
        url.toLowerCase();


    if (
        lower.includes(
            'cosmos100hotel.com'
        )
        ||
        lower.includes(
            'hotelescosmos.com'
        )
    ) {

        return 'cosmos';

    }


    if (
        lower.includes(
            'hilton.com'
        )
    ) {

        return 'hilton';

    }


    return 'unknown';

}


/*
 * =========================================================
 * ERROR
 * =========================================================
 */

function markError(
    element
) {

    if (!element) {
        return;
    }


    const field =
        element.closest(
            '.cosmos-booking-engine__field'
        );


    if (field) {

        field.classList.add(
            'has-error'
        );

    }


    element.focus();

}


/*
 * =========================================================
 * CLEAR ERRORS
 * =========================================================
 */

function clearErrors(
    form
) {

    const fields =
        form.querySelectorAll(
            '.cosmos-booking-engine__field'
        );


    fields.forEach(
        function (field) {

            field.classList.remove(
                'has-error'
            );

        }
    );

}


/*
 * =========================================================
 * PAD
 * =========================================================
 */

function pad(
    number
) {

    return String(
        number
    ).padStart(
        2,
        '0'
    );

}