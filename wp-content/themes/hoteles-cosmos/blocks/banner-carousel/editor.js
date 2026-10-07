import metadata from './block.json';

import {
    registerBlockType
} from '@wordpress/blocks';

import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
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
        slides,

        bannerHeight,
        overlay,

        titleFontSize,
        titleColor,
        titleWeight,

        ctaTextColor,
        ctaBackground,
        ctaHasBackground,
        ctaBorderColor,
        ctaBorderWidth,
        ctaBorderRadius,
        ctaPaddingVertical,
        ctaPaddingHorizontal,

        arrowColor,
        arrowBackground,
        arrowSize,
        showArrows

    } = attributes;


    /*
     * =====================================================
     * ACTUALIZAR SLIDE
     * =====================================================
     */

    const updateSlide = (index, data) => {

        const newSlides = [...slides];

        newSlides[index] = {
            ...newSlides[index],
            ...data
        };

        setAttributes({
            slides: newSlides
        });
    };


    /*
     * =====================================================
     * AÑADIR SLIDE
     * =====================================================
     */

    const addSlide = () => {

        setAttributes({
            slides: [
                ...slides,
                {
                    id: 0,
                    url: '',
                    alt: '',
                    title: '',
                    ctaText: 'Conoce más',
                    ctaUrl: '',
                    position: 'center-center'
                }
            ]
        });
    };


    /*
     * =====================================================
     * ELIMINAR SLIDE
     * =====================================================
     */

    const removeSlide = (index) => {

        if (slides.length <= 1) {
            return;
        }

        const newSlides = slides.filter(
            (_, slideIndex) => slideIndex !== index
        );

        setAttributes({
            slides: newSlides
        });
    };


    /*
     * =====================================================
     * SELECCIONAR IMAGEN
     * =====================================================
     */

    const selectImage = (index, media) => {

        if (!media || !media.url) {
            return;
        }

        updateSlide(index, {
            id: media.id || 0,
            url: media.url,
            alt: media.alt || ''
        });
    };


    /*
     * =====================================================
     * VARIABLES CSS
     * =====================================================
     */

    const blockProps = useBlockProps({
        className: 'cosmos-banner-carousel',

        style: {
            '--cosmos-banner-height':
                `${bannerHeight}px`,

            '--cosmos-banner-overlay':
                `${overlay / 100}`,

            '--cosmos-banner-title-size':
                `${titleFontSize}px`,

            '--cosmos-banner-title-color':
                titleColor,

            '--cosmos-banner-title-weight':
                titleWeight,

            '--cosmos-banner-cta-text':
                ctaTextColor,

            '--cosmos-banner-cta-background':
                ctaBackground,

            '--cosmos-banner-cta-border':
                ctaBorderColor,

            '--cosmos-banner-cta-border-width':
                `${ctaBorderWidth}px`,

            '--cosmos-banner-cta-radius':
                `${ctaBorderRadius}px`,

            '--cosmos-banner-cta-padding-y':
                `${ctaPaddingVertical}px`,

            '--cosmos-banner-cta-padding-x':
                `${ctaPaddingHorizontal}px`,

            '--cosmos-banner-arrow-color':
                arrowColor,

            '--cosmos-banner-arrow-background':
                arrowBackground,

            '--cosmos-banner-arrow-size':
                `${arrowSize}px`
        }
    });


    return (

        <Fragment>

            <InspectorControls>

                {/* =================================================
                    BANNER
                ================================================= */}

                <PanelBody
                    title="Banner"
                    initialOpen={true}
                >

                    <RangeControl
                        label="Altura del banner"
                        value={bannerHeight}
                        onChange={(value) =>
                            setAttributes({
                                bannerHeight: value
                            })
                        }
                        min={250}
                        max={900}
                        step={10}
                    />


                    <RangeControl
                        label="Oscurecimiento de imagen"
                        value={overlay}
                        onChange={(value) =>
                            setAttributes({
                                overlay: value
                            })
                        }
                        min={0}
                        max={90}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    TÍTULO
                ================================================= */}

                <PanelBody
                    title="Título"
                    initialOpen={false}
                >

                    <p>
                        <strong>
                            Color del título
                        </strong>
                    </p>

                    <ColorPalette
                        value={titleColor}
                        onChange={(value) =>
                            setAttributes({
                                titleColor:
                                    value || '#ffffff'
                            })
                        }
                    />


                    <RangeControl
                        label="Tamaño del título"
                        value={titleFontSize}
                        onChange={(value) =>
                            setAttributes({
                                titleFontSize: value
                            })
                        }
                        min={16}
                        max={100}
                        step={1}
                    />


                    <SelectControl
                        label="Peso del título"
                        value={titleWeight}
                        options={[
                            {
                                label: 'Ligero',
                                value: 300
                            },
                            {
                                label: 'Regular',
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
                                value: 900
                            }
                        ]}
                        onChange={(value) =>
                            setAttributes({
                                titleWeight:
                                    parseInt(value)
                            })
                        }
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
                        label="Mostrar fondo del botón"
                        checked={ctaHasBackground}
                        onChange={(value) =>
                            setAttributes({
                                ctaHasBackground: value
                            })
                        }
                    />


                    <p>
                        <strong>
                            Color del texto
                        </strong>
                    </p>

                    <ColorPalette
                        value={ctaTextColor}
                        onChange={(value) =>
                            setAttributes({
                                ctaTextColor:
                                    value || '#ffffff'
                            })
                        }
                    />


                    {ctaHasBackground && (

                        <Fragment>

                            <p>
                                <strong>
                                    Color de fondo
                                </strong>
                            </p>

                            <ColorPalette
                                value={ctaBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        ctaBackground:
                                            value || '#000000'
                                    })
                                }
                            />

                        </Fragment>

                    )}


                    <p>
                        <strong>
                            Color del borde
                        </strong>
                    </p>

                    <ColorPalette
                        value={ctaBorderColor}
                        onChange={(value) =>
                            setAttributes({
                                ctaBorderColor:
                                    value || '#ffffff'
                            })
                        }
                    />


                    <RangeControl
                        label="Grosor del borde"
                        value={ctaBorderWidth}
                        onChange={(value) =>
                            setAttributes({
                                ctaBorderWidth: value
                            })
                        }
                        min={0}
                        max={10}
                        step={1}
                    />


                    <RangeControl
                        label="Border radius"
                        value={ctaBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                ctaBorderRadius: value
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                    />


                    <RangeControl
                        label="Padding vertical"
                        value={ctaPaddingVertical}
                        onChange={(value) =>
                            setAttributes({
                                ctaPaddingVertical: value
                            })
                        }
                        min={4}
                        max={40}
                        step={1}
                    />


                    <RangeControl
                        label="Padding horizontal"
                        value={ctaPaddingHorizontal}
                        onChange={(value) =>
                            setAttributes({
                                ctaPaddingHorizontal: value
                            })
                        }
                        min={8}
                        max={60}
                        step={1}
                    />

                </PanelBody>


                {/* =================================================
                    FLECHAS
                ================================================= */}

                <PanelBody
                    title="Flechas"
                    initialOpen={false}
                >

                    <ToggleControl
                        label="Mostrar flechas"
                        checked={showArrows}
                        onChange={(value) =>
                            setAttributes({
                                showArrows: value
                            })
                        }
                    />


                    {showArrows && (

                        <Fragment>

                            <p>
                                <strong>
                                    Color de la flecha
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowColor}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowColor:
                                            value || '#ffffff'
                                    })
                                }
                            />


                            <p>
                                <strong>
                                    Fondo de la flecha
                                </strong>
                            </p>

                            <ColorPalette
                                value={arrowBackground}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowBackground:
                                            value || 'rgba(0,0,0,0.35)'
                                    })
                                }
                            />


                            <RangeControl
                                label="Tamaño de la flecha"
                                value={arrowSize}
                                onChange={(value) =>
                                    setAttributes({
                                        arrowSize: value
                                    })
                                }
                                min={25}
                                max={80}
                                step={1}
                            />

                        </Fragment>

                    )}

                </PanelBody>

            </InspectorControls>


            {/* =====================================================
                EDITOR
            ===================================================== */}

            <div {...blockProps}>

                <div className="cosmos-banner-carousel__slides">

                    {slides.map((slide, index) => (

                        <div
                            className="cosmos-banner-carousel__slide"
                            key={index}
                        >

                            {/* =================================================
                                IMAGEN
                            ================================================= */}

                            <MediaUploadCheck>

                                <MediaUpload
                                    onSelect={(media) =>
                                        selectImage(
                                            index,
                                            media
                                        )
                                    }
                                    allowedTypes={['image']}
                                    value={slide.id}
                                    render={({ open }) => (

                                        <div
                                            className="cosmos-banner-carousel__image-editor"
                                            onClick={open}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(event) => {

                                                if (
                                                    event.key === 'Enter' ||
                                                    event.key === ' '
                                                ) {
                                                    event.preventDefault();
                                                    open();
                                                }

                                            }}
                                        >

                                            {slide.url ? (

                                                <img
                                                    src={slide.url}
                                                    alt={slide.alt}
                                                />

                                            ) : (

                                                <div className="cosmos-banner-carousel__placeholder">
                                                    Seleccionar imagen del banner
                                                </div>

                                            )}

                                        </div>

                                    )}
                                />

                            </MediaUploadCheck>


                            {/* =================================================
                                OVERLAY
                            ================================================= */}

                            <div
                                className={`
                                    cosmos-banner-carousel__overlay
                                    cosmos-banner-carousel__position--${slide.position}
                                `}
                            >

                                {/* =================================================
                                    CONTENIDO EDITABLE
                                ================================================= */}

                                <div className="cosmos-banner-carousel__content">

                                    <RichText
                                        tagName="h2"
                                        className="cosmos-banner-carousel__title"
                                        value={slide.title}
                                        onChange={(value) =>
                                            updateSlide(
                                                index,
                                                {
                                                    title: value
                                                }
                                            )
                                        }
                                        placeholder="Título opcional..."
                                        allowedFormats={[]}
                                    />


                                    <div className="cosmos-banner-carousel__cta-preview">

                                        {slide.ctaUrl ? (

                                            <span
                                                className={
                                                    ctaHasBackground
                                                        ? 'cosmos-banner-carousel__button'
                                                        : 'cosmos-banner-carousel__button cosmos-banner-carousel__button--transparent'
                                                }
                                            >

                                                {slide.ctaText || 'Conoce más'}

                                            </span>

                                        ) : (

                                            <span className="cosmos-banner-carousel__cta-hidden">
                                                El CTA aparecerá cuando agregues una URL
                                            </span>

                                        )}

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                CONFIGURACIÓN DEL SLIDE
                            ================================================= */}

                            <div className="cosmos-banner-carousel__slide-settings">

                                <TextControl
                                    label="Texto del CTA"
                                    value={slide.ctaText}
                                    onChange={(value) =>
                                        updateSlide(
                                            index,
                                            {
                                                ctaText: value
                                            }
                                        )
                                    }
                                />


                                <TextControl
                                    label="URL del CTA"
                                    type="url"
                                    value={slide.ctaUrl}
                                    onChange={(value) =>
                                        updateSlide(
                                            index,
                                            {
                                                ctaUrl: value
                                            }
                                        )
                                    }
                                    placeholder="https://..."
                                />


                                <SelectControl
                                    label="Posición del contenido"
                                    value={slide.position}
                                    options={[
                                        {
                                            label: 'Arriba izquierda',
                                            value: 'top-left'
                                        },
                                        {
                                            label: 'Arriba centrado',
                                            value: 'top-center'
                                        },
                                        {
                                            label: 'Arriba derecha',
                                            value: 'top-right'
                                        },
                                        {
                                            label: 'Medio izquierda',
                                            value: 'center-left'
                                        },
                                        {
                                            label: 'Medio centrado',
                                            value: 'center-center'
                                        },
                                        {
                                            label: 'Medio derecha',
                                            value: 'center-right'
                                        },
                                        {
                                            label: 'Abajo izquierda',
                                            value: 'bottom-left'
                                        },
                                        {
                                            label: 'Abajo centrado',
                                            value: 'bottom-center'
                                        },
                                        {
                                            label: 'Abajo derecha',
                                            value: 'bottom-right'
                                        }
                                    ]}
                                    onChange={(value) =>
                                        updateSlide(
                                            index,
                                            {
                                                position: value
                                            }
                                        )
                                    }
                                />


                                <Button
                                    isDestructive
                                    variant="secondary"
                                    onClick={() =>
                                        removeSlide(index)
                                    }
                                    disabled={slides.length <= 1}
                                >
                                    Eliminar banner
                                </Button>

                            </div>

                        </div>

                    ))}

                </div>


                <div className="cosmos-banner-carousel__add">

                    <Button
                        variant="primary"
                        onClick={addSlide}
                    >
                        + Añadir banner
                    </Button>

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