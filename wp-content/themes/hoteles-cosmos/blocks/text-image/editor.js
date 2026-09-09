import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    ColorPicker
} from '@wordpress/components';

import metadata from './block.json';

import './editor.css';


registerBlockType(metadata.name, {

    ...metadata,

    edit: ({ attributes, setAttributes }) => {

        const {
            marginTop = 40,
            marginBottom = 40,

            textBackground = '#f5f1ea',

            title = 'Título principal',
            titleColor = '#222222',
            titleSize = 42,
            titleWeight = '700',
            titleAlign = 'left',
            titleMarginBottom = 20,

            description = 'Escribe aquí el contenido de esta sección.',
            descriptionColor = '#333333',
            descriptionSize = 17,
            descriptionWeight = '400',
            descriptionAlign = 'left',

            button1Enabled = true,
            button1Text = 'Conoce más',
            button1Url = '#',

            button2Enabled = false,
            button2Text = 'Ver más',
            button2Url = '#',

            buttonBackground = '#222222',
            buttonColor = '#ffffff',
            buttonSize = 15,
            buttonWeight = '600',
            buttonPaddingVertical = 14,
            buttonPaddingHorizontal = 28,
            buttonBorderWidth = 0,
            buttonBorderColor = '#222222',
            buttonRadius = 4,

            imageId = 0,
            imageUrl = '',
            imageAlt = '',
            imagePosition = 'center center',
            imageHeight = 600

        } = attributes;


        /*
         * =========================================
         * BLOCK PROPS
         * =========================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-text-image',

            style: {
                '--cosmos-text-image-margin-top': `${marginTop}px`,
                '--cosmos-text-image-margin-bottom': `${marginBottom}px`,

                '--cosmos-text-image-text-background': textBackground,

                '--cosmos-text-image-title-color': titleColor,
                '--cosmos-text-image-title-size': `${titleSize}px`,
                '--cosmos-text-image-title-weight': titleWeight,
                '--cosmos-text-image-title-align': titleAlign,
                '--cosmos-text-image-title-margin-bottom': `${titleMarginBottom}px`,

                '--cosmos-text-image-description-color': descriptionColor,
                '--cosmos-text-image-description-size': `${descriptionSize}px`,
                '--cosmos-text-image-description-weight': descriptionWeight,
                '--cosmos-text-image-description-align': descriptionAlign,

                '--cosmos-text-image-button-background': buttonBackground,
                '--cosmos-text-image-button-color': buttonColor,
                '--cosmos-text-image-button-size': `${buttonSize}px`,
                '--cosmos-text-image-button-weight': buttonWeight,
                '--cosmos-text-image-button-padding-vertical': `${buttonPaddingVertical}px`,
                '--cosmos-text-image-button-padding-horizontal': `${buttonPaddingHorizontal}px`,
                '--cosmos-text-image-button-border-width': `${buttonBorderWidth}px`,
                '--cosmos-text-image-button-border-color': buttonBorderColor,
                '--cosmos-text-image-button-radius': `${buttonRadius}px`,

                '--cosmos-text-image-image-height': `${imageHeight}px`
            }
        });


        /*
         * =========================================
         * SELECT IMAGE
         * =========================================
         */

        const selectImage = (media) => {

            setAttributes({
                imageId: media.id,
                imageUrl: media.url,
                imageAlt: media.alt || ''
            });

        };


        /*
         * =========================================
         * REMOVE IMAGE
         * =========================================
         */

        const removeImage = () => {

            setAttributes({
                imageId: 0,
                imageUrl: '',
                imageAlt: ''
            });

        };


        return (
            <div {...blockProps}>

                <InspectorControls>

                    {/* =========================================
                        ESPACIADO GENERAL
                    ========================================== */}

                    <PanelBody
                        title={__('Configuración general', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <RangeControl
                            label={__('Margen superior del bloque', 'hoteles-cosmos')}
                            value={marginTop}
                            onChange={(value) =>
                                setAttributes({
                                    marginTop: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                        <RangeControl
                            label={__('Margen inferior del bloque', 'hoteles-cosmos')}
                            value={marginBottom}
                            onChange={(value) =>
                                setAttributes({
                                    marginBottom: value
                                })
                            }
                            min={0}
                            max={200}
                        />

                    </PanelBody>


                    {/* =========================================
                        TEXTO
                    ========================================== */}

                    <PanelBody
                        title={__('Columna de texto', 'hoteles-cosmos')}
                        initialOpen={true}
                    >

                        <p>
                            <strong>
                                {__('Color de fondo', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={textBackground}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    textBackground: color.hex
                                })
                            }
                            disableAlpha
                        />


                        {/* TÍTULO */}

                        <PanelBody
                            title={__('Título', 'hoteles-cosmos')}
                            initialOpen={false}
                        >

                            <RangeControl
                                label={__('Tamaño', 'hoteles-cosmos')}
                                value={titleSize}
                                onChange={(value) =>
                                    setAttributes({
                                        titleSize: value
                                    })
                                }
                                min={16}
                                max={80}
                            />


                            <SelectControl
                                label={__('Peso', 'hoteles-cosmos')}
                                value={titleWeight}
                                options={[
                                    {
                                        label: 'Normal',
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
                                    },
                                    {
                                        label: 'Extra negrita',
                                        value: '800'
                                    }
                                ]}
                                onChange={(value) =>
                                    setAttributes({
                                        titleWeight: value
                                    })
                                }
                            />


                            <SelectControl
                                label={__('Alineación', 'hoteles-cosmos')}
                                value={titleAlign}
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
                                        titleAlign: value
                                    })
                                }
                            />


                            <RangeControl
                                label={__('Espacio inferior', 'hoteles-cosmos')}
                                value={titleMarginBottom}
                                onChange={(value) =>
                                    setAttributes({
                                        titleMarginBottom: value
                                    })
                                }
                                min={0}
                                max={60}
                            />


                            <p>
                                <strong>
                                    {__('Color', 'hoteles-cosmos')}
                                </strong>
                            </p>

                            <ColorPicker
                                color={titleColor}
                                onChangeComplete={(color) =>
                                    setAttributes({
                                        titleColor: color.hex
                                    })
                                }
                                disableAlpha
                            />

                        </PanelBody>


                        {/* DESCRIPCIÓN */}

                        <PanelBody
                            title={__('Texto', 'hoteles-cosmos')}
                            initialOpen={false}
                        >

                            <RangeControl
                                label={__('Tamaño', 'hoteles-cosmos')}
                                value={descriptionSize}
                                onChange={(value) =>
                                    setAttributes({
                                        descriptionSize: value
                                    })
                                }
                                min={10}
                                max={40}
                            />


                            <SelectControl
                                label={__('Peso', 'hoteles-cosmos')}
                                value={descriptionWeight}
                                options={[
                                    {
                                        label: 'Normal',
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
                                        descriptionWeight: value
                                    })
                                }
                            />


                            <SelectControl
                                label={__('Alineación', 'hoteles-cosmos')}
                                value={descriptionAlign}
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
                                        descriptionAlign: value
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    {__('Color', 'hoteles-cosmos')}
                                </strong>
                            </p>

                            <ColorPicker
                                color={descriptionColor}
                                onChangeComplete={(color) =>
                                    setAttributes({
                                        descriptionColor: color.hex
                                    })
                                }
                                disableAlpha
                            />

                        </PanelBody>


                        {/* BOTONES */}

                        <PanelBody
                            title={__('Botones', 'hoteles-cosmos')}
                            initialOpen={false}
                        >

                            <ToggleControl
                                label={__('Mostrar botón 1', 'hoteles-cosmos')}
                                checked={button1Enabled}
                                onChange={(value) =>
                                    setAttributes({
                                        button1Enabled: value
                                    })
                                }
                            />


                            {button1Enabled && (

                                <>
                                    <TextControl
                                        label={__('Texto del botón 1', 'hoteles-cosmos')}
                                        value={button1Text}
                                        onChange={(value) =>
                                            setAttributes({
                                                button1Text: value
                                            })
                                        }
                                    />

                                    <TextControl
                                        label={__('URL del botón 1', 'hoteles-cosmos')}
                                        value={button1Url}
                                        onChange={(value) =>
                                            setAttributes({
                                                button1Url: value
                                            })
                                        }
                                    />
                                </>

                            )}


                            <ToggleControl
                                label={__('Mostrar botón 2', 'hoteles-cosmos')}
                                checked={button2Enabled}
                                onChange={(value) =>
                                    setAttributes({
                                        button2Enabled: value
                                    })
                                }
                            />


                            {button2Enabled && (

                                <>
                                    <TextControl
                                        label={__('Texto del botón 2', 'hoteles-cosmos')}
                                        value={button2Text}
                                        onChange={(value) =>
                                            setAttributes({
                                                button2Text: value
                                            })
                                        }
                                    />

                                    <TextControl
                                        label={__('URL del botón 2', 'hoteles-cosmos')}
                                        value={button2Url}
                                        onChange={(value) =>
                                            setAttributes({
                                                button2Url: value
                                            })
                                        }
                                    />
                                </>

                            )}


                            <hr />


                            <p>
                                <strong>
                                    {__('Estilo general de los botones', 'hoteles-cosmos')}
                                </strong>
                            </p>


                            <RangeControl
                                label={__('Tamaño del texto', 'hoteles-cosmos')}
                                value={buttonSize}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonSize: value
                                    })
                                }
                                min={10}
                                max={30}
                            />


                            <SelectControl
                                label={__('Peso', 'hoteles-cosmos')}
                                value={buttonWeight}
                                options={[
                                    {
                                        label: 'Normal',
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
                                        buttonWeight: value
                                    })
                                }
                            />


                            <RangeControl
                                label={__('Espacio vertical', 'hoteles-cosmos')}
                                value={buttonPaddingVertical}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingVertical: value
                                    })
                                }
                                min={0}
                                max={40}
                            />


                            <RangeControl
                                label={__('Espacio horizontal', 'hoteles-cosmos')}
                                value={buttonPaddingHorizontal}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonPaddingHorizontal: value
                                    })
                                }
                                min={0}
                                max={60}
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
                                value={buttonRadius}
                                onChange={(value) =>
                                    setAttributes({
                                        buttonRadius: value
                                    })
                                }
                                min={0}
                                max={50}
                            />


                            <p>
                                <strong>
                                    {__('Color de fondo', 'hoteles-cosmos')}
                                </strong>
                            </p>

                            <ColorPicker
                                color={buttonBackground}
                                onChangeComplete={(color) =>
                                    setAttributes({
                                        buttonBackground: color.hex
                                    })
                                }
                                disableAlpha
                            />


                            <p>
                                <strong>
                                    {__('Color del texto', 'hoteles-cosmos')}
                                </strong>
                            </p>

                            <ColorPicker
                                color={buttonColor}
                                onChangeComplete={(color) =>
                                    setAttributes({
                                        buttonColor: color.hex
                                    })
                                }
                                disableAlpha
                            />


                            <p>
                                <strong>
                                    {__('Color del borde', 'hoteles-cosmos')}
                                </strong>
                            </p>

                            <ColorPicker
                                color={buttonBorderColor}
                                onChangeComplete={(color) =>
                                    setAttributes({
                                        buttonBorderColor: color.hex
                                    })
                                }
                                disableAlpha
                            />

                        </PanelBody>

                    </PanelBody>


                    {/* =========================================
                        IMAGEN
                    ========================================== */}

                    <PanelBody
                        title={__('Columna de imagen', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <MediaUploadCheck>

                            <MediaUpload
                                onSelect={selectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (

                                    <Button
                                        onClick={open}
                                        variant="primary"
                                        style={{
                                            width: '100%',
                                            marginBottom: '10px'
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

                            <Button
                                onClick={removeImage}
                                variant="secondary"
                                isDestructive
                                style={{
                                    width: '100%',
                                    marginBottom: '15px'
                                }}
                            >
                                {__('Eliminar imagen', 'hoteles-cosmos')}
                            </Button>

                        )}


                        <RangeControl
                            label={__('Alto de la imagen en escritorio', 'hoteles-cosmos')}
                            value={imageHeight}
                            onChange={(value) =>
                                setAttributes({
                                    imageHeight: value
                                })
                            }
                            min={300}
                            max={1000}
                        />


                        <SelectControl
                            label={__('Posición de la imagen', 'hoteles-cosmos')}
                            value={imagePosition}
                            options={[
                                {
                                    label: 'Centro',
                                    value: 'center center'
                                },
                                {
                                    label: 'Arriba',
                                    value: 'center top'
                                },
                                {
                                    label: 'Abajo',
                                    value: 'center bottom'
                                },
                                {
                                    label: 'Izquierda',
                                    value: 'left center'
                                },
                                {
                                    label: 'Derecha',
                                    value: 'right center'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    imagePosition: value
                                })
                            }
                        />

                    </PanelBody>

                </InspectorControls>


                {/* =========================================
                    BLOQUE
                ========================================== */}

                <div className="cosmos-text-image__columns">

                    {/* =====================================
                        IMAGEN
                    ====================================== */}

                    <div className="cosmos-text-image__image-column">

                        {imageUrl ? (

                            <div
                                className="cosmos-text-image__image"
                                style={{
                                    backgroundImage: `url("${imageUrl}")`,
                                    backgroundPosition: imagePosition
                                }}
                            />

                        ) : (

                            <div className="cosmos-text-image__image-placeholder">

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


                    {/* =====================================
                        TEXTO
                    ====================================== */}

                    <div className="cosmos-text-image__text-column">

                        <div className="cosmos-text-image__text-inner">

                            <RichText
                                tagName="h2"
                                className="cosmos-text-image__title"
                                value={title}
                                onChange={(value) =>
                                    setAttributes({
                                        title: value
                                    })
                                }
                                placeholder={__(
                                    'Título...',
                                    'hoteles-cosmos'
                                )}
                            />


                            <RichText
                                tagName="div"
                                className="cosmos-text-image__description"
                                value={description}
                                onChange={(value) =>
                                    setAttributes({
                                        description: value
                                    })
                                }
                                placeholder={__(
                                    'Escribe el texto...',
                                    'hoteles-cosmos'
                                )}
                            />


                            {(button1Enabled || button2Enabled) && (

                                <div className="cosmos-text-image__buttons">

                                    {button1Enabled && (

                                        <a
                                            href={button1Url || '#'}
                                            className="cosmos-text-image__button"
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            {button1Text}
                                        </a>

                                    )}


                                    {button2Enabled && (

                                        <a
                                            href={button2Url || '#'}
                                            className="cosmos-text-image__button"
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            {button2Text}
                                        </a>

                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>
        );
    },

    save: () => null
});