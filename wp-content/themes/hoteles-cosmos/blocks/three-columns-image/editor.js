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


registerBlockType('hoteles-cosmos/three-columns-image', {

    edit: ({ attributes, setAttributes }) => {

        const {

            leftTitle,
            leftDescription,

            rightTitle,
            rightDescription,

            imageUrl,
            imageAlt,

            backgroundColor,

            titleColor,
            titleSize,
            titleWeight,

            descriptionColor,
            descriptionSize,
            descriptionWeight,

            leftAlign,
            rightAlign,

            imageWidth,
            imageHeight,

            columnGap,

            paddingTop,
            paddingBottom,

            blockMarginTop,
            blockMarginBottom

        } = attributes;


        /*
         * =====================================================
         * VARIABLES CSS
         * =====================================================
         */

        const blockProps = useBlockProps({

            className: 'cosmos-three-columns-image',

            style: {

                '--cosmos-three-background':
                    backgroundColor,

                '--cosmos-three-title-color':
                    titleColor,

                '--cosmos-three-title-size':
                    `${titleSize}px`,

                '--cosmos-three-title-weight':
                    titleWeight,

                '--cosmos-three-description-color':
                    descriptionColor,

                '--cosmos-three-description-size':
                    `${descriptionSize}px`,

                '--cosmos-three-description-weight':
                    descriptionWeight,

                '--cosmos-three-left-align':
                    leftAlign,

                '--cosmos-three-right-align':
                    rightAlign,

                '--cosmos-three-image-width':
                    `${imageWidth}%`,

                '--cosmos-three-image-height':
                    `${imageHeight}px`,

                '--cosmos-three-gap':
                    `${columnGap}px`,

                '--cosmos-three-padding-top':
                    `${paddingTop}px`,

                '--cosmos-three-padding-bottom':
                    `${paddingBottom}px`,

                '--cosmos-three-margin-top':
                    `${blockMarginTop}px`,

                '--cosmos-three-margin-bottom':
                    `${blockMarginBottom}px`
            }
        });


        /*
         * =====================================================
         * IMAGEN
         * =====================================================
         */

        const imageStyle = imageUrl
            ? {
                width: '100%',
                height: `${imageHeight}px`,
                objectFit: 'cover',
                objectPosition: 'center'
            }
            : undefined;


        return (

            <Fragment>

                <InspectorControls>

                    {/* =========================================
                        IMAGEN
                    ========================================== */}

                    <PanelBody
                        title="Imagen"
                        initialOpen={true}
                    >

                        <MediaUploadCheck>

                            <MediaUpload

                                onSelect={(media) => {

                                    setAttributes({

                                        imageUrl:
                                            media.url,

                                        imageId:
                                            media.id,

                                        imageAlt:
                                            media.alt || ''
                                    });

                                }}

                                allowedTypes={['image']}

                                value={imageUrl ? attributes.imageId : 0}

                                render={({ open }) => (

                                    <Button
                                        variant="secondary"
                                        onClick={open}
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            marginBottom: '15px'
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

                            min={200}
                            max={800}
                            step={10}

                        />

                    </PanelBody>


                    {/* =========================================
                        TÍTULO
                    ========================================== */}

                    <PanelBody
                        title="Títulos"
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

                            min={16}
                            max={60}

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


                        <p>
                            Color del título
                        </p>

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
                        title="Descripciones"
                        initialOpen={false}
                    >

                        <RangeControl

                            label="Tamaño"

                            value={descriptionSize}

                            onChange={(value) =>
                                setAttributes({
                                    descriptionSize: value
                                })
                            }

                            min={12}
                            max={36}

                        />


                        <SelectControl

                            label="Peso"

                            value={descriptionWeight}

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
                                    descriptionWeight:
                                        value
                                })
                            }

                        />


                        <p>
                            Color de la descripción
                        </p>

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
                        ALINEACIÓN
                    ========================================== */}

                    <PanelBody
                        title="Alineación"
                        initialOpen={false}
                    >

                        <SelectControl

                            label="Columna izquierda"

                            value={leftAlign}

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
                                    leftAlign: value
                                })
                            }

                        />


                        <SelectControl

                            label="Columna derecha"

                            value={rightAlign}

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
                                    rightAlign: value
                                })
                            }

                        />

                    </PanelBody>


                    {/* =========================================
                        FONDO
                    ========================================== */}

                    <PanelBody
                        title="Fondo"
                        initialOpen={false}
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


                    {/* =========================================
                        ESPACIADO
                    ========================================== */}

                    <PanelBody
                        title="Espaciado interno"
                        initialOpen={false}
                    >

                        <RangeControl

                            label="Padding superior"

                            value={paddingTop}

                            onChange={(value) =>
                                setAttributes({
                                    paddingTop: value
                                })
                            }

                            min={0}
                            max={200}

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
                            max={200}

                        />


                        <RangeControl

                            label="Separación entre columnas"

                            value={columnGap}

                            onChange={(value) =>
                                setAttributes({
                                    columnGap: value
                                })
                            }

                            min={0}
                            max={100}

                        />

                    </PanelBody>


                    {/* =========================================
                        MARGEN DEL BLOQUE
                    ========================================== */}

                    <PanelBody
                        title="Margen del bloque"
                        initialOpen={false}
                    >

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

                    <div className="cosmos-three-columns-image__inner">

                        {/* =====================================
                            COLUMNA IZQUIERDA
                        ====================================== */}

                        <div
                            className="cosmos-three-columns-image__text cosmos-three-columns-image__text--left"
                        >

                            <RichText

                                tagName="h2"

                                className="cosmos-three-columns-image__title"

                                value={leftTitle}

                                onChange={(value) =>
                                    setAttributes({
                                        leftTitle: value
                                    })
                                }

                                placeholder="Título..."

                                allowedFormats={[
                                    'core/bold',
                                    'core/italic'
                                ]}

                            />


                            <RichText

                                tagName="div"

                                className="cosmos-three-columns-image__description"

                                value={leftDescription}

                                onChange={(value) =>
                                    setAttributes({
                                        leftDescription:
                                            value
                                    })
                                }

                                placeholder="Descripción..."

                                allowedFormats={[
                                    'core/bold',
                                    'core/italic',
                                    'core/link'
                                ]}

                            />

                        </div>


                        {/* =====================================
                            IMAGEN
                        ====================================== */}

                        <div className="cosmos-three-columns-image__image">

                            {imageUrl ? (

                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    style={imageStyle}
                                />

                            ) : (

                                <MediaUploadCheck>

                                    <MediaUpload

                                        onSelect={(media) => {

                                            setAttributes({

                                                imageUrl:
                                                    media.url,

                                                imageId:
                                                    media.id,

                                                imageAlt:
                                                    media.alt || ''
                                            });

                                        }}

                                        allowedTypes={['image']}

                                        value={
                                            attributes.imageId
                                        }

                                        render={({ open }) => (

                                            <Button
                                                variant="primary"
                                                onClick={open}
                                            >
                                                Seleccionar imagen
                                            </Button>

                                        )}

                                    />

                                </MediaUploadCheck>

                            )}

                        </div>


                        {/* =====================================
                            COLUMNA DERECHA
                        ====================================== */}

                        <div
                            className="cosmos-three-columns-image__text cosmos-three-columns-image__text--right"
                        >

                            <RichText

                                tagName="h2"

                                className="cosmos-three-columns-image__title"

                                value={rightTitle}

                                onChange={(value) =>
                                    setAttributes({
                                        rightTitle: value
                                    })
                                }

                                placeholder="Título..."

                                allowedFormats={[
                                    'core/bold',
                                    'core/italic'
                                ]}

                            />


                            <RichText

                                tagName="div"

                                className="cosmos-three-columns-image__description"

                                value={rightDescription}

                                onChange={(value) =>
                                    setAttributes({
                                        rightDescription:
                                            value
                                    })
                                }

                                placeholder="Descripción..."

                                allowedFormats={[
                                    'core/bold',
                                    'core/italic',
                                    'core/link'
                                ]}

                            />

                        </div>

                    </div>

                </section>

            </Fragment>
        );
    },


    save: () => null

});