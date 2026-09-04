import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {
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

import metadata from './block.json';


registerBlockType(metadata.name, {

    edit: ({ attributes, setAttributes }) => {

        const {
            imageId,
            imageUrl,
            imageAlt,

            overlayEnabled,
            overlayColor,
            overlayOpacity,

            contentPosition,
            contentPadding,

            text,
            textSize,
            textColor,
            textWeight,
            textAlign,

            buttonEnabled,
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
            buttonMarginTop
        } = attributes;


        /*
         * =====================================================
         * IMAGEN
         * =====================================================
         */

        const selectImage = (media) => {

            if (!media || !media.url) {
                return;
            }

            setAttributes({
                imageId: media.id || 0,
                imageUrl: media.url,
                imageAlt: media.alt || ''
            });
        };


        /*
         * =====================================================
         * VARIABLES CSS
         * =====================================================
         */

        const cssVariables = {

            '--cosmos-banner-overlay-color': overlayColor,

            '--cosmos-banner-overlay-opacity':
                overlayOpacity / 100,

            '--cosmos-banner-content-padding':
                `${contentPadding}px`,

            '--cosmos-banner-text-size':
                `${textSize}px`,

            '--cosmos-banner-text-color':
                textColor,

            '--cosmos-banner-text-weight':
                textWeight,

            '--cosmos-banner-text-align':
                textAlign,

            '--cosmos-banner-button-width':
                `${buttonWidth}px`,

            '--cosmos-banner-button-height':
                `${buttonHeight}px`,

            '--cosmos-banner-button-size':
                `${buttonTextSize}px`,

            '--cosmos-banner-button-color':
                buttonTextColor,

            '--cosmos-banner-button-background':
                buttonBackground,

            '--cosmos-banner-button-border-color':
                buttonBorderColor,

            '--cosmos-banner-button-border-width':
                `${buttonBorderWidth}px`,

            '--cosmos-banner-button-radius':
                `${buttonBorderRadius}px`,

            '--cosmos-banner-button-weight':
                buttonTextWeight,

            '--cosmos-banner-button-margin-top':
                `${buttonMarginTop}px`
        };


        /*
         * =====================================================
         * CLASES
         * =====================================================
         */

        const positionClass =
            `is-position-${contentPosition}`;

        const textAlignClass =
            `is-text-align-${textAlign}`;


        /*
         * =====================================================
         * BLOCK PROPS
         * =====================================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-image-banner'
        });


        return (
            <Fragment>

                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <InspectorControls>


                    {/* =================================================
                        IMAGEN
                    ================================================= */}

                    <PanelBody
                        title={__('Imagen', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                onSelect={selectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (

                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        {imageUrl
                                            ? __('Cambiar imagen', 'hoteles-cosmos')
                                            : __('Seleccionar imagen', 'hoteles-cosmos')
                                        }
                                    </Button>

                                )}
                            />

                        </MediaUploadCheck>


                        {imageUrl && (

                            <MediaUploadCheck>

                                <Button
                                    onClick={() => {
                                        setAttributes({
                                            imageId: 0,
                                            imageUrl: '',
                                            imageAlt: ''
                                        });
                                    }}
                                    variant="link"
                                    isDestructive
                                >
                                    {__('Eliminar imagen', 'hoteles-cosmos')}
                                </Button>

                            </MediaUploadCheck>

                        )}

                    </PanelBody>


                    {/* =================================================
                        OVERLAY
                    ================================================= */}

                    <PanelBody
                        title={__('Overlay', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <ToggleControl
                            label={__('Activar overlay', 'hoteles-cosmos')}
                            checked={overlayEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    overlayEnabled: value
                                })
                            }
                        />


                        {overlayEnabled && (

                            <Fragment>

                                <p>
                                    <strong>
                                        {__('Color', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <ColorPalette
                                    value={overlayColor}
                                    onChange={(value) =>
                                        setAttributes({
                                            overlayColor: value || '#000000'
                                        })
                                    }
                                />


                                <RangeControl
                                    label={__('Opacidad', 'hoteles-cosmos')}
                                    value={overlayOpacity}
                                    onChange={(value) =>
                                        setAttributes({
                                            overlayOpacity: value
                                        })
                                    }
                                    min={0}
                                    max={100}
                                />

                            </Fragment>

                        )}

                    </PanelBody>


                    {/* =================================================
                        POSICIÓN
                    ================================================= */}

                    <PanelBody
                        title={__('Posición del contenido', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <SelectControl
                            label={__('Ubicación', 'hoteles-cosmos')}
                            value={contentPosition}
                            options={[
                                {
                                    label: __('Arriba izquierda', 'hoteles-cosmos'),
                                    value: 'top-left'
                                },
                                {
                                    label: __('Arriba derecha', 'hoteles-cosmos'),
                                    value: 'top-right'
                                },
                                {
                                    label: __('Abajo izquierda', 'hoteles-cosmos'),
                                    value: 'bottom-left'
                                },
                                {
                                    label: __('Abajo derecha', 'hoteles-cosmos'),
                                    value: 'bottom-right'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    contentPosition: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Separación interna', 'hoteles-cosmos')}
                            value={contentPadding}
                            onChange={(value) =>
                                setAttributes({
                                    contentPadding: value
                                })
                            }
                            min={0}
                            max={100}
                            help={__(
                                'Esta separación se aplica dentro del grupo de contenido.',
                                'hoteles-cosmos'
                            )}
                        />

                    </PanelBody>


                    {/* =================================================
                        TEXTO
                    ================================================= */}

                    <PanelBody
                        title={__('Texto', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <RangeControl
                            label={__('Tamaño', 'hoteles-cosmos')}
                            value={textSize}
                            onChange={(value) =>
                                setAttributes({
                                    textSize: value
                                })
                            }
                            min={12}
                            max={120}
                        />


                        <SelectControl
                            label={__('Peso', 'hoteles-cosmos')}
                            value={textWeight}
                            options={[
                                {
                                    label: '300',
                                    value: '300'
                                },
                                {
                                    label: '400',
                                    value: '400'
                                },
                                {
                                    label: '500',
                                    value: '500'
                                },
                                {
                                    label: '600',
                                    value: '600'
                                },
                                {
                                    label: '700',
                                    value: '700'
                                },
                                {
                                    label: '800',
                                    value: '800'
                                },
                                {
                                    label: '900',
                                    value: '900'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    textWeight: value
                                })
                            }
                        />


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


                        <p>
                            <strong>
                                {__('Color del texto', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPalette
                            value={textColor}
                            onChange={(value) =>
                                setAttributes({
                                    textColor: value || '#ffffff'
                                })
                            }
                        />

                    </PanelBody>


                    {/* =================================================
                        CTA
                    ================================================= */}

                    <PanelBody
                        title={__('CTA / Botón', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <ToggleControl
                            label={__('Mostrar botón', 'hoteles-cosmos')}
                            checked={buttonEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    buttonEnabled: value
                                })
                            }
                        />


                        {buttonEnabled && (

                            <Fragment>

                                <TextControl
                                    label={__('Texto del botón', 'hoteles-cosmos')}
                                    value={buttonText}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonText: value
                                        })
                                    }
                                />


                                <TextControl
                                    label={__('URL', 'hoteles-cosmos')}
                                    value={buttonUrl}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonUrl: value
                                        })
                                    }
                                />


                                <RangeControl
                                    label={__('Ancho', 'hoteles-cosmos')}
                                    value={buttonWidth}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonWidth: value
                                        })
                                    }
                                    min={60}
                                    max={500}
                                />


                                <RangeControl
                                    label={__('Alto', 'hoteles-cosmos')}
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
                                    label={__('Tamaño del texto', 'hoteles-cosmos')}
                                    value={buttonTextSize}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonTextSize: value
                                        })
                                    }
                                    min={8}
                                    max={40}
                                />


                                <SelectControl
                                    label={__('Peso del texto', 'hoteles-cosmos')}
                                    value={buttonTextWeight}
                                    options={[
                                        {
                                            label: '300',
                                            value: '300'
                                        },
                                        {
                                            label: '400',
                                            value: '400'
                                        },
                                        {
                                            label: '500',
                                            value: '500'
                                        },
                                        {
                                            label: '600',
                                            value: '600'
                                        },
                                        {
                                            label: '700',
                                            value: '700'
                                        },
                                        {
                                            label: '800',
                                            value: '800'
                                        }
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonTextWeight: value
                                        })
                                    }
                                />


                                <RangeControl
                                    label={__('Separación del texto', 'hoteles-cosmos')}
                                    value={buttonMarginTop}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonMarginTop: value
                                        })
                                    }
                                    min={0}
                                    max={100}
                                />


                                <p>
                                    <strong>
                                        {__('Color del texto', 'hoteles-cosmos')}
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
                                        {__('Fondo del botón', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        setAttributes({
                                            buttonBackground: 'transparent'
                                        })
                                    }
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        marginBottom: '10px'
                                    }}
                                >
                                    {__('Fondo transparente', 'hoteles-cosmos')}
                                </Button>

                                <ColorPalette
                                    value={
                                        buttonBackground === 'transparent'
                                            ? undefined
                                            : buttonBackground
                                    }
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonBackground:
                                                value || 'transparent'
                                        })
                                    }
                                />


                                <p>
                                    <strong>
                                        {__('Color del borde', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <ColorPalette
                                    value={buttonBorderColor}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonBorderColor:
                                                value || '#ffffff'
                                        })
                                    }
                                />


                                <RangeControl
                                    label={__('Grosor del borde', 'hoteles-cosmos')}
                                    value={buttonBorderWidth}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonBorderWidth: value
                                        })
                                    }
                                    min={0}
                                    max={10}
                                />


                                <RangeControl
                                    label={__('Radio del borde', 'hoteles-cosmos')}
                                    value={buttonBorderRadius}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonBorderRadius: value
                                        })
                                    }
                                    min={0}
                                    max={50}
                                />

                            </Fragment>

                        )}

                    </PanelBody>

                </InspectorControls>


                {/* =================================================
                    BANNER
                ================================================= */}

                <div {...blockProps}>

                    <div
                        className="cosmos-image-banner__background"
                        style={{
                            backgroundImage: imageUrl
                                ? `url("${imageUrl}")`
                                : 'none'
                        }}
                    >

                        {/* =================================================
                            OVERLAY
                        ================================================= */}

                        {overlayEnabled && (
                            <div className="cosmos-image-banner__overlay" />
                        )}


                        {/* =================================================
                            POSICIONAMIENTO
                        ================================================= */}

                        <div className="cosmos-image-banner__position">

                            <div className="container cosmos-image-banner__grid">

                                <div
                                    className={`
                                        cosmos-image-banner__content
                                        ${positionClass}
                                        ${textAlignClass}
                                    `}
                                    style={cssVariables}
                                >

                                    {/* =================================================
                                        TEXTO
                                    ================================================= */}

                                    <RichText
                                        tagName="div"
                                        className="cosmos-image-banner__text"
                                        value={text}
                                        onChange={(value) =>
                                            setAttributes({
                                                text: value
                                            })
                                        }
                                        placeholder={__(
                                            'Escribe tu texto aquí',
                                            'hoteles-cosmos'
                                        )}
                                    />


                                    {/* =================================================
                                        BOTÓN
                                    ================================================= */}

                                    {buttonEnabled && (

                                        <a
                                            href={buttonUrl || '#'}
                                            className="cosmos-image-banner__button"
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            {buttonText}
                                        </a>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            PLACEHOLDER
                        ================================================= */}

                        {!imageUrl && (

                            <div className="cosmos-image-banner__placeholder">

                                <MediaUploadCheck>

                                    <MediaUpload
                                        onSelect={selectImage}
                                        allowedTypes={['image']}
                                        value={imageId}
                                        render={({ open }) => (

                                            <Button
                                                onClick={open}
                                                variant="primary"
                                            >
                                                {__(
                                                    'Seleccionar imagen',
                                                    'hoteles-cosmos'
                                                )}
                                            </Button>

                                        )}
                                    />

                                </MediaUploadCheck>

                            </div>

                        )}

                    </div>

                </div>

            </Fragment>
        );
    },

    save: () => {
        return null;
    }
});