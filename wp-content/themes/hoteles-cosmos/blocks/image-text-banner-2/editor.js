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
    ColorPalette,
    SelectControl,
    ToggleControl,
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


function Edit({ attributes, setAttributes }) {

    const {

        imageId,
        imageUrl,
        imageAlt,

        text,

        textPosition,

        textBackgroundEnabled,
        textBackground,
        textBackgroundOpacity,

        textColor,
        textSize,
        textWeight,
        textAlign,
        textPadding,

        marginTop,
        marginBottom,

        bannerHeight,
        overlay

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

            imageAlt:
                media.alt ||
                media.title ||
                ''

        });

    };


    /*
     * =====================================================
     * ELIMINAR IMAGEN
     * =====================================================
     */

    const removeImage = () => {

        setAttributes({

            imageId: 0,

            imageUrl: '',

            imageAlt: ''

        });

    };


    /*
     * =====================================================
     * PROPIEDADES DEL BLOQUE
     * =====================================================
     */

    const blockProps = useBlockProps({

        className:
            'cosmos-image-text-banner'

    });


    /*
     * =====================================================
     * ESTILOS DEL TEXTO
     * =====================================================
     */

    const textStyle = {

        color: textColor,

        fontSize: `${textSize}px`,

        fontWeight: textWeight,

        padding: `${textPadding}px`,

        backgroundColor:
            textBackgroundEnabled
                ? textBackground
                : 'transparent',

        '--cosmos-text-bg-opacity':
            textBackgroundOpacity / 100

    };


    return (

        <Fragment>


            {/* =================================================
                CONTROLES
            ================================================= */}

            <InspectorControls>


                {/* =================================================
                    IMAGEN
                ================================================= */}

                <PanelBody
                    title={__(
                        'Imagen',
                        'hoteles-cosmos'
                    )}
                    initialOpen={true}
                >

                    <MediaUploadCheck>

                        <MediaUpload

                            onSelect={selectImage}

                            allowedTypes={[
                                'image'
                            ]}

                            value={
                                imageId
                            }

                            render={({ open }) => (

                                <div>

                                    {imageUrl ? (

                                        <>

                                            <img
                                                src={
                                                    imageUrl
                                                }
                                                alt={
                                                    imageAlt
                                                }
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
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


                                            <Button
                                                variant="link"
                                                isDestructive
                                                onClick={removeImage}
                                            >
                                                {__(
                                                    'Eliminar imagen',
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
                            value={
                                imageAlt
                            }
                            onChange={(value) =>
                                setAttributes({
                                    imageAlt:
                                        value
                                })
                            }
                        />

                    )}

                </PanelBody>


                {/* =================================================
                    POSICIÓN
                ================================================= */}

                <PanelBody
                    title={__(
                        'Posición del texto',
                        'hoteles-cosmos'
                    )}
                    initialOpen={true}
                >

                    <SelectControl

                        label={__(
                            'Ubicación',
                            'hoteles-cosmos'
                        )}

                        value={
                            textPosition
                        }

                        options={[

                            {
                                label: __(
                                    'Arriba izquierda',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'top-left'
                            },

                            {
                                label: __(
                                    'Arriba centrado',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'top-center'
                            },

                            {
                                label: __(
                                    'Arriba derecha',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'top-right'
                            },

                            {
                                label: __(
                                    'Centro izquierda',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'center-left'
                            },

                            {
                                label: __(
                                    'Centro',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'center-center'
                            },

                            {
                                label: __(
                                    'Centro derecha',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'center-right'
                            },

                            {
                                label: __(
                                    'Abajo izquierda',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'bottom-left'
                            },

                            {
                                label: __(
                                    'Abajo centrado',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'bottom-center'
                            },

                            {
                                label: __(
                                    'Abajo derecha',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'bottom-right'
                            }

                        ]}

                        onChange={(value) =>
                            setAttributes({
                                textPosition:
                                    value
                            })
                        }

                    />

                </PanelBody>


                {/* =================================================
                    TAMAÑO
                ================================================= */}

                <PanelBody
                    title={__(
                        'Tamaño',
                        'hoteles-cosmos'
                    )}
                    initialOpen={false}
                >

                    <RangeControl

                        label={__(
                            'Altura del banner',
                            'hoteles-cosmos'
                        )}

                        value={
                            bannerHeight
                        }

                        onChange={(value) =>
                            setAttributes({
                                bannerHeight:
                                    value
                            })
                        }

                        min={150}

                        max={900}

                        step={1}

                    />


                    <RangeControl

                        label={__(
                            'Overlay de la imagen',
                            'hoteles-cosmos'
                        )}

                        value={
                            overlay
                        }

                        onChange={(value) =>
                            setAttributes({
                                overlay:
                                    value
                            })
                        }

                        min={0}

                        max={100}

                        step={1}

                    />

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody

                    title={__(
                        'Texto',
                        'hoteles-cosmos'
                    )}

                    initialOpen={true}

                >

                    <RangeControl

                        label={__(
                            'Tamaño de fuente',
                            'hoteles-cosmos'
                        )}

                        value={
                            textSize
                        }

                        onChange={(value) =>
                            setAttributes({
                                textSize:
                                    value
                            })
                        }

                        min={10}

                        max={100}

                        step={1}

                    />


                    <SelectControl

                        label={__(
                            'Estilo de fuente',
                            'hoteles-cosmos'
                        )}

                        value={
                            textWeight
                        }

                        options={[

                            {
                                label: __(
                                    'Normal',
                                    'hoteles-cosmos'
                                ),
                                value: '400'
                            },

                            {
                                label: __(
                                    'Medio',
                                    'hoteles-cosmos'
                                ),
                                value: '500'
                            },

                            {
                                label: __(
                                    'Seminegrita',
                                    'hoteles-cosmos'
                                ),
                                value: '600'
                            },

                            {
                                label: __(
                                    'Negrita',
                                    'hoteles-cosmos'
                                ),
                                value: '700'
                            }

                        ]}

                        onChange={(value) =>
                            setAttributes({
                                textWeight:
                                    value
                            })
                        }

                    />


                    <SelectControl

                        label={__(
                            'Alineación',
                            'hoteles-cosmos'
                        )}

                        value={
                            textAlign
                        }

                        options={[

                            {
                                label: __(
                                    'Izquierda',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'left'
                            },

                            {
                                label: __(
                                    'Centro',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'center'
                            },

                            {
                                label: __(
                                    'Derecha',
                                    'hoteles-cosmos'
                                ),
                                value:
                                    'right'
                            }

                        ]}

                        onChange={(value) =>
                            setAttributes({
                                textAlign:
                                    value
                            })
                        }

                    />


                    <RangeControl

                        label={__(
                            'Padding del texto',
                            'hoteles-cosmos'
                        )}

                        value={
                            textPadding
                        }

                        onChange={(value) =>
                            setAttributes({
                                textPadding:
                                    value
                            })
                        }

                        min={0}

                        max={100}

                        step={1}

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

                        value={
                            textColor
                        }

                        onChange={(value) =>
                            setAttributes({
                                textColor:
                                    value ||
                                    '#ffffff'
                            })
                        }

                    />

                </PanelBody>


                {/* =================================================
                    FONDO DEL TEXTO
                ================================================= */}

                <PanelBody

                    title={__(
                        'Fondo del texto',
                        'hoteles-cosmos'
                    )}

                    initialOpen={false}

                >

                    <ToggleControl

                        label={__(
                            'Mostrar fondo',
                            'hoteles-cosmos'
                        )}

                        checked={
                            textBackgroundEnabled
                        }

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
                                        'Color del fondo',
                                        'hoteles-cosmos'
                                    )}
                                </strong>
                            </p>


                            <ColorPalette

                                value={
                                    textBackground
                                }

                                onChange={(value) =>
                                    setAttributes({
                                        textBackground:
                                            value ||
                                            '#000000'
                                    })
                                }

                            />


                            <RangeControl

                                label={__(
                                    'Opacidad del fondo',
                                    'hoteles-cosmos'
                                )}

                                value={
                                    textBackgroundOpacity
                                }

                                onChange={(value) =>
                                    setAttributes({
                                        textBackgroundOpacity:
                                            value
                                    })
                                }

                                min={0}

                                max={100}

                                step={1}

                            />

                        </>

                    )}

                </PanelBody>


                {/* =================================================
                    ESPACIADO
                ================================================= */}

                <PanelBody

                    title={__(
                        'Espaciado',
                        'hoteles-cosmos'
                    )}

                    initialOpen={false}

                >

                    <RangeControl

                        label={__(
                            'Margen superior',
                            'hoteles-cosmos'
                        )}

                        value={
                            marginTop
                        }

                        onChange={(value) =>
                            setAttributes({
                                marginTop:
                                    value
                            })
                        }

                        min={0}

                        max={200}

                        step={1}

                    />


                    <RangeControl

                        label={__(
                            'Margen inferior',
                            'hoteles-cosmos'
                        )}

                        value={
                            marginBottom
                        }

                        onChange={(value) =>
                            setAttributes({
                                marginBottom:
                                    value
                            })
                        }

                        min={0}

                        max={200}

                        step={1}

                    />

                </PanelBody>

            </InspectorControls>


            {/* =================================================
                PREVISUALIZACIÓN
            ================================================= */}

            <div
                {...blockProps}
                style={{
                    '--cosmos-banner-height':
                        `${bannerHeight}px`,

                    '--cosmos-banner-margin-top':
                        `${marginTop}px`,

                    '--cosmos-banner-margin-bottom':
                        `${marginBottom}px`,

                    '--cosmos-banner-overlay':
                        overlay / 100
                }}
            >

                {imageUrl ? (

                    <div
                        className={
                            `cosmos-image-text-banner__background
                            position-${textPosition}`
                        }
                    >

                        <img
                            className={
                                'cosmos-image-text-banner__image'
                            }
                            src={
                                imageUrl
                            }
                            alt={
                                imageAlt
                            }
                        />


                        <div
                            className={
                                'cosmos-image-text-banner__overlay'
                            }
                        />


                        <div
                            className={
                                'container cosmos-image-text-banner__container'
                            }
                        >

                            <RichText

                                tagName="div"

                                className={
                                    'cosmos-image-text-banner__text'
                                }

                                value={
                                    text
                                }

                                onChange={(value) =>
                                    setAttributes({
                                        text:
                                            value
                                    })
                                }

                                placeholder={__(
                                    'Escribe tu texto...',
                                    'hoteles-cosmos'
                                )}

                                style={
                                    textStyle
                                }

                            />

                        </div>

                    </div>

                ) : (

                    <MediaUploadCheck>

                        <MediaUpload

                            onSelect={selectImage}

                            allowedTypes={[
                                'image'
                            ]}

                            value={
                                imageId
                            }

                            render={({ open }) => (

                                <div
                                    className={
                                        'cosmos-image-text-banner__placeholder'
                                    }
                                    onClick={open}
                                >

                                    <span>
                                        {__(
                                            'Seleccionar imagen',
                                            'hoteles-cosmos'
                                        )}
                                    </span>

                                </div>

                            )}

                        />

                    </MediaUploadCheck>

                )}

            </div>

        </Fragment>

    );

}


registerBlockType(
    'hoteles-cosmos/image-text-banner-2',
    {
        edit: Edit
    }
);