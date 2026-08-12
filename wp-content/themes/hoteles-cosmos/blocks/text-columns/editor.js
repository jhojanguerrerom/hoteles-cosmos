import { registerBlockType } from '@wordpress/blocks';

import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        columns,
        contentOne,
        contentTwo,
        textColor,
        fontSize,
        fontWeight,
        textAlign,
        hasBackground,
        backgroundColor,
        marginTop,
        marginBottom,
        columnGap
    } = attributes;


    const blockProps = useBlockProps({
        className: 'cosmos-text-columns',
        style: {
            '--cosmos-text-columns-text-color': textColor,
            '--cosmos-text-columns-background': hasBackground
                ? backgroundColor
                : 'transparent',
            '--cosmos-text-columns-font-size': `${fontSize}px`,
            '--cosmos-text-columns-font-weight': fontWeight,
            '--cosmos-text-columns-text-align': textAlign,
            '--cosmos-text-columns-margin-top': `${marginTop}px`,
            '--cosmos-text-columns-margin-bottom': `${marginBottom}px`,
            '--cosmos-text-columns-column-gap': `${columnGap}px`
        }
    });


    return (
        <Fragment>

            <InspectorControls>

                {/* =================================================
                    COLUMNAS
                ================================================= */}

                <PanelBody
                    title={__('Estructura', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Número de columnas', 'hoteles-cosmos')}
                        value={columns}
                        options={[
                            {
                                label: __('1 columna', 'hoteles-cosmos'),
                                value: 1
                            },
                            {
                                label: __('2 columnas', 'hoteles-cosmos'),
                                value: 2
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                columns: parseInt(value)
                            })
                        }
                    />

                    {columns === 2 && (

                        <RangeControl
                            label={__('Separación entre columnas', 'hoteles-cosmos')}
                            value={columnGap}
                            onChange={(value) =>
                                setAttributes({
                                    columnGap: value
                                })
                            }
                            min={0}
                            max={200}
                            step={1}
                        />

                    )}

                </PanelBody>


                {/* =================================================
                    TIPOGRAFÍA
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
                                label: __('Justificado', 'hoteles-cosmos'),
                                value: 'justify'
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
                        label={__('Tamaño de letra', 'hoteles-cosmos')}
                        value={fontSize}
                        onChange={(value) =>
                            setAttributes({
                                fontSize: value
                            })
                        }
                        min={10}
                        max={100}
                        step={1}
                    />


                    <SelectControl
                        label={__('Peso de la letra', 'hoteles-cosmos')}
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
                                            value || '#f5f5f5'
                                    })
                                }
                            />

                        </>

                    )}

                </PanelBody>


                {/* =================================================
                    ESPACIADO
                ================================================= */}

                <PanelBody
                    title={__('Espaciado', 'hoteles-cosmos')}
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
                        max={300}
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
                        max={300}
                        step={1}
                    />

                </PanelBody>

            </InspectorControls>


            <section {...blockProps}>

                <div className="container">

                    <div
                        className="cosmos-text-columns__grid"
                        style={{
                            '--cosmos-text-columns-column-gap':
                                `${columnGap}px`
                        }}
                    >

                        {/* =================================================
                            COLUMNA 1
                        ================================================= */}

                        <div className="cosmos-text-columns__column">

                            <RichText
                                tagName="div"
                                className="cosmos-text-columns__content"
                                value={contentOne}
                                onChange={(value) =>
                                    setAttributes({
                                        contentOne: value
                                    })
                                }
                                placeholder={__(
                                    'Escribe el contenido...',
                                    'hoteles-cosmos'
                                )}
                                allowedFormats={[
                                    'core/bold',
                                    'core/italic',
                                    'core/link',
                                    'core/strikethrough'
                                ]}
                            />

                        </div>


                        {/* =================================================
                            COLUMNA 2
                        ================================================= */}

                        {columns === 2 && (

                            <div className="cosmos-text-columns__column">

                                <RichText
                                    tagName="div"
                                    className="cosmos-text-columns__content"
                                    value={contentTwo}
                                    onChange={(value) =>
                                        setAttributes({
                                            contentTwo: value
                                        })
                                    }
                                    placeholder={__(
                                        'Escribe el contenido...',
                                        'hoteles-cosmos'
                                    )}
                                    allowedFormats={[
                                        'core/bold',
                                        'core/italic',
                                        'core/link',
                                        'core/strikethrough'
                                    ]}
                                />

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </Fragment>
    );
}


registerBlockType(
    'hoteles-cosmos/text-columns',
    {
        edit: Edit
    }
);