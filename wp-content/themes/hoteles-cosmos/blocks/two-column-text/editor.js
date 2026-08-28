import { registerBlockType } from '@wordpress/blocks';

import {
    InspectorControls,
    RichText,
    useBlockProps,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    RangeControl,
    SelectControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


registerBlockType('hoteles-cosmos/two-column-text', {

    edit: ({ attributes, setAttributes }) => {

        const {

            backgroundColor,

            paddingTop,
            paddingBottom,

            blockMarginTop,
            blockMarginBottom,

            columnGap,

            leftColumnWidth,

            leftText,
            leftTextColor,
            leftTextSize,
            leftTextWeight,
            leftTextAlign,

            rightText,
            rightTextColor,
            rightTextSize,
            rightTextWeight,
            rightTextAlign

        } = attributes;


        /*
         * =====================================================
         * CALCULAR COLUMNA DERECHA
         * =====================================================
         */

        const rightColumnWidth =
            100 - leftColumnWidth;


        /*
         * =====================================================
         * VARIABLES CSS
         * =====================================================
         */

        const blockProps = useBlockProps({

            className: 'cosmos-two-column-text',

            style: {

                '--cosmos-two-column-background':
                    backgroundColor,

                '--cosmos-two-column-padding-top':
                    `${paddingTop}px`,

                '--cosmos-two-column-padding-bottom':
                    `${paddingBottom}px`,

                '--cosmos-two-column-margin-top':
                    `${blockMarginTop}px`,

                '--cosmos-two-column-margin-bottom':
                    `${blockMarginBottom}px`,

                '--cosmos-two-column-gap':
                    `${columnGap}px`,

                '--cosmos-two-column-left-width':
                    `${leftColumnWidth}%`

            }

        });


        return (

            <Fragment>

                <InspectorControls>


                    {/* =================================================
                        FONDO
                    ================================================= */}

                    <PanelBody
                        title="Fondo"
                        initialOpen={true}
                    >

                        <p>
                            Color de fondo
                        </p>

                        <ColorPalette

                            value={backgroundColor}

                            onChange={(value) =>
                                setAttributes({
                                    backgroundColor:
                                        value || '#ffffff'
                                })
                            }

                        />

                    </PanelBody>


                    {/* =================================================
                        DISTRIBUCIÓN
                    ================================================= */}

                    <PanelBody
                        title="Distribución de columnas"
                        initialOpen={true}
                    >

                        <RangeControl

                            label="Ancho de la columna izquierda"

                            value={leftColumnWidth}

                            onChange={(value) =>
                                setAttributes({
                                    leftColumnWidth: value
                                })
                            }

                            min={20}

                            max={80}

                            step={5}

                        />


                        <div
                            style={{
                                marginTop: '12px',
                                padding: '12px',
                                background: '#f0f0f0',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}
                        >

                            <strong>
                                Izquierda: {leftColumnWidth}%
                            </strong>

                            <br />

                            <span>
                                Derecha: {rightColumnWidth}%
                            </span>

                        </div>

                    </PanelBody>


                    {/* =================================================
                        COLUMNA IZQUIERDA
                    ================================================= */}

                    <PanelBody
                        title={`Columna izquierda — ${leftColumnWidth}%`}
                        initialOpen={true}
                    >

                        <RangeControl

                            label="Tamaño del texto"

                            value={leftTextSize}

                            onChange={(value) =>
                                setAttributes({
                                    leftTextSize: value
                                })
                            }

                            min={14}

                            max={100}

                        />


                        <SelectControl

                            label="Peso"

                            value={leftTextWeight}

                            options={[
                                {
                                    label: 'Regular',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                }
                            ]}

                            onChange={(value) =>
                                setAttributes({
                                    leftTextWeight: value
                                })
                            }

                        />


                        <SelectControl

                            label="Alineación"

                            value={leftTextAlign}

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
                                    leftTextAlign: value
                                })
                            }

                        />


                        <p>
                            Color del texto
                        </p>

                        <ColorPalette

                            value={leftTextColor}

                            onChange={(value) =>
                                setAttributes({
                                    leftTextColor:
                                        value || '#111111'
                                })
                            }

                        />

                    </PanelBody>


                    {/* =================================================
                        COLUMNA DERECHA
                    ================================================= */}

                    <PanelBody
                        title={`Columna derecha — ${rightColumnWidth}%`}
                        initialOpen={true}
                    >

                        <RangeControl

                            label="Tamaño del texto"

                            value={rightTextSize}

                            onChange={(value) =>
                                setAttributes({
                                    rightTextSize: value
                                })
                            }

                            min={12}

                            max={60}

                        />


                        <SelectControl

                            label="Peso"

                            value={rightTextWeight}

                            options={[
                                {
                                    label: 'Regular',
                                    value: '400'
                                },
                                {
                                    label: 'Medio',
                                    value: '500'
                                },
                                {
                                    label: 'Seminegrita',
                                    value: '600'
                                },
                                {
                                    label: 'Negrita',
                                    value: '700'
                                }
                            ]}

                            onChange={(value) =>
                                setAttributes({
                                    rightTextWeight: value
                                })
                            }

                        />


                        <SelectControl

                            label="Alineación"

                            value={rightTextAlign}

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
                                    rightTextAlign: value
                                })
                            }

                        />


                        <p>
                            Color del texto
                        </p>

                        <ColorPalette

                            value={rightTextColor}

                            onChange={(value) =>
                                setAttributes({
                                    rightTextColor:
                                        value || '#333333'
                                })
                            }

                        />

                    </PanelBody>


                    {/* =================================================
                        ESPACIADO
                    ================================================= */}

                    <PanelBody
                        title="Espaciado"
                        initialOpen={false}
                    >

                        <RangeControl

                            label="Separación entre columnas"

                            value={columnGap}

                            onChange={(value) =>
                                setAttributes({
                                    columnGap: value
                                })
                            }

                            min={0}

                            max={200}

                        />


                        <RangeControl

                            label="Padding superior"

                            value={paddingTop}

                            onChange={(value) =>
                                setAttributes({
                                    paddingTop: value
                                })
                            }

                            min={0}

                            max={250}

                        />


                        <RangeControl

                            label="Padding inferior"

                            value={paddingBottom}

                            onChange={(value) =>
                                setAttributes({
                                    paddingBottom: value
                                })
                            }

                            min={0}

                            max={250}

                        />


                        <RangeControl

                            label="Margen superior del bloque"

                            value={blockMarginTop}

                            onChange={(value) =>
                                setAttributes({
                                    blockMarginTop: value
                                })
                            }

                            min={0}

                            max={250}

                        />


                        <RangeControl

                            label="Margen inferior del bloque"

                            value={blockMarginBottom}

                            onChange={(value) =>
                                setAttributes({
                                    blockMarginBottom: value
                                })
                            }

                            min={0}

                            max={250}

                        />

                    </PanelBody>


                </InspectorControls>


                {/* =================================================
                    BLOQUE
                ================================================= */}

                <section {...blockProps}>

                    <div className="container">

                        <div className="cosmos-two-column-text__grid">


                            {/* =============================================
                                COLUMNA IZQUIERDA
                            ============================================== */}

                            <div className="cosmos-two-column-text__column cosmos-two-column-text__column--left">

                                <RichText

                                    tagName="div"

                                    className="cosmos-two-column-text__left-text"

                                    value={leftText}

                                    onChange={(value) =>
                                        setAttributes({
                                            leftText: value
                                        })
                                    }

                                    placeholder="Escriba el texto..."

                                    allowedFormats={[
                                        'core/bold',
                                        'core/italic',
                                        'core/link',
                                        'core/strikethrough'
                                    ]}

                                />

                            </div>


                            {/* =============================================
                                COLUMNA DERECHA
                            ============================================== */}

                            <div className="cosmos-two-column-text__column cosmos-two-column-text__column--right">

                                <RichText

                                    tagName="div"

                                    className="cosmos-two-column-text__right-text"

                                    value={rightText}

                                    onChange={(value) =>
                                        setAttributes({
                                            rightText: value
                                        })
                                    }

                                    placeholder="Escriba el texto..."

                                    allowedFormats={[
                                        'core/bold',
                                        'core/italic',
                                        'core/link',
                                        'core/strikethrough'
                                    ]}

                                />

                            </div>


                        </div>

                    </div>

                </section>

            </Fragment>

        );

    },


    save: () => null

});