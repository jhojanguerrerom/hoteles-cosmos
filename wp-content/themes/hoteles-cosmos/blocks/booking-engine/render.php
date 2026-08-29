<?php

/*
 * =====================================================
 * ATRIBUTOS
 * =====================================================
 */

$margin_top =
    isset($attributes['marginTop'])
        ? intval($attributes['marginTop'])
        : 30;

$margin_bottom =
    isset($attributes['marginBottom'])
        ? intval($attributes['marginBottom'])
        : 30;

$show_shadow =
    !isset($attributes['showShadow'])
    || !empty($attributes['showShadow']);

$border_radius =
    isset($attributes['borderRadius'])
        ? intval($attributes['borderRadius'])
        : 0;

$content_width =
    $attributes['contentWidth']
        ?? 'container';

$button_text =
    $attributes['buttonText']
        ?? 'Reserve ahora';

$button_background =
    $attributes['buttonBackgroundColor']
        ?? '#111111';

$button_color =
    $attributes['buttonTextColor']
        ?? '#ffffff';


/*
 * =====================================================
 * LIMITES
 * =====================================================
 */

$margin_top = max(
    0,
    min(150, $margin_top)
);

$margin_bottom = max(
    0,
    min(150, $margin_bottom)
);

$border_radius = max(
    0,
    min(30, $border_radius)
);


/*
 * =====================================================
 * MENÚ GLOBAL DE HOTELES
 * =====================================================
 *
 * Este menú se administra desde WordPress.
 *
 * Nombre:
 * Hoteles Motor de Reservas
 *
 * Cada elemento del menú:
 *
 * Nombre = nombre del hotel
 * URL    = URL/base de reserva
 *
 * =====================================================
 */

$hotels = [];

$menu_items = wp_get_nav_menu_items(
    'Hoteles Motor de Reservas'
);


if ($menu_items) {

    foreach ($menu_items as $item) {

        /*
         * Solo tomamos elementos principales.
         * Esto evita incluir posibles submenús.
         */

        if (
            isset($item->menu_item_parent)
            && intval($item->menu_item_parent) !== 0
        ) {
            continue;
        }


        $hotel_name =
            trim(
                wp_strip_all_tags(
                    $item->title
                )
            );

        $hotel_url =
            trim(
                $item->url
            );


        if (
            !$hotel_name
            || !$hotel_url
        ) {
            continue;
        }


        /*
         * =================================================
         * IDENTIFICAR MOTOR
         * =================================================
         */

        $engine = 'unknown';

        $parsed_url =
            wp_parse_url(
                $hotel_url
            );


        $host =
            isset($parsed_url['host'])
                ? strtolower($parsed_url['host'])
                : '';


        if (
            strpos(
                $host,
                'cosmos100hotel.com'
            ) !== false
            ||
            strpos(
                $host,
                'hotelescosmos.com'
            ) !== false
        ) {

            $engine = 'cosmos';

        } elseif (
            strpos(
                $host,
                'hilton.com'
            ) !== false
        ) {

            $engine = 'hilton';

        }


        /*
         * =================================================
         * HOTELES
         * =================================================
         */

        $hotels[] = [

            'name' =>
                $hotel_name,

            'url' =>
                $hotel_url,

            'engine' =>
                $engine

        ];

    }

}


/*
 * =====================================================
 * CLASES
 * =====================================================
 */

$width_class =
    $content_width === 'full'
        ? 'cosmos-booking-engine--full'
        : 'cosmos-booking-engine--container';

$shadow_class =
    $show_shadow
        ? 'cosmos-booking-engine--shadow'
        : '';


/*
 * =====================================================
 * STYLE
 * =====================================================
 */

$style = sprintf(

    '--cosmos-booking-margin-top:%dpx;
     --cosmos-booking-margin-bottom:%dpx;
     --cosmos-booking-border-radius:%dpx;
     --cosmos-booking-button-background:%s;
     --cosmos-booking-button-color:%s;',

    $margin_top,
    $margin_bottom,
    $border_radius,

    esc_attr(
        $button_background
    ),

    esc_attr(
        $button_color
    )
);

?>


<section
    <?php
    echo get_block_wrapper_attributes([
        'class' =>
            'cosmos-booking-engine ' .
            $width_class .
            ' ' .
            $shadow_class,
        'style' => $style
    ]);
    ?>
>

    <form
        class="cosmos-booking-engine__form"
        data-cosmos-booking-engine
        novalidate
    >

        <!-- =================================================
             HOTEL
        ================================================== -->

        <div class="cosmos-booking-engine__field">

            <label
                for="cosmos-booking-hotel"
            >
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
                        value="<?php
                            echo esc_url(
                                $hotel['url']
                            );
                        ?>"
                        data-engine="<?php
                            echo esc_attr(
                                $hotel['engine']
                            );
                        ?>"
                    >

                        <?php
                        echo esc_html(
                            $hotel['name']
                        );
                        ?>

                    </option>

                <?php endforeach; ?>

            </select>

        </div>


        <!-- =================================================
             ENTRADA
        ================================================== -->

        <div class="cosmos-booking-engine__field">

            <label
                for="cosmos-booking-datein"
            >
                Entrada
            </label>

            <input
                type="date"
                id="cosmos-booking-datein"
                name="datein"
                required
            >

        </div>


        <!-- =================================================
             SALIDA
        ================================================== -->

        <div class="cosmos-booking-engine__field">

            <label
                for="cosmos-booking-dateout"
            >
                Salida
            </label>

            <input
                type="date"
                id="cosmos-booking-dateout"
                name="dateout"
                required
            >

        </div>


        <!-- =================================================
             HABITACIONES
        ================================================== -->

        <div
            class="
                cosmos-booking-engine__field
                cosmos-booking-engine__field--small
            "
        >

            <label
                for="cosmos-booking-rooms"
            >
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


        <!-- =================================================
             ADULTOS
        ================================================== -->

        <div
            class="
                cosmos-booking-engine__field
                cosmos-booking-engine__field--small
            "
        >

            <label
                for="cosmos-booking-adults"
            >
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


        <!-- =================================================
             NIÑOS
        ================================================== -->

        <div
            class="
                cosmos-booking-engine__field
                cosmos-booking-engine__field--small
            "
        >

            <label
                for="cosmos-booking-children"
            >
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


        <!-- =================================================
             BOTÓN
        ================================================== -->

        <button
            type="submit"
            class="cosmos-booking-engine__button"
        >

            <?php
            echo esc_html(
                $button_text
            );
            ?>

        </button>

    </form>


    <!-- =====================================================
         CONFIGURACIÓN
    ===================================================== -->

    <script
        type="application/json"
        class="cosmos-booking-engine__config"
    >

        <?php
        echo wp_json_encode(
            [
                'hotels' => $hotels
            ],
            JSON_UNESCAPED_SLASHES |
            JSON_UNESCAPED_UNICODE
        );
        ?>

    </script>

</section>