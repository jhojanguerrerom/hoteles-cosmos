import { registerBlockType } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    RichText
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl,
    ColorPalette,
    TextControl,
    ToggleControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {
        imageId,
        imageUrl,
        imageAlt,

        containerMode,

        imageWidth,
        textWidth,

        imageHeight,

        desktopOrder,

        marginTop,
        marginBottom,

        text,
        textSize,
        textColor,
        textWeight,
        textAlign,

        textBackgroundEnabled,
        textBackground,
        textPadding,

        buttonText,
        buttonUrl,
        buttonWidth,
        buttonHeight,
        buttonTextSize,
        buttonTextColor,
        buttonBackground,
        buttonBorderColor,
        buttonBorderWidth,
        buttonBorderRadius,
        buttonTextWeight,
        buttonMarginTop,
        buttonAlign
    } = attributes;


    /*
     * =====================================================
     * SELECCIONAR IMAGEN
     * =====================================================
     */

    const selectImage = (media) => {

        if (!media || !media.url) {
            return;
        }

        setAttributes({
            imageId: media.id,
            imageUrl: media.url,
            imageAlt: media.alt || media.title || ''
        });

    };


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: 'cosmos-image-text-columns'
    });


    /*
     * =====================================================
     * ALINEACIÓN REAL DEL BOTÓN
     *
     * El atributo utiliza:
     *
     * left
     * center
     * right
     *
     * Pero CSS flexbox necesita:
     *
     * flex-start
     * center
     * flex-end
     * =====================================================
     */

    const buttonAlignSelf =
        buttonAlign === 'left'
            ? 'flex-start'
            : buttonAlign === 'right'
                ? 'flex-end'
                : 'center';


    /*
     * =====================================================
     * VARIABLES CSS
     * =====================================================
     */

    const cssVariables = {

        '--cosmos-image-text-image-width':
            `${imageWidth}%`,

        '--cosmos-image-text-text-width':
            `${textWidth}%`,

        '--cosmos-image-text-image-height':
            `${imageHeight}px`,

        '--cosmos-image-text-margin-top':
            `${marginTop}px`,

        '--cosmos-image-text-margin-bottom':
            `${marginBottom}px`,

        '--cosmos-image-text-size':
            `${textSize}px`,

        '--cosmos-image-text-color':
            textColor,

        '--cosmos-image-text-weight':
            textWeight,

        '--cosmos-image-text-align':
            textAlign,

        '--cosmos-image-text-background':
            textBackgroundEnabled
                ? textBackground
                : 'transparent',

        '--cosmos-image-text-padding':
            `${textPadding}px`,

        '--cosmos-image-text-button-width':
            `${buttonWidth}%`,

        '--cosmos-image-text-button-height':
            `${buttonHeight}px`,

        '--cosmos-image-text-button-size':
            `${buttonTextSize}px`,

        '--cosmos-image-text-button-color':
            buttonTextColor,

        '--cosmos-image-text-button-background':
            buttonBackground,

        '--cosmos-image-text-button-border-color':
            buttonBorderColor,

        '--cosmos-image-text-button-border-width':
            `${buttonBorderWidth}px`,

        '--cosmos-image-text-button-radius':
            `${buttonBorderRadius}px`,

        '--cosmos-image-text-button-weight':
            buttonTextWeight,

        '--cosmos-image-text-button-margin-top':
            `${buttonMarginTop}px`,

        '--cosmos-image-text-button-align':
            buttonAlign,

        /*
         * NUEVA VARIABLE:
         * valor compatible con align-self
         */
        '--cosmos-image-text-button-align-self':
            buttonAlignSelf
    };


    /*
     * =====================================================
     * CLASE DE ORDEN
     * =====================================================
     */

    const orderClass =
        desktopOrder === 'text-image'
            ? 'is-text-first'
            : 'is-image-first';


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    ESTRUCTURA
                ================================================= */}

                <PanelBody
                    title={__('Estructura', 'hoteles-cosmos')}
                    initialOpen={true}
                >

                    <SelectControl
                        label={__('Ancho del bloque', 'hoteles-cosmos')}
                        value={containerMode}
                        options={[
                            {
                                label: __(
                                    'Container del sitio',
                                    'hoteles-cosmos'
                                ),
                                value: 'container'
                            },
                            {
                                label: __(
                                    'Ancho completo',
                                    'hoteles-cosmos'
                                ),
                                value: 'full'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                containerMode: value
                            })
                        }
                    />


                    <RangeControl
                        label={__(
                            'Ancho de la imagen (%)',
                            'hoteles-cosmos'
                        )}
                        value={imageWidth}
                        onChange={(value) => {

                            const newImageWidth =
                                Math.max(
                                    20,
                                    Math.min(
                                        80,
                                        value
                                    )
                                );

                            setAttributes({
                                imageWidth:
                                    newImageWidth,

                                textWidth:
                                    100 -
                                    newImageWidth
                            });

                        }}
                        min={20}
                        max={80}
                        step={1}
                    />


                    <RangeControl
                        label={__(
                            'Alto de la imagen',
                            'hoteles-cosmos'
                        )}
                        value={imageHeight}
                        onChange={(value) =>
                            setAttributes({
                                imageHeight: value
                            })
                        }
                        min={150}
                        max={800}
                        step={10}
                    />


                    <SelectControl
                        label={__(
                            'Orden en escritorio',
                            'hoteles-cosmos'
                        )}
                        value={desktopOrder}
                        options={[
                            {
                                label: __(
                                    'Imagen → Texto',
                                    'hoteles-cosmos'
                                ),
                                value: 'image-text'
                            },
                            {
                                label: __(
                                    'Texto → Imagen',
                                    'hoteles-cosmos'
                                ),
                                value: 'text-image'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                desktopOrder: value
                            })
                        }
                    />

                </PanelBody>


                {/* =================================================
                    ESPACIADO
                ================================================= */}

                <PanelBody
                    title={__('Espaciado', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__(
                            'Margen superior',
                            'hoteles-cosmos'
                        )}
                        value={marginTop}
                        onChange={(value) =>
                            setAttributes({
                                marginTop: value
                            })
                        }
                        min={0}
                        max={150}
                    />


                    <RangeControl
                        label={__(
                            'Margen inferior',
                            'hoteles-cosmos'
                        )}
                        value={marginBottom}
                        onChange={(value) =>
                            setAttributes({
                                marginBottom: value
                            })
                        }
                        min={0}
                        max={150}
                    />

                </PanelBody>


                {/* =================================================
                    IMAGEN
                ================================================= */}

                <PanelBody
                    title={__('Imagen', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={selectImage}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (

                                <div>

                                    {imageUrl ? (

                                        <>

                                            <img
                                                src={imageUrl}
                                                alt={imageAlt}
                                                style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    marginBottom: '12px'
                                                }}
                                            />

                                            <Button
                                                variant="secondary"
                                                onClick={open}
                                            >
                                                {__(
                                                    'Cambiar imagen',
                                                    'hoteles-cosmos'
                                                )}
                                            </Button>

                                        </>

                                    ) : (

                                        <Button
                                            variant="primary"
                                            onClick={open}
                                        >
                                            {__(
                                                'Seleccionar imagen',
                                                'hoteles-cosmos'
                                            )}
                                        </Button>

                                    )}

                                </div>

                            )}
                        />

                    </MediaUploadCheck>


                    {imageUrl && (

                        <TextControl
                            label={__(
                                'Texto alternativo',
                                'hoteles-cosmos'
                            )}
                            value={imageAlt}
                            onChange={(value) =>
                                setAttributes({
                                    imageAlt: value
                                })
                            }
                        />

                    )}

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title={__('Texto', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <RangeControl
                        label={__(
                            'Tamaño del texto',
                            'hoteles-cosmos'
                        )}
                        value={textSize}
                        onChange={(value) =>
                            setAttributes({
                                textSize: value
                            })
                        }
                        min={10}
                        max={80}
                    />


                    <SelectControl
                        label={__(
                            'Peso del texto',
                            'hoteles-cosmos'
                        )}
                        value={textWeight}
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
                                textWeight: value
                            })
                        }
                    />


                    <SelectControl
                        label={__(
                            'Alineación del texto',
                            'hoteles-cosmos'
                        )}
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


                    <p>
                        <strong>
                            {__(
                                'Color del texto',
                                'hoteles-cosmos'
                            )}
                        </strong>
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


                    <ToggleControl
                        label={__(
                            'Mostrar fondo del texto',
                            'hoteles-cosmos'
                        )}
                        checked={textBackgroundEnabled}
                        onChange={(value) =>
                            setAttributes({
                                textBackgroundEnabled:
                                    value
                            })
                        }
                    />


                    {textBackgroundEnabled && (

                        <>

                            <p>
                                <strong>
                                    {__(
                                        'Color de fondo',
                                        'hoteles-cosmos'
                                    )}
                                </strong>
                            </p>

                            <ColorPalette
                                value={textBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        textBackground:
                                            value ||
                                            '#ffffff'
                                    })
                                }
                            />

                        </>

                    )}


                    <RangeControl
                        label={__(
                            'Padding del texto',
                            'hoteles-cosmos'
                        )}
                        value={textPadding}
                        onChange={(value) =>
                            setAttributes({
                                textPadding: value
                            })
                        }
                        min={0}
                        max={100}
                    />

                </PanelBody>


                {/* =================================================
                    BOTÓN
                ================================================= */}

                <PanelBody
                    title={__('Botón', 'hoteles-cosmos')}
                    initialOpen={false}
                >

                    <TextControl
                        label={__(
                            'Texto del botón',
                            'hoteles-cosmos'
                        )}
                        value={buttonText}
                        onChange={(value) =>
                            setAttributes({
                                buttonText: value
                            })
                        }
                    />


                    <TextControl
                        label={__(
                            'URL del botón',
                            'hoteles-cosmos'
                        )}
                        value={buttonUrl}
                        onChange={(value) =>
                            setAttributes({
                                buttonUrl: value
                            })
                        }
                    />


                    <SelectControl
                        label={__(
                            'Alineación del botón',
                            'hoteles-cosmos'
                        )}
                        value={buttonAlign}
                        options={[
                            {
                                label: __(
                                    'Izquierda',
                                    'hoteles-cosmos'
                                ),
                                value: 'left'
                            },
                            {
                                label: __(
                                    'Centro',
                                    'hoteles-cosmos'
                                ),
                                value: 'center'
                            },
                            {
                                label: __(
                                    'Derecha',
                                    'hoteles-cosmos'
                                ),
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                buttonAlign: value
                            })
                        }
                    />


                    <RangeControl
                        label={__(
                            'Ancho del botón (%)',
                            'hoteles-cosmos'
                        )}
                        value={buttonWidth}
                        onChange={(value) =>
                            setAttributes({
                                buttonWidth: value
                            })
                        }
                        min={20}
                        max={100}
                    />


                    <RangeControl
                        label={__(
                            'Alto del botón',
                            'hoteles-cosmos'
                        )}
                        value={buttonHeight}
                        onChange={(value) =>
                            setAttributes({
                                buttonHeight: value
                            })
                        }
                        min={30}
                        max={100}
                    />


                    <RangeControl
                        label={__(
                            'Tamaño del texto',
                            'hoteles-cosmos'
                        )}
                        value={buttonTextSize}
                        onChange={(value) =>
                            setAttributes({
                                buttonTextSize: value
                            })
                        }
                        min={8}
                        max={30}
                    />


                    <SelectControl
                        label={__(
                            'Peso del texto',
                            'hoteles-cosmos'
                        )}
                        value={buttonTextWeight}
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
                                buttonTextWeight:
                                    value
                            })
                        }
                    />


                    <p>
                        <strong>
                            {__(
                                'Color del texto',
                                'hoteles-cosmos'
                            )}
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


                    <p>
                        <strong>
                            {__(
                                'Color de fondo',
                                'hoteles-cosmos'
                            )}
                        </strong>
                    </p>

                    <ColorPalette
                        value={buttonBackground}
                        onChange={(value) =>
                            setAttributes({
                                buttonBackground:
                                    value || '#111111'
                            })
                        }
                    />


                    <p>
                        <strong>
                            {__(
                                'Color del borde',
                                'hoteles-cosmos'
                            )}
                        </strong>
                    </p>

                    <ColorPalette
                        value={buttonBorderColor}
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderColor:
                                    value || '#111111'
                            })
                        }
                    />


                    <RangeControl
                        label={__(
                            'Grosor del borde',
                            'hoteles-cosmos'
                        )}
                        value={buttonBorderWidth}
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderWidth:
                                    value
                            })
                        }
                        min={0}
                        max={5}
                    />


                    <RangeControl
                        label={__(
                            'Border radius',
                            'hoteles-cosmos'
                        )}
                        value={buttonBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                buttonBorderRadius:
                                    value
                            })
                        }
                        min={0}
                        max={50}
                    />


                    <RangeControl
                        label={__(
                            'Separación superior',
                            'hoteles-cosmos'
                        )}
                        value={buttonMarginTop}
                        onChange={(value) =>
                            setAttributes({
                                buttonMarginTop:
                                    value
                            })
                        }
                        min={0}
                        max={80}
                    />

                </PanelBody>

            </InspectorControls>


            {/* =================================================
                PREVISUALIZACIÓN
            ================================================= */}

            <div {...blockProps}>

                <div
                    className={
                        `cosmos-image-text-columns__wrapper ${
                            containerMode === 'full'
                                ? 'is-full'
                                : 'is-container'
                        } ${orderClass}`
                    }
                    style={cssVariables}
                >

                    <div className="cosmos-image-text-columns__inner">

                        {/* =================================================
                            COLUMNA IMAGEN
                        ================================================= */}

                        <div className="cosmos-image-text-columns__image">

                            {imageUrl ? (

                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                />

                            ) : (

                                <MediaUploadCheck>

                                    <MediaUpload
                                        onSelect={selectImage}
                                        allowedTypes={[
                                            'image'
                                        ]}
                                        value={imageId}
                                        render={({ open }) => (

                                            <button
                                                type="button"
                                                className="cosmos-image-text-columns__placeholder"
                                                onClick={open}
                                            >
                                                {__(
                                                    'Seleccionar imagen',
                                                    'hoteles-cosmos'
                                                )}
                                            </button>

                                        )}
                                    />

                                </MediaUploadCheck>

                            )}

                        </div>


                        {/* =================================================
                            COLUMNA TEXTO
                        ================================================= */}

                        <div className="cosmos-image-text-columns__content">

                            <RichText
                                tagName="div"
                                className="cosmos-image-text-columns__text"
                                value={text}
                                onChange={(value) =>
                                    setAttributes({
                                        text: value
                                    })
                                }
                                placeholder={__(
                                    'Escribe tu texto...',
                                    'hoteles-cosmos'
                                )}
                            />


                            <a
                                className="cosmos-image-text-columns__button"
                                href={buttonUrl}
                                onClick={(event) =>
                                    event.preventDefault()
                                }
                            >

                                {buttonText}

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(
    'hoteles-cosmos/image-text-columns',
    {
        edit: Edit
    }
);