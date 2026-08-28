import { registerBlockType } from '@wordpress/blocks';

import {
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    useBlockProps,
    ColorPalette
} from '@wordpress/block-editor';

import {
    PanelBody,
    Button,
    RangeControl,
    SelectControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';


registerBlockType('hoteles-cosmos/image-text-banner', {

    edit: ({ attributes, setAttributes }) => {

        const {
            imageUrl,
            imageId,

            imageHeight,
            backgroundPosition,
            overlay,

            title,
            titleColor,
            titleSize,
            titleWeight,
            titleAlign,

            description,
            descriptionColor,
            descriptionSize,
            descriptionAlign,

            contentBackgroundColor,

            contentPaddingTop,
            contentPaddingBottom,
            contentPaddingLeft,
            contentPaddingRight,

            backgroundPaddingTop,
            backgroundPaddingBottom,

            blockMarginTop,
            blockMarginBottom

        } = attributes;


        /*
         * =====================================================
         * VARIABLES DEL BLOQUE
         * =====================================================
         */

        const blockProps = useBlockProps({

            className: 'cosmos-image-text-banner',

            style: {

                '--cosmos-banner-height':
                    `${imageHeight}px`,

                '--cosmos-banner-position':
                    backgroundPosition,

                '--cosmos-banner-overlay':
                    overlay,

                '--cosmos-title-color':
                    titleColor,

                '--cosmos-title-size':
                    `${titleSize}px`,

                '--cosmos-title-weight':
                    titleWeight,

                '--cosmos-title-align':
                    titleAlign,

                '--cosmos-description-color':
                    descriptionColor,

                '--cosmos-description-size':
                    `${descriptionSize}px`,

                '--cosmos-description-align':
                    descriptionAlign,

                '--cosmos-content-background':
                    contentBackgroundColor,

                '--cosmos-content-padding-top':
                    `${contentPaddingTop}px`,

                '--cosmos-content-padding-bottom':
                    `${contentPaddingBottom}px`,

                '--cosmos-content-padding-left':
                    `${contentPaddingLeft}px`,

                '--cosmos-content-padding-right':
                    `${contentPaddingRight}px`,

                '--cosmos-background-padding-top':
                    `${backgroundPaddingTop}px`,

                '--cosmos-background-padding-bottom':
                    `${backgroundPaddingBottom}px`,

                '--cosmos-block-margin-top':
                    `${blockMarginTop}px`,

                '--cosmos-block-margin-bottom':
                    `${blockMarginBottom}px`
            }
        });


        /*
         * =====================================================
         * IMAGEN DE FONDO
         * =====================================================
         */

        const backgroundStyle = imageUrl
            ? {
                backgroundImage: `
                    linear-gradient(
                        rgba(0, 0, 0, ${overlay / 100}),
                        rgba(0, 0, 0, ${overlay / 100})
                    ),
                    url("${imageUrl}")
                `,
                backgroundPosition
            }
            : {};


        return (

            <Fragment>

                <InspectorControls>

                    {/* =========================================
                        IMAGEN
                    ========================================== */}

                    <PanelBody
                        title="Imagen de fondo"
                        initialOpen={true}
                    >

                        <MediaUploadCheck>

                            <MediaUpload

                                onSelect={(media) => {

                                    setAttributes({

                                        imageUrl: media.url,

                                        imageId: media.id,

                                        imageAlt:
                                            media.alt || ''
                                    });

                                }}

                                allowedTypes={['image']}

                                value={imageId}

                                render={({ open }) => (

                                    <Button
                                        variant="secondary"
                                        onClick={open}
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            marginBottom: '16px'
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


                        <RangeControl
                            label="Altura de la imagen"
                            value={imageHeight}
                            onChange={(value) =>
                                setAttributes({
                                    imageHeight: value
                                })
                            }
                            min={250}
                            max={900}
                            step={10}
                        />


                        <SelectControl
                            label="Posición de la imagen"
                            value={backgroundPosition}
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
                                    backgroundPosition: value
                                })
                            }
                        />


                        <RangeControl
                            label="Oscurecimiento"
                            value={overlay}
                            onChange={(value) =>
                                setAttributes({
                                    overlay: value
                                })
                            }
                            min={0}
                            max={80}
                            step={5}
                        />

                    </PanelBody>


                    {/* =========================================
                        TÍTULO
                    ========================================== */}

                    <PanelBody
                        title="Título"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Tamaño"
                            value={titleSize}
                            onChange={(value) =>
                                setAttributes({
                                    titleSize: value
                                })
                            }
                            min={18}
                            max={90}
                        />


                        <SelectControl
                            label="Peso"
                            value={titleWeight}
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
                                    titleWeight: value
                                })
                            }
                        />


                        <SelectControl
                            label="Alineación"
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


                        <p>Color del título</p>

                        <ColorPalette
                            value={titleColor}
                            onChange={(value) =>
                                setAttributes({
                                    titleColor:
                                        value || '#111111'
                                })
                            }
                        />

                    </PanelBody>


                    {/* =========================================
                        DESCRIPCIÓN
                    ========================================== */}

                    <PanelBody
                        title="Descripción"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Tamaño"
                            value={descriptionSize}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionSize:
                                        value
                                })
                            }
                            min={12}
                            max={40}
                        />


                        <SelectControl
                            label="Alineación"
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
                                    descriptionAlign:
                                        value
                                })
                            }
                        />


                        <p>Color de la descripción</p>

                        <ColorPalette
                            value={descriptionColor}
                            onChange={(value) =>
                                setAttributes({
                                    descriptionColor:
                                        value || '#333333'
                                })
                            }
                        />

                    </PanelBody>


                    {/* =========================================
                        CONTENIDO
                    ========================================== */}

                    <PanelBody
                        title="Contenedor de contenido"
                        initialOpen={false}
                    >

                        <p>Color de fondo</p>

                        <ColorPalette
                            value={contentBackgroundColor}
                            onChange={(value) =>
                                setAttributes({
                                    contentBackgroundColor:
                                        value || '#ffffff'
                                })
                            }
                        />


                        <RangeControl
                            label="Padding superior"
                            value={contentPaddingTop}
                            onChange={(value) =>
                                setAttributes({
                                    contentPaddingTop:
                                        value
                                })
                            }
                            min={0}
                            max={150}
                        />


                        <RangeControl
                            label="Padding inferior"
                            value={contentPaddingBottom}
                            onChange={(value) =>
                                setAttributes({
                                    contentPaddingBottom:
                                        value
                                })
                            }
                            min={0}
                            max={150}
                        />


                        <RangeControl
                            label="Padding izquierdo"
                            value={contentPaddingLeft}
                            onChange={(value) =>
                                setAttributes({
                                    contentPaddingLeft:
                                        value
                                })
                            }
                            min={0}
                            max={150}
                        />


                        <RangeControl
                            label="Padding derecho"
                            value={contentPaddingRight}
                            onChange={(value) =>
                                setAttributes({
                                    contentPaddingRight:
                                        value
                                })
                            }
                            min={0}
                            max={150}
                        />

                    </PanelBody>


                    {/* =========================================
                        ESPACIO DE LA IMAGEN
                    ========================================== */}

                    <PanelBody
                        title="Espaciado de la imagen"
                        initialOpen={false}
                    >

                        <RangeControl
                            label="Padding superior"
                            value={backgroundPaddingTop}
                            onChange={(value) =>
                                setAttributes({
                                    backgroundPaddingTop:
                                        value
                                })
                            }
                            min={0}
                            max={250}
                        />


                        <RangeControl
                            label="Padding inferior"
                            value={backgroundPaddingBottom}
                            onChange={(value) =>
                                setAttributes({
                                    backgroundPaddingBottom:
                                        value
                                })
                            }
                            min={0}
                            max={250}
                        />

                    </PanelBody>


                    {/* =========================================
                        MARGEN DEL BLOQUE COMPLETO
                    ========================================== */}

                    <PanelBody
                        title="Margen del bloque completo"
                        initialOpen={false}
                    >

                        <p>
                            Este margen se aplica a todo el bloque,
                            no al contenido.
                        </p>


                        <RangeControl
                            label="Margen superior"
                            value={blockMarginTop}
                            onChange={(value) =>
                                setAttributes({
                                    blockMarginTop:
                                        value
                                })
                            }
                            min={0}
                            max={200}
                        />


                        <RangeControl
                            label="Margen inferior"
                            value={blockMarginBottom}
                            onChange={(value) =>
                                setAttributes({
                                    blockMarginBottom:
                                        value
                                })
                            }
                            min={0}
                            max={200}
                        />

                    </PanelBody>

                </InspectorControls>


                {/* =============================================
                    BLOQUE
                ============================================== */}

                <section {...blockProps}>

                    <div
                        className="cosmos-image-text-banner__background"
                        style={backgroundStyle}
                    >

                        <div className="container">

                            <div className="cosmos-image-text-banner__content">

                                <RichText
                                    tagName="h2"
                                    className="cosmos-image-text-banner__title"
                                    value={title}
                                    onChange={(value) =>
                                        setAttributes({
                                            title: value
                                        })
                                    }
                                    placeholder="Escriba el título..."
                                    allowedFormats={[
                                        'core/bold',
                                        'core/italic',
                                        'core/link'
                                    ]}
                                />


                                <RichText
                                    tagName="div"
                                    className="cosmos-image-text-banner__description"
                                    value={description}
                                    onChange={(value) =>
                                        setAttributes({
                                            description:
                                                value
                                        })
                                    }
                                    placeholder="Escriba la descripción..."
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