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

        hasBorder,
        borderColor,
        borderWidth,

        borderRadius,

        paddingVertical,
        paddingHorizontal,

        hasUnderline,

        marginTop,
        marginBottom

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

        className: 'cosmos-cta',

        style: {

            '--cosmos-cta-text-color':
                textColor,

            '--cosmos-cta-text-align':
                textAlign,

            '--cosmos-cta-font-size':
                `${fontSize}px`,

            '--cosmos-cta-font-weight':
                fontWeight,

            '--cosmos-cta-background':
                hasBackground
                    ? backgroundColor
                    : 'transparent',

            '--cosmos-cta-border-width':
                hasBorder
                    ? `${borderWidth}px`
                    : '0px',

            '--cosmos-cta-border-color':
                hasBorder
                    ? borderColor
                    : 'transparent',

            '--cosmos-cta-border-radius':
                `${borderRadius}px`,

            '--cosmos-cta-padding-vertical':
                `${paddingVertical}px`,

            '--cosmos-cta-padding-horizontal':
                `${paddingHorizontal}px`,

            '--cosmos-cta-text-decoration':
                hasUnderline
                    ? 'underline'
                    : 'none',

            '--cosmos-cta-margin-top':
                `${marginTop}px`,

            '--cosmos-cta-margin-bottom':
                `${marginBottom}px`
        }

    });


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
                                label: __('Medio', 'hoteles-cosmos'),
                                value: '500'
                            },
                            {
                                label: __('Seminegrita', 'hoteles-cosmos'),
                                value: '600'
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
                                textColor:
                                    value || '#111111'
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    FONDO
                ================================================= */}

                <PanelBody
                    title={__('Fondo', 'hoteles-cosmos')}
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

                </PanelBody>


                {/* =================================================
                    BORDE
                ================================================= */}

                <PanelBody
                    title={__('Borde', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <ToggleControl
                        label={__('Mostrar borde', 'hoteles-cosmos')}
                        checked={hasBorder}
                        onChange={(value) =>
                            setAttributes({
                                hasBorder: value
                            })
                        }
                    />


                    {hasBorder && (

                        <>

                            <p>
                                {__('Color del borde', 'hoteles-cosmos')}
                            </p>

                            <ColorPalette
                                value={borderColor}
                                onChange={(value) =>
                                    setAttributes({
                                        borderColor:
                                            value || '#111111'
                                    })
                                }
                            />


                            <RangeControl
                                label={__('Grosor del borde', 'hoteles-cosmos')}
                                value={borderWidth}
                                onChange={(value) =>
                                    setAttributes({
                                        borderWidth: value
                                    })
                                }
                                min={1}
                                max={10}
                                step={1}
                            />

                        </>

                    )}

                </PanelBody>


                {/* =================================================
                    FORMA Y ESPACIADO DEL BOTÓN
                ================================================= */}

                <PanelBody
                    title={__('Forma y espaciado', 'hoteles-cosmos')}
                    initialOpen={false}
                >

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
                            '0 px = esquinas rectas.',
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
                    MÁRGENES
                ================================================= */}

                <PanelBody
                    title={__('Margen del bloque', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__('Margen superior', 'hoteles-cosmos')}
                        value={marginTop}
                        onChange={(value) =>
                            setAttributes({
                                marginTop: value
                            })
                        }
                        min={0}
                        max={250}
                        step={1}
                    />


                    <RangeControl
                        label={__('Margen inferior', 'hoteles-cosmos')}
                        value={marginBottom}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom: value
                            })
                        }
                        min={0}
                        max={250}
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