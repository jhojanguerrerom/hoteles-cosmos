
<?php

/*
 * =====================================================
 * ATRIBUTOS DEL BLOQUE
 * =====================================================
 */

$margin_top = isset($attributes['marginTop'])
    ? intval($attributes['marginTop'])
    : 30;

$margin_bottom = isset($attributes['marginBottom'])
    ? intval($attributes['marginBottom'])
    : 30;

$show_shadow = !isset($attributes['showShadow'])
    || !empty($attributes['showShadow']);

$border_radius = isset($attributes['borderRadius'])
    ? intval($attributes['borderRadius'])
    : 0;

$content_width = $attributes['contentWidth'] ?? 'container';

$button_text = $attributes['buttonText'] ?? 'Reserve ahora';

$button_background = $attributes['buttonBackgroundColor'] ?? '#111111';

$button_color = $attributes['buttonTextColor'] ?? '#ffffff';


/*
 * =====================================================
 * LIMITAR ATRIBUTOS
 * =====================================================
 */

$margin_top = max(0, min(150, $margin_top));
$margin_bottom = max(0, min(150, $margin_bottom));
$border_radius = max(0, min(30, $border_radius));


/*
 * =====================================================
 * FUNCIONES AUXILIARES DE WHATSAPP
 * =====================================================
 */

/**
 * Extrae un número internacional de un enlace de WhatsApp.
 *
 * Formatos admitidos:
 * https://api.whatsapp.com/send/?phone=573202680403&text...
 * https://api.whatsapp.com/send?phone=573202680403
 * https://wa.me/573202680403
 * https://web.whatsapp.com/send?phone=573202680403
 *
 * También admite el formato personalizado whatsapp:+573202680403
 * como compatibilidad, aunque no es necesario utilizarlo.
 */
if (!function_exists('cosmos_booking_extract_whatsapp_phone')) {
    function cosmos_booking_extract_whatsapp_phone($url) {

        $url = trim((string) $url);

        if ($url === '') {
            return '';
        }

        // Compatibilidad con el formato personalizado.
        if (preg_match('/^whatsapp:\+?([0-9]{10,15})$/i', $url, $matches)) {
            return $matches[1];
        }

        $parsed = wp_parse_url($url);

        if (!is_array($parsed) || empty($parsed['host'])) {
            return '';
        }

        $host = strtolower($parsed['host']);

        $allowed_hosts = [
            'api.whatsapp.com',
            'www.api.whatsapp.com',
            'wa.me',
            'www.wa.me',
            'web.whatsapp.com',
            'www.web.whatsapp.com',
        ];

        if (!in_array($host, $allowed_hosts, true)) {
            return '';
        }

        $phone = '';

        // Enlaces api.whatsapp.com y web.whatsapp.com.
        if (isset($parsed['query'])) {
            $query = [];

            parse_str($parsed['query'], $query);

            if (isset($query['phone'])) {
                $phone = (string) $query['phone'];
            }
        }

        // Enlaces wa.me/573202680403.
        if ($phone === '' && in_array($host, ['wa.me', 'www.wa.me'], true)) {
            $phone = trim($parsed['path'] ?? '', '/');
        }

        // El teléfono debe contener exclusivamente dígitos.
        $phone = preg_replace('/\D+/', '', $phone);

        // Validar longitud internacional razonable.
        if (
            !is_string($phone)
            || !preg_match('/^[0-9]{10,15}$/', $phone)
        ) {
            return '';
        }

        return $phone;
    }
}


/*
 * =====================================================
 * MENÚ GLOBAL DE HOTELES
 * =====================================================
 */

$hotels = [];

$menu_items = wp_get_nav_menu_items('Hoteles Motor de Reservas');

if ($menu_items) {

    foreach ($menu_items as $item) {

        // Solo elementos principales del menú.
        if (
            isset($item->menu_item_parent)
            && intval($item->menu_item_parent) !== 0
        ) {
            continue;
        }

        $hotel_name = trim(
            wp_strip_all_tags($item->title)
        );

        $hotel_url = trim((string) $item->url);

        if ($hotel_name === '' || $hotel_url === '') {
            continue;
        }

        $engine = 'unknown';
        $whatsapp_number = '';

        /*
         * 1. Detectar enlaces de WhatsApp.
         */
        $whatsapp_number = cosmos_booking_extract_whatsapp_phone(
            $hotel_url
        );

        if ($whatsapp_number !== '') {

            $engine = 'whatsapp';

        } else {

            /*
             * 2. Detectar motores de reservas existentes.
             */
            $parsed_url = wp_parse_url($hotel_url);

            $host = isset($parsed_url['host'])
                ? strtolower($parsed_url['host'])
                : '';

            if (
                strpos($host, 'cosmos100hotel.com') !== false
                || strpos($host, 'hotelescosmos.com') !== false
            ) {

                $engine = 'cosmos';

            } elseif (strpos($host, 'hilton.com') !== false) {

                $engine = 'hilton';
            }
        }

        $hotels[] = [
            'name' => $hotel_name,
            'url' => $hotel_url,
            'engine' => $engine,
            'whatsapp' => $whatsapp_number,
        ];
    }
}


/*
 * =====================================================
 * CLASES CSS
 * =====================================================
 */

$width_class = $content_width === 'full'
    ? 'cosmos-booking-engine--full'
    : 'cosmos-booking-engine--container';

$shadow_class = $show_shadow
    ? 'cosmos-booking-engine--shadow'
    : '';


/*
 * =====================================================
 * ESTILOS DINÁMICOS
 * =====================================================
 */

$style = sprintf(
    '--cosmos-booking-margin-top:%dpx;'
    . '--cosmos-booking-margin-bottom:%dpx;'
    . '--cosmos-booking-border-radius:%dpx;'
    . '--cosmos-booking-button-background:%s;'
    . '--cosmos-booking-button-color:%s;',
    $margin_top,
    $margin_bottom,
    $border_radius,
    sanitize_hex_color($button_background) ?: '#111111',
    sanitize_hex_color($button_color) ?: '#ffffff'
);


/*
 * =====================================================
 * RENDERIZADO DEL BLOQUE
 * =====================================================
 */

?>

<section
    <?php
    echo get_block_wrapper_attributes([
        'class' => trim(
            'cosmos-booking-engine '
            . $width_class . ' '
            . $shadow_class
        ),
        'style' => $style,
    ]);
    ?>
>

    <form
        class="cosmos-booking-engine__form"
        data-cosmos-booking-engine
        novalidate
    >

        <!-- HOTEL -->

        <div class="cosmos-booking-engine__field">

            <label for="cosmos-booking-hotel">
                Seleccione el hotel
            </label>

            <select
                id="cosmos-booking-hotel"
                name="hotel"
                required
            >

                <option value="">
                    Seleccione el hotel
                </option>

                <?php foreach ($hotels as $hotel) : ?>

                    <option
                        value="<?php echo esc_attr($hotel['url']); ?>"
                        data-engine="<?php echo esc_attr($hotel['engine']); ?>"
                        <?php if ($hotel['engine'] === 'whatsapp' && $hotel['whatsapp'] !== '') : ?>
                            data-whatsapp="<?php echo esc_attr($hotel['whatsapp']); ?>"
                        <?php endif; ?>
                    >
                        <?php echo esc_html($hotel['name']); ?>
                    </option>

                <?php endforeach; ?>

            </select>

        </div>


        <!-- ENTRADA -->

        <div class="cosmos-booking-engine__field">

            <label for="cosmos-booking-datein">
                Entrada
            </label>

            <input
                type="date"
                id="cosmos-booking-datein"
                name="datein"
                required
            >

        </div>


        <!-- SALIDA -->

        <div class="cosmos-booking-engine__field">

            <label for="cosmos-booking-dateout">
                Salida
            </label>

            <input
                type="date"
                id="cosmos-booking-dateout"
                name="dateout"
                required
            >

        </div>


        <!-- HABITACIONES -->

        <div class="cosmos-booking-engine__field cosmos-booking-engine__field--small">

            <label for="cosmos-booking-rooms">
                Habitaciones
            </label>

            <input
                type="number"
                id="cosmos-booking-rooms"
                name="rooms"
                value="1"
                min="1"
                max="10"
                required
            >

        </div>


        <!-- ADULTOS -->

        <div class="cosmos-booking-engine__field cosmos-booking-engine__field--small">

            <label for="cosmos-booking-adults">
                Adultos
            </label>

            <input
                type="number"
                id="cosmos-booking-adults"
                name="adults"
                value="1"
                min="1"
                max="20"
                required
            >

        </div>


        <!-- NIÑOS -->

        <div class="cosmos-booking-engine__field cosmos-booking-engine__field--small">

            <label for="cosmos-booking-children">
                Niños
            </label>

            <input
                type="number"
                id="cosmos-booking-children"
                name="children"
                value="0"
                min="0"
                max="20"
            >

        </div>


        <!-- BOTÓN -->

        <button
            type="submit"
            class="cosmos-booking-engine__button"
        >
            <?php echo esc_html($button_text); ?>
        </button>

    </form>


    <!-- CONFIGURACIÓN DEL BLOQUE -->

    <script
        type="application/json"
        class="cosmos-booking-engine__config"
    ><?php
        echo wp_json_encode(
            ['hotels' => $hotels],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
    ?></script>

</section>
