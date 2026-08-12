import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    RichText,
    InspectorControls,
    BlockControls,
    AlignmentToolbar
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    ToggleControl,
    RangeControl,
    ColorPalette,
    Button,
    ButtonGroup
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


/*
 * =====================================================
 * EDIT
 * =====================================================
 */

function Edit({ attributes, setAttributes }) {

    const {
        showTitle,
        showParagraph,
        titleTag,
        title,
        paragraph,

        titleFontSize,
        titleColor,
        titleFontWeight,

        paragraphFontSize,
        paragraphColor,
        paragraphFontWeight,

        textAlign,
        paragraphAlign,

        containerWidth
    } = attributes;


    /*
     * =================================================
     * PROPIEDADES DEL BLOQUE
     * =================================================
     */

    const blockProps = useBlockProps({
        className: [
            'cosmos-text',
            `cosmos-text--${containerWidth}`
        ].join(' ')
    });


    /*
     * =================================================
     * ESTILO DEL TÍTULO
     * =================================================
     */

    const titleStyle = {
        fontSize: `${titleFontSize}px`,
        color: titleColor,
        fontWeight: titleFontWeight,
        textAlign: textAlign
    };


    /*
     * =================================================
     * ESTILO DEL PÁRRAFO
     * =================================================
     */

    const paragraphStyle = {
        fontSize: `${paragraphFontSize}px`,
        color: paragraphColor,
        fontWeight: paragraphFontWeight,
        textAlign: paragraphAlign
    };


    /*
     * =================================================
     * DESTACADO
     *
     * Permite seleccionar texto y aplicar <strong>
     * directamente desde el editor.
     * =================================================
     */

    const allowedFormats = [
        'core/bold',
        'core/italic',
        'core/link'
    ];


    return (
        <Fragment>


            {/* ==========================================
                CONTROLES SUPERIORES
            =========================================== */}

            <BlockControls>
                {showTitle && (
                    <AlignmentToolbar
                        value={textAlign}
                        onChange={(value) =>
                            setAttributes({
                                textAlign: value || 'left'
                            })
                        }
                    />
                )}
            </BlockControls>


            <InspectorControls>


                {/* ======================================
                    CONTENIDO
                ======================================= */}

                <PanelBody
                    title={__('Contenido', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <ToggleControl
                        label={__('Mostrar título', 'hoteles-cosmos')}
                        checked={showTitle}
                        onChange={(value) =>
                            setAttributes({
                                showTitle: value
                            })
                        }
                    />

                    <ToggleControl
                        label={__('Mostrar párrafo', 'hoteles-cosmos')}
                        checked={showParagraph}
                        onChange={(value) =>
                            setAttributes({
                                showParagraph: value
                            })
                        }
                    />

                </PanelBody>


                {/* ======================================
                    TÍTULO
                ======================================= */}

                {showTitle && (

                    <PanelBody
                        title={__('Título', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <SelectControl
                            label={__('Tipo de título', 'hoteles-cosmos')}
                            value={titleTag}
                            options={[
                                {
                                    label: 'H1',
                                    value: 'h1'
                                },
                                {
                                    label: 'H2',
                                    value: 'h2'
                                },
                                {
                                    label: 'H3',
                                    value: 'h3'
                                },
                                {
                                    label: 'H4',
                                    value: 'h4'
                                },
                                {
                                    label: 'H5',
                                    value: 'h5'
                                },
                                {
                                    label: 'H6',
                                    value: 'h6'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleTag: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Tamaño del título', 'hoteles-cosmos')}
                            value={titleFontSize}
                            onChange={(value) =>
                                setAttributes({
                                    titleFontSize: value
                                })
                            }
                            min={12}
                            max={120}
                        />


                        <SelectControl
                            label={__('Peso del título', 'hoteles-cosmos')}
                            value={titleFontWeight}
                            options={[
                                {
                                    label: 'Normal',
                                    value: 400
                                },
                                {
                                    label: 'Medio',
                                    value: 500
                                },
                                {
                                    label: 'Seminegrita',
                                    value: 600
                                },
                                {
                                    label: 'Negrita',
                                    value: 700
                                },
                                {
                                    label: 'Extra negrita',
                                    value: 800
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleFontWeight: Number(value)
                                })
                            }
                        />


                        <p>
                            {__('Color del título', 'hoteles-cosmos')}
                        </p>

                        <ColorPalette
                            value={titleColor}
                            onChange={(value) =>
                                setAttributes({
                                    titleColor: value || '#111111'
                                })
                            }
                        />

                    </PanelBody>

                )}


                {/* ======================================
                    PÁRRAFO
                ======================================= */}

                {showParagraph && (

                    <PanelBody
                        title={__('Párrafo', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <RangeControl
                            label={__('Tamaño del párrafo', 'hoteles-cosmos')}
                            value={paragraphFontSize}
                            onChange={(value) =>
                                setAttributes({
                                    paragraphFontSize: value
                                })
                            }
                            min={10}
                            max={60}
                        />


                        <SelectControl
                            label={__('Peso del párrafo', 'hoteles-cosmos')}
                            value={paragraphFontWeight}
                            options={[
                                {
                                    label: 'Normal',
                                    value: 400
                                },
                                {
                                    label: 'Medio',
                                    value: 500
                                },
                                {
                                    label: 'Seminegrita',
                                    value: 600
                                },
                                {
                                    label: 'Negrita',
                                    value: 700
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    paragraphFontWeight: Number(value)
                                })
                            }
                        />


                        <p>
                            {__('Color del párrafo', 'hoteles-cosmos')}
                        </p>

                        <ColorPalette
                            value={paragraphColor}
                            onChange={(value) =>
                                setAttributes({
                                    paragraphColor: value || '#333333'
                                })
                            }
                        />


                        <SelectControl
                            label={__('Alineación del párrafo', 'hoteles-cosmos')}
                            value={paragraphAlign}
                            options={[
                                {
                                    label: 'Izquierda',
                                    value: 'left'
                                },
                                {
                                    label: 'Centro',
                                    value: 'center'
                                },
                                {
                                    label: 'Derecha',
                                    value: 'right'
                                },
                                {
                                    label: 'Justificado',
                                    value: 'justify'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    paragraphAlign: value
                                })
                            }
                        />

                    </PanelBody>

                )}


                {/* ======================================
                    CONTENEDOR
                ======================================= */}

                <PanelBody
                    title={__('Ancho del bloque', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <SelectControl
                        label={__('Ancho', 'hoteles-cosmos')}
                        value={containerWidth}
                        options={[
                            {
                                label: 'Container',
                                value: 'container'
                            },
                            {
                                label: 'Ancho completo',
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                containerWidth: value
                            })
                        }
                    />

                </PanelBody>


            </InspectorControls>


            {/* ==========================================
                BLOQUE
            =========================================== */}

            <div {...blockProps}>


                {/* ======================================
                    TÍTULO
                ======================================= */}

                {showTitle && (

                    <RichText
                        tagName={titleTag}
                        className="cosmos-text__title"
                        value={title}
                        onChange={(value) =>
                            setAttributes({
                                title: value
                            })
                        }
                        style={titleStyle}
                        placeholder={__(
                            'Escribe el título...',
                            'hoteles-cosmos'
                        )}
                        allowedFormats={allowedFormats}
                    />

                )}


                {/* ======================================
                    PÁRRAFO
                ======================================= */}

                {showParagraph && (

                    <RichText
                        tagName="div"
                        className="cosmos-text__paragraph"
                        value={paragraph}
                        onChange={(value) =>
                            setAttributes({
                                paragraph: value
                            })
                        }
                        style={paragraphStyle}
                        placeholder={__(
                            'Escribe el contenido...',
                            'hoteles-cosmos'
                        )}
                        allowedFormats={allowedFormats}
                    />

                )}

            </div>

        </Fragment>
    );
}


/*
 * =====================================================
 * REGISTRAR BLOQUE
 * =====================================================
 */

registerBlockType('hoteles-cosmos/text', {
    edit: Edit
});