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
            textWidth,
            columnGap,
            firstColumn,
            marginTop,
            marginBottom,

            textBackground,

            imageId,
            imageUrl,
            imageAlt,
            imagePosition,

            tagEnabled,
            tagText,
            tagPosition,
            tagBackground,
            tagColor,
            tagSize,
            tagWeight,
            tagPaddingHorizontal,
            tagPaddingVertical,

            title,
            titleColor,
            titleSize,
            titleWeight,
            titleAlign,
            titleLineHeight,
            titleMarginBottom,

            infoAlign,
            infoTextColor,
            infoTextSize,
            infoTextWeight,
            infoIconColor,
            infoIconSize,
            infoItemSpacing,

            addressEnabled,
            address,

            phoneEnabled,
            phone,

            emailEnabled,
            email,

            buttonsCount,
            buttonGap,
            buttonWidth,
            buttonHeight,
            buttonTextSize,
            buttonTextWeight,
            buttonTextColor,
            buttonBackground,
            buttonBorderColor,
            buttonBorderWidth,
            buttonBorderRadius,

            button1Text,
            button1Url,

            button2Text,
            button2Url
        } = attributes;


        /*
         * =========================================
         * DISTRIBUCIÓN
         * =========================================
         */

        const imageWidth = 100 - textWidth;


        /*
         * =========================================
         * IMAGEN
         * =========================================
         */

        const selectImage = (media) => {

            setAttributes({
                imageId: media.id,
                imageUrl: media.url,
                imageAlt: media.alt || ''
            });

        };


        const removeImage = () => {

            setAttributes({
                imageId: 0,
                imageUrl: '',
                imageAlt: ''
            });

        };


        /*
         * =========================================
         * ORDEN DE COLUMNAS
         * =========================================
         *
         * Estas clases son las mismas que utiliza
         * el PHP del bloque:
         *
         * is-first
         * is-second
         *
         */

        const textOrderClass =
            firstColumn === 'text'
                ? 'is-first'
                : 'is-second';

        const imageOrderClass =
            firstColumn === 'image'
                ? 'is-first'
                : 'is-second';


        /*
         * =========================================
         * PROPIEDADES DEL BLOQUE
         * =========================================
         */

        const blockProps = useBlockProps({
            className: 'cosmos-info-image',
            style: {
                '--cosmos-info-text-width': `${textWidth}%`,
                '--cosmos-info-image-width': `${imageWidth}%`,
                '--cosmos-info-column-gap': `${columnGap}px`,
                '--cosmos-info-margin-top': `${marginTop}px`,
                '--cosmos-info-margin-bottom': `${marginBottom}px`,

                '--cosmos-info-text-background': textBackground,

                '--cosmos-info-tag-background': tagBackground,
                '--cosmos-info-tag-color': tagColor,
                '--cosmos-info-tag-size': `${tagSize}px`,
                '--cosmos-info-tag-weight': tagWeight,
                '--cosmos-info-tag-padding-x': `${tagPaddingHorizontal}px`,
                '--cosmos-info-tag-padding-y': `${tagPaddingVertical}px`,

                '--cosmos-info-title-color': titleColor,
                '--cosmos-info-title-size': `${titleSize}px`,
                '--cosmos-info-title-weight': titleWeight,
                '--cosmos-info-title-align': titleAlign,
                '--cosmos-info-title-line-height': titleLineHeight,
                '--cosmos-info-title-margin-bottom': `${titleMarginBottom}px`,

                '--cosmos-info-align': infoAlign,
                '--cosmos-info-text-color': infoTextColor,
                '--cosmos-info-text-size': `${infoTextSize}px`,
                '--cosmos-info-text-weight': infoTextWeight,
                '--cosmos-info-icon-color': infoIconColor,
                '--cosmos-info-icon-size': `${infoIconSize}px`,
                '--cosmos-info-item-spacing': `${infoItemSpacing}px`,

                '--cosmos-info-button-gap': `${buttonGap}px`,
                '--cosmos-info-button-width': `${buttonWidth}px`,
                '--cosmos-info-button-height': `${buttonHeight}px`,
                '--cosmos-info-button-size': `${buttonTextSize}px`,
                '--cosmos-info-button-weight': buttonTextWeight,
                '--cosmos-info-button-color': buttonTextColor,
                '--cosmos-info-button-background': buttonBackground,
                '--cosmos-info-button-border-color': buttonBorderColor,
                '--cosmos-info-button-border-width': `${buttonBorderWidth}px`,
                '--cosmos-info-button-radius': `${buttonBorderRadius}px`
            }
        });


        /*
         * =========================================
         * ITEM DE INFORMACIÓN
         * =========================================
         */

        const renderInfoItem = (icon, value, enabled) => {

            if (!enabled) {
                return null;
            }

            return (
                <div className="cosmos-info-image__info-item">

                    <span className="cosmos-info-image__icon">
                        {icon}
                    </span>

                    <span className="cosmos-info-image__info-text">
                        {value}
                    </span>

                </div>
            );

        };


        return (
            <>

                <InspectorControls>

                    {/* =========================================
                        ESPACIADO Y ORDEN
                    ========================================== */}

                    <PanelBody
                        title={__('Espaciado y orden', 'hoteles-cosmos')}
                        initialOpen={true}
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
                            max={200}
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
                            max={200}
                        />

                        <SelectControl
                            label={__('Columna que aparece primero', 'hoteles-cosmos')}
                            value={firstColumn}
                            options={[
                                {
                                    label: __('Texto primero', 'hoteles-cosmos'),
                                    value: 'text'
                                },
                                {
                                    label: __('Imagen primero', 'hoteles-cosmos'),
                                    value: 'image'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    firstColumn: value
                                })
                            }
                        />

                    </PanelBody>


                    {/* =========================================
                        DISTRIBUCIÓN
                    ========================================== */}

                    <PanelBody
                        title={__('Distribución', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <RangeControl
                            label={__('Ancho de columna de texto (%)', 'hoteles-cosmos')}
                            value={textWidth}
                            onChange={(value) =>
                                setAttributes({
                                    textWidth: value
                                })
                            }
                            min={20}
                            max={80}
                        />

                        <p>
                            <strong>
                                {__('Distribución actual:', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <p>
                            {__('Texto:', 'hoteles-cosmos')} {textWidth}%
                            <br />
                            {__('Imagen:', 'hoteles-cosmos')} {imageWidth}%
                        </p>

                        <RangeControl
                            label={__('Separación entre columnas', 'hoteles-cosmos')}
                            value={columnGap}
                            onChange={(value) =>
                                setAttributes({
                                    columnGap: value
                                })
                            }
                            min={0}
                            max={50}
                        />

                    </PanelBody>


                    {/* =========================================
                        IMAGEN
                    ========================================== */}

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


                        <SelectControl
                            label={__('Posición de la imagen', 'hoteles-cosmos')}
                            value={imagePosition}
                            options={[
                                {
                                    label: __('Centro', 'hoteles-cosmos'),
                                    value: 'center'
                                },
                                {
                                    label: __('Arriba', 'hoteles-cosmos'),
                                    value: 'top'
                                },
                                {
                                    label: __('Abajo', 'hoteles-cosmos'),
                                    value: 'bottom'
                                },
                                {
                                    label: __('Izquierda', 'hoteles-cosmos'),
                                    value: 'left'
                                },
                                {
                                    label: __('Derecha', 'hoteles-cosmos'),
                                    value: 'right'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    imagePosition: value
                                })
                            }
                        />

                    </PanelBody>


                    {/* =========================================
                        COLUMNA TEXTO
                    ========================================== */}

                    <PanelBody
                        title={__('Columna de texto', 'hoteles-cosmos')}
                        initialOpen={false}
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

                    </PanelBody>


                    {/* =========================================
                        TAG
                    ========================================== */}

                    <PanelBody
                        title={__('Tag superior', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <ToggleControl
                            label={__('Mostrar tag', 'hoteles-cosmos')}
                            checked={tagEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    tagEnabled: value
                                })
                            }
                        />


                        {tagEnabled && (
                            <>

                                <TextControl
                                    label={__('Texto del tag', 'hoteles-cosmos')}
                                    value={tagText}
                                    onChange={(value) =>
                                        setAttributes({
                                            tagText: value
                                        })
                                    }
                                />


                                <SelectControl
                                    label={__('Posición', 'hoteles-cosmos')}
                                    value={tagPosition}
                                    options={[
                                        {
                                            label: __('Izquierda', 'hoteles-cosmos'),
                                            value: 'left'
                                        },
                                        {
                                            label: __('Derecha', 'hoteles-cosmos'),
                                            value: 'right'
                                        }
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({
                                            tagPosition: value
                                        })
                                    }
                                />


                                <p>
                                    <strong>
                                        {__('Color de fondo', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <ColorPicker
                                    color={tagBackground}
                                    onChangeComplete={(color) =>
                                        setAttributes({
                                            tagBackground: color.hex
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
                                    color={tagColor}
                                    onChangeComplete={(color) =>
                                        setAttributes({
                                            tagColor: color.hex
                                        })
                                    }
                                    disableAlpha
                                />


                                <RangeControl
                                    label={__('Tamaño del texto', 'hoteles-cosmos')}
                                    value={tagSize}
                                    onChange={(value) =>
                                        setAttributes({
                                            tagSize: value
                                        })
                                    }
                                    min={8}
                                    max={40}
                                />


                                <SelectControl
                                    label={__('Peso', 'hoteles-cosmos')}
                                    value={tagWeight}
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
                                            tagWeight: value
                                        })
                                    }
                                />


                                <RangeControl
                                    label={__('Padding horizontal', 'hoteles-cosmos')}
                                    value={tagPaddingHorizontal}
                                    onChange={(value) =>
                                        setAttributes({
                                            tagPaddingHorizontal: value
                                        })
                                    }
                                    min={0}
                                    max={50}
                                />


                                <RangeControl
                                    label={__('Padding vertical', 'hoteles-cosmos')}
                                    value={tagPaddingVertical}
                                    onChange={(value) =>
                                        setAttributes({
                                            tagPaddingVertical: value
                                        })
                                    }
                                    min={0}
                                    max={30}
                                />

                            </>
                        )}

                    </PanelBody>


                    {/* =========================================
                        TÍTULO
                    ========================================== */}

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
                            max={100}
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
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    titleAlign: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Altura de línea', 'hoteles-cosmos')}
                            value={titleLineHeight}
                            onChange={(value) =>
                                setAttributes({
                                    titleLineHeight: value
                                })
                            }
                            min={0.8}
                            max={2}
                            step={0.05}
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
                            max={100}
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


                    {/* =========================================
                        INFORMACIÓN
                    ========================================== */}

                    <PanelBody
                        title={__('Información de contacto', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <ToggleControl
                            label={__('Mostrar dirección', 'hoteles-cosmos')}
                            checked={addressEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    addressEnabled: value
                                })
                            }
                        />

                        {addressEnabled && (

                            <TextControl
                                label={__('Dirección', 'hoteles-cosmos')}
                                value={address}
                                onChange={(value) =>
                                    setAttributes({
                                        address: value
                                    })
                                }
                            />

                        )}


                        <ToggleControl
                            label={__('Mostrar teléfono', 'hoteles-cosmos')}
                            checked={phoneEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    phoneEnabled: value
                                })
                            }
                        />

                        {phoneEnabled && (

                            <TextControl
                                label={__('Teléfono', 'hoteles-cosmos')}
                                value={phone}
                                onChange={(value) =>
                                    setAttributes({
                                        phone: value
                                    })
                                }
                            />

                        )}


                        <ToggleControl
                            label={__('Mostrar email', 'hoteles-cosmos')}
                            checked={emailEnabled}
                            onChange={(value) =>
                                setAttributes({
                                    emailEnabled: value
                                })
                            }
                        />

                        {emailEnabled && (

                            <TextControl
                                label={__('Email', 'hoteles-cosmos')}
                                value={email}
                                onChange={(value) =>
                                    setAttributes({
                                        email: value
                                    })
                                }
                            />

                        )}


                        <SelectControl
                            label={__('Alineación', 'hoteles-cosmos')}
                            value={infoAlign}
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
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    infoAlign: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Tamaño del texto', 'hoteles-cosmos')}
                            value={infoTextSize}
                            onChange={(value) =>
                                setAttributes({
                                    infoTextSize: value
                                })
                            }
                            min={10}
                            max={40}
                        />


                        <SelectControl
                            label={__('Peso del texto', 'hoteles-cosmos')}
                            value={infoTextWeight}
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
                                    infoTextWeight: value
                                })
                            }
                        />


                        <RangeControl
                            label={__('Tamaño del icono', 'hoteles-cosmos')}
                            value={infoIconSize}
                            onChange={(value) =>
                                setAttributes({
                                    infoIconSize: value
                                })
                            }
                            min={10}
                            max={50}
                        />


                        <RangeControl
                            label={__('Separación entre items', 'hoteles-cosmos')}
                            value={infoItemSpacing}
                            onChange={(value) =>
                                setAttributes({
                                    infoItemSpacing: value
                                })
                            }
                            min={0}
                            max={50}
                        />


                        <p>
                            <strong>
                                {__('Color del texto', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={infoTextColor}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    infoTextColor: color.hex
                                })
                            }
                            disableAlpha
                        />


                        <p>
                            <strong>
                                {__('Color de los iconos', 'hoteles-cosmos')}
                            </strong>
                        </p>

                        <ColorPicker
                            color={infoIconColor}
                            onChangeComplete={(color) =>
                                setAttributes({
                                    infoIconColor: color.hex
                                })
                            }
                            disableAlpha
                        />

                    </PanelBody>


                    {/* =========================================
                        BOTONES
                    ========================================== */}

                    <PanelBody
                        title={__('Botones', 'hoteles-cosmos')}
                        initialOpen={false}
                    >

                        <SelectControl
                            label={__('Cantidad de botones', 'hoteles-cosmos')}
                            value={String(buttonsCount)}
                            options={[
                                {
                                    label: 'Ninguno',
                                    value: '0'
                                },
                                {
                                    label: 'Un botón',
                                    value: '1'
                                },
                                {
                                    label: 'Dos botones',
                                    value: '2'
                                }
                            ]}
                            onChange={(value) =>
                                setAttributes({
                                    buttonsCount: Number(value)
                                })
                            }
                        />


                        {buttonsCount > 0 && (
                            <>

                                <RangeControl
                                    label={__('Separación entre botones', 'hoteles-cosmos')}
                                    value={buttonGap}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonGap: value
                                        })
                                    }
                                    min={0}
                                    max={50}
                                />


                                <RangeControl
                                    label={__('Ancho', 'hoteles-cosmos')}
                                    value={buttonWidth}
                                    onChange={(value) =>
                                        setAttributes({
                                            buttonWidth: value
                                        })
                                    }
                                    min={80}
                                    max={400}
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
                                    max={30}
                                />


                                <SelectControl
                                    label={__('Peso del texto', 'hoteles-cosmos')}
                                    value={buttonTextWeight}
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
                                            buttonTextWeight: value
                                        })
                                    }
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


                                <p>
                                    <strong>
                                        {__('Color del texto', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <ColorPicker
                                    color={buttonTextColor}
                                    onChangeComplete={(color) =>
                                        setAttributes({
                                            buttonTextColor: color.hex
                                        })
                                    }
                                    disableAlpha
                                />


                                <p>
                                    <strong>
                                        {__('Fondo', 'hoteles-cosmos')}
                                    </strong>
                                </p>

                                <ColorPicker
                                    color={buttonBackground}
                                    onChangeComplete={(color) =>
                                        setAttributes({
                                            buttonBackground: color.hex
                                        })
                                    }
                                    enableAlpha
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

                            </>
                        )}

                    </PanelBody>


                    {/* =========================================
                        BOTÓN 1
                    ========================================== */}

                    {buttonsCount >= 1 && (

                        <PanelBody
                            title={__('Botón 1', 'hoteles-cosmos')}
                            initialOpen={false}
                        >

                            <TextControl
                                label={__('Texto', 'hoteles-cosmos')}
                                value={button1Text}
                                onChange={(value) =>
                                    setAttributes({
                                        button1Text: value
                                    })
                                }
                            />

                            <TextControl
                                label={__('URL', 'hoteles-cosmos')}
                                value={button1Url}
                                onChange={(value) =>
                                    setAttributes({
                                        button1Url: value
                                    })
                                }
                            />

                        </PanelBody>

                    )}


                    {/* =========================================
                        BOTÓN 2
                    ========================================== */}

                    {buttonsCount >= 2 && (

                        <PanelBody
                            title={__('Botón 2', 'hoteles-cosmos')}
                            initialOpen={false}
                        >

                            <TextControl
                                label={__('Texto', 'hoteles-cosmos')}
                                value={button2Text}
                                onChange={(value) =>
                                    setAttributes({
                                        button2Text: value
                                    })
                                }
                            />

                            <TextControl
                                label={__('URL', 'hoteles-cosmos')}
                                value={button2Url}
                                onChange={(value) =>
                                    setAttributes({
                                        button2Url: value
                                    })
                                }
                            />

                        </PanelBody>

                    )}

                </InspectorControls>


                {/* =============================================
                    BLOQUE
                ============================================== */}

                <div {...blockProps}>

                    <div className="container">

                        <div
                            className={`cosmos-info-image__columns ${
                                firstColumn === 'image'
                                    ? 'is-first-image'
                                    : 'is-first-text'
                            }`}
                        >

                            {/* =====================================
                                TEXTO
                            ====================================== */}

                            <div
                                className={`cosmos-info-image__text-column ${textOrderClass}`}
                            >

                                {tagEnabled && (

                                    <div
                                        className={`
                                            cosmos-info-image__tag
                                            is-position-${tagPosition}
                                        `}
                                    >
                                        {tagText}
                                    </div>

                                )}


                                <div className="cosmos-info-image__content">

                                    <RichText
                                        tagName="h2"
                                        className="cosmos-info-image__title"
                                        value={title}
                                        onChange={(value) =>
                                            setAttributes({
                                                title: value
                                            })
                                        }
                                        placeholder={__(
                                            'Escribe el título...',
                                            'hoteles-cosmos'
                                        )}
                                    />


                                    <div className="cosmos-info-image__items">

                                        {renderInfoItem(
                                            '⌖',
                                            address,
                                            addressEnabled
                                        )}

                                        {renderInfoItem(
                                            '☎',
                                            phone,
                                            phoneEnabled
                                        )}

                                        {renderInfoItem(
                                            '✉',
                                            email,
                                            emailEnabled
                                        )}

                                    </div>


                                    {buttonsCount > 0 && (

                                        <div className="cosmos-info-image__buttons">

                                            {buttonsCount >= 1 && (

                                                <a
                                                    href={button1Url || '#'}
                                                    className="cosmos-info-image__button"
                                                    onClick={(event) =>
                                                        event.preventDefault()
                                                    }
                                                >
                                                    {button1Text}
                                                </a>

                                            )}


                                            {buttonsCount >= 2 && (

                                                <a
                                                    href={button2Url || '#'}
                                                    className="cosmos-info-image__button"
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


                            {/* =====================================
                                IMAGEN
                            ====================================== */}

                            <div
                                className={`cosmos-info-image__image-column ${imageOrderClass}`}
                            >

                                {imageUrl ? (

                                    <div
                                        className="cosmos-info-image__image"
                                        style={{
                                            backgroundImage: `url("${imageUrl}")`,
                                            backgroundPosition: imagePosition
                                        }}
                                    />

                                ) : (

                                    <div className="cosmos-info-image__image-placeholder">

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

                    </div>

                </div>

            </>
        );
    },


    save: () => null
});
