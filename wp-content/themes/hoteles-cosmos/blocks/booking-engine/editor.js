import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    ColorPalette
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


function Edit({ attributes, setAttributes }) {

    const {

        marginTop,
        marginBottom,

        showShadow,
        borderRadius,

        contentWidth,

        buttonText,
        buttonBackgroundColor,
        buttonTextColor

    } = attributes;


    /*
     * =====================================================
     * BLOCK PROPS
     * =====================================================
     */

    const blockProps = useBlockProps({

        className: [
            'cosmos-booking-engine',
            `cosmos-booking-engine--${contentWidth}`
        ].join(' '),

        style: {

            '--cosmos-booking-margin-top':
                `${marginTop}px`,

            '--cosmos-booking-margin-bottom':
                `${marginBottom}px`,

            '--cosmos-booking-border-radius':
                `${borderRadius}px`,

            '--cosmos-booking-button-background':
                buttonBackgroundColor,

            '--cosmos-booking-button-color':
                buttonTextColor

        }

    });


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    DISEÑO
                ================================================= */}

                <PanelBody
                    title="Diseño"
                    initialOpen={true}
                >

                    <SelectControl

                        label="Ancho"

                        value={contentWidth}

                        options={[

                            {
                                label: 'Container del sitio',
                                value: 'container'
                            },

                            {
                                label: 'Ancho completo',
                                value: 'full'
                            }

                        ]}

                        onChange={(value) =>
                            setAttributes({
                                contentWidth: value
                            })
                        }

                    />


                    <RangeControl

                        label="Margen superior"

                        value={marginTop}

                        onChange={(value) =>
                            setAttributes({
                                marginTop: value
                            })
                        }

                        min={0}

                        max={150}

                        step={5}

                    />


                    <RangeControl

                        label="Margen inferior"

                        value={marginBottom}

                        onChange={(value) =>
                            setAttributes({
                                marginBottom: value
                            })
                        }

                        min={0}

                        max={150}

                        step={5}

                    />


                    <ToggleControl

                        label="Mostrar sombra"

                        checked={showShadow}

                        onChange={(value) =>
                            setAttributes({
                                showShadow: value
                            })
                        }

                    />


                    <RangeControl

                        label="Radio de las esquinas"

                        value={borderRadius}

                        onChange={(value) =>
                            setAttributes({
                                borderRadius: value
                            })
                        }

                        min={0}

                        max={30}

                        step={1}

                    />

                </PanelBody>


                {/* =================================================
                    BOTÓN
                ================================================= */}

                <PanelBody
                    title="Botón"
                    initialOpen={false}
                >

                    <TextControl

                        label="Texto"

                        value={buttonText}

                        onChange={(value) =>
                            setAttributes({
                                buttonText: value
                            })
                        }

                    />


                    <p>
                        <strong>
                            Fondo
                        </strong>
                    </p>

                    <ColorPalette

                        value={buttonBackgroundColor}

                        onChange={(value) =>
                            setAttributes({

                                buttonBackgroundColor:
                                    value || '#111111'

                            })
                        }

                    />


                    <p>
                        <strong>
                            Texto
                        </strong>
                    </p>

                    <ColorPalette

                        value={buttonTextColor}

                        onChange={(value) =>
                            setAttributes({

                                buttonTextColor:
                                    value || '#ffffff'

                            })
                        }

                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                EDITOR
            ===================================================== */}

            <div {...blockProps}>

                <div
                    className="
                        cosmos-booking-engine__preview
                    "
                >

                    <div
                        className="
                            cosmos-booking-engine__field
                        "
                    >

                        <span>
                            Seleccione el hotel
                        </span>

                        <strong>
                            Seleccione un hotel
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__field
                        "
                    >

                        <span>
                            Entrada
                        </span>

                        <strong>
                            28/08/2026
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__field
                        "
                    >

                        <span>
                            Salida
                        </span>

                        <strong>
                            29/08/2026
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__field
                            cosmos-booking-engine__field--small
                        "
                    >

                        <span>
                            Habitaciones
                        </span>

                        <strong>
                            1
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__field
                            cosmos-booking-engine__field--small
                        "
                    >

                        <span>
                            Adultos
                        </span>

                        <strong>
                            1
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__field
                            cosmos-booking-engine__field--small
                        "
                    >

                        <span>
                            Niños
                        </span>

                        <strong>
                            0
                        </strong>

                    </div>


                    <div
                        className="
                            cosmos-booking-engine__button
                        "
                    >

                        {buttonText}

                    </div>

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(

    metadata.name,

    {
        ...metadata,

        edit: Edit,

        save: () => null

    }

);