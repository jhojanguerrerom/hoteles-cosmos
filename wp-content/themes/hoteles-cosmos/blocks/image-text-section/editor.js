import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

import './style.css';
import './editor.css';


function Edit({ attributes, setAttributes }) {

    const {
        imageId,
        imageUrl,
        imageAlt,

        imagePosition,

        imageWidth,
        textWidth,

        title,
        description,

        textAlign,
        textColor,

        titleSize,
        descriptionSize,

        backgroundColor,

        marginTop,
        marginBottom,

        showCta,

        ctaTitle,
        ctaDescription,
        ctaButtonText,
        ctaButtonUrl,

        ctaAlign,

        ctaTitleSize,
        ctaTitleColor,

        ctaDescriptionSize,
        ctaDescriptionColor,

        ctaButtonColor,
        ctaButtonTextColor,

        ctaButtonSize,
        ctaButtonPaddingVertical,
        ctaButtonPaddingHorizontal,
        ctaButtonRadius
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


    const removeImage = () => {

        setAttributes({
            imageId: 0,
            imageUrl: '',
            imageAlt: ''
        });
    };


    /*
     * =====================================================
     * ANCHO COLUMNAS
     * =====================================================
     */

    const changeImageWidth = (value) => {

        const width = Number(value);

        if (!Number.isFinite(width)) {
            return;
        }

        const safeWidth = Math.max(
            20,
            Math.min(80, width)
        );

        setAttributes({
            imageWidth: safeWidth,
            textWidth: 100 - safeWidth
        });
    };


    /*
     * =====================================================
     * BLOCK PROPS
     * =====================================================
     */

    const blockProps = useBlockProps({

        className: 'cosmos-image-text',

        style: {

            '--cosmos-image-text-image-width':
                `${imageWidth}%`,

            '--cosmos-image-text-content-width':
                `${textWidth}%`,

            '--cosmos-image-text-background':
                backgroundColor,

            '--cosmos-image-text-color':
                textColor,

            '--cosmos-image-text-title-size':
                `${titleSize}px`,

            '--cosmos-image-text-description-size':
                `${descriptionSize}px`,

            '--cosmos-image-text-margin-top':
                `${marginTop}px`,

            '--cosmos-image-text-margin-bottom':
                `${marginBottom}px`,

            '--cosmos-image-text-align':
                textAlign,

            '--cosmos-image-text-cta-align':
                ctaAlign,

            '--cosmos-image-text-cta-title-size':
                `${ctaTitleSize}px`,

            '--cosmos-image-text-cta-title-color':
                ctaTitleColor,

            '--cosmos-image-text-cta-description-size':
                `${ctaDescriptionSize}px`,

            '--cosmos-image-text-cta-description-color':
                ctaDescriptionColor,

            '--cosmos-image-text-cta-button-color':
                ctaButtonColor,

            '--cosmos-image-text-cta-button-text-color':
                ctaButtonTextColor,

            '--cosmos-image-text-cta-button-size':
                `${ctaButtonSize}px`,

            '--cosmos-image-text-cta-button-padding-vertical':
                `${ctaButtonPaddingVertical}px`,

            '--cosmos-image-text-cta-button-padding-horizontal':
                `${ctaButtonPaddingHorizontal}px`,

            '--cosmos-image-text-cta-button-radius':
                `${ctaButtonRadius}px`
        }
    });


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    IMAGEN
                ================================================= */}

                <PanelBody
                    title="Imagen"
                    initialOpen={true}
                >

                    <MediaUploadCheck>

                        <MediaUpload
                            onSelect={selectImage}
                            allowedTypes={['image']}
                            value={imageId}
                            render={({ open }) => (

                                <Button
                                    variant="primary"
                                    onClick={open}
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {imageUrl
                                        ? 'Cambiar imagen'
                                        : 'Seleccionar imagen'
                                    }
                                </Button>

                            )}
                        />

                    </MediaUploadCheck>


                    {imageUrl && (

                        <Button
                            isDestructive
                            variant="secondary"
                            onClick={removeImage}
                            style={{
                                width: '100%',
                                marginTop: '8px',
                                justifyContent: 'center'
                            }}
                        >
                            Eliminar imagen
                        </Button>

                    )}


                    <SelectControl
                        label="Posición de la imagen"
                        value={imagePosition}
                        options={[
                            {
                                label: 'Izquierda',
                                value: 'left'
                            },
                            {
                                label: 'Derecha',
                                value: 'right'
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                imagePosition: value
                            })
                        }
                    />


                    <RangeControl
                        label="Ancho de la imagen"
                        value={imageWidth}
                        onChange={changeImageWidth}
                        min={20}
                        max={80}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    TEXTO
                ================================================= */}

                <PanelBody
                    title="Texto"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color del texto
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


                    <RangeControl
                        label="Tamaño del título"
                        value={titleSize}
                        onChange={(value) =>
                            setAttributes({
                                titleSize: value
                            })
                        }
                        min={18}
                        max={80}
                        step={1}
                    />


                    <RangeControl
                        label="Tamaño de descripción"
                        value={descriptionSize}
                        onChange={(value) =>
                            setAttributes({
                                descriptionSize: value
                            })
                        }
                        min={12}
                        max={40}
                        step={1}
                    />


                    <SelectControl
                        label="Alineación"
                        value={textAlign}
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
                                textAlign: value
                            })
                        }
                    />


                    <p>
                        <strong>
                            Fondo de la columna de texto
                        </strong>
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
                    ESPACIADO
                ================================================= */}

                <PanelBody
                    title="Espaciado"
                    initialOpen={false}
                >

                    <RangeControl
                        label="Margen superior"
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
                        label="Margen inferior"
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
                    CTA
                ================================================= */}

                <PanelBody
                    title="CTA"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar CTA"
                        checked={showCta}
                        onChange={(value) =>
                            setAttributes({
                                showCta: value
                            })
                        }
                    />


                    {showCta && (

                        <Fragment>

                            <TextControl
                                label="Título CTA"
                                value={ctaTitle}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaTitle: value
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Color del título CTA
                                </strong>
                            </p>

                            <ColorPalette
                                value={ctaTitleColor}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaTitleColor:
                                            value || '#111111'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño del título CTA"
                                value={ctaTitleSize}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaTitleSize: value
                                    })
                                }
                                min={12}
                                max={60}
                                step={1}
                            />


                            <TextControl
                                label="Descripción CTA"
                                value={ctaDescription}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaDescription: value
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Color de la descripción CTA
                                </strong>
                            </p>

                            <ColorPalette
                                value={ctaDescriptionColor}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaDescriptionColor:
                                            value || '#111111'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño de la descripción CTA"
                                value={ctaDescriptionSize}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaDescriptionSize: value
                                    })
                                }
                                min={10}
                                max={40}
                                step={1}
                            />


                            <TextControl
                                label="Texto del botón"
                                value={ctaButtonText}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonText: value
                                    })
                                }
                            />


                            <TextControl
                                label="URL del botón"
                                value={ctaButtonUrl}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonUrl: value
                                    })
                                }
                            />


                            {/* ALINEACIÓN */}

                            <SelectControl
                                label="Alineación del CTA"
                                value={ctaAlign}
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
                                        ctaAlign: value
                                    })
                                }
                            />


                            {/* COLOR BOTÓN */}

                            <p>
                                <strong>
                                    Color de fondo del botón
                                </strong>
                            </p>

                            <ColorPalette
                                value={ctaButtonColor}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonColor:
                                            value || '#111111'
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Color del texto del botón
                                </strong>
                            </p>

                            <ColorPalette
                                value={ctaButtonTextColor}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonTextColor:
                                            value || '#ffffff'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño del texto del botón"
                                value={ctaButtonSize}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonSize: value
                                    })
                                }
                                min={10}
                                max={30}
                                step={1}
                            />


                            <RangeControl
                                label="Padding vertical"
                                value={ctaButtonPaddingVertical}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonPaddingVertical:
                                            value
                                    })
                                }
                                min={0}
                                max={50}
                                step={1}
                            />


                            <RangeControl
                                label="Padding horizontal"
                                value={ctaButtonPaddingHorizontal}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonPaddingHorizontal:
                                            value
                                    })
                                }
                                min={0}
                                max={100}
                                step={1}
                            />


                            <RangeControl
                                label="Border radius"
                                value={ctaButtonRadius}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaButtonRadius:
                                            value
                                    })
                                }
                                min={0}
                                max={50}
                                step={1}
                            />

                        </Fragment>

                    )}

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                BLOQUE
            ===================================================== */}

            <div {...blockProps}>

                <div
                    className={[
                        'cosmos-image-text__inner',
                        `cosmos-image-text__image-${imagePosition}`
                    ].join(' ')}
                >

                    {/* IMAGEN */}

                    <div className="cosmos-image-text__image-column">

                        {imageUrl ? (

                            <img
                                className="cosmos-image-text__image"
                                src={imageUrl}
                                alt={imageAlt}
                            />

                        ) : (

                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={selectImage}
                                    allowedTypes={['image']}
                                    render={({ open }) => (

                                        <Button
                                            variant="secondary"
                                            onClick={open}
                                        >
                                            Seleccionar imagen
                                        </Button>

                                    )}
                                />

                            </MediaUploadCheck>

                        )}

                    </div>


                    {/* CONTENIDO */}

                    <div
                        className="cosmos-image-text__content-column"
                    >

                        <RichText
                            tagName="h2"
                            className="cosmos-image-text__title"
                            value={title}
                            onChange={(value) =>
                                setAttributes({
                                    title: value
                                })
                            }
                            placeholder="Escribe el título..."
                            allowedFormats={[]}
                        />


                        <RichText
                            tagName="div"
                            className="cosmos-image-text__description"
                            value={description}
                            onChange={(value) =>
                                setAttributes({
                                    description: value
                                })
                            }
                            placeholder="Escribe la descripción..."
                            allowedFormats={[
                                'core/bold',
                                'core/italic',
                                'core/link'
                            ]}
                        />


                        {/* CTA */}

                        {showCta && (

                            <div
                                className="cosmos-image-text__cta"
                            >

                                <RichText
                                    tagName="h3"
                                    className="cosmos-image-text__cta-title"
                                    value={ctaTitle}
                                    onChange={(value) =>
                                        setAttributes({
                                            ctaTitle: value
                                        })
                                    }
                                    placeholder="Título CTA..."
                                    allowedFormats={[]}
                                />


                                <RichText
                                    tagName="div"
                                    className="cosmos-image-text__cta-description"
                                    value={ctaDescription}
                                    onChange={(value) =>
                                        setAttributes({
                                            ctaDescription: value
                                        })
                                    }
                                    placeholder="Descripción CTA..."
                                    allowedFormats={[]}
                                />


                                <div
                                    className="cosmos-image-text__cta-button-wrapper"
                                >

                                    <RichText
                                        tagName="span"
                                        className="cosmos-image-text__cta-button-editor"
                                        value={ctaButtonText}
                                        onChange={(value) =>
                                            setAttributes({
                                                ctaButtonText:
                                                    value
                                            })
                                        }
                                        allowedFormats={[]}
                                        placeholder="Texto del botón..."
                                    />

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </Fragment>
    );
}


registerBlockType(
    metadata.name,
    {
        ...metadata,
        edit: Edit,
        save: () => null
    }
);