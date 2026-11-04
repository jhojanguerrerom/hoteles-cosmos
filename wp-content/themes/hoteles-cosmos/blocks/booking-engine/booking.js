
/*
 * =========================================================
 * COSMOS BOOKING ENGINE
 * Cosmos + Hilton + WhatsApp
 * =========================================================
 */

(function () {
    'use strict';

    function initBookingEngines() {
        document.querySelectorAll('[data-cosmos-booking-engine]').forEach(function (form) {

            if (form.dataset.bookingInitialized === 'true') {
                return;
            }

            const hotel = form.querySelector('#cosmos-booking-hotel');
            const dateIn = form.querySelector('#cosmos-booking-datein');
            const dateOut = form.querySelector('#cosmos-booking-dateout');
            const rooms = form.querySelector('#cosmos-booking-rooms');
            const adults = form.querySelector('#cosmos-booking-adults');
            const children = form.querySelector('#cosmos-booking-children');

            if (!hotel || !dateIn || !dateOut) {
                return;
            }

            form.dataset.bookingInitialized = 'true';

            const todayString = getLocalDateString(new Date());
            dateIn.min = todayString;
            dateOut.min = dateIn.value || todayString;

            dateIn.addEventListener('change', function () {
                dateOut.min = dateIn.value || todayString;

                if (dateOut.value && dateOut.value <= dateIn.value) {
                    dateOut.value = '';
                }
            });

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                clearErrors(form);

                if (!hotel.value) {
                    markError(hotel);
                    return;
                }

                if (!dateIn.value || dateIn.value < todayString) {
                    markError(dateIn);
                    return;
                }

                if (!dateOut.value || dateOut.value <= dateIn.value) {
                    markError(dateOut);
                    return;
                }

                const roomsValue = normalizeNumber(
                    rooms ? rooms.value : 1, 1, 10
                );

                const adultsValue = normalizeNumber(
                    adults ? adults.value : 1, 1, 20
                );

                const childrenValue = normalizeNumber(
                    children ? children.value : 0, 0, 20
                );

                const selectedOption = hotel.options[hotel.selectedIndex];

                if (!selectedOption) {
                    markError(hotel);
                    return;
                }

                const engine =
                    selectedOption.dataset.engine ||
                    detectEngine(hotel.value);

                /*
                 * WHATSAPP
                 * Usa el teléfono que PHP extrae del menú.
                 * La URL del menú sigue siendo una URL válida.
                 */

                if (engine === 'whatsapp') {
                    let phone =
                        selectedOption.dataset.whatsapp ||
                        selectedOption.dataset.phone ||
                        '';

                    const selectedUrl = hotel.value.trim();

                    // Respaldo: extraer el número directamente de la URL.
                    if (!phone) {
                        phone = extractWhatsAppPhone(selectedUrl);
                    }

                    phone = String(phone).replace(/\D/g, '');

                    if (!/^[0-9]{10,15}$/.test(phone)) {
                        console.error(
                            'Booking Engine: no se pudo obtener un número de WhatsApp válido.',
                            {
                                url: selectedUrl,
                                engine: engine,
                                phone: phone
                            }
                        );

                        window.alert(
                            'No se pudo identificar el WhatsApp de este hotel. Verifica la URL en el menú de WordPress.'
                        );
                        return;
                    }

                    const hotelName = selectedOption.textContent.trim();

                    const message = [
                        'Hola, quisiera consultar disponibilidad y tarifas.',
                        '',
                        'Hotel: ' + hotelName,
                        'Fecha de entrada: ' + formatDisplayDate(dateIn.value),
                        'Fecha de salida: ' + formatDisplayDate(dateOut.value),
                        'Habitaciones: ' + roomsValue,
                        'Adultos: ' + adultsValue,
                        'Niños: ' + childrenValue,
                        '',
                        '¿Podrían ayudarme con una cotización para estas fechas?'
                    ].join('\n');

                    const whatsappUrl =
                        'https://api.whatsapp.com/send/?phone=' +
                        encodeURIComponent(phone) +
                        '&text=' +
                        encodeURIComponent(message) +
                        '&type=phone_number&app_absent=0';

                    window.location.href = whatsappUrl;
                    return;
                }

                /*
                 * MOTORES DE RESERVA
                 */

                let reservationUrl = '';

                if (engine === 'cosmos') {
                    reservationUrl = buildCosmosUrl(
                        hotel.value,
                        dateIn.value,
                        dateOut.value,
                        roomsValue,
                        adultsValue,
                        childrenValue
                    );
                } else if (engine === 'hilton') {
                    reservationUrl = buildHiltonUrl(
                        hotel.value,
                        dateIn.value,
                        dateOut.value,
                        roomsValue,
                        adultsValue
                    );
                } else {
                    reservationUrl = hotel.value;
                }

                if (!reservationUrl) {
                    window.alert(
                        'No se pudo generar el enlace de reserva de este hotel.'
                    );
                    return;
                }

                window.location.href = reservationUrl;
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBookingEngines);
    } else {
        initBookingEngines();
    }
})();


/*
 * =========================================================
 * WHATSAPP: EXTRAER TELÉFONO DE LA URL
 * =========================================================
 */

function extractWhatsAppPhone(value) {
    if (!value) {
        return '';
    }

    const input = String(value).trim();

    // Compatibilidad opcional con whatsapp:+573202680403.
    const customMatch = input.match(/^whatsapp:\+?([0-9]{10,15})$/i);

    if (customMatch) {
        return customMatch[1];
    }

    try {
        const url = new URL(input, window.location.origin);
        const host = url.hostname.toLowerCase();

        if (
            host === 'api.whatsapp.com' ||
            host === 'web.whatsapp.com' ||
            host === 'www.api.whatsapp.com'
        ) {
            return url.searchParams.get('phone') || '';
        }

        if (host === 'wa.me' || host === 'www.wa.me') {
            return url.pathname.replace(/\//g, '');
        }
    } catch (error) {
        console.error('Booking Engine: URL no válida.', error);
    }

    return '';
}


/*
 * =========================================================
 * COSMOS
 * =========================================================
 */

function buildCosmosUrl(baseUrl, dateIn, dateOut, rooms, adults, children) {
    let url;

    try {
        url = new URL(baseUrl, window.location.origin);
    } catch (error) {
        console.error('Booking Engine: URL de Cosmos no válida.', error);
        return '';
    }

    url.search = '';

    url.searchParams.set('adults', String(adults));
    url.searchParams.set('children', String(children));
    url.searchParams.set('datein', formatCosmosDate(dateIn));
    url.searchParams.set('dateout', formatCosmosDate(dateOut));
    url.searchParams.set('domain', 'www.hotelescosmos.com');
    url.searchParams.set('languageid', '2');
    url.searchParams.set('rooms', String(rooms));
    url.hash = '/guestsandrooms';

    return url.toString();
}


/*
 * =========================================================
 * HILTON
 * =========================================================
 */

function buildHiltonUrl(baseUrl, dateIn, dateOut, rooms, adults) {
    let url;

    try {
        url = new URL(baseUrl, window.location.origin);
    } catch (error) {
        console.error('Booking Engine: URL de Hilton no válida.', error);
        return '';
    }

    let ctyhocn = url.searchParams.get('ctyhocn');

    if (!ctyhocn) {
        const match = baseUrl.match(/[?&]ctyhocn=([^&]+)/i);

        if (match) {
            ctyhocn = decodeURIComponent(match[1]);
        }
    }

    if (!ctyhocn) {
        console.error('Booking Engine: falta el parámetro ctyhocn de Hilton.');
        return '';
    }

    const arrival = parseDate(dateIn);
    const departure = parseDate(dateOut);

    if (!arrival || !departure) {
        return '';
    }

    url.search = '';

    url.searchParams.set('ctyhocn', ctyhocn);
    url.searchParams.set('inputModule', 'HOTEL_SEARCH');
    url.searchParams.set('arrivalDay', pad(arrival.day));
    url.searchParams.set('arrivalMonth', pad(arrival.month));
    url.searchParams.set('arrivalYear', String(arrival.year));
    url.searchParams.set('departureDay', pad(departure.day));
    url.searchParams.set('departureMonth', pad(departure.month));
    url.searchParams.set('departureYear', String(departure.year));
    url.searchParams.set('numRooms', String(rooms));
    url.searchParams.set('numAdults', String(adults));
    url.hash = '';

    return url.toString();
}


/*
 * =========================================================
 * FECHAS
 * =========================================================
 */

function getLocalDateString(date) {
    return date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate());
}

function formatCosmosDate(value) {
    const parsed = parseDate(value);

    if (!parsed) {
        return '';
    }

    return pad(parsed.month) + '/' +
        pad(parsed.day) + '/' +
        parsed.year;
}

function formatDisplayDate(value) {
    const parsed = parseDate(value);

    if (!parsed) {
        return value || '';
    }

    return pad(parsed.day) + '/' +
        pad(parsed.month) + '/' +
        parsed.year;
}

function parseDate(value) {
    if (!value) {
        return null;
    }

    const parts = value.split('-');

    if (parts.length !== 3) {
        return null;
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (!year || !month || !day) {
        return null;
    }

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
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
 * VALIDACIONES Y UTILIDADES
 * =========================================================
 */

function normalizeNumber(value, min, max) {
    let number = parseInt(value, 10);

    if (Number.isNaN(number)) {
        number = min;
    }

    return Math.max(min, Math.min(max, number));
}

function detectEngine(value) {
    if (!value) {
        return 'unknown';
    }

    const input = String(value).trim().toLowerCase();

    if (
        /^whatsapp:\+?[0-9]{10,15}$/i.test(input) ||
        input.includes('wa.me/') ||
        input.includes('api.whatsapp.com/send') ||
        input.includes('web.whatsapp.com/send')
    ) {
        return 'whatsapp';
    }

    if (
        input.includes('cosmos100hotel.com') ||
        input.includes('hotelescosmos.com')
    ) {
        return 'cosmos';
    }

    if (input.includes('hilton.com')) {
        return 'hilton';
    }

    return 'unknown';
}

function markError(element) {
    if (!element) {
        return;
    }

    const field = element.closest('.cosmos-booking-engine__field');

    if (field) {
        field.classList.add('has-error');
    }

    element.focus();
}

function clearErrors(form) {
    form.querySelectorAll('.cosmos-booking-engine__field').forEach(function (field) {
        field.classList.remove('has-error');
    });
}

function pad(number) {
    return String(number).padStart(2, '0');
}


/*
 * =========================================================
 * BOOKING ENGINE STICKY
 * MÓDULO INDEPENDIENTE
 * =========================================================
 */

(function () {
    'use strict';

    const HEADER_HEIGHT = 76;

    function initStickyBookingEngine(root) {
        if (
            !root ||
            root.dataset.stickyInitialized === 'true' ||
            !root.parentNode
        ) {
            return;
        }

        root.dataset.stickyInitialized = 'true';

        const spacer = document.createElement('div');
        spacer.className = 'cosmos-booking-engine__sticky-spacer';
        spacer.setAttribute('aria-hidden', 'true');

        root.parentNode.insertBefore(spacer, root);

        let isSticky = false;
        let originalTop = 0;
        let originalMarginTop = 0;
        let originalMarginBottom = 0;
        let resizeTimer = null;

        function measureOriginalPosition() {
            if (isSticky) {
                root.classList.remove('is-sticky');

                root.style.left = '';
                root.style.width = '';

                spacer.style.display = 'none';
                spacer.style.height = '0';
                spacer.style.width = '';

                isSticky = false;
            }

            const rect = root.getBoundingClientRect();
            const styles = window.getComputedStyle(root);

            originalTop = rect.top + window.scrollY;
            originalMarginTop = parseFloat(styles.marginTop) || 0;
            originalMarginBottom = parseFloat(styles.marginBottom) || 0;
        }

        function activateSticky() {
            if (isSticky) {
                return;
            }

            const rect = root.getBoundingClientRect();

            spacer.style.display = 'block';
            spacer.style.height = (
                rect.height +
                originalMarginTop +
                originalMarginBottom
            ) + 'px';

            spacer.style.width = rect.width + 'px';

            root.style.left = rect.left + 'px';
            root.style.width = rect.width + 'px';
            root.classList.add('is-sticky');

            isSticky = true;
        }

        function deactivateSticky() {
            if (!isSticky) {
                return;
            }

            root.classList.remove('is-sticky');
            root.style.left = '';
            root.style.width = '';

            spacer.style.display = 'none';
            spacer.style.height = '0';
            spacer.style.width = '';

            isSticky = false;
        }

        function updateSticky() {
            if (window.scrollY >= originalTop - HEADER_HEIGHT) {
                activateSticky();
            } else {
                deactivateSticky();
            }
        }

        function handleResize() {
            window.clearTimeout(resizeTimer);

            resizeTimer = window.setTimeout(function () {
                measureOriginalPosition();
                updateSticky();
            }, 150);
        }

        measureOriginalPosition();

        window.addEventListener('scroll', updateSticky, { passive: true });
        window.addEventListener('resize', handleResize);

        updateSticky();
    }

    function initAllStickyBookingEngines() {
        document.querySelectorAll('.cosmos-booking-engine').forEach(
            initStickyBookingEngine
        );
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllStickyBookingEngines);
    } else {
        initAllStickyBookingEngines();
    }
})();
