import { registerBlockType } from '@wordpress/blocks';

import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
    URLInput
} from '@wordpress/block-editor';

import {
    PanelBody,
    ToggleControl,
    RangeControl,
    SelectControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        text,
        url,
        textColor,
        textAlign,
        fontSize,
        fontWeight,
        hasBackground,
        backgroundColor,
        borderRadius,
        paddingVertical,
        paddingHorizontal,
        hasUnderline
    } = attributes;


    /*
     * =====================================================
     * CLASE DE ALINEACIÓN
     * =====================================================
     */

    const alignmentClass =
        `cosmos-cta__inner--${textAlign}`;


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: 'cosmos-cta'
    });


    /*
     * =====================================================
     * ESTILOS DEL CTA
     * =====================================================
     */

    const linkStyle = {

        color: textColor,

        textAlign: textAlign,

        fontSize: `${fontSize}px`,

        fontWeight: fontWeight,

        backgroundColor: hasBackground
            ? backgroundColor
            : 'transparent',

        borderRadius: `${borderRadius}px`,

        padding: `${paddingVertical}px ${paddingHorizontal}px`,

        textDecoration: hasUnderline
            ? 'underline'
            : 'none'
    };


    return (

        <Fragment>

            <InspectorControls>


                {/* =================================================
                    ENLACE
                ================================================= */}

                <PanelBody
                    title={__('Enlace', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <p>
                        {__('URL del CTA', 'hoteles-cosmos')}
                    </p>

                    <URLInput
                        value={url}
                        onChange={(value) =>
                            setAttributes({
                                url: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title={__('Texto', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Alineación', 'hoteles-cosmos')}
                        value={textAlign}
                        options={[
                            {
                                label: __('Izquierda', 'hoteles-cosmos'),
                                value: 'left'
                            },
                            {
                                label: __('Centro', 'hoteles-cosmos'),
                                value: 'center'
                            },
                            {
                                label: __('Derecha', 'hoteles-cosmos'),
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                textAlign: value
                            })
                        }
                    />


                    <RangeControl
                        label={__('Tamaño del texto', 'hoteles-cosmos')}
                        value={fontSize}
                        onChange={(value) =>
                            setAttributes({
                                fontSize: value
                            })
                        }
                        min={12}
                        max={100}
                        step={1}
                    />


                    <SelectControl
                        label={__('Peso del texto', 'hoteles-cosmos')}
                        value={fontWeight}
                        options={[
                            {
                                label: __('Normal', 'hoteles-cosmos'),
                                value: '400'
                            },
                            {
                                label: __('Seminegrita', 'hoteles-cosmos'),
                                value: '500'
                            },
                            {
                                label: __('Negrita', 'hoteles-cosmos'),
                                value: '700'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                fontWeight: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    COLOR DEL TEXTO
                ================================================= */}

                <PanelBody
                    title={__('Color del texto', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <p>
                        {__('Selecciona el color del texto.', 'hoteles-cosmos')}
                    </p>

                    <ColorPalette
                        value={textColor}
                        onChange={(value) =>
                            setAttributes({
                                textColor: value || '#111111'
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    FONDO Y BOTÓN
                ================================================= */}

                <PanelBody
                    title={__('Fondo y botón', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <ToggleControl
                        label={__('Mostrar fondo', 'hoteles-cosmos')}
                        checked={hasBackground}
                        onChange={(value) =>
                            setAttributes({
                                hasBackground: value
                            })
                        }
                    />


                    {hasBackground && (

                        <>

                            <p>
                                {__('Color del fondo', 'hoteles-cosmos')}
                            </p>

                            <ColorPalette
                                value={backgroundColor}
                                onChange={(value) =>
                                    setAttributes({
                                        backgroundColor:
                                            value || '#111111'
                                    })
                                }
                            />

                        </>

                    )}


                    <RangeControl
                        label={__('Radio de las esquinas', 'hoteles-cosmos')}
                        value={borderRadius}
                        onChange={(value) =>
                            setAttributes({
                                borderRadius: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                        help={__(
                            '0 px = esquinas rectas. 50 px = muy redondeado.',
                            'hoteles-cosmos'
                        )}
                    />


                    <RangeControl
                        label={__('Espacio vertical del botón', 'hoteles-cosmos')}
                        value={paddingVertical}
                        onChange={(value) =>
                            setAttributes({
                                paddingVertical: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label={__('Espacio horizontal del botón', 'hoteles-cosmos')}
                        value={paddingHorizontal}
                        onChange={(value) =>
                            setAttributes({
                                paddingHorizontal: value
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    SUBRAYADO
                ================================================= */}

                <PanelBody
                    title={__('Subrayado', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <ToggleControl
                        label={__('Mostrar subrayado', 'hoteles-cosmos')}
                        checked={hasUnderline}
                        onChange={(value) =>
                            setAttributes({
                                hasUnderline: value
                            })
                        }
                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                BLOQUE
            ===================================================== */}

            <div {...blockProps}>

                <div
                    className={`cosmos-cta__inner ${alignmentClass}`}
                >

                    <a
                        className="cosmos-cta__link"
                        href={url || '#'}
                        style={linkStyle}
                        onClick={(event) => {

                            if (!url) {
                                event.preventDefault();
                            }

                        }}
                    >

                        <RichText
                            tagName="span"
                            className="cosmos-cta__text"
                            value={text}
                            onChange={(value) =>
                                setAttributes({
                                    text: value
                                })
                            }
                            placeholder={__(
                                'Escribe tu llamada a la acción...',
                                'hoteles-cosmos'
                            )}
                            allowedFormats={[]}
                        />

                    </a>

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(
    'hoteles-cosmos/cta',
    {
        edit: Edit
    }
);