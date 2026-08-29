import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    ColorPalette,
    RichText
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

        textBackgroundColor,
        textColor,

        titleSize,
        titleWeight,

        showCta,

        ctaText,
        ctaUrl,

        ctaBackgroundColor,
        ctaTextColor,
        ctaStyle,

        ctaTextSize,
        ctaPaddingVertical,
        ctaPaddingHorizontal,
        ctaRadius,

        heroHeight,
        mobileHeight,

        mobileImageFirst,

        contentWidth

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

            imageId:
                media.id || 0,

            imageUrl:
                media.url,

            imageAlt:
                media.alt || ''

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

        const width =
            Number(value);

        if (!Number.isFinite(width)) {
            return;
        }

        const safeWidth =
            Math.max(
                20,
                Math.min(
                    80,
                    width
                )
            );

        setAttributes({

            imageWidth:
                safeWidth,

            textWidth:
                100 - safeWidth

        });
    };


    /*
     * =====================================================
     * BLOCK PROPS
     * =====================================================
     */

    const blockProps = useBlockProps({

        className: [
            'cosmos-split-hero',
            `cosmos-split-hero--${contentWidth}`
        ].join(' '),

        style: {

            '--cosmos-split-hero-image-width':
                `${imageWidth}%`,

            '--cosmos-split-hero-text-width':
                `${textWidth}%`,

            '--cosmos-split-hero-height':
                `${heroHeight}px`,

            '--cosmos-split-hero-mobile-height':
                `${mobileHeight}px`,

            '--cosmos-split-hero-text-background':
                textBackgroundColor,

            '--cosmos-split-hero-text-color':
                textColor,

            '--cosmos-split-hero-title-size':
                `${titleSize}px`,

            '--cosmos-split-hero-title-weight':
                titleWeight,

            '--cosmos-split-hero-cta-background':
                ctaBackgroundColor,

            '--cosmos-split-hero-cta-color':
                ctaTextColor,

            '--cosmos-split-hero-cta-size':
                `${ctaTextSize}px`,

            '--cosmos-split-hero-cta-padding-y':
                `${ctaPaddingVertical}px`,

            '--cosmos-split-hero-cta-padding-x':
                `${ctaPaddingHorizontal}px`,

            '--cosmos-split-hero-cta-radius':
                `${ctaRadius}px`
        }
    });


    /*
     * =====================================================
     * CLASE CTA
     * =====================================================
     */

    const ctaStyleClass =
        ctaStyle === 'outline'
            ? 'cosmos-split-hero__cta--outline'
            : 'cosmos-split-hero__cta--filled';


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

                            allowedTypes={[
                                'image'
                            ]}

                            value={imageId}

                            render={({ open }) => (

                                <Button

                                    variant="primary"

                                    onClick={open}

                                    style={{
                                        width: '100%',
                                        justifyContent:
                                            'center'
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
                                justifyContent:
                                    'center'
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
                                imagePosition:
                                    value
                            })
                        }

                    />


                    <RangeControl

                        label="Ancho de la imagen"

                        value={imageWidth}

                        onChange={
                            changeImageWidth
                        }

                        min={20}

                        max={80}

                        step={1}

                    />

                </PanelBody>


                {/* =================================================
                    CONTENIDO
                ================================================= */}

                <PanelBody

                    title="Contenido"

                    initialOpen={false}

                >

                    <p>
                        <strong>
                            Fondo
                        </strong>
                    </p>

                    <ColorPalette

                        value={
                            textBackgroundColor
                        }

                        onChange={(value) =>
                            setAttributes({

                                textBackgroundColor:
                                    value ||
                                    '#111111'

                            })
                        }

                    />


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
                                    value ||
                                    '#ffffff'

                            })
                        }

                    />


                    <RangeControl

                        label="Tamaño del título"

                        value={titleSize}

                        onChange={(value) =>
                            setAttributes({
                                titleSize:
                                    value
                            })
                        }

                        min={20}

                        max={100}

                        step={1}

                    />


                    <RangeControl

                        label="Grosor del título"

                        value={titleWeight}

                        onChange={(value) =>
                            setAttributes({
                                titleWeight:
                                    value
                            })
                        }

                        min={100}

                        max={900}

                        step={100}

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
                                showCta:
                                    value
                            })
                        }

                    />


                    {showCta && (

                        <Fragment>

                            <SelectControl

                                label="Estilo del botón"

                                value={ctaStyle}

                                options={[

                                    {
                                        label:
                                            'Con fondo',
                                        value:
                                            'filled'
                                    },

                                    {
                                        label:
                                            'Transparente con borde',
                                        value:
                                            'outline'
                                    }

                                ]}

                                onChange={(value) =>
                                    setAttributes({
                                        ctaStyle:
                                            value
                                    })
                                }

                            />


                            <TextControl

                                label="Texto"

                                value={ctaText}

                                onChange={(value) =>
                                    setAttributes({
                                        ctaText:
                                            value
                                    })
                                }

                            />


                            <TextControl

                                label="URL"

                                value={ctaUrl}

                                onChange={(value) =>
                                    setAttributes({
                                        ctaUrl:
                                            value
                                    })
                                }

                            />


                            <p>
                                <strong>
                                    Fondo del botón
                                </strong>
                            </p>

                            <ColorPalette

                                value={
                                    ctaBackgroundColor
                                }

                                onChange={(value) =>
                                    setAttributes({

                                        ctaBackgroundColor:
                                            value ||
                                            '#ffffff'

                                    })
                                }

                            />


                            <p>
                                <strong>
                                    Color del texto y borde
                                </strong>
                            </p>

                            <ColorPalette

                                value={
                                    ctaTextColor
                                }

                                onChange={(value) =>
                                    setAttributes({

                                        ctaTextColor:
                                            value ||
                                            '#111111'

                                    })
                                }

                            />


                            <RangeControl

                                label="Tamaño del texto"

                                value={
                                    ctaTextSize
                                }

                                onChange={(value) =>
                                    setAttributes({
                                        ctaTextSize:
                                            value
                                    })
                                }

                                min={10}

                                max={30}

                            />


                            <RangeControl

                                label="Padding vertical"

                                value={
                                    ctaPaddingVertical
                                }

                                onChange={(value) =>
                                    setAttributes({

                                        ctaPaddingVertical:
                                            value

                                    })
                                }

                                min={0}

                                max={50}

                            />


                            <RangeControl

                                label="Padding horizontal"

                                value={
                                    ctaPaddingHorizontal
                                }

                                onChange={(value) =>
                                    setAttributes({

                                        ctaPaddingHorizontal:
                                            value

                                    })
                                }

                                min={0}

                                max={100}

                            />


                            <RangeControl

                                label="Border radius"

                                value={ctaRadius}

                                onChange={(value) =>
                                    setAttributes({

                                        ctaRadius:
                                            value

                                    })
                                }

                                min={0}

                                max={50}

                            />

                        </Fragment>

                    )}

                </PanelBody>


                {/* =================================================
                    ALTURA
                ================================================= */}

                <PanelBody

                    title="Altura"

                    initialOpen={false}

                >

                    <RangeControl

                        label="Altura escritorio"

                        value={heroHeight}

                        onChange={(value) =>
                            setAttributes({
                                heroHeight:
                                    value
                            })
                        }

                        min={300}

                        max={1000}

                        step={10}

                    />


                    <RangeControl

                        label="Altura mobile"

                        value={mobileHeight}

                        onChange={(value) =>
                            setAttributes({
                                mobileHeight:
                                    value
                            })
                        }

                        min={300}

                        max={1000}

                        step={10}

                    />

                </PanelBody>


                {/* =================================================
                    MOBILE
                ================================================= */}

                <PanelBody

                    title="Mobile"

                    initialOpen={false}

                >

                    <ToggleControl

                        label="Mostrar imagen primero"

                        checked={
                            mobileImageFirst
                        }

                        onChange={(value) =>
                            setAttributes({

                                mobileImageFirst:
                                    value

                            })
                        }

                    />

                </PanelBody>


                {/* =================================================
                    ANCHO
                ================================================= */}

                <PanelBody

                    title="Ancho"

                    initialOpen={false}

                >

                    <SelectControl

                        label="Ancho del bloque"

                        value={contentWidth}

                        options={[

                            {
                                label:
                                    'Ancho completo',
                                value:
                                    'full'
                            },

                            {
                                label:
                                    'Container del sitio',
                                value:
                                    'container'
                            }

                        ]}

                        onChange={(value) =>
                            setAttributes({

                                contentWidth:
                                    value

                            })
                        }

                    />

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                VISTA DEL EDITOR
            ===================================================== */}

            <div {...blockProps}>

                <div
                    className={[
                        'cosmos-split-hero__inner',

                        `cosmos-split-hero__image-${imagePosition}`,

                        mobileImageFirst
                            ? 'cosmos-split-hero__mobile-image-first'
                            : 'cosmos-split-hero__mobile-content-first'

                    ].join(' ')}
                >

                    {/* IMAGEN */}

                    <div
                        className="
                            cosmos-split-hero__image-column
                        "
                    >

                        {imageUrl ? (

                            <img

                                className="
                                    cosmos-split-hero__image
                                "

                                src={imageUrl}

                                alt={imageAlt}

                            />

                        ) : (

                            <MediaUploadCheck>

                                <MediaUpload

                                    onSelect={
                                        selectImage
                                    }

                                    allowedTypes={[
                                        'image'
                                    ]}

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
                        className="
                            cosmos-split-hero__content-column
                        "
                    >

                        <div
                            className="
                                cosmos-split-hero__content
                            "
                        >

                            <RichText

                                tagName="h1"

                                className="
                                    cosmos-split-hero__title
                                "

                                value={title}

                                onChange={(value) =>
                                    setAttributes({
                                        title:
                                            value
                                    })
                                }

                                placeholder="
                                    Escribe el título...
                                "

                                allowedFormats={[]}

                            />


                            {showCta && (

                                <div
                                    className="
                                        cosmos-split-hero__cta-wrapper
                                    "
                                >

                                    <span
                                        className={`
                                            cosmos-split-hero__cta
                                            ${ctaStyleClass}
                                        `}
                                    >

                                        <RichText

                                            tagName="span"

                                            value={ctaText}

                                            onChange={(value) =>
                                                setAttributes({
                                                    ctaText:
                                                        value
                                                })
                                            }

                                            placeholder="
                                                Texto del botón...
                                            "

                                            allowedFormats={[]}

                                        />

                                    </span>

                                </div>

                            )}

                        </div>

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